# CCR Catalog API

CCR now has a local SQLite-backed catalog service that mirrors the parts of OSS
Unity Catalog needed by the prototype.

## Run

```bash
python3 -m app.seed_catalog
python3 -m app.server --port 5179
```

Open:

```text
http://127.0.0.1:5179/
```

## Data Source

- SQLite database: `data/kudora_control_room.sqlite`
- Browser bootstrap: `data/catalog_bootstrap.js`
- Seed generator: `app/seed_catalog.py`

The synthetic onboarded bank is Kudora Bank Plc. The seed includes 9 catalogs,
23 schemas, 34 governed assets, 136 columns, 33 lineage routes, 6 obligations,
102 evidence records, and 136 permission grants.

## Unity-Catalog-Shaped Routes

```text
GET /api/health
GET /api/ccr/catalog/bootstrap
GET /api/ccr/catalog/search?q=transaction
GET /api/ccr/catalog/lineage/{full_name}
GET /api/ccr/catalog/evidence/{full_name}
GET /api/ccr/catalog/obligations

GET /api/2.1/unity-catalog/metastore_summary
GET /api/2.1/unity-catalog/catalogs
GET /api/2.1/unity-catalog/catalogs/{name}
GET /api/2.1/unity-catalog/schemas?catalog_name=payments
GET /api/2.1/unity-catalog/schemas/{catalog.schema}
GET /api/2.1/unity-catalog/tables?catalog_name=payments&schema_name=cards
GET /api/2.1/unity-catalog/tables/{catalog.schema.table}
GET /api/2.1/unity-catalog/volumes/{catalog.schema.volume}
GET /api/2.1/unity-catalog/functions/{catalog.schema.function}
GET /api/2.1/unity-catalog/models/{catalog.schema.model}
GET /api/2.1/unity-catalog/permissions/{securable_type}/{full_name}
```

The service is read-first for this prototype. Real mutation, temporary
credentials, storage enforcement, table engine connectors, and Delta/Iceberg/Hudi
integration remain backend research/build candidates.
