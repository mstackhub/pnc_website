"use client";

import React from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { LineIcon } from "@/components/BrandIcons";
import { siteConfig } from "@/data/company";
import { analytics } from "@/lib/analytics";

interface MobileBottomNavProps {
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenBooking }) => {
  const handleCall = () => {
    analytics.clickPhone("sticky_bottom_bar");
  };

  const handleLine = () => {
    analytics.clickLine("sticky_bottom_bar");
  };

  const handleBooking = () => {
    analytics.clickBooking("sticky_bottom_bar");
    onOpenBooking();
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-brand-border/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2.5 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
      <div className="grid grid-cols-12 gap-2 max-w-md mx-auto">
        {/* 1. Phone Button */}
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          onClick={handleCall}
          className="col-span-3 h-12 rounded-xl bg-brand-bg hover:bg-brand-light border border-brand-border text-brand-text flex flex-col items-center justify-center text-[11px] font-bold active:scale-95 transition-all shadow-sm"
          aria-label="โทรนัดหมาย PNC Auto GO"
        >
          <Phone className="w-4 h-4 text-brand-primary mb-0.5" />
          <span>โทร</span>
        </a>

        {/* 2. LINE Button */}
        <a
          href={siteConfig.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLine}
          className="col-span-4 h-12 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white flex flex-col items-center justify-center text-[11px] font-bold active:scale-95 transition-all shadow-sm"
          aria-label="แอด LINE เพื่อจองคิวหรือสอบถาม"
        >
          <LineIcon className="w-4 h-4 fill-current mb-0.5" />
          <span>LINE</span>
        </a>

        {/* 3. Primary Booking CTA */}
        <button
          type="button"
          onClick={handleBooking}
          className="col-span-5 h-12 rounded-xl bg-brand-primary hover:bg-brand-dark text-white flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-all shadow-md"
          aria-label="เปิดแบบฟอร์มนัดหมายล้างรถ"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>จองคิวล้างรถ</span>
        </button>
      </div>
    </div>
  );
};
