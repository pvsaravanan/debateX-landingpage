export default function IntroducingSection() {
  return (
    <section className="reveal-section" id="reveal" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Scattered Bars Background SVG */}
      <div style={{ position: 'absolute', top: 60, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
        <svg width="100%" height="400" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
          <g fill="var(--accent)">
            {/* Left Side Bars */}
            <rect className="anim-bar-left" style={{ animationDelay: '0s' }} x="220" y="20" width="80" height="8" />
            
            <rect className="anim-bar-right" style={{ animationDelay: '0.5s' }} x="180" y="44" width="100" height="8" />
            <rect className="anim-bar-left" style={{ animationDelay: '1s' }} x="290" y="44" width="70" height="8" />
            
            <rect className="anim-bar-right" style={{ animationDelay: '1.5s' }} x="130" y="68" width="90" height="8" />
            <rect className="anim-bar-left" style={{ animationDelay: '0.2s' }} x="230" y="68" width="150" height="8" />
            
            <rect className="anim-bar-right" style={{ animationDelay: '0.7s' }} x="40" y="92" width="40" height="8" />
            <rect className="anim-bar-left" style={{ animationDelay: '1.2s' }} x="90" y="92" width="180" height="8" />
            <rect className="anim-bar-right" style={{ animationDelay: '1.7s' }} x="290" y="92" width="70" height="8" />

            <rect className="anim-bar-left" style={{ animationDelay: '0.4s' }} x="100" y="250" width="80" height="8" />
            <rect className="anim-bar-right" style={{ animationDelay: '0.9s' }} x="50" y="280" width="40" height="8" />
            <rect className="anim-bar-left" style={{ animationDelay: '1.4s' }} x="300" y="280" width="70" height="8" />

            {/* Right Side Bars */}
            <rect className="anim-bar-right" style={{ animationDelay: '0.1s' }} x="1140" y="20" width="70" height="8" />
            
            <rect className="anim-bar-left" style={{ animationDelay: '0.6s' }} x="1080" y="44" width="260" height="8" />
            
            <rect className="anim-bar-right" style={{ animationDelay: '1.1s' }} x="1050" y="68" width="110" height="8" />
            <rect className="anim-bar-left" style={{ animationDelay: '1.6s' }} x="1180" y="68" width="200" height="8" />
            
            <rect className="anim-bar-right" style={{ animationDelay: '0.3s' }} x="1080" y="92" width="90" height="8" />
            <rect className="anim-bar-left" style={{ animationDelay: '0.8s' }} x="1250" y="92" width="90" height="8" />
            
            <rect className="anim-bar-right" style={{ animationDelay: '1.3s' }} x="1080" y="116" width="60" height="8" />
            
            <rect className="anim-bar-left" style={{ animationDelay: '1.8s' }} x="1120" y="240" width="50" height="8" />
            <rect className="anim-bar-right" style={{ animationDelay: '0.5s' }} x="1230" y="260" width="210" height="8" />
          </g>
        </svg>
      </div>

      <div className="container-1100" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-box reveal revealed">
          <div className="eyebrow-box">✓ INTRODUCING DEBATEX</div>
        </div>
        <h2 className="section-title reveal revealed" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '56px', letterSpacing: '-0.04em', lineHeight: '1', paddingBottom: '16px' }}>
          Eight models.<br/>Own the consensus.
        </h2>
        <p className="section-subtext reveal revealed">
          A complete orchestration engine running a multi-agent dialectic entirely on your credentials. No usage limits. No lock-in.
        </p>
        
        {/* Architecture Chassis Diagram (rig.ai style) */}
        <div className="architecture-chassis reveal revealed">
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
    </section>
  );
}
