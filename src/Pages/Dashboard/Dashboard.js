import { useState, useEffect } from "react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  ChevronRight, TrendingUp,
  Users, DollarSign, UserCheck, Activity,
} from "lucide-react";

import Sidebar from "../../SharedComponents/SideBar/SideBar";
import Topbar  from "../../SharedComponents/TopBar/TopBar";

import {
  dailyData, monthlyData, yearlyData, deptData,
  growthData, topDoctors, appointments, kpiData,
  kpiColors, statusMap, APRIL_START, APRIL_DAYS, APPT_DAYS,
} from "./Data";

// CSS imports — order matters (dashboard last for specificity wins)
import "../../SharedComponents/SideBar/SideBar.css";
import "../../SharedComponents/TopBar/TopBar.css";
import "./Dashboard.css";

// ── Google Fonts ────────────────────────────────────────────────────────────
function useGoogleFonts() {
  useEffect(() => {
    const id = "hm-google-fonts";
    if (document.getElementById(id)) return;

    ["https://fonts.googleapis.com", "https://fonts.gstatic.com"].forEach((href, i) => {
      const link      = document.createElement("link");
      link.rel        = "preconnect";
      link.href       = href;
      if (i === 1) link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });

    const link  = document.createElement("link");
    link.id     = id;
    link.rel    = "stylesheet";
    link.href   =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ── Recharts tooltip style (must stay a plain JS object) ────────────────────
const TOOLTIP_STYLE = {
  background: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: 8,
  fontSize: 12,
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const KPI_ICONS = { cyan: Users, green: DollarSign, purple: UserCheck, red: Activity };

// ── Dashboard content sub-components (unchanged from original) ──────────────

function KpiCards() {
  return (
    <div className="grid-kpi">
      {kpiData.map(({ label, value, change, trend, colorKey, sub }) => {
        const { icon: color, bg } = kpiColors[colorKey];
        const Icon = KPI_ICONS[colorKey];
        const up   = trend === "up";
        return (
          <div key={label} className="hm-kpi">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div className="kpi-icon-wrap" style={{ background: bg }}>
                <Icon size={20} color={color} />
              </div>
              <span className={`trend-badge ${up ? "up" : "down"}`}>{change}</span>
            </div>
            <div className="kpi-value">{value}</div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-sub">{sub}</div>
          </div>
        );
      })}
    </div>
  );
}

function PatientFlowChart({ period, onPeriodChange }) {
  const data =
    period === "daily" ? dailyData : period === "monthly" ? monthlyData : yearlyData;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div className="card-title">Patient Flow</div>
          <div className="card-sub">Admitted vs Discharged over time</div>
        </div>
        <div className="period-toggle-wrap">
          {["daily", "monthly", "yearly"].map(p => (
            <button
              key={p}
              className={`period-btn${period === p ? " active" : ""}`}
              onClick={() => onPeriodChange(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
        {[["#06B6D4", "Total Patients"], ["#8B5CF6", "Admitted"], ["#22C55E", "Discharged"]].map(([c, l]) => (
          <div key={l} className="legend-row">
            <div className="legend-dot" style={{ background: c }} />
            <span className="legend-text">{l}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#06B6D4" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Area type="monotone" dataKey="patients"   stroke="#06B6D4" strokeWidth={2.5} fill="url(#gP)" dot={false} />
          <Area type="monotone" dataKey="admitted"   stroke="#8B5CF6" strokeWidth={2}   fill="url(#gA)" dot={false} />
          <Area type="monotone" dataKey="discharged" stroke="#22C55E" strokeWidth={2}   fill="none"     dot={false} strokeDasharray="5 3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function DeptDonut() {
  return (
    <div className="card">
      <div className="card-title">By Department</div>
      <div className="card-sub" style={{ marginBottom: 12 }}>Patient distribution today</div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={deptData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
            {deptData.map((e, i) => <Cell key={i} fill={e.color} />)}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [`${v}%`]} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 4 }}>
        {deptData.map(({ name, value, color }) => (
          <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="legend-row">
              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
              <span className="legend-text">{name}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 56, height: 4, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${(value / 28) * 100}%`, height: "100%", background: color, borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A", minWidth: 26, textAlign: "right" }}>{value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniCalendar() {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className="card-title">April 2026</div>
        <span className="badge" style={{ color: "#06B6D4", background: "#ECFEFF" }}>Today: 27</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 6 }}>
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#94A3B8", paddingBottom: 4 }}>{d}</div>
        ))}
        {Array.from({ length: APRIL_START }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: APRIL_DAYS }, (_, i) => i + 1).map(day => {
          const isToday = day === 27;
          const hasAppt = APPT_DAYS.includes(day) && !isToday;
          const isPast  = day < 27;
          return (
            <div key={day} style={{ textAlign: "center" }}>
              <div
                className="cal-day"
                style={{
                  background: isToday ? "#06B6D4" : "transparent",
                  fontWeight: isToday ? 700 : 400,
                  color: isToday ? "#fff" : isPast ? "#94A3B8" : "#0F172A",
                }}
              >
                {day}
              </div>
              {hasAppt && (
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#8B5CF6", margin: "1px auto 0" }} />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12, marginTop: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>Legend</div>
        {[["#06B6D4","circle","Today"], ["#8B5CF6","dot","Has appointments"]].map(([c, t, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: t === "circle" ? 16 : 6, height: t === "circle" ? 16 : 6, borderRadius: "50%", background: c, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#64748B" }}>{l}</span>
          </div>
        ))}
      </div>
      <div className="grid-cal-foot">
        {[
          { l: "Scheduled", v: "48", c: "#06B6D4", bg: "#ECFEFF" },
          { l: "Completed", v: "31", c: "#22C55E", bg: "#F0FDF4" },
        ].map(({ l, v, c, bg }) => (
          <div key={l} style={{ background: bg, borderRadius: 10, padding: "10px 12px" }}>
            <div className="stat-num" style={{ fontSize: 20, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: c, opacity: 0.7, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentList() {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div className="card-title">Today's Schedule</div>
          <div className="card-sub">6 appointments scheduled</div>
        </div>
        <button style={{ fontSize: 12, fontWeight: 600, color: "#06B6D4", background: "#ECFEFF", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}>
          View All <ChevronRight size={12} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {appointments.map((a, i) => {
          const st       = statusMap[a.status];
          const isActive = a.status === "active";
          return (
            <div
              key={i}
              className="hm-appt"
              style={{
                border: `1px solid ${isActive ? "#BFDBFE" : "#F1F5F9"}`,
                background: isActive ? "#EFF6FF" : "#fff",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", minWidth: 44, fontFamily: "'Outfit', sans-serif" }}>
                {a.time}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {a.patient}
                </div>
                <div className="hm-appt-meta">{a.doctor} · {a.dept}</div>
              </div>
              <div className="hm-appt-type">{a.type}</div>
              <div className="badge" style={{ color: st.color, background: st.bg }}>{st.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BusinessGrowth() {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="card-title">Business Growth 2025</div>
          <div className="card-sub">Revenue, expenses & net profit — full year</div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          {[["#06B6D4","Revenue"], ["#EF4444","Expenses"], ["#22C55E","Profit"]].map(([c, l]) => (
            <div key={l} className="legend-row">
              <div style={{ width: 14, height: 3, background: c, borderRadius: 2 }} />
              <span className="legend-text">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-growth">
        {[
          { label: "Total Revenue",  value: "₹49.53L", change: "+18.2%", color: "#06B6D4", bg: "#ECFEFF" },
          { label: "Total Expenses", value: "₹33.21L", change: "+12.4%", color: "#EF4444", bg: "#FFF1F2" },
          { label: "Net Profit",     value: "₹16.32L", change: "+28.6%", color: "#22C55E", bg: "#F0FDF4" },
        ].map(({ label, value, change, color, bg }) => (
          <div key={label} className="growth-kpi" style={{ background: bg }}>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>{label}</div>
            <div className="stat-num" style={{ fontSize: 24, color }}>{value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
              <TrendingUp size={12} color="#22C55E" />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#22C55E" }}>{change} YoY</span>
            </div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={growthData} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}K`} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v, n) => [`₹${v}K`, n.charAt(0).toUpperCase() + n.slice(1)]} />
          <Line type="monotone" dataKey="revenue"  stroke="#06B6D4" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2}   dot={false} strokeDasharray="5 3" />
          <Line type="monotone" dataKey="profit"   stroke="#22C55E" strokeWidth={2.5} dot={{ r: 3, fill: "#22C55E", strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function TopDoctorsChart() {
  return (
    <div className="card">
      <div style={{ marginBottom: 16 }}>
        <div className="card-title">Top Doctors Performance</div>
        <div className="card-sub">Patients handled this month</div>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
        {topDoctors.map(({ name, color }) => (
          <div key={name} className="legend-row">
            <div className="legend-dot" style={{ background: color }} />
            <span className="legend-text">{name}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={topDoctors} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={v => [v, "Patients"]} />
          <Bar dataKey="patients" radius={[6, 6, 0, 0]}>
            {topDoctors.map((e, i) => <Cell key={i} fill={e.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Dashboard page content ──────────────────────────────────────────────────
function DashboardContent() {
  const [period, setPeriod] = useState("monthly");

  return (
    <main className="hm-content">
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-sub">Welcome back, Dr. Aditya — here's what's happening today at MediCare.</p>
      </div>

      <KpiCards />

      <div className="grid-flow">
        <PatientFlowChart period={period} onPeriodChange={setPeriod} />
        <DeptDonut />
      </div>

      <div className="grid-schedule">
        <MiniCalendar />
        <AppointmentList />
      </div>

      <BusinessGrowth />
      <div style={{ marginTop: 24 }}>
        <TopDoctorsChart />
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}

// ── Root export — this IS the full shell for /dashboard ────────────────────
export default function Dashboard() {
  useGoogleFonts();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav,   setActiveNav  ] = useState("Dashboard");

  const handleNav = (label) => {
    setActiveNav(label);
    setSidebarOpen(false); // auto-close drawer on mobile
  };

  return (
    <div className="hm-shell">
      {/* Mobile backdrop */}
      <div
        className={`hm-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        activeNav={activeNav}
        onNavClick={handleNav}
      />

      {/* Main column */}
      <div className="hm-main">
        <Topbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
        />

        {/* Active nav content */}
        {activeNav === "Dashboard" ? (
          <DashboardContent />
        ) : (
          <main
            className="hm-content"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <p style={{ fontSize: 18, color: "#94A3B8" }}>
              {activeNav} — coming soon
            </p>
          </main>
        )}
      </div>
    </div>
  );
}