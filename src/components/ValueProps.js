export default function ValueProps() {
  return (
    <section className="validated-section">
      <div className="container-1100">
        <div className="grid-split-2">
          {/* Left: Severed Connection Graphic */}
          <div className="validated-visual reveal revealed">
            <div className="severed-graphics-chassis" style={{ width: "100%" }}>
              <svg className="connection-svg" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
                {/* Concentric Background Orbits */}
                <circle cx="150" cy="120" r="100" stroke="var(--bg-border-hi)" strokeWidth="0.5" strokeDasharray="2 4" fill="none" opacity="0.3" />
                <circle cx="150" cy="120" r="80" stroke="var(--bg-border-hi)" strokeWidth="0.5" strokeDasharray="2 4" fill="none" opacity="0.4" />
                <circle cx="150" cy="120" r="60" stroke="var(--bg-border-hi)" strokeWidth="0.5" strokeDasharray="2 4" fill="none" opacity="0.2" />

                {/* Left Side Input Node Link (GPU/Client connection) */}
                <rect x="15" y="103" width="34" height="34" rx="0" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="0.5" />
                <circle cx="32" cy="120" r="3" fill="var(--accent)" />
                <line x1="49" y1="120" x2="70" y2="120" stroke="var(--green)" strokeWidth="1" />
                <rect x="58" y="118.5" width="3" height="3" fill="var(--green)" />

                {/* Node Boxes */}
                {/* Top Box (Single LLM bias) */}
                <rect x="70" y="20" width="160" height="34" rx="0" fill="var(--bg-surface)" stroke="var(--bg-border-hi)" strokeWidth="0.5" />
                <text x="150" y="41" className="svg-text" textAnchor="middle" fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="9">SINGLE LLM BIAS</text>

                {/* Top Severed Link */}
                <path d="M 150 54 L 150 100" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="110" y="68" width="80" height="18" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="0.3" opacity="0.8" rx="0" />
                <text x="150" y="79" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" textAnchor="middle">✕ SEVERED</text>

                {/* Center Box (debateX Engine) */}
                <rect x="70" y="100" width="160" height="40" rx="0" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="0.5" />
                <text x="150" y="118" className="svg-text active" textAnchor="middle" fontFamily="var(--font-ui)" fontSize="10" fill="var(--text-primary)" fontWeight="700">DEBATEX ENGINE</text>
                <text x="150" y="130" className="svg-text green" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--text-secondary)">✓ CONSENSUS ACTIVE</text>

                {/* Bottom Severed Link */}
                <path d="M 150 140 L 150 186" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="110" y="154" width="80" height="18" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="0.3" opacity="0.8" rx="0" />
                <text x="150" y="165" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" textAnchor="middle">✕ SEVERED</text>

                {/* Bottom Box (Hallucination bias) */}
                <rect x="70" y="186" width="160" height="34" rx="0" fill="var(--bg-surface)" stroke="var(--bg-border-hi)" strokeWidth="0.5" />
                <text x="150" y="207" className="svg-text" textAnchor="middle" fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="9">HALLUCINATIONS</text>
              </svg>
            </div>
          </div>
          
          {/* Right: Description */}
          <div className="validated-desc reveal revealed">
            <div className="desc-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0C2.23858 0 0 2.23858 0 5C0 8.75 5 12 5 12C5 12 10 8.75 10 5C10 2.23858 7.76142 0 5 0Z" fill="#3B82F6"/>
              </svg>
              BIAS FREE
            </div>
            <h2 className="section-title">Debate under pressure.</h2>
            <p className="body-p">
              debateX runs a five-stage dialectic on every query. The pipeline isolates hallucinations, corrects logical errors, and verifies numbers before compiling answers.
            </p>
          </div>
        </div>
        
        {/* Bottom 3-cell grid */}
        <div className="validated-bottom-grid reveal revealed">
          <div className="val-cell">
            <div className="val-badge font-mono">[ ADVERSARIAL ]</div>
            <h3 className="val-title">Devil's advocate scrutiny</h3>
            <p className="val-desc">Every query faces aggressive critique. A dedicated challenger model exposes edge cases, leaks, and security flaws.</p>
          </div>
          <div className="val-cell">
            <div className="val-badge font-mono">[ ANONYMOUS ]</div>
            <h3 className="val-title">Provider-blind ranking</h3>
            <p className="val-desc">Models evaluate drafts anonymously. Evaluators score logic without knowing which model authored the response.</p>
          </div>
          <div className="val-cell">
            <div className="val-badge font-mono">[ SPEED ]</div>
            <h3 className="val-title">Fast parallel routes</h3>
            <p className="val-desc">Queries run in parallel across the council. Uses Groq's low-latency endpoints to complete debates in under 5 seconds.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
