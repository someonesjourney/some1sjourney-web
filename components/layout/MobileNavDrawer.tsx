"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { GameHubNavMenu } from "@/components/layout/GameHubNavMenu";
import { HeaderAuthButton } from "@/components/layout/HeaderAuthButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import type { Locale, NavLink } from "@/lib/i18n";

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
};

const PANEL_WIDTH = "min(88vw, 20rem)";

function sectionLabelClass(locale: Locale) {
  return locale === "ar"
    ? "text-xs font-semibold text-muted"
    : "text-xs font-semibold uppercase tracking-[0.14em] text-muted";
}

export function MobileNavDrawer({
  open,
  onClose,
  navLinks,
  menuButtonRef,
}: MobileNavDrawerProps) {
  const { locale, content } = useLocaleContext();
  const copy = content.navigation.mobileMenu;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open || !visible) return;

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, visible, onClose]);

  useEffect(() => {
    if (open || !menuButtonRef?.current) return;
    menuButtonRef.current.focus();
  }, [open, menuButtonRef]);

  if (!open && !mounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] lg:hidden"
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-label={copy.close}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={copy.navigation}
        style={{ width: PANEL_WIDTH }}
        className={`fixed inset-y-0 start-0 z-[61] flex flex-col border-e border-border bg-background pb-[env(safe-area-inset-bottom,0px)] shadow-2xl transition-transform duration-300 ease-out ${
          visible
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
          <div className="min-w-0 text-start">
            <p
              className={
                locale === "ar"
                  ? "text-sm font-semibold text-gold"
                  : "text-xs font-semibold uppercase tracking-[0.18em] text-gold"
              }
            >
              {content.brand.name}
            </p>
            <p className="mt-0.5 text-sm text-muted">{copy.navigation}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted transition hover:border-border-gold hover:text-foreground"
            aria-label={copy.close}
            onClick={onClose}
          >
            <span className="sr-only">{copy.close}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.id === "game-hub" ? (
                  <GameHubNavMenu
                    hubHref={link.href}
                    label={link.label}
                    variant="mobile"
                    onNavigate={onClose}
                  />
                ) : (
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center rounded-xl px-3 text-start text-sm font-medium text-foreground transition hover:bg-surface/80 hover:text-gold"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-border px-4 py-4">
          <div className="text-start">
            <p className={`mb-2 ${sectionLabelClass(locale)}`}>{copy.language}</p>
            <LanguageSwitcher className="w-fit max-w-full" />
          </div>

          <div className="text-start">
            <p className={`mb-2 ${sectionLabelClass(locale)}`}>{copy.account}</p>
            <HeaderAuthButton onNavigate={onClose} variant="mobile" />
          </div>
        </div>
      </aside>
    </div>
  );
}
