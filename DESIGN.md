# DESIGN.md — Arnaud Bouillon Portfolio

## 1. Identity & Mood
- **Brand / Persona**: Arnaud Bouillon, Full-Stack Developer.
- **Tone & Mood**: Retro-modern dev arcade with high-standard professional engineering. Combines the discipline of clean systems programming with the energetic, playful spirit of video games and football.
- **Core Identity Motif**: Precision technical console with tactical telemetry (match-card badges, terminal stats, and arcade achievement markers).

## 2. Antislop Dials
- **ENERGY**: 2 (Balanced: authoritative and professional for recruiters and clients, yet infused with authentic personal character)
- **RHYTHM**: 2 (Structured narrative flow: Hero console, Featured projects showcase, Interactive arcade drawer/mini-game, Technical stack playbook, and Career timeline)
- **MOTION**: 2 (Tactile hover feedback, smooth tab/drawer transitions, spring-based scroll indicators, strictly respecting `prefers-reduced-motion`)

## 3. Color Palette
- **Active palette**: 2 core neutrals + 1 unified primary accent
- **Dark Neutral (Default)**: Deep charcoal console `#101216` (background), `#181b20` (surface/cards), `#282d37` (borders)
- **Light Neutral**: Crisp chalk `#F8F9FA` (background), `#FFFFFF` (cards), `#E2E8F0` (borders)
- **Primary Accent (Pitch Green)**: Emerald `#10B981` / `#059669` (used uniformly across active tabs, category icons, telemetry badges, and interactive controls)
- **Text & Contrast**: High-contrast `#F1F5F9` on dark / `#0F172A` on light (strictly meeting WCAG AA >= 4.5:1 ratio)

## 4. Typography
- **Primary Body & Display**: Clean, modern grotesque sans (`Inter`, system UI fallback) for optimal readability and modern polish.
- **Technical & Metrics**: Sharp monospace (`JetBrains Mono`, `ui-monospace`, `monospace`) for code snippets, telemetry tags, match stats, and terminal labels.
- **Rule**: Monospace is used intentionally for technical metadata and controls, never as arbitrary bloated heading decoration.

## 5. Passions & Thematic Integration
- **Football & Gaming**:
  - Interactive mini-feature: An accessible retro arcade / penalty mini-game modal (or terminal drawer) with playful easter eggs and interactive score.
  - Tactical badges: Experience and project cards feature clean match-sheet / telemetry badges (role, tech stack, live status).
  - Achievement toasts: Subtle micro-interactions acknowledging explorations (e.g., viewing live demos, toggling theme, scoring a goal).
- **Professional Integrity**:
  - Authentic data only: Real GitHub links, real projects, genuine tech skills, verified experience.
  - Zero fabricated metrics or fake reviews.

## 6. Functional & Accessibility Commitments
- **Bilingual**: Full French (FR) and English (EN) translation support via existing i18next configuration.
- **Themes**: Dual-mode (Dark / Light) with verified color contrast and no broken elements.
- **Keyboard & Mobile**: 100% keyboard navigable with visible focus rings (`focus-visible:ring-2`), no horizontal overflow, and min 44px touch targets.
