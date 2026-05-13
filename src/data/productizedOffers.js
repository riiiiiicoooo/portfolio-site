// ============================================================================
// PRODUCTIZED OFFERS — Fixed-fee consulting offers built on the portfolio
// Each offer maps to one or more shipped products.
// ============================================================================

export const PRODUCTIZED_OFFERS = [
  {
    id: "eu-ai-act-readiness",
    name: "EU AI Act Readiness Sprint",
    tagline: "From scoping to Annex III conformity in 60-90 days, before August 2, 2026.",
    duration: "60-90 days",
    price: "$75K-$150K fixed",
    urgency: "August 2, 2026 enforcement",
    builtOn: ["genai-governance", "engagement-engine", "field-sales", "clinical-ai"],
    audience: "Critical infrastructure, financial services, healthcare, and HR/employment-adjacent AI deployers with EU exposure",
    deliverables: [
      "Annex III gap audit against existing AI systems and product roadmap",
      "Article 8-15 documentation auto-generated from the GenAI Governance audit log",
      "Conformity assessment workflow + EU database registration package",
      "Risk management system, data governance, human oversight specifications",
      "Post-market monitoring + incident reporting wiring",
      "CE marking tracking + 90 days of post-launch conformity drift monitoring"
    ],
    proofPoints: [
      "3 EU AI Act Readiness Pack pilots already shipped through GenAI Governance",
      "0 NCUA exam findings across 43K+ AI interactions on the same governance engine",
      "Multi-regulatory conformity (NCUA + EU AI Act + OCC SR 11-7 + NIST AI RMF) from a single platform"
    ],
    why: "August 2, 2026 enforcement is now under 100 days away. Critical infrastructure, government, and defence organisations face the steepest compliance burden — mandatory AI inventories, risk assessments, and audit-ready evidence. This is one of the only enterprise AI offers where buying urgency is legally enforced and the deadline is public."
  },
  {
    id: "tokenops-audit",
    name: "TokenOps Audit",
    tagline: "Cut your enterprise AI spend 50-80% in 30 days, with auditable savings.",
    duration: "30 days",
    price: "$35K-$50K fixed",
    urgency: "Most enterprises overspend on AI by 4-5x",
    builtOn: ["genai-governance", "agent-orchestration", "agentgate", "contract-intelligence", "clinical-ai", "portfolio-intelligence", "review-prep"],
    audience: "CTOs, FinOps leaders, and PMs running 5+ LLM-backed workflows with a monthly LLM bill > $20K",
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
      "81% LLM cost reduction on Agent Orchestration ($47K → $9K/month)",
      "$0.08 per-encounter cost on Clinical AI, down from $0.34 baseline"
    ],
    why: "98% of FinOps practitioners now manage AI spend; agentic workflows consume 5-30x more tokens per task than chatbots. The portfolio's 52-81% cost-reduction case studies are the proof points; the audit packages the same playbook for buyers who already have AI in production but no FinOps discipline."
  },
  {
    id: "agent-marketplace-launch",
    name: "Agent Marketplace Launch",
    tagline: "From domain agent to A2A v1.2 marketplace listing in 6 weeks.",
    duration: "6 weeks",
    price: "$60K-$100K fixed",
    urgency: "A2A protocol crossed 150 production deployments in Q2 2026",
    builtOn: ["agentgate", "agent-orchestration", "genai-governance"],
    audience: "ISVs and platform teams that have a working domain agent and want to be discoverable on the Google Cloud A2A Agent Marketplace, Microsoft Azure AI Foundry, or AWS Bedrock AgentCore Runtime",
    deliverables: [
      "A2A v1.2 cryptographically signed Agent Card publishing flow (Vault-brokered signing keys)",
      "AgentGate-wrapped MCP interception, OAuth 2.1 + RFC 8707 audience-bound tokens",
      "MCP Tasks/Sampling/Elicitation interception with full audit logs",
      "Per-agent budget controls + token-rate circuit breakers",
      "OpenTelemetry GenAI v1.37+ instrumentation, OTLP-exportable",
      "Trajectory-level eval framework (Galileo-style precision/recall) for marketplace QA gating"
    ],
    proofPoints: [
      "8 marketplace-listed agents currently secured via AgentGate, 3 listed via Agent Orchestration",
      "94.2% task completion rate, 0 escaped hallucinations across a 28-week window with the Reflection pattern",
      "Currently the only enterprise gateway specifically validating signed A2A v1.2 cards"
    ],
    why: "A2A is now governed by the Linux Foundation Agentic AI Foundation; marketplace listings are a paid distribution channel. This offer compresses the auth + observability + eval layers into a fixed-fee package so a domain ISV can ship a marketplace listing without rebuilding the agent infrastructure stack."
  },
  {
    id: "trust-score-sku",
    name: "Trust Score: Agent Reliability Layer",
    tagline: "Galileo-style trajectory evals + deterministic guardrails as a standalone subscription.",
    duration: "4-week onboarding + monthly subscription",
    price: "$2K-$8K/month per agent at scale",
    urgency: "Galileo's 2026 positioning: dev-time evals automatically promote to production guardrails",
    builtOn: ["agent-orchestration", "genai-governance"],
    audience: "Teams that already have agent infrastructure (LangGraph, CrewAI, AutoGen, or homegrown) but no quality / reliability layer",
    deliverables: [
      "Trajectory-level eval framework: tool-selection precision, reasoning chain coherence, step-level latency, semantic similarity, hallucination, routing accuracy, cost efficiency",
      "Claude-as-judge with structured rubric, A/B comparison, statistical significance testing",
      "Five-layer deterministic guardrails (PII, hallucination, bias, compliance, confidence) — every guardrail is a stateless function for explainable audit",
      "Per-agent reliability score with monthly trend reporting",
      "Optional: Reflection-pattern self-critique (caught 3/month escaped hallucinations during Agent Orchestration's 28-week production window)"
    ],
    proofPoints: [
      "0 escaped hallucinations across 28 weeks on Agent Orchestration with Reflection pattern enabled",
      "0 NCUA exam findings across 43K+ interactions on GenAI Governance",
      "Deterministic guardrails — never LLM-as-judge — for full examiner-ready auditability"
    ],
    why: "Galileo, Arize, and LangSmith are fragmenting the agent observability market into 6+ platforms. The differentiated angle is *deterministic* guardrails layered onto trajectory evals — buyers running regulated workflows can't rely on LLM-as-judge for the production audit story."
  },
  {
    id: "continuous-conformity",
    name: "Continuous Conformity Re-Assessment",
    tagline: "Annex III conformity that re-runs on every prompt deploy and model upgrade.",
    duration: "Monthly subscription, 2-week onboarding",
    price: "$3K-$12K/month per Annex III system",
    urgency: "Post-August 2, 2026 — Article 26 deployer obligations are continuous, not one-time",
    builtOn: ["genai-governance", "agent-orchestration", "clinical-ai", "engagement-engine", "field-sales"],
    audience: "Enterprises that completed an EU AI Act conformity assessment and now need to keep it current as their AI systems evolve",
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
      "Versioned prompt registry with full approval workflow (DRAFT → PENDING_REVIEW → APPROVED → DEPLOYED → DEPRECATED) and SHA-256 content hashing",
      "Monthly bias testing against demographic variations already deployed in production"
    ],
    why: "August 2, 2026 readiness is the easy part — staying conformant as the AI system changes is the recurring revenue opportunity. Article 26 deployer obligations are continuous, and EU regulators are signaling material-change re-notification will be enforced. This is the highest-margin offer in the portfolio because it's recurring on top of a one-time conformity sale."
  }
];
