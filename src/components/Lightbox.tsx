"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryPhoto } from "@/types";

interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = photos[currentIndex];
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="ดูภาพผลงานขยายใหญ่"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar with Title & Close */}
      <div
        className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-50 text-white bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="text-sm sm:text-base font-semibold truncate max-w-[200px] sm:max-w-md">
            {currentPhoto.title}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="ปิดหน้าต่างขยายภาพ"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons (Desktop) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition backdrop-blur-sm hidden sm:flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="ภาพก่อนหน้า"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition backdrop-blur-sm hidden sm:flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="ภาพถัดไป"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Image Container */}
      <div
        className="relative w-full h-full max-w-5xl max-h-[80vh] p-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={currentPhoto.image}
            alt={currentPhoto.alt}
            fill
            sizes="100vw"
            className="object-contain select-none"
            priority
          />
        </div>
      </div>

      {/* Bottom Description */}
      <div
        className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-center text-white/90 text-xs sm:text-sm bg-gradient-to-t from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <p>{currentPhoto.alt}</p>
        <p className="text-white/60 text-xs mt-1 sm:hidden">
          ปัดซ้าย-ขวา เพื่อเปลี่ยนภาพ
        </p>
      </div>
    </div>
  );
};
