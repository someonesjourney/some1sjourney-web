import { defaultLocale, isLocale } from "@/lib/i18n";

const DEFAULT_FALLBACK = `/${defaultLocale}/profile`;

/**
 * Allow only same-origin relative paths (blocks open redirects).
 */
export function safeRedirectPath(
  next: string | null | undefined,
  fallback: string = DEFAULT_FALLBACK,
): string {
  const candidate = (next ?? fallback).trim();
  if (!candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }
  if (candidate.includes(":") || candidate.includes("@")) {
    return fallback;
  }

  try {
    const url = new URL(candidate, "https://example.com");
    if (url.hostname !== "example.com") {
      return fallback;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function profilePathForUser(
  userId: string,
  locale: string = defaultLocale,
): string {
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  return `/${safeLocale}/profile/${userId}`;
}

export function localeFromRedirectPath(path: string): string | null {
  const segment = path.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : null;
}
