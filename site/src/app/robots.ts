import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/health-check/success", "/health-check/unavailable"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
