import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { waLink } from "@/lib/site";

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={["section-pill", className].filter(Boolean).join(" ")}>{children}</span>;
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title">
      <span className="overline">{eyebrow}</span>
      <h2>{title}</h2>
      <span aria-hidden="true" className="bean-divider">◆</span>
    </div>
  );
}

/**
 * Image optimization is handled by Next.js and Vercel.
 * The explicit dimensions reserve a stable aspect ratio for card previews,
 * while CSS may override width/height for decorative hero crops.
 */
export function Photo({
  src, alt, className = "", loading = "lazy", sizes = "(max-width: 680px) 95vw, (max-width: 1100px) 48vw, 33vw",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={1200}
      height={900}
      sizes={sizes}
      priority={loading === "eager"}
      loading={loading === "eager" ? undefined : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}

export function Hero({
  eyebrow, title, description, image, children, center = false,
}: {
  eyebrow: string; title: string; description: string; image: string;
  children?: ReactNode; center?: boolean;
}) {
  return (
    <section className={center ? "hero hero-center" : "hero"}>
      <div className="hero-copy flourish">
        <span className="script">{eyebrow}</span>
        <h1>{title}</h1>
        <span aria-hidden="true" className="hero-rule">◆</span>
        <p>{description}</p>
        {children && <div className="hero-actions">{children}</div>}
      </div>
      <div className="hero-image">
        <Photo
          src={image}
          alt="Illustrative café atmosphere"
          loading="eager"
          sizes="(max-width: 680px) 100vw, (max-width: 1100px) 70vw, 65vw"
        />
      </div>
    </section>
  );
}

export function FeatureStrip({
  features,
}: {
  features: { icon: ReactNode; title: string; desc: string }[];
}) {
  return (
    <div className="feature-strip">
      {features.map((feature) => (
        <div className="feature" key={feature.title}>
          <span className="feature-icon" aria-hidden="true">{feature.icon}</span>
          <div><strong>{feature.title}</strong><small>{feature.desc}</small></div>
        </div>
      ))}
    </div>
  );
}

export function OpenWhatsApp({
  message, children, className = "",
}: {
  message: string; children: ReactNode; className?: string;
}) {
  return (
    <a
      href={waLink(message)}
      className={className || "btn btn-green"}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function ButtonLink({
  href, children, light = false,
}: {
  href: string; children: ReactNode; light?: boolean;
}) {
  return <Link href={href} className={light ? "btn btn-outline" : "btn btn-green"}>{children}</Link>;
}
