"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";

import img01 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.17.00 (2).webp";
import img02 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.17.00 (1).webp";
import img03 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.17.00.webp";
import img04 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.11.57.webp";
import img05 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.11.56 (1).webp";
import img06 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.11.56.webp";
import img07 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.17 (5).webp";
import img08 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.17 (4).webp";
import img09 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.17 (3).webp";
import img10 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.17 (2).webp";
import img11 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.17 (1).webp";
import img12 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.17.webp";
import img13 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (8).webp";
import img14 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (7).webp";
import img15 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (6).webp";
import img16 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (5).webp";
import img17 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (4).webp";
import img18 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (3).webp";
import img19 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (2).webp";
import img20 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16 (1).webp";
import img21 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.16.webp";
import img22 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.15 (4).webp";
import img23 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.15 (3).webp";
import img24 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.15 (2).webp";
import img25 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.15 (1).webp";
import img26 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.15.webp";
import img27 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.14 (1).webp";
import img28 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.14.webp";
import img29 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.12 (1).webp";
import img30 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.12.webp";
import img31 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.06.webp";
import img32 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.05 (1).webp";
import img33 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.05.webp";
import img34 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.04 (2).webp";
import img35 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.04 (1).webp";
import img36 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.04.webp";
import img37 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.02 (3).webp";
import img38 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.02 (2).webp";
import img39 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.02 (1).webp";
import img40 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.05.02.webp";
import img41 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.04.54.webp";
import img42 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.04.53 (1).webp";
import img43 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.04.53.webp";
import img44 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.04.52 (1).webp";
import img45 from "@/assets/images/media/WhatsApp Image 2026-05-11 at 17.04.52.webp";

type ImageItem = { id: number; type: "image"; src: StaticImageData };
type VideoItem = { id: number; type: "video"; src: string; poster: string };
type MediaItem = ImageItem | VideoItem;
type Filter = "all" | "image" | "video";

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 0,
    type: "video",
    src: "https://first-of-all-media.s3.eu-west-3.amazonaws.com/CRTV-RADIO.mp4",
    poster: "/placeholder2.png",
  },
  { id: 1, type: "image", src: img01 },
  { id: 2, type: "image", src: img02 },
  { id: 3, type: "image", src: img03 },
  { id: 4, type: "image", src: img04 },
  { id: 5, type: "image", src: img05 },
  { id: 6, type: "image", src: img06 },
  { id: 7, type: "image", src: img07 },
  { id: 8, type: "image", src: img08 },
  { id: 9, type: "image", src: img09 },
  { id: 10, type: "image", src: img10 },
  { id: 11, type: "image", src: img11 },
  { id: 12, type: "image", src: img12 },
  { id: 13, type: "image", src: img13 },
  { id: 14, type: "image", src: img14 },
  { id: 15, type: "image", src: img15 },
  { id: 16, type: "image", src: img16 },
  { id: 17, type: "image", src: img17 },
  { id: 18, type: "image", src: img18 },
  { id: 19, type: "image", src: img19 },
  { id: 20, type: "image", src: img20 },
  { id: 21, type: "image", src: img21 },
  { id: 22, type: "image", src: img22 },
  { id: 23, type: "image", src: img23 },
  { id: 24, type: "image", src: img24 },
  { id: 25, type: "image", src: img25 },
  { id: 26, type: "image", src: img26 },
  { id: 27, type: "image", src: img27 },
  { id: 28, type: "image", src: img28 },
  { id: 29, type: "image", src: img29 },
  { id: 30, type: "image", src: img30 },
  { id: 31, type: "image", src: img31 },
  { id: 32, type: "image", src: img32 },
  { id: 33, type: "image", src: img33 },
  { id: 34, type: "image", src: img34 },
  { id: 35, type: "image", src: img35 },
  { id: 36, type: "image", src: img36 },
  { id: 37, type: "image", src: img37 },
  { id: 38, type: "image", src: img38 },
  { id: 39, type: "image", src: img39 },
  { id: 40, type: "image", src: img40 },
  { id: 41, type: "image", src: img41 },
  { id: 42, type: "image", src: img42 },
  { id: 43, type: "image", src: img43 },
  { id: 44, type: "image", src: img44 },
  { id: 45, type: "image", src: img45 },
  {
    id: 46,
    type: "video",
    src: "https://first-of-all-media.s3.eu-west-3.amazonaws.com/INVITE-DU-JT-11.mp4",
    poster: "/image.png",
  },
];

