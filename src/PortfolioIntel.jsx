import React, { useState } from "react";

// ============================================================================
// PORTFOLIOINTEL DEMO - Natural Language Real Estate Data Querying Platform
// ============================================================================

// --- COLOR PALETTE ---
const PI = {
  primary: "#0f766e",
  primaryDark: "#0d5f58",
  lightBg: "#ecfdf5",
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
const PROPERTIES = [
  { id: 1, name: "Buckhead Tower", type: "Class A Office", occupancy: 98.7, noi: 4.2, capRate: 6.8, leaseExpiry: "Q3 2027", sqft: 185000 },
  { id: 2, name: "Midtown Plaza", type: "Mixed-Use", occupancy: 97.1, noi: 3.8, capRate: 7.1, leaseExpiry: "Q2 2026", sqft: 142000 },
  { id: 3, name: "Riverside Commons", type: "Class B Office", occupancy: 86.3, noi: 2.1, capRate: 5.9, leaseExpiry: "Q1 2027", sqft: 98000 },
];

const TENANTS = {
  1: [
    { id: 1, name: "Meridian Partners", sqft: 12500, leaseEnd: "Dec 2027", monthlyRent: 45000 },
    { id: 2, name: "TechVenture Inc", sqft: 8200, leaseEnd: "Jun 2026", monthlyRent: 28700 },
    { id: 3, name: "Atlas Consulting", sqft: 6800, leaseEnd: "Mar 2027", monthlyRent: 23800 },
    { id: 4, name: "Global Analytics", sqft: 5400, leaseEnd: "Sep 2028", monthlyRent: 18900 },
    { id: 5, name: "Capital Strategies", sqft: 4200, leaseEnd: "Jan 2026", monthlyRent: 14700 },
  ],
  2: [
    { id: 1, name: "NextGen Tech", sqft: 9800, leaseEnd: "Aug 2027", monthlyRent: 34300 },
    { id: 2, name: "Urban Living Co", sqft: 7200, leaseEnd: "Nov 2025", monthlyRent: 25200 },
    { id: 3, name: "Finance First", sqft: 5600, leaseEnd: "May 2026", monthlyRent: 19600 },
  ],
  3: [
    { id: 1, name: "Regional Bureau", sqft: 8100, leaseEnd: "Apr 2027", monthlyRent: 28300 },
    { id: 2, name: "Support Services", sqft: 5200, leaseEnd: "Jul 2026", monthlyRent: 18200 },
  ],
};

const DOCUMENTS = [
  { id: 1, title: "Phase II Environmental Report - Buckhead Tower", relevance: 94, snippet: "No contamination detected. Soil samples within EPA standards..." },
  { id: 2, title: "Lease Amendment 2024 - Environmental Clause", relevance: 87, snippet: "Tenant responsible for hazardous materials disclosure..." },
  { id: 3, title: "Property Inspection Notes Q4", relevance: 79, snippet: "HVAC compliance verified, asbestos abatement completed..." },
];

const RECENT_QUERIES = [
  { id: 1, query: "What's our Q3 lease expiration risk?", date: "Today" },
  { id: 2, query: "Compare occupancy trends YoY", date: "Yesterday" },
  { id: 3, query: "Show maintenance costs by property", date: "Mar 6" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PortfolioIntelDemo({ onExit }) {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("environmental compliance for Buckhead Tower");

  // --- RENDER INTRO SCREEN ---
  if (currentScreen === "intro") {
    return (
      <div style={{ minHeight: "100vh", background: PI.lightBg }}>
        <div style={{ background: PI.primary, padding: "20px 24px", color: "#fff" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>PI</div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Portfolio Intelligence</span>
            <span style={{ marginLeft: "auto", cursor: "pointer", fontSize: 13, opacity: 0.9 }} onClick={onExit}>← Back to Portfolio</span>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ marginBottom: 60 }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: PI.darkText, margin: "0 0 16px 0", lineHeight: 1.2 }}>
              Portfolio Intelligence Hub
            </h1>
            <p style={{ fontSize: 20, color: PI.mutedText, margin: 0, lineHeight: 1.6 }}>
              Natural language querying for real estate data. Sub-30-second answers replacing 24-48 hour analyst turnaround.
            </p>
          </div>

          <div style={{ background: PI.surface, borderRadius: 16, padding: 40, marginBottom: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: PI.green }}>&lt;30s</div>
                <div style={{ fontSize: 13, color: PI.mutedText, marginTop: 4 }}>Query Turnaround</div>
                <div style={{ fontSize: 11, color: PI.amber, marginTop: 2 }}>from 24-48 hours</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: PI.primary }}>91.3%</div>
                <div style={{ fontSize: 13, color: PI.mutedText, marginTop: 4 }}>SQL Accuracy</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: PI.green }}>2,800+</div>
                <div style={{ fontSize: 13, color: PI.mutedText, marginTop: 4 }}>Queries Served</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: PI.primary }}>4.6/5</div>
                <div style={{ fontSize: 13, color: PI.mutedText, marginTop: 4 }}>User Satisfaction</div>
              </div>
            </div>

            <div style={{ paddingTop: 32, borderTop: `1px solid ${PI.border}` }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: PI.mutedText, marginBottom: 12, fontWeight: 600 }}>Technology Stack</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["FastAPI", "Snowflake", "Supabase", "pgvector", "Claude API", "Cohere", "Vercel", "Playwright"].map(tech => (
                  <span key={tech} style={{ background: PI.lightBg, color: PI.primary, padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen("dashboard")}
            style={{
              background: PI.primary, color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px",
              fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all .2s",
            }}
            onMouseOver={e => e.target.style.background = PI.primaryDark}
            onMouseOut={e => e.target.style.background = PI.primary}
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
      background: PI.surface,
    }}>
      <div style={{
        background: PI.primary,
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

      <div style={{ flex: 1, overflow: "auto", background: PI.lightBg }}>
        {children}
      </div>
    </div>
  );

  // --- DASHBOARD SCREEN ---
  if (currentScreen === "dashboard") {
    return (
      <div style={{ minHeight: "100vh", background: PI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Portfolio Header */}
              <div style={{ background: PI.primary, color: "#fff", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Parkview Capital Portfolio</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>87 Properties | $150M+ Operating Budget</div>
              </div>

              {/* Quick Query Suggestions */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: PI.mutedText, marginBottom: 8, textTransform: "uppercase" }}>Quick Queries</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Vacancy rates by region", "Top performing assets", "Lease expirations Q2", "Maintenance costs YoY"].map(query => (
                    <div key={query} style={{ background: PI.surface, border: `1px solid ${PI.border}`, color: PI.primary, padding: "6px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: "pointer", transition: "all .15s" }}
                      onMouseOver={e => { e.currentTarget.style.background = PI.lightBg; e.currentTarget.style.borderColor = PI.primary; }}
                      onMouseOut={e => { e.currentTarget.style.background = PI.surface; e.currentTarget.style.borderColor = PI.border; }}
                    >
                      {query}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat History */}
              <div style={{ flex: 1, marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {/* User Message */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: PI.primary, color: "#fff", borderRadius: 12, padding: "10px 12px", maxWidth: "85%", fontSize: 13 }}>
                    What's our current occupancy rate across the Southeast portfolio?
                  </div>
                </div>

                {/* AI Response */}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 12, padding: "12px", maxWidth: "85%", fontSize: 12 }}>
                    <div style={{ marginBottom: 8, lineHeight: 1.5 }}>The Southeast portfolio (23 properties) has a weighted average occupancy rate of <strong>94.2%</strong>, up from 91.8% last quarter.</div>
                    <div style={{ fontSize: 11, color: PI.mutedText, marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${PI.border}` }}>
                      Top performers: <strong>Buckhead Tower</strong> (98.7%), <strong>Midtown Plaza</strong> (97.1%). Below target: <strong>Riverside Commons</strong> (86.3%).
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ background: PI.greenLight, color: PI.green, padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>91% Confidence</span>
                      <span style={{ background: PI.amberLight, color: PI.amber, padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>SQL Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Ask a question..."
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: `1px solid ${PI.border}`,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <button style={{
                  background: PI.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px 14px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                  onMouseOver={e => e.target.style.background = PI.primaryDark}
                  onMouseOut={e => e.target.style.background = PI.primary}
                >
                  →
                </button>
              </div>

              {/* Nav Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
                <button
                  onClick={() => setCurrentScreen("documents")}
                  style={{
                    background: PI.surface, color: PI.primary, border: `1px solid ${PI.border}`, borderRadius: 8, padding: "10px",
                    fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                  }}
                  onMouseOver={e => { e.target.style.background = PI.lightBg; }}
                  onMouseOut={e => { e.target.style.background = PI.surface; }}
                >
                  📄 Documents
                </button>
                <button
                  onClick={() => setCurrentScreen("properties")}
                  style={{
                    background: PI.surface, color: PI.primary, border: `1px solid ${PI.border}`, borderRadius: 8, padding: "10px",
                    fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                  }}
                  onMouseOver={e => { e.target.style.background = PI.lightBg; }}
                  onMouseOut={e => { e.target.style.background = PI.surface; }}
                >
                  🏢 Properties
                </button>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- QUERY DETAIL SCREEN ---
  if (currentScreen === "queryDetail") {
    return (
      <div style={{ minHeight: "100vh", background: PI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
              {/* Back Button */}
              <div style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={() => setCurrentScreen("dashboard")}>
                ← Back to Dashboard
              </div>

              {/* Step Indicators */}
              <div style={{ fontSize: 11, fontWeight: 600, color: PI.mutedText }}>
                Intent → Table Mapping → SQL Generation → Validation → Execution → Response
              </div>

              {/* SQL Block */}
              <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 10, padding: 12, fontFamily: "monospace", fontSize: 10, overflow: "auto", color: PI.darkText }}>
                <div style={{ color: PI.primary, fontWeight: 600 }}>SELECT</div>
                <div style={{ marginLeft: 12, color: PI.mutedText }}>p.name, l.tenant_count, l.avg_occupancy</div>
                <div style={{ color: PI.primary, fontWeight: 600 }}>FROM</div>
                <div style={{ marginLeft: 12, color: PI.mutedText }}>properties p</div>
                <div style={{ color: PI.primary, fontWeight: 600 }}>JOIN</div>
                <div style={{ marginLeft: 12, color: PI.mutedText }}>leases l ON p.id = l.property_id</div>
                <div style={{ color: PI.primary, fontWeight: 600 }}>WHERE</div>
                <div style={{ marginLeft: 12, color: PI.mutedText }}>p.region = 'Southeast'</div>
              </div>

              {/* Execution Stats */}
              <div style={{ background: PI.amberLight, border: `1px solid ${PI.amber}`, borderRadius: 8, padding: 10, fontSize: 11 }}>
                <div style={{ color: PI.darkText, fontWeight: 600, marginBottom: 4 }}>Execution: 0.8s</div>
                <div style={{ color: PI.mutedText, fontSize: 10 }}>3 tables joined | 23 rows scanned</div>
              </div>

              {/* Semantic Layer */}
              <div style={{ background: PI.greenLight, border: `1px solid ${PI.green}`, borderRadius: 8, padding: 10, fontSize: 11 }}>
                <div style={{ color: PI.darkText, fontWeight: 600 }}>KPI: occupancy_rate</div>
                <div style={{ color: PI.mutedText, fontSize: 10 }}>Canonical definition applied</div>
              </div>

              {/* Results Table */}
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: PI.darkText, marginBottom: 8 }}>Results (5 properties)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {PROPERTIES.map(prop => (
                    <div key={prop.id} style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: PI.darkText }}>{prop.name}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: PI.green }}>{prop.occupancy}%</div>
                      </div>
                      <div style={{ fontSize: 10, color: PI.mutedText }}>Trend: +2.4% QoQ</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                style={{
                  background: PI.primary, color: "#fff", border: "none", borderRadius: 8, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s", marginTop: 12,
                }}
                onMouseOver={e => e.target.style.background = PI.primaryDark}
                onMouseOut={e => e.target.style.background = PI.primary}
              >
                Run Modified Query
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- DOCUMENT SEARCH SCREEN ---
  if (currentScreen === "documents") {
    return (
      <div style={{ minHeight: "100vh", background: PI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
              {/* Back Button */}
              <div style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={() => setCurrentScreen("dashboard")}>
                ← Back to Dashboard
              </div>

              {/* Search Box */}
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${PI.border}`,
                  fontSize: 13,
                  outline: "none",
                }}
              />

              {/* Search Results */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, overflow: "auto" }}>
                {DOCUMENTS.map((doc, idx) => (
                  <div key={idx} style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 10, padding: 12, cursor: "pointer", transition: "all .15s" }}
                    onMouseOver={e => e.currentTarget.style.background = PI.lightBg}
                    onMouseOut={e => e.currentTarget.style.background = PI.surface}
                  >
                    <div style={{ fontSize: 12, fontWeight: 600, color: PI.darkText, marginBottom: 4 }}>{doc.title}</div>
                    <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 6, lineHeight: 1.4 }}>{doc.snippet}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ background: PI.greenLight, color: PI.green, padding: "2px 6px", borderRadius: 4, fontSize: 9, fontWeight: 600 }}>
                        {doc.relevance}% relevance
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search Method Badge */}
              <div style={{ background: PI.amberLight, border: `1px solid ${PI.amber}`, borderRadius: 8, padding: 10, fontSize: 10 }}>
                <div style={{ color: PI.darkText, fontWeight: 600, marginBottom: 2 }}>BM25 + Vector + Cohere Reranking</div>
                <div style={{ color: PI.mutedText }}>NDCG@5: 0.82</div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- PROPERTIES LIST SCREEN ---
  if (currentScreen === "properties") {
    return (
      <div style={{ minHeight: "100vh", background: PI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
              {/* Back Button */}
              <div style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={() => setCurrentScreen("dashboard")}>
                ← Back to Dashboard
              </div>

              {/* Properties List */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflow: "auto" }}>
                {PROPERTIES.map(prop => (
                  <div
                    key={prop.id}
                    onClick={() => { setSelectedProperty(prop); setCurrentScreen("propertyDetail"); }}
                    style={{
                      background: PI.surface,
                      border: `1px solid ${PI.border}`,
                      borderRadius: 10,
                      padding: 12,
                      cursor: "pointer",
                      transition: "all .15s",
                    }}
                    onMouseOver={e => e.currentTarget.style.background = PI.lightBg}
                    onMouseOut={e => e.currentTarget.style.background = PI.surface}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: PI.darkText }}>{prop.name}</div>
                        <div style={{ fontSize: 11, color: PI.mutedText, marginTop: 2 }}>{prop.type}</div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: PI.green }}>{prop.occupancy}%</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 10, color: PI.mutedText }}>
                      <div>NOI: ${prop.noi}M</div>
                      <div>Cap Rate: {prop.capRate}%</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Button */}
              <button
                onClick={() => setCurrentScreen("comparison")}
                style={{
                  background: PI.primary, color: "#fff", border: "none", borderRadius: 8, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                onMouseOver={e => e.target.style.background = PI.primaryDark}
                onMouseOut={e => e.target.style.background = PI.primary}
              >
                Compare Properties
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- PROPERTY DETAIL SCREEN ---
  if (currentScreen === "propertyDetail" && selectedProperty) {
    const tenants = TENANTS[selectedProperty.id] || [];

    return (
      <div style={{ minHeight: "100vh", background: PI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
              {/* Back Button */}
              <div style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={() => setCurrentScreen("properties")}>
                ← Back to Properties
              </div>

              {/* Property Header */}
              <div style={{ background: PI.primary, color: "#fff", borderRadius: 10, padding: 12, marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{selectedProperty.name}</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>{selectedProperty.type}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8 }}>{selectedProperty.occupancy}% Occupancy</div>
              </div>

              {/* KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 10 }}>
                  <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 4 }}>NOI</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: PI.primary }}>${selectedProperty.noi}M</div>
                </div>
                <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 10 }}>
                  <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 4 }}>Cap Rate</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: PI.primary }}>{selectedProperty.capRate}%</div>
                </div>
                <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 10 }}>
                  <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 4 }}>Occupancy</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: PI.green }}>{selectedProperty.occupancy}%</div>
                </div>
                <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 10 }}>
                  <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 4 }}>Lease Expiry</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: PI.primary }}>{selectedProperty.leaseExpiry}</div>
                </div>
              </div>

              {/* Tenants */}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: PI.darkText, marginBottom: 8 }}>Tenants ({tenants.length})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflow: "auto" }}>
                  {tenants.map(tenant => (
                    <div key={tenant.id} style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 8, fontSize: 10 }}>
                      <div style={{ fontWeight: 600, color: PI.darkText, marginBottom: 2 }}>{tenant.name}</div>
                      <div style={{ color: PI.mutedText, marginBottom: 2 }}>{tenant.sqft.toLocaleString()} sqft</div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: PI.mutedText, fontSize: 9 }}>
                        <span>Expires: {tenant.leaseEnd}</span>
                        <span>${tenant.monthlyRent.toLocaleString()}/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Queries */}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: PI.darkText, marginBottom: 8 }}>Recent Queries</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {RECENT_QUERIES.slice(0, 2).map(q => (
                    <div key={q.id} style={{ fontSize: 10, color: PI.mutedText, padding: "6px 8px", background: PI.surface, borderRadius: 6 }}>
                      "{q.query}" <span style={{ float: "right" }}>{q.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                style={{
                  background: PI.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px",
                  fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .2s", marginTop: 8,
                }}
                onMouseOver={e => e.target.style.background = PI.primaryDark}
                onMouseOut={e => e.target.style.background = PI.primary}
              >
                Ask about this property
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- COMPARISON SCREEN ---
  if (currentScreen === "comparison") {
    return (
      <div style={{ minHeight: "100vh", background: PI.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
              {/* Back Button */}
              <div style={{ cursor: "pointer", fontSize: 13, color: PI.primary, fontWeight: 600 }} onClick={() => setCurrentScreen("properties")}>
                ← Back to Properties
              </div>

              {/* Comparison Title */}
              <div style={{ fontSize: 13, fontWeight: 600, color: PI.darkText }}>Portfolio Comparison</div>

              {/* Properties Comparison */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, overflow: "auto" }}>
                {PROPERTIES.map(prop => (
                  <div key={prop.id} style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: PI.darkText, marginBottom: 10 }}>{prop.name}</div>

                    {/* Occupancy */}
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                        <span style={{ color: PI.mutedText }}>Occupancy</span>
                        <span style={{ fontWeight: 600, color: PI.green }}>{prop.occupancy}%</span>
                      </div>
                      <div style={{ height: 6, background: PI.lightBg, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: PI.green, width: `${prop.occupancy}%` }}></div>
                      </div>
                    </div>

                    {/* NOI */}
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                        <span style={{ color: PI.mutedText }}>NOI</span>
                        <span style={{ fontWeight: 600, color: PI.primary }}>${prop.noi}M</span>
                      </div>
                      <div style={{ height: 6, background: PI.lightBg, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: PI.primary, width: `${(prop.noi / 4.2) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Cap Rate */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                        <span style={{ color: PI.mutedText }}>Cap Rate</span>
                        <span style={{ fontWeight: 600, color: PI.primary }}>{prop.capRate}%</span>
                      </div>
                      <div style={{ height: 6, background: PI.lightBg, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: PI.primary, width: `${(prop.capRate / 7.1) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insight */}
              <div style={{ background: PI.amberLight, border: `1px solid ${PI.amber}`, borderRadius: 10, padding: 12, fontSize: 11, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600, color: PI.darkText, marginBottom: 6 }}>AI Insight</div>
                <div style={{ color: PI.darkText }}>
                  Riverside Commons underperformance is primarily driven by 3 vacant units in the west wing. Market analysis suggests a 12% rent reduction could achieve 93%+ occupancy within 60 days.
                </div>
              </div>

              {/* Generate Report Button */}
              <button
                style={{
                  background: PI.primary, color: "#fff", border: "none", borderRadius: 8, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                onMouseOver={e => e.target.style.background = PI.primaryDark}
                onMouseOut={e => e.target.style.background = PI.primary}
              >
                Generate Report
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  return null;
}
