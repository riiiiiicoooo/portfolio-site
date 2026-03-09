import React, { useState } from "react";

// ============================================================================
// FIELDCOMMAND DEMO - Mobile Field Sales Enablement Platform
// ============================================================================

// --- COLOR PALETTE ---
const FC = {
  primary: "#1e3a5f",
  primaryDark: "#15294a",
  lightBg: "#e8eef5",
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
const FIELD_REPS = [
  { id: 1, name: "Sarah Chen", division: "Southeast Division", visits: 47, revenue: 12400, rank: 1, change: 2 },
  { id: 2, name: "David Mitchell", division: "Southeast Division", visits: 44, revenue: 11800, rank: 2, change: 1 },
  { id: 3, name: "Marcus Johnson", division: "Southeast Division", visits: 42, revenue: 10950, rank: 3, change: 0 },
  { id: 4, name: "Jennifer Park", division: "Southeast Division", visits: 39, revenue: 10200, rank: 4, change: -1 },
  { id: 5, name: "Robert Williams", division: "Southeast Division", visits: 38, revenue: 9800, rank: 5, change: -2 },
  { id: 6, name: "Amanda Torres", division: "Southeast Division", visits: 36, revenue: 9100, rank: 6, change: 3 },
  { id: 7, name: "Kevin Brooks", division: "Southeast Division", visits: 35, revenue: 8700, rank: 7, change: -1 },
  { id: 8, name: "Lisa Nguyen", division: "Southeast Division", visits: 33, revenue: 8200, rank: 8, change: 0 },
];

const TODAY_ROUTE = [
  { id: 1, time: "8:30 AM", name: "Riverside Pest Solutions", service: "Quarterly pest inspection", address: "1247 Peachtree Rd, Atlanta, GA", tier: "Gold", visited: true },
  { id: 2, time: "9:45 AM", name: "Magnolia Lawn & Garden", service: "Annual termite check", address: "892 Piedmont Ave, Atlanta, GA", tier: "Silver", visited: false },
  { id: 3, time: "11:00 AM", name: "Oakwood Properties LLC", service: "New customer setup", address: "3401 Roswell Rd, Atlanta, GA", tier: "New", visited: false },
  { id: 4, time: "1:30 PM", name: "Henderson Residence", service: "Moisture barrier install", address: "567 Buckhead Loop, Atlanta, GA", tier: "Gold", visited: false },
  { id: 5, time: "3:00 PM", name: "Peach State Commercial", service: "Emergency ant treatment", address: "2100 Ponce de Leon, Atlanta, GA", tier: "Platinum", visited: false },
];

const CUSTOMER_PROFILE = {
  name: "Riverside Pest Solutions",
  tier: "Gold",
  accountBalance: 12450,
  opportunities: 2,
  churnRisk: 12,
  ltv: 45200,
  lastUpdated: "2 min ago",
  history: [
    { date: "Mar 6, 2026", service: "Quarterly pest treatment", revenue: "$850", status: "completed" },
    { date: "Dec 12, 2025", service: "Annual termite inspection", revenue: "$600", status: "completed" },
    { date: "Sep 18, 2025", service: "Moisture barrier install", revenue: "$1,200", status: "completed" },
  ],
};

const SYNC_QUEUE = [
  { id: 1, type: "visit_create", time: "14:32", status: "synced", label: "Visit - Riverside Pest" },
  { id: 2, type: "customer_update", time: "14:28", status: "synced", label: "Customer profile update" },
  { id: 3, type: "task_complete", time: "14:25", status: "synced", label: "Task completion - Annual check" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function FieldCommandDemo({ onExit }) {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [activeTab, setActiveTab] = useState("visits");
  const [leaderboardPeriod, setLeaderboardPeriod] = useState("week");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [visitActive, setVisitActive] = useState(false);
  const [visitDuration, setVisitDuration] = useState("00:23:14");
  const [visitTasks, setVisitTasks] = useState([
    { id: 1, name: "Inspect perimeter stations", completed: true },
    { id: 2, name: "Apply quarterly treatment", completed: true },
    { id: 3, name: "Check moisture barriers", completed: false },
    { id: 4, name: "Discuss renewal options", completed: false },
  ]);
  const [visitNotes, setVisitNotes] = useState("Customer very satisfied. Discussed add-on services.");
  const [visitRevenue, setVisitRevenue] = useState("850");

  const handleStartVisit = (customer) => {
    setSelectedCustomer(customer);
    setVisitActive(true);
    setCurrentScreen("activeVisit");
  };

  const handleEndVisit = () => {
    setVisitActive(false);
    setCurrentScreen("dashboard");
    setSelectedCustomer(null);
  };

  const handleTaskToggle = (taskId) => {
    setVisitTasks(tasks =>
      tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    );
  };

  // --- RENDER INTRO SCREEN ---
  if (currentScreen === "intro") {
    return (
      <div style={{ minHeight: "100vh", background: FC.lightBg }}>
        <div style={{ background: FC.primary, padding: "20px 24px", color: "#fff" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>FC</div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>FieldCommand</span>
            <span style={{ marginLeft: "auto", cursor: "pointer", fontSize: 13, opacity: 0.9 }} onClick={onExit}>← Back to Portfolio</span>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ marginBottom: 60 }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: FC.darkText, margin: "0 0 16px 0", lineHeight: 1.2 }}>
              Mobile Field Sales Command Center
            </h1>
            <p style={{ fontSize: 20, color: FC.mutedText, margin: 0, lineHeight: 1.6 }}>
              Real-time visit tracking, customer intelligence, and offline-first sync for 68 field reps across national home services.
            </p>
          </div>

          <div style={{ background: FC.surface, borderRadius: 16, padding: 40, marginBottom: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: FC.green }}>43%</div>
                <div style={{ fontSize: 13, color: FC.mutedText, marginTop: 4 }}>More visits per rep</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: FC.primary }}>$5.3M</div>
                <div style={{ fontSize: 13, color: FC.mutedText, marginTop: 4 }}>Revenue lift YoY</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: FC.green }}>92%</div>
                <div style={{ fontSize: 13, color: FC.mutedText, marginTop: 4 }}>Adoption across reps</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: FC.primary }}>68</div>
                <div style={{ fontSize: 13, color: FC.mutedText, marginTop: 4 }}>Field reps equipped</div>
              </div>
            </div>

            <div style={{ paddingTop: 32, borderTop: `1px solid ${FC.border}` }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: FC.mutedText, marginBottom: 12, fontWeight: 600 }}>Technology Stack</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["React Native", "Node.js", "PostgreSQL", "Redis", "AWS S3", "Google Maps API", "Stripe"].map(tech => (
                  <span key={tech} style={{ background: FC.lightBg, color: FC.primary, padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen("dashboard")}
            style={{
              background: FC.primary, color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px",
              fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all .2s",
            }}
            onMouseOver={e => e.target.style.background = FC.primaryDark}
            onMouseOut={e => e.target.style.background = FC.primary}
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
      background: FC.surface,
    }}>
      {/* Phone Status Bar */}
      <div style={{
        background: FC.primary,
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
      <div style={{ flex: 1, overflow: "auto", background: FC.lightBg }}>
        {children}
      </div>
    </div>
  );

  // --- DASHBOARD SCREEN ---
  if (currentScreen === "dashboard") {
    return (
      <div style={{ minHeight: "100vh", background: FC.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <span style={{ cursor: "pointer", fontSize: 13, color: FC.primary, fontWeight: 600 }} onClick={onExit}>← Back to Portfolio</span>
            </div>
            <span style={{ cursor: "pointer", fontSize: 20 }} onClick={() => setCurrentScreen("offlineSync")}>⚙️</span>
          </div>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Rep Header */}
              <div style={{ background: FC.primary, color: "#fff", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Marcus Johnson</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>Southeast Division</div>
                <div style={{ fontSize: 11, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: FC.green }}></span>
                  Online
                </div>
              </div>

              {/* Today's Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <div style={{ background: FC.surface, borderRadius: 10, padding: 12, border: `1px solid ${FC.border}` }}>
                  <div style={{ fontSize: 11, color: FC.mutedText, marginBottom: 4 }}>Visits</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: FC.primary }}>6/10</div>
                </div>
                <div style={{ background: FC.surface, borderRadius: 10, padding: 12, border: `1px solid ${FC.border}` }}>
                  <div style={{ fontSize: 11, color: FC.mutedText, marginBottom: 4 }}>Revenue</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: FC.green }}>$4,280</div>
                </div>
                <div style={{ background: FC.surface, borderRadius: 10, padding: 12, border: `1px solid ${FC.border}` }}>
                  <div style={{ fontSize: 11, color: FC.mutedText, marginBottom: 4 }}>Tasks</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: FC.darkText }}>3</div>
                </div>
                <div style={{ background: FC.surface, borderRadius: 10, padding: 12, border: `1px solid ${FC.border}` }}>
                  <div style={{ fontSize: 11, color: FC.mutedText, marginBottom: 4 }}>Rank</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: FC.primary }}>3rd</div>
                </div>
              </div>

              {/* Today's Route */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: FC.darkText, marginBottom: 12 }}>Today's Route (5 visits)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {TODAY_ROUTE.map((visit, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedCustomer(visit)}
                      style={{
                        background: FC.surface,
                        borderRadius: 10,
                        padding: 12,
                        border: `1px solid ${FC.border}`,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background = FC.lightBg}
                      onMouseOut={e => e.currentTarget.style.background = FC.surface}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: FC.darkText }}>{visit.name}</div>
                          <div style={{ fontSize: 11, color: FC.mutedText, marginTop: 2 }}>{visit.service}</div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: FC.primary }}>{visit.time}</span>
                      </div>
                      <div style={{ fontSize: 10, color: FC.mutedText }}>{visit.address}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                <button
                  onClick={() => handleStartVisit(TODAY_ROUTE[0])}
                  style={{
                    background: FC.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                  }}
                  onMouseOver={e => e.target.style.background = FC.primaryDark}
                  onMouseOut={e => e.target.style.background = FC.primary}
                >
                  Start Visit
                </button>
                <button
                  onClick={() => setCurrentScreen("leaderboard")}
                  style={{
                    background: FC.surface, color: FC.primary, border: `1px solid ${FC.border}`, borderRadius: 10, padding: "12px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.background = FC.lightBg}
                  onMouseOut={e => e.currentTarget.style.background = FC.surface}
                >
                  View Leaderboard
                </button>
              </div>

              {selectedCustomer && (
                <div style={{
                  background: "#fff", borderRadius: 12, padding: 16, marginBottom: 20,
                  border: `2px solid ${FC.primary}`, cursor: "pointer", transition: "all .2s",
                }} onClick={() => setCurrentScreen("customerProfile")}>
                  <div style={{ fontSize: 12, color: FC.primary, fontWeight: 600, marginBottom: 8 }}>CUSTOMER SELECTED</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: FC.darkText }}>{selectedCustomer.name}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentScreen("customerProfile");
                    }}
                    style={{
                      background: FC.primary, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px",
                      fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 8, transition: "all .2s",
                    }}
                    onMouseOver={e => e.target.style.background = FC.primaryDark}
                    onMouseOut={e => e.target.style.background = FC.primary}
                  >
                    View Profile →
                  </button>
                </div>
              )}
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- CUSTOMER PROFILE SCREEN ---
  if (currentScreen === "customerProfile") {
    return (
      <div style={{ minHeight: "100vh", background: FC.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: FC.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("dashboard")}>← Dashboard</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Customer Header */}
              <div style={{ background: FC.primary, color: "#fff", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{CUSTOMER_PROFILE.name}</div>
                <div style={{ fontSize: 12, display: "inline-block", background: "rgba(255,255,255,0.2)", padding: "4px 8px", borderRadius: 4, marginTop: 8 }}>{CUSTOMER_PROFILE.tier} Tier</div>
              </div>

              {/* 360° Intelligence Card */}
              <div style={{ background: FC.surface, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${FC.border}` }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: FC.mutedText, fontWeight: 600, marginBottom: 12 }}>360° Account Intelligence</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: FC.lightBg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, color: FC.mutedText, marginBottom: 4 }}>Account Balance</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: FC.primary }}>${CUSTOMER_PROFILE.accountBalance.toLocaleString()}</div>
                    <div style={{ fontSize: 9, color: FC.mutedText, marginTop: 4 }}>From JDE ERP</div>
                  </div>
                  <div style={{ background: FC.lightBg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, color: FC.mutedText, marginBottom: 4 }}>Open Opps</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: FC.primary }}>{CUSTOMER_PROFILE.opportunities}</div>
                    <div style={{ fontSize: 9, color: FC.mutedText, marginTop: 4 }}>From Salesforce</div>
                  </div>
                  <div style={{ background: FC.lightBg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, color: FC.mutedText, marginBottom: 4 }}>Churn Risk</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: FC.green }}>{CUSTOMER_PROFILE.churnRisk}%</div>
                    <div style={{ fontSize: 9, color: FC.mutedText, marginTop: 4 }}>Low Risk</div>
                  </div>
                  <div style={{ background: FC.lightBg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, color: FC.mutedText, marginBottom: 4 }}>LTV</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: FC.green }}>${CUSTOMER_PROFILE.ltv.toLocaleString()}</div>
                    <div style={{ fontSize: 9, color: FC.mutedText, marginTop: 4 }}>From Snowflake</div>
                  </div>
                </div>
              </div>

              {/* Service History */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: FC.darkText, marginBottom: 12 }}>Service History</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {CUSTOMER_PROFILE.history.map((entry, idx) => (
                    <div key={idx} style={{ background: FC.surface, borderRadius: 10, padding: 12, border: `1px solid ${FC.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: FC.darkText }}>{entry.service}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: FC.green }}>{entry.revenue}</span>
                      </div>
                      <div style={{ fontSize: 10, color: FC.mutedText }}>{entry.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                <button style={{ background: FC.surface, border: `1px solid ${FC.border}`, borderRadius: 10, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", color: FC.primary, transition: "all .2s" }} onMouseOver={e => e.target.style.background = FC.lightBg} onMouseOut={e => e.target.style.background = FC.surface}>☎️ Call</button>
                <button style={{ background: FC.surface, border: `1px solid ${FC.border}`, borderRadius: 10, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", color: FC.primary, transition: "all .2s" }} onMouseOver={e => e.target.style.background = FC.lightBg} onMouseOut={e => e.target.style.background = FC.surface}>✉️ Email</button>
              </div>

              <button
                onClick={() => handleStartVisit(selectedCustomer)}
                style={{
                  width: "100%", background: FC.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                onMouseOver={e => e.target.style.background = FC.primaryDark}
                onMouseOut={e => e.target.style.background = FC.primary}
              >
                Start Visit
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- ACTIVE VISIT SCREEN ---
  if (currentScreen === "activeVisit") {
    return (
      <div style={{ minHeight: "100vh", background: FC.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: FC.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("dashboard")}>← Dashboard</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Visit Status */}
              <div style={{ background: FC.green, color: "#fff", borderRadius: 12, padding: 12, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#fff" }}></span>
                GPS Verified • Check-in confirmed
              </div>

              {/* Customer Quick Info */}
              <div style={{ background: FC.primary, color: "#fff", borderRadius: 12, padding: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedCustomer?.name}</div>
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.9 }}>{selectedCustomer?.service}</div>
              </div>

              {/* Visit Timer */}
              <div style={{ background: FC.surface, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${FC.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: FC.mutedText, marginBottom: 6 }}>Visit Duration</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: FC.primary, fontFamily: "monospace" }}>{visitDuration}</div>
              </div>

              {/* Task Checklist */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: FC.darkText, marginBottom: 12 }}>Tasks ({visitTasks.filter(t => t.completed).length}/{visitTasks.length})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {visitTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskToggle(task.id)}
                      style={{
                        background: FC.surface,
                        borderRadius: 10,
                        padding: 12,
                        border: `1px solid ${FC.border}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background = FC.lightBg}
                      onMouseOut={e => e.currentTarget.style.background = FC.surface}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        style={{ cursor: "pointer", width: 18, height: 18 }}
                      />
                      <span style={{ fontSize: 13, color: task.completed ? FC.mutedText : FC.darkText, textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: FC.darkText, marginBottom: 8 }}>Visit Notes</label>
                <textarea
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    border: `1px solid ${FC.border}`,
                    padding: "10px 12px",
                    fontSize: 12,
                    fontFamily: "inherit",
                    resize: "vertical",
                    minHeight: 70,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Revenue Capture */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: FC.darkText, marginBottom: 8 }}>Revenue Captured</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", fontSize: 14, fontWeight: 600, color: FC.darkText }}>$</span>
                  <input
                    type="number"
                    value={visitRevenue}
                    onChange={(e) => setVisitRevenue(e.target.value)}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      border: `1px solid ${FC.border}`,
                      padding: "10px 12px",
                      fontSize: 14,
                      fontWeight: 600,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Sync Status */}
              <div style={{ background: FC.greenLight, borderRadius: 10, padding: 10, marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: FC.green }}>
                <span>✓</span>
                <span>Synced (real-time updates enabled)</span>
              </div>

              {/* End Visit Button */}
              <button
                onClick={handleEndVisit}
                style={{
                  width: "100%", background: FC.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                }}
                onMouseOver={e => e.target.style.background = FC.primaryDark}
                onMouseOut={e => e.target.style.background = FC.primary}
              >
                End Visit
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- LEADERBOARD SCREEN ---
  if (currentScreen === "leaderboard") {
    const sortedReps = activeTab === "visits"
      ? [...FIELD_REPS].sort((a, b) => b.visits - a.visits)
      : [...FIELD_REPS].sort((a, b) => b.revenue - a.revenue);

    return (
      <div style={{ minHeight: "100vh", background: FC.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: FC.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("dashboard")}>← Dashboard</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Period Toggle */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                <button
                  onClick={() => setLeaderboardPeriod("week")}
                  style={{
                    background: leaderboardPeriod === "week" ? FC.primary : FC.surface,
                    color: leaderboardPeriod === "week" ? "#fff" : FC.primary,
                    border: `1px solid ${leaderboardPeriod === "week" ? FC.primary : FC.border}`,
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  This Week
                </button>
                <button
                  onClick={() => setLeaderboardPeriod("month")}
                  style={{
                    background: leaderboardPeriod === "month" ? FC.primary : FC.surface,
                    color: leaderboardPeriod === "month" ? "#fff" : FC.primary,
                    border: `1px solid ${leaderboardPeriod === "month" ? FC.primary : FC.border}`,
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  This Month
                </button>
              </div>

              {/* Metric Toggle */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                <button
                  onClick={() => setActiveTab("visits")}
                  style={{
                    background: activeTab === "visits" ? FC.primary : FC.surface,
                    color: activeTab === "visits" ? "#fff" : FC.primary,
                    border: `1px solid ${activeTab === "visits" ? FC.primary : FC.border}`,
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  Visits
                </button>
                <button
                  onClick={() => setActiveTab("revenue")}
                  style={{
                    background: activeTab === "revenue" ? FC.primary : FC.surface,
                    color: activeTab === "revenue" ? "#fff" : FC.primary,
                    border: `1px solid ${activeTab === "revenue" ? FC.primary : FC.border}`,
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  Revenue
                </button>
              </div>

              {/* Division Filter */}
              <div style={{ background: FC.surface, borderRadius: 10, padding: 10, marginBottom: 20, fontSize: 11, color: FC.mutedText, border: `1px solid ${FC.border}` }}>
                📍 Southeast Division
              </div>

              {/* Leaderboard List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {sortedReps.map((rep, idx) => {
                  const isCurrentUser = rep.name === "Marcus Johnson";
                  const metric = activeTab === "visits" ? rep.visits : rep.revenue;
                  const metricLabel = activeTab === "visits" ? "visits" : "$";

                  return (
                    <div
                      key={rep.id}
                      style={{
                        background: isCurrentUser ? FC.primary : FC.surface,
                        borderRadius: 10,
                        padding: 12,
                        border: `1px solid ${isCurrentUser ? FC.primary : FC.border}`,
                        color: isCurrentUser ? "#fff" : "inherit",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                          <div style={{
                            background: isCurrentUser ? "rgba(255,255,255,0.2)" : FC.lightBg,
                            borderRadius: 8,
                            width: 36,
                            height: 36,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 700,
                            color: isCurrentUser ? "#fff" : FC.primary,
                          }}>
                            #{idx + 1}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{rep.name}</div>
                            <div style={{ fontSize: 10, opacity: isCurrentUser ? 0.9 : 1, color: isCurrentUser ? "#fff" : FC.mutedText }}>
                              {activeTab === "visits" ? `${rep.visits} visits` : `$${rep.revenue.toLocaleString()}`}
                            </div>
                          </div>
                        </div>

                        {/* Rank Change */}
                        <div style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: rep.change > 0 ? FC.green : rep.change < 0 ? FC.red : FC.mutedText,
                        }}>
                          {rep.change > 0 ? `↑${rep.change}` : rep.change < 0 ? `↓${Math.abs(rep.change)}` : "—"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --- OFFLINE SYNC SCREEN ---
  if (currentScreen === "offlineSync") {
    return (
      <div style={{ minHeight: "100vh", background: FC.lightBg, padding: "40px 24px" }}>
        <div style={{ maxWidth: 450, margin: "0 auto" }}>
          <span style={{ cursor: "pointer", fontSize: 13, color: FC.primary, fontWeight: 600, marginBottom: 16, display: "block" }} onClick={() => setCurrentScreen("dashboard")}>← Dashboard</span>

          <PhoneFrame>
            <div style={{ padding: "16px 20px" }}>
              {/* Connection Status */}
              <div style={{ background: FC.greenLight, borderRadius: 12, padding: 12, marginBottom: 20, border: `1px solid ${FC.green}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: FC.green }}>✓ Back Online — Syncing 3 operations</div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ height: 6, background: FC.border, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "100%", background: FC.green, borderRadius: 4, animation: "none" }}></div>
                </div>
                <div style={{ fontSize: 10, color: FC.mutedText, marginTop: 6 }}>100% Complete</div>
              </div>

              {/* Queue Items */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: FC.darkText, marginBottom: 12 }}>Sync Queue</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {SYNC_QUEUE.map((item, idx) => (
                    <div key={idx} style={{ background: FC.surface, borderRadius: 10, padding: 12, border: `1px solid ${FC.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: FC.darkText }}>{item.label}</div>
                        <span style={{ fontSize: 10, color: FC.green, fontWeight: 600 }}>✓ Synced</span>
                      </div>
                      <div style={{ fontSize: 10, color: FC.mutedText }}>{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sync Stats */}
              <div style={{ background: FC.surface, borderRadius: 12, padding: 16, border: `1px solid ${FC.border}` }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: FC.mutedText, fontWeight: 600, marginBottom: 12 }}>Sync Statistics</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: FC.mutedText }}>Last Synced</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: FC.darkText }}>12 min ago</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: FC.mutedText }}>Queue Size</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: FC.darkText }}>0 pending</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: FC.mutedText }}>Conflicts Resolved</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: FC.darkText }}>1</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: FC.mutedText }}>Uptime This Session</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: FC.green }}>100%</span>
                  </div>
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
