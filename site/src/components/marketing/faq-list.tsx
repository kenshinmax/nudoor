import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import type { FaqItem } from "@/content/schema";
import { faqJsonLd } from "@/lib/seo";

export function FaqList({ items, structuredData = true }: { items: readonly FaqItem[]; structuredData?: boolean }) {
  return (
    <div className="mx-auto max-w-[780px]">
      <Accordion type="single" collapsible className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`} className="rounded-xl border border-line bg-white px-5 last:border-b">
            <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="text-[15px] text-slate-600">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {structuredData ? <JsonLd data={faqJsonLd(items)} /> : null}
    </div>
  );
}
