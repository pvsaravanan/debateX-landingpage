"use client";

import { useEffect, useState, useRef } from "react";

export default function Timeline() {
  const [activeStep, setActiveStep] = useState("s1");
  const stepRefs = {
    s1: useRef(null),
    s2: useRef(null),
    s3: useRef(null),
    s4: useRef(null),
    s5: useRef(null),
  };

  useEffect(() => {
    const stepIds = ["s1", "s2", "s3", "s4", "s5"];
    const observers = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.getAttribute("data-step");
            setActiveStep(stepId);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -40% 0px",
      }
    );

    stepIds.forEach((id) => {
      const el = stepRefs[id].current;
      if (el) {
        observer.observe(el);
        observers.push(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
    // Optional: scroll the selected card into view
    stepRefs[stepId].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const stageVisuals = {
    s1: (
      <div className="stage-slide active">
        <div className="slide-meta font-mono">ROUND 1 · PARALLEL DRAFTS</div>
        <div className="progress-bar-group">
          <div className="bar-label font-mono">Llama-3.3-70B</div>
          <div className="bar-fill-track"><div className="bar-fill green" style={{ width: "100%" }}></div></div>
        </div>
        <div className="progress-bar-group">
          <div className="bar-label font-mono">GPT-OSS-120B</div>
          <div className="bar-fill-track"><div className="bar-fill green" style={{ width: "100%" }}></div></div>
        </div>
        <div className="progress-bar-group">
          <div className="bar-label font-mono">Qwen3-32B</div>
          <div className="bar-fill-track"><div className="bar-fill green" style={{ width: "100%" }}></div></div>
        </div>
        <p className="slide-footer font-mono">Draft answers locked · 3/3 responded</p>
      </div>
    ),
    s2: (
      <div className="stage-slide active">
        <div className="slide-meta font-mono">ROUND 2 · PEER REVIEW</div>
        <div className="ranking-list font-mono">
          <div style={{ padding: "10px 14px", background: "var(--bg-elevated)", border: "0.5px solid var(--bg-border)", marginBottom: "8px" }}>
            1. Response B <span className="muted">(Rank 1.33)</span>
          </div>
          <div style={{ padding: "10px 14px", background: "var(--bg-elevated)", border: "0.5px solid var(--bg-border)", marginBottom: "8px" }}>
            2. Response A <span className="muted">(Rank 1.67)</span>
          </div>
          <div style={{ padding: "10px 14px", background: "var(--bg-elevated)", border: "0.5px solid var(--bg-border)", marginBottom: "8px" }}>
            3. Response C <span className="muted">(Rank 3.00)</span>
          </div>
        </div>
        <p className="slide-footer font-mono">Scores aggregate · blindness enforced</p>
      </div>
    ),
    s3: (
      <div className="stage-slide active">
        <div className="slide-meta font-mono">ROUND 3 · REVISE OR DEFEND</div>
        <div className="decision-flow font-mono">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "var(--bg-elevated)", border: "0.5px solid var(--bg-border)", marginBottom: "8px" }}>
            <span className="chip-defend">DEFEND</span> Response B maintains locks
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "var(--bg-elevated)", border: "0.5px solid var(--bg-border)", marginBottom: "8px" }}>
            <span className="chip-revise">REVISE</span> Response A adds thread checks
          </div>
        </div>
        <p className="slide-footer font-mono">Refinement complete · code safety verified</p>
      </div>
    ),
    s4: (
      <div className="stage-slide active">
        <div className="slide-meta font-mono" style={{ color: "var(--accent)" }}>ROUND 4 · CHALLENGER CRITIQUE</div>
        <div className="critique-box font-mono" style={{ background: "rgba(226, 59, 27, 0.02)", border: "0.5px solid rgba(226, 59, 27, 0.15)", padding: "16px", marginBottom: "8px" }}>
          <div className="red-arrow" style={{ color: "var(--accent)", fontWeight: "700", marginBottom: "8px" }}>&gt;&gt; VULNERABILITY EXPOSED:</div>
          <div className="critique-content" style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: "300" }}>
            "Teardown conditions race with executing queries. Locks must be disposed after active pool joins."
          </div>
        </div>
        <p className="slide-footer font-mono">Target: Response A · 1 weakness logged</p>
      </div>
    ),
    s5: (
      <div className="stage-slide active">
        <div className="slide-meta font-mono" style={{ color: "var(--green)" }}>ROUND 5 · CHAIRMAN SYNTHESIS</div>
        <div className="final-visual font-mono" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "var(--bg-elevated)", border: "0.5px solid var(--bg-border)", marginBottom: "8px" }}>
          <span className="accent-text" style={{ color: "var(--green)", fontWeight: "700" }}>&gt;&gt; VETTED_CONSENSUS.JSON</span>
          <div className="success-dot-pulse" style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--green)", boxShadow: "0 0 0 4px rgba(74, 222, 128, 0.2)" }}></div>
        </div>
        <p className="slide-footer font-mono" style={{ color: "var(--green)" }}>Deliberation consensus complete · 100% confidence</p>
      </div>
    ),
  };

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container-1100">
        <div className="section-header-box reveal revealed">
          <div className="eyebrow-box">✓ DELIBERATION BEATS SCALE</div>
        </div>
        <h2 className="section-title reveal revealed">Deliberation beats scale.</h2>
        <p className="section-subtext reveal revealed">debateX is a modular council—model, context, and roles engineered for verified accuracy.</p>
        
        <div className="timeline-split-layout">
          {/* Left: Steps List */}
          <div className="timeline-steps-col">
            {/* Step 1 */}
            <div
              ref={stepRefs.s1}
              className={`step-card reveal revealed ${activeStep === "s1" ? "active" : ""}`}
              onClick={() => handleStepClick("s1")}
              data-step="s1"
            >
              <span className="step-label font-mono">STEP 01</span>
              <h3 className="step-heading">Independent responses.</h3>
              <p className="step-description">Council models generate independent, blind initial answers. Captures a broad set of perspectives without peer bias.</p>
            </div>
            
            {/* Step 2 */}
            <div
              ref={stepRefs.s2}
              className={`step-card reveal revealed ${activeStep === "s2" ? "active" : ""}`}
              onClick={() => handleStepClick("s2")}
              data-step="s2"
            >
              <span className="step-label font-mono">STEP 02</span>
              <h3 className="step-heading">Anonymized review.</h3>
              <p className="step-description">Models evaluate anonymized drafts, outputting critiques and a strict ranking list (Response A, B, C).</p>
            </div>
            
            {/* Step 3 */}
            <div
              ref={stepRefs.s3}
              className={`step-card reveal revealed ${activeStep === "s3" ? "active" : ""}`}
              onClick={() => handleStepClick("s3")}
              data-step="s3"
            >
              <span className="step-label font-mono">STEP 03</span>
              <h3 className="step-heading">Defend or Revise.</h3>
              <p className="step-description">Models recognize their original drafts and choose to either defend their reasoning or revise their answers.</p>
            </div>

            {/* Step 4 */}
            <div
              ref={stepRefs.s4}
              className={`step-card reveal revealed ${activeStep === "s4" ? "active" : ""}`}
              onClick={() => handleStepClick("s4")}
              data-step="s4"
            >
              <span className="step-label font-mono">STEP 04</span>
              <h3 className="step-heading">Challenger attack.</h3>
              <p className="step-description">The lowest-ranked model is assigned to identify flaws, assumptions, and edge cases in the leading answers.</p>
            </div>

            {/* Step 5 */}
            <div
              ref={stepRefs.s5}
              className={`step-card reveal revealed ${activeStep === "s5" ? "active" : ""}`}
              onClick={() => handleStepClick("s5")}
              data-step="s5"
            >
              <span className="step-label font-mono">STEP 05</span>
              <h3 className="step-heading">Chairman consensus.</h3>
              <p className="step-description">The Chairman synthesizes the complete historical JSON transcript into a single master consensus answer.</p>
            </div>
          </div>
          
          {/* Right: Visual Panel Container */}
          <div className="timeline-visual-col reveal revealed">
            <div className="visual-panel-card">
              <div className="visual-panel-title font-mono">COUNCIL DELIBERATION STAGE</div>
              <div className="visual-stage-content" id="stage-visuals">
                {stageVisuals[activeStep]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
