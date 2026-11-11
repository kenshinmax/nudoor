"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import type { CaseStudy, SegmentSlug } from "@/content/schema";

export function WorkFilter({ studies, labels }: { studies: CaseStudy[]; labels: Record<SegmentSlug, string> }) {
  const [filter, setFilter] = useState<string>("all");
  const present = [...new Set(studies.map((s) => s.segment))];
  const shown = filter === "all" ? studies : studies.filter((s) => s.segment === filter);
  return (
    <div>
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(v) => setFilter(v || "all")}
        variant="outline"
        aria-label="Filter case studies by business type"
        className="mb-8 flex-wrap"
      >
        <ToggleGroupItem value="all" className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-white">
          All
        </ToggleGroupItem>
        {present.map((seg) => (
          <ToggleGroupItem key={seg} value={seg} className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-white">
            {labels[seg]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} case {shown.length === 1 ? "study" : "studies"}
      </p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug}>
            <CaseStudyCard study={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
