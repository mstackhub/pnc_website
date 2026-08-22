"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed z-30 flex items-center justify-center transition-all duration-300 transform active:scale-90",
        // Position: Placed above mobile bottom bar on mobile, and standard bottom right on desktop
        "bottom-20 right-4 lg:bottom-8 lg:right-8",
        "w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-primary hover:bg-brand-dark text-white shadow-floating border border-white/30",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
        "animate-in fade-in slide-in-from-bottom-4 duration-300"
      )}
      aria-label="เลื่อนขึ้นบนสุด"
      title="เลื่อนขึ้นบนสุด"
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
};
