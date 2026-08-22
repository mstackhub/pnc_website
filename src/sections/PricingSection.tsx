"use client";

import React, { useState } from "react";
import { Check, Sparkles, PlusCircle, ArrowRight, Tag } from "lucide-react";
import { pricingData } from "@/data/pricing";
import { PricingItem } from "@/types";
import { analytics } from "@/lib/analytics";

interface PricingSectionProps {
  onOpenBooking: (vehicleType?: string, service?: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "บริการทั้งหมด" },
  { id: "car", label: "รถยนต์ทั่วไป" },
  { id: "motorcycle", label: "มอเตอร์ไซค์ & Big Bike" },
  { id: "ev", label: "รถยนต์ไฟฟ้า EV" },
  { id: "truck", label: "รถ 6 ล้อ & 10 ล้อ" },
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPricing =
    selectedCategory === "all"
      ? pricingData
      : pricingData.filter((item) => item.category === selectedCategory);

  const handleBooking = (item: PricingItem) => {
    analytics.clickService(item.name);
    const vehicleKeyMap: Record<string, string> = {
      "car-size-s": "car-s",
      "car-size-m": "car-m",
      "car-size-l": "car-l",
      "motorcycle-standard": "motorcycle",
      "motorcycle-bigbike": "bigbike",
      "ev-car": "ev",
      "truck-6-wheels": "truck-6",
      "truck-10-wheels": "truck-10",
    };
    const vehicleType = vehicleKeyMap[item.id] || "car-m";
    const serviceName = `${item.name} (${item.priceLabel || item.price} บาท)`;
    onOpenBooking(vehicleType, serviceName);
  };

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <Tag className="w-4 h-4" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            เลือกบริการที่เหมาะกับรถของคุณ
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง นัดหมายล่วงหน้าได้ตลอด 24 ชั่วโมง ฟรีค่าเดินทาง 20 กม. แรก
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat.id
                  ? "bg-brand-primary text-white"
                  : "bg-brand-bg text-brand-muted hover:text-brand-text hover:bg-brand-light/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPricing.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                item.recommended
                  ? "bg-gradient-to-b from-brand-light/70 via-white to-white border-2 border-brand-primary shadow-floating -translate-y-1"
                  : "bg-brand-bg border border-brand-border/90 hover:border-brand-primary/40 hover:shadow-card"
              }`}
            >
              {/* Popular Badge */}
              {item.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>แนะนำ / ยอดนิยม</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Top Info */}
                <div className="space-y-2">
                  {item.badge && (
                    <span className="text-[11px] font-bold text-brand-primary bg-white border border-brand-primary/20 px-2.5 py-0.5 rounded-full inline-block">
                      {item.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold text-brand-text">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Price Display */}
                <div className="pt-3 border-t border-brand-border/60">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-brand-text tracking-tight">
                      {item.priceType === "contact" ? "สอบถามราคา" : item.priceLabel || item.price}
                    </span>
                    {item.priceType !== "contact" && (
                      <span className="text-sm font-semibold text-brand-muted">
                        บาท
                      </span>
                    )}
                  </div>
                  {item.unit && (
                    <div className="text-[11px] text-brand-muted mt-0.5">
                      {item.unit}
                    </div>
                  )}
                </div>

                {/* Services List */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-brand-text">
                    ครอบคลุมบริการ:
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-brand-text">
                    {item.services.map((srv, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                        <span className="leading-tight">{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add-ons */}
                {item.addOns && item.addOns.length > 0 && (
                  <div className="pt-4 border-t border-brand-border/60 space-y-2">
                    <div className="text-xs font-bold text-brand-primary flex items-center gap-1.5">
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>ออปชันเสริม:</span>
                    </div>
                    {item.addOns.map((addon, aIdx) => (
                      <div
                        key={aIdx}
                        className="text-xs bg-white p-2.5 rounded-xl border border-brand-border/80 flex items-center justify-between"
                      >
                        <span className="font-semibold text-brand-text">
                          {addon.name}
                        </span>
                        <span className="font-bold text-brand-primary">
                          +{addon.price} บาท
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-brand-border/60">
                <button
                  type="button"
                  onClick={() => handleBooking(item)}
                  className={`w-full h-12 rounded-xl font-bold text-sm transition shadow flex items-center justify-center gap-2 active:scale-95 ${
                    item.recommended
                      ? "bg-brand-primary hover:bg-brand-dark text-white"
                      : "bg-white hover:bg-brand-light/60 border border-brand-primary text-brand-primary"
                  }`}
                >
                  <span>{item.ctaText || "จองบริการนี้"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
