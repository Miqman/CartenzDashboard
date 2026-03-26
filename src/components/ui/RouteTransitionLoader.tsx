"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const MIN_VISIBLE_MS = 250;

function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function RouteTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const startedAtRef = useRef<number>(0);
  const hideTimerRef = useRef<number | null>(null);
  const currentRouteRef = useRef<string>("");

  useEffect(() => {
    currentRouteRef.current = `${pathname}?${searchParams?.toString() ?? ""}`;
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;
      if (event.button !== 0) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // External links tidak perlu loader route internal.
      if (url.origin !== window.location.origin) return;

      const nextRoute = `${url.pathname}${url.search}`;
      const currentRoute = `${window.location.pathname}${window.location.search}`;
      if (nextRoute === currentRoute) return;

      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }

      startedAtRef.current = Date.now();
      setLoading(true);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  useEffect(() => {
    if (!loading) return;

    const elapsed = Date.now() - startedAtRef.current;
    const remain = Math.max(0, MIN_VISIBLE_MS - elapsed);

    if (hideTimerRef.current != null) {
      window.clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      setLoading(false);
      hideTimerRef.current = null;
    }, remain);
  }, [pathname, searchParams, loading]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-1 overflow-hidden"
      aria-hidden
    >
      <div className="h-full w-1/3 animate-[routeLoader_0.9s_ease-in-out_infinite] rounded-r bg-[#408FB4]" />
    </div>
  );
}

