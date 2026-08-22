"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Car,
  Sparkles,
  Phone,
  MessageCircle,
  Share2,
  Copy,
  Check,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { siteConfig } from "@/data/company";
import { generateLineMessage, getLineShareUrl } from "@/lib/lineGenerator";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleType?: string;
  initialService?: string;
}

const VEHICLE_OPTIONS = [
  { id: "car-s", label: "รถยนต์ Size S (Eco Car / เก๋งเล็ก)", defaultService: "ล้าง + ดูดฝุ่น + เคลือบเงา" },
  { id: "car-m", label: "รถยนต์ Size M (เก๋งกลาง / Crossover)", defaultService: "ล้าง + ดูดฝุ่น + เคลือบเงา" },
  { id: "car-l", label: "รถยนต์ Size L / SUV / PPV / รถตู้", defaultService: "ล้าง + ดูดฝุ่น + เคลือบเงา" },
  { id: "motorcycle", label: "มอเตอร์ไซค์ทั่วไป", defaultService: "ล้างทำความสะอาด + เคลือบเงา" },
  { id: "bigbike", label: "Big Bike (300cc ขึ้นไป)", defaultService: "ล้างละเอียด + เคลือบเงา" },
  { id: "ev", label: "รถยนต์ไฟฟ้า (EV)", defaultService: "ล้าง + ดูดฝุ่น + เคลือบเงา (ระวังพอร์ตชาร์จ)" },
  { id: "truck-6", label: "รถ 6 ล้อขึ้นไป", defaultService: "ล้างตัวถัง + ดูดฝุ่น + เคลือบยาง" },
  { id: "truck-10", label: "รถ 10 ล้อ / รถหัวลาก", defaultService: "ล้างรอบคัน ประเมินราคาหน้างาน" },
  { id: "other", label: "รถประเภทอื่น / หลายคัน", defaultService: "บริการตามตกลง" },
];

