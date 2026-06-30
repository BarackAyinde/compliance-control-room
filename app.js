let CATALOG_BOOTSTRAP = window.CATALOG_BOOTSTRAP || {};
let BANK_PROFILE = CATALOG_BOOTSTRAP.bank || {
  name: "Synthetic Bank",
  metastore: "local_metastore",
  story: "Fallback local catalog dataset.",
};

let CATALOG_SOURCE = CATALOG_BOOTSTRAP.api ? "Local API" : "Static bootstrap";

let ASSETS = CATALOG_BOOTSTRAP.assets || [
  {
    id: "payment-core",
    name: "NIBSS Gateway Adapter",
    kind: "SWITCH",
    owner: "Payments Platform",
    location: "Lagos DC A",
    country: "Nigeria",
    zone: "LOCAL",
    classes: ["Payment instruction", "Settlement reference"],
    volume: "18.4k tx/min",
    x: 43,
    y: 50,
    posture: "local",
    system: "ISO 20022 / NIP bridge",
    remediation: "Already local. Keep lineage and key evidence attached.",
  },
  {
    id: "ledger-postgres",
    name: "Settlement Ledger",
    kind: "DATABASE",
    owner: "Core Banking",
    location: "Lagos DC A",
    country: "Nigeria",
    zone: "LOCAL",
    classes: ["Ledger entry", "Posting status", "Reversal marker"],
    volume: "NGN 7.8bn/day",
    x: 26,
    y: 74,
    posture: "local",
    system: "Postgres HA pair",
    remediation: "Add immutable audit export and failover attestation.",
  },
  {
    id: "auth-stream",
    name: "Card Auth Event Stream",
    kind: "STREAM",
    owner: "Cards",
    location: "AWS eu-west-1",
    country: "Ireland",
    zone: "OFFSHORE",
    classes: ["PAN token", "Merchant ID", "Auth response", "Terminal ID"],
    volume: "6.2k events/min",
    x: 72,
    y: 18,
    posture: "critical",
    system: "Kafka managed cluster",
    localTarget: "Lagos DC B",
    remediation: "Mirror to local Kafka, stop raw offshore retention, export only tokenized aggregates.",
  },
  {
    id: "obs-logs",
    name: "Payment Observability Logs",
    kind: "LOGS",
    owner: "SRE",
    location: "Azure West Europe",
    country: "Netherlands",
    zone: "OFFSHORE",
    classes: ["Transaction ID", "Session ID", "Error trace", "API payload fragment"],
    volume: "1.1 TB/day",
    x: 78,
    y: 48,
    posture: "critical",
    system: "Cloud log analytics",
    localTarget: "Lagos DC B",
    remediation: "Deploy local SIEM store, redact payload fragments, keep offshore metrics only.",
  },
  {
    id: "fraud-features",
    name: "Fraud Feature Store",
    kind: "ML",
    owner: "Risk Analytics",
    location: "Azure South Africa North",
    country: "South Africa",
    zone: "REGIONAL",
    classes: ["Velocity features", "Device score", "Merchant risk", "Account age"],
    volume: "220m rows",
    x: 69,
    y: 79,
    posture: "warning",
    system: "Feature table",
    localTarget: "Lagos DC B",
    remediation: "Rebuild feature store locally; send only scored decisions to external tools.",
  },
  {
    id: "bi-extract",
    name: "Executive BI Extract",
    kind: "BI",
    owner: "Finance",
    location: "Google europe-west2",
    country: "United Kingdom",
    zone: "OFFSHORE",
    classes: ["Daily aggregate", "Merchant segment", "Revenue bucket"],
    volume: "12 GB/day",
    x: 57,
    y: 30,
    posture: "warning",
    system: "Warehouse export",
    localTarget: "Lagos DC A",
    remediation: "Keep raw extract local; publish de-identified aggregate workbook offshore if needed.",
  },
  {
    id: "dr-backups",
    name: "Payment DR Backups",
    kind: "BACKUP",
    owner: "Infrastructure",
    location: "AWS eu-central-1",
    country: "Germany",
    zone: "OFFSHORE",
    classes: ["Ledger snapshot", "Payment instruction", "Customer reference"],
    volume: "34 TB",
    x: 86,
    y: 66,
    posture: "critical",
    system: "Object storage",
    localTarget: "Abuja DR Site",
    remediation: "Move regulated backups to Nigerian DR, retain offshore copy only if encrypted and approved.",
  },
  {
    id: "agent-memory",
    name: "Ops Agent Memory",
    kind: "AI",
    owner: "Operations",
    location: "Lagos DC A",
    country: "Nigeria",
    zone: "LOCAL",
    classes: ["Incident summary", "Runbook step", "Evidence pointer"],
    volume: "18k sessions",
    x: 17,
    y: 28,
    posture: "local",
    system: "Local vector index",
    remediation: "Keep memory local and filter transaction payloads before embedding.",
  },
];

let CATALOG_METADATA = CATALOG_BOOTSTRAP.catalogMetadata || {
  "payment-core": {
    catalog: "payment_governance",
    schema: "switching",
    object: "nibss_gateway_adapter",
    type: "System integration",
    classification: "Restricted payment operations",
    permissions: ["Payments Platform: owner", "Compliance: read", "Ops Agent: scoped read"],
    usage: "Primary switch context for payment routing, control tests, and incident triage.",
    evidence: ["NIP bridge config attestation", "Local operations sign-off", "Quarterly key rotation proof"],
    agentActions: ["Explain linked obligations", "Draft control evidence request", "Trace downstream routes"],
  },
  "ledger-postgres": {
    catalog: "payment_governance",
    schema: "settlement",
    object: "settlement_ledger",
    type: "Database table group",
    classification: "Critical financial record",
    permissions: ["Core Banking: owner", "Finance: aggregate read", "Auditors: evidence read"],
    usage: "Authoritative settlement postings, reversals, and daily reconciliation evidence.",
    evidence: ["HA pair topology", "Backup restore test", "Posting reconciliation sample"],
    agentActions: ["Generate audit evidence pack", "Check DR route", "Summarize posting lineage"],
  },
  "auth-stream": {
    catalog: "payment_governance",
    schema: "card_authorization",
    object: "card_auth_event_stream",
    type: "Streaming table",
    classification: "Sensitive payment event",
    permissions: ["Cards: owner", "Fraud: feature read", "Compliance Agent: policy read"],
    usage: "Card authorization events used by fraud models, observability, and residency controls.",
    evidence: ["Kafka topic inventory", "Retention policy export", "Offshore processing exception"],
    agentActions: ["Plan local mirror", "Find raw offshore retention", "Draft exception memo"],
  },
  "obs-logs": {
    catalog: "operational_evidence",
    schema: "observability",
    object: "payment_observability_logs",
    type: "Log index",
    classification: "Operational evidence with payload fragments",
    permissions: ["SRE: owner", "Incident Response: read", "Compliance Agent: redacted read"],
    usage: "Runtime evidence for API failures, incident response, and SLA reporting.",
    evidence: ["Log retention export", "Payload redaction sample", "SIEM routing rule"],
    agentActions: ["Identify payload exposure", "Draft SIEM migration task", "Build incident evidence query"],
  },
  "fraud-features": {
    catalog: "risk_intelligence",
    schema: "fraud_models",
    object: "fraud_feature_store",
    type: "Feature table",
    classification: "Derived risk intelligence",
    permissions: ["Risk Analytics: owner", "Fraud Model Ops: write", "Compliance: read"],
    usage: "Velocity, device, merchant, and account-age features for fraud scoring.",
    evidence: ["Feature definition registry", "Model input lineage", "Regional hosting approval"],
    agentActions: ["Map feature provenance", "Recommend local rebuild path", "Check model consumers"],
  },
  "bi-extract": {
    catalog: "operational_evidence",
    schema: "reporting",
    object: "executive_bi_extract",
    type: "Warehouse extract",
    classification: "De-identified management reporting",
    permissions: ["Finance: owner", "Executives: read", "Regulatory Reporting: read"],
    usage: "Daily aggregate revenue, merchant segment, and market-share reporting extract.",
    evidence: ["Aggregation query", "De-identification note", "Monthly return draft"],
    agentActions: ["Verify aggregate-only export", "Link return obligation", "Draft reporting evidence"],
  },
  "dr-backups": {
    catalog: "payment_governance",
    schema: "resilience",
    object: "payment_dr_backups",
    type: "Backup volume",
    classification: "Critical payment continuity",
    permissions: ["Infrastructure: owner", "BCP Team: restore", "Auditors: evidence read"],
    usage: "Disaster recovery snapshots for regulated payment systems and settlement state.",
    evidence: ["Object bucket inventory", "Encryption evidence", "Restore drill result"],
    agentActions: ["Assess residency gap", "Draft backup move plan", "Collect encryption proof"],
  },
  "agent-memory": {
    catalog: "operational_evidence",
    schema: "agent_context",
    object: "ops_agent_memory",
    type: "Vector index",
    classification: "Filtered operational memory",
    permissions: ["Operations: owner", "Compliance Agent: read/write", "Audit: evidence read"],
    usage: "Incident summaries, runbook recall, and evidence pointers for governed agent work.",
    evidence: ["Embedding filter policy", "Memory retention control", "Incident replay sample"],
    agentActions: ["Review memory filters", "Summarize linked evidence", "Prepare audit replay"],
  },
};

let CATALOGS = CATALOG_BOOTSTRAP.catalogs || [];
let SCHEMAS = CATALOG_BOOTSTRAP.schemas || [];

let ROUTES = CATALOG_BOOTSTRAP.routes || [
  ["payment-core", "auth-stream"],
  ["payment-core", "obs-logs"],
  ["payment-core", "fraud-features"],
  ["ledger-postgres", "dr-backups"],
  ["ledger-postgres", "bi-extract"],
  ["payment-core", "agent-memory"],
  ["payment-core", "ledger-postgres"],
];

let COMPLIANCE_FEED_GROUPS = CATALOG_BOOTSTRAP.complianceFeedGroups || [
  {
    label: "Today",
    items: [
      {
        id: "residency-review",
        title: "Payments transaction data stored and managed in Nigeria",
        type: "CBN obligation",
        status: "open",
        owner: "Payments / Infrastructure",
        deadline: "2027-01-01",
        basis: "Circular item 2",
        body: "All Nigeria-generated payments transaction data must be stored and managed in Nigeria in line with Nigerian data protection law.",
        assets: ["Card Auth Event Stream", "Payment Observability Logs", "Payment DR Backups"],
        evidence: "Evidence gap",
      },
      {
        id: "ubo-refresh",
        title: "UBO disclosure",
        type: "Evidence event",
        status: "watch",
        owner: "Legal / Compliance",
        deadline: "On request",
        basis: "Circular item 1",
        body: "Maintain accurate UBO records for significant shareholders and make them available to CBN on request.",
        assets: ["Ops Agent Memory"],
        evidence: "76% complete",
      },
    ],
  },
  {
    label: "This Week",
    items: [
      {
        id: "market-returns",
        title: "Monthly market-share returns",
        type: "Regulatory return",
        status: "draft",
        owner: "Regulatory Reporting",
        deadline: "Monthly",
        basis: "Circular item 3(iii)",
        body: "Submit market share returns according to CBN-prescribed templates and timelines.",
        assets: ["Executive BI Extract", "Settlement Ledger"],
        evidence: "Draft pack",
      },
      {
        id: "catalog-link",
        title: "Catalog linkage needed for circular evidence",
        type: "Catalog event",
        status: "new",
        owner: "Data Governance",
        deadline: "This week",
        basis: "Catalog control",
        body: "Related assets should be linked to source obligations so scan results can flow into the register.",
        assets: ["NIBSS Gateway Adapter", "Settlement Ledger"],
        evidence: "Awaiting scan",
      },
    ],
  },
  {
    label: "Upcoming",
    items: [
      {
        id: "concentration-limits",
        title: "Issuing/acquiring concentration limits",
        type: "Policy update",
        status: "watch",
        owner: "Strategy / Regulatory Reporting",
        deadline: "2026-12-31",
        basis: "Circular item 3",
        body: "If consumer issuing exceeds 25% market share, merchant acquiring must not exceed 15% during the same rolling twelve-month period, and vice versa.",
        assets: ["Executive BI Extract"],
        evidence: "Exposure model",
      },
      {
        id: "residency-deadline",
        title: "Data localisation deadline approaching",
        type: "Deadline",
        status: "open",
        owner: "Compliance PMO",
        deadline: "2027-01-01",
        basis: "NIG-PAY-2027",
        body: "Programme-level deadline for payment data residency, local operations, and supporting evidence.",
        assets: ["Card Auth Event Stream", "Fraud Feature Store", "Payment DR Backups"],
        evidence: "Not regulator-ready",
      },
    ],
  },
  {
    label: "Historical",
    items: [
      {
        id: "circular-import",
        title: "CBN circular imported into Compliance Register",
        type: "Policy intake",
        status: "complete",
        owner: "Compliance Operations",
        deadline: "2026-06-15",
        basis: "PSS/DIR/PUB/CIR/001/004",
        body: "Initial obligation set captured: UBO disclosure, data localisation, concentration limits, and monthly returns.",
        assets: ["Compliance Register"],
        evidence: "Source mapped",
      },
    ],
  },
];

