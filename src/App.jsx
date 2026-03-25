import React, { useState, useEffect } from "react";
import { PRODUCTS, CATEGORIES, FEATURED_CASES, MARQUEE_IDS } from "./data/products";
import { AI_ECONOMICS, PORTFOLIO_ECONOMICS, MODEL_ROUTING_PATTERNS } from "./data/aiEconomics";
import DASHBOARDS from "./data/dashboards";
import DASHBOARD_COMPONENTS, { DataPipeline } from "./components/Dashboards";
import DOMAIN_ICONS from "./components/Icons";
import HomeConnectDemo from "./HomeConnect";
import FieldCommandDemo from "./FieldCommand";
import ContractIntelDemo from "./ContractIntel";
import PortfolioIntelDemo from "./PortfolioIntel";
import AgentOrchDemo from "./AgentOrchDemo";
import ClinicalAIDemo from "./ClinicalAIDemo";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
const getCurrentPage = () => {
  const hash = window.location.hash.slice(1);
  return hash || "home";
};

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================
function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (page) => {
    window.location.hash = page;
    setMobileMenuOpen(false);
  };

  return (
    <nav>
      <div className="container">
        <a className="logo" href="#home" style={{ cursor: "pointer" }}>Jacob George</a>
        <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          <a onClick={() => navigate("home")} style={{ cursor: "pointer" }}>Products</a>
          <a onClick={() => navigate("methodology")} style={{ cursor: "pointer" }}>Methodology</a>
          <a onClick={() => navigate("about")} style={{ cursor: "pointer" }}>About</a>
          <a href="https://github.com/riiiiiicoooo" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <span>Jacob George · 2026</span>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/jacob-g-17630a127/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span>·</span>
            <a href="https://github.com/riiiiiicoooo" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span>·</span>
            <a href="mailto:jacob.georgenyc@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// AI ECONOMICS BANNER
// ============================================================================
function AIEconomicsBanner() {
  return (
    <div style={{
      background: "#111",
      color: "#fff",
      padding: "32px 0",
      margin: "48px 0",
      textAlign: "center",
      fontSize: "14px",
      fontFamily: "monospace",
      letterSpacing: "0.05em"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          color: "#fff"
        }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>$24K/mo</div>
            <div style={{ color: "#aaa", fontSize: "12px" }}>LLM Spend Managed</div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>60%</div>
            <div style={{ color: "#aaa", fontSize: "12px" }}>Avg Cost Reduction</div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>6</div>
            <div style={{ color: "#aaa", fontSize: "12px" }}>Models Routed</div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>6</div>
            <div style={{ color: "#aaa", fontSize: "12px" }}>AI Products Deployed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HOMEPAGE
// ============================================================================
function HomePage() {
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeaturedIdx((prev) => (prev + 1) % FEATURED_CASES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentFeatured = FEATURED_CASES[currentFeaturedIdx];
  const currentProduct = PRODUCTS.find((p) => p.id === currentFeatured.id);

  const filteredProducts = filter === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-name">Jacob George</h1>
          <p className="hero-tagline">Principal PM building AI products from zero to production.</p>
          <p>Metrics-first decision making. Deterministic guardrails. Model routing at scale.</p>
          <div className="stats-row">
            <div className="stat">
              <div className="num">15</div>
              <div className="label">Products</div>
            </div>
            <div className="stat">
              <div className="num">8</div>
              <div className="label">Industries</div>
            </div>
            <div className="stat">
              <div className="num">$35M+</div>
              <div className="label">Value Created</div>
            </div>
            <div className="stat">
              <div className="num">7</div>
              <div className="label">In Production</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Economics Banner */}
      <AIEconomicsBanner />

      {/* Architecture Patterns */}
      <section style={{ padding: "48px 0" }}>
        <div className="container">
          <h2 style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "32px",
            textAlign: "center",
            letterSpacing: "-0.01em"
          }}>
            5 AI Architecture Patterns
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              padding: "24px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Model Routing</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>
                Route requests to specialized models based on intent, cost, or quality thresholds. Contract Intelligence uses Claude (94% accuracy) as primary with GPT-4 fallback.
              </p>
            </div>
            <div style={{
              padding: "24px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Agent Orchestration</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>
                Multi-agent coordination with lightweight classifier supervisor. 60% cost reduction via Haiku intent routing before invoking primary agents.
              </p>
            </div>
            <div style={{
              padding: "24px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Cost Architecture</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>
                Deterministic guardrails reduce token costs 70% by filtering requests before LLM invocation. GenAI Governance: $0.03/interaction.
              </p>
            </div>
            <div style={{
              padding: "24px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Deterministic Guardrails</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>
                Five-layer compliance enforcement (BAA, prompt injection, output validation). Clinical AI achieves healthcare audit trail without LLM overhead.
              </p>
            </div>
            <div style={{
              padding: "24px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Memory Persistence</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>
                Semantic caching and conversation continuity. Agent Orchestration: 37% prompt cache hit rate reduces per-task cost from $0.51 to $0.08.
              </p>
            </div>
            <div style={{
              padding: "24px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Active Learning</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>
                Automated feedback loops from production to improve models. AI Data Operations: 40% fewer labels needed to hit same model quality targets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study Carousel */}
      <section style={{ padding: "48px 0", borderTop: "1px solid #e5e7eb" }}>
        <div className="container">
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Featured Case Study</h2>
          {currentProduct && (
            <div
              className="featured-product"
              onClick={() => {
                window.location.hash = currentProduct.id;
              }}
            >
              <div style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6366f1",
                fontWeight: 700,
                marginBottom: "16px"
              }}>
                {currentProduct.domain}
              </div>
              <div className="featured-content">
                <div className="featured-icon">
                  {DOMAIN_ICONS[currentProduct.domain]}
                </div>
                <div className="featured-info">
                  <div className="featured-title">{currentProduct.name}</div>
                  <div className="featured-desc">{currentProduct.tagline}</div>
                </div>
                {currentProduct.metrics && (
                  <div className="featured-metrics">
                    {currentProduct.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="featured-stat">
                        <span className="featured-val">{m.value}</span>
                        <div className="featured-stat-label">{m.label.split("/")[0]}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="featured-arrow">→</div>
              </div>
              <div className="featured-dots">
                {FEATURED_CASES.map((_, i) => (
                  <button
                    key={i}
                    className={`featured-dot ${i === currentFeaturedIdx ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentFeaturedIdx(i);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ padding: "48px 0", borderTop: "1px solid #e5e7eb" }}>
        <div className="container">
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Deep-Dive Case Studies</h2>
          <div className="filter-bar">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => {
                  window.location.hash = product.id;
                }}
              >
                <div className={`card-stage stage-${product.stage.toLowerCase().replace(/\s+/g, "-")}`}>
                  {product.stage}
                </div>
                <div className="card-icon">
                  {DOMAIN_ICONS[product.domain]}
                </div>
                <div className="card-domain">{product.domain}</div>
                <h3 className="card-title">{product.name}</h3>
                <p className="card-desc">{product.tagline}</p>
                {product.metrics && product.metrics[0] && (
                  <div className="card-metric">
                    <span className="val">{product.metrics[0].value}</span>
                    <span className="context">{product.metrics[0].label}</span>
                  </div>
                )}
                <div className="card-tags">
                  {product.tech.slice(0, 2).map((t, i) => (
                    <span key={i} className="card-tag">{t}</span>
                  ))}
                </div>
                <div className="card-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// CASE STUDY PAGE
// ============================================================================
function CaseStudyPage({ productId }) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return <div className="container" style={{ padding: "40px 0" }}>Product not found</div>;

  const aiEcon = AI_ECONOMICS[productId];
  const dashboard = DASHBOARDS[productId];
  const DashboardComponent = DASHBOARD_COMPONENTS[productId];

  return (
    <div className="detail-page">
      <div className="container">
        {/* Back Button */}
        <div
          className="back-btn"
          onClick={() => {
            window.location.hash = "home";
          }}
        >
          ← Back to Products
        </div>

        {/* Header */}
        <div className="detail-header">
          <div className="detail-icon-row">
            <div className="detail-icon">
              {DOMAIN_ICONS[product.domain]}
            </div>
            <div>
              <div className="detail-domain">{product.domain}</div>
              <h1 className="detail-title">{product.name}</h1>
              <p className="detail-subtitle">{product.tagline}</p>
            </div>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="metrics-banner">
          {product.metrics.map((m, i) => (
            <div key={i} className="metric-item">
              <div className="metric-val">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              {m.prev && <div className="metric-prev">{m.prev}</div>}
            </div>
          ))}
        </div>

        {/* AI Economics Card */}
        {aiEcon && aiEcon.hasAI && (
          <div style={{
            border: "1px solid #e0e7ff",
            borderLeft: "4px solid #8b5cf6",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "48px",
            background: "linear-gradient(135deg, #fafafa 0%, #f5f3ff 100%)"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "#111" }}>
              AI Economics
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px"
            }}>
              {aiEcon.models && (
                <div>
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Models
                  </div>
                  {aiEcon.models.map((m, i) => (
                    <div key={i} style={{ fontSize: "13px", marginBottom: "4px", color: "#374151" }}>
                      <strong>{m.name}</strong> ({m.share}%) — {m.role}
                    </div>
                  ))}
                </div>
              )}
              {aiEcon.costPerTask && (
                <div>
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Cost Structure
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
                    ${aiEcon.costPerTask.amount || "N/A"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>{aiEcon.costPerTask.unit}</div>
                </div>
              )}
              {aiEcon.monthlySpend && (
                <div>
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Monthly Spend
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
                    ${aiEcon.monthlySpend.current.toLocaleString()}
                  </div>
                  {aiEcon.monthlySpend.savings && (
                    <div style={{ fontSize: "12px", color: "#059669", fontWeight: 600 }}>
                      {aiEcon.monthlySpend.savings} savings
                    </div>
                  )}
                </div>
              )}
            </div>
            {aiEcon.keyEconomicInsight && (
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>
                  <strong>Key Insight:</strong> {aiEcon.keyEconomicInsight}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Section */}
        {DashboardComponent && dashboard && (
          <div className="dashboard-section">
            <h2 style={{
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "24px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              System Metrics
            </h2>
            <DashboardComponent data={dashboard} pipeline={product.pipeline} />
          </div>
        )}

        {/* What I Built */}
        <div className="section">
          <h2 className="section-title">What I Built</h2>
          <div className="section-body" style={{ marginBottom: "24px" }}>{product.description}</div>

          {/* The Problem — context for what drove the build */}
          <div style={{
            padding: "16px 20px",
            background: "#f9fafb",
            borderLeft: "3px solid #6366f1",
            borderRadius: "0 8px 8px 0",
            marginBottom: "20px"
          }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#4f46e5", marginBottom: "8px" }}>The Problem</h3>
            <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7 }}>{product.problem}</div>
          </div>

          {/* What I Decided — nested under What I Built */}
          <div style={{
            padding: "16px 20px",
            background: "#faf5ff",
            borderLeft: "3px solid #8b5cf6",
            borderRadius: "0 8px 8px 0",
            marginBottom: product.pivot ? "20px" : "0"
          }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#7c3aed", marginBottom: "8px" }}>What I Decided</h3>
            <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7 }}>{product.solution}</div>
          </div>

          {/* What I Changed — nested under What I Built */}
          {product.pivot && (
            <div style={{
              padding: "16px 20px",
              background: "#fffbeb",
              borderLeft: "3px solid #f59e0b",
              borderRadius: "0 8px 8px 0"
            }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#d97706", marginBottom: "8px" }}>What I Changed</h3>
              <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7 }}>{product.pivot}</div>
            </div>
          )}
        </div>

        {/* My Role */}
        <div className="role-section">
          <h2 className="section-title">My Role</h2>
          <div style={{ fontSize: "15px", color: "#374151", lineHeight: 1.7 }}>
            {product.role}
          </div>
        </div>

        {/* Operational Maturity */}
        {product.operationalDocs && (
          <div className="section">
            <h2 className="section-title">Operational Maturity</h2>
            {product.operationalDocs.slos && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>SLOs</h3>
                <ul style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, paddingLeft: "20px" }}>
                  {product.operationalDocs.slos.map((slo, i) => (
                    <li key={i}>{slo}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.operationalDocs.capacityHighlight && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>Capacity</h3>
                <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>
                  {product.operationalDocs.capacityHighlight}
                </p>
              </div>
            )}
            {product.operationalDocs.runbooks && (
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>Runbooks</h3>
                <ul style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, paddingLeft: "20px" }}>
                  {product.operationalDocs.runbooks.map((rb, i) => (
                    <li key={i}>{rb}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Technology Stack */}
        <div className="section">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-list">
            {product.tech.map((t, i) => (
              <span key={i} className="tech-chip">{t}</span>
            ))}
          </div>
          {product.github && (
            <div style={{ marginTop: "16px" }}>
              <a href={product.github} target="_blank" rel="noopener noreferrer" style={{
                fontSize: "14px",
                color: "#111",
                fontWeight: 600,
                padding: "10px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                display: "inline-block",
                transition: "all 0.15s"
              }}>
                View on GitHub →
              </a>
            </div>
          )}
        </div>

        {/* Architecture */}
        {product.architecture && (
          <div className="section">
            <h2 className="section-title">Architecture</h2>
            <div className="architecture-desc">{product.architecture}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// METHODOLOGY PAGE
// ============================================================================
function MethodologyPage() {
  const questions = [
    {
      title: "What's the quantified problem?",
      desc: "You can't improve what you don't measure. Every project starts with a clear baseline: the customer's cost of doing nothing.",
      examples: "AgentGate: 23 credential exposures in 6 months, $4,200 token incident. Contract Intelligence: 3-5 contracts/hour manual review taking 2-3 weeks."
    },
    {
      title: "Who are the actual users, and what do they actually do?",
      desc: "The described workflow is never the real workflow. Embedded research beats surveys. Watch them work.",
      examples: "M&A attorneys: mapping linearity through contract review, not keyword search. Annotation teams: showing mislabeling patterns, not average throughput."
    },
    {
      title: "What does success look like, and how will we measure it?",
      desc: "Success metrics drive decision-making. Vague targets fail. Define primary metrics (credential exposure reduction, extraction accuracy) and track them obsessively.",
      examples: "AgentGate: 0 credential exposures. Contract Intelligence: 94%+ extraction accuracy. Marketplace: 92% verification completion within 30 days."
    },
    {
      title: "What are the key decisions, and what tradeoffs are we accepting?",
      desc: "Every product is a series of conscious tradeoffs. OAuth 2.0 over mTLS. Claude primary with GPT-4 fallback. Provisional tier for marketplace launch.",
      examples: "These decisions get surfaced in the case studies. The better ones explain the analysis that led to the call."
    },
    {
      title: "How do we get from here to there without breaking what works?",
      desc: "Phased rollouts. Pilots. Cold start strategies. Release gates. The path matters as much as the destination.",
      examples: "Marketplace: focus existing 45 suppliers before new acquisition. Launched with provisional tier to reduce verification friction."
    }
  ];

  return (
    <div style={{ padding: "60px 0 80px" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "32px"
        }}>
          How I Build Products
        </h1>
        <p style={{
          fontSize: "18px",
          color: "#666",
          lineHeight: 1.7,
          marginBottom: "48px"
        }}>
          Five questions that show up in every project, regardless of domain or company size.
        </p>

        <div style={{ marginBottom: "60px" }}>
          {questions.map((q, i) => (
            <div key={i} style={{
              marginBottom: "40px",
              paddingBottom: "40px",
              borderBottom: i < questions.length - 1 ? "1px solid #e5e7eb" : "none"
            }}>
              <h2 style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "12px",
                color: "#111"
              }}>
                {i + 1}. {q.title}
              </h2>
              <p style={{
                fontSize: "15px",
                color: "#374151",
                lineHeight: 1.7,
                marginBottom: "12px"
              }}>
                {q.desc}
              </p>
              <p style={{
                fontSize: "13px",
                color: "#666",
                lineHeight: 1.6,
                fontStyle: "italic"
              }}>
                <strong>From my work:</strong> {q.examples}
              </p>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: "48px", borderTop: "1px solid #e5e7eb" }}>
          <h2 style={{
            fontSize: "22px",
            fontWeight: 700,
            marginBottom: "24px"
          }}>
            Cross-Industry Patterns
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              padding: "20px",
              background: "#fafafa",
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>
                Multi-model routing
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                Route by intent, cost, or quality. Contract Intelligence, Agent Orchestration, GenAI Governance.
              </p>
            </div>
            <div style={{
              padding: "20px",
              background: "#fafafa",
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>
                Deterministic guardrails
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                Compliance without token cost. GenAI Governance, AgentGate, Clinical AI.
              </p>
            </div>
            <div style={{
              padding: "20px",
              background: "#fafafa",
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>
                Offline-first architecture
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                Deterministic first, LLM fallback. Field Sales Command, Marketplace.
              </p>
            </div>
            <div style={{
              padding: "20px",
              background: "#fafafa",
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>
                Progressive verification
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                List immediately, unlock features as trust increases. Verified Marketplace.
              </p>
            </div>
            <div style={{
              padding: "20px",
              background: "#fafafa",
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>
                Active learning loops
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                Production feedback improves models. AI Data Operations, Portfolio Intelligence.
              </p>
            </div>
            <div style={{
              padding: "20px",
              background: "#fafafa",
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>
                Double-entry ledger
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                Immutable audit trail. Fintech Operations, AgentGate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ABOUT PAGE
// ============================================================================
function AboutPage() {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <h1 className="about-title">Jacob George</h1>
          <div className="about-lead">
            Principal PM with 10+ years building AI products from zero to production across fintech, healthcare, legal, marketplace, and enterprise SaaS.
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            margin: "40px 0",
            padding: "24px",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em" }}>15</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Products</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em" }}>8</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Industries</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em" }}>7</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>In Production</div>
            </div>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: "16px"
            }}>
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ paddingBottom: "16px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "2px" }}>
                  Ampersand Consulting — Principal PM
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>2023 - Present</div>
              </div>
              <div style={{ paddingBottom: "16px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "2px" }}>
                  Avanade (Accenture & Microsoft JV) — Senior Product Manager
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>2022</div>
              </div>
              <div style={{ paddingBottom: "16px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "2px" }}>
                  JPI — Senior Product Strategy
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>2019 - 2022</div>
              </div>
              <div style={{ paddingBottom: "16px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "2px" }}>
                  Deloitte — Strategy Consultant
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>2017 - 2019</div>
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "2px" }}>
                  ICF — Business Analyst
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>2016 - 2017</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: "16px"
            }}>
              Education & Credentials
            </h2>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
              <strong>B.S. Neuroscience</strong> — Temple University
            </p>
            <p style={{ fontSize: "13px", color: "#666" }}>
              CSPO · CSM · SAFe
            </p>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: "16px"
            }}>
              Domains
            </h2>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7 }}>
              AI/ML · Fintech · Healthcare · Legal · Real Estate · Enterprise SaaS
            </p>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: "16px"
            }}>
              Stakeholder Range
            </h2>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7 }}>
              CISOs · CFOs · NCUA Examiners · M&A Partners · Field Sales Teams
            </p>
          </div>

          <div style={{
            paddingTop: "32px",
            borderTop: "1px solid #e5e7eb"
          }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: "16px"
            }}>
              Get in Touch
            </h2>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://www.linkedin.com/in/jacob-g-17630a127/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button primary"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/riiiiiicoooo"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button secondary"
              >
                GitHub
              </a>
              <a
                href="mailto:jacob.georgenyc@gmail.com"
                className="cta-button secondary"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [page, setPage] = useState(getCurrentPage());

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getCurrentPage());
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Demo pages
  const demoPages = {
    "homeconnect-demo": HomeConnectDemo,
    "fieldcommand-demo": FieldCommandDemo,
    "contractintel-demo": ContractIntelDemo,
    "portfoliointel-demo": PortfolioIntelDemo,
    "agentorch-demo": AgentOrchDemo,
    "clinicalai-demo": ClinicalAIDemo,
  };

  let content;
  if (page === "home" || page === "") {
    content = <HomePage />;
  } else if (page === "methodology") {
    content = <MethodologyPage />;
  } else if (page === "about") {
    content = <AboutPage />;
  } else if (demoPages[page]) {
    const DemoComponent = demoPages[page];
    content = <DemoComponent />;
  } else if (PRODUCTS.find((p) => p.id === page)) {
    // Validated product ID
    content = <CaseStudyPage productId={page} />;
  } else {
    // Unknown route — fallback to home
    content = <HomePage />;
  }

  return (
    <>
      <Nav />
      <main>{content}</main>
      <Footer />
    </>
  );
}
