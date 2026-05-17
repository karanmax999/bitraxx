# 🚀 Bitraxx BRX Launchpad — Launch Checklist

**Target: Vercel · Auth: Sign-In with Ethereum (SIWE) · DB: MySQL**

---

## ✅ Code Quality

- [ ] `pnpm test` — All unit tests passing
- [ ] `pnpm check` — TypeScript compiles with zero errors
- [ ] `pnpm build` — Production build succeeds (check `.next/` output)
- [ ] No `console.log` statements in production code (removed by `compiler.removeConsole`)
- [ ] Run `pnpm audit` — Zero critical/high vulnerabilities

---

## 🔐 Environment Variables (Vercel Dashboard)

Add these in **Vercel → Settings → Environment Variables** before deploying:

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | ✅ | MySQL connection string (PlanetScale / Railway) |
| `SESSION_SECRET` | ✅ | 32+ char random string for iron-session encryption |
| `NEXT_PUBLIC_WAGMI_PROJECT_ID` | ✅ | From cloud.walletconnect.com |
| `NODE_ENV` | ✅ | Set to `production` |
| `NEXT_PUBLIC_APP_URL` | ✅ | Your Vercel domain e.g. `https://bitraxx.vercel.app` |
| `S3_BUCKET` | Optional | For KYC doc uploads |
| `S3_REGION` | Optional | e.g. `us-east-1` |
| `S3_ACCESS_KEY` | Optional | AWS IAM key |
| `S3_SECRET_KEY` | Optional | AWS IAM secret |
| `SENTRY_DSN` | Optional | Error tracking |

**Generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ Database Setup

- [ ] Production MySQL database created (PlanetScale / Railway / AWS RDS)
- [ ] `DATABASE_URL` points to production DB
- [ ] Run schema push: `pnpm db:push`
- [ ] Run presale seed: `pnpm db:seed`
- [ ] Run admin seed: `pnpm tsx scripts/seed-admin.ts --wallet 0xYOUR_ADMIN_WALLET`
- [ ] Verify: `SELECT COUNT(*) FROM presale_rounds;` → returns 3
- [ ] Database backups configured (daily minimum)

---

## 🔗 Web3 / WalletConnect

- [ ] WalletConnect Cloud project created at [cloud.walletconnect.com](https://cloud.walletconnect.com)
- [ ] Production domain added to WalletConnect allowed origins
- [ ] `NEXT_PUBLIC_WAGMI_PROJECT_ID` set in Vercel
- [ ] MetaMask test connection verified on staging
- [ ] SIWE sign-in flow tested end-to-end

---

## 🌐 Vercel Deployment

- [ ] Repository connected to Vercel project
- [ ] Build command: `pnpm build`
- [ ] Output directory: `.next`
- [ ] All environment variables set in Vercel dashboard
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate auto-provisioned by Vercel ✓

---

## 📊 Monitoring

- [ ] Sentry DSN configured (optional but recommended)
- [ ] Vercel Analytics enabled (Vercel dashboard → Analytics)
- [ ] Uptime monitoring configured (UptimeRobot / Better Uptime)
  - Monitor: `https://your-domain.com/api/health`
  - Expected: HTTP 200, response contains `"status":"ok"`

---

## 🔬 Post-Deployment Smoke Tests

Run after every deployment:

```bash
# Health check
curl https://your-domain.vercel.app/api/health

# Presale round (expect 200 or NOT_FOUND if DB not seeded)
curl "https://your-domain.vercel.app/api/trpc/presale.getCurrentRound?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D"

# Presale progress
curl "https://your-domain.vercel.app/api/trpc/presale.getProgress?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D"
```

**Manual browser flow:**
1. Connect MetaMask → SIWE sign prompt appears
2. Sign message → redirected/session established
3. `/dashboard` loads presale data
4. `/kyc` upload form renders
5. `/admin` returns 403 for non-admin wallets
6. Disconnect wallet → session cleared

---

## ⚡ Performance Targets

| Metric | Target |
|---|---|
| Homepage LCP | < 2.5s |
| API health response | < 100ms |
| tRPC presale queries | < 500ms (p95) |
| Lighthouse Performance | > 85 |
| Lighthouse Accessibility | > 95 |

---

## 🔄 Rollback Plan

If critical issues occur after launch:

1. **Vercel**: Go to Deployments → select previous deployment → **Promote to Production**
2. **Database**: Restore from backup snapshot
3. **Notify users**: Update status page / social channels

---

## 🎉 Go-Live Criteria

**Launch is successful when:**
- [ ] Homepage loads < 2s
- [ ] SIWE wallet connection works (MetaMask + WalletConnect)
- [ ] Users can see presale progress
- [ ] Purchase flow completes without errors
- [ ] KYC submission works
- [ ] Admin panel accessible only to admin wallets
- [ ] Referral links generate and track correctly
- [ ] `/api/health` returns 200
- [ ] Zero critical errors in Vercel function logs
