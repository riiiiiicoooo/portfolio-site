import React, { useState } from "react";

// ============================================================================
// VERIFIED SERVICES MARKETPLACE DEMO - Interactive Showcase
// ============================================================================

// --- COLOR PALETTE ---
const colors = {
  primary: "#c2410c",
  primaryDark: "#9a3412",
  lightBg: "#fff7ed",
  green: "#16a34a",
  amber: "#d97706",
  red: "#dc2626",
  gray: "#6b7280",
  grayLight: "#f3f4f6",
  grayLighter: "#f9fafb",
  border: "#e5e7eb",
  text: "#111827",
};

// --- SEED DATA ---
const PROVIDERS = [
  {
    id: "pl1",
    name: "Premier Plumbing Co.",
    category: "Plumbing",
    tier: "Elite",
    rating: 4.9,
    reviews: 127,
    distance: 2.3,
    verifications: ["Licensed", "Insured", "Background Checked"],
    profileBio: "22 years in metro Atlanta. Same-day emergency service, transparent pricing before we start any work.",
    serviceArea: "15 mi radius from Midtown Atlanta",
    responseTime: "Avg 23 min",
    completionRate: "98.4%",
    license: "GA License #PLM-2024-8847",
    insurance: "3 active ACORD policies",
    stripeConnectStatus: "Active",
    monthlyEarnings: 8200,
    lastMonthEarnings: 7600,
    totalEarnings: 89400,
  },
  {
    id: "el1",
    name: "Bright Spark Electric",
    category: "Electrical",
    tier: "Preferred",
    rating: 4.7,
    reviews: 89,
    distance: 3.1,
    verifications: ["Licensed", "Insured"],
  },
  {
    id: "hv1",
    name: "ATL Climate Control",
    category: "HVAC",
    tier: "Elite",
    rating: 4.8,
    reviews: 156,
    distance: 1.8,
    verifications: ["Licensed", "Insured", "Background Checked"],
  },
  {
    id: "cl1",
    name: "Sparkle Clean Services",
    category: "Cleaning",
    tier: "Standard",
    rating: 4.5,
    reviews: 42,
    distance: 4.2,
    verifications: ["Identity Verified", "Insured"],
  },
  {
    id: "ls1",
    name: "Green Thumb Landscaping",
    category: "Landscaping",
    tier: "Preferred",
    rating: 4.6,
    reviews: 71,
    distance: 5.5,
    verifications: ["Licensed", "Insured"],
  },
];

const CATEGORIES = ["All", "Plumbing", "Electrical", "HVAC", "Cleaning", "Landscaping"];

const RECENT_REVIEWS = [
  {
    text: "Outstanding work on kitchen remodel. Finished 3 days early and quality was exceptional.",
    rating: 5,
    date: "2 days ago",
  },
  {
    text: "Fixed emergency pipe burst quickly. Professional crew, minimal water damage.",
    rating: 5,
    date: "1 week ago",
  },
  {
    text: "Professional and on-time. Minor touch-ups needed but they came back immediately.",
    rating: 4,
    date: "2 weeks ago",
  },
];

const PAST_JOBS = [
  { name: "HVAC Annual Service", provider: "ATL Climate Control", status: "Completed", cost: 280, rating: 5, date: "3 months ago" },
  { name: "Electrical Panel Upgrade", provider: "Bright Spark Electric", status: "Completed", cost: 1200, rating: 5, date: "5 months ago" },
  { name: "Deep Clean", provider: "Sparkle Clean Services", status: "Completed", cost: 180, rating: 4, date: "6 months ago" },
];

const VERIFICATION_LAYERS = [
  { name: "Identity Verification", status: "Completed", detail: "Checkr Verified", expires: "Never" },
  { name: "License Verification", status: "Completed", detail: "Active - GA #PLM-2024-8847", expires: "Dec 2026" },
  { name: "Insurance", status: "Completed", detail: "Active - 3 ACORD policies", expires: "Jun 2026" },
  { name: "Financial Setup", status: "Completed", detail: "Stripe Connect active - Last payout: $3,400", expires: "Active" },
  { name: "Reputation Score", status: "Completed", detail: "4.9/5.0 - Elite tier (top 11%)", expires: "Live" },
];

