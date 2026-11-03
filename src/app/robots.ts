import type { MetadataRoute } from "next";
import { productionBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = productionBaseUrl();
  if (!base) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cart", "/checkout"] }],
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
