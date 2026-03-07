import { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart
} from "recharts";

// ============================================================================
// PRODUCT DATA
// ============================================================================
const PRODUCTS = [
  {
    id: "agentgate",
    name: "AgentGate",
    domain: "Developer Security",
    stage: "Production",
    tagline: "AI Agent Authentication & Secrets Management",
    description: "Zero-trust authentication layer for AI agents accessing enterprise APIs. Replaced static credential sharing with ephemeral, scoped tokens — eliminating credential exposure in agent workflows.",
    problem: "AI agents were sharing long-lived API keys, stored in plaintext configs and environment variables. 23 credential exposures in 6 months, each requiring emergency rotation across dependent services.",
    solution: "OAuth 2.0 agent identity layer with ephemeral token issuance, policy-based access control, and secrets brokering. Agents authenticate per-request with scoped, time-limited credentials. Full audit trail of every credential access.",
    metrics: [
      {value: "0", label: "Credential Exposures", prev: "from 23 in 6 months"},
      {value: "<200ms", label: "Auth Latency p95", prev: "from 1.2s"},
      {value: "100%", label: "Audit Coverage", prev: "from ~40%"},
      {value: "47", label: "Agents Secured", prev: ""}
    ],
    tech: ["FastAPI","PostgreSQL","Redis","OAuth 2.0","JWT","Vault","AWS Secrets Manager","TypeScript SDK"],
    github: "https://github.com/riiiiiicoooo/agentgate"
  },
  {
    id: "ai-data-ops",
    name: "AI Data Operations Platform",
    domain: "ML Infrastructure",
    stage: "Multi-client",
    tagline: "Training Data Quality at Scale",
    description: "End-to-end platform for managing ML training data pipelines — from annotation to quality measurement to model evaluation. Built for teams producing thousands of labeled examples daily.",
    problem: "Annotation teams were producing ~200 examples per team-day with a 12% error rate. No systematic quality measurement, no feedback loops to annotators, no visibility into how data quality affected model performance.",
    solution: "Unified platform with real-time quality scoring, automated consensus workflows, annotator feedback loops, and model performance correlation. Quality gates prevent bad data from reaching training pipelines.",
    metrics: [
      {value: "2,340", label: "Examples/Team-Day", prev: "from 200 baseline"},
      {value: "2.8%", label: "Annotation Error Rate", prev: "from 12%"},
      {value: "11.7x", label: "Throughput Increase", prev: ""},
      {value: "3", label: "Active Clients", prev: ""}
    ],
    tech: ["FastAPI","Temporal","scikit-learn","PostgreSQL","Redis","Supabase","Trigger.dev","n8n"],
    github: "https://github.com/riiiiiicoooo/ai-data-operations-platform"
  },
  {
    id: "contract-intelligence",
    name: "Contract Intelligence Platform",
    domain: "Legal AI",
    stage: "Production",
    tagline: "M&A Due Diligence Automation",
    description: "AI-powered contract analysis for M&A deal rooms. Extracts clauses, scores risk, and surfaces material issues across hundreds of contracts in hours instead of weeks.",
    problem: "M&A attorneys manually reviewed 3-5 contracts per hour, reading linearly through every page. Due diligence on a 200-contract deal took 2-3 weeks and $150K+ in associate billing.",
    solution: "Automated extraction pipeline with clause-level risk scoring, cross-contract pattern detection, and a deal dashboard that surfaces material issues by risk tier. Attorneys review AI-flagged items instead of reading everything.",
    metrics: [
      {value: "50-80", label: "Contracts/Hour", prev: "from 3-5 manual"},
      {value: "94.2%", label: "Extraction Accuracy", prev: ""},
      {value: "16x", label: "Speed Improvement", prev: ""},
      {value: "$2.1M", label: "Annual Savings", prev: ""}
    ],
    tech: ["Next.js","FastAPI","Supabase","pgvector","Claude","GPT-4","LangSmith","Trigger.dev"],
    github: "https://github.com/riiiiiicoooo/contract-intelligence-platform"
  },
  {
    id: "engagement-engine",
    name: "Engagement & Personalization Engine",
    domain: "Consumer Platform",
    stage: "Approved",
    tagline: "Behavioral Personalization at Scale",
    description: "Real-time personalization engine that adapts content, notifications, and product surfaces to individual user behavior patterns — driving measurable lifts in engagement and retention.",
    problem: "One-size-fits-all content and notification strategy. 28-day retention was declining, engagement per session was flat, and the product team had no ability to test personalization hypotheses.",
    solution: "Event-driven personalization pipeline with real-time behavioral segmentation, A/B testing framework, and adaptive content ranking. Every surface can be personalized independently with full experimentation support.",
    metrics: [
      {value: "+28%", label: "Engagement Lift", prev: ""},
      {value: "+59%", label: "Retention Improvement", prev: ""},
      {value: "3.2x", label: "Notification CTR", prev: ""},
      {value: "<50ms", label: "Personalization Latency", prev: ""}
    ],
    tech: ["FastAPI","Snowflake","Supabase","Segment","PostHog","Trigger.dev","n8n"],
    github: "https://github.com/riiiiiicoooo/engagement-personalization-engine"
  },
  {
    id: "field-sales",
    name: "Field Sales Command",
    domain: "Sales Enablement",
    stage: "Pilot",
    tagline: "Mobile-First Field Sales Operations",
    description: "Mobile platform for field sales reps that replaced paper route sheets with intelligent visit planning, real-time order capture, and performance leaderboards.",
    problem: "68 field reps used paper route sheets and called in orders by phone. No visit verification, no real-time inventory visibility, no performance data. Management had zero insight into daily field operations.",
    solution: "React Native app with GPS visit verification, offline-capable order entry, intelligent route optimization, and gamified leaderboards. Manager dashboard shows real-time field activity with automated coaching triggers.",
    metrics: [
      {value: "+43%", label: "Daily Visits", prev: ""},
      {value: "$5.3M", label: "Revenue Lift (Annual)", prev: ""},
      {value: "92%", label: "Rep Adoption", prev: "Week 6"},
      {value: "68", label: "Active Reps", prev: ""}
    ],
    tech: ["React Native","Expo","FastAPI","Supabase","Redux","n8n","Salesforce","Grafana"],
    github: "https://github.com/riiiiiicoooo/field-sales-command"
  },
  {
    id: "fintech-ops",
    name: "Fintech Operations Platform",
    domain: "Financial Infrastructure",
    stage: "Production",
    tagline: "Double-Entry Ledger & Payment Settlement",
    description: "Core financial infrastructure with double-entry ledger, real-time payment processing, and automated reconciliation. Built for a lending startup processing millions in monthly transactions.",
    problem: "91.2% transaction success rate with manual reconciliation taking 3+ days. No real-time visibility into payment status, ledger imbalances discovered weeks after the fact.",
    solution: "Double-entry ledger with atomic transaction guarantees, real-time Stripe integration, automated daily reconciliation, and a monitoring dashboard that catches anomalies within minutes.",
    metrics: [
      {value: "97.8%", label: "Transaction Success", prev: "from 91.2%"},
      {value: "<15min", label: "Reconciliation Time", prev: "from 3+ days"},
      {value: "$0", label: "Ledger Imbalance", prev: "from ~$12K/month"},
      {value: "99.97%", label: "Platform Uptime", prev: ""}
    ],
    tech: ["FastAPI","PostgreSQL","Stripe Connect","n8n","Trigger.dev","Grafana","Prometheus","dbt"],
    github: "https://github.com/riiiiiicoooo/fintech-operations-platform"
  },
  {
    id: "genai-governance",
    name: "Enterprise GenAI Governance",
    domain: "AI Compliance",
    stage: "Production",
    tagline: "Regulated AI Deployment for Financial Services",
    description: "Governance layer for deploying generative AI in a regulated credit union. Full audit trail, content filtering, bias monitoring, and examiner-ready compliance reporting.",
    problem: "Credit union wanted to deploy AI chatbot and internal tools but faced NCUA regulatory requirements with zero precedent for GenAI compliance. Board and examiners needed assurance of safety and auditability.",
    solution: "Middleware governance layer that intercepts all AI interactions, applies content policies, logs for audit, monitors for bias and hallucination, and generates compliance reports. Designed for examiner review.",
    metrics: [
      {value: "0", label: "NCUA Exam Findings", prev: ""},
      {value: "43K+", label: "AI Interactions Governed", prev: ""},
      {value: "100%", label: "Audit Coverage", prev: ""},
      {value: "<500ms", label: "Governance Overhead", prev: ""}
    ],
    tech: ["FastAPI","Supabase","AWS Bedrock","LangSmith","n8n","Trigger.dev","Resend"],
    github: "https://github.com/riiiiiicoooo/genai-governance"
  },
  {
    id: "infra-automation",
    name: "Infrastructure Automation Platform",
    domain: "DevOps",
    stage: "Production",
    tagline: "Self-Service Enterprise Infrastructure",
    description: "Platform that transformed a 3-week infrastructure provisioning process into self-service deployment with policy guardrails, reducing deployment time by 85% while maintaining compliance.",
    problem: "Infrastructure requests took 3 weeks with 6 approval steps. Platform team was a bottleneck — 40% of their time spent on routine provisioning. Engineers worked around the process, creating shadow IT risk.",
    solution: "Self-service portal with Terraform-based provisioning, OPA policy enforcement, and automated compliance validation. Engineers deploy within guardrails; platform team focuses on platform evolution instead of ticket processing.",
    metrics: [
      {value: "85%", label: "Deployment Time Reduction", prev: ""},
      {value: "$12M", label: "Annual Value", prev: ""},
      {value: "3 weeks → 4 hrs", label: "Provisioning Time", prev: ""},
      {value: "0", label: "Compliance Violations", prev: ""}
    ],
    tech: ["Temporal","Terraform","Ansible","FastAPI","PostgreSQL","TimescaleDB","OPA","Grafana"],
    github: "https://github.com/riiiiiicoooo/infrastructure-automation-platform"
  },
  {
    id: "integration-health",
    name: "Integration Health Monitor",
    domain: "API Monitoring",
    stage: "Multi-client",
    tagline: "Third-Party Integration Observability",
    description: "Single-pane-of-glass monitoring for all third-party API integrations. Replaced the 'check each provider status page manually' workflow with automated health scoring and incident detection.",
    problem: "Mean time to identify integration issues was 30+ minutes. Engineers checked 6+ provider status pages, grepped logs, and asked around. Support tickets spiked before anyone realized an API was degraded.",
    solution: "Unified monitoring dashboard with per-provider health scores, circuit breaker status, latency tracking, and automated alerting. Webhook-based ingestion means issues are detected in under 2 minutes.",
    metrics: [
      {value: "<2 min", label: "Mean Time to Identify", prev: "from 30+ min"},
      {value: "15x", label: "Detection Speed", prev: ""},
      {value: "12", label: "Integrations Monitored", prev: ""},
      {value: "99.4%", label: "Alert Accuracy", prev: ""}
    ],
    tech: ["FastAPI","PostgreSQL","React","Grafana","n8n","Trigger.dev","Supabase"],
    github: "https://github.com/riiiiiicoooo/integration-health-monitor"
  },
  {
    id: "portfolio-intelligence",
    name: "Portfolio Intelligence Hub",
    domain: "Real Estate Analytics",
    stage: "Active",
    tagline: "Natural Language Querying for Real Estate Data",
    description: "RAG-powered analytics platform that lets real estate portfolio managers query complex property and financial data in natural language — getting answers in seconds instead of days.",
    problem: "Portfolio managers waited 24-48 hours for analysts to run custom SQL queries against the data warehouse. Simple questions like 'which properties have lease expirations in Q3' required filing a data request.",
    solution: "Text-to-SQL engine with semantic search over property documents, validated against known-good queries. Natural language interface returns results in under 30 seconds with confidence scores and source attribution.",
    metrics: [
      {value: "<30s", label: "Query Turnaround", prev: "from 24-48 hours"},
      {value: "91.3%", label: "SQL Accuracy", prev: ""},
      {value: "2,800+", label: "Queries Served", prev: ""},
      {value: "4.6/5", label: "User Satisfaction", prev: ""}
    ],
    tech: ["FastAPI","Snowflake","Supabase","pgvector","Claude API","Cohere","Vercel","Playwright"],
    github: "https://github.com/riiiiiicoooo/portfolio-intelligence-hub"
  },
  {
    id: "review-prep",
    name: "Review Prep Engine",
    domain: "Wealth Management",
    stage: "Approved",
    tagline: "Automated Client Review Assembly",
    description: "Automates the assembly of client review packages for wealth advisors — pulling from CRM, portfolio systems, and market data to produce ready-to-present briefing documents.",
    problem: "Advisors spent 45 minutes per client assembling review materials from 4+ systems. With 200+ clients each, quarterly reviews meant weeks of prep work — or poorly prepared meetings.",
    solution: "Automated pipeline that pulls client data from all source systems, generates performance summaries, flags discussion topics, and produces a presentation-ready briefing document. Advisor reviews and customizes in 12 minutes.",
    metrics: [
      {value: "12 min", label: "Prep Time/Client", prev: "from 45 min"},
      {value: "73%", label: "Time Savings", prev: ""},
      {value: "200+", label: "Clients Managed", prev: ""},
      {value: "98%", label: "Advisor Satisfaction", prev: ""}
    ],
    tech: ["FastAPI","Supabase","Next.js","n8n","Trigger.dev","Clerk"],
    github: "https://github.com/riiiiiicoooo/review-prep-engine"
  },
  {
    id: "scope-tracker",
    name: "Scope Tracker",
    domain: "Legal Operations",
    stage: "Production",
    tagline: "Engagement Scope Drift Detection",
    description: "Real-time monitoring of legal engagement budgets with automated scope drift detection and change order generation. Built for law firms running fixed-fee engagements.",
    problem: "28% of engagements ran over budget, discovered only at final billing. Partners had no visibility into budget burn rates, and scope creep went undetected until it was too late to negotiate change orders.",
    solution: "Real-time budget tracking with automated drift detection that triggers alerts when engagements diverge from plan. Generates change order proposals with supporting data, enabling recovery before overruns compound.",
    metrics: [
      {value: "11%", label: "Overrun Rate", prev: "from 28%"},
      {value: "$127K", label: "Recovered Q1", prev: ""},
      {value: "4.2 days", label: "Avg Detection Lead", prev: ""},
      {value: "17", label: "Active Engagements", prev: ""}
    ],
    tech: ["FastAPI","Supabase","Next.js","n8n","Trigger.dev","Stripe"],
    github: "https://github.com/riiiiiicoooo/scope-tracker"
  },
  {
    id: "verified-marketplace",
    name: "Verified Services Marketplace",
    domain: "Marketplace",
    stage: "Approved",
    tagline: "Trust-First Two-Sided Marketplace",
    description: "Two-sided marketplace with verification-first onboarding. Suppliers go through credential verification before listing, building buyer trust and enabling premium pricing.",
    problem: "Existing marketplace had 15% supplier verification rate, leading to low buyer trust, high dispute rates, and a race-to-the-bottom pricing dynamic that drove quality suppliers away.",
    solution: "Verification-first supplier onboarding with credential checks, background verification, and performance monitoring. Verified badge creates trust signal that enables premium pricing and attracts quality suppliers.",
    metrics: [
      {value: "4x", label: "Throughput Increase", prev: ""},
      {value: "$15M+", label: "Year 1 GMV Projection", prev: ""},
      {value: "94%", label: "Verification Rate", prev: "from 15%"},
      {value: "<2%", label: "Dispute Rate", prev: "from 8.3%"}
    ],
    tech: ["FastAPI","Supabase","Next.js","Stripe Connect","Clerk","n8n","Trigger.dev","Vercel"],
    github: "https://github.com/riiiiiicoooo/verified-services-marketplace"
  }
];

const DOMAINS = [...new Set(PRODUCTS.map(p => p.domain))];
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
    latency: Array.from({length:24},(_,i)=>({hour:`${i}:00`,p50:Math.floor(40+Math.random()*30),p95:Math.floor(120+Math.random()*80)}))
  },
  "ai-data-ops": {
    throughput: Array.from({length:12},(_,i)=>({week:`W${i+1}`,examples:Math.floor(1800+i*80+Math.random()*300),errorRate:+(Math.max(2.5,8-i*.5+Math.random())).toFixed(1)})),
    qualityDist: [{range:"0-70%",count:12},{range:"70-80%",count:45},{range:"80-90%",count:189},{range:"90-95%",count:312},{range:"95-100%",count:156}],
    annotatorPerf: [{name:"Team A",accuracy:96.2,speed:312},{name:"Team B",accuracy:93.8,speed:287},{name:"Team C",accuracy:97.1,speed:245},{name:"Team D",accuracy:91.4,speed:334}],
    modelImpact: Array.from({length:8},(_,i)=>({version:`v1.${i}`,f1:+(0.72+i*0.025+Math.random()*.01).toFixed(3),dataPoints:(i+1)*12000}))
  },
  "contract-intelligence": {
    dealPipeline: [{status:"Ingested",count:847},{status:"Extracting",count:23},{status:"Reviewing",count:156},{status:"Complete",count:668}],
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
  }
};

