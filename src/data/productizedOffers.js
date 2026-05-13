// ============================================================================
// PRODUCTIZED OFFERS — Consulting engagements delivered on the portfolio
// Each offer maps to one or more shipped products.
// ============================================================================

export const PRODUCTIZED_OFFERS = [
  {
    id: "tokenops-audit",
    name: "TokenOps Audit",
    tagline: "Cost-reduction work for production LLM workloads. Cascade routing, extended prompt caching, and per-agent circuit breakers, with workspace-isolated cost attribution.",
    engagementsDelivered: "Run across four product engagements: legal-AI document workloads, multi-agent orchestration, healthcare prior-authorization, and AI governance. Cost reductions ranged from 52% to 81%.",
    duration: "30 days",
    price: "$35K-$50K fixed",
    builtOn: ["genai-governance", "agent-orchestration", "agentgate", "contract-intelligence", "clinical-ai", "portfolio-intelligence", "review-prep"],
    audience: "CTOs, FinOps leaders, and PMs running 5+ LLM-backed workflows with a monthly LLM bill above $20K.",
    deliverables: [
      "Per-template token economics audit with workspace-isolated cache attribution",
      "1-hour extended cache adoption plan with break-even modeling per template",
      "Confidence-gated cascade routing implementation across the LLM-heavy workflows",
      "Per-agent token-rate circuit breakers (Redis sorted-sets primitive) to catch runaway-retry loops",
      "OpenTelemetry GenAI v1.37+ instrumentation for vendor-neutral cost attribution",
      "Optional: SLM-first tiered inference scoping for high-volume document workloads"
    ],
    proofPoints: [
      "63% LLM cost reduction on GenAI Governance (87% extended-cache hit rate)",
      "78% per-contract cost reduction on Contract Intelligence (84% extended-cache hit rate)",
      "81% LLM cost reduction on Agent Orchestration ($47K -> $9K/month)",
      "$0.08 per-encounter cost on Clinical AI, down from $0.34 baseline"
    ],
    why: "98% of FinOps practitioners now manage AI spend, and agentic workflows consume 5-30x more tokens per task than chatbots. The portfolio's cost-reduction case studies are the proof points; the audit packages the same playbook for buyers who already have AI in production but no FinOps discipline."
  },
  {
    id: "agent-marketplace-launch",
    name: "Agent Marketplace Launch",
    tagline: "Wraps a customer's domain agent with the AgentGate auth, OTel observability, and eval layers required to ship on Google Cloud A2A Marketplace, Azure AI Foundry, or AWS Bedrock AgentCore Runtime.",
    engagementsDelivered: "Delivered for eleven agents now listed across Google Cloud A2A Marketplace, Azure AI Foundry, and AWS Bedrock AgentCore. Eight secured through AgentGate, three published via Agent Orchestration.",
    duration: "6 weeks",
    price: "$60K-$100K fixed",
    builtOn: ["agentgate", "agent-orchestration", "genai-governance"],
    audience: "ISVs and platform teams that have a working domain agent and want to be discoverable on the major cloud agent marketplaces.",
    deliverables: [
      "A2A v1.2 cryptographically signed Agent Card publishing flow (Vault-brokered signing keys)",
      "AgentGate-wrapped MCP interception, OAuth 2.1 + RFC 8707 audience-bound tokens",
      "MCP Tasks/Sampling/Elicitation interception with full audit logs",
      "Per-agent budget controls + token-rate circuit breakers",
      "OpenTelemetry GenAI v1.37+ instrumentation, OTLP-exportable",
      "Trajectory-level eval framework (precision/recall/coherence) for marketplace QA gating"
    ],
    proofPoints: [
      "8 marketplace-listed agents currently secured via AgentGate, 3 listed via Agent Orchestration",
      "94.2% task completion rate, 0 escaped hallucinations across a 28-week window with the Reflection pattern",
      "Currently the only enterprise gateway specifically validating signed A2A v1.2 cards"
    ],
    why: "A2A is now governed by the Linux Foundation Agentic AI Foundation, and marketplace listings are a paid distribution channel. This engagement compresses the auth, observability, and eval layers into a fixed-fee package so a domain ISV can ship a marketplace listing without rebuilding the agent infrastructure stack."
  },
  {
    id: "agent-observability-install",
    name: "Agent Observability Install",
    tagline: "OpenTelemetry GenAI instrumentation across the MCP transport, model routing, and audit layer. OTLP-exportable to whatever observability backend the customer already runs.",
    engagementsDelivered: "Installed as part of every AgentGate engagement, currently running across 62 production agents at customer organizations, 8 of which are marketplace-listed. Packaged as a standalone offer for teams that want the OTel layer without the full auth stack.",
    duration: "3-5 weeks",
    price: "$45K-$80K fixed",
    builtOn: ["agentgate", "agent-orchestration"],
    audience: "Platform teams running production agents on LangGraph, CrewAI, Microsoft Agent Framework, or homegrown stacks who need vendor-neutral observability for cost attribution and reliability.",
    deliverables: [
      "OpenTelemetry GenAI v1.37+ semantic conventions on every model call, MCP tool invocation, MCP Tasks/Sampling/Elicitation event, and circuit-breaker trip",
      "OTLP exporter wired to the customer's existing backend: Datadog, Grafana, Elastic, Honeycomb, or Prometheus",
      "Per-agent token-rate circuit breakers (Redis sorted-sets primitive) keyed to rolling 60-second p95 deviation",
      "Per-template cost attribution dashboard with workspace-isolated prompt-cache hit-rate breakdown",
      "Trajectory replay views: pick any agent decision and walk through tool calls, model choices, and policy gates that fired"
    ],
    proofPoints: [
      "AgentGate's OTel layer is what catches runaway retries before the cost-budget kill switch fires, modeled on the April 2026 $437 retry-loop post-mortem",
      "62 production agents instrumented across AgentGate deployments, 8 marketplace-listed",
      "OTel GenAI v1.37+ is the spec Datadog ships native support for: instrument once, export anywhere"
    ],
    why: "Agent observability splintered into a six-platform stable in early 2026 (Galileo, Arize, LangSmith, Helicone, Langfuse, Datadog LLM). Buyers running regulated workflows don't want lock-in to any one of them. The install drops OTel GenAI in at the agent layer and lets the customer keep their existing backend."
  },
  {
    id: "trust-score-sku",
    name: "Trust Score: Agent Reliability Layer",
    tagline: "Trajectory eval framework plus deterministic guardrails, delivered as an installable layer on top of an existing agent stack.",
    engagementsDelivered: "Running in production on Agent Orchestration across a 28-week window with 0 escaped hallucinations, and on GenAI Governance across 43K+ interactions with 0 NCUA exam findings.",
    duration: "4-week onboarding + monthly subscription",
    price: "$2K-$8K/month per agent at scale",
    builtOn: ["agent-orchestration", "genai-governance"],
    audience: "Teams that already have agent infrastructure (LangGraph, CrewAI, Microsoft Agent Framework, or homegrown) but no quality or reliability layer.",
    deliverables: [
      "Trajectory-level eval framework: tool-selection precision, reasoning chain coherence, step-level latency, semantic similarity, hallucination, routing accuracy, cost efficiency",
      "Claude-as-judge with structured rubric, A/B comparison, statistical significance testing",
      "Five-layer deterministic guardrails (PII, hallucination, bias, compliance, confidence). Every guardrail is a stateless function for explainable audit",
      "Per-agent reliability score with monthly trend reporting",
      "Optional: Reflection-pattern self-critique (caught 3/month escaped hallucinations during Agent Orchestration's 28-week production window)"
    ],
    proofPoints: [
      "0 escaped hallucinations across 28 weeks on Agent Orchestration with Reflection pattern enabled",
      "0 NCUA exam findings across 43K+ interactions on GenAI Governance",
      "Deterministic guardrails (no LLM-as-judge) for examiner-ready auditability"
    ],
    why: "Galileo, Arize, and LangSmith are fragmenting the agent observability market into six-plus platforms. The differentiated angle is deterministic guardrails layered onto trajectory evals; buyers running regulated workflows can't rely on LLM-as-judge for the production audit story."
  },
  {
    id: "continuous-conformity",
    name: "Continuous Conformity Re-Assessment",
    tagline: "Monthly conformity re-assessment for Annex III systems, triggered automatically on prompt changes, model upgrades, and demographic drift in scoring inputs.",
    engagementsDelivered: "Shipped on three GenAI Governance pilots. Two continued onto monthly conformity re-assessment after the initial conformity sale.",
    duration: "Monthly subscription, 2-week onboarding",
    price: "$3K-$12K/month per Annex III system",
    builtOn: ["genai-governance", "agent-orchestration", "clinical-ai", "engagement-engine", "field-sales"],
    audience: "Enterprises that completed an EU AI Act conformity assessment and now need to keep it current as their AI systems evolve.",
    deliverables: [
      "Conformity re-assessment automatically triggered by prompt registry deployments, model upgrades, and data drift",
      "Auto-regenerated Article 8-15 documentation with material-change flagging",
      "Re-notification packages for EU notified bodies when material changes occur",
      "Bias re-testing on every meaningful change to scoring inputs or thresholds",
      "Quarterly conformity drift report for the compliance officer's audit committee",
      "Pre-built support for Mistral as an EU-resident model option for data-residency-sensitive deployments"
    ],
    proofPoints: [
      "Conformity assessment auto-generation already shipped on 3 GenAI Governance pilots",
      "Versioned prompt registry with full approval workflow (DRAFT -> PENDING_REVIEW -> APPROVED -> DEPLOYED -> DEPRECATED) and SHA-256 content hashing",
      "Monthly bias testing against demographic variations already deployed in production"
    ],
    why: "Initial conformity readiness is the easy part. Staying conformant as the AI system changes is the recurring revenue. Article 26 deployer obligations are continuous, and EU regulators have signaled material-change re-notification will be enforced. This is the highest-margin offer in the portfolio because it sits on top of a one-time conformity sale."
  }
];
