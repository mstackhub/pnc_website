"use client";

import React from "react";
import { MapPin, Navigation, Compass, CheckCircle2, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/data/company";
import { ServiceAreaCalc } from "@/components/ServiceAreaCalc";

interface ServiceAreaSectionProps {
  onOpenBooking: () => void;
}

const PRIMARY_AREAS = [
  "รังสิต",
  "คลองหลวง (คลอง 1 - คลอง 6)",
  "ธัญบุรี",
  "ลำลูกกา",
  "เมืองปทุมธานี",
  "นวนคร",
  "ธรรมศาสตร์ ศูนย์รังสิต",
  "ม.กรุงเทพ",
  "ฟิวเจอร์พาร์ค รังสิต และใกล้เคียง",
  "สายไหม / ดอนเมือง (ตามระยะทาง)",
];

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="service-area" className="py-20 sm:py-24 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <Compass className="w-4 h-4" />
            <span>COVERAGE & SERVICE AREA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            อยู่แถวไหน เราไปหาได้บ้าง?
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            จุดเริ่มต้นบริการตั้งอยู่ที่ <strong>{siteConfig.baseLocation}</strong> พร้อมเดินทางไปดูแลรถให้คุณถึงที่ในเขตปทุมธานีและพื้นที่ใกล้เคียง
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Coverage List & Policy */}
          <div className="lg:col-span-5 space-y-6">
            {/* Free Radius Card */}
            <div className="p-6 rounded-3xl bg-brand-light border border-brand-primary/30 space-y-3">
              <div className="flex items-center gap-2.5 text-brand-dark font-extrabold text-lg">
                <MapPin className="w-6 h-6 text-brand-primary" />
                <span>ฟรีค่าเดินทาง 20 กิโลเมตรแรก!</span>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                ลูกค้านัดหมายในรัศมี 20 กม. จาก {siteConfig.baseLocation} ไม่มีค่าบริการเดินทางเพิ่มเติม จ่ายเฉพาะค่าบริการล้างรถตามแพ็กเกจ
              </p>
              <div className="pt-2 text-xs font-semibold text-brand-text">
                * ระยะทางเกิน 20 กิโลเมตรขึ้นไป คิดเพิ่มเพียง <strong>+5 บาท / กิโลเมตร</strong>
              </div>
            </div>

            {/* Area Pills */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">
                พื้นที่ที่ให้บริการบ่อย:
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRIMARY_AREAS.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border text-xs text-brand-muted flex items-start gap-2.5">
              <Navigation className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <span>
                <strong>ต่างจังหวัดหรือพื้นที่นอกเหนือจากนี้:</strong> สามารถส่ง Location ให้ทีมงานช่วยประเมินคิวและค่าเดินทางล่วงหน้าได้ครับ
              </span>
            </div>
          </div>

          {/* Right Column (7 Cols): Interactive Distance & Travel Fee Calculator */}
          <div className="lg:col-span-7">
            <ServiceAreaCalc onOpenBooking={onOpenBooking} />
          </div>
        </div>
      </div>
    </section>
  );
};
