import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import IntroducingSection from "@/components/IntroducingSection";
import ValueProps from "@/components/ValueProps";
import Timeline from "@/components/Timeline";
import TerminalSimulator from "@/components/TerminalSimulator";
import WaitlistCTA from "@/components/WaitlistCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <Hero />

        {/* Tension / Problem Section */}
        <ProblemSection />

        {/* Product Reveal Architecture Section */}
        <IntroducingSection />

        {/* Value Proposition Section */}
        <ValueProps />

        {/* Timeline / Walkthrough Step Panels */}
        <Timeline />

        {/* Stats Strip */}
        <section className="stats-strip">
          <div className="stats-container">
            <div className="stat-item reveal revealed">
              <span className="stat-number">5</span>
              <span className="stat-label">Deliberation Rounds</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item reveal revealed">
              <span className="stat-number">8</span>
              <span className="stat-label">LLMs in Council</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item reveal revealed">
              <span className="stat-number">4</span>
              <span className="stat-label">Cognitive Roles</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item reveal revealed">
              <span className="stat-number">&lt;$0.01</span>
              <span className="stat-label">Avg Cost Per Query</span>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="capabilities-section" id="capabilities">
          <div className="container-1100">
            <div className="section-header-box reveal revealed">
              <div className="eyebrow-box">✓ CAPABILITIES</div>
            </div>
            <h2 className="section-title reveal revealed">Engineered for truth.</h2>
            
            <div className="capabilities-grid">
              <div className="cap-cell reveal revealed">
                <div className="cap-num">[ 01 ]</div>
                <h3 className="cap-title">Query classification</h3>
                <p className="cap-body">Fast dual-path routing maps incoming queries to categories (code, factual, ethical, math, creative) for targeted model selection.</p>
              </div>
              <div className="cap-cell reveal revealed">
                <div className="cap-num">[ 02 ]</div>
                <h3 className="cap-title">Dynamic persona allocation</h3>
                <p className="cap-body">Rotates specialized system personas (Reasoner, Fact-Checker, Steelmanner, Devil's Advocate, Chairman) deterministically per query.</p>
              </div>
              <div className="cap-cell reveal revealed">
                <div className="cap-num">[ 03 ]</div>
                <h3 className="cap-title">Anonymized peer review</h3>
                <p className="cap-body">Forces council models to review peer arguments without provider name bias, exposing logical flaws without favoritism.</p>
              </div>
              <div className="cap-cell reveal revealed">
                <div className="cap-num">[ 04 ]</div>
                <h3 className="cap-title">Challenger critique</h3>
                <p className="cap-body">Assigns a dedicated adversary model to identify vulnerabilities and edge cases in the leading answers before synthesis.</p>
              </div>
              <div className="cap-cell reveal revealed">
                <div className="cap-num">[ 05 ]</div>
                <h3 className="cap-title">Real-time SSE stream</h3>
                <p className="cap-body">Watch deliberations unfold live. Complete transparency with stages, individual rankings, and critique streams directly in the UI.</p>
              </div>
              <div className="cap-cell reveal revealed">
                <div className="cap-num">[ 06 ]</div>
                <h3 className="cap-title">Cost estimation</h3>
                <p className="cap-body">Calculates token-based projected cost in USD per query using active API pricing tables before initiating the council.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Typewriter Terminal Simulator */}
        <TerminalSimulator />

        {/* Email Waitlist Signup */}
        <WaitlistCTA />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}
