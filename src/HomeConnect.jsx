import React, { useState } from "react";

// ============================================================================
// HOMECONNECT DEMO - Interactive Marketplace Showcase
// ============================================================================

// --- SEED DATA ---
const SERVICE_CATEGORIES = [
  { id: "general-contracting", name: "General Contracting", icon: "🔨", desc: "Full renovations, additions, and structural work" },
  { id: "landscaping", name: "Landscaping", icon: "🌿", desc: "Lawn care, hardscaping, and outdoor design" },
  { id: "interior-design", name: "Interior Design", icon: "🎨", desc: "Space planning, furnishing, and decor" },
  { id: "plumbing", name: "Plumbing", icon: "🔧", desc: "Fixtures, piping, and water systems" },
  { id: "electrical", name: "Electrical", icon: "⚡", desc: "Wiring, panels, and lighting installation" },
  { id: "hvac", name: "HVAC", icon: "❄️", desc: "Heating, cooling, and ventilation systems" },
  { id: "painting", name: "Painting", icon: "🖌️", desc: "Interior and exterior painting" },
  { id: "roofing", name: "Roofing", icon: "🏠", desc: "Roof repair, replacement, and inspection" },
  { id: "flooring", name: "Flooring", icon: "🪵", desc: "Hardwood, tile, carpet, and vinyl installation" },
  { id: "kitchen-bath", name: "Kitchen & Bath", icon: "🚿", desc: "Kitchen and bathroom remodeling" },
  { id: "windows-doors", name: "Windows & Doors", icon: "🪟", desc: "Installation and replacement" },
  { id: "cleaning", name: "Home Cleaning", icon: "✨", desc: "Deep cleaning, move-in/out, and recurring service" },
];

