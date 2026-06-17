import type { Locale } from "./config";
import { arContent } from "./content/ar";
import { enContent } from "./content/en";
import { EXPO_GO_URL, SITE_URL, SUPPORT_EMAIL } from "./constants";
import { localizeHref } from "./paths";
import type { CtaKey, PageMetaKey, SiteContent } from "./types";

const contentByLocale: Record<Locale, SiteContent> = {
  en: enContent,
  ar: arContent,
};

export function getSiteContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export function getCta(locale: Locale, key: CtaKey) {
  const content = getSiteContent(locale);
  const cta = content.ctas[key];
  const href =
    key === "openInExpoGo" && EXPO_GO_URL
      ? EXPO_GO_URL
      : localizeHref(locale, cta.href);

  return { label: cta.label, href };
}

export function getLocalizedNavLinks(locale: Locale, links: SiteContent["navigation"]["header"]) {
  return links.map((link) => ({
    ...link,
    href: link.external ? link.href : localizeHref(locale, link.href),
  }));
}

export function getPageMeta(locale: Locale, page: PageMetaKey) {
  return getSiteContent(locale).metadata.pages[page];
}

export function getStoreUrl(locale: Locale, key: "ios" | "android"): string {
  const content = getSiteContent(locale);
  return key === "ios"
    ? content.access.expoGoIosUrl
    : content.access.expoGoAndroidUrl;
}

export { EXPO_GO_URL, SITE_URL, SUPPORT_EMAIL };
export { localizeHref, switchLocalePath } from "./paths";
export { locales, defaultLocale, isLocale, localeDirection, localeLabels } from "./config";
export type { Locale } from "./config";
export type { CtaKey, PageMetaKey, SiteContent, FlowStep, ContentSection, CTA, NavLink } from "./types";

export const SITE_NAME = enContent.brand.name;
