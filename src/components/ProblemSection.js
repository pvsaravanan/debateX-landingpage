"use client";
import { useState, useEffect, useRef } from 'react';

export default function ProblemSection() {
  const [pupilPos, setPupilPos] = useState({ x: 200, y: 200 });
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const svgCenterX = rect.left + rect.width / 2;
      const svgCenterY = rect.top + rect.height / 2;
      
      const dx = e.clientX - svgCenterX;
      const dy = e.clientY - svgCenterY;
      
      const angle = Math.atan2(dy, dx);
      const maxDistance = 14; 
      const distance = Math.min(maxDistance, Math.sqrt(dx*dx + dy*dy) / 20);
      
      setPupilPos({
        x: 200 + Math.cos(angle) * distance,
        y: 200 + Math.sin(angle) * distance
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ticks = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x1 = +(200 + 150 * Math.cos(angle)).toFixed(3);
    const y1 = +(200 + 150 * Math.sin(angle)).toFixed(3);
    const x2 = +(200 + 160 * Math.cos(angle)).toFixed(3);
    const y2 = +(200 + 160 * Math.sin(angle)).toFixed(3);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-muted)" strokeWidth="1" opacity="0.5" />;
  });

  return (
    <>
            {/* Header Area */}
            <div className="problem-header">
              <div className="problem-eyebrow-box">
                <span className="eyebrow-icon">X</span>
                <span className="eyebrow-text">THE PROBLEM</span>
              </div>
              <h2 className="problem-title reveal revealed">
                You're trusting one model<span className="circle-period">.</span><br />
                And you're being misled<span className="circle-period">.</span>
              </h2>
            </div>

            {/* Body Area */}
            <div className="problem-body">
              {/* Left Panel: Radar SVG */}
              <div className="problem-radar-panel reveal revealed">
                <svg ref={svgRef} className="radar-svg" viewBox="30 30 340 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="radar-svg-title">
                  <title id="radar-svg-title">Interactive Model Monitoring Radar</title>
                  {/* Corner framing brackets */}
                  <path d="M 40 60 L 40 40 L 60 40" stroke="var(--text-muted)" strokeWidth="1" fill="none" opacity="0.4" />
                  <path d="M 360 60 L 360 40 L 340 40" stroke="var(--text-muted)" strokeWidth="1" fill="none" opacity="0.4" />
                  <path d="M 40 340 L 40 360 L 60 360" stroke="var(--text-muted)" strokeWidth="1" fill="none" opacity="0.4" />
                  <path d="M 360 340 L 360 360 L 340 360" stroke="var(--text-muted)" strokeWidth="1" fill="none" opacity="0.4" />

                  {/* Concentric Grid Circles */}
                  <circle cx="200" cy="200" r="160" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <circle cx="200" cy="200" r="120" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <circle cx="200" cy="200" r="60" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <circle cx="200" cy="200" r="30" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" opacity="0.3" />
                  
                  {/* Crosshair Lines */}
                  <line x1="200" y1="20" x2="200" y2="380" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.3" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.3" />
                  
                  {/* Diagonal Lines */}
                  <line x1="73" y1="73" x2="327" y2="327" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.3" />
                  <line x1="73" y1="327" x2="327" y2="73" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.3" />

                  {/* Ticks on outer circle */}
                  {ticks}
                  
                  {/* Dots at intersections of diagonals and r=120 circle */}
                  <circle cx="115.1" cy="115.1" r="2.5" fill="var(--text-muted)" opacity="0.8" />
                  <circle cx="284.9" cy="115.1" r="2.5" fill="var(--text-muted)" opacity="0.8" />
                  <circle cx="115.1" cy="284.9" r="2.5" fill="var(--text-muted)" opacity="0.8" />
                  <circle cx="284.9" cy="284.9" r="2.5" fill="var(--text-muted)" opacity="0.8" />

                  {/* Eye Lid Curves */}
                  <path d="M 60 200 Q 200 80 340 200" stroke="var(--text-muted)" strokeWidth="1.5" fill="none" opacity="0.8" />
                  <path d="M 60 200 Q 200 320 340 200" stroke="var(--text-muted)" strokeWidth="1.5" fill="none" opacity="0.8" />
                  
                  {/* Red Pupil that tracks mouse */}
                  <circle 
                    cx={pupilPos.x} 
                    cy={pupilPos.y} 
                    r="12" 
                    fill="var(--accent)" 
                    style={{ transition: 'cx 0.1s ease-out, cy 0.1s ease-out' }}
                  />

                  {/* Labels */}
                  <text x="200" y="380" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.1em">MONITORING ACTIVE</text>
                  <text x="380" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.1em" transform="rotate(90 380 200)">ELEVATION</text>
                </svg>
              </div>
              
              {/* Right Panel: 2x2 Problem Cards Grid */}
              <div className="problem-cards">
                <div className="problem-card reveal revealed">
                  <div className="card-header">
                    <span className="card-eyebrow">DATA BIAS</span>
                    <span className="card-index font-mono">001</span>
                  </div>
                  <h3 className="card-headline">They train on mono-views.</h3>
                  <p className="card-desc">Every model reflects its provider's training alignment. Relying on a single LLM locks you into one subjective worldview.</p>
                </div>
                
                <div className="problem-card reveal revealed">
                  <div className="card-header">
                    <span className="card-eyebrow">BLACK BOX</span>
                    <span className="card-index font-mono">002</span>
                  </div>
                  <h3 className="card-headline">No trace of arguments.</h3>
                  <p className="card-desc">Standard endpoints dump a finished response. You cannot see alternate routes, rejected assertions, or logic checks.</p>
                </div>
                
                <div className="problem-card reveal revealed">
                  <div className="card-header">
                    <span className="card-eyebrow">HALLUCINATION</span>
                    <span className="card-index font-mono">003</span>
                  </div>
                  <h3 className="card-headline">Confidence without critics.</h3>
                  <p className="card-desc">A single LLM fabricates facts with total confidence. Without internal adversaries, false logs bypass system limits.</p>
                </div>
                
                <div className="problem-card reveal revealed">
                  <div className="card-header">
                    <span className="card-eyebrow">PROVIDER LOCK-IN</span>
                    <span className="card-index font-mono">004</span>
                  </div>
                  <h3 className="card-headline">Systemic blindspots.</h3>
                  <p className="card-desc">Every AI network has systematic failure modes. Relying on one model leaves you vulnerable to silent outages and failures.</p>
                </div>
              </div>
            </div>
            
            {/* Joined Section: Introducing debateX */}
            <div className="problem-body-introducing" style={{ borderTop: '0.5px solid var(--bg-border-hi)', position: 'relative', padding: '80px 0 64px' }}>
              {/* Scattered Bars Background SVG - constrained within borders and passing behind the text */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '320px', zIndex: 0, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 1100 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g fill="var(--accent)">
                    {/* Left Side Bars (using coordinates within 0 to 1100 scale) */}
                    <rect className="anim-bar-left" style={{ animationDelay: '0s', '--bar-w': 80 }} x="0" y="20" width="80" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '0.5s', '--bar-w': 100 }} x="0" y="44" width="100" height="2" />
                    <rect className="anim-bar-left" style={{ animationDelay: '1s', '--bar-w': 70 }} x="0" y="44" width="70" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '1.5s', '--bar-w': 90 }} x="0" y="68" width="90" height="2" />
                    <rect className="anim-bar-left" style={{ animationDelay: '0.2s', '--bar-w': 150 }} x="0" y="68" width="150" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '0.7s', '--bar-w': 40 }} x="0" y="92" width="40" height="2" />
                    <rect className="anim-bar-left" style={{ animationDelay: '1.2s', '--bar-w': 180 }} x="0" y="92" width="180" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '1.7s', '--bar-w': 70 }} x="0" y="92" width="70" height="2" />
                    
                    {/* Lower bars passing behind "Own the consensus." */}
                    <rect className="anim-bar-left" style={{ animationDelay: '0.4s', '--bar-w': 300 }} x="0" y="160" width="300" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '0.9s', '--bar-w': 220 }} x="0" y="190" width="220" height="2" />
                    <rect className="anim-bar-left" style={{ animationDelay: '1.4s', '--bar-w': 180 }} x="0" y="220" width="180" height="2" />

                    {/* Right Side Bars (aligned to right edge of 1100px boundary) */}
                    <rect className="anim-bar-right" style={{ animationDelay: '0.1s', '--bar-w': 70 }} x="0" y="20" width="70" height="2" />
                    <rect className="anim-bar-left" style={{ animationDelay: '0.6s', '--bar-w': 260 }} x="0" y="44" width="260" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '1.1s', '--bar-w': 110 }} x="0" y="68" width="110" height="2" />
                    <rect className="anim-bar-left" style={{ animationDelay: '1.6s', '--bar-w': 200 }} x="0" y="68" width="200" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '0.3s', '--bar-w': 90 }} x="0" y="92" width="90" height="2" />
                    <rect className="anim-bar-left" style={{ animationDelay: '0.8s', '--bar-w': 90 }} x="0" y="92" width="90" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '1.3s', '--bar-w': 60 }} x="0" y="116" width="60" height="2" />
                    
                    {/* Lower right bars passing behind the text */}
                    <rect className="anim-bar-left" style={{ animationDelay: '1.8s', '--bar-w': 180 }} x="0" y="180" width="180" height="2" />
                    <rect className="anim-bar-right" style={{ animationDelay: '0.5s', '--bar-w': 280 }} x="0" y="210" width="280" height="2" />
                  </g>
                </svg>
              </div>
              
              <div className="section-header-box reveal revealed" style={{ position: 'relative', zIndex: 1 }}>
                <div className="eyebrow-box">✓ INTRODUCING DEBATEX</div>
              </div>
              <h2 className="section-title reveal revealed" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', fontSize: '56px', letterSpacing: '-0.04em', lineHeight: '1', paddingBottom: '16px' }}>
                <span className="gradient-text-light">Eight models<span className="circle-period">.</span><br/>Own the consensus<span className="circle-period">.</span></span>
              </h2>
              <p className="section-subtext reveal revealed" style={{ position: 'relative', zIndex: 1 }}>
                A complete orchestration engine running a multi-agent dialectic entirely on your credentials. No usage limits. No lock-in.
              </p>
              
              {/* Architecture Chassis Diagram (rig.ai style) */}
              <div className="architecture-chassis reveal revealed" style={{ marginTop: '56px' }}>
                {/* Top Box: CLOUD */}
                <div className="arch-node-cloud font-mono">CLOUD PROVIDERS</div>
                
                {/* Severed Connection Line */}
                <div className="arch-connector-severed">
                  <div className="severed-line"></div>
                  <div className="severed-cross">✕</div>
                </div>
                
                {/* Local Engine Chassis (Dashed Container) */}
                <div className="arch-local-chassis">
                  <div className="chassis-tag font-mono">DEBATEX INSTANCE</div>
                  
                  <div className="local-nodes-grid">
                    {/* Left: Your Code */}
                    <div className="local-node-box">
                      <div className="box-title font-mono">YOUR QUERY</div>
                      <div className="box-subtitle font-mono">PROMPTS · SCHEMAS</div>
                    </div>
                    
                    {/* Link */}
                    <div className="node-link-line">
                      <span className="dot-green"></span>
                    </div>
                    
                    {/* Center: debateX Engine */}
                    <div className="local-node-box highlighted">
                      <div className="box-title font-mono">DEBATEX COUNCIL</div>
                      <div className="box-status font-mono">✓ ADVERSARIAL CONSENSUS</div>
                      <div className="box-footer font-mono">CHAIRMAN · PEERS · CRITICS</div>
                    </div>
                    
                    {/* Link */}
                    <div className="node-link-line">
                      <span className="dot-green"></span>
                    </div>
                    
                    {/* Right: Response */}
                    <div className="local-node-box">
                      <div className="box-title font-mono">VETTED ANSWER</div>
                      <div className="box-subtitle font-mono green">&lt;5s · BIAS-FREE</div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Severed Connection Line */}
                <div className="arch-connector-severed">
                  <div className="severed-line"></div>
                  <div className="severed-cross">✕</div>
                </div>
                
                {/* Bottom Box: TELEMETRY */}
                <div className="arch-node-cloud font-mono">TELEMETRY</div>
              </div>
            </div>

            {/* Joined Section: Value Props */}
            <div className="validated-section-joined" style={{ borderTop: '0.5px solid var(--bg-border-hi)' }}>
              <div className="grid-split-2" style={{ padding: '0 64px', gap: 0, alignItems: 'stretch', alignContent: 'stretch', margin: 0 }}>
                {/* Left: Severed Connection Graphic */}
                <div className="validated-visual reveal revealed" style={{ borderRight: '0.5px solid var(--bg-border-hi)', padding: '80px 64px 80px 0', height: '100%', minHeight: '100%', alignSelf: 'stretch', margin: 0 }}>
                  <div className="severed-graphics-chassis" style={{ width: "100%" }}>
                    <svg className="connection-svg" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="connection-svg-title">
                      <title id="connection-svg-title">System Schematic: debateX Engine bypassing single LLM provider lock-in</title>
                      <defs>
                        <style>
                          {`
                            @keyframes ripple {
                              0% { r: 10px; opacity: 0.6; }
                              100% { r: 250px; opacity: 0; }
                            }
                            @keyframes dashFlow {
                              to { stroke-dashoffset: -24; }
                            }
                            @keyframes blink {
                              0%, 100% { opacity: 1; }
                              50% { opacity: 0.4; }
                            }
                            @keyframes enginePulse {
                              0%, 100% { filter: drop-shadow(0 0 2px rgba(255,255,255,0.1)); }
                              50% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.4)); }
                            }
                            .ripple-ring {
                              animation: ripple 6s infinite linear;
                              transform-origin: 32px 120px;
                            }
                            .dash-flow {
                              animation: dashFlow 2s infinite linear;
                            }
                            .blink-slow {
                              animation: blink 3s infinite ease-in-out;
                            }
                            .blink-fast {
                              animation: blink 1.5s infinite ease-in-out;
                            }
                            .engine-glow {
                              animation: enginePulse 4s infinite ease-in-out;
                            }
                          `}
                        </style>
                      </defs>

                      {/* Vertical Dashed Line */}
                      <line x1="32" y1="0" x2="32" y2="240" stroke="var(--bg-border-hi)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" className="dash-flow" />

                      {/* Horizontal Sweeping Ellipses */}
                      <ellipse cx="150" cy="35" rx="300" ry="15" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.3" />
                      <ellipse cx="150" cy="77" rx="300" ry="15" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.3" />
                      <ellipse cx="150" cy="120" rx="300" ry="15" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.3" />
                      <ellipse cx="150" cy="163" rx="300" ry="15" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.3" />
                      <ellipse cx="150" cy="205" rx="300" ry="15" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.3" />

                      {/* Concentric Arcs originating from left node */}
                      <circle cx="32" cy="120" r="100" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.2" />
                      <circle cx="32" cy="120" r="150" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.2" />
                      <circle cx="32" cy="120" r="200" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.3" />
                      <circle cx="32" cy="120" r="250" stroke="var(--bg-border-hi)" strokeWidth="0.5" fill="none" opacity="0.2" />
                      
                      {/* Animated Ripples */}
                      <circle cx="32" cy="120" r="10" stroke="var(--accent)" strokeWidth="0.5" fill="none" className="ripple-ring" style={{animationDelay: '0s'}} />
                      <circle cx="32" cy="120" r="10" stroke="var(--accent)" strokeWidth="0.5" fill="none" className="ripple-ring" style={{animationDelay: '2s'}} />
                      <circle cx="32" cy="120" r="10" stroke="var(--accent)" strokeWidth="0.5" fill="none" className="ripple-ring" style={{animationDelay: '4s'}} />

                      {/* Dominant Dashed Arc */}
                      <circle cx="32" cy="120" r="170" stroke="var(--bg-border-hi)" strokeWidth="0.75" strokeDasharray="6 6" fill="none" opacity="0.4" className="dash-flow" />

                      {/* Scattered Grey Dots */}
                      <circle cx="20" cy="180" r="2.5" fill="var(--bg-border-hi)" opacity="0.6" className="blink-slow" />
                      <circle cx="120" cy="50" r="2.5" fill="var(--bg-border-hi)" opacity="0.6" className="blink-fast" />
                      <circle cx="160" cy="140" r="2.5" fill="var(--bg-border-hi)" opacity="0.6" className="blink-slow" style={{animationDelay: '1s'}} />

                      {/* Left Side Input Node Link (Offline Wi-Fi icon) */}
                      <circle cx="32" cy="120" r="16" fill="var(--bg-surface)" stroke="var(--bg-border-hi)" strokeWidth="0.5" />
                      <g transform="translate(32, 120)">
                        <path d="M -7.5 -1 A 9 9 0 0 1 7.5 -1" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <path d="M -4 1 A 5 5 0 0 1 4 1" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <circle cx="0" cy="5" r="1.5" fill="var(--accent)" className="blink-fast" />
                        <line x1="-8" y1="-7" x2="6" y2="7" stroke="var(--bg-surface)" strokeWidth="3" strokeLinecap="round" />
                        <line x1="-8" y1="-7" x2="6" y2="7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                      </g>

                      {/* Node Boxes */}
                      {/* Top Box (Single LLM bias) */}
                      <text x="150" y="38" className="svg-text" textAnchor="middle" fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" letterSpacing="0.05em">SINGLE LLM BIAS</text>

                      {/* Top Severed Link */}
                      <path d="M 150 50 L 150 100" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" />
                      <g>
                        <rect x="125" y="62" width="50" height="20" fill="var(--bg-base)" />
                        <text x="150" y="70" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle">✕</text>
                        <text x="150" y="80" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="6" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">SEVERED</text>
                      </g>

                      {/* Center Box (debateX Engine) */}
                      <text x="150" y="118" className="svg-text active engine-glow" textAnchor="middle" fontFamily="var(--font-ui)" fontSize="10" fill="#ffffff" fontWeight="700" letterSpacing="0.1em">DEBATEX ENGINE</text>
                      <text x="150" y="130" className="svg-text green blink-slow" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--green)" letterSpacing="0.05em">✓ CONSENSUS ACTIVE</text>

                      {/* Bottom Severed Link */}
                      <path d="M 150 140 L 150 190" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" />
                      <g>
                        <rect x="125" y="152" width="50" height="20" fill="var(--bg-base)" />
                        <text x="150" y="160" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle">✕</text>
                        <text x="150" y="170" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="6" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">SEVERED</text>
                      </g>

                      {/* Bottom Box (Hallucination bias) */}
                      <text x="150" y="208" className="svg-text" textAnchor="middle" fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" letterSpacing="0.05em">HALLUCINATIONS</text>
                    </svg>
                  </div>
                </div>
                
                {/* Right: Description */}
                <div className="validated-desc reveal revealed" style={{ padding: '80px 0 80px 64px' }}>
                  <div className="desc-badge" style={{ display: 'inline-block', border: '0.5px solid var(--bg-border-hi)', padding: '6px 10px', backgroundColor: 'var(--bg-surface)', marginBottom: '24px' }}>
                    BIAS FREE
                  </div>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>
                    <span className="gradient-text-light">Debate under pressure</span>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', marginLeft: '8px' }}></span>
                  </h2>
                  <p className="body-p">
                    debateX runs a five-stage dialectic on every query. The pipeline isolates hallucinations, corrects logical errors, and verifies numbers before compiling answers.
                  </p>
                </div>
              </div>
              
              {/* Bottom 3-cell grid */}
              <div className="validated-bottom-grid reveal revealed" style={{ borderTop: '0.5px solid var(--bg-border-hi)', paddingBottom: '64px', marginTop: 0 }}>
                <div className="val-cell">
                  <div className="val-badge font-mono" style={{ display: 'inline-block', border: '0.5px solid var(--bg-border-hi)', padding: '6px 10px', backgroundColor: 'var(--bg-surface)', color: 'var(--accent)', marginBottom: '16px' }}>ADVERSARIAL</div>
                  <h3 className="val-title">Devil's advocate scrutiny</h3>
                  <p className="val-desc">Every query faces aggressive critique. A dedicated challenger model exposes edge cases, leaks, and security flaws.</p>
                </div>
                <div className="val-cell">
                  <div className="val-badge font-mono" style={{ display: 'inline-block', border: '0.5px solid var(--bg-border-hi)', padding: '6px 10px', backgroundColor: 'var(--bg-surface)', color: 'var(--accent)', marginBottom: '16px' }}>ANONYMOUS</div>
                  <h3 className="val-title">Provider-blind ranking</h3>
                  <p className="val-desc">Models evaluate drafts anonymously. Evaluators score logic without knowing which model authored the response.</p>
                </div>
                <div className="val-cell" style={{ borderRight: 'none' }}>
                  <div className="val-badge font-mono" style={{ display: 'inline-block', border: '0.5px solid var(--bg-border-hi)', padding: '6px 10px', backgroundColor: 'var(--bg-surface)', color: 'var(--accent)', marginBottom: '16px' }}>SPEED</div>
                  <h3 className="val-title">Fast parallel routes</h3>
                  <p className="val-desc">Queries run in parallel across the council. Uses Groq's low-latency endpoints to complete debates in under 5 seconds.</p>
                </div>
              </div>
            </div>

            {/* Joined Section: Timeline (Deliberation/How It Works) */}
            <TimelineJoined />

            {/* Joined Section: Live Typewriter Terminal Simulator */}
            <TerminalSimulatorJoined />
    </>
  );
}

