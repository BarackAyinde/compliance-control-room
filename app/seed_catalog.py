"""Seed a synthetic Unity-Catalog-like bank catalog for the CCR prototype.

The generated SQLite database is the durable source of truth. A compact browser
bootstrap is also exported so the static prototype can render the seeded catalog
without a backend API server.
"""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
DB_PATH = DATA_DIR / "kudora_control_room.sqlite"
BOOTSTRAP_PATH = DATA_DIR / "catalog_bootstrap.js"


BANK = {
    "id": "kudora-bank-plc",
    "name": "Kudora Bank Plc",
    "country": "Nigeria",
    "regulator": "Central Bank of Nigeria",
    "metastore": "kudora_main_metastore",
    "story": (
        "Fully synthetic tier-1 Nigerian bank onboarded into Compliance Control "
        "Room for payment-data residency, market-share returns, ownership "
        "evidence, and transaction lineage review."
    ),
}


CATALOGS = [
    ("core_banking", "Core Banking", "Core Banking Data Office", "Lagos DC A"),
    ("payments", "Payments", "Payments Platform", "Lagos DC A"),
    ("digital_channels", "Digital Channels", "Digital Banking", "Lagos DC A"),
    ("risk_financial_crime", "Risk and Financial Crime", "Risk Analytics", "Lagos DC B"),
    ("regulatory_reporting", "Regulatory Reporting", "Compliance Operations", "Lagos DC A"),
    ("operational_evidence", "Operational Evidence", "SRE", "Lagos DC B"),
    ("resilience", "Resilience", "Infrastructure", "Abuja DR Site"),
    ("ai_governance", "AI Governance", "Operations", "Lagos DC A"),
    ("external_shares", "External Shares", "Data Governance", "Mixed"),
]


SCHEMAS = [
    ("core_banking", "customers", "Customer master and KYC reference data"),
    ("core_banking", "accounts", "Account, balance, and mandate records"),
    ("core_banking", "ledger", "Posting ledger and journal state"),
    ("core_banking", "loans", "Loan repayment and direct debit state"),
    ("payments", "nibss_nip", "NIP and NIBSS switching tables"),
    ("payments", "cards", "Card authorization and token tables"),
    ("payments", "settlement", "Settlement, clearing, and dispute records"),
    ("payments", "merchant_acquiring", "Merchant acquiring and POS activity"),
    ("digital_channels", "mobile", "Mobile banking event and payment tables"),
    ("digital_channels", "internet", "Internet banking event and payment tables"),
    ("digital_channels", "agency", "Agency and branchless banking records"),
    ("digital_channels", "open_banking", "Consent and partner API evidence"),
    ("risk_financial_crime", "fraud", "Fraud features, alerts, and model state"),
    ("risk_financial_crime", "aml", "AML monitoring and sanctions evidence"),
    ("regulatory_reporting", "cbn_returns", "CBN reporting marts and return packs"),
    ("regulatory_reporting", "governance", "Ownership, policy, and control evidence"),
    ("operational_evidence", "observability", "Logs, traces, SIEM, and support evidence"),
    ("operational_evidence", "agent_context", "Agent memory and RAG context"),
    ("resilience", "backup_vault", "Backup and restore evidence"),
    ("resilience", "event_mirror", "Local mirrors and replay topics"),
    ("ai_governance", "models", "Model registry and evaluation state"),
    ("external_shares", "cloud_exports", "External cloud analytics exports"),
    ("external_shares", "vendor_risk", "Third-party risk and vendor interfaces"),
]


