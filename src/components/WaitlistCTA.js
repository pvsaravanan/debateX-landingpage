"use client";

import { useState } from "react";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmittedEmail(email);
        setStatus("success");
        setEmail("");
      } else {
        setErrorMessage(data.error || "Failed to submit waitlist registration.");
        setStatus("idle");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected network error occurred.");
      setStatus("idle");
    }
  };

  return (
    <section className="cta-section" id="waitlist-section" style={{ borderTop: '0.5px solid var(--bg-border-hi)', padding: '80px 0 64px', position: 'relative' }}>
      <div className="container-720">
        <div className="section-header-box reveal revealed">
          <div className="eyebrow-box">✓ EARLY ACCESS</div>
        </div>
        <h2 className="section-title reveal revealed"><span className="gradient-text-light">Join the waitlist.</span></h2>
        <p className="cta-subtext reveal revealed">
          Experience debateX via the cloud. Sign up to get early access to our hosted platform and test multi-LLM consensus live.
        </p>
        
        {status !== "success" ? (
          <>
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
                className="cta-btn btn-primary-dark cta-pulse"
                disabled={status === "submitting"}
                style={status === "submitting" ? { opacity: 0.6 } : {}}
              >
                {status === "submitting" ? "Requesting..." : "Request Access"}
              </button>
            </form>
            {errorMessage && (
              <p style={{ color: "var(--accent)", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "12px", textAlign: "center" }}>
                ✕ {errorMessage}
              </p>
            )}
          </>
        ) : (
          <div className="form-success">
            <div className="form-success-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--accent)" }} aria-hidden="true" role="img">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Access requested for <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{submittedEmail}</strong>. Check your inbox shortly.</span>
            </div>
          </div>
        )}
        
        <p className="cta-footnote reveal revealed">Free tier available. MIT License. Also self-hostable via Docker.</p>
      </div>
    </section>
  );
}
