import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import WaitlistCTA from "@/components/WaitlistCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import AnimatedStats from "@/components/AnimatedStats";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <Hero />

        <section className="problem-section" id="problem" style={{ paddingTop: '64px', paddingBottom: '24px', marginBottom: '56px' }}>
          <div className="container-1100">
            <div className="problem-box">
              <div className="problem-box-inner">
                <ProblemSection />

                {/* Animated Stats Strip */}
                <AnimatedStats />

                {/* Capabilities Grid */}
                <section className="capabilities-section" id="capabilities" style={{ borderTop: '0.5px solid var(--bg-border-hi)', padding: '80px 0 64px', position: 'relative' }}>
                  <div className="section-header-box reveal revealed">
                    <div className="eyebrow-box">✓ CAPABILITIES</div>
                  </div>
                  <h2 className="section-title reveal revealed"><span className="gradient-text-light">Engineered for truth.</span></h2>
                  
                  <div className="capabilities-grid">
                    <div className="cap-cell reveal revealed reveal-stagger-1">
                      <div className="cap-num">[ 01 ]</div>
                      <h3 className="cap-title">Query classification</h3>
                      <p className="cap-body">Fast dual-path routing maps incoming queries to categories (code, factual, ethical, math, creative) for targeted model selection.</p>
                    </div>
                    <div className="cap-cell reveal revealed reveal-stagger-2">
                      <div className="cap-num">[ 02 ]</div>
                      <h3 className="cap-title">Dynamic persona allocation</h3>
                      <p className="cap-body">Rotates specialized system personas (Reasoner, Fact-Checker, Steelmanner, Devil's Advocate, Chairman) deterministically per query.</p>
                    </div>
                    <div className="cap-cell reveal revealed reveal-stagger-3">
                      <div className="cap-num">[ 03 ]</div>
                      <h3 className="cap-title">Anonymized peer review</h3>
                      <p className="cap-body">Forces council models to review peer arguments without provider name bias, exposing logical flaws without favoritism.</p>
                    </div>
                    <div className="cap-cell reveal revealed reveal-stagger-4">
                      <div className="cap-num">[ 04 ]</div>
                      <h3 className="cap-title">Challenger critique</h3>
                      <p className="cap-body">Assigns a dedicated adversary model to identify vulnerabilities and edge cases in the leading answers before synthesis.</p>
                    </div>
                    <div className="cap-cell reveal revealed reveal-stagger-5">
                      <div className="cap-num">[ 05 ]</div>
                      <h3 className="cap-title">Real-time SSE stream</h3>
                      <p className="cap-body">Watch deliberations unfold live. Complete transparency with stages, individual rankings, and critique streams directly in the UI.</p>
                    </div>
                    <div className="cap-cell reveal revealed reveal-stagger-6">
                      <div className="cap-num">[ 06 ]</div>
                      <h3 className="cap-title">Cost estimation</h3>
                      <p className="cap-body">Calculates token-based projected cost in USD per query using active API pricing tables before initiating the council.</p>
                    </div>
                  </div>
                </section>

                {/* Email Waitlist Signup */}
                <WaitlistCTA />

                {/* FAQ Accordion */}
                <FAQSection />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
