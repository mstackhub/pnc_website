"use client";

import React, { useState } from "react";
import { HelpCircle, MessageCircle, Phone, Sparkles } from "lucide-react";
import { faqsData } from "@/data/faqs";
import { siteConfig } from "@/data/company";
import { Accordion, AccordionItemData } from "@/components/Accordion";
import { DemoBadge } from "@/components/DemoBadge";
import { analytics } from "@/lib/analytics";

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  // If isDemo is true (staging/dev), show both verified and demo FAQs
  // In production, only show verified FAQs
  const displayFaqs = siteConfig.isDemo
    ? faqsData
    : faqsData.filter((faq) => faq.isVerifiedProduction);

  const accordionItems: AccordionItemData[] = displayFaqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    badge: !faq.isVerifiedProduction ? <DemoBadge label="Demo Content" /> : undefined,
  }));

  const handleLineClick = () => {
    analytics.clickLine("faq_bottom_help");
    window.open(siteConfig.lineUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white border-y border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            คำถามที่พบบ่อย
          </h2>
          <p className="text-brand-muted text-base leading-relaxed">
            รวมคำถามและข้อสงสัยยอดนิยมเกี่ยวกับการบริการ นัดหมาย และพื้นที่ให้บริการ
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          items={accordionItems}
          allowMultiple={false}
          defaultOpenId="faq-1"
        />

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-brand-bg border border-brand-border text-center space-y-4">
          <h3 className="text-lg font-bold text-brand-text">
            มีคำถามอื่นๆ หรือต้องการคำแนะนำเพิ่มเติม?
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto">
            ทีมงาน PNC Auto GO ยินดีตอบทุกข้อสงสัย ปรึกษาและประเมินราคาก่อนตัดสินใจได้ฟรี
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleLineClick}
              className="h-11 px-6 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-bold shadow transition inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>สอบถามทาง LINE</span>
            </button>

            <a
              href={`tel:${siteConfig.phoneRaw}`}
              onClick={() => analytics.clickPhone("faq_help_call")}
              className="h-11 px-6 rounded-xl bg-white border border-brand-border hover:bg-brand-light text-brand-text text-xs sm:text-sm font-bold shadow-sm transition inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-primary" />
              <span>โทร {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
