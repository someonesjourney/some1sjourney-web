"use client";

import type { FlowStep } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";

type FlowStepsProps = {
  steps: readonly FlowStep[];
  className?: string;
};

export function FlowSteps({ steps, className = "" }: FlowStepsProps) {
  const locale = useLocale();
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div className={`flex flex-col gap-4 lg:flex-row lg:items-stretch ${className}`}>
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-1 items-stretch gap-4">
          <div className="flex flex-1 flex-col rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-gold)] bg-background-secondary text-sm font-semibold text-gold">
              {index + 1}
            </span>
            <h3 className="text-base font-semibold text-foreground">{step.label}</h3>
            {step.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            ) : null}
          </div>
          {index < steps.length - 1 ? (
            <div
              className="hidden items-center px-1 text-lg text-muted lg:flex"
              aria-hidden="true"
            >
              {arrow}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
