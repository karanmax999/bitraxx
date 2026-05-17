# Changelog

All notable changes to the Bitraxx Launchpad platform will be documented in this file. 

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (`MAJOR.MINOR.PATCH`).

---

## [1.0.0] - 2026-05-17

This is the **official production-hardened release** of the Bitraxx $BRX Presale Platform & Coin Launchpad, presenting a secure, high-fidelity experience optimized for global investors and administrative compliance.

### ✨ Added
- **Multi-Stage Presale Framework**: Setup support for Seed, Private, and Public investment cycles, presenting custom costs, soft/hard caps, and live raise parameters.
- **Next.js 14 App Router Integration**: Fully converted the client platform into an optimized App Router framework featuring separate route groups (`/admin`, `/dashboard`, `/kyc`, `/referrals`, `/tokenomics`, `/roadmap`).
- **tRPC Backend Routing**: E2E type-safe API routing linking frontend UI components directly to MySQL database triggers with zero manual schema mappings.
- **One-Click Web3 Wallet Binding**: Integrated custom EVM wallet connection portals using Wagmi, Viem, and RainbowKit.
- **Interactive Vesting Schedules**: Programmed a custom vesting calculation system allowing investors to track monthly unlock progress and claim matured tokens directly.
- **Secure KYC Processing Queue**: Formulated document uploading flows utilizing S3 pre-signed URLs with separate admin approval, rejection, and comment tools.
- **Automated Referral Calculations**: Commission engine calculations delivering 5% USD bonuses to investors upon successful referral conversions.
- **Automated Presale Heartbeat**: Background task scheduler (Node Cron) running active presale checks, updating caps, and auto-advancing stages on target threshold completions.
- **Offline Payment Support**: Developed wire and manual bank payment trackers (`manual_payments` table) allowing manual approval pipelines.

### 🎨 UI/UX Additions
- **Glassmorphic Theme**: High-fidelity dark mode with neon cyan, purple, and deep magenta accents using global backdrop-blur parameters.
- **Fluid Micro-Animations**: Smooth, low-latency transitions (300ms) and interactive list hover effects powered by Framer Motion.
- **Dynamic Counters**: Smooth number roll animations for raised amounts, price changes, and percentages powered by React Number Flow.
- **Responsive Layout**: Seamless grids and interactive drawers accommodating smartphones, tablets, and desktop displays.

### 🔐 Security & Hardening
- **Manus OAuth 2.0 Integration**: Institutional-grade developer signups and secure sessions mapping back to the Manus portal.
- **Express-Rate-Limit Defense**: Hardened endpoints using strict rate limiting restricting network abuse (capped at `100 requests per 15-minute window` per IP).
- **Helmet HTTP Headers**: Custom Express security headers enforcing CSP rules, CORS origins, and frame isolation.
- **Drizzle SQL Sanitization**: Parameterized queries across all 8 relational database tables, eliminating SQL injection vulnerability vectors.
- **Sentry Log Tracing**: Integration of Sentry Node SDK for real-time tracking, sorting, and reporting of application runtime exceptions.
- **Role-Based Middlewares**: Middleware guard rails isolating database administration triggers from standard investor clients.

### ⚙️ Database & Reliability
- **TiDB/MySQL Optimized Indexes**: Implemented schema-level database indexing targeting `open_id`, `wallet_address`, `status`, and `timestamp` fields.
- **Relation Maps**: Designed precise structural model relations in Drizzle for user-level nested schemas (`usersRelations`, `purchasesRelations`).
- **Comprehensive Database Seeding**: Pre-loaded configuration seed scripts setup inside `server/seed.ts`.

### 🧪 Automated Testing
- **Vitest Suite**: Integrated Vitest runner verifying controllers, route authentication, and database updates.
- **Integration Tests**: Comprehensive endpoint test cases checking public, protected, and admin procedure pipelines.

---

**Maintainer**: Bitraxx Core Engineering Team  
**Release Coordinator**: Senior Technical Writer & Documentation Specialist
