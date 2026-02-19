"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FAQItem = { q: string; a: string };

type FAQAccordionProps = {
  faqs: FAQItem[];
  /** Optional: value of the item to open by default (e.g. "0" for first) */
  defaultValue?: string;
  className?: string;
};

export function FAQAccordion({ faqs, defaultValue, className }: FAQAccordionProps) {
  if (!faqs.length) return null;

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <Accordion
        type="single"
        defaultValue={defaultValue ?? "0"}
        collapsible
        className="w-full"
      >
        {faqs.map((faq, i) => (
          <AccordionItem
            value={String(i)}
            key={i}
            className="border-b border-silver-200 last:border-b last:border-silver-200"
          >
            <AccordionTrigger
              className={cn(
                "text-left pl-6 md:pl-14 overflow-hidden duration-200 hover:no-underline cursor-pointer",
                "-space-y-6 data-[state=open]:space-y-0",
                "text-navy-600/80 data-[state=open]:text-clinical-600",
                "[&>svg]:hidden"
              )}
            >
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-clinical-500 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display font-semibold text-navy-900 text-xl md:text-2xl lg:text-3xl text-left">
                  {faq.q}
                </h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-navy-700 pb-6 pl-6 md:pl-14 md:pr-20 text-base leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
