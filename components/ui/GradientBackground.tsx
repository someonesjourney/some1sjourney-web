type GradientBackgroundProps = {
  className?: string;
};

export function GradientBackground({ className = "" }: GradientBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="gradient-orb absolute -left-32 top-0 h-96 w-96 rounded-full blur-3xl" />
      <div className="gradient-orb-gold absolute -right-32 top-1/3 h-80 w-80 rounded-full blur-3xl" />
      <div className="gradient-orb absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl opacity-60" />
    </div>
  );
}
