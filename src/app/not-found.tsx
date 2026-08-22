import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/company";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-card space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-brand-text">
            ไม่พบหน้าที่คุณต้องการ
          </h1>
          <p className="text-sm text-brand-muted leading-relaxed">
            หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบ หรือไม่มีอยู่ในระบบ PNC Auto GO
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/"
            className="h-12 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>กลับสู่หน้าแรก PNC Auto GO</span>
          </Link>

          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="h-12 rounded-xl bg-brand-bg hover:bg-brand-light border border-brand-border text-brand-text font-bold text-sm transition flex items-center justify-center gap-2"
          >
            <span>ติดต่อสอบถาม: {siteConfig.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