const PROVIDERS = {
  "general-contracting": [
    { id: "gc1", name: "Summit Built Co.", tier: "Elite", rating: 4.9, reviews: 127, responseTime: "< 2 hrs", startingPrice: 5000, yearsExp: 18, completedJobs: 89, completionRate: 99, specialties: ["Whole-home renovation", "Room additions", "Structural repair"], license: "GA-GC-48291", insured: "$2M GL", bio: "Family-owned firm with 18 years in metro Atlanta. We specialize in whole-home renovations and additions, with an emphasis on keeping projects on schedule and on budget. Every project gets a dedicated site manager.", portfolioImages: 6 },
    { id: "gc2", name: "Peachtree Renovations", tier: "Preferred", rating: 4.7, reviews: 84, responseTime: "< 4 hrs", startingPrice: 3500, yearsExp: 12, completedJobs: 62, completionRate: 97, specialties: ["Kitchen remodels", "Basement finishing", "Deck construction"], license: "GA-GC-55103", insured: "$1M GL", bio: "Specializing in kitchens, basements, and outdoor living spaces. We bring 3D renderings to every initial consult so you can visualize the finished product before signing.", portfolioImages: 4 },
    { id: "gc3", name: "Redline Construction", tier: "Preferred", rating: 4.6, reviews: 53, responseTime: "< 3 hrs", startingPrice: 4200, yearsExp: 9, completedJobs: 41, completionRate: 96, specialties: ["Commercial-to-residential", "Historic restoration", "ADU construction"], license: "GA-GC-61847", insured: "$1M GL", bio: "We focus on projects other contractors avoid: historic homes, commercial conversions, and accessory dwelling units. Licensed for both residential and light commercial.", portfolioImages: 3 },
    { id: "gc4", name: "BlueLine Builders", tier: "Standard", rating: 4.4, reviews: 28, responseTime: "< 6 hrs", startingPrice: 2800, yearsExp: 5, completedJobs: 22, completionRate: 95, specialties: ["Bathroom remodels", "Garage conversions", "Fencing"], license: "GA-GC-72055", insured: "$1M GL", bio: "Newer to the platform but growing fast. We keep our project load small on purpose so every client gets direct access to the owner.", portfolioImages: 2 },
    { id: "gc5", name: "Cascade Home Works", tier: "Standard", rating: 4.3, reviews: 19, responseTime: "< 8 hrs", startingPrice: 2500, yearsExp: 4, completedJobs: 15, completionRate: 93, specialties: ["Drywall repair", "Trim carpentry", "Small renovations"], license: "GA-GC-78392", insured: "$1M GL", bio: "Best fit for smaller renovation projects and repair work. Fast turnaround and transparent flat-rate pricing on most jobs.", portfolioImages: 2 },
  ],
  "landscaping": [
    { id: "ls1", name: "Green Canopy Landscapes", tier: "Elite", rating: 4.9, reviews: 156, responseTime: "< 1 hr", startingPrice: 1500, yearsExp: 15, completedJobs: 112, completionRate: 99, specialties: ["Landscape design", "Hardscaping", "Irrigation systems"], license: "GA-LP-33210", insured: "$1M GL", bio: "Full-service landscape architecture and installation. We design in-house with 3D walkthroughs before any ground is broken.", portfolioImages: 8 },
    { id: "ls2", name: "Southern Roots Lawn Care", tier: "Preferred", rating: 4.7, reviews: 93, responseTime: "< 2 hrs", startingPrice: 200, yearsExp: 8, completedJobs: 78, completionRate: 98, specialties: ["Lawn maintenance", "Seasonal cleanup", "Mulching"], license: "GA-LP-44891", insured: "$1M GL", bio: "Recurring lawn care and seasonal maintenance for homeowners who want their yard handled without thinking about it.", portfolioImages: 4 },
    { id: "ls3", name: "Stonewall Outdoor Living", tier: "Preferred", rating: 4.6, reviews: 67, responseTime: "< 3 hrs", startingPrice: 3000, yearsExp: 11, completedJobs: 48, completionRate: 97, specialties: ["Patios", "Retaining walls", "Outdoor kitchens"], license: "GA-LP-39744", insured: "$2M GL", bio: "We build outdoor living spaces: patios, fire pits, retaining walls, and outdoor kitchens. All masonry work done in-house, no subcontracting.", portfolioImages: 5 },
    { id: "ls4", name: "ATL Tree Pros", tier: "Standard", rating: 4.5, reviews: 41, responseTime: "< 4 hrs", startingPrice: 400, yearsExp: 7, completedJobs: 34, completionRate: 96, specialties: ["Tree removal", "Pruning", "Stump grinding"], license: "GA-AR-28103", insured: "$2M GL", bio: "ISA-certified arborists. We handle everything from routine pruning to emergency storm damage removal.", portfolioImages: 3 },
  ],
  "interior-design": [
    { id: "id1", name: "Atelier South Studio", tier: "Elite", rating: 4.8, reviews: 71, responseTime: "< 3 hrs", startingPrice: 2500, yearsExp: 14, completedJobs: 58, completionRate: 98, specialties: ["Full-home design", "New construction", "Color consulting"], license: "GA-ID-19455", insured: "$1M GL", bio: "ASID-certified studio specializing in modern Southern design. We work from concept boards through installation, managing procurement and contractor coordination.", portfolioImages: 7 },
    { id: "id2", name: "Perch Interiors", tier: "Preferred", rating: 4.7, reviews: 48, responseTime: "< 4 hrs", startingPrice: 1200, yearsExp: 8, completedJobs: 39, completionRate: 97, specialties: ["Room refreshes", "Staging", "E-design"], license: "GA-ID-24781", insured: "$1M GL", bio: "Not ready for a full redesign? We offer single-room refreshes and virtual e-design packages starting at a fraction of traditional design fees.", portfolioImages: 5 },
    { id: "id3", name: "Haven Design Collective", tier: "Standard", rating: 4.5, reviews: 22, responseTime: "< 6 hrs", startingPrice: 800, yearsExp: 5, completedJobs: 18, completionRate: 95, specialties: ["Nursery design", "Home office", "Small spaces"], license: "GA-ID-31092", insured: "$1M GL", bio: "We focus on the rooms that matter most right now: nurseries, home offices, and making small spaces feel bigger.", portfolioImages: 3 },
  ],
  "plumbing": [
    { id: "pl1", name: "Drip Doctor Plumbing", tier: "Elite", rating: 4.8, reviews: 198, responseTime: "< 1 hr", startingPrice: 150, yearsExp: 22, completedJobs: 145, completionRate: 99, specialties: ["Emergency repair", "Repiping", "Water heaters"], license: "GA-MP-12847", insured: "$1M GL", bio: "22 years in metro Atlanta. Same-day emergency service, transparent pricing before we start any work. We show up on time or the trip fee is waived.", portfolioImages: 3 },
    { id: "pl2", name: "AquaFlow Solutions", tier: "Preferred", rating: 4.6, reviews: 76, responseTime: "< 2 hrs", startingPrice: 200, yearsExp: 10, completedJobs: 58, completionRate: 97, specialties: ["Bathroom rough-in", "Sewer line", "Fixture installation"], license: "GA-MP-19203", insured: "$1M GL", bio: "New construction and renovation plumbing. We coordinate directly with your GC to keep the project moving.", portfolioImages: 2 },
  ],
  "electrical": [
    { id: "el1", name: "Bright Circuit Electric", tier: "Elite", rating: 4.9, reviews: 134, responseTime: "< 2 hrs", startingPrice: 200, yearsExp: 16, completedJobs: 98, completionRate: 99, specialties: ["Panel upgrades", "EV charger install", "Smart home wiring"], license: "GA-EN-08455", insured: "$2M GL", bio: "Master electrician with 16 years experience. We specialize in panel upgrades, EV charger installations, and whole-home smart wiring.", portfolioImages: 4 },
    { id: "el2", name: "Spark & Wire Co.", tier: "Preferred", rating: 4.6, reviews: 61, responseTime: "< 3 hrs", startingPrice: 175, yearsExp: 9, completedJobs: 47, completionRate: 97, specialties: ["Recessed lighting", "Outlet addition", "Code compliance"], license: "GA-EN-14922", insured: "$1M GL", bio: "Lighting design and installation, outlet additions, and code compliance inspections. We pull all permits and schedule all inspections.", portfolioImages: 3 },
  ],
  "hvac": [
    { id: "hv1", name: "ClimateCraft HVAC", tier: "Elite", rating: 4.8, reviews: 112, responseTime: "< 2 hrs", startingPrice: 300, yearsExp: 20, completedJobs: 87, completionRate: 98, specialties: ["System replacement", "Ductwork", "Mini-splits"], license: "GA-CR-07291", insured: "$2M GL", bio: "Carrier and Mitsubishi authorized dealer. We size systems properly with Manual J load calculations, not rules of thumb.", portfolioImages: 3 },
    { id: "hv2", name: "AirPro Comfort", tier: "Preferred", rating: 4.5, reviews: 54, responseTime: "< 4 hrs", startingPrice: 150, yearsExp: 8, completedJobs: 42, completionRate: 96, specialties: ["Maintenance plans", "Repair", "Air quality"], license: "GA-CR-15588", insured: "$1M GL", bio: "Preventive maintenance plans and repair work. We stock common parts on our trucks so most repairs are completed in a single visit.", portfolioImages: 2 },
  ],
  "painting": [
    { id: "pt1", name: "Brushwork Pro Painting", tier: "Elite", rating: 4.9, reviews: 167, responseTime: "< 1 hr", startingPrice: 800, yearsExp: 13, completedJobs: 121, completionRate: 99, specialties: ["Interior painting", "Cabinet refinishing", "Wallpaper"], license: "GA-PA-22190", insured: "$1M GL", bio: "We prep like it matters because it does. Every job includes full furniture protection, crack and nail pop repair, and two coats minimum.", portfolioImages: 5 },
    { id: "pt2", name: "Fresh Coat Atlanta", tier: "Preferred", rating: 4.6, reviews: 72, responseTime: "< 3 hrs", startingPrice: 500, yearsExp: 7, completedJobs: 56, completionRate: 97, specialties: ["Exterior painting", "Pressure washing", "Stain work"], license: "GA-PA-29014", insured: "$1M GL", bio: "Exterior specialists. We pressure wash, scrape, prime, and paint. Benjamin Moore and Sherwin-Williams products only.", portfolioImages: 4 },
  ],
  "roofing": [
    { id: "rf1", name: "Peach State Roofing", tier: "Elite", rating: 4.8, reviews: 89, responseTime: "< 2 hrs", startingPrice: 4000, yearsExp: 19, completedJobs: 68, completionRate: 99, specialties: ["Full replacement", "Storm damage", "Metal roofing"], license: "GA-RC-05182", insured: "$2M GL", bio: "GAF Master Elite certified. We handle the insurance claim process on storm damage jobs so you don't have to.", portfolioImages: 4 },
    { id: "rf2", name: "TopShield Roofing", tier: "Preferred", rating: 4.5, reviews: 43, responseTime: "< 4 hrs", startingPrice: 500, yearsExp: 8, completedJobs: 35, completionRate: 96, specialties: ["Leak repair", "Gutter install", "Roof inspection"], license: "GA-RC-11847", insured: "$1M GL", bio: "Repair and maintenance focused. Free roof inspections for new homeowners. We find the small problems before they become big ones.", portfolioImages: 2 },
  ],
  "flooring": [
    { id: "fl1", name: "Hardwood Heritage Co.", tier: "Elite", rating: 4.9, reviews: 103, responseTime: "< 2 hrs", startingPrice: 2000, yearsExp: 17, completedJobs: 79, completionRate: 99, specialties: ["Hardwood install", "Refinishing", "Custom inlays"], license: "GA-FL-08834", insured: "$1M GL", bio: "We install, sand, and refinish hardwood floors. All dust-free sanding with HEPA filtration. We also do custom borders and inlay work.", portfolioImages: 5 },
    { id: "fl2", name: "Metro Tile & Stone", tier: "Preferred", rating: 4.6, reviews: 58, responseTime: "< 3 hrs", startingPrice: 1500, yearsExp: 10, completedJobs: 44, completionRate: 97, specialties: ["Tile installation", "Natural stone", "Heated floors"], license: "GA-FL-14291", insured: "$1M GL", bio: "Tile and natural stone specialists. Bathrooms, kitchens, entryways, and outdoor applications. Schluter and Ditra certified.", portfolioImages: 4 },
  ],
  "kitchen-bath": [
    { id: "kb1", name: "Atlanta Kitchen Studio", tier: "Elite", rating: 4.8, reviews: 91, responseTime: "< 3 hrs", startingPrice: 8000, yearsExp: 15, completedJobs: 64, completionRate: 98, specialties: ["Full kitchen remodel", "Custom cabinetry", "Countertops"], license: "GA-GC-34210", insured: "$2M GL", bio: "Design-build kitchen firm. We have an in-house designer, handle permits, and manage all trades. Average kitchen remodel completed in 6 weeks.", portfolioImages: 6 },
    { id: "kb2", name: "Bath Revival Co.", tier: "Preferred", rating: 4.7, reviews: 65, responseTime: "< 4 hrs", startingPrice: 3500, yearsExp: 9, completedJobs: 51, completionRate: 97, specialties: ["Bathroom renovation", "Walk-in shower", "Accessibility"], license: "GA-GC-42918", insured: "$1M GL", bio: "Bathroom-only specialists. We do one thing and we do it well. ADA-compliant accessibility conversions are our fastest growing service.", portfolioImages: 4 },
  ],
  "windows-doors": [
    { id: "wd1", name: "ClearView Windows ATL", tier: "Elite", rating: 4.8, reviews: 78, responseTime: "< 3 hrs", startingPrice: 1500, yearsExp: 12, completedJobs: 59, completionRate: 98, specialties: ["Window replacement", "Energy upgrades", "Custom sizes"], license: "GA-GC-28744", insured: "$1M GL", bio: "Pella and Andersen certified installer. We handle measurement, ordering, installation, and disposal. Most jobs completed in a single day.", portfolioImages: 3 },
    { id: "wd2", name: "Doorway Experts", tier: "Preferred", rating: 4.6, reviews: 44, responseTime: "< 4 hrs", startingPrice: 800, yearsExp: 7, completedJobs: 36, completionRate: 96, specialties: ["Entry doors", "Patio doors", "Storm doors"], license: "GA-GC-37021", insured: "$1M GL", bio: "Door installation and replacement specialists. From entry doors to French doors to sliding glass. We also install smart locks and video doorbells.", portfolioImages: 3 },
  ],
  "cleaning": [
    { id: "cl1", name: "Spotless Home ATL", tier: "Elite", rating: 4.9, reviews: 214, responseTime: "< 1 hr", startingPrice: 150, yearsExp: 10, completedJobs: 189, completionRate: 99, specialties: ["Deep cleaning", "Move-in/out", "Recurring service"], license: "GA-CL-55102", insured: "$1M GL", bio: "W-2 employees, not subcontractors. Every cleaner is background-checked and bonded. We bring all supplies and equipment. 100% satisfaction guarantee.", portfolioImages: 3 },
    { id: "cl2", name: "Sparkle Crew Services", tier: "Preferred", rating: 4.7, reviews: 118, responseTime: "< 2 hrs", startingPrice: 120, yearsExp: 6, completedJobs: 97, completionRate: 98, specialties: ["Post-construction", "Office cleaning", "Green cleaning"], license: "GA-CL-61847", insured: "$1M GL", bio: "Post-construction cleanup is our specialty. We also offer eco-friendly green cleaning packages using plant-based products.", portfolioImages: 2 },
  ],
};

