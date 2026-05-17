import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  walletAddress?: string;
  chainId?: number;
  nonce?: string;
}

export const sessionOptions: SessionOptions = {
  cookieName: 'brx_session',
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore as any, sessionOptions);
}
