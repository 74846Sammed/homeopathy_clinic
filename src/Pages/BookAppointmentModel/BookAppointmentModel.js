import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaUser, FaPhone, FaUserMd, FaCalendarAlt, FaClock, FaCheckCircle, FaLeaf } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import './BookAppointmentModel.css';

/* ── Doctor list (mirrors HomePage data — single source of truth) ── */
const DOCTORS = [
  { value: '',                   label: 'Select a Doctor',          disabled: true  },
  { value: 'dr-mark-smith',      label: 'Dr. Mark Smith — Chronic Disorders (18 Yrs)' },
  { value: 'dr-sarah-johnson',   label: 'Dr. Sarah Johnson — Skin & Allergy (12 Yrs)'  },
  { value: 'dr-robert-wilson',   label: 'Dr. Robert Wilson — Child & Women Health (10 Yrs)' },
];

/* ── Available time slots ── */
const TIME_SLOTS = [
  { value: '',       label: 'Select a Time Slot', disabled: true },
  { value: '08:00',  label: '08:00 AM' },
  { value: '09:00',  label: '09:00 AM' },
  { value: '10:00',  label: '10:00 AM' },
  { value: '11:00',  label: '11:00 AM' },
  { value: '12:00',  label: '12:00 PM' },
  { value: '14:00',  label: '02:00 PM' },
  { value: '15:00',  label: '03:00 PM' },
  { value: '16:00',  label: '04:00 PM' },
  { value: '17:00',  label: '05:00 PM' },
  { value: '18:00',  label: '06:00 PM' },
];

/* ── Helpers ── */
const today = () => new Date().toISOString().split('T')[0];

const INITIAL_FORM = {
  fullName: '',
  mobile:   '',
  doctor:   '',
  date:     '',
  time:     '',
};

const INITIAL_ERRORS = {
  fullName: '',
  mobile:   '',
  doctor:   '',
  date:     '',
  time:     '',
};

