import Link from "next/link";

type BrandLogoProps = {
  footer?: boolean;
};

export function BrandLogo({ footer = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="The Rouché Café home"
      className={footer ? "logo logo-light" : "logo"}
    >
      <img
        src="/rouche-logo.webp"
        alt="The Rouché Café"
        className="logo-asset"
        width={100}
        height={100}
        decoding="async"
      />
    </Link>
  );
}
