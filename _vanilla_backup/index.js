/* debateX Landing Page Logic */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- 1. Intersection Observer for Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));


  // --- 2. Timeline Step-Sync with Visual Panel ---
  const stepCards = document.querySelectorAll('.step-card');
  const stageVisuals = document.getElementById('stage-visuals');

  const stageTemplates = {
    's1': `
      <div class="stage-slide active">
        <div class="slide-meta font-mono">ROUND 1 · PARALLEL DRAFTS</div>
        <div class="progress-bar-group">
          <div class="bar-label font-mono">Llama-3.3-70B</div>
          <div class="bar-fill-track"><div class="bar-fill green" style="width: 100%;"></div></div>
        </div>
        <div class="progress-bar-group">
          <div class="bar-label font-mono">GPT-OSS-120B</div>
          <div class="bar-fill-track"><div class="bar-fill green" style="width: 100%;"></div></div>
        </div>
        <div class="progress-bar-group">
          <div class="bar-label font-mono">Qwen3-32B</div>
          <div class="bar-fill-track"><div class="bar-fill green" style="width: 100%;"></div></div>
        </div>
        <p class="slide-footer font-mono">Draft answers locked · 3/3 responded</p>
      </div>
    `,
    's2': `
      <div class="stage-slide active">
        <div class="slide-meta font-mono">ROUND 2 · PEER REVIEW</div>
        <div class="ranking-list font-mono">
          <div style="padding: 10px 14px; background: var(--bg-elevated); border: 0.5px solid var(--bg-border); margin-bottom: 8px;">
            1. Response B <span class="muted">(Rank 1.33)</span>
          </div>
          <div style="padding: 10px 14px; background: var(--bg-elevated); border: 0.5px solid var(--bg-border); margin-bottom: 8px;">
            2. Response A <span class="muted">(Rank 1.67)</span>
          </div>
          <div style="padding: 10px 14px; background: var(--bg-elevated); border: 0.5px solid var(--bg-border); margin-bottom: 8px;">
            3. Response C <span class="muted">(Rank 3.00)</span>
          </div>
        </div>
        <p class="slide-footer font-mono">Scores aggregate · blindness enforced</p>
      </div>
    `,
    's3': `
      <div class="stage-slide active">
        <div class="slide-meta font-mono">ROUND 3 · REVISE OR DEFEND</div>
        <div class="decision-flow font-mono">
          <div style="display:flex; align-items:center; gap:12px; padding: 10px 14px; background: var(--bg-elevated); border: 0.5px solid var(--bg-border); margin-bottom: 8px;">
            <span class="chip-defend">DEFEND</span> Response B maintains locks
          </div>
          <div style="display:flex; align-items:center; gap:12px; padding: 10px 14px; background: var(--bg-elevated); border: 0.5px solid var(--bg-border); margin-bottom: 8px;">
            <span class="chip-revise">REVISE</span> Response A adds thread checks
          </div>
        </div>
        <p class="slide-footer font-mono">Refinement complete · code safety verified</p>
      </div>
    `,
    's4': `
      <div class="stage-slide active">
        <div class="slide-meta font-mono" style="color: var(--accent);">ROUND 4 · CHALLENGER CRITIQUE</div>
        <div class="critique-box font-mono" style="background: rgba(255, 74, 34, 0.02); border: 0.5px solid rgba(255, 74, 34, 0.15); padding: 16px; margin-bottom: 8px;">
          <div class="red-arrow" style="color: var(--accent); font-weight: 700; margin-bottom: 8px;">&gt;&gt; VULNERABILITY EXPOSED:</div>
          <div class="critique-content" style="color: var(--text-primary); font-size: 13px; font-weight: 300;">
            "Teardown conditions race with executing queries. Locks must be disposed after active pool joins."
          </div>
        </div>
        <p class="slide-footer font-mono">Target: Response A · 1 weakness logged</p>
      </div>
    `,
    's5': `
      <div class="stage-slide active">
        <div class="slide-meta font-mono" style="color: var(--green);">ROUND 5 · CHAIRMAN SYNTHESIS</div>
        <div class="final-visual font-mono" style="display:flex; justify-content:space-between; align-items:center; padding: 14px 16px; background: var(--bg-elevated); border: 0.5px solid var(--bg-border); margin-bottom: 8px;">
          <span class="accent-text" style="color: var(--green); font-weight: 700;">&gt;&gt; VETTED_CONSENSUS.JSON</span>
          <div class="success-dot-pulse" style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--green); box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.2);"></div>
        </div>
        <p class="slide-footer font-mono" style="color: var(--green);">Deliberation consensus complete · 100% confidence</p>
      </div>
    `
  };

  function updateVisualPanel(stepId) {
    if (stageTemplates[stepId]) {
      stageVisuals.innerHTML = stageTemplates[stepId];
    }
  }

  // Click handler to manually select steps
  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const stepId = card.getAttribute('data-step');
      updateVisualPanel(stepId);
    });
  });

  // Intersection Observer to dynamically highlight steps on scroll
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stepCards.forEach(c => c.classList.remove('active'));
        entry.target.classList.add('active');
        const stepId = entry.target.getAttribute('data-step');
        updateVisualPanel(stepId);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-10% 0px -40% 0px'
  });

  stepCards.forEach(card => stepObserver.observe(card));


  // --- 3. Waitlist Form Processing ---
  const waitlistForms = document.querySelectorAll('.waitlist-form');
  
  waitlistForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.email-input');
      const button = form.querySelector('.cta-btn');
      const email = input.value.trim();
      
      if (!email) return;
      
      button.textContent = 'Requesting...';
      button.style.opacity = '0.6';
      input.disabled = true;
      button.disabled = true;
      
      setTimeout(() => {
        const container = form.parentElement;
        form.remove();
        
        const successEl = document.createElement('div');
        successEl.className = 'form-success';
        successEl.innerHTML = `
          <div class="form-success-inner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--accent);">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Access requested for <strong style="color: var(--text-primary); font-weight: 500;">${email}</strong>. Check your inbox shortly.</span>
          </div>
        `;
        container.appendChild(successEl);
      }, 1200);
    });
  });


  // --- 4. FAQ Accordion Logic ---
  const faqRows = document.querySelectorAll('.faq-row');
  
  faqRows.forEach(row => {
    const trigger = row.querySelector('.faq-trigger');
    const content = row.querySelector('.faq-content');
    
    trigger.addEventListener('click', () => {
      const isActive = row.classList.contains('faq-active');
      
      faqRows.forEach(r => {
        r.classList.remove('faq-active');
        r.querySelector('.faq-content').style.maxHeight = null;
      });
      
      if (!isActive) {
        row.classList.add('faq-active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });


  // --- 5. Terminal / Live Demo Stream Simulator ---
  const terminal = document.getElementById('terminal-stream');
  
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

  let currentSequenceIdx = 0;
  let currentLineIdx = 0;
  let typewriterInterval = null;

  function runSequence() {
    terminal.innerHTML = '';
    currentLineIdx = 0;
    
    const sequence = debateSequences[currentSequenceIdx];
    
    function writeNextLine() {
      if (currentLineIdx >= sequence.stream.length) {
        clearInterval(typewriterInterval);
        
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        terminal.appendChild(cursor);

        setTimeout(() => {
          currentSequenceIdx = (currentSequenceIdx + 1) % debateSequences.length;
          runSequence();
        }, 5000);
        return;
      }

      const existingCursor = terminal.querySelector('.terminal-cursor');
      if (existingCursor) existingCursor.remove();

      const lineData = sequence.stream[currentLineIdx];
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-line';
      
      if (lineData.type === 'bold') {
        lineEl.innerHTML = `<span class="bold">${lineData.text}</span>`;
      } else if (lineData.type === 'accent') {
        lineEl.innerHTML = `<span class="accent">${lineData.text}</span>`;
      } else if (lineData.type === 'green') {
        lineEl.innerHTML = `<span class="green">${lineData.text}</span>`;
      } else if (lineData.type === 'red') {
        lineEl.innerHTML = `<span class="red">${lineData.text}</span>`;
      } else if (lineData.type === 'muted') {
        lineEl.innerHTML = `<span class="muted">${lineData.text}</span>`;
      } else {
        lineEl.textContent = lineData.text;
      }
      
      terminal.appendChild(lineEl);
      terminal.scrollTop = terminal.scrollHeight;
      
      currentLineIdx++;
      
      let nextDelay = 350;
      if (lineData.text.includes('responding...')) nextDelay = 700;
      if (lineData.text.includes('Consensus achieved')) nextDelay = 1200;
      
      clearInterval(typewriterInterval);
      typewriterInterval = setInterval(writeNextLine, nextDelay);
    }

    typewriterInterval = setInterval(writeNextLine, 200);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    runSequence();
  } else {
    terminal.innerHTML = `
      <div class="terminal-line bold">debateX · static render active</div>
      <div class="terminal-line">&gt; query: "Implement a thread-safe caching system in Python."</div>
      <div class="terminal-line accent">&gt; router: technical/code resolved</div>
      <div class="terminal-line">✓ Consensus achieved · 5 rounds · Latency: 4.6s · cost: $0.0039</div>
    `;
  }
});
