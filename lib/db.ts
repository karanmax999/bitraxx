import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema';
import * as dotenv from 'dotenv';
dotenv.config();

let _db: MySql2Database<typeof schema> | null = null;
let _pool: mysql.Pool | null = null;

export async function getDb(): Promise<MySql2Database<typeof schema>> {
  if (!_db && process.env.DATABASE_URL) {
    try {
      if (!_pool) {
        _pool = mysql.createPool({
          uri: process.env.DATABASE_URL,
          waitForConnections: true,
          connectionLimit: 10,
          maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
          idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
          queueLimit: 0,
          enableKeepAlive: true,
          keepAliveInitialDelay: 0
        });
      }
      
      _db = drizzle(_pool, { 
        schema, 
        mode: 'default',
        logger: process.env.NODE_ENV === 'development'
      });
      
    } catch (error) {
      console.error('[Database] Connection failed:', error);
      throw new Error('Database connection failed');
    }
  }
  
  if (!_db) {
    throw new Error('Database URL is not defined');
  }

  return _db;
}

// Keep the old export for backward compatibility where sync connection is expected
// Note: In production, it's safer to await getDb() in routers instead of relying on sync init.
const syncConnection = mysql.createPool({
  uri: process.env.DATABASE_URL,
});
export const db = drizzle(syncConnection, { schema, mode: 'default' });
