"use client";

import { useEffect, useState } from "react";

/**
 * Overlay loading sederhana untuk menunggu halaman (termasuk gambar) selesai dimuat.
 * Menghilang setelah event window "load" terpanggil atau ketika dokumen sudah complete.
 */
export function PageLoadingOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);

    if (document.readyState === "complete") {
      hide();
      return;
    }

    window.addEventListener("load", hide);
    return () => {
      window.removeEventListener("load", hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#408FB4] border-t-transparent" />
    </div>
  );
}

