import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appRouter } from './routers';
import * as dbLib from '../lib/db';
import { TRPCError } from '@trpc/server';

// Mock the database
vi.mock('../lib/db', () => ({
  getDb: vi.fn(),
}));

describe('presale router', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getCurrentRound', () => {
    it('should return active presale round', async () => {
      // Setup mock data
      const mockRound = {
        id: 1,
        stage: 'Private',
        status: 'live',
        priceUsd: '0.08',
      };

      const mockDb = {
        query: {
          presaleRounds: {
            findFirst: vi.fn().mockResolvedValue(mockRound),
          },
        },
      };

      vi.mocked(dbLib.getDb).mockResolvedValue(mockDb as any);

      const caller = appRouter.createCaller({} as any);
      const round = await caller.presale.getCurrentRound();
      
      expect(round).toBeDefined();
      expect(round.status).toBe('live');
      expect(round.stage).toBe('Private');
    });
    
    it('should throw NOT_FOUND error if no active round', async () => {
      const mockDb = {
        query: {
          presaleRounds: {
            findFirst: vi.fn().mockResolvedValue(null),
          },
        },
      };

      vi.mocked(dbLib.getDb).mockResolvedValue(mockDb as any);

      const caller = appRouter.createCaller({} as any);
      
      await expect(caller.presale.getCurrentRound()).rejects.toThrowError(
        new TRPCError({ code: 'NOT_FOUND', message: 'No active presale round found' })
      );
    });

    it('should handle internal database errors gracefully', async () => {
      const mockDb = {
        query: {
          presaleRounds: {
            findFirst: vi.fn().mockRejectedValue(new Error('DB Connection Refused')),
          },
        },
      };

      vi.mocked(dbLib.getDb).mockResolvedValue(mockDb as any);

      const caller = appRouter.createCaller({} as any);
      
      await expect(caller.presale.getCurrentRound()).rejects.toThrowError(
        new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch presale round' })
      );
    });
  });
});
