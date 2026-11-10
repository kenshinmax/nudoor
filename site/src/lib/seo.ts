import type { Metadata } from "next";
import type { FaqItem, Post, Service } from "@/content/schema";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/public-env";

export const siteUrl = publicEnv.siteUrl.replace(/\/$/, "");
export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    email: site.email,
    description: site.description,
    areaServed: site.areaServed,
    knowsAbout: ["Stripe", "Online payments", "Subscription billing", "Usage-based billing", "Invoicing", "In-person payments"],
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: site.areaServed,
    audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: service.priceFrom,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        minPrice: service.priceFrom,
        ...(service.priceUnit === "month" ? { unitText: "MONTH" } : {}),
      },
    },
  };
}

export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: absoluteUrl(`/resources/${post.slug}`),
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}
