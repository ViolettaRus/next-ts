import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/analytics")) {
    const authToken = request.cookies.get("auth_token")?.value;

    if (!authToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    response.headers.set("x-analytics-access", "true");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/analytics/:path*"],
};

