import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Car,
} from "lucide-react";
import { beforeAfterItems } from "@/data/portfolio";
import { siteConfig } from "@/data/company";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { LineIcon, MessengerIcon } from "@/components/BrandIcons";
import { ScrollToTop } from "@/components/ScrollToTop";

interface PageProps {
  params: {
    id: string;
  };
}

// Generate static params for static site generation
export async function generateStaticParams() {
  return beforeAfterItems.map((item) => ({
    id: item.id,
  }));
}

// Dynamic SEO Metadata per Project
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = beforeAfterItems.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: "ไม่พบผลงาน | PNC Auto GO",
    };
  }

  const title = `${project.title} | ผลงานล้างรถถึงบ้าน PNC Auto GO`;
  const description = `${project.description || ""} บริการล้างรถและดีเทลลิ่งถึงที่ ${project.location || "รังสิต–ปทุมธานี"} นัดหมายได้ 24 ชม.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.vehicleType,
      "ล้างรถถึงบ้าน",
      "ผลงานล้างรถ",
      project.location || "รังสิต",
      "PNC Auto GO",
    ],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/portfolio/${project.id}`,
      type: "article",
      images: [
        {
          url: project.afterImage.startsWith("http")
            ? project.afterImage
            : `${siteConfig.url}${project.afterImage}`,
          width: 1200,
          height: 800,
          alt: project.altAfter,
        },
      ],
    },
    alternates: {
      canonical: `/portfolio/${project.id}`,
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = beforeAfterItems.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const relatedProjects = beforeAfterItems.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* 1. Header */}
      <Header />

      {/* 2. Main Content */}
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-primary transition flex items-center gap-1">
              หน้าแรก
            </Link>
            <ChevronRight className="w-4 h-4 text-brand-border" />
            <Link href="/#portfolio" className="hover:text-brand-primary transition">
              ผลงานจริง
            </Link>
            <ChevronRight className="w-4 h-4 text-brand-border" />
            <span className="text-brand-text font-bold truncate max-w-[200px] sm:max-w-md">
              {project.title}
            </span>
          </nav>

          {/* Project Title Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-border shadow-card space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold border border-brand-primary/20">
                {project.vehicleType}
              </span>
              {project.isRealWork && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ผลงานจริง PNC Auto GO
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text leading-snug">
              {project.title}
            </h1>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-brand-muted pt-2 border-t border-brand-border/60">
              {project.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.timeSpent && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>ระยะเวลาบริการ: {project.timeSpent}</span>
                </div>
              )}
              {project.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{project.date}</span>
                </div>
              )}
            </div>
          </div>

          {/* Before / After Interactive Comparison Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text">
                  เปรียบเทียบ ก่อนล้าง - หลังล้าง (Before & After)
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                  เลื่อนแถบตรงกลางไปทางซ้าย-ขวา เพื่อดูความแตกต่างของความสะอาดและความเงางาม
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-3 sm:p-5 border border-brand-border shadow-card">
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                altBefore={project.altBefore}
                altAfter={project.altAfter}
                title={project.title}
              />
            </div>
          </div>

          {/* Work Breakdown Grid (Services Done & Highlights) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Performed */}
            {project.servicesDone && project.servicesDone.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-4">
                <div className="flex items-center gap-2 text-brand-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-brand-text">งานที่ให้บริการในโปรเจกต์นี้</h3>
                </div>
                <ul className="space-y-2.5">
                  {project.servicesDone.map((srv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text">
                      <span className="w-5 h-5 rounded-full bg-brand-light text-brand-primary font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Focus & Care Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-4">
                <div className="flex items-center gap-2 text-brand-primary">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-brand-text">มาตรฐานและการดูแลเฉพาะจุด</h3>
                </div>
                <ul className="space-y-2.5">
                  {project.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-2" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Full Photo Gallery in this Project */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-border shadow-card space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-text">
                  ภาพถ่ายรายละเอียดผลงาน ({project.gallery.length} ภาพ)
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted mt-1">
                  ภาพถ่ายผลงานจริงทุกมุมมองจากการดูแลของทีมงาน PNC Auto GO
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((photo, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden border border-brand-border bg-brand-bg aspect-[4/3] shadow-sm hover:shadow-md transition"
                  >
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-semibold">{photo.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct CTA Box for this Vehicle */}
          <div className="bg-gradient-to-br from-brand-dark to-brand-primary rounded-3xl p-8 sm:p-10 text-white text-center space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span>สนใจบริการล้างรถแบบโปรเจกต์นี้?</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold max-w-xl mx-auto">
              นัดหมายให้เราไปดูแลรถ {project.vehicleType} ของคุณถึงบ้าน
            </h3>

            <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
              บริการถึงที่ในพื้นที่รังสิต–ปทุมธานี นัดล่วงหน้าได้ตลอด 24 ชม. ราคาเป็นธรรม ไม่มีบวกเพิ่มแอบแฝง
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-base shadow-lg transition flex items-center justify-center gap-2.5 active:scale-95"
              >
                <LineIcon className="w-5 h-5" />
                <span>จองคิวผ่าน LINE</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full sm:w-auto h-13 px-7 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base shadow-sm transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>โทร {siteConfig.phone}</span>
              </a>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-text">
                  ผลงานอื่นๆ ที่น่าสนใจ
                </h3>
                <Link
                  href="/#portfolio"
                  className="text-xs sm:text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"
                >
                  <span>ดูผลงานทั้งหมด</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/portfolio/${rel.id}`}
                    className="group bg-white rounded-3xl overflow-hidden border border-brand-border shadow-card hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                      <Image
                        src={rel.afterImage}
                        alt={rel.altAfter}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-brand-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                        {rel.vehicleType}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-brand-text group-hover:text-brand-primary transition line-clamp-1">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-brand-muted line-clamp-2 mt-1">
                          {rel.description}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-primary">
                        <span>ดูรายละเอียดผลงาน</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Scroll To Top */}
      <ScrollToTop />
    </div>
  );
}
