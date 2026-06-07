# debateX — Landing Page Design System
*Adapted from rig.ai aesthetic. Minimal, dark, editorial, developer-grade.*

---

## Core Aesthetic DNA

rig.ai's design language: **aggressive negative space + monochrome tension + technical typography + cinematic section reveals**. Every section earns its scroll. No filler.

For debateX: same skeleton, new identity. rig.ai = privacy/local. debateX = **deliberation/truth**. The tension shifts from *surveillance vs. freedom* to *single-model guessing vs. council-vetted certainty*.

---

## Color System

```css
/* Background scale — near-black, not pure black */
--bg-base:        #0A0A08;   /* page background */
--bg-surface:     #111110;   /* card / panel surface */
--bg-elevated:    #1A1A18;   /* raised element */
--bg-border:      #252522;   /* default border */
--bg-border-hi:   #383835;   /* hover / emphasis border */

/* Text scale */
--text-primary:   #F0EDEA;   /* headlines */
--text-secondary: #888882;   /* body, descriptions */
--text-muted:     #444440;   /* labels, captions, disabled */

/* Accent — single accent, used sparingly */
--accent:         #D4A96A;   /* warm gold — deliberation, authority */
--accent-dim:     #6B5535;   /* dimmed accent for borders */

/* Semantic */
--green:          #4ADE80;   /* live / active indicator */
--red:            #F87171;   /* challenge / attack */
```

**Rules:**
- 95% grayscale. Accent (gold) appears max 3× per page. Green only for "live" status dots.
- No gradients. Solid fills only. Depth via opacity layers, not gradient meshes.
- Background is `#0A0A08` — warmer than pure black, easier on eyes, matches editorial feel.

---

## Typography

```css
/* Display — headlines, hero */
--font-display: 'DM Serif Display', serif;     /* Italic moments = power */

/* UI — navigation, labels, buttons, captions */
--font-ui: 'Syne', sans-serif;                 /* Geometric, slightly cold */

/* Body — descriptions, paragraphs */
--font-body: 'DM Sans', sans-serif;            /* Clean, neutral */

/* Mono — terminal blocks, model names, counters */
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale

| Role | Font | Size | Weight | Color | Transform |
|------|------|------|--------|-------|-----------|
| Hero H1 | DM Serif Display | 72–80px | 400 | `--text-primary` | none (use italic) |
| Section H2 | DM Serif Display | 48px | 400 | `--text-primary` | none |
| Step H3 | Syne | 20px | 600 | `--text-primary` | none |
| Eyebrow | Syne | 11px | 600 | `--text-muted` | UPPERCASE, ls 0.12em |
| Body | DM Sans | 15–16px | 300 | `--text-secondary` | none |
| Label/Badge | Syne | 11px | 600 | `--text-muted` | UPPERCASE, ls 0.08em |
| Mono/Terminal | JetBrains Mono | 13px | 400 | `--text-secondary` | none |
| Stat number | DM Serif Display | 52px | 400 | `--text-primary` | none |

**Key rule (from rig.ai):** Headlines are SHORT. 4–6 words max. Use line breaks intentionally. Let them breathe.

---

## Layout Grid

```css
--max-width:     1100px;
--content-width: 720px;   /* centered prose/text columns */
--padding-x:     clamp(24px, 5vw, 80px);
--section-gap:   140px;   /* between major sections */
--card-radius:   10px;
```

- Full-width sections with centered content column
- Most sections: single centered column (`max-width: 720px`)
- Feature/comparison sections: 2-column grid (`1fr 1fr`) or asymmetric (`2fr 1.2fr`)
- NO sidebars. Linear scroll. One thing at a time.

---

## Navigation

```
[debateX wordmark]                    [How it works]  [GitHub]  [Join Waitlist →]
```

- Fixed top, `backdrop-filter: blur(12px)` + `background: rgba(10,10,8,0.85)`
- Height: 56px
- Wordmark: DM Serif Display, 18px, `--text-primary`
- Nav links: Syne, 13px, `--text-muted`, hover → `--text-primary` (150ms ease)
- CTA button: Syne 12px UPPERCASE, 1px solid `--bg-border-hi`, px 18px py 8px, `border-radius: 5px`, hover → bg `--bg-elevated`
- Bottom border: `0.5px solid --bg-border`

---

## Hero Section

### Structure
```
[EYEBROW — MULTI-LLM DELIBERATION ENGINE]

