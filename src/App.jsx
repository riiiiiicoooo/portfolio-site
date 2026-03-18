import React, { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart
} from "recharts";
import HomeConnectDemo from "./HomeConnect";
import FieldCommandDemo from "./FieldCommand";
import ContractIntelDemo from "./ContractIntel";
import PortfolioIntelDemo from "./PortfolioIntel";
import AgentOrchDemo from "./AgentOrchDemo";
import ClinicalAIDemo from "./ClinicalAIDemo";

// ============================================================================
// PRODUCT DATA
// ============================================================================
const PRODUCTS = [
  {
    id: "agentgate",
    name: "AgentGate",
    domain: "Developer Security",
    category: "AI & Security",
    stage: "Production",
    timeline: "14 weeks",
    tagline: "AI Agent Authentication & Secrets Management",
    description: "Zero-trust authentication layer for AI agents accessing enterprise APIs. Built a custom policy engine inspired by OPA/Rego (but with a lower learning curve) that achieved 100% platform team adoption, multi-provider secrets abstraction across Vault, AWS, and 1Password, and just-in-time secret leasing that reduced credential age from 90-day averages to 4-hour leases.",
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
      {value: "0", label: "Credential Exposures", prev: "from 23 in 6 months"},
      {value: "<200ms", label: "Auth Latency p95", prev: "from 1.2s"},
      {value: "100%", label: "Audit Coverage", prev: "from ~40%"},
      {value: "47", label: "Agents Secured", prev: ""}
    ],
    tech: ["Go","PostgreSQL","Redis","OAuth 2.0/OIDC","Kong Gateway","Vault","AWS Secrets Manager","TypeScript SDK"],
    pivot: "Originally designed around mTLS certificate-based auth, but pilot teams found certificate management too operationally heavy. Pivoted to OAuth 2.0 Client Credentials Flow mid-sprint. This cut agent onboarding time from 2 days to 15 minutes and was the single decision that drove 100% adoption.",
    github: "https://github.com/riiiiiicoooo/agentgate",
    operationalDocs: {
      slos: ["Auth Latency P95 < 200ms", "Token Issuance Success Rate 99.5%", "Audit Log Completeness 100%", "Secret Rotation SLA < 4hr"],
      capacityHighlight: "Current: 47 agents, 12K auth requests/day. Scales to 500 agents at $890/mo (Redis cluster + connection pooling).",
      runbooks: ["Vault Connectivity Failure", "Token Issuance Spike", "Secret Rotation Timeout"]
    }
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
    architecture: "Next.js marketplace frontend with Node.js/Express backend. PostgreSQL for core data with Elasticsearch for service discovery and provider search. Kafka event streaming for booking lifecycle and verification events. Stripe Connect for escrow payments, Clerk for authentication, and PostGIS for geospatial radius queries.",
    pipeline: [
      {label:"Ingest",detail:"Supplier applications + verification documents"},
      {label:"Process",detail:"Background check pipeline + credential validator"},
      {label:"Store",detail:"Supabase supplier_profiles + Stripe Connect"},
      {label:"Serve",detail:"Marketplace API + trust score feed"}
    ],
    metrics: [
      {value: "4x", label: "Throughput Increase", prev: ""},
      {value: "$15M+", label: "Year 1 GMV Projection", prev: ""},
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
    }
  },
  {
    id: "ai-data-ops",
    name: "AI Data Operations Platform",
    domain: "ML Infrastructure",
    category: "AI & ML",
    stage: "Multi-client",
    timeline: "5 months",
    tagline: "Training Data Quality at Scale",
    description: "Schema-driven annotation platform that simultaneously serves radiology (bounding boxes), RLHF (preference pairs), NER (span extraction), and fraud classification through JSONB-configurable annotation types. Multi-metric agreement engine auto-selects the right statistical measure (Cohen's kappa, Krippendorff's alpha, IoU, Span F1, BLEU) based on task type.",
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
    }
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
    }
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
      {value: "+28%", label: "Engagement Lift", prev: ""},
      {value: "+59%", label: "Retention Improvement", prev: ""},
      {value: "3.2x", label: "Notification CTR", prev: ""},
      {value: "<50ms", label: "Personalization Latency", prev: ""}
    ],
    tech: ["Ruby on Rails","Snowflake","PostgreSQL","Kafka","Segment","PostHog","ClickHouse","Redis"],
    pivot: "Built the personalization scoring with frequency as the top-weighted signal (40%). A/B testing revealed recency was actually 2x more predictive of conversion than frequency. Reweighted the model (recency to 30%, frequency down to 25%) and saw engagement lift jump from +12% to +28%.",
    github: "https://github.com/riiiiiicoooo/engagement-personalization-engine",
    operationalDocs: {
      slos: ["Personalization Latency P95 < 200ms", "Experiment Assignment Consistency 99.9%", "Event Processing Lag < 5s", "Segment Refresh < 15min"],
      capacityHighlight: "Current: 50K events/day. Scales to 2M events/day at $1,500/mo (Snowflake auto-scale + Redis event buffer).",
      runbooks: ["Segment Drift Detection", "A/B Test Statistical Power Warning", "Event Pipeline Lag Spike"]
    }
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
      {value: "+43%", label: "Daily Visits", prev: ""},
      {value: "$5.3M", label: "Revenue Lift (Annual)", prev: ""},
      {value: "92%", label: "Rep Adoption", prev: "Week 6"},
      {value: "68", label: "Active Reps", prev: ""}
    ],
    tech: ["React Native","Expo","Node.js/Express","PostGIS","Redux Toolkit","Salesforce","Google OR-Tools","Grafana"],
    pivot: "Designed for online-first with offline as a fallback. After riding along with field reps in rural territories, discovered 23% of visits had zero connectivity. Completely inverted the architecture to offline-first with Redux-persisted local state and background sync. This became the feature reps cited most in satisfaction surveys.",
    github: "https://github.com/riiiiiicoooo/field-sales-command",
    operationalDocs: {
      slos: ["Offline Sync Success Rate 99.5%", "Route Optimization P95 < 3s", "CRM Sync Lag < 5min", "Mobile App Crash Rate < 0.1%"],
      capacityHighlight: "Current: 85 reps, 340 visits/day. Scales to 500 reps at $980/mo (Snowflake warehouse + Redis queue).",
      runbooks: ["Salesforce Sync Failure", "Offline Data Conflict Resolution", "Route Optimization Timeout"]
    }
  },
  {
    id: "fintech-ops",
    name: "Fintech Operations Platform",
    domain: "Financial Infrastructure",
    category: "Finance & Compliance",
    stage: "Production",
    timeline: "6 months",
    tagline: "Double-Entry Ledger & Payment Settlement",
    description: "Core financial infrastructure with double-entry ledger backed by PostgreSQL (SERIALIZABLE isolation), multi-PSP payment orchestration (Stripe primary, Adyen fallback, Tabapay for instant transfers), and automated reconciliation. All 7 engine modules persist state to PostgreSQL and Redis — zero in-memory state, zero data loss on restart. Health scoring routes payments across providers based on success rate (40%), p95 latency (30%), error rate (20%), and uptime (10%) with Redis-backed circuit breaker failover.",
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
    }
  },
  {
    id: "genai-governance",
    name: "Enterprise GenAI Governance",
    domain: "AI Compliance",
    category: "AI & Security",
    stage: "Production",
    timeline: "5 months",
    tagline: "Regulated AI Deployment for Financial Services",
    description: "Compliance-first governance layer for deploying generative AI in a regulated credit union. All five guardrail checks (PII detection, hallucination, bias screening, compliance filtering, confidence assessment) are deterministic stateless functions with no LLM calls, because examiners need to understand exactly why output was blocked. Versioned prompt registry with full approval workflow (DRAFT, PENDING_REVIEW, APPROVED, DEPLOYED, DEPRECATED) and SHA-256 content hashing.",
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
    }
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
      {value: "85%", label: "Deployment Time Reduction", prev: ""},
      {value: "$12M", label: "Annual Value", prev: ""},
      {value: "3 weeks → 4 hrs", label: "Provisioning Time", prev: ""},
      {value: "0", label: "Compliance Violations", prev: ""}
    ],
    tech: ["Go","Temporal","Terraform","Ansible","PostgreSQL","etcd","OPA/Rego","Datadog"],
    pivot: "Built the initial provisioning engine as a monolithic Terraform apply. First production deployment took 47 minutes and timed out. Decomposed into a Temporal workflow with parallel provisioning of independent resources and sequential ordering of dependencies. Deployment time dropped to 8 minutes with granular rollback at each step.",
    github: "https://github.com/riiiiiicoooo/infrastructure-automation-platform",
    operationalDocs: {
      slos: ["Provisioning Success Rate 99.5%", "Deployment Time P95 < 12min", "Policy Compliance 100%", "Anomaly Detection Latency < 30s"],
      capacityHighlight: "Current: 200 deployments/week. Scales to 2,000/week at $2,200/mo (Temporal worker fleet + TimescaleDB retention).",
      runbooks: ["Terraform Apply Failure", "OPA Policy Violation Cascade", "Anomaly Detection False Positive Storm"]
    }
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
      {value: "12", label: "Integrations Monitored", prev: ""},
      {value: "99.4%", label: "Alert Accuracy", prev: ""}
    ],
    tech: ["Go","TimescaleDB","Elasticsearch","Kafka","React","Grafana","PagerDuty","ClickHouse"],
    pivot: "Launched with fixed threshold alerting (error rate > 5% = alert). Within the first week, the team got 200+ alerts because normal provider variance routinely crossed 5%. Switched to rolling baseline anomaly detection where each provider now gets its own dynamic threshold based on 24-hour trailing behavior. Alert volume dropped 94% while catching more real incidents.",
    github: "https://github.com/riiiiiicoooo/integration-health-monitor",
    operationalDocs: {
      slos: ["Webhook Processing P95 < 500ms", "Alert Precision > 85%", "Health Check Freshness < 60s", "Dashboard Load Time P95 < 2s"],
      capacityHighlight: "Current: 15 integrations, 8K events/day. Scales to 100 integrations at $750/mo (PostgreSQL partitioning + Grafana optimization).",
      runbooks: ["Provider Webhook Outage", "Alert Storm / False Positive Cascade", "Health Score Calculation Drift"]
    }
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
      {value: "<30s", label: "Query Turnaround", prev: "from 24-48 hours"},
      {value: "91.3%", label: "SQL Accuracy", prev: ""},
      {value: "2,800+", label: "Queries Served", prev: ""},
      {value: "4.6/5", label: "User Satisfaction", prev: ""}
    ],
    tech: ["Python/Flask","Snowflake","BigQuery","pgvector","Claude API","Cohere Rerank","Angular","Playwright"],
    pivot: "First version generated SQL directly from natural language without a semantic layer. Queries worked 60% of the time. The failure mode was subtle: the LLM would calculate 'occupancy rate' differently depending on how it was asked. Built a semantic business layer that maps every metric to a canonical SQL definition. Accuracy jumped from 60% to 91.3%.",
    github: "https://github.com/riiiiiicoooo/portfolio-intelligence-hub",
    operationalDocs: {
      slos: ["Query Accuracy > 91%", "Text-to-SQL Latency P95 < 5s", "Data Freshness < 24hr", "Semantic Layer Coverage 100%"],
      capacityHighlight: "Current: 200 queries/day. Scales to 5,000 queries/day at $1,100/mo (Snowflake auto-suspend + pgvector index optimization).",
      runbooks: ["SQL Generation Accuracy Drop", "Snowflake Query Timeout", "Semantic Layer Sync Failure"]
    }
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
      {value: "73%", label: "Time Savings", prev: ""},
      {value: "200+", label: "Clients Managed", prev: ""},
      {value: "98%", label: "Advisor Satisfaction", prev: ""}
    ],
    tech: ["Node.js/Express","PostgreSQL","Elasticsearch","Next.js","Clerk","SendGrid","Redis"],
    pivot: "Originally designed as a standalone app requiring advisors to manually input client data. Adoption was near zero. Advisors said 'I don't have time to enter data into another system.' Pivoted to automated ingestion from the existing CRM and portfolio system via n8n workflows. Prep time dropped from 45 minutes to 12 minutes with zero manual data entry.",
    github: "https://github.com/riiiiiicoooo/review-prep-engine",
    operationalDocs: {
      slos: ["Prep Generation P95 < 45s", "Data Source Sync Success 99.5%", "Advisor Adoption > 80%", "CRM Integration Uptime 99.9%"],
      capacityHighlight: "Current: 120 preps/week. Scales to 2,000 preps/week at $900/mo (n8n workflow parallelism + Supabase connection pooling).",
      runbooks: ["CRM Data Pull Failure", "Prep Generation Timeout", "Stale Portfolio Data Alert"]
    }
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
    }
  },
  {
    id: "agent-orchestration",
    name: "Agent Orchestration Platform",
    domain: "AI Infrastructure",
    category: "AI & ML",
    stage: "Production",
    timeline: "16 weeks",
    tagline: "Multi-Agent Coordination for Enterprise Workflows",
    description: "Supervisor-pattern agent orchestration platform coordinating 5 specialized AI agents across claims processing, underwriting, customer service, document processing, and analytics. Uses LangGraph for stateful workflow execution with checkpointing and human-in-the-loop gates. Multi-model routing (Claude primary, GPT-4o secondary, Haiku for fast classification) reduced LLM spend 60% through shared knowledge base, prompt caching (37% hit rate), and intelligent model selection.",
    problem: "Insurance TPA had deployed 7 separate AI tools over 18 months, each running independently. Combined LLM spend was $47K/month with 40% redundant token usage (each tool maintained its own context, re-processing the same documents). No unified monitoring, no shared memory, and no centralized guardrails. One agent hallucinated a coverage determination that reached a policyholder before anyone caught it. No cost attribution — nobody knew which agent was spending what.",
    solution: "Unified orchestration with a supervisor agent classifying intent via Haiku (<200ms), routing to specialized agents, and enforcing five-layer deterministic guardrails (PII detection, budget enforcement, schema validation, compliance rules, content filtering). Three-tier memory architecture (Redis session state → PostgreSQL conversation history → pgvector long-term knowledge) eliminates redundant document processing. Per-agent circuit breakers prevent cascading failures. The pivot from pipeline to supervisor pattern cut average cost per task from $0.51 to $0.08.",
    role: "Concept to production in 16 weeks. Benchmarked four orchestration frameworks (LangGraph, CrewAI, AutoGen, Swarm) and three architectural patterns (supervisor, pipeline, mesh) against the client's domain structure. The original design used a pipeline pattern where every request flowed through all 5 agents sequentially — but 70% of requests only needed 1-2 agents, and a $0.02 FAQ was costing $0.51 in full-pipeline processing. Killed the pipeline and pivoted to supervisor pattern with Haiku-based intent classification (<200ms) routing to only necessary agents. Average cost per task: $0.51 → $0.08. Designed the three-tier memory architecture and five-layer guardrail system after mapping regulatory requirements with compliance officers. Made the call to start rollout with customer service (highest volume, lowest risk) before adding claims and underwriting. Drove the LangGraph implementation with the lead developer.",
    architecture: "Python/AsyncIO backend with LangGraph orchestration engine for stateful workflow execution. Pinecone vector database for shared knowledge retrieval across agents. PostgreSQL for conversation history, Redis Streams for inter-agent communication and session state. Celery for distributed task execution. Claude and GPT-4o via provider abstraction layer. LangSmith for agent tracing and evaluation.",
    pipeline: [
      {label:"Ingest",detail:"API requests + document uploads"},
      {label:"Process",detail:"LangGraph supervisor + specialized agents"},
      {label:"Store",detail:"PostgreSQL conversations + pgvector knowledge"},
      {label:"Serve",detail:"Orchestration API + WebSocket agent status"}
    ],
    metrics: [
      {value: "60%", label: "LLM Cost Reduction", prev: "$47K → $19K/month"},
      {value: "94.2%", label: "Task Completion Rate", prev: "from 67%"},
      {value: "2.4s", label: "Avg Latency", prev: "from 15.2s"},
      {value: "0", label: "Hallucination Incidents", prev: "from 3/month"}
    ],
    tech: ["Python/AsyncIO","LangGraph","Claude","GPT-4o","Pinecone","PostgreSQL","Redis Streams","Celery","LangSmith"],
    pivot: "Originally designed as a pipeline pattern where each agent processed sequentially. The pipeline approach failed in production: 70% of requests only needed 1-2 agents, yet every request paid the full pipeline latency. A $0.02 FAQ response was routing through all 5 agents at $0.51 total. Pivoted to supervisor pattern with intelligent routing — the supervisor classifies intent (<200ms via Haiku) and routes to only the necessary agents. Average cost per task dropped from $0.51 to $0.08.",
    github: "https://github.com/riiiiiicoooo/agent-orchestration-platform",
    operationalDocs: {
      slos: ["Agent Response P95 < 2s", "Orchestration Success Rate 99.0%", "Rate Limit Accuracy 100%", "Session Recovery < 10s"],
      capacityHighlight: "Current: 12 agents, 5K tasks/day. Scales to 100 agents at $1,600/mo (Redis Streams + LangGraph checkpoint optimization).",
      runbooks: ["Agent Deadlock / Infinite Loop", "LLM Provider Rate Limit Exceeded", "Supervisor Escalation Backlog"]
    }
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
      {value: "6.2h", label: "PA Turnaround", prev: "from 3.8 days"},
      {value: "9.1%", label: "Denial Rate", prev: "from 18.4%"},
      {value: "97.8%", label: "Coding Accuracy", prev: "from 91.3%"},
      {value: "$2.1M", label: "Revenue Recovered", prev: "annual"}
    ],
    tech: ["Python/Django","SMART on FHIR R4","SciSpaCy","MedCAT","Claude Enterprise","PostgreSQL","pgvector","Redis","Celery","HL7v2"],
    pivot: "Originally scoped as an ambient clinical documentation tool — recording patient encounters and generating structured notes. During discovery, learned that Abridge and Nuance DAX had locked up the ambient documentation market with deep EHR integrations that would take 12+ months to match. But the PA coordinators kept saying: 'The documentation is fine — it's what happens AFTER the encounter that kills us.' Pivoted to post-encounter operations intelligence: PA automation, coding optimization, and denial analytics. This reframe turned a crowded-market risk into a greenfield opportunity, and the ROI was immediately measurable — denial rate reduction showed up in the first monthly claims cycle.",
    github: "https://github.com/riiiiiicoooo/clinical-ai-platform",
    operationalDocs: {
      slos: ["Clinical Decision Latency P95 < 3s", "HIPAA Audit Completeness 100%", "PHI Encryption Coverage 100%", "Agent Accuracy > 95%"],
      capacityHighlight: "Current: 500 encounters/day. Scales to 5,000 encounters/day at $2,800/mo (FHIR batch API + Redis session clustering).",
      runbooks: ["Epic FHIR Integration Failure", "PHI Exposure Incident", "Clinical Agent Hallucination Detection"]
    }
  }
];