ASSETS = [
    {
        "id": "customers_customer_master",
        "catalog": "core_banking",
        "schema": "customers",
        "object": "customer_master",
        "name": "Customer Master",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Customer Data Office",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Customer identifier", "BVN", "KYC profile", "Contact detail"],
        "volume": "12.4m customers",
        "x": 19,
        "y": 26,
        "posture": "local",
        "system": "Core banking MDM",
        "classification": "Confidential customer record",
        "usage": "Authoritative customer identity used by accounts, channels, and regulatory reporting.",
        "remediation": "Keep PII local and maintain quarterly access review evidence.",
        "columns": [
            ("customer_id", "STRING", "Customer identifier"),
            ("bvn_hash", "STRING", "BVN"),
            ("kyc_tier", "STRING", "KYC profile"),
            ("residency_state", "STRING", "Contact detail"),
        ],
    },
    {
        "id": "accounts_account_master",
        "catalog": "core_banking",
        "schema": "accounts",
        "object": "account_master",
        "name": "Account Master",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Core Banking",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Account number", "Customer identifier", "Mandate", "Product code"],
        "volume": "18.1m accounts",
        "x": 23,
        "y": 36,
        "posture": "local",
        "system": "Core banking account service",
        "classification": "Restricted banking record",
        "usage": "Account identity and mandate reference for payments, statements, and dispute workflows.",
        "remediation": "Keep local; attach mandate access review and data-retention evidence.",
        "columns": [
            ("account_id", "STRING", "Account number"),
            ("customer_id", "STRING", "Customer identifier"),
            ("product_code", "STRING", "Product code"),
            ("mandate_status", "STRING", "Mandate"),
        ],
    },
    {
        "id": "ledger_transaction_journal",
        "catalog": "core_banking",
        "schema": "ledger",
        "object": "transaction_journal",
        "name": "Transaction Journal",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Core Banking",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Ledger entry", "Posting amount", "Transaction ID", "Account number"],
        "volume": "NGN 82bn/day",
        "x": 34,
        "y": 49,
        "posture": "local",
        "system": "Postgres HA ledger",
        "classification": "Critical financial record",
        "usage": "Authoritative debit and credit journal for every customer and internal posting.",
        "remediation": "Keep local; attach immutable audit export and failover attestation.",
        "columns": [
            ("journal_id", "STRING", "Ledger entry"),
            ("txn_id", "STRING", "Transaction ID"),
            ("account_id", "STRING", "Account number"),
            ("amount_ngn", "DECIMAL(18,2)", "Posting amount"),
        ],
    },
    {
        "id": "ledger_posting_events",
        "catalog": "core_banking",
        "schema": "ledger",
        "object": "posting_events_stream",
        "name": "Posting Events Stream",
        "kind": "STREAM",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Core Banking",
        "location": "Lagos DC B",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Posting status", "Transaction ID", "Account number", "Reversal marker"],
        "volume": "21k events/min",
        "x": 40,
        "y": 58,
        "posture": "local",
        "system": "Kafka local cluster",
        "classification": "Restricted payment operations",
        "usage": "Near-real-time posting state consumed by channels, fraud, settlement, and agent evidence.",
        "remediation": "Keep local; prove topic retention and consumer ACLs.",
        "columns": [
            ("event_id", "STRING", "Transaction ID"),
            ("journal_id", "STRING", "Ledger entry"),
            ("posting_status", "STRING", "Posting status"),
            ("reversal_marker", "BOOLEAN", "Reversal marker"),
        ],
    },
    {
        "id": "nibss_gateway_adapter",
        "catalog": "payments",
        "schema": "nibss_nip",
        "object": "nibss_gateway_adapter",
        "name": "NIBSS Gateway Adapter",
        "kind": "FUNCTION",
        "uc_type": "FUNCTION",
        "table_type": "FUNCTION",
        "owner": "Payments Platform",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Payment instruction", "Settlement reference", "Transaction ID"],
        "volume": "18.4k tx/min",
        "x": 46,
        "y": 45,
        "posture": "local",
        "system": "ISO 20022 / NIP bridge",
        "classification": "Restricted payment operations",
        "usage": "Primary NIP switch adapter and canonical routing context for interbank transfers.",
        "remediation": "Keep lineage and key evidence attached to the CBN residency obligation.",
        "columns": [
            ("request_id", "STRING", "Transaction ID"),
            ("source_bank_code", "STRING", "Payment instruction"),
            ("beneficiary_bank_code", "STRING", "Payment instruction"),
            ("settlement_reference", "STRING", "Settlement reference"),
        ],
    },
    {
        "id": "nip_inbound_transfers",
        "catalog": "payments",
        "schema": "nibss_nip",
        "object": "nip_inbound_transfers",
        "name": "NIP Inbound Transfers",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Payments Platform",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Payment instruction", "Beneficiary account", "Originator account", "Transaction ID"],
        "volume": "8.2m/day",
        "x": 44,
        "y": 34,
        "posture": "local",
        "system": "NIP processor",
        "classification": "Sensitive payment event",
        "usage": "Inbound interbank transfer records from NIBSS, reconciled to ledger postings.",
        "remediation": "Keep local and evidence reconciliation coverage.",
        "columns": [
            ("nip_session_id", "STRING", "Transaction ID"),
            ("originator_account", "STRING", "Originator account"),
            ("beneficiary_account", "STRING", "Beneficiary account"),
            ("amount_ngn", "DECIMAL(18,2)", "Payment instruction"),
        ],
    },
    {
        "id": "nip_outbound_transfers",
        "catalog": "payments",
        "schema": "nibss_nip",
        "object": "nip_outbound_transfers",
        "name": "NIP Outbound Transfers",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Payments Platform",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Payment instruction", "Beneficiary account", "Originator account", "Transaction ID"],
        "volume": "7.9m/day",
        "x": 48,
        "y": 37,
        "posture": "local",
        "system": "NIP processor",
        "classification": "Sensitive payment event",
        "usage": "Outbound interbank transfer records and switch acknowledgements.",
        "remediation": "Keep local and attach NIBSS settlement proof.",
        "columns": [
            ("nip_session_id", "STRING", "Transaction ID"),
            ("originator_account", "STRING", "Originator account"),
            ("beneficiary_account", "STRING", "Beneficiary account"),
            ("response_code", "STRING", "Payment instruction"),
        ],
    },
    {
        "id": "card_auth_event_stream",
        "catalog": "payments",
        "schema": "cards",
        "object": "card_auth_event_stream",
        "name": "Card Auth Event Stream",
        "kind": "STREAM",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Cards",
        "location": "AWS eu-west-1",
        "country": "Ireland",
        "zone": "OFFSHORE",
        "classes": ["PAN token", "Merchant ID", "Auth response", "Terminal ID", "Transaction ID"],
        "volume": "6.2k events/min",
        "x": 78,
        "y": 19,
        "posture": "critical",
        "system": "Managed Kafka cluster",
        "classification": "Sensitive payment event",
        "usage": "Card authorization stream used by fraud scoring, POS observability, and chargeback evidence.",
        "remediation": "Mirror to local Kafka, stop raw offshore retention, export only tokenized aggregates.",
        "localTarget": "Lagos DC B",
        "columns": [
            ("auth_id", "STRING", "Transaction ID"),
            ("pan_token", "STRING", "PAN token"),
            ("merchant_id", "STRING", "Merchant ID"),
            ("terminal_id", "STRING", "Terminal ID"),
        ],
    },
    {
        "id": "card_token_vault",
        "catalog": "payments",
        "schema": "cards",
        "object": "card_token_vault",
        "name": "Card Token Vault",
        "kind": "VOLUME",
        "uc_type": "VOLUME",
        "table_type": "VOLUME",
        "owner": "Cards",
        "location": "Lagos HSM Room",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["PAN token", "Cryptographic key reference", "Customer identifier"],
        "volume": "31m active tokens",
        "x": 63,
        "y": 21,
        "posture": "local",
        "system": "PCI token vault",
        "classification": "Highly restricted card data",
        "usage": "Token lookup and HSM-protected card reference data for authorization flows.",
        "remediation": "Keep local; refresh PCI and HSM custody evidence.",
        "columns": [
            ("token_id", "STRING", "PAN token"),
            ("customer_id", "STRING", "Customer identifier"),
            ("hsm_key_ref", "STRING", "Cryptographic key reference"),
            ("token_status", "STRING", "PAN token"),
        ],
    },
    {
        "id": "atm_pos_transactions",
        "catalog": "payments",
        "schema": "cards",
        "object": "atm_pos_transactions",
        "name": "ATM and POS Transactions",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Cards",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["PAN token", "Terminal ID", "Merchant ID", "Transaction ID", "Payment amount"],
        "volume": "3.8m/day",
        "x": 65,
        "y": 28,
        "posture": "local",
        "system": "Card switch warehouse",
        "classification": "Sensitive payment event",
        "usage": "ATM and POS ledger-facing transaction facts and exception markers.",
        "remediation": "Keep local; link to card auth offshore containment plan.",
        "columns": [
            ("txn_id", "STRING", "Transaction ID"),
            ("pan_token", "STRING", "PAN token"),
            ("terminal_id", "STRING", "Terminal ID"),
            ("merchant_id", "STRING", "Merchant ID"),
        ],
    },
    {
        "id": "settlement_positions",
        "catalog": "payments",
        "schema": "settlement",
        "object": "daily_settlement_positions",
        "name": "Daily Settlement Positions",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Treasury Operations",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Settlement reference", "Payment amount", "Counterparty bank", "Ledger entry"],
        "volume": "NGN 91bn/day",
        "x": 52,
        "y": 59,
        "posture": "local",
        "system": "Settlement mart",
        "classification": "Critical financial record",
        "usage": "Daily NIBSS, card, and merchant settlement positions tied to ledger postings.",
        "remediation": "Keep local and attach daily reconciliation evidence.",
        "columns": [
            ("settlement_date", "DATE", "Settlement reference"),
            ("scheme", "STRING", "Settlement reference"),
            ("net_amount_ngn", "DECIMAL(18,2)", "Payment amount"),
            ("ledger_journal_id", "STRING", "Ledger entry"),
        ],
    },
    {
        "id": "chargeback_cases",
        "catalog": "payments",
        "schema": "settlement",
        "object": "chargeback_cases",
        "name": "Chargeback Cases",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Disputes Operations",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["PAN token", "Dispute evidence", "Customer identifier", "Transaction ID"],
        "volume": "18k open cases",
        "x": 58,
        "y": 63,
        "posture": "local",
        "system": "Dispute case manager",
        "classification": "Confidential dispute record",
        "usage": "Customer dispute, chargeback, provisional credit, and evidence case facts.",
        "remediation": "Keep local; evidence exports must be redacted before external sharing.",
        "columns": [
            ("case_id", "STRING", "Dispute evidence"),
            ("txn_id", "STRING", "Transaction ID"),
            ("pan_token", "STRING", "PAN token"),
            ("case_status", "STRING", "Dispute evidence"),
        ],
    },
    {
        "id": "merchant_transactions",
        "catalog": "payments",
        "schema": "merchant_acquiring",
        "object": "merchant_transactions",
        "name": "Merchant Transactions",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Merchant Acquiring",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Merchant ID", "Terminal ID", "Payment amount", "Settlement reference"],
        "volume": "2.6m/day",
        "x": 61,
        "y": 49,
        "posture": "local",
        "system": "Merchant acquiring warehouse",
        "classification": "Restricted payment operations",
        "usage": "Merchant acquiring transaction facts for settlement, returns, and concentration monitoring.",
        "remediation": "Keep local; maintain monthly market-share lineage.",
        "columns": [
            ("merchant_txn_id", "STRING", "Transaction ID"),
            ("merchant_id", "STRING", "Merchant ID"),
            ("terminal_id", "STRING", "Terminal ID"),
            ("amount_ngn", "DECIMAL(18,2)", "Payment amount"),
        ],
    },
    {
        "id": "mobile_transfer_initiations",
        "catalog": "digital_channels",
        "schema": "mobile",
        "object": "transfer_initiations",
        "name": "Mobile Transfer Initiations",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Digital Banking",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Customer identifier", "Device ID", "Beneficiary account", "Payment instruction"],
        "volume": "5.7m/day",
        "x": 30,
        "y": 22,
        "posture": "local",
        "system": "Mobile banking backend",
        "classification": "Sensitive payment event",
        "usage": "Customer-originated mobile transfer intents before NIP routing and ledger posting.",
        "remediation": "Keep local; evidence customer intent lineage.",
        "columns": [
            ("initiation_id", "STRING", "Transaction ID"),
            ("customer_id", "STRING", "Customer identifier"),
            ("device_id", "STRING", "Device ID"),
            ("beneficiary_account", "STRING", "Beneficiary account"),
        ],
    },
    {
        "id": "mobile_session_events",
        "catalog": "digital_channels",
        "schema": "mobile",
        "object": "session_events",
        "name": "Mobile Session Events",
        "kind": "STREAM",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Digital Banking",
        "location": "Azure West Europe",
        "country": "Netherlands",
        "zone": "OFFSHORE",
        "classes": ["Customer identifier", "Device ID", "Session ID", "API payload fragment"],
        "volume": "1.4bn events/day",
        "x": 76,
        "y": 39,
        "posture": "critical",
        "system": "Cloud app telemetry",
        "classification": "Operational evidence with payment context",
        "usage": "Mobile session telemetry includes payment journey events and partial request payloads.",
        "remediation": "Land raw telemetry in Lagos SIEM; retain offshore metrics only after payload redaction.",
        "localTarget": "Lagos DC B",
        "columns": [
            ("session_id", "STRING", "Session ID"),
            ("customer_id_hash", "STRING", "Customer identifier"),
            ("device_id", "STRING", "Device ID"),
            ("payload_hint", "STRING", "API payload fragment"),
        ],
    },
    {
        "id": "internet_banking_payments",
        "catalog": "digital_channels",
        "schema": "internet",
        "object": "internet_banking_payments",
        "name": "Internet Banking Payments",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Digital Banking",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Payment instruction", "Customer identifier", "Beneficiary account", "Transaction ID"],
        "volume": "820k/day",
        "x": 29,
        "y": 32,
        "posture": "local",
        "system": "Internet banking backend",
        "classification": "Sensitive payment event",
        "usage": "Internet banking transfer and bill-payment instructions before switch routing.",
        "remediation": "Keep local; attach channel-to-ledger lineage.",
        "columns": [
            ("payment_id", "STRING", "Transaction ID"),
            ("customer_id", "STRING", "Customer identifier"),
            ("beneficiary_account", "STRING", "Beneficiary account"),
            ("amount_ngn", "DECIMAL(18,2)", "Payment amount"),
        ],
    },
    {
        "id": "agency_cash_io",
        "catalog": "digital_channels",
        "schema": "agency",
        "object": "cash_in_cash_out",
        "name": "Agency Cash In Cash Out",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Agency Banking",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Agent ID", "Customer identifier", "Payment amount", "Terminal ID"],
        "volume": "1.1m/day",
        "x": 27,
        "y": 66,
        "posture": "local",
        "system": "Agency banking platform",
        "classification": "Sensitive payment event",
        "usage": "Cash-in, cash-out, wallet movement, and agent terminal payment evidence.",
        "remediation": "Keep local; maintain agent terminal ownership proof.",
        "columns": [
            ("agency_txn_id", "STRING", "Transaction ID"),
            ("agent_id", "STRING", "Agent ID"),
            ("customer_id", "STRING", "Customer identifier"),
            ("amount_ngn", "DECIMAL(18,2)", "Payment amount"),
        ],
    },
    {
        "id": "open_banking_consent_events",
        "catalog": "digital_channels",
        "schema": "open_banking",
        "object": "consent_events",
        "name": "Open Banking Consent Events",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Open Banking",
        "location": "Lagos DC B",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Customer consent", "API consumer", "Customer identifier", "Scope"],
        "volume": "42m consent events",
        "x": 38,
        "y": 18,
        "posture": "local",
        "system": "Open banking gateway",
        "classification": "Consent evidence",
        "usage": "Consent creation, expiry, revocation, and API consumer scope evidence.",
        "remediation": "Keep local; attach monthly consent coverage evidence.",
        "columns": [
            ("consent_id", "STRING", "Customer consent"),
            ("customer_id", "STRING", "Customer identifier"),
            ("api_consumer_id", "STRING", "API consumer"),
            ("scope", "STRING", "Scope"),
        ],
    },
    {
        "id": "api_call_metrics",
        "catalog": "digital_channels",
        "schema": "open_banking",
        "object": "api_call_metrics",
        "name": "API Call Metrics",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Open Banking",
        "location": "Lagos DC B",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["API metric", "Response time", "Availability", "Incident marker"],
        "volume": "390m calls/month",
        "x": 45,
        "y": 16,
        "posture": "local",
        "system": "API gateway metrics",
        "classification": "Operational evidence",
        "usage": "API performance KPIs and incident triggers for CBN open banking evidence.",
        "remediation": "Keep local; preserve 5-minute metric aggregation lineage.",
        "columns": [
            ("metric_id", "STRING", "API metric"),
            ("endpoint", "STRING", "API metric"),
            ("p95_ms", "INTEGER", "Response time"),
            ("availability_pct", "DECIMAL(5,2)", "Availability"),
        ],
    },
    {
        "id": "fraud_feature_store",
        "catalog": "risk_financial_crime",
        "schema": "fraud",
        "object": "fraud_feature_store",
        "name": "Fraud Feature Store",
        "kind": "FEATURE_TABLE",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Risk Analytics",
        "location": "Azure South Africa North",
        "country": "South Africa",
        "zone": "REGIONAL",
        "classes": ["Velocity features", "Device score", "Merchant risk", "Account age"],
        "volume": "220m rows",
        "x": 72,
        "y": 74,
        "posture": "warning",
        "system": "Feature table",
        "classification": "Derived risk intelligence",
        "usage": "Derived fraud features for card, NIP, and channel risk scoring.",
        "remediation": "Rebuild feature store locally; send only scored decisions to external tools.",
        "localTarget": "Lagos DC B",
        "columns": [
            ("entity_id", "STRING", "Customer identifier"),
            ("txn_velocity_10m", "DOUBLE", "Velocity features"),
            ("device_risk_score", "DOUBLE", "Device score"),
            ("merchant_risk_score", "DOUBLE", "Merchant risk"),
        ],
    },
    {
        "id": "fraud_model_registry",
        "catalog": "risk_financial_crime",
        "schema": "fraud",
        "object": "fraud_transaction_model",
        "name": "Fraud Transaction Model",
        "kind": "MODEL",
        "uc_type": "MODEL",
        "table_type": "MODEL",
        "owner": "Risk Analytics",
        "location": "Lagos DC B",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Model artifact", "Feature lineage", "Decision score"],
        "volume": "v14 production",
        "x": 62,
        "y": 73,
        "posture": "local",
        "system": "Model registry",
        "classification": "AI model governance",
        "usage": "Registered model and versions used for payment fraud scoring.",
        "remediation": "Keep model card, feature lineage, and approval evidence linked.",
        "columns": [
            ("model_version", "STRING", "Model artifact"),
            ("feature_set_id", "STRING", "Feature lineage"),
            ("approval_status", "STRING", "Model artifact"),
            ("auc_score", "DOUBLE", "Decision score"),
        ],
    },
    {
        "id": "aml_alerts",
        "catalog": "risk_financial_crime",
        "schema": "aml",
        "object": "aml_alerts",
        "name": "AML Alerts",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Financial Crime",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Customer identifier", "Transaction ID", "Alert reason", "Counterparty"],
        "volume": "74k alerts/month",
        "x": 57,
        "y": 78,
        "posture": "local",
        "system": "AML monitoring platform",
        "classification": "Financial crime evidence",
        "usage": "AML case alerts linked to transaction journal, NIP transfers, and customer risk.",
        "remediation": "Keep local; preserve alert-to-transaction evidence.",
        "columns": [
            ("alert_id", "STRING", "Alert reason"),
            ("customer_id", "STRING", "Customer identifier"),
            ("txn_id", "STRING", "Transaction ID"),
            ("counterparty_account", "STRING", "Counterparty"),
        ],
    },
    {
        "id": "sanctions_screening_events",
        "catalog": "risk_financial_crime",
        "schema": "aml",
        "object": "sanctions_screening_events",
        "name": "Sanctions Screening Events",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Financial Crime",
        "location": "Vendor EU Cloud",
        "country": "Germany",
        "zone": "OFFSHORE",
        "classes": ["Customer identifier", "Counterparty", "Screening result", "Transaction ID"],
        "volume": "5.2m/month",
        "x": 84,
        "y": 73,
        "posture": "critical",
        "system": "Sanctions vendor API",
        "classification": "Financial crime evidence with payment context",
        "usage": "Payment and customer screening events from a third-party sanctions provider.",
        "remediation": "Store full screening event locally; vendor receives minimal hashed party payloads.",
        "localTarget": "Lagos DC B",
        "columns": [
            ("screening_id", "STRING", "Screening result"),
            ("party_hash", "STRING", "Customer identifier"),
            ("txn_id", "STRING", "Transaction ID"),
            ("match_outcome", "STRING", "Screening result"),
        ],
    },
    {
        "id": "monthly_market_share_return",
        "catalog": "regulatory_reporting",
        "schema": "cbn_returns",
        "object": "monthly_market_share_return",
        "name": "Monthly Market Share Return",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Regulatory Reporting",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Daily aggregate", "Market share", "Merchant segment", "Revenue bucket"],
        "volume": "36 reporting months",
        "x": 42,
        "y": 83,
        "posture": "local",
        "system": "Regulatory reporting mart",
        "classification": "Regulatory return",
        "usage": "Monthly issuing, acquiring, and transaction share return prepared for CBN submission.",
        "remediation": "Keep source lineage to merchant, card, NIP, and ledger facts.",
        "columns": [
            ("reporting_month", "DATE", "Market share"),
            ("consumer_issuing_share_pct", "DOUBLE", "Market share"),
            ("merchant_acquiring_share_pct", "DOUBLE", "Market share"),
            ("submitted_status", "STRING", "Regulatory return"),
        ],
    },
    {
        "id": "transaction_residency_evidence",
        "catalog": "regulatory_reporting",
        "schema": "cbn_returns",
        "object": "transaction_residency_evidence",
        "name": "Transaction Residency Evidence",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Compliance Operations",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Evidence pointer", "Storage location", "Transaction ID", "Control test"],
        "volume": "1.9m evidence rows",
        "x": 49,
        "y": 86,
        "posture": "local",
        "system": "Compliance evidence lake",
        "classification": "Regulatory evidence",
        "usage": "Asset-by-asset residency evidence and exceptions for Nigeria-generated transaction data.",
        "remediation": "Keep current; reconcile against catalog daily.",
        "columns": [
            ("asset_full_name", "STRING", "Evidence pointer"),
            ("storage_country", "STRING", "Storage location"),
            ("sample_txn_id", "STRING", "Transaction ID"),
            ("control_result", "STRING", "Control test"),
        ],
    },
    {
        "id": "ubo_disclosure_pack",
        "catalog": "regulatory_reporting",
        "schema": "governance",
        "object": "ubo_disclosure_pack",
        "name": "UBO Disclosure Pack",
        "kind": "VOLUME",
        "uc_type": "VOLUME",
        "table_type": "VOLUME",
        "owner": "Legal and Compliance",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["UBO record", "Board approval", "Evidence pointer"],
        "volume": "94 evidence files",
        "x": 32,
        "y": 85,
        "posture": "local",
        "system": "Governance evidence volume",
        "classification": "Corporate governance evidence",
        "usage": "UBO, shareholder, board, and request-ready CBN evidence bundle.",
        "remediation": "Refresh owner proof and attestations quarterly.",
        "columns": [
            ("file_path", "STRING", "Evidence pointer"),
            ("shareholder_id", "STRING", "UBO record"),
            ("approval_date", "DATE", "Board approval"),
            ("attestation_status", "STRING", "Evidence pointer"),
        ],
    },
    {
        "id": "payment_api_logs",
        "catalog": "operational_evidence",
        "schema": "observability",
        "object": "payment_api_logs",
        "name": "Payment API Logs",
        "kind": "LOG_INDEX",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "SRE",
        "location": "Azure West Europe",
        "country": "Netherlands",
        "zone": "OFFSHORE",
        "classes": ["Transaction ID", "Session ID", "Error trace", "API payload fragment"],
        "volume": "1.1 TB/day",
        "x": 82,
        "y": 48,
        "posture": "critical",
        "system": "Cloud log analytics",
        "classification": "Operational evidence with payload fragments",
        "usage": "Runtime payment API logs used for incident triage, SLA evidence, and agent debugging.",
        "remediation": "Deploy local SIEM store, redact payload fragments, keep offshore metrics only.",
        "localTarget": "Lagos DC B",
        "columns": [
            ("log_id", "STRING", "Evidence pointer"),
            ("txn_id", "STRING", "Transaction ID"),
            ("session_id", "STRING", "Session ID"),
            ("payload_fragment", "STRING", "API payload fragment"),
        ],
    },
    {
        "id": "siem_payment_security_events",
        "catalog": "operational_evidence",
        "schema": "observability",
        "object": "siem_payment_security_events",
        "name": "SIEM Payment Security Events",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Security Operations",
        "location": "Lagos DC B",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Incident marker", "Transaction ID", "Device ID", "Control test"],
        "volume": "210m events/day",
        "x": 54,
        "y": 20,
        "posture": "local",
        "system": "Local SIEM",
        "classification": "Security evidence",
        "usage": "Security detections and incident evidence for payment systems and channels.",
        "remediation": "Keep local and link incident reports to CBN export packs.",
        "columns": [
            ("event_id", "STRING", "Incident marker"),
            ("txn_id", "STRING", "Transaction ID"),
            ("device_id", "STRING", "Device ID"),
            ("rule_id", "STRING", "Control test"),
        ],
    },
    {
        "id": "support_payment_tickets",
        "catalog": "operational_evidence",
        "schema": "observability",
        "object": "support_payment_tickets",
        "name": "Support Payment Tickets",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Customer Support",
        "location": "SaaS EU",
        "country": "Ireland",
        "zone": "OFFSHORE",
        "classes": ["Customer identifier", "Transaction ID", "Dispute evidence", "Support note"],
        "volume": "260k/month",
        "x": 86,
        "y": 58,
        "posture": "warning",
        "system": "Support SaaS",
        "classification": "Support evidence with payment references",
        "usage": "Payment-related support tickets and dispute notes copied from customer service SaaS.",
        "remediation": "Store regulated ticket evidence locally; mask transaction identifiers in SaaS.",
        "localTarget": "Lagos DC B",
        "columns": [
            ("ticket_id", "STRING", "Support note"),
            ("customer_id_hash", "STRING", "Customer identifier"),
            ("txn_id", "STRING", "Transaction ID"),
            ("issue_type", "STRING", "Dispute evidence"),
        ],
    },
    {
        "id": "ops_agent_memory",
        "catalog": "operational_evidence",
        "schema": "agent_context",
        "object": "ops_agent_memory",
        "name": "Ops Agent Memory",
        "kind": "VECTOR_INDEX",
        "uc_type": "VOLUME",
        "table_type": "VOLUME",
        "owner": "Operations",
        "location": "Lagos DC A",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Incident summary", "Runbook step", "Evidence pointer"],
        "volume": "18k sessions",
        "x": 18,
        "y": 18,
        "posture": "local",
        "system": "Local vector index",
        "classification": "Filtered operational memory",
        "usage": "Incident summaries, runbook recall, and evidence pointers for governed agent work.",
        "remediation": "Keep memory local and filter transaction payloads before embedding.",
        "columns": [
            ("memory_id", "STRING", "Evidence pointer"),
            ("incident_id", "STRING", "Incident summary"),
            ("chunk_text", "STRING", "Runbook step"),
            ("source_asset", "STRING", "Evidence pointer"),
        ],
    },
    {
        "id": "ledger_dr_backups",
        "catalog": "resilience",
        "schema": "backup_vault",
        "object": "ledger_dr_backups",
        "name": "Ledger DR Backups",
        "kind": "VOLUME",
        "uc_type": "VOLUME",
        "table_type": "VOLUME",
        "owner": "Infrastructure",
        "location": "AWS eu-central-1",
        "country": "Germany",
        "zone": "OFFSHORE",
        "classes": ["Ledger snapshot", "Payment instruction", "Customer reference", "Transaction ID"],
        "volume": "34 TB",
        "x": 88,
        "y": 66,
        "posture": "critical",
        "system": "Object storage",
        "classification": "Critical payment continuity",
        "usage": "Disaster recovery snapshots for regulated payment systems and settlement state.",
        "remediation": "Move regulated backups to Nigerian DR; keep offshore only if encrypted and approved.",
        "localTarget": "Abuja DR Site",
        "columns": [
            ("snapshot_id", "STRING", "Ledger snapshot"),
            ("journal_date", "DATE", "Ledger snapshot"),
            ("storage_key", "STRING", "Evidence pointer"),
            ("encryption_status", "STRING", "Control test"),
        ],
    },
    {
        "id": "local_kafka_mirror",
        "catalog": "resilience",
        "schema": "event_mirror",
        "object": "local_kafka_mirror",
        "name": "Local Kafka Mirror",
        "kind": "STREAM",
        "uc_type": "TABLE",
        "table_type": "MANAGED",
        "owner": "Infrastructure",
        "location": "Lagos DC B",
        "country": "Nigeria",
        "zone": "LOCAL",
        "classes": ["Transaction ID", "Replay offset", "Evidence pointer"],
        "volume": "14 mirrored topics",
        "x": 50,
        "y": 70,
        "posture": "local",
        "system": "Kafka MirrorMaker",
        "classification": "Continuity evidence",
        "usage": "Local mirror topics for card auth, postings, observability, and channel events.",
        "remediation": "Expand to every payment-data topic and record lag attestations.",
        "columns": [
            ("topic_name", "STRING", "Evidence pointer"),
            ("source_offset", "LONG", "Replay offset"),
            ("local_offset", "LONG", "Replay offset"),
            ("lag_seconds", "INTEGER", "Control test"),
        ],
    },
    {
        "id": "executive_bi_extract",
        "catalog": "external_shares",
        "schema": "cloud_exports",
        "object": "executive_bi_extract",
        "name": "Executive BI Extract",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Finance",
        "location": "Google europe-west2",
        "country": "United Kingdom",
        "zone": "OFFSHORE",
        "classes": ["Daily aggregate", "Merchant segment", "Revenue bucket"],
        "volume": "12 GB/day",
        "x": 74,
        "y": 31,
        "posture": "warning",
        "system": "Warehouse export",
        "classification": "De-identified management reporting",
        "usage": "Executive revenue and market-share aggregate exported to external BI tooling.",
        "remediation": "Keep raw extract local; publish only de-identified aggregates offshore.",
        "localTarget": "Lagos DC A",
        "columns": [
            ("business_date", "DATE", "Daily aggregate"),
            ("merchant_segment", "STRING", "Merchant segment"),
            ("revenue_bucket", "STRING", "Revenue bucket"),
            ("txn_count", "LONG", "Daily aggregate"),
        ],
    },
    {
        "id": "vendor_fraud_scores",
        "catalog": "external_shares",
        "schema": "vendor_risk",
        "object": "vendor_fraud_scores",
        "name": "Vendor Fraud Scores",
        "kind": "TABLE",
        "uc_type": "TABLE",
        "table_type": "EXTERNAL",
        "owner": "Risk Analytics",
        "location": "Vendor EU Cloud",
        "country": "Germany",
        "zone": "OFFSHORE",
        "classes": ["Decision score", "Device score", "Transaction ID"],
        "volume": "3.4m scores/day",
        "x": 87,
        "y": 81,
        "posture": "critical",
        "system": "Fraud vendor API",
        "classification": "Third-party payment risk signal",
        "usage": "External fraud score response for high-risk card and NIP transactions.",
        "remediation": "Send pseudonymous request only; persist full decision context locally.",
        "localTarget": "Lagos DC B",
        "columns": [
            ("score_id", "STRING", "Decision score"),
            ("txn_id_hash", "STRING", "Transaction ID"),
            ("device_score", "DOUBLE", "Device score"),
            ("decision", "STRING", "Decision score"),
        ],
    },
]


