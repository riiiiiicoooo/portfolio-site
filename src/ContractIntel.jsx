import React, { useState } from "react";

// ============================================================================
// CONTRACT INTELLIGENCE DEMO - AI-Powered M&A Contract Review Platform
// ============================================================================

// --- COLOR PALETTE ---
const CI = {
  primary: "#4338ca",
  primaryDark: "#3730a3",
  lightBg: "#eef2ff",
  surface: "#ffffff",
  border: "#d1d5db",
  darkText: "#1a1a1a",
  mutedText: "#6b7280",
  green: "#16a34a",
  greenLight: "#dcfce7",
  amber: "#d97706",
  amberLight: "#fef3c7",
  red: "#dc2626",
  redLight: "#fee2e2",
};

// --- SEED DATA ---
const DEAL_DATA = {
  name: "Meridian Capital Acquisition",
  phase: "Due Diligence Phase 2",
  progress: 73,
  documents: 847,
  clauses: 12340,
  risks: 23,
  confidence: 94.2,
};

const DOCUMENTS = [
  { id: 1, name: "Master Purchase Agreement.pdf", pages: 98, status: "Processed", confidence: 96.8 },
  { id: 2, name: "Employment Agreements Bundle.pdf", pages: 45, status: "Processing", confidence: 0 },
  { id: 3, name: "IP Assignment Docs.pdf", pages: 23, status: "Queued", confidence: 0 },
  { id: 4, name: "Lease Portfolio.pdf", pages: 67, status: "Processed", confidence: 94.1 },
  { id: 5, name: "Insurance Certificates.pdf", pages: 12, status: "Processed", confidence: 97.2 },
];

const CLAUSES = [
  { id: 1, title: "Change of Control", risk: "high", confidence: 97, docId: 1 },
  { id: 2, title: "Indemnification Cap", risk: "medium", confidence: 94, docId: 1 },
  { id: 3, title: "Non-Compete Duration", risk: "low", confidence: 98, docId: 1 },
  { id: 4, title: "IP Assignment", risk: "none", confidence: 96, docId: 1 },
  { id: 5, title: "Termination for Cause", risk: "medium", confidence: 91, docId: 1 },
];

const RISK_SUMMARY = [
  { id: 1, title: "Change of Control triggers", risk: "high", docs: 3 },
  { id: 2, title: "Uncapped indemnification", risk: "high", docs: 2 },
  { id: 3, title: "Non-standard termination", risk: "high", docs: 1 },
  { id: 4, title: "IP assignment gaps", risk: "high", docs: 2 },
  { id: 5, title: "Non-compete conflicts", risk: "medium", docs: 4 },
  { id: 6, title: "Payment term mismatches", risk: "medium", docs: 3 },
  { id: 7, title: "Notice period discrepancies", risk: "medium", docs: 2 },
  { id: 8, title: "Liability exclusions", risk: "low", docs: 5 },
  { id: 9, title: "Governing law variations", risk: "low", docs: 4 },
  { id: 10, title: "Amendment procedures", risk: "low", docs: 3 },
  { id: 11, title: "Confidentiality scope", risk: "low", docs: 2 },
];

const SIMILAR_CLAUSES = [
  { id: 101, doc: "Employment Bundle, §3.2", snippet: "Change of control provision triggered upon..." },
  { id: 102, doc: "IP Assignment, §7.1", snippet: "Automatic assignment rights upon control shift..." },
  { id: 103, doc: "Lease Portfolio, §12.4", snippet: "Tenant assignment upon majority ownership change..." },
];

