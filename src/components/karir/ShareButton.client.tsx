"use client";

import { Share2 } from "lucide-react";

export function ShareButtonClient({ path, title }: { path: string; title: string }) {
  const handleShare = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, url, text: title }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
    }
  };
  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 text-sm text-[#408FB4] transition hover:text-[#357a9a]"
    >
      <Share2 className="h-4 w-4" />
      Bagikan
    </button>
  );
}