ROUTES = [
    ("customers_customer_master", "accounts_account_master", "reference", "Customer to account ownership", False),
    ("accounts_account_master", "mobile_transfer_initiations", "reference", "Account and mandate validation for mobile transfers", True),
    ("accounts_account_master", "internet_banking_payments", "reference", "Account and mandate validation for internet banking payments", True),
    ("mobile_transfer_initiations", "nibss_gateway_adapter", "payment_route", "Mobile transfer routed to NIP gateway", True),
    ("internet_banking_payments", "nibss_gateway_adapter", "payment_route", "Internet banking payment routed to NIP gateway", True),
    ("nibss_gateway_adapter", "nip_outbound_transfers", "payment_route", "Outbound NIP request persisted", True),
    ("nibss_gateway_adapter", "nip_inbound_transfers", "payment_route", "Inbound NIP request persisted", True),
    ("nip_outbound_transfers", "ledger_posting_events", "posting", "NIP outbound posts into ledger stream", True),
    ("nip_inbound_transfers", "ledger_posting_events", "posting", "NIP inbound posts into ledger stream", True),
    ("ledger_posting_events", "ledger_transaction_journal", "posting", "Posting stream materializes to transaction journal", True),
    ("card_token_vault", "card_auth_event_stream", "token_lookup", "Card token reference used by authorization stream", True),
    ("card_auth_event_stream", "atm_pos_transactions", "payment_route", "Authorization facts land in POS table", True),
    ("atm_pos_transactions", "merchant_transactions", "settlement", "POS records flow to merchant acquiring", True),
    ("merchant_transactions", "settlement_positions", "settlement", "Merchant transactions net into settlement positions", True),
    ("ledger_transaction_journal", "settlement_positions", "reconciliation", "Ledger journal reconciles settlement positions", True),
    ("settlement_positions", "monthly_market_share_return", "reporting", "Settlement aggregates feed CBN return", True),
    ("merchant_transactions", "monthly_market_share_return", "reporting", "Merchant acquiring share feeds CBN return", True),
    ("card_auth_event_stream", "fraud_feature_store", "feature", "Card auth events produce fraud features", True),
    ("nip_outbound_transfers", "fraud_feature_store", "feature", "NIP outbound transfers produce velocity features", True),
    ("fraud_feature_store", "fraud_model_registry", "model", "Features feed registered fraud model", False),
    ("fraud_model_registry", "vendor_fraud_scores", "vendor_score", "High-risk events call vendor scoring", True),
    ("vendor_fraud_scores", "aml_alerts", "risk", "Fraud and AML escalation linkage", True),
    ("ledger_transaction_journal", "aml_alerts", "risk", "Transaction journal creates AML alert evidence", True),
    ("ledger_transaction_journal", "ledger_dr_backups", "backup", "Ledger snapshots replicated to DR backup", True),
    ("card_auth_event_stream", "local_kafka_mirror", "mirror", "Card auth mirror into local Kafka", True),
    ("payment_api_logs", "ops_agent_memory", "agent_context", "Payment incidents summarized into local agent memory", False),
    ("siem_payment_security_events", "ops_agent_memory", "agent_context", "Security investigations summarized into local agent memory", False),
    ("support_payment_tickets", "chargeback_cases", "casework", "Support tickets link to chargeback cases", True),
    ("chargeback_cases", "transaction_residency_evidence", "evidence", "Dispute evidence linked into residency register", True),
    ("ledger_transaction_journal", "transaction_residency_evidence", "evidence", "Transaction samples prove storage location", True),
    ("payment_api_logs", "transaction_residency_evidence", "evidence", "Log location evidence checks payload fragments", True),
    ("ubo_disclosure_pack", "ops_agent_memory", "agent_context", "Governance evidence summarized for agent retrieval", False),
    ("monthly_market_share_return", "executive_bi_extract", "export", "Aggregated returns feed executive BI", False),
]


