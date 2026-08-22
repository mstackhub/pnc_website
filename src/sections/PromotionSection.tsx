"use client";

import React from "react";
import { Gift, Percent, Users, Sparkles, ArrowRight } from "lucide-react";
import { promotionsData } from "@/data/promotions";
import { analytics } from "@/lib/analytics";

interface PromotionSectionProps {
  onOpenBooking: (vehicleType?: string, service?: string) => void;
}

export const PromotionSection: React.FC<PromotionSectionProps> = ({ onOpenBooking }) => {
  const handlePromoInquire = () => {
    analytics.clickBooking("promotion_section");
    onOpenBooking("other", "สอบถามแพ็กเกจโปรโมชั่นหลายคัน / ลูกค้าประจำ");
  };

  return (
    <section id="promotion" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <Gift className="w-4 h-4" />
            <span>SPECIAL PROMOTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            ยิ่งหลายคัน ยิ่งคุ้ม
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            สิทธิพิเศษและส่วนลดสำหรับบ้านที่มีรถหลายคัน นิติบุคคล คอนโด ออฟฟิศ และลูกค้าประจำที่ไว้วางใจเรา
          </p>
        </div>

        {/* Promo 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {promotionsData.map((promo) => (
            <div
              key={promo.id}
              className={`rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between ${
                promo.popular
                  ? "bg-white border-2 border-brand-primary shadow-card relative -translate-y-1"
                  : "bg-white/90 border border-brand-border shadow-soft hover:shadow-card"
              }`}
            >
              {promo.popular && (
                <div className="absolute -top-3.5 right-6 bg-brand-primary text-white text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>สุดคุ้ม</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-primary bg-brand-light px-3 py-1 rounded-full">
                    {promo.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center font-black">
                    <Percent className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-text">
                  {promo.title}
                </h3>

                <div className="py-2">
                  <span className="text-4xl font-black text-brand-primary tracking-tight">
                    {promo.discount}
                  </span>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {promo.description}
                </p>

                <div className="p-3 rounded-xl bg-brand-bg border border-brand-border/70 text-xs text-brand-text">
                  <strong>เงื่อนไข:</strong> {promo.condition}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/60">
                <button
                  type="button"
                  onClick={handlePromoInquire}
                  className="w-full h-11 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
                >
                  <span>รับสิทธิ์โปรโมชั่นนี้</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Banner */}
        <div className="text-center">
          <button
            type="button"
            onClick={handlePromoInquire}
            className="h-13 px-8 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-base shadow-floating transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2.5 active:scale-95"
          >
            <Users className="w-5 h-5" />
            <span>สอบถามโปรโมชั่นและนัดหมาย</span>
          </button>
        </div>
      </div>
    </section>
  );
};