// Default fallback for categories without specific providers
Object.keys(SERVICE_CATEGORIES.reduce((acc, c) => { acc[c.id] = true; return acc; }, {})).forEach(catId => {
  if (!PROVIDERS[catId]) PROVIDERS[catId] = PROVIDERS["general-contracting"];
});

const SAMPLE_REVIEWS = [
  { author: "Sarah M.", date: "Feb 2026", quality: 5, timeliness: 5, communication: 5, text: "Incredible work from start to finish. They came in on budget and actually finished two days early. The site manager checked in every morning and sent photo updates throughout the day." },
  { author: "David R.", date: "Jan 2026", quality: 5, timeliness: 4, communication: 5, text: "Quality of work was outstanding. There was a short delay getting permits approved but they communicated the timeline clearly and made up for it at the end." },
  { author: "Jennifer L.", date: "Dec 2025", quality: 5, timeliness: 5, communication: 4, text: "Second time using them through HomeConnect. They remembered our preferences from the first project and the crew was professional and clean." },
  { author: "Marcus T.", date: "Nov 2025", quality: 4, timeliness: 5, communication: 5, text: "Good work overall. A few minor touch-ups were needed but they came back the next day and handled everything without any pushback." },
  { author: "Amy K.", date: "Oct 2025", quality: 5, timeliness: 5, communication: 5, text: "We got three bids through the platform and went with them based on the reviews. No regrets. The escrow payment system made the whole process feel safe." },
];

