import React from "react";
import { siteConfig } from "@/data/company";
import { faqsData } from "@/data/faqs";

export const JsonLd: React.FC = () => {
  // Only use verified production FAQs for schema markup
  const verifiedFaqs = faqsData.filter((faq) => faq.isVerifiedProduction);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description:
      "PNC Auto GO บริการล้างรถถึงบ้าน รังสิตและปทุมธานี นัดล่วงหน้าได้ตลอด 24 ชม. รองรับมอเตอร์ไซค์ รถยนต์ EV รถ 6 ล้อ และรถ 10 ล้อ",
    telephone: siteConfig.phone,
    url: siteConfig.url,
    priceRange: "฿฿",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "รังสิต",
      },
      {
        "@type": "AdministrativeArea",
        name: "ปทุมธานี",
      },
      {
        "@type": "AdministrativeArea",
        name: "คลองหลวง",
      },
      {
        "@type": "AdministrativeArea",
        name: "ธัญบุรี",
      },
      {
        "@type": "AdministrativeArea",
        name: "ลำลูกกา",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: verifiedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
};
