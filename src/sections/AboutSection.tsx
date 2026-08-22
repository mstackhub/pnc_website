"use client";

import React from "react";
import Image from "next/image";
import { Users, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/company";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-brand-border shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (Content) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
                <HeartHandshake className="w-4 h-4" />
                <span>ABOUT PNC AUTO GO</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight leading-snug">
                PNC Auto GO เกิดขึ้นเพราะเราอยากให้การดูแลรถง่ายขึ้น
              </h2>

              <div className="space-y-4 text-brand-muted text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>PNC Auto GO</strong> ก่อตั้งขึ้นอย่างเป็นทางการเมื่อวันที่{" "}
                  <span className="text-brand-dark font-bold">1 กุมภาพันธ์ 2026</span> จากความเข้าใจในปัญหาของคนรักรถที่ต้องทำงานหนักและมีเวลาจำกัด
                </p>
                <p>
                  แนวคิดของเราเรียบง่ายแต่จริงใจ:{" "}
                  <span className="text-brand-text font-semibold">
                    เจ้าของรถไม่ควรต้องสูญเสียเวลาพักผ่อนไปกับการเดินทางและนั่งรอคิวล้างรถเป็นชั่วโมง
                  </span>
                </p>
                <p>
                  เราจึงนำบริการล้างรถและดีเทลลิ่งคุณภาพไปถึงสถานที่ที่คุณสะดวก ไม่ว่าจะเป็นที่บ้าน คอนโด หรือที่ทำงาน พร้อมเปิดรับนัดหมายได้ตลอด 24 ชั่วโมง โดยจองล่วงหน้า เพื่อให้ทุกคันได้รับการดูแลอย่างประณีตที่สุดจากทีมงานที่ใส่ใจในทุกรายละเอียด
                </p>
              </div>

              {/* Slogan Highlight Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-light to-brand-bg border-2 border-brand-primary/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                    BRAND PROMISE
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-brand-text">
                    “{siteConfig.slogan}”
                  </div>
                </div>
              </div>

              {/* Quick Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-bold text-brand-text">
                <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-center">
                  <div className="text-brand-primary text-base font-black">2 คน</div>
                  <div className="text-brand-muted font-normal mt-0.5">ทีมงานหลักดูแลใกล้ชิด</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-center">
                  <div className="text-brand-primary text-base font-black">24 ชม.</div>
                  <div className="text-brand-muted font-normal mt-0.5">นัดหมายตามคิวสะดวก</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-center col-span-2 sm:col-span-1">
                  <div className="text-brand-primary text-base font-black">100%</div>
                  <div className="text-brand-muted font-normal mt-0.5">บริการถึงหน้าบ้านคุณ</div>
                </div>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-900">
                <Image
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80"
                  alt="ทีมงาน PNC Auto GO ดูแลความสะอาดรถยนต์"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow border border-brand-border text-xs text-brand-text">
                  <div className="font-bold">ใส่ใจทุกรายละเอียดเหมือนรถของเราเอง</div>
                  <div className="text-[11px] text-brand-muted mt-0.5">
                    ก่อตั้งเมื่อ 1 กุมภาพันธ์ 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