const SAMPLE_BIDS = [
  { providerIdx: 0, price: 4800, timeline: "3 weeks", scope: "Full scope as described including material procurement, demolition, installation, and final walkthrough. Dumpster rental and permit fees included.", warranty: "2-year workmanship warranty" },
  { providerIdx: 1, price: 4200, timeline: "4 weeks", scope: "Complete project per specifications. Materials sourced from our preferred supplier network for 10-15% savings. Permit coordination included.", warranty: "1-year workmanship warranty" },
  { providerIdx: 2, price: 5100, timeline: "2.5 weeks", scope: "Expedited timeline with dedicated crew. Premium materials, daily photo updates, and a dedicated project manager for the duration. All permits and inspections handled.", warranty: "3-year workmanship warranty" },
];

// --- STYLES ---
const HC = {
  teal: "#0d9488",
  tealDark: "#0f766e",
  tealLight: "#ccfbf1",
  tealBg: "#f0fdfa",
  warmGray: "#f5f3f0",
  darkText: "#1a1a1a",
  mutedText: "#6b7280",
  border: "#e5e7eb",
  gold: "#d97706",
  green: "#16a34a",
  greenLight: "#dcfce7",
  surface: "#ffffff",
  eliteBg: "#fef3c7",
  eliteText: "#92400e",
  preferredBg: "#dbeafe",
  preferredText: "#1e40af",
  standardBg: "#f3f4f6",
  standardText: "#374151",
};

const tierStyle = (tier) => ({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 0.5,
  background: tier === "Elite" ? HC.eliteBg : tier === "Preferred" ? HC.preferredBg : HC.standardBg,
  color: tier === "Elite" ? HC.eliteText : tier === "Preferred" ? HC.preferredText : HC.standardText,
});

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <span style={{ fontSize: 14, letterSpacing: 1 }}>
      {"★".repeat(full)}
      {partial >= 0.5 ? "½" : ""}
      <span style={{ color: "#d1d5db" }}>{"★".repeat(5 - full - (partial >= 0.5 ? 1 : 0))}</span>
      <span style={{ marginLeft: 6, fontSize: 13, fontWeight: 600, color: HC.darkText }}>{rating}</span>
    </span>
  );
};

// --- COMPONENTS ---

function IntroPanel({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${HC.tealBg} 0%, #ffffff 50%, ${HC.warmGray} 100%)` }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px" }}>
        {/* Portfolio context bar */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 20, padding: "6px 16px", marginBottom: 32, fontSize: 12, color: HC.mutedText }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: HC.teal, display: "inline-block" }}></span>
          Portfolio Case Study: Verified Services Marketplace
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: HC.teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 700 }}>H</div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: HC.darkText, letterSpacing: -0.5 }}>HomeConnect</div>
            <div style={{ fontSize: 13, color: HC.mutedText }}>Verified pros. Guaranteed quality.</div>
          </div>
        </div>

        {/* Problem/Solution */}
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.2, color: HC.darkText, marginBottom: 20, maxWidth: 700 }}>
          A marketplace that turned post-sale homeowner services into a $15M revenue channel
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: HC.mutedText, maxWidth: 650, marginBottom: 40 }}>
          A national construction and real estate client needed to keep generating revenue after home sales closed. Homebuyers needed trustworthy contractors, designers, and service providers but had no way to find vetted professionals. The client had relationships with quality providers but managed them through spreadsheets and phone calls, capping throughput at 200 requests per month.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: HC.mutedText, maxWidth: 650, marginBottom: 48 }}>
          HomeConnect is a trust-first marketplace that connects homebuyers with operator-verified service providers. Every provider passes a 5-layer verification process (identity, licensing, insurance, performance tracking, and reputation). Customers post requests, receive competitive bids from pre-vetted pros, and pay through escrow. The client earns a percentage of every transaction.
        </p>

        {/* Key Results */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[
            { value: "$15M+", label: "Year 1 GMV" },
            { value: "4.6/5.0", label: "Customer CSAT" },
            { value: "340+", label: "Verified Providers" },
            { value: "800+", label: "Monthly Requests" },
            { value: "48 hrs", label: "Verification Time", sub: "from 2-3 weeks" },
            { value: "<2%", label: "Dispute Rate", sub: "from 8.3%" },
          ].map((m, i) => (
            <div key={i} style={{ background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: HC.teal }}>{m.value}</div>
              <div style={{ fontSize: 12, color: HC.mutedText, marginTop: 4 }}>{m.label}</div>
              {m.sub && <div style={{ fontSize: 11, color: HC.gold, marginTop: 2 }}>{m.sub}</div>}
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: HC.mutedText, marginBottom: 12, fontWeight: 600 }}>Built With</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Next.js", "FastAPI", "PostgreSQL + PostGIS", "Stripe Connect", "Clerk Auth", "Supabase", "Celery + Redis", "Checkr API", "SendGrid", "Trigger.dev", "Vercel"].map(t => (
              <span key={t} style={{ padding: "5px 12px", borderRadius: 6, background: HC.warmGray, fontSize: 12, color: HC.darkText }}>{t}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          style={{
            background: HC.teal, color: "#fff", border: "none", borderRadius: 10, padding: "14px 36px",
            fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "background .15s",
          }}
          onMouseOver={e => e.target.style.background = HC.tealDark}
          onMouseOut={e => e.target.style.background = HC.teal}
        >
          Explore the Customer Experience &rarr;
        </button>
        <p style={{ fontSize: 12, color: HC.mutedText, marginTop: 12 }}>
          Interactive demo with realistic Atlanta metro data
        </p>
      </div>
    </div>
  );
}

