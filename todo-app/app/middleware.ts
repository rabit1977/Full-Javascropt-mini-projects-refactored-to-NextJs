// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ['/login', '/register'];

  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret });

  if (!token) {
    // Redirect to login if no valid session/token
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/app/api/:path*'],
};
