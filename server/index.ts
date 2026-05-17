import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
import { getDb } from '../lib/db';
import { users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import './_core/heartbeat';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.VITE_APP_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '1mb' })); // Prevent large payloads

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use('/trpc', limiter);

// Placeholder for Sentry
// import * as Sentry from "@sentry/node";
// if (process.env.SENTRY_DSN) {
//   Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.NODE_ENV });
// }

const manusAuthMiddleware = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Placeholder for Manus verification
      const mockOpenId = 'manus_user_123'; 
      const db = await getDb();
      const user = await db.query.users.findFirst({
        where: eq(users.openId, mockOpenId),
      });
      if (user) {
        req.user = user;
      }
    }
  } catch (err) {
    console.error('[Auth] Error in auth middleware:', err);
  }
  next();
};

app.use(manusAuthMiddleware);

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  user: (req as any).user,
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ error, type, path, input, ctx, req }) => {
      console.error(`[tRPC Error] on '${path}' [${type}]:`, error);
      // if (process.env.SENTRY_DSN) Sentry.captureException(error);
    },
  }),
);

// Centralized Express Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Express Error]', err);
  // if (process.env.SENTRY_DSN) Sentry.captureException(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
