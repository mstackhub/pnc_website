"use client";

import React from "react";
import { BookOpen, Lightbulb } from "lucide-react";
import { knowledgeData } from "@/data/knowledge";
import { Accordion } from "@/components/Accordion";

export const KnowledgeSection: React.FC = () => {
  return (
    <section id="knowledge" className="py-20 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <BookOpen className="w-4 h-4" />
            <span>CAR CARE KNOWLEDGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            รู้เรื่องการล้างรถ ก่อนเลือกคนดูแลรถของคุณ
          </h2>
          <p className="text-brand-muted text-base leading-relaxed">
            เทคนิคและความรู้พื้นฐานในการดูแลรักษารถยนต์ ที่ทำให้คุณมั่นใจในมาตรฐานการทำงานของเรา
          </p>
        </div>

        {/* Knowledge Accordion */}
        <Accordion
          items={knowledgeData}
          allowMultiple={false}
          defaultOpenId="knowledge-1"
        />

        {/* Knowledge Footer Tip */}
        <div className="mt-8 p-4 rounded-2xl bg-brand-light/70 border border-brand-primary/20 flex items-center gap-3 text-xs sm:text-sm text-brand-dark">
          <Lightbulb className="w-5 h-5 text-brand-primary shrink-0" />
          <span>
            <strong>ความเชี่ยวชาญจาก PNC Auto GO:</strong> ทุกขั้นตอนการทำงานของเราผ่านการออกแบบเพื่อถนอมสภาพสีและชิ้นส่วนของรถยนต์คุณให้คงสภาพดีที่สุด
          </span>
        </div>
      </div>
    </section>
  );
};