const ICONS = {
  home: `
    <svg class="sidebar-option__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  `,
  register: `
    <svg class="sidebar-option__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h12v18H6z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  `,
  catalog: `
    <svg class="sidebar-option__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h7v7H4z" />
      <path d="M13 5h7v7h-7z" />
      <path d="M4 14h7v5H4z" />
      <path d="M13 14h7v5h-7z" />
    </svg>
  `,
  remediation: `
    <svg class="sidebar-option__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h10" />
      <path d="m10 8 4 4-4 4" />
      <path d="M17 5v14" />
      <path d="M20 8v8" />
    </svg>
  `,
  audit: `
    <svg class="sidebar-option__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v5h4" />
      <path d="M10 13h6" />
      <path d="M10 17h4" />
    </svg>
  `,
  agent: `
    <svg class="sidebar-option__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v3" />
      <path d="M6 9h12v9H6z" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M9 18v2" />
      <path d="M15 18v2" />
    </svg>
  `,
};

const PAGES = [
  { id: "home", label: "Home", icon: "home" },
  { id: "register", label: "Compliance Register", icon: "register" },
  { id: "catalog", label: "Catalog Explorer", icon: "catalog", scanAction: true },
  { id: "remediation", label: "Remediation Queue", icon: "remediation", scanAction: true },
  { id: "audit", label: "Audit Report", icon: "audit", scanAction: true },
  { id: "agent", label: "Compliance Agent", icon: "agent" },
];

const SCAN_STATUS_META = {
  never_run: {
    label: "Never Run",
    button: "Run Compliance Scan",
    detail: "No Compliance Readiness Scan has been run in this workspace.",
  },
  running: {
    label: "Running",
    button: "Scanning...",
    detail: "Control room is scanning infrastructure, catalog exposure, and remediation state.",
  },
  complete: {
    label: "Complete",
    button: "Run Compliance Scan",
    detail: "Latest Compliance Readiness Scan completed successfully.",
  },
  failed: {
    label: "Failed",
    button: "Retry Compliance Scan",
    detail: "The last Compliance Readiness Scan failed before results were written.",
  },
};

const SCAN_LOADING_STEPS = [
  "Inventorying catalog assets",
  "Tracing payment-data routes",
  "Checking Nigerian residency controls",
  "Building remediation handoff",
];

const GRAPH_MIN_ZOOM = 0.8;
const GRAPH_MAX_ZOOM = 2.2;
const GRAPH_ZOOM_STEP = 0.15;
const APP_STATE_STORAGE_KEY = "ccr.control-room-state.v1";

function createDefaultState() {
  return {
    activePage: "home",
    selectedAssetId: defaultSelectedAssetId(),
    previewAssetId: null,
    graphLegendCollapsed: false,
    homeScanDockCollapsed: false,
    catalogExpanded: {},
    catalogSearch: "",
    agentTargetId: null,
    agentChatOpen: false,
    agentMessages: [
      {
        role: "agent",
        body: "Compliance Agent online. Point me at an asset, ask for residency blockers, request a remediation plan, or have me prepare the audit narrative from the current CCR context.",
      },
    ],
    graphZoom: 1,
    graphPanX: 0,
    graphPanY: 0,
    remediated: new Set(),
    theme: "dark",
    sidebarState: "expanded",
    sidebarWidth: 280,
    scan: {
      status: "never_run",
      startedAt: null,
      lastRunAt: null,
      result: null,
    },
  };
}

function clampNumber(value, min, max, fallback) {
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
}

function loadPersistedState() {
  const fallback = createDefaultState();
  try {
    const rawState = window.localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!rawState) return fallback;
    const saved = JSON.parse(rawState);
    const pageIds = new Set(PAGES.map((page) => page.id));
    const assetIds = new Set(ASSETS.map((asset) => asset.id));
    const scanStatus = SCAN_STATUS_META[saved.scan?.status] ? saved.scan.status : fallback.scan.status;

    return {
      ...fallback,
      activePage: pageIds.has(saved.activePage) ? saved.activePage : fallback.activePage,
      selectedAssetId: assetIds.has(saved.selectedAssetId) ? saved.selectedAssetId : fallback.selectedAssetId,
      graphLegendCollapsed: Boolean(saved.graphLegendCollapsed),
      homeScanDockCollapsed: Boolean(saved.homeScanDockCollapsed),
      catalogExpanded: saved.catalogExpanded && typeof saved.catalogExpanded === "object" ? saved.catalogExpanded : fallback.catalogExpanded,
      catalogSearch: typeof saved.catalogSearch === "string" ? saved.catalogSearch : fallback.catalogSearch,
      agentTargetId: assetIds.has(saved.agentTargetId) ? saved.agentTargetId : null,
      agentChatOpen: Boolean(saved.agentChatOpen),
      agentMessages: Array.isArray(saved.agentMessages)
        ? saved.agentMessages
          .filter((message) => ["agent", "user"].includes(message?.role) && typeof message.body === "string")
          .slice(-18)
        : fallback.agentMessages,
      graphZoom: clampNumber(Number(saved.graphZoom), GRAPH_MIN_ZOOM, GRAPH_MAX_ZOOM, fallback.graphZoom),
      graphPanX: clampNumber(Number(saved.graphPanX), -1200, 1200, fallback.graphPanX),
      graphPanY: clampNumber(Number(saved.graphPanY), -1200, 1200, fallback.graphPanY),
      remediated: new Set(Array.isArray(saved.remediated) ? saved.remediated.filter((assetId) => assetIds.has(assetId)) : []),
      theme: saved.theme === "light" ? "light" : "dark",
      sidebarState: saved.sidebarState === "collapsed" ? "collapsed" : "expanded",
      sidebarWidth: clampNumber(Number(saved.sidebarWidth), 220, 520, fallback.sidebarWidth),
      scan: {
        status: scanStatus === "running" ? "never_run" : scanStatus,
        startedAt: scanStatus === "running" ? null : saved.scan?.startedAt || null,
        lastRunAt: scanStatus === "running" ? null : saved.scan?.lastRunAt || null,
        result: scanStatus === "running" ? null : saved.scan?.result || null,
      },
    };
  } catch {
    return fallback;
  }
}

const state = loadPersistedState();

const themeToggle = document.querySelector("#themeToggle");
const themeLabel = document.querySelector(".theme-toggle__label");
const app = document.querySelector("#app");
const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("#sidebarToggle");
const sidebarResize = document.querySelector("#sidebarResize");
const sidebarNav = document.querySelector("#sidebarNav");
const mainContent = document.querySelector("#mainContent");
const homeActionBar = document.querySelector("#homeActionBar");

function defaultSelectedAssetId() {
  if (ASSETS.some((asset) => asset.id === "card_auth_event_stream")) return "card_auth_event_stream";
  return ASSETS[0]?.id || "auth-stream";
}

function applyCatalogBootstrap(nextBootstrap, source = "Local API") {
  if (!nextBootstrap || !Array.isArray(nextBootstrap.assets) || !nextBootstrap.catalogMetadata) return false;
  CATALOG_BOOTSTRAP = nextBootstrap;
  BANK_PROFILE = nextBootstrap.bank || BANK_PROFILE;
  CATALOG_SOURCE = source;
  ASSETS = nextBootstrap.assets;
  CATALOG_METADATA = nextBootstrap.catalogMetadata;
  CATALOGS = nextBootstrap.catalogs || [];
  SCHEMAS = nextBootstrap.schemas || [];
  ROUTES = nextBootstrap.routes || [];
  COMPLIANCE_FEED_GROUPS = nextBootstrap.complianceFeedGroups || [];

  const assetIds = new Set(ASSETS.map((asset) => asset.id));
  if (!assetIds.has(state.selectedAssetId)) state.selectedAssetId = defaultSelectedAssetId();
  if (state.agentTargetId && !assetIds.has(state.agentTargetId)) state.agentTargetId = null;
  state.remediated = new Set(Array.from(state.remediated).filter((assetId) => assetIds.has(assetId)));
  return true;
}

