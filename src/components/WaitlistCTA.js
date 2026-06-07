"use client";

import { useState } from "react";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");

    setTimeout(() => {
      setSubmittedEmail(email);
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="cta-section" id="waitlist-section">
      <div className="cta-glow"></div>
      <div className="container-720">
        <div className="section-header-box reveal revealed">
          <div className="eyebrow-box">✓ EARLY ACCESS</div>
        </div>
        <h2 className="section-title reveal revealed">Join the waitlist.</h2>
        <p className="cta-subtext reveal revealed">
          debateX is open-source and self-hostable. Sign up to receive deployment scripts and early release versions.
        </p>
        
        {status !== "success" ? (
          <form className="email-form waitlist-form reveal revealed centered-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your developer email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              required
            />
            <button
              type="submit"
              className="cta-btn btn-primary"
              disabled={status === "submitting"}
              style={status === "submitting" ? { opacity: 0.6 } : {}}
            >
              {status === "submitting" ? "Requesting..." : "Request Access"}
            </button>
          </form>
        ) : (
          <div className="form-success">
            <div className="form-success-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--accent)" }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Access requested for <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{submittedEmail}</strong>. Check your inbox shortly.</span>
            </div>
          </div>
        )}
        
        <p className="cta-footnote reveal revealed">No account required. MIT License. Self-hostable via Docker.</p>
      </div>
    </section>
  );
}
