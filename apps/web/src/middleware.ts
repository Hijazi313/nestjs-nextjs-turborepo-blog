import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  //   const { pathname } = request.nextUrl;
  //   const isLoggedIn = request.cookies.get("token")?.value;
  //   const isPublic = pathname.startsWith("/users/login");
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/users/:path*"],
};
