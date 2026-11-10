import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container, Eyebrow } from "@/components/marketing/section";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, posts } from "@/lib/content";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.description, path: `/resources/${post.slug}` });
}

const dateFmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default async function PostPage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <>
      <article className="bg-white py-14 md:py-20">
        <Container className="max-w-[720px]">
          <Eyebrow>{post.kind}</Eyebrow>
          <h1 className="mt-3 text-[clamp(30px,4vw,44px)] leading-tight font-extrabold tracking-tight">{post.title}</h1>
          <p className="mt-3 text-sm text-slate-500">
            <time dateTime={post.date}>{dateFmt.format(new Date(`${post.date}T00:00:00Z`))}</time> · {post.readingMinutes} min read
          </p>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-slate-700">
            {post.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i} className="pt-4 text-2xl font-bold text-ink">{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i} className="list-disc space-y-1.5 pl-6">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>
        </Container>
      </article>
      <CtaSection title="Want us to check this for you?" body="A Payments Health Check reviews all of this in a week, for a flat $495." />
      <JsonLd data={articleJsonLd(post)} />
    </>
  );
}