/* ════════════════════════════════════════
   COMPONENT
════════════════════════════════════════ */
function BookAppointment({ isOpen, onClose }) {
  const [form, setForm]         = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const firstInputRef           = useRef(null);
  const modalRef                = useRef(null);

  /* ── Auto-focus first input when modal opens ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Close on Escape key ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* ── Backdrop click ── */
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
    /* Reset after exit animation completes */
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setErrors(INITIAL_ERRORS);
      setSubmitted(false);
    }, 350);
  };

  /* ── Validation ── */
  const validate = () => {
    const e = { ...INITIAL_ERRORS };
    let valid = true;

    if (!form.fullName.trim()) {
      e.fullName = 'Full name is required.'; valid = false;
    } else if (form.fullName.trim().length < 3) {
      e.fullName = 'Name must be at least 3 characters.'; valid = false;
    }

    if (!form.mobile.trim()) {
      e.mobile = 'Mobile number is required.'; valid = false;
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      e.mobile = 'Enter a valid 10-digit Indian mobile number.'; valid = false;
    }

    if (!form.doctor) {
      e.doctor = 'Please select a doctor.'; valid = false;
    }

    if (!form.date) {
      e.date = 'Please select an appointment date.'; valid = false;
    }

    if (!form.time) {
      e.time = 'Please select a time slot.'; valid = false;
    }

    setErrors(e);
    return valid;
  };

  /* ── Input change ── */
  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    /* Simulate API call — replace with real endpoint */
    await new Promise(res => setTimeout(res, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  if (!isOpen && !submitted) return null;

  return (
    <div
      className={`bk-backdrop ${isOpen ? 'bk-backdrop--open' : 'bk-backdrop--close'}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bk-modal-title"
    >
      <div
        ref={modalRef}
        className={`bk-modal ${isOpen ? 'bk-modal--open' : 'bk-modal--close'}`}
      >
        {/* ── Close Button ── */}
        <button
          className="bk-close"
          onClick={handleClose}
          aria-label="Close appointment modal"
          type="button"
        >
          <FaTimes />
        </button>

        {/* ── Left decorative panel ── */}
        <aside className="bk-sidebar" aria-hidden="true">
          <div className="bk-sidebar__inner">
            <div className="bk-sidebar__logo">
              <FaLeaf className="bk-logo-icon" />
              <span>Mark Hospital</span>
            </div>
            <h2 className="bk-sidebar__tagline">
              Healing<br />Naturally,<br />Treating<br />Holistically.
            </h2>
            <ul className="bk-sidebar__perks">
              {[
                'No Side Effects',
                'Classical Homeopathy',
                'Root-Cause Treatment',
                '15+ Years of Trust',
              ].map((p) => (
                <li key={p}><MdVerified className="bk-perk-icon" />{p}</li>
              ))}
            </ul>
            <div className="bk-sidebar__rating">
              <span className="bk-rating-star">★★★★★</span>
              <span>4.9 / 5 — 1,240+ Reviews</span>
            </div>
            <div className="bk-sidebar__particles" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className={`bk-sp bk-sp--${i + 1}`} />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main form panel ── */}
        <div className="bk-form-panel">
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div className="bk-success">
              <div className="bk-success__ring">
                <FaCheckCircle className="bk-success__icon" />
              </div>
              <h3 className="bk-success__title">Appointment Confirmed!</h3>
              <p className="bk-success__msg">
                Thank you, <strong>{form.fullName}</strong>.<br />
                We'll call you on <strong>{form.mobile}</strong> to confirm your appointment on{' '}
                <strong>
                  {new Date(form.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </strong>{' '}
                at{' '}
                <strong>{TIME_SLOTS.find(t => t.value === form.time)?.label}</strong>.
              </p>
              <button className="bk-submit-btn" onClick={handleClose} type="button">
                Close
              </button>
            </div>
          ) : (
            /* ── FORM STATE ── */
            <>
              <header className="bk-form-header">
                <span className="bk-eyebrow">Book Your Visit</span>
                <h2 id="bk-modal-title" className="bk-form-title">
                  Schedule an Appointment
                </h2>
                <p className="bk-form-subtitle">
                  Fill in the details below — we'll confirm within 30 minutes.
                </p>
              </header>

              <form
                className="bk-form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
              >
                {/* ── Full Name ── */}
                <div className={`bk-field ${errors.fullName ? 'bk-field--error' : ''} ${form.fullName ? 'bk-field--filled' : ''}`}>
                  <label htmlFor="bk-fullname" className="bk-label">
                    <FaUser className="bk-label-icon" /> Full Name
                  </label>
                  <input
                    ref={firstInputRef}
                    id="bk-fullname"
                    type="text"
                    className="bk-input"
                    placeholder="e.g. Rahul Patil"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    aria-describedby={errors.fullName ? 'bk-fullname-err' : undefined}
                    maxLength={80}
                  />
                  {errors.fullName && (
                    <span id="bk-fullname-err" className="bk-error" role="alert">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* ── Mobile ── */}
                <div className={`bk-field ${errors.mobile ? 'bk-field--error' : ''} ${form.mobile ? 'bk-field--filled' : ''}`}>
                  <label htmlFor="bk-mobile" className="bk-label">
                    <FaPhone className="bk-label-icon" /> Mobile Number
                  </label>
                  <div className="bk-input-prefix-wrap">
                    <span className="bk-prefix">+91</span>
                    <input
                      id="bk-mobile"
                      type="tel"
                      className="bk-input bk-input--prefixed"
                      placeholder="98XXXXXXXX"
                      value={form.mobile}
                      onChange={handleChange('mobile')}
                      aria-describedby={errors.mobile ? 'bk-mobile-err' : undefined}
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </div>
                  {errors.mobile && (
                    <span id="bk-mobile-err" className="bk-error" role="alert">
                      {errors.mobile}
                    </span>
                  )}
                </div>

                {/* ── Doctor ── */}
                <div className={`bk-field ${errors.doctor ? 'bk-field--error' : ''} ${form.doctor ? 'bk-field--filled' : ''}`}>
                  <label htmlFor="bk-doctor" className="bk-label">
                    <FaUserMd className="bk-label-icon" /> Select Doctor
                  </label>
                  <div className="bk-select-wrap">
                    <select
                      id="bk-doctor"
                      className="bk-select"
                      value={form.doctor}
                      onChange={handleChange('doctor')}
                      aria-describedby={errors.doctor ? 'bk-doctor-err' : undefined}
                    >
                      {DOCTORS.map(({ value, label, disabled }) => (
                        <option key={value} value={value} disabled={disabled}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.doctor && (
                    <span id="bk-doctor-err" className="bk-error" role="alert">
                      {errors.doctor}
                    </span>
                  )}
                </div>

                {/* ── Date & Time — side by side ── */}
                <div className="bk-row">
                  {/* Date */}
                  <div className={`bk-field ${errors.date ? 'bk-field--error' : ''} ${form.date ? 'bk-field--filled' : ''}`}>
                    <label htmlFor="bk-date" className="bk-label">
                      <FaCalendarAlt className="bk-label-icon" /> Date
                    </label>
                    <input
                      id="bk-date"
                      type="date"
                      className="bk-input"
                      value={form.date}
                      onChange={handleChange('date')}
                      min={today()}
                      aria-describedby={errors.date ? 'bk-date-err' : undefined}
                    />
                    {errors.date && (
                      <span id="bk-date-err" className="bk-error" role="alert">
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <div className={`bk-field ${errors.time ? 'bk-field--error' : ''} ${form.time ? 'bk-field--filled' : ''}`}>
                    <label htmlFor="bk-time" className="bk-label">
                      <FaClock className="bk-label-icon" /> Time Slot
                    </label>
                    <div className="bk-select-wrap">
                      <select
                        id="bk-time"
                        className="bk-select"
                        value={form.time}
                        onChange={handleChange('time')}
                        aria-describedby={errors.time ? 'bk-time-err' : undefined}
                      >
                        {TIME_SLOTS.map(({ value, label, disabled }) => (
                          <option key={value} value={value} disabled={disabled}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.time && (
                      <span id="bk-time-err" className="bk-error" role="alert">
                        {errors.time}
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Submit ── */}
                <button
                  type="submit"
                  className={`bk-submit-btn ${loading ? 'bk-submit-btn--loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="bk-spinner" aria-hidden="true" />
                      Booking…
                    </>
                  ) : (
                    'Confirm Appointment'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;