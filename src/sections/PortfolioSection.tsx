"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Maximize2, ArrowRight, CheckCircle2, ChevronDown, Eye } from "lucide-react";
import { beforeAfterItems, galleryPhotos } from "@/data/portfolio";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Lightbox } from "@/components/Lightbox";
import { analytics } from "@/lib/analytics";

interface PortfolioSectionProps {
  onOpenBooking: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<"slider" | "gallery">("slider");
  const [selectedBaIndex, setSelectedBaIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const currentBa = beforeAfterItems[selectedBaIndex] || beforeAfterItems[0];
  const displayedPhotos = showAllPhotos ? galleryPhotos : galleryPhotos.slice(0, 6);

  const handleOpenLightbox = (index: number) => {
    analytics.viewPortfolio();
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCtaClick = () => {
    analytics.clickBooking("portfolio_section");
    onOpenBooking();
  };

  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-white border-y border-brand-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>REAL WORK PORTFOLIO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
            ดูผลงานจริงก่อนตัดสินใจ
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            ภาพจากรถที่ PNC Auto GO ให้บริการจริง ดูแลสะอาดเงางามทั้งภายนอกและภายใน
          </p>
        </div>

        {/* Portfolio Tabs (Before/After vs All Gallery) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto px-1 pb-3 mb-8 sm:mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("slider")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm shrink-0 ${
              activeTab === "slider"
                ? "bg-brand-primary text-white"
                : "bg-brand-bg text-brand-muted hover:text-brand-text hover:bg-brand-light/60"
            }`}
          >
            เปรียบเทียบ Before / After
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm shrink-0 ${
              activeTab === "gallery"
                ? "bg-brand-primary text-white"
                : "bg-brand-bg text-brand-muted hover:text-brand-text hover:bg-brand-light/60"
            }`}
          >
            ภาพผลงานทั้งหมด ({galleryPhotos.length} รูป)
          </button>
        </div>

        {/* View 1: Interactive Before / After Slider */}
        {activeTab === "slider" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Vehicle Selector Pills */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto px-1 pb-3">
              {beforeAfterItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedBaIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                    selectedBaIndex === idx
                      ? "bg-brand-dark text-white shadow-md"
                      : "bg-brand-bg text-brand-muted hover:text-brand-text hover:bg-brand-light"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {selectedBaIndex === idx && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {item.vehicleType}
                  </span>
                </button>
              ))}
            </div>

            {/* Slider Component Card */}
            <div className="bg-brand-bg p-4 sm:p-6 rounded-3xl border border-brand-border shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    ผลงานจริง
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-brand-text">
                    {currentBa.title}
                  </h3>
                </div>
                <div className="text-xs text-brand-muted hidden sm:block">
                  * ลากแถบเพื่อเปรียบเทียบก่อน-หลัง
                </div>
              </div>

              <BeforeAfterSlider
                beforeImage={currentBa.beforeImage}
                afterImage={currentBa.afterImage}
                altBefore={currentBa.altBefore}
                altAfter={currentBa.altAfter}
              />

              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-brand-border/60">
                {currentBa.description && (
                  <p className="text-xs sm:text-sm text-brand-muted flex-1">
                    <strong>รายละเอียดงาน:</strong> {currentBa.description}
                  </p>
                )}
                <Link
                  href={`/portfolio/${currentBa.id}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition shadow-sm shrink-0 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>ดูอัลบั้มและรายละเอียดผลงานเต็ม ➔</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Responsive Photo Gallery Grid */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-soft cursor-pointer border border-brand-border/80 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    ผลงานจริง
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <h4 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">
                      {photo.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Expand / Collapse Button */}
            {galleryPhotos.length > 6 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowAllPhotos(!showAllPhotos)}
                  className="px-6 py-3 rounded-xl bg-brand-bg hover:bg-brand-light border border-brand-border text-brand-text font-bold text-sm transition inline-flex items-center gap-2"
                >
                  <span>{showAllPhotos ? "ย่อรูปภาพ" : "ดูผลงานเพิ่มเติม"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showAllPhotos ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {/* CTA Bottom Banner */}
        <div className="text-center mt-14 sm:mt-16 pt-8 border-t border-brand-border/60 space-y-4">
          <p className="text-sm font-semibold text-brand-muted">
            สัมผัสความสะอาดเงางามระดับพรีเมียมถึงหน้าบ้านคุณ
          </p>
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full sm:w-auto h-12 sm:h-[50px] px-8 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-base shadow-floating transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2.5 active:scale-95"
          >
            <span>อยากให้รถคุณเป็นคันต่อไป — จองคิวเลย</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          photos={galleryPhotos}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      </div>
    </section>
  );
};
