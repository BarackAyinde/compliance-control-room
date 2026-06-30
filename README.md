# Compliance Control Room

Compliance Control Room is a local-first prototype for exploring governed data
assets, regulatory obligations, lineage, permissions, and evidence in a
banking-style catalog.

The current demo uses a fully synthetic Nigerian bank, Kudora Bank Plc, and a
small SQLite-backed API that mirrors the Unity Catalog surfaces needed by the
frontend. The app is intentionally lightweight: a static browser UI, a
standard-library Python server, and generated catalog seed data.

## What It Shows

- Catalog, schema, table, volume, function, and model-style assets
- Local, offshore, and critical exposure posture
- Data classes, ownership, residency, and classification details
- Lineage between payment, core banking, reporting, and evidence assets
- Permissions, obligations, and evidence attached to catalog assets
- A compliance-register and remediation-oriented control room UI

## Project Layout

```text
.
├── app/
│   ├── seed_catalog.py      # Builds the synthetic SQLite catalog and JS bootstrap
│   └── server.py            # Serves the frontend and catalog API
├── data/
│   ├── catalog_bootstrap.js # Browser bootstrap generated from seed data
│   └── kudora_control_room.sqlite
├── docs/
│   ├── ccr_catalog_api.md
│   └── unity_catalog_oss_research.md
├── tests/
│   └── test_catalog_server.py
├── app.js
├── index.html
├── styles.css
└── Dockerfile
```

## Run Locally

From this folder:

```bash
python3 -m app.seed_catalog
python3 -m app.server --host 127.0.0.1 --port 5180
```

Open:

```text
http://127.0.0.1:5180/
```

Health check:

```bash
curl -s http://127.0.0.1:5180/api/health
```

## API Surface

The local server exposes a small catalog API under:

```text
/api/2.1/unity-catalog
```

CCR-specific endpoints are exposed under:

```text
/api/ccr/catalog
```

Useful endpoints:

```text
/api/health
/api/ccr/catalog/bootstrap
/api/ccr/catalog/search?q=payments
/api/ccr/catalog/obligations
/api/2.1/unity-catalog/catalogs
/api/2.1/unity-catalog/schemas
/api/2.1/unity-catalog/tables
```

## Tests

```bash
python3 -B -m unittest discover -s tests
```

## Cloud Run

The included `Dockerfile` builds a tiny Python container, seeds the catalog at
build time, and starts the server on Cloud Run's `PORT`.

Deploy from this folder:

```bash
gcloud run deploy compliance-control-room \
  --source . \
  --region europe-west2 \
  --allow-unauthenticated
```

Use a different region or omit `--allow-unauthenticated` if the service should
remain private.

## Notes

- The data is synthetic and safe for demos.
- The SQLite file is committed for convenience, but it can be regenerated with
  `python3 -m app.seed_catalog`.
- The app has no runtime third-party Python dependencies.
