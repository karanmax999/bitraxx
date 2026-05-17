import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory request tracking at the Edge node level
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 100; // max 100 requests per minute per IP

export function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';

  // Only apply rate limiting to API endpoints to avoid blocking static assets
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const now = Date.now();
    const rateLimitData = ipRequestCounts.get(ip);

    if (!rateLimitData || now > rateLimitData.resetTime) {
      // Initialize or reset window
      ipRequestCounts.set(ip, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW_MS,
      });
    } else {
      // Increment request count
      rateLimitData.count += 1;
      ipRequestCounts.set(ip, rateLimitData);

      if (rateLimitData.count > MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSeconds = Math.ceil((rateLimitData.resetTime - now) / 1000);
        
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfterSeconds,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(retryAfterSeconds),
              'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': String(Math.ceil(rateLimitData.resetTime / 1000)),
            },
          }
        );
      }
    }
  }

  // Enforce security headers on all responses
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Only match API routes
export const config = {
  matcher: '/api/:path*',
};
