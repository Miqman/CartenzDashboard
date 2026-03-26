"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { MegaMenuItem, MegaMenuType } from "@/data/megaMenuData";
import { getProductPageUrl } from "@/lib/productNavigation";

type Props = {
  items?: MegaMenuItem[];
  locale: string;
  onNavigate: () => void;
};

/** Slug dari title: lowercase, spasi/slash jadi strip (sama dengan MegaMenu). */
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s/]+/g, "-")
    .replace(/-+/g, "-");
}

function getMenuType(item: MegaMenuItem): MegaMenuType {
  if (item.menuType) return item.menuType;
  if (!item.children?.length) return "single";
  const hasDetails = item.children.some((c) => (c.details?.length ?? 0) > 0);
  return hasDetails ? "nested" : "flat";
}

function LoadingSkeleton() {
  return (
    <div className="w-full space-y-2 px-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 animate-pulse rounded-lg bg-white/10" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg bg-white/5 px-4 py-3 text-center text-sm text-white/50">
      Belum ada menu produk
    </div>
  );
}

export function MobileProductMenu({ items, locale, onNavigate }: Props) {
  const [expandedL1, setExpandedL1] = useState<string | null>(null);
  const [expandedL2, setExpandedL2] = useState<string | null>(null);

  if (items === undefined) return <LoadingSkeleton />;
  if (!items.length) return <EmptyState />;

  return (
    <div className="w-full max-w-xs space-y-1">
      {items.map((item) => {
        const menuType = getMenuType(item);
        const isL1Open = expandedL1 === item.id;

        if (menuType === "single") {
          return (
            <Link
              key={item.id}
              href={getProductPageUrl(locale, item.id)}
              onClick={onNavigate}
              className="block rounded-lg px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          );
        }

        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => {
                setExpandedL1(isL1Open ? null : item.id);
                setExpandedL2(null);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition ${
                isL1Open
                  ? "bg-white/15 font-medium text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              <ChevronDown
                className={`size-4 shrink-0 transition-transform duration-200 ${isL1Open ? "rotate-180" : ""}`}
              />
            </button>

            {isL1Open && item.children.length > 0 && (
              <div className="ml-3 mt-1 space-y-0.5 border-l border-white/20 pl-3">
                {item.children.map((child) => {
                  const hasDetails =
                    menuType === "nested" && (child.details?.length ?? 0) > 0;
                  const isL2Open = expandedL2 === child.id;

                  if (!hasDetails) {
                    return (
                      <Link
                        key={child.id}
                        href={getProductPageUrl(locale, item.id, child.id)}
                        onClick={onNavigate}
                        className="block rounded-lg px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    );
                  }

                  return (
                    <div key={child.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedL2(isL2Open ? null : child.id)
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                          isL2Open
                            ? "bg-white/10 font-medium text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="line-clamp-2 flex-1">
                          {child.label}
                        </span>
                        <ChevronDown
                          className={`ml-1 size-3.5 shrink-0 transition-transform duration-200 ${isL2Open ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isL2Open && (
                        <div className="ml-2 mt-0.5 space-y-0.5 border-l border-white/15 pl-2">
                          {child.details.map((detail, idx) => {
                            const detailSlug = titleToSlug(detail.title);
                            const baseDetailUrl = getProductPageUrl(
                              locale,
                              item.id,
                              detailSlug,
                            );
                            const detailPageUrl = `${baseDetailUrl}`;
                            return (
                              <div key={idx}>
                                <Link
                                  href={detailPageUrl}
                                  onClick={onNavigate}
                                  className="block rounded px-2 py-1.5 text-[11px] font-medium leading-tight text-white/60 transition hover:bg-white/10 hover:text-white"
                                >
                                  {detail.title}
                                </Link>
                                {detail.items && detail.items.length > 0 && (
                                  <div className="ml-2 mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
                                    {detail.items.map((subItem, subIdx) => (
                                      <Link
                                        key={subIdx}
                                        href={`${detailPageUrl}?tab=${subIdx}`}
                                        onClick={onNavigate}
                                        className="block rounded px-2 py-1 text-[11px] leading-tight text-white/50 transition hover:bg-white/10 hover:text-white"
                                      >
                                        {subItem}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
