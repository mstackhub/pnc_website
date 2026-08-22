"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/company";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onOpenBooking: (vehicleType?: string, service?: string) => void;
}

const NAV_LINKS = [
  { href: "#home", label: "หน้าแรก" },
  { href: "#why-us", label: "จุดเด่น" },
  { href: "#process", label: "ขั้นตอนการล้าง" },
  { href: "#portfolio", label: "ผลงาน" },
  { href: "#pricing", label: "บริการและราคา" },
  { href: "#service-area", label: "พื้นที่ให้บริการ" },
  { href: "#faq", label: "คำถามที่พบบ่อย" },
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

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleBookingClick = () => {
    analytics.clickBooking("header_nav_button");
    setMobileMenuOpen(false);
    onOpenBooking();
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft py-3 border-b border-brand-border/60"
          : "bg-white/80 sm:bg-transparent py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-black text-lg shadow-md group-hover:bg-brand-dark transition-colors">
              PNC
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-brand-text leading-none">
                PNC <span className="text-brand-primary">AUTO GO</span>
              </span>
              <span className="text-[10px] text-brand-muted font-medium mt-0.5 tracking-wider">
                MOBILE CAR WASH & DETAILING
              </span>
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
              <Sparkles className="w-4 h-4" />
              <span>จองล้างรถ</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleBookingClick}
              className="h-9 px-3.5 rounded-lg bg-brand-primary text-white text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>จองคิว</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-text hover:bg-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label={mobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white/98 backdrop-blur-lg border-b border-brand-border shadow-xl p-5 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-4 py-3 rounded-xl text-base font-semibold text-brand-text hover:bg-brand-light hover:text-brand-primary transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-brand-border space-y-2.5">
            <button
              type="button"
              onClick={handleBookingClick}
              className="w-full h-12 rounded-xl bg-brand-primary text-white font-bold text-sm shadow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>จองล้างรถออนไลน์</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.clickLine("mobile_menu");
                  setMobileMenuOpen(false);
                }}
                className="h-11 rounded-xl bg-[#06C755] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>แอด LINE</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                onClick={() => {
                  analytics.clickPhone("mobile_menu");
                  setMobileMenuOpen(false);
                }}
                className="h-11 rounded-xl border border-brand-border text-brand-text text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-brand-light transition"
              >
                <Phone className="w-4 h-4 text-brand-primary" />
                <span>โทรด่วน</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
