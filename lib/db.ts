import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema';
import * as dotenv from 'dotenv';
dotenv.config();

let _db: MySql2Database<typeof schema> | null = null;
let _pool: mysql.Pool | null = null;

const MAX_RETRIES = 3;

async function createPool(retries = 0): Promise<mysql.Pool> {
  if (!process.env.DATABASE_URL) {
    throw new Error('[Database] DATABASE_URL environment variable is not set.');
  }
  try {
    const pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      // Vercel serverless: keep pool size low to avoid connection exhaustion
      connectionLimit: process.env.NODE_ENV === 'production' ? 2 : 10,
      maxIdle: 2,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
    // Verify pool is reachable
    const conn = await pool.getConnection();
    conn.release();
    return pool;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      const delay = 200 * Math.pow(2, retries);
      console.warn(`[Database] Connection attempt ${retries + 1} failed. Retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      return createPool(retries + 1);
    }
    console.error('[Database] All connection attempts failed:', error);
    throw new Error('Database connection failed after maximum retries');
  }
}

export async function getDb(): Promise<MySql2Database<typeof schema>> {
  if (!_db) {
    if (!_pool) {
      _pool = await createPool();
    }
    _db = drizzle(_pool, {
      schema,
      mode: 'default',
      logger: process.env.NODE_ENV === 'development',
    });
  }
  return _db;
}
