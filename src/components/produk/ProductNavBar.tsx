"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PRODUCT_NAV_ITEMS,
  PRODUCT_PAGE_ASSETS,
} from "@/data/productsPageData";
import { getProductPageUrl } from "@/lib/productNavigation";

const BORDER_COLOR = "#CAD5E2";
const TEXT_COLOR = "#62748E";

type Props = {
  activeId: string;
  /** Jika ada, item navigasi pakai Link (path-based). Jika tidak, pakai onSelect. */
  locale?: string;
  onSelect?: (id: string) => void;
};

export function ProductNavBar({ activeId, locale, onSelect }: Props) {
  const router = useRouter();
  const useLinks = typeof locale === "string";

  return (
    <nav
      className="w-full border-y bg-white px-4 py-4 md:px-16 lg:px-24 xl:px-32"
      style={{ borderColor: BORDER_COLOR }}
      aria-label="Kategori produk"
    >
      <div className="hidden w-full grid-cols-2 gap-8 px-4 sm:grid md:grid-cols-4">
        {PRODUCT_NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          const href = useLinks
            ? getProductPageUrl(locale, item.id)
            : undefined;
          const content = (
            <>
              <span
                className={`relative block h-4 w-10 shrink-0 md:h-[20px] md:w-[104px] ${!isActive ? "opacity-50" : "opacity-100"}`}
              >
                <Image
                  src={item.logo}
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="100px"
                  unoptimized={PRODUCT_PAGE_ASSETS.logo.startsWith("http")}
                />
              </span>
              <span
                className={`text-left text-xs leading-tight md:text-sm ${!isActive ? "text-[#62748E]" : "text-[#1E1E1E]"}`}
              >
                {item.label}
              </span>
            </>
          );
          return (
            <div key={item.id}>
              {href ? (
                <Link
                  href={href}
                  className="flex cursor-pointer flex-col items-start gap-1 text-left transition hover:opacity-90"
                  style={{ color: TEXT_COLOR }}
                  aria-current={isActive ? "true" : undefined}
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect?.(item.id)}
                  className="flex cursor-pointer flex-col items-start gap-1 text-left transition hover:opacity-90"
                  style={{ color: TEXT_COLOR }}
                  aria-current={isActive ? "true" : undefined}
                >
                  {content}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="sm:hidden">
        <select
          value={activeId}
          onChange={(e) => {
            const id = e.target.value;
            if (useLinks && locale) router.push(getProductPageUrl(locale, id));
            else onSelect?.(id);
          }}
          className="w-full cursor-pointer appearance-none rounded-lg border border-[#CAD5E2] bg-white px-4 py-3 text-sm text-[#1E1E1E] focus:border-[#408FB4] focus:outline-none focus:ring-2 focus:ring-[#408FB4]/20"
          style={{ color: TEXT_COLOR }}
          aria-label="Pilih kategori produk"
        >
          {PRODUCT_NAV_ITEMS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.brand} – {item.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