export default function MediaGallery() {
  const t = useTranslations("actualites");
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const filteredRef = useRef<MediaItem[]>([]);

  const filtered = MEDIA_ITEMS.filter(
    (item) => filter === "all" || item.type === filter,
  );
  filteredRef.current = filtered;

  // Close lightbox when filter changes
  useEffect(() => {
    setOpenIndex(null);
  }, [filter]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "Escape") {
        setOpenIndex(null);
      } else if (e.key === "ArrowRight") {
        setOpenIndex((prev) =>
          prev !== null
            ? Math.min(prev + 1, filteredRef.current.length - 1)
            : null,
        );
      } else if (e.key === "ArrowLeft") {
        setOpenIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : null));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const openItem = openIndex !== null ? filtered[openIndex] : null;
  const canPrev = openIndex !== null && openIndex > 0;
  const canNext = openIndex !== null && openIndex < filtered.length - 1;

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="flex gap-2 justify-center mb-12">
        {(["all", "image", "video"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 font-cinzel text-xs tracking-widest uppercase transition-all duration-300 border ${
              filter === f
                ? "bg-primary text-surface-container border-primary"
                : "border-primary/30 text-neutral-400 hover:border-primary/60 hover:text-primary"
            }`}
          >
            {t(`filters.${f}`)}
          </button>
        ))}
      </div>

      {/* ── Masonry grid ── */}
      {filtered.length === 0 ? (
        <p className="text-center text-neutral-600 font-cinzel tracking-widest text-sm py-16">
          {t("empty")}
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-3 cursor-pointer group relative overflow-hidden"
              onClick={() => setOpenIndex(idx)}
            >
              {item.type === "image" ? (
                <div className="relative overflow-hidden">
                  <Image
                    src={item.src}
                    alt=""
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                      zoom_in
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video bg-surface-container-low overflow-hidden">
                  <Image
                    src={item.poster}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-white text-3xl font-light ml-1">
                        play_arrow
                      </span>
                    </div>
                  </div>
                  {/* Video label */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-cinzel tracking-widest uppercase text-white/60 border border-white/20 px-2 py-1">
                      VIDEO
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Lightbox overlay ── */}
      {openItem !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setOpenIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition-colors duration-200"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-3xl font-light">
              close
            </span>
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 font-cinzel text-xs tracking-widest">
            {openIndex! + 1} / {filtered.length}
          </div>

          {/* Prev button */}
          <button
            className={`absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-all duration-200 ${
              !canPrev ? "opacity-20 pointer-events-none" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (canPrev) setOpenIndex((i) => i! - 1);
            }}
            aria-label="Previous"
          >
            <span className="material-symbols-outlined font-light">
              chevron_left
            </span>
          </button>

          {/* Next button */}
          <button
            className={`absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-all duration-200 ${
              !canNext ? "opacity-20 pointer-events-none" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (canNext) setOpenIndex((i) => i! + 1);
            }}
            aria-label="Next"
          >
            <span className="material-symbols-outlined font-light">
              chevron_right
            </span>
          </button>

          {/* Media content */}
          <div
            className="relative max-w-5xl w-full px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            {openItem.type === "image" ? (
              <div className="relative w-full max-h-[85vh] flex items-center justify-center">
                <Image
                  key={openItem.id}
                  src={openItem.src}
                  alt=""
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="max-h-[85vh] w-auto max-w-full object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            ) : (
              <video
                key={openItem.id}
                src={openItem.src}
                poster={openItem.poster}
                controls
                autoPlay
                className="w-full max-h-[85vh] outline-none"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