async function loadCatalogFromApi() {
  try {
    const response = await fetch("/api/ccr/catalog/bootstrap", { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    if (!applyCatalogBootstrap(payload, "SQLite API")) return;
    renderAll();
  } catch {
    // Static-file mode has no API; keep the generated bootstrap.
  }
}

function scanMeta() {
  return SCAN_STATUS_META[state.scan.status] || SCAN_STATUS_META.never_run;
}

function readPersistedPayload() {
  try {
    return JSON.parse(window.localStorage.getItem(APP_STATE_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function persistState() {
  const previousPayload = readPersistedPayload();
  const scanState = state.scan.status === "running" && previousPayload?.scan
    ? previousPayload.scan
    : state.scan;

  const payload = {
    activePage: state.activePage,
    selectedAssetId: state.selectedAssetId,
    graphLegendCollapsed: state.graphLegendCollapsed,
    homeScanDockCollapsed: state.homeScanDockCollapsed,
    catalogExpanded: state.catalogExpanded,
    catalogSearch: state.catalogSearch,
    agentTargetId: state.agentTargetId,
    agentChatOpen: state.agentChatOpen,
    agentMessages: state.agentMessages.slice(-18),
    graphZoom: state.graphZoom,
    graphPanX: state.graphPanX,
    graphPanY: state.graphPanY,
    remediated: Array.from(state.remediated),
    theme: state.theme,
    sidebarState: state.sidebarState,
    sidebarWidth: state.sidebarWidth,
    scan: scanState,
  };

  try {
    window.localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Persistence is a convenience for this static prototype; rendering should continue if storage is unavailable.
  }
}

function applyShellState() {
  document.documentElement.dataset.theme = state.theme;
  themeToggle.checked = state.theme === "light";
  themeLabel.textContent = state.theme === "light" ? "Light" : "Dark";
  app.dataset.sidebar = state.sidebarState;
  sidebarToggle.setAttribute("aria-expanded", String(state.sidebarState !== "collapsed"));
  sidebar.style.setProperty("--sidebar-width", `${state.sidebarWidth}px`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function effectiveRemediatedSet() {
  return new Set(state.remediated);
}

function isAssetLocal(asset) {
  const remediated = effectiveRemediatedSet().has(asset.id);
  return asset.country === "Nigeria" || remediated;
}

function baseAsset(assetId) {
  return ASSETS.find((asset) => asset.id === assetId) || ASSETS[0];
}

function assetView(asset) {
  const local = isAssetLocal(asset);
  const metadata = CATALOG_METADATA[asset.id] || {};
  return {
    ...asset,
    ...metadata,
    path: `${metadata.catalog || "workspace"}.${metadata.schema || "default"}.${metadata.object || asset.id}`,
    effectiveLocation: local ? asset.localTarget || asset.location : asset.location,
    effectiveCountry: local ? "Nigeria" : asset.country,
    effectiveZone: local ? "LOCAL" : asset.zone,
    effectivePosture: local ? "local" : asset.posture,
  };
}

function hasPaymentData(asset) {
  return asset.classes.some((item) => {
    const text = item.toLowerCase();
    return text.includes("payment") || text.includes("auth") || text.includes("ledger") || text.includes("pan") || text.includes("transaction");
  });
}

function severityForAsset(asset) {
  const view = assetView(asset);
  if (view.effectiveCountry === "Nigeria") return "compliant";
  if (hasPaymentData(view) || view.effectivePosture === "critical") return "critical";
  return "warning";
}

function actionPriority(severity) {
  if (severity === "critical") return "P0";
  if (severity === "warning") return "P1";
  return "P2";
}

function buildComplianceScanResult(completedAt) {
  const scannedAssets = ASSETS.map((asset) => {
    const view = assetView(asset);
    const compliant = view.effectiveCountry === "Nigeria";
    const severity = severityForAsset(asset);
    return {
      assetId: asset.id,
      name: asset.name,
      kind: asset.kind,
      owner: asset.owner,
      location: view.effectiveLocation,
      country: view.effectiveCountry,
      zone: view.effectiveZone,
      dataClasses: [...asset.classes],
      volume: asset.volume,
      system: asset.system,
      compliant,
      offshore: !compliant,
      critical: severity === "critical",
      severity,
      evidence: compliant ? "Resident control mapped" : "Evidence gap",
      action: compliant
        ? "Keep evidence linked to the CBN obligation register."
        : asset.remediation,
    };
  });

  const compliant = scannedAssets.filter((asset) => asset.compliant);
  const offshore = scannedAssets.filter((asset) => asset.offshore);
  const critical = scannedAssets.filter((asset) => asset.critical);
  const findings = offshore.map((asset) => ({
    id: `finding-${asset.assetId}`,
    assetId: asset.assetId,
    title: `${asset.name} is ${asset.zone.toLowerCase()} for regulated payment context`,
    severity: asset.severity,
    owner: asset.owner,
    location: asset.location,
    country: asset.country,
    evidence: asset.evidence,
    body: asset.critical
      ? "Critical payment data or recovery evidence is outside Nigeria and needs a migration or containment plan."
      : "Derived or lower-risk data is outside Nigeria and needs classification, redaction, or local-source proof.",
    action: asset.action,
  }));

  const remediationQueue = findings.map((finding, index) => ({
    id: `remediation-${finding.assetId}`,
    findingId: finding.id,
    rank: index + 1,
    priority: actionPriority(finding.severity),
    severity: finding.severity,
    assetId: finding.assetId,
    title: finding.action,
    owner: finding.owner,
    due: finding.severity === "critical" ? "48 hours" : "7 days",
    status: "open",
    evidenceTarget: finding.severity === "critical" ? "Migration proof + control attestation" : "Classification note + redaction proof",
  }));

  const readinessScore = Math.round((compliant.length / scannedAssets.length) * 100);
  const nextAction = critical.length
    ? {
        title: "Contain critical offshore payment data first",
        owner: "Compliance PMO + Infrastructure",
        due: "48 hours",
        body: `Start with ${critical[0].name}. ${critical[0].action}`,
        assetIds: critical.map((asset) => asset.assetId),
      }
    : offshore.length
      ? {
          title: "Close remaining offshore evidence gaps",
          owner: "Data Governance",
          due: "7 days",
          body: `Review ${offshore[0].name}. ${offshore[0].action}`,
          assetIds: offshore.map((asset) => asset.assetId),
        }
      : {
          title: "Prepare audit export",
          owner: "Compliance Operations",
          due: "Ready now",
          body: "All scanned assets are resident or evidence-backed. Export the audit pack for reviewer signoff.",
          assetIds: compliant.map((asset) => asset.assetId),
        };

  return {
    id: `compliance-readiness-scan-${Date.now()}`,
    title: "Compliance Readiness Scan",
    completedAt,
    readinessScore,
    counts: {
      total: scannedAssets.length,
      compliant: compliant.length,
      offshore: offshore.length,
      critical: critical.length,
      remediationOpen: remediationQueue.length,
    },
    scannedAssets,
    compliant,
    offshore,
    critical,
    findings,
    remediationQueue,
    nextAction,
    auditReport: {
      status: critical.length ? "Action Required" : offshore.length ? "Evidence Review" : "Audit Ready",
      summary: `${readinessScore}% resident readiness across ${scannedAssets.length} catalog assets. ${critical.length} critical and ${offshore.length} offshore findings remain open.`,
      sections: [
        { label: "Compliant", count: compliant.length, body: "Resident systems with mapped ownership, location, data classes, and evidence handoff." },
        { label: "Offshore", count: offshore.length, body: "Systems outside Nigeria requiring classification, containment, or migration evidence." },
        { label: "Critical", count: critical.length, body: "Payment-data or recovery systems outside Nigeria that should be handled first." },
        { label: "Next Action", count: remediationQueue.length, body: nextAction.body },
      ],
    },
  };
}

function statusPill(posture) {
  if (posture === "local") return ["tiny-pill--ok", "LOCAL"];
  if (posture === "warning") return ["tiny-pill--warn", "CHECK"];
  return ["tiny-pill--bad", "RISK"];
}

function previewAsset() {
  if (!state.previewAssetId) return null;
  return assetView(baseAsset(state.previewAssetId));
}

function selectedAsset() {
  return assetView(baseAsset(state.selectedAssetId));
}

function linkedObligations(asset) {
  return COMPLIANCE_FEED_GROUPS.flatMap((group) => group.items)
    .filter((item) => item.assets.includes(asset.name))
    .map((item) => ({
      title: item.title,
      type: item.type,
      status: item.status,
      basis: item.basis,
    }));
}

function lineageForAsset(assetId) {
  return ROUTES
    .filter(([fromId, toId]) => fromId === assetId || toId === assetId)
    .map(([fromId, toId]) => {
      const from = assetView(baseAsset(fromId));
      const to = assetView(baseAsset(toId));
      return {
        direction: fromId === assetId ? "outbound" : "inbound",
        from,
        to,
      };
    });
}

function catalogAssets() {
  return ASSETS.map(assetView).sort((a, b) => a.path.localeCompare(b.path));
}

function catalogLabel(catalogName) {
  return CATALOGS.find((catalog) => catalog.name === catalogName)?.displayName || catalogName;
}

function schemaRecord(catalogName, schemaName) {
  return SCHEMAS.find((schema) => schema.catalog === catalogName && schema.name === schemaName);
}

function treeToggleKey(type, ...parts) {
  return `${type}:${parts.join(".")}`;
}

function isTreeOpen(type, parts, defaultOpen) {
  const key = treeToggleKey(type, ...parts);
  return Object.prototype.hasOwnProperty.call(state.catalogExpanded, key)
    ? state.catalogExpanded[key]
    : defaultOpen;
}

function openSelectedAssetPath() {
  const asset = selectedAsset();
  state.catalogExpanded[treeToggleKey("catalog", asset.catalog)] = true;
  state.catalogExpanded[treeToggleKey("schema", asset.catalog, asset.schema)] = true;
}

function filteredCatalogAssets(assets) {
  const query = state.catalogSearch.trim().toLowerCase();
  if (!query) return assets;
  return assets.filter((asset) => [
    asset.name,
    asset.path,
    asset.owner,
    asset.kind,
    asset.type,
    asset.classification,
    asset.system,
    asset.effectiveLocation,
    asset.classes.join(" "),
  ].join(" ").toLowerCase().includes(query));
}

function remediationSeverity(asset) {
  if (asset.effectivePosture === "critical" || (asset.effectiveCountry !== "Nigeria" && hasPaymentData(asset))) {
    return {
      key: "critical",
      label: "Critical",
    };
  }

  return {
    key: "warning",
    label: "Warning",
  };
}

function remediationWorkItems() {
  if (state.scan.result) {
    return state.scan.result.remediationQueue.map((item) => {
      const asset = assetView(baseAsset(item.assetId));
      const obligations = linkedObligations(asset);
      const primaryObligation = obligations[0];
      return {
        id: item.id,
        title: item.severity === "critical"
          ? `Localize ${asset.name} regulated data path`
          : `Validate ${asset.name} residency exception`,
        severity: {
          key: item.severity,
          label: item.severity === "critical" ? "Critical" : "Warning",
        },
        affectedAsset: asset.name,
        obligation: primaryObligation
          ? `${primaryObligation.basis} / ${primaryObligation.title}`
          : "CBN payment data residency",
        suggestedNextAction: item.title,
        owner: item.owner,
        status: item.status === "open" ? "Open" : item.status,
        evidenceNeeded: item.evidenceTarget,
        assetId: item.assetId,
      };
    });
  }

  return ASSETS
    .map(assetView)
    .filter((asset) => asset.effectivePosture !== "local")
    .map((asset) => {
      const obligations = linkedObligations(asset);
      const primaryObligation = obligations[0];
      const severity = remediationSeverity(asset);
      const evidenceNeeded = asset.evidence && asset.evidence.length
        ? asset.evidence.slice(0, 2).join(" + ")
        : "Control evidence export";

      return {
        id: `remediate-${asset.id}`,
        title: severity.key === "critical"
          ? `Localize ${asset.name} regulated data path`
          : `Validate ${asset.name} residency exception`,
        severity,
        affectedAsset: asset.name,
        obligation: primaryObligation
          ? `${primaryObligation.basis} / ${primaryObligation.title}`
          : "CBN payment data residency",
        suggestedNextAction: asset.remediation,
        owner: asset.owner,
        status: severity.key === "critical" ? "Open" : "Triage",
        evidenceNeeded,
        assetId: asset.id,
      };
    })
    .sort((a, b) => {
      const order = { critical: 0, warning: 1 };
      return order[a.severity.key] - order[b.severity.key] || a.affectedAsset.localeCompare(b.affectedAsset);
    });
}

function latestScanResult() {
  return state.scan.result || buildComplianceScanResult(state.scan.lastRunAt || "not recorded");
}

function evidenceRecordsForReport(result) {
  const evidenceAssets = result.scannedAssets.map((scanAsset) => {
    const asset = assetView(baseAsset(scanAsset.assetId));
    const obligations = linkedObligations(asset);
    return {
      id: `evidence-${asset.id}`,
      title: asset.name,
      owner: asset.owner,
      status: scanAsset.compliant ? "Collected" : "Gap",
      tone: scanAsset.compliant ? "ok" : scanAsset.critical ? "bad" : "warn",
      body: asset.evidence && asset.evidence.length
        ? asset.evidence.join(" / ")
        : "Evidence request pending",
      basis: obligations[0]?.basis || "CBN residency control",
    };
  });

  const registerEvidence = COMPLIANCE_FEED_GROUPS.flatMap((group) => group.items)
    .slice(0, 4)
    .map((item) => ({
      id: `register-evidence-${item.id}`,
      title: item.title,
      owner: item.owner,
      status: item.status === "complete" ? "Collected" : item.evidence,
      tone: item.status === "complete" ? "ok" : item.status === "open" ? "bad" : "warn",
      body: item.body,
      basis: item.basis,
    }));

  return [...evidenceAssets, ...registerEvidence];
}

function evidenceGapsForReport(result) {
  const findingGaps = result.findings.map((finding) => ({
    id: `gap-${finding.assetId}`,
    title: finding.title,
    owner: finding.owner,
    severity: finding.severity,
    body: finding.action,
    evidence: finding.evidence,
  }));

  const registerGaps = COMPLIANCE_FEED_GROUPS.flatMap((group) => group.items)
    .filter((item) => item.status !== "complete" && (item.evidence.toLowerCase().includes("gap") || item.evidence.toLowerCase().includes("awaiting") || item.status === "open"))
    .map((item) => ({
      id: `gap-${item.id}`,
      title: item.title,
      owner: item.owner,
      severity: item.status === "open" ? "critical" : "warning",
      body: item.body,
      evidence: item.evidence,
    }));

  return [...findingGaps, ...registerGaps];
}

function renderAuditMetric(label, value, tone = "") {
  return `
    <div class="audit-metric ${tone ? `audit-metric--${tone}` : ""}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderAuditReport() {
  const result = latestScanResult();
  const queueItems = remediationWorkItems();
  const evidenceRecords = evidenceRecordsForReport(result);
  const evidenceGaps = evidenceGapsForReport(result);
  const collectedCount = evidenceRecords.filter((item) => item.status === "Collected").length;
  const criticalQueueCount = queueItems.filter((item) => item.severity.key === "critical").length;
  const openQueueCount = queueItems.filter((item) => item.status !== "Done").length;
  const exportTone = result.counts.critical ? "bad" : result.counts.offshore || evidenceGaps.length ? "warn" : "ok";
  const exportStatus = exportTone === "ok" ? "CBN Ready" : exportTone === "warn" ? "Draft" : "Blocked";

  return `
    <div class="audit-report-page">
      <header class="audit-report-header">
        <div>
          <span class="audit-report-header__kicker">Audit Report</span>
          <h1>Regulator-facing compliance synthesis</h1>
          <p>${escapeHtml(result.auditReport.summary)}</p>
        </div>
        <div class="audit-report-header__actions">
          ${renderComplianceScanButton("audit")}
        </div>
      </header>

      <section class="audit-section audit-section--summary" aria-labelledby="audit-summary-title">
        <div class="audit-section__head">
          <div>
            <span>Executive compliance summary</span>
            <h2 id="audit-summary-title">${escapeHtml(result.auditReport.status)}</h2>
          </div>
          <span class="tiny-pill ${exportTone === "ok" ? "tiny-pill--ok" : exportTone === "warn" ? "tiny-pill--warn" : "tiny-pill--bad"}">${escapeHtml(exportStatus)}</span>
        </div>
        <div class="audit-metric-grid">
          ${renderAuditMetric("Readiness", `${result.readinessScore}%`, result.readinessScore >= 80 ? "ok" : result.readinessScore >= 50 ? "warn" : "bad")}
          ${renderAuditMetric("Scanned Assets", result.counts.total)}
          ${renderAuditMetric("Offshore Findings", result.counts.offshore, result.counts.offshore ? "warn" : "ok")}
          ${renderAuditMetric("Critical Findings", result.counts.critical, result.counts.critical ? "bad" : "ok")}
        </div>
        <div class="audit-summary-note">
          <span>Next action</span>
          <strong>${escapeHtml(result.nextAction.title)}</strong>
          <p>${escapeHtml(result.nextAction.body)}</p>
        </div>
      </section>

      <section class="audit-section audit-section--latest" aria-labelledby="latest-scan-title">
        <div class="audit-section__head">
          <div>
            <span>Latest scan results</span>
            <h2 id="latest-scan-title">${escapeHtml(result.title)}</h2>
          </div>
          <span>${escapeHtml(result.completedAt)}</span>
        </div>
        <div class="latest-scan-grid">
          ${result.auditReport.sections.map((section) => `
            <article class="audit-mini-card">
              <span>${escapeHtml(section.label)}</span>
              <strong>${escapeHtml(section.count)}</strong>
              <p>${escapeHtml(section.body)}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="audit-section audit-section--critical" aria-labelledby="critical-findings-title">
        <div class="audit-section__head">
          <div>
            <span>Critical offshore findings</span>
            <h2 id="critical-findings-title">${result.critical.length} priority items</h2>
          </div>
          <span>Payment-data focus</span>
        </div>
        <div class="audit-list">
          ${result.critical.map((item) => `
            <button class="audit-line audit-line--critical" data-catalog-asset="${item.assetId}" type="button">
              <span>${escapeHtml(item.owner)}</span>
              <strong>${escapeHtml(item.name)}</strong>
              <small>${escapeHtml(item.location)} / ${escapeHtml(item.action)}</small>
            </button>
          `).join("") || `<div class="audit-empty">No critical offshore findings in the latest scan.</div>`}
        </div>
      </section>

      <section class="audit-section audit-section--queue" aria-labelledby="queue-status-title">
        <div class="audit-section__head">
          <div>
            <span>Remediation queue status</span>
            <h2 id="queue-status-title">${openQueueCount} open work items</h2>
          </div>
          <button class="audit-text-button" data-page-nav="remediation" type="button">Open Queue</button>
        </div>
        <div class="audit-queue-strip">
          ${renderAuditMetric("Critical", criticalQueueCount, criticalQueueCount ? "bad" : "ok")}
          ${renderAuditMetric("Owners", new Set(queueItems.map((item) => item.owner)).size)}
          ${renderAuditMetric("Evidence Targets", queueItems.length)}
        </div>
        <div class="audit-list">
          ${queueItems.slice(0, 4).map((item) => `
            <button class="audit-line" data-catalog-asset="${item.assetId}" type="button">
              <span>${escapeHtml(item.status)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.owner)} / ${escapeHtml(item.evidenceNeeded)}</small>
            </button>
          `).join("") || `<div class="audit-empty">No open remediation queue items.</div>`}
        </div>
      </section>

      <section class="audit-section audit-section--evidence" aria-labelledby="evidence-collected-title">
        <div class="audit-section__head">
          <div>
            <span>Evidence collected</span>
            <h2 id="evidence-collected-title">${collectedCount} collected artifacts</h2>
          </div>
          <span>${evidenceRecords.length} total signals</span>
        </div>
        <div class="audit-evidence-grid">
          ${evidenceRecords.slice(0, 8).map((item) => `
            <article class="audit-evidence-card audit-evidence-card--${item.tone}">
              <span>${escapeHtml(item.basis)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.owner)} / ${escapeHtml(item.status)}</small>
              <p>${escapeHtml(item.body)}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="audit-section audit-section--gaps" aria-labelledby="evidence-gaps-title">
        <div class="audit-section__head">
          <div>
            <span>Outstanding evidence gaps</span>
            <h2 id="evidence-gaps-title">${evidenceGaps.length} gaps to close</h2>
          </div>
          <span>Audit blockers</span>
        </div>
        <div class="audit-list">
          ${evidenceGaps.slice(0, 6).map((item) => `
            <article class="audit-gap audit-gap--${item.severity}">
              <span>${escapeHtml(item.evidence)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.owner)}</small>
              <p>${escapeHtml(item.body)}</p>
            </article>
          `).join("") || `<div class="audit-empty">No outstanding evidence gaps.</div>`}
        </div>
      </section>

      <section class="audit-section audit-section--export" aria-labelledby="cbn-export-title">
        <div class="audit-section__head">
          <div>
            <span>CBN-ready report/export area</span>
            <h2 id="cbn-export-title">${escapeHtml(exportStatus)} export pack</h2>
          </div>
          <span>JSON / PDF shell</span>
        </div>
        <div class="audit-export-panel">
          <div>
            <span>Included sections</span>
            <p>Executive summary, latest scan results, offshore findings, remediation queue status, collected evidence, evidence gaps, and reviewer-ready export notes.</p>
          </div>
          <div class="audit-export-actions">
            <button class="audit-export-button audit-export-button--primary" type="button">Export CBN Pack</button>
            <button class="audit-export-button" type="button">Download Evidence Index</button>
            <button class="audit-export-button" type="button">Reviewer Sign-off</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderSidebar() {
  sidebarNav.innerHTML = PAGES.map((page) => `
    <button class="sidebar-option ${page.id === state.activePage ? "sidebar-option--active" : ""}" data-page-nav="${page.id}" type="button" ${page.id === state.activePage ? 'aria-current="page"' : ""}>
      ${ICONS[page.icon]}
      <span>${escapeHtml(page.label)}</span>
    </button>
  `).join("");
}

function renderComplianceScanButton(slot = "default") {
  const meta = scanMeta();
  const disabled = state.scan.status === "running" ? "disabled" : "";
  return `
    <button class="scan-button" data-run-scan="${slot}" type="button" ${disabled}>
      <span class="scan-button__dot scan-button__dot--${state.scan.status}"></span>
      <span>${escapeHtml(meta.button)}</span>
    </button>
    <span class="scan-status scan-status--${state.scan.status}">${escapeHtml(meta.label)}</span>
  `;
}

function renderHomeActions() {
  homeActionBar.innerHTML = renderComplianceScanButton("home");
}

function renderScanLoadingOverlay() {
  let overlay = document.querySelector("[data-scan-flow]");
  if (state.scan.status !== "running") {
    overlay?.remove();
    return;
  }

  if (!overlay) {
    overlay = document.createElement("aside");
    overlay.className = "scan-flow";
    overlay.dataset.scanFlow = "true";
    mainContent.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="scan-flow__stage" role="status" aria-live="polite">
      <div class="scan-radar" aria-hidden="true">
        <span class="scan-radar__ring"></span>
        <span class="scan-radar__ring"></span>
        <span class="scan-radar__sweep"></span>
      </div>
      <div class="scan-flow__copy">
        <span>Compliance Readiness Scan</span>
        <h2>Control room scanning infrastructure</h2>
        <p>${escapeHtml(scanMeta().detail)}</p>
      </div>
      <div class="scan-flow__steps">
        ${SCAN_LOADING_STEPS.map((step, index) => `
          <span style="--step-index: ${index};">
            <i></i>
            ${escapeHtml(step)}
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function renderResultMetric(label, value, tone = "") {
  return `
    <div class="scan-metric ${tone ? `scan-metric--${tone}` : ""}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderHomeScanDock() {
  const homePage = document.getElementById("homePage");
  let dock = homePage.querySelector(".home-scan-dock");
  if (state.scan.status !== "complete" || !state.scan.result) {
    dock?.remove();
    return;
  }

  if (!dock) {
    dock = document.createElement("aside");
    dock.className = "home-scan-dock";
    homePage.appendChild(dock);
  }
  dock.dataset.collapsed = String(state.homeScanDockCollapsed);

  const result = state.scan.result;
  dock.innerHTML = `
    <button class="home-scan-dock__toggle" data-home-scan-dock-toggle type="button" aria-expanded="${!state.homeScanDockCollapsed}">
      <span>${escapeHtml(result.title)}</span>
      <strong>${result.readinessScore}% Ready</strong>
      <i aria-hidden="true">${state.homeScanDockCollapsed ? "+" : "-"}</i>
    </button>
    <div class="home-scan-dock__body">
      <div class="home-scan-dock__grid">
        ${renderResultMetric("Compliant", result.counts.compliant, "ok")}
        ${renderResultMetric("Offshore", result.counts.offshore, "warn")}
        ${renderResultMetric("Critical", result.counts.critical, "bad")}
      </div>
      <div class="home-scan-dock__action">
        <span>Next</span>
        <p>${escapeHtml(result.nextAction.body)}</p>
      </div>
    </div>
  `;
}

function renderEmptyState(title, body, includeScanAction = false) {
  return `
    <div class="empty-state">
      <span class="empty-state__kicker">Empty State</span>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(body)}</p>
      ${includeScanAction ? `<div class="empty-state__action">${renderComplianceScanButton("page")}</div>` : ""}
    </div>
  `;
}

function renderPageShell(page) {
  let root = document.querySelector(`[data-page="${page.id}"]`);
  if (!root) {
    root = document.createElement("section");
    root.className = "page";
    root.dataset.page = page.id;
    root.id = `${page.id}Page`;
    mainContent.appendChild(root);
  }
  return root;
}

function renderComplianceRegister() {
  const scanContext = state.scan.status === "never_run"
    ? "Scan not run"
    : `${scanMeta().label}${state.scan.lastRunAt ? ` / ${state.scan.lastRunAt}` : ""}`;

  return `
    <div class="register-page">
      <header class="register-header">
        <div>
          <span class="register-header__kicker">Compliance Register</span>
          <h1>CBN obligation feed</h1>
        </div>
        <div class="register-header__meta">
          <span>${escapeHtml(scanContext)}</span>
          <span>${COMPLIANCE_FEED_GROUPS.reduce((sum, group) => sum + group.items.length, 0)} feed items</span>
        </div>
      </header>
      <div class="register-feed">
        ${COMPLIANCE_FEED_GROUPS.map((group) => `
          <section class="feed-group">
            <div class="feed-group__label">${escapeHtml(group.label)}</div>
            <div class="feed-group__items">
              ${group.items.map((item) => `
                <article class="feed-card feed-card--${item.status}">
                  <div class="feed-card__rail">
                    <span class="feed-card__dot"></span>
                    <span class="feed-card__line"></span>
                  </div>
                  <div class="feed-card__body">
                    <div class="feed-card__top">
                      <span class="feed-card__type">${escapeHtml(item.type)}</span>
                      <span class="feed-status feed-status--${item.status}">${escapeHtml(item.status)}</span>
                    </div>
                    <h2>${escapeHtml(item.title)}</h2>
                    <p>${escapeHtml(item.body)}</p>
                    <dl class="feed-meta">
                      <div><dt>Owner</dt><dd>${escapeHtml(item.owner)}</dd></div>
                      <div><dt>Deadline</dt><dd>${escapeHtml(item.deadline)}</dd></div>
                      <div><dt>Source</dt><dd>${escapeHtml(item.basis)}</dd></div>
                      <div><dt>Evidence</dt><dd>${escapeHtml(item.evidence)}</dd></div>
                    </dl>
                    <div class="asset-tags" aria-label="Related assets">
                      ${item.assets.map((asset) => `<span>${escapeHtml(asset)}</span>`).join("")}
                    </div>
                  </div>
                </article>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </div>
  `;
}

function renderRemediationQueue() {
  const items = remediationWorkItems();
  const criticalCount = items.filter((item) => item.severity.key === "critical").length;
  const owners = new Set(items.map((item) => item.owner));
  const completedAt = state.scan.lastRunAt || "not recorded";

  if (!items.length) {
    return renderEmptyState(
      "No Remediation Work",
      "Latest scan found no open remediation items.",
      true,
    );
  }

  return `
    <div class="remediation-page">
      <header class="remediation-header">
        <div>
          <span class="remediation-header__kicker">Scan findings ready for work</span>
          <h1>Remediation Queue</h1>
        </div>
        <div class="remediation-header__actions">
          ${renderComplianceScanButton("remediation")}
        </div>
      </header>

      <div class="remediation-summary">
        <span>${items.length} work items</span>
        <span>${criticalCount} critical</span>
        <span>${owners.size} owners</span>
        <span>Last Run: ${escapeHtml(completedAt)}</span>
      </div>

      <section class="remediation-board" aria-label="Remediation work items">
        <div class="remediation-row remediation-row--head" role="row">
          <span>Severity</span>
          <span>Title</span>
          <span>Affected Asset</span>
          <span>Obligation</span>
          <span>Suggested Next Action</span>
          <span>Owner</span>
          <span>Status</span>
          <span>Evidence Needed</span>
        </div>
        ${items.map((item) => `
          <article class="remediation-row remediation-row--${item.severity.key}" role="row">
            <div class="remediation-severity" data-label="Severity">
              <span class="severity severity--${item.severity.key}" aria-hidden="true"></span>
              <strong>${escapeHtml(item.severity.label)}</strong>
            </div>
            <div class="remediation-title" data-label="Title">${escapeHtml(item.title)}</div>
            <button class="remediation-asset" data-catalog-asset="${item.assetId}" type="button" data-label="Affected Asset">
              ${escapeHtml(item.affectedAsset)}
            </button>
            <div data-label="Obligation">${escapeHtml(item.obligation)}</div>
            <div data-label="Suggested Next Action">${escapeHtml(item.suggestedNextAction)}</div>
            <div data-label="Owner">${escapeHtml(item.owner)}</div>
            <div data-label="Status">
              <span class="queue-status queue-status--${item.status.toLowerCase()}">${escapeHtml(item.status)}</span>
            </div>
            <div data-label="Evidence Needed">${escapeHtml(item.evidenceNeeded)}</div>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderScanSection(title, items, emptyText, tone) {
  return `
    <section class="scan-output-section scan-output-section--${tone}">
      <div class="scan-output-section__head">
        <span>${escapeHtml(title)}</span>
        <strong>${items.length}</strong>
      </div>
      <div class="scan-output-list">
        ${items.length ? items.map((item) => `
          <article class="scan-output-item">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.kind)} / ${escapeHtml(item.owner)}</span>
            </div>
            <p>${escapeHtml(item.action)}</p>
          </article>
        `).join("") : `<p class="scan-output-empty">${escapeHtml(emptyText)}</p>`}
      </div>
    </section>
  `;
}

function renderCatalogScanOutput(result) {
  return `
    <section class="catalog-scan-output" aria-label="Compliance Readiness Scan output">
      <div class="scan-summary-grid">
        ${renderResultMetric("Readiness", `${result.readinessScore}%`, result.counts.critical ? "bad" : "ok")}
        ${renderResultMetric("Compliant", result.counts.compliant, "ok")}
        ${renderResultMetric("Offshore", result.counts.offshore, "warn")}
        ${renderResultMetric("Critical", result.counts.critical, "bad")}
      </div>
      <div class="scan-output-grid">
        ${renderScanSection("What is compliant", result.compliant, "No compliant assets found in this scan.", "ok")}
        ${renderScanSection("What is offshore", result.offshore, "No offshore assets found in this scan.", "warn")}
        ${renderScanSection("What is critical", result.critical, "No critical findings found in this scan.", "bad")}
      </div>
      <section class="next-action-panel">
        <span>What action should happen next</span>
        <h2>${escapeHtml(result.nextAction.title)}</h2>
        <p>${escapeHtml(result.nextAction.body)}</p>
        <dl>
          <div><dt>Owner</dt><dd>${escapeHtml(result.nextAction.owner)}</dd></div>
          <div><dt>Due</dt><dd>${escapeHtml(result.nextAction.due)}</dd></div>
        </dl>
      </section>
    </section>
  `;
}

function renderAuditScanOutput(result) {
  return `
    <section class="audit-scan-panel">
      <div class="audit-scan-panel__score">${result.readinessScore}%</div>
      <div>
        <span>${escapeHtml(result.auditReport.status)}</span>
        <p>${escapeHtml(result.auditReport.summary)}</p>
      </div>
    </section>
    <div class="audit-section-grid">
      ${result.auditReport.sections.map((section) => `
        <article>
          <span>${escapeHtml(section.label)}</span>
          <strong>${section.count}</strong>
          <p>${escapeHtml(section.body)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderComplianceAgentMessage(message) {
  return `
    <article class="agent-message" data-role="${escapeHtml(message.role)}">
      <span>${message.role === "user" ? "You" : "Compliance Agent"}</span>
      <p>${escapeHtml(message.body)}</p>
    </article>
  `;
}

function renderComplianceAgentCopilot(quickPrompts) {
  return `
    <section class="agent-copilot" data-open="${state.agentChatOpen}" aria-label="Compliance Agent copilot">
      <button class="agent-copilot-button" data-agent-chat-toggle type="button" aria-label="Open Compliance Agent chat" aria-expanded="${state.agentChatOpen}">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12a7.5 7.5 0 0 1-7.5 7.5H8l-5 3v-6.3A7.5 7.5 0 1 1 21 12Z" />
          <path d="M8 12h.01" />
          <path d="M12 12h.01" />
          <path d="M16 12h.01" />
        </svg>
        <span class="agent-copilot-button__pulse" aria-hidden="true"></span>
      </button>

      <aside class="agent-copilot-drawer" aria-label="Compliance Agent chat" aria-hidden="${!state.agentChatOpen}">
        <header class="agent-copilot-drawer__head">
          <div>
            <span>Compliance Agent</span>
            <strong>Copilot active</strong>
          </div>
          <button data-agent-chat-close type="button" aria-label="Close Compliance Agent chat">x</button>
        </header>
        <div class="agent-chat-quick">
          ${quickPrompts.map((prompt) => `<button data-agent-ask="${escapeHtml(prompt)}" type="button">${escapeHtml(prompt)}</button>`).join("")}
        </div>
        <div class="agent-message-list" data-agent-message-list>
          ${state.agentMessages.map(renderComplianceAgentMessage).join("")}
        </div>
        <form class="agent-chat-form" data-agent-form>
          <input data-agent-input type="text" autocomplete="off" placeholder="Ask the Compliance Agent..." />
          <button type="submit">Send</button>
        </form>
      </aside>
    </section>
  `;
}

function openComplianceAgentFindingSummary(items) {
  if (!items.length) return "No open remediation items are currently staged.";
  return items.slice(0, 5).map((item, index) => (
    `${index + 1}. ${item.severity.label}: ${item.affectedAsset} / ${item.suggestedNextAction}`
  )).join("\n");
}

function answerComplianceAgentQuestion(question) {
  const q = question.toLowerCase();
  const asset = selectedAsset();
  const queue = remediationWorkItems();
  const obligations = linkedObligations(asset);
  const lineage = lineageForAsset(asset.id);
  const result = latestScanResult();
  const critical = queue.filter((item) => item.severity.key === "critical");
  const offshoreAssets = catalogAssets().filter((item) => item.effectiveCountry !== "Nigeria");
  const scanLabel = state.scan.lastRunAt
    ? `${scanMeta().label} at ${state.scan.lastRunAt}`
    : scanMeta().label;

  if (q.includes("hello") || q.includes("hi ") || q === "hi") {
    return `I am active on ${asset.name}. I can inspect CCR context, summarize policy gates, plan remediation, or draft an audit narrative. Current scan state: ${scanLabel}.`;
  }

  if (q.includes("what can") || q.includes("how do i") || q.includes("help") || q.includes("interact")) {
    return `Use me as the CCR operator.\n\nTry:\n- "What are the blockers?"\n- "Plan remediation for this asset."\n- "What evidence do we need?"\n- "Draft the audit narrative."\n- "Which tools would you call?"\n\nI read the selected asset, scan result, compliance register, remediation queue, audit shell, and policy gates.`;
  }

  if (q.includes("blocker") || q.includes("risk") || q.includes("critical") || q.includes("offshore")) {
    return `Current residency blockers:\n${openComplianceAgentFindingSummary(queue)}\n\nOffshore/regional assets in scope: ${offshoreAssets.length}. Critical queue items: ${critical.length}. First action: ${critical[0]?.suggestedNextAction || queue[0]?.suggestedNextAction || "refresh the Compliance Readiness Scan."}`;
  }

  if (q.includes("plan") || q.includes("remediate") || q.includes("sequence") || q.includes("fix")) {
    return `Remediation plan for ${asset.name}:\n1. Confirm owner and data classes: ${asset.owner} / ${asset.classes.join(", ")}.\n2. Trace linked routes: ${lineage.length || "no"} mapped routes.\n3. Attach required evidence: ${(asset.evidence || []).join(", ") || "control evidence export"}.\n4. Apply the next queue action: ${queue.find((item) => item.assetId === asset.id)?.suggestedNextAction || asset.remediation}.\n5. Re-run the scan and move audit status from shell-ready to draftable.`;
  }

  if (q.includes("evidence") || q.includes("proof") || q.includes("artifact")) {
    return `Evidence needed for ${asset.name}:\n${(asset.evidence || ["Control evidence export"]).map((item) => `- ${item}`).join("\n")}\n\nPolicy link: ${obligations[0]?.basis || "CBN residency control"} / ${obligations[0]?.title || "payment data residency"}. The Evidence Clerk lane should attach these before the audit report is treated as complete.`;
  }

  if (q.includes("audit") || q.includes("report") || q.includes("draft") || q.includes("narrative")) {
    return `Audit narrative draft:\nThe CCR currently shows ${result.counts.compliant} compliant assets, ${result.counts.offshore} offshore/regional exposures, and ${result.counts.critical} critical findings. ${asset.name} is the active target, owned by ${asset.owner}, located at ${asset.effectiveLocation}. The agent will cite scan output, linked obligations, remediation queue status, and evidence artifacts before generating the final CBN-ready pack.`;
  }

  if (q.includes("tool") || q.includes("call") || q.includes("harness") || q.includes("agent")) {
    return `Harness call plan:\n1. home.graph.resolve -> locate ${asset.name} and route edges.\n2. catalog.asset.inspect -> read classification, permissions, evidence, and ownership.\n3. register.obligation.match -> bind policy basis to this asset.\n4. queue.remediation.plan -> stage owner-ready actions.\n5. audit.report.compose -> draft the evidence-backed narrative.\n\nPolicy stack remains session -> agent -> admin, with human approval around scans and evidence export.`;
  }

  if (q.includes("scan") || q.includes("readiness")) {
    return `Scan state is ${scanLabel}. The page is active either way: before a scan I can reason from catalog and register context; after a scan I can add measured findings, readiness score, queue items, and audit sections. Use the Run Compliance Scan button when you want the current workspace measured again.`;
  }

  if (q.includes("selected") || q.includes("asset") || q.includes("target")) {
    return `Current target: ${asset.name}\nType: ${asset.type}\nOwner: ${asset.owner}\nLocation: ${asset.effectiveLocation} / ${asset.effectiveCountry}\nClasses: ${asset.classes.join(", ")}\nRemediation: ${asset.remediation}`;
  }

  return `I am looking at ${asset.name} with scan state ${scanLabel}. Best next action: ${critical[0]?.suggestedNextAction || queue[0]?.suggestedNextAction || "prepare the audit evidence pack"}. Ask me for blockers, remediation, evidence, audit narrative, or tool calls.`;
}

function askComplianceAgent(question) {
  const clean = question.trim();
  if (!clean) return;
  state.agentMessages.push({ role: "user", body: clean });
  state.agentMessages.push({ role: "agent", body: answerComplianceAgentQuestion(clean) });
  state.agentMessages = state.agentMessages.slice(-18);
  state.agentChatOpen = true;
  renderAll();
  persistState();
}

function renderComplianceAgentPage() {
  const assets = catalogAssets();
  const target = selectedAsset();
  const queue = remediationWorkItems();
  const obligations = linkedObligations(target);
  const scan = scanMeta();
  const scanLabel = state.scan.lastRunAt
    ? `${scan.label} / ${state.scan.lastRunAt}`
    : scan.label;
  const localCount = assets.filter((asset) => asset.effectiveCountry === "Nigeria").length;
  const criticalCount = queue.filter((item) => item.severity.key === "critical").length;
  const offshoreCount = assets.length - localCount;
  const contextRail = [
    { label: "Home graph", state: `${ASSETS.length} nodes`, tone: "allow" },
    { label: "Catalog Explorer", state: `${assets.length} assets`, tone: "allow" },
    { label: "Compliance Register", state: `${COMPLIANCE_FEED_GROUPS.reduce((sum, group) => sum + group.items.length, 0)} obligations`, tone: "allow" },
    { label: "Scan", state: scanLabel, tone: state.scan.status === "failed" ? "deny" : state.scan.status === "never_run" ? "ask" : "allow" },
    { label: "Remediation Queue", state: `${queue.length} work items`, tone: criticalCount ? "deny" : "ask" },
    { label: "Audit Report", state: state.scan.result ? "draftable" : "shell ready", tone: state.scan.result ? "allow" : "ask" },
  ];
  const toolRegistry = [
    { name: "home.graph.resolve", label: "Home graph", type: "context", status: "mounted", body: "Reads topology, route edges, and selected graph targets." },
    { name: "catalog.asset.inspect", label: "Catalog Explorer", type: "tool", status: "scoped", body: "Retrieves classifications, owners, permissions, and evidence pointers." },
    { name: "register.obligation.match", label: "Compliance Register", type: "tool", status: "watching", body: "Maps CBN obligations to affected payment data assets." },
    { name: "scan.readiness.run", label: "Scan", type: "action", status: state.scan.status === "running" ? "running" : "available", body: "Builds residency posture and remediation findings when invoked." },
    { name: "queue.remediation.plan", label: "Remediation Queue", type: "sub-agent", status: queue.length ? "hydrated" : "standby", body: "Turns findings into owner-ready remediation work." },
    { name: "audit.report.compose", label: "Audit Report", type: "sub-agent", status: state.scan.result ? "ready" : "draft-only", body: "Assembles reviewer evidence and export narratives." },
  ];
  const policyStack = [
    { level: "Session", verdict: state.scan.status === "running" ? "ASK" : "ALLOW", rule: "Human confirmation before scan or evidence export actions." },
    { level: "Agent spec", verdict: criticalCount ? "ASK" : "ALLOW", rule: "CBN residency findings route through remediation before report closure." },
    { level: "Admin", verdict: "DENY", rule: "No raw payment payloads, PAN tokens, or customer identifiers leave the local workspace." },
  ];
  const subagents = [
    { name: "Residency Scout", harness: "catalog + graph", status: `${offshoreCount} offshore paths`, load: "82%" },
    { name: "Evidence Clerk", harness: "register + audit", status: `${obligations.length || "no"} target matches`, load: "46%" },
    { name: "Remediation Planner", harness: "queue writer", status: `${criticalCount} critical blockers`, load: criticalCount ? "71%" : "18%" },
    { name: "Audit Narrator", harness: "report composer", status: state.scan.result ? "ready to draft" : "awaiting scan evidence", load: state.scan.result ? "64%" : "24%" },
  ];
  const timeline = [
    { label: "Harness boot", value: "CCR context mounted", tone: "allow" },
    { label: "Target focus", value: `${target.name} / ${target.effectiveCountry}`, tone: target.effectivePosture === "critical" ? "deny" : target.effectivePosture === "warning" ? "ask" : "allow" },
    { label: "Scan state", value: scanLabel, tone: state.scan.status === "failed" ? "deny" : state.scan.status === "never_run" ? "ask" : "allow" },
    { label: "Policy gates", value: "session -> agent -> admin", tone: "ask" },
  ];
  const manifestRows = [
    ["name", "compliance_agent"],
    ["executor.harness", "CCR meta-harness"],
    ["executor.model", "policy-routed reasoning"],
    ["target_asset", target.name],
    ["tools", `${toolRegistry.length} mounted`],
    ["policies", `${policyStack.length} active gates`],
    ["sub_agents", `${subagents.length} lanes`],
  ];
  const quickPrompts = [
    "What are the blockers?",
    "Plan remediation for this asset",
    "What evidence do we need?",
    "Draft the audit narrative",
    "Which tools would you call?",
  ];

  return `
    <div class="compliance-agent-page">
      <header class="compliance-agent-header">
        <div>
          <span class="compliance-agent-kicker">Meta-harness orchestration surface</span>
          <h1>Compliance Agent</h1>
          <p>Supervises CCR context, policy gates, tools, and sub-agent lanes without blocking the workspace on scan state.</p>
        </div>
        <div class="compliance-agent-actions">
          ${renderComplianceScanButton("agent")}
          <span class="compliance-agent-status">Agent active</span>
        </div>
      </header>

      <div class="compliance-agent-shell">
        <section class="compliance-agent-canvas" aria-label="Agent-controlled workspace">
          <div class="compliance-agent-grid" aria-hidden="true"></div>
          <div class="agent-harness">
            <section class="agent-supervisor" aria-label="Compliance Agent supervisor">
              <div class="agent-supervisor__orb">CA</div>
              <div>
                <span>Supervisor</span>
                <h2>Compliance Agent runtime</h2>
                <p>Plans through policy, calls scoped CCR tools, and delegates research, evidence, remediation, and audit narration to specialist lanes.</p>
              </div>
              <dl>
                <div><dt>Assets</dt><dd>${assets.length}</dd></div>
                <div><dt>Local</dt><dd>${localCount}</dd></div>
                <div><dt>Open work</dt><dd>${queue.length}</dd></div>
              </dl>
            </section>

            <section class="agent-harness-grid" aria-label="Agent harness lanes">
              ${subagents.map((agent) => `
                <article class="agent-lane">
                  <div>
                    <span>${escapeHtml(agent.harness)}</span>
                    <strong>${escapeHtml(agent.name)}</strong>
                  </div>
                  <p>${escapeHtml(agent.status)}</p>
                  <div class="agent-lane__meter" style="--agent-load: ${escapeHtml(agent.load)}"></div>
                </article>
              `).join("")}
            </section>

            <section class="agent-tool-registry" aria-label="Mounted agent tools">
              <div class="agent-section-head">
                <span>Tool registry</span>
                <strong>${toolRegistry.length} mounted capabilities</strong>
              </div>
              <div class="agent-tool-list">
                ${toolRegistry.map((tool) => `
                  <article class="agent-tool">
                    <div>
                      <span>${escapeHtml(tool.type)}</span>
                      <strong>${escapeHtml(tool.label)}</strong>
                    </div>
                    <code>${escapeHtml(tool.name)}</code>
                    <p>${escapeHtml(tool.body)}</p>
                    <em>${escapeHtml(tool.status)}</em>
                  </article>
                `).join("")}
              </div>
            </section>

            <section class="agent-bottom-grid" aria-label="Agent harness controls">
              <article class="agent-manifest">
                <div class="agent-section-head">
                  <span>Agent spec</span>
                  <strong>YAML-shaped manifest</strong>
                </div>
                <div class="agent-manifest__body">
                  ${manifestRows.map(([key, value]) => `
                    <div><span>${escapeHtml(key)}:</span><strong>${escapeHtml(value)}</strong></div>
                  `).join("")}
                </div>
              </article>
              <article class="agent-policy-stack">
                <div class="agent-section-head">
                  <span>Policy stack</span>
                  <strong>Session / agent / admin</strong>
                </div>
                ${policyStack.map((policy) => `
                  <div class="agent-policy agent-policy--${policy.verdict.toLowerCase()}">
                    <span>${escapeHtml(policy.level)}</span>
                    <strong>${escapeHtml(policy.verdict)}</strong>
                    <p>${escapeHtml(policy.rule)}</p>
                  </div>
                `).join("")}
              </article>
            </section>
          </div>
        </section>

        <aside class="compliance-agent-rail" aria-label="Connected context">
          <div class="compliance-agent-rail__head">
            <span>Connected context</span>
            <strong>${escapeHtml(target.name)}</strong>
          </div>
          <div class="compliance-agent-context-list">
            ${contextRail.map((item) => `
              <div class="compliance-agent-context-item compliance-agent-context-item--${item.tone}">
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(item.state)}</strong>
              </div>
            `).join("")}
          </div>
          <section class="agent-rail-panel">
            <span>Current target</span>
            <strong>${escapeHtml(target.name)}</strong>
            <p>${escapeHtml(target.type)} / ${escapeHtml(target.owner)} / ${escapeHtml(target.effectiveLocation)}</p>
          </section>
          <section class="agent-rail-panel">
            <span>Next orchestration</span>
            <strong>${criticalCount ? "Resolve critical residency blockers" : "Keep evidence current"}</strong>
            <p>${criticalCount ? `${criticalCount} critical queue items need owner action before audit closure.` : "The agent can refresh scan context, attach evidence, or prepare the audit shell."}</p>
          </section>
          <section class="agent-timeline" aria-label="Agent event timeline">
            ${timeline.map((item) => `
              <div class="agent-timeline__item agent-timeline__item--${item.tone}">
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(item.value)}</strong>
              </div>
            `).join("")}
          </section>
        </aside>
      </div>
      ${renderComplianceAgentCopilot(quickPrompts)}
    </div>
  `;
}

function scannedContent(page) {
  if (page.id === "register") {
    return renderComplianceRegister();
  }

  if (page.id === "catalog") {
    return renderCatalogExplorer();
  }

  if (page.id === "remediation") {
    return renderRemediationQueue();
  }

  if (page.id === "audit") {
    return renderAuditReport();
  }

  return renderComplianceAgentPage();
}

function renderPageContent(page) {
  if (page.id === "home") return;

  const root = renderPageShell(page);
  if (page.id === "register") {
    root.innerHTML = renderComplianceRegister();
    return;
  }

  if (page.id === "catalog") {
    root.innerHTML = renderCatalogExplorer();
    return;
  }

  if (page.id === "agent") {
    root.innerHTML = renderComplianceAgentPage();
    return;
  }

  if (page.id === "remediation" && state.scan.status === "never_run") {
    root.innerHTML = renderEmptyState(
      "No Active Scans",
      "Run a scan on your infrastructure to see how compliant you are.",
      true,
    );
    return;
  }

  if (page.id === "audit" && state.scan.status === "never_run") {
    root.innerHTML = renderEmptyState(
      "Run a Compliance Readiness Scan First",
      "Audit Report knits together scan findings and remediation progress after the first Compliance Readiness Scan completes.",
      true,
    );
    return;
  }

  if (state.scan.status === "never_run") {
    root.innerHTML = renderEmptyState(
      page.label,
      "Run a compliance scan before this page can show workspace findings.",
      page.scanAction,
    );
    return;
  }

  if (state.scan.status === "running") {
    root.innerHTML = renderEmptyState(
      page.label,
      "Compliance scan is running. Results will populate here when complete.",
      page.scanAction,
    );
    return;
  }

  if (state.scan.status === "failed") {
    root.innerHTML = renderEmptyState(
      page.label,
      "The last compliance scan failed. Retry the shared scan action to populate this page.",
      page.scanAction,
    );
    return;
  }

  root.innerHTML = scannedContent(page);
}

function renderCatalogTree(assets) {
  const visibleAssets = filteredCatalogAssets(assets);
  const selected = selectedAsset();
  const hasSearch = Boolean(state.catalogSearch.trim());
  const catalogs = visibleAssets.reduce((acc, asset) => {
    if (!acc[asset.catalog]) acc[asset.catalog] = {};
    if (!acc[asset.catalog][asset.schema]) acc[asset.catalog][asset.schema] = [];
    acc[asset.catalog][asset.schema].push(asset);
    return acc;
  }, {});

  if (!visibleAssets.length) {
    return `<div class="catalog-tree-empty">No matching catalog objects</div>`;
  }

  return Object.entries(catalogs).map(([catalog, schemas]) => {
    const catalogOpen = hasSearch || isTreeOpen("catalog", [catalog], catalog === selected.catalog);
    const catalogAssetCount = Object.values(schemas).reduce((sum, schemaAssets) => sum + schemaAssets.length, 0);
    return `
      <section class="catalog-tree__group">
        <button class="catalog-tree__catalog" data-catalog-toggle="${treeToggleKey("catalog", catalog)}" type="button" aria-expanded="${catalogOpen}">
          <span class="tree-caret">${catalogOpen ? "v" : ">"}</span>
          <span class="tree-icon tree-icon--catalog"></span>
          <span>
            <strong>${escapeHtml(catalog)}</strong>
            <small>${escapeHtml(catalogLabel(catalog))}</small>
          </span>
          <em>${catalogAssetCount}</em>
        </button>
        ${catalogOpen ? Object.entries(schemas).map(([schema, schemaAssets]) => {
          const schemaOpen = hasSearch || isTreeOpen("schema", [catalog, schema], catalog === selected.catalog && schema === selected.schema);
          const schemaInfo = schemaRecord(catalog, schema);
          return `
            <div class="catalog-tree__branch">
              <button class="catalog-tree__schema" data-catalog-toggle="${treeToggleKey("schema", catalog, schema)}" type="button" aria-expanded="${schemaOpen}">
                <span class="tree-caret">${schemaOpen ? "v" : ">"}</span>
                <span class="tree-icon tree-icon--schema"></span>
                <span>
                  <strong>${escapeHtml(schema)}</strong>
                  <small>${escapeHtml(schemaInfo?.comment || "schema")}</small>
                </span>
                <em>${schemaAssets.length}</em>
              </button>
              ${schemaOpen ? `<div class="catalog-tree__assets">
                ${schemaAssets.map((asset) => `
                  <button class="catalog-tree__asset" data-catalog-asset="${asset.id}" data-selected="${asset.id === state.selectedAssetId}" type="button">
                    <span class="tree-icon tree-icon--${asset.ucType === "VOLUME" ? "volume" : asset.ucType === "FUNCTION" ? "function" : asset.ucType === "MODEL" ? "model" : "table"}"></span>
                    <span>
                      <strong>${escapeHtml(asset.object)}</strong>
                      <small>${escapeHtml(asset.kind)}</small>
                    </span>
                  </button>
                `).join("")}
              </div>` : ""}
            </div>
          `;
        }).join("") : ""}
      </section>
    `;
  }).join("");
}

function renderAssetColumns(asset) {
  const columns = asset.columns || [];
  return `
    <div class="asset-column-table">
      <div class="asset-column-row asset-column-row--head">
        <span>Name</span>
        <span>Type</span>
        <span>Classification</span>
      </div>
      ${columns.map((column) => `
        <div class="asset-column-row">
          <strong>${escapeHtml(column.name)}</strong>
          <span>${escapeHtml(column.type)}</span>
          <span>${escapeHtml(column.classification)}</span>
        </div>
      `).join("") || `<div class="muted-row">No columns registered</div>`}
    </div>
  `;
}

function renderAssetDetailPanel(asset) {
  const obligations = linkedObligations(asset);
  const lineage = lineageForAsset(asset.id);
  const [pillClass, pillText] = statusPill(asset.effectivePosture);
  const agentPinned = state.agentTargetId === asset.id;

  return `
    <section class="asset-detail-panel">
      <div class="asset-detail-hero">
        <span class="asset-object-icon">${escapeHtml(asset.ucType || asset.kind)}</span>
        <div class="asset-detail-hero__copy">
          <span class="asset-detail-panel__kicker">${escapeHtml(asset.path)}</span>
          <h2>${escapeHtml(asset.name)}</h2>
          <p>${escapeHtml(asset.usage)}</p>
        </div>
        <span class="tiny-pill ${pillClass}">${pillText}</span>
      </div>

      <div class="asset-detail-actions">
        <button class="agent-primary-action" data-agent-asset="${asset.id}" type="button">
          ${agentPinned ? "Agent Pointed Here" : "Point Agent to This Asset"}
        </button>
        <button class="agent-secondary-action" data-run-scan="asset-detail" type="button">Run Compliance Scan</button>
      </div>

      <nav class="asset-detail-tabs" aria-label="Asset detail sections">
        <span data-active="true">Overview</span>
        <span>Columns</span>
        <span>Lineage</span>
        <span>Permissions</span>
        <span>Evidence</span>
      </nav>

      <div class="asset-detail-grid asset-detail-grid--overview">
        <div><dt>Type</dt><dd>${escapeHtml(asset.type)}</dd></div>
        <div><dt>Owner</dt><dd>${escapeHtml(asset.owner)}</dd></div>
        <div><dt>Location / Residency</dt><dd>${escapeHtml(asset.effectiveLocation)} / ${escapeHtml(asset.effectiveCountry)}</dd></div>
        <div><dt>System</dt><dd>${escapeHtml(asset.system)}</dd></div>
        <div><dt>Volume</dt><dd>${escapeHtml(asset.volume)}</dd></div>
        <div><dt>Classification</dt><dd>${escapeHtml(asset.classification)}</dd></div>
      </div>

      <section class="asset-detail-section">
        <h3>Data Classes</h3>
        <div class="asset-tags">${asset.classes.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </section>

      <section class="asset-detail-section">
        <h3>Columns</h3>
        ${renderAssetColumns(asset)}
      </section>

      <div class="asset-detail-two-up">
        <section class="asset-detail-section">
          <h3>Linked Obligations</h3>
          <div class="obligation-list">
            ${obligations.length ? obligations.map((item) => `
              <div class="obligation-list__item">
                <span>${escapeHtml(item.type)} / ${escapeHtml(item.basis)}</span>
                <strong>${escapeHtml(item.title)}</strong>
              </div>
            `).join("") : `<div class="muted-row">No obligation linked yet</div>`}
          </div>
        </section>

        <section class="asset-detail-section">
          <h3>Lineage / Routes</h3>
          <div class="route-list">
            ${lineage.map((route) => `
              <div class="route-list__item">
                <span>${escapeHtml(route.direction)}</span>
                <strong>${escapeHtml(route.from.name)} -> ${escapeHtml(route.to.name)}</strong>
              </div>
            `).join("") || `<div class="muted-row">No routes mapped</div>`}
          </div>
        </section>
      </div>

      <div class="asset-detail-two-up">
        <section class="asset-detail-section">
          <h3>Permissions</h3>
          <div class="asset-tags">${(asset.permissions || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        </section>

        <section class="asset-detail-section">
          <h3>Evidence</h3>
          <div class="asset-tags">${asset.evidence.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        </section>
      </div>

      <section class="asset-detail-section">
        <h3>Agent Actions</h3>
        <div class="agent-actions">
          ${(asset.agentActions || []).slice(1).map((item) => `<button class="agent-secondary-action" data-agent-asset="${asset.id}" type="button">${escapeHtml(item)}</button>`).join("")}
        </div>
      </section>
    </section>
  `;
}

function renderGraphAssetPreview(asset) {
  const obligations = linkedObligations(asset);
  const lineage = lineageForAsset(asset.id);
  const [pillClass, pillText] = statusPill(asset.effectivePosture);
  const horizontal = asset.x > 52 ? "left: 14px;" : "right: 14px;";
  const vertical = asset.y > 48 ? "top: 14px;" : "bottom: 14px;";

  return `
    <aside class="graph-asset-preview" style="${horizontal} ${vertical}">
      <div class="graph-asset-preview__top">
        <span class="asset-detail-panel__kicker">${escapeHtml(asset.path)}</span>
      </div>
      <div class="graph-asset-preview__title">
        <h2>${escapeHtml(asset.name)}</h2>
        <span class="tiny-pill ${pillClass}">${pillText}</span>
      </div>
      <p>${escapeHtml(asset.usage)}</p>
      <dl class="asset-detail-grid">
        <div><dt>Type</dt><dd>${escapeHtml(asset.type)}</dd></div>
        <div><dt>Owner</dt><dd>${escapeHtml(asset.owner)}</dd></div>
        <div><dt>Residency</dt><dd>${escapeHtml(asset.effectiveLocation)} / ${escapeHtml(asset.effectiveCountry)}</dd></div>
        <div><dt>Lineage</dt><dd>${lineage.length} routes</dd></div>
      </dl>
      <section class="asset-detail-section">
        <h3>Linked Obligations</h3>
        <div class="obligation-list">
          ${obligations.length ? obligations.slice(0, 2).map((item) => `
            <div class="obligation-list__item">
              <span>${escapeHtml(item.type)} / ${escapeHtml(item.basis)}</span>
              <strong>${escapeHtml(item.title)}</strong>
            </div>
          `).join("") : `<div class="muted-row">No obligation linked yet</div>`}
        </div>
      </section>
    </aside>
  `;
}

function renderCatalogExplorer() {
  const assets = catalogAssets();
  const selected = selectedAsset();
  const localCount = assets.filter((asset) => asset.effectiveCountry === "Nigeria").length;
  const riskyCount = assets.filter((asset) => asset.effectivePosture === "critical").length;
  const offshoreCount = assets.length - localCount;
  const scanContext = state.scan.status === "never_run"
    ? "Scan not run"
    : `${scanMeta().label}${state.scan.lastRunAt ? ` / ${state.scan.lastRunAt}` : ""}`;

  return `
    <div class="catalog-page ${state.scan.result ? "catalog-page--scanned" : ""}">
      <header class="catalog-header">
        <div class="catalog-title">
          <span class="catalog-title__icon" aria-hidden="true"></span>
          <div>
            <span class="catalog-header__kicker">Governed Catalog Explorer</span>
            <h1>Catalog</h1>
            <p>${escapeHtml(BANK_PROFILE.name)} / ${escapeHtml(BANK_PROFILE.metastore)}</p>
          </div>
        </div>
        <div class="catalog-header__actions">
          <button class="catalog-header-button" type="button">Govern</button>
          <button class="catalog-header-button" type="button">Connect</button>
          <button class="catalog-header-button" type="button">Share</button>
          ${renderComplianceScanButton("catalog")}
        </div>
      </header>

      <div class="catalog-summary">
        <span>${escapeHtml(CATALOG_SOURCE)}</span>
        <span>${assets.length} governed assets</span>
        <span>${localCount} local resident</span>
        <span>${offshoreCount} offshore/regional</span>
        <span>${riskyCount} critical exposures</span>
        <span>${escapeHtml(scanContext)}</span>
      </div>

      ${state.scan.result ? renderCatalogScanOutput(state.scan.result) : ""}

      <div class="catalog-layout">
        <aside class="catalog-tree" aria-label="Catalog hierarchy">
          <div class="catalog-tree__head">
            <div>
              <strong>Catalog</strong>
              <span>${escapeHtml(BANK_PROFILE.metastore)}</span>
            </div>
            <button class="catalog-icon-button" type="button" title="Refresh catalog">+</button>
          </div>
          <label class="catalog-search">
            <input data-catalog-search type="search" placeholder="Type to search..." value="${escapeHtml(state.catalogSearch)}" />
          </label>
          <div class="catalog-tree-tabs">
            <span data-active="true">For you</span>
            <span>All</span>
          </div>
          <div class="catalog-tree-root">My organization</div>
          ${renderCatalogTree(assets)}
        </aside>

        ${renderAssetDetailPanel(selected)}
      </div>
    </div>
  `;
}

function renderPages() {
  PAGES.forEach((page) => {
    const root = renderPageShell(page);
    root.hidden = page.id !== state.activePage;
    if (page.id !== "home") renderPageContent(page);
  });
}

function renderAll() {
  renderSidebar();
  renderHomeActions();
  renderPages();
  renderMap();
  renderHomeScanDock();
  renderScanLoadingOverlay();
  scrollComplianceAgentMessages();
}

function scrollComplianceAgentMessages() {
  const messageList = document.querySelector("[data-agent-message-list]");
  if (!messageList) return;
  messageList.scrollTop = messageList.scrollHeight;
}

function navigateToPage(pageId) {
  if (!PAGES.some((page) => page.id === pageId)) return;
  state.activePage = pageId;
  renderAll();
  if (window.matchMedia("(max-width: 700px)").matches) {
    state.sidebarState = "collapsed";
    app.dataset.sidebar = state.sidebarState;
    sidebarToggle.setAttribute("aria-expanded", "false");
  }
  persistState();
}

function setScanStatus(status) {
  state.scan.status = status;
  renderAll();
}

function runComplianceScan() {
  if (state.scan.status === "running") return;
  const mapStage = document.getElementById("mapStage");
  mapStage?.classList.remove("scan-flash");
  void mapStage?.offsetWidth;
  mapStage?.classList.add("scan-flash");
  state.scan.startedAt = new Date().toISOString();
  state.scan.result = null;
  setScanStatus("running");

  window.setTimeout(() => {
    const completedAt = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    state.scan.status = "complete";
    state.scan.lastRunAt = completedAt;
    state.scan.result = buildComplianceScanResult(completedAt);
    renderAll();
    persistState();
  }, 1900);
}

function renderMap() {
  const root = document.getElementById("mapStage");
  if (!root) return;
  const assetViews = ASSETS.map(assetView);
  const activeId = state.previewAssetId || state.selectedAssetId;
  const paths = ROUTES.map(([fromId, toId]) => {
    const from = assetViews.find((item) => item.id === fromId);
    const to = assetViews.find((item) => item.id === toId);
    if (!from || !to) return "";
    const routeClass = to.effectiveCountry !== "Nigeria" && hasPaymentData(to) ? "route-line--bad" : to.effectiveCountry !== "Nigeria" ? "route-line--warn" : "route-line--ok";
    const active = from.id === activeId || to.id === activeId;
    const midX = (from.x + to.x) / 2;
    const bend = from.x < to.x ? 9 : -9;
    const path = `M ${from.x} ${from.y} C ${midX} ${from.y + bend}, ${midX} ${to.y - bend}, ${to.x} ${to.y}`;
    return `<path class="route-line ${routeClass}" data-active="${active}" d="${path}" />`;
  }).join("");

  const nodes = assetViews.map((asset) => {
    const previewActive = asset.id === state.previewAssetId;
    return `
      <button class="graph-node graph-node--${asset.effectivePosture}" data-asset="${asset.id}" data-selected="${asset.id === state.selectedAssetId}" data-preview="${previewActive}" style="left: ${asset.x}%; top: ${asset.y}%;" type="button" title="${escapeHtml(asset.name)}">
        <span class="graph-node__orb"></span>
        <span class="graph-node__label">${escapeHtml(asset.name)}</span>
        <span class="graph-node__meta">${escapeHtml(asset.kind)}</span>
      </button>
    `;
  }).join("");

  const localCount = assetViews.filter((asset) => asset.effectiveCountry === "Nigeria").length;
  const exposureCount = assetViews.length - localCount;
  const zoomLabel = `${Math.round(state.graphZoom * 100)}%`;
  const graphAssetPreview = previewAsset();

  root.innerHTML = `
    <div class="graph-toolbar" aria-label="Graph zoom controls">
      <button class="graph-tool" data-graph-zoom="out" type="button" title="Zoom out">-</button>
      <span>${zoomLabel}</span>
      <button class="graph-tool" data-graph-zoom="in" type="button" title="Zoom in">+</button>
      <button class="graph-tool graph-tool--wide" data-graph-zoom="reset" type="button" title="Reset graph view">RESET</button>
    </div>
    <div class="graph-canvas">
      <div class="graph-world" style="--graph-zoom: ${state.graphZoom.toFixed(2)}; --graph-pan-x: ${Math.round(state.graphPanX)}px; --graph-pan-y: ${Math.round(state.graphPanY)}px;">
        <svg class="route-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect class="graph-zone graph-zone--local" x="7" y="13" width="44" height="73" rx="3"></rect>
          <rect class="graph-zone graph-zone--foreign" x="52" y="8" width="41" height="47" rx="3"></rect>
          <rect class="graph-zone graph-zone--regional" x="52" y="60" width="39" height="29" rx="3"></rect>
          ${paths}
        </svg>
        <span class="region-label" style="left: 9%; top: 9%;">PAYMENT GOVERNANCE CATALOG</span>
        <span class="region-label" style="right: 13%; top: 7%;">OFFSHORE ROUTES</span>
        <span class="region-label" style="right: 12%; bottom: 8%;">REGIONAL SCHEMAS</span>
        ${nodes}
      </div>
      <div class="graph-status">
        <span>${localCount} local</span>
        <span>${exposureCount} exposure</span>
        <span>${ROUTES.length} edges</span>
      </div>
      <aside class="graph-legend" data-collapsed="${state.graphLegendCollapsed}">
        <button class="graph-legend__toggle" data-graph-legend-toggle type="button" aria-expanded="${!state.graphLegendCollapsed}">
          <span>Key</span>
          <strong>${state.graphLegendCollapsed ? "+" : "-"}</strong>
        </button>
        <div class="graph-legend__body">
          <span><i class="legend-dot legend-dot--local"></i>Local</span>
          <span><i class="legend-dot legend-dot--warning"></i>Check</span>
          <span><i class="legend-dot legend-dot--critical"></i>Risk</span>
        </div>
      </aside>
    </div>
    ${graphAssetPreview ? renderGraphAssetPreview(graphAssetPreview) : ""}
  `;
}

function setPreviewAsset(assetId) {
  if (state.previewAssetId === assetId) return;
  state.previewAssetId = assetId;
  renderMap();
}

function clearPreviewAsset() {
  if (!state.previewAssetId) return;
  state.previewAssetId = null;
  renderMap();
}

function clampGraphZoom(value) {
  return Math.max(GRAPH_MIN_ZOOM, Math.min(GRAPH_MAX_ZOOM, value));
}

function setGraphZoom(value) {
  const nextZoom = Math.round(clampGraphZoom(value) * 100) / 100;
  if (nextZoom === state.graphZoom) return;
  state.graphZoom = nextZoom;
  if (state.graphZoom <= 1) {
    state.graphPanX = 0;
    state.graphPanY = 0;
  }
  renderMap();
  persistState();
}

function adjustGraphZoom(action) {
  if (action === "reset") {
    state.graphZoom = 1;
    state.graphPanX = 0;
    state.graphPanY = 0;
    renderMap();
    persistState();
    return;
  }
  const direction = action === "in" ? 1 : -1;
  setGraphZoom(state.graphZoom + direction * GRAPH_ZOOM_STEP);
}

function applyGraphTransform() {
  const world = document.querySelector("#mapStage .graph-world");
  if (!world) return;
  world.style.setProperty("--graph-zoom", state.graphZoom.toFixed(2));
  world.style.setProperty("--graph-pan-x", `${Math.round(state.graphPanX)}px`);
  world.style.setProperty("--graph-pan-y", `${Math.round(state.graphPanY)}px`);
}

function handleGraphWheel(event) {
  event.preventDefault();
  const direction = event.deltaY < 0 ? 1 : -1;
  setGraphZoom(state.graphZoom + direction * GRAPH_ZOOM_STEP);
}

function startGraphPan(event) {
  if (event.button !== 0 || state.graphZoom <= 1) return;
  if (event.target.closest(".graph-node, .graph-toolbar, .graph-asset-preview, .graph-legend")) return;

  event.preventDefault();
  clearPreviewAsset();

  const stage = document.getElementById("mapStage");
  const startX = event.clientX;
  const startY = event.clientY;
  const startPanX = state.graphPanX;
  const startPanY = state.graphPanY;
  stage.dataset.panning = "true";
  stage.setPointerCapture?.(event.pointerId);

  const onMove = (moveEvent) => {
    state.graphPanX = startPanX + moveEvent.clientX - startX;
    state.graphPanY = startPanY + moveEvent.clientY - startY;
    applyGraphTransform();
  };

  const onUp = () => {
    delete stage.dataset.panning;
    stage.releasePointerCapture?.(event.pointerId);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    persistState();
  };

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

function bindShellEvents() {
  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "light" : "dark";
    state.theme = theme;
    document.documentElement.dataset.theme = theme;
    themeLabel.textContent = theme === "light" ? "Light" : "Dark";
    persistState();
  });

  sidebarToggle.addEventListener("click", () => {
    const isCollapsed = state.sidebarState === "collapsed";
    state.sidebarState = isCollapsed ? "expanded" : "collapsed";
    app.dataset.sidebar = state.sidebarState;
    sidebarToggle.setAttribute("aria-expanded", String(isCollapsed));
    persistState();
  });

  sidebarNav.addEventListener("click", (event) => {
    const target = event.target.closest && event.target.closest("[data-page-nav]");
    if (!target) return;
    navigateToPage(target.dataset.pageNav);
  });

  mainContent.addEventListener("click", (event) => {
    const scanTarget = event.target.closest && event.target.closest("[data-run-scan]");
    if (scanTarget) {
      runComplianceScan();
      return;
    }

    const homeScanDockToggle = event.target.closest && event.target.closest("[data-home-scan-dock-toggle]");
    if (homeScanDockToggle) {
      state.homeScanDockCollapsed = !state.homeScanDockCollapsed;
      renderHomeScanDock();
      persistState();
      return;
    }

    const agentChatToggle = event.target.closest && event.target.closest("[data-agent-chat-toggle]");
    if (agentChatToggle) {
      state.agentChatOpen = !state.agentChatOpen;
      renderAll();
      persistState();
      return;
    }

    const agentChatClose = event.target.closest && event.target.closest("[data-agent-chat-close]");
    if (agentChatClose) {
      state.agentChatOpen = false;
      renderAll();
      persistState();
      return;
    }

    const agentAskTarget = event.target.closest && event.target.closest("[data-agent-ask]");
    if (agentAskTarget) {
      askComplianceAgent(agentAskTarget.dataset.agentAsk);
      return;
    }

    const catalogToggleTarget = event.target.closest && event.target.closest("[data-catalog-toggle]");
    if (catalogToggleTarget) {
      const key = catalogToggleTarget.dataset.catalogToggle;
      state.catalogExpanded[key] = catalogToggleTarget.getAttribute("aria-expanded") !== "true";
      renderAll();
      persistState();
      return;
    }

    const assetTarget = event.target.closest && event.target.closest("[data-catalog-asset]");
    if (assetTarget) {
      state.selectedAssetId = assetTarget.dataset.catalogAsset;
      state.previewAssetId = null;
      openSelectedAssetPath();
      renderAll();
      persistState();
      return;
    }

    const openCatalogAssetTarget = event.target.closest && event.target.closest("[data-open-catalog-asset]");
    if (openCatalogAssetTarget) {
      state.selectedAssetId = openCatalogAssetTarget.dataset.openCatalogAsset;
      state.previewAssetId = null;
      openSelectedAssetPath();
      navigateToPage("catalog");
      return;
    }

    const agentTarget = event.target.closest && event.target.closest("[data-agent-asset]");
    if (agentTarget) {
      state.agentTargetId = agentTarget.dataset.agentAsset;
      state.selectedAssetId = agentTarget.dataset.agentAsset;
      renderAll();
      persistState();
      return;
    }

    const navTarget = event.target.closest && event.target.closest("[data-page-nav]");
    if (navTarget) {
      navigateToPage(navTarget.dataset.pageNav);
    }
  });

  mainContent.addEventListener("input", (event) => {
    const searchTarget = event.target.closest && event.target.closest("[data-catalog-search]");
    if (!searchTarget) return;
    state.catalogSearch = searchTarget.value;
    renderAll();
    persistState();
  });

  mainContent.addEventListener("submit", (event) => {
    const formTarget = event.target.closest && event.target.closest("[data-agent-form]");
    if (!formTarget) return;
    event.preventDefault();
    const input = formTarget.querySelector("[data-agent-input]");
    const question = input.value;
    input.value = "";
    askComplianceAgent(question);
  });

  const startSidebarResize = (event) => {
    if (window.matchMedia("(max-width: 700px)").matches) {
      return;
    }

    event.preventDefault();
    app.dataset.resizing = "true";

    const resizeSidebar = (moveEvent) => {
      const maxWidth = Math.min(window.innerWidth * 0.42, 520);
      const nextWidth = Math.min(Math.max(moveEvent.clientX, 220), maxWidth);
      state.sidebarWidth = Math.round(nextWidth);
      sidebar.style.setProperty("--sidebar-width", `${state.sidebarWidth}px`);
    };

    const stopResize = () => {
      app.dataset.resizing = "false";
      window.removeEventListener("pointermove", resizeSidebar);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
      window.removeEventListener("mousemove", resizeSidebar);
      window.removeEventListener("mouseup", stopResize);
      persistState();
    };

    window.addEventListener("pointermove", resizeSidebar);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
    window.addEventListener("mousemove", resizeSidebar);
    window.addEventListener("mouseup", stopResize);
  };

  sidebarResize.addEventListener("pointerdown", startSidebarResize);
  sidebarResize.addEventListener("mousedown", startSidebarResize);
}

function bindGraphEvents() {
  const mapStage = document.getElementById("mapStage");
  mapStage.addEventListener("mouseleave", clearPreviewAsset);
  mapStage.addEventListener("wheel", handleGraphWheel, { passive: false });
  mapStage.addEventListener("pointerdown", startGraphPan);

  const handleGraphHover = (event) => {
    const target = event.target.closest && event.target.closest(".graph-node");
    if (target && mapStage.contains(target) && target.dataset.asset) {
      setPreviewAsset(target.dataset.asset);
      return;
    }
    if (!event.target.closest || !event.target.closest(".graph-asset-preview")) {
      clearPreviewAsset();
    }
  };

  mapStage.addEventListener("pointerover", handleGraphHover);
  mapStage.addEventListener("pointermove", handleGraphHover);
  mapStage.addEventListener("click", (event) => {
    const legendTarget = event.target.closest && event.target.closest("[data-graph-legend-toggle]");
    if (legendTarget) {
      state.graphLegendCollapsed = !state.graphLegendCollapsed;
      renderMap();
      persistState();
      return;
    }

    const target = event.target.closest && event.target.closest(".graph-node");
    if (!target) return;
    state.selectedAssetId = target.dataset.asset;
    state.previewAssetId = null;
    openSelectedAssetPath();
    navigateToPage("catalog");
  });
  mapStage.addEventListener("click", (event) => {
    const target = event.target.closest && event.target.closest("[data-graph-zoom]");
    if (!target) return;
    adjustGraphZoom(target.dataset.graphZoom);
  });
}

applyShellState();
bindShellEvents();
bindGraphEvents();
renderAll();
loadCatalogFromApi();
