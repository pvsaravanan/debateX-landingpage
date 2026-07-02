"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-top-zone">
        {/* Floating particles */}
        <div className="hero-particles">
          {mounted && Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="hero-particle" style={{ '--rand': Math.random() }}></div>
          ))}
        </div>

        <div className="hero-content text-reveal">
          <h1 className="hero-title">
            Multi-LLM<br />
            Deliberation<span style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>.</span><br />
            No guesses<span style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>.</span> No bias<span style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>.</span>
          </h1>
          <p className="hero-subtext">
            A self-hosted cognitive consensus engine orchestrating an adversarial council of diverse language models. debateX cross-examines claims and delivers vetted certainty.
          </p>
          
          <div className="hero-actions">
            <a href="#waitlist-section" className="cta-btn btn-primary">Join Waitlist</a>
            <a href="#how-it-works" className="cta-btn btn-secondary">Our Approach</a>
          </div>
        </div>
      </div>
      
      <div className="hero-bottom-zone">
        <div className="hero-ticker">
          <div className="marquee">
            <div className="marquee-content">
              <span>5-ROUND DELIBERATION</span><span className="dot">·</span>
              <span>8 LLM COUNCIL</span><span className="dot">·</span>
              <span>ROLE-BASED PERSONAS</span><span className="dot">·</span>
              <span>SSE STREAMING</span><span className="dot">·</span>
              <span>OPEN SOURCE</span><span className="dot">·</span>
              <span>SELF-HOSTED</span><span className="dot">·</span>
              <span>GROQ + OPENROUTER</span><span className="dot">·</span>
              <span>CHAIRMAN SYNTHESIS</span><span className="dot">·</span>
              <span>ANONYMIZED PEER REVIEW</span><span className="dot">·</span>
              <span>CHALLENGER CRITIQUE</span><span className="dot">·</span>
              <span>5-ROUND DELIBERATION</span><span className="dot">·</span>
              <span>8 LLM COUNCIL</span><span className="dot">·</span>
              <span>ROLE-BASED PERSONAS</span><span className="dot">·</span>
              <span>SSE STREAMING</span><span className="dot">·</span>
              <span>OPEN SOURCE</span><span className="dot">·</span>
              <span>SELF-HOSTED</span><span className="dot">·</span>
              <span>GROQ + OPENROUTER</span><span className="dot">·</span>
              <span>CHAIRMAN SYNTHESIS</span><span className="dot">·</span>
              <span>ANONYMIZED PEER REVIEW</span><span className="dot">·</span>
              <span>CHALLENGER CRITIQUE</span><span className="dot">·</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
