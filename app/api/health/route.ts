import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV ?? 'unknown',
    version: process.env.npm_package_version ?? '0.1.0',
  });
}
