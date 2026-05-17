# Bitraxx Deployment Guide

This operations-ready manual outlines the requirements, checklists, and procedures for deploying the Bitraxx BRX Launchpad platform to production. 

---

## 📋 Table of Contents
1. [Production Readiness Checklist](#-production-readiness-checklist)
2. [Target Environments](#-target-environments)
   - [Manus Hosting (Recommended)](#1-manus-hosting-recommended)
   - [Docker Containerization](#2-docker-containerization)
   - [Traditional Linux VM (systemd + PM2)](#3-traditional-linux-vm-systemd--pm2)
3. [Database Migrations Policy](#-database-migrations-policy)
4. [Hardening & Production Environment Keys](#-hardening--production-environment-keys)
5. [Monitoring & Health Probes](#-monitoring--health-probes)
6. [Post-Deployment Smoke Testing](#-post-deployment-smoke-testing)

---

## 🏆 Production Readiness Checklist

Before moving any commit or build artifact to the production network, the operations team must verify that each checklist item is completed:

- [ ] **Tests**: All tests are passing successfully (`pnpm test`).
- [ ] **Environment**: Strict production `.env` parameters configured inside safe key vaults.
- [ ] **Database Migrations**: Database schemas are synchronized and migrated with the live database pool.
- [ ] **SSL / TLS Certificates**: Active, valid SSL certificates (HTTPS mandatory) with TLS 1.3 enforced.
- [ ] **OAuth Registrations**: Production app credentials configured inside the Manus Developers Console.
- [ ] **AWS S3 IAM Roles**: Dedicated AWS S3 bucket created for identity verifications with private read permissions and pre-signed write grants.
- [ ] **Sentry Monitoring**: Target DSN configured for tracking runtime failures.
- [ ] **Rate Limiting**: Rate limit parameters enabled across the API endpoints.

---

## 🌐 Target Environments

### 1. Manus Hosting (Recommended)
Our platform is optimized for deploying directly via Manus Hosting pipelines:

1. Push your audited, checked code to the target repository (e.g. `main` or `release` branch).
2. Authenticate and log in to the **Manus Developer Management Console**.
3. Under the target project section, navigate to **Deployments**.
4. Link your Git repository and select the **Production Branch**.
5. Map your secure production environment variables (details in [Hardening](#-hardening--production-environment-keys)).
6. Click **Publish/Deploy** to execute the automatic build pipeline.
7. Verify that the routing engine maps request pathways cleanly.

---

### 2. Docker Containerization
Docker containerization is recommended for Kubernetes, AWS ECS, or standard container service environments:

#### Step 1: Build the Container Image
Generate the container distribution bundle from the workspace root:
```bash
docker build -t bitraxx/brx-launchpad:1.0.0 .
```

#### Step 2: Push to Secure Registry
Push the image to a private container registry (e.g. Amazon ECR, Docker Hub):
```bash
docker tag bitraxx/brx-launchpad:1.0.0 <registry-url>/bitraxx/brx-launchpad:1.0.0
docker push <registry-url>/bitraxx/brx-launchpad:1.0.0
```

#### Step 3: Launch the Service Container
Run the container on the target VM, mapping ports and feeding secure parameters:
```bash
docker run -d -p 3000:3000 \
  --restart=always \
  --name bitraxx-launchpad-prod \
  -e NODE_ENV="production" \
  -e DATABASE_URL="mysql://prod_db_user:prod_db_password@prod_db_host:3306/brx_prod" \
  -e JWT_SECRET="high-entropy-jwt-secret-min-32-chars-long" \
  -e VITE_APP_ID="prod-manus-client-app-id" \
  -e VITE_OAUTH_PORTAL_URL="https://oauth.manus.im" \
  -e NEXT_PUBLIC_WAGMI_PROJECT_ID="prod-wallet-connect-id" \
  -e S3_BUCKET="prod-kyc-documents" \
  -e S3_REGION="us-east-1" \
  -e S3_ACCESS_KEY="AWS-IAM-ACCESS-KEY" \
  -e S3_SECRET_KEY="AWS-IAM-SECRET-KEY" \
  <registry-url>/bitraxx/brx-launchpad:1.0.0
```

---

### 3. Traditional Linux VM (systemd + PM2)
For deploying to standard Ubuntu or Debian cloud VMs (AWS EC2, DigitalOcean, Linode):

#### Step 1: Install Node.js & PM2
Install Node.js LTS, pnpm, and the PM2 process manager globally on the target machine:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm pm2
```

#### Step 2: Clone and Setup Workspace
Clone the repository, download dependencies, and compile assets on the server:
```bash
git clone https://github.com/bitraxx/brx-launchpad.git /var/www/brx-launchpad
cd /var/www/brx-launchpad
pnpm install
pnpm build
```

#### Step 3: Run Database Migrations
Synchronize database schema configurations (see [Database Migrations Policy](#-database-migrations-policy)):
```bash
pnpm db:push
```

#### Step 4: Configure PM2 Launch Process
Create an `ecosystem.config.js` file at the root:
```javascript
module.exports = {
  apps: [{
    name: 'brx-launchpad',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Launch the cluster and configure the VM daemon startup scripts:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🗄️ Database Migrations Policy

- **No Destructive Operations**: Never drop tables or rename critical fields on live databases. If schema updates require deprecating column values, append a new column first, run migration queries, and remove the legacy key in subsequent cycles.
- **Migration Routine**:
  1. Generate SQL migration scripts locally using drizzle-kit:
     ```bash
     pnpm db:generate
     ```
  2. Inspect the generated SQL migrations inside `/drizzle/migrations` to verify compatibility.
  3. Deploy changes during maintenance windows to minimize lockup states. Run:
     ```bash
     pnpm db:push
     ```

---

## 🔐 Hardening & Production Environment Keys

Production variables **MUST** be injected securely at the platform layer. Do not write production parameters to `.env` configuration files committed to Git.

- **`JWT_SECRET`**: Use high-entropy keys consisting of 32+ cryptographically random bytes.
- **`DATABASE_URL`**: Point connection pools to highly secure database shards (e.g. TiDB cloud or isolated AWS Aurora RDS). Keep public access closed, permitting routes exclusively from Next.js server security group origins.
- **`S3_BUCKET` CORS**: Restrict document uploading permissions. Configure policies to allow requests exclusively from your production host address (e.g. `https://brx-launchpad.manus.space`).

---

## 📊 Monitoring & Health Probes

Implement health checks and monitoring to ensure high availability:

- **Liveness Probe**: Keep probes checking host endpoint states:
  - **Endpoint**: `/api/trpc/presale.getCurrentRound`
  - **Expected Output**: HTTP `200 OK`
- **Error Tracking**: Feed runtime exceptions to **Sentry** using production-linked DSN coordinates. Configure alerting criteria to email DevOps engineers on consecutive failures.
- **Nginx Reverse Proxy**: hard-protect the server using reverse proxy configs that strip invalid headers, cache assets, and enforce SSL profiles.

---

## 🔬 Post-Deployment Smoke Testing

Verify that your deploy was successful by running these smoke tests:

1. **Verify Home / Landing Page**: Navigate to the live landing URL. Verify that styles, animations (Framer Motion), and components (GlowCards) load correctly.
2. **Verify Wallet Connections**: Click the wallet connection trigger. Connect an EVM account on MetaMask/Trust Wallet. Confirm the signature is accepted and the linked account state is verified in the dashboard interface.
3. **Verify API Communication**: Navigate to the investor panel dashboard. Confirm that active presale numbers and progress values load instantly without displaying fallback loader screens indefinitely.
4. **Perform Test Purchase**: Process a nominal purchase (USDT/USDC or manual request) using dummy accounts. Verify that records map correctly inside the database structure.
