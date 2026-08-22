"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Share2, Clock, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/company";
import { analytics } from "@/lib/analytics";

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-brand-darkSection text-white pt-16 pb-24 lg:pb-12 border-t border-brand-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-black text-lg shadow-md">
                PNC
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                  PNC <span className="text-emerald-400">AUTO GO</span>
                </span>
                <span className="text-[10px] text-white/60 font-medium mt-0.5 tracking-wider">
                  MOBILE CAR WASH & DETAILING
                </span>
              </div>
            </div>

            <p className="text-emerald-400 font-bold text-lg">
              “{siteConfig.slogan}”
            </p>

            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              บริการล้างรถและดูแลรถยนต์ถึงบ้านคุณ นัดหมายได้ตลอด 24 ชั่วโมง โดยจองล่วงหน้า รองรับตั้งแต่ มอเตอร์ไซค์ Big Bike รถยนต์ รถ EV ไปจนถึงรถ 6 ล้อ และ 10 ล้อ ในพื้นที่รังสิต–ปทุมธานี
            </p>

            <div className="flex items-center gap-2 text-xs text-white/80 pt-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>เปิดรับนัดหมายบริการ 24 ชม. (จองคิวล่วงหน้า)</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              เมนูลัด
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="#home" className="hover:text-emerald-400 transition">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-emerald-400 transition">
                  ขั้นตอนการล้างรถ 7 สเต็ป
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-emerald-400 transition">
                  ผลงานจริง ก่อน–หลัง
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-emerald-400 transition">
                  อัตราค่าบริการและราคา
                </Link>
              </li>
              <li>
                <Link href="#promotion" className="hover:text-emerald-400 transition">
                  โปรโมชั่นล้างหลายคัน
                </Link>
              </li>
              <li>
                <Link href="#service-area" className="hover:text-emerald-400 transition">
                  พื้นที่ให้บริการ รังสิต–ปทุมธานี
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-emerald-400 transition">
                  คำถามที่พบบ่อย (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Booking */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              ช่องทางการติดต่อ & นัดหมาย
            </h4>

            <div className="space-y-2.5">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                onClick={() => analytics.clickPhone("footer")}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition border border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-white/60">โทรสายตรง</div>
                  <div className="text-sm font-bold">{siteConfig.phone}</div>
                </div>
              </a>

              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.clickLine("footer")}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#06C755]/20 text-white transition border border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-[#06C755] flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-xs text-white/60">LINE Official</div>
                  <div className="text-sm font-bold">@pncautogo (แอดไลน์นัดคิว)</div>
                </div>
              </a>

              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.clickFacebook("footer")}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 text-white transition border border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-white/60">Facebook Messenger</div>
                  <div className="text-sm font-bold">PNC Auto GO</div>
                </div>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                analytics.clickBooking("footer");
                onOpenBooking();
              }}
              className="w-full h-11 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>เปิดฟอร์มนัดหมายคิวออนไลน์</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 2026 {siteConfig.name}. All Rights Reserved. ก่อตั้ง 1 กุมภาพันธ์ 2026
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>จุดตั้งต้น: {siteConfig.baseLocation} • ฟรีค่าเดินทาง 20 กม. แรก</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
