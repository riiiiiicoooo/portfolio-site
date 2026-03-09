import React, { useState, useEffect } from "react";

// ============================================================================
// AgentOrch Demo — Agent Orchestration Platform Interactive Demo
// Desktop web app layout: Top nav + sidebar + main content
// Color: Deep violet (#6d28d9) for AI/orchestration theme
// ============================================================================

const COLORS = {
  primary: "#6d28d9",
  primaryLight: "#7c3aed",
  primaryDark: "#5b21b6",
  bg: "#f8f7ff",
  sidebar: "#1e1b4b",
  sidebarHover: "#312e81",
  white: "#ffffff",
  text: "#1e1b4b",
  textLight: "#6b7280",
  border: "#e5e7eb",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
};

const AGENTS = [
  { id: "claims", name: "Claims Processing", model: "Claude 3.5 Sonnet", status: "online", tasks: 1247, avgLatency: 2.1, cost: 99.76, errorRate: 0.8, budgetUsed: 66.5, budgetLimit: 150 },
  { id: "underwriting", name: "Underwriting Support", model: "GPT-4o", status: "online", tasks: 834, avgLatency: 3.4, cost: 116.76, errorRate: 1.2, budgetUsed: 58.4, budgetLimit: 200 },
  { id: "customer_service", name: "Customer Service", model: "Claude Haiku", status: "online", tasks: 3891, avgLatency: 0.8, cost: 77.82, errorRate: 0.3, budgetUsed: 155.6, budgetLimit: 200 },  // Note: low cost model
  { id: "document", name: "Document Processing", model: "Claude 3.5 Sonnet", status: "warning", tasks: 623, avgLatency: 4.2, cost: 68.53, errorRate: 3.1, budgetUsed: 38.1, budgetLimit: 180 },
  { id: "analytics", name: "Analytics & Reports", model: "GPT-4o", status: "online", tasks: 412, avgLatency: 5.1, cost: 65.92, errorRate: 0.5, budgetUsed: 54.9, budgetLimit: 120 },
];

const RECENT_TASKS = [
  { id: "TSK-4821", input: "What's the status of claim CLM-2024-8891?", agent: "customer_service", latency: 0.6, cost: 0.02, status: "success", time: "2 min ago" },
  { id: "TSK-4820", input: "Process batch of 12 new claim forms from Hartford", agent: "document", latency: 4.8, cost: 0.14, status: "success", time: "5 min ago" },
  { id: "TSK-4819", input: "Generate Q4 loss ratio report across all carriers", agent: "analytics", latency: 5.3, cost: 0.18, status: "success", time: "8 min ago" },
  { id: "TSK-4818", input: "Assess risk for renewal POL-2024-APEX-4412", agent: "underwriting", latency: 3.2, cost: 0.14, status: "escalated", time: "12 min ago" },
  { id: "TSK-4817", input: "Review damage estimate for vehicle collision claim", agent: "claims", latency: 2.4, cost: 0.09, status: "success", time: "15 min ago" },
  { id: "TSK-4816", input: "Check coverage for water damage — commercial property", agent: "claims", latency: 2.8, cost: 0.10, status: "review", time: "18 min ago" },
  { id: "TSK-4815", input: "What documents are needed for a WC claim in Texas?", agent: "customer_service", latency: 0.5, cost: 0.01, status: "success", time: "22 min ago" },
  { id: "TSK-4814", input: "Extract terms from 3 endorsement PDFs", agent: "document", latency: 6.1, cost: 0.15, status: "success", time: "25 min ago" },
];

