# 🚀 Bitraxx BRX Coin Launchpad & Presale Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/bitraxx/brx-launchpad)
[![Tests](https://img.shields.io/badge/tests-3%2F3%20passing-brightgreen)](https://github.com/bitraxx/brx-launchpad)
[![Security](https://img.shields.io/badge/security-audited-blue)](./SECURITY.md)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.9-blue)](https://www.typescriptlang.org)

A **production-grade Web3 presale platform** for the $BRX token, featuring seamless wallet integration, KYC verification, referral rewards, and automated presale stage progression.

**Live Demo:** [https://brx-launchpad.manus.space](https://brx-launchpad.manus.space)  
**Documentation:** [https://docs.brx-launchpad.io](https://docs.brx-launchpad.io)  
**Support:** [support@bitraxx.io](mailto:support@bitraxx.io)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Investor Features
- **One-Click Wallet Connection** - MetaMask & Trust Wallet integration via Wagmi and RainbowKit
- **Multi-Currency Payments** - Native support for USDT, USDC, BTC, ETH, BNB, and manual wire/bank options
- **Real-Time Dashboard** - Live tracking of $BRX balances, pending purchases, and token claims
- **KYC Verification** - Secure image and document upload with real-time status and rejection-feedback queue
- **Referral Program** - Automatic 5% reward calculations on referred investor purchases using custom referral codes
- **Automated Claiming** - Claims vested tokens directly to a linked Web3 wallet upon phase maturity
- **Transaction History** - Comprehensive historical log of all purchase operations, transaction hashes, and status states

### 🏢 Admin Features
- **User Management** - Direct control over user records, wallet linkages, roles (`user` vs `admin`), and signup states
- **KYC Approval Queue** - Direct review dashboard to approve, reject, or comment on pending identity submissions
- **Presale Controls** - Administrative overrides to start, pause, resume, or terminate active presale phases
- **Liquidity Monitoring** - Real-time calculations of total funds raised across all supported chains and payment options
- **Automated Stage Progression** - Built-in heartbeat cron schedules to auto-progress stages based on hard cap hits
- **Audit Logging** - Cryptographically stable ledger records detailing every critical admin action and system operation

### 🎨 UI/UX Features
- **Futuristic Dark Theme** - Beautiful glassmorphic design highlighted by neon cyan, deep purple, and vivid magenta accents
- **Smooth Animations** - High-performance 300ms transitions and interactive micro-animations powered by Framer Motion
- **Responsive Design** - Fluid and adaptive grid layouts optimized for mobile, tablet, and ultra-wide desktop monitors
- **Glassmorphism Effects** - Sleek card layers with premium backdrop filters, custom glow maps, and rich borders
- **Real-Time Updates** - Live progress meters and interactive counters dynamically displaying presale status
- **Accessibility** - Accessible DOM structure aligning strictly with WCAG 2.1 AA guidelines

### 🔐 Security Features
- **OAuth 2.0 Authentication** - Institutional identity management integrated with the Manus OAuth portal
- **Rate Limiting** - IP-based request throttles via Express-Rate-Limit protecting against brute-force and DDoS attempts
- **Input Validation** - High-strictness type validations using Zod schemas for all backend endpoints and routers
- **Helmet.js Security Headers** - Production-grade HTTP headers enforcing Content Security Policy (CSP), CORS, and XSS protection
- **Encrypted Storage** - Secure KYC documents uploaded directly to encrypted S3 Buckets using signed URL access
- **Audit Logging** - Automated trace logging recording database mutation payloads and administrative actor fingerprints

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `18.0.0` or higher (LTS recommended)
- **Package Manager**: `pnpm` (v8.0.0+) or `npm`/`yarn`
- **Database**: MySQL 8.0+ or TiDB instance
- **Web3 Client**: MetaMask, Trust Wallet, or any WalletConnect-compatible wallet

### 5-Minute Setup

```bash
# 1. Clone the repository
git clone https://github.com/bitraxx/brx-launchpad.git
cd brx-launchpad

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your credentials (database, oauth, etc.)

# 4. Generate & Push Database Schema
pnpm db:generate
pnpm db:push

# 5. Seed Initial Presale Stages
pnpm db:seed

# 6. Start the development server
pnpm dev
```

**Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Landing Page │ Dashboard │ KYC │ Admin Panel       │   │
│  │  Referrals    │ Tokenomics │ Roadmap               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              tRPC API Layer (Express 4)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Presale │ Purchases │ KYC │ Vesting │ Admin         │   │
│  │ Referrals │ Wallet │ Auth                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│            Database Layer (MySQL + Drizzle ORM)            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Users │ Presale Rounds │ Purchases │ KYC │ Vesting │   │
│  │ Referrals │ Manual Payments │ Audit Logs            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              External Services                             │
│  ┌──────────────┬──────────────┬──────────────┐           │
│  │ Blockchain   │ S3 Storage   │ Email Service│           │
│  │ (Wagmi/Viem) │ (KYC Docs)   │ (Notifications)         │
│  └──────────────┴──────────────┴──────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Signup & Identity:** The investor signs up via Manus OAuth 2.0 → Server creates a user record → Server automatically maps their unique referral code.
2. **Wallet Connection:** The frontend invokes Wagmi/RainbowKit to request a signature from the investor's MetaMask/Trust Wallet → Verifies ownership → Binds the address to the user account.
3. **KYC Verification:** Investor uploads identification documents to a secure pre-signed AWS S3 URL → Creates a pending entry in the database → Admin accepts/rejects through the Admin Dashboard.
4. **Purchase Pipeline:** Investor initiates a buy sequence → Selects target crypto currency (USDT, USDC, BTC, ETH, BNB) → Approves contract transaction via wallet (or uploads proof for manual bank transfer) → Server creates purchase records in `purchases` table.
5. **Vesting & Claims:** Heartbeat cron processes state updates and vesting schedules → Tokens mature incrementally → Investor triggers claims which are dispersed directly to the linked address.
6. **Referral Reward Flow:** Purchase triggers hook verifying if the buyer was referred → Server computes a 5% reward on the USD purchase value → Credits referrer's balance.

### Database Schema

We use **Drizzle ORM** with **MySQL 8.0+** to model our domain. The schema consists of 8 core tables:

- **`users`** - User profile records, role configurations (`user`, `admin`), linked Web3 wallet, and unique referral codes.
- **`presale_rounds`** - Configuration metadata for presale stages (`Seed`, `Private`, `Public`), tracking price parameters, caps, raises, and stage flags.
- **`kyc_submissions`** - Tracking identity submissions containing document URLs, reviewer feedback, verification statuses (`Pending`, `Under Review`, `Approved`, `Rejected`), and timestamps.
- **`purchases`** - Purchase records mapping users to their specific rounds, documenting transaction hashes, raw token output, status flags (`pending`, `confirmed`, `failed`), and USD prices.
- **`vesting_schedules`** - Tracks token lockup matrices per purchase, releasing tokens dynamically based on maturity dates.
- **`referrals`** - Connects referral conversions back to referrers, calculating reward allocations and tracking payout schedules.
- **`manual_payments`** - Records deposit details, currency amounts, and transaction verifications for offline bank or wire transfers.
- **`audit_logs`** - Cryptographically logs all administrator and security-sensitive interactions, recording IP addresses, user hashes, changed attributes, and action payloads.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|:---|:---|:---|
| **Next.js** | `14.2.5` | Production-grade React meta-framework |
| **React** | `18` | Declarative UI rendering |
| **TypeScript** | `5.x` | Static type checks |
| **Tailwind CSS** | `3.4.1` | Utility-first responsive styling and theme engines |
| **Framer Motion** | `11.2.10` | Sleek CSS/SVG animations and transitions |
| **Wagmi** | `2.10.2` | React hooks for Ethereum wallet actions |
| **RainbowKit** | `2.1.2` | Clean Web3 wallet connection UI |
| **Viem** | `2.15.1` | Low-level Ethereum/EVM abstraction layer |
| **tRPC (Client)** | `11.0.0-rc` | Type-safe end-to-end API querying |
| **React Query** | `5.45.0` | Server-state caching and state syncing |
| **Number Flow** | `0.6.0` | Premium reactive counting animations for rates and tickers |

### Backend
| Technology | Version | Purpose |
|:---|:---|:---|
| **Express** | `4.19.2` | Solid HTTP router core |
| **Node.js** | `18+` | Server runtime engine |
| **tRPC (Server)** | `11.0.0-rc` | Typesafe API routing matching frontend context |
| **Drizzle ORM** | `0.30.10` | Type-safe SQL query generation and mapping |
| **MySQL2** | `3.10.1` | Fast, asynchronous MySQL database driver |
| **Zod** | `3.23.8` | Backend runtime input validations |
| **Helmet** | `7.1.0` | Comprehensive HTTP request header hardening |
| **Express Rate Limit** | `7.0.0` | Throttling mechanism protecting endpoints against loops |
| **Node Cron** | `3.0.3` | Scheduled background task executors (presale checks, vesting releases) |
| **Sentry Node** | `8.0.0` | Real-time production application error tracing |

### Database
| Technology | Version | Purpose |
|:---|:---|:---|
| **MySQL / TiDB** | `8.0+` | Highly performant relational database layer |
| **Drizzle Kit** | `0.20.14` | Database migrations and generation tooling |

### DevOps & Testing
| Technology | Version | Purpose |
|:---|:---|:---|
| **Vitest** | `1.0.0` | Blazing-fast unit and API integration testing runner |
| **Docker** | Latest | Containerization platform for consistent deployments |
| **GitHub Actions** | Latest | Automatic CI/CD build, lint, check, and test suite pipeline |

---

## 📦 Installation

### System Requirements
Before proceeding, confirm your environment fulfills these minimum system requirements:
```bash
# Check Node.js version (Requires 18.0.0 or higher)
node --version

# Check pnpm version (Requires 8.0.0 or higher)
pnpm --version
```

### Step-by-Step Installation

**1. Clone the Repository**
```bash
git clone https://github.com/bitraxx/brx-launchpad.git
cd brx-launchpad
```

**2. Install Package Dependencies**
```bash
pnpm install
```

**3. Set Up Environment Variables**
Generate a fresh environment configuration file by copying the template file:
```bash
cp .env.example .env
```

Open `.env` in your preferred editor and populate the keys (detailed descriptions in [Configuration](#-configuration)):
```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/brx_launchpad

# Server
PORT=3000
NODE_ENV=development

# OAuth (Manus Portal)
VITE_APP_ID=your_manus_app_id
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OAUTH_SERVER_URL=https://api.manus.im
JWT_SECRET=your_secret_key_here

# Web3 (Wagmi / WalletConnect)
NEXT_PUBLIC_WAGMI_PROJECT_ID=your_walletconnect_project_id

# Storage (S3 KYC Document Uploads)
S3_BUCKET=your_bucket_name
S3_REGION=us-east-1
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key

# External Integration APIs
BUILT_IN_FORGE_API_KEY=your_api_key
BUILT_IN_FORGE_API_URL=https://api.manus.im
```

**4. Set Up Database Schema & Migrations**
We use Drizzle to structure and synchronize the database. Run the following to generate and apply schemas:
```bash
# Generate the migration files
pnpm db:generate

# Apply schemas directly to the MySQL database
pnpm db:push
```

**5. Seed Initial Data**
Populate your database with the default presale rounds (Seed, Private, Public) to start testing:
```bash
pnpm db:seed
```

**6. Start Development Servers**
Launch the hot-reloading Next.js dev server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required in Production |
|:---|:---|:---|:---|
| `DATABASE_URL` | Full MySQL connection string with schema credentials | `mysql://...` | Yes |
| `PORT` | Local network port for development server execution | `3000` | No |
| `NODE_ENV` | Environment identifier (`development`, `production`, `test`) | `development` | Yes |
| `JWT_SECRET` | Cryptographic secret for signing session tokens (min 32 chars) | None | Yes |
| `VITE_APP_ID` | OAuth Client ID generated from the Manus developer portal | None | Yes |
| `VITE_OAUTH_PORTAL_URL` | Root URL for the Manus OAuth portal login system | `https://oauth.manus.im` | Yes |
| `NEXT_PUBLIC_WAGMI_PROJECT_ID` | WalletConnect dashboard project ID for RainbowKit | None | Yes |
| `S3_BUCKET` | Dedicated AWS S3 bucket name for KYC file uploads | None | Yes |
| `S3_REGION` | Regional code matching bucket placement | `us-east-1` | Yes |
| `S3_ACCESS_KEY` | AWS IAM Access Key containing writing permissions | None | Yes |
| `S3_SECRET_KEY` | AWS IAM Secret Key credentials | None | Yes |
| `SENTRY_DSN` | Sentry DSN endpoint for real-time exception logging | None | No |

### Presale Configuration

Configure phase stages (`Seed`, `Private`, `Public`), token limits, soft/hard caps, and starting costs through the database seeding configuration (`server/seed.ts`):

```typescript
const rounds = [
  {
    stage: 'Seed',
    priceUsd: '0.005000',
    softCapUsd: '100000.00',
    hardCapUsd: '500000.00',
    tokensAvailable: 100000000n, // 100M BRX
    status: 'live', // Active on startup
  },
  {
    stage: 'Private',
    priceUsd: '0.010000',
    softCapUsd: '500000.00',
    hardCapUsd: '2000000.00',
    tokensAvailable: 200000000n, // 200M BRX
    status: 'upcoming',
  },
  {
    stage: 'Public',
    priceUsd: '0.020000',
    softCapUsd: '1000000.00',
    hardCapUsd: '5000000.00',
    tokensAvailable: 300000000n, // 300M BRX
    status: 'upcoming',
  }
];
```

To update directly in MySQL, utilize this script:
```sql
INSERT INTO presale_rounds (stage, price_usd, soft_cap_usd, hard_cap_usd, tokens_available, status)
VALUES 
  ('Seed', 0.005, 100000, 500000, 100000000, 'upcoming'),
  ('Private', 0.01, 500000, 2000000, 200000000, 'upcoming'),
  ('Public', 0.02, 1000000, 5000000, 300000000, 'upcoming');
```

### Vesting Configuration

Configure standard monthly vesting and cliff schedules inside the utility configuration files (`lib/design-system.ts`):

```typescript
export const vestingConfig = {
  defaultMonthlyRelease: 10,  // 10% of purchased tokens released every 30 days
  minVestingPeriod: 30,       // Minimum duration cliff in days
  maxVestingPeriod: 365,      // Maximum total vesting span (1 year)
};
```

### Referral Configuration

The system incentivizes platform scaling with referral kickbacks, configured within `lib/design-system.ts`:

```typescript
export const referralConfig = {
  defaultRewardPercentage: 5,  // 5% bonus paid to the referrer
  minRewardPercentage: 1,      // Admin-level configurable min threshold
  maxRewardPercentage: 20,     // Max allowed referral percentage limit
};
```

---

## 👨💻 Development

### Project Structure

Our workspace is laid out in a cohesive Next.js and Node package structure:

```
bitraxx/
├── app/                      # Next.js App Router pages and page-level layouts
│   ├── admin/                # Administrative dashboard pages (KYC, Presale, Transactions)
│   ├── assets/               # Local styles and design assets
│   ├── dashboard/            # Investor tracking portal
│   ├── kyc/                  # Client KYC upload UI
│   ├── referrals/            # Custom referral link and progress metrics
│   ├── tokenomics/           # Token distribution metrics and charts
│   ├── roadmap/              # Interactive release calendar
│   ├── error.tsx             # Root error boundary fallback
│   ├── globals.css           # Global Tailwind and custom theme styles
│   ├── layout.tsx            # Root Next.js layout providing Wagmi and Context APIs
│   ├── loading.tsx           # Global fallback skeleton loaders
│   └── page.tsx              # High-conversion Landing Page UI
├── components/               # Shareable UI components (e.g. StagesSection, GlowCard, Buttons)
├── config/                   # Global configuration and platform definitions
├── drizzle/                  # Relational database schemas and migration records
│   ├── schema.ts             # 8 main tables defining platform architecture
│   └── migrations/           # Auto-generated SQL schema diffs
├── hooks/                    # Reusable React hooks for Web3 and tRPC queries
├── lib/                      # Base integrations (db clients, helper libraries, custom themes)
├── public/                   # Static server resources (images, SVGs, vectors)
├── server/                   # Backend engine containing routers, cron services, and testing scripts
│   ├── _core/                # System processes
│   │   └── heartbeat.ts      # Active background presale caps checking and cron systems
│   ├── index.ts              # Primary Express app router hook
│   ├── routers.ts            # Complete set of tRPC procedurals (Public, Protected, Admin)
│   ├── routers.presale.test.ts # Server-side test implementations
│   └── seed.ts               # Database seeding operations script
├── tailwind.config.ts        # Dynamic Tailwind styling customization and presets
├── tsconfig.json             # Core TypeScript compiler configuration
├── package.json              # Platform dependencies, scripts, and details
└── README.md                 # Single source of truth documentation
```

### Development Workflow

Follow this developer workflow during feature engineering:

**1. Launch Development Servers**
Start the hot-reloading dev environment:
```bash
pnpm dev
```

**2. Standard Code Guidelines**
* **Frontend Components:** Edit Next.js view files under `app/**/*.tsx` and reusable modules inside `components/**/*.tsx`.
* **Backend tRPC Procedures:** Modify queries or mutations inside `server/routers.ts`.
* **Database Schema Definitions:** Modify relational layout in `drizzle/schema.ts`.

**3. Hot Reload details**
* Frontend interface structures update instantly using Fast Refresh.
* Backend Express routes and models hot reload automatically via `tsx watch`.
* Database changes require generation and synchronization (see Step 4).

**4. Build and Type Checking**
Verify absolute type safety prior to committing code:
```bash
pnpm check
```

**5. Clean Formatting**
Run Prettier and ESLint checkers:
```bash
pnpm lint
```

### Creating a New Feature

**Example Walkthrough: Appending an `averageTokenPrice` KPI calculation to the Presale Stage**

**1. Modify Drizzle Schema**
Update `drizzle/schema.ts` to add the column to the `presale_rounds` table:
```typescript
// drizzle/schema.ts
export const presaleRounds = mysqlTable('presale_rounds', {
  // ... existing fields
  averageTokenPrice: decimal('average_token_price', { precision: 10, scale: 6 }),
});
```

**2. Generate and Apply Migration**
Apply schema changes directly using command scripts:
```bash
pnpm db:generate
pnpm db:push
```

**3. Expose Procedure in tRPC Router**
Export the updated property through the public procedure:
```typescript
// server/routers.ts
presale: router({
  getMetrics: publicProcedure
    .input(z.object({ roundId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      return await db.query.presaleRounds.findFirst({
        where: eq(presaleRounds.id, input.roundId),
      });
    }),
}),
```

**4. Create a Frontend UI Component**
Develop a React client module consuming the tRPC endpoint:
```typescript
// components/PresaleMetrics.tsx
'use strict';
import { trpc } from '@/lib/trpc';

export function PresaleMetrics({ roundId }: { roundId: number }) {
  const { data: round, isLoading } = trpc.presale.getMetrics.useQuery({ roundId });

  if (isLoading) return <div className="animate-pulse h-12 bg-slate-800 rounded" />;
  if (!round) return <p>Metrics Unavailable</p>;

  return (
    <div className="p-4 bg-slate-900 border border-cyan-500/20 rounded-xl">
      <h3 className="text-cyan-400 font-bold">Average Price Point</h3>
      <p className="text-2xl font-mono text-white">${round.averageTokenPrice || '0.00'}</p>
    </div>
  );
}
```

**5. Integrate the Component Into Pages**
Render the newly designed metrics dashboard card:
```typescript
// app/page.tsx
import { PresaleMetrics } from '@/components/PresaleMetrics';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-extrabold text-cyan-400">Launchpad</h1>
      <div className="mt-6">
        <PresaleMetrics roundId={1} />
      </div>
    </main>
  );
}
```

---

## 🧪 Testing

We use **Vitest** for running our unit and integration tests.

### Run the Complete Test Suite
Execute the entire platform validation test set:
```bash
pnpm test
```

### Run a Targeted Test File
Test single controllers by specifying filenames:
```bash
pnpm test server/routers.presale.test.ts
```

### Run Testing Suite in Live Watch Mode
Keep tests active during code modifications:
```bash
pnpm test --watch
```

### Check Test Coverage
Generate code coverage reports:
```bash
pnpm test --coverage
```

### Test Directory Layout

Test targets are co-located in the directory structure under their respective server subpaths:
- `server/routers.presale.test.ts` - Validates stage updates, progression triggers, and public caps.
- `server/auth.logout.test.ts` - Verifies session revocation and cookies handling.
- `server/routers.purchases.test.ts` - Evaluates buy routes, payment types, and user validation filters.
- `server/routers.kyc.test.ts` - Asserts document submissions, state checks, and rejection controls.

### Technical Test Pattern Example

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from './routers';

describe('tRPC API - Presale Endpoints', () => {
  it('should pull active round data successfully', async () => {
    // Generate context bypass mimicking logged-in session state
    const caller = appRouter.createCaller({ user: undefined });
    const activeRound = await caller.presale.getCurrentRound();
    
    expect(activeRound).toBeDefined();
    expect(activeRound.status).toBe('live');
    expect(Number(activeRound.priceUsd)).toBeGreaterThan(0);
  });
});
```

---

## 🚀 Deployment

### Production Build Pipeline

To build a high-performance production distribution bundle:
```bash
# 1. Compile client assets and build Next.js application
pnpm build

# 2. Confirm output layout
ls -la .next/
```

### Deploy to Manus Hosting (Recommended)

1. Push your latest code changes to your main Git repository.
2. Open the **Manus Developer Management Console** panel.
3. Select **Publish Deployments**.
4. Select your target commit or version tag and press **Deploy**.
5. Wait for the status indicator to verify deployment success.

### Docker Deployment

Deploy in container environments using this multi-stage `Dockerfile`:

```dockerfile
# Stage 1: Build Workspace
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: Runner Execution
FROM node:18-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV=production
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/server /app/server
COPY --from=builder /app/lib /app/lib
COPY --from=builder /app/drizzle /app/drizzle
COPY --from=builder /app/tsconfig.json /app/tsconfig.json

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]
```

**Build Image:**
```bash
docker build -t brx-launchpad:1.0.0 .
```

**Run Container:**
```bash
docker run -d -p 3000:3000 \
  -e DATABASE_URL="mysql://prod_user:prod_pass@prod_mysql_ip:3306/brx_prod" \
  -e JWT_SECRET="your-high-entropy-jwt-secret-key-32-chars-long" \
  -e VITE_APP_ID="your_prod_manus_app_id" \
  --name brx-launchpad-prod brx-launchpad:1.0.0
```

### Production Setup Requirements
* Configure strict SSL profiles (HTTPS only).
* Set `NODE_ENV=production` inside server environments.
* Keep `JWT_SECRET` stored in hardware key vaults or secure platform variables.
* Generate pre-signed URL configurations for AWS S3 containing strict IAM roles.

### Automatic Database Backups

Implement shell crons for secure automated backups:
```bash
# Daily snapshot database dump execution
mysqldump -u prod_user -p'prod_pass' -h db_host database_name > backups/backup_$(date +%Y%m%d_%H%M%S).sql

# Restoring schema state from dump files
mysql -u prod_user -p'prod_pass' -h db_host database_name < backups/backup_target.sql
```

### Metrics & Application Monitoring
- **Error Capturing:** Real-time runtime notifications utilizing custom Sentry integration.
- **Server Health Logs:** Heartbeat metrics tracking memory, database pools, and query performance.
- **Uptime Inspections:** HTTP probes mapping `/api/trpc/presale.getCurrentRound` query outputs.

---

## 📚 API Documentation

Our endpoints are modeled as highly integrated, type-safe tRPC procedure calls:

### Presale Router
Access levels: **Public**

* **`presale.getCurrentRound`**
  - **Description**: Returns details on the active live presale stage.
  - **Input**: `void`
  - **Output**: `{ id: number, stage: 'Seed' \| 'Private' \| 'Public', priceUsd: string, softCapUsd: string, hardCapUsd: string, raisedUsd: string, tokensAvailable: bigint, tokensSold: bigint, startDate: Date, endDate: Date, status: 'live' }`
  
* **`presale.getRoundHistory`**
  - **Description**: Pulls historical log and status of every presale configuration.
  - **Input**: `void`
  - **Output**: `Array<Round>`
  
* **`presale.getProgress`**
  - **Description**: Returns overall presale totals.
  - **Input**: `void`
  - **Output**: `{ totalRaised: number, totalSold: number }`

---

### Purchases Router
Access levels: **Protected (Logged-In User)**

* **`purchases.createPurchase`**
  - **Description**: Initiates a purchase for $BRX tokens.
  - **Input**: `{ roundId: number, amountUsd: string, paymentMethod: 'USDT' \| 'USDC' \| 'BTC' \| 'ETH' \| 'BNB' \| 'manual' }`
  - **Output**: `{ success: boolean, id: number }`
  
* **`purchases.getPurchaseHistory`**
  - **Description**: Fetches the authenticated investor's transaction logs.
  - **Input**: `void`
  - **Output**: `Array<Purchase>`
  
* **`purchases.getPurchaseDetails`**
  - **Description**: Pulls comprehensive receipts matching specific purchase entries.
  - **Input**: `purchaseId: number`
  - **Output**: `Purchase`

---

### KYC Router
Access levels: **Protected (Logged-In User)**

* **`kyc.getStatus`**
  - **Description**: Pulls status tracking logs of the user's KYC application.
  - **Input**: `void`
  - **Output**: `KycSubmission \| undefined`
  
* **`kyc.submitDocument`**
  - **Description**: Registers uploaded document assets and triggers pending reviews.
  - **Input**: `{ documentUrl: string, documentType: string }`
  - **Output**: `{ success: boolean }`

---

### Vesting Router
Access levels: **Protected (Logged-In User)**

* **`vesting.getSchedule`**
  - **Description**: Returns release periods, claimed portions, and unlocking schedules.
  - **Input**: `void`
  - **Output**: `Array<VestingSchedule>`
  
* **`vesting.claimTokens`**
  - **Description**: Disperses matured tokens directly to the linked wallet address.
  - **Input**: `void`
  - **Output**: `{ success: boolean }`

---

### Referrals Router
Access levels: **Protected (Logged-In User)**

* **`referrals.getReferralLink`**
  - **Description**: Pulls the unique referral code assigned to the investor.
  - **Input**: `void`
  - **Output**: `string` (referral code)
  
* **`referrals.getReferralStats`**
  - **Description**: Computes overall commission generated in USD.
  - **Input**: `void`
  - **Output**: `{ totalEarned: number }`

---

### Wallet Router
Access levels: **Protected (Logged-In User)**

* **`wallet.connectWallet`**
  - **Description**: Binds a validated EVM wallet address to the user's account.
  - **Input**: `walletAddress: string` (Must be a valid 42-character EVM address)
  - **Output**: `{ success: boolean }`

---

### Admin Router
Access levels: **Admin Only**

* **`admin.getUsers`**
  - **Description**: Returns lists of all registered users on the system (paginated).
  - **Input**: `{ page: number }`
  - **Output**: `Array<User>`
  
* **`admin.approveKyc`**
  - **Description**: Approves a pending KYC submission, updating user flags.
  - **Input**: `{ submissionId: number, notes?: string }`
  - **Output**: `{ success: boolean }`
  
* **`admin.rejectKyc`**
  - **Description**: Rejects user identification, providing mandatory reasons.
  - **Input**: `{ submissionId: number, reason: string }`
  - **Output**: `{ success: boolean }`
  
* **`admin.pausePresale`**
  - **Description**: Administratively pauses all purchasing activity during the live stage.
  - **Input**: `void`
  - **Output**: `{ success: boolean }`

---

## 🔐 Security

### System Protections
- **Authentication**: High-security token sessions powered by the Manus OAuth portal integration.
- **SQL Injection Prevention**: Parameterized query structures enforced natively by Drizzle ORM.
- **Rate-Throttling**: Custom Express limiters capping requests at `100 requests per 15-minute window` per unique IP.
- **Cross-Site Scripting (XSS)**: Rigid CSP policies coupled with React's built-in JSX entity-escaping processes.
- **Storage Isolation**: User identification uploads are saved inside access-controlled S3 vaults via pre-signed, temporary URLs.
- **Access Management**: Standard users are isolated from `adminProcedure` wrappers using middle-tier role authentication barriers.

### Reporting Security Issues
Do **not** report security defects or vulnerabilities via public GitHub issues. 

Please submit potential security flaws directly to our triage mailbox:
* **Email**: [security@bitraxx.io](mailto:security@bitraxx.io)

Please encrypt reports containing sensitive information and include detailed replication steps.

---

## 🔧 Troubleshooting

### Common Setup Impediments

#### Issue: "Database connection refused"
* **Diagnosis**: The server failed to connect to the MySQL database.
* **Resolution**:
  1. Confirm your local/remote MySQL service is active.
  2. Verify credentials in your `.env` configuration file matching the `DATABASE_URL` format:
     `DATABASE_URL=mysql://<username>:<password>@<host>:<port>/<dbname>`
  3. Validate database firewall rules allowing connections from the Next.js server IP.

#### Issue: "Module not found" or compilation anomalies
* **Diagnosis**: Mismatched cache parameters or missing dependencies.
* **Resolution**:
  1. Reset your IDE TypeScript engine (VS Code: `Ctrl+Shift+P` -> `TypeScript: Restart TS Server`).
  2. Wipe dependencies cache and reinstall packages:
     ```bash
     rm -rf node_modules pnpm-lock.yaml && pnpm install
     ```
  3. Clean compiler output caches:
     ```bash
     rm -rf .next
     ```

#### Issue: "Wallet connection fails or times out"
* **Diagnosis**: Missing project ID configuration or MetaMask injection issue.
* **Resolution**:
  1. Verify the key `NEXT_PUBLIC_WAGMI_PROJECT_ID` is set inside `.env`.
  2. Check browser console logs for Web3 connectivity details.
  3. Clear browser site cookies and try connecting in incognito mode.

#### Issue: "KYC Upload Fails"
* **Diagnosis**: S3 storage authorization failure.
* **Resolution**:
  1. Double check AWS credentials (`S3_ACCESS_KEY`, `S3_SECRET_KEY`) inside `.env`.
  2. Confirm S3 Bucket has appropriate CORS policies configured for pre-signed file uploads.

### Logging & Diagnostic Triage
To run the server in debug mode with verbose logging:
```bash
DEBUG=* pnpm dev
```

Inspect standard output logs directly:
```bash
# Display server log files in real-time
tail -f logs/server.log
```

---

## 🤝 Contributing

We welcome professional contributions! Follow these process requirements to contribute:

### Coding Guidelines
- Develop exclusively in strict TypeScript.
- Match existing Prettier parameters by running formatting prior to submission:
  ```bash
  pnpm lint
  ```
- Write targeted tests (Vitest) confirming all new feature functionality.

### Git Pull Request Pipeline
1. Fork the Bitraxx repository.
2. Branch out from the master branch using a clean identifier:
   `git checkout -b feature/your-feature-name`
3. Commit logical units using standardized Commit Messages (see below).
4. Push your branch to the fork and initiate a Pull Request.

### Standardized Commit Types
We enforce **Conventional Commits**:
- `feat:` - Commits introducing fresh functionality (e.g. `feat: add claim button`).
- `fix:` - Commits correcting a bug or defect (e.g. `fix: patch wallet connect error`).
- `docs:` - Documentation updates only (e.g. `docs: add api parameters`).
- `style:` - Whitespace, formatting, or missing semicolon updates.
- `refactor:` - Clean-up modifications that do not affect runtime outputs.
- `test:` - Adding missing test structures or correcting test coverage gaps.
- `chore:` - Minor configuration changes, lockfile revisions, or packaging tasks.

---

## 📄 License

This software is distributed under the terms of the **MIT License**. For complete guidelines, see [LICENSE](./LICENSE).

---

## 🙏 Acknowledgments
* Web3 client connection mechanisms powered by [Wagmi](https://wagmi.sh) and [RainbowKit](https://www.rainbowkit.com).
* Schema management and type-safety enabled by the team at [Drizzle ORM](https://orm.drizzle.team).
* Dynamic CSS transitions enabled by [Framer Motion](https://www.framer.com/motion) and [Tailwind CSS](https://tailwindcss.com).

---

## 📞 Support
* **Developer Documentation**: [https://docs.brx-launchpad.io](https://docs.brx-launchpad.io)
* **General Inquiries**: [support@bitraxx.io](mailto:support@bitraxx.io)
* **Developer Chat**: [Join Discord Server](https://discord.gg/bitraxx)
* **Social Updates**: [@BitraxxOfficial](https://twitter.com/BitraxxOfficial)

---

## 🗺️ Roadmap
- [ ] Multi-Chain EVM Support (Ethereum, BNB Chain, Arbitrum) (Target: Q3 2026)
- [ ] Smart Contract Vesting Dispersal Audit (Target: Q4 2026)
- [ ] Decentralized DAO Voting Mechanisms for stage cost updates (Target: Q1 2027)

---

**Last Updated:** May 2026  
**Version:** `1.0.0`  
**Maintainer:** Bitraxx Core Operations Team
