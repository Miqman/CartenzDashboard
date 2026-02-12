"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useRouter as useNextRouter } from "next/navigation";
import { Globe } from "lucide-react";

/** Path tanpa segment locale (id/en) agar tidak jadi /id/id atau /en/en */
function pathWithoutLocale(pathname: string): string {
  const without = pathname.replace(/^\/(id|en)(\/|$)/, (_, __, slash) => (slash || "/"));
  return without || "/";
}

export function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const path = pathWithoutLocale(pathname);
    router.replace(path, { locale: newLocale });
    nextRouter.refresh();
  };

  const baseBtn =
    "cursor-pointer rounded-full px-2 py-0.5 text-sm font-normal transition-colors ";
  const activeBtn = "border border-[#408FB4] text-[#408FB4]";
  const inactiveBtn = "text-[#1E1E1E] hover:text-[#408FB4]";

  return (
    <div className="flex items-center rounded-full border border-[#1E1E1E]/40 bg-transparent px-2 py-1.5">
      <Globe className="mr-1.5 size-4 text-[#1E1E1E]" aria-hidden />
      <button
        type="button"
        onClick={() => switchLocale("id")}
        className={baseBtn + (locale === "id" ? activeBtn : inactiveBtn)}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={baseBtn + (locale === "en" ? activeBtn : inactiveBtn)}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
