"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      onClick={toggle}
      title={isLight ? "다크 모드로 전환" : "라이트 모드로 전환"}
      aria-label={isLight ? "다크 모드로 전환" : "라이트 모드로 전환"}
      className="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary-accent"
    >
      {isLight ? "dark_mode" : "light_mode"}
    </button>
  );
}
