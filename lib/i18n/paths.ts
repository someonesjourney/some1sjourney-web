import type { Locale } from "./config";

/** Prefix an internal path with locale. Leaves mailto, http, and exp:// unchanged. */
export function localizeHref(locale: Locale, href: string): string {
  if (
    href.startsWith("mailto:") ||
    href.startsWith("http") ||
    href.startsWith("exp://")
  ) {
    return href;
  }

  if (href.startsWith("#")) {
    return `/${locale}${href}`;
  }

  if (href.startsWith("/#")) {
    return `/${locale}${href.slice(1)}`;
  }

  const path = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${path === "/" ? "" : path}`;
}

/** Swap locale in current pathname, preserving the rest of the path. */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (segments[0] === "en" || segments[0] === "ar") {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
