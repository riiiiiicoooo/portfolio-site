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
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedClause, setSelectedClause] = useState(null);
  const [searchTerm, setSearchTerm] = useState("indemnification cap");

  const getRiskColor = (risk) => {
    if (risk === "high") return CI.red;
    if (risk === "medium") return CI.amber;
    return CI.green;
  };

  const getRiskBgColor = (risk) => {
    if (risk === "high") return CI.redLight;
    if (risk === "medium") return CI.amberLight;
    return CI.greenLight;
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

  // --- PHONE FRAME WRAPPER ---
  const PhoneFrame = ({ children }) => (
    <div style={{
      maxWidth: 375,
      height: 812,
      margin: "0 auto",
      borderRadius: 40,
      border: `12px solid #000`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      background: CI.surface,
    }}>
      {/* Phone Status Bar */}
      <div style={{
        background: CI.primary,
        color: "#fff",
        padding: "8px 20px",
        fontSize: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 44,
      }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 4 }}>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", background: CI.lightBg }}>
        {children}
      </div>
    </div>
  );

  // --- DEAL ROOM DASHBOARD SCREEN ---
  if (currentScreen === "dealRoom") {
    return (
      <div style={{ minHeight: "100vh", background: CI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: CI.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Deal Header */}
              <div style={{ background: CI.primary, color: "#fff", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{DEAL_DATA.name}</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 12 }}>{DEAL_DATA.phase}</div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${DEAL_DATA.progress}%`, background: "#fff", borderRadius: 3 }}></div>
                </div>
                <div style={{ fontSize: 10, marginTop: 6, opacity: 0.9 }}>{DEAL_DATA.progress}% Complete</div>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <div style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}` }}>
                  <div style={{ fontSize: 11, color: CI.mutedText, marginBottom: 4 }}>Documents</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: CI.primary }}>{DEAL_DATA.documents}</div>
                </div>
                <div style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}` }}>
                  <div style={{ fontSize: 11, color: CI.mutedText, marginBottom: 4 }}>Extracted Clauses</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: CI.primary }}>{DEAL_DATA.clauses}</div>
                </div>
                <div style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}` }}>
                  <div style={{ fontSize: 11, color: CI.mutedText, marginBottom: 4 }}>Risk Flags</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: CI.red }}>{DEAL_DATA.risks}</div>
                </div>
                <div style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}` }}>
                  <div style={{ fontSize: 11, color: CI.mutedText, marginBottom: 4 }}>Avg Confidence</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: CI.green }}>{DEAL_DATA.confidence}%</div>
                </div>
              </div>

              {/* Document List */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: CI.darkText, marginBottom: 12 }}>Recent Uploads</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {DOCUMENTS.map(doc => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDocument(doc);
                        setCurrentScreen("docAnalysis");
                      }}
                      style={{
                        background: CI.surface,
                        borderRadius: 10,
                        padding: 12,
                        border: `1px solid ${CI.border}`,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background = CI.lightBg}
                      onMouseOut={e => e.currentTarget.style.background = CI.surface}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: CI.darkText }}>{doc.name}</div>
                          <div style={{ fontSize: 11, color: CI.mutedText, marginTop: 2 }}>{doc.pages} pages</div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: doc.status === "Processed" ? CI.green : doc.status === "Processing" ? CI.amber : CI.mutedText }}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button
                  onClick={() => setCurrentScreen("riskMatrix")}
                  style={{
                    background: CI.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                  }}
                  onMouseOver={e => e.target.style.background = CI.primaryDark}
                  onMouseOut={e => e.target.style.background = CI.primary}
                >
                  View Risks
                </button>
                <button
                  onClick={() => setCurrentScreen("search")}
                  style={{
                    background: CI.surface, color: CI.primary, border: `1px solid ${CI.border}`, borderRadius: 10, padding: "12px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.background = CI.lightBg}
                  onMouseOut={e => e.currentTarget.style.background = CI.surface}
                >
                  Search Clauses
                </button>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- DOCUMENT ANALYSIS SCREEN ---
  if (currentScreen === "docAnalysis") {
    return (
      <div style={{ minHeight: "100vh", background: CI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: CI.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("dealRoom")}>← Deal Room</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Document Header */}
              <div style={{ background: CI.primary, color: "#fff", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{selectedDocument?.name || "Master Purchase Agreement"}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Document Analysis</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 8px", fontSize: 10, fontWeight: 600 }}>96.8%</div>
                </div>
              </div>

              {/* Extraction Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}` }}>
                  <div style={{ fontSize: 11, color: CI.mutedText, marginBottom: 4 }}>Clauses Extracted</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: CI.primary }}>156</div>
                </div>
                <div style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}` }}>
                  <div style={{ fontSize: 11, color: CI.mutedText, marginBottom: 4 }}>Risk Flags</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: CI.red }}>4</div>
                </div>
                <div style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}`, gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: 11, color: CI.mutedText, marginBottom: 4 }}>Conflicts Detected</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: CI.amber }}>2 potential conflicts</div>
                </div>
              </div>

              {/* Clause List */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: CI.darkText, marginBottom: 12 }}>Key Clauses</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {CLAUSES.map(clause => (
                    <div
                      key={clause.id}
                      onClick={() => {
                        setSelectedClause(clause);
                        setCurrentScreen("clauseDetail");
                      }}
                      style={{
                        background: CI.surface,
                        borderRadius: 10,
                        padding: 12,
                        border: `1px solid ${CI.border}`,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background = CI.lightBg}
                      onMouseOut={e => e.currentTarget.style.background = CI.surface}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: CI.darkText }}>{clause.title}</div>
                          <div style={{ fontSize: 11, color: CI.mutedText, marginTop: 4 }}>Confidence: {clause.confidence}%</div>
                        </div>
                        {clause.risk !== "none" && (
                          <div style={{
                            background: getRiskBgColor(clause.risk),
                            color: getRiskColor(clause.risk),
                            padding: "4px 8px",
                            borderRadius: 4,
                            fontSize: 10,
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}>
                            {clause.risk}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert("Export matrix functionality")}
                style={{
                  width: "100%", background: CI.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                onMouseOver={e => e.target.style.background = CI.primaryDark}
                onMouseOut={e => e.target.style.background = CI.primary}
              >
                Export Matrix
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- CLAUSE DETAIL SCREEN ---
  if (currentScreen === "clauseDetail") {
    return (
      <div style={{ minHeight: "100vh", background: CI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: CI.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("docAnalysis")}>← Document</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Clause Header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: CI.darkText, marginBottom: 12 }}>
                  {selectedClause?.title || "Change of Control"}
                </div>
                <div style={{
                  background: getRiskBgColor(selectedClause?.risk || "high"),
                  color: getRiskColor(selectedClause?.risk || "high"),
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  display: "inline-block",
                }}>
                  {selectedClause?.risk || "high"} Risk
                </div>
              </div>

              {/* Extracted Text */}
              <div style={{ background: CI.surface, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${CI.border}` }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: CI.mutedText, fontWeight: 600, marginBottom: 12 }}>Extracted Text</div>
                <p style={{ fontSize: 12, color: CI.darkText, lineHeight: 1.6, margin: 0 }}>
                  This Agreement and all rights and obligations hereunder shall automatically assign to any person or entity that, directly or indirectly, acquires all or substantially all of the assets or equity interests of the Company, without further consent or action required.
                </p>
              </div>

              {/* AI Analysis */}
              <div style={{ background: CI.lightBg, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${CI.border}` }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: CI.mutedText, fontWeight: 600, marginBottom: 12 }}>AI Analysis</div>
                <p style={{ fontSize: 12, color: CI.darkText, lineHeight: 1.6, margin: 0 }}>
                  This clause allows automatic assignment upon change of control without consent. Combined with Section 8.2 non-compete, this creates a potential conflict with termination rights and may be challenged by third parties.
                </p>
              </div>

              {/* Model Info */}
              <div style={{ background: CI.surface, borderRadius: 10, padding: 12, marginBottom: 20, border: `1px solid ${CI.border}`, fontSize: 11, color: CI.mutedText }}>
                Extracted by Claude | Confidence: {selectedClause?.confidence || 97}% | Verified: GPT-4 cross-check
              </div>

              {/* Similar Clauses */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: CI.darkText, marginBottom: 12 }}>Similar Clauses (3)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {SIMILAR_CLAUSES.map(similar => (
                    <div key={similar.id} style={{ background: CI.surface, borderRadius: 10, padding: 12, border: `1px solid ${CI.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: CI.primary, marginBottom: 4 }}>{similar.doc}</div>
                      <div style={{ fontSize: 11, color: CI.mutedText }}>{similar.snippet}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert("Flagged for review")}
                style={{
                  width: "100%", background: CI.red, color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                onMouseOver={e => e.target.style.background = "#b91c1c"}
                onMouseOut={e => e.target.style.background = CI.red}
              >
                Flag for Review
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- RISK MATRIX SCREEN ---
  if (currentScreen === "riskMatrix") {
    const highRisks = RISK_SUMMARY.filter(r => r.risk === "high").length;
    const mediumRisks = RISK_SUMMARY.filter(r => r.risk === "medium").length;
    const lowRisks = RISK_SUMMARY.filter(r => r.risk === "low").length;

    return (
      <div style={{ minHeight: "100vh", background: CI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: CI.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("dealRoom")}>← Deal Room</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Risk Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                <div style={{ background: CI.redLight, borderRadius: 10, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: CI.red }}>{highRisks}</div>
                  <div style={{ fontSize: 10, color: CI.red, fontWeight: 600, marginTop: 4 }}>HIGH</div>
                </div>
                <div style={{ background: CI.amberLight, borderRadius: 10, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: CI.amber }}>{mediumRisks}</div>
                  <div style={{ fontSize: 10, color: CI.amber, fontWeight: 600, marginTop: 4 }}>MEDIUM</div>
                </div>
                <div style={{ background: CI.greenLight, borderRadius: 10, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: CI.green }}>{lowRisks}</div>
                  <div style={{ fontSize: 10, color: CI.green, fontWeight: 600, marginTop: 4 }}>LOW</div>
                </div>
              </div>

              {/* Risk Items */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: CI.darkText, marginBottom: 12 }}>Risk Items by Severity</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {RISK_SUMMARY.map(risk => (
                    <div
                      key={risk.id}
                      onClick={() => alert(`Risk: ${risk.title}`)}
                      style={{
                        background: CI.surface,
                        borderRadius: 10,
                        padding: 12,
                        border: `1px solid ${CI.border}`,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background = CI.lightBg}
                      onMouseOut={e => e.currentTarget.style.background = CI.surface}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: CI.darkText }}>{risk.title}</div>
                          <div style={{ fontSize: 10, color: CI.mutedText, marginTop: 4 }}>In {risk.docs} documents</div>
                        </div>
                        <div style={{
                          background: getRiskBgColor(risk.risk),
                          color: getRiskColor(risk.risk),
                          padding: "4px 8px",
                          borderRadius: 4,
                          fontSize: 9,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}>
                          {risk.risk}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert("Export to Excel")}
                style={{
                  width: "100%", background: CI.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                onMouseOver={e => e.target.style.background = CI.primaryDark}
                onMouseOut={e => e.target.style.background = CI.primary}
              >
                Export to Excel
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- SEARCH SCREEN ---
  if (currentScreen === "search") {
    return (
      <div style={{ minHeight: "100vh", background: CI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: CI.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("dealRoom")}>← Deal Room</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Search Input */}
              <div style={{ marginBottom: 20 }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search across all clauses..."
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    border: `1px solid ${CI.border}`,
                    padding: "12px",
                    fontSize: 13,
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Search Method Badge */}
              <div style={{
                background: CI.surface,
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 10,
                color: CI.mutedText,
                marginBottom: 20,
                border: `1px solid ${CI.border}`,
                fontWeight: 600,
                display: "inline-block",
              }}>
                BM25 + Semantic + Reranking
              </div>

              {/* Search Results */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: CI.darkText, marginBottom: 12 }}>Results ({SEARCH_RESULTS.length})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {SEARCH_RESULTS.map(result => (
                    <div
                      key={result.id}
                      onClick={() => alert(`Navigate to: ${result.doc}`)}
                      style={{
                        background: CI.surface,
                        borderRadius: 10,
                        padding: 12,
                        border: `1px solid ${CI.border}`,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background = CI.lightBg}
                      onMouseOut={e => e.currentTarget.style.background = CI.surface}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: CI.primary, flex: 1 }}>{result.doc}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: CI.green, marginLeft: 8 }}>{result.match}%</div>
                      </div>
                      <div style={{ fontSize: 11, color: CI.mutedText, lineHeight: 1.4 }}>
                        {result.snippet}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  return null;
}
