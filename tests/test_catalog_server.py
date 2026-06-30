from __future__ import annotations

import unittest

from app import seed_catalog
from app.server import API_PREFIX, CatalogHandler, connect


class CatalogServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        seed_catalog.main()
        cls.handler = CatalogHandler.__new__(CatalogHandler)

    def route(self, path: str, query: dict[str, list[str]] | None = None) -> dict:
        with connect() as conn:
            return self.handler.route_api(conn, path, query or {})

    def test_bootstrap_exposes_synthetic_bank_catalog(self) -> None:
        payload = self.route("/api/ccr/catalog/bootstrap")

        self.assertEqual("Kudora Bank Plc", payload["bank"]["name"])
        self.assertEqual(9, payload["counts"]["catalogs"])
        self.assertEqual(23, payload["counts"]["schemas"])
        self.assertEqual(34, payload["counts"]["assets"])
        self.assertIn("card_auth_event_stream", payload["catalogMetadata"])
        self.assertEqual(API_PREFIX, payload["api"]["unityCatalogBase"])

    def test_uc_catalog_and_schema_routes_follow_three_level_namespace(self) -> None:
        catalogs = self.route(f"{API_PREFIX}/catalogs")
        schemas = self.route(f"{API_PREFIX}/schemas", {"catalog_name": ["payments"]})

        self.assertIn("payments", {item["name"] for item in catalogs["catalogs"]})
        self.assertEqual(
            {"cards", "merchant_acquiring", "nibss_nip", "settlement"},
            {item["name"] for item in schemas["schemas"]},
        )

    def test_table_detail_includes_governance_context(self) -> None:
        table = self.route(f"{API_PREFIX}/tables/payments.cards.card_auth_event_stream")

        self.assertEqual("payments.cards.card_auth_event_stream", table["full_name"])
        self.assertEqual("Cards", table["owner"])
        self.assertEqual("Ireland", table["country"])
        self.assertIn("PAN token", table["data_classes"])
        self.assertGreaterEqual(len(table["columns"]), 4)
        self.assertGreaterEqual(len(table["permissions"]), 4)
        self.assertGreaterEqual(len(table["evidence"]), 3)
        self.assertGreaterEqual(len(table["lineage"]["downstreams"]), 1)

    def test_search_and_permissions_routes_return_asset_matches(self) -> None:
        search = self.route("/api/ccr/catalog/search", {"q": ["transaction"]})
        permissions = self.route(f"{API_PREFIX}/permissions/TABLE/payments.cards.card_auth_event_stream")

        self.assertGreaterEqual(len(search["assets"]), 10)
        self.assertEqual("payments.cards.card_auth_event_stream", permissions["full_name"])
        self.assertIn(
            {"principal": "Compliance Agent", "privilege": "SELECT"},
            permissions["privilege_assignments"],
        )


if __name__ == "__main__":
    unittest.main()
