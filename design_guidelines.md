# PromptForge Design Guidelines

## Design Approach

**System Selected:** Material Design 3 with Linear-inspired refinements
**Rationale:** PromptForge is a productivity-focused AI tool requiring clarity, information density, and professional aesthetics. Material Design 3's adaptive color system and robust component library pairs well with Linear's clean typography and refined spacing for an expert-level interface.

**Design Principles:**
- Clarity over decoration: Every visual element serves functional purpose
- Information hierarchy: Search results, evaluations, and suggestions must be instantly scannable
- Professional polish: Enterprise-ready appearance that inspires user confidence
- Seamless AI interaction: Conversational yet structured interface

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 10% (deep slate)
- Surface: 222 15% 15% (elevated slate)
- Surface Variant: 222 12% 20% (cards/panels)
- Primary: 221 83% 53% (vibrant blue - gemini brand aligned)
- Primary Hover: 221 83% 48%
- On Primary: 0 0% 100%
- Text Primary: 220 9% 92%
- Text Secondary: 220 9% 70%
- Border: 220 9% 25%
- Success: 142 71% 45% (emerald for improved prompts)
- Warning: 38 92% 50% (amber for suggestions)
- Error: 0 72% 51% (red for issues)

**Light Mode:**
- Background: 0 0% 100%
- Surface: 220 14% 96%
- Surface Variant: 220 14% 93%
- Primary: 221 83% 53%
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%
- Border: 214 32% 91%

### B. Typography

**Font Families:**
- Primary: 'Inter', system-ui, -apple-system, sans-serif
- Monospace: 'JetBrains Mono', 'Fira Code', monospace (for code/prompts)

**Scale:**
- Display (Hero): 3.5rem/4rem, font-weight: 700, letter-spacing: -0.02em
- H1: 2.5rem/3rem, font-weight: 700
- H2: 2rem/2.5rem, font-weight: 600
- H3: 1.5rem/2rem, font-weight: 600
- Body Large: 1.125rem/1.75rem, font-weight: 400
- Body: 1rem/1.5rem, font-weight: 400
- Body Small: 0.875rem/1.25rem, font-weight: 400
- Caption: 0.75rem/1rem, font-weight: 500

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 (e.g., p-4, gap-8, mt-12)

**Grid System:**
- Max content width: max-w-7xl (1280px)
- Side padding: px-6 (mobile), px-8 (tablet), px-12 (desktop)
- Section spacing: py-16 (mobile), py-24 (desktop)
- Card/component spacing: p-6 to p-8

**Responsive Breakpoints:**
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns for features)
- Desktop: > 1024px (3-4 columns where appropriate)

### D. Component Library

**Navigation (Top Bar):**
- Height: h-16
- Logo left, primary actions right
- Sticky positioning with subtle backdrop blur
- "New Evaluation" CTA button (primary color)
- User profile/settings icon far right

**Prompt Input/Editor:**
- Large textarea with monospace font
- Minimum height: 200px, auto-expand
- Character count in bottom-right corner
- Toolbar: Format options, insert examples, clear
- Border: 2px solid on focus (primary color)
- Subtle syntax highlighting for structured prompts

**Search Results Display:**
- Card-based layout with source citations
- Each result: favicon, title (bold), snippet (2-3 lines), URL (text-secondary)
- Relevance indicator: Small badge (1-10 score)
- Expandable for full content
- Spacing: gap-4 between cards

**Evaluation Panel:**
- Split layout: Original prompt (left) | Improved version (right)
- Diff highlighting: Red background for removed, green for additions
- Score badges: Overall score (large, top), category scores (grammar, clarity, specificity)
- Suggestion cards below with icons and actionable text

**Answer/Output Display:**
- Clean markdown rendering
- Code blocks with syntax highlighting (using Prism.js or highlight.js)
- Tables with alternating row backgrounds
- Citations as superscript numbers [1] linking to sources footer
- Formatted lists with proper indentation

**Action Buttons:**
- Primary: Solid primary color, px-6 py-3, rounded-lg
- Secondary: Outline with primary border, hover fills
- Icon buttons: p-2, rounded-md, hover background
- Button groups: gap-3, aligned left/right as needed

**Status Indicators:**
- Processing: Animated dots or spinner (primary color)
- Success: Checkmark with success color
- Error: Alert icon with error color
- Toast notifications: Top-right, auto-dismiss 5s

**Data Tables (for comparison views):**
- Sticky header row
- Zebra striping: surface-variant on alternate rows
- Sortable columns with chevron icons
- Row hover: subtle background change

### E. Page Layouts

**Landing Page:**
- Hero: 70vh, centered content, gradient background (primary to darker shade)
- Large headline: "Elevate Your AI Prompts with PromptForge"
- Subheading explaining core value
- Primary CTA: "Start Evaluating" + Secondary: "See Example"
- Hero image: Abstract AI visualization or split-screen before/after prompt comparison
- Features grid: 3 columns (desktop), icons + title + description
- How It Works: 3-step process with numbered cards
- Example transformation: Side-by-side before/after with highlights
- Pricing/CTA section with final conversion opportunity

**Main Application:**
- Three-panel layout (desktop): Sidebar (history/templates, 280px) | Editor (flexible) | Results panel (40%, collapsible)
- Mobile: Stack vertically, tabs for switching views
- Floating action button for quick new evaluation (mobile)

**Results Page:**
- Breadcrumb navigation at top
- Header: Original query + timestamp
- Tabbed interface: "Improved Prompt" | "Analysis" | "Sources" | "Export"
- Download options: PDF, Markdown, JSON

---

## Images

**Hero Image (Landing):** 
Place a large, high-quality illustration showing AI prompt transformation - abstract geometric shapes morphing from chaotic to organized, or a split-screen visualization of a basic prompt evolving into a detailed one. Position: Right 50% of hero section, with content on left. Use blur effect on background edges for depth.

**Feature Icons:**
Heroicons library for all interface icons (search, edit, check, alert, etc.)

**Process Illustrations:**
3 simple, consistent illustrations for "How It Works" section showing: 1) Input prompt, 2) AI analysis, 3) Improved output. Style: Line art with primary color accents.

---

## Accessibility & Quality

- WCAG AA contrast ratios minimum (4.5:1 for text)
- Focus indicators: 2px primary color outline with 2px offset
- All interactive elements: min 44px tap target
- Consistent dark mode across all inputs, modals, and form fields
- Keyboard navigation: Tab order, escape to close, arrow keys in lists
- Screen reader labels on all icon-only buttons

**Animation:**
- Minimal, purposeful only: Page transitions (200ms ease), skeleton loaders during API calls, success confirmations (scale + fade)
- No decorative parallax or scroll-triggered effects