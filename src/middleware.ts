import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  if (!accessToken) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
