"use client";

import React from "react";
import Image from "next/image";
import { Gauge, Layers, Disc, Wind, Sparkles, ShieldCheck, Wrench } from "lucide-react";
import { equipmentData } from "@/data/equipment";

const ICON_MAP: Record<string, React.ElementType> = {
  Gauge,
  Layers,
  Disc,
  Wind,
  Sparkles,
  ShieldCheck,
};

export const EquipmentSection: React.FC = () => {
  return (
    <section id="equipment" className="py-20 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <Wrench className="w-4 h-4" />
            <span>TOOLS & PROFESSIONAL EQUIPMENT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            อุปกรณ์ที่ใช้ดูแลรถของคุณ
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            เราเลือกใช้อุปกรณ์ให้เหมาะกับแต่ละขั้นตอน เพื่อให้การทำงานเป็นระบบและเก็บรายละเอียดได้ง่ายขึ้น
          </p>
        </div>

        {/* Equipment 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {equipmentData.map((item) => {
            const Icon = ICON_MAP[item.iconName] || Wrench;

            return (
              <div
                key={item.id}
                className="bg-brand-bg rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {item.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl text-brand-primary shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.benefits && item.benefits.length > 0 && (
                    <div className="pt-3 border-t border-brand-border/60 space-y-1.5 text-xs text-brand-text">
                      {item.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
