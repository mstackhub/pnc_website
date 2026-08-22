"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
  title?: string;
  vehicleType?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2" | "auto";
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  altBefore,
  altAfter,
  title,
  vehicleType,
  className = "",
  aspectRatio = "16/9",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-brand-border shadow-card bg-neutral-900"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* AFTER Image (Full background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={altAfter}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority={false}
          />
          {/* AFTER Label */}
          <div className="absolute bottom-4 right-4 z-10 bg-brand-primary/90 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-md pointer-events-none">
            AFTER (หลังบริการ)
          </div>
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={altBefore}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority={false}
          />
          {/* BEFORE Label */}
          <div className="absolute bottom-4 left-4 z-10 bg-neutral-900/80 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-md pointer-events-none">
            BEFORE (ก่อนล้าง)
          </div>
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-brand-primary shadow-xl border-2 border-brand-primary flex items-center justify-center pointer-events-auto cursor-ew-resize">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Hidden accessible range slider for screen readers */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          aria-label="เปรียบเทียบภาพก่อนและหลังล้างรถ"
          className="sr-only"
        />
      </div>

      {(title || vehicleType) && (
        <div className="flex items-center justify-between px-1 text-sm">
          {title && <span className="font-semibold text-brand-text">{title}</span>}
          {vehicleType && (
            <span className="text-xs bg-brand-light text-brand-primary font-medium px-2.5 py-0.5 rounded-full">
              {vehicleType}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
