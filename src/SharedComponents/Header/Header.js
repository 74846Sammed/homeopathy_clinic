import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../Assets/Images/logo 2.png';
import '../Header/Header.css';

const navItems = [
  { name: 'Home',    path: '/home',       ariaLabel: 'Go to Home page' },
  { name: 'About',   path: '/about',      ariaLabel: "Learn about Mark's Hospital" },
  // { name: 'Blogs',   path: '/blogs',      ariaLabel: 'Read our health blogs' },
  { name: 'Contact', path: '/contact_us', ariaLabel: "Contact Mark's Hospital" },
];

function Header() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled,   setScrolled]   = React.useState(false);
  const [activeTab,  setActiveTab]  = React.useState('Home');

  /* ── sync active tab with route ── */
  React.useEffect(() => {
    const match = navItems.find(i => i.path === location.pathname);
    if (match) setActiveTab(match.name);
  }, [location]);

  /* ── scroll-shadow effect ── */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── lock body scroll when drawer is open ── */
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleTabClick = (item) => {
    setActiveTab(item.name);
    navigate(item.path);
    setMobileOpen(false);
  };

  return (
    <>
      {/*
        SEO: JSON-LD structured data helps Google display rich results
        for the hospital in Knowledge Panel / local search.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type":    "Hospital",
            "name":     "Mark's Hospital",
            "url":      "https://www.markshospital.com",
            "logo":     "https://www.markshospital.com/logo.png",
          }),
        }}
      />

      {/* ── semantic <header> tag signals page banner to crawlers ── */}
      <header
        className={`mh-header${scrolled ? ' mh-header--scrolled' : ''}`}
        role="banner"
      >
        {/* decorative top accent stripe */}
        <div className="mh-accent-bar" aria-hidden="true" />

        <div className="mh-inner">

          {/* ────── Brand / Logo ────── */}
          <a
            href="/home"
            className="mh-brand"
            aria-label="Mark's Hospital – return to home"
            onClick={(e) => { e.preventDefault(); handleTabClick(navItems[0]); }}
          >
            <div className="mh-logo-wrap">
              {/*
                width/height + loading="eager" + fetchpriority="high" tells
                the browser to treat this as an LCP candidate → better Core
                Web Vitals → better SEO ranking.
              */}
              <img
                src={logo}
                alt="Mark's Hospital logo"
                className="mh-logo"
                width="52"
                height="52"
                loading="eager"
                fetchpriority="high"
              />
              <div className="mh-logo-ring" aria-hidden="true" />
            </div>

            <span className="mh-brand-text">
              <span className="mh-brand-name">Mark's Hospital</span>
              <span className="mh-brand-tagline">Excellence in Healthcare</span>
            </span>
          </a>

          {/* ────── Desktop Navigation ────── */}
          {/*
            <nav> + <ul> hierarchy is the gold-standard HTML structure.
            aria-label differentiates multiple <nav> landmarks for screen readers.
          */}
          <nav className="mh-nav" aria-label="Main navigation">
            <ul role="list">
              {navItems.map((item, idx) => (
                <li key={item.name} style={{ '--i': idx }}>
                  <a
                    href={item.path}
                    className={`mh-nav-link${activeTab === item.name ? ' mh-nav-link--active' : ''}`}
                    aria-label={item.ariaLabel}
                    aria-current={activeTab === item.name ? 'page' : undefined}
                    onClick={(e) => { e.preventDefault(); handleTabClick(item); }}
                  >
                    {item.name}
                    <span className="mh-nav-ink" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ────── CTA Button (desktop) ────── */}
          <a
            href="/contact_us"
            className="mh-cta"
            aria-label="Book an appointment at Mark's Hospital"
            onClick={(e) => { e.preventDefault(); handleTabClick(navItems[3]); }}
          >
            <span>Book Appointment</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" width="18" height="18">
              <path
                d="M5 10h10M11 6l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* ────── Hamburger (mobile / tablet) ────── */}
          <button
            className={`mh-burger${mobileOpen ? ' mh-burger--open' : ''}`}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mh-mobile-menu"
            onClick={() => setMobileOpen(v => !v)}
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      {/* ────── Mobile overlay backdrop ────── */}
      <div
        className={`mh-overlay${mobileOpen ? ' mh-overlay--visible' : ''}`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {/* ────── Mobile slide-in drawer ────── */}
      <nav
        id="mh-mobile-menu"
        className={`mh-drawer${mobileOpen ? ' mh-drawer--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="mh-drawer-brand">
          <img src={logo} alt="" width="40" height="40" aria-hidden="true" />
          <span>Mark's Hospital</span>
        </div>

        <ul role="list">
          {navItems.map((item, idx) => (
            <li key={item.name} style={{ '--di': idx }}>
              <a
                href={item.path}
                className={`mh-drawer-link${activeTab === item.name ? ' mh-drawer-link--active' : ''}`}
                aria-current={activeTab === item.name ? 'page' : undefined}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={(e) => { e.preventDefault(); handleTabClick(item); }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/contact_us"
          className="mh-drawer-cta"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={(e) => { e.preventDefault(); handleTabClick(navItems[3]); }}
        >
          Book Appointment
        </a>
      </nav>
    </>
  );
}

export default Header;