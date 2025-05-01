import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { subscribe } from "diagnostics_channel";
import { url } from "inspector";
import next from "next";
import { NextResponse } from "next/server";

const isPublicRoute=createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/subscribe(.*)",
])

const isSignUproute=createRouteMatcher([
  "/sign-up(.*)",
])

export default clerkMiddleware( async (auth,req)=>{
  const userAuth= await auth();
  const {userId}=userAuth;
  const {pathname ,origin}=req.nextUrl
  console.log("middleware info:",userId,pathname,origin);
  //ispublicroute return boolean if user route matches given route
  if (!isPublicRoute(req) && !userId ){
    return NextResponse.redirect(new URL("/sign-up",origin));
  }
  if (isSignUproute(req) && userId){
    return NextResponse.redirect(new URL("/mealplan",origin))
  }


});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};