const SEARCH_RESULTS = [
  { id: 1, doc: "Master Purchase Agreement, §12.3", snippet: "Indemnification obligations shall not exceed the lesser of...", match: 94 },
  { id: 2, doc: "Employment Bundle, §8.1", snippet: "Employee indemnification for IP claims shall be capped...", match: 87 },
  { id: 3, doc: "IP Assignment, §5.2", snippet: "Indemnification for third-party IP infringement claims...", match: 82 },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ContractIntelDemo({ onExit }) {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("indemnification");
  const [selectedRiskFilter, setSelectedRiskFilter] = useState("All");

  const getRiskColor = (risk) => {
    if (risk === "high") return CI.red;
    if (risk === "medium") return CI.amber;
    if (risk === "low") return CI.green;
    return "#6b7280";
  };

  const getRiskBgColor = (risk) => {
    if (risk === "high") return CI.redLight;
    if (risk === "medium") return CI.amberLight;
    if (risk === "low") return CI.greenLight;
    return "#f3f4f6";
  };

  // --- RENDER INTRO SCREEN ---
  if (currentScreen === "intro") {
    return (
      <div style={{ minHeight: "100vh", background: CI.lightBg }}>
        <div style={{ background: CI.primary, padding: "20px 24px", color: "#fff" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>CI</div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Contract Intelligence</span>
            <span style={{ marginLeft: "auto", cursor: "pointer", fontSize: 13, opacity: 0.9 }} onClick={onExit}>← Back to Portfolio</span>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ marginBottom: 60 }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: CI.darkText, margin: "0 0 16px 0", lineHeight: 1.2 }}>
              Contract Intelligence Platform
            </h1>
            <p style={{ fontSize: 20, color: CI.mutedText, margin: 0, lineHeight: 1.6 }}>
              AI-powered M&A due diligence automation. Processes 50-80 contracts/hour with 94.2% extraction accuracy.
            </p>
          </div>

          <div style={{ background: CI.surface, borderRadius: 16, padding: 40, marginBottom: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: CI.primary }}>50-80</div>
                <div style={{ fontSize: 13, color: CI.mutedText, marginTop: 4 }}>Contracts/Hour</div>
                <div style={{ fontSize: 11, color: CI.mutedText, marginTop: 8 }}>from 3-5 manual</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: CI.green }}>$2.1M</div>
                <div style={{ fontSize: 13, color: CI.mutedText, marginTop: 4 }}>Annual Savings</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: CI.primary }}>94.2%</div>
                <div style={{ fontSize: 13, color: CI.mutedText, marginTop: 4 }}>Extraction Accuracy</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: CI.green }}>16x</div>
                <div style={{ fontSize: 13, color: CI.mutedText, marginTop: 4 }}>Speed Improvement</div>
              </div>
            </div>

            <div style={{ paddingTop: 32, borderTop: `1px solid ${CI.border}` }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: CI.mutedText, marginBottom: 12, fontWeight: 600 }}>Technology Stack</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["Next.js", "FastAPI", "Supabase", "pgvector", "Claude", "GPT-4", "LangSmith", "Trigger.dev"].map(tech => (
                  <span key={tech} style={{ background: CI.lightBg, color: CI.primary, padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen("dealRoom")}
            style={{
              background: CI.primary, color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px",
              fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all .2s",
            }}
            onMouseOver={e => e.target.style.background = CI.primaryDark}
            onMouseOut={e => e.target.style.background = CI.primary}
          >
            Explore the App →
          </button>
        </div>
      </div>
    );
  }

  // --- DESKTOP WEB APP LAYOUT ---
  if (currentScreen === "dealRoom") {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", flexDirection: "column" }}>
        {/* Top Navigation Bar */}
        <div style={{ background: CI.primary, color: "#fff", padding: "0 32px", height: 64, display: "flex", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>CI</div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Contract Intelligence</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{DEAL_DATA.name}</div>
          <div style={{ marginLeft: "auto", cursor: "pointer", fontSize: 13, opacity: 0.9, display: "flex", alignItems: "center" }} onClick={onExit}>← Back to Portfolio</div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left Sidebar */}
          <div style={{ width: 240, background: CI.surface, borderRight: `1px solid ${CI.border}`, display: "flex", flexDirection: "column", overflow: "auto" }}>
            <div style={{ padding: "16px 0" }}>
              {["Dashboard", "Documents", "Risk Matrix", "Search"].map((item) => {
                const navKey = item.toLowerCase().replace(" ", "");
                return (
                  <div
                    key={item}
                    onClick={() => setActiveNav(navKey)}
                    style={{
                      padding: "12px 20px",
                      cursor: "pointer",
                      background: activeNav === navKey ? CI.lightBg : "transparent",
                      color: activeNav === navKey ? CI.primary : CI.darkText,
                      borderLeft: activeNav === navKey ? `3px solid ${CI.primary}` : "3px solid transparent",
                      fontSize: 13,
                      fontWeight: activeNav === navKey ? 600 : 500,
                      transition: "all .15s",
                    }}
                    onMouseOver={e => {
                      if (activeNav !== navKey) e.currentTarget.style.background = "#f3f4f6";
                    }}
                    onMouseOut={e => {
                      if (activeNav !== navKey) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {item}
                    {item === "Documents" && <span style={{ marginLeft: 4, color: CI.mutedText, fontSize: 12 }}>({DOCUMENTS.length})</span>}
                    {item === "Risk Matrix" && <span style={{ marginLeft: 4, color: CI.mutedText, fontSize: 12 }}>({DEAL_DATA.risks})</span>}
                  </div>
                );
              })}
            </div>

            <div style={{ borderTop: `1px solid ${CI.border}`, marginTop: "auto", padding: "20px" }}>
              <div style={{ fontSize: 11, color: CI.mutedText, fontWeight: 600, marginBottom: 12 }}>DEAL PROGRESS</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: CI.primary, marginBottom: 4 }}>{DEAL_DATA.progress}%</div>
              <div style={{ height: 4, background: CI.lightBg, borderRadius: 2, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${DEAL_DATA.progress}%`, background: CI.primary, borderRadius: 2 }}></div>
              </div>
              <div style={{ fontSize: 11, color: CI.mutedText }}>{DEAL_DATA.phase}</div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, overflow: "auto", background: "#f9fafb" }}>
            {/* Dashboard View */}
            {activeNav === "dashboard" && (
              <div style={{ padding: 32, maxWidth: 1400, margin: "0 auto" }}>
                {/* Stats Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
                  {[
                    { label: "Documents", value: DEAL_DATA.documents, color: CI.primary },
                    { label: "Extracted Clauses", value: DEAL_DATA.clauses, color: CI.primary },
                    { label: "Risk Flags", value: DEAL_DATA.risks, color: CI.red },
                    { label: "Avg Confidence", value: `${DEAL_DATA.confidence}%`, color: CI.green },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background: CI.surface, borderRadius: 12, padding: 20, border: `1px solid ${CI.border}`, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                      <div style={{ fontSize: 12, color: CI.mutedText, fontWeight: 500, marginBottom: 8 }}>{stat.label}</div>
                      <div style={{ fontSize: 32, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Two Column Layout */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                  {/* Recent Uploads */}
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: CI.darkText, marginBottom: 16, margin: "0 0 16px 0" }}>Recent Uploads</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {DOCUMENTS.slice(0, 5).map((doc) => (
                        <div
                          key={doc.id}
                          style={{
                            background: CI.surface,
                            borderRadius: 10,
                            padding: 16,
                            border: `1px solid ${CI.border}`,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                            transition: "all .15s",
                          }}
                          onMouseOver={e => e.currentTarget.style.background = "#f9fafb"}
                          onMouseOut={e => e.currentTarget.style.background = CI.surface}
                        >
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: CI.darkText, marginBottom: 4 }}>{doc.name}</div>
                            <div style={{ fontSize: 12, color: CI.mutedText }}>{doc.pages} pages</div>
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: doc.status === "Processed" ? CI.green : doc.status === "Processing" ? CI.amber : CI.mutedText,
                              background: doc.status === "Processed" ? CI.greenLight : doc.status === "Processing" ? CI.amberLight : "#f3f4f6",
                              padding: "4px 12px",
                              borderRadius: 6,
                            }}
                          >
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Risk Flags */}
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: CI.darkText, margin: "0 0 16px 0" }}>Top Risk Flags</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {RISK_SUMMARY.slice(0, 5).map((risk) => (
                        <div key={risk.id} style={{ background: CI.surface, borderRadius: 10, padding: 16, border: `1px solid ${CI.border}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: CI.darkText, flex: 1 }}>{risk.title}</div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: getRiskColor(risk.risk), padding: "4px 10px", borderRadius: 4, textTransform: "uppercase" }}>
                              {risk.risk}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: CI.mutedText }}>In {risk.docs} documents</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Processing Pipeline */}
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: CI.darkText, margin: "0 0 16px 0" }}>Processing Pipeline</h3>
                  <div style={{ background: CI.surface, borderRadius: 12, padding: 24, border: `1px solid ${CI.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {["Ingest", "Extract", "Analyze", "Review"].map((stage, idx) => (
                      <div key={stage} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: idx <= 2 ? CI.primary : CI.lightBg, color: idx <= 2 ? "#fff" : CI.darkText, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                          {idx + 1}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: CI.darkText, marginLeft: 12 }}>{stage}</div>
                        {idx < 3 && <div style={{ height: 2, flex: 1, background: CI.lightBg, margin: "0 16px", borderRadius: 1 }}></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Documents View */}
            {activeNav === "documents" && (
              <div style={{ padding: 32, maxWidth: 1400, margin: "0 auto" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: CI.darkText, marginBottom: 24, margin: "0 0 24px 0" }}>Documents ({DOCUMENTS.length})</h2>
                <div style={{ background: CI.surface, borderRadius: 12, overflow: "hidden", border: `1px solid ${CI.border}` }}>
                  {/* Table Header */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 16, padding: "16px 20px", background: "#f9fafb", borderBottom: `1px solid ${CI.border}`, fontWeight: 600, fontSize: 12, color: CI.mutedText, textTransform: "uppercase" }}>
                    <div>Name</div>
                    <div>Pages</div>
                    <div>Status</div>
                    <div>Confidence</div>
                    <div>Actions</div>
                  </div>
                  {/* Table Rows */}
                  {DOCUMENTS.map((doc) => (
                    <div key={doc.id}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                          gap: 16,
                          padding: "16px 20px",
                          borderBottom: `1px solid ${CI.border}`,
                          alignItems: "center",
                          cursor: "pointer",
                          background: expandedDoc === doc.id ? CI.lightBg : CI.surface,
                          transition: "all .15s",
                        }}
                        onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                        onMouseOver={e => e.currentTarget.style.background = CI.lightBg}
                        onMouseOut={e => e.currentTarget.style.background = expandedDoc === doc.id ? CI.lightBg : CI.surface}
                      >
                        <div style={{ fontSize: 13, fontWeight: 600, color: CI.darkText }}>{doc.name}</div>
                        <div style={{ fontSize: 13, color: CI.mutedText }}>{doc.pages}</div>
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 600, color: doc.status === "Processed" ? CI.green : doc.status === "Processing" ? CI.amber : CI.mutedText, background: doc.status === "Processed" ? CI.greenLight : doc.status === "Processing" ? CI.amberLight : "#f3f4f6", padding: "4px 10px", borderRadius: 6 }}>
                            {doc.status}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: CI.primary }}>{doc.confidence > 0 ? `${doc.confidence}%` : "–"}</div>
                        <button style={{ background: CI.lightBg, border: `1px solid ${CI.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: CI.primary, cursor: "pointer" }}>View</button>
                      </div>
                      {/* Expanded Clauses */}
                      {expandedDoc === doc.id && (
                        <div style={{ background: "#f9fafb", padding: "16px 20px", borderBottom: `1px solid ${CI.border}` }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: CI.darkText, marginBottom: 12 }}>Extracted Clauses</div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
                            {CLAUSES.map((clause) => (
                              <div key={clause.id} style={{ background: CI.surface, borderRadius: 8, padding: 12, border: `1px solid ${CI.border}` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                                  <div style={{ fontSize: 12, fontWeight: 600, color: CI.darkText }}>{clause.title}</div>
                                  {clause.risk !== "none" && <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: getRiskColor(clause.risk), padding: "2px 8px", borderRadius: 3, textTransform: "uppercase" }}>{clause.risk}</span>}
                                </div>
                                <div style={{ fontSize: 11, color: CI.mutedText }}>Confidence: {clause.confidence}%</div>
                                <div style={{ fontSize: 10, color: CI.mutedText, marginTop: 6 }}>Extracted by Claude</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Matrix View */}
            {activeNav === "riskmatrix" && (
              <div style={{ padding: 32, maxWidth: 1400, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: CI.darkText, margin: 0 }}>Risk Matrix</h2>
                  <button style={{ background: CI.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Export to Excel</button>
                </div>

                {/* Risk Summary */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
                  {[
                    { label: "High Risk", value: RISK_SUMMARY.filter(r => r.risk === "high").length, color: CI.red, bg: CI.redLight },
                    { label: "Medium Risk", value: RISK_SUMMARY.filter(r => r.risk === "medium").length, color: CI.amber, bg: CI.amberLight },
                    { label: "Low Risk", value: RISK_SUMMARY.filter(r => r.risk === "low").length, color: CI.green, bg: CI.greenLight },
                  ].map((item) => (
                    <div key={item.label} style={{ background: item.bg, borderRadius: 12, padding: 24, textAlign: "center" }}>
                      <div style={{ fontSize: 32, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.value}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: item.color, textTransform: "uppercase" }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Risk Cards Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                  {RISK_SUMMARY.map((risk) => (
                    <div key={risk.id} style={{ background: CI.surface, borderRadius: 12, padding: 20, border: `1px solid ${CI.border}`, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: CI.darkText, flex: 1 }}>{risk.title}</div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: getRiskColor(risk.risk), padding: "6px 12px", borderRadius: 4, textTransform: "uppercase" }}>
                          {risk.risk}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: CI.mutedText, marginBottom: 12 }}>Affects {risk.docs} document{risk.docs !== 1 ? "s" : ""}</div>
                      <div style={{ fontSize: 13, color: CI.darkText, lineHeight: 1.5 }}>Review and remediate this risk across affected agreements.</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search View */}
            {activeNav === "search" && (
              <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: CI.darkText, marginBottom: 24, margin: "0 0 24px 0" }}>Search</h2>

                {/* Search Input */}
                <div style={{ marginBottom: 24 }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search across all contracts..."
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: `1px solid ${CI.border}`,
                      padding: "14px 16px",
                      fontSize: 14,
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      background: CI.surface,
                    }}
                  />
                </div>

                {/* Filter Chips */}
                <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                  {["All", "High Risk", "Indemnification", "Non-Compete", "IP Rights"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedRiskFilter(filter)}
                      style={{
                        background: selectedRiskFilter === filter ? CI.primary : CI.surface,
                        color: selectedRiskFilter === filter ? "#fff" : CI.darkText,
                        border: selectedRiskFilter === filter ? "none" : `1px solid ${CI.border}`,
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Search Results */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ fontSize: 12, color: CI.mutedText, fontWeight: 600, textTransform: "uppercase" }}>Results ({SEARCH_RESULTS.length})</div>
                  {SEARCH_RESULTS.map((result) => (
                    <div key={result.id} style={{ background: CI.surface, borderRadius: 10, padding: 16, border: `1px solid ${CI.border}`, cursor: "pointer", transition: "all .15s" }} onMouseOver={e => e.currentTarget.style.background = "#f9fafb"} onMouseOut={e => e.currentTarget.style.background = CI.surface}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: CI.primary }}>{result.doc}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: CI.green }}>{result.match}% match</div>
                      </div>
                      <div style={{ fontSize: 13, color: CI.darkText, lineHeight: 1.6, marginBottom: 12 }}>{result.snippet}</div>
                      <div style={{ display: "flex", gap: 16, fontSize: 11, color: CI.mutedText }}>
                        <span>Risk: High</span>
                        <span>Confidence: {result.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
