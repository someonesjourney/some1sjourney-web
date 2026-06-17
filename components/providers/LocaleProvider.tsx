"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  getCta,
  getLocalizedNavLinks,
  getSiteContent,
  type CtaKey,
  type Locale,
  type SiteContent,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  content: SiteContent;
  cta: (key: CtaKey) => ReturnType<typeof getCta>;
  navLinks: SiteContent["navigation"]["header"];
  footerNav: {
    product: SiteContent["navigation"]["footer"]["product"];
    legal: SiteContent["navigation"]["footer"]["legal"];
    support: SiteContent["navigation"]["footer"]["support"];
  };
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const content = getSiteContent(locale);

  const value: LocaleContextValue = {
    locale,
    content,
    cta: (key) => getCta(locale, key),
    navLinks: getLocalizedNavLinks(locale, content.navigation.header),
    footerNav: {
      product: getLocalizedNavLinks(locale, content.navigation.footer.product),
      legal: getLocalizedNavLinks(locale, content.navigation.footer.legal),
      support: getLocalizedNavLinks(locale, content.navigation.footer.support),
    },
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return context;
}

export function useSiteContent() {
  return useLocaleContext().content;
}

export function useLocale() {
  return useLocaleContext().locale;
}

export function useCta() {
  return useLocaleContext().cta;
}
