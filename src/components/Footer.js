export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <img src="/debateX.svg" alt="debateX logo" style={{ height: "32px", width: "auto" }} />
          </a>
          <p className="footer-tagline">Multi-LLM deliberation engine. Council-vetted answers.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <a href="https://github.com/pvsaravanan/debateX" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://x.com/saravananpv3010" target="_blank" rel="noopener noreferrer">Twitter/X</a>
            <a href="https://www.linkedin.com/in/musfiramahjabeenm" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span className="copyright">&copy; 2026 debateX — MIT License</span>
        <div className="status-pill">
          <span className="status-dot"></span>
          <span className="status-text font-mono">All systems deliberating</span>
        </div>
      </div>
    </footer>
  );
}
