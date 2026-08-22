"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";

// Sections
import { HeroSection } from "@/sections/HeroSection";
import { TrustBarSection } from "@/sections/TrustBarSection";
import { PainPointSection } from "@/sections/PainPointSection";
import { WhyUsSection } from "@/sections/WhyUsSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { EquipmentSection } from "@/sections/EquipmentSection";
import { KnowledgeSection } from "@/sections/KnowledgeSection";
import { PortfolioSection } from "@/sections/PortfolioSection";
import { CaseStudySection } from "@/sections/CaseStudySection";
import { PricingSection } from "@/sections/PricingSection";
import { PromotionSection } from "@/sections/PromotionSection";
import { ServiceAreaSection } from "@/sections/ServiceAreaSection";
import { AboutSection } from "@/sections/AboutSection";
import { FaqSection } from "@/sections/FaqSection";
import { FinalCtaSection } from "@/sections/FinalCtaSection";

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState<string | undefined>(undefined);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);

  const handleOpenBooking = (vehicleType?: string, service?: string) => {
    setBookingVehicle(vehicleType);
    setBookingService(service);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setBookingVehicle(undefined);
    setBookingService(undefined);
  };

  return (
    <>
      {/* 1. Global Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* 2. Main Content Flow */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Section 01: Hero */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* Section 02: Trust Indicators Bar */}
        <TrustBarSection />

        {/* Section 03: Pain Points */}
        <PainPointSection onOpenBooking={handleOpenBooking} />

        {/* Section 04: Why PNC Auto GO */}
        <WhyUsSection />

        {/* Section 05: Car Wash Process (7 Steps) */}
        <ProcessSection onOpenBooking={handleOpenBooking} />

        {/* Section 06: Equipment & Tools */}
        <EquipmentSection />

        {/* Section 07: Knowledge Center */}
        <KnowledgeSection />

        {/* Section 08: Before / After Portfolio */}
        <PortfolioSection onOpenBooking={handleOpenBooking} />

        {/* Section 09: Case Studies */}
        <CaseStudySection onOpenBooking={handleOpenBooking} />

        {/* Section 10: Services & Pricing */}
        <PricingSection onOpenBooking={handleOpenBooking} />

        {/* Section 11: Promotions */}
        <PromotionSection onOpenBooking={handleOpenBooking} />

        {/* Section 12: Service Area & Distance Calculator */}
        <ServiceAreaSection onOpenBooking={handleOpenBooking} />

        {/* Section 13: About PNC Auto GO */}
        <AboutSection />

        {/* Section 14: FAQs */}
        <FaqSection onOpenBooking={handleOpenBooking} />

        {/* Section 15: Final Conversion CTA */}
        <FinalCtaSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* 3. Global Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* 4. Mobile Sticky Bottom 3-Action Navigation Bar */}
      <MobileBottomNav onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Booking Modal / Bottom Sheet */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        initialVehicleType={bookingVehicle}
        initialService={bookingService}
      />
    </>
  );
}
