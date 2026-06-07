# debateX — Landing Page Design System
*Aggressive negative space + monochrome tension + technical typography + cinematic section reveals. Every section earns its scroll. No filler.*

---

## Core Aesthetic DNA

The debateX design language relies on stark contrasts, raw developer-grade typography, and vibrant accents that slice through a matte slate-black background. It eschews soft gradients and shadows for hard lines, sharp corners, and high-tension layouts.

The visual theme reinforces the core product: an authoritative, multi-LLM cognitive consensus engine. It should feel less like a consumer SaaS app and more like a command center.

---

## Color System

```css
/* Background scale — matte slate-black */
--bg-base:        #0C0C0C;   /* Page background (deep, but not pure #000) */
--bg-surface:     #121211;   /* Card / panel surface */
--bg-elevated:    #181816;   /* Raised elements */
--bg-border:      #1F1F1D;   /* Default faint border */
--bg-border-hi:   #30302D;   /* Hover / active border */

/* Text scale — cotton/raw canvas tone */
--text-primary:   #ECEAE6;   /* Headlines, primary data */
--text-secondary: #878783;   /* Body text, descriptions */
--text-muted:     #4C4C48;   /* Labels, captions, disabled states */

/* Accent — vibrant vermilion red-orange */
--accent:         #FF5924;   /* Primary call-to-action, major graphic elements */
--accent-dim:     #CC471C;   /* Dimmed accent for borders and hover states */

/* Semantic */
--green:          #4ADE80;   /* Live / active / healthy indicators */
```

**Rules:**
- **95% Grayscale:** The interface relies heavily on the `bg` and `text` scales. The vibrant `--accent` (`#FF5924`) should be used boldly but sparingly (e.g., the massive Hero background, the Footer, and key interactive moments).
- **No Gradients:** Solid fills only. Depth is achieved via borders and faint background opacity changes, not drop shadows or gradient meshes.
- **Overscroll Behavior:** `overscroll-behavior: none;` is strictly enforced to disable elastic "rubber band" scrolling and lock the user inside the frame. 

---

## Typography

The typography pairs a bold, geometric display sans-serif with a crisp monospace font for technical data.

```css
/* Display, UI, and Body all use Space Grotesk for a unified, modern tech feel */
--font-display:   'Space Grotesk', sans-serif;
--font-ui:        'Space Grotesk', sans-serif;
--font-body:      'Space Grotesk', sans-serif;

/* Mono — used for code blocks, terminal outputs, stats, and technical labels */
--font-mono:      'JetBrains Mono', monospace;
```

### Type Scale & Patterns

| Role | Font | Size | Weight | Color | Transform |
|------|------|------|--------|-------|-----------|
| Hero H1 | Space Grotesk | 64px+ | 700 | `--bg-base` | none (tight line-height) |
| Section H2 | Space Grotesk | 48px | 500 | `--text-primary` | none (tight tracking) |
| Step H3 | Space Grotesk | 20px | 600 | `--text-primary` | none |
| Eyebrow | Space Grotesk | 12px | 700 | `--text-secondary` | UPPERCASE, ls 0.12em |
| Body | Space Grotesk | 16px | 400 | `--text-secondary` | none |
| Label/Badge | Space Grotesk | 11px | 600 | `--text-muted` | UPPERCASE, ls 0.08em |
| Terminal/Mono | JetBrains Mono | 13px | 400 | `--text-secondary` | none |

**Key rule:** Headlines are SHORT and punchy. Use `<br />` tags to manually control line breaks and sculpt the text block.

---

## Layout Grid & Structure

```css
--max-width:      1100px;
--content-width:  720px;   /* Centered prose/text columns */
--padding-x:      clamp(24px, 5vw, 80px);
--section-gap:    140px;   /* Massive vertical spacing between sections */
--card-radius:    0px;     /* NO rounded corners. Sharp edges only. */
```

- **Linear Flow:** No sidebars. The user scrolls through a highly curated, linear narrative.
- **Breathing Room:** Sections are separated by massive vertical gaps (`140px`).
- **Sharp Corners:** Every element (`button`, `div`, `input`) has a `border-radius` of `0`.

---

## Key UI Components

### 1. The Hero Section
- **Background:** Full bleed `--accent` (Vibrant Orange).
- **Text:** The text is inverted to `--bg-base` (Black) for maximum impact.
- **Buttons:** Sharp, solid blocks. Primary buttons invert the color scheme, while secondary buttons use transparent backgrounds with solid borders.

### 2. SVG Architecture Diagrams
- Do not use images for diagrams. Build them natively using inline SVGs to maintain crisp edges at any resolution.
- Diagrams should look like technical schematics or blueprints.
- Use `<rect>`, `<path>`, and `<circle>` (or square nodes) with `stroke="var(--bg-border-hi)"` and `fill="var(--bg-surface)"`.
- **Animations:** Infuse diagrams with subtle CSS keyframe animations (e.g., pulsing nodes, sliding indicator bars, or glowing data streams) to make them feel "alive" and actively processing.

### 3. The Terminal Simulator
- A staple for developer-focused tools.
- A stark box with `border: 1px solid var(--bg-border)` and `background: var(--bg-surface)`.
- Use `JetBrains Mono`.
- Implement a typing effect for command inputs, followed by instant, colored outputs (e.g., green for success, muted gray for latency metrics).

### 4. Micro-Animations & Reveal Effects
- **Scroll Reveal:** Every major text block or diagram should fade and slide up slightly (`transform: translateY(16px)`) as it enters the viewport. 
- **Pulsing Status Dots:** Use a small `6px` green dot with a `pulseGreen` animation in the footer or navbar to indicate the system is "Live" or "Deliberating."
- **Hover States:** Links and buttons should not transition softly. They should snap to `--text-primary` or invert entirely.

---

## The Footer

- Anchors the page perfectly by mirroring the Hero section.
- **Background:** Full bleed `--accent` (Vibrant Orange).
- **Text:** Inverted to dark `--bg-base` for stark contrast.
- Contains the brand mark, social links, legal copyright, and the pulsing "All systems deliberating" status pill.
