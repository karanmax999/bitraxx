import cron from 'node-cron';
import { db } from '../../lib/db';
import { presaleRounds, vestingSchedules, purchases } from '../../drizzle/schema';
import { eq, and, lte, gte, sql } from 'drizzle-orm';

// 1. Stage Progression Monitor (every 5 minutes)
cron.schedule('*/5 * * * *', async () => {
  console.log('[Heartbeat] Checking Stage Progression...');
  const liveRound = await db.query.presaleRounds.findFirst({
    where: eq(presaleRounds.status, 'live'),
  });

  if (liveRound) {
    const raisedUsd = parseFloat(liveRound.raisedUsd || '0');
    const hardCapUsd = parseFloat(liveRound.hardCapUsd || '0');

    if (raisedUsd >= hardCapUsd) {
      console.log(`[Heartbeat] Hard cap reached for round ${liveRound.stage}. Moving to next stage...`);
      
      // Mark current as completed
      await db.update(presaleRounds)
        .set({ status: 'completed' })
        .where(eq(presaleRounds.id, liveRound.id));

      // Find next round
      const nextRound = await db.query.presaleRounds.findFirst({
        where: eq(presaleRounds.status, 'upcoming'),
        orderBy: (rounds, { asc }) => [asc(rounds.id)],
      });

      if (nextRound) {
        await db.update(presaleRounds)
          .set({ status: 'live' })
          .where(eq(presaleRounds.id, nextRound.id));
        console.log(`[Heartbeat] Started next round: ${nextRound.stage}`);
      }
    }
  }
});

// 2. Price Adjustment (on stage transition - handled by logic above or external trigger)
// Here we could add logic to update prices if they are dynamic.

// 3. Vesting Release (daily at midnight UTC)
cron.schedule('0 0 * * *', async () => {
  console.log('[Heartbeat] Processing Vesting Releases...');
  const now = new Date();
  
  const pendingVesting = await db.query.vestingSchedules.findMany({
    where: lte(vestingSchedules.nextReleaseDate, now),
  });

  for (const schedule of pendingVesting) {
    // Logic to calculate release amount based on JSON schedule
    // This is a simplified version
    const releaseAmount = BigInt(1000); // Mock amount
    
    await db.update(vestingSchedules)
      .set({
        releasedTokens: (schedule.releasedTokens || 0n) + releaseAmount,
        nextReleaseDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // Next month
      })
      .where(eq(vestingSchedules.id, schedule.id));
  }
});

// 4. Notification Dispatcher
// Mock implementation
const dispatchNotifications = async () => {
  // Logic to send emails or push notifications
};

console.log('[Heartbeat] Scheduler initialized.');
