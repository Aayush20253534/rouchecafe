import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CafeSite from "@/components/CafeSite";
import { isPageKey, PAGE_TITLES } from "@/lib/routes";
import { canonicalFor, descriptionFor, productionBaseUrl, shouldIndex } from "@/lib/seo";

type PageProps = { params: Promise<{ slug?: string[] }> };

function resolveRoute(slug: string[]): keyof typeof PAGE_TITLES {
  const key = slug[0] ?? "home";
  if (slug.length > 1 || !isPageKey(key)) notFound();
  return key;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const route = resolveRoute(slug);
  const base = productionBaseUrl();
  const description = descriptionFor(route);
  const canonical = canonicalFor(route, base);
  const index = shouldIndex(route, base);
  const title = PAGE_TITLES[route];

  return {
    title,
    description,
    robots: { index, follow: index, googleBot: { index, follow: index } },
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(index && canonical && base ? {
      openGraph: {
        type: "website",
        url: canonical,
        title: title + " | The Rouché Café",
        description,
        siteName: "The Rouché Café",
        locale: "en_IN",
        images: [{ url: new URL("/rouche-logo.webp", base).toString(), alt: "The Rouché Café logo" }],
      },
      twitter: {
        card: "summary",
        title: title + " | The Rouché Café",
        description,
        images: [new URL("/rouche-logo.webp", base).toString()],
      },
    } : {}),
  };
}

export default async function SitePage({ params }: PageProps) {
  const { slug = [] } = await params;
  resolveRoute(slug);
  return <CafeSite />;
}
