import type { MetadataRoute } from "next";
import { sitemapPaths } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths().map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path.startsWith("/legal") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
