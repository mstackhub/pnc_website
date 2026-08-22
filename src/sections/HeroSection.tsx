"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Phone,
  Clock,
  MapPin,
  Car,
  BadgeCheck,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { siteConfig } from "@/data/company";
import { analytics } from "@/lib/analytics";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const handleLineClick = () => {
    analytics.clickLine("hero_primary_cta");
    onOpenBooking();
  };

  const handlePhoneClick = () => {
    analytics.clickPhone("hero_secondary_cta");
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-brand-light/50 via-brand-bg to-brand-bg"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-light rounded-full blur-3xl -z-10 pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (50% Desktop) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span>บริการล้างรถและดูแลรถถึงที่ นัดหมาย 24 ชม.</span>
            </div>

            {/* Main H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-5xl font-extrabold text-brand-text tracking-tight leading-[1.2]">
              บริการล้างรถถึงบ้าน 24 ชั่วโมง{" "}
              <span className="text-brand-primary underline decoration-brand-light decoration-4 underline-offset-8">
                รังสิต–ปทุมธานี
              </span>
            </h1>

            {/* Subheadline & Slogan */}
            <div className="space-y-3 text-brand-muted text-base sm:text-lg leading-relaxed">
              <p>
                สะดวก ไม่ต้องเสียเวลาขับรถไปคาร์แคร์ รองรับตั้งแต่มอเตอร์ไซค์ รถยนต์ รถ EV ไปจนถึงรถขนาดใหญ่ 6 ล้อ และ 10 ล้อ
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-brand-primary tracking-tight">
                “{siteConfig.slogan}”
              </p>
            </div>

            {/* Product Rule Highlight Notice */}
            <div className="text-xs text-brand-muted bg-white/80 border border-brand-border/80 p-3 rounded-xl flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-primary shrink-0" />
              <span>
                * นัดหมายบริการได้ตลอด 24 ชั่วโมง โดยจองล่วงหน้าและขึ้นอยู่กับคิวให้บริการ
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={handleLineClick}
                className="w-full sm:w-auto h-12 sm:h-[50px] px-7 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-base shadow-floating transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                <span>จองคิวผ่าน LINE</span>
              </button>

              {/* Secondary CTA */}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                onClick={handlePhoneClick}
                className="w-full sm:w-auto h-12 sm:h-[50px] px-6 rounded-2xl bg-white hover:bg-brand-light/60 border border-brand-border text-brand-text font-bold text-base shadow-sm transition flex items-center justify-center gap-2.5 hover:text-brand-primary active:scale-95"
              >
                <Phone className="w-5 h-5 text-brand-primary" />
                <span>โทร {siteConfig.phone}</span>
              </a>

              {/* Third Action */}
              <Link
                href="#pricing"
                onClick={() => analytics.viewPricing()}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-muted hover:text-brand-primary py-2 px-3 transition"
              >
                <span>ดูราคา</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-brand-border/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-brand-text">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                <span>บริการถึงที่</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                <span>นัดได้ 24 ชม.</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-brand-primary shrink-0" />
                <span>หลายประเภทรถ</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-brand-primary shrink-0" />
                <span>เริ่ม 200 บาท</span>
              </div>
            </div>
          </div>

          {/* Right Column (50% Desktop): Hero Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 group">
              <Image
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=85"
                alt="บริการล้างรถถึงบ้าน PNC Auto GO รถยนต์สะอาดเงางาม"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Hero Card 1 */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-brand-border flex items-center gap-2.5 animate-in fade-in slide-in-from-top duration-500">
                <div className="w-8 h-8 rounded-full bg-brand-light text-brand-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] text-brand-muted font-medium">การันตีความใส่ใจ</div>
                  <div className="text-xs font-bold text-brand-text">แยกอุปกรณ์ทุกจุด</div>
                </div>
              </div>

              {/* Floating Hero Card 2 */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-brand-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-brand-text">
                    นัดล้างรถได้ทุกช่วงเวลา
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    คุณพักผ่อน เราดูแลรถคุณให้ ณ สถานที่ของคุณ
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-3.5 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition shadow shrink-0"
                >
                  เช็กคิวว่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
