import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/session';

export async function POST() {
  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Auth/Logout] Error destroying session:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
