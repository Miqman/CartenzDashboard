"use client";

import { ArrowUp, MessageCircle } from "lucide-react";

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

      {/* Tombol WhatsApp */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-md transition hover:bg-sky-50"
        aria-label="Hubungi kami via WhatsApp"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-[#25D366] text-xs font-semibold text-white">
          W
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#1E1E1E]">
            Hubungi Kami
          </span>
          <span className="text-xs text-[#6B7280]">Konsultasi Gratis</span>
        </div>
        <MessageCircle className="size-4 text-[#408FB4]" />
      </a>
    </div>
  );
}

