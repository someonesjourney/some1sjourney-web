"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { GameHubNavMenu } from "@/components/layout/GameHubNavMenu";
import { HeaderAuthButton } from "@/components/layout/HeaderAuthButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { localizeHref, type NavLink } from "@/lib/i18n";

const LEFT_NAV_COUNT = 2;

export function SiteHeader() {
  const { locale, content, navLinks } = useLocaleContext();
  const menuCopy = content.navigation.mobileMenu;
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

  useEffect(() => {
    if (!menuOpen) return;

    function onResize() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

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
        className="whitespace-nowrap text-xs text-muted transition hover:text-foreground lg:text-sm"
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:h-16 sm:gap-3 sm:px-6 lg:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3 lg:gap-4">
            <button
              type="button"
              className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/40 md:hidden"
              aria-label={menuOpen ? menuCopy.close : menuCopy.open}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={`absolute block h-0.5 w-4 bg-foreground transition duration-200 ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-4 bg-foreground transition duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-4 bg-foreground transition duration-200 ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1"
                }`}
              />
            </button>

            <nav
              className="hidden items-center gap-2 md:flex lg:gap-3 xl:gap-4"
              aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}
            >
              {leftNavLinks.map((link) => renderNavLink(link))}
            </nav>
          </div>

          <Link
            href={localizeHref(locale, "/")}
            className="flex shrink-0 flex-col items-center"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={content.assets.logo}
              alt={content.brand.name}
              width={48}
              height={48}
              className="h-9 w-9 rounded-lg sm:h-10 sm:w-10 lg:h-12 lg:w-12 lg:rounded-xl"
              priority
            />
            <span className="sr-only">{content.brand.name}</span>
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2 lg:gap-3">
            <nav
              className="hidden items-center gap-2 lg:flex lg:gap-3 xl:gap-4"
              aria-label={locale === "ar" ? "استكشاف العالم" : "World navigation"}
            >
              {rightNavLinks.map((link) => renderNavLink(link))}
            </nav>

            <LanguageSwitcher className="hidden shrink-0 md:flex" />
            <HeaderAuthButton />
          </div>
        </div>
      </header>

      <MobileNavDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
