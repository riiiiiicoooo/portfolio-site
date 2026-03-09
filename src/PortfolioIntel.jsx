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

  // --- DESKTOP WEB APP WRAPPER ---
  const DesktopApp = ({ children }) => (
    <div style={{
      maxWidth: 1400,
      minHeight: 700,
      margin: "0 auto",
      borderRadius: 8,
      border: `1px solid ${PI.border}`,
      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      background: PI.surface,
    }}>
      {children}
    </div>
  );

  // --- TOP NAVIGATION BAR ---
  const TopNav = () => (
    <div style={{
      background: PI.primary,
      color: "#fff",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${PI.primaryDark}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>PI</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Portfolio Intelligence</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>Parkview Capital Portfolio</div>
      <div style={{ cursor: "pointer", fontSize: 13, opacity: 0.9, textDecoration: "underline" }} onClick={onExit}>← Back to Portfolio</div>
    </div>
  );

  // --- LEFT SIDEBAR ---
  const LeftSidebar = () => (
    <div style={{
      width: 240,
      background: PI.surface,
      borderRight: `1px solid ${PI.border}`,
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      overflowY: "auto",
    }}>
      <div style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: PI.mutedText, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Navigation</div>
        {[
          { label: "Query Console", key: "dashboard", icon: "💬" },
          { label: "Properties", key: "properties", icon: "🏢", count: 87 },
          { label: "Documents", key: "documents", icon: "📄" },
          { label: "Analytics", key: "analytics", icon: "📊" },
        ].map(item => (
          <div
            key={item.key}
            onClick={() => setCurrentScreen(item.key)}
            style={{
              padding: "12px 12px",
              borderRadius: 6,
              marginBottom: 8,
              cursor: "pointer",
              background: currentScreen === item.key ? PI.lightBg : "transparent",
              color: currentScreen === item.key ? PI.primary : PI.darkText,
              fontSize: 13,
              fontWeight: currentScreen === item.key ? 600 : 500,
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all .15s",
            }}
            onMouseOver={e => { if (currentScreen !== item.key) e.currentTarget.style.background = "rgba(15, 118, 110, 0.05)"; }}
            onMouseOut={e => { if (currentScreen !== item.key) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.count && <span style={{ fontSize: 11, color: PI.mutedText }}>{item.count}</span>}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}></div>

      <div style={{ borderTop: `1px solid ${PI.border}`, paddingTop: 16, paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: PI.mutedText, marginBottom: 12 }}>Portfolio Summary</div>
        <div style={{ fontSize: 12, color: PI.darkText, marginBottom: 6 }}>
          <div style={{ fontWeight: 600 }}>87 Properties</div>
          <div style={{ fontSize: 11, color: PI.mutedText, marginTop: 4 }}>Across 4 regions</div>
        </div>
        <div style={{ fontSize: 12, color: PI.darkText, marginTop: 12 }}>
          <div style={{ fontWeight: 600 }}>$150M+</div>
          <div style={{ fontSize: 11, color: PI.mutedText, marginTop: 4 }}>Operating Budget</div>
        </div>
      </div>
    </div>
  );

  // --- QUERY CONSOLE VIEW (Main Feature) ---
  const QueryConsoleView = () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: PI.lightBg }}>
      {/* Portfolio Header Bar */}
      <div style={{ background: PI.surface, borderBottom: `1px solid ${PI.border}`, padding: "16px 24px", fontSize: 13, fontWeight: 600, color: PI.darkText }}>
        Parkview Capital Portfolio — 87 Properties | $150M+ Operating Budget
      </div>

      {/* Quick Query Chips */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${PI.border}`, background: PI.surface }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: PI.mutedText, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Quick Queries</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Vacancy rates by region", "Top performing assets", "Lease expirations Q2", "Maintenance costs YoY"].map(query => (
            <div
              key={query}
              style={{
                background: PI.surface,
                border: `1px solid ${PI.border}`,
                color: PI.primary,
                padding: "8px 12px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all .15s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = PI.lightBg; e.currentTarget.style.borderColor = PI.primary; }}
              onMouseOut={e => { e.currentTarget.style.background = PI.surface; e.currentTarget.style.borderColor = PI.border; }}
            >
              {query}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflow: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* User Message 1 */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <div style={{
            background: PI.primary,
            color: "#fff",
            borderRadius: 8,
            padding: "12px 16px",
            maxWidth: "60%",
            fontSize: 14,
            lineHeight: 1.5,
          }}>
            What's our current occupancy rate across the Southeast portfolio?
          </div>
        </div>

        {/* AI Response 1 */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{
            background: PI.surface,
            border: `1px solid ${PI.border}`,
            borderRadius: 8,
            padding: "16px",
            maxWidth: "70%",
            fontSize: 13,
            lineHeight: 1.6,
          }}>
            <div style={{ marginBottom: 12 }}>
              The Southeast portfolio (23 properties) has a weighted average occupancy rate of <strong>94.2%</strong>, up from 91.8% last quarter.
            </div>
            <div style={{ marginBottom: 12, fontSize: 12, color: PI.mutedText, paddingBottom: 12, borderBottom: `1px solid ${PI.border}` }}>
              Top performers: <strong>Buckhead Tower</strong> (98.7%), <strong>Midtown Plaza</strong> (97.1%). Below target: <strong>Riverside Commons</strong> (86.3%).
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ background: PI.greenLight, color: PI.green, padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>91% Confidence</span>
              <span style={{ background: PI.amberLight, color: PI.amber, padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>SQL Verified</span>
            </div>
          </div>
        </div>

        {/* User Message 2 */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, marginBottom: 8 }}>
          <div style={{
            background: PI.primary,
            color: "#fff",
            borderRadius: 8,
            padding: "12px 16px",
            maxWidth: "60%",
            fontSize: 14,
            lineHeight: 1.5,
          }}>
            Which properties have lease expirations in the next 90 days?
          </div>
        </div>

        {/* AI Response 2 - Table */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{
            background: PI.surface,
            border: `1px solid ${PI.border}`,
            borderRadius: 8,
            padding: "16px",
            maxWidth: "70%",
            fontSize: 12,
            overflowX: "auto",
          }}>
            <div style={{ marginBottom: 12, fontWeight: 600, color: PI.darkText }}>Lease Expirations (Next 90 Days)</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${PI.border}` }}>
                  <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 600, fontSize: 11, color: PI.mutedText }}>Property</th>
                  <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 600, fontSize: 11, color: PI.mutedText }}>Tenant</th>
                  <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 600, fontSize: 11, color: PI.mutedText }}>Exp. Date</th>
                  <th style={{ textAlign: "right", padding: "8px 0", fontWeight: 600, fontSize: 11, color: PI.mutedText }}>Sq Ft</th>
                  <th style={{ textAlign: "right", padding: "8px 0", fontWeight: 600, fontSize: 11, color: PI.mutedText }}>Ann. Rent</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: "Buckhead Tower", tenant: "TechVenture Inc", date: "Jun 2026", sqft: "8,200", rent: "$344.4K" },
                  { prop: "Buckhead Tower", tenant: "Capital Strategies", date: "Jan 2026", sqft: "4,200", rent: "$176.4K" },
                  { prop: "Midtown Plaza", tenant: "Urban Living Co", date: "Nov 2025", sqft: "7,200", rent: "$302.4K" },
                  { prop: "Midtown Plaza", tenant: "Finance First", date: "May 2026", sqft: "5,600", rent: "$235.2K" },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: `1px solid ${PI.border}` }}>
                    <td style={{ padding: "8px 0", fontSize: 12, color: PI.darkText }}>{row.prop}</td>
                    <td style={{ padding: "8px 0", fontSize: 12, color: PI.darkText }}>{row.tenant}</td>
                    <td style={{ padding: "8px 0", fontSize: 12, color: PI.darkText }}>{row.date}</td>
                    <td style={{ padding: "8px 0", fontSize: 12, color: PI.darkText, textAlign: "right" }}>{row.sqft}</td>
                    <td style={{ padding: "8px 0", fontSize: 12, color: PI.darkText, textAlign: "right", fontWeight: 600 }}>{row.rent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <span style={{ background: PI.greenLight, color: PI.green, padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>85% Confidence</span>
              <span style={{ background: PI.amberLight, color: PI.amber, padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>SQL Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div style={{ background: PI.surface, borderTop: `1px solid ${PI.border}`, padding: "16px 24px", display: "flex", gap: 10 }}>
        <input
          type="text"
          placeholder="Ask a question about your portfolio..."
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 6,
            border: `1px solid ${PI.border}`,
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          style={{
            background: PI.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 16px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .2s",
          }}
          onMouseOver={e => e.target.style.background = PI.primaryDark}
          onMouseOut={e => e.target.style.background = PI.primary}
        >
          Send
        </button>
      </div>
    </div>
  );

  // --- PROPERTIES VIEW ---
  const PropertiesView = () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: PI.lightBg }}>
      {/* Header */}
      <div style={{ background: PI.surface, borderBottom: `1px solid ${PI.border}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: PI.darkText }}>Portfolio Properties</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All Types", "Office", "Retail", "Industrial"].map(filter => (
            <button
              key={filter}
              style={{
                background: filter === "All Types" ? PI.lightBg : PI.surface,
                color: filter === "All Types" ? PI.primary : PI.darkText,
                border: `1px solid ${filter === "All Types" ? PI.primary : PI.border}`,
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Property Grid */}
      <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { id: 1, name: "Buckhead Tower", type: "Class A Office", location: "Atlanta, GA", occupancy: 98.7, revenue: "$8.2M", sqft: "185K", status: "performing" },
            { id: 2, name: "Midtown Plaza", type: "Mixed-Use", location: "Atlanta, GA", occupancy: 97.1, revenue: "$7.5M", sqft: "142K", status: "performing" },
            { id: 3, name: "Riverside Commons", type: "Class B Office", location: "Orlando, FL", occupancy: 86.3, revenue: "$4.2M", sqft: "98K", status: "attention" },
            { id: 4, name: "Tech Park South", type: "Industrial", location: "Charlotte, NC", occupancy: 92.4, revenue: "$6.1M", sqft: "165K", status: "performing" },
            { id: 5, name: "Harbor Retail Center", type: "Retail", location: "Miami, FL", occupancy: 78.9, revenue: "$3.8M", sqft: "112K", status: "risk" },
            { id: 6, name: "Commerce Square", type: "Office", location: "Dallas, TX", occupancy: 95.2, revenue: "$7.9M", sqft: "156K", status: "performing" },
          ].map(prop => {
            const statusColor = prop.status === "performing" ? PI.green : prop.status === "attention" ? PI.amber : PI.red;
            const statusBg = prop.status === "performing" ? PI.greenLight : prop.status === "attention" ? PI.amberLight : PI.redLight;
            const statusLabel = prop.status === "performing" ? "Performing Well" : prop.status === "attention" ? "Needs Attention" : "At Risk";

            return (
              <div
                key={prop.id}
                style={{
                  background: PI.surface,
                  border: `1px solid ${PI.border}`,
                  borderRadius: 8,
                  padding: "16px",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = PI.primary; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = PI.border; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: PI.darkText }}>{prop.name}</div>
                    <div style={{ fontSize: 12, color: PI.mutedText, marginTop: 4 }}>{prop.type}</div>
                    <div style={{ fontSize: 11, color: PI.mutedText, marginTop: 2 }}>{prop.location}</div>
                  </div>
                  <div style={{ background: statusBg, color: statusColor, padding: "4px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>
                    {statusLabel}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${PI.border}` }}>
                  <div>
                    <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 4 }}>Occupancy</div>
                    <div style={{ fontWeight: 600, color: PI.primary, fontSize: 13 }}>{prop.occupancy}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 4 }}>Revenue</div>
                    <div style={{ fontWeight: 600, color: PI.primary, fontSize: 13 }}>{prop.revenue}</div>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ fontSize: 10, color: PI.mutedText, marginBottom: 4 }}>Sq Ft</div>
                    <div style={{ fontWeight: 600, color: PI.primary, fontSize: 13 }}>{prop.sqft}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // --- DOCUMENTS VIEW ---
  const DocumentsView = () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: PI.lightBg }}>
      {/* Header */}
      <div style={{ background: PI.surface, borderBottom: `1px solid ${PI.border}`, padding: "16px 24px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Search documents..."
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 6,
              border: `1px solid ${PI.border}`,
              fontSize: 13,
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Documents Table */}
      <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${PI.border}` }}>
              <th style={{ textAlign: "left", padding: "12px 0", fontWeight: 600, fontSize: 12, color: PI.mutedText }}>Document Name</th>
              <th style={{ textAlign: "left", padding: "12px 0", fontWeight: 600, fontSize: 12, color: PI.mutedText }}>Type</th>
              <th style={{ textAlign: "left", padding: "12px 0", fontWeight: 600, fontSize: 12, color: PI.mutedText }}>Property</th>
              <th style={{ textAlign: "left", padding: "12px 0", fontWeight: 600, fontSize: 12, color: PI.mutedText }}>Upload Date</th>
              <th style={{ textAlign: "left", padding: "12px 0", fontWeight: 600, fontSize: 12, color: PI.mutedText }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: "Phase II Environmental Report", type: "Inspection", property: "Buckhead Tower", date: "Mar 8, 2026", status: "reviewed", relevance: 94 },
              { id: 2, name: "Lease Amendment 2024 - Environmental Clause", type: "Lease", property: "Midtown Plaza", date: "Mar 5, 2026", status: "reviewed", relevance: 87 },
              { id: 3, name: "Property Inspection Notes Q4", type: "Inspection", property: "Riverside Commons", date: "Mar 1, 2026", status: "pending", relevance: 79 },
              { id: 4, name: "2025 Financial Audit Summary", type: "Financial", property: "Tech Park South", date: "Feb 28, 2026", status: "reviewed", relevance: 92 },
              { id: 5, name: "HVAC Maintenance Schedule", type: "Maintenance", property: "Harbor Retail Center", date: "Feb 25, 2026", status: "reviewed", relevance: 71 },
              { id: 6, name: "Tenant Insurance Certificates", type: "Lease", property: "Commerce Square", date: "Feb 20, 2026", status: "pending", relevance: 85 },
            ].map(doc => (
              <tr
                key={doc.id}
                style={{
                  borderBottom: `1px solid ${PI.border}`,
                  background: PI.surface,
                  cursor: "pointer",
                  transition: "all .15s",
                }}
                onMouseOver={e => e.currentTarget.style.background = PI.lightBg}
                onMouseOut={e => e.currentTarget.style.background = PI.surface}
              >
                <td style={{ padding: "12px 0", fontSize: 13, color: PI.darkText, fontWeight: 500 }}>{doc.name}</td>
                <td style={{ padding: "12px 0", fontSize: 13, color: PI.mutedText }}>{doc.type}</td>
                <td style={{ padding: "12px 0", fontSize: 13, color: PI.mutedText }}>{doc.property}</td>
                <td style={{ padding: "12px 0", fontSize: 13, color: PI.mutedText }}>{doc.date}</td>
                <td style={{ padding: "12px 0" }}>
                  <span style={{
                    background: doc.status === "reviewed" ? PI.greenLight : PI.amberLight,
                    color: doc.status === "reviewed" ? PI.green : PI.amber,
                    padding: "4px 8px",
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                  }}>
                    {doc.status === "reviewed" ? "Reviewed" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- ANALYTICS VIEW ---
  const AnalyticsView = () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: PI.lightBg, overflow: "auto" }}>
      <div style={{ padding: "24px" }}>
        {/* Summary Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Portfolio Value", value: "$850M+", color: PI.primary },
            { label: "Avg Occupancy", value: "92.3%", color: PI.green },
            { label: "Revenue YTD", value: "$42.5M", color: PI.primary },
            { label: "NOI Margin", value: "38.2%", color: PI.green },
          ].map((metric, idx) => (
            <div key={idx} style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: PI.mutedText, marginBottom: 8, fontWeight: 500 }}>{metric.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: metric.color }}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Two-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          {/* Occupancy by Region */}
          <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: PI.darkText, marginBottom: 16 }}>Occupancy by Region</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { region: "Southeast", occupancy: 94.2 },
                { region: "Northeast", occupancy: 91.8 },
                { region: "Midwest", occupancy: 89.5 },
                { region: "West", occupancy: 87.3 },
              ].map(item => (
                <div key={item.region}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                    <span style={{ fontWeight: 500 }}>{item.region}</span>
                    <span style={{ fontWeight: 600, color: PI.primary }}>{item.occupancy}%</span>
                  </div>
                  <div style={{ height: 6, background: PI.lightBg, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: PI.primary, width: `${item.occupancy}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lease Expiration Timeline */}
          <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: PI.darkText, marginBottom: 16 }}>Lease Expiration Timeline</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { quarter: "Q2 2026", count: 8, color: PI.red },
                { quarter: "Q3 2026", count: 12, color: PI.amber },
                { quarter: "Q4 2026", count: 6, color: PI.green },
                { quarter: "Q1 2027", count: 9, color: PI.primary },
              ].map(item => (
                <div key={item.quarter}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                    <span style={{ fontWeight: 500 }}>{item.quarter}</span>
                    <span style={{ fontWeight: 600, color: item.color }}>{item.count} leases</span>
                  </div>
                  <div style={{ height: 6, background: PI.lightBg, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: item.color, width: `${(item.count / 12) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Query Activity */}
        <div style={{ background: PI.surface, border: `1px solid ${PI.border}`, borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: PI.darkText, marginBottom: 16 }}>Recent Query Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { query: "What's our current occupancy rate across the Southeast portfolio?", user: "Sarah Chen", time: "2:45 PM" },
              { query: "Which properties have lease expirations in the next 90 days?", user: "Marcus Webb", time: "1:30 PM" },
              { query: "Compare occupancy trends YoY", user: "Sarah Chen", time: "11:15 AM" },
              { query: "Show maintenance costs by property", user: "David Rodriguez", time: "Yesterday" },
              { query: "What's our Q3 lease expiration risk?", user: "Finance Team", time: "Mar 6" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: idx < 4 ? `1px solid ${PI.border}` : "none" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: PI.darkText, marginBottom: 4 }}>{item.query}</div>
                  <div style={{ fontSize: 11, color: PI.mutedText }}>{item.user}</div>
                </div>
                <div style={{ fontSize: 11, color: PI.mutedText, minWidth: 60, textAlign: "right" }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- DASHBOARD SCREEN ---
  if (currentScreen === "dashboard") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "40px 24px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <DesktopApp>
          <TopNav />
          <div style={{ display: "flex", flex: 1 }}>
            <LeftSidebar />
            <QueryConsoleView />
          </div>
        </DesktopApp>
      </div>
    );
  }

  // --- PROPERTIES SCREEN ---
  if (currentScreen === "properties") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "40px 24px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <DesktopApp>
          <TopNav />
          <div style={{ display: "flex", flex: 1 }}>
            <LeftSidebar />
            <PropertiesView />
          </div>
        </DesktopApp>
      </div>
    );
  }

  // --- DOCUMENTS SCREEN ---
  if (currentScreen === "documents") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "40px 24px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <DesktopApp>
          <TopNav />
          <div style={{ display: "flex", flex: 1 }}>
            <LeftSidebar />
            <DocumentsView />
          </div>
        </DesktopApp>
      </div>
    );
  }

  // --- ANALYTICS SCREEN ---
  if (currentScreen === "analytics") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "40px 24px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <DesktopApp>
          <TopNav />
          <div style={{ display: "flex", flex: 1 }}>
            <LeftSidebar />
            <AnalyticsView />
          </div>
        </DesktopApp>
      </div>
    );
  }

  return null;
}
