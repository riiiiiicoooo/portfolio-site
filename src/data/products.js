// ============================================================================
// PRODUCT DATA - Extracted from App.jsx
// ============================================================================

export const PRODUCTS = [
  {
    id: "agentgate",
    name: "AgentGate",
    domain: "Developer Security",
    category: "AI & Security",
    stage: "Production",
    timeline: "14 weeks",
    tagline: "AI Agent Authentication & Secrets Management",
    description: "Zero-trust authentication layer for AI agents accessing enterprise APIs. Built a custom policy engine inspired by OPA/Rego (but with a lower learning curve) that reached 100% platform team adoption within 8 weeks of rollout, multi-provider secrets abstraction across Vault, AWS, and 1Password, and just-in-time secret leasing that reduced credential age from 90-day averages to 4-hour leases. Complexity-based model router classifies requests (simple/moderate/complex) and routes to cost-appropriate LLMs with budget-aware downgrading and fallback cascading, achieving 60-80% cost savings vs. single-model deployments. Per-agent cost tracking monitors actual vs. estimated spend with transparent routing decisions.",
    problem: "AI agents were sharing long-lived API keys stored in plaintext configs and environment variables. 23 credential exposures in 6 months, each requiring emergency rotation across dependent services. Agent onboarding took 1-2 days of manual provisioning, and a single token runaway incident cost $4,200 before it was caught.",
    solution: "OAuth 2.0 agent identity layer with ephemeral token issuance, per-agent budget controls with kill switches, and secrets brokering across multiple providers. Chose OAuth 2.0 Client Credentials Flow over API keys or mTLS to balance adoption ease with industry standard compliance. Prompt injection detection uses deterministic pattern matching rather than LLM-based classification for lower latency and predictable results.",
    role: "Concept to production in 14 weeks. Audited the client's agent ecosystem and cataloged all 23 credential exposure incidents from the prior 6 months to quantify the cost of inaction. Mapped the ideal token lifecycle with the security and DevOps teams, then prototyped ephemeral token issuance against a live sandbox API — that prototype became the proof point that got CISO sign-off. Made the call to scope the MVP to a single high-risk agent workflow rather than boiling the ocean. Drove the technical direction with the lead developer and two contract engineers, tracking credential exposure reduction as the primary success metric across biweekly releases.",
    architecture: "Go service layer handling OAuth 2.0/OIDC flows with Kong API Gateway for rate limiting and traffic management. PostgreSQL for policy storage, Redis for token caching, and HashiCorp Vault for secrets brokering. TypeScript SDK provides client-side integration.",
    pipeline: [
      {label:"Ingest",detail:"OAuth requests + Vault API logs"},
      {label:"Process",detail:"FastAPI auth validation engine"},
      {label:"Store",detail:"PostgreSQL audit_log + Redis token cache"},
      {label:"Serve",detail:"Real-time metrics API"}
    ],
    metrics: [
      {value: "0", label: "New Credential Exposures", prev: "from 23 in prior 6 months"},
      {value: "<200ms", label: "Auth Latency p95", prev: "from 1.2s"},
      {value: "100%", label: "Audit Coverage", prev: "from ~40%"},
      {value: "47", label: "Agents Secured", prev: "by week 14"}
    ],
    tech: ["Go","PostgreSQL","Redis","OAuth 2.0/OIDC","Kong Gateway","Vault","AWS Secrets Manager","TypeScript SDK"],
    pivot: "Originally designed around mTLS certificate-based auth, but pilot teams found certificate management too operationally heavy. Pivoted to OAuth 2.0 Client Credentials Flow mid-sprint. This cut agent onboarding time from 2 days to 15 minutes and was the single decision that drove 100% adoption.",
    github: "https://github.com/riiiiiicoooo/agentgate",
    operationalDocs: {
      slos: ["Auth Latency P95 < 200ms", "Token Issuance Success Rate 99.5%", "Audit Log Completeness 100%", "Secret Rotation SLA < 4hr"],
      capacityHighlight: "Current: 47 agents, 12K auth requests/day. Scales to 500 agents at $890/mo (Redis cluster + connection pooling).",
      runbooks: ["Vault Connectivity Failure", "Token Issuance Spike", "Secret Rotation Timeout"]
    },
    futureRoadmap: [
      {title: "Zero Trust for AI Alignment", description: "Extend agent identity layer to align with Microsoft and Cisco's 2026 Zero Trust for AI frameworks — adding behavioral anomaly detection and scope-specific token validation per API endpoint, not just per agent."},
      {title: "MCP Gateway Security Layer", description: "Position as the enterprise MCP security gateway by intercepting MCP Streamable HTTP transport through Kong, providing SSO-integrated auth, audit trails, and horizontal scaling for MCP tool invocations."},
      {title: "A2A Protocol Identity Verification", description: "Extend OAuth 2.0 auth layer to validate Agent-to-Agent (A2A) protocol identities, enabling secure cross-organization agent communication as the protocol reaches 150+ supporting organizations."}
    ]
  },
  {
    id: "verified-marketplace",
    name: "Verified Services Marketplace",
    domain: "Marketplace",
    category: "Consumer & Growth",
    stage: "Production",
    timeline: "6 months",
    tagline: "Trust-First Two-Sided Marketplace",
    description: "Trust-first two-sided marketplace with a five-layer trust stack (Identity, Qualification, Accountability, Financial Protection, Reputation). Intelligent matching uses PostGIS geospatial radius queries (not zip code lookup tables) with composite scoring (35% quality, 25% completion, 20% response time, 15% tier bonus, 5% recency). Stripe Connect escrow with automated 3-5 day payouts replaced a 30-60 day payment cycle. Performance-based provider tiers (Standard, Preferred, Elite) where Elite providers are 11% of the network but generate 33% of GMV.",
    problem: "Existing provider network of 45 suppliers was managed via spreadsheets with a 15% verification rate. Verification took 2-3 weeks manually. Customer CSAT sat at 3.2/5.0 with an 8.3% dispute rate. Service coordinator spent 40+ hours per week on manual matching and follow-up. Provider research showed verification friction was the #1 reason suppliers abandoned other marketplaces.",
    solution: "Automated verification pipeline (Checkr identity, 34-state license API, ACORD insurance form parsing) with daily credential expiration monitoring and progressive reminder schedules. Launched with a provisional tier compromise: providers could work immediately but had 30 days to complete full verification (92% completed, 8% who didn't likely wouldn't have met quality bar). Cold start strategy focused on converting existing 45 provider relationships across 3 metros rather than expanding everywhere with thin supply, achieving 80%+ request fulfillment in week one. Dispute resolution with 48-hour response windows and double-blind reviews prevents retaliation.",
    role: "Concept to two-sided launch in 6 months. Researched 12 competitor marketplaces and interviewed 30+ suppliers — verification friction was the #1 reason they abandoned other platforms, which shaped every design decision. Built the marketplace economics model (GMV projections, take rate, supplier acquisition costs) that justified the initial investment. Prototyped the full onboarding experience and tested it with 10 suppliers before committing to development. Made the call to launch supplier-side first with existing 45 provider relationships across 3 metros rather than expanding everywhere with thin supply — hit 80%+ request fulfillment in week one. Paired with three contract engineers on architecture decisions, measured ROI through verification completion rates and time-to-first-listing.",
    architecture: "Next.js marketplace frontend with Node.js/Express backend. PostgreSQL with asyncpg high-performance async connection pooling (min 5, max 20 connections) and SQLAlchemy async ORM for dual-mode database access (raw queries + ORM). Elasticsearch for service discovery and provider search. Kafka event streaming for booking lifecycle and verification events. Stripe Connect for escrow payments, Clerk for authentication, and PostGIS for geospatial radius queries. All list endpoints implement bounded pagination (max 1,000 records per request).",
    pipeline: [
      {label:"Ingest",detail:"Supplier applications + verification documents"},
      {label:"Process",detail:"Background check pipeline + credential validator"},
      {label:"Store",detail:"Supabase supplier_profiles + Stripe Connect"},
      {label:"Serve",detail:"Marketplace API + trust score feed"}
    ],
    metrics: [
      {value: "4x", label: "Monthly Request Volume", prev: "vs. manual baseline"},
      {value: "$15M+", label: "Projected Year 1 GMV", prev: "based on Q1 run rate"},
      {value: "94%", label: "Verification Rate", prev: "from 15%"},
      {value: "<2%", label: "Dispute Rate", prev: "from 8.3%"}
    ],
    tech: ["Node.js/Express","PostgreSQL","Elasticsearch","Kafka","Next.js","Stripe Connect","Clerk","PostGIS"],
    pivot: "Launched with a comprehensive 12-step provider verification process. Completion rate was 23% because providers abandoned halfway through. A/B tested a 'progressive verification' approach: list immediately with basic info, then unlock features as they complete additional verification steps. Completion rate hit 78% and time-to-first-listing dropped from 2 weeks to same-day.",
    github: "https://github.com/riiiiiicoooo/verified-services-marketplace",
    operationalDocs: {
      slos: ["Search-to-Match P95 < 2s", "Provider Verification Completion 92%", "Dispute Resolution < 48hr", "Payment Settlement 99.5% within 5 days"],
      capacityHighlight: "Current: 45 providers, 3 metros. Scales to 500 providers / 15 metros at $1,200/mo (PostGIS indexing + Stripe Connect batching).",
      runbooks: ["Stripe Connect Payout Failure", "Verification Pipeline Backlog", "Provider Trust Score Anomaly"]
    },
    futureRoadmap: [
      {title: "AI-Powered Matching Intelligence", description: "Replace rule-based composite scoring with an ML matching model trained on booking outcomes, incorporating provider response patterns, seasonal demand signals, and customer preference embeddings for 20-30% match quality improvement."},
      {title: "Hybrid Search with Reciprocal Rank Fusion", description: "Upgrade Elasticsearch to hybrid BM25 + vector search with Reciprocal Rank Fusion for provider discovery — capturing semantic intent ('someone good with older homes') alongside exact qualification matching."},
      {title: "Real-Time Trust Scoring via Event Streaming", description: "Migrate trust score computation from batch recalculation to Kafka-driven event streaming, enabling real-time provider score updates on review submission, credential expiration, and dispute resolution."}
    ]
  },
  {
    id: "ai-data-ops",
    name: "AI Data Operations Platform",
    domain: "ML Infrastructure",
    category: "AI & ML",
    stage: "Multi-client",
    timeline: "5 months",
    tagline: "Training Data Quality at Scale",
    description: "Schema-driven annotation platform that simultaneously serves radiology (bounding boxes), RLHF (preference pairs), NER (span extraction), and fraud classification through JSONB-configurable annotation types. Multi-metric agreement engine auto-selects the right statistical measure (Cohen's kappa, Krippendorff's alpha, IoU, Span F1, BLEU) based on task type. Cost analytics module tracks per-annotator-tier economics, active learning efficiency gains, consensus optimization costs, and drift detection frequency impact — making annotation spend as visible as cloud spend.",
    problem: "Annotation teams were producing ~200 examples per team-day with a 12% error rate and cost of $0.45 per labeled example. No systematic quality measurement, no feedback loops to annotators, and the data-to-model update cycle took 4-6 weeks. Initial assumption was that throughput was the problem, but analysis revealed systematic mislabeling was poisoning model training.",
    solution: "Unified platform with real-time quality scoring, automated consensus workflows, and active learning that achieves the same model improvement with 40% fewer labels (2.4x efficiency). Graduated onboarding reduces new annotator time-to-productivity from 2-3 weeks to 2.4 days. Quality certificates attached to every export include agreement metrics, golden set accuracy, and provenance hash. Chose Temporal over Airflow for orchestration because annotation workflows need human-in-the-loop pauses mid-workflow.",
    role: "Concept to multi-client production in 5 months across three organizations. Benchmarked 8 annotation platforms (Labelbox, Scale AI, Prodigy, etc.) and identified the gap nobody was solving: quality measurement. Embedded with annotation team leads at each client to map their actual error patterns — not the described workflow, the real one. Built a working prototype of the quality scoring engine and validated it with annotators before committing to the full build. Scoped the MVP to one annotation type, proved that quality improvements cut model retraining from weekly to monthly, then used those results to justify expanding across annotation types and clients. Drove the technical direction with the lead developer on the Temporal orchestration architecture.",
    architecture: "Temporal orchestrates multi-step annotation and quality pipelines. FastAPI serves the API layer with PostgreSQL for annotation metadata and MongoDB for flexible annotation schemas (bounding boxes, preference pairs, spans). S3 for media storage. PyTorch and scikit-learn power quality scoring models with Prometheus metrics for pipeline observability.",
    pipeline: [
      {label:"Ingest",detail:"Raw annotation batches via S3 upload"},
      {label:"Process",detail:"Temporal quality scoring pipeline"},
      {label:"Store",detail:"PostgreSQL quality_scores + model registry"},
      {label:"Serve",detail:"Team performance API + model training feed"}
    ],
    metrics: [
      {value: "2,340", label: "Examples/Team-Day", prev: "from 200 baseline"},
      {value: "2.8%", label: "Annotation Error Rate", prev: "from 12%"},
      {value: "11.7x", label: "Throughput Increase", prev: ""},
      {value: "3", label: "Active Clients", prev: ""}
    ],
    tech: ["Python/FastAPI","Temporal","PyTorch","scikit-learn","PostgreSQL","MongoDB","S3","Prometheus"],
    pivot: "Initially built a custom experimentation framework for annotator quality testing. Three months in, realized we were rebuilding PostHog poorly. Migrated to PostHog's feature flag and A/B testing infrastructure, saving 6 weeks of maintenance and letting us focus on what was actually novel: the multi-metric agreement engine.",
    github: "https://github.com/riiiiiicoooo/ai-data-operations-platform",
    operationalDocs: {
      slos: ["Annotation Quality Score > 0.85 kappa", "Task Assignment Latency P95 < 500ms", "Export Data Integrity 100%", "Annotator Onboarding < 3 days"],
      capacityHighlight: "Current: 3 clients, 2,340 examples/team-day. Scales to 15 clients at $2,100/mo (Temporal worker fleet + partitioned task queues).",
      runbooks: ["Quality Score Degradation", "Temporal Worker Backlog", "Inter-Annotator Agreement Drop"]
    },
    futureRoadmap: [
      {title: "OpenTelemetry GenAI Observability", description: "Instrument all ML pipeline stages with OpenTelemetry GenAI semantic conventions — standardized tracing for annotation quality scoring, model training runs, and active learning cycles pluggable into any enterprise observability stack."},
      {title: "Agentic Data Quality Workflows", description: "Deploy autonomous AI agents that monitor annotation drift, trigger retraining when quality scores degrade below thresholds, and auto-generate corrective training batches using active learning — reducing human-in-the-loop overhead by 40%."},
      {title: "Federated Annotation Across Client Boundaries", description: "Implement privacy-preserving federated annotation where quality models improve across all clients without sharing raw data — enabling cross-client benchmarking while maintaining data isolation."}
    ]
  },
  {
    id: "contract-intelligence",
    name: "Contract Intelligence Platform",
    domain: "Legal AI",
    category: "AI & Legal",
    stage: "Production",
    timeline: "16 weeks",
    tagline: "M&A Due Diligence Automation",
    description: "AI-powered contract analysis for M&A deal rooms with dual-path document processing: Docling for native PDFs (70% of contracts, fast) and Azure Document Intelligence for scanned PDFs (30%, high accuracy). Multi-model routing uses Claude as primary for full-contract extraction and GPT-4 as fallback for specific clause types where it outperforms (indemnification, limitation of liability). Hybrid search (BM25 + semantic + reranking) achieves 91% accuracy vs. 58% keyword-only.",
    problem: "M&A attorneys manually reviewed 3-5 contracts per hour, reading linearly through every page. Due diligence on a 200-contract deal took 2-3 weeks and $150K-300K in associate billing. Human reviewers caught roughly 70% of risk flags due to fatigue, and associates initially resisted the tool, perceiving it as a threat to billable hours.",
    solution: "Automated extraction pipeline with clause-level risk scoring, PII redaction pre-processing via Presidio (required for privilege protection under United States v. Heppner), and LangGraph orchestration that routes high-confidence extractions to auto-accept while flagging low-confidence items for human review. Reframing the tool as 'contract review prep' rather than replacement increased adoption from 30% to 85%. Row-Level Security policies enforce firm/matter-level data boundaries at the PostgreSQL level, not just the API layer.",
    role: "Concept to production in 16 weeks. Embedded with M&A attorneys during active due diligence to map the real workflow — not the described workflow. Built accuracy benchmarks against attorney-reviewed ground truth and used them to evaluate Claude, GPT-4, and Cohere head-to-head. Claude hit 94% on full-contract extraction where GPT-4 sat at 78% on indemnification clauses, so I made the call to run Claude as primary with GPT-4 as a targeted fallback — a multi-model routing pattern that wasn't in the original architecture. Prototyped the extraction pipeline against a live purchase agreement, piloted on an active deal, and used the $600K savings result to kill the phased rollout plan and push for immediate practice-group-wide deployment.",
    architecture: "Next.js frontend with Python/Flask backend deployed on Google Cloud Run. Elasticsearch for full-text contract indexing with pgvector for semantic clause search. Claude and GPT-4 handle extraction via multi-model routing, Google Cloud NLP for entity recognition, and LangSmith for LLM observability and evaluation.",
    pipeline: [
      {label:"Ingest",detail:"PDF/DOCX uploads via deal room integration"},
      {label:"Process",detail:"Claude + GPT-4 extraction pipeline"},
      {label:"Store",detail:"Supabase clause_extractions + pgvector"},
      {label:"Serve",detail:"Risk dashboard API + deal room sync"}
    ],
    metrics: [
      {value: "50-80", label: "Contracts/Hour", prev: "from 3-5 manual"},
      {value: "94.2%", label: "Extraction Accuracy", prev: ""},
      {value: "16x", label: "Speed Improvement", prev: ""},
      {value: "$2.1M", label: "Annual Savings", prev: ""}
    ],
    tech: ["Next.js","Python/Flask","Elasticsearch","pgvector","Claude","GPT-4","Google Cloud NLP","LangSmith"],
    pivot: "Launched with GPT-4 as the sole extraction model. Accuracy on indemnification clauses was 78%. Ran a structured benchmark against Claude and found it hit 94% on full-contract extraction. Pivoted to Claude as primary with GPT-4 as fallback for specific clause types where it outperforms. This multi-model routing approach wasn't in the original architecture.",
    github: "https://github.com/riiiiiicoooo/contract-intelligence-platform",
    operationalDocs: {
      slos: ["Extraction Accuracy > 94%", "Contract Processing P95 < 30s", "Audit Trail Completeness 100%", "Risk Flag Recall > 90%"],
      capacityHighlight: "Current: 50-80 contracts/hr. Scales to 500 contracts/hr at $1,800/mo (pgvector indexing + Claude batch API).",
      runbooks: ["LLM Extraction Accuracy Drop", "Document Processing Queue Backlog", "Risk Classification False Positive Spike"]
    },
    futureRoadmap: [
      {title: "Agentic Graph RAG for Contract Relationships", description: "Layer a knowledge graph over the existing vector store to capture cross-contract relationships (parent-subsidiary obligations, cascading termination clauses) — enabling queries like 'what happens to subsidiary contracts if the master agreement terminates?'"},
      {title: "Hybrid RAG with Reciprocal Rank Fusion", description: "Upgrade from current BM25 + semantic search to a full Reciprocal Rank Fusion pipeline with Cohere Rerank, targeting 95%+ retrieval accuracy on clause-level extraction — critical for legal terms requiring exact match precision."},
      {title: "Multi-Jurisdiction Compliance Mapping", description: "Train jurisdiction-specific extraction models that map contract clauses to regulatory requirements across US, EU (GDPR/DMA), and UK frameworks — enabling automated compliance gap analysis during cross-border M&A due diligence."}
    ]
  },
  {
    id: "engagement-engine",
    name: "Engagement & Personalization Engine",
    domain: "Consumer Platform",
    category: "Consumer & Growth",
    stage: "Approved",
    timeline: "12 weeks",
    tagline: "Behavioral Personalization at Scale",
    description: "Real-time personalization engine with a weighted engagement score (recency 30%, frequency 25%, depth 20%, consistency 15%, progression 10%) computed on every session and cached in Redis. Sequential testing with spending functions enables earlier experiment stopping. Collaborative filtering combined with content-based recommendations captures cross-user patterns that pure content matching misses.",
    problem: "One-size-fits-all content and notification strategy. 28-day retention was declining, engagement per session was flat, and the team could only run 3-5 ad hoc experiments per quarter. Notification opt-outs had reached 34%. The initial team assumption was that frequency (daily opens) was the top retention predictor, but analysis revealed recency (days since meaningful action) was 2x more predictive.",
    solution: "Event-driven personalization pipeline with real-time behavioral segmentation and server-side experiment assignment (deterministic hash for cross-platform consistency). Shifted notification strategy from 'open daily' to 'come back when something relevant for you,' dropping opt-outs from 34% to 18%. Built custom experimentation framework initially because Optimizely/LaunchDarkly couldn't support sequential testing with engagement-aware cohort decomposition, then migrated to PostHog at scale when tools matured.",
    role: "Concept to measured results in 12 weeks. Tore down competing personalization engines (Optimizely, Dynamic Yield, Amplitude) to identify where the client's experimentation maturity sat and where the gaps were worth filling. Prototyped the segment builder and A/B test configurator against live user data — that working demo aligned the VP of Growth on governance faster than any deck would have. Made the call to build a custom experimentation framework initially because existing tools couldn't support sequential testing with engagement-aware cohort decomposition, then made the harder call to migrate to PostHog when their tooling matured. Drove the event pipeline architecture with the lead developer and established the measurement framework that proved +28% engagement lift and +59% retention.",
    architecture: "Event-driven architecture with Ruby on Rails processing behavioral events via Kafka streaming. Snowflake for analytics warehouse with ClickHouse for real-time query performance. Segment for event collection, PostHog for experimentation, and Redis for sub-50ms personalization caching.",
    pipeline: [
      {label:"Ingest",detail:"Segment event stream + Snowflake user profiles"},
      {label:"Process",detail:"Real-time segmentation + PostHog experiments"},
      {label:"Store",detail:"Snowflake behavioral_segments + Redis cache"},
      {label:"Serve",detail:"Personalization API + experiment results feed"}
    ],
    metrics: [
      {value: "+28%", label: "Engagement Lift", prev: "time on platform"},
      {value: "+59%", label: "28-Day Retention", prev: "in personalized segments"},
      {value: "3.2x", label: "Notification CTR", prev: "vs. broadcast baseline"},
      {value: "<50ms", label: "Personalization Latency", prev: "p95"}
    ],
    tech: ["Ruby on Rails","Snowflake","PostgreSQL","Kafka","Segment","PostHog","ClickHouse","Redis"],
    pivot: "Built the personalization scoring with frequency as the top-weighted signal (40%). A/B testing revealed recency was actually 2x more predictive of conversion than frequency. Reweighted the model (recency to 30%, frequency down to 25%) and saw engagement lift jump from +12% to +28%.",
    github: "https://github.com/riiiiiicoooo/engagement-personalization-engine",
    operationalDocs: {
      slos: ["Personalization Latency P95 < 200ms", "Experiment Assignment Consistency 99.9%", "Event Processing Lag < 5s", "Segment Refresh < 15min"],
      capacityHighlight: "Current: 50K events/day. Scales to 2M events/day at $1,500/mo (Snowflake auto-scale + Redis event buffer).",
      runbooks: ["Segment Drift Detection", "A/B Test Statistical Power Warning", "Event Pipeline Lag Spike"]
    },
    futureRoadmap: [
      {title: "LLM-Powered Micro-Segmentation", description: "Deploy Claude-based behavioral clustering that generates natural-language segment descriptions from raw event data — replacing static rule-based segments with dynamic, context-aware cohorts that update in real-time."},
      {title: "Causal Inference for Experiment Attribution", description: "Move beyond A/B test correlation to causal inference models (DoWhy framework) that isolate true treatment effects from confounding variables — enabling confident experiment decisions with 50% smaller sample sizes."},
      {title: "Edge-Computed Personalization", description: "Push personalization scoring to CDN edge nodes via WebAssembly, reducing sub-50ms Redis-backed latency to sub-10ms globally — enabling real-time personalization for latency-sensitive mobile experiences."}
    ]
  },
  {
    id: "field-sales",
    name: "Field Sales Command",
    domain: "Sales Enablement",
    category: "Enterprise & Operations",
    stage: "Pilot",
    timeline: "16 weeks",
    tagline: "Mobile-First Field Sales Operations",
    description: "Offline-first mobile platform for field sales reps with custom Redux middleware for persistent action queuing, exponential backoff retry, and conflict resolution for stale visit data. Multi-source customer aggregation unifies JDE ERP (hourly sync), Salesforce (30-min sync), and Snowflake (daily) into a single mobile profile with sub-30-second lookup time, down from 12-15 minutes.",
    problem: "68 field reps used paper route sheets and called in orders by phone. Customer lookups took 12-15 minutes across disconnected systems. No visit verification, no real-time inventory visibility, and management had zero insight into daily field operations. Rural coverage areas meant online-only tools were a nonstarter, as spotty cellular connectivity was the norm.",
    solution: "React Native app with GPS visit verification, offline-capable order entry, and intelligent route optimization. Chose division-level Row-Level Security over single-tenant databases ($9/month vs. $8K/month). The leaderboard became the killer feature unexpectedly: reps checked rankings 8-10 times daily and formed WhatsApp competition groups, driving a 25% visit frequency jump in week 2 from peer competition rather than management compliance.",
    role: "Concept to pilot deployment in 16 weeks. Did ride-alongs with field reps before writing a single requirement — documented their actual workflows, not their managers' assumptions. Discovered 23% of visits had zero cellular connectivity, which killed the online-first architecture before we built it and led to the offline-first decision that became the product's defining feature. Prototyped the mobile experience directly and put it in reps' hands for testing. Made the React Native call for cross-platform support and the division-level RLS decision ($9/month vs. $8K/month for single-tenant). Paired with two mobile developers on architecture, piloted with 68 reps, and tracked daily visit volume as the core metric — hit +43% in the first month.",
    architecture: "React Native mobile app with Expo for cross-platform deployment. Node.js/Express backend with PostGIS for geospatial territory queries and route optimization via Google OR-Tools. Redux Toolkit with AsyncStorage for offline-first state management. Salesforce API integration for CRM sync.",
    pipeline: [
      {label:"Ingest",detail:"GPS check-ins + Salesforce opportunity data"},
      {label:"Process",detail:"Route optimization engine + visit verification"},
      {label:"Store",detail:"Supabase visits + Salesforce sync queue"},
      {label:"Serve",detail:"Mobile API + leaderboard WebSocket feed"}
    ],
    metrics: [
      {value: "+43%", label: "Daily Visit Volume", prev: "4-month pilot"},
      {value: "$5.3M", label: "Est. Annual Revenue Impact", prev: "annualized from pilot"},
      {value: "92%", label: "Rep Adoption", prev: "by week 6"},
      {value: "68", label: "Active Reps in Pilot", prev: "of 85 total"}
    ],
    tech: ["React Native","Expo","Node.js/Express","PostGIS","Redux Toolkit","Salesforce","Google OR-Tools","Redis","Snowflake","Grafana"],
    pivot: "Designed for online-first with offline as a fallback. After riding along with field reps in rural territories, discovered 23% of visits had zero connectivity. Completely inverted the architecture to offline-first with Redux-persisted local state and background sync. This became the feature reps cited most in satisfaction surveys.",
    github: "https://github.com/riiiiiicoooo/field-sales-command",
    operationalDocs: {
      slos: ["Offline Sync Success Rate 99.5%", "Route Optimization P95 < 3s", "CRM Sync Lag < 5min", "Mobile App Crash Rate < 0.1%"],
      capacityHighlight: "Current: 85 reps, 340 visits/day. Scales to 500 reps at $980/mo (Snowflake warehouse + Redis queue).",
      runbooks: ["Salesforce Sync Failure", "Offline Data Conflict Resolution", "Route Optimization Timeout"]
    },
    futureRoadmap: [
      {title: "AI Route Optimization with Real-Time Signals", description: "Upgrade Google OR-Tools static routing to an ML-optimized engine incorporating real-time traffic, customer purchase probability scoring, and rep performance patterns — projecting 15-20% increase in productive visit density."},
      {title: "Conversational AI Sales Copilot", description: "Embed a Claude-powered sales assistant accessible offline via on-device inference, providing real-time competitive intelligence, objection handling scripts, and order recommendations based on customer purchase history."},
      {title: "Predictive Inventory Visibility", description: "Integrate warehouse management system data to surface real-time stock availability and predicted restock dates directly in the mobile app, eliminating the 40% of support calls currently driven by inventory questions."}
    ]
  },
  {
    id: "fintech-ops",
    name: "Fintech Operations Platform",
    domain: "Financial Infrastructure",
    category: "Finance & Compliance",
    stage: "Production",
    timeline: "6 months",
    tagline: "Double-Entry Ledger & Payment Settlement",
    description: "Core financial infrastructure with double-entry ledger backed by PostgreSQL (SERIALIZABLE isolation), multi-PSP payment orchestration (Stripe primary, Adyen fallback, Tabapay for instant transfers), and automated reconciliation. All 7 engine modules persist state to PostgreSQL and Redis via dependency-injected session factories — zero in-memory state, zero data loss on restart. Health scoring routes payments across providers based on success rate (40%), p95 latency (30%), error rate (20%), and uptime (10%) with Redis-backed circuit breakers using sorted sets and atomic pipelines. Connection pooling (QueuePool size=20, overflow=10) and idempotency cache (Redis, 24h TTL) ensure production resilience. Load-tested with Locust: 50 concurrent users, 9,100 requests in 10 minutes.",
    problem: "91.2% transaction success rate with manual reconciliation taking 3+ days and roughly $12K/month in undetected ledger imbalances. No real-time visibility into payment status. Progressive KYC wasn't available, causing 34% onboarding drop-off at the identity verification step. A single PSP outage revealed that without an internal source of truth, reconciliation across backup providers was nearly impossible.",
    solution: "Double-entry ledger as internal source of truth (not PSP as source of truth) with SERIALIZABLE isolation to prevent race conditions on concurrent balance reads. The decision to build a custom ledger added 3 weeks but proved critical during a Stripe outage when the internal ledger enabled zero-confusion reconciliation through the Adyen failover. Hybrid fraud detection uses synchronous rule-based scoring (<100ms, catches 85% of fraud) with async ML for borderline cases, avoiding the checkout latency spike that inline-ML caused. Progressive KYC tiers reduced onboarding drop-off from 34% to 7.8%.",
    role: "Concept to production in 6 months. Mapped the client's payment flow end-to-end, quantified that manual reconciliation was eating 20+ hours/week, and evaluated three off-the-shelf reconciliation tools before making the call to build custom — none handled the multi-currency requirements. That decision added 3 weeks but proved critical during a Stripe outage when the internal ledger enabled zero-confusion failover to Adyen. Prototyped the double-entry pipeline processing sample transactions to prove the architecture to the CFO and compliance team. Drove the technical direction with the lead developer on SERIALIZABLE isolation, connection pooling, and the multi-PSP routing layer. Rolled out starting with one payment channel, measured ROI through transaction success rates (91.2% → 97.8%) and reconciliation time (3+ days → <15 min).",
    architecture: "Go payment processing core for high-concurrency transaction handling with Java/Spring Boot ledger service for ACID-compliant double-entry operations (SERIALIZABLE isolation, connection pool size=20). Redis for circuit breakers (sorted sets + pipelines), health scores (rolling 1-hour windows), and idempotency cache (24h TTL). All 7 engines use dependency-injected session factories — no in-memory state. Kafka handles event streaming for transaction lifecycle events. Temporal orchestrates settlement and reconciliation workflows. Stripe Connect handles primary payment processing with Adyen failover. dbt manages data transformations, and Datadog provides unified observability across the full payment pipeline.",
    pipeline: [
      {label:"Ingest",detail:"Stripe webhooks + ACH/wire bank feeds"},
      {label:"Process",detail:"Double-entry reconciliation engine"},
      {label:"Store",detail:"PostgreSQL ledger_entries + audit trail"},
      {label:"Serve",detail:"Settlement API + compliance reporting feed"}
    ],
    metrics: [
      {value: "97.8%", label: "Transaction Success", prev: "from 91.2%"},
      {value: "<15min", label: "Reconciliation Time", prev: "from 3+ days"},
      {value: "$0", label: "Ledger Imbalance", prev: "from ~$12K/month"},
      {value: "99.97%", label: "Platform Uptime", prev: ""}
    ],
    tech: ["Go","Java/Spring Boot","AWS RDS PostgreSQL","Kafka","Temporal","Stripe Connect","dbt","Datadog"],
    pivot: "Started with a single Stripe integration. When the client onboarded a merchant portfolio with high international volume, Stripe's cross-border fees were eating 3.2% of transaction value. Built a multi-PSP routing layer that dynamically routes to Adyen for international transactions, reducing processing costs by 41%.",
    github: "https://github.com/riiiiiicoooo/fintech-operations-platform",
    operationalDocs: {
      slos: ["Transaction Success Rate 99.0%", "API Latency P95 < 500ms", "Reconciliation Completeness 99.5%", "Fraud Detection < 200ms", "Platform Availability 99.9%"],
      capacityHighlight: "Current: 4,200 txn/day, $1,005/mo. Scales to 42K txn/day at $3,390/mo. 100x ceiling at $12,160/mo with async PSP migration.",
      runbooks: ["PSP Outage & Failover", "Database Connection Exhaustion", "Settlement Batch Failure", "Fraud Rule Excessive Declines", "Reconciliation Exception Spike"],
      loadTest: "Locust load test: 50 concurrent users, 9,100 requests in 10 min. Primary bottleneck: synchronous PSP calls (3-5x improvement projected with async migration)."
    },
    futureRoadmap: [
      {title: "Async PSP Migration for 100x Throughput", description: "Migrate synchronous payment processor calls to async with event-driven confirmation, removing the primary bottleneck identified in Locust load testing — projecting 3-5x throughput improvement and enabling the 100x scaling ceiling at $12K/month infrastructure."},
      {title: "Real-Time Fraud ML Pipeline", description: "Upgrade from hybrid sync-rules/async-ML fraud detection to a fully streaming ML pipeline using Kafka Streams, enabling sub-50ms fraud scoring on every transaction with continuous model retraining on emerging fraud patterns."},
      {title: "Open Banking (FDX) Integration", description: "Add Financial Data Exchange protocol support for direct bank account connectivity, reducing PSP dependency for account-to-account transfers and enabling instant payment verification without intermediary fees."}
    ]
  },
  {
    id: "genai-governance",
    name: "Enterprise GenAI Governance",
    domain: "AI Compliance",
    category: "AI & Security",
    stage: "Production",
    timeline: "5 months",
    tagline: "Regulated AI Deployment for Financial Services",
    description: "Compliance-first governance layer for deploying generative AI in a regulated credit union. All five guardrail checks (PII detection, hallucination, bias screening, compliance filtering, confidence assessment) are deterministic stateless functions with no LLM calls, because examiners need to understand exactly why output was blocked. Versioned prompt registry with full approval workflow (DRAFT, PENDING_REVIEW, APPROVED, DEPLOYED, DEPRECATED) and SHA-256 content hashing. Risk-based token cost optimizer applies tiered guardrail evaluation (LITE for low-risk FAQ routing, STANDARD for moderate interactions, FULL for financial advice) with per-template token budgeting, model downgrade recommendations, and monthly cost projections showing exact ROI of optimization choices — never sacrificing compliance for cost.",
    problem: "Credit union wanted to deploy an AI chatbot for member services but faced NCUA regulatory requirements with zero precedent for GenAI compliance. Board and examiners needed assurance of safety and auditability. OCC SR 11-7 guidance requires financial institutions to document what models they use, how they're validated, and how they're monitored, and 'the classifier said so' is insufficient justification for blocking member-facing output.",
    solution: "Middleware governance layer that intercepts all AI interactions with deterministic guardrails (not LLM-as-judge) running in under 200ms. Prompt registry caught a production incident in week 2 when a developer updated a system prompt that caused hallucinated transaction details; the change triggered the evaluation suite before reaching members. Monthly bias testing runs identical prompts with demographic variations and detected the system was providing shorter responses to accounts under $5,000 vs. $50,000+. Model cards generated programmatically from evaluation results enabled the compliance officer to produce examiner-ready documentation in under an hour.",
    role: "Concept to successful NCUA examination in 5 months. Mapped every NCUA compliance requirement that applied to AI systems in credit unions — there was zero precedent, so I built the compliance framework from regulatory first principles. Benchmarked governance tools in the market and identified the gap: nobody was solving real-time content policy enforcement for generative AI in financial services. The first approach used an LLM to evaluate LLM outputs — the compliance team killed that immediately because examiners need explainable decisions. Made the call to pivot to deterministic guardrails (regex patterns, embedding similarity thresholds) that produce auditable results. Prototyped the content policy engine against sample member interactions to prove it to the board. Drove the middleware architecture with the lead developer and coordinated directly with NCUA examiners on audit format. Result: zero findings across 43K+ AI interactions.",
    architecture: "Middleware layer with Python orchestration and a Rust policy enforcement engine for sub-200ms guardrail evaluation. PostgreSQL for audit logging with TimescaleDB for time-series compliance metrics. AWS Bedrock for model access, Presidio for PII detection, and Prometheus + Grafana for real-time governance dashboards.",
    pipeline: [
      {label:"Ingest",detail:"LLM request/response interceptor middleware"},
      {label:"Process",detail:"Content policy engine + bias detection model"},
      {label:"Store",detail:"Supabase interaction_logs + LangSmith traces"},
      {label:"Serve",detail:"Governance dashboard API + examiner export"}
    ],
    metrics: [
      {value: "0", label: "NCUA Exam Findings", prev: ""},
      {value: "43K+", label: "AI Interactions Governed", prev: ""},
      {value: "100%", label: "Audit Coverage", prev: ""},
      {value: "<500ms", label: "Governance Overhead", prev: ""}
    ],
    tech: ["Python","Rust","PostgreSQL","TimescaleDB","AWS Bedrock","Presidio","Prometheus","Grafana"],
    pivot: "First approach used an LLM to evaluate LLM outputs for bias and compliance, essentially an AI checking AI. The compliance team rejected this immediately: 'We can't explain to examiners why an AI said another AI's output was safe.' Pivoted to deterministic guardrails (regex patterns, embedding similarity thresholds) that produce auditable, explainable decisions.",
    github: "https://github.com/riiiiiicoooo/genai-governance",
    operationalDocs: {
      slos: ["Guardrail Latency P95 < 200ms", "PII Detection Recall > 99%", "Audit Log Completeness 100%", "Bias Test Coverage 100% monthly"],
      capacityHighlight: "Current: 43K interactions/mo. Scales to 500K interactions/mo at $1,400/mo (stateless guardrails + Redis cache).",
      runbooks: ["Guardrail False Positive Spike", "LLM Provider Latency Degradation", "Bias Detection Alert"]
    },
    futureRoadmap: [
      {title: "LLM Cascade Routing for Cost Optimization", description: "Implement confidence-gated cascade routing — start with the cheapest model, evaluate output confidence, and only escalate to expensive models when quality thresholds aren't met. Combined with per-template token budgeting, projecting additional 30-40% cost reduction."},
      {title: "Multi-Regulatory Framework Support", description: "Extend the NCUA-focused compliance engine to support OCC SR 11-7, EU AI Act, and NIST AI RMF frameworks — enabling the platform to serve banks, insurance carriers, and EU-regulated financial institutions from a single governance layer."},
      {title: "Automated Model Card Generation with Eval Pipelines", description: "Build continuous evaluation pipelines that auto-generate examiner-ready model cards after every prompt registry deployment — including accuracy benchmarks, bias test results, and drift metrics with zero manual compliance documentation effort."}
    ]
  },
  {
    id: "infra-automation",
    name: "Infrastructure Automation Platform",
    domain: "DevOps",
    category: "Enterprise & Operations",
    stage: "Production",
    timeline: "20 weeks",
    tagline: "Self-Service Enterprise Infrastructure",
    description: "Self-service infrastructure provisioning with digital twin simulation that replaced a $45K/month persistent staging environment with ephemeral containerized twins generated from Terraform state ($200/run, 96.2% accuracy). OPA/Rego policies are testable, version-controlled, and evaluated in under 100ms. Per-workflow Vault STS tokens scoped to specific resources for 1 hour eliminate standing access risk.",
    problem: "Infrastructure requests took 3 weeks with 6 approval steps, each costing an average of $2,400 in platform engineer time. Platform team was a bottleneck with 40% of their time spent on routine provisioning. Persistent staging drifted from production (23 config differences over 3 months, 4 caused test/prod divergence). Engineers worked around the process, creating shadow IT risk, including provisioning prod-grade environments for testing at $2,100 each.",
    solution: "Three-tier self-service portal: Tier 1 (dev) is fully self-service, Tier 2 (staging) requires team lead approval, Tier 3 (prod) requires director + security review. 85% of requests are Tier 1. Chose Temporal over Airflow/Step Functions because provisioning workflows need to pause indefinitely waiting for VP sign-off, and Temporal handles human-in-the-loop natively with durable execution replay. The CISO initially blocked full self-service, but implementing tiered approvals made security a platform advocate instead of a blocker.",
    role: "Concept to company-wide rollout in 20 weeks. Interviewed 15 engineering teams and calculated each infrastructure request cost $2,400 in platform engineer time — that number built the business case. Evaluated Backstage, Env0, and Spacelift, then made the call to build custom with OPA for policy enforcement after none handled the three-tier approval model. Prototyped the self-service portal and let two pilot teams provision staging environments without platform team involvement — that live proof point converted the CISO from blocker to advocate. The initial monolithic Terraform approach timed out at 47 minutes in production; decomposed it into a Temporal workflow with parallel provisioning that dropped deployment to 8 minutes. Drove architecture decisions with three contract developers, tracked provisioning time and compliance violations as core metrics. $12M annual value.",
    architecture: "Go self-service portal with Temporal orchestrating provisioning workflows across Terraform and Ansible. PostgreSQL for deployment state with etcd for distributed locks. OPA/Rego policy engine enforces guardrails at deployment time. Datadog for infrastructure observability.",
    pipeline: [
      {label:"Ingest",detail:"Terraform plan requests via self-service portal"},
      {label:"Process",detail:"OPA policy evaluation + approval workflow"},
      {label:"Store",detail:"PostgreSQL deployments + Terraform state backend"},
      {label:"Serve",detail:"Provisioning API + Ansible execution logs"}
    ],
    metrics: [
      {value: "85%", label: "Deployment Time Reduction", prev: "47 min → 8 min"},
      {value: "$12M", label: "Projected Annual Value", prev: "based on Q1 run rate"},
      {value: "3 weeks → 4 hrs", label: "Provisioning Time", prev: ""},
      {value: "0", label: "Policy Violations Post-Launch", prev: "20-week window"}
    ],
    tech: ["Go","Temporal","Terraform","Ansible","PostgreSQL","etcd","OPA/Rego","Datadog"],
    pivot: "Built the initial provisioning engine as a monolithic Terraform apply. First production deployment took 47 minutes and timed out. Decomposed into a Temporal workflow with parallel provisioning of independent resources and sequential ordering of dependencies. Deployment time dropped to 8 minutes with granular rollback at each step.",
    github: "https://github.com/riiiiiicoooo/infrastructure-automation-platform",
    operationalDocs: {
      slos: ["Provisioning Success Rate 99.5%", "Deployment Time P95 < 12min", "Policy Compliance 100%", "Anomaly Detection Latency < 30s"],
      capacityHighlight: "Current: 200 deployments/week. Scales to 2,000/week at $2,200/mo (Temporal worker fleet + TimescaleDB retention).",
      runbooks: ["Terraform Apply Failure", "OPA Policy Violation Cascade", "Anomaly Detection False Positive Storm"]
    },
    futureRoadmap: [
      {title: "AI-Assisted Infrastructure Recommendations", description: "Deploy a Claude-powered advisory layer that analyzes Terraform state, cost data, and usage patterns to recommend right-sizing, reserved instance purchases, and architecture optimizations — projecting 20-30% cloud spend reduction."},
      {title: "GitOps-Native Policy as Code", description: "Migrate OPA/Rego policies to a GitOps workflow with PR-based policy changes, automated policy testing against historical deployments, and rollback capabilities — making infrastructure governance as reviewable as application code."},
      {title: "Ephemeral Environment Orchestration", description: "Extend the digital twin simulation into full ephemeral environment provisioning — spin up production-identical environments per pull request, run integration tests, and auto-teardown, replacing the need for shared staging entirely."}
    ]
  },
  {
    id: "integration-health",
    name: "Integration Health Monitor",
    domain: "API Monitoring",
    category: "Enterprise & Operations",
    stage: "Multi-client",
    timeline: "8 weeks",
    tagline: "Third-Party Integration Observability",
    description: "Cross-client integration monitoring platform built across 4 engagements (digital lending, e-commerce, insurance brokerage, healthcare benefits). Detects silent webhook delivery failures that traditional monitoring misses entirely by comparing expected-vs-actual volume baselines. Per-provider circuit breakers with tuned thresholds (Stripe P0: 5% error/120s window; SendGrid P3: 25% error/300s window) and funnel-to-API attribution that maps user drop-offs to specific provider latency spikes.",
    problem: "Mean time to identify integration issues was 30+ minutes. Traditional monitoring (response times, error rates) missed silent failures entirely. At the lending startup, Plaid's webhook delivery degraded to 84% over two weeks, undetected. Loan applications still worked but with stale income verification, resulting in 47 applications approved with potentially outdated data before compliance caught it. The product team had misattributed a 17-point onboarding drop-off to UX when 60% of drop-offs correlated with KYC API latency exceeding 8 seconds.",
    solution: "Unified monitoring with rolling 24-hour baseline anomaly detection (not static thresholds, which cause constant false alerts on high-volume providers and miss degradation on low-volume ones). Composite vendor scoring (uptime vs. SLA 30%, incident frequency 20%, p95 latency trend 15%, webhook delivery 15%, support responsiveness 10%, developer experience 10%) gave the lending client concrete negotiating leverage in QBRs, resulting in provider credits and a dedicated support path. Funnel-to-API attribution prevented a costly UX redesign by proving the drop-off was a provider timeout issue, not a design problem.",
    role: "First client live in 8 weeks, expanded to two more clients the following quarter. Analyzed incident postmortems and found 60% of outages were third-party API failures that took 30+ minutes to detect — that insight shaped the entire product. Benchmarked Datadog, Runscope, and Moesif; none focused on provider-side health scoring. Prototyped the health dashboard against live status data from three of the client's critical providers. The first version used fixed threshold alerting — it generated 200+ false alerts in week one. Killed it and rebuilt with rolling baseline anomaly detection where each provider gets its own dynamic threshold. Alert volume dropped 94% while catching more real incidents. Drove the integration framework architecture with the lead developer, scoped MVP to 5 providers, and used the MTTI improvement to justify expansion to additional clients.",
    architecture: "Go ingestion layer processing webhook events at high throughput from third-party providers. Kafka for event streaming with TimescaleDB for time-series health metrics and Elasticsearch for log indexing. ClickHouse for analytics queries. Grafana dashboards for visualization and PagerDuty for automated incident routing.",
    pipeline: [
      {label:"Ingest",detail:"Provider webhook events + synthetic health probes"},
      {label:"Process",detail:"Health scoring algorithm + anomaly detection"},
      {label:"Store",detail:"PostgreSQL provider_health + Grafana metrics"},
      {label:"Serve",detail:"Alert API + circuit breaker status feed"}
    ],
    metrics: [
      {value: "<2 min", label: "Mean Time to Identify", prev: "from 30+ min"},
      {value: "15x", label: "Detection Speed", prev: ""},
      {value: "12", label: "Integrations Monitored", prev: "across 3 clients"},
      {value: "99.4%", label: "Alert Precision", prev: "after dynamic threshold tuning"}
    ],
    tech: ["Go","TimescaleDB","Elasticsearch","Kafka","React","Grafana","PagerDuty","ClickHouse"],
    pivot: "Launched with fixed threshold alerting (error rate > 5% = alert). Within the first week, the team got 200+ alerts because normal provider variance routinely crossed 5%. Switched to rolling baseline anomaly detection where each provider now gets its own dynamic threshold based on 24-hour trailing behavior. Alert volume dropped 94% while catching more real incidents.",
    github: "https://github.com/riiiiiicoooo/integration-health-monitor",
    operationalDocs: {
      slos: ["Webhook Processing P95 < 500ms", "Alert Precision > 85%", "Health Check Freshness < 60s", "Dashboard Load Time P95 < 2s"],
      capacityHighlight: "Current: 15 integrations, 8K events/day. Scales to 100 integrations at $750/mo (PostgreSQL partitioning + Grafana optimization).",
      runbooks: ["Provider Webhook Outage", "Alert Storm / False Positive Cascade", "Health Score Calculation Drift"]
    },
    futureRoadmap: [
      {title: "Predictive Failure Detection", description: "Train a time-series forecasting model on historical provider health data to predict integration failures 15-30 minutes before they impact users — shifting from reactive anomaly detection to proactive incident prevention."},
      {title: "OpenTelemetry-Native Provider Tracing", description: "Instrument all provider interactions with OpenTelemetry distributed traces, enabling end-to-end request correlation from user action through internal services to third-party API calls — making integration debugging a single-pane experience."},
      {title: "Automated SLA Enforcement Engine", description: "Auto-generate provider SLA violation reports from health score data with financial impact calculations, giving procurement teams data-backed leverage for contract negotiations and vendor accountability."}
    ]
  },
  {
    id: "portfolio-intelligence",
    name: "Portfolio Intelligence Hub",
    domain: "Real Estate Analytics",
    category: "AI & ML",
    stage: "Active",
    timeline: "10 weeks to MVP",
    tagline: "Natural Language Querying for Real Estate Data",
    description: "Dual-engine analytics platform combining Text-to-SQL (for structured Snowflake queries) with RAG semantic search (for unstructured documents like leases and inspection reports). A semantic business layer defines 15+ real estate KPIs once, ensuring metric consistency across all 45 users and eliminating the 'why do these numbers not match?' problem that killed adoption of previous analytics tools. Three-layer RBAC enforces access at the app level (Clerk), database level (Supabase RLS), and warehouse level (Snowflake views).",
    problem: "Portfolio managers across 87 properties and a $150M+ annual operating budget waited 24-48 hours for a 2-analyst team to run custom SQL queries. Month-end close took 10 business days. User testing revealed property managers ignored dashboard prototypes and typed questions into the search bar, validating the chat-first approach and killing the dashboard prototype.",
    solution: "6-step Text-to-SQL pipeline (intent classification, semantic table mapping, SQL generation with few-shot prompting, validation, execution) achieving 89% F1 accuracy. Switched from fine-tuned text-to-SQL models to Claude with schema validation after discovering fine-tuned models hallucinated JOINs 15.5% of the time vs. 0.8% with constrained generation. Hybrid BM25 + vector search with Cohere reranking (0.82 NDCG@5) outperforms pure vector search. Semantic document chunking at clause boundaries (not fixed-size 512 tokens) improved retrieval from 0.72 to 0.84 NDCG@5 by preserving legal context.",
    role: "MVP live in 10 weeks, continued iterating through a 4-month engagement. Cataloged the 20 most common data requests from 8 portfolio managers — they were waiting 24-48 hours for queries that should take seconds. Built a test suite of 50 real property queries with the analyst team and used it to benchmark Claude, Cohere, and OpenAI on SQL generation accuracy. The first version generated SQL directly without a semantic layer — it worked 60% of the time, and the failure mode was subtle (the LLM calculated 'occupancy rate' differently depending on how it was asked). Made the call to build a semantic business layer mapping every metric to a canonical SQL definition. Accuracy jumped from 60% to 91.3%. Prototyped the natural language interface against live Snowflake data and drove the RAG pipeline architecture with the lead developer.",
    architecture: "Python/Flask backend with text-to-SQL engine. Snowflake as the primary data warehouse with BigQuery for cross-property analytics. PostgreSQL with pgvector for document search. Claude API for SQL generation and Cohere Rerank for hybrid retrieval. Angular frontend for analytics dashboards.",
    pipeline: [
      {label:"Ingest",detail:"Snowflake property data + document uploads"},
      {label:"Process",detail:"Claude text-to-SQL + Cohere RAG pipeline"},
      {label:"Store",detail:"Snowflake query_results + pgvector embeddings"},
      {label:"Serve",detail:"Natural language query API + confidence scores"}
    ],
    metrics: [
      {value: "<30s", label: "Self-Service Query Time", prev: "vs. 24-48hr analyst wait"},
      {value: "91.3%", label: "SQL Accuracy (F1)", prev: "from 60% without semantic layer"},
      {value: "2,800+", label: "Queries Served", prev: "over 4-month engagement"},
      {value: "4.6/5", label: "User Satisfaction", prev: "N=45 users"}
    ],
    tech: ["Python/Flask","Snowflake","BigQuery","pgvector","Claude API","Cohere Rerank","Angular","Playwright"],
    pivot: "First version generated SQL directly from natural language without a semantic layer. Queries worked 60% of the time. The failure mode was subtle: the LLM would calculate 'occupancy rate' differently depending on how it was asked. Built a semantic business layer that maps every metric to a canonical SQL definition. Accuracy jumped from 60% to 91.3%.",
    github: "https://github.com/riiiiiicoooo/portfolio-intelligence-hub",
    operationalDocs: {
      slos: ["Query Accuracy > 91%", "Text-to-SQL Latency P95 < 5s", "Data Freshness < 24hr", "Semantic Layer Coverage 100%"],
      capacityHighlight: "Current: 200 queries/day. Scales to 5,000 queries/day at $1,100/mo (Snowflake auto-suspend + pgvector index optimization).",
      runbooks: ["SQL Generation Accuracy Drop", "Snowflake Query Timeout", "Semantic Layer Sync Failure"]
    },
    futureRoadmap: [
      {title: "Agentic Graph RAG for Property Relationships", description: "Layer a property knowledge graph over the existing vector store to capture cross-property relationships (shared vendors, lease dependencies, portfolio-level risk exposure) — enabling complex queries the text-to-SQL pipeline can't handle alone."},
      {title: "Multi-Modal Document Intelligence", description: "Extend the RAG pipeline to process floor plans, site photos, and inspection imagery alongside text documents using vision models — enabling queries like 'show me all properties with deferred maintenance visible in recent inspections.'"},
      {title: "Predictive Portfolio Analytics", description: "Build forecasting models for occupancy trends, maintenance costs, and lease renewal probability using historical Snowflake data — moving from descriptive analytics ('what happened') to predictive insights ('what will happen next quarter')."}
    ]
  },
  {
    id: "review-prep",
    name: "Review Prep Engine",
    domain: "Wealth Management",
    category: "Finance & Compliance",
    stage: "Approved",
    timeline: "3 months",
    tagline: "Automated Client Review Assembly",
    description: "Automated client review assembly that generates three simultaneous outputs from a single data pull: advisor briefing (talking points), compliance file (audit trail), and operations tracker (action items). Integrated engagement scoring model (meeting frequency, portfolio activity, attrition risk, sentiment) revealed that highest-AUM clients were actually the most at-risk, flagging $48M in at-risk AUM in the first quarter.",
    problem: "Advisors spent 35-50 minutes per client pulling data from four disconnected systems before every review meeting. With 200+ clients, quarterly reviews consumed 150 paraplanner hours. Briefings arrived 12-24 hours before meetings (or morning-of). Action item follow-through was at 59%, and 23% of reviews missed major client life events. The initial scope focused on prep time, but research revealed eroding follow-through was the bigger trust killer.",
    solution: "Automated pipeline with daily Salesforce sync, position delta detection, and automated life event extraction from CRM notes. Built configurable briefing views after discovering lead advisors wanted comprehensive financials while junior advisors wanted simplified talking points; a single template would have alienated one group. Real-time action item capture during meetings (not retroactively) ensures Operations sees items same-day instead of 2 days later. Engagement scoring benchmarked against historical attrition data validated that meeting frequency decline predicts churn 2 quarters ahead.",
    role: "Concept to 200+ portfolios in 3 months. Interviewed advisors across three firm tiers and found the real pain: 45+ minutes per client pulling data from four disconnected systems before every review. The first version was a standalone app requiring manual data input — adoption was near zero. Advisors said 'I don't have time to enter data into another system.' Killed the manual approach and rebuilt with automated CRM and portfolio system ingestion via n8n workflows. Also discovered lead advisors wanted comprehensive financials while junior advisors wanted simplified talking points — a single template would have alienated one group, so built configurable briefing views. Prototyped against live client data, piloted with advisors, iterated the template through three revisions based on structured feedback. Prep time: 45 minutes → 12 minutes with zero manual entry.",
    architecture: "Next.js frontend for advisor review and customization. Node.js/Express backend orchestrating data pulls across Schwab, Fidelity, and Interactive Brokers APIs. PostgreSQL for briefing storage with Elasticsearch for searchable client history. Redis for session caching and SendGrid for automated briefing delivery.",
    pipeline: [
      {label:"Ingest",detail:"CRM client records + portfolio system feeds"},
      {label:"Process",detail:"n8n orchestration + briefing doc assembly"},
      {label:"Store",detail:"Supabase briefing_packages + Next.js cache"},
      {label:"Serve",detail:"Advisor portal API + PDF export service"}
    ],
    metrics: [
      {value: "12 min", label: "Prep Time/Client", prev: "from 45 min"},
      {value: "73%", label: "Time Savings", prev: "per review cycle"},
      {value: "200+", label: "Client Portfolios", prev: "across active advisors"},
      {value: "94%", label: "Advisor Satisfaction", prev: "N=45 advisors"}
    ],
    tech: ["Node.js/Express","PostgreSQL","Elasticsearch","Next.js","Clerk","SendGrid","Redis"],
    pivot: "Originally designed as a standalone app requiring advisors to manually input client data. Adoption was near zero. Advisors said 'I don't have time to enter data into another system.' Pivoted to automated ingestion from the existing CRM and portfolio system via n8n workflows. Prep time dropped from 45 minutes to 12 minutes with zero manual data entry.",
    github: "https://github.com/riiiiiicoooo/review-prep-engine",
    operationalDocs: {
      slos: ["Prep Generation P95 < 45s", "Data Source Sync Success 99.5%", "Advisor Adoption > 80%", "CRM Integration Uptime 99.9%"],
      capacityHighlight: "Current: 120 preps/week. Scales to 2,000 preps/week at $900/mo (n8n workflow parallelism + Supabase connection pooling).",
      runbooks: ["CRM Data Pull Failure", "Prep Generation Timeout", "Stale Portfolio Data Alert"]
    },
    futureRoadmap: [
      {title: "AI-Generated Talking Points with Context", description: "Deploy Claude to generate personalized advisor talking points based on portfolio performance, market conditions, and client communication history — moving from data assembly to intelligent narrative generation."},
      {title: "Real-Time Meeting Intelligence", description: "Add meeting transcription with automatic action item extraction and sentiment analysis, feeding back into the engagement scoring model to detect at-risk relationships during the meeting rather than after quarterly reviews."},
      {title: "Multi-Custodian Unified Data Layer", description: "Build a normalized data layer across Schwab, Fidelity, Interactive Brokers, and Pershing that handles custodian-specific data formats, reconciliation timing, and corporate action treatment — enabling firm-wide analytics regardless of custodial platform."}
    ]
  },
  {
    id: "scope-tracker",
    name: "Scope Tracker",
    domain: "Legal Operations",
    category: "AI & Legal",
    stage: "Production",
    timeline: "5 months",
    tagline: "Engagement Scope Drift Detection",
    description: "Real-time scope drift detection with automated change order generation for law firms running fixed-fee engagements. Two-tier alert system catches drift at 60% budget consumption (vs. the previous 95%), and 34% of detected scope additions convert to additional revenue through structured change order proposals that partners previously left on the table.",
    problem: "28% of engagements ran over budget, with the average fixed-fee engagement running $13K over before detection at final billing. Undetected overruns cost $400K+ annually across active engagements. Partners assumed clients would push back on change orders, so scope creep was silently absorbed. Early standalone version saw adoption drop from 90% to 40% in three weeks because associates hated dual-entry into the existing billing system and the scope tracker separately.",
    solution: "Drift detection integrates directly with Clio/PracticePanther via webhooks, comparing time entries against original scope deliverables. Detects three drift types: budget overrun (deliverable consuming more hours than planned), unscoped work (time logged with no matching deliverable), and timeline slip. Soft alerts fire at 40% budget consumption for the lead associate; hard alerts fire at 60% for the partner. Automated change order generation provides partners with a concrete document showing original scope vs. delivered scope with cost impact, turning an awkward conversation into a data-backed discussion. Integration from day one recovered adoption to 95% after the standalone version failed.",
    role: "Concept to 17 active engagements in 5 months. Analyzed two years of billing data to quantify that undetected scope overruns were costing $400K+ annually. Benchmarked BigHand, Brightflag, and CounselLink — none offered proactive drift detection with automated change order generation. Built a prototype that flagged drift on three historical engagements so partners could see real alerts against real data. The first version used real-time scope change alerts — associates hated it because every minor clarification triggered a notification. Killed the raw alerting and built a drift scoring system that distinguishes cosmetic changes from scope-expanding ones, only alerting when cumulative drift exceeds a configurable threshold. Drove the algorithm tuning and billing system integration with the backend team. $127K recovered in Q1 with 4.2-day average detection lead time.",
    architecture: "Next.js dashboard with Ruby on Rails backend. PostgreSQL for engagement and billing data with Redis for real-time notification caching. Sidekiq for background drift detection jobs and Clio/PracticePanther webhook processing. Stripe for automated change order billing.",
    pipeline: [
      {label:"Ingest",detail:"Billing system time entries + budget data"},
      {label:"Process",detail:"Drift detection algorithm + change order generator"},
      {label:"Store",detail:"Supabase engagement_health + alert queue"},
      {label:"Serve",detail:"Partner dashboard API + email alert service"}
    ],
    metrics: [
      {value: "11%", label: "Overrun Rate", prev: "from 28%"},
      {value: "$127K", label: "Recovered Q1", prev: ""},
      {value: "4.2 days", label: "Avg Detection Lead", prev: ""},
      {value: "17", label: "Active Engagements", prev: ""}
    ],
    tech: ["Ruby on Rails","PostgreSQL","Redis","Next.js","Sidekiq","Stripe"],
    pivot: "Built the first version with real-time scope change alerts. Project managers complained about alert fatigue — every minor clarification triggered a notification. So we implemented a 'drift scoring' system that distinguishes between cosmetic changes (low score) and scope-expanding changes (high score), only alerting when cumulative drift exceeds a configurable threshold. Overrun rate dropped from 28% to 11%.",
    github: "https://github.com/riiiiiicoooo/scope-tracker",
    operationalDocs: {
      slos: ["Drift Detection Latency < 5min", "Billing Accuracy 99.9%", "Dashboard Load P95 < 2s", "Alert Delivery < 60s"],
      capacityHighlight: "Current: 50 projects, 200 change events/day. Scales to 500 projects at $650/mo (PostgreSQL partitioning + Stripe webhook batching).",
      runbooks: ["Stripe Webhook Delivery Failure", "Drift Score Calculation Error", "Invoice Generation Timeout"]
    },
    futureRoadmap: [
      {title: "NLP-Based Scope Extraction from Communications", description: "Apply Claude to analyze email threads and meeting transcripts for implicit scope changes that never make it into formal change requests — catching the 'oh, and can you also...' moments that account for an estimated 40% of undetected drift."},
      {title: "Predictive Budget Forecasting", description: "Train a time-series model on historical engagement data to forecast final cost at any point in the engagement lifecycle — giving partners confidence intervals on profitability rather than single-point estimates."},
      {title: "Cross-Engagement Portfolio Analytics", description: "Aggregate drift patterns across all firm engagements to identify systemic scope risks by practice area, client type, and engagement structure — enabling proactive pricing and staffing adjustments before engagements begin."}
    ]
  },
  {
    id: "agent-orchestration",
    name: "Agent Orchestration Platform",
    domain: "AI Infrastructure",
    category: "AI & ML",
    stage: "Production",
    timeline: "16 weeks",
    tagline: "Multi-Agent Coordination for Enterprise Workflows",
    description: "Supervisor-pattern agent orchestration platform coordinating 5 specialized AI agents across claims processing, underwriting, customer service, document processing, and analytics. Uses LangGraph for stateful workflow execution with checkpointing and human-in-the-loop gates. Hook-based lifecycle management system (8 hook types: pre/post-execute, tool call, error, escalation, session lifecycle) enables cross-cutting concerns like audit logging and cost tracking without polluting agent code. Built-in evaluation framework measures semantic similarity, hallucination detection, routing accuracy, and cost efficiency with A/B comparison and statistical significance testing. Memory consolidation engine compacts session history into key facts, pattern insights, and archival summaries. Multi-model routing (Claude primary, GPT-4o secondary, Haiku for fast classification) reduced LLM spend 60% through shared knowledge base, prompt caching (37% hit rate), and intelligent model selection.",
    problem: "Insurance TPA had deployed 7 separate AI tools over 18 months, each running independently. Combined LLM spend was $47K/month with 40% redundant token usage (each tool maintained its own context, re-processing the same documents). No unified monitoring, no shared memory, and no centralized guardrails. One agent hallucinated a coverage determination that reached a policyholder before anyone caught it. No cost attribution — nobody knew which agent was spending what.",
    solution: "Unified orchestration with a supervisor agent classifying intent via Haiku (<200ms), routing to specialized agents, and enforcing five-layer deterministic guardrails (PII detection, budget enforcement, schema validation, compliance rules, content filtering). Three-tier memory architecture (Redis session state → PostgreSQL conversation history → pgvector long-term knowledge) eliminates redundant document processing. Per-agent circuit breakers prevent cascading failures. The pivot from pipeline to supervisor pattern cut average cost per task from $0.51 to $0.08.",
    role: "Concept to production in 16 weeks. Benchmarked four orchestration frameworks (LangGraph, CrewAI, AutoGen, Swarm) and three architectural patterns (supervisor, pipeline, mesh) against the client's domain structure. The original design used a pipeline pattern where every request flowed through all 5 agents sequentially — but 70% of requests only needed 1-2 agents, and a $0.02 FAQ was costing $0.51 in full-pipeline processing. Killed the pipeline and pivoted to supervisor pattern with Haiku-based intent classification (<200ms) routing to only necessary agents. Average cost per task: $0.51 → $0.08. Designed the three-tier memory architecture and five-layer guardrail system after mapping regulatory requirements with compliance officers. Made the call to start rollout with customer service (highest volume, lowest risk) before adding claims and underwriting. Drove the LangGraph implementation with the lead developer.",
    architecture: "Python/AsyncIO backend with LangGraph orchestration engine for stateful workflow execution and hook-based lifecycle management. Pinecone vector database for shared knowledge retrieval across agents. PostgreSQL for conversation history with memory consolidation engine for session compaction, Redis Streams for inter-agent communication and session state. Celery for distributed task execution. Claude and GPT-4o via provider abstraction layer with complexity-based routing. LangSmith for agent tracing, evaluation framework for quality measurement, and cost tracking.",
    pipeline: [
      {label:"Ingest",detail:"API requests + document uploads"},
      {label:"Process",detail:"LangGraph supervisor + specialized agents"},
      {label:"Store",detail:"PostgreSQL conversations + pgvector knowledge"},
      {label:"Serve",detail:"Orchestration API + WebSocket agent status"}
    ],
    metrics: [
      {value: "60%", label: "LLM Cost Reduction", prev: "$47K → $19K/month"},
      {value: "94.2%", label: "Task Completion Rate", prev: "from 67%"},
      {value: "2.4s", label: "Avg Response Time", prev: "from 15.2s"},
      {value: "0", label: "Escaped Hallucinations", prev: "from 3/month (16-week window)"}
    ],
    tech: ["Python/AsyncIO","LangGraph","Claude","GPT-4o","Pinecone","PostgreSQL","Redis Streams","Celery","LangSmith"],
    pivot: "Originally designed as a pipeline pattern where each agent processed sequentially. The pipeline approach failed in production: 70% of requests only needed 1-2 agents, yet every request paid the full pipeline latency. A $0.02 FAQ response was routing through all 5 agents at $0.51 total. Pivoted to supervisor pattern with intelligent routing — the supervisor classifies intent (<200ms via Haiku) and routes to only the necessary agents. Average cost per task dropped from $0.51 to $0.08.",
    github: "https://github.com/riiiiiicoooo/agent-orchestration-platform",
    operationalDocs: {
      slos: ["Agent Response P95 < 2s", "Orchestration Success Rate 99.0%", "Rate Limit Accuracy 100%", "Session Recovery < 10s"],
      capacityHighlight: "Current: 12 agents, 5K tasks/day. Scales to 100 agents at $1,600/mo (Redis Streams + LangGraph checkpoint optimization).",
      runbooks: ["Agent Deadlock / Infinite Loop", "LLM Provider Rate Limit Exceeded", "Supervisor Escalation Backlog"]
    },
    futureRoadmap: [
      {title: "A2A Protocol Interoperability", description: "Expose each orchestrated agent as an A2A-compatible Agent Card and implement the JSON-RPC task lifecycle — enabling agents to communicate with external ecosystems (Salesforce, ServiceNow) without custom integration as the protocol reaches 150+ supporting organizations."},
      {title: "Trajectory-Level Evaluation Framework", description: "Extend the eval framework beyond outcome metrics to trace full agent reasoning paths — tracking tool selection accuracy per step, reasoning chain coherence, and step-level latency to answer 'why did the agent make that decision?' not just 'was the answer correct?'"},
      {title: "Confidence-Gated LLM Cascading", description: "Upgrade multi-model routing from static complexity classification to dynamic cascade routing — start with the cheapest model, evaluate confidence, escalate only when quality thresholds aren't met, projecting additional 20-30% cost reduction beyond the current 60% savings."}
    ]
  },
  {
    id: "clinical-ai",
    name: "Clinical AI Platform",
    domain: "Clinical AI",
    category: "AI & ML",
    stage: "Production",
    timeline: "14 weeks",
    tagline: "HIPAA-Compliant AI for Prior Authorization & Revenue Cycle",
    description: "End-to-end clinical AI platform automating prior authorization, medical coding, and revenue cycle analytics for a 38-provider multi-specialty group. SMART on FHIR integration with Epic pulls real-time patient data, a clinical NLP pipeline (SciSpaCy + MedCAT) extracts structured medical concepts from encounter notes, and three specialized AI agents handle PA generation, coding optimization, and denial prediction. Five-layer deterministic compliance guardrails ensure HIPAA adherence with field-level AES-256 encryption and immutable audit logging.",
    problem: "Meridian Health Partners processed 4,200 prior auth requests monthly with an 18.4% denial rate and 3.8-day average turnaround. Two full-time staff spent 80% of their time on PA paperwork. Medical coders worked a 72-hour backlog with 91.3% accuracy, and $2.1M in annual revenue leaked through preventable denials, under-coded encounters, and missed appeal deadlines. The revenue cycle team couldn't identify denial patterns until quarterly reviews — by then, appeal windows had closed.",
    solution: "Three-workflow AI platform: PA Engine auto-generates authorization requests by matching patient clinical data against payer-specific criteria (BCBS NC, Aetna, UHC), achieving 6.2-hour average turnaround. Medical Coding Intelligence uses NLP-extracted concepts to suggest ICD-10-CM/CPT codes with specificity optimization and CCI bundling checks. Revenue Cycle Analytics predicts denials before submission and identifies root causes across payer/procedure/provider dimensions. All workflows enforce five-layer deterministic guardrails — PHI detection, RBAC, encryption, audit logging, and clinical safety checks — with zero LLM-as-judge patterns for compliance predictability.",
    role: "Concept to production in 14 weeks with Meridian Health Partners (38-provider multi-specialty group, Charlotte, NC). Interviewed 6 PA coordinators, 4 medical coders, and the revenue cycle director — quantified $4.8M annual cost of inefficiency. Originally scoped as ambient clinical documentation, but benchmarked against Abridge and Nuance DAX and made the call to kill that direction: saturated market, 12+ months to match their EHR integrations. The PA coordinators kept saying 'the documentation is fine — it's what happens AFTER the encounter that kills us.' Pivoted to post-encounter operations (PA automation, coding optimization, denial analytics) where ROI showed up in the first monthly claims cycle. Designed the FHIR integration architecture against Epic's SMART on FHIR R4 APIs, built the payer criteria matching logic with the PA team, and specified the five-layer HIPAA guardrail system with the compliance officer. Drove the build with the lead developer and two offshore engineers, tracking denial rate reduction (18.4% → 9.1%) as the primary metric.",
    architecture: "Python/Django backend with SMART on FHIR R4 integration (Epic) and HL7v2 messaging for legacy system interop. SciSpaCy + MedCAT NLP pipeline for clinical concept extraction and SNOMED CT linking. Claude Enterprise (BAA-signed) powering three specialized agents. PostgreSQL with pgvector for knowledge retrieval. Redis for HIPAA-compliant session management (30-min auto-logoff). Celery for async clinical workflow processing. Field-level AES-256 encryption via Fernet.",
    pipeline: [
      {label:"Ingest",detail:"FHIR R4 patient data + clinical notes"},
      {label:"Process",detail:"NLP extraction + AI agent generation"},
      {label:"Store",detail:"Encrypted PostgreSQL + pgvector knowledge"},
      {label:"Serve",detail:"PA submission API + real-time analytics"}
    ],
    metrics: [
      {value: "6.2h", label: "PA Generation Time", prev: "from 3.8-day manual cycle"},
      {value: "9.1%", label: "Denial Rate", prev: "from 18.4%"},
      {value: "97.8%", label: "Coding Accuracy", prev: "from 91.3% (N=100 sample)"},
      {value: "$2.1M", label: "Est. Annual Revenue Impact", prev: "annualized from Q1"}
    ],
    tech: ["Python/Django","SMART on FHIR R4","SciSpaCy","MedCAT","Claude Enterprise","PostgreSQL","pgvector","Redis","Celery","HL7v2"],
    pivot: "Originally scoped as an ambient clinical documentation tool — recording patient encounters and generating structured notes. During discovery, learned that Abridge and Nuance DAX had locked up the ambient documentation market with deep EHR integrations that would take 12+ months to match. But the PA coordinators kept saying: 'The documentation is fine — it's what happens AFTER the encounter that kills us.' Pivoted to post-encounter operations intelligence: PA automation, coding optimization, and denial analytics. This reframe turned a crowded-market risk into a greenfield opportunity, and the ROI was immediately measurable — denial rate reduction showed up in the first monthly claims cycle.",
    github: "https://github.com/riiiiiicoooo/clinical-ai-platform",
    operationalDocs: {
      slos: ["Clinical Decision Latency P95 < 3s", "HIPAA Audit Completeness 100%", "PHI Encryption Coverage 100%", "Agent Accuracy > 95%"],
      capacityHighlight: "Current: 500 encounters/day. Scales to 5,000 encounters/day at $2,800/mo (FHIR batch API + Redis session clustering).",
      runbooks: ["Epic FHIR Integration Failure", "PHI Exposure Incident", "Clinical Agent Hallucination Detection"]
    },
    futureRoadmap: [
      {title: "Ambient Clinical Documentation Integration", description: "Add post-encounter ambient documentation processing that feeds directly into the PA generation pipeline — closing the loop from patient visit to authorization request in a single automated workflow, targeting same-day PA submission for 80% of encounters."},
      {title: "Multi-Payer Rules Engine with Auto-Updates", description: "Build a payer criteria management system that auto-ingests coverage policy updates from BCBS, Aetna, and UHC — eliminating the manual criteria maintenance that currently delays PA accuracy when payer policies change mid-quarter."},
      {title: "Federated Learning Across Provider Networks", description: "Implement privacy-preserving federated model training across multiple provider groups so coding accuracy and denial prediction improve from shared patterns without exposing PHI — targeting 99%+ coding accuracy through cross-network intelligence."}
    ]
  }
];

