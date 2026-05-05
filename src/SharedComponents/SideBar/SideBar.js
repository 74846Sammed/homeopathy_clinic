// ── SideBar.jsx ──────────────────────────────────────────
//
// CSS is imported globally in App.jsx (sidebar.css).
// No local <style> injection or named CSS imports needed.

import {
  LayoutDashboard, Users, Calendar, Stethoscope,
  Pill, FlaskConical, BarChart3, Settings, Heart,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Main Menu",
    items: [
      { icon: LayoutDashboard, label: "Dashboard",    badge: null   },
      { icon: Users,           label: "Patients",     badge: "2.4k" },
      { icon: Calendar,        label: "Appointments", badge: "48"   },
      { icon: Stethoscope,     label: "Doctors",      badge: "124"  },
      { icon: Pill,            label: "Pharmacy",     badge: null   },
      { icon: FlaskConical,    label: "Laboratory",   badge: null   },
    ],
  },
  {
    label: "System",
    items: [
      { icon: BarChart3, label: "Reports",  badge: null },
      { icon: Settings,  label: "Settings", badge: null },
    ],
  },
];

export default function Sidebar({ isOpen, activeNav, onNavClick }) {
  return (
    <aside className={`sb-root${isOpen ? " mobile-open" : ""}`}>

      {/* Logo */}
      <div className="sb-logo-wrap">
        <div className="sb-logo-icon">
          <Heart size={20} color="#fff" strokeWidth={2.5} />
        </div>
        <div className="sb-logo-text">
          <div className="sb-name">MediCare</div>
          <div className="sb-sub">Hospital Management</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sb-nav">
        {NAV_SECTIONS.map(({ label, items }, si) => (
          <div key={label}>
            <div className={`sb-section-title${si > 0 ? " mt" : ""}`}>{label}</div>
            {items.map(({ icon: Icon, label: lbl, badge }) => {
              const active = activeNav === lbl;
              return (
                <button
                  key={lbl}
                  className={`sb-item${active ? " active" : ""}`}
                  onClick={() => onNavClick(lbl)}
                >
                  {active && <div className="sb-indicator" />}
                  <Icon size={18} color={active ? "#06B6D4" : "#64748B"} style={{ flexShrink: 0 }} />
                  <span className="sb-item-label">{lbl}</span>
                  {badge && <span className="sb-badge">{badge}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div className="sb-profile">
        <div className="sb-avatar">AD</div>
        <div className="sb-profile-info">
          <div className="sb-profile-name">Dr. Aditya</div>
          <div className="sb-profile-role">Chief Admin</div>
        </div>
      </div>

    </aside>
  );
}