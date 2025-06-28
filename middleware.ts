// frontend/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/vendor-dash(.*)',
  '/dashboard(.*)',
  '/products(.*)',
  '/shops(.*)',
  '/delivery(.*)',
  '/vendors(.*)',
  '/delivery-persons(.*)',
  '/inventory(.*)',
  '/history(.*)',
  '/deliveries(.*)',
  '/returns(.*)',
  '/user-dashboard(.*)',
]);

const isPublicApiRoute = createRouteMatcher([
  '/api/graphql',
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/unauthorized',
]);

export default clerkMiddleware((auth, req) => {
 
  if (isPublicRoute(req)) {
    return;
  }

  if (isPublicApiRoute(req)) {
    if (req.method === 'OPTIONS' || req.url.includes('introspection')) {
      return;
    }
    auth();
  }
  
  if (isProtectedRoute(req)) {
    auth();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};