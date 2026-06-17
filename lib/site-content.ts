export {
  EXPO_GO_URL,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  defaultLocale,
  getCta,
  getLocalizedNavLinks,
  getPageMeta,
  getSiteContent,
  getStoreUrl,
  isLocale,
  localeDirection,
  localeLabels,
  locales,
  localizeHref,
  switchLocalePath,
} from "./i18n";

export type {
  ContentSection,
  CTA,
  CtaKey,
  FlowStep,
  Locale,
  NavLink,
  PageMetaKey,
  SiteContent,
} from "./i18n";

/** @deprecated Use getSiteContent("en") */
export { enContent as siteContent } from "./i18n/content/en";
