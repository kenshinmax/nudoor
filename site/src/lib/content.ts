import { z } from "zod";
import {
  caseStudySchema,
  legalPageSchema,
  packageSchema,
  postSchema,
  segmentContentSchema,
  servicesSchema,
  teamMemberSchema,
  type CaseStudy,
  type SegmentSlug,
  type Service,
} from "@/content/schema";
import { servicesData } from "@/content/services";
import { packagesData } from "@/content/packages";
import { caseStudiesData } from "@/content/case-studies";
import { teamData } from "@/content/team";
import { segmentsData } from "@/content/segments";
import { postsData } from "@/content/posts";
import { legalData } from "@/content/legal";

function parse<T extends z.ZodType>(name: string, schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in ${name}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const services = parse("services", servicesSchema, servicesData).sort((a, b) => a.order - b.order);
export const packages = parse("packages", z.array(packageSchema), packagesData);
export const team = parse("team", z.array(teamMemberSchema), teamData);
export const segments = parse("segments", z.array(segmentContentSchema), segmentsData);
export const posts = parse("posts", z.array(postSchema), postsData).sort((a, b) => b.date.localeCompare(a.date));
export const legalPages = parse("legal", z.array(legalPageSchema), legalData);

const allCaseStudies = parse("case studies", z.array(caseStudySchema), caseStudiesData);
export const caseStudies = allCaseStudies.filter((c) => !c.draft);

for (const s of services) {
  if (s.relatedCaseStudy && !caseStudies.some((c) => c.slug === s.relatedCaseStudy)) {
    throw new Error(`Service "${s.slug}" references unknown case study "${s.relatedCaseStudy}"`);
  }
}
for (const seg of segments) {
  if (seg.caseStudy && !caseStudies.some((c) => c.slug === seg.caseStudy)) {
    throw new Error(`Segment "${seg.slug}" references unknown case study "${seg.caseStudy}"`);
  }
}

export const getService = (slug: string): Service | undefined => services.find((s) => s.slug === slug);
export const getCaseStudy = (slug: string): CaseStudy | undefined => caseStudies.find((c) => c.slug === slug);
export const getSegment = (slug: string) => segments.find((s) => s.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getLegalPage = (slug: string) => legalPages.find((p) => p.slug === slug);
export const featuredCaseStudy = caseStudies.find((c) => c.featured) ?? caseStudies[0];
export const getPackage = (id: string) => packages.find((p) => p.id === id);

export const segmentLabels: Record<SegmentSlug, string> = {
  "local-services": "Local services",
  "online-shops": "Online shops",
  memberships: "Memberships",
  "small-saas": "Small SaaS",
};

export function earnedCertifications() {
  const counts = new Map<string, number>();
  for (const member of team) {
    for (const cert of member.certifications) {
      if (cert.earned) counts.set(cert.name, (counts.get(cert.name) ?? 0) + 1);
    }
  }
  return [...counts.entries()].map(([name, count]) => ({ name, count }));
}