OBLIGATIONS = [
    {
        "id": "cbn-payment-data-residency",
        "title": "Nigeria-generated payment transaction data stored and managed in Nigeria",
        "type": "CBN obligation",
        "basis": "Circular item 2",
        "status": "open",
        "owner": "Compliance PMO / Infrastructure",
        "deadline": "2027-01-01",
        "body": "All Nigeria-generated payment transaction data, processing evidence, and recovery copies must be resident and operationally managed in Nigeria.",
    },
    {
        "id": "cbn-ubo-disclosure",
        "title": "UBO disclosure pack available on request",
        "type": "Evidence event",
        "basis": "Circular item 1",
        "status": "watch",
        "owner": "Legal / Compliance",
        "deadline": "On request",
        "body": "Maintain significant shareholder, ultimate beneficial ownership, board approval, and attestation evidence for CBN request.",
    },
    {
        "id": "cbn-market-share-returns",
        "title": "Monthly market-share returns",
        "type": "Regulatory return",
        "basis": "Circular item 3(iii)",
        "status": "draft",
        "owner": "Regulatory Reporting",
        "deadline": "Monthly",
        "body": "Submit issuing and acquiring market-share returns using CBN-prescribed templates, source lineage, and sign-off evidence.",
    },
    {
        "id": "cbn-concentration-limits",
        "title": "Issuing/acquiring concentration limits",
        "type": "Policy update",
        "basis": "Circular item 3",
        "status": "watch",
        "owner": "Strategy / Regulatory Reporting",
        "deadline": "2026-12-31",
        "body": "Monitor whether consumer issuing and merchant acquiring concentration thresholds are breached in the same rolling period.",
    },
    {
        "id": "cbn-open-banking-evidence",
        "title": "Open banking consent and API performance evidence",
        "type": "Control evidence",
        "basis": "Open banking evidence control",
        "status": "open",
        "owner": "Open Banking",
        "deadline": "Monthly",
        "body": "Retain consent lifecycle, API consumer identity, availability, response-time, and incident evidence for payment APIs.",
    },
    {
        "id": "cbn-audit-ready-lineage",
        "title": "Catalog lineage and evidence traceability",
        "type": "Catalog control",
        "basis": "Catalog control",
        "status": "new",
        "owner": "Data Governance",
        "deadline": "This week",
        "body": "All payment data assets should link to source obligations, owners, locations, lineage routes, permissions, and evidence artifacts.",
    },
]


