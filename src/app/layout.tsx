import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/data/company";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ล้างรถถึงบ้าน 24 ชม. รังสิต ปทุมธานี | PNC Auto GO",
  description:
    "PNC Auto GO บริการล้างรถถึงบ้าน รังสิตและปทุมธานี นัดล่วงหน้าได้ตลอด 24 ชม. รองรับมอเตอร์ไซค์ รถยนต์ EV รถ 6 ล้อ และรถ 10 ล้อ",
  keywords: [
    "ล้างรถถึงบ้าน",
    "ล้างรถถึงที่",
    "บริการล้างรถถึงบ้าน",
    "ล้างรถนอกสถานที่",
    "ล้างรถยนต์ถึงบ้าน",
    "ล้างมอเตอร์ไซค์ถึงบ้าน",
    "ล้างรถ EV",
    "ล้างรถ 6 ล้อ",
    "ล้างรถ 10 ล้อ",
    "ล้างรถถึงบ้าน รังสิต",
    "ล้างรถถึงบ้าน คลองหลวง",
    "ล้างรถถึงบ้าน ปทุมธานี",
    "ล้างรถ 24 ชั่วโมง",
    "ล้างรถกลางคืน",
    "ราคาล้างรถถึงบ้าน",
    "PNC Auto GO",
  ],
  authors: [{ name: "PNC Auto GO" }],
  creator: "PNC Auto GO",
  publisher: "PNC Auto GO",
  metadataBase: new URL(siteConfig.url),
  themeColor: "#1F6F54",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.png"],
  },
  openGraph: {
    title: "ล้างรถถึงบ้าน 24 ชม. รังสิต ปทุมธานี | PNC Auto GO",
    description:
      "PNC Auto GO บริการล้างรถถึงบ้าน รังสิตและปทุมธานี นัดล่วงหน้าได้ตลอด 24 ชม. รองรับมอเตอร์ไซค์ รถยนต์ EV รถ 6 ล้อ และรถ 10 ล้อ",
    url: siteConfig.url,
    siteName: "PNC Auto GO",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "PNC Auto GO — บริการล้างรถถึงบ้าน 24 ชั่วโมง คุณพักผ่อน เราดูแลรถคุณให้",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ล้างรถถึงบ้าน 24 ชม. รังสิต ปทุมธานี | PNC Auto GO",
    description:
      "PNC Auto GO บริการล้างรถถึงบ้าน รังสิตและปทุมธานี นัดล่วงหน้าได้ตลอด 24 ชม. รองรับมอเตอร์ไซค์ รถยนต์ EV รถ 6 ล้อ และรถ 10 ล้อ",
    images: ["https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&h=630&q=85"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-brand-bg text-brand-text">
        {children}
      </body>
    </html>
  );
}