function CodeBackground() {
  const blocks = [
    // Row 1
    { x: 30, y: 15, w: 20, o: 0.05 },
    { x: 80, y: 15, w: 10, o: 0.03 },
    { x: 190, y: 15, w: 15, o: 0.07 },
    { x: 290, y: 15, w: 40, o: 0.04 },
    { x: 340, y: 15, w: 25, o: 0.06 },
    
    // Row 2
    { x: 100, y: 28, w: 15, o: 0.04 },
    { x: 270, y: 28, w: 30, o: 0.06 },
    { x: 310, y: 28, w: 10, o: 0.03 },
    
    // Row 3
    { x: 45, y: 41, w: 35, o: 0.05 },
    { x: 120, y: 41, w: 20, o: 0.08 },
    { x: 220, y: 41, w: 45, o: 0.05 },
    { x: 295, y: 41, w: 15, o: 0.04 },
    
    // Row 4
    { x: 180, y: 54, w: 40, o: 0.09 },
    { x: 280, y: 54, w: 30, o: 0.05 },
    { x: 325, y: 54, w: 15, o: 0.03 },
    
    // Row 5
    { x: 90, y: 67, w: 30, o: 0.06 },
    { x: 210, y: 67, w: 40, o: 0.08 },
    { x: 320, y: 67, w: 50, o: 0.05 },
    
    // Row 6
    { x: 70, y: 80, w: 20, o: 0.04 },
    { x: 160, y: 80, w: 25, o: 0.07 },
    { x: 240, y: 80, w: 15, o: 0.03 },
    
    // Row 7
    { x: 130, y: 93, w: 35, o: 0.05 },
    { x: 275, y: 93, w: 45, o: 0.09 },
    
    // Row 8
    { x: 50, y: 106, w: 15, o: 0.03 },
    { x: 110, y: 106, w: 40, o: 0.07 },
    { x: 225, y: 106, w: 20, o: 0.05 },
    { x: 300, y: 106, w: 55, o: 0.08 },
    
    // Row 9
    { x: 175, y: 119, w: 30, o: 0.06 },
    { x: 285, y: 119, w: 25, o: 0.04 },
    { x: 320, y: 119, w: 40, o: 0.05 },
    
    // Row 10
    { x: 40, y: 132, w: 20, o: 0.04 },
    { x: 95, y: 132, w: 15, o: 0.03 },
    { x: 215, y: 132, w: 50, o: 0.08 },
    
    // Row 11
    { x: 145, y: 145, w: 35, o: 0.07 },
    { x: 290, y: 145, w: 60, o: 0.05 },
    
    // Row 12
    { x: 65, y: 158, w: 35, o: 0.08 },
    { x: 165, y: 158, w: 20, o: 0.05 },
    { x: 245, y: 158, w: 50, o: 0.07 },
    { x: 340, y: 158, w: 40, o: 0.06 },
    
    // Row 13
    { x: 105, y: 171, w: 60, o: 0.09 },
    { x: 250, y: 171, w: 45, o: 0.06 },
    
    // Row 14
    { x: 35, y: 184, w: 30, o: 0.05 },
    { x: 135, y: 184, w: 50, o: 0.08 },
    { x: 215, y: 184, w: 25, o: 0.04 },
    { x: 305, y: 184, w: 70, o: 0.07 },
    
    // Row 15
    { x: 80, y: 197, w: 45, o: 0.06 },
    { x: 190, y: 197, w: 35, o: 0.05 },
    { x: 280, y: 197, w: 50, o: 0.08 },
    
    // Row 16
    { x: 55, y: 210, w: 20, o: 0.04 },
    { x: 140, y: 210, w: 40, o: 0.07 },
    { x: 260, y: 210, w: 30, o: 0.05 },
    { x: 330, y: 210, w: 45, o: 0.06 },
    
    // Row 17
    { x: 115, y: 223, w: 55, o: 0.08 },
    { x: 220, y: 223, w: 25, o: 0.04 },
    { x: 295, y: 223, w: 65, o: 0.07 },
    
    // Row 18
    { x: 45, y: 236, w: 30, o: 0.05 },
    { x: 165, y: 236, w: 50, o: 0.09 },
    { x: 255, y: 236, w: 35, o: 0.06 },
    
    // Row 19
    { x: 90, y: 249, w: 40, o: 0.07 },
    { x: 210, y: 249, w: 60, o: 0.08 },
    { x: 315, y: 249, w: 40, o: 0.05 },
    
    // Row 20
    { x: 60, y: 262, w: 25, o: 0.04 },
    { x: 135, y: 262, w: 45, o: 0.06 },
    { x: 275, y: 262, w: 55, o: 0.08 },
    
    // Row 21
    { x: 100, y: 275, w: 50, o: 0.09 },
    { x: 230, y: 275, w: 30, o: 0.05 },
    { x: 305, y: 275, w: 65, o: 0.07 },
    
    // Row 22
    { x: 50, y: 288, w: 35, o: 0.06 },
    { x: 160, y: 288, w: 55, o: 0.08 },
    { x: 265, y: 288, w: 40, o: 0.05 },
    
    // Row 23
    { x: 110, y: 301, w: 45, o: 0.07 },
    { x: 215, y: 301, w: 30, o: 0.04 },
    { x: 300, y: 301, w: 80, o: 0.08 },
    
    // Row 24
    { x: 75, y: 314, w: 30, o: 0.05 },
    { x: 175, y: 314, w: 65, o: 0.09 },
    { x: 285, y: 314, w: 40, o: 0.06 },
    
    // Row 25
    { x: 125, y: 327, w: 50, o: 0.08 },
    { x: 245, y: 327, w: 35, o: 0.05 },
    { x: 310, y: 327, w: 60, o: 0.07 },
    
    // Row 26
    { x: 45, y: 340, w: 25, o: 0.04 },
    { x: 140, y: 340, w: 55, o: 0.07 },
    { x: 260, y: 340, w: 40, o: 0.06 },
    
    // Row 27
    { x: 95, y: 353, w: 60, o: 0.08 },
    { x: 215, y: 353, w: 30, o: 0.05 },
    { x: 290, y: 353, w: 75, o: 0.09 },
    
    // Row 28
    { x: 65, y: 366, w: 35, o: 0.06 },
    { x: 170, y: 366, w: 50, o: 0.07 },
    { x: 275, y: 366, w: 40, o: 0.05 }
  ];

  return (
    <div className="slide-bg-wrap">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <pattern id="slide-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke="var(--bg-border-hi)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="var(--bg-border-hi)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#slide-grid)" />
        <g fill="var(--text-muted)">
          {blocks.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height="6" rx="1.5" opacity={b.o} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function TimelineJoined() {
  const [activeStep, setActiveStep] = useState("s1");
  const stepRefs = {
    s1: useRef(null),
    s2: useRef(null),
    s3: useRef(null),
  };

  useEffect(() => {
    const stepIds = ["s1", "s2", "s3"];
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
    stepRefs[stepId].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const stageVisuals = {
    s1: (
      <div className="stage-slide active">
        <CodeBackground />
        <div className="stage-card rig-stage-card">
          <div className="stage-card-title font-mono" style={{ letterSpacing: '0.15em', fontWeight: 'bold' }}>ROUTING EFFICIENCY</div>
          
          <div style={{ marginBottom: '24px' }}>
            <div className="font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Classification accuracy</div>
            <div className="card-metrics-group" style={{ gap: '12px', marginBottom: '16px' }}>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-primary)', fontSize: '11px' }}>debateX Router</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill green" style={{ width: '98%', height: '100%' }}></div>
                </div>
                <span className="metric-value green font-mono" style={{ color: 'var(--green)', fontSize: '11px', textAlign: 'right' }}>98%</span>
              </div>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Static Keyword</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill grey" style={{ width: '62%', height: '100%', opacity: 0.4 }}></div>
                </div>
                <span className="metric-value grey font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'right' }}>62%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Route resolution latency</div>
            <div className="card-metrics-group" style={{ gap: '12px' }}>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-primary)', fontSize: '11px' }}>Fast LLM Path</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill green" style={{ width: '15%', height: '100%' }}></div>
                </div>
                <span className="metric-value green font-mono" style={{ color: 'var(--green)', fontSize: '11px', textAlign: 'right' }}>120 ms</span>
              </div>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Deep Analysis</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill grey" style={{ width: '85%', height: '100%', opacity: 0.4 }}></div>
                </div>
                <span className="metric-value grey font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'right' }}>850 ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    s2: (
      <div className="stage-slide active">
        <CodeBackground />
        <div className="stage-card rig-stage-card">
          <div className="stage-card-title font-mono" style={{ letterSpacing: '0.15em', fontWeight: 'bold' }}>DELIBERATION QUALITY</div>
          
          <div style={{ marginBottom: '24px' }}>
            <div className="font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider bias rate</div>
            <div className="card-metrics-group" style={{ gap: '12px', marginBottom: '16px' }}>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-primary)', fontSize: '11px' }}>debateX (Blind)</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill green" style={{ width: '8%', height: '100%' }}></div>
                </div>
                <span className="metric-value green font-mono" style={{ color: 'var(--green)', fontSize: '11px', textAlign: 'right' }}>&lt; 2%</span>
              </div>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Standard Chat</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill grey" style={{ width: '74%', height: '100%', opacity: 0.4 }}></div>
                </div>
                <span className="metric-value grey font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'right' }}>24%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logical error detection</div>
            <div className="card-metrics-group" style={{ gap: '12px' }}>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-primary)', fontSize: '11px' }}>Peer Critique</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill green" style={{ width: '92%', height: '100%' }}></div>
                </div>
                <span className="metric-value green font-mono" style={{ color: 'var(--green)', fontSize: '11px', textAlign: 'right' }}>92%</span>
              </div>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Single Model</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill grey" style={{ width: '54%', height: '100%', opacity: 0.4 }}></div>
                </div>
                <span className="metric-value grey font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'right' }}>54%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    s3: (
      <div className="stage-slide active">
        <CodeBackground />
        <div className="stage-card rig-stage-card">
          <div className="stage-card-title font-mono" style={{ letterSpacing: '0.15em', fontWeight: 'bold' }}>CONSENSUS RELIABILITY</div>
          
          <div style={{ marginBottom: '24px' }}>
            <div className="font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hallucination rate</div>
            <div className="card-metrics-group" style={{ gap: '12px', marginBottom: '16px' }}>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-primary)', fontSize: '11px' }}>debateX Vetted</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill green" style={{ width: '6%', height: '100%' }}></div>
                </div>
                <span className="metric-value green font-mono" style={{ color: 'var(--green)', fontSize: '11px', textAlign: 'right' }}>&lt; 1.5%</span>
              </div>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Single LLM</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill grey" style={{ width: '51%', height: '100%', opacity: 0.4 }}></div>
                </div>
                <span className="metric-value grey font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'right' }}>12.8%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logical consistency score</div>
            <div className="card-metrics-group" style={{ gap: '12px' }}>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-primary)', fontSize: '11px' }}>debateX Council</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill green" style={{ width: '96%', height: '100%' }}></div>
                </div>
                <span className="metric-value green font-mono" style={{ color: 'var(--green)', fontSize: '11px', textAlign: 'right' }}>96/100</span>
              </div>
              <div className="metric-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                <span className="metric-label font-mono" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Average Draft</span>
                <div className="metric-bar-track" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }}>
                  <div className="metric-bar-fill grey" style={{ width: '78%', height: '100%', opacity: 0.4 }}></div>
                </div>
                <span className="metric-value grey font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'right' }}>78/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };


  return (
    <div className="how-it-works-section-joined" id="how-it-works" style={{ padding: '80px 0 64px' }}>
      <div className="section-header-box reveal revealed">
        <div className="eyebrow-box">✓ HOW IT WORKS</div>
      </div>
      <h2 className="section-title reveal revealed"><span className="gradient-text-light">Deliberation beats scale.</span></h2>
      <p className="section-subtext reveal revealed" style={{ marginBottom: '56px' }}>debateX is a modular council—model, context, and roles engineered for verified accuracy.</p>
      
      <div className="timeline-split-layout" style={{ padding: '0 64px' }}>
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
            <h3 className="step-heading">Classify and route queries dynamically.</h3>
            <div className="step-description">
              <p style={{ marginBottom: '16px' }}>
                Every incoming query is analyzed for intent. debateX routes requests to specialized LLM councils (code, math, ethics, factual, creative) to optimize accuracy and cost.
              </p>
              <p style={{ margin: 0 }}>
                By mapping workloads to the ideal models, we bypass generic provider biases and ensure domain-specific expertise handles your query.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div
            ref={stepRefs.s2}
            className={`step-card reveal revealed ${activeStep === "s2" ? "active" : ""}`}
            onClick={() => handleStepClick("s2")}
            data-step="s2"
          >
            <span className="step-label font-mono">STEP 02</span>
            <h3 className="step-heading">Cross-examine responses anonymously.</h3>
            <div className="step-description">
              <p style={{ marginBottom: '16px' }}>
                Initial drafts are anonymized as Response A, B, and C. Models grade peer outputs without provider-name bias, forcing objective critiques and stance revisions.
              </p>
              <p style={{ margin: 0 }}>
                Models must defend their logic or revise their answers under peer review, eliminating blind spots and correcting errors early in the run.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div
            ref={stepRefs.s3}
            className={`step-card reveal revealed ${activeStep === "s3" ? "active" : ""}`}
            onClick={() => handleStepClick("s3")}
            data-step="s3"
          >
            <span className="step-label font-mono">STEP 03</span>
            <h3 className="step-heading">Stress-test answers before final consensus.</h3>
            <div className="step-description">
              <p style={{ marginBottom: '16px' }}>
                A designated challenger model aggressively targets the leading response for edge cases and logic errors. The Chairman weighs all arguments to output the final vetted consensus.
              </p>
              <p style={{ margin: 0 }}>
                This multi-agent dialectic resolves conflicting points, filters out hallucinations, and guarantees a high-confidence, verified solution.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right: Visual Panel Container */}
        <div className="timeline-visual-col reveal revealed">
          {stageVisuals[activeStep]}
        </div>
      </div>
    </div>
  );
}