const SERVICE_OPTIONS_BY_VEHICLE: Record<string, string[]> = {
  "car-s": [
    "ล้าง + ดูดฝุ่น + เคลือบเงา (350.-)",
    "ล้างภายนอก + เคลือบเงา",
    "ล้างดูดฝุ่น + เคลือบสีสูตรพิเศษ",
  ],
  "car-m": [
    "ล้าง + ดูดฝุ่น + เคลือบเงา (450.-)",
    "ล้างภายนอก + เคลือบเงา",
    "ล้างดูดฝุ่น + เคลือบสีสูตรพิเศษ",
  ],
  "car-l": [
    "ล้าง + ดูดฝุ่น + เคลือบเงา (550.-)",
    "ล้างภายนอก + เคลือบเงา",
    "ล้างดูดฝุ่น + เคลือบสีสูตรพิเศษ",
  ],
  motorcycle: [
    "ล้างทำความสะอาด + เคลือบเงา (200–250.-)",
    "ล้าง + ล้างโซ่เคลือบโซ่ (+120.-)",
  ],
  bigbike: [
    "ล้างละเอียด + เคลือบเงา (300–500.-)",
    "ล้างละเอียด + ล้างโซ่เคลือบโซ่ (+120.-)",
  ],
  ev: [
    "ล้าง + ดูดฝุ่น + เคลือบเงา (ตามขนาดรถ + 100-300.-)",
    "ล้างภายนอก + เคลือบเงา",
  ],
  "truck-6": [
    "ล้างตัวถัง + ดูดฝุ่น + เคลือบยาง (600–1,500.-)",
    "ล้างเฉพาะภายนอกและซุ้มล้อ",
  ],
  "truck-10": [
    "ล้างรอบคัน ประเมินราคาตามขนาดและสภาพงาน",
    "เหมาฟลีทหลายคัน",
  ],
  other: [
    "ล้างหลายคัน (แพ็กเกจลด 10-15%)",
    "ล้างประเภทพิเศษ สอบถามราคา",
  ],
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialVehicleType,
  initialService,
}) => {
  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  const [step, setStep] = useState<1 | 2>(1);
  const [vehicleId, setVehicleId] = useState<string>(initialVehicleType || "car-m");
  const [service, setService] = useState<string>(initialService || "ล้าง + ดูดฝุ่น + เคลือบเงา (450.-)");
  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>("10:00");
  const [location, setLocation] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      analytics.bookingFormStart();
      setStep(1);
      setCopied(false);
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Update initial vehicle and dynamic service
  useEffect(() => {
    if (initialVehicleType) {
      setVehicleId(initialVehicleType);
    }
  }, [initialVehicleType]);

  const handleVehicleChange = (newVehicleId: string) => {
    setVehicleId(newVehicleId);
    const availableServices = SERVICE_OPTIONS_BY_VEHICLE[newVehicleId] || [];
    if (availableServices.length > 0) {
      setService(availableServices[0]);
    }
  };

  const selectedVehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[0];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!vehicleId) newErrors.vehicle = "กรุณาเลือกประเภทรถ";
    if (!service) newErrors.service = "กรุณาเลือกบริการ";
    if (!date) newErrors.date = "กรุณาเลือกวันที่ต้องการบริการ";
    if (!time) newErrors.time = "กรุณาเลือกเวลาที่สะดวก";
    if (!location.trim()) newErrors.location = "กรุณาระบุสถานที่หรือพิกัด เช่น รังสิต คลองหลวง";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    analytics.bookingFormSubmit({
      vehicleType: selectedVehicle.label,
      service: service,
    });
    setStep(2);
  };

  const generatedMessage = generateLineMessage({
    vehicleType: selectedVehicle.label,
    service: service,
    date: date,
    time: time,
    location: location,
    notes: notes,
  });

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenLine = () => {
    analytics.clickLine("booking_modal_step2");
    const lineUrl = getLineShareUrl(siteConfig.lineUrl, generatedMessage);
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpenFacebook = () => {
    analytics.clickFacebook("booking_modal_step2");
    window.open(siteConfig.facebookUrl, "_blank", "noopener,noreferrer");
  };

  const handleCallPhone = () => {
    analytics.clickPhone("booking_modal_step2");
    window.location.href = `tel:${siteConfig.phoneRaw}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-6 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-brand-border bg-brand-bg flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="p-1.5 rounded-full hover:bg-white text-brand-muted transition"
                aria-label="ย้อนกลับไปแก้ไขข้อมูล"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">
                {step === 1 ? "ขั้นตอนที่ 1 จาก 2 : กรอกข้อมูลนัดหมาย" : "ขั้นตอนที่ 2 จาก 2 : เลือกช่องทางติดต่อ"}
              </span>
              <h3 id="booking-modal-title" className="text-lg sm:text-xl font-bold text-brand-text">
                {step === 1 ? "นัดหมายบริการล้างรถถึงที่" : "เลือกช่องทางเพื่อส่งคำขอจอง"}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white text-brand-muted hover:text-brand-text transition"
            aria-label="ปิดหน้าต่างจอง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {step === 1 ? (
            <form onSubmit={handleSubmitStep1} className="space-y-4">
              {/* Product Rule Notice */}
              <div className="p-3.5 rounded-xl bg-brand-light/80 border border-brand-primary/20 text-xs text-brand-dark flex items-start gap-2.5 leading-relaxed">
                <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>
                  <strong>สำคัญ:</strong> นัดหมายบริการได้ตลอด 24 ชั่วโมง โดยจองล่วงหน้าและขึ้นอยู่กับคิวให้บริการของทีมงาน
                </span>
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-1.5">
                  1. ประเภทรถ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={vehicleId}
                    onChange={(e) => handleVehicleChange(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-brand-border bg-white text-brand-text font-medium text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary appearance-none cursor-pointer"
                  >
                    {VEHICLE_OPTIONS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                  <Car className="w-4 h-4 text-brand-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.vehicle && <p className="text-xs text-red-500 mt-1">{errors.vehicle}</p>}
              </div>

              {/* Dynamic Service */}
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-1.5">
                  2. บริการที่ต้องการ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-brand-border bg-white text-brand-text font-medium text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary appearance-none cursor-pointer"
                  >
                    {(SERVICE_OPTIONS_BY_VEHICLE[vehicleId] || [selectedVehicle.defaultService]).map(
                      (srv, idx) => (
                        <option key={idx} value={srv}>
                          {srv}
                        </option>
                      )
                    )}
                  </select>
                  <Sparkles className="w-4 h-4 text-brand-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-1.5">
                    3. วันที่ต้องการ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-brand-border bg-white text-brand-text text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-1.5">
                    4. เวลาที่สะดวก (24 ชม.) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-brand-border bg-white text-brand-text text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>
                  {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-1.5">
                  5. สถานที่ / พิกัด <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="เช่น รังสิต คลองหลวง คลอง 1, ธัญบุรี, ลำลูกกา"
                    className="w-full h-12 px-4 pr-10 rounded-xl border border-brand-border bg-white text-brand-text text-sm placeholder:text-brand-muted/60 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                  <MapPin className="w-4 h-4 text-brand-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                <p className="text-[11px] text-brand-muted mt-1">
                  * ฟรีค่าเดินทาง 20 กม. แรกจากจุดตั้งต้นรังสิต (เกิน 20 กม. +5 บาท/กม.)
                </p>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-1.5">
                  6. หมายเหตุเพิ่มเติม (ถ้ามี)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="เช่น มีจุดต่อน้ำ/ปลั๊กไฟ, ล้างที่คอนโด/ลานจอดรถ, ขอเช็กรอยเปื้อนพิเศษ"
                  className="w-full p-3 rounded-xl border border-brand-border bg-white text-brand-text text-sm placeholder:text-brand-muted/60 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 sm:h-[50px] bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 mt-2"
              >
                <span>ถัดไป: เลือกช่องทางส่งจองคิว</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Message Summary Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-brand-muted">
                    ข้อความนัดหมายที่เตรียมไว้:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-xs text-brand-primary hover:underline font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>คัดลอกข้อความ</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border text-xs sm:text-sm text-brand-text font-mono whitespace-pre-wrap leading-relaxed">
                  {generatedMessage}
                </div>
              </div>

              {/* Channel Action Buttons */}
              <div className="space-y-3">
                {/* 1. LINE Button */}
                <button
                  type="button"
                  onClick={handleOpenLine}
                  className="w-full p-4 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold transition shadow-md flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-bold">ส่งข้อความผ่าน LINE</div>
                      <div className="text-xs text-white/90 font-normal">
                        แนะนำ: สะดวก รวดเร็ว และรอทีมคอนเฟิร์มคิว
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. Facebook Messenger Button */}
                <button
                  type="button"
                  onClick={handleOpenFacebook}
                  className="w-full p-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold transition shadow-md flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-bold">ส่งผ่าน Facebook Messenger</div>
                      <div className="text-xs text-white/90 font-normal">
                        ทักแชทเพจ PNC Auto GO
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 3. Call Phone Button */}
                <button
                  type="button"
                  onClick={handleCallPhone}
                  className="w-full p-4 rounded-2xl bg-white border-2 border-brand-primary text-brand-primary hover:bg-brand-light font-bold transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-light text-brand-primary flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-bold">โทรนัดหมายด่วน {siteConfig.phone}</div>
                      <div className="text-xs text-brand-muted font-normal">
                        คุยสายตรงกับทีมงานได้ทันที
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
