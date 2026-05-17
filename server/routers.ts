import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getDb } from '../lib/db';
import { 
  presaleRounds, 
  purchases, 
  kycSubmissions, 
  vestingSchedules, 
  referrals, 
  users,
  manualPayments,
  auditLogs
} from '../drizzle/schema';
import { eq, desc, and, sql } from 'drizzle-orm';

const t = initTRPC.context<{ user?: any }>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });
  }
  return next({ ctx: { user: ctx.user } });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next();
});

export const appRouter = router({
  presale: router({
    getCurrentRound: publicProcedure.query(async () => {
      try {
        const db = await getDb();
        const round = await db.query.presaleRounds.findFirst({
          where: eq(presaleRounds.status, 'live'),
        });
        if (!round) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'No active presale round found' });
        }
        return round;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error('[Presale] Error getting current round:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch presale round' });
      }
    }),
    getRoundHistory: publicProcedure.query(async () => {
      try {
        const db = await getDb();
        return await db.query.presaleRounds.findMany({
          orderBy: [desc(presaleRounds.startDate)],
        });
      } catch (error) {
        console.error('[Presale] Error getting round history:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch round history' });
      }
    }),
    getProgress: publicProcedure.query(async () => {
      try {
        const db = await getDb();
        const result = await db
          .select({
            totalRaised: sql<number>`sum(${presaleRounds.raisedUsd})`,
            totalSold: sql<number>`sum(${presaleRounds.tokensSold})`,
          })
          .from(presaleRounds);
        return result[0];
      } catch (error) {
        console.error('[Presale] Error getting progress:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch progress' });
      }
    }),
    getRoundDetails: publicProcedure.input(z.number()).query(async ({ input }) => {
      try {
        const db = await getDb();
        const round = await db.query.presaleRounds.findFirst({
          where: eq(presaleRounds.id, input),
        });
        if (!round) throw new TRPCError({ code: 'NOT_FOUND', message: 'Round not found' });
        return round;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error('[Presale] Error getting round details:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch round details' });
      }
    }),
  }),

  purchases: router({
    getPurchaseHistory: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        return await db.query.purchases.findMany({
          where: eq(purchases.userId, ctx.user.id),
          orderBy: [desc(purchases.purchasedAt)],
        });
      } catch (error) {
        console.error('[Purchases] Error getting purchase history:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch purchase history' });
      }
    }),
    createPurchase: protectedProcedure
      .input(z.object({
        roundId: z.number(),
        amountUsd: z.string(),
        paymentMethod: z.enum(['USDT', 'USDC', 'BTC', 'ETH', 'BNB', 'manual']),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          const db = await getDb();
          const newPurchase = await db.insert(purchases).values({
            userId: ctx.user.id,
            roundId: input.roundId,
            amountUsd: input.amountUsd,
            paymentMethod: input.paymentMethod,
            status: 'pending',
            walletAddress: ctx.user.walletAddress,
          });
          return { success: true, id: newPurchase[0].insertId };
        } catch (error) {
          console.error('[Purchases] Error creating purchase:', error);
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create purchase' });
        }
      }),
    getPurchaseDetails: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        const purchase = await db.query.purchases.findFirst({
          where: and(eq(purchases.id, input), eq(purchases.userId, ctx.user.id)),
        });
        if (!purchase) throw new TRPCError({ code: 'NOT_FOUND', message: 'Purchase not found' });
        return purchase;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error('[Purchases] Error getting purchase details:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch purchase details' });
      }
    }),
  }),

  kyc: router({
    getStatus: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        return await db.query.kycSubmissions.findFirst({
          where: eq(kycSubmissions.userId, ctx.user.id),
          orderBy: [desc(kycSubmissions.submittedAt)],
        });
      } catch (error) {
        console.error('[KYC] Error getting status:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch KYC status' });
      }
    }),
    submitDocument: protectedProcedure
      .input(z.object({
        documentUrl: z.string().url(),
        documentType: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          const db = await getDb();
          await db.insert(kycSubmissions).values({
            userId: ctx.user.id,
            documentUrl: input.documentUrl,
            documentType: input.documentType,
            status: 'Pending',
          });
          return { success: true };
        } catch (error) {
          console.error('[KYC] Error submitting document:', error);
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to submit document' });
        }
      }),
    getSubmissionHistory: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        return await db.query.kycSubmissions.findMany({
          where: eq(kycSubmissions.userId, ctx.user.id),
          orderBy: [desc(kycSubmissions.submittedAt)],
        });
      } catch (error) {
        console.error('[KYC] Error getting submission history:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch submission history' });
      }
    }),
  }),

  vesting: router({
    getSchedule: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        return await db.query.vestingSchedules.findMany({
          where: eq(vestingSchedules.userId, ctx.user.id),
        });
      } catch (error) {
        console.error('[Vesting] Error getting schedule:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch vesting schedule' });
      }
    }),
    getClaimableAmount: protectedProcedure.query(async ({ ctx }) => {
      return { amount: "0" };
    }),
    claimTokens: protectedProcedure.mutation(async ({ ctx }) => {
      return { success: true };
    }),
  }),

  referrals: router({
    getReferralLink: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        const user = await db.query.users.findFirst({
          where: eq(users.id, ctx.user.id),
        });
        return user?.referralCode;
      } catch (error) {
        console.error('[Referrals] Error getting link:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch referral link' });
      }
    }),
    getReferralStats: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        const totalEarned = await db
          .select({ sum: sql<number>`sum(${referrals.rewardUsd})` })
          .from(referrals)
          .where(eq(referrals.referrerId, ctx.user.id));
        return { totalEarned: totalEarned[0].sum || 0 };
      } catch (error) {
        console.error('[Referrals] Error getting stats:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch referral stats' });
      }
    }),
    getReferredUsers: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        return await db.query.referrals.findMany({
          where: eq(referrals.referrerId, ctx.user.id),
        });
      } catch (error) {
        console.error('[Referrals] Error getting referred users:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch referred users' });
      }
    }),
  }),

  wallet: router({
    connectWallet: protectedProcedure.input(z.string().regex(/^0x[a-fA-F0-9]{40}$/)).mutation(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        await db.update(users)
          .set({ walletAddress: input })
          .where(eq(users.id, ctx.user.id));
        return { success: true };
      } catch (error) {
        console.error('[Wallet] Error connecting wallet:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to connect wallet' });
      }
    }),
    getWalletBalance: protectedProcedure.query(async ({ ctx }) => {
      return { balance: "0" };
    }),
  }),

  admin: router({
    getUsers: adminProcedure.input(z.object({ page: z.number().default(1) })).query(async ({ input }) => {
      try {
        const db = await getDb();
        return await db.query.users.findMany({
          limit: 20,
          offset: (input.page - 1) * 20,
        });
      } catch (error) {
        console.error('[Admin] Error getting users:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch users' });
      }
    }),
    approveKyc: adminProcedure.input(z.object({ submissionId: z.number(), notes: z.string().optional() })).mutation(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        await db.update(kycSubmissions)
          .set({ status: 'Approved', reviewedAt: new Date(), reviewedBy: ctx.user.id })
          .where(eq(kycSubmissions.id, input.submissionId));
        return { success: true };
      } catch (error) {
        console.error('[Admin] Error approving KYC:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to approve KYC' });
      }
    }),
    rejectKyc: adminProcedure.input(z.object({ submissionId: z.number(), reason: z.string().min(5) })).mutation(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        await db.update(kycSubmissions)
          .set({ status: 'Rejected', rejectionReason: input.reason, reviewedAt: new Date(), reviewedBy: ctx.user.id })
          .where(eq(kycSubmissions.id, input.submissionId));
        return { success: true };
      } catch (error) {
        console.error('[Admin] Error rejecting KYC:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to reject KYC' });
      }
    }),
    pausePresale: adminProcedure.mutation(async () => {
      try {
        const db = await getDb();
        await db.update(presaleRounds).set({ status: 'paused' }).where(eq(presaleRounds.status, 'live'));
        return { success: true };
      } catch (error) {
        console.error('[Admin] Error pausing presale:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to pause presale' });
      }
    }),
    resumePresale: adminProcedure.mutation(async () => {
      try {
        const db = await getDb();
        await db.update(presaleRounds).set({ status: 'live' }).where(eq(presaleRounds.status, 'paused'));
        return { success: true };
      } catch (error) {
        console.error('[Admin] Error resuming presale:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to resume presale' });
      }
    }),
    terminatePresale: adminProcedure.mutation(async () => {
      try {
        const db = await getDb();
        await db.update(presaleRounds).set({ status: 'completed' }).where(eq(presaleRounds.status, 'live'));
        return { success: true };
      } catch (error) {
        console.error('[Admin] Error terminating presale:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to terminate presale' });
      }
    }),
    getLiquidityStatus: adminProcedure.query(async () => {
      return { totalUsd: "0" };
    }),
    getTransactionLog: adminProcedure.query(async () => {
      try {
        const db = await getDb();
        return await db.query.purchases.findMany({
          orderBy: [desc(purchases.purchasedAt)],
        });
      } catch (error) {
        console.error('[Admin] Error getting transaction log:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch transaction log' });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
