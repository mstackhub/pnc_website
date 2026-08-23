"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  Calendar,
  Home,
  ShieldCheck,
  ListOrdered,
  Image as ImageIcon,
  Tag,
  MapPin,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { LineIcon } from "@/components/BrandIcons";
import { siteConfig } from "@/data/company";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onOpenBooking?: (vehicleType?: string, service?: string) => void;
}

const NAV_LINKS = [
  { href: "#home", label: "หน้าแรก", icon: Home },
  { href: "#why-us", label: "จุดเด่น", icon: ShieldCheck },
  { href: "#process", label: "ขั้นตอนการล้าง", icon: ListOrdered },
  { href: "#portfolio", label: "ผลงานจริง", icon: ImageIcon },
  { href: "#pricing", label: "บริการและราคา", icon: Tag },
  { href: "#service-area", label: "พื้นที่ให้บริการ", icon: MapPin },
  { href: "#faq", label: "คำถามที่พบบ่อย", icon: HelpCircle },
];

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleBookingClick = () => {
    analytics.clickBooking("header_nav_button");
    setMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = "/#pricing";
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft py-3 border-b border-brand-border/60"
            : "bg-white/90 sm:bg-transparent py-3.5 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="#home"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl"
            >
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center shrink-0 border border-brand-border/60 bg-white group-hover:scale-105 transition-transform p-1">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.name} Logo`}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-brand-text hover:text-brand-primary hover:bg-brand-light/60 transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                onClick={() => analytics.clickPhone("header_desktop")}
                className="flex items-center gap-2 text-xs font-semibold text-brand-text hover:text-brand-primary px-3 py-2 rounded-lg hover:bg-brand-light/40 transition"
              >
                <Phone className="w-4 h-4 text-brand-primary" />
                <span>{siteConfig.phone}</span>
              </a>

              <button
                type="button"
                onClick={handleBookingClick}
                className="h-11 px-5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <Calendar className="w-4 h-4" />
                <span>จองล้างรถ</span>
              </button>
            </div>

            {/* Mobile Actions: CTA + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={handleBookingClick}
                className="h-9 px-3.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow transition flex items-center gap-1.5 active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>จองคิว</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-brand-text hover:bg-brand-light border border-brand-border/60 bg-white/90 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary active:scale-95"
                aria-label="เปิดเมนู"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay & Solid Menu Modal */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 flex flex-col justify-start"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Drawer Panel */}
          <div
            className="w-full bg-white rounded-b-3xl shadow-2xl border-b border-brand-border max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-top duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="p-4 sm:p-5 border-b border-brand-border bg-brand-bg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center shrink-0 border border-brand-border/60 bg-white p-1">
                  <Image
                    src={siteConfig.logo}
                    alt={`${siteConfig.name} Logo`}
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base text-brand-text leading-tight">
                    เมนูการใช้งาน
                  </span>
                  <span className="text-[11px] text-brand-muted">
                    PNC Auto GO
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white hover:bg-brand-light text-brand-muted hover:text-brand-text border border-brand-border shadow-sm transition"
                aria-label="ปิดเมนู"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-1.5 flex-1 bg-white">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center justify-between p-3.5 rounded-2xl text-brand-text font-bold text-sm hover:bg-brand-light hover:text-brand-primary active:bg-brand-light transition border border-transparent hover:border-brand-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-brand-bg text-brand-primary flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-muted" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-5 border-t border-brand-border bg-brand-bg space-y-3">
              {/* Primary Booking Button */}
              <button
                type="button"
                onClick={handleBookingClick}
                className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>จองล้างรถออนไลน์</span>
              </button>

              {/* LINE & Call Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    analytics.clickLine("mobile_menu");
                    setMobileMenuOpen(false);
                  }}
                  className="h-11 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
                >
                  <LineIcon className="w-4 h-4 fill-current" />
                  <span>แอด LINE</span>
                </a>

                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  onClick={() => {
                    analytics.clickPhone("mobile_menu");
                    setMobileMenuOpen(false);
                  }}
                  className="h-11 rounded-xl bg-white border border-brand-border text-brand-text text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-brand-light active:scale-95 transition shadow-sm"
                >
                  <Phone className="w-4 h-4 text-brand-primary" />
                  <span>โทรด่วน</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