ASSET_OBLIGATIONS = {
    "cbn-payment-data-residency": [
        "ledger_transaction_journal",
        "ledger_posting_events",
        "nibss_gateway_adapter",
        "nip_inbound_transfers",
        "nip_outbound_transfers",
        "card_auth_event_stream",
        "atm_pos_transactions",
        "merchant_transactions",
        "mobile_transfer_initiations",
        "internet_banking_payments",
        "mobile_session_events",
        "payment_api_logs",
        "ledger_dr_backups",
        "support_payment_tickets",
        "sanctions_screening_events",
        "vendor_fraud_scores",
    ],
    "cbn-ubo-disclosure": ["ubo_disclosure_pack", "ops_agent_memory"],
    "cbn-market-share-returns": [
        "monthly_market_share_return",
        "settlement_positions",
        "merchant_transactions",
        "executive_bi_extract",
    ],
    "cbn-concentration-limits": [
        "monthly_market_share_return",
        "merchant_transactions",
        "atm_pos_transactions",
    ],
    "cbn-open-banking-evidence": [
        "open_banking_consent_events",
        "api_call_metrics",
        "payment_api_logs",
        "siem_payment_security_events",
    ],
    "cbn-audit-ready-lineage": [
        "transaction_residency_evidence",
        "ops_agent_memory",
        "local_kafka_mirror",
        "ledger_dr_backups",
        "payment_api_logs",
        "card_auth_event_stream",
    ],
}


