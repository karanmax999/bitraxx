# Requirements Document

## Introduction

A crypto presale landing page built with React, TypeScript, Tailwind CSS, and shadcn/ui. The page features a dark glassmorphism aesthetic with 3D-ish cards, glowing progress bars, and animated sections. It supports wallet connection, live presale progress tracking, and Web3 UX best practices. Sections include: Hero, Stats, Progress, Tokenomics, Stages, Roadmap, and Footer.

## Glossary

- **Landing_Page**: The full single-page application rendered at the root route
- **Hero_Section**: The top-of-page section with headline, CTA, and stats card
- **Stats_Section**: A row of key presale metrics (raised, participants, token price, etc.)
- **Progress_Section**: Visual display of presale funding progress toward a hard cap
- **Tokenomics_Section**: Breakdown of token allocation by category
- **Stages_Section**: Display of presale stages with pricing and status per stage
- **Roadmap_Section**: Animated timeline of project milestones
- **Footer_Section**: Bottom section with links, socials, and legal disclaimer
- **Wallet_Connect**: UI flow for connecting a Web3 wallet (e.g. MetaMask, WalletConnect)
- **Presale_Progress**: Live or mock data representing amount raised vs. hard cap
- **Glassmorphism**: Visual style using frosted-glass backgrounds (bg-white/5, backdrop-blur, border-white/10)
- **Hard_Cap**: The maximum fundraising target for the presale
- **Token**: The cryptocurrency being sold in the presale

## Requirements

### Requirement 1: Project Setup

**User Story:** As a developer, I want a properly configured Next.js/React project with shadcn, Tailwind CSS, and TypeScript, so that I can build and extend the landing page reliably.

#### Acceptance Criteria

1. THE Landing_Page SHALL be implemented using React with TypeScript and Tailwind CSS
2. THE Landing_Page SHALL include shadcn/ui as the component library
3. THE Landing_Page SHALL include lucide-react for icons
4. THE Landing_Page SHALL use a dark base theme (zinc-950 background) across all sections

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want to see a compelling hero section with a headline, description, CTAs, and a stats card, so that I immediately understand the presale value proposition.

#### Acceptance Criteria

1. THE Hero_Section SHALL render the provided `glassmorphism-trust-hero.tsx` component without modification to its structure or styling
2. THE Hero_Section SHALL display a headline, subheadline, and two CTA buttons
3. THE Hero_Section SHALL display a glassmorphism stats card with presale-relevant metrics
4. WHEN the page loads, THE Hero_Section SHALL animate each element in sequence using fade-slide-in keyframes with staggered delays
5. THE Hero_Section SHALL include a marquee of partner/backer logos that scrolls continuously

---

### Requirement 3: Stats Section

**User Story:** As a visitor, I want to see key presale statistics at a glance, so that I can quickly assess the project's traction.

#### Acceptance Criteria

1. THE Stats_Section SHALL display at least four metrics: total raised, number of participants, current token price, and days remaining
2. THE Stats_Section SHALL render each metric inside a glassmorphism card with a border-white/10 border and backdrop-blur
3. WHEN a stat card is hovered, THE Stats_Section SHALL apply a subtle upward translate transition
4. THE Stats_Section SHALL use mock data that can be replaced with live Web3 data

---

### Requirement 4: Presale Progress Section

**User Story:** As a visitor, I want to see how much of the presale has been filled, so that I understand urgency and scarcity.

#### Acceptance Criteria

1. THE Progress_Section SHALL display a progress bar showing amount raised vs. hard cap
2. THE Progress_Section SHALL render the progress bar with a glowing gradient (e.g. from-violet-500 to-cyan-400) and a box-shadow glow effect
3. THE Progress_Section SHALL display the percentage filled, amount raised, and hard cap value as text
4. WHEN the progress value changes, THE Progress_Section SHALL animate the bar width smoothly using a CSS transition
5. THE Progress_Section SHALL display the current presale stage label above the progress bar

---

### Requirement 5: Tokenomics Section

**User Story:** As a potential investor, I want to see how tokens are allocated, so that I can evaluate the project's fairness and sustainability.

#### Acceptance Criteria

1. THE Tokenomics_Section SHALL display token allocation categories (e.g. Presale, Team, Liquidity, Marketing, Reserve)
2. THE Tokenomics_Section SHALL render each category as a visual bar or card showing percentage and label
3. THE Tokenomics_Section SHALL use distinct accent colors per category for visual differentiation
4. THE Tokenomics_Section SHALL display the total token supply

---

### Requirement 6: Presale Stages Section

**User Story:** As a potential investor, I want to see the presale stages and their pricing, so that I know which stage is active and what price I'll pay.

#### Acceptance Criteria

1. THE Stages_Section SHALL display at least three presale stages with stage name, token price, and allocation per stage
2. THE Stages_Section SHALL visually distinguish the active stage from completed and upcoming stages
3. WHEN a stage is completed, THE Stages_Section SHALL render it with a muted/dimmed style and a "Completed" badge
4. WHEN a stage is active, THE Stages_Section SHALL render it with a glowing border and an "Active" badge with a pulsing indicator
5. THE Stages_Section SHALL display each stage inside a glassmorphism card

---

### Requirement 7: Roadmap Section

**User Story:** As a potential investor, I want to see the project roadmap, so that I can evaluate the team's execution plan.

#### Acceptance Criteria

1. THE Roadmap_Section SHALL display at least four milestones in a vertical or horizontal timeline
2. THE Roadmap_Section SHALL animate each milestone into view using a fade-in or slide-in effect
3. THE Roadmap_Section SHALL visually distinguish completed milestones from upcoming ones
4. THE Roadmap_Section SHALL render each milestone with a title, quarter/date label, and description

---

### Requirement 8: Wallet Connect UX

**User Story:** As a presale participant, I want to connect my Web3 wallet, so that I can participate in the presale directly from the landing page.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a "Connect Wallet" button in the navigation or hero CTA area
2. WHEN the Connect Wallet button is clicked, THE Wallet_Connect SHALL display a modal listing supported wallet options (e.g. MetaMask, WalletConnect, Coinbase Wallet)
3. WHEN a wallet is connected, THE Wallet_Connect SHALL display the truncated wallet address (first 6 and last 4 characters) in place of the connect button
4. IF a wallet connection fails, THEN THE Wallet_Connect SHALL display an error message and allow the user to retry
5. THE Wallet_Connect SHALL use mock/simulated connection state since no live blockchain integration is required at this stage

---

### Requirement 9: Footer Section

**User Story:** As a visitor, I want a footer with navigation links, social media links, and a legal disclaimer, so that I can find additional information and understand the project's legal standing.

#### Acceptance Criteria

1. THE Footer_Section SHALL display navigation links (Whitepaper, Audit, FAQ, Contact)
2. THE Footer_Section SHALL display social media icon links (Twitter/X, Telegram, Discord)
3. THE Footer_Section SHALL display a legal disclaimer stating the presale is not available in restricted jurisdictions
4. THE Footer_Section SHALL match the dark glassmorphism theme of the rest of the page

---

### Requirement 10: Responsive Layout

**User Story:** As a visitor on any device, I want the landing page to be fully responsive, so that I have a good experience on mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE Landing_Page SHALL use a single-column layout on mobile (< 768px) and multi-column layout on desktop (>= 1024px)
2. THE Landing_Page SHALL use Tailwind responsive prefixes (sm:, md:, lg:) for all layout-affecting styles
3. THE Landing_Page SHALL not overflow horizontally on any viewport width