const GUARDRAIL_LOG = [
  { type: "PII Detected", severity: "critical", action: "Blocked", detail: "SSN pattern in claims output", time: "3 min ago" },
  { type: "Coverage Determination", severity: "critical", action: "Escalated", detail: "Agent attempted definitive coverage statement", time: "12 min ago" },
  { type: "Budget Warning", severity: "warning", action: "Alert", detail: "Customer Service agent at 78% daily budget", time: "45 min ago" },
  { type: "Schema Validation", severity: "info", action: "Passed", detail: "Claims output matched expected JSON schema", time: "1 hr ago" },
  { type: "Prompt Injection", severity: "critical", action: "Blocked", detail: "Suspicious override attempt in user input", time: "2 hr ago" },
  { type: "Premium Commitment", severity: "critical", action: "Blocked", detail: "Underwriting agent attempted rate quote", time: "3 hr ago" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Command Center", icon: "⬡" },
  { id: "agents", label: "Agents (5)", icon: "◉" },
  { id: "tasks", label: "Task Queue", icon: "☰" },
  { id: "guardrails", label: "Guardrails", icon: "⛨" },
  { id: "costs", label: "Cost Tracking", icon: "$" },
];

export default function AgentOrchDemo() {
  const [view, setView] = useState("dashboard");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsProcessing(true);

    setTimeout(() => {
      let agent = "customer_service";
      let response = "";
      let routingInfo = "";

      if (userMsg.toLowerCase().includes("claim")) {
        agent = "claims";
        response = "I've routed this to the Claims Processing agent. Claim CLM-2024-8891 is currently in the \"Under Review\" stage. The adjuster assigned is Sarah Chen, and the estimated completion date is March 15, 2026. Current damage estimate: $24,500. Would you like me to pull the full claims file?";
        routingInfo = "Routed to Claims Agent (Claude 3.5 Sonnet) • 2.1s • $0.08";
      } else if (userMsg.toLowerCase().includes("report") || userMsg.toLowerCase().includes("analytics")) {
        agent = "analytics";
        response = "Generating your analytics report now. Q4 2025 loss ratio across all 12 carriers: 62.3% (target: <65%). Combined ratio: 93.1%. Top performer: Meridian Casualty at 54.2%. Underperformer: Pacific Specialty at 78.1% — recommend review at next QBR. Full report will be available in your dashboard within 2 minutes.";
        routingInfo = "Routed to Analytics Agent (GPT-4o) • 5.1s • $0.16";
      } else if (userMsg.toLowerCase().includes("document") || userMsg.toLowerCase().includes("extract")) {
        agent = "document";
        response = "Document processing initiated. I've classified the uploaded files: 2 policy declarations, 1 endorsement. Extracting structured data now — policy numbers, effective dates, limits, and deductibles will be normalized and ready for review in approximately 30 seconds.";
        routingInfo = "Routed to Document Processing Agent (Claude 3.5 Sonnet) • 4.2s • $0.11";
      } else if (userMsg.toLowerCase().includes("risk") || userMsg.toLowerCase().includes("underwrite") || userMsg.toLowerCase().includes("premium")) {
        agent = "underwriting";
        response = "⚠️ This request has been flagged for human review. The Underwriting Support agent has prepared a risk assessment (score: 72/100, moderate risk), but premium commitments require underwriter approval per compliance policy. The assessment and supporting data have been queued for Senior Underwriter Michael Torres.";
        routingInfo = "Routed to Underwriting Agent (GPT-4o) • 3.4s • $0.14 • ESCALATED";
      } else {
        response = "I can help with that. Based on our records, your account shows 3 active policies across property and casualty lines. Your next renewal date is April 1, 2026 for POL-2024-APEX-3318. Is there anything specific about your coverage you'd like to know?";
        routingInfo = "Routed to Customer Service Agent (Claude Haiku) • 0.8s • $0.02";
      }

      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: response,
        agent,
        routingInfo,
      }]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Top Nav */}
      <div style={{ background: COLORS.sidebar, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: COLORS.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>AO</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.5px" }}>Agent Orchestration Platform</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Apex Financial Services — 12 Carrier Partnerships</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, opacity: 0.7 }}>5 agents online</span>
          <span style={{ fontSize: 12, background: COLORS.success, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>System Healthy</span>
          <a href="#" onClick={e => { e.preventDefault(); window.location.hash = ""; }} style={{ color: "#a5b4fc", fontSize: 12, textDecoration: "none" }}>← Portfolio</a>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: COLORS.sidebar, padding: "16px 0", flexShrink: 0 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item.id}
              onClick={() => { setView(item.id); setSelectedAgent(null); }}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                color: view === item.id ? "#fff" : "#a5b4fc",
                background: view === item.id ? COLORS.sidebarHover : "transparent",
                borderLeft: view === item.id ? `3px solid ${COLORS.primaryLight}` : "3px solid transparent",
                display: "flex", alignItems: "center", gap: 10,
                fontSize: 13, fontWeight: view === item.id ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
              {item.label}
            </div>
          ))}

          <div style={{ margin: "20px 16px", padding: "12px", background: "rgba(109,40,217,0.15)", borderRadius: 8, fontSize: 11, color: "#c4b5fd" }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Today's Spend</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>$428.79</div>
            <div style={{ marginTop: 4 }}>Budget: $700/day</div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 6, marginTop: 6 }}>
              <div style={{ background: COLORS.primaryLight, width: "61.3%", height: "100%", borderRadius: 4 }} />
            </div>
            <div style={{ marginTop: 4 }}>61.3% utilized</div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
          {view === "dashboard" && <DashboardView onSelectAgent={a => { setSelectedAgent(a); setView("agents"); }} chatInput={chatInput} setChatInput={setChatInput} chatMessages={chatMessages} isProcessing={isProcessing} onSend={simulateChat} />}
          {view === "agents" && <AgentsView selectedAgent={selectedAgent} onSelectAgent={setSelectedAgent} />}
          {view === "tasks" && <TasksView />}
          {view === "guardrails" && <GuardrailsView />}
          {view === "costs" && <CostsView />}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Dashboard View — Command Center