const CATEGORIES = ["AI & Security", "AI & ML", "AI & Legal", "Consumer & Growth", "Enterprise & Operations", "Finance & Compliance"];
const CHART_COLORS = {blue:"#3b82f6",green:"#22c55e",amber:"#f59e0b",red:"#ef4444",purple:"#8b5cf6",cyan:"#06b6d4",gray:"#9ca3af"};
const COLORS = ["#111","#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"];

// ============================================================================
// DUMMY DASHBOARD DATA
// ============================================================================
const DASHBOARDS = {
  agentgate: {
    authRequests: Array.from({length:14},(_,i)=>({day:`Day ${i+1}`,requests:Math.floor(800+Math.random()*400),blocked:Math.floor(5+Math.random()*15)})),
    tokenLifecycle: [{name:"Issued",value:4280},{name:"Active",value:312},{name:"Expired",value:3891},{name:"Revoked",value:77}],
    policyHits: [{policy:"Rate Limit",count:142},{policy:"Scope Violation",count:87},{policy:"IP Whitelist",count:34},{policy:"Time Window",count:21},{policy:"Resource Block",count:8}],
    latency: Array.from({length:24},(_,i)=>{const base50=i>=2&&i<=5?28+Math.floor(Math.random()*12):i>=9&&i<=11?85+Math.floor(Math.random()*35):45+Math.floor(Math.random()*25);const base95=i>=2&&i<=5?52+Math.floor(Math.random()*20):i>=9&&i<=11?180+Math.floor(Math.random()*60):120+Math.floor(Math.random()*40);return{hour:`${i}:00`,p50:base50,p95:base95}})
  },
  "ai-data-ops": {
    throughput: Array.from({length:12},(_,i)=>({week:`W${i+1}`,examples:Math.floor(1800+i*80+Math.random()*300),errorRate:+(Math.max(2.5,8-i*.5+Math.random())).toFixed(1)})),
    qualityDist: [{range:"0-70%",count:12},{range:"70-80%",count:45},{range:"80-90%",count:189},{range:"90-95%",count:312},{range:"95-100%",count:156}],
    annotatorPerf: [{name:"Team A",accuracy:96.2,speed:312},{name:"Team B",accuracy:93.8,speed:287},{name:"Team C",accuracy:97.1,speed:245},{name:"Team D",accuracy:91.4,speed:334}],
    modelImpact: Array.from({length:8},(_,i)=>({version:`v1.${i}`,f1:+(0.72+i*0.025+Math.random()*.01).toFixed(3),dataPoints:(i+1)*12000}))
  },
  "contract-intelligence": {
    dealPipeline: [{status:"Ingested",count:847},{status:"Extracting",count:312},{status:"Reviewing",count:456},{status:"Complete",count:668}],
    riskDist: [{risk:"Critical",count:12,color:"#ef4444"},{risk:"High",count:47,color:"#f59e0b"},{risk:"Medium",count:134,color:"#3b82f6"},{risk:"Low",count:654,color:"#22c55e"}],
    extractionAccuracy: Array.from({length:10},(_,i)=>({week:`W${i+1}`,accuracy:+(88+i*.7+Math.random()*1.5).toFixed(1),contracts:Math.floor(40+i*8+Math.random()*20)})),
    clauseTypes: [{type:"Indemnification",count:234},{type:"Limitation of Liability",count:198},{type:"Change of Control",count:167},{type:"IP Assignment",count:145},{type:"Non-Compete",count:112},{type:"Termination",count:189}]
  },
  "engagement-engine": {
    engagementLift: Array.from({length:12},(_,i)=>({week:`W${i+1}`,control:+(12+Math.random()*3).toFixed(1),personalized:+(12+i*1.8+Math.random()*3).toFixed(1)})),
    retentionCurve: Array.from({length:8},(_,i)=>({day:`D${(i+1)*7}`,before:+(100-i*8-Math.random()*5).toFixed(0),after:+(100-i*4.5-Math.random()*3).toFixed(0)})),
    segmentPerf: [{segment:"Power Users",engagement:82,retention:91},{segment:"Casual",engagement:45,retention:64},{segment:"At Risk",engagement:18,retention:32},{segment:"New Users",engagement:67,retention:78}],
    notifCTR: [{type:"Personalized",ctr:12.4},{type:"Segmented",ctr:7.8},{type:"Broadcast",ctr:3.2}]
  },
  "field-sales": {
    visitTrend: Array.from({length:12},(_,i)=>({week:`W${i+1}`,visits:Math.floor(180+i*12+Math.random()*30),target:280})),
    repPerformance: Array.from({length:10},(_,i)=>({rep:`Rep ${i+1}`,visits:Math.floor(20+Math.random()*25),orders:Math.floor(8+Math.random()*15),revenue:Math.floor(3000+Math.random()*8000)})),
    routeEfficiency: [{metric:"Visits/Day",before:4.2,after:6.0},{metric:"Miles/Visit",before:8.7,after:5.3},{metric:"Orders/Visit",before:0.31,after:0.48},{metric:"Avg Order ($)",before:420,after:580}],
    leaderboard: Array.from({length:8},(_,i)=>({week:`W${i+1}`,topQuartile:Math.floor(28+i*2+Math.random()*5),median:Math.floor(18+i*1.5+Math.random()*3),bottomQuartile:Math.floor(10+i+Math.random()*3)}))
  },
  "fintech-ops": {
    txnSuccess: Array.from({length:14},(_,i)=>({day:`Day ${i+1}`,rate:+(96.5+Math.random()*2.5).toFixed(1),volume:Math.floor(8000+Math.random()*4000)})),
    reconciliation: [{status:"Matched",value:98.7},{status:"Pending",value:0.9},{status:"Exception",value:0.4}],
    paymentMethods: [{method:"ACH",volume:4200000,success:98.2},{method:"Wire",volume:1800000,success:99.1},{method:"Card",volume:890000,success:96.8},{method:"Stripe",volume:2100000,success:97.8}],
    ledgerHealth: Array.from({length:30},(_,i)=>({day:i+1,imbalance:i<8?Math.floor(Math.random()*5000):0,entries:Math.floor(2000+Math.random()*1000)}))
  },
  "genai-governance": {
    interactions: Array.from({length:12},(_,i)=>({week:`W${i+1}`,total:Math.floor(2800+i*300+Math.random()*500),flagged:Math.floor(12+Math.random()*20),blocked:Math.floor(2+Math.random()*5)})),
    contentPolicy: [{category:"PII Detection",triggers:89,blocked:89},{category:"Financial Advice",triggers:234,blocked:12},{category:"Hallucination",triggers:67,blocked:67},{category:"Bias Alert",triggers:23,blocked:23},{category:"Off-Topic",triggers:156,blocked:45}],
    compliance: [{metric:"Audit Coverage",score:100},{metric:"Response Accuracy",score:96.8},{metric:"Policy Adherence",score:99.2},{metric:"Latency SLA",score:98.5},{metric:"Examiner Readiness",score:100}],
    modelUsage: [{model:"Claude 3.5",pct:62},{model:"GPT-4",pct:24},{model:"Bedrock",pct:14}]
  },
  "infra-automation": {
    deployments: Array.from({length:12},(_,i)=>({week:`W${i+1}`,automated:Math.floor(30+i*5+Math.random()*10),manual:Math.max(0,Math.floor(25-i*2+Math.random()*5))})),
    provisionTime: [{phase:"Before",hours:504},{phase:"After",hours:4}],
    resourceTypes: [{type:"Compute",count:234},{type:"Database",count:89},{type:"Network",count:156},{type:"Storage",count:67},{type:"Security",count:112}],
    policyResults: Array.from({length:10},(_,i)=>({week:`W${i+1}`,passed:Math.floor(90+Math.random()*10),failed:Math.floor(2+Math.random()*8),warnings:Math.floor(5+Math.random()*10)}))
  },
  "integration-health": {
    providerHealth: [
      {name:"Stripe",health:96,latency:780,errorRate:0.3,status:"healthy"},
      {name:"Plaid",health:91,latency:1240,errorRate:1.2,status:"healthy"},
      {name:"KYC Provider",health:62,latency:5200,errorRate:4.8,status:"degraded"},
      {name:"Twilio",health:88,latency:420,errorRate:0.8,status:"healthy"},
      {name:"SendGrid",health:94,latency:310,errorRate:0.5,status:"healthy"},
      {name:"DocuSign",health:73,latency:2800,errorRate:3.1,status:"degraded"}
    ],
    latencyTrend: Array.from({length:24},(_,i)=>({hour:`${i}:00`,stripe:Math.floor(700+Math.random()*200),plaid:Math.floor(1100+Math.random()*400),kyc:Math.floor(4500+Math.random()*2000)})),
    mttiTrend: Array.from({length:10},(_,i)=>({week:`W${i+1}`,mtti:+(28-i*2.8+Math.random()*3).toFixed(1)}))
  },
  "portfolio-intelligence": {
    queryVolume: Array.from({length:12},(_,i)=>({week:`W${i+1}`,queries:Math.floor(150+i*40+Math.random()*50),successful:Math.floor(140+i*38+Math.random()*45)})),
    queryTypes: [{type:"Lease Expiry",count:412},{type:"Occupancy",count:367},{type:"Revenue",count:289},{type:"Cap Rate",count:234},{type:"Maintenance",count:178},{type:"Comparison",count:156}],
    accuracy: Array.from({length:10},(_,i)=>({version:`v${i+1}`,sqlAccuracy:+(82+i*1.2+Math.random()*2).toFixed(1)})),
    responseTime: [{bucket:"<5s",count:1240},{bucket:"5-15s",count:890},{bucket:"15-30s",count:423},{bucket:"30-60s",count:187},{bucket:">60s",count:34}]
  },
  "review-prep": {
    prepTime: Array.from({length:10},(_,i)=>({week:`W${i+1}`,manual:Math.max(12,Math.floor(45-i*3.5+Math.random()*5)),automated:Math.floor(10+Math.random()*5)})),
    packageComponents: [{component:"Performance Summary",avgTime:3.2},{component:"Holdings Analysis",avgTime:2.8},{component:"Market Context",avgTime:1.5},{component:"Discussion Topics",avgTime:2.1},{component:"Compliance Check",avgTime:1.2},{component:"Final Assembly",avgTime:1.4}],
    advisorSatisfaction: [{month:"Jan",score:3.2},{month:"Feb",score:3.8},{month:"Mar",score:4.1},{month:"Apr",score:4.3},{month:"May",score:4.5},{month:"Jun",score:4.6}],
    clientsCovered: Array.from({length:6},(_,i)=>({month:["Jan","Feb","Mar","Apr","May","Jun"][i],total:Math.floor(120+i*20+Math.random()*15),automated:Math.floor(80+i*25+Math.random()*10)}))
  },
  "scope-tracker": {
    budgetHealth: [
      {engagement:"Meridian Properties",budgetPct:90.5,elapsedPct:62.5,status:"critical"},
      {engagement:"Clearwater Capital",budgetPct:56.2,elapsedPct:55,status:"healthy"},
      {engagement:"TechFlow IP",budgetPct:72.3,elapsedPct:45,status:"warning"},
      {engagement:"Harbor Logistics",budgetPct:33.8,elapsedPct:40,status:"healthy"},
      {engagement:"Pinnacle Group",budgetPct:88.1,elapsedPct:70,status:"warning"}
    ],
    overrunTrend: [{quarter:"Q1 '24",rate:28},{quarter:"Q2 '24",rate:22},{quarter:"Q3 '24",rate:16},{quarter:"Q4 '24",rate:13},{quarter:"Q1 '25",rate:11}],
    recovery: [{month:"Oct",recovered:18200},{month:"Nov",recovered:24500},{month:"Dec",recovered:31800},{month:"Jan",recovered:38400},{month:"Feb",recovered:42100},{month:"Mar",recovered:52000}]
  },
  "verified-marketplace": {
    gmvGrowth: Array.from({length:12},(_,i)=>({month:`M${i+1}`,gmv:Math.floor(400000+i*180000+Math.random()*100000)})),
    verificationFunnel: [{stage:"Applied",count:2400},{stage:"Docs Submitted",count:1920},{stage:"Background Check",count:1680},{stage:"Verified",count:1560}],
    disputeRate: Array.from({length:12},(_,i)=>({month:`M${i+1}`,verified:+(1.2+Math.random()*.8).toFixed(1),unverified:+(6+Math.random()*3).toFixed(1)})),
    supplierMetrics: [{tier:"Premium Verified",count:312,avgRevenue:4800,rating:4.8},{tier:"Verified",count:1248,avgRevenue:2200,rating:4.3},{tier:"Pending",count:360,avgRevenue:800,rating:3.6}]
  },
  "agent-orchestration": {
    agentTasks: Array.from({length:14},(_,i)=>({day:`Day ${i+1}`,claims:Math.floor(80+Math.random()*30),underwriting:Math.floor(50+Math.random()*20),customer:Math.floor(250+Math.random()*80),document:Math.floor(40+Math.random()*15),analytics:Math.floor(25+Math.random()*12)})),
    costTrend: Array.from({length:12},(_,i)=>({week:`W${i+1}`,cost:+(1800-i*110+Math.random()*100).toFixed(0),tasks:Math.floor(4000+i*300+Math.random()*200)})),
    agentPerformance: [{agent:"Claims",completion:96.2,latency:2.1,cost:0.08},{agent:"Underwriting",completion:91.8,latency:3.4,cost:0.14},{agent:"Customer Service",completion:98.4,latency:0.8,cost:0.02},{agent:"Document",completion:89.5,latency:4.2,cost:0.11},{agent:"Analytics",completion:94.1,latency:5.1,cost:0.16}],
    guardrailHits: [{type:"PII Detection",count:89},{type:"Budget Cap",count:12},{type:"Schema Fail",count:34},{type:"Compliance",count:23},{type:"Injection Block",count:8}]
  },
  "clinical-ai": {
    paVolume: Array.from({length:14},(_,i)=>({day:`Day ${i+1}`,submitted:Math.floor(130+Math.random()*40),approved:Math.floor(105+Math.random()*30),denied:Math.floor(8+Math.random()*10),pending:Math.floor(15+Math.random()*12)})),
    denialTrend: Array.from({length:12},(_,i)=>({month:`M${i+1}`,rate:+(18.4-i*0.78+Math.random()*0.5).toFixed(1),appeals:Math.floor(12+Math.random()*8),recovered:Math.floor(15000+i*3000+Math.random()*5000)})),
    codingAccuracy: [{category:"ICD-10-CM",accuracy:97.8,suggestions:1240},{category:"CPT",accuracy:96.4,suggestions:890},{category:"Modifiers",accuracy:98.2,suggestions:320},{category:"Bundling",accuracy:99.1,suggestions:210}],
    complianceMetrics: [{layer:"PHI Detection",checks:18420,blocked:342},{layer:"RBAC",checks:18420,blocked:28},{layer:"Encryption",checks:9210,blocked:0},{layer:"Audit Log",checks:18420,blocked:0},{layer:"Clinical Safety",checks:4680,blocked:67}]
  }
};

