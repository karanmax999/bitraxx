/**
 * seed-admin.ts — Upsert an admin user by wallet address
 *
 * Usage:
 *   pnpm tsx scripts/seed-admin.ts --wallet 0xYourWalletAddress
 *
 * Safe to run multiple times (idempotent).
 */
import * as dotenv from 'dotenv';
dotenv.config();

import { getDb } from '../lib/db';
import { users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

async function seedAdmin() {
  const walletArg = process.argv.find((a) => a.startsWith('--wallet=')) ??
    process.argv[process.argv.indexOf('--wallet') + 1];
  const walletAddress = walletArg?.replace('--wallet=', '')?.toLowerCase();

  if (!walletAddress || !/^0x[a-f0-9]{40}$/i.test(walletAddress)) {
    console.error('✗ Usage: pnpm tsx scripts/seed-admin.ts --wallet 0xYourAddress');
    process.exit(1);
  }

  console.log(`[Seed Admin] Setting admin role for wallet: ${walletAddress}`);

  const db = await getDb();

  const existing = await db.query.users.findFirst({
    where: eq(users.walletAddress, walletAddress),
  });

  if (existing) {
    await db
      .update(users)
      .set({ role: 'admin', updatedAt: new Date() })
      .where(eq(users.walletAddress, walletAddress));
    console.log(`✓ Updated existing user (ID: ${existing.id}) to admin.`);
  } else {
    const referralCode = `BRX${walletAddress.slice(2, 10).toUpperCase()}`;
    await db.insert(users).values({
      walletAddress,
      role: 'admin',
      referralCode,
    });
    console.log(`✓ Created new admin user with wallet ${walletAddress}.`);
  }

  console.log('✓ Admin seeding complete.');
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('✗ Admin seeding failed:', err);
  process.exit(1);
});
