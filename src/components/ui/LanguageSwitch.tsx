"use client";

import { Globe } from "lucide-react";

/**
 * Menampilkan bahasa saat ini (ID). Opsi EN disembunyikan karena terjemahan EN belum siap.
 * Nanti bisa dikembalikan jadi dropdown/switch saat EN sudah siap.
 */
export function LanguageSwitch() {

  return (
    <div
      className="flex items-center rounded-full border border-[#1E1E1E]/40 bg-transparent px-2 py-1.5"
      role="img"
      aria-label="Bahasa Indonesia"
    >
      <Globe className="mr-1.5 size-4 text-[#1E1E1E]" aria-hidden />
      <span className="rounded-full border border-[#408FB4] px-2 py-0.5 text-sm font-normal text-[#408FB4]">
        ID
      </span>
    </div>
  );
}
