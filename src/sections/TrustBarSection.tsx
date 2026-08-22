"use client";

import React from "react";
import { Clock, MapPin, Layers, PhoneCall } from "lucide-react";

export const TrustBarSection: React.FC = () => {
  const trustPoints = [
    {
      icon: Clock,
      title: "นัดหมาย 24 ชม.",
      subtitle: "เลือกเวลาสะดวกได้ตลอดวัน",
      tag: "จองล่วงหน้า",
    },
    {
      icon: MapPin,
      title: "บริการถึงที่",
      subtitle: "บ้าน / คอนโด / ที่ทำงาน",
      tag: "ฟรี 20 กม.",
    },
    {
      icon: Layers,
      title: "รถทุกประเภท",
      subtitle: "มอไซค์ รถยนต์ EV ถึง 10 ล้อ",
      tag: "ครบทุกขนาด",
    },
    {
      icon: PhoneCall,
      title: "จองง่าย 3 ช่องทาง",
      subtitle: "LINE / FB / โทรสายตรง",
      tag: "ตอบไว",
    },
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-7 shadow-card border border-brand-border/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 p-3 sm:p-0 rounded-2xl sm:rounded-none bg-brand-bg/50 sm:bg-transparent border sm:border-0 border-brand-border/60 hover:bg-brand-light/30 transition-colors"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs sm:text-sm lg:text-base font-bold text-brand-text leading-tight">
                      {point.title}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-brand-muted leading-tight">
                    {point.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
