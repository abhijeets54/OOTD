import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/help-center",
  "/contact",
  "/faq",
  "/community",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/data-protection"
]);

const isProtectedApiRoute = createRouteMatcher([
  "/api/outfits(.*)",
  "/api/upload(.*)",
  "/api/analyze-image(.*)",
  "/api/user(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // For API routes that require authentication
  if (isProtectedApiRoute(req)) {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.next();
  }

  // For regular routes, redirect to sign-in if not authenticated
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If user is logged in and the route is protected, let them view
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};