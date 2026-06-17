import { GradientBackground } from "@/components/ui/GradientBackground";
import { getSiteContent } from "@/lib/i18n";

export default function ProfileLoading() {
  const copy = getSiteContent("en").profile.loading;

  return (
    <div className="relative min-h-[60vh] overflow-hidden py-24">
      <GradientBackground />
      <div className="relative mx-auto max-w-lg px-6 text-center">
        <div className="mx-auto h-10 w-10 animate-pulse rounded-full border-2 border-gold/30 border-t-gold" />
        <h1 className="mt-6 text-2xl font-semibold text-foreground">{copy.title}</h1>
        <p className="mt-3 text-sm text-muted">{copy.description}</p>
      </div>
    </div>
  );
}
