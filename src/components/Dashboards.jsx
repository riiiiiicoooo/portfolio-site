import React from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart
} from "recharts";

// ============================================================================
// CONSTANTS
// ============================================================================
const CHART_COLORS = {blue:"#3b82f6",green:"#22c55e",amber:"#f59e0b",red:"#ef4444",purple:"#8b5cf6",cyan:"#06b6d4",gray:"#9ca3af"};
const COLORS = ["#111","#3b82f6","#8b5cf6","#22c55e","#f59e0b","#ef4444","#06b6d4","#ec4899"];

// ============================================================================
// DATA PIPELINE COMPONENT
// ============================================================================
export function DataPipeline({stages}) {
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

// ============================================================================
// DASHBOARD COMPONENTS MAP
// ============================================================================
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

export default DASHBOARD_COMPONENTS;
