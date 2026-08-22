"use client";

import React from "react";

interface DemoBadgeProps {
  label?: string;
  className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({
  label = "ข้อมูลตัวอย่าง",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300 ${className}`}
      title="เนื้อหานี้แสดงสำหรับโหมดตัวอย่าง (Staging / Demo)"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
      {label}
    </span>
  );
};
