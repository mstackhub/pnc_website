"use client";

import React from "react";
import Image from "next/image";
import { AlertCircle, CheckCircle2, Award, Clock, ArrowRight } from "lucide-react";
import { caseStudiesData } from "@/data/caseStudies";
import { DemoBadge } from "@/components/DemoBadge";
import { siteConfig } from "@/data/company";
import { analytics } from "@/lib/analytics";

interface CaseStudySectionProps {
  onOpenBooking: () => void;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ onOpenBooking }) => {
  const handleBooking = () => {
    analytics.clickBooking("case_study_section");
    onOpenBooking();
  };

  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>CASE STUDIES</span>
            {siteConfig.isDemo && <DemoBadge />}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            แต่ละคัน เราดูแลอะไรบ้าง
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            ตัวอย่างการแก้ปัญหาและผลลัพธ์จากการให้บริการจริงตามประเภทรถและความต้องการของลูกค้า
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Image Comparison Preview */}
              <div className="relative aspect-[16/9] w-full bg-neutral-900 grid grid-cols-2">
                <div className="relative h-full border-r border-white/20">
                  <Image
                    src={item.beforeImage}
                    alt={item.altBefore}
                    fill
                    sizes="(max-width: 1024px) 50vw, 200px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    BEFORE
                  </div>
                </div>
                <div className="relative h-full">
                  <Image
                    src={item.afterImage}
                    alt={item.altAfter}
                    fill
                    sizes="(max-width: 1024px) 50vw, 200px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    AFTER
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Title & Badge */}
                  <div>
                    <span className="text-xs font-bold text-brand-primary bg-brand-light px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {item.vehicleType}
                    </span>
                    <h3 className="text-lg font-bold text-brand-text leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Problem Box */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>ปัญหาและสภาพรถก่อนล้าง:</span>
                    </div>
                    <ul className="text-xs text-amber-900/80 space-y-1 pl-5 list-disc">
                      {item.problem.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Services Provided */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-brand-text">
                      บริการที่ดำเนินการ:
                    </div>
                    <ul className="text-xs text-brand-muted space-y-1 pl-4">
                      {item.service.map((s, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Result Box */}
                  <div className="p-3.5 rounded-2xl bg-brand-light/70 border border-brand-primary/20 space-y-1">
                    <div className="text-xs font-bold text-brand-dark">
                      ผลลัพธ์ที่ได้รับ:
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {item.result}
                    </p>
                  </div>
                </div>

                {/* Footer of Card */}
                {item.timeSpent && (
                  <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-primary" />
                      <span>{item.timeSpent}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleBooking}
                      className="text-brand-primary hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <span>จองแบบนี้</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