Don't trust
a single
model's answer.

[body copy — 2 lines]

[email input ——————————] [Request Access]

[ticker strip]
```

### Specs
- Eyebrow: Syne, 11px, UPPERCASE, `--text-muted`, letter-spacing 0.12em, margin-bottom 28px
- H1: DM Serif Display, 72px, line-height 1.0, `--text-primary`. Second line italic ("*answer*") in `--accent` color
- Body: DM Sans 300, 16px, `--text-secondary`, max-width 480px, margin-top 24px
- Email form: inline flex, input (flex:1) + button. Height 44px. Input border `--bg-border`, bg transparent. Button bg `--text-primary`, color `--bg-base`, Syne 13px font-weight 600
- Section takes 100vh minimum, content vertically centered

### Ticker Strip (below hero form)
Scrolling horizontal marquee. Single line. Syne 11px UPPERCASE `--text-muted`. Content:
```
5-ROUND DELIBERATION · 8 LLM COUNCIL · ROLE-BASED PERSONAS · SSE STREAMING · OPEN SOURCE · SELF-HOSTED · GROQ + OPENROUTER · CHAIRMAN SYNTHESIS · ANONYMIZED PEER REVIEW · CHALLENGER CRITIQUE · 5-ROUND DELIBERATION · ...
```
- Infinite CSS animation, left scroll, 40s duration
- Divider: `·` character, color `--accent-dim`
- Border top + bottom: `0.5px solid --bg-border`
- Padding: 14px 0

---

## Section 2 — "The Problem" (Tension)

*Mirror rig.ai's "You don't own your AI" section. Reframe for debateX.*

### Heading
```
[EYEBROW — THE PROBLEM]

You're trusting
one model.
That's a mistake.
```

### 4-problem grid (2×2 or 1-column stacked)

Each problem card:
- Number: `001`, `002`, `003`, `004` — JetBrains Mono 11px, `--text-muted`
- Title: Syne 18px 600, `--text-primary`
- Body: DM Sans 300 15px, `--text-secondary`, max 320px
- Left border: `2px solid --bg-border`, padding-left 20px
- No card bg — floating text blocks with left border accent

| # | Title | Copy |
|---|-------|------|
| 001 | Single-model hallucination | One model fabricates with confidence. No internal check, no critic, no correction. |
| 002 | No adversarial pressure | Without a devil's advocate, bad reasoning goes unchallenged every time. |
| 003 | Black-box answer | You get a result but no debate trail. You can't see why it won or what it beat. |
| 004 | Provider lock-in bias | Every provider's model has systematic blind spots. One model = one worldview. |

---

## Section 3 — "Introducing debateX" (Product Reveal)

### Heading
```
[EYEBROW — INTRODUCING DEBATEX]

Eight models.
Five rounds.
One answer you
can trust.
```

### Architecture diagram (ASCII/SVG inline block)
Show the pipeline visually. Dark surface card, mono font, animated progression:

```
USER QUERY
    │
    ▼
┌─────────────────────────────────────┐
│  QUERY ROUTER                       │
│  Classifies: technical / factual /  │
│  ethical / creative / math          │
└───────────────┬─────────────────────┘
                │
    ┌───────────▼────────────┐
    │  PERSONA ALLOCATOR     │
    │  Chairman · Reasoner   │
    │  Fact-Checker · Devil  │
    │  Steelmanner           │
    └───────────┬────────────┘
                │
    ┌──────┬────▼────┬──────┐
    │  R1  │   R2   │  R3  │  ...R4...R5
    └──────┴─────────┴──────┘
    Respond  Peer     Defend
             Review
                │
    ┌───────────▼────────────┐
    │  CHAIRMAN SYNTHESIS    │  ← Final answer
    └────────────────────────┘
```

Render as an animated SVG or styled div. Active step highlighted in `--accent`.

---

## Section 4 — "5-Round Pipeline" (How It Works)

*Mirror rig.ai's Step 01 / Step 02 / Step 03 format.*

### Layout: numbered steps, alternating text + visual

```
Step 01                          [visual: round cards]
### Independent blind responses.
[body]

Step 02
### Anonymized peer review & ranking.
[body]

Step 03
### Defend or revise under pressure.
[body]

Step 04
### Challenger attacks the leaders.
[body]

