"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Nama file harus sama persis (case-sensitive di Linux/Vercel): gunakan "Tentangkami" (k kecil) jika file di public/assets begitu.
const BENTO_ITEMS = [
  { src: "/assets/gambarTentangKami1.png", alt: "Kegiatan tim Cartenz" },
  { src: "/assets/gambarTentangkami2.png", alt: "Kegiatan tim Cartenz" },
  { src: "/assets/gambarTentangKami3.png", alt: "Kegiatan tim Cartenz" },
  { type: "text" as const, text: "KAMI ADALAH CARTEAMZ" },
  { src: "/assets/gambarTentangKami5.png", alt: "Kegiatan tim Cartenz", large: true },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

type BentoGridClientProps = {
  imageSources?: string[];
};

export function BentoGridClient({ imageSources }: BentoGridClientProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const mergedItems = BENTO_ITEMS.map((cell, i) => {
    if (cell.type === "text") return cell;
    const imageIndex = i === 4 ? 3 : i;
    const cmsImage = imageSources?.[imageIndex];
    return {
      ...cell,
      src: cmsImage && cmsImage.trim().length > 0 ? cmsImage : cell.src,
    };
  });

  useEffect(() => {
    if (!lightboxSrc) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [lightboxSrc]);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:auto-rows-[minmax(180px,1fr)]"
      >
        {mergedItems.map((cell, i) => {
          const isLarge = "large" in cell && cell.large;
          const gridPlacement =
            i === 0
              ? "md:col-start-1 md:row-start-1"
              : i === 1
                ? "md:col-start-2 md:row-start-1"
                : i === 2
                  ? "md:col-start-1 md:row-start-2"
                  : i === 3
                    ? "md:col-start-2 md:row-start-2"
                    : "col-span-2 md:col-span-1 md:col-start-3 md:row-start-1 md:row-span-2";

          if (cell.type === "text") {
            return (
              <motion.div
                key={i}
                variants={item}
                className={`relative overflow-hidden rounded-xl ${gridPlacement}`}
              >
                <div className="flex h-full min-h-[140px] items-center justify-center bg-[#408FB4] px-4 py-6 text-center text-lg font-semibold text-white md:min-h-[180px] md:text-xl">
                  {cell.text}
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={i}
              variants={item}
              className={`relative overflow-hidden rounded-xl ${gridPlacement}`}
            >
              <button
                type="button"
                onClick={() => setLightboxSrc(cell.src)}
                className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#408FB4] focus-visible:ring-offset-2"
              >
                <div className="relative h-full w-full min-h-[140px] md:min-h-[180px]">
                  <Image
                    src={cell.src}
                    alt={cell.alt}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    sizes={isLarge ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 33vw"}
                    priority
                  />
                  <div
                    className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
                    aria-hidden
                  />
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightboxSrc(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Tampilan gambar ukuran penuh"
          >
            <button
              type="button"
              onClick={() => setLightboxSrc(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative h-[85vh] w-[90vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt="Tampilan penuh"
                fill
                className="rounded-lg object-contain"
                sizes="90vw"
                unoptimized={lightboxSrc.startsWith("http")}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
