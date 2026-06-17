"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GameHubNavMenu } from "@/components/layout/GameHubNavMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { HeaderAuthButton } from "@/components/layout/HeaderAuthButton";
import { useCta, useLocaleContext } from "@/components/providers/LocaleProvider";
import { localizeHref } from "@/lib/i18n";

export function SiteHeader() {
  const { locale, content, navLinks } = useLocaleContext();
  const cta = useCta();
  const headerCta = cta("enterJourneyShort");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function renderNavLink(link: (typeof navLinks)[number], onNavigate?: () => void) {
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
        className="text-sm text-muted transition hover:text-foreground"
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
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <nav className="hidden min-w-0 flex-1 items-center gap-5 md:flex">
          {navLinks.map((link) => renderNavLink(link))}
        </nav>

        <div className="flex flex-1 items-center md:hidden">
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

        <Link
          href={localizeHref(locale, "/")}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        >
          <Image
            src={content.assets.logo}
            alt={content.brand.name}
            width={52}
            height={52}
            className="h-12 w-12 rounded-xl sm:h-[52px] sm:w-[52px]"
            priority
          />
          <span className="sr-only">{content.brand.name}</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            <HeaderAuthButton />
            <Link
              href={headerCta.href}
              className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-background transition hover:bg-gold-light"
            >
              {headerCta.label}
            </Link>
          </div>
          <div className="md:hidden">
            <LanguageSwitcher />
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
            <HeaderAuthButton onNavigate={() => setMenuOpen(false)} />
            <Link
              href={localizeHref(locale, "/profile")}
              className="text-sm text-gold"
              onClick={() => setMenuOpen(false)}
            >
              {content.navigation.auth.signIn}
            </Link>
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
