import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../../server/routers';
import { getDb } from '../../../../lib/db';
import { users } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '../../../../lib/session';

const handler = async (req: Request) => {
  // Resolve user from iron-session cookie
  let user: any = undefined;

  try {
    const session = await getSession();
    if (session.walletAddress) {
      const db = await getDb();
      user = await db.query.users.findFirst({
        where: eq(users.walletAddress, session.walletAddress),
      });
    }
  } catch (err) {
    // Non-fatal: unauthenticated request will simply have no user
    console.warn('[tRPC] Auth resolution failed:', err);
  }

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({ user }),
    onError: ({ error, path }) => {
      console.error(`[tRPC Error] on '${path}':`, error.message);
    },
  });
};

export { handler as GET, handler as POST };
