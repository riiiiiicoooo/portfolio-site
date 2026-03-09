import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ClinicalAIDemo = ({ onExit }) => {
  const [activeView, setActiveView] = useState("command");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "system",
      text: "PA Assistant ready. Describe a patient case to generate authorization requests.",
    },
  ]);

  // Sample data
  const paQueueData = [
    {
      id: "PA-2024-3421",
      patient: "James Miller",
      service: "27447 - Total Knee Replacement",
      payer: "BCBS NC",
      status: "Approved",
      turnaround: "4.2 hrs",
    },
    {
      id: "PA-2024-3420",
      patient: "Sarah Chen",
      service: "73721 - MRI Knee",
      payer: "Aetna",
      status: "Pending",
      turnaround: "8.1 hrs",
    },
    {
      id: "PA-2024-3419",
      patient: "Michael Rodriguez",
      service: "93306 - Echocardiogram",
      payer: "UHC",
      status: "Approved",
      turnaround: "2.9 hrs",
    },
    {
      id: "PA-2024-3418",
      patient: "Jennifer Walsh",
      service: "27447 - Total Knee Replacement",
      payer: "BCBS NC",
      status: "Denied",
      turnaround: "6.5 hrs",
    },
    {
      id: "PA-2024-3417",
      patient: "David Thompson",
      service: "70450 - CT Head",
      payer: "CIGNA",
      status: "Appealed",
      turnaround: "12.3 hrs",
    },
  ];

  const denialTrendData = [
    { week: "Week 1", rate: 18.4 },
    { week: "Week 2", rate: 17.2 },
    { week: "Week 3", rate: 15.8 },
    { week: "Week 4", rate: 14.9 },
    { week: "Week 5", rate: 13.2 },
    { week: "Week 6", rate: 12.1 },
    { week: "Week 7", rate: 11.4 },
    { week: "Week 8", rate: 10.7 },
    { week: "Week 9", rate: 10.2 },
    { week: "Week 10", rate: 9.5 },
    { week: "Week 11", rate: 9.3 },
    { week: "Week 12", rate: 9.1 },
  ];

  const denialBreakdownData = [
    { name: "Documentation", value: 42, color: "#dc2626" },
    { name: "Coding", value: 28, color: "#f97316" },
    { name: "Eligibility", value: 19, color: "#eab308" },
    { name: "Medical Necessity", value: 11, color: "#6366f1" },
  ];

  const revenueByPayerData = [
    { payer: "BCBS NC", recovered: 620000 },
    { payer: "Aetna", recovered: 480000 },
    { payer: "UHC", recovered: 560000 },
    { payer: "CIGNA", recovered: 440000 },
  ];

  const auditLogData = [
    {
      timestamp: "2024-01-15 14:23:45",
      user: "Dr. Emma Johnson",
      action: "Viewed PA Request",
      resource: "PA-2024-3421",
    },
    {
      timestamp: "2024-01-15 14:22:12",
      user: "System",
      action: "Generated PA Request",
      resource: "PA-2024-3420",
    },
    {
      timestamp: "2024-01-15 14:20:33",
      user: "Coding Team",
      action: "Reviewed Codes",
      resource: "Encounter #5832",
    },
    {
      timestamp: "2024-01-15 14:18:55",
      user: "Dr. Michael Park",
      action: "Submitted Appeal",
      resource: "PA-2024-3418",
    },
    {
      timestamp: "2024-01-15 14:15:22",
      user: "Revenue Analyst",
      action: "Exported Report",
      resource: "Q1 Denial Analysis",
    },
  ];

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      type: "user",
      text: chatInput,
    };
    setChatMessages([...chatMessages, userMessage]);

    // Simulate AI response based on keywords
    let response = "";
    const input = chatInput.toLowerCase();

    if (input.includes("knee") || input.includes("tkr")) {
      response = `PA Request Generated: 27447 (Total Knee Replacement)
Payer: BCBS NC | Criteria Match: 94%
Documentation: Moderate to severe osteoarthritis, failed conservative treatment ✓
Processing time: Estimated 2-3 hours
Status: Ready to Submit`;
    } else if (input.includes("mri")) {
      response = `PA Request Generated: 73721 (MRI Knee)
Payer: Aetna | Criteria Match: 87%
Documentation: Persistent knee pain, MSK imaging indicated ✓
Processing time: Estimated 1-2 hours
Status: Ready to Submit`;
    } else if (input.includes("echo") || input.includes("heart")) {
      response = `PA Request Generated: 93306 (Echocardiogram)
Payer: UHC | Criteria Match: 91%
Documentation: Suspected heart disease, diagnostic workup needed ✓
Processing time: Estimated 2-4 hours
Status: Ready to Submit`;
    } else if (input.includes("denied") || input.includes("appeal")) {
      response = `Appeal Letter Generated
Original Denial Reason: Documentation Insufficient
Appeal Strategy: Resubmit with additional clinical notes
Additional Documentation: Chart excerpt showing medical necessity ✓
Appeal Confidence: 78%
Estimated Processing: 5-7 business days`;
    } else {
      response = `Clinical Documentation Analyzed
Potential Diagnoses Detected: 3
Suggested CPT Codes: 2
Compliance Check: HIPAA Compliant ✓
Recommendation: Route for PA review`;
    }

    const aiMessage = {
      type: "system",
      text: response,
    };
    setChatMessages([...chatMessages, aiMessage]);
    setChatInput("");
  };

  // Sidebar navigation
  const sidebarItems = [
    { id: "command", icon: "📊", label: "Command Center" },
    { id: "priorauth", icon: "📋", label: "Prior Auth" },
    { id: "coding", icon: "🔍", label: "Medical Coding" },
    { id: "compliance", icon: "🔐", label: "HIPAA Compliance" },
    { id: "analytics", icon: "📈", label: "Revenue Analytics" },
  ];

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb",
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  const containerStyle = {
    display: "flex",
    height: "calc(100vh - 64px)",
    backgroundColor: "#ffffff",
  };

  const sidebarStyle = {
    width: sidebarExpanded ? "240px" : "80px",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    overflowY: "auto",
    transition: "width 0.3s",
    borderRight: "1px solid #374151",
  };

  const mainContentStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    backgroundColor: "#f9fafb",
  };

  const sidebarItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    cursor: "pointer",
    backgroundColor: isActive ? "#059669" : "transparent",
    color: isActive ? "#ffffff" : "#d1d5db",
    borderLeft: isActive ? "4px solid #10b981" : "none",
    paddingLeft: isActive ? "12px" : "16px",
    transition: "all 0.2s",
  });

  const kpiCardStyle = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "16px",
  };

  const kpiValueStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#059669",
    marginTop: "8px",
  };

  const kpiLabelStyle = {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500",
  };

  const improvementStyle = {
    fontSize: "12px",
    color: "#059669",
    marginTop: "4px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const thStyle = {
    backgroundColor: "#f3f4f6",
    padding: "12px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
    color: "#374151",
  };

  const statusBadgeStyle = (status) => {
    const baseStyle = {
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
    };
    const colors = {
      Approved: { backgroundColor: "#d1fae5", color: "#065f46" },
      Pending: { backgroundColor: "#fef3c7", color: "#92400e" },
      Denied: { backgroundColor: "#fee2e2", color: "#991b1b" },
      Appealed: { backgroundColor: "#e0e7ff", color: "#3730a3" },
    };
    return { ...baseStyle, ...colors[status] };
  };

  // RENDER VIEWS
  const renderCommandCenter = () => (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        Command Center
      </h1>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        <div style={kpiCardStyle}>
          <div style={kpiLabelStyle}>PA Turnaround</div>
          <div style={kpiValueStyle}>6.2 hrs</div>
          <div style={improvementStyle}>↓ from 3.8 days (84% faster)</div>
        </div>
        <div style={kpiCardStyle}>
          <div style={kpiLabelStyle}>Denial Rate</div>
          <div style={kpiValueStyle}>9.1%</div>
          <div style={improvementStyle}>↓ from 18.4% (50% reduction)</div>
        </div>
        <div style={kpiCardStyle}>
          <div style={kpiLabelStyle}>Coding Accuracy</div>
          <div style={kpiValueStyle}>97.8%</div>
          <div style={improvementStyle}>↑ from 93.2%</div>
        </div>
        <div style={kpiCardStyle}>
          <div style={kpiLabelStyle}>Revenue Recovered</div>
          <div style={kpiValueStyle}>$2.1M</div>
          <div style={improvementStyle}>YTD impact</div>
        </div>
      </div>

      {/* PA Request Queue */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          PA Request Queue
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Request ID</th>
              <th style={thStyle}>Patient</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Payer</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Turnaround</th>
            </tr>
          </thead>
          <tbody>
            {paQueueData.map((row) => (
              <tr key={row.id}>
                <td style={tdStyle}>{row.id}</td>
                <td style={tdStyle}>{row.patient}</td>
                <td style={tdStyle}>{row.service}</td>
                <td style={tdStyle}>{row.payer}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(row.status)}>{row.status}</span>
                </td>
                <td style={tdStyle}>{row.turnaround}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue Cycle Health */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Revenue Cycle Health
        </h2>
        <div style={{ ...kpiCardStyle, marginBottom: 0 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByPayerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="payer" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Bar dataKey="recovered" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PA Assistant Chat */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          PA Assistant
        </h2>
        <div style={{ ...kpiCardStyle, marginBottom: 0, display: "flex", flexDirection: "column", height: "400px" }}>
          <div style={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}>
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "12px",
                  padding: "12px",
                  backgroundColor: msg.type === "user" ? "#dbeafe" : "#f0fdf4",
                  borderRadius: "6px",
                  borderLeft: `4px solid ${msg.type === "user" ? "#0284c7" : "#059669"}`,
                }}
              >
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                  {msg.type === "user" ? "You" : "PA Assistant"}
                </div>
                <div style={{ fontSize: "14px", color: "#374151", whiteSpace: "pre-wrap" }}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
              placeholder="Describe a patient case..."
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleChatSubmit}
              style={{
                padding: "10px 16px",
                backgroundColor: "#059669",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPriorAuth = () => (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        Prior Authorization Pipeline
      </h1>

      {/* Pipeline visualization */}
      <div style={{ ...kpiCardStyle, marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {["Request", "Criteria Match", "Generate", "Submit", "Track"].map((stage, idx) => (
          <div key={stage} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: idx < 3 ? "#059669" : "#e5e7eb",
                color: idx < 3 ? "#ffffff" : "#6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}
            >
              {idx + 1}
            </div>
            <div style={{ marginLeft: "12px", fontWeight: "500", color: "#374151" }}>{stage}</div>
            {idx < 4 && <div style={{ width: "40px", height: "2px", backgroundColor: "#e5e7eb", margin: "0 20px" }} />}
          </div>
        ))}
      </div>

      {/* All PA Requests Table */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          All PA Requests
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Request ID</th>
              <th style={thStyle}>Patient</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Payer</th>
              <th style={thStyle}>Criteria Match</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {paQueueData.map((row) => (
              <tr key={row.id}>
                <td style={tdStyle}>{row.id}</td>
                <td style={tdStyle}>{row.patient}</td>
                <td style={tdStyle}>{row.service}</td>
                <td style={tdStyle}>{row.payer}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "120px",
                        height: "8px",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: "92%",
                          backgroundColor: "#059669",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "12px" }}>92%</span>
                  </div>
                </td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(row.status)}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Appeal Metrics */}
      <div style={kpiCardStyle}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Appeal Success Metrics
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          <div>
            <div style={kpiLabelStyle}>Appeals Filed</div>
            <div style={kpiValueStyle}>42</div>
          </div>
          <div>
            <div style={kpiLabelStyle}>Appeals Successful</div>
            <div style={kpiValueStyle}>34</div>
            <div style={improvementStyle}>81% success rate</div>
          </div>
          <div>
            <div style={kpiLabelStyle}>Avg. Appeal Time</div>
            <div style={kpiValueStyle}>6.4 days</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalCoding = () => (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        Medical Coding Intelligence
      </h1>

      {/* Sample Encounter Note */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Encounter Note
        </h2>
        <div style={{ ...kpiCardStyle, marginBottom: 0, fontFamily: "monospace", fontSize: "13px", lineHeight: "1.6" }}>
          <div style={{ color: "#6b7280" }}>
            <strong>Patient:</strong> Margaret Johnson | <strong>DOB:</strong> 1958-03-15 | <strong>Age:</strong> 65
            <br />
            <strong>Date of Service:</strong> 2024-01-15 | <strong>Provider:</strong> Dr. Robert Martinez
            <br />
            <br />
            <strong>Chief Complaint:</strong> Right knee pain x3 months
            <br />
            <br />
            <strong>HPI:</strong> 65-year-old female presents with progressive right knee pain, worse with
            weight-bearing activities and stairs. Denies trauma. Has tried PT and OTC analgesics without relief.
            <br />
            <br />
            <strong>Assessment:</strong> Moderate to severe osteoarthritis of the right knee with functional limitation.
            Failed conservative treatment. Candidate for total knee replacement.
            <br />
            <br />
            <strong>Plan:</strong> Refer to orthopedic surgery for TKR evaluation.
          </div>
        </div>
      </div>

      {/* NLP Extraction Results */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          NLP Extraction Results
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          <div style={kpiCardStyle}>
            <div style={kpiLabelStyle}>Conditions</div>
            <div style={{ marginTop: "12px" }}>
              <div style={{ marginBottom: "8px", fontSize: "13px" }}>
                <strong>Osteoarthritis, Right Knee</strong>
                <br />
                <span style={{ color: "#6b7280" }}>ICD-10: M17.11</span>
              </div>
              <div style={{ fontSize: "13px" }}>
                <strong>Pain, Knee</strong>
                <br />
                <span style={{ color: "#6b7280" }}>ICD-10: M25.561</span>
              </div>
            </div>
          </div>
          <div style={kpiCardStyle}>
            <div style={kpiLabelStyle}>Medications</div>
            <div style={{ marginTop: "12px" }}>
              <div style={{ marginBottom: "8px", fontSize: "13px" }}>
                <strong>Ibuprofen 400mg</strong>
                <br />
                <span style={{ color: "#6b7280" }}>RxNorm: 203734</span>
              </div>
              <div style={{ fontSize: "13px" }}>
                <strong>Acetaminophen 500mg</strong>
                <br />
                <span style={{ color: "#6b7280" }}>RxNorm: 198440</span>
              </div>
            </div>
          </div>
          <div style={kpiCardStyle}>
            <div style={kpiLabelStyle}>Procedures</div>
            <div style={{ marginTop: "12px" }}>
              <div style={{ fontSize: "13px" }}>
                <strong>Total Knee Replacement</strong>
                <br />
                <span style={{ color: "#6b7280" }}>CPT: 27447</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Specificity Analysis */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Code Specificity Analysis
        </h2>
        <div style={kpiCardStyle}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", width: "100px" }}>Current:</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>M17 (Osteoarthritis)</span>
              <span style={{ color: "#f97316", marginLeft: "8px" }}>⚠ Too broad</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", width: "100px" }}>Recommended:</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>M17.11 (Primary OA, Right Knee)</span>
              <span style={{ color: "#059669", marginLeft: "8px" }}>✓ Specific</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", marginTop: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", width: "100px" }}>Needed:</span>
              <span style={{ fontSize: "13px", color: "#374151" }}>
                Include severity level (moderate to severe) and bilateral status in documentation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CCI Bundling Check */}
      <div style={kpiCardStyle}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          CCI Bundling Check
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Primary Code</th>
              <th style={thStyle}>Secondary Code</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>27447 (TKR)</td>
              <td style={tdStyle}>27370 (Arthrotomy)</td>
              <td style={tdStyle}>
                <span style={statusBadgeStyle("Denied")}>Bundled</span>
              </td>
              <td style={tdStyle}>Do not bill separately</td>
            </tr>
            <tr>
              <td style={tdStyle}>27447 (TKR)</td>
              <td style={tdStyle}>99213 (Office Visit)</td>
              <td style={tdStyle}>
                <span style={statusBadgeStyle("Approved")}>Billable</span>
              </td>
              <td style={tdStyle}>Modifier 25 may be required</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        HIPAA Compliance
      </h1>

      {/* Compliance Layers */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Security Layers
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {[
            { name: "PHI Detection", icon: "🔍", status: "Active" },
            { name: "Encryption", icon: "🔒", status: "AES-256" },
            { name: "RBAC", icon: "👥", status: "Enforced" },
            { name: "Audit Logging", icon: "📝", status: "Real-time" },
            { name: "Clinical Safety", icon: "⚕️", status: "Enabled" },
          ].map((layer) => (
            <div
              key={layer.name}
              style={{
                ...kpiCardStyle,
                marginBottom: 0,
                textAlign: "center",
                borderTop: "4px solid #059669",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>{layer.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>{layer.name}</div>
              <div style={{ fontSize: "12px", color: "#059669", marginTop: "8px", fontWeight: "600" }}>
                {layer.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Audit Log
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Timestamp</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Action</th>
              <th style={thStyle}>Resource</th>
            </tr>
          </thead>
          <tbody>
            {auditLogData.map((log, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{log.timestamp}</td>
                <td style={tdStyle}>{log.user}</td>
                <td style={tdStyle}>{log.action}</td>
                <td style={tdStyle}>{log.resource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RBAC Matrix */}
      <div style={kpiCardStyle}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Role-Based Access Control (RBAC)
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>View PAs</th>
              <th style={thStyle}>Approve PAs</th>
              <th style={thStyle}>Code Encounters</th>
              <th style={thStyle}>View Reports</th>
              <th style={thStyle}>Export Data</th>
            </tr>
          </thead>
          <tbody>
            {[
              { role: "Physician", perms: [true, true, false, true, false] },
              { role: "Coding Team", perms: [true, false, true, true, false] },
              { role: "Admin", perms: [true, true, true, true, true] },
              { role: "Analyst", perms: [true, false, false, true, true] },
            ].map((row) => (
              <tr key={row.role}>
                <td style={tdStyle}>{row.role}</td>
                {row.perms.map((perm, idx) => (
                  <td key={idx} style={tdStyle}>
                    {perm ? (
                      <span style={{ color: "#059669", fontWeight: "600" }}>✓</span>
                    ) : (
                      <span style={{ color: "#d1d5db", fontWeight: "600" }}>—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        Revenue Analytics
      </h1>

      {/* Denial Trend */}
      <div style={{ ...kpiCardStyle, marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Denial Rate Trend (12 Weeks)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={denialTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Line type="monotone" dataKey="rate" stroke="#059669" dot={{ fill: "#059669" }} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Denial Breakdown & Revenue Impact */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        <div style={kpiCardStyle}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
            Denial Breakdown by Reason
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={denialBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {denialBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={kpiCardStyle}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
            Revenue Impact by Payer
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByPayerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="payer" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Bar dataKey="recovered" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Denied CPT Codes */}
      <div style={kpiCardStyle}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
          Top Denied CPT Codes
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>CPT Code</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Denials (YTD)</th>
              <th style={thStyle}>Denial Rate</th>
              <th style={thStyle}>Top Reason</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                code: "27447",
                desc: "Total Knee Replacement",
                denials: 14,
                rate: "8.2%",
                reason: "Documentation",
              },
              { code: "73721", desc: "MRI Knee", denials: 12, rate: "11.5%", reason: "Medical Necessity" },
              {
                code: "70450",
                desc: "CT Head/Brain",
                denials: 18,
                rate: "13.4%",
                reason: "Coding",
              },
              {
                code: "93306",
                desc: "Echocardiogram",
                denials: 9,
                rate: "6.8%",
                reason: "Eligibility",
              },
              { code: "99285", desc: "ED Visit - High", denials: 11, rate: "9.1%", reason: "Documentation" },
            ].map((row) => (
              <tr key={row.code}>
                <td style={tdStyle}>{row.code}</td>
                <td style={tdStyle}>{row.desc}</td>
                <td style={tdStyle}>{row.denials}</td>
                <td style={tdStyle}>{row.rate}</td>
                <td style={tdStyle}>{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
          <div>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937" }}>
              Clinical AI Platform
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Meridian Health Partners</div>
          </div>
        </div>
        <button
          onClick={onExit}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e5e7eb",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            color: "#374151",
          }}
        >
          ← Back
        </button>
      </div>

      {/* Main layout */}
      <div style={containerStyle}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveView(item.id)}
              style={sidebarItemStyle(activeView === item.id)}
            >
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              {sidebarExpanded && <span style={{ fontSize: "14px" }}>{item.label}</span>}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={mainContentStyle}>
          {activeView === "command" && renderCommandCenter()}
          {activeView === "priorauth" && renderPriorAuth()}
          {activeView === "coding" && renderMedicalCoding()}
          {activeView === "compliance" && renderCompliance()}
          {activeView === "analytics" && renderAnalytics()}
        </div>
      </div>
    </div>
  );
};

export default ClinicalAIDemo;