function BrowseServices({ onSelectCategory }) {
  return (
    <div style={{ minHeight: "100vh", background: HC.warmGray }}>
      {/* Hero bar */}
      <div style={{ background: HC.teal, padding: "48px 24px 40px", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>H</div>
            <span style={{ fontSize: 18, fontWeight: 600 }}>HomeConnect</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>What do you need help with?</h1>
          <p style={{ fontSize: 15, opacity: 0.85 }}>Browse verified professionals in metro Atlanta. Every provider is background-checked, licensed, and insured.</p>
        </div>
      </div>

      {/* Search bar (decorative) */}
      <div style={{ maxWidth: 900, margin: "-24px auto 0", padding: "0 24px" }}>
        <div style={{ background: HC.surface, borderRadius: 12, padding: "16px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 12, border: `1px solid ${HC.border}` }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <input
            type="text"
            placeholder="Search services (e.g. kitchen remodel, tree removal, interior painting...)"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: HC.darkText, background: "transparent" }}
            readOnly
          />
          <span style={{ padding: "6px 14px", background: HC.warmGray, borderRadius: 6, fontSize: 13, color: HC.mutedText }}>Atlanta, GA</span>
        </div>
      </div>

      {/* Category grid */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 60px" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: HC.mutedText, marginBottom: 16, fontWeight: 600 }}>All Services</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {SERVICE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 12, padding: "20px 16px",
                textAlign: "left", cursor: "pointer", transition: "all .15s",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = HC.teal; e.currentTarget.style.boxShadow = "0 2px 12px rgba(13,148,136,0.1)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = HC.border; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: HC.darkText, marginBottom: 4 }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: HC.mutedText, lineHeight: 1.4 }}>{cat.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProviderListings({ categoryId, onSelectProvider, onBack }) {
  const cat = SERVICE_CATEGORIES.find(c => c.id === categoryId);
  const providers = PROVIDERS[categoryId] || [];
  const [sortBy, setSortBy] = useState("rating");

  const sorted = [...providers].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price") return a.startingPrice - b.startingPrice;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    return 0;
  });

  return (
    <div style={{ minHeight: "100vh", background: HC.warmGray }}>
      {/* Top bar */}
      <div style={{ background: HC.teal, padding: "20px 24px", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>H</div>
          <span style={{ fontSize: 16, fontWeight: 600 }}>HomeConnect</span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, fontSize: 13, color: HC.mutedText }}>
          <span style={{ cursor: "pointer", color: HC.teal }} onClick={onBack}>All Services</span>
          <span>/</span>
          <span>{cat?.name}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: HC.darkText, margin: 0 }}>{cat?.name}</h2>
            <p style={{ fontSize: 13, color: HC.mutedText, margin: "4px 0 0" }}>{providers.length} verified providers in Atlanta, GA</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ key: "rating", label: "Top Rated" }, { key: "price", label: "Lowest Price" }, { key: "reviews", label: "Most Reviews" }].map(s => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key)}
                style={{
                  padding: "6px 14px", borderRadius: 6, border: `1px solid ${sortBy === s.key ? HC.teal : HC.border}`,
                  background: sortBy === s.key ? HC.tealLight : HC.surface, color: sortBy === s.key ? HC.tealDark : HC.mutedText,
                  fontSize: 12, fontWeight: 500, cursor: "pointer",
                }}
              >{s.label}</button>
            ))}
          </div>
        </div>

        {/* Provider cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sorted.map(p => (
            <div
              key={p.id}
              onClick={() => onSelectProvider(p)}
              style={{
                background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 12, padding: "20px 24px",
                cursor: "pointer", transition: "all .15s", display: "flex", gap: 20, alignItems: "flex-start",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = HC.teal; e.currentTarget.style.boxShadow = "0 2px 12px rgba(13,148,136,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = HC.border; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Avatar */}
              <div style={{ width: 56, height: 56, borderRadius: 12, background: HC.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: HC.teal, flexShrink: 0 }}>
                {p.name.charAt(0)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                  <span style={{ fontSize: 17, fontWeight: 600, color: HC.darkText }}>{p.name}</span>
                  <span style={tierStyle(p.tier)}>
                    {p.tier === "Elite" ? "★ " : ""}{p.tier}
                  </span>
                  <span style={{ fontSize: 12, color: HC.green, fontWeight: 500 }}>✓ Verified</span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <Stars rating={p.rating} />
                  <span style={{ fontSize: 12, color: HC.mutedText, marginLeft: 6 }}>({p.reviews} reviews)</span>
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: HC.mutedText }}>
                  <span>Responds {p.responseTime}</span>
                  <span>{p.completedJobs} jobs completed</span>
                  <span>{p.yearsExp} years experience</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  {p.specialties.slice(0, 3).map(s => (
                    <span key={s} style={{ padding: "3px 10px", borderRadius: 6, background: HC.warmGray, fontSize: 11, color: HC.darkText }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: HC.mutedText }}>Starting at</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: HC.darkText }}>${p.startingPrice.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProviderDetail({ provider, categoryId, onBack, onRequestQuote }) {
  const cat = SERVICE_CATEGORIES.find(c => c.id === categoryId);
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div style={{ minHeight: "100vh", background: HC.warmGray }}>
      {/* Top bar */}
      <div style={{ background: HC.teal, padding: "20px 24px", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>H</div>
          <span style={{ fontSize: 16, fontWeight: 600 }}>HomeConnect</span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 13, color: HC.mutedText }}>
          <span style={{ cursor: "pointer", color: HC.teal }} onClick={() => onBack("browse")}>All Services</span>
          <span>/</span>
          <span style={{ cursor: "pointer", color: HC.teal }} onClick={() => onBack("listings")}>{cat?.name}</span>
          <span>/</span>
          <span>{provider.name}</span>
        </div>

        {/* Profile header */}
        <div style={{ background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 16, padding: 32, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: HC.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: HC.teal, flexShrink: 0 }}>
              {provider.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                <h1 style={{ fontSize: 26, fontWeight: 700, color: HC.darkText, margin: 0 }}>{provider.name}</h1>
                <span style={tierStyle(provider.tier)}>{provider.tier === "Elite" ? "★ " : ""}{provider.tier}</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <Stars rating={provider.rating} />
                <span style={{ fontSize: 13, color: HC.mutedText, marginLeft: 6 }}>({provider.reviews} reviews)</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: HC.mutedText, margin: 0 }}>{provider.bio}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <button
                onClick={onRequestQuote}
                style={{
                  background: HC.teal, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px",
                  fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .15s",
                }}
                onMouseOver={e => e.target.style.background = HC.tealDark}
                onMouseOut={e => e.target.style.background = HC.teal}
              >
                Request a Quote
              </button>
              <div style={{ fontSize: 12, color: HC.mutedText, marginTop: 8 }}>Free, no obligation</div>
            </div>
          </div>

          {/* Credential badges */}
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { icon: "✓", label: "Background Checked", color: HC.green },
              { icon: "✓", label: `License: ${provider.license}`, color: HC.green },
              { icon: "✓", label: `Insured: ${provider.insured}`, color: HC.green },
              { icon: "✓", label: `${provider.completionRate}% Completion Rate`, color: HC.green },
            ].map((b, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: HC.greenLight, fontSize: 12, color: b.color, fontWeight: 500 }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: `1px solid ${HC.border}` }}>
          {[{ key: "about", label: "Details" }, { key: "reviews", label: `Reviews (${provider.reviews})` }, { key: "portfolio", label: "Portfolio" }].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "12px 20px", background: "none", border: "none", borderBottom: activeTab === t.key ? `2px solid ${HC.teal}` : "2px solid transparent",
                color: activeTab === t.key ? HC.teal : HC.mutedText, fontWeight: 500, fontSize: 14, cursor: "pointer",
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 12, padding: 24 }}>
          {activeTab === "about" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
                {[
                  { label: "Years in Business", value: provider.yearsExp },
                  { label: "Jobs Completed", value: provider.completedJobs },
                  { label: "Response Time", value: provider.responseTime },
                  { label: "Starting Price", value: `$${provider.startingPrice.toLocaleString()}` },
                ].map((s, i) => (
                  <div key={i} style={{ padding: 16, background: HC.warmGray, borderRadius: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: HC.darkText }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: HC.mutedText, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: HC.darkText, marginBottom: 12 }}>Specialties</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {provider.specialties.map(s => (
                  <span key={s} style={{ padding: "6px 14px", borderRadius: 8, background: HC.tealLight, fontSize: 13, color: HC.tealDark }}>{s}</span>
                ))}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: HC.darkText, marginBottom: 8 }}>Service Area</h3>
              <p style={{ fontSize: 13, color: HC.mutedText }}>Metro Atlanta (25-mile radius from city center)</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {/* Rating breakdown */}
              <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center", padding: "16px 24px", background: HC.warmGray, borderRadius: 10 }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: HC.darkText }}>{provider.rating}</div>
                  <Stars rating={provider.rating} />
                  <div style={{ fontSize: 12, color: HC.mutedText, marginTop: 4 }}>{provider.reviews} reviews</div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  {[
                    { label: "Quality", score: (provider.rating + 0.05).toFixed(1), weight: "50%" },
                    { label: "Timeliness", score: (provider.rating - 0.1).toFixed(1), weight: "30%" },
                    { label: "Communication", score: (provider.rating - 0.05).toFixed(1), weight: "20%" },
                  ].map(d => (
                    <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: HC.mutedText, width: 120 }}>{d.label} ({d.weight})</span>
                      <div style={{ flex: 1, height: 8, background: HC.warmGray, borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${(d.score / 5) * 100}%`, height: "100%", background: HC.teal, borderRadius: 4 }}></div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: HC.darkText, width: 28 }}>{d.score}</span>
                    </div>
                  ))}
                  <p style={{ fontSize: 11, color: HC.mutedText, marginTop: 8, fontStyle: "italic" }}>Weighted composite: 50% quality, 30% timeliness, 20% communication. Double-blind until both parties submit.</p>
                </div>
              </div>

              {/* Individual reviews */}
              {SAMPLE_REVIEWS.slice(0, 4).map((r, i) => (
                <div key={i} style={{ padding: "16px 0", borderTop: `1px solid ${HC.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: HC.darkText }}>{r.author}</span>
                    <span style={{ fontSize: 12, color: HC.mutedText }}>{r.date}</span>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <Stars rating={(r.quality * 0.5 + r.timeliness * 0.3 + r.communication * 0.2)} />
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: HC.mutedText, margin: 0 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "portfolio" && (
            <div>
              <p style={{ fontSize: 13, color: HC.mutedText, marginBottom: 16 }}>{provider.portfolioImages} project photos</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {Array.from({ length: provider.portfolioImages }, (_, i) => (
                  <div key={i} style={{ aspectRatio: "4/3", background: `linear-gradient(135deg, ${HC.tealLight} 0%, ${HC.warmGray} 100%)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: HC.mutedText }}>
                    Project {i + 1}
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

function RequestQuoteForm({ provider, categoryId, onSubmit, onBack }) {
  const cat = SERVICE_CATEGORIES.find(c => c.id === categoryId);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: HC.warmGray }}>
        <div style={{ background: HC.teal, padding: "20px 24px", color: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>H</div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>HomeConnect</span>
          </div>
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: HC.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 24px", color: HC.green }}>✓</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: HC.darkText, marginBottom: 12 }}>Request Submitted</h2>
          <p style={{ fontSize: 15, color: HC.mutedText, lineHeight: 1.6, marginBottom: 8 }}>
            Your request has been sent to <strong>{provider.name}</strong> and matched with 2 additional verified {cat?.name.toLowerCase()} providers in your area.
          </p>
          <p style={{ fontSize: 14, color: HC.mutedText, marginBottom: 32 }}>
            Expect your first bid within 6 hours. You'll receive email and push notifications as bids come in.
          </p>
          <div style={{ background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 12, padding: 20, textAlign: "left", marginBottom: 32 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: HC.mutedText, marginBottom: 12, fontWeight: 600 }}>How Bidding Works</div>
            {[
              { step: "1", text: "Matched providers review your request and submit competitive bids" },
              { step: "2", text: "Compare bids side-by-side (price, timeline, scope, provider rating)" },
              { step: "3", text: "Select a provider and confirm with escrow payment (funds held until job is complete)" },
              { step: "4", text: "Rate your experience after completion to help the community" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: HC.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: HC.teal, flexShrink: 0 }}>{s.step}</div>
                <p style={{ fontSize: 13, color: HC.mutedText, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
              </div>
            ))}
          </div>
          <button
            onClick={onSubmit}
            style={{
              background: HC.teal, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px",
              fontSize: 15, fontWeight: 600, cursor: "pointer",
            }}
            onMouseOver={e => e.target.style.background = HC.tealDark}
            onMouseOut={e => e.target.style.background = HC.teal}
          >
            View Incoming Bids &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: HC.warmGray }}>
      <div style={{ background: HC.teal, padding: "20px 24px", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>H</div>
          <span style={{ fontSize: 16, fontWeight: 600 }}>HomeConnect</span>
        </div>
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px 60px" }}>
        <span style={{ cursor: "pointer", fontSize: 13, color: HC.teal }} onClick={onBack}>&larr; Back to {provider.name}</span>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: HC.darkText, marginTop: 16, marginBottom: 4 }}>Request a Quote</h2>
        <p style={{ fontSize: 13, color: HC.mutedText, marginBottom: 24 }}>Requesting from <strong>{provider.name}</strong> + 2 additional matched providers</p>

        <div style={{ background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 12, padding: 24 }}>
          {[
            { label: "Service Type", value: cat?.name, type: "display" },
            { label: "Describe your project", placeholder: "Tell us about the work you need done, including any specific requirements or preferences...", type: "textarea" },
            { label: "Preferred Start Date", type: "date" },
            { label: "Budget Range", type: "select", options: ["Under $1,000", "$1,000 - $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000+", "Not sure yet"] },
            { label: "Property Type", type: "select", options: ["Single-family home", "Townhouse", "Condo", "Multi-family", "Commercial"] },
          ].map((field, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: HC.darkText, marginBottom: 6 }}>{field.label}</label>
              {field.type === "display" && (
                <div style={{ padding: "10px 14px", background: HC.warmGray, borderRadius: 8, fontSize: 14, color: HC.darkText }}>{field.value}</div>
              )}
              {field.type === "textarea" && (
                <textarea placeholder={field.placeholder} rows={4} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${HC.border}`, borderRadius: 8, fontSize: 14, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
              )}
              {field.type === "date" && (
                <input type="date" style={{ padding: "10px 14px", border: `1px solid ${HC.border}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit" }} />
              )}
              {field.type === "select" && (
                <select style={{ width: "100%", padding: "10px 14px", border: `1px solid ${HC.border}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", background: HC.surface, boxSizing: "border-box" }}>
                  <option value="">Select...</option>
                  {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              )}
            </div>
          ))}

          <div style={{ background: HC.tealBg, borderRadius: 8, padding: 14, marginBottom: 20, display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16 }}>🔒</span>
            <p style={{ fontSize: 12, color: HC.tealDark, margin: 0, lineHeight: 1.5 }}>
              Your payment is protected by escrow. Funds are held securely until you confirm the work is complete. You only pay the 5% service fee on top of the provider's bid.
            </p>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            style={{
              width: "100%", background: HC.teal, color: "#fff", border: "none", borderRadius: 10, padding: "14px",
              fontSize: 16, fontWeight: 600, cursor: "pointer",
            }}
            onMouseOver={e => e.target.style.background = HC.tealDark}
            onMouseOut={e => e.target.style.background = HC.teal}
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

function BidComparison({ provider, categoryId, onBack, onFinish }) {
  const cat = SERVICE_CATEGORIES.find(c => c.id === categoryId);
  const providers = PROVIDERS[categoryId] || [];
  const [selectedBid, setSelectedBid] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const bids = SAMPLE_BIDS.map((b, i) => ({
    ...b,
    provider: providers[b.providerIdx] || providers[0],
  }));

  if (confirmed) {
    const bid = bids[selectedBid];
    const serviceFee = Math.round(bid.price * 0.05);
    const platformFee = Math.round(bid.price * 0.15);
    const providerPayout = bid.price - platformFee;
    return (
      <div style={{ minHeight: "100vh", background: HC.warmGray }}>
        <div style={{ background: HC.teal, padding: "20px 24px", color: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>H</div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>HomeConnect</span>
          </div>
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: HC.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 24px", color: HC.green }}>✓</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: HC.darkText, marginBottom: 12 }}>Booking Confirmed</h2>
          <p style={{ fontSize: 15, color: HC.mutedText, marginBottom: 32 }}>{bid.provider.name} has been notified and will reach out to schedule.</p>

          {/* Escrow breakdown */}
          <div style={{ background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 12, padding: 24, textAlign: "left", marginBottom: 32 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: HC.mutedText, marginBottom: 16, fontWeight: 600 }}>Escrow Payment Breakdown</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: HC.mutedText }}>Provider bid</span>
              <span style={{ color: HC.darkText, fontWeight: 500 }}>${bid.price.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: HC.mutedText }}>Service fee (5%)</span>
              <span style={{ color: HC.darkText, fontWeight: 500 }}>${serviceFee.toLocaleString()}</span>
            </div>
            <div style={{ borderTop: `1px solid ${HC.border}`, paddingTop: 8, marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 16 }}>
              <span style={{ fontWeight: 600, color: HC.darkText }}>You pay</span>
              <span style={{ fontWeight: 700, color: HC.teal }}>${(bid.price + serviceFee).toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 16, padding: 14, background: HC.tealBg, borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: HC.tealDark, marginBottom: 8 }}>How the platform earns revenue:</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: HC.mutedText }}>Customer service fee (5%)</span>
                <span style={{ color: HC.darkText }}>${serviceFee.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: HC.mutedText }}>Provider platform fee (15%)</span>
                <span style={{ color: HC.darkText }}>${platformFee.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, borderTop: `1px solid rgba(13,148,136,0.2)`, paddingTop: 6, marginTop: 6 }}>
                <span style={{ fontWeight: 600, color: HC.tealDark }}>Platform net revenue</span>
                <span style={{ fontWeight: 600, color: HC.tealDark }}>${(serviceFee + platformFee).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                <span style={{ color: HC.mutedText }}>Provider receives</span>
                <span style={{ color: HC.darkText }}>${providerPayout.toLocaleString()}</span>
              </div>
            </div>
            <p style={{ fontSize: 11, color: HC.mutedText, marginTop: 12, fontStyle: "italic" }}>
              Funds held in Stripe Connect escrow until you confirm job completion. Provider receives payout within 3-5 business days of confirmation.
            </p>
          </div>

          <button
            onClick={onFinish}
            style={{
              background: HC.teal, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px",
              fontSize: 15, fontWeight: 600, cursor: "pointer",
            }}
            onMouseOver={e => e.target.style.background = HC.tealDark}
            onMouseOut={e => e.target.style.background = HC.teal}
          >
            Back to Case Study &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: HC.warmGray }}>
      <div style={{ background: HC.teal, padding: "20px 24px", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>H</div>
          <span style={{ fontSize: 16, fontWeight: 600 }}>HomeConnect</span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 60px" }}>
        <span style={{ cursor: "pointer", fontSize: 13, color: HC.teal }} onClick={onBack}>&larr; Back</span>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: HC.darkText, marginTop: 16, marginBottom: 4 }}>Compare Bids</h2>
        <p style={{ fontSize: 13, color: HC.mutedText, marginBottom: 24 }}>3 verified providers submitted bids for your {cat?.name.toLowerCase()} project</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {bids.map((bid, i) => (
            <div
              key={i}
              onClick={() => setSelectedBid(i)}
              style={{
                background: HC.surface, border: `2px solid ${selectedBid === i ? HC.teal : HC.border}`, borderRadius: 12,
                padding: 24, cursor: "pointer", transition: "all .15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: HC.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: HC.teal }}>
                    {bid.provider.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 600, color: HC.darkText }}>{bid.provider.name}</span>
                      <span style={tierStyle(bid.provider.tier)}>{bid.provider.tier}</span>
                    </div>
                    <div style={{ marginTop: 2 }}>
                      <Stars rating={bid.provider.rating} />
                      <span style={{ fontSize: 12, color: HC.mutedText, marginLeft: 4 }}>({bid.provider.reviews})</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: HC.darkText }}>${bid.price.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: HC.mutedText }}>{bid.timeline}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: HC.mutedText, lineHeight: 1.6, margin: "0 0 8px" }}>{bid.scope}</p>
              <span style={{ fontSize: 12, color: HC.tealDark, fontWeight: 500 }}>{bid.warranty}</span>
            </div>
          ))}
        </div>

        {selectedBid !== null && (
          <button
            onClick={() => setConfirmed(true)}
            style={{
              width: "100%", background: HC.teal, color: "#fff", border: "none", borderRadius: 10, padding: "14px",
              fontSize: 16, fontWeight: 600, cursor: "pointer",
            }}
            onMouseOver={e => e.target.style.background = HC.tealDark}
            onMouseOut={e => e.target.style.background = HC.teal}
          >
            Book {bids[selectedBid].provider.name} for ${bids[selectedBid].price.toLocaleString()} &rarr;
          </button>
        )}
      </div>
    </div>
  );
}

