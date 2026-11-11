import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/marketing/section";
import { getLegalPage, legalPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: `${page.title} for Nudoor Payments.`, path: `/legal/${page.slug}` });
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();
  return (
    <div className="bg-white py-14 md:py-20">
      <Container className="max-w-[720px]">
        <h1 className="text-4xl font-extrabold tracking-tight">{page.title}</h1>
        <p className="mt-2 text-sm text-stone-500">Last updated {page.updated}</p>
        {page.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-xl font-bold">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-2 text-stone-700">
                {p}
              </p>
            ))}
          </section>
        ))}
      </Container>
    </div>
  );
}
