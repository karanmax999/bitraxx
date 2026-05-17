import { NextRequest, NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';
import { getSession } from '../../../../lib/session';
import { getDb } from '../../../../lib/db';
import { users } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';

function generateReferralCode(address: string): string {
  // Deterministic 8-char code from wallet address
  const hex = address.slice(2, 10).toUpperCase();
  return `BRX${hex}`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, signature } = await req.json();

    if (!message || !signature) {
      return NextResponse.json(
        { error: 'message and signature are required' },
        { status: 400 }
      );
    }

    // Load session and validate nonce
    const session = await getSession();
    const siweMessage = new SiweMessage(message);

    const { data: fields, error: siweError } = await siweMessage.verify({
      signature,
      nonce: session.nonce,
    });

    if (siweError) {
      console.error('[Auth/Verify] SIWE verification failed:', siweError);
      return NextResponse.json(
        { error: 'Invalid signature or expired nonce' },
        { status: 422 }
      );
    }

    // Upsert user in database
    const db = await getDb();
    const walletAddress = fields.address.toLowerCase();

    let user = await db.query.users.findFirst({
      where: eq(users.walletAddress, walletAddress),
    });

    if (!user) {
      // New user — create record with referral code
      const referralCode = generateReferralCode(fields.address);
      await db.insert(users).values({
        walletAddress,
        referralCode,
        lastSignedIn: new Date(),
      });
      user = await db.query.users.findFirst({
        where: eq(users.walletAddress, walletAddress),
      });
    } else {
      // Existing user — update last sign-in
      await db
        .update(users)
        .set({ lastSignedIn: new Date() })
        .where(eq(users.walletAddress, walletAddress));
    }

    // Persist session
    session.walletAddress = walletAddress;
    session.chainId = fields.chainId;
    session.nonce = undefined; // Clear nonce after successful use
    await session.save();

    return NextResponse.json({
      ok: true,
      address: walletAddress,
      chainId: fields.chainId,
      isAdmin: user?.role === 'admin',
    });
  } catch (error) {
    console.error('[Auth/Verify] Unexpected error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