// --- MAIN DEMO COMPONENT ---
export default function HomeConnectDemo({ onExit }) {
  const [step, setStep] = useState("intro"); // intro, browse, listings, detail, quote, bids
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const scrollTop = () => window.scrollTo(0, 0);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {step === "intro" && (
        <IntroPanel onStart={() => { setStep("browse"); scrollTop(); }} />
      )}
      {step === "browse" && (
        <BrowseServices onSelectCategory={(id) => { setSelectedCategory(id); setStep("listings"); scrollTop(); }} />
      )}
      {step === "listings" && (
        <ProviderListings
          categoryId={selectedCategory}
          onSelectProvider={(p) => { setSelectedProvider(p); setStep("detail"); scrollTop(); }}
          onBack={() => { setStep("browse"); scrollTop(); }}
        />
      )}
      {step === "detail" && selectedProvider && (
        <ProviderDetail
          provider={selectedProvider}
          categoryId={selectedCategory}
          onBack={(target) => { setStep(target === "browse" ? "browse" : "listings"); scrollTop(); }}
          onRequestQuote={() => { setStep("quote"); scrollTop(); }}
        />
      )}
      {step === "quote" && selectedProvider && (
        <RequestQuoteForm
          provider={selectedProvider}
          categoryId={selectedCategory}
          onSubmit={() => { setStep("bids"); scrollTop(); }}
          onBack={() => { setStep("detail"); scrollTop(); }}
        />
      )}
      {step === "bids" && (
        <BidComparison
          provider={selectedProvider}
          categoryId={selectedCategory}
          onBack={() => { setStep("quote"); scrollTop(); }}
          onFinish={() => { setStep("intro"); scrollTop(); }}
        />
      )}

      {/* Fixed back-to-portfolio button */}
      {step !== "intro" && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
          <button
            onClick={() => { setStep("intro"); scrollTop(); }}
            style={{
              background: HC.surface, border: `1px solid ${HC.border}`, borderRadius: 10, padding: "10px 18px",
              fontSize: 13, color: HC.mutedText, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            Back to overview
          </button>
        </div>
      )}
    </div>
  );
}
