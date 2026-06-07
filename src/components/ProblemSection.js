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
    const x1 = 200 + 150 * Math.cos(angle);
    const y1 = 200 + 150 * Math.sin(angle);
    const x2 = 200 + 160 * Math.cos(angle);
    const y2 = 200 + 160 * Math.sin(angle);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-muted)" strokeWidth="1" opacity="0.5" />;
  });

  return (
    <section className="problem-section" id="problem">
      <div className="container-1100">
        
        <div className="problem-box">
          <div className="problem-box-inner">
            {/* Header Area */}
            <div className="problem-header">
              <div className="problem-eyebrow-box">
                <span className="eyebrow-icon">X</span>
                <span className="eyebrow-text">THE PROBLEM</span>
              </div>
              <h2 className="problem-title reveal revealed">
                You're trusting one model.<br />
                And you're being misled.
              </h2>
            </div>

            {/* Body Area */}
            <div className="problem-body">
              {/* Left Panel: Radar SVG */}
              <div className="problem-radar-panel reveal revealed">
                <svg ref={svgRef} className="radar-svg" viewBox="30 30 340 340" xmlns="http://www.w3.org/2000/svg">
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
          </div>
        </div>
        
      </div>
    </section>
  );
}