// ============================================================================
// DASHBOARD COMPONENTS
// ============================================================================
function AgentGateDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Auth Requests (14-Day)</div>
          <div className="chart-value">6,840 requests</div>
          <div className="chart-source">Source: PostgreSQL audit_log table</div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data.authRequests}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="day" tick={{fontSize:10}} interval={2}/>
            <YAxis yAxisId="left" tick={{fontSize:10}}/>
            <YAxis yAxisId="right" orientation="right" tick={{fontSize:10}} domain={[0,30]}/>
            <Tooltip/><Area yAxisId="left" type="monotone" dataKey="requests" fill="#3b82f6" fillOpacity={.12} stroke="#3b82f6" strokeWidth={2}/>
            <Bar yAxisId="right" dataKey="blocked" fill="#ef4444" radius={[2,2,0,0]} barSize={8}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Token Lifecycle</div>
        <div className="chart-value">312 active tokens</div>
        <div className="chart-source">Source: Redis token cache snapshot</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.tokenLifecycle} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={2} label={false}>
            {data.tokenLifecycle.map((_,i)=><Cell key={i} fill={[CHART_COLORS.blue,CHART_COLORS.green,CHART_COLORS.gray,CHART_COLORS.red][i]}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
        <div className="pie-legend">
          {data.tokenLifecycle.map((d,i)=>(
            <div key={d.name} className="pie-legend-item">
              <span className="pie-legend-dot" style={{background:[CHART_COLORS.blue,CHART_COLORS.green,CHART_COLORS.gray,CHART_COLORS.red][i]}}/>
              {d.name}: {d.value.toLocaleString()}
            </div>
          ))}
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Policy Enforcement</div>
        <div className="chart-value">292 enforcements</div>
        <div className="chart-source">Source: PostgreSQL policy_events table</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.policyHits} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="policy" tick={{fontSize:10}} width={100}/>
            <Tooltip/><Bar dataKey="count" fill="#111" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Auth Latency (24hr)</div>
        <div className="chart-value">p95: 168ms</div>
        <div className="chart-source">Source: FastAPI request metrics</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.latency}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="hour" tick={{fontSize:10}} interval={5}/><YAxis tick={{fontSize:10}} domain={[0,280]} tickFormatter={v=>`${v}ms`}/>
            <Tooltip formatter={(v)=>`${v}ms`}/><Area type="monotone" dataKey="p95" fill="#f59e0b" fillOpacity={.12} stroke="#f59e0b" strokeWidth={2}/>
            <Area type="monotone" dataKey="p50" fill="#22c55e" fillOpacity={.15} stroke="#22c55e" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
        <div className="pie-legend">
          <div className="pie-legend-item"><span className="pie-legend-dot" style={{background:"#22c55e"}}/>p50</div>
          <div className="pie-legend-item"><span className="pie-legend-dot" style={{background:"#f59e0b"}}/>p95</div>
        </div>
      </div>
    </div>
    </>
  );
}

function AIDataOpsDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Weekly Throughput & Error Rate</div>
          <div className="chart-value">2,340 examples/day</div>
          <div className="chart-source">Source: Temporal workflow metrics</div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data.throughput}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis yAxisId="left" tick={{fontSize:10}}/><YAxis yAxisId="right" orientation="right" tick={{fontSize:10}}/>
            <Tooltip/><Bar yAxisId="left" dataKey="examples" fill="#3b82f6" radius={[4,4,0,0]}/>
            <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#ef4444" strokeWidth={2}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Quality Score Distribution</div>
        <div className="chart-value">Median: 91.2%</div>
        <div className="chart-source">Source: PostgreSQL quality_scores table</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.qualityDist}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="range" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="count" fill="#8b5cf6" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Team Performance</div>
        <div className="chart-value">4 annotation teams</div>
        <div className="chart-source">Source: Annotator session logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="speed" name="Speed" tick={{fontSize:10}}/><YAxis dataKey="accuracy" name="Accuracy" domain={[90,98]} tick={{fontSize:10}}/>
            <Tooltip/><Scatter data={data.annotatorPerf} fill="#22c55e">
              {data.annotatorPerf.map((_,i)=><Cell key={i} fill={COLORS[i+1]}/>)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Model F1 Score by Version</div>
        <div className="chart-value">Current: 0.912</div>
        <div className="chart-source">Source: Model registry + eval pipeline</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.modelImpact}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="version" tick={{fontSize:10}}/><YAxis domain={[0.7,0.95]} tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="f1" stroke="#3b82f6" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function ContractIntelDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Contract Pipeline</div>
          <div className="chart-value">847 contracts ingested</div>
          <div className="chart-source">Source: Supabase deal_pipeline table</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.dealPipeline}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="status" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="count" fill="#111" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Risk Distribution</div>
        <div className="chart-value">12 critical findings</div>
        <div className="chart-source">Source: Extraction engine risk_flags</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.riskDist} dataKey="count" nameKey="risk" cx="50%" cy="50%" outerRadius={70} label={({risk,count})=>`${risk}: ${count}`}>
            {data.riskDist.map((d,i)=><Cell key={i} fill={d.color}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Extraction Accuracy Trend</div>
        <div className="chart-value">94.2% current</div>
        <div className="chart-source">Source: Ground truth comparison logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.extractionAccuracy}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis domain={[85,100]} tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Clause Types Extracted</div>
        <div className="chart-value">1,045 clauses</div>
        <div className="chart-source">Source: pgvector clause_extractions</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.clauseTypes} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="type" tick={{fontSize:10}} width={120}/>
            <Tooltip/><Bar dataKey="count" fill="#8b5cf6" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function EngagementEngineDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Engagement: Personalized vs Control</div>
          <div className="chart-value">+28% lift</div>
          <div className="chart-source">Source: PostHog experiment results</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.engagementLift}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="control" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="personalized" stroke="#3b82f6" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Retention Curve (Before/After)</div>
        <div className="chart-value">+59% at D56</div>
        <div className="chart-source">Source: Snowflake retention_cohorts</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.retentionCurve}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="day" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}} domain={[0,100]}/>
            <Tooltip/><Area type="monotone" dataKey="before" fill="#ef4444" fillOpacity={.1} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5"/>
            <Area type="monotone" dataKey="after" fill="#22c55e" fillOpacity={.1} stroke="#22c55e" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Segment Performance</div>
        <div className="chart-value">4 segments</div>
        <div className="chart-source">Source: Segment user profiles</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.segmentPerf}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="segment" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="engagement" fill="#3b82f6" radius={[4,4,0,0]}/>
            <Bar dataKey="retention" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Notification CTR by Type</div>
        <div className="chart-value">12.4% personalized</div>
        <div className="chart-source">Source: PostHog event stream</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.notifCTR}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="type" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="ctr" fill="#8b5cf6" radius={[4,4,0,0]}>
              {data.notifCTR.map((_,i)=><Cell key={i} fill={[CHART_COLORS.green,CHART_COLORS.blue,CHART_COLORS.gray][i]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function FieldSalesDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Weekly Visit Trend vs Target</div>
          <div className="chart-value">+43% daily visits</div>
          <div className="chart-source">Source: Supabase visit_logs table</div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data.visitTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="visits" fill="#3b82f6" radius={[4,4,0,0]}/>
            <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5"/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Rep Performance (Top 10)</div>
        <div className="chart-value">68 active reps</div>
        <div className="chart-source">Source: Salesforce opportunity sync</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.repPerformance}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="rep" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="visits" fill="#3b82f6" radius={[4,4,0,0]}/>
            <Bar dataKey="orders" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Before/After Metrics</div>
        <div className="chart-value">$5.3M revenue lift</div>
        <div className="chart-source">Source: Aggregated route analytics</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.routeEfficiency}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="metric" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="before" fill="#9ca3af" radius={[4,4,0,0]}/>
            <Bar dataKey="after" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Performance Quartiles</div>
        <div className="chart-value">Rising tide</div>
        <div className="chart-source">Source: Leaderboard scoring engine</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.leaderboard}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="topQuartile" stroke="#22c55e" strokeWidth={2}/>
            <Line type="monotone" dataKey="median" stroke="#3b82f6" strokeWidth={2}/>
            <Line type="monotone" dataKey="bottomQuartile" stroke="#f59e0b" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function FintechOpsDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Transaction Success Rate (14-Day)</div>
          <div className="chart-value">97.8% avg</div>
          <div className="chart-source">Source: Stripe webhook events</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.txnSuccess}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="day" tick={{fontSize:10}}/><YAxis domain={[94,100]} tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Reconciliation Status</div>
        <div className="chart-value">98.7% matched</div>
        <div className="chart-source">Source: Reconciliation engine output</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.reconciliation} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={70} label={({status,value})=>`${status}: ${value}%`}>
            {data.reconciliation.map((_,i)=><Cell key={i} fill={[CHART_COLORS.green,CHART_COLORS.amber,CHART_COLORS.red][i]}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Payment Method Volume</div>
        <div className="chart-value">$9.0M processed</div>
        <div className="chart-source">Source: PostgreSQL ledger_entries</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.paymentMethods}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="method" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="volume" fill="#3b82f6" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Ledger Imbalance (30-Day)</div>
        <div className="chart-value">$0 current</div>
        <div className="chart-source">Source: Double-entry balance checker</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.ledgerHealth}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="day" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="imbalance" fill="#ef4444" fillOpacity={.15} stroke="#ef4444" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
      </>
  );
}

function GenAIGovDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">AI Interactions (Weekly)</div>
          <div className="chart-value">43K+ governed</div>
          <div className="chart-source">Source: Middleware interceptor logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.interactions}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="total" fill="#3b82f6" fillOpacity={.15} stroke="#3b82f6" strokeWidth={2}/>
            <Area type="monotone" dataKey="flagged" fill="#f59e0b" fillOpacity={.15} stroke="#f59e0b" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Content Policy Triggers</div>
        <div className="chart-value">0 violations passed</div>
        <div className="chart-source">Source: Policy engine evaluation logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.contentPolicy} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="category" tick={{fontSize:10}} width={110}/>
            <Tooltip/><Bar dataKey="triggers" fill="#f59e0b" radius={[0,4,4,0]}/>
            <Bar dataKey="blocked" fill="#ef4444" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Compliance Scorecard</div>
        <div className="chart-value">100% examiner-ready</div>
        <div className="chart-source">Source: Examiner readiness audit</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.compliance}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="metric" tick={{fontSize:9}} interval={0} angle={-15}/><YAxis domain={[90,100]} tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="score" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Model Usage Share</div>
        <div className="chart-value">3 models active</div>
        <div className="chart-source">Source: LangSmith trace aggregation</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.modelUsage} dataKey="pct" nameKey="model" cx="50%" cy="50%" outerRadius={70} label={({model,pct})=>`${model}: ${pct}%`}>
            {data.modelUsage.map((_,i)=><Cell key={i} fill={[CHART_COLORS.blue,CHART_COLORS.purple,CHART_COLORS.amber][i]}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function InfraAutoDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Automated vs Manual Deployments</div>
          <div className="chart-value">85% automated</div>
          <div className="chart-source">Source: Terraform execution logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.deployments}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="automated" fill="#22c55e" fillOpacity={.15} stroke="#22c55e" strokeWidth={2} stackId="1"/>
            <Area type="monotone" dataKey="manual" fill="#f59e0b" fillOpacity={.15} stroke="#f59e0b" strokeWidth={2} stackId="1"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Provisioning Time</div>
        <div className="chart-value">3 weeks to 4 hours</div>
        <div className="chart-source">Source: Workflow duration metrics</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.provisionTime}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="phase" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="hours" fill="#111" radius={[4,4,0,0]}>
              {data.provisionTime.map((_,i)=><Cell key={i} fill={i===0?"#ef4444":"#22c55e"}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Resources by Type</div>
        <div className="chart-value">658 resources</div>
        <div className="chart-source">Source: Terraform state backend</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.resourceTypes} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="type" tick={{fontSize:10}} width={70}/>
            <Tooltip/><Bar dataKey="count" fill="#8b5cf6" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Policy Evaluation Results</div>
        <div className="chart-value">0 violations</div>
        <div className="chart-source">Source: OPA decision logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.policyResults}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="passed" fill="#22c55e" stackId="a"/>
            <Bar dataKey="warnings" fill="#f59e0b" stackId="a"/>
            <Bar dataKey="failed" fill="#ef4444" stackId="a"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function IntegrationHealthDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card" style={{gridColumn:"1/-1"}}>
          <div className="chart-title">Provider Health Overview</div>
          <div className="chart-source">Source: Synthetic health probes + webhook events</div>
        <table className="data-table">
          <thead><tr><th>Provider</th><th>Status</th><th>Health Score</th><th>Latency (ms)</th><th>Error Rate</th></tr></thead>
          <tbody>{data.providerHealth.map(p=>(
            <tr key={p.name}><td>{p.name}</td><td><span className={`status-dot status-${p.status}`}/>{p.status}</td>
              <td style={{fontWeight:700,color:p.health>80?"#22c55e":p.health>60?"#f59e0b":"#ef4444"}}>{p.health}</td>
              <td>{p.latency.toLocaleString()}</td><td>{p.errorRate}%</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="chart-card">
        <div className="chart-title">Latency by Provider (24hr)</div>
        <div className="chart-value">P95 tracked</div>
        <div className="chart-source">Source: Grafana metrics store</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.latencyTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="hour" tick={{fontSize:10}} interval={5}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="stripe" stroke="#3b82f6" strokeWidth={2} dot={false}/>
            <Line type="monotone" dataKey="plaid" stroke="#22c55e" strokeWidth={2} dot={false}/>
            <Line type="monotone" dataKey="kyc" stroke="#ef4444" strokeWidth={2} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">MTTI Trend (Weekly)</div>
        <div className="chart-value">Current: 1.8 min</div>
        <div className="chart-source">Source: Incident timeline aggregation</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.mttiTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="mtti" fill="#3b82f6" fillOpacity={.15} stroke="#3b82f6" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function PortfolioIntelDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Query Volume (Weekly)</div>
          <div className="chart-value">2,800+ served</div>
          <div className="chart-source">Source: Query API access logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.queryVolume}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="queries" fill="#3b82f6" fillOpacity={.15} stroke="#3b82f6" strokeWidth={2}/>
            <Area type="monotone" dataKey="successful" fill="#22c55e" fillOpacity={.1} stroke="#22c55e" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Query Types</div>
        <div className="chart-value">6 categories</div>
        <div className="chart-source">Source: SQL classifier output</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.queryTypes} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="type" tick={{fontSize:10}} width={90}/>
            <Tooltip/><Bar dataKey="count" fill="#8b5cf6" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">SQL Accuracy by Version</div>
        <div className="chart-value">91.3% current</div>
        <div className="chart-source">Source: Ground truth validation set</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.accuracy}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="version" tick={{fontSize:10}}/><YAxis domain={[80,100]} tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="sqlAccuracy" stroke="#3b82f6" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Response Time Distribution</div>
        <div className="chart-value">76% under 15s</div>
        <div className="chart-source">Source: API latency histogram</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.responseTime}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="bucket" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="count" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function ReviewPrepDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Prep Time: Manual vs Automated</div>
          <div className="chart-value">73% time savings</div>
          <div className="chart-source">Source: n8n workflow duration logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.prepTime}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="manual" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="automated" stroke="#22c55e" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Package Assembly Breakdown</div>
        <div className="chart-value">12 min total</div>
        <div className="chart-source">Source: Pipeline stage timing data</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.packageComponents} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="component" tick={{fontSize:9}} width={120}/>
            <Tooltip/><Bar dataKey="avgTime" fill="#3b82f6" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Advisor Satisfaction</div>
        <div className="chart-value">4.6/5 current</div>
        <div className="chart-source">Source: Post-review survey responses</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.advisorSatisfaction}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:10}}/><YAxis domain={[2,5]} tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Clients Covered</div>
        <div className="chart-value">200+ clients</div>
        <div className="chart-source">Source: Supabase briefing_packages table</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.clientsCovered}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="total" fill="#e5e7eb" radius={[4,4,0,0]}/>
            <Bar dataKey="automated" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function ScopeTrackerDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card" style={{gridColumn:"1/-1"}}>
          <div className="chart-title">Engagement Budget Health</div>
          <div className="chart-source">Source: Billing system + budget tracker</div>
        <table className="data-table">
          <thead><tr><th>Engagement</th><th>Budget Used</th><th>Time Elapsed</th><th>Status</th></tr></thead>
          <tbody>{data.budgetHealth.map(e=>(
            <tr key={e.engagement}><td>{e.engagement}</td>
              <td><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:100,height:6,background:"#e5e7eb",borderRadius:3}}><div style={{width:`${e.budgetPct}%`,height:6,background:e.status==="critical"?"#ef4444":e.status==="warning"?"#f59e0b":"#22c55e",borderRadius:3}}/></div>{e.budgetPct}%</div></td>
              <td>{e.elapsedPct}%</td>
              <td><span className={`status-dot status-${e.status==="critical"?"down":e.status==="warning"?"degraded":"healthy"}`}/>{e.status}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="chart-card">
        <div className="chart-title">Overrun Rate Trend</div>
        <div className="chart-value">28% to 11%</div>
        <div className="chart-source">Source: Engagement health scoring engine</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.overrunTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="quarter" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="rate" fill="#3b82f6" fillOpacity={.15} stroke="#3b82f6" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Revenue Recovered</div>
        <div className="chart-value">$127K Q1</div>
        <div className="chart-source">Source: Change order tracking system</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.recovery}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="recovered" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}

function MarketplaceDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">GMV Growth (Monthly)</div>
          <div className="chart-value">$15M+ Year 1</div>
          <div className="chart-source">Source: Stripe Connect transaction logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.gmvGrowth}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip formatter={(v)=>`$${(v/1000).toFixed(0)}K`}/><Area type="monotone" dataKey="gmv" fill="#22c55e" fillOpacity={.15} stroke="#22c55e" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Verification Funnel</div>
        <div className="chart-value">94% completion</div>
        <div className="chart-source">Source: Onboarding pipeline stages</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.verificationFunnel}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="stage" tick={{fontSize:9}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="count" fill="#8b5cf6" radius={[4,4,0,0]}>
              {data.verificationFunnel.map((_,i)=><Cell key={i} fill={[CHART_COLORS.blue,CHART_COLORS.purple,CHART_COLORS.amber,CHART_COLORS.green][i]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Dispute Rate: Verified vs Unverified</div>
        <div className="chart-value">&lt;2% verified</div>
        <div className="chart-source">Source: Trust and safety incident logs</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.disputeRate}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="unverified" stroke="#ef4444" strokeWidth={2}/>
            <Line type="monotone" dataKey="verified" stroke="#22c55e" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Supplier Tier Metrics</div>
        <div className="chart-source">Source: Supplier verification scores</div>
        <table className="data-table">
          <thead><tr><th>Tier</th><th>Count</th><th>Avg Rev</th><th>Rating</th></tr></thead>
          <tbody>{data.supplierMetrics.map(s=>(
            <tr key={s.tier}><td style={{fontWeight:600}}>{s.tier}</td><td>{s.count}</td><td>${s.avgRevenue.toLocaleString()}</td><td>{s.rating}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
    </>
  );
}

function DataPipeline({stages}) {
  return (
    <div className="pipeline-visual">
      {stages.map((stage, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="pipeline-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>}
          <div className="pipeline-stage">
            <div className="pipeline-label">{stage.label}</div>
            <div className="pipeline-detail">{stage.detail}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function AgentOrchDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">Tasks by Agent (14-Day)</div>
          <div className="chart-value">7,007 total tasks</div>
          <div className="chart-source">Source: PostgreSQL tasks table</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data.agentTasks}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="day" tick={{fontSize:10}} interval={2}/>
              <YAxis tick={{fontSize:10}}/>
              <Tooltip/>
              <Area type="monotone" dataKey="customer" stackId="1" fill="#8b5cf6" fillOpacity={0.7} stroke="#8b5cf6"/>
              <Area type="monotone" dataKey="claims" stackId="1" fill="#3b82f6" fillOpacity={0.7} stroke="#3b82f6"/>
              <Area type="monotone" dataKey="underwriting" stackId="1" fill="#22c55e" fillOpacity={0.7} stroke="#22c55e"/>
              <Area type="monotone" dataKey="document" stackId="1" fill="#f59e0b" fillOpacity={0.7} stroke="#f59e0b"/>
              <Area type="monotone" dataKey="analytics" stackId="1" fill="#06b6d4" fillOpacity={0.7} stroke="#06b6d4"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="chart-title">Cost Optimization Trend</div>
          <div className="chart-value">$19K/month (from $47K)</div>
          <div className="chart-source">Source: token_usage table aggregation</div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={data.costTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="week" tick={{fontSize:10}}/>
              <YAxis yAxisId="left" tick={{fontSize:10}}/>
              <YAxis yAxisId="right" orientation="right" tick={{fontSize:10}}/>
              <Tooltip/>
              <Bar yAxisId="left" dataKey="cost" fill="#8b5cf6" radius={[2,2,0,0]} barSize={16} name="Weekly Cost ($)"/>
              <Line yAxisId="right" type="monotone" dataKey="tasks" stroke="#22c55e" strokeWidth={2} dot={false} name="Tasks"/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="chart-title">Agent Performance</div>
          <div className="chart-value">94.2% avg completion</div>
          <div className="chart-source">Source: LangSmith evaluation results</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.agentPerformance} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis type="number" tick={{fontSize:10}} domain={[80,100]}/>
              <YAxis type="category" dataKey="agent" tick={{fontSize:10}} width={90}/>
              <Tooltip/><Bar dataKey="completion" fill="#8b5cf6" radius={[0,4,4,0]} name="Completion %"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="chart-title">Guardrail Activity</div>
          <div className="chart-value">166 interventions</div>
          <div className="chart-source">Source: guardrail_events table</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.guardrailHits}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="type" tick={{fontSize:9}} interval={0} angle={-20} textAnchor="end" height={50}/>
              <YAxis tick={{fontSize:10}}/>
              <Tooltip/><Bar dataKey="count" fill="#111" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

function ClinicalAIDashboard({data, pipeline}) {
  return (
    <>
      {pipeline && <DataPipeline stages={pipeline}/>}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-title">PA Volume (14-Day)</div>
          <div className="chart-value">4,200 requests/month</div>
          <div className="chart-source">Source: prior_auth_requests table</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data.paVolume}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="day" tick={{fontSize:10}} interval={2}/>
              <YAxis tick={{fontSize:10}}/>
              <Tooltip/>
              <Area type="monotone" dataKey="approved" stackId="1" fill="#059669" fillOpacity={0.7} stroke="#059669"/>
              <Area type="monotone" dataKey="pending" stackId="1" fill="#f59e0b" fillOpacity={0.7} stroke="#f59e0b"/>
              <Area type="monotone" dataKey="denied" stackId="1" fill="#ef4444" fillOpacity={0.7} stroke="#ef4444"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="chart-title">Denial Rate Trend</div>
          <div className="chart-value">18.4% → 9.1%</div>
          <div className="chart-source">Source: claims analytics pipeline</div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={data.denialTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="month" tick={{fontSize:10}}/>
              <YAxis yAxisId="left" tick={{fontSize:10}}/>
              <YAxis yAxisId="right" orientation="right" tick={{fontSize:10}}/>
              <Tooltip/>
              <Line yAxisId="left" type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} name="Denial Rate %"/>
              <Bar yAxisId="right" dataKey="recovered" fill="#059669" radius={[2,2,0,0]} barSize={16} name="Revenue Recovered ($)"/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="chart-title">Coding Accuracy by Category</div>
          <div className="chart-value">97.8% overall</div>
          <div className="chart-source">Source: coding_suggestions accepted vs modified</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.codingAccuracy} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis type="number" tick={{fontSize:10}} domain={[94,100]}/>
              <YAxis type="category" dataKey="category" tick={{fontSize:10}} width={90}/>
              <Tooltip/><Bar dataKey="accuracy" fill="#059669" radius={[0,4,4,0]} name="Accuracy %"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="chart-title">Compliance Guardrails</div>
          <div className="chart-value">437 interventions</div>
          <div className="chart-source">Source: HIPAA audit_log table</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.complianceMetrics}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="layer" tick={{fontSize:9}} interval={0} angle={-20} textAnchor="end" height={50}/>
              <YAxis tick={{fontSize:10}}/>
              <Tooltip/><Bar dataKey="blocked" fill="#111" radius={[4,4,0,0]} name="Blocked"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

const DASHBOARD_COMPONENTS = {
  agentgate: AgentGateDashboard,
  "ai-data-ops": AIDataOpsDashboard,
  "contract-intelligence": ContractIntelDashboard,
  "engagement-engine": EngagementEngineDashboard,
  "field-sales": FieldSalesDashboard,
  "fintech-ops": FintechOpsDashboard,
  "genai-governance": GenAIGovDashboard,
  "infra-automation": InfraAutoDashboard,
  "integration-health": IntegrationHealthDashboard,
  "portfolio-intelligence": PortfolioIntelDashboard,
  "review-prep": ReviewPrepDashboard,
  "scope-tracker": ScopeTrackerDashboard,
  "verified-marketplace": MarketplaceDashboard,
  "agent-orchestration": AgentOrchDashboard,
  "clinical-ai": ClinicalAIDashboard,
};

// ============================================================================
// PRODUCT ICONS (SVG inline for each domain)
// ============================================================================
const DOMAIN_ICONS = {
  "Developer Security": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#f0fdf4"/><path d="M24 14l-10 5v8c0 5.55 4.27 10.74 10 12 5.73-1.26 10-6.45 10-12v-8l-10-5z" stroke="#166534" strokeWidth="2" fill="none"/><path d="M20 25l3 3 5-6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  "ML Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><circle cx="24" cy="18" r="3" stroke="#6b21a8" strokeWidth="2"/><circle cx="16" cy="30" r="3" stroke="#6b21a8" strokeWidth="2"/><circle cx="32" cy="30" r="3" stroke="#6b21a8" strokeWidth="2"/><path d="M22 20.5l-4 7M26 20.5l4 7M19 30h10" stroke="#8b5cf6" strokeWidth="1.5"/></svg>
  ),
  "Legal AI": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M16 14h16M16 20h16M16 26h10" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/><path d="M32 24l-4 4-2-2" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="13" y="11" width="22" height="22" rx="3" stroke="#1e40af" strokeWidth="2" fill="none"/></svg>
  ),
  "Consumer Platform": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#fef3c7"/><path d="M15 33V20l9-7 9 7v13H15z" stroke="#92400e" strokeWidth="2" fill="none"/><rect x="21" y="25" width="6" height="8" rx="1" stroke="#f59e0b" strokeWidth="2" fill="none"/></svg>
  ),
  "Sales Enablement": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M14 34l6-8 5 4 9-14" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="34" cy="16" r="2" fill="#1e40af"/></svg>
  ),
  "Financial Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#f0fdf4"/><path d="M24 14v20M18 18h12M16 24h16M18 30h12" stroke="#166534" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="24" r="11" stroke="#22c55e" strokeWidth="2" fill="none"/></svg>
  ),
  "AI Compliance": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#fef3c7"/><path d="M24 14l-10 5v8c0 5.55 4.27 10.74 10 12 5.73-1.26 10-6.45 10-12v-8l-10-5z" stroke="#92400e" strokeWidth="2" fill="none"/><path d="M21 24h6M24 21v6" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/></svg>
  ),
  "DevOps": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><path d="M16 16h16v16H16z" stroke="#6b21a8" strokeWidth="2" rx="2" fill="none"/><path d="M20 22l3 3 5-5" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 12v4M24 32v4M12 24h4M32 24h4" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  "API Monitoring": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M14 28l5-8 4 4 6-10 5 6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="34" cy="20" r="3" stroke="#1e40af" strokeWidth="2" fill="none"/></svg>
  ),
  "Real Estate Analytics": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#f0fdf4"/><rect x="14" y="20" width="8" height="14" rx="1" stroke="#166534" strokeWidth="2" fill="none"/><rect x="26" y="14" width="8" height="20" rx="1" stroke="#166534" strokeWidth="2" fill="none"/><path d="M17 24h2M17 28h2M29 18h2M29 22h2M29 26h2" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  "Wealth Management": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><circle cx="24" cy="24" r="10" stroke="#6b21a8" strokeWidth="2" fill="none"/><path d="M24 18v12M20 22h8M20 26h8" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  "Legal Operations": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#fef3c7"/><path d="M24 14v4M16 22h16M14 34h20" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/><path d="M18 22l-4 8h8zM30 22l-4 8h8z" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinejoin="round"/></svg>
  ),
  "Marketplace": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M14 20l2-6h16l2 6" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 20v14h20V20" stroke="#1e40af" strokeWidth="2" fill="none"/><rect x="20" y="26" width="8" height="8" rx="1" stroke="#3b82f6" strokeWidth="2" fill="none"/></svg>
  ),
  "AI Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><circle cx="24" cy="24" r="6" stroke="#6d28d9" strokeWidth="2" fill="none"/><circle cx="14" cy="14" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><circle cx="34" cy="14" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><circle cx="14" cy="34" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><circle cx="34" cy="34" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><line x1="18" y1="20" x2="16" y2="17" stroke="#7c3aed" strokeWidth="1.5"/><line x1="30" y1="20" x2="32" y2="17" stroke="#7c3aed" strokeWidth="1.5"/><line x1="18" y1="28" x2="16" y2="31" stroke="#7c3aed" strokeWidth="1.5"/><line x1="30" y1="28" x2="32" y2="31" stroke="#7c3aed" strokeWidth="1.5"/></svg>
  ),
  "Clinical AI": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ecfdf5"/><path d="M24 14v20M14 24h20" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/><circle cx="24" cy="24" r="10" stroke="#047857" strokeWidth="2" fill="none"/><path d="M18 18l2.5 2.5M30 18l-2.5 2.5M18 30l2.5-2.5M30 30l-2.5-2.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
};

