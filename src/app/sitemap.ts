import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, productionBaseUrl, shouldIndex } from "@/lib/seo";
import { isPageKey } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = productionBaseUrl();
  if (!base) return [];
  return PUBLIC_ROUTES.flatMap((path) => {
    const key = path === "/" ? "home" : path.slice(1);
    if (!isPageKey(key) || !shouldIndex(key, base)) return [];
    return [{
      url: new URL(path, base).toString(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.65,
    }];
  });
}