const debateSequences = [
  {
    query: "Implement a thread-safe caching system in Python.",
    category: "technical/code",
    cost: "$0.0034",
    council: [
      "Chairman: groq/llama-3.3-70b-versatile",
      "Devil's Advocate: groq/openai/gpt-oss-120b",
      "Reasoner: groq/qwen/qwen3-32b",
      "Fact-Checker: groq/llama-3.1-8b-instant"
    ],
    stream: [
      { text: "debateX · council active", type: "bold" },
      { text: "> query: \"Implement a thread-safe caching system in Python.\"", type: "normal" },
      { text: "> router: technical/code resolved", type: "accent" },
      { text: "> models assigned: 4 · roles: 4 · predicted cost: $0.0034", type: "normal" },
      { text: "--------------------------------------------------------", type: "muted" },
      { text: "[ R1 ] groq/llama-3.3-70b-versatile responding...   ✓ (1.1s)", type: "green" },
      { text: "[ R1 ] groq/openai/gpt-oss-120b responding...    ✓ (0.7s)", type: "green" },
      { text: "[ R1 ] groq/qwen/qwen3-32b responding...         ✓ (1.4s)", type: "green" },
      { text: "[ R2 ] peer review · anonymizing Response A, B, C...", type: "normal" },
      { text: "[ R2 ] model evaluations complete. parsing rankings...", type: "normal" },
      { text: "       1. Response B (gpt-oss-120b)  - Avg Rank: 1.33", type: "accent" },
      { text: "       2. Response A (llama-3.3-70b) - Avg Rank: 1.67", type: "accent" },
      { text: "       3. Response C (qwen3-32b)     - Avg Rank: 3.00", type: "accent" },
      { text: "[ R3 ] debate initiated: revise or defend.", type: "normal" },
      { text: "       - Response B (gpt-oss-120b) DECISION: DEFEND", type: "bold" },
      { text: "         \"Lock primitives are logically complete and correct.\"", type: "muted" },
      { text: "       - Response A (llama-3.3-70b) DECISION: REVISE", type: "bold" },
      { text: "         \"Updating block: implementing reentrant lock bounds...\"", type: "muted" },
      { text: "[ R4 ] CHALLENGER critique assigned to groq/qwen/qwen3-32b.", type: "normal" },
      { text: "       - Target: Leading Response A (llama-3.3-70b)", type: "normal" },
      { text: "       - CRITIQUE: \"Memory leaks exposed on thread teardown block.\"", type: "red" },
      { text: "[ R5 ] CHAIRMAN synthesis by groq/llama-3.3-70b-versatile...", type: "normal" },
      { text: "       - Resolving teardown race conditions...", type: "normal" },
      { text: "       - Structuring final consensus package...", type: "normal" },
      { text: "✓ Consensus achieved · 5 rounds · Latency: 4.6s · cost: $0.0039", type: "green" }
    ]
  },
  {
    query: "Explain the ethics of self-driving cars in crash dilemmas.",
    category: "ethical/philosophical",
    cost: "$0.0019",
    council: [
      "Chairman: groq/llama-3.3-70b-versatile",
      "Devil's Advocate: deepseek/deepseek-v4-flash:free",
      "Reasoner: z-ai/glm-4.5-air:free"
    ],
    stream: [
      { text: "debateX · council active", type: "bold" },
      { text: "> query: \"Explain the ethics of self-driving cars in crash dilemmas.\"", type: "normal" },
      { text: "> router: ethical/philosophical resolved", type: "accent" },
      { text: "> models assigned: 3 · roles: 3 · predicted cost: $0.0019", type: "normal" },
      { text: "--------------------------------------------------------", type: "muted" },
      { text: "[ R1 ] groq/llama-3.3-70b-versatile responding...   ✓ (0.9s)", type: "green" },
      { text: "[ R1 ] deepseek/deepseek-v4-flash responding...    ✓ (0.5s)", type: "green" },
      { text: "[ R1 ] z-ai/glm-4.5-air responding...              ✓ (1.1s)", type: "green" },
      { text: "[ R2 ] peer review · anonymizing Response A, B, C...", type: "normal" },
      { text: "[ R2 ] parsing aggregate rankings...", type: "normal" },
      { text: "       1. Response A (llama-3.3-70b) - Avg Rank: 1.00", type: "accent" },
      { text: "       2. Response C (glm-4.5-air)   - Avg Rank: 2.00", type: "accent" },
      { text: "       3. Response B (deepseek-v4)   - Avg Rank: 3.00", type: "accent" },
      { text: "[ R3 ] debate: revise or defend.", type: "normal" },
      { text: "       - Response C (glm-4.5-air) DECISION: REVISE", type: "bold" },
      { text: "         \"Incorporating rule deontology to balance utilitarianism...\"", type: "muted" },
      { text: "       - Response A (llama-3.3-70b) DECISION: DEFEND", type: "bold" },
      { text: "         \"Evidential scenarios prove utilitarian bounds are optimal.\"", type: "muted" },
      { text: "[ R4 ] CHALLENGER critique assigned to deepseek/deepseek-v4-flash.", type: "normal" },
      { text: "       - Target: Leading Response A (llama-3.3-70b)", type: "normal" },
      { text: "       - CRITIQUE: \"Assumes universal moral consensus on value scales.\"", type: "red" },
      { text: "[ R5 ] CHAIRMAN synthesis by groq/llama-3.3-70b-versatile...", type: "normal" },
      { text: "       - Moderating moral values scale...", type: "normal" },
      { text: "       - Outputting ethical frameworks consensus...", type: "normal" },
      { text: "✓ Consensus achieved · 5 rounds · Latency: 3.8s · cost: $0.0022", type: "green" }
    ]
  }
];

