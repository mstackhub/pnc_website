"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
  badge?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "border rounded-2xl transition-all duration-200 overflow-hidden",
              isOpen
                ? "border-brand-primary bg-white shadow-soft"
                : "border-brand-border bg-white/80 hover:border-brand-primary/40 hover:bg-white"
            )}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-semibold text-brand-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-base sm:text-lg leading-snug">
                  {item.question}
                </span>
                {item.badge}
              </div>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                  isOpen
                    ? "bg-brand-light text-brand-primary rotate-180"
                    : "bg-brand-bg text-brand-muted"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-brand-muted text-sm sm:text-base leading-relaxed border-t border-brand-light/60">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
