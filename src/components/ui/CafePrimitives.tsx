import type { ReactNode } from "react";
import Link from "next/link";
import { waLink } from "@/lib/site";

/** Shared design primitives. CSS classes live in globals.css until design migration. */
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

export function Photo({
  src, alt, className = "", loading = "lazy",
}: {
  src: string; alt: string; className?: string; loading?: "eager" | "lazy";
}) {
  return <img src={src} alt={alt} className={className} loading={loading} referrerPolicy="no-referrer" />;
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
      <div className="hero-image"><Photo src={image} alt="Café atmosphere" loading="eager" /></div>
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
