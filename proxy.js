import { NextResponse } from "next/server";
import { verifyToken } from "@/server/lib/token";

/* ---------------------------------------------
 * Helpers
 * ------------------------------------------- */

function isDashboardPath(pathname) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

function redirect(url, request) {
  return NextResponse.redirect(new URL(url, request.url));
}

/* ---------------------------------------------
 * Admin Auth Check
 * ------------------------------------------- */

function checkAdminAuth(request) {
  const adminToken = request.cookies.get("admin_token")?.value;
  const adminId = request.cookies.get("_id")?.value;

  if (!adminToken || !adminId) {
    return false;
  }

  const decoded = verifyToken(adminToken);
  if (!decoded || decoded.type !== "admin" || decoded.id !== adminId) {
    return false;
  }

  return true;
}


/* ---------------------------------------------
 * proxy
 * ------------------------------------------- */

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Admin protected routes
  if (isDashboardPath(pathname)) {
    const isAdminLoggedIn = checkAdminAuth(request);

    if (!isAdminLoggedIn) {
      return redirect("/authentication/login", request);
    }
  }

  return NextResponse.next();
}

/* ---------------------------------------------
 * Matcher
 * ------------------------------------------- */

export const config = {
  matcher: ["/dashboard/:path*"],
};