// --- COMPONENT ---
export default function MarketplaceDemo({ onExit }) {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[0]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setCurrentScreen("profile");
  };

  const TierBadge = ({ tier }) => {
    const tierColors = {
      Elite: { bg: "#fcd34d", text: "#92400e" },
      Preferred: { bg: "#c7d2fe", text: "#3730a3" },
      Standard: { bg: "#d1d5db", text: "#374151" },
    };
    const colors_tier = tierColors[tier] || tierColors.Standard;
    return (
      <span
        style={{
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: "4px",
          fontSize: "11px",
          fontWeight: "600",
          backgroundColor: colors_tier.bg,
          color: colors_tier.text,
          textTransform: "uppercase",
        }}
      >
        {tier}
      </span>
    );
  };

  const PhoneFrame = ({ children }) => (
    <div
      style={{
        width: "375px",
        height: "812px",
        backgroundColor: "#000",
        borderRadius: "40px",
        border: "12px solid #000",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "30px",
          backgroundColor: "#000",
          borderBottom: `1px solid ${colors.border}`,
        }}
      />
      <div style={{ flex: 1, overflow: "hidden", backgroundColor: "#fff" }}>{children}</div>
    </div>
  );

  // INTRO SCREEN
  if (currentScreen === "intro") {
    return (
      <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <button
          onClick={onExit}
          style={{
            padding: "8px 16px",
            marginBottom: "40px",
            backgroundColor: colors.grayLight,
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            color: colors.text,
            transition: "all .2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
          onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
        >
          ← Back to Portfolio
        </button>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            color: colors.text,
            marginBottom: "16px",
            lineHeight: "1.1",
          }}
        >
          Verified Services Marketplace
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: colors.gray,
            marginBottom: "40px",
            maxWidth: "700px",
            lineHeight: "1.6",
          }}
        >
          Trust-first two-sided marketplace with five-layer verification, intelligent PostGIS matching, and Stripe Connect escrow payments.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          <div style={{ padding: "24px", backgroundColor: colors.lightBg, borderRadius: "12px" }}>
            <div style={{ fontSize: "28px", fontWeight: "700", color: colors.primary, marginBottom: "8px" }}>4x</div>
            <div style={{ fontSize: "14px", color: colors.gray }}>Throughput Increase</div>
          </div>
          <div style={{ padding: "24px", backgroundColor: colors.lightBg, borderRadius: "12px" }}>
            <div style={{ fontSize: "28px", fontWeight: "700", color: colors.primary, marginBottom: "8px" }}>$15M+</div>
            <div style={{ fontSize: "14px", color: colors.gray }}>Year 1 GMV</div>
          </div>
          <div style={{ padding: "24px", backgroundColor: colors.lightBg, borderRadius: "12px" }}>
            <div style={{ fontSize: "28px", fontWeight: "700", color: colors.primary, marginBottom: "8px" }}>94%</div>
            <div style={{ fontSize: "14px", color: colors.gray }}>Verification Rate</div>
            <div style={{ fontSize: "12px", color: colors.gray, marginTop: "4px" }}>from 15%</div>
          </div>
          <div style={{ padding: "24px", backgroundColor: colors.lightBg, borderRadius: "12px" }}>
            <div style={{ fontSize: "28px", fontWeight: "700", color: colors.primary, marginBottom: "8px" }}>&lt;2%</div>
            <div style={{ fontSize: "14px", color: colors.gray }}>Dispute Rate</div>
            <div style={{ fontSize: "12px", color: colors.gray, marginTop: "4px" }}>from 8.3%</div>
          </div>
        </div>

        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "16px" }}>Tech Stack</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {["FastAPI", "Supabase", "Next.js", "Stripe Connect", "Clerk", "PostGIS", "Trigger.dev", "Vercel"].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "6px 12px",
                  backgroundColor: colors.grayLight,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: colors.text,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen("home")}
          style={{
            padding: "14px 28px",
            backgroundColor: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all .2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = colors.primaryDark)}
          onMouseOut={(e) => (e.target.style.backgroundColor = colors.primary)}
        >
          Explore the App →
        </button>
      </div>
    );
  }

  // MARKETPLACE HOME SCREEN
  if (currentScreen === "home") {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <PhoneFrame>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fff" }}>
            {/* Header */}
            <div style={{ padding: "16px", borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.lightBg }}>
              <div style={{ fontSize: "14px", color: colors.gray, marginBottom: "12px" }}>📍 Atlanta Metro</div>
              <input
                type="text"
                placeholder="What do you need?"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Categories */}
            <div style={{ padding: "12px", borderBottom: `1px solid ${colors.border}`, display: "flex", overflowX: "auto", gap: "8px" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: selectedCategory === cat ? colors.primary : colors.grayLight,
                    color: selectedCategory === cat ? "#fff" : colors.text,
                    border: "none",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all .2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => {
                    if (selectedCategory !== cat) e.target.style.backgroundColor = colors.border;
                  }}
                  onMouseOut={(e) => {
                    if (selectedCategory !== cat) e.target.style.backgroundColor = colors.grayLight;
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Providers List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              {PROVIDERS.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => handleProviderClick(provider)}
                  style={{
                    padding: "12px",
                    marginBottom: "12px",
                    backgroundColor: colors.grayLighter,
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all .2s",
                    border: `1px solid ${colors.border}`,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.lightBg)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.grayLighter)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: colors.text }}>{provider.name}</div>
                      <TierBadge tier={provider.tier} />
                    </div>
                    <div style={{ fontSize: "13px", color: colors.gray }}>{provider.distance} mi</div>
                  </div>
                  <div style={{ fontSize: "13px", color: colors.gray, marginBottom: "6px" }}>⭐ {provider.rating} ({provider.reviews})</div>
                  <div style={{ fontSize: "12px", color: colors.gray, display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {provider.verifications.map((v) => (
                      <span key={v}>✓ {v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Button */}
            <div style={{ padding: "12px", borderTop: `1px solid ${colors.border}` }}>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: colors.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = colors.primaryDark)}
                onMouseOut={(e) => (e.target.style.backgroundColor = colors.primary)}
              >
                Post a Request
              </button>
            </div>
          </div>
        </PhoneFrame>

        {/* Navigation */}
        <div style={{ marginLeft: "40px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "12px" }}>
          <button
            onClick={() => setCurrentScreen("intro")}
            style={{
              padding: "8px 16px",
              backgroundColor: colors.grayLight,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              transition: "all .2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
          >
            ← Intro
          </button>
          <button
            onClick={() => setCurrentScreen("jobs")}
            style={{
              padding: "8px 16px",
              backgroundColor: colors.grayLight,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              transition: "all .2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
          >
            Jobs →
          </button>
          <button
            onClick={() => setCurrentScreen("verification")}
            style={{
              padding: "8px 16px",
              backgroundColor: colors.grayLight,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              transition: "all .2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
          >
            Dashboard →
          </button>
        </div>
      </div>
    );
  }

  // PROVIDER PROFILE SCREEN
  if (currentScreen === "profile") {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <PhoneFrame>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fff" }}>
            {/* Header */}
            <div style={{ padding: "16px", borderBottom: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setCurrentScreen("home")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: colors.primary,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.color = colors.primaryDark)}
                onMouseOut={(e) => (e.target.style.color = colors.primary)}
              >
                ← Back to Marketplace
              </button>
            </div>

            {/* Provider Header */}
            <div style={{ padding: "16px", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "16px", fontWeight: "700", color: colors.text }}>{selectedProvider.name}</div>
                <TierBadge tier={selectedProvider.tier} />
              </div>
              <div style={{ fontSize: "14px", color: colors.gray, marginBottom: "4px" }}>⭐ {selectedProvider.rating}/5.0 ({selectedProvider.reviews} reviews)</div>
            </div>

            {/* Trust Stack */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: colors.gray, textTransform: "uppercase", marginBottom: "12px" }}>Trust Stack (5-Layer)</div>

              {[
                { icon: "✓", name: "Identity", detail: "Checkr Verified" },
                { icon: "✓", name: "Qualification", detail: selectedProvider.license },
                { icon: "✓", name: "Accountability", detail: selectedProvider.insurance },
                { icon: "✓", name: "Financial", detail: "Stripe Connect escrow active" },
                { icon: "✓", name: "Reputation", detail: `${selectedProvider.rating}/5.0 (${selectedProvider.reviews} reviews)` },
              ].map((layer, idx) => (
                <div key={idx} style={{ marginBottom: "12px", padding: "12px", backgroundColor: colors.lightBg, borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ color: colors.green, fontWeight: "700" }}>{layer.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: colors.text }}>{layer.name}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: colors.gray, marginLeft: "20px" }}>{layer.detail}</div>
                </div>
              ))}

              <div style={{ marginTop: "16px", padding: "12px", backgroundColor: colors.grayLighter, borderRadius: "8px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>Service Details</div>
                <div style={{ fontSize: "12px", color: colors.gray, marginBottom: "6px" }}>📍 {selectedProvider.serviceArea}</div>
                <div style={{ fontSize: "12px", color: colors.gray, marginBottom: "6px" }}>⏱️ {selectedProvider.responseTime}</div>
                <div style={{ fontSize: "12px", color: colors.gray }}>✓ {selectedProvider.completionRate} completion rate</div>
              </div>

              {/* Recent Reviews */}
              <div style={{ marginTop: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: colors.gray, textTransform: "uppercase", marginBottom: "12px" }}>Recent Reviews</div>
                {RECENT_REVIEWS.map((review, idx) => (
                  <div key={idx} style={{ marginBottom: "10px", padding: "10px", backgroundColor: colors.grayLighter, borderRadius: "6px" }}>
                    <div style={{ fontSize: "11px", color: colors.gray, marginBottom: "4px" }}>⭐ {review.rating} stars • {review.date}</div>
                    <div style={{ fontSize: "12px", color: colors.text, lineHeight: "1.4" }}>{review.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div style={{ padding: "12px", borderTop: `1px solid ${colors.border}`, display: "flex", gap: "8px" }}>
              <button
                onClick={() => setCurrentScreen("request")}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: colors.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = colors.primaryDark)}
                onMouseOut={(e) => (e.target.style.backgroundColor = colors.primary)}
              >
                Request Service
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: colors.grayLight,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
                onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
              >
                Message
              </button>
            </div>
          </div>
        </PhoneFrame>

        {/* Navigation */}
        <div style={{ marginLeft: "40px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "12px" }}>
          <button
            onClick={() => setCurrentScreen("home")}
            style={{
              padding: "8px 16px",
              backgroundColor: colors.grayLight,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              transition: "all .2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
          >
            ← Marketplace
          </button>
        </div>
      </div>
    );
  }

  // REQUEST SERVICE SCREEN
  if (currentScreen === "request") {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <PhoneFrame>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fff" }}>
            {/* Header */}
            <div style={{ padding: "16px", borderBottom: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setCurrentScreen("profile")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: colors.primary,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.color = colors.primaryDark)}
                onMouseOut={(e) => (e.target.style.color = colors.primary)}
              >
                ← Back to Provider
              </button>
            </div>

            {/* Form */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: colors.text, display: "block", marginBottom: "6px" }}>Service Type</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                >
                  <option>Emergency Repair</option>
                  <option>Routine Maintenance</option>
                  <option>Installation</option>
                </select>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: colors.text, display: "block", marginBottom: "6px" }}>Description</label>
                <textarea
                  placeholder="Kitchen sink pipe burst, water damage to cabinet..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    fontSize: "13px",
                    minHeight: "80px",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: colors.lightBg, borderRadius: "6px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: colors.text, marginBottom: "6px" }}>Preferred Date/Time</div>
                <div style={{ fontSize: "13px", color: colors.gray }}>Today, ASAP</div>
              </div>

              <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: colors.lightBg, borderRadius: "6px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: colors.text, marginBottom: "6px" }}>Estimated Cost Range</div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: colors.primary }}>$150 - $350</div>
              </div>

              <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: colors.lightBg, borderRadius: "6px", border: `1px solid ${colors.amber}` }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: colors.text, marginBottom: "4px" }}>🔒 Escrow Protection</div>
                <div style={{ fontSize: "12px", color: colors.gray }}>Payment held in escrow until service completion</div>
              </div>

              <div style={{ marginBottom: "16px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Background Checked", "Licensed", "Insured"].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: colors.lightBg,
                      borderRadius: "4px",
                      fontSize: "11px",
                      color: colors.gray,
                    }}
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: "11px", color: colors.gray, fontStyle: "italic" }}>Funds released to provider 3-5 days after approval</div>
            </div>

            {/* Submit Button */}
            <div style={{ padding: "12px", borderTop: `1px solid ${colors.border}` }}>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: colors.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = colors.primaryDark)}
                onMouseOut={(e) => (e.target.style.backgroundColor = colors.primary)}
              >
                Submit Request — Pay $200 Escrow
              </button>
            </div>
          </div>
        </PhoneFrame>

        {/* Navigation */}
        <div style={{ marginLeft: "40px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "12px" }}>
          <button
            onClick={() => setCurrentScreen("profile")}
            style={{
              padding: "8px 16px",
              backgroundColor: colors.grayLight,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              transition: "all .2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
          >
            ← Profile
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE JOBS SCREEN
  if (currentScreen === "jobs") {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <PhoneFrame>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fff" }}>
            {/* Header */}
            <div style={{ padding: "16px", borderBottom: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setCurrentScreen("home")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: colors.primary,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.color = colors.primaryDark)}
                onMouseOut={(e) => (e.target.style.color = colors.primary)}
              >
                ← Back to Marketplace
              </button>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: colors.text, margin: "12px 0 0 0" }}>My Jobs</h2>
            </div>

            {/* Active Job */}
            <div style={{ padding: "16px", borderBottom: `2px solid ${colors.border}` }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: colors.gray, textTransform: "uppercase", marginBottom: "12px" }}>Active Job</div>
              <div style={{ padding: "12px", backgroundColor: colors.lightBg, borderRadius: "8px", marginBottom: "12px" }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "4px" }}>Kitchen Pipe Repair</div>
                <div style={{ fontSize: "12px", color: colors.gray, marginBottom: "8px" }}>{selectedProvider.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ padding: "3px 8px", backgroundColor: colors.amber, color: "#fff", borderRadius: "3px", fontSize: "11px", fontWeight: "600" }}>Provider En Route</span>
                  <span style={{ fontSize: "12px", color: colors.gray }}>ETA: 23 min</span>
                </div>
                <span style={{ padding: "3px 8px", backgroundColor: colors.green, color: "#fff", borderRadius: "3px", fontSize: "11px", fontWeight: "600" }}>$200 held</span>
              </div>

              <div style={{ fontSize: "11px", fontWeight: "600", color: colors.gray, textTransform: "uppercase", marginBottom: "8px" }}>Progress</div>
              <div style={{ display: "flex", gap: "4px", fontSize: "11px", color: colors.gray }}>
                <span style={{ color: colors.green }}>✓ Requested</span>
                <span>→</span>
                <span style={{ color: colors.green }}>✓ Accepted</span>
                <span>→</span>
                <span style={{ color: colors.amber, fontWeight: "600" }}>En Route</span>
                <span>→</span>
                <span>In Progress</span>
              </div>
            </div>

            {/* Past Jobs */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: colors.gray, textTransform: "uppercase", marginBottom: "12px" }}>Past Jobs</div>
              {PAST_JOBS.map((job, idx) => (
                <div key={idx} style={{ marginBottom: "12px", padding: "12px", backgroundColor: colors.grayLighter, borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "6px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: colors.text }}>{job.name}</div>
                      <div style={{ fontSize: "12px", color: colors.gray }}>{job.provider}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: colors.text }}>${job.cost}</div>
                      <div style={{ fontSize: "11px", color: colors.gray }}>⭐ {job.rating}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "11px", color: colors.gray }}>{job.date}</div>
                </div>
              ))}
            </div>
          </div>
        </PhoneFrame>

        {/* Navigation */}
        <div style={{ marginLeft: "40px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "12px" }}>
          <button
            onClick={() => setCurrentScreen("home")}
            style={{
              padding: "8px 16px",
              backgroundColor: colors.grayLight,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              transition: "all .2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
          >
            ← Marketplace
          </button>
        </div>
      </div>
    );
  }

  // VERIFICATION DASHBOARD SCREEN
  if (currentScreen === "verification") {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <PhoneFrame>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fff" }}>
            {/* Header */}
            <div style={{ padding: "16px", borderBottom: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setCurrentScreen("home")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: colors.primary,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.target.style.color = colors.primaryDark)}
                onMouseOut={(e) => (e.target.style.color = colors.primary)}
              >
                ← Back to Marketplace
              </button>
              <h2 style={{ fontSize: "15px", fontWeight: "700", color: colors.text, margin: "12px 0 0 0" }}>Provider Dashboard</h2>
              <div style={{ fontSize: "13px", color: colors.gray }}>{selectedProvider.name}</div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {/* Verification Progress */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: colors.text }}>Verification Progress</div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: colors.green }}>5/5 Complete (100%)</div>
                </div>
                <div style={{ height: "6px", backgroundColor: colors.border, borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", backgroundColor: colors.green, width: "100%" }} />
                </div>
              </div>

              {/* Verification Layers */}
              {VERIFICATION_LAYERS.map((layer, idx) => (
                <div key={idx} style={{ marginBottom: "12px", padding: "12px", backgroundColor: colors.lightBg, borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ color: colors.green, fontWeight: "700" }}>✓</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: colors.text }}>{layer.name}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: colors.gray, marginLeft: "20px", marginBottom: "4px" }}>{layer.detail}</div>
                  <div style={{ fontSize: "11px", color: colors.gray, marginLeft: "20px" }}>Expires: {layer.expires}</div>
                </div>
              ))}

              {/* Earnings */}
              <div style={{ marginTop: "20px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: colors.text, marginBottom: "12px" }}>Earnings</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ padding: "12px", backgroundColor: colors.grayLighter, borderRadius: "6px" }}>
                    <div style={{ fontSize: "11px", color: colors.gray, marginBottom: "4px" }}>This Month</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: colors.primary }}>${selectedProvider.monthlyEarnings.toLocaleString()}</div>
                  </div>
                  <div style={{ padding: "12px", backgroundColor: colors.grayLighter, borderRadius: "6px" }}>
                    <div style={{ fontSize: "11px", color: colors.gray, marginBottom: "4px" }}>Last Month</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: colors.text }}>${selectedProvider.lastMonthEarnings.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ padding: "12px", backgroundColor: colors.grayLighter, borderRadius: "6px" }}>
                  <div style={{ fontSize: "11px", color: colors.gray, marginBottom: "4px" }}>Total Earnings</div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: colors.primary }}>${selectedProvider.totalEarnings.toLocaleString()}</div>
                </div>
              </div>

              {/* Tier Info */}
              <div style={{ padding: "12px", backgroundColor: colors.lightBg, borderRadius: "8px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: colors.text, marginBottom: "6px" }}>Tier Status</div>
                <div style={{ fontSize: "12px", color: colors.gray, lineHeight: "1.5" }}>
                  <strong>Elite</strong> (current) — Top 11% of providers
                  <br />
                  33% of GMV from just 11% of the network
                </div>
              </div>
            </div>
          </div>
        </PhoneFrame>

        {/* Navigation */}
        <div style={{ marginLeft: "40px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "12px" }}>
          <button
            onClick={() => setCurrentScreen("home")}
            style={{
              padding: "8px 16px",
              backgroundColor: colors.grayLight,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              transition: "all .2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.border)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.grayLight)}
          >
            ← Marketplace
          </button>
        </div>
      </div>
    );
  }
}
