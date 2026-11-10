import { caseStudies, legalPages, posts, segments, services } from "@/lib/content";

export const staticRoutes = ["/", "/services", "/solutions", "/work", "/pricing", "/about", "/resources", "/contact", "/health-check"];

export function sitemapPaths(): string[] {
  return [
    ...staticRoutes,
    ...services.map((s) => `/services/${s.slug}`),
    ...segments.map((s) => `/solutions/${s.slug}`),
    ...caseStudies.map((c) => `/work/${c.slug}`),
    ...posts.map((p) => `/resources/${p.slug}`),
    ...legalPages.map((l) => `/legal/${l.slug}`),
  ];
}
