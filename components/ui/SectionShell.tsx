import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  label?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function SectionShell({
  id,
  label,
  title,
  description,
  children,
  className = "",
  centered = false,
}: SectionShellProps) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className={`mb-12 md:mb-16 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
          {label ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {label}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
