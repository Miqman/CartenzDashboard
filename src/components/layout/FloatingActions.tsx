"use client";

import { ArrowUp, MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  const handleScrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      {/* Tombol ke atas */}
      <button
        type="button"
        onClick={handleScrollTop}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#408FB4] shadow-md transition hover:bg-sky-50"
        aria-label="Kembali ke atas"
      >
        <ArrowUp className="size-5" />
      </button>

      {/* Tombol WhatsApp: mobile = icon saja, desktop = icon + text */}
      {/* 62 815-1941-5874 */}
      <a
        href="https://wa.me/6281519415874"
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-sky-50 md:h-auto md:w-auto md:justify-start md:gap-3 md:px-4 md:py-2"
        aria-label="Hubungi kami via WhatsApp"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-[#25D366] text-white">
          <Phone className="size-4" />
        </span>
        <div className="hidden flex-col md:flex">
          <span className="text-sm font-semibold text-[#1E1E1E]">
            Hubungi Kami
          </span>
          <span className="text-xs text-[#6B7280]">Konsultasi Gratis</span>
        </div>
        <MessageCircle className="hidden size-4 text-[#408FB4] md:block" />
      </a>
    </div>
  );
}

