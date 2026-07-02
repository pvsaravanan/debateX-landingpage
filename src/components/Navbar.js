"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <img src="/debateX.svg" alt="debateX logo" style={{ height: "24px", width: "auto" }} />
        </a>
        <nav className="nav-links">
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#capabilities" className="nav-link">Capabilities</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="https://github.com/pvsaravanan/debateX" target="_blank" rel="noopener noreferrer" className="nav-link github-link">
            GitHub
            <svg className="icon-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="img">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </nav>
        <a href="#waitlist-section" className="nav-cta">Get Early Access</a>
      </div>
    </header>
  );
}
