"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { processSteps } from "@/data/process";
import { analytics } from "@/lib/analytics";

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const handleInquire = () => {
    analytics.clickBooking("process_section");
    onOpenBooking();
  };

  return (
    <section id="process" className="py-20 sm:py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>7-STEP CAR CARE PROCESS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            ทุกคันมีขั้นตอนการดูแล ไม่ใช่แค่ล้างให้เสร็จ
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            เราใส่ใจตั้งแต่การตรวจรถก่อนเริ่ม ไปจนถึงการเก็บรายละเอียดก่อนส่งมอบ เพื่อให้รถที่คุณรักได้รับการดูแลอย่างถูกต้องและปลอดภัยที่สุด
          </p>
        </div>

        {/* 7-Step Timeline */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20 relative">
          {/* Subtle Vertical Connector Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-brand-border -translate-x-1/2 -z-0" />

          {processSteps.map((stepItem, index) => {
            const isEven = index % 2 === 1; // Alternating index

            return (
              <div
                key={stepItem.step}
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-card border-2 border-brand-border/80 group bg-neutral-900">
                    <Image
                      src={stepItem.image}
                      alt={stepItem.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Step Badge Over Image */}
                    <div className="absolute top-4 left-4 bg-brand-primary text-white font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
                      {stepItem.stepLabel}
                    </div>

                    {stepItem.highlight && (
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-brand-dark font-bold text-xs px-3 py-1.5 rounded-xl shadow border border-brand-border">
                        {stepItem.highlight}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-1 lg:text-right" : "lg:order-2 lg:text-left"
                  } space-y-4`}
                >
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold ${
                      isEven ? "lg:ml-auto" : ""
                    }`}
                  >
                    <span>ขั้นตอนที่ {stepItem.step}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-brand-text leading-snug">
                    {stepItem.title}
                  </h3>

                  <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
                    {stepItem.description}
                  </p>

                  {stepItem.details && stepItem.details.length > 0 && (
                    <ul
                      className={`space-y-2 text-xs sm:text-sm text-brand-text/90 ${
                        isEven ? "lg:flex lg:flex-col lg:items-end" : ""
                      }`}
                    >
                      {stepItem.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2.5">
                          <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Process CTA Button */}
        <div className="text-center mt-16 sm:mt-20">
          <button
            type="button"
            onClick={handleInquire}
            className="w-full sm:w-auto h-12 sm:h-[50px] px-8 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-base shadow-floating transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2.5 active:scale-95"
          >
            <span>สอบถามบริการและจองคิว</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
