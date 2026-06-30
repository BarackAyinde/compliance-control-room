# OSS Unity Catalog Research Notes

Sources:

- Unity Catalog upstream README: https://github.com/unitycatalog/unitycatalog
- Unity Catalog OpenAPI spec: https://raw.githubusercontent.com/unitycatalog/unitycatalog/main/api/all.yaml
- Unity Catalog docs: https://docs.unitycatalog.io/

## What OSS Unity Catalog Is

Unity Catalog OSS is an Apache-2.0 catalog and governance implementation for data
and AI assets. The upstream project describes it as a universal catalog that can
govern tabular data, files, functions, and AI models through open APIs. It is not
only a table inventory: it has an API server, CLI, UI, SDKs, temporary credential
flows, permissions, and compatibility ambitions for engines such as DuckDB,
Spark, Hive metastore clients, and Iceberg REST catalog clients.

## Namespace Shape

The OpenAPI spec defines a top-level metastore, then a three-level namespace:

```text
catalog.schema.asset
```

The first two levels are:

- `catalog`: first layer of the namespace and a broad organizational boundary.
- `schema`: second layer, also called a database, used to organize objects.

The third level contains securable objects:

- tables
- volumes
- functions
- registered models

This is the core shape mirrored by the CCR synthetic bank catalog.

## API Resources To Mirror

The OSS OpenAPI spec exposes resource collections for:

- `/catalogs`
- `/schemas`
- `/tables`
- `/volumes`
- `/functions`
- `/models`
- `/models/versions`
- `/permissions/{securable_type}/{full_name}`
- `/metastore_summary`
- `/credentials`
- `/external-locations`
- temporary table, volume, path, and model-version credentials

For this prototype, the SQLite seed mirrors the stable concepts rather than
trying to implement the full API: catalogs, schemas, assets, columns,
permissions, lineage, obligations, evidence, and agent actions.

## Object Metadata

The OpenAPI model uses metadata objects such as `CatalogInfo`, `SchemaInfo`,
`TableInfo`, `VolumeInfo`, `FunctionInfo`, and `RegisteredModelInfo`. The common
ideas to carry forward are:

- object name and full name
- owner
- comment/description
- storage location
- properties map
- created/updated metadata
- object-specific fields such as table type, columns, data source format, or
  model version metadata

The CCR catalog uses these ideas but adds bank-governance fields needed for the
CBN circular: residency country/zone, data classes, linked obligations,
evidence, permissions, lineage routes, and agent actions.

## Product Implication For CCR

The Catalog Explorer should behave like a governed object browser:

- left tree: collapsible catalogs, schemas, and third-level objects
- right workspace: selected object overview, columns, permissions, evidence,
  lineage, and actions
- search and filters live beside the tree, not as a separate redundant asset
  panel
- every object uses a three-part full name so LLM/RAG context can point to
  precise catalog objects
- CBN residency scanning should operate over registered catalog objects and
  lineage, not a flat list of assets
