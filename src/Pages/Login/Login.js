import React, { useState, useEffect } from 'react';
import '../Login/Login.css';
import environment from '../../Environment/Environment';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

/*
  SEO NOTE:
  For a login page, the most important on-page signals are:
    1. <title> and <meta name="description"> in index.html / _document
    2. Semantic HTML (<main>, <h1>, <form>, <label>)
    3. aria-* attributes for accessibility (also a ranking signal)
    4. JSON-LD Organization schema
    5. Fast load – no blocking resources, no CLS (hence position:fixed layout)
*/

function Login() {
  const navigate  = useNavigate();
  const [deviceId, setDeviceId]   = useState('');
  const [loading,  setLoading]    = useState(false);
  const [showPwd,  setShowPwd]    = useState(false);
  const [formData, setFormData]   = useState({
    username:  '',
    password:  '',
    devicesId: '',
    status:    'Windows',
  });

  useEffect(() => {
    if (deviceId) setFormData(prev => ({ ...prev, devicesId: deviceId }));
  }, [deviceId]);

  const handleInputChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios({
      url:    `${environment.config.apiBaseUrl}user/login`,
      method: 'POST',
      data:   { ...formData },
    })
      .then((res) => {
        if (res?.data) {
          const token = res.data.token;
          if (token) {
            const accessToken = jwtDecode(token);
            localStorage.setItem('authToken', JSON.stringify(accessToken));
            toast.success('Login successful!');
            setFormData({ username: '', password: '', devicesId: '', status: 'Windows' });
            setTimeout(() => { navigate('/dashboard'); setLoading(false); }, 500);
          } else {
            toast.error('Token not received!');
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data || 'Login failed!');
        setLoading(false);
      });
  };

  return (
    <>
      {/* ── JSON-LD structured data for SEO ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'Organization',
            'name':     "Mark's Hospital",
            'url':      'https://www.markshospital.com',
            'logo':     'https://www.markshospital.com/logo.png',
            'sameAs':   ['https://www.markshospital.com'],
          }),
        }}
      />

      {/*
        position:fixed + inset:0 ensures the login page always fills the
        viewport exactly — no body padding-top from the header ever bleeds in.
      */}
      <div className="lgn-root" role="document">

        {/* ══════════ LEFT PANEL — visual / brand ══════════ */}
        <div className="lgn-panel lgn-panel--left" aria-hidden="true">
          <div className="lgn-panel-overlay" />

          {/* floating stat cards */}
          {/* <div className="lgn-stat lgn-stat--1">
            <span className="lgn-stat-icon">🏥</span>
            <div>
              <strong>500+</strong>
              <small>Beds Available</small>
            </div>
          </div>

          <div className="lgn-stat lgn-stat--2">
            <span className="lgn-stat-icon">👨‍⚕️</span>
            <div>
              <strong>120+</strong>
              <small>Specialists</small>
            </div>
          </div>

          <div className="lgn-stat lgn-stat--3">
            <span className="lgn-stat-icon">❤️</span>
            <div>
              <strong>98%</strong>
              <small>Patient Satisfaction</small>
            </div>
          </div> */}

          {/* brand watermark */}
          <div className="lgn-watermark">
            <span className="lgn-watermark-name">Mark's Hospital</span>
            <span className="lgn-watermark-tag">Excellence in Healthcare</span>
          </div>

          {/* decorative circles */}
          <div className="lgn-circle lgn-circle--1" />
          <div className="lgn-circle lgn-circle--2" />
          <div className="lgn-circle lgn-circle--3" />
        </div>

        {/* ══════════ RIGHT PANEL — login form ══════════ */}
        <main className="lgn-panel lgn-panel--right" id="main-content">

          <div className="lgn-form-wrap">

            {/* ── Header ── */}
            <div className="lgn-form-header">
              <div className="lgn-badge">Staff Portal</div>
              {/* h1 is important for SEO — exactly one per page */}
              <h1 className="lgn-title">Welcome Back</h1>
              <p className="lgn-subtitle">Sign in to your Mark's Hospital account</p>
            </div>

            {/* ── Form ── */}
            <form
              className="lgn-form"
              onSubmit={handleSubmit}
              aria-label="Staff login form"
              noValidate
            >

              {/* Username */}
              <div className="lgn-field">
                <label htmlFor="lgn-username" className="lgn-label">
                  Username
                </label>
                <div className="lgn-input-wrap">
                  <svg className="lgn-input-icon" viewBox="0 0 24 24" fill="none"
                       aria-hidden="true" width="18" height="18">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <input
                    id="lgn-username"
                    type="text"
                    className="lgn-input"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    autoComplete="username"
                    aria-required="true"
                    aria-label="Username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="lgn-field">
                <div className="lgn-label-row">
                  <label htmlFor="lgn-password" className="lgn-label">
                    Password
                  </label>
                  <button type="button" className="lgn-forgot"
                          aria-label="Forgot password">
                    Forgot password?
                  </button>
                </div>
                <div className="lgn-input-wrap">
                  <svg className="lgn-input-icon" viewBox="0 0 24 24" fill="none"
                       aria-hidden="true" width="18" height="18">
                    <rect x="3" y="11" width="18" height="11" rx="2"
                          stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"
                          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <input
                    id="lgn-password"
                    type={showPwd ? 'text' : 'password'}
                    className="lgn-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    autoComplete="current-password"
                    aria-required="true"
                    aria-label="Password"
                    required
                  />
                  <button
                    type="button"
                    className="lgn-eye"
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPwd(v => !v)}
                  >
                    {showPwd ? (
                      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
                              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <line x1="1" y1="1" x2="23" y2="23"
                              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                              stroke="currentColor" strokeWidth="1.8"/>
                        <circle cx="12" cy="12" r="3"
                                stroke="currentColor" strokeWidth="1.8"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`lgn-btn${loading ? ' lgn-btn--loading' : ''}`}
                disabled={loading}
                aria-label="Sign in to Mark's Hospital staff portal"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="lgn-spinner" aria-hidden="true" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <svg viewBox="0 0 20 20" fill="none" width="18" height="18"
                         aria-hidden="true">
                      <path d="M5 10h10M11 6l4 4-4 4"
                            stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* ── Footer ── */}
            <footer className="lgn-footer" aria-label="Page footer">
              <p>
                Developed with ❤️ by{' '}
                <a
                  href="#"
                  rel="noopener noreferrer"
                  aria-label="Developer: Sammed"
                >
                  Sammed
                </a>
              </p>
              <p className="lgn-footer-copy">
                © {new Date().getFullYear()} Mark's Hospital. All rights reserved.
              </p>
            </footer>
          </div>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        aria-label="Notifications"
      />
    </>
  );
}

export default Login;