// ============================================================================
// DASHBOARD COMPONENTS
// ============================================================================
function AgentGateDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Auth Requests (14-Day)</div>
        <div className="chart-value">6,840 requests</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.authRequests}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="day" tick={{fontSize:10}} interval={2}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="requests" fill="#3b82f6" fillOpacity={.15} stroke="#3b82f6" strokeWidth={2}/>
            <Area type="monotone" dataKey="blocked" fill="#ef4444" fillOpacity={.15} stroke="#ef4444" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Token Lifecycle</div>
        <div className="chart-value">312 active tokens</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.tokenLifecycle} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,value})=>`${name}: ${value}`}>
            {data.tokenLifecycle.map((_,i)=><Cell key={i} fill={[CHART_COLORS.blue,CHART_COLORS.green,CHART_COLORS.gray,CHART_COLORS.red][i]}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Policy Enforcement</div>
        <div className="chart-value">292 enforcements</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.latency}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="hour" tick={{fontSize:10}} interval={5}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="p50" stroke="#22c55e" strokeWidth={2} dot={false}/>
            <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AIDataOpsDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Weekly Throughput & Error Rate</div>
        <div className="chart-value">2,340 examples/day</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.modelImpact}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="version" tick={{fontSize:10}}/><YAxis domain={[0.7,0.95]} tick={{fontSize:10}}/>
            <Tooltip/><Line type="monotone" dataKey="f1" stroke="#3b82f6" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ContractIntelDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Contract Pipeline</div>
        <div className="chart-value">847 contracts ingested</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.riskDist} dataKey="count" nameKey="risk" cx="50%" cy="50%" outerRadius={70} label={({risk,count})=>`${risk}: ${count}`}>
            {data.riskDist.map((d,i)=><Cell key={i} fill={d.color}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Extraction Accuracy Trend</div>
        <div className="chart-value">94.2% current</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.clauseTypes} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="type" tick={{fontSize:10}} width={120}/>
            <Tooltip/><Bar dataKey="count" fill="#8b5cf6" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function EngagementEngineDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Engagement: Personalized vs Control</div>
        <div className="chart-value">+28% lift</div>
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
  );
}

function FieldSalesDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Weekly Visit Trend vs Target</div>
        <div className="chart-value">+43% daily visits</div>
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
  );
}

function FintechOpsDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Transaction Success Rate (14-Day)</div>
        <div className="chart-value">97.8% avg</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.reconciliation} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={70} label={({status,value})=>`${status}: ${value}%`}>
            {data.reconciliation.map((_,i)=><Cell key={i} fill={[CHART_COLORS.green,CHART_COLORS.amber,CHART_COLORS.red][i]}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card">
        <div className="chart-title">Payment Method Volume</div>
        <div className="chart-value">$9.0M processed</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.ledgerHealth}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="day" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="imbalance" fill="#ef4444" fillOpacity={.15} stroke="#ef4444" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function GenAIGovDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">AI Interactions (Weekly)</div>
        <div className="chart-value">43K+ governed</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={data.modelUsage} dataKey="pct" nameKey="model" cx="50%" cy="50%" outerRadius={70} label={({model,pct})=>`${model}: ${pct}%`}>
            {data.modelUsage.map((_,i)=><Cell key={i} fill={[CHART_COLORS.blue,CHART_COLORS.purple,CHART_COLORS.amber][i]}/>)}
          </Pie><Tooltip/></PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function InfraAutoDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Automated vs Manual Deployments</div>
        <div className="chart-value">85% automated</div>
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
  );
}

function IntegrationHealthDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card" style={{gridColumn:"1/-1"}}>
        <div className="chart-title">Provider Health Overview</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.mttiTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Area type="monotone" dataKey="mtti" fill="#3b82f6" fillOpacity={.15} stroke="#3b82f6" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PortfolioIntelDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Query Volume (Weekly)</div>
        <div className="chart-value">2,800+ served</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.responseTime}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="bucket" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="count" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ReviewPrepDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">Prep Time: Manual vs Automated</div>
        <div className="chart-value">73% time savings</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.clientsCovered}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="total" fill="#e5e7eb" radius={[4,4,0,0]}/>
            <Bar dataKey="automated" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ScopeTrackerDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card" style={{gridColumn:"1/-1"}}>
        <div className="chart-title">Engagement Budget Health</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.recovery}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
            <Tooltip/><Bar dataKey="recovered" fill="#22c55e" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MarketplaceDashboard({data}) {
  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <div className="chart-title">GMV Growth (Monthly)</div>
        <div className="chart-value">$15M+ Year 1</div>
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
        <table className="data-table">
          <thead><tr><th>Tier</th><th>Count</th><th>Avg Rev</th><th>Rating</th></tr></thead>
          <tbody>{data.supplierMetrics.map(s=>(
            <tr key={s.tier}><td style={{fontWeight:600}}>{s.tier}</td><td>{s.count}</td><td>${s.avgRevenue.toLocaleString()}</td><td>{s.rating}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
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
};

// ============================================================================
// APP COMPONENTS
// ============================================================================
function Nav({onHome}) {
  return (
    <nav>
      <div className="container">
        <a className="logo" href="#" onClick={e=>{e.preventDefault();onHome()}}>Jacob George</a>
        <div className="nav-links">
          <a href="#" onClick={e=>{e.preventDefault();onHome()}}>Products</a>
          <a href="https://github.com/riiiiiicoooo" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </nav>
  );
}

function ProductCard({product, onClick}) {
  const stageClass = product.stage.toLowerCase().replace(/[- ]/g,'-');
  return (
    <div className="product-card" onClick={onClick}>
      <span className={`card-stage stage-${stageClass}`}>{product.stage}</span>
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

function HomePage({onSelectProduct}) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.domain === filter || p.stage === filter);

  return (
    <>
      <div className="hero">
        <div className="container">
          <h1>Product Portfolio</h1>
          <p>13 products built across fintech, legal AI, healthcare, real estate, and enterprise SaaS. Each with quantified outcomes and interactive dashboards.</p>
          <div className="stats-row">
            <div className="stat"><div className="num">13</div><div className="label">Products Built</div></div>
            <div className="stat"><div className="num">8</div><div className="label">Industries</div></div>
            <div className="stat"><div className="num">7</div><div className="label">In Production</div></div>
            <div className="stat"><div className="num">$35M+</div><div className="label">Combined Value</div></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="filter-bar">
          {["All",...DOMAINS].map(d=>(
            <button key={d} className={`filter-btn ${filter===d?"active":""}`} onClick={()=>setFilter(d)}>{d}</button>
          ))}
        </div>
        <div className="product-grid">
          {filtered.map(p=><ProductCard key={p.id} product={p} onClick={()=>onSelectProduct(p.id)}/>)}
        </div>
      </div>
    </>
  );
}

function ProductDetail({productId, onBack}) {
  const product = PRODUCTS.find(p=>p.id===productId);
  const DashComponent = DASHBOARD_COMPONENTS[productId];
  const dashData = DASHBOARDS[productId];
  const [tab, setTab] = useState("overview");

  if (!product) return <div className="container" style={{padding:"80px 0"}}>Product not found.</div>;

  return (
    <div className="detail-page">
      <div className="container">
        <div className="back-btn" onClick={onBack}>&larr; All Products</div>
        <div className="detail-header">
          <div className="detail-domain">{product.domain} &middot; {product.stage}</div>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-subtitle">{product.description}</div>
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

        <div className="detail-tabs">
          <div className={`detail-tab ${tab==="overview"?"active":""}`} onClick={()=>setTab("overview")}>Overview</div>
          <div className={`detail-tab ${tab==="dashboard"?"active":""}`} onClick={()=>setTab("dashboard")}>Dashboard</div>
          <div className={`detail-tab ${tab==="tech"?"active":""}`} onClick={()=>setTab("tech")}>Tech Stack</div>
        </div>

        {tab === "overview" && (
          <>
            <div className="section">
              <div className="section-title">The Problem</div>
              <div className="section-body"><p>{product.problem}</p></div>
            </div>
            <div className="section">
              <div className="section-title">The Solution</div>
              <div className="section-body"><p>{product.solution}</p></div>
            </div>
          </>
        )}

        {tab === "dashboard" && DashComponent && dashData && (
          <div className="dashboard-section">
            <div className="section-title" style={{marginBottom:20}}>Interactive Dashboard <span style={{fontSize:12,fontWeight:400,color:"var(--muted)"}}>(Dummy Data)</span></div>
            <DashComponent data={dashData}/>
          </div>
        )}

        {tab === "tech" && (
          <div className="section">
            <div className="section-title">Technology Stack</div>
            <div className="tech-list">
              {product.tech.map(t=><span key={t} className="tech-chip">{t}</span>)}
            </div>
            <div style={{marginTop:24}}>
              <a href={product.github} target="_blank" rel="noopener noreferrer" style={{fontSize:14,color:"var(--muted)",borderBottom:"1px solid var(--border)",paddingBottom:2}}>View on GitHub &rarr;</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(()=>{
    const handleHash = ()=>{
      const hash = window.location.hash.slice(1);
      if (hash && PRODUCTS.find(p=>p.id===hash)) setCurrentProduct(hash);
      else setCurrentProduct(null);
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return ()=>window.removeEventListener("hashchange", handleHash);
  },[]);

  const goHome = ()=>{window.location.hash="";setCurrentProduct(null)};
  const goProduct = (id)=>{window.location.hash=id;setCurrentProduct(id);window.scrollTo(0,0)};

  return (
    <>
      <Nav onHome={goHome}/>
      {currentProduct ? <ProductDetail productId={currentProduct} onBack={goHome}/> : <HomePage onSelectProduct={goProduct}/>}
      <footer><div className="container">Jacob George &middot; Consulting PM &middot; <a href="https://github.com/riiiiiicoooo" target="_blank" rel="noopener noreferrer" style={{borderBottom:"1px solid var(--border)"}}>GitHub</a></div></footer>
    </>
  );
}
