"use client";

import Link from "next/link";
import { useEffect } from "react";

type SitemapItem = {
  label: string;
  url: string;
  highlight?: boolean;
};

type SitemapCategory = {
  title: string;
  items: SitemapItem[];
};

const SITEMAP: SitemapCategory[] = [
  {
    title: "입고·재고",
    items: [
      { label: "입고-입고등록", url: "/loc/receive/new", highlight: true },
      { label: "입고 목록", url: "/loc/receive/list" },
      { label: "PDA 검수", url: "/loc/receive/inspect", highlight: true },
      { label: "위치별 재고", url: "/loc/inventory/by-location" },
      { label: "실사 계획", url: "/loc/count/plan" },
      { label: "카운트시트 PDA", url: "/loc/count/sheet", highlight: true },
      { label: "실사 보고서", url: "/loc/count/report" },
    ],
  },
  {
    title: "작업지시",
    items: [
      { label: "작업지시 목록", url: "/wo/orders" },
      { label: "WO 발행 결과", url: "/wo/orders/release" },
      { label: "부재 코드 목록", url: "/wo/members" },
      { label: "패킹 그룹", url: "/wo/packing/groups" },
      { label: "라벨 발행", url: "/wo/labels/print" },
    ],
  },
  {
    title: "생산",
    items: [
      { label: "오늘의 작업", url: "/mfg/today" },
      { label: "자재 라벨 스캔 PDA", url: "/mfg/issue/scan", highlight: true },
      { label: "공정진행 스캔", url: "/mfg/produce" },
      { label: "출고 스캔", url: "/mfg/transfer/out" },
      { label: "역방향 추적", url: "/mfg/recall/backward" },
    ],
  },
  {
    title: "품질",
    items: [
      { label: "품질 KPI", url: "/qc/dashboard/main" },
      { label: "SPC측정 입력", url: "/qc/spc/measure-pda", highlight: true },
      { label: "QC 결재", url: "/qc/defect/inspect-queue" },
      { label: "손실 환산 산출", url: "/qc/loss/calc" },
    ],
  },
  {
    title: "출하",
    items: [
      { label: "출하일정 캘린더", url: "/shp/schedule/calendar" },
      { label: "패킹 현황 보드", url: "/shp/packing/board" },
      { label: "패킹 리스트", url: "/shp/documents", highlight: true },
      { label: "RFID 모니터링", url: "/shp/gate/monitor" },
    ],
  },
  {
    title: "위치재고",
    items: [
      { label: "야적장 도면", url: "/loc/yard-map/view" },
      { label: "도면 편집", url: "/loc/yard-map/edit" },
      { label: "점유현황 보드", url: "/loc/yard-map/occupancy" },
      { label: "공장 간 이동", url: "/loc/transfer/out" },
      { label: "재고 보정", url: "/loc/adjust/new" },
      { label: "스크랩 등록", url: "/loc/scrap/new" },
      { label: "불량 처리", url: "/loc/scrap/defect" },
    ],
  },
  {
    title: "재고조회",
    items: [
      { label: "위치별 재고", url: "/loc/inventory/by-location" },
      { label: "트랜잭션 이력", url: "/loc/inventory/history" },
      { label: "FIFO 추적", url: "/loc/inventory/trace" },
      { label: "MOVE 이동", url: "/loc/inventory/move" },
    ],
  },
  {
    title: "운영현황",
    items: [
      { label: "OPS 운영 현황", url: "/ops/plant" },
      { label: "WC 상황판", url: "/ops/line/board" },
      { label: "WO 진척 보드", url: "/wo/dashboard" },
      { label: "야적장 현황", url: "/loc/yard-map/occupancy" },
    ],
  },
];

const MAX_COLS = Math.max(...SITEMAP.map((c) => c.items.length));

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SitemapModal({ isOpen, onClose }: SitemapModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-16"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest border border-outline-variant/20 w-full max-w-5xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary-accent">account_tree</span>
            <span className="font-headline font-bold text-sm text-on-surface">MES 사이트맵</span>
          </div>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-on-surface hover:text-primary-accent leading-none"
            aria-label="닫기"
          >
            close
          </button>
        </div>

        {/* Login quick link */}
        <div className="flex justify-end px-4 py-2 border-b border-outline-variant/20">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-accent text-white text-xs font-medium hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-sm leading-none">login</span>
            로그인
          </Link>
        </div>

        {/* Sitemap Table */}
        <div className="overflow-auto flex-1">
          <table className="w-full border-collapse text-xs">
            <tbody>
              {SITEMAP.map((category) => (
                <tr key={category.title} className="border-b border-outline-variant/20 last:border-b-0">
                  {/* Category cell */}
                  <td className="w-24 px-3 py-3 bg-surface-container border-r border-outline-variant/20 align-middle text-center">
                    <span className="font-headline font-bold text-on-surface text-xs whitespace-nowrap">
                      {category.title}
                    </span>
                  </td>

                  {/* Item cells */}
                  {Array.from({ length: MAX_COLS }).map((_, i) => {
                    const item = category.items[i];
                    if (!item) {
                      return (
                        <td
                          key={i}
                          className="px-2 py-2 border-r border-outline-variant/10 last:border-r-0"
                        />
                      );
                    }
                    return (
                      <td
                        key={i}
                        className="px-2 py-2 border-r border-outline-variant/10 last:border-r-0"
                      >
                        <Link
                          href={item.url}
                          onClick={onClose}
                          className={`block text-center px-2 py-2 transition-colors hover:opacity-80 ${
                            item.highlight
                              ? "bg-primary-accent text-white font-medium"
                              : "bg-surface-container text-on-surface hover:bg-surface-container-highest"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
