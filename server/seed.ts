import { getDb } from '../lib/db';
import { presaleRounds } from '../drizzle/schema';

async function seed() {
  console.log('[Seed] Initializing database seeding...');
  const db = await getDb();
  if (!db) throw new Error('Database connection failed');

  // Seed presale rounds
  console.log('[Seed] Seeding presale rounds...');
  await db.insert(presaleRounds).values([
    {
      stage: 'Seed',
      priceUsd: '0.005',
      softCapUsd: '100000',
      hardCapUsd: '500000',
      tokensAvailable: 100000000n,
      status: 'live',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      stage: 'Private',
      priceUsd: '0.01',
      softCapUsd: '500000',
      hardCapUsd: '2000000',
      tokensAvailable: 200000000n,
      status: 'upcoming',
      startDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
    {
      stage: 'Public',
      priceUsd: '0.02',
      softCapUsd: '1000000',
      hardCapUsd: '5000000',
      tokensAvailable: 300000000n,
      status: 'upcoming',
      startDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  ]);

  console.log('✓ [Seed] Database seeded successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('✗ [Seed] Seeding failed:', err);
  process.exit(1);
});
