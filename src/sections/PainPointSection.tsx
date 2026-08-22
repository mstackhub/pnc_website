"use client";

import React from "react";
import { Hourglass, Car, Truck, MoonStar, CheckCircle2, ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface PainPointSectionProps {
  onOpenBooking: () => void;
}

export const PainPointSection: React.FC<PainPointSectionProps> = ({ onOpenBooking }) => {
  const painPoints = [
    {
      icon: Hourglass,
      title: "ไม่มีเวลาเข้าคาร์แคร์",
      description: "เลิกงานเหนื่อยๆ วันหยุดอยากพัก ไม่อยากเสียเวลาขับรถไปนั่งรอคิว 1–2 ชั่วโมงที่ร้านล้างรถ",
    },
    {
      icon: Car,
      title: "มีรถหลายคันที่บ้าน",
      description: "ไม่สะดวกขับรถไปล้างทีละคัน สลับรถไปมา เสียค่าน้ำมันและเสียเวลาทั้งครอบครัว",
    },
    {
      icon: Truck,
      title: "รถใหญ่หาที่ล้างยาก",
      description: "Big Bike, รถตู้, รถ 6 ล้อ หรือรถ 10 ล้อ คาร์แคร์ทั่วไปอาจไม่รับล้างหรือเข้าช่องล้างลำบาก",
    },
    {
      icon: MoonStar,
      title: "อยากเลือกเวลาที่สะดวก",
      description: "ต้องการล้างตอนเช้าตรู่ก่อนออกเดินทาง หรือช่วงกลางคืนหลังเลิกงานที่ร้านทั่วไปปิดหมดแล้ว",
    },
  ];

  const handleCheckQueue = () => {
    analytics.clickBooking("pain_point_section");
    onOpenBooking();
  };

  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <span>PAIN POINTS & SOLUTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            ล้างรถไม่ควรกินเวลาพักของคุณ
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            หลายคนต้องสูญเสียเวลาพักผ่อนไปกับการขับรถไปร้านและนั่งรอคิว PNC Auto GO จึงออกแบบบริการมาเพื่อคืนเวลาอันมีค่าให้กับคุณ
          </p>
        </div>

        {/* 4 Pain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {painPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-text leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution Box & CTA */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-dark text-white rounded-3xl p-6 sm:p-10 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>ทางออกที่ง่ายและสบายกว่า</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-snug">
              PNC Auto GO เดินทางไปดูแลรถถึงสถานที่ตามวันและเวลาที่นัดหมาย
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              เพียงจองคิวล่วงหน้า ทีมงานพร้อมอุปกรณ์ครบครันจะเดินทางไปดูแลรถให้คุณถึงบ้าน คอนโด หรือที่ทำงาน
            </p>
          </div>

          <button
            type="button"
            onClick={handleCheckQueue}
            className="h-13 px-8 rounded-2xl bg-white text-brand-primary font-bold text-base hover:bg-brand-light transition shadow-lg shrink-0 flex items-center gap-2 active:scale-95"
          >
            <span>เช็กคิวว่าง</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