def ddl(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        drop table if exists agent_actions;
        drop table if exists evidence;
        drop table if exists asset_obligations;
        drop table if exists obligations;
        drop table if exists lineage;
        drop table if exists permissions;
        drop table if exists data_classes;
        drop table if exists columns;
        drop table if exists assets;
        drop table if exists schemas;
        drop table if exists catalogs;
        drop table if exists metastores;
        drop table if exists banks;

        create table banks (
          id text primary key,
          name text not null,
          country text not null,
          regulator text not null,
          story text not null
        );

        create table metastores (
          id text primary key,
          bank_id text not null references banks(id),
          name text not null,
          owner text not null,
          storage_root text not null
        );

        create table catalogs (
          name text primary key,
          metastore_id text not null references metastores(id),
          display_name text not null,
          owner text not null,
          storage_location text not null,
          comment text not null,
          properties_json text not null
        );

        create table schemas (
          full_name text primary key,
          catalog_name text not null references catalogs(name),
          name text not null,
          owner text not null,
          comment text not null,
          properties_json text not null
        );

        create table assets (
          id text primary key,
          full_name text not null unique,
          catalog_name text not null,
          schema_name text not null,
          object_name text not null,
          display_name text not null,
          uc_type text not null,
          kind text not null,
          table_type text not null,
          owner text not null,
          storage_location text not null,
          country text not null,
          residency_zone text not null,
          posture text not null,
          system text not null,
          classification text not null,
          usage text not null,
          remediation text not null,
          local_target text,
          volume text not null,
          graph_x real not null,
          graph_y real not null,
          properties_json text not null,
          foreign key (catalog_name, schema_name) references schemas(catalog_name, name)
        );

        create table columns (
          id integer primary key autoincrement,
          asset_id text not null references assets(id),
          name text not null,
          data_type text not null,
          nullable integer not null,
          classification text not null,
          comment text not null
        );

        create table data_classes (
          asset_id text not null references assets(id),
          class_name text not null,
          primary key (asset_id, class_name)
        );

        create table permissions (
          id integer primary key autoincrement,
          asset_id text not null references assets(id),
          principal text not null,
          privilege text not null
        );

        create table lineage (
          id integer primary key autoincrement,
          source_asset_id text not null references assets(id),
          target_asset_id text not null references assets(id),
          route_type text not null,
          description text not null,
          contains_transaction_data integer not null,
          cross_border integer not null
        );

        create table obligations (
          id text primary key,
          title text not null,
          type text not null,
          basis text not null,
          status text not null,
          owner text not null,
          deadline text not null,
          body text not null
        );

        create table asset_obligations (
          asset_id text not null references assets(id),
          obligation_id text not null references obligations(id),
          primary key (asset_id, obligation_id)
        );

        create table evidence (
          id text primary key,
          asset_id text not null references assets(id),
          title text not null,
          status text not null,
          body text not null,
          uri text not null
        );

        create table agent_actions (
          id integer primary key autoincrement,
          asset_id text not null references assets(id),
          action text not null
        );
        """
    )


def insert_seed(conn: sqlite3.Connection) -> None:
    conn.execute(
        "insert into banks values (?, ?, ?, ?, ?)",
        (BANK["id"], BANK["name"], BANK["country"], BANK["regulator"], BANK["story"]),
    )
    conn.execute(
        "insert into metastores values (?, ?, ?, ?, ?)",
        ("kudora-main", BANK["id"], BANK["metastore"], "Data Governance", "s3://kudora-ng-uc-root"),
    )
    for name, display, owner, location in CATALOGS:
        conn.execute(
            "insert into catalogs values (?, ?, ?, ?, ?, ?, ?)",
            (
                name,
                "kudora-main",
                display,
                owner,
                location,
                f"{display} catalog for {BANK['name']}.",
                json.dumps({"uc_kind": "catalog", "synthetic": True}, sort_keys=True),
            ),
        )
    for catalog, schema, comment in SCHEMAS:
        conn.execute(
            "insert into schemas values (?, ?, ?, ?, ?, ?)",
            (
                f"{catalog}.{schema}",
                catalog,
                schema,
                next(item[2] for item in CATALOGS if item[0] == catalog),
                comment,
                json.dumps({"uc_kind": "schema", "synthetic": True}, sort_keys=True),
            ),
        )

    for asset in ASSETS:
        full_name = f"{asset['catalog']}.{asset['schema']}.{asset['object']}"
        conn.execute(
            """
            insert into assets values (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            """,
            (
                asset["id"],
                full_name,
                asset["catalog"],
                asset["schema"],
                asset["object"],
                asset["name"],
                asset["uc_type"],
                asset["kind"],
                asset["table_type"],
                asset["owner"],
                asset["location"],
                asset["country"],
                asset["zone"],
                asset["posture"],
                asset["system"],
                asset["classification"],
                asset["usage"],
                asset["remediation"],
                asset.get("localTarget"),
                asset["volume"],
                asset["x"],
                asset["y"],
                json.dumps(
                    {
                        "data_source_format": "DELTA" if asset["uc_type"] == "TABLE" else asset["uc_type"],
                        "finance_sector": True,
                        "cbn_transaction_focus": any(
                            "Transaction" in value or "Payment" in value for value in asset["classes"]
                        ),
                    },
                    sort_keys=True,
                ),
            ),
        )
        for idx, (name, data_type, classification) in enumerate(asset["columns"]):
            conn.execute(
                "insert into columns (asset_id, name, data_type, nullable, classification, comment) values (?, ?, ?, ?, ?, ?)",
                (asset["id"], name, data_type, 0 if idx == 0 else 1, classification, f"{classification} column"),
            )
        for class_name in asset["classes"]:
            conn.execute("insert into data_classes values (?, ?)", (asset["id"], class_name))
        for principal, privilege in [
            (asset["owner"], "OWNER"),
            ("Compliance Operations", "READ_METADATA"),
            ("Compliance Agent", "SELECT"),
            ("Auditors", "READ_EVIDENCE"),
        ]:
            conn.execute(
                "insert into permissions (asset_id, principal, privilege) values (?, ?, ?)",
                (asset["id"], principal, privilege),
            )
        for suffix, status, body in [
            ("inventory", "collected", "Catalog registration, owner, location, and classification evidence."),
            ("lineage", "linked", "Upstream and downstream route evidence for CBN transaction-data review."),
            ("access", "open", "Latest permission attestation and privileged-access review."),
        ]:
            conn.execute(
                "insert into evidence values (?, ?, ?, ?, ?, ?)",
                (
                    f"{asset['id']}-{suffix}",
                    asset["id"],
                    suffix.replace("_", " ").title(),
                    status,
                    body,
                    f"evidence://{full_name}/{suffix}",
                ),
            )
        for action in [
            "Point agent to this asset",
            "Summarize residency risk",
            "Find upstream transaction sources",
            "Draft evidence request",
        ]:
            conn.execute(
                "insert into agent_actions (asset_id, action) values (?, ?)",
                (asset["id"], action),
            )

    asset_country = {asset["id"]: asset["country"] for asset in ASSETS}
    for source, target, route_type, description, contains_txn in ROUTES:
        conn.execute(
            """
            insert into lineage (
              source_asset_id, target_asset_id, route_type, description,
              contains_transaction_data, cross_border
            ) values (?, ?, ?, ?, ?, ?)
            """,
            (
                source,
                target,
                route_type,
                description,
                1 if contains_txn else 0,
                1 if asset_country[source] != asset_country[target] else 0,
            ),
        )

    for obligation in OBLIGATIONS:
        conn.execute(
            "insert into obligations values (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                obligation["id"],
                obligation["title"],
                obligation["type"],
                obligation["basis"],
                obligation["status"],
                obligation["owner"],
                obligation["deadline"],
                obligation["body"],
            ),
        )
    for obligation_id, asset_ids in ASSET_OBLIGATIONS.items():
        for asset_id in asset_ids:
            conn.execute("insert into asset_obligations values (?, ?)", (asset_id, obligation_id))


def rows(conn: sqlite3.Connection, sql: str, args: tuple = ()) -> list[sqlite3.Row]:
    return list(conn.execute(sql, args))


def export_bootstrap(conn: sqlite3.Connection) -> dict:
    asset_rows = rows(
        conn,
        """
        select
          id, display_name, kind, owner, storage_location, country, residency_zone,
          posture, system, local_target, volume, graph_x, graph_y, full_name,
          catalog_name, schema_name, object_name, uc_type, table_type,
          classification, usage, remediation
        from assets
        order by catalog_name, schema_name, object_name
        """,
    )
    assets = []
    metadata = {}
    for row in asset_rows:
        classes = [r["class_name"] for r in rows(conn, "select class_name from data_classes where asset_id = ? order by class_name", (row["id"],))]
        evidence = [r["title"] for r in rows(conn, "select title from evidence where asset_id = ? order by id", (row["id"],))]
        permissions = [
            f"{r['principal']}: {r['privilege']}"
            for r in rows(conn, "select principal, privilege from permissions where asset_id = ? order by principal, privilege", (row["id"],))
        ]
        actions = [r["action"] for r in rows(conn, "select action from agent_actions where asset_id = ? order by id", (row["id"],))]
        columns = [
            {
                "name": r["name"],
                "type": r["data_type"],
                "classification": r["classification"],
            }
            for r in rows(conn, "select name, data_type, classification from columns where asset_id = ? order by id", (row["id"],))
        ]
        assets.append(
            {
                "id": row["id"],
                "name": row["display_name"],
                "kind": row["kind"],
                "owner": row["owner"],
                "location": row["storage_location"],
                "country": row["country"],
                "zone": row["residency_zone"],
                "classes": classes,
                "volume": row["volume"],
                "x": row["graph_x"],
                "y": row["graph_y"],
                "posture": row["posture"],
                "system": row["system"],
                "localTarget": row["local_target"],
                "remediation": row["remediation"],
            }
        )
        metadata[row["id"]] = {
            "catalog": row["catalog_name"],
            "schema": row["schema_name"],
            "object": row["object_name"],
            "type": row["uc_type"].title() if row["uc_type"] != "TABLE" else row["table_type"].title() + " table",
            "ucType": row["uc_type"],
            "tableType": row["table_type"],
            "classification": row["classification"],
            "permissions": permissions,
            "usage": row["usage"],
            "evidence": evidence,
            "agentActions": actions,
            "columns": columns,
        }

    obligation_rows = rows(conn, "select * from obligations order by id")
    obligations_by_id = {row["id"]: dict(row) for row in obligation_rows}
    feed_groups = [
        ("Today", ["cbn-payment-data-residency", "cbn-open-banking-evidence"]),
        ("This Week", ["cbn-market-share-returns", "cbn-audit-ready-lineage"]),
        ("Upcoming", ["cbn-concentration-limits", "cbn-ubo-disclosure"]),
        ("Historical", []),
    ]
    compliance_feed_groups = []
    for label, obligation_ids in feed_groups:
        items = []
        for obligation_id in obligation_ids:
            obligation = obligations_by_id[obligation_id]
            asset_names = [
                r["display_name"]
                for r in rows(
                    conn,
                    """
                    select assets.display_name
                    from asset_obligations
                    join assets on assets.id = asset_obligations.asset_id
                    where asset_obligations.obligation_id = ?
                    order by assets.display_name
                    """,
                    (obligation_id,),
                )
            ]
            items.append(
                {
                    "id": obligation["id"],
                    "title": obligation["title"],
                    "type": obligation["type"],
                    "status": obligation["status"],
                    "owner": obligation["owner"],
                    "deadline": obligation["deadline"],
                    "basis": obligation["basis"],
                    "body": obligation["body"],
                    "assets": asset_names,
                    "evidence": "Linked catalog evidence",
                }
            )
        compliance_feed_groups.append({"label": label, "items": items})
    compliance_feed_groups[-1]["items"].append(
        {
            "id": "seed-import",
            "title": "Kudora synthetic bank catalog seeded",
            "type": "Policy intake",
            "status": "complete",
            "owner": "Data Governance",
            "deadline": "2026-06-30",
            "basis": "Synthetic onboarding",
            "body": "SQLite-backed catalog, lineage, permissions, evidence, and obligations created for CCR prototype.",
            "assets": [BANK["name"]],
            "evidence": "Seeded database",
        }
    )

    route_rows = rows(conn, "select source_asset_id, target_asset_id from lineage order by id")
    catalogs = [
        {
            "name": row["name"],
            "displayName": row["display_name"],
            "owner": row["owner"],
            "storageLocation": row["storage_location"],
        }
        for row in rows(conn, "select name, display_name, owner, storage_location from catalogs order by name")
    ]
    schemas = [
        {
            "catalog": row["catalog_name"],
            "name": row["name"],
            "comment": row["comment"],
            "owner": row["owner"],
        }
        for row in rows(conn, "select catalog_name, name, owner, comment from schemas order by catalog_name, name")
    ]

    return {
        "bank": BANK,
        "source": {
            "sqlite": "data/kudora_control_room.sqlite",
            "generatedBy": "app/seed_catalog.py",
        },
        "unityCatalogModel": {
            "namespace": "catalog.schema.asset",
            "resources": ["metastore", "catalog", "schema", "table", "volume", "function", "registered_model", "permissions"],
            "notes": "Mirrors the OSS Unity Catalog three-level namespace and securable asset model for CCR.",
        },
        "catalogs": catalogs,
        "schemas": schemas,
        "assets": assets,
        "catalogMetadata": metadata,
        "routes": [[row["source_asset_id"], row["target_asset_id"]] for row in route_rows],
        "complianceFeedGroups": compliance_feed_groups,
    }


def main() -> None:
    DATA_DIR.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    with conn:
        ddl(conn)
        insert_seed(conn)
    bootstrap = export_bootstrap(conn)
    BOOTSTRAP_PATH.write_text(
        "window.CATALOG_BOOTSTRAP = "
        + json.dumps(bootstrap, indent=2, sort_keys=True)
        + ";\n",
        encoding="utf-8",
    )
    counts = {
        "catalogs": conn.execute("select count(*) from catalogs").fetchone()[0],
        "schemas": conn.execute("select count(*) from schemas").fetchone()[0],
        "assets": conn.execute("select count(*) from assets").fetchone()[0],
        "lineage_routes": conn.execute("select count(*) from lineage").fetchone()[0],
        "obligations": conn.execute("select count(*) from obligations").fetchone()[0],
    }
    conn.close()
    print(json.dumps({"database": str(DB_PATH), "bootstrap": str(BOOTSTRAP_PATH), **counts}, indent=2))


if __name__ == "__main__":
    main()