export const CATEGORIES = ["AI & Security", "AI & ML", "AI & Legal", "Consumer & Growth", "Enterprise & Operations", "Finance & Compliance"];

export const MARQUEE_IDS = ["contract-intelligence", "fintech-ops", "clinical-ai", "verified-marketplace"];

export const FEATURED_CASES = [
  { id: "contract-intelligence", domain: "Legal AI", title: "Contract Intelligence Platform", desc: "M&A Due Diligence Automation. Reduced contract review from 3-5 manual reviews per hour to 50-80 contracts per hour with 94.2% extraction accuracy.", stats: [{val:"16x",label:"Faster Review"},{val:"$2.1M",label:"Annual Savings"}] },
  { id: "fintech-ops", domain: "Financial Infrastructure", title: "Fintech Operations Platform", desc: "Double-entry ledger & payment settlement. Improved transaction success from 91.2% to 97.8% with zero ledger imbalance.", stats: [{val:"97.8%",label:"Txn Success"},{val:"$0",label:"Ledger Imbalance"}] },
  { id: "clinical-ai", domain: "Clinical AI", title: "Clinical AI Platform", desc: "HIPAA-compliant AI for prior authorization & revenue cycle. Reduced denial rates from 18.4% to 9.1% with estimated $2.1M annual revenue impact.", stats: [{val:"9.1%",label:"Denial Rate"},{val:"$2.1M",label:"Est. Annual Impact"}] },
  { id: "verified-marketplace", domain: "Marketplace", title: "Verified Services Marketplace", desc: "Trust-first two-sided marketplace. Projected $15M+ Year 1 GMV based on Q1 run rate, with 94% verification rate and <2% dispute rate.", stats: [{val:"$15M+",label:"Projected Y1 GMV"},{val:"<2%",label:"Dispute Rate"}] },
];