Step 05
### Chairman synthesizes consensus.
[body]
```

### Step specs
- "Step 01": Syne 11px UPPERCASE, `--text-muted`, letter-spacing 0.1em
- H3: DM Serif Display 28px, `--text-primary`
- Body: DM Sans 300 15px, `--text-secondary`, max 400px
- Left vertical rule: `1px solid --bg-border`, full height of step block
- Active step number in `--accent`

---

## Section 5 — Stats / Proof Strip

Full-width dark strip, `background: --bg-surface`, border top+bottom `--bg-border`.

4 stats in a row:

| Stat | Label |
|------|-------|
| 5 | Deliberation rounds |
| 8 | LLMs in council |
| 4 | Cognitive roles |
| <$0.01 | Avg cost per query |

- Number: DM Serif Display 52px, `--text-primary`
- Label: Syne 11px UPPERCASE, `--text-muted`, ls 0.08em
- Dividers: `0.5px solid --bg-border` between stats
- Padding: 48px 0

---

## Section 6 — Capabilities Grid

*Mirror rig.ai's `[ 01 ] heading` capability blocks.*

```
[EYEBROW — CAPABILITIES]

Your machine, unleashed.
```

6-cell grid (3×2), each cell:
- Index: `[ 01 ]` — JetBrains Mono 11px, `--text-muted`
- Title: Syne 16px 600, `--text-primary`
- Body: DM Sans 14px 300, `--text-secondary`
- Cell border: `0.5px solid --bg-border`
- Hover: border → `--bg-border-hi`, bg → `--bg-surface`

| # | Title | Description |
|---|-------|-------------|
| 01 | Query classification | Routes to optimal model subset per query type: code, factual, ethical, creative, math. |
| 02 | Dynamic persona allocation | Shift-based role rotation assigns Reasoner, Fact-Checker, Devil's Advocate, Steelmanner, Chairman per debate. |
| 03 | Anonymized peer review | Models evaluate each other blind — no provider bias in ranking. |
| 04 | Challenger critique | A dedicated model attacks the leading answers, exposing weakest logic. |
| 05 | Real-time SSE stream | Watch the debate unfold live — rounds, ranks, critiques, synthesis streaming in. |
| 06 | Cost estimation | Token usage projection + USD cost per query before you submit. |

---

## Section 7 — Terminal / Live Demo Block

*Mirror rig.ai's terminal animation block.*

Dark surface card (`--bg-surface`), mono font, simulated SSE stream output:

```
debateX · council active

> query: "What caused the 2008 financial crisis?"
> router: factual/research
> models assigned: 6 · roles: 4

[ R1 ] Llama-3.3-70B   → responding...   ✓
[ R1 ] GPT-OSS-120B    → responding...   ✓
[ R1 ] Qwen3-32B       → responding...   ✓

[ R2 ] peer review · anonymized · ranking...   ✓

[ R3 ] Qwen3-32B defends position 2...
       GPT-OSS-120B revises → new position 1...

[ R4 ] CHALLENGER (DeepSeek-V4) attacking leaders...
       Weakness identified: "overcredits deregulation,
       ignores liquidity mechanics"

[ R5 ] CHAIRMAN (Llama-3.3-70B) synthesizing...

✓ Consensus reached · 4 rounds · ~$0.004
```

- Simulated typewriter animation (CSS / JS)
- Window chrome: dots (red/yellow/green, 8px), title bar `debateX · localhost:8001`
- Border: `0.5px solid --bg-border`, border-radius: 10px
- Padding: 28px

---

## Section 8 — Early Access CTA

*Mirror rig.ai's final CTA section.*

Full-width, centered, generous padding (160px top/bottom).

```
[EYEBROW — EARLY ACCESS]

Join the waitlist.
debateX is almost ready.

[email input ————————————————] [Request Access]

No account needed. Open source. Self-hostable.
```

Optional: abstract background visual — faint grid or radial glow in `--accent-dim` at 15% opacity. Keep it subtle.

---

## Section 9 — FAQ

*Accordion. rig.ai's exact pattern: numbered, minimal.*

- Q label: `01`, `02`... JetBrains Mono 12px `--text-muted`
- Question text: Syne 15px 600 `--text-primary`
- Answer: DM Sans 14px 300 `--text-secondary`
- Divider: `0.5px solid --bg-border`
- No card bg — borderless rows

| # | Question |
|---|----------|
| 01 | What is debateX? |
| 02 | Which models are in the council? |
| 03 | How does the 5-round pipeline work? |
| 04 | Is it free to use? |
| 05 | Can I self-host it? |
| 06 | What's the difference between Groq and OpenRouter models? |
| 07 | How much does a query cost? |
| 08 | When does early access open? |

---

## Footer

```
[debateX wordmark]
Multi-LLM deliberation engine. Council-vetted answers.

