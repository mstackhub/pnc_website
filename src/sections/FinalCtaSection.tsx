"use client";

import React from "react";
import { MessageCircle, Share2, Phone, Sparkles, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/company";
import { analytics } from "@/lib/analytics";

interface FinalCtaSectionProps {
  onOpenBooking: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  const handleLineClick = () => {
    analytics.clickLine("final_cta");
    onOpenBooking();
  };

  const handleFacebookClick = () => {
    analytics.clickFacebook("final_cta");
    window.open(siteConfig.facebookUrl, "_blank", "noopener,noreferrer");
  };

  const handlePhoneClick = () => {
    analytics.clickPhone("final_cta");
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#102A21] text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs sm:text-sm font-bold backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>สะดวก รวดเร็ว ดูแลถึงที่ 24 ชั่วโมง</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white leading-[1.35] sm:leading-[1.4]">
          วันนี้คุณไม่จำเป็นต้องเสียเวลาไปล้างรถเอง
        </h2>

        {/* Description & Slogan */}
        <div className="space-y-3 max-w-2xl mx-auto text-white/80 text-base sm:text-lg leading-relaxed">
          <p>
            เลือกเวลาที่สะดวก แล้วให้ PNC Auto GO ไปดูแลรถถึงสถานที่ของคุณ
          </p>
          <p className="text-xl sm:text-2xl font-black text-emerald-400">
            “{siteConfig.slogan}”
          </p>
        </div>

        {/* Highlight Points */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/90">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>นัดล่วงหน้าได้ 24 ชม.</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>ฟรีค่าเดินทาง 20 กม. แรก</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>แยกอุปกรณ์ทุกจุด</span>
          </div>
        </div>

        {/* CTA 3 Channel Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 max-w-xl mx-auto">
          {/* 1. LINE CTA */}
          <button
            type="button"
            onClick={handleLineClick}
            className="w-full sm:w-auto flex-1 h-14 px-7 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-base shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>จองผ่าน LINE</span>
          </button>

          {/* 2. Facebook Messenger */}
          <button
            type="button"
            onClick={handleFacebookClick}
            className="w-full sm:w-auto flex-1 h-14 px-6 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-base shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            <span>Facebook Messenger</span>
          </button>

          {/* 3. Phone */}
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            onClick={handlePhoneClick}
            className="w-full sm:w-auto h-14 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base shadow transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>โทร {siteConfig.phone}</span>
          </a>
        </div>

        <p className="text-xs text-white/50 pt-2">
          * รับนัดหมายบริการตลอด 24 ชั่วโมง โดยจองล่วงหน้าและขึ้นอยู่กับคิวให้บริการ
        </p>
      </div>
    </section>
  );
};
