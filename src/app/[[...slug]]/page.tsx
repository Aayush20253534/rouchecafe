import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CafeSite from "@/components/CafeSite";
import { isPageKey, PAGE_TITLES } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

function resolveRoute(slug: string[]): keyof typeof PAGE_TITLES {
  const key = slug[0] ?? "home";
  if (slug.length > 1 || !isPageKey(key)) {
    notFound();
  }
  return key;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const route = resolveRoute(slug);
  return { title: PAGE_TITLES[route] };
}

export default async function SitePage({ params }: PageProps) {
  const { slug = [] } = await params;
  resolveRoute(slug);
  return <CafeSite />;
}