[GitHub]  [Twitter/X]  [LinkedIn]          [Privacy]  [Docs]

© 2026 debateX — MIT License             All systems deliberating
```

- Background: `--bg-base`
- Border top: `0.5px solid --bg-border`
- Wordmark: DM Serif Display 17px
- Tagline: DM Sans 13px 300 `--text-muted`
- Status pill bottom-right: green dot + "All systems deliberating" — JetBrains Mono 11px

---

## Motion & Animation

| Element | Animation | Spec |
|---------|-----------|------|
| Hero H1 | Fade up, stagger per line | `opacity 0→1, translateY 20px→0`, 600ms, 100ms stagger |
| Section headings | Fade up on scroll enter | Intersection Observer, 500ms ease-out |
| Step numbers | Count up on scroll | JS counter, 800ms |
| Ticker strip | Infinite horizontal scroll | CSS `@keyframes scroll`, 40s linear infinite |
| Terminal block | Typewriter line-by-line | JS setInterval, 80ms per char, 400ms line pause |
| Round cards | Active round pulses | `box-shadow: 0 0 0 2px --accent`, CSS pulse keyframe |
| Nav links | Underline slide | `::after` pseudo, scaleX 0→1, 150ms |
| CTA button hover | Slight lift | `translateY -1px`, 150ms |

**Rule:** All animations `prefers-reduced-motion: reduce` → instant/none.

---

## Component Specs

### Email Input + CTA Button
```css
.email-form {
  display: flex;
  gap: 8px;
  max-width: 420px;
}
.email-input {
  flex: 1;
  height: 44px;
  padding: 0 16px;
  background: transparent;
  border: 0.5px solid var(--bg-border-hi);
  border-radius: 5px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 14px;
}
.email-input::placeholder { color: var(--text-muted); }
.email-input:focus { border-color: var(--accent-dim); outline: none; }
.cta-btn {
  height: 44px;
  padding: 0 22px;
  background: var(--text-primary);
  color: var(--bg-base);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 150ms;
}
.cta-btn:hover { opacity: 0.88; }
```

### Round Badge
```css
.round-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  border: 0.5px solid var(--bg-border);
  border-radius: 4px;
  padding: 4px 10px;
}
.round-badge.active {
  color: var(--accent);
  border-color: var(--accent-dim);
  background: rgba(212,169,106,0.06);
}
```

### Model Role Chip
```css
.role-chip {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  border: 0.5px solid var(--bg-border);
  border-radius: 3px;
  padding: 3px 8px;
}
.role-chip.chairman { color: var(--accent); border-color: var(--accent-dim); }
```

---

## Fonts — Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=Syne:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## What Makes rig.ai Work (Applied to debateX)

| rig.ai technique | debateX adaptation |
|------------------|--------------------|
| "You don't own your AI" tension section | "You're trusting one model. That's a mistake." — same emotional hook |
| Numbered problem cards `001 002 003` | Same — single-model failure modes |
| ASCII terminal animation | debateX SSE stream simulation |
| Step 01/02/03 architecture walkthrough | 5-round pipeline walkthrough |
| Ticker strip of capabilities | Same marquee, debateX features |
| Stats strip (300ms / 0 tokens / 100% offline) | debateX stats (5 rounds / 8 models / $0.004 avg) |
| Single gold/accent color used sparingly | `--accent: #D4A96A` — warm gold, authority |
| Aggressive whitespace between sections | 140px section gaps |
| Short punchy H1s with line breaks | Same — 4-6 words per line |
| "Almost ready" early access CTA | Same — waitlist framing |

---

## Page Scroll Order

```
1. Nav (fixed)
2. Hero — big claim + email capture
3. Ticker strip
4. The Problem — 4 failure modes of single-model AI
5. Introducing debateX — architecture overview
6. 5-Round Pipeline — step-by-step walkthrough
7. Stats strip
8. Capabilities grid (6 cells)
9. Terminal demo block (animated SSE stream)
10. Early access CTA (second email capture)
11. FAQ accordion
12. Footer
```

---

*Version 1.0 — debateX design system*
*Inspired by rig.ai aesthetic. All implementation decisions are original.*
