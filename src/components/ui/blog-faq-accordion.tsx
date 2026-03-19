"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LinkifiedText } from "@/lib/linkify";
import { cn } from "@/lib/utils";

export type FAQItem = { q: string; a: string };

type BlogFAQAccordionProps = {
  faqs: FAQItem[];
  defaultValue?: string;
  className?: string;
};

export function BlogFAQAccordion({
  faqs,
  defaultValue,
  className,
}: BlogFAQAccordionProps) {
  if (!faqs.length) return null;

  return (
    <div className={cn("w-full", className)}>
      <Accordion
        type="single"
        defaultValue={defaultValue ?? "0"}
        collapsible
        className="w-full space-y-2"
      >
        {faqs.map((faq, i) => (
          <AccordionItem
            value={String(i)}
            key={i}
            className={cn(
              "rounded-xl border border-silver-200 bg-white shadow-soft",
              "overflow-hidden data-[state=open]:shadow-card",
              "transition-shadow duration-200"
            )}
          >
            <AccordionTrigger
              className={cn(
                "px-5 py-4 text-left hover:no-underline hover:bg-silver-100/50",
                "data-[state=open]:rounded-b-none data-[state=open]:border-b data-[state=open]:border-silver-200 data-[state=open]:bg-silver-100/30",
                "group"
              )}
            >
              <span className="flex flex-1 items-start gap-3 pr-4">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold",
                    "bg-clinical-100 text-clinical-500 group-data-[state=open]:bg-clinical-500 group-data-[state=open]:text-white",
                    "transition-colors duration-200"
                  )}
                >
                  {i + 1}
                </span>
                <span className="font-display font-semibold text-navy-900 text-base leading-snug md:text-lg">
                  {faq.q.replace(/^\d+\.\s*/, "")}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "px-5 pb-5 pt-0",
                "border-t-0 bg-silver-100/20"
              )}
            >
              <div className="pl-11 text-navy-700 leading-relaxed md:pl-14">
                <LinkifiedText
                  text={faq.a}
                  className="whitespace-pre-line"
                  linkClassName="text-clinical-500 font-medium underline underline-offset-2 hover:text-clinical-600"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
