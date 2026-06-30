"""Local CCR catalog server.

This is intentionally stdlib-only. It serves the static prototype and exposes a
small SQLite-backed API that mirrors the parts of the Unity Catalog surface CCR
can use today.
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import sqlite3
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

from .seed_catalog import BOOTSTRAP_PATH, DB_PATH, ROOT, main as seed_catalog


API_PREFIX = "/api/2.1/unity-catalog"


def connect() -> sqlite3.Connection:
    if not DB_PATH.exists() or not BOOTSTRAP_PATH.exists():
        seed_catalog()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def one(conn: sqlite3.Connection, sql: str, args: tuple = ()) -> sqlite3.Row | None:
    return conn.execute(sql, args).fetchone()


def many(conn: sqlite3.Connection, sql: str, args: tuple = ()) -> list[sqlite3.Row]:
    return list(conn.execute(sql, args))


def row_dict(row: sqlite3.Row) -> dict:
    return dict(row)


def asset_by_full_name(conn: sqlite3.Connection, full_name: str) -> sqlite3.Row | None:
    return one(conn, "select * from assets where full_name = ?", (full_name,))


def asset_summary(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "name": row["object_name"],
        "full_name": row["full_name"],
        "catalog_name": row["catalog_name"],
        "schema_name": row["schema_name"],
        "object_name": row["object_name"],
        "display_name": row["display_name"],
        "securable_type": row["uc_type"],
        "kind": row["kind"],
        "table_type": row["table_type"],
        "owner": row["owner"],
        "storage_location": row["storage_location"],
        "country": row["country"],
        "residency_zone": row["residency_zone"],
        "posture": row["posture"],
        "classification": row["classification"],
        "comment": row["usage"],
    }


def asset_detail(conn: sqlite3.Connection, row: sqlite3.Row) -> dict:
    data = asset_summary(row)
    data.update(
        {
            "system": row["system"],
            "usage": row["usage"],
            "remediation": row["remediation"],
            "local_target": row["local_target"],
            "volume": row["volume"],
            "properties": json.loads(row["properties_json"]),
            "columns": [
                {
                    "name": col["name"],
                    "type_text": col["data_type"],
                    "nullable": bool(col["nullable"]),
                    "classification": col["classification"],
                    "comment": col["comment"],
                }
                for col in many(conn, "select * from columns where asset_id = ? order by id", (row["id"],))
            ],
            "data_classes": [
                item["class_name"]
                for item in many(conn, "select class_name from data_classes where asset_id = ? order by class_name", (row["id"],))
            ],
            "permissions": permissions_for_asset(conn, row["id"]),
            "obligations": obligations_for_asset(conn, row["id"]),
            "lineage": lineage_for_asset(conn, row["id"]),
            "evidence": evidence_for_asset(conn, row["id"]),
        }
    )
    return data


def permissions_for_asset(conn: sqlite3.Connection, asset_id: str) -> list[dict]:
    return [
        {"principal": row["principal"], "privilege": row["privilege"]}
        for row in many(conn, "select principal, privilege from permissions where asset_id = ? order by principal, privilege", (asset_id,))
    ]


def obligations_for_asset(conn: sqlite3.Connection, asset_id: str) -> list[dict]:
    return [
        row_dict(row)
        for row in many(
            conn,
            """
            select obligations.*
            from asset_obligations
            join obligations on obligations.id = asset_obligations.obligation_id
            where asset_obligations.asset_id = ?
            order by obligations.id
            """,
            (asset_id,),
        )
    ]


def evidence_for_asset(conn: sqlite3.Connection, asset_id: str) -> list[dict]:
    return [
        row_dict(row)
        for row in many(conn, "select id, title, status, body, uri from evidence where asset_id = ? order by id", (asset_id,))
    ]


def lineage_for_asset(conn: sqlite3.Connection, asset_id: str) -> dict:
    inbound = many(
        conn,
        """
        select lineage.*, source.full_name as source_full_name, source.display_name as source_name,
               target.full_name as target_full_name, target.display_name as target_name
        from lineage
        join assets source on source.id = lineage.source_asset_id
        join assets target on target.id = lineage.target_asset_id
        where lineage.target_asset_id = ?
        order by lineage.id
        """,
        (asset_id,),
    )
    outbound = many(
        conn,
        """
        select lineage.*, source.full_name as source_full_name, source.display_name as source_name,
               target.full_name as target_full_name, target.display_name as target_name
        from lineage
        join assets source on source.id = lineage.source_asset_id
        join assets target on target.id = lineage.target_asset_id
        where lineage.source_asset_id = ?
        order by lineage.id
        """,
        (asset_id,),
    )

    def serialize(row: sqlite3.Row) -> dict:
        return {
            "source_asset_id": row["source_asset_id"],
            "source_full_name": row["source_full_name"],
            "source_name": row["source_name"],
            "target_asset_id": row["target_asset_id"],
            "target_full_name": row["target_full_name"],
            "target_name": row["target_name"],
            "route_type": row["route_type"],
            "description": row["description"],
            "contains_transaction_data": bool(row["contains_transaction_data"]),
            "cross_border": bool(row["cross_border"]),
        }

    return {
        "upstreams": [serialize(row) for row in inbound],
        "downstreams": [serialize(row) for row in outbound],
    }


def catalog_info(row: sqlite3.Row) -> dict:
    return {
        "name": row["name"],
        "full_name": row["name"],
        "display_name": row["display_name"],
        "owner": row["owner"],
        "storage_location": row["storage_location"],
        "comment": row["comment"],
        "properties": json.loads(row["properties_json"]),
    }


def schema_info(row: sqlite3.Row) -> dict:
    return {
        "name": row["name"],
        "catalog_name": row["catalog_name"],
        "full_name": row["full_name"],
        "owner": row["owner"],
        "comment": row["comment"],
        "properties": json.loads(row["properties_json"]),
    }


def bootstrap_payload() -> dict:
    text = BOOTSTRAP_PATH.read_text(encoding="utf-8")
    prefix = "window.CATALOG_BOOTSTRAP = "
    if not text.startswith(prefix):
        raise ValueError("catalog bootstrap file is malformed")
    return json.loads(text[len(prefix) :].rstrip(";\n"))


def uc_bootstrap_from_db(conn: sqlite3.Connection) -> dict:
    payload = bootstrap_payload()
    payload["api"] = {
        "unityCatalogBase": API_PREFIX,
        "ccrBootstrap": "/api/ccr/catalog/bootstrap",
        "sqlite": "data/kudora_control_room.sqlite",
    }
    payload["counts"] = {
        "catalogs": one(conn, "select count(*) as n from catalogs")["n"],
        "schemas": one(conn, "select count(*) as n from schemas")["n"],
        "assets": one(conn, "select count(*) as n from assets")["n"],
        "lineage_routes": one(conn, "select count(*) as n from lineage")["n"],
        "permissions": one(conn, "select count(*) as n from permissions")["n"],
        "evidence": one(conn, "select count(*) as n from evidence")["n"],
    }
    return payload


class CatalogHandler(BaseHTTPRequestHandler):
    server_version = "CCRUnityCatalog/0.1"

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        path = unquote(parsed.path)
        query = parse_qs(parsed.query)
        if path.startswith("/api/"):
            self.handle_api(path, query)
        else:
            self.handle_static(path)

    def handle_api(self, path: str, query: dict[str, list[str]]) -> None:
        try:
            with connect() as conn:
                payload = self.route_api(conn, path, query)
            self.send_json(payload)
        except KeyError as exc:
            self.send_error_json(HTTPStatus.NOT_FOUND, str(exc))
        except ValueError as exc:
            self.send_error_json(HTTPStatus.BAD_REQUEST, str(exc))
        except Exception as exc:  # pragma: no cover - defensive for local demo server
            self.send_error_json(HTTPStatus.INTERNAL_SERVER_ERROR, str(exc))

    def route_api(self, conn: sqlite3.Connection, path: str, query: dict[str, list[str]]) -> dict:
        if path == "/api/health":
            return {"status": "ok", "database": str(DB_PATH)}
        if path == "/api/ccr/catalog/bootstrap":
            return uc_bootstrap_from_db(conn)
        if path == f"{API_PREFIX}/metastore_summary":
            bank = one(conn, "select * from banks limit 1")
            metastore = one(conn, "select * from metastores limit 1")
            return {
                "metastore_id": metastore["id"],
                "name": metastore["name"],
                "owner": metastore["owner"],
                "storage_root": metastore["storage_root"],
                "bank": row_dict(bank),
            }
        if path == f"{API_PREFIX}/catalogs":
            return {"catalogs": [catalog_info(row) for row in many(conn, "select * from catalogs order by name")]}
        if path.startswith(f"{API_PREFIX}/catalogs/"):
            name = path.removeprefix(f"{API_PREFIX}/catalogs/")
            row = one(conn, "select * from catalogs where name = ?", (name,))
            if not row:
                raise KeyError(f"catalog not found: {name}")
            return catalog_info(row)
        if path == f"{API_PREFIX}/schemas":
            catalog_name = first(query, "catalog_name")
            if catalog_name:
                rows = many(conn, "select * from schemas where catalog_name = ? order by name", (catalog_name,))
            else:
                rows = many(conn, "select * from schemas order by catalog_name, name")
            return {"schemas": [schema_info(row) for row in rows]}
        if path.startswith(f"{API_PREFIX}/schemas/"):
            full_name = path.removeprefix(f"{API_PREFIX}/schemas/")
            row = one(conn, "select * from schemas where full_name = ?", (full_name,))
            if not row:
                raise KeyError(f"schema not found: {full_name}")
            return schema_info(row)
        if path == f"{API_PREFIX}/tables":
            return self.list_assets(conn, query, "TABLE")
        if path.startswith(f"{API_PREFIX}/tables/"):
            return self.get_asset(conn, path.removeprefix(f"{API_PREFIX}/tables/"))
        if path == f"{API_PREFIX}/volumes":
            return self.list_assets(conn, query, "VOLUME")
        if path.startswith(f"{API_PREFIX}/volumes/"):
            return self.get_asset(conn, path.removeprefix(f"{API_PREFIX}/volumes/"))
        if path == f"{API_PREFIX}/functions":
            return self.list_assets(conn, query, "FUNCTION")
        if path.startswith(f"{API_PREFIX}/functions/"):
            return self.get_asset(conn, path.removeprefix(f"{API_PREFIX}/functions/"))
        if path == f"{API_PREFIX}/models":
            return self.list_assets(conn, query, "MODEL")
        if path.startswith(f"{API_PREFIX}/models/"):
            return self.get_asset(conn, path.removeprefix(f"{API_PREFIX}/models/"))
        if path.startswith(f"{API_PREFIX}/permissions/"):
            parts = path.removeprefix(f"{API_PREFIX}/permissions/").split("/", 1)
            if len(parts) != 2:
                raise ValueError("expected /permissions/{securable_type}/{full_name}")
            full_name = parts[1]
            asset = asset_by_full_name(conn, full_name)
            if not asset:
                raise KeyError(f"securable not found: {full_name}")
            return {
                "securable_type": parts[0],
                "full_name": full_name,
                "privilege_assignments": permissions_for_asset(conn, asset["id"]),
            }
        if path.startswith("/api/ccr/catalog/lineage/"):
            full_name = path.removeprefix("/api/ccr/catalog/lineage/")
            asset = asset_by_full_name(conn, full_name)
            if not asset:
                raise KeyError(f"asset not found: {full_name}")
            return {"full_name": full_name, **lineage_for_asset(conn, asset["id"])}
        if path.startswith("/api/ccr/catalog/evidence/"):
            full_name = path.removeprefix("/api/ccr/catalog/evidence/")
            asset = asset_by_full_name(conn, full_name)
            if not asset:
                raise KeyError(f"asset not found: {full_name}")
            return {"full_name": full_name, "evidence": evidence_for_asset(conn, asset["id"])}
        if path == "/api/ccr/catalog/obligations":
            return {"obligations": [row_dict(row) for row in many(conn, "select * from obligations order by id")]}
        if path == "/api/ccr/catalog/search":
            term = first(query, "q", "")
            return self.search_assets(conn, term)
        raise KeyError(f"route not found: {path}")

    def list_assets(self, conn: sqlite3.Connection, query: dict[str, list[str]], uc_type: str) -> dict:
        catalog_name = first(query, "catalog_name")
        schema_name = first(query, "schema_name")
        clauses = ["uc_type = ?"]
        args: list[str] = [uc_type]
        if catalog_name:
            clauses.append("catalog_name = ?")
            args.append(catalog_name)
        if schema_name:
            clauses.append("schema_name = ?")
            args.append(schema_name)
        sql = f"select * from assets where {' and '.join(clauses)} order by catalog_name, schema_name, object_name"
        key = {
            "TABLE": "tables",
            "VOLUME": "volumes",
            "FUNCTION": "functions",
            "MODEL": "registered_models",
        }[uc_type]
        return {key: [asset_summary(row) for row in many(conn, sql, tuple(args))]}

    def get_asset(self, conn: sqlite3.Connection, full_name: str) -> dict:
        row = asset_by_full_name(conn, full_name)
        if not row:
            raise KeyError(f"asset not found: {full_name}")
        return asset_detail(conn, row)

    def search_assets(self, conn: sqlite3.Connection, term: str) -> dict:
        like = f"%{term.lower()}%"
        rows = many(
            conn,
            """
            select distinct assets.*
            from assets
            left join data_classes on data_classes.asset_id = assets.id
            where lower(assets.full_name) like ?
               or lower(assets.display_name) like ?
               or lower(assets.owner) like ?
               or lower(assets.classification) like ?
               or lower(assets.usage) like ?
               or lower(data_classes.class_name) like ?
            order by assets.catalog_name, assets.schema_name, assets.object_name
            limit 100
            """,
            (like, like, like, like, like, like),
        )
        return {"query": term, "assets": [asset_summary(row) for row in rows]}

    def handle_static(self, path: str) -> None:
        rel_path = "index.html" if path in {"", "/"} else path.lstrip("/")
        candidate = (ROOT / rel_path).resolve()
        if not candidate.is_file() or (ROOT not in candidate.parents and candidate != ROOT):
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        content_type = mimetypes.guess_type(candidate.name)[0] or "application/octet-stream"
        data = candidate.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        data = json.dumps(payload, indent=2, sort_keys=True).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def send_error_json(self, status: HTTPStatus, message: str) -> None:
        self.send_json({"error_code": status.name, "message": message}, status)

    def log_message(self, format: str, *args: object) -> None:
        print(f"{self.address_string()} - {format % args}")


def first(query: dict[str, list[str]], key: str, default: str | None = None) -> str | None:
    values = query.get(key)
    if not values:
        return default
    return values[0]


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Serve the CCR static app and local catalog API.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=5179)
    parser.add_argument("--seed", action="store_true", help="Regenerate the SQLite catalog before serving.")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if args.seed or not DB_PATH.exists() or not BOOTSTRAP_PATH.exists():
        seed_catalog()
    server = ThreadingHTTPServer((args.host, args.port), CatalogHandler)
    print(f"Serving CCR on http://{args.host}:{args.port}/")
    print(f"Catalog API on http://{args.host}:{args.port}{API_PREFIX}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down CCR server")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
