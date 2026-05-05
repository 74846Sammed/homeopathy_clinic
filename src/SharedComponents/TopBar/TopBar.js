// ── TopBar.jsx ───────────────────────────────────────────
//
// CSS is imported globally in App.jsx (topbar.css).
// No local <style> injection or named CSS imports needed.

import { Bell, Clock, Menu, Search, X } from "lucide-react";

export default function Topbar({ sidebarOpen, onToggleSidebar }) {
  return (
    <header className="tb-root">

      {/* Hamburger — mobile only (shown via CSS media query) */}
      <button className="tb-hamburger" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Search */}
      <div className="tb-search">
        <Search size={14} color="#94A3B8" />
        <input placeholder="Search patients, doctors..." />
      </div>

      <div className="tb-spacer" />

      {/* Date */}
      <div className="tb-date">
        <Clock size={13} color="#94A3B8" />
        Mon, Apr 27, 2026
      </div>

      {/* Notification Bell */}
      <div className="tb-bell-wrap">
        <button className="tb-bell-btn" aria-label="Notifications">
          <Bell size={17} color="#64748B" />
        </button>
        <div className="tb-bell-dot" />
      </div>

      {/* Profile */}
      <div className="tb-profile">
        <div className="tb-avatar">AD</div>
        <div>
          <div className="tb-profile-name">Dr. Aditya</div>
          <div className="tb-profile-role">Admin</div>
        </div>
      </div>

    </header>
  );
}