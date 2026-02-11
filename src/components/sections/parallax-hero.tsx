import Image from "next/image";
import blurData from "@/lib/blur-data.json";

export function ParallaxHero({
  src,
  alt,
  children,
  className = "py-20",
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}) {
  const blur = blurData[src as keyof typeof blurData];

  return (
    <section className={`relative ${className} px-4 sm:px-6 lg:px-8 overflow-hidden bg-black`}>
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      {children}
    </section>
  );
}