// ============================================================================
// APP COMPONENTS
// ============================================================================
function Nav({onHome, onAbout}) {
  return (
    <nav>
      <div className="container">
        <a className="logo" href="#" onClick={e=>{e.preventDefault();onHome()}}>Jacob George</a>
        <div className="nav-links">
          <a href="#" onClick={e=>{e.preventDefault();onHome()}}>Products</a>
          <a href="#about" onClick={e=>{e.preventDefault();onAbout()}}>About</a>
          <a href="https://github.com/riiiiiicoooo" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <button className="mobile-menu-btn" onClick={e=>{e.currentTarget.parentElement.querySelector('.nav-links').classList.toggle('open')}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
    </nav>
  );
}

function ProductCard({product, onClick, style}) {
  const stageClass = product.stage.toLowerCase().replace(/[- ]/g,'-');
  return (
    <div className="product-card" onClick={onClick} style={style}>
      <span className={`card-stage stage-${stageClass}`}>{product.stage}</span>
      <div className="card-icon">{DOMAIN_ICONS[product.domain]}</div>
      <div className="card-domain">{product.domain}</div>
      <div className="card-title">{product.name}</div>
      <div className="card-desc">{product.tagline}</div>
      <div className="card-metric">
        <span className="val">{product.metrics[0].value}</span>
        <span className="context">{product.metrics[0].label}</span>
      </div>
      {product.metrics[0].prev && <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{product.metrics[0].prev}</div>}
      <div className="card-tags">
        {product.tech.slice(0,4).map(t=><span key={t} className="card-tag">{t}</span>)}
      </div>
      <span className="card-arrow">&rarr;</span>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <div className="about-main">
            <h1 className="about-title">About Me</h1>
            <p className="about-lead">
              I'm Jacob George, a Senior Product Manager and strategic advisor with 10+ years of experience leading product management across AI, SaaS, enterprise technology, and consulting organizations. Based in New York, I'm currently a Principal PM at Ampersand Consulting where I help companies define and ship products from zero to production.
            </p>
            <p className="about-body">
              My background spans financial services, healthcare, defense, real estate, and enterprise SaaS. I've worked at Deloitte, Avanade (the Accenture &amp; Microsoft joint venture), and led product strategy for AI-powered platforms serving the Defense Health Agency and Navy Medicine before focusing full time on building.
            </p>
            <p className="about-body">
              What I do differently is prototype first and decide fast. I don't write 40-page specs or spend weeks in review cycles. I build working prototypes against real data, benchmark them against alternatives, kill what doesn't work, and ship what does — with quantified results. Every product in this portfolio has a pivot story where the first version broke and the shipped version was better because I evaluated fast enough to course-correct.
            </p>
            <p className="about-body">
              I'm most effective in ambiguous, high-complexity environments where the path forward isn't clear. I use design thinking and systems thinking to diagnose root causes, create clarity through structured problem-solving, and drive cross-functional alignment across engineering, design, data, and business teams.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-num">10+</div>
                <div className="highlight-label">Years in product management</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-num">13</div>
                <div className="highlight-label">Products shipped across 8 industries</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-num">$35M+</div>
                <div className="highlight-label">Combined value delivered</div>
              </div>
            </div>
            <div className="about-experience">
              <h2 className="about-subtitle">Background</h2>
              <div className="experience-list">
                <div className="experience-item">
                  <div className="exp-role">Product Manager Consultant, Principal</div>
                  <div className="exp-company">Ampersand Consulting &middot; 2023 – Present</div>
                </div>
                <div className="experience-item">
                  <div className="exp-role">Product Manager / Change Consultant, Senior</div>
                  <div className="exp-company">Avanade (Accenture &amp; Microsoft JV) &middot; 2022</div>
                </div>
                <div className="experience-item">
                  <div className="exp-role">Product Strategy Consultant, Senior</div>
                  <div className="exp-company">JPI &middot; 2019 – 2022</div>
                </div>
                <div className="experience-item">
                  <div className="exp-role">Strategy Consultant</div>
                  <div className="exp-company">Deloitte &middot; 2017 – 2019</div>
                </div>
                <div className="experience-item">
                  <div className="exp-role">Business Analyst</div>
                  <div className="exp-company">ICF &middot; 2016 – 2017</div>
                </div>
                <div className="experience-item">
                  <div className="exp-role">Research Analyst</div>
                  <div className="exp-company">Synergy Enterprises &middot; 2015 – 2016</div>
                </div>
              </div>
              <div className="about-education">B.S. Neuroscience, Temple University &middot; CSPO &middot; CSM &middot; SAFe</div>
            </div>
            <div className="about-cta-section">
              <h2 className="about-subtitle">Let's Talk</h2>
              <p className="about-body">
                I'm open to new product engagements, consulting opportunities, and connecting with other builders. Reach out and let's see what we can create together.
              </p>
              <div className="about-links">
                <a href="mailto:jacob.georgenyc@gmail.com" className="cta-button primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                  jacob.georgenyc@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/jacob-g-17630a127/" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="https://github.com/riiiiiicoooo" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MARQUEE_IDS = ["contract-intelligence", "fintech-ops", "clinical-ai", "verified-marketplace"];

const FEATURED_CASES = [
  { id: "contract-intelligence", domain: "Legal AI", title: "Contract Intelligence Platform", desc: "M&A Due Diligence Automation. Reduced contract review from 3-5 manual reviews per hour to 50-80 contracts per hour with 94.2% extraction accuracy.", stats: [{val:"16x",label:"Faster Review"},{val:"$2.1M",label:"Annual Savings"}] },
  { id: "fintech-ops", domain: "Financial Infrastructure", title: "Fintech Operations Platform", desc: "Double-entry ledger & payment settlement. Improved transaction success from 91.2% to 97.8% with zero ledger imbalance.", stats: [{val:"97.8%",label:"Txn Success"},{val:"$0",label:"Ledger Imbalance"}] },
  { id: "clinical-ai", domain: "Clinical AI", title: "Clinical AI Platform", desc: "HIPAA-compliant AI for prior authorization & revenue cycle. Reduced denial rates from 18.4% to 9.1% and recovered $2.1M annually.", stats: [{val:"9.1%",label:"Denial Rate"},{val:"$2.1M",label:"Revenue Recovered"}] },
  { id: "verified-marketplace", domain: "Marketplace", title: "Verified Services Marketplace", desc: "Trust-first two-sided marketplace. Drove $15M+ Year 1 GMV with 94% verification rate and <2% dispute rate.", stats: [{val:"$15M+",label:"Year 1 GMV"},{val:"<2%",label:"Dispute Rate"}] },
];

function CompactProductRow({product, onClick}) {
  return (
    <div className="compact-product-row" onClick={onClick}>
      <div className="compact-icon">{DOMAIN_ICONS[product.domain]}</div>
      <div className="compact-info">
        <div className="compact-name">{product.name}</div>
        <div className="compact-tagline">{product.tagline}</div>
      </div>
      <div className="compact-domain-badge">{product.domain}</div>
      <div className="compact-tags">
        {product.tech.slice(0,3).map(t=><span key={t} className="card-tag">{t}</span>)}
      </div>
      <span className="compact-arrow">&rarr;</span>
    </div>
  );
}

function HomePage({onSelectProduct}) {
  const [filter, setFilter] = useState("All");
  const [featuredIdx, setFeaturedIdx] = useState(() => Math.floor(Math.random() * FEATURED_CASES.length));
  const marqueeProducts = PRODUCTS.filter(p => MARQUEE_IDS.includes(p.id));
  const otherProducts = PRODUCTS.filter(p => !MARQUEE_IDS.includes(p.id));
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  const filteredMarquee = filter === "All" ? marqueeProducts : marqueeProducts.filter(p => p.category === filter);
  const filteredOther = filter === "All" ? otherProducts : otherProducts.filter(p => p.category === filter);
  const featured = FEATURED_CASES[featuredIdx];

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIdx(prev => (prev + 1) % FEATURED_CASES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hero">
        <div className="container">
          <h1 className="hero-name">Jacob George</h1>
          <p className="hero-tagline">Principal PM who prototypes, evaluates, and ships AI products.</p>
          <p>15 products built from zero to production across legal AI, fintech, healthcare, marketplaces, and enterprise SaaS. Every one has a pivot story, quantified outcomes, and working code.</p>
          <div className="stats-row">
            <div className="stat"><div className="num">15</div><div className="label">Products Built</div></div>
            <div className="stat"><div className="num">10</div><div className="label">Industries</div></div>
            <div className="stat"><div className="num">$35M+</div><div className="label">Combined Value</div></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="how-i-work">
          <div className="how-i-work-title">How I Build Products</div>
          <div className="how-i-work-steps">
            <div className="work-step">
              <div className="step-num">01</div>
              <div className="step-title">Prototype against real data</div>
              <div className="step-desc">Skip the 40-page spec. Build a working version against live data and put it in front of users in weeks, not months.</div>
            </div>
            <div className="work-step">
              <div className="step-num">02</div>
              <div className="step-title">Benchmark and evaluate fast</div>
              <div className="step-desc">Run structured comparisons — LLM accuracy benchmarks, A/B tests, pilot deployments — and let the data make the decision.</div>
            </div>
            <div className="work-step">
              <div className="step-num">03</div>
              <div className="step-title">Kill what doesn't work</div>
              <div className="step-desc">Every product in this portfolio has a pivot story. The first version is never the shipped version. The skill is knowing what to cut.</div>
            </div>
            <div className="work-step">
              <div className="step-num">04</div>
              <div className="step-title">Ship with proof</div>
              <div className="step-desc">Every product ships with quantified outcomes, interactive dashboards, and working code — not slide decks.</div>
            </div>
          </div>
        </div>
        <div className="filter-bar">
          {["All",...CATEGORIES].map(d=>(
            <button key={d} className={`filter-btn ${filter===d?"active":""}`} onClick={()=>setFilter(d)}>{d}</button>
          ))}
        </div>
        {filter === "All" && (
          <div className="featured-product" key={featured.id} onClick={()=>onSelectProduct(featured.id)}>
            <div className="featured-label">Featured Case Study</div>
            <div className="featured-content">
              <div className="featured-icon">{DOMAIN_ICONS[featured.domain]}</div>
              <div className="featured-info">
                <h3 className="featured-title">{featured.title}</h3>
                <p className="featured-desc">{featured.desc}</p>
              </div>
              <div className="featured-metrics">
                {featured.stats.map((s,i)=>(
                  <div key={i} className="featured-stat"><span className="featured-val">{s.val}</span><span className="featured-stat-label">{s.label}</span></div>
                ))}
              </div>
              <span className="featured-arrow">&rarr;</span>
            </div>
            <div className="featured-dots">
              {FEATURED_CASES.map((_,i)=>(
                <button key={i} className={`featured-dot ${i===featuredIdx?"active":""}`} onClick={(e)=>{e.stopPropagation();setFeaturedIdx(i)}}/>
              ))}
            </div>
          </div>
        )}
        {filteredMarquee.length > 0 && (
          <>
            {filter === "All" && <div className="section-divider"><span className="divider-label">Deep-Dive Case Studies</span></div>}
            <div className="product-grid">
              {filteredMarquee.map((p,i)=><ProductCard key={p.id} product={p} onClick={()=>onSelectProduct(p.id)} style={{animationDelay:`${i*0.05}s`}}/>)}
            </div>
          </>
        )}
        {filteredOther.length > 0 && filter === "All" && (
          <>
            <div className="section-divider"><span className="divider-label">Additional Products</span></div>
            <div className="compact-product-list">
              {filteredOther.map((p)=><CompactProductRow key={p.id} product={p} onClick={()=>onSelectProduct(p.id)}/>)}
            </div>
          </>
        )}
        {filter !== "All" && filteredOther.length > 0 && (
          <div className="product-grid" style={{marginTop: filteredMarquee.length > 0 ? 24 : 0}}>
            {filteredOther.filter(p => p.category === filter).map((p,i)=><ProductCard key={p.id} product={p} onClick={()=>onSelectProduct(p.id)} style={{animationDelay:`${(filteredMarquee.length+i)*0.05}s`}}/>)}
          </div>
        )}
      </div>
    </>
  );
}

function ProductDetail({productId, onBack}) {
  const product = PRODUCTS.find(p=>p.id===productId);
  const DashComponent = DASHBOARD_COMPONENTS[productId];
  const dashData = DASHBOARDS[productId];

  if (!product) return <div className="container" style={{padding:"80px 0"}}>Product not found.</div>;

  return (
    <div className="detail-page">
      <div className="container">
        <div className="back-btn" onClick={onBack}>&larr; All Products</div>
        <div className="detail-header">
          <div className="detail-icon-row">
            <div className="detail-icon">{DOMAIN_ICONS[product.domain]}</div>
            <div>
              <div className="detail-domain">{product.domain} &middot; {product.stage}</div>
              <h1 className="detail-title">{product.name}</h1>
            </div>
          </div>
          <div className="detail-subtitle">{product.description}</div>
          {product.timeline && (
            <div className="speed-badge">
              Concept → Production: {product.timeline}
            </div>
          )}
        </div>

        <div className="metrics-banner">
          {product.metrics.map((m,i)=>(
            <div key={i} className="metric-item">
              <div className="metric-val">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              {m.prev && <div className="metric-prev">{m.prev}</div>}
            </div>
          ))}
        </div>

        {product.id === "verified-marketplace" && (
          <div style={{textAlign:"center",margin:"16px 0 24px"}}>
            <a href="#homeconnect-demo" style={{display:"inline-block",fontSize:16,color:"#fff",background:"#0d9488",padding:"12px 28px",borderRadius:10,textDecoration:"none",fontWeight:600,letterSpacing:"0.01em"}}>Explore Live Demo →</a>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>Interactive marketplace walkthrough with realistic Atlanta metro data</div>
          </div>
        )}

        {product.id === "field-sales" && (
          <div style={{textAlign:"center",margin:"16px 0 24px"}}>
            <a href="#fieldcommand-demo" style={{display:"inline-block",fontSize:16,color:"#fff",background:"#1e3a5f",padding:"12px 28px",borderRadius:10,textDecoration:"none",fontWeight:600,letterSpacing:"0.01em"}}>Explore Live Demo →</a>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>Interactive mobile app walkthrough with realistic field sales data</div>
          </div>
        )}

        {product.id === "contract-intelligence" && (
          <div style={{textAlign:"center",margin:"16px 0 24px"}}>
            <a href="#contractintel-demo" style={{display:"inline-block",fontSize:16,color:"#fff",background:"#4338ca",padding:"12px 28px",borderRadius:10,textDecoration:"none",fontWeight:600,letterSpacing:"0.01em"}}>Explore Live Demo →</a>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>Interactive contract analysis walkthrough with realistic M&A data</div>
          </div>
        )}

        {product.id === "portfolio-intelligence" && (
          <div style={{textAlign:"center",margin:"16px 0 24px"}}>
            <a href="#portfoliointel-demo" style={{display:"inline-block",fontSize:16,color:"#fff",background:"#0f766e",padding:"12px 28px",borderRadius:10,textDecoration:"none",fontWeight:600,letterSpacing:"0.01em"}}>Explore Live Demo →</a>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>Interactive analytics walkthrough with realistic real estate data</div>
          </div>
        )}

        {product.id === "agent-orchestration" && (
          <div style={{textAlign:"center",margin:"16px 0 24px"}}>
            <a href="#agentorch-demo" style={{display:"inline-block",fontSize:16,color:"#fff",background:"#6d28d9",padding:"12px 28px",borderRadius:10,textDecoration:"none",fontWeight:600,letterSpacing:"0.01em"}}>Explore Live Demo →</a>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>Interactive orchestration command center with supervisor chat and agent monitoring</div>
          </div>
        )}

        {product.id === "clinical-ai" && (
          <div style={{textAlign:"center",margin:"16px 0 24px"}}>
            <a href="#clinicalai-demo" style={{display:"inline-block",fontSize:16,color:"#fff",background:"#059669",padding:"12px 28px",borderRadius:10,textDecoration:"none",fontWeight:600,letterSpacing:"0.01em"}}>Explore Live Demo →</a>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>Interactive clinical AI command center with PA automation, coding intelligence, and HIPAA compliance</div>
          </div>
        )}

        <div style={{fontSize:12,color:"var(--muted)",textAlign:"center",margin:"8px 0 24px"}}>Interactive visualizations based on anonymized production patterns. Data transformed for client confidentiality.</div>

        {DashComponent && dashData && (
          <div className="dashboard-section">
            <div className="section-title" style={{marginBottom:20}}>Interactive Dashboard</div>
            <DashComponent data={dashData} pipeline={product.pipeline}/>
          </div>
        )}

        <div className="build-narrative">
          <div className="narrative-step">
            <div className="narrative-marker">FOUND</div>
            <div className="section-title">What I Found</div>
            <div className="section-body"><p>{product.problem}</p></div>
          </div>
          <div className="narrative-step">
            <div className="narrative-marker">BUILT</div>
            <div className="section-title">What I Built</div>
            <div className="section-body"><p>{product.solution}</p></div>
          </div>
          {product.pivot && (
            <div className="narrative-step pivot-step">
              <div className="narrative-marker">PIVOTED</div>
              <div className="section-title">What I Changed</div>
              <div className="section-body"><p>{product.pivot}</p></div>
            </div>
          )}
        </div>
        <div className="section">
          <div className="section-title">My Role</div>
          <div className="section-body"><p>{product.role}</p></div>
        </div>
        {product.operationalDocs && (
          <div className="section">
            <div className="section-title">Operational Maturity</div>
            <div className="section-body">
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:10,padding:16}}>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--accent)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Service Level Objectives</div>
                  {product.operationalDocs.slos.map((s,i)=>(
                    <div key={i} style={{fontSize:13,color:"var(--text)",padding:"4px 0",borderBottom:i<product.operationalDocs.slos.length-1?"1px solid var(--border)":"none"}}>{s}</div>
                  ))}
                </div>
                <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:10,padding:16}}>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--accent)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Incident Runbooks</div>
                  {product.operationalDocs.runbooks.map((r,i)=>(
                    <div key={i} style={{fontSize:13,color:"var(--text)",padding:"4px 0",borderBottom:i<product.operationalDocs.runbooks.length-1?"1px solid var(--border)":"none"}}>{r}</div>
                  ))}
                </div>
              </div>
              <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:10,padding:16}}>
                <div style={{fontSize:13,fontWeight:600,color:"var(--accent)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Capacity Planning</div>
                <div style={{fontSize:13,color:"var(--text)"}}>{product.operationalDocs.capacityHighlight}</div>
                {product.operationalDocs.loadTest && (
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:8,fontStyle:"italic"}}>{product.operationalDocs.loadTest}</div>
                )}
              </div>
              <div style={{fontSize:12,color:"var(--muted)",marginTop:12}}>Full documentation: <a href={product.github+"/tree/main/docs"} target="_blank" rel="noopener noreferrer" style={{color:"var(--accent)"}}>SLO definitions, capacity plans, and runbooks on GitHub →</a></div>
            </div>
          </div>
        )}
        <div className="section">
          <div className="section-title">Technology Stack</div>
          {product.architecture && <p className="architecture-desc">{product.architecture}</p>}
          <div className="tech-list">
            {product.tech.map(t=><span key={t} className="tech-chip">{t}</span>)}
          </div>
          <div style={{marginTop:24,display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
            <a href={product.github} target="_blank" rel="noopener noreferrer" style={{fontSize:14,color:"var(--muted)",borderBottom:"1px solid var(--border)",paddingBottom:2}}>View on GitHub →</a>
            {product.id === "verified-marketplace" && (
              <a href="#homeconnect-demo" style={{fontSize:14,color:"#fff",background:"#0d9488",padding:"8px 18px",borderRadius:8,textDecoration:"none",fontWeight:600}}>Explore Live Demo →</a>
            )}
            {product.id === "contract-intelligence" && (
              <a href="#contractintel-demo" style={{fontSize:14,color:"#fff",background:"#4338ca",padding:"8px 18px",borderRadius:8,textDecoration:"none",fontWeight:600}}>Explore Live Demo →</a>
            )}
            {product.id === "portfolio-intelligence" && (
              <a href="#portfoliointel-demo" style={{fontSize:14,color:"#fff",background:"#0f766e",padding:"8px 18px",borderRadius:8,textDecoration:"none",fontWeight:600}}>Explore Live Demo →</a>
            )}
            {product.id === "agent-orchestration" && (
              <a href="#agentorch-demo" style={{fontSize:14,color:"#fff",background:"#6d28d9",padding:"8px 18px",borderRadius:8,textDecoration:"none",fontWeight:600}}>Explore Live Demo →</a>
            )}
            {product.id === "clinical-ai" && (
              <a href="#clinicalai-demo" style={{fontSize:14,color:"#fff",background:"#059669",padding:"8px 18px",borderRadius:8,textDecoration:"none",fontWeight:600}}>Explore Live Demo →</a>
            )}
          </div>
        </div>
        {product.pipeline && <DataPipeline stages={product.pipeline}/>}
      </div>
    </div>
  );
}

