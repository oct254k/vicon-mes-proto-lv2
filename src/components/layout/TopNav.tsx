"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { GlossaryModal } from "@/components/ui/GlossaryModal";
import { SitemapModal } from "@/components/ui/SitemapModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);

  return (
    <nav className="fixed top-0 flex justify-between items-center w-full px-4 lg:px-10 h-16 z-50 bg-surface-bright border-b border-outline">
      <div className="flex items-center gap-4 lg:gap-8">
        {/* 모바일 햄버거 */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-on-surface hover:text-primary-accent transition-colors"
          aria-label="메뉴 열기"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <Link href="/ops" className="flex items-center gap-3">
          <Image
            src="/sungigroup_logo.png"
            alt="성지그룹 Logo"
            width={106}
            height={26}
            className="h-8 w-auto logo-adaptive"
            priority
          />
        </Link>
        <div className="hidden md:flex gap-6 font-headline font-bold tracking-tighter tabular-nums">
          <Link href="/ops" className="text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest transition-colors duration-150 py-1 px-2">
            대시보드
          </Link>
          <Link href="/trace" className="text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest transition-colors duration-150 py-1 px-2">
            이력추적
          </Link>
          <Link href="/alarm" className="text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest transition-colors duration-150 py-1 px-2">
            알람
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setSitemapOpen(true)}
          title="사이트맵"
          className="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary-accent"
        >
          account_tree
        </button>
        <button
          onClick={() => setGlossaryOpen(true)}
          title="MES 용어사전"
          className="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary-accent"
        >
          book_2
        </button>
        <span className="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary-accent">
          notifications
        </span>
        <ThemeToggle />
        <span className="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary-accent">
          settings
        </span>
        <div className="w-8 h-8 bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-sm">person</span>
        </div>
      </div>
      <GlossaryModal isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <SitemapModal isOpen={sitemapOpen} onClose={() => setSitemapOpen(false)} />
    </nav>
  );
}
