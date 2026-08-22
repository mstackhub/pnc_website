"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Sparkles, Send } from "lucide-react";
import { siteConfig } from "@/data/company";
import { formatPrice } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

interface ServiceAreaCalcProps {
  onOpenBooking: () => void;
}

export const ServiceAreaCalc: React.FC<ServiceAreaCalcProps> = ({ onOpenBooking }) => {
  const [distanceKm, setDistanceKm] = useState<number>(15);

  const freeRadius = siteConfig.serviceRadiusFreeKm; // 20
  const ratePerKm = siteConfig.extraKmFeeRate; // 5

  const extraKm = Math.max(0, distanceKm - freeRadius);
  const travelFee = extraKm * ratePerKm;

  const handleSendLocation = () => {
    analytics.clickSendLocation();
    onOpenBooking();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center">
          <Navigation className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-brand-text">
            คำนวณค่าเดินทางเบื้องต้น
          </h3>
          <p className="text-xs text-brand-muted">
            จุดตั้งต้น: {siteConfig.baseLocation}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Slider Input */}
        <div>
          <div className="flex justify-between items-center text-sm font-semibold mb-2">
            <span className="text-brand-text">ระยะทางจากจุดตั้งต้น:</span>
            <span className="text-brand-primary text-base font-bold bg-brand-light px-3 py-0.5 rounded-full">
              {distanceKm} กิโลเมตร
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="60"
            step="1"
            value={distanceKm}
            onChange={(e) => setDistanceKm(Number(e.target.value))}
            className="w-full h-2 bg-brand-light rounded-lg appearance-none cursor-pointer accent-brand-primary"
            aria-label="เลือกระยะทางเป็นกิโลเมตร"
          />
          <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
            <span>1 กม.</span>
            <span className="text-brand-primary font-bold">20 กม. (ฟรี)</span>
            <span>40 กม.</span>
            <span>60 กม.</span>
          </div>
        </div>

        {/* Result Card */}
        <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border/80 flex items-center justify-between">
          <div>
            <div className="text-xs text-brand-muted">ค่าบริการเดินทาง:</div>
            <div className="text-sm font-semibold text-brand-text">
              {distanceKm <= freeRadius ? (
                <span className="inline-flex items-center gap-1 text-brand-primary font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  ฟรีค่าเดินทาง (ในระยะ 20 กม.)
                </span>
              ) : (
                <span>
                  ส่วนเกิน {extraKm} กม. × {ratePerKm} บาท
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-brand-primary">
              {distanceKm <= freeRadius ? "0" : formatPrice(travelFee)}{" "}
              <span className="text-sm font-normal text-brand-text">บาท</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleSendLocation}
          className="w-full h-12 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-sm font-bold shadow transition flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>ส่ง Location ประเมินค่าเดินทางและจองคิว</span>
        </button>

        <p className="text-center text-[11px] text-brand-muted">
          * สำหรับพื้นที่ต่างจังหวัดหรือระยะทางไกล สามารถส่งพิกัดให้ทีมงานประเมินล่วงหน้าได้ครับ
        </p>
      </div>
    </div>
  );
};