function TerminalSimulatorJoined() {
  const [visibleLines, setVisibleLines] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    let currentSeqIdx = 0;
    let currentLineIdx = 0;

    const runTypewriter = () => {
      const sequence = debateSequences[currentSeqIdx];
      
      const writeNextLine = () => {
        if (currentLineIdx >= sequence.stream.length) {
          timeoutId = setTimeout(() => {
            currentSeqIdx = (currentSeqIdx + 1) % debateSequences.length;
            currentLineIdx = 0;
            setVisibleLines([]);
            runTypewriter();
          }, 5000);
          return;
        }

        const line = sequence.stream[currentLineIdx];
        setVisibleLines((prev) => [...prev, line]);
        
        currentLineIdx++;

        let nextDelay = 350;
        if (line.text.includes("responding...")) nextDelay = 700;
        if (line.text.includes("Consensus achieved")) nextDelay = 1200;

        timeoutId = setTimeout(writeNextLine, nextDelay);
      };

      timeoutId = setTimeout(writeNextLine, 200);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      runTypewriter();
    } else {
      setVisibleLines([
        { text: "debateX · static render active", type: "bold" },
        { text: "> query: \"Implement a thread-safe caching system in Python.\"", type: "normal" },
        { text: "> router: technical/code resolved", type: "accent" },
        { text: "✓ Consensus achieved · 5 rounds · Latency: 4.6s · cost: $0.0039", type: "green" }
      ]);
    }

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="terminal-section-joined" style={{ borderTop: '0.5px solid var(--bg-border-hi)', padding: '80px 0 64px' }}>
      <div className="section-header-box reveal revealed">
        <div className="eyebrow-box">✓ LIVE OUTPUT STREAM</div>
      </div>
      <h2 className="section-title reveal revealed"><span className="gradient-text-light">Watch the council debate.</span></h2>
      
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
        <div className="terminal-chassis reveal revealed">
          <div className="terminal-chrome">
            <span className="chrome-dot red"></span>
            <span className="chrome-dot yellow"></span>
            <span className="chrome-dot green"></span>
            <span className="chrome-title">debateX · localhost:8001</span>
          </div>
          <div ref={terminalRef} className="terminal-body font-mono">
            {visibleLines.map((line, idx) => (
              <div key={idx} className="terminal-line">
                <span className={line.type}>{line.text}</span>
              </div>
            ))}
            <span className="terminal-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