export default function App() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [page, setPage] = useState("home");

  useEffect(()=>{
    const handleHash = ()=>{
      const hash = window.location.hash.slice(1);
      if (hash === "about") { setPage("about"); setCurrentProduct(null); }
      else if (hash === "homeconnect-demo") { setPage("homeconnect"); setCurrentProduct(null); }
      else if (hash === "fieldcommand-demo") { setPage("fieldcommand"); setCurrentProduct(null); }
      else if (hash === "contractintel-demo") { setPage("contractintel"); setCurrentProduct(null); }
      else if (hash === "portfoliointel-demo") { setPage("portfoliointel"); setCurrentProduct(null); }
      else if (hash === "agentorch-demo") { setPage("agentorch"); setCurrentProduct(null); }
      else if (hash === "clinicalai-demo") { setPage("clinicalai"); setCurrentProduct(null); }
      else if (hash && PRODUCTS.find(p=>p.id===hash)) { setPage("product"); setCurrentProduct(hash); }
      else { setPage("home"); setCurrentProduct(null); }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return ()=>window.removeEventListener("hashchange", handleHash);
  },[]);

  const goHome = ()=>{window.location.hash="";setPage("home");setCurrentProduct(null)};
  const goAbout = ()=>{window.location.hash="about";setPage("about");setCurrentProduct(null);window.scrollTo(0,0)};
  const goProduct = (id)=>{window.location.hash=id;setPage("product");setCurrentProduct(id);window.scrollTo(0,0)};

  return (
    <>
      {page !== "homeconnect" && page !== "fieldcommand" && page !== "contractintel" && page !== "portfoliointel" && page !== "agentorch" && page !== "clinicalai" && <Nav onHome={goHome} onAbout={goAbout}/>}
      {page === "homeconnect" && <HomeConnectDemo onExit={goHome}/>}
      {page === "fieldcommand" && <FieldCommandDemo onExit={goHome}/>}
      {page === "contractintel" && <ContractIntelDemo onExit={goHome}/>}
      {page === "portfoliointel" && <PortfolioIntelDemo onExit={goHome}/>}
      {page === "agentorch" && <AgentOrchDemo onExit={goHome}/>}
      {page === "clinicalai" && <ClinicalAIDemo onExit={goHome}/>}
      {page === "about" && <AboutPage/>}
      {page === "product" && currentProduct && <ProductDetail productId={currentProduct} onBack={goHome}/>}
      {page === "home" && <HomePage onSelectProduct={goProduct}/>}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">Jacob George &middot; Consulting PM</div>
            <div className="footer-links">
              <a href="mailto:jacob.georgenyc@gmail.com">Email</a>
              <span>&middot;</span>
              <a href="https://www.linkedin.com/in/jacob-g-17630a127/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>&middot;</span>
              <a href="https://github.com/riiiiiicoooo" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
