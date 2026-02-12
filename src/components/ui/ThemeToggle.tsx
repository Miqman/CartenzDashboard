"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="size-9 rounded-full border border-[#1E1E1E]/40 bg-transparent" aria-hidden />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-foreground/40 bg-transparent text-foreground transition-colors hover:text-[#408FB4] dark:border-foreground/40 dark:hover:text-[#408FB4]"
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
    </button>
  );
}
