"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocaleContext } from "@/components/providers/LocaleProvider";

export function SiteFooter() {
  const { content, footerNav } = useLocaleContext();
  const { brand, worldState } = content;
  const { footer } = content.navigation;

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src={content.assets.logo}
                alt={brand.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <p className="font-semibold text-foreground">{brand.name}</p>
                <p className="text-sm text-muted">
                  {worldState.currentSeason.name} — {worldState.evolutionStage}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-dark">
              {footer.columns.product}
            </p>
            <ul className="space-y-3">
              {footerNav.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-dark">
              {footer.columns.legal}
            </p>
            <ul className="space-y-3">
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-dark">
              {footer.columns.support}
            </p>
            <ul className="space-y-3">
              {footerNav.support.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-muted transition hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted-dark md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>{brand.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
