import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/session';
import { generateNonce } from 'siwe';

export async function GET() {
  try {
    const session = await getSession();
    const nonce = generateNonce();
    session.nonce = nonce;
    await session.save();

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error('[Auth/Nonce] Failed to generate nonce:', error);
    return NextResponse.json({ error: 'Failed to generate nonce' }, { status: 500 });
  }
}
