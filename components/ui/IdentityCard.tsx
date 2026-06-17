import Image from "next/image";

type IdentityCardProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function IdentityCard({
  src,
  alt,
  className = "",
  priority = false,
}: IdentityCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-surface/50 transition duration-500 hover:border-border-gold hover:shadow-[0_0_30px_rgba(123,47,247,0.15)] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <Image
        src={src}
        alt={alt}
        width={240}
        height={360}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
