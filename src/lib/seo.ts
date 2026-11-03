import { CAFE } from "@/lib/site";
import { BLOG_POSTS } from "@/data/blog";
import { GALLERY_ITEMS } from "@/data/gallery";
import { VERIFIED_SOCIAL_PROFILES } from "@/lib/social";
import type { PageKey } from "@/lib/routes";

export const PUBLIC_ROUTES = ["/", "/about", "/menu", "/reservation", "/gallery", "/blog", "/contact"] as const;
export const PRIVATE_ROUTES = ["/cart", "/checkout"] as const;

const DESCRIPTIONS: Record<PageKey, string> = {
  home: "Discover The Rouché Café in Prayagraj, Uttar Pradesh. Explore our café atmosphere, refreshments and WhatsApp table reservation requests.",
  about: "Learn about The Rouché Café in Prayagraj, a welcoming place for coffee, food and spending time together.",
  menu: "Browse the sample menu layout for The Rouché Café, Prayagraj. Final dishes and prices are being confirmed by the café.",
  reservation: "Request a table at The Rouché Café in Prayagraj through WhatsApp. Preferred dates and times require confirmation by café staff.",
  gallery: "Explore an illustrative gallery for The Rouché Café. Official café photos will be published as they become available.",
  blog: "The Rouché Café journal will feature confirmed café news, coffee stories and events in Prayagraj.",
  contact: "Contact The Rouché Café in Prayagraj, Uttar Pradesh by phone or WhatsApp. Open our official Google Maps location.",
  cart: "Review selected café menu items in your shopping cart.",
  checkout: "Review your café order enquiry before contacting the café.",
};

export function descriptionFor(route: PageKey): string { return DESCRIPTIONS[route]; }

/** Do not emit canonical URLs or sitemap entries pointing to localhost or example.com. */
export function productionBaseUrl(raw = process.env.NEXT_PUBLIC_SITE_URL): URL | null {
  if (!raw) return null;
  try {
    const result = new URL(raw);
    const host = result.hostname.toLowerCase();
    if (result.protocol !== "https:" || result.username || result.password ||
        result.search || result.hash || result.pathname !== "/" ||
        host === "localhost" || host === "example.com" || host.endsWith(".example.com") ||
        host === "127.0.0.1" || host === "0.0.0.0") return null;
    return new URL(result.origin);
  } catch { return null; }
}

/**
 * Noindex unverified catalogue/photography/editorial content until the owner
 * provides real materials. Cart/checkout always remain private utility pages.
 */
export function shouldIndex(route: PageKey, configuredUrl: URL | null = productionBaseUrl()): boolean {
  if (!configuredUrl || route === "cart" || route === "checkout") return false;
  if (route === "menu" && CAFE.demoMenu) return false;
  if (route === "gallery" && !GALLERY_ITEMS.some((item) => !item.placeholder)) return false;
  if (route === "blog" && BLOG_POSTS.length === 0) return false;
  return true;
}

export function canonicalFor(route: PageKey, base: URL | null = productionBaseUrl()): string | undefined {
  if (!base || route === "cart" || route === "checkout") return undefined;
  const pathname = route === "home" ? "/" : "/" + route;
  return new URL(pathname, base).toString();
}

/** Truthful local business data; no unverified ratings, hours or street address. */
export function cafeStructuredData(base: URL | null = productionBaseUrl()): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: CAFE.name,
    description: "Café and restaurant in Prayagraj, Uttar Pradesh.",
    ...(base ? { url: base.toString(), logo: new URL("/rouche-logo.webp", base).toString() } : {}),
    telephone: "+" + CAFE.whatsapp,
    hasMap: CAFE.mapUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Prayagraj",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    ...(VERIFIED_SOCIAL_PROFILES.length ? { sameAs: VERIFIED_SOCIAL_PROFILES.map((profile) => profile.url) } : {}),
  };
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
