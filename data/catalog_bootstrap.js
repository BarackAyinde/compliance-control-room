window.CATALOG_BOOTSTRAP = {
  "assets": [
    {
      "classes": [
        "Account number",
        "Customer identifier",
        "Mandate",
        "Product code"
      ],
      "country": "Nigeria",
      "id": "accounts_account_master",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Account Master",
      "owner": "Core Banking",
      "posture": "local",
      "remediation": "Keep local; attach mandate access review and data-retention evidence.",
      "system": "Core banking account service",
      "volume": "18.1m accounts",
      "x": 23.0,
      "y": 36.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "BVN",
        "Contact detail",
        "Customer identifier",
        "KYC profile"
      ],
      "country": "Nigeria",
      "id": "customers_customer_master",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Customer Master",
      "owner": "Customer Data Office",
      "posture": "local",
      "remediation": "Keep PII local and maintain quarterly access review evidence.",
      "system": "Core banking MDM",
      "volume": "12.4m customers",
      "x": 19.0,
      "y": 26.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Account number",
        "Posting status",
        "Reversal marker",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "ledger_posting_events",
      "kind": "STREAM",
      "localTarget": null,
      "location": "Lagos DC B",
      "name": "Posting Events Stream",
      "owner": "Core Banking",
      "posture": "local",
      "remediation": "Keep local; prove topic retention and consumer ACLs.",
      "system": "Kafka local cluster",
      "volume": "21k events/min",
      "x": 40.0,
      "y": 58.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Account number",
        "Ledger entry",
        "Posting amount",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "ledger_transaction_journal",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Transaction Journal",
      "owner": "Core Banking",
      "posture": "local",
      "remediation": "Keep local; attach immutable audit export and failover attestation.",
      "system": "Postgres HA ledger",
      "volume": "NGN 82bn/day",
      "x": 34.0,
      "y": 49.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Agent ID",
        "Customer identifier",
        "Payment amount",
        "Terminal ID"
      ],
      "country": "Nigeria",
      "id": "agency_cash_io",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Agency Cash In Cash Out",
      "owner": "Agency Banking",
      "posture": "local",
      "remediation": "Keep local; maintain agent terminal ownership proof.",
      "system": "Agency banking platform",
      "volume": "1.1m/day",
      "x": 27.0,
      "y": 66.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Beneficiary account",
        "Customer identifier",
        "Payment instruction",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "internet_banking_payments",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Internet Banking Payments",
      "owner": "Digital Banking",
      "posture": "local",
      "remediation": "Keep local; attach channel-to-ledger lineage.",
      "system": "Internet banking backend",
      "volume": "820k/day",
      "x": 29.0,
      "y": 32.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "API payload fragment",
        "Customer identifier",
        "Device ID",
        "Session ID"
      ],
      "country": "Netherlands",
      "id": "mobile_session_events",
      "kind": "STREAM",
      "localTarget": "Lagos DC B",
      "location": "Azure West Europe",
      "name": "Mobile Session Events",
      "owner": "Digital Banking",
      "posture": "critical",
      "remediation": "Land raw telemetry in Lagos SIEM; retain offshore metrics only after payload redaction.",
      "system": "Cloud app telemetry",
      "volume": "1.4bn events/day",
      "x": 76.0,
      "y": 39.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Beneficiary account",
        "Customer identifier",
        "Device ID",
        "Payment instruction"
      ],
      "country": "Nigeria",
      "id": "mobile_transfer_initiations",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Mobile Transfer Initiations",
      "owner": "Digital Banking",
      "posture": "local",
      "remediation": "Keep local; evidence customer intent lineage.",
      "system": "Mobile banking backend",
      "volume": "5.7m/day",
      "x": 30.0,
      "y": 22.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "API metric",
        "Availability",
        "Incident marker",
        "Response time"
      ],
      "country": "Nigeria",
      "id": "api_call_metrics",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC B",
      "name": "API Call Metrics",
      "owner": "Open Banking",
      "posture": "local",
      "remediation": "Keep local; preserve 5-minute metric aggregation lineage.",
      "system": "API gateway metrics",
      "volume": "390m calls/month",
      "x": 45.0,
      "y": 16.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "API consumer",
        "Customer consent",
        "Customer identifier",
        "Scope"
      ],
      "country": "Nigeria",
      "id": "open_banking_consent_events",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC B",
      "name": "Open Banking Consent Events",
      "owner": "Open Banking",
      "posture": "local",
      "remediation": "Keep local; attach monthly consent coverage evidence.",
      "system": "Open banking gateway",
      "volume": "42m consent events",
      "x": 38.0,
      "y": 18.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Daily aggregate",
        "Merchant segment",
        "Revenue bucket"
      ],
      "country": "United Kingdom",
      "id": "executive_bi_extract",
      "kind": "TABLE",
      "localTarget": "Lagos DC A",
      "location": "Google europe-west2",
      "name": "Executive BI Extract",
      "owner": "Finance",
      "posture": "warning",
      "remediation": "Keep raw extract local; publish only de-identified aggregates offshore.",
      "system": "Warehouse export",
      "volume": "12 GB/day",
      "x": 74.0,
      "y": 31.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Decision score",
        "Device score",
        "Transaction ID"
      ],
      "country": "Germany",
      "id": "vendor_fraud_scores",
      "kind": "TABLE",
      "localTarget": "Lagos DC B",
      "location": "Vendor EU Cloud",
      "name": "Vendor Fraud Scores",
      "owner": "Risk Analytics",
      "posture": "critical",
      "remediation": "Send pseudonymous request only; persist full decision context locally.",
      "system": "Fraud vendor API",
      "volume": "3.4m scores/day",
      "x": 87.0,
      "y": 81.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Evidence pointer",
        "Incident summary",
        "Runbook step"
      ],
      "country": "Nigeria",
      "id": "ops_agent_memory",
      "kind": "VECTOR_INDEX",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Ops Agent Memory",
      "owner": "Operations",
      "posture": "local",
      "remediation": "Keep memory local and filter transaction payloads before embedding.",
      "system": "Local vector index",
      "volume": "18k sessions",
      "x": 18.0,
      "y": 18.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "API payload fragment",
        "Error trace",
        "Session ID",
        "Transaction ID"
      ],
      "country": "Netherlands",
      "id": "payment_api_logs",
      "kind": "LOG_INDEX",
      "localTarget": "Lagos DC B",
      "location": "Azure West Europe",
      "name": "Payment API Logs",
      "owner": "SRE",
      "posture": "critical",
      "remediation": "Deploy local SIEM store, redact payload fragments, keep offshore metrics only.",
      "system": "Cloud log analytics",
      "volume": "1.1 TB/day",
      "x": 82.0,
      "y": 48.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Control test",
        "Device ID",
        "Incident marker",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "siem_payment_security_events",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC B",
      "name": "SIEM Payment Security Events",
      "owner": "Security Operations",
      "posture": "local",
      "remediation": "Keep local and link incident reports to CBN export packs.",
      "system": "Local SIEM",
      "volume": "210m events/day",
      "x": 54.0,
      "y": 20.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Customer identifier",
        "Dispute evidence",
        "Support note",
        "Transaction ID"
      ],
      "country": "Ireland",
      "id": "support_payment_tickets",
      "kind": "TABLE",
      "localTarget": "Lagos DC B",
      "location": "SaaS EU",
      "name": "Support Payment Tickets",
      "owner": "Customer Support",
      "posture": "warning",
      "remediation": "Store regulated ticket evidence locally; mask transaction identifiers in SaaS.",
      "system": "Support SaaS",
      "volume": "260k/month",
      "x": 86.0,
      "y": 58.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Merchant ID",
        "PAN token",
        "Payment amount",
        "Terminal ID",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "atm_pos_transactions",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "ATM and POS Transactions",
      "owner": "Cards",
      "posture": "local",
      "remediation": "Keep local; link to card auth offshore containment plan.",
      "system": "Card switch warehouse",
      "volume": "3.8m/day",
      "x": 65.0,
      "y": 28.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Auth response",
        "Merchant ID",
        "PAN token",
        "Terminal ID",
        "Transaction ID"
      ],
      "country": "Ireland",
      "id": "card_auth_event_stream",
      "kind": "STREAM",
      "localTarget": "Lagos DC B",
      "location": "AWS eu-west-1",
      "name": "Card Auth Event Stream",
      "owner": "Cards",
      "posture": "critical",
      "remediation": "Mirror to local Kafka, stop raw offshore retention, export only tokenized aggregates.",
      "system": "Managed Kafka cluster",
      "volume": "6.2k events/min",
      "x": 78.0,
      "y": 19.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Cryptographic key reference",
        "Customer identifier",
        "PAN token"
      ],
      "country": "Nigeria",
      "id": "card_token_vault",
      "kind": "VOLUME",
      "localTarget": null,
      "location": "Lagos HSM Room",
      "name": "Card Token Vault",
      "owner": "Cards",
      "posture": "local",
      "remediation": "Keep local; refresh PCI and HSM custody evidence.",
      "system": "PCI token vault",
      "volume": "31m active tokens",
      "x": 63.0,
      "y": 21.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Merchant ID",
        "Payment amount",
        "Settlement reference",
        "Terminal ID"
      ],
      "country": "Nigeria",
      "id": "merchant_transactions",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Merchant Transactions",
      "owner": "Merchant Acquiring",
      "posture": "local",
      "remediation": "Keep local; maintain monthly market-share lineage.",
      "system": "Merchant acquiring warehouse",
      "volume": "2.6m/day",
      "x": 61.0,
      "y": 49.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Payment instruction",
        "Settlement reference",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "nibss_gateway_adapter",
      "kind": "FUNCTION",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "NIBSS Gateway Adapter",
      "owner": "Payments Platform",
      "posture": "local",
      "remediation": "Keep lineage and key evidence attached to the CBN residency obligation.",
      "system": "ISO 20022 / NIP bridge",
      "volume": "18.4k tx/min",
      "x": 46.0,
      "y": 45.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Beneficiary account",
        "Originator account",
        "Payment instruction",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "nip_inbound_transfers",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "NIP Inbound Transfers",
      "owner": "Payments Platform",
      "posture": "local",
      "remediation": "Keep local and evidence reconciliation coverage.",
      "system": "NIP processor",
      "volume": "8.2m/day",
      "x": 44.0,
      "y": 34.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Beneficiary account",
        "Originator account",
        "Payment instruction",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "nip_outbound_transfers",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "NIP Outbound Transfers",
      "owner": "Payments Platform",
      "posture": "local",
      "remediation": "Keep local and attach NIBSS settlement proof.",
      "system": "NIP processor",
      "volume": "7.9m/day",
      "x": 48.0,
      "y": 37.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Customer identifier",
        "Dispute evidence",
        "PAN token",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "chargeback_cases",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Chargeback Cases",
      "owner": "Disputes Operations",
      "posture": "local",
      "remediation": "Keep local; evidence exports must be redacted before external sharing.",
      "system": "Dispute case manager",
      "volume": "18k open cases",
      "x": 58.0,
      "y": 63.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Counterparty bank",
        "Ledger entry",
        "Payment amount",
        "Settlement reference"
      ],
      "country": "Nigeria",
      "id": "settlement_positions",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Daily Settlement Positions",
      "owner": "Treasury Operations",
      "posture": "local",
      "remediation": "Keep local and attach daily reconciliation evidence.",
      "system": "Settlement mart",
      "volume": "NGN 91bn/day",
      "x": 52.0,
      "y": 59.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Daily aggregate",
        "Market share",
        "Merchant segment",
        "Revenue bucket"
      ],
      "country": "Nigeria",
      "id": "monthly_market_share_return",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Monthly Market Share Return",
      "owner": "Regulatory Reporting",
      "posture": "local",
      "remediation": "Keep source lineage to merchant, card, NIP, and ledger facts.",
      "system": "Regulatory reporting mart",
      "volume": "36 reporting months",
      "x": 42.0,
      "y": 83.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Control test",
        "Evidence pointer",
        "Storage location",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "transaction_residency_evidence",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "Transaction Residency Evidence",
      "owner": "Compliance Operations",
      "posture": "local",
      "remediation": "Keep current; reconcile against catalog daily.",
      "system": "Compliance evidence lake",
      "volume": "1.9m evidence rows",
      "x": 49.0,
      "y": 86.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Board approval",
        "Evidence pointer",
        "UBO record"
      ],
      "country": "Nigeria",
      "id": "ubo_disclosure_pack",
      "kind": "VOLUME",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "UBO Disclosure Pack",
      "owner": "Legal and Compliance",
      "posture": "local",
      "remediation": "Refresh owner proof and attestations quarterly.",
      "system": "Governance evidence volume",
      "volume": "94 evidence files",
      "x": 32.0,
      "y": 85.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Customer reference",
        "Ledger snapshot",
        "Payment instruction",
        "Transaction ID"
      ],
      "country": "Germany",
      "id": "ledger_dr_backups",
      "kind": "VOLUME",
      "localTarget": "Abuja DR Site",
      "location": "AWS eu-central-1",
      "name": "Ledger DR Backups",
      "owner": "Infrastructure",
      "posture": "critical",
      "remediation": "Move regulated backups to Nigerian DR; keep offshore only if encrypted and approved.",
      "system": "Object storage",
      "volume": "34 TB",
      "x": 88.0,
      "y": 66.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Evidence pointer",
        "Replay offset",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "local_kafka_mirror",
      "kind": "STREAM",
      "localTarget": null,
      "location": "Lagos DC B",
      "name": "Local Kafka Mirror",
      "owner": "Infrastructure",
      "posture": "local",
      "remediation": "Expand to every payment-data topic and record lag attestations.",
      "system": "Kafka MirrorMaker",
      "volume": "14 mirrored topics",
      "x": 50.0,
      "y": 70.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Alert reason",
        "Counterparty",
        "Customer identifier",
        "Transaction ID"
      ],
      "country": "Nigeria",
      "id": "aml_alerts",
      "kind": "TABLE",
      "localTarget": null,
      "location": "Lagos DC A",
      "name": "AML Alerts",
      "owner": "Financial Crime",
      "posture": "local",
      "remediation": "Keep local; preserve alert-to-transaction evidence.",
      "system": "AML monitoring platform",
      "volume": "74k alerts/month",
      "x": 57.0,
      "y": 78.0,
      "zone": "LOCAL"
    },
    {
      "classes": [
        "Counterparty",
        "Customer identifier",
        "Screening result",
        "Transaction ID"
      ],
      "country": "Germany",
      "id": "sanctions_screening_events",
      "kind": "TABLE",
      "localTarget": "Lagos DC B",
      "location": "Vendor EU Cloud",
      "name": "Sanctions Screening Events",
      "owner": "Financial Crime",
      "posture": "critical",
      "remediation": "Store full screening event locally; vendor receives minimal hashed party payloads.",
      "system": "Sanctions vendor API",
      "volume": "5.2m/month",
      "x": 84.0,
      "y": 73.0,
      "zone": "OFFSHORE"
    },
    {
      "classes": [
        "Account age",
        "Device score",
        "Merchant risk",
        "Velocity features"
      ],
      "country": "South Africa",
      "id": "fraud_feature_store",
      "kind": "FEATURE_TABLE",
      "localTarget": "Lagos DC B",
      "location": "Azure South Africa North",
      "name": "Fraud Feature Store",
      "owner": "Risk Analytics",
      "posture": "warning",
      "remediation": "Rebuild feature store locally; send only scored decisions to external tools.",
      "system": "Feature table",
      "volume": "220m rows",
      "x": 72.0,
      "y": 74.0,
      "zone": "REGIONAL"
    },
    {
      "classes": [
        "Decision score",
        "Feature lineage",
        "Model artifact"
      ],
      "country": "Nigeria",
      "id": "fraud_model_registry",
      "kind": "MODEL",
      "localTarget": null,
      "location": "Lagos DC B",
      "name": "Fraud Transaction Model",
      "owner": "Risk Analytics",
      "posture": "local",
      "remediation": "Keep model card, feature lineage, and approval evidence linked.",
      "system": "Model registry",
      "volume": "v14 production",
      "x": 62.0,
      "y": 73.0,
      "zone": "LOCAL"
    }
  ],
  "bank": {
    "country": "Nigeria",
    "id": "kudora-bank-plc",
    "metastore": "kudora_main_metastore",
    "name": "Kudora Bank Plc",
    "regulator": "Central Bank of Nigeria",
    "story": "Fully synthetic tier-1 Nigerian bank onboarded into Compliance Control Room for payment-data residency, market-share returns, ownership evidence, and transaction lineage review."
  },
  "catalogMetadata": {
    "accounts_account_master": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "core_banking",
      "classification": "Restricted banking record",
      "columns": [
        {
          "classification": "Account number",
          "name": "account_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "Product code",
          "name": "product_code",
          "type": "STRING"
        },
        {
          "classification": "Mandate",
          "name": "mandate_status",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "account_master",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Core Banking: OWNER"
      ],
      "schema": "accounts",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Account identity and mandate reference for payments, statements, and dispute workflows."
    },
    "agency_cash_io": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "digital_channels",
      "classification": "Sensitive payment event",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "agency_txn_id",
          "type": "STRING"
        },
        {
          "classification": "Agent ID",
          "name": "agent_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "Payment amount",
          "name": "amount_ngn",
          "type": "DECIMAL(18,2)"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "cash_in_cash_out",
      "permissions": [
        "Agency Banking: OWNER",
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA"
      ],
      "schema": "agency",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Cash-in, cash-out, wallet movement, and agent terminal payment evidence."
    },
    "aml_alerts": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "risk_financial_crime",
      "classification": "Financial crime evidence",
      "columns": [
        {
          "classification": "Alert reason",
          "name": "alert_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "Counterparty",
          "name": "counterparty_account",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "aml_alerts",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Financial Crime: OWNER"
      ],
      "schema": "aml",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "AML case alerts linked to transaction journal, NIP transfers, and customer risk."
    },
    "api_call_metrics": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "digital_channels",
      "classification": "Operational evidence",
      "columns": [
        {
          "classification": "API metric",
          "name": "metric_id",
          "type": "STRING"
        },
        {
          "classification": "API metric",
          "name": "endpoint",
          "type": "STRING"
        },
        {
          "classification": "Response time",
          "name": "p95_ms",
          "type": "INTEGER"
        },
        {
          "classification": "Availability",
          "name": "availability_pct",
          "type": "DECIMAL(5,2)"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "api_call_metrics",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Open Banking: OWNER"
      ],
      "schema": "open_banking",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "API performance KPIs and incident triggers for CBN open banking evidence."
    },
    "atm_pos_transactions": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Sensitive payment event",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "PAN token",
          "name": "pan_token",
          "type": "STRING"
        },
        {
          "classification": "Terminal ID",
          "name": "terminal_id",
          "type": "STRING"
        },
        {
          "classification": "Merchant ID",
          "name": "merchant_id",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "atm_pos_transactions",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Cards: OWNER",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA"
      ],
      "schema": "cards",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "ATM and POS ledger-facing transaction facts and exception markers."
    },
    "card_auth_event_stream": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Sensitive payment event",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "auth_id",
          "type": "STRING"
        },
        {
          "classification": "PAN token",
          "name": "pan_token",
          "type": "STRING"
        },
        {
          "classification": "Merchant ID",
          "name": "merchant_id",
          "type": "STRING"
        },
        {
          "classification": "Terminal ID",
          "name": "terminal_id",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "card_auth_event_stream",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Cards: OWNER",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA"
      ],
      "schema": "cards",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Card authorization stream used by fraud scoring, POS observability, and chargeback evidence."
    },
    "card_token_vault": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Highly restricted card data",
      "columns": [
        {
          "classification": "PAN token",
          "name": "token_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "Cryptographic key reference",
          "name": "hsm_key_ref",
          "type": "STRING"
        },
        {
          "classification": "PAN token",
          "name": "token_status",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "card_token_vault",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Cards: OWNER",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA"
      ],
      "schema": "cards",
      "tableType": "VOLUME",
      "type": "Volume",
      "ucType": "VOLUME",
      "usage": "Token lookup and HSM-protected card reference data for authorization flows."
    },
    "chargeback_cases": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Confidential dispute record",
      "columns": [
        {
          "classification": "Dispute evidence",
          "name": "case_id",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "PAN token",
          "name": "pan_token",
          "type": "STRING"
        },
        {
          "classification": "Dispute evidence",
          "name": "case_status",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "chargeback_cases",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Disputes Operations: OWNER"
      ],
      "schema": "settlement",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Customer dispute, chargeback, provisional credit, and evidence case facts."
    },
    "customers_customer_master": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "core_banking",
      "classification": "Confidential customer record",
      "columns": [
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "BVN",
          "name": "bvn_hash",
          "type": "STRING"
        },
        {
          "classification": "KYC profile",
          "name": "kyc_tier",
          "type": "STRING"
        },
        {
          "classification": "Contact detail",
          "name": "residency_state",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "customer_master",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Customer Data Office: OWNER"
      ],
      "schema": "customers",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Authoritative customer identity used by accounts, channels, and regulatory reporting."
    },
    "executive_bi_extract": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "external_shares",
      "classification": "De-identified management reporting",
      "columns": [
        {
          "classification": "Daily aggregate",
          "name": "business_date",
          "type": "DATE"
        },
        {
          "classification": "Merchant segment",
          "name": "merchant_segment",
          "type": "STRING"
        },
        {
          "classification": "Revenue bucket",
          "name": "revenue_bucket",
          "type": "STRING"
        },
        {
          "classification": "Daily aggregate",
          "name": "txn_count",
          "type": "LONG"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "executive_bi_extract",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Finance: OWNER"
      ],
      "schema": "cloud_exports",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Executive revenue and market-share aggregate exported to external BI tooling."
    },
    "fraud_feature_store": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "risk_financial_crime",
      "classification": "Derived risk intelligence",
      "columns": [
        {
          "classification": "Customer identifier",
          "name": "entity_id",
          "type": "STRING"
        },
        {
          "classification": "Velocity features",
          "name": "txn_velocity_10m",
          "type": "DOUBLE"
        },
        {
          "classification": "Device score",
          "name": "device_risk_score",
          "type": "DOUBLE"
        },
        {
          "classification": "Merchant risk",
          "name": "merchant_risk_score",
          "type": "DOUBLE"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "fraud_feature_store",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Risk Analytics: OWNER"
      ],
      "schema": "fraud",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Derived fraud features for card, NIP, and channel risk scoring."
    },
    "fraud_model_registry": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "risk_financial_crime",
      "classification": "AI model governance",
      "columns": [
        {
          "classification": "Model artifact",
          "name": "model_version",
          "type": "STRING"
        },
        {
          "classification": "Feature lineage",
          "name": "feature_set_id",
          "type": "STRING"
        },
        {
          "classification": "Model artifact",
          "name": "approval_status",
          "type": "STRING"
        },
        {
          "classification": "Decision score",
          "name": "auc_score",
          "type": "DOUBLE"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "fraud_transaction_model",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Risk Analytics: OWNER"
      ],
      "schema": "fraud",
      "tableType": "MODEL",
      "type": "Model",
      "ucType": "MODEL",
      "usage": "Registered model and versions used for payment fraud scoring."
    },
    "internet_banking_payments": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "digital_channels",
      "classification": "Sensitive payment event",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "payment_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "Beneficiary account",
          "name": "beneficiary_account",
          "type": "STRING"
        },
        {
          "classification": "Payment amount",
          "name": "amount_ngn",
          "type": "DECIMAL(18,2)"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "internet_banking_payments",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Digital Banking: OWNER"
      ],
      "schema": "internet",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Internet banking transfer and bill-payment instructions before switch routing."
    },
    "ledger_dr_backups": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "resilience",
      "classification": "Critical payment continuity",
      "columns": [
        {
          "classification": "Ledger snapshot",
          "name": "snapshot_id",
          "type": "STRING"
        },
        {
          "classification": "Ledger snapshot",
          "name": "journal_date",
          "type": "DATE"
        },
        {
          "classification": "Evidence pointer",
          "name": "storage_key",
          "type": "STRING"
        },
        {
          "classification": "Control test",
          "name": "encryption_status",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "ledger_dr_backups",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Infrastructure: OWNER"
      ],
      "schema": "backup_vault",
      "tableType": "VOLUME",
      "type": "Volume",
      "ucType": "VOLUME",
      "usage": "Disaster recovery snapshots for regulated payment systems and settlement state."
    },
    "ledger_posting_events": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "core_banking",
      "classification": "Restricted payment operations",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "event_id",
          "type": "STRING"
        },
        {
          "classification": "Ledger entry",
          "name": "journal_id",
          "type": "STRING"
        },
        {
          "classification": "Posting status",
          "name": "posting_status",
          "type": "STRING"
        },
        {
          "classification": "Reversal marker",
          "name": "reversal_marker",
          "type": "BOOLEAN"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "posting_events_stream",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Core Banking: OWNER"
      ],
      "schema": "ledger",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Near-real-time posting state consumed by channels, fraud, settlement, and agent evidence."
    },
    "ledger_transaction_journal": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "core_banking",
      "classification": "Critical financial record",
      "columns": [
        {
          "classification": "Ledger entry",
          "name": "journal_id",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "Account number",
          "name": "account_id",
          "type": "STRING"
        },
        {
          "classification": "Posting amount",
          "name": "amount_ngn",
          "type": "DECIMAL(18,2)"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "transaction_journal",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Core Banking: OWNER"
      ],
      "schema": "ledger",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Authoritative debit and credit journal for every customer and internal posting."
    },
    "local_kafka_mirror": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "resilience",
      "classification": "Continuity evidence",
      "columns": [
        {
          "classification": "Evidence pointer",
          "name": "topic_name",
          "type": "STRING"
        },
        {
          "classification": "Replay offset",
          "name": "source_offset",
          "type": "LONG"
        },
        {
          "classification": "Replay offset",
          "name": "local_offset",
          "type": "LONG"
        },
        {
          "classification": "Control test",
          "name": "lag_seconds",
          "type": "INTEGER"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "local_kafka_mirror",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Infrastructure: OWNER"
      ],
      "schema": "event_mirror",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Local mirror topics for card auth, postings, observability, and channel events."
    },
    "merchant_transactions": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Restricted payment operations",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "merchant_txn_id",
          "type": "STRING"
        },
        {
          "classification": "Merchant ID",
          "name": "merchant_id",
          "type": "STRING"
        },
        {
          "classification": "Terminal ID",
          "name": "terminal_id",
          "type": "STRING"
        },
        {
          "classification": "Payment amount",
          "name": "amount_ngn",
          "type": "DECIMAL(18,2)"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "merchant_transactions",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Merchant Acquiring: OWNER"
      ],
      "schema": "merchant_acquiring",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Merchant acquiring transaction facts for settlement, returns, and concentration monitoring."
    },
    "mobile_session_events": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "digital_channels",
      "classification": "Operational evidence with payment context",
      "columns": [
        {
          "classification": "Session ID",
          "name": "session_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id_hash",
          "type": "STRING"
        },
        {
          "classification": "Device ID",
          "name": "device_id",
          "type": "STRING"
        },
        {
          "classification": "API payload fragment",
          "name": "payload_hint",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "session_events",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Digital Banking: OWNER"
      ],
      "schema": "mobile",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Mobile session telemetry includes payment journey events and partial request payloads."
    },
    "mobile_transfer_initiations": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "digital_channels",
      "classification": "Sensitive payment event",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "initiation_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "Device ID",
          "name": "device_id",
          "type": "STRING"
        },
        {
          "classification": "Beneficiary account",
          "name": "beneficiary_account",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "transfer_initiations",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Digital Banking: OWNER"
      ],
      "schema": "mobile",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Customer-originated mobile transfer intents before NIP routing and ledger posting."
    },
    "monthly_market_share_return": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "regulatory_reporting",
      "classification": "Regulatory return",
      "columns": [
        {
          "classification": "Market share",
          "name": "reporting_month",
          "type": "DATE"
        },
        {
          "classification": "Market share",
          "name": "consumer_issuing_share_pct",
          "type": "DOUBLE"
        },
        {
          "classification": "Market share",
          "name": "merchant_acquiring_share_pct",
          "type": "DOUBLE"
        },
        {
          "classification": "Regulatory return",
          "name": "submitted_status",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "monthly_market_share_return",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Regulatory Reporting: OWNER"
      ],
      "schema": "cbn_returns",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Monthly issuing, acquiring, and transaction share return prepared for CBN submission."
    },
    "nibss_gateway_adapter": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Restricted payment operations",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "request_id",
          "type": "STRING"
        },
        {
          "classification": "Payment instruction",
          "name": "source_bank_code",
          "type": "STRING"
        },
        {
          "classification": "Payment instruction",
          "name": "beneficiary_bank_code",
          "type": "STRING"
        },
        {
          "classification": "Settlement reference",
          "name": "settlement_reference",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "nibss_gateway_adapter",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Payments Platform: OWNER"
      ],
      "schema": "nibss_nip",
      "tableType": "FUNCTION",
      "type": "Function",
      "ucType": "FUNCTION",
      "usage": "Primary NIP switch adapter and canonical routing context for interbank transfers."
    },
    "nip_inbound_transfers": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Sensitive payment event",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "nip_session_id",
          "type": "STRING"
        },
        {
          "classification": "Originator account",
          "name": "originator_account",
          "type": "STRING"
        },
        {
          "classification": "Beneficiary account",
          "name": "beneficiary_account",
          "type": "STRING"
        },
        {
          "classification": "Payment instruction",
          "name": "amount_ngn",
          "type": "DECIMAL(18,2)"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "nip_inbound_transfers",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Payments Platform: OWNER"
      ],
      "schema": "nibss_nip",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Inbound interbank transfer records from NIBSS, reconciled to ledger postings."
    },
    "nip_outbound_transfers": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Sensitive payment event",
      "columns": [
        {
          "classification": "Transaction ID",
          "name": "nip_session_id",
          "type": "STRING"
        },
        {
          "classification": "Originator account",
          "name": "originator_account",
          "type": "STRING"
        },
        {
          "classification": "Beneficiary account",
          "name": "beneficiary_account",
          "type": "STRING"
        },
        {
          "classification": "Payment instruction",
          "name": "response_code",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "nip_outbound_transfers",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Payments Platform: OWNER"
      ],
      "schema": "nibss_nip",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Outbound interbank transfer records and switch acknowledgements."
    },
    "open_banking_consent_events": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "digital_channels",
      "classification": "Consent evidence",
      "columns": [
        {
          "classification": "Customer consent",
          "name": "consent_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id",
          "type": "STRING"
        },
        {
          "classification": "API consumer",
          "name": "api_consumer_id",
          "type": "STRING"
        },
        {
          "classification": "Scope",
          "name": "scope",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "consent_events",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Open Banking: OWNER"
      ],
      "schema": "open_banking",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Consent creation, expiry, revocation, and API consumer scope evidence."
    },
    "ops_agent_memory": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "operational_evidence",
      "classification": "Filtered operational memory",
      "columns": [
        {
          "classification": "Evidence pointer",
          "name": "memory_id",
          "type": "STRING"
        },
        {
          "classification": "Incident summary",
          "name": "incident_id",
          "type": "STRING"
        },
        {
          "classification": "Runbook step",
          "name": "chunk_text",
          "type": "STRING"
        },
        {
          "classification": "Evidence pointer",
          "name": "source_asset",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "ops_agent_memory",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Operations: OWNER"
      ],
      "schema": "agent_context",
      "tableType": "VOLUME",
      "type": "Volume",
      "ucType": "VOLUME",
      "usage": "Incident summaries, runbook recall, and evidence pointers for governed agent work."
    },
    "payment_api_logs": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "operational_evidence",
      "classification": "Operational evidence with payload fragments",
      "columns": [
        {
          "classification": "Evidence pointer",
          "name": "log_id",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "Session ID",
          "name": "session_id",
          "type": "STRING"
        },
        {
          "classification": "API payload fragment",
          "name": "payload_fragment",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "payment_api_logs",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "SRE: OWNER"
      ],
      "schema": "observability",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Runtime payment API logs used for incident triage, SLA evidence, and agent debugging."
    },
    "sanctions_screening_events": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "risk_financial_crime",
      "classification": "Financial crime evidence with payment context",
      "columns": [
        {
          "classification": "Screening result",
          "name": "screening_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "party_hash",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "Screening result",
          "name": "match_outcome",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "sanctions_screening_events",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Financial Crime: OWNER"
      ],
      "schema": "aml",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Payment and customer screening events from a third-party sanctions provider."
    },
    "settlement_positions": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "payments",
      "classification": "Critical financial record",
      "columns": [
        {
          "classification": "Settlement reference",
          "name": "settlement_date",
          "type": "DATE"
        },
        {
          "classification": "Settlement reference",
          "name": "scheme",
          "type": "STRING"
        },
        {
          "classification": "Payment amount",
          "name": "net_amount_ngn",
          "type": "DECIMAL(18,2)"
        },
        {
          "classification": "Ledger entry",
          "name": "ledger_journal_id",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "daily_settlement_positions",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Treasury Operations: OWNER"
      ],
      "schema": "settlement",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Daily NIBSS, card, and merchant settlement positions tied to ledger postings."
    },
    "siem_payment_security_events": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "operational_evidence",
      "classification": "Security evidence",
      "columns": [
        {
          "classification": "Incident marker",
          "name": "event_id",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "Device ID",
          "name": "device_id",
          "type": "STRING"
        },
        {
          "classification": "Control test",
          "name": "rule_id",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "siem_payment_security_events",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Security Operations: OWNER"
      ],
      "schema": "observability",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Security detections and incident evidence for payment systems and channels."
    },
    "support_payment_tickets": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "operational_evidence",
      "classification": "Support evidence with payment references",
      "columns": [
        {
          "classification": "Support note",
          "name": "ticket_id",
          "type": "STRING"
        },
        {
          "classification": "Customer identifier",
          "name": "customer_id_hash",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id",
          "type": "STRING"
        },
        {
          "classification": "Dispute evidence",
          "name": "issue_type",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "support_payment_tickets",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Customer Support: OWNER"
      ],
      "schema": "observability",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "Payment-related support tickets and dispute notes copied from customer service SaaS."
    },
    "transaction_residency_evidence": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "regulatory_reporting",
      "classification": "Regulatory evidence",
      "columns": [
        {
          "classification": "Evidence pointer",
          "name": "asset_full_name",
          "type": "STRING"
        },
        {
          "classification": "Storage location",
          "name": "storage_country",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "sample_txn_id",
          "type": "STRING"
        },
        {
          "classification": "Control test",
          "name": "control_result",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "transaction_residency_evidence",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: OWNER",
        "Compliance Operations: READ_METADATA"
      ],
      "schema": "cbn_returns",
      "tableType": "MANAGED",
      "type": "Managed table",
      "ucType": "TABLE",
      "usage": "Asset-by-asset residency evidence and exceptions for Nigeria-generated transaction data."
    },
    "ubo_disclosure_pack": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "regulatory_reporting",
      "classification": "Corporate governance evidence",
      "columns": [
        {
          "classification": "Evidence pointer",
          "name": "file_path",
          "type": "STRING"
        },
        {
          "classification": "UBO record",
          "name": "shareholder_id",
          "type": "STRING"
        },
        {
          "classification": "Board approval",
          "name": "approval_date",
          "type": "DATE"
        },
        {
          "classification": "Evidence pointer",
          "name": "attestation_status",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "ubo_disclosure_pack",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Legal and Compliance: OWNER"
      ],
      "schema": "governance",
      "tableType": "VOLUME",
      "type": "Volume",
      "ucType": "VOLUME",
      "usage": "UBO, shareholder, board, and request-ready CBN evidence bundle."
    },
    "vendor_fraud_scores": {
      "agentActions": [
        "Point agent to this asset",
        "Summarize residency risk",
        "Find upstream transaction sources",
        "Draft evidence request"
      ],
      "catalog": "external_shares",
      "classification": "Third-party payment risk signal",
      "columns": [
        {
          "classification": "Decision score",
          "name": "score_id",
          "type": "STRING"
        },
        {
          "classification": "Transaction ID",
          "name": "txn_id_hash",
          "type": "STRING"
        },
        {
          "classification": "Device score",
          "name": "device_score",
          "type": "DOUBLE"
        },
        {
          "classification": "Decision score",
          "name": "decision",
          "type": "STRING"
        }
      ],
      "evidence": [
        "Access",
        "Inventory",
        "Lineage"
      ],
      "object": "vendor_fraud_scores",
      "permissions": [
        "Auditors: READ_EVIDENCE",
        "Compliance Agent: SELECT",
        "Compliance Operations: READ_METADATA",
        "Risk Analytics: OWNER"
      ],
      "schema": "vendor_risk",
      "tableType": "EXTERNAL",
      "type": "External table",
      "ucType": "TABLE",
      "usage": "External fraud score response for high-risk card and NIP transactions."
    }
  },
  "catalogs": [
    {
      "displayName": "AI Governance",
      "name": "ai_governance",
      "owner": "Operations",
      "storageLocation": "Lagos DC A"
    },
    {
      "displayName": "Core Banking",
      "name": "core_banking",
      "owner": "Core Banking Data Office",
      "storageLocation": "Lagos DC A"
    },
    {
      "displayName": "Digital Channels",
      "name": "digital_channels",
      "owner": "Digital Banking",
      "storageLocation": "Lagos DC A"
    },
    {
      "displayName": "External Shares",
      "name": "external_shares",
      "owner": "Data Governance",
      "storageLocation": "Mixed"
    },
    {
      "displayName": "Operational Evidence",
      "name": "operational_evidence",
      "owner": "SRE",
      "storageLocation": "Lagos DC B"
    },
    {
      "displayName": "Payments",
      "name": "payments",
      "owner": "Payments Platform",
      "storageLocation": "Lagos DC A"
    },
    {
      "displayName": "Regulatory Reporting",
      "name": "regulatory_reporting",
      "owner": "Compliance Operations",
      "storageLocation": "Lagos DC A"
    },
    {
      "displayName": "Resilience",
      "name": "resilience",
      "owner": "Infrastructure",
      "storageLocation": "Abuja DR Site"
    },
    {
      "displayName": "Risk and Financial Crime",
      "name": "risk_financial_crime",
      "owner": "Risk Analytics",
      "storageLocation": "Lagos DC B"
    }
  ],
  "complianceFeedGroups": [
    {
      "items": [
        {
          "assets": [
            "ATM and POS Transactions",
            "Card Auth Event Stream",
            "Internet Banking Payments",
            "Ledger DR Backups",
            "Merchant Transactions",
            "Mobile Session Events",
            "Mobile Transfer Initiations",
            "NIBSS Gateway Adapter",
            "NIP Inbound Transfers",
            "NIP Outbound Transfers",
            "Payment API Logs",
            "Posting Events Stream",
            "Sanctions Screening Events",
            "Support Payment Tickets",
            "Transaction Journal",
            "Vendor Fraud Scores"
          ],
          "basis": "Circular item 2",
          "body": "All Nigeria-generated payment transaction data, processing evidence, and recovery copies must be resident and operationally managed in Nigeria.",
          "deadline": "2027-01-01",
          "evidence": "Linked catalog evidence",
          "id": "cbn-payment-data-residency",
          "owner": "Compliance PMO / Infrastructure",
          "status": "open",
          "title": "Nigeria-generated payment transaction data stored and managed in Nigeria",
          "type": "CBN obligation"
        },
        {
          "assets": [
            "API Call Metrics",
            "Open Banking Consent Events",
            "Payment API Logs",
            "SIEM Payment Security Events"
          ],
          "basis": "Open banking evidence control",
          "body": "Retain consent lifecycle, API consumer identity, availability, response-time, and incident evidence for payment APIs.",
          "deadline": "Monthly",
          "evidence": "Linked catalog evidence",
          "id": "cbn-open-banking-evidence",
          "owner": "Open Banking",
          "status": "open",
          "title": "Open banking consent and API performance evidence",
          "type": "Control evidence"
        }
      ],
      "label": "Today"
    },
    {
      "items": [
        {
          "assets": [
            "Daily Settlement Positions",
            "Executive BI Extract",
            "Merchant Transactions",
            "Monthly Market Share Return"
          ],
          "basis": "Circular item 3(iii)",
          "body": "Submit issuing and acquiring market-share returns using CBN-prescribed templates, source lineage, and sign-off evidence.",
          "deadline": "Monthly",
          "evidence": "Linked catalog evidence",
          "id": "cbn-market-share-returns",
          "owner": "Regulatory Reporting",
          "status": "draft",
          "title": "Monthly market-share returns",
          "type": "Regulatory return"
        },
        {
          "assets": [
            "Card Auth Event Stream",
            "Ledger DR Backups",
            "Local Kafka Mirror",
            "Ops Agent Memory",
            "Payment API Logs",
            "Transaction Residency Evidence"
          ],
          "basis": "Catalog control",
          "body": "All payment data assets should link to source obligations, owners, locations, lineage routes, permissions, and evidence artifacts.",
          "deadline": "This week",
          "evidence": "Linked catalog evidence",
          "id": "cbn-audit-ready-lineage",
          "owner": "Data Governance",
          "status": "new",
          "title": "Catalog lineage and evidence traceability",
          "type": "Catalog control"
        }
      ],
      "label": "This Week"
    },
    {
      "items": [
        {
          "assets": [
            "ATM and POS Transactions",
            "Merchant Transactions",
            "Monthly Market Share Return"
          ],
          "basis": "Circular item 3",
          "body": "Monitor whether consumer issuing and merchant acquiring concentration thresholds are breached in the same rolling period.",
          "deadline": "2026-12-31",
          "evidence": "Linked catalog evidence",
          "id": "cbn-concentration-limits",
          "owner": "Strategy / Regulatory Reporting",
          "status": "watch",
          "title": "Issuing/acquiring concentration limits",
          "type": "Policy update"
        },
        {
          "assets": [
            "Ops Agent Memory",
            "UBO Disclosure Pack"
          ],
          "basis": "Circular item 1",
          "body": "Maintain significant shareholder, ultimate beneficial ownership, board approval, and attestation evidence for CBN request.",
          "deadline": "On request",
          "evidence": "Linked catalog evidence",
          "id": "cbn-ubo-disclosure",
          "owner": "Legal / Compliance",
          "status": "watch",
          "title": "UBO disclosure pack available on request",
          "type": "Evidence event"
        }
      ],
      "label": "Upcoming"
    },
    {
      "items": [
        {
          "assets": [
            "Kudora Bank Plc"
          ],
          "basis": "Synthetic onboarding",
          "body": "SQLite-backed catalog, lineage, permissions, evidence, and obligations created for CCR prototype.",
          "deadline": "2026-06-30",
          "evidence": "Seeded database",
          "id": "seed-import",
          "owner": "Data Governance",
          "status": "complete",
          "title": "Kudora synthetic bank catalog seeded",
          "type": "Policy intake"
        }
      ],
      "label": "Historical"
    }
  ],
  "routes": [
    [
      "customers_customer_master",
      "accounts_account_master"
    ],
    [
      "accounts_account_master",
      "mobile_transfer_initiations"
    ],
    [
      "accounts_account_master",
      "internet_banking_payments"
    ],
    [
      "mobile_transfer_initiations",
      "nibss_gateway_adapter"
    ],
    [
      "internet_banking_payments",
      "nibss_gateway_adapter"
    ],
    [
      "nibss_gateway_adapter",
      "nip_outbound_transfers"
    ],
    [
      "nibss_gateway_adapter",
      "nip_inbound_transfers"
    ],
    [
      "nip_outbound_transfers",
      "ledger_posting_events"
    ],
    [
      "nip_inbound_transfers",
      "ledger_posting_events"
    ],
    [
      "ledger_posting_events",
      "ledger_transaction_journal"
    ],
    [
      "card_token_vault",
      "card_auth_event_stream"
    ],
    [
      "card_auth_event_stream",
      "atm_pos_transactions"
    ],
    [
      "atm_pos_transactions",
      "merchant_transactions"
    ],
    [
      "merchant_transactions",
      "settlement_positions"
    ],
    [
      "ledger_transaction_journal",
      "settlement_positions"
    ],
    [
      "settlement_positions",
      "monthly_market_share_return"
    ],
    [
      "merchant_transactions",
      "monthly_market_share_return"
    ],
    [
      "card_auth_event_stream",
      "fraud_feature_store"
    ],
    [
      "nip_outbound_transfers",
      "fraud_feature_store"
    ],
    [
      "fraud_feature_store",
      "fraud_model_registry"
    ],
    [
      "fraud_model_registry",
      "vendor_fraud_scores"
    ],
    [
      "vendor_fraud_scores",
      "aml_alerts"
    ],
    [
      "ledger_transaction_journal",
      "aml_alerts"
    ],
    [
      "ledger_transaction_journal",
      "ledger_dr_backups"
    ],
    [
      "card_auth_event_stream",
      "local_kafka_mirror"
    ],
    [
      "payment_api_logs",
      "ops_agent_memory"
    ],
    [
      "siem_payment_security_events",
      "ops_agent_memory"
    ],
    [
      "support_payment_tickets",
      "chargeback_cases"
    ],
    [
      "chargeback_cases",
      "transaction_residency_evidence"
    ],
    [
      "ledger_transaction_journal",
      "transaction_residency_evidence"
    ],
    [
      "payment_api_logs",
      "transaction_residency_evidence"
    ],
    [
      "ubo_disclosure_pack",
      "ops_agent_memory"
    ],
    [
      "monthly_market_share_return",
      "executive_bi_extract"
    ]
  ],
  "schemas": [
    {
      "catalog": "ai_governance",
      "comment": "Model registry and evaluation state",
      "name": "models",
      "owner": "Operations"
    },
    {
      "catalog": "core_banking",
      "comment": "Account, balance, and mandate records",
      "name": "accounts",
      "owner": "Core Banking Data Office"
    },
    {
      "catalog": "core_banking",
      "comment": "Customer master and KYC reference data",
      "name": "customers",
      "owner": "Core Banking Data Office"
    },
    {
      "catalog": "core_banking",
      "comment": "Posting ledger and journal state",
      "name": "ledger",
      "owner": "Core Banking Data Office"
    },
    {
      "catalog": "core_banking",
      "comment": "Loan repayment and direct debit state",
      "name": "loans",
      "owner": "Core Banking Data Office"
    },
    {
      "catalog": "digital_channels",
      "comment": "Agency and branchless banking records",
      "name": "agency",
      "owner": "Digital Banking"
    },
    {
      "catalog": "digital_channels",
      "comment": "Internet banking event and payment tables",
      "name": "internet",
      "owner": "Digital Banking"
    },
    {
      "catalog": "digital_channels",
      "comment": "Mobile banking event and payment tables",
      "name": "mobile",
      "owner": "Digital Banking"
    },
    {
      "catalog": "digital_channels",
      "comment": "Consent and partner API evidence",
      "name": "open_banking",
      "owner": "Digital Banking"
    },
    {
      "catalog": "external_shares",
      "comment": "External cloud analytics exports",
      "name": "cloud_exports",
      "owner": "Data Governance"
    },
    {
      "catalog": "external_shares",
      "comment": "Third-party risk and vendor interfaces",
      "name": "vendor_risk",
      "owner": "Data Governance"
    },
    {
      "catalog": "operational_evidence",
      "comment": "Agent memory and RAG context",
      "name": "agent_context",
      "owner": "SRE"
    },
    {
      "catalog": "operational_evidence",
      "comment": "Logs, traces, SIEM, and support evidence",
      "name": "observability",
      "owner": "SRE"
    },
    {
      "catalog": "payments",
      "comment": "Card authorization and token tables",
      "name": "cards",
      "owner": "Payments Platform"
    },
    {
      "catalog": "payments",
      "comment": "Merchant acquiring and POS activity",
      "name": "merchant_acquiring",
      "owner": "Payments Platform"
    },
    {
      "catalog": "payments",
      "comment": "NIP and NIBSS switching tables",
      "name": "nibss_nip",
      "owner": "Payments Platform"
    },
    {
      "catalog": "payments",
      "comment": "Settlement, clearing, and dispute records",
      "name": "settlement",
      "owner": "Payments Platform"
    },
    {
      "catalog": "regulatory_reporting",
      "comment": "CBN reporting marts and return packs",
      "name": "cbn_returns",
      "owner": "Compliance Operations"
    },
    {
      "catalog": "regulatory_reporting",
      "comment": "Ownership, policy, and control evidence",
      "name": "governance",
      "owner": "Compliance Operations"
    },
    {
      "catalog": "resilience",
      "comment": "Backup and restore evidence",
      "name": "backup_vault",
      "owner": "Infrastructure"
    },
    {
      "catalog": "resilience",
      "comment": "Local mirrors and replay topics",
      "name": "event_mirror",
      "owner": "Infrastructure"
    },
    {
      "catalog": "risk_financial_crime",
      "comment": "AML monitoring and sanctions evidence",
      "name": "aml",
      "owner": "Risk Analytics"
    },
    {
      "catalog": "risk_financial_crime",
      "comment": "Fraud features, alerts, and model state",
      "name": "fraud",
      "owner": "Risk Analytics"
    }
  ],
  "source": {
    "generatedBy": "app/seed_catalog.py",
    "sqlite": "data/kudora_control_room.sqlite"
  },
  "unityCatalogModel": {
    "namespace": "catalog.schema.asset",
    "notes": "Mirrors the OSS Unity Catalog three-level namespace and securable asset model for CCR.",
    "resources": [
      "metastore",
      "catalog",
      "schema",
      "table",
      "volume",
      "function",
      "registered_model",
      "permissions"
    ]
  }
};
