// ============================================================================
// DUMMY DASHBOARD DATA - Extracted from App.jsx
// ============================================================================

export default {
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
