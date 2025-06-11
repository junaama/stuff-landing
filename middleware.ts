import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from './lib/session'; // We will create this file next

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  const { isAdmin } = session;
  const { pathname } = request.nextUrl;

  // If user is not authenticated and is trying to access a protected admin route (but not the login page itself)
  if (!isAdmin && pathname !== '/admin/login' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is authenticated and tries to access the login page, redirect to the admin dashboard
  if (isAdmin && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

// This specifies which paths the middleware should run on.
export const config = {
  matcher: '/admin/:path*',
};