// ============================================================================
function DashboardView({ onSelectAgent, chatInput, setChatInput, chatMessages, isProcessing, onSend }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, color: COLORS.text }}>Command Center</h2>
        <p style={{ margin: "4px 0 0", color: COLORS.textLight, fontSize: 13 }}>Real-time orchestration overview — Apex Financial Services</p>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Tasks Today", value: "7,007", sub: "+12% vs yesterday", color: COLORS.primary },
          { label: "Avg Latency", value: "2.4s", sub: "p95: 6.8s", color: COLORS.info },
          { label: "Completion Rate", value: "94.2%", sub: "Target: 90%", color: COLORS.success },
          { label: "Daily Spend", value: "$428.79", sub: "$700 budget (61%)", color: COLORS.warning },
          { label: "Escalations", value: "3", sub: "2 pending review", color: COLORS.danger },
        ].map((kpi, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 11, color: COLORS.textLight, marginBottom: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 2 }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Two Column: Agent Status + Chat */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Agent Status */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Agent Status</div>
          {AGENTS.map(agent => (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: agent.status === "online" ? COLORS.success : COLORS.warning }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{agent.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textLight }}>{agent.model}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{agent.tasks.toLocaleString()} tasks</div>
                <div style={{ fontSize: 11, color: COLORS.textLight }}>{agent.avgLatency}s avg</div>
              </div>
            </div>
          ))}
        </div>

        {/* Supervisor Chat */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Supervisor — Try a Request</div>
          <div style={{ flex: 1, minHeight: 200, maxHeight: 280, overflow: "auto", marginBottom: 12, padding: 8, background: COLORS.bg, borderRadius: 8 }}>
            {chatMessages.length === 0 && (
              <div style={{ color: COLORS.textLight, fontSize: 12, padding: 16, textAlign: "center" }}>
                Try: "What's the status of claim CLM-2024-8891?" or "Generate Q4 loss ratio report"
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                    background: msg.role === "user" ? COLORS.info : COLORS.primary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: "#fff", fontWeight: 600,
                  }}>
                    {msg.role === "user" ? "U" : "S"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{msg.content}</div>
                    {msg.routingInfo && (
                      <div style={{ fontSize: 10, color: COLORS.primary, marginTop: 4, fontStyle: "italic" }}>
                        {msg.routingInfo}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 600 }}>S</div>
                <div style={{ fontSize: 12, color: COLORS.textLight }}>Classifying intent → Routing to agent...</div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onSend()}
              placeholder="Ask the supervisor agent..."
              style={{ flex: 1, padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12, outline: "none" }}
            />
            <button onClick={onSend} style={{ padding: "8px 16px", background: COLORS.primary, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Send</button>
          </div>
        </div>
      </div>

      {/* Orchestration Flow Visualization */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Orchestration Flow</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
          {[
            { label: "Request", sub: "API Gateway", color: COLORS.textLight },
            { label: "Classify", sub: "Haiku (<200ms)", color: COLORS.primary },
            { label: "Guardrails", sub: "Pre-check", color: COLORS.warning },
            { label: "Route", sub: "Supervisor", color: COLORS.primary },
            { label: "Execute", sub: "Agent(s)", color: COLORS.success },
            { label: "Guardrails", sub: "Post-check", color: COLORS.warning },
            { label: "Response", sub: "Aggregated", color: COLORS.info },
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: "center", padding: "8px 12px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${step.color}15`, border: `2px solid ${step.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontSize: 11, fontWeight: 700, color: step.color }}>{i + 1}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>{step.label}</div>
                <div style={{ fontSize: 10, color: COLORS.textLight }}>{step.sub}</div>
              </div>
              {i < 6 && <div style={{ width: 32, height: 2, background: COLORS.border, flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Recent Tasks</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
              {["ID", "Input", "Agent", "Latency", "Cost", "Status", "Time"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "8px 6px", color: COLORS.textLight, fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_TASKS.slice(0, 6).map(task => (
              <tr key={task.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "8px 6px", fontFamily: "monospace", fontSize: 11 }}>{task.id}</td>
                <td style={{ padding: "8px 6px", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{task.input}</td>
                <td style={{ padding: "8px 6px" }}>
                  <span style={{ background: `${COLORS.primary}15`, color: COLORS.primary, padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>{task.agent}</span>
                </td>
                <td style={{ padding: "8px 6px" }}>{task.latency}s</td>
                <td style={{ padding: "8px 6px" }}>${task.cost.toFixed(2)}</td>
                <td style={{ padding: "8px 6px" }}>
                  <span style={{
                    padding: "2px 6px", borderRadius: 4, fontSize: 11, fontWeight: 500,
                    background: task.status === "success" ? `${COLORS.success}15` : task.status === "escalated" ? `${COLORS.danger}15` : `${COLORS.warning}15`,
                    color: task.status === "success" ? COLORS.success : task.status === "escalated" ? COLORS.danger : COLORS.warning,
                  }}>{task.status}</span>
                </td>
                <td style={{ padding: "8px 6px", color: COLORS.textLight }}>{task.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// Agents View — Detailed agent management
// ============================================================================
function AgentsView({ selectedAgent, onSelectAgent }) {
  const agent = selectedAgent || AGENTS[0];

  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: COLORS.text }}>Agent Management</h2>
      <p style={{ margin: "0 0 20px", color: COLORS.textLight, fontSize: 13 }}>Monitor and manage specialized AI agents</p>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}>
        {/* Agent List */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 12, border: `1px solid ${COLORS.border}` }}>
          {AGENTS.map(a => (
            <div
              key={a.id}
              onClick={() => onSelectAgent(a)}
              style={{
                padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 4,
                background: agent.id === a.id ? `${COLORS.primary}10` : "transparent",
                border: agent.id === a.id ? `1px solid ${COLORS.primary}30` : "1px solid transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.status === "online" ? COLORS.success : COLORS.warning }} />
                <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 2, marginLeft: 16 }}>{a.model}</div>
            </div>
          ))}
        </div>

        {/* Agent Detail */}
        <div>
          <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18 }}>{agent.name}</h3>
                <div style={{ fontSize: 13, color: COLORS.textLight, marginTop: 4 }}>Model: {agent.model} • Agent ID: {agent.id}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{
                  padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                  background: agent.status === "online" ? `${COLORS.success}15` : `${COLORS.warning}15`,
                  color: agent.status === "online" ? COLORS.success : COLORS.warning,
                }}>{agent.status.toUpperCase()}</span>
                <span style={{ padding: "4px 10px", borderRadius: 12, fontSize: 12, background: `${COLORS.info}15`, color: COLORS.info }}>Circuit: CLOSED</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "Tasks Today", value: agent.tasks.toLocaleString(), color: COLORS.primary },
                { label: "Avg Latency", value: `${agent.avgLatency}s`, color: COLORS.info },
                { label: "Error Rate", value: `${agent.errorRate}%`, color: agent.errorRate > 2 ? COLORS.danger : COLORS.success },
                { label: "Daily Cost", value: `$${agent.cost.toFixed(2)}`, color: COLORS.warning },
              ].map((m, i) => (
                <div key={i} style={{ padding: 12, background: COLORS.bg, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: COLORS.textLight, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Usage */}
          <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Budget Utilization</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                  <span>${agent.budgetUsed.toFixed(2)} spent</span>
                  <span>${agent.budgetLimit.toFixed(2)} limit</span>
                </div>
                <div style={{ background: COLORS.bg, borderRadius: 6, height: 12 }}>
                  <div style={{
                    background: (agent.budgetUsed / agent.budgetLimit) > 0.8 ? COLORS.danger : COLORS.primary,
                    width: `${Math.min(100, (agent.budgetUsed / agent.budgetLimit) * 100)}%`,
                    height: "100%", borderRadius: 6, transition: "width 0.3s",
                  }} />
                </div>
                <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 4 }}>
                  {((agent.budgetUsed / agent.budgetLimit) * 100).toFixed(1)}% utilized • Alert threshold: 80%
                </div>
              </div>
            </div>
          </div>

          {/* Agent Tools */}
          <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Registered Tools</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(agent.id === "claims" ? ["database_query", "document_search", "claims_api"] :
                agent.id === "underwriting" ? ["database_query", "risk_model", "policy_lookup"] :
                agent.id === "customer_service" ? ["faq_search", "status_lookup", "ticket_create"] :
                agent.id === "document" ? ["ocr_extract", "document_classify", "data_normalize"] :
                ["database_query", "report_generate", "trend_analyze"]
              ).map(tool => (
                <span key={tool} style={{ padding: "4px 10px", background: COLORS.bg, borderRadius: 6, fontSize: 12, fontFamily: "monospace", color: COLORS.text }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Tasks View — Task Queue
// ============================================================================
function TasksView() {
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: COLORS.text }}>Task Queue</h2>
      <p style={{ margin: "0 0 20px", color: COLORS.textLight, fontSize: 13 }}>All orchestrated tasks with routing, cost, and status details</p>

      <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
              {["Task ID", "User Input", "Routed Agent", "Latency", "Cost", "Tokens", "Status", "Time"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 6px", color: COLORS.textLight, fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_TASKS.map(task => (
              <tr key={task.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "10px 6px", fontFamily: "monospace", fontSize: 11, color: COLORS.primary }}>{task.id}</td>
                <td style={{ padding: "10px 6px", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{task.input}</td>
                <td style={{ padding: "10px 6px" }}>
                  <span style={{ background: `${COLORS.primary}12`, color: COLORS.primary, padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{task.agent}</span>
                </td>
                <td style={{ padding: "10px 6px" }}>{task.latency}s</td>
                <td style={{ padding: "10px 6px", fontWeight: 500 }}>${task.cost.toFixed(2)}</td>
                <td style={{ padding: "10px 6px", color: COLORS.textLight }}>{Math.round(task.cost * 15000)}</td>
                <td style={{ padding: "10px 6px" }}>
                  <span style={{
                    padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 500,
                    background: task.status === "success" ? `${COLORS.success}15` : task.status === "escalated" ? `${COLORS.danger}15` : `${COLORS.warning}15`,
                    color: task.status === "success" ? COLORS.success : task.status === "escalated" ? COLORS.danger : COLORS.warning,
                  }}>{task.status}</span>
                </td>
                <td style={{ padding: "10px 6px", color: COLORS.textLight }}>{task.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// Guardrails View
// ============================================================================
function GuardrailsView() {
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: COLORS.text }}>Guardrail Monitor</h2>
      <p style={{ margin: "0 0 20px", color: COLORS.textLight, fontSize: 13 }}>Deterministic safety and compliance checks — all decisions are auditable</p>

      {/* Guardrail Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Checks", value: "14,208", sub: "Today", color: COLORS.primary },
          { label: "Blocked", value: "23", sub: "0.16% block rate", color: COLORS.danger },
          { label: "Escalated", value: "8", sub: "Sent to human review", color: COLORS.warning },
          { label: "False Positives", value: "2", sub: "0.014% FP rate", color: COLORS.info },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 11, color: COLORS.textLight }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Five-Layer Breakdown */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Five-Layer Guardrail System</div>
        {[
          { layer: "1. PII Detection", desc: "Regex-based SSN, credit card, email, phone detection", checks: 14208, blocked: 8, status: "Active" },
          { layer: "2. Budget Enforcement", desc: "Per-agent daily limits with circuit breakers", checks: 7007, blocked: 0, status: "Active" },
          { layer: "3. Schema Validation", desc: "JSON schema validation on agent outputs", checks: 7007, blocked: 3, status: "Active" },
          { layer: "4. Compliance Rules", desc: "Insurance-specific: no unauthorized coverage determinations", checks: 2081, blocked: 7, status: "Active" },
          { layer: "5. Content Filtering", desc: "Prompt injection detection, prohibited patterns", checks: 14208, blocked: 5, status: "Active" },
        ].map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${COLORS.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: COLORS.primary, marginRight: 12 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{l.layer}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight }}>{l.desc}</div>
            </div>
            <div style={{ textAlign: "right", marginRight: 20 }}>
              <div style={{ fontSize: 12 }}>{l.checks.toLocaleString()} checks</div>
              <div style={{ fontSize: 11, color: l.blocked > 0 ? COLORS.danger : COLORS.success }}>{l.blocked} blocked</div>
            </div>
            <span style={{ padding: "2px 8px", borderRadius: 8, fontSize: 11, background: `${COLORS.success}15`, color: COLORS.success, fontWeight: 500 }}>{l.status}</span>
          </div>
        ))}
      </div>

      {/* Recent Guardrail Events */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Recent Events</div>
        {GUARDRAIL_LOG.map((event, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < GUARDRAIL_LOG.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", marginRight: 12, flexShrink: 0,
              background: event.severity === "critical" ? COLORS.danger : event.severity === "warning" ? COLORS.warning : COLORS.info,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}><strong>{event.type}</strong> — {event.detail}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight }}>{event.time}</div>
            </div>
            <span style={{
              padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 500,
              background: event.action === "Blocked" ? `${COLORS.danger}15` : event.action === "Escalated" ? `${COLORS.warning}15` : `${COLORS.success}15`,
              color: event.action === "Blocked" ? COLORS.danger : event.action === "Escalated" ? COLORS.warning : COLORS.success,
            }}>{event.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Costs View — Cost Tracking & Attribution
// ============================================================================
function CostsView() {
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: COLORS.text }}>Cost Tracking</h2>
      <p style={{ margin: "0 0 20px", color: COLORS.textLight, fontSize: 13 }}>Per-agent, per-model cost attribution with anomaly detection</p>

      {/* Cost Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Today's Spend", value: "$428.79", sub: "Budget: $700 (61.3%)", color: COLORS.primary },
          { label: "MTD Spend", value: "$8,247", sub: "vs $12,800 last month (-36%)", color: COLORS.success },
          { label: "Avg Cost/Task", value: "$0.061", sub: "Target: <$0.12", color: COLORS.info },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 11, color: COLORS.textLight }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Cost by Agent */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Cost by Agent (Today)</div>
        {AGENTS.map(agent => {
          const pct = (agent.cost / 428.79) * 100;
          return (
            <div key={agent.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 500 }}>{agent.name}</span>
                <span>${agent.cost.toFixed(2)} ({pct.toFixed(1)}%)</span>
              </div>
              <div style={{ background: COLORS.bg, borderRadius: 4, height: 8 }}>
                <div style={{ background: COLORS.primary, width: `${pct}%`, height: "100%", borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 10, color: COLORS.textLight, marginTop: 2 }}>
                {agent.tasks.toLocaleString()} tasks • ${(agent.cost / agent.tasks).toFixed(3)}/task avg • {agent.model}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cost by Provider */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>By Provider</div>
          {[
            { provider: "Anthropic (Claude)", amount: 246.11, pct: 57.4, models: "Sonnet + Haiku" },
            { provider: "OpenAI (GPT-4o)", amount: 182.68, pct: 42.6, models: "GPT-4o" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i === 0 ? `1px solid ${COLORS.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.provider}</div>
                <div style={{ fontSize: 11, color: COLORS.textLight }}>{p.models}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>${p.amount.toFixed(2)}</div>
                <div style={{ fontSize: 11, color: COLORS.textLight }}>{p.pct}% of total</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Cost Savings (vs. Pre-Orchestration)</div>
          <div style={{ textAlign: "center", padding: 20 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.success }}>60%</div>
            <div style={{ fontSize: 14, color: COLORS.text, marginTop: 4 }}>Monthly LLM Cost Reduction</div>
            <div style={{ fontSize: 12, color: COLORS.textLight, marginTop: 8 }}>$47K/month → $19K/month</div>
            <div style={{ fontSize: 12, color: COLORS.textLight }}>$28K/month saved through:</div>
            <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 8, lineHeight: 1.8 }}>
              Shared knowledge base (no redundant processing)<br />
              Model routing (Haiku for simple, Sonnet/GPT-4o for complex)<br />
              Prompt caching (37% cache hit rate)<br />
              Budget caps preventing runaway spend
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
