/**
 * Bitraxx BRX Launchpad — k6 Load Test
 * Usage: k6 run load-test/k6-smoke.js -e BASE_URL=https://your-app.vercel.app
 *
 * Install k6: https://k6.io/docs/getting-started/installation/
 */
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('error_rate');
const presaleLatency = new Trend('presale_latency', true);
const healthLatency = new Trend('health_latency', true);

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '3m', target: 100 },  // Hold at 100 concurrent
    { duration: '2m', target: 200 },  // Spike to 200
    { duration: '3m', target: 200 },  // Hold at 200
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
    error_rate: ['rate<0.01'],
    presale_latency: ['p(95)<800'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'k6-load-test/1.0',
    },
    timeout: '10s',
  };

  // ── Test 1: Homepage ─────────────────────────────────────────────────────
  const homeRes = http.get(`${BASE_URL}/`, params);
  const homeOk = check(homeRes, {
    'homepage status 200': (r) => r.status === 200,
    'homepage has content': (r) => r.body && r.body.length > 100,
  });
  errorRate.add(!homeOk);

  // ── Test 2: Health endpoint ──────────────────────────────────────────────
  const healthStart = Date.now();
  const healthRes = http.get(`${BASE_URL}/api/health`, params);
  healthLatency.add(Date.now() - healthStart);

  const healthOk = check(healthRes, {
    'health status 200': (r) => r.status === 200,
    'health returns ok': (r) => {
      try {
        return JSON.parse(r.body).status === 'ok';
      } catch {
        return false;
      }
    },
  });
  errorRate.add(!healthOk);

  // ── Test 3: Presale current round (public tRPC endpoint) ─────────────────
  const presaleStart = Date.now();
  const presaleRes = http.get(
    `${BASE_URL}/api/trpc/presale.getCurrentRound?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D`,
    params
  );
  presaleLatency.add(Date.now() - presaleStart);

  const presaleOk = check(presaleRes, {
    'presale status 200 or 400': (r) => r.status === 200 || r.status === 400,
    'presale returns JSON': (r) => {
      try {
        JSON.parse(r.body);
        return true;
      } catch {
        return false;
      }
    },
  });
  errorRate.add(!presaleOk);

  // ── Test 4: Presale progress ─────────────────────────────────────────────
  const progressRes = http.get(
    `${BASE_URL}/api/trpc/presale.getProgress?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D`,
    params
  );
  check(progressRes, {
    'progress status ok': (r) => r.status === 200 || r.status === 400,
  });

  sleep(Math.random() * 2 + 0.5); // 0.5–2.5s think time between requests
}

export function handleSummary(data) {
  const p95 = data.metrics.http_req_duration?.values?.['p(95)'];
  const errRate = data.metrics.http_req_failed?.values?.rate;

  console.log('\n══════════════════════════════════════════');
  console.log('  Bitraxx Load Test Summary');
  console.log('══════════════════════════════════════════');
  console.log(`  p95 Response Time : ${p95 ? p95.toFixed(0) + 'ms' : 'N/A'}`);
  console.log(`  Error Rate        : ${errRate ? (errRate * 100).toFixed(2) + '%' : 'N/A'}`);
  console.log(`  Total Requests    : ${data.metrics.http_reqs?.values?.count ?? 'N/A'}`);
  console.log('══════════════════════════════════════════\n');

  return {
    'load-test/results.json': JSON.stringify(data, null, 2),
  };
}
