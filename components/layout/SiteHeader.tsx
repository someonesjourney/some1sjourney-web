"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { GameHubNavMenu } from "@/components/layout/GameHubNavMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { HeaderAuthButton } from "@/components/layout/HeaderAuthButton";
import { useCta, useLocaleContext } from "@/components/providers/LocaleProvider";
import { localizeHref, type NavLink } from "@/lib/i18n";

const LEFT_NAV_COUNT = 2;

export function SiteHeader() {
  const { locale, content, navLinks } = useLocaleContext();
  const cta = useCta();
  const headerCta = cta("enterJourneyShort");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { leftNavLinks, rightNavLinks } = useMemo(() => {
    return {
      leftNavLinks: navLinks.slice(0, LEFT_NAV_COUNT),
      rightNavLinks: navLinks.slice(LEFT_NAV_COUNT),
    };
  }, [navLinks]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function renderNavLink(link: NavLink, onNavigate?: () => void) {
    if (link.id === "game-hub") {
      return (
        <GameHubNavMenu
          key={link.href}
          hubHref={link.href}
          label={link.label}
          variant="desktop"
          onNavigate={onNavigate}
        />
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className="whitespace-nowrap text-sm text-muted transition hover:text-foreground"
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex flex-col gap-1.5"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
          </button>
        </div>

        <nav
          className="hidden items-center justify-end gap-3 md:flex lg:gap-4"
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}
        >
          {leftNavLinks.map((link) => renderNavLink(link))}
        </nav>

        <Link
          href={localizeHref(locale, "/")}
          className="flex flex-col items-center justify-self-center"
        >
          <Image
            src={content.assets.logo}
            alt={content.brand.name}
            width={52}
            height={52}
            className="h-11 w-11 rounded-xl sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px]"
            priority
          />
          <span className="sr-only">{content.brand.name}</span>
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-2 md:justify-start md:gap-3 lg:gap-4">
          <nav
            className="hidden items-center gap-3 xl:flex xl:gap-4"
            aria-label={locale === "ar" ? "استكشاف العالم" : "World navigation"}
          >
            {rightNavLinks.map((link) => renderNavLink(link))}
          </nav>

          <div className="flex items-center gap-2 md:ms-auto md:gap-2.5 lg:gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <HeaderAuthButton />
            <Link
              href={headerCta.href}
              className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-background transition hover:bg-gold-light sm:inline-flex lg:px-5"
            >
              {headerCta.label}
            </Link>
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-b border-border bg-background/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.id === "game-hub" ? (
                <GameHubNavMenu
                  key={link.href}
                  hubHref={link.href}
                  label={link.label}
                  variant="mobile"
                  onNavigate={() => setMenuOpen(false)}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <HeaderAuthButton onNavigate={() => setMenuOpen(false)} variant="mobile" />
            <Link
              href={headerCta.href}
              className="rounded-full bg-gold px-5 py-2 text-center text-sm font-semibold text-background"
              onClick={() => setMenuOpen(false)}
            >
              {headerCta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
