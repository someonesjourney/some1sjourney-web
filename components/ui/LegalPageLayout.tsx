import type { ReactNode } from "react";
import { GradientBackground } from "./GradientBackground";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  updatedAt?: string;
};

export function LegalPageLayout({
  title,
  description,
  children,
  updatedAt = "June 2025",
}: LegalPageLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <GradientBackground />
      <article className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Legal
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-4 text-muted">{description}</p>
        <p className="mt-2 text-sm text-muted-dark">Last updated: {updatedAt}</p>
        <div className="prose-legal mt-10">{children}</div>
      </article>
    </div>
  );
}
