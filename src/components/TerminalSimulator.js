"use client";

import { useEffect, useState, useRef } from "react";

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

export default function TerminalSimulator() {
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

  // Auto scroll terminal to the bottom as lines append
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <section className="terminal-section">
      <div className="container-720">
        <div className="section-header-box reveal revealed">
          <div className="eyebrow-box">✓ LIVE OUTPUT STREAM</div>
        </div>
        <h2 className="section-title reveal revealed">Watch the council debate.</h2>
        
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
    </section>
  );
}
