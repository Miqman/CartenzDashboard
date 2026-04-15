"use client";

import { Globe } from "lucide-react";

/**
 * Menampilkan bahasa saat ini (ID). Opsi EN disembunyikan karena terjemahan EN belum siap.
 * Nanti bisa dikembalikan jadi dropdown/switch saat EN sudah siap.
 */
type LanguageSwitchProps = {
  containerClassName?: string;
  iconClassName?: string;
  badgeClassName?: string;
  labelClassName?: string;
};

export function LanguageSwitch({
  containerClassName,
  iconClassName,
  badgeClassName,
  labelClassName,
}: LanguageSwitchProps) {
  const containerBaseClass =
    "flex items-center rounded-full border border-[#1E1E1E]/40 bg-transparent px-2 py-1.5";
  const iconBaseClass = "mr-1.5 size-4 text-[#1E1E1E]";
  const badgeBaseClass =
    "rounded-full border border-[#408FB4] px-2 py-0.5 text-sm font-normal text-[#408FB4]";
  const labelBaseClass = "";

  return (
    <div
      className={[containerBaseClass, containerClassName].filter(Boolean).join(" ")}
      role="img"
      aria-label="Bahasa Indonesia"
    >
      <Globe
        className={[iconBaseClass, iconClassName].filter(Boolean).join(" ")}
        aria-hidden
      />
      <span className={[badgeBaseClass, badgeClassName].filter(Boolean).join(" ")}>
        <span className={[labelBaseClass, labelClassName].filter(Boolean).join(" ")}>
          ID
        </span>
      </span>
    </div>
  );
}
