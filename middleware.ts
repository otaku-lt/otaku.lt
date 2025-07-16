import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from './config/routes';

export function middleware(request: NextRequest) {
  // Skip middleware in development
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const route = routes.find(r => r.path === pathname);

  // If route is protected and we're in production, redirect to home
  if (route?.isProtected) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
