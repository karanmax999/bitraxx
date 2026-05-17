import {
  mysqlTable,
  serial,
  varchar,
  mysqlEnum,
  timestamp,
  decimal,
  bigint,
  int,
  text,
  json,
  index,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  openId: varchar('open_id', { length: 64 }).unique(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  walletAddress: varchar('wallet_address', { length: 42 }).unique(),
  role: mysqlEnum('role', ['user', 'admin']).default('user'),
  referralCode: varchar('referral_code', { length: 16 }).unique(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  lastSignedIn: timestamp('last_signed_in'),
}, (table: any) => {
  return {
    openIdIdx: index('idx_users_openId').on(table.openId),
    walletAddressIdx: index('idx_users_walletAddress').on(table.walletAddress),
  };
});

export const presaleRounds = mysqlTable('presale_rounds', {
  id: serial('id').primaryKey(),
  stage: mysqlEnum('stage', ['Seed', 'Private', 'Public']),
  priceUsd: decimal('price_usd', { precision: 10, scale: 6 }),
  softCapUsd: decimal('soft_cap_usd', { precision: 15, scale: 2 }),
  hardCapUsd: decimal('hard_cap_usd', { precision: 15, scale: 2 }),
  raisedUsd: decimal('raised_usd', { precision: 15, scale: 2 }).default('0'),
  tokensAvailable: bigint('tokens_available', { mode: 'bigint' }),
  tokensSold: bigint('tokens_sold', { mode: 'bigint' }).default(0n),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  status: mysqlEnum('status', ['upcoming', 'live', 'completed', 'paused']).default('upcoming'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').onUpdateNow(),
}, (table: any) => {
  return {
    statusIdx: index('idx_presale_rounds_status').on(table.status),
  };
});

export const kycSubmissions = mysqlTable('kyc_submissions', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  status: mysqlEnum('status', ['Pending', 'Under Review', 'Approved', 'Rejected']).default('Pending'),
  documentUrl: text('document_url'),
  documentType: varchar('document_type', { length: 50 }),
  submittedAt: timestamp('submitted_at').default(sql`CURRENT_TIMESTAMP`),
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: int('reviewed_by'),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').onUpdateNow(),
}, (table: any) => {
  return {
    userIdIdx: index('idx_kyc_submissions_userId').on(table.userId),
    statusIdx: index('idx_kyc_submissions_status').on(table.status),
  };
});

export const purchases = mysqlTable('purchases', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  roundId: int('round_id').notNull(),
  amountUsd: decimal('amount_usd', { precision: 15, scale: 2 }),
  tokenAmount: bigint('token_amount', { mode: 'bigint' }),
  paymentMethod: mysqlEnum('payment_method', ['USDT', 'USDC', 'BTC', 'ETH', 'BNB', 'manual']),
  transactionHash: varchar('transaction_hash', { length: 66 }).unique(),
  status: mysqlEnum('status', ['pending', 'confirmed', 'failed']).default('pending'),
  walletAddress: varchar('wallet_address', { length: 42 }),
  purchasedAt: timestamp('purchased_at').default(sql`CURRENT_TIMESTAMP`),
  confirmedAt: timestamp('confirmed_at'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').onUpdateNow(),
}, (table: any) => {
  return {
    userIdIdx: index('idx_purchases_userId').on(table.userId),
    roundIdIdx: index('idx_purchases_roundId').on(table.roundId),
  };
});

export const vestingSchedules = mysqlTable('vesting_schedules', {
  id: serial('id').primaryKey(),
  purchaseId: int('purchase_id').notNull(),
  userId: int('user_id').notNull(),
  totalTokens: bigint('total_tokens', { mode: 'bigint' }),
  releasedTokens: bigint('released_tokens', { mode: 'bigint' }).default(0n),
  vestingStartDate: timestamp('vesting_start_date'),
  vestingEndDate: timestamp('vesting_end_date'),
  releaseSchedule: json('release_schedule'),
  nextReleaseDate: timestamp('next_release_date'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').onUpdateNow(),
});

export const referrals = mysqlTable('referrals', {
  id: serial('id').primaryKey(),
  referrerId: int('referrer_id').notNull(),
  referredUserId: int('referred_user_id').notNull(),
  referralCode: varchar('referral_code', { length: 16 }),
  rewardPercentage: decimal('reward_percentage', { precision: 5, scale: 2 }),
  rewardUsd: decimal('reward_usd', { precision: 15, scale: 2 }),
  status: mysqlEnum('status', ['pending', 'earned', 'paid']).default('pending'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').onUpdateNow(),
}, (table: any) => {
  return {
    referrerIdIdx: index('idx_referrals_referrerId').on(table.referrerId),
  };
});

export const manualPayments = mysqlTable('manual_payments', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  roundId: int('round_id').notNull(),
  depositAddress: varchar('deposit_address', { length: 100 }).unique(),
  amountUsd: decimal('amount_usd', { precision: 15, scale: 2 }),
  paymentMethod: varchar('payment_method', { length: 50 }),
  status: mysqlEnum('status', ['pending', 'verified', 'rejected']).default('pending'),
  verifiedAt: timestamp('verified_at'),
  verifiedBy: int('verified_by'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').onUpdateNow(),
});

export const auditLogs = mysqlTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: int('user_id'),
  action: varchar('action', { length: 100 }),
  entityType: varchar('entity_type', { length: 50 }),
  entityId: int('entity_id'),
  details: json('details'),
  timestamp: timestamp('timestamp').default(sql`CURRENT_TIMESTAMP`),
}, (table: any) => {
  return {
    timestampIdx: index('idx_audit_logs_timestamp').on(table.timestamp),
  };
});

// Relations
export const usersRelations = relations(users, ({ many }: any) => ({
  kycSubmissions: many(kycSubmissions),
  purchases: many(purchases),
  referrals: many(referrals, { relationName: 'referrer' }),
  referredBy: many(referrals, { relationName: 'referred' }),
}));

export const purchasesRelations = relations(purchases, ({ one }: any) => ({
  user: one(users, { fields: [purchases.userId], references: [users.id] }),
  round: one(presaleRounds, { fields: [purchases.roundId], references: [presaleRounds.id] }),
}));
