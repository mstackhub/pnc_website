"use client";

import React from "react";
import { Clock, MapPin, Layers, PhoneCall } from "lucide-react";

export const TrustBarSection: React.FC = () => {
  const trustPoints = [
    {
      icon: Clock,
      title: "นัดหมาย 24 ชั่วโมง",
      subtitle: "เลือกช่วงเวลาที่สะดวกได้ตลอดวัน",
      tag: "จองล่วงหน้า",
    },
    {
      icon: MapPin,
      title: "บริการถึงที่",
      subtitle: "บ้าน / ที่ทำงาน / คอนโด / จุดนัดหมาย",
      tag: "ฟรี 20 กม.",
    },
    {
      icon: Layers,
      title: "รถหลายประเภท",
      subtitle: "มอเตอร์ไซค์ รถยนต์ EV จนถึง 10 ล้อ",
      tag: "ครบทุกขนาด",
    },
    {
      icon: PhoneCall,
      title: "จองง่าย 3 ช่องทาง",
      subtitle: "LINE / Facebook / โทรสายตรง",
      tag: "ตอบไว",
    },
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-brand-border/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/60">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-3.5 ${
                  index > 1 ? "pt-4 lg:pt-0" : ""
                } ${index > 0 ? "lg:pl-6" : ""}`}
              >
                <div className="w-11 h-11 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm sm:text-base font-bold text-brand-text">
                      {point.title}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted leading-tight">
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
