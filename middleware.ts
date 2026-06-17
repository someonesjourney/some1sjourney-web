import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/auth") ||
    pathname === "/app" ||
    pathname.startsWith("/app/") ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return updateSession(request);
  }

  const sessionResponse = await updateSession(request);
  const pathnameLocale = pathname.split("/")[1];

  if (isLocale(pathnameLocale)) {
    return sessionResponse;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const prefersArabic = acceptLanguage.toLowerCase().includes("ar");
  const locale = prefersArabic ? "ar" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const redirectResponse = NextResponse.redirect(url);

  sessionResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });

  return redirectResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};

export { locales } from "@/lib/i18n/config";
