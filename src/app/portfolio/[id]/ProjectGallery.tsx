"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";

interface PhotoItem {
  image: string;
  title: string;
  alt: string;
}

interface ProjectGalleryProps {
  gallery: PhotoItem[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ gallery }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const formattedPhotos = gallery.map((item, idx) => ({
    id: `photo-${idx}`,
    title: item.title,
    category: "motorcycle",
    image: item.image,
    alt: item.alt,
    isRealWork: true,
  }));

  const handleOpenPhoto = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {gallery.map((photo, index) => (
          <div
            key={index}
            onClick={() => handleOpenPhoto(index)}
            className="group relative rounded-2xl overflow-hidden border border-brand-border bg-neutral-900 aspect-[4/3] shadow-soft hover:shadow-card cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

            {/* Zoom Icon Button */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Bottom Caption */}
            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex items-end">
              <span className="text-white text-xs sm:text-sm font-semibold line-clamp-2 drop-shadow-md">
                {photo.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Fullscreen Modal */}
      <Lightbox
        photos={formattedPhotos}
        currentIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
      />
    </>
  );
};
