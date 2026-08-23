"use client";

import React from "react";
import { Home, Clock, Car, CheckSquare, ShieldCheck } from "lucide-react";

export const WhyUsSection: React.FC = () => {
  const features = [
    {
      icon: Home,
      title: "ล้างถึงที่ สะดวกสบาย",
      description: "ประหยัดเวลาเดินทางและรอคิว ไม่ต้องทนรอคาร์แคร์ช่วงวันหยุด ทีมงานไปหาถึงบ้านหรือที่ทำงานของคุณ",
      badge: "ประหยัดเวลา",
    },
    {
      icon: Clock,
      title: "นัดเวลาได้ตลอด 24 ชั่วโมง",
      description: "เลือกช่วงเวลาที่เหมาะกับตารางชีวิตของคุณ เช้า สาย บ่าย เย็น หรือช่วงค่ำ (โดยจองล่วงหน้าตามคิวว่าง)",
      badge: "ยืดหยุ่นสูง",
    },
    {
      icon: Car,
      title: "รองรับรถหลากหลายประเภท",
      description: "ตั้งแต่มอเตอร์ไซค์ทั่วไป Big Bike รถเก๋ง SUV รถยนต์ไฟฟ้า EV ไปจนถึงรถ 6 ล้อ และ 10 ล้อ",
      badge: "ครบทุกยานพาหนะ",
    },
    {
      icon: CheckSquare,
      title: "มีขั้นตอนการทำงานชัดเจน",
      description: "ทุกขั้นตอนใช้วิธีและอุปกรณ์เฉพาะจุด แยกผ้าและอุปกรณ์ล้อออกจากตัวถังอย่างเคร่งครัด เก็บงานประณีต",
      badge: "ใส่ใจทุกดีเทล",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>WHY CHOOSE US</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            ทำไมต้อง PNC Auto GO
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            เราตั้งใจมอบบริการดูแลรถยนต์ที่มาตรฐานเทียบเท่าคาร์แคร์มืออาชีพ พร้อมความสะดวกสบายที่คุณไม่ต้องก้าวออกจากบ้าน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-brand-bg rounded-3xl p-7 border border-brand-border/80 hover:border-brand-primary/40 hover:bg-brand-light/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white text-brand-primary shadow-soft flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-brand-primary bg-brand-light px-2.5 py-1 rounded-full">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-brand-muted leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-brand-border/60 text-xs font-semibold text-brand-muted flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  <span>มาตรฐาน PNC Auto GO</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
