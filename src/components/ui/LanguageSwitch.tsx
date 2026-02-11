"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center rounded-full border border-[#1E1E1E]/40 bg-transparent px-2 py-1.5">
      <Globe className="mr-1.5 size-4 text-[#1E1E1E]" aria-hidden />
      <button
        type="button"
        onClick={() => switchLocale("id")}
        className={`rounded-full px-2 py-0.5 text-sm font-normal transition-colors ${
          locale === "id"
            ? "border border-[#408FB4] text-[#408FB4]"
            : "text-[#1E1E1E] hover:text-[#408FB4]"
        }`}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`rounded-full px-2 py-0.5 text-sm font-normal transition-colors ${
          locale === "en"
            ? "border border-[#408FB4] text-[#408FB4]"
            : "text-[#1E1E1E] hover:text-[#408FB4]"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
