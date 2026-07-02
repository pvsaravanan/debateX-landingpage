"use client";

import { useState, useRef } from "react";

const faqData = [
  {
    num: "01",
    question: "What is debateX?",
    answer: "debateX is a self-hosted deliberation engine that orchestrates a panel of Large Language Models to answer questions. It reduces bias and error rates by passing draft answers through review, challenge, and synthesis phases before presenting a final consensus response."
  },
  {
    num: "02",
    question: "Which models are in the council?",
    answer: "debateX integrates high-performance models from both Groq (Llama-3.3-70B, GPT-OSS-120B, Qwen3-32B, Llama-3.1-8B) and OpenRouter (DeepSeek-V4, GLM-4.5, LFM-2.5, Nemotron-3-nano) depending on API key configuration and query classification."
  },
  {
    num: "03",
    question: "How does the 5-round pipeline work?",
    answer: "It processes queries through five distinct stages: (1) Respond - council models submit independent answers; (2) Rank - models evaluate anonymized drafts; (3) Debate - models revise or defend their stances under peer review; (4) Critique - a challenger model points out remaining flaws; (5) Synthesis - a chairman model compiles a final consensus answer."
  },
  {
    num: "04",
    question: "Is it free to use?",
    answer: "debateX itself is entirely open-source and free to self-host. You only pay for your model token consumption through your personal Groq or OpenRouter API keys (and OpenRouter offers several free-tier models that debateX fully utilizes)."
  },
  {
    num: "05",
    question: "Can I self-host it?",
    answer: "Yes. The platform is designed for containerized deployment. With one-click scripts (start.sh / run.bat), you can spin up the FastAPI backend (port 8001) and Vite React frontend (port 5173) in under 5 minutes."
  }
];

function FAQRow({ num, question, answer, isActive, onClick }) {
  return (
    <div className={`faq-row ${isActive ? "faq-active" : ""}`}>
      <div className="faq-trigger" onClick={onClick}>
        <span className="faq-num">{num}</span>
        <span className="faq-question">{question}</span>
        <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <div className="faq-content">
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq" style={{ borderTop: '0.5px solid var(--bg-border-hi)', padding: '80px 0 64px' }}>
      <div className="container-720">
        <div className="section-header-box reveal revealed">
          <div className="eyebrow-box">✓ FAQ</div>
        </div>
        <h2 className="section-title reveal revealed"><span className="gradient-text-light">Technical Details</span></h2>
        
        <div className="faq-accordion">
          {faqData.map((faq, idx) => (
            <FAQRow
              key={idx}
              num={faq.num}
              question={faq.question}
              answer={faq.answer}
              isActive={activeIndex === idx}
              onClick={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
