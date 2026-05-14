"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const KPI = [
  { id: "OEE",       label: "OEE",       value: "78.4%", delta: "+2.1", color: "text-primary-accent" },
  { id: "DEFECT",    label: "불량률",     value: "1.8%",  delta: "-0.3", color: "text-primary-accent" },
  { id: "PROGRESS",  label: "진척률",     value: "92%",   delta: "",     color: "text-primary-accent" },
  { id: "NOTI",      label: "알림 적체",  value: "12건",  delta: "",     color: "text-warning" },
  { id: "EQ_RUN",    label: "가동 라인",  value: "12/15", delta: "",     color: "text-primary-accent" },
  { id: "SHIP_D1",   label: "출하 D-1",   value: "3동",   delta: "",     color: "text-primary-accent" },
  { id: "INV_SHORT", label: "재고 부족",  value: "4건",   delta: "",     color: "text-error" },
  { id: "SPC_OPEN",  label: "미해결 SPC", value: "2건",   delta: "",     color: "text-error" },
];

const DASHBOARDS = [
  { label: "라인 상황판",   href: "/ops/line",         scr: "SCR-OPS-010" },
  { label: "Plant 종합",    href: "/ops/plant/4q",     scr: "SCR-OPS-020" },
  { label: "다공장",        href: "/ops/multi-plant",  scr: "SCR-OPS-030" },
  { label: "수주별 진척",   href: "/ops/so-progress",  scr: "SCR-OPS-040" },
  { label: "WO 진척",       href: "/ops/wo-progress/board", scr: "SCR-OPS-050" },
  { label: "생산·불량·가동", href: "/ops/combined",    scr: "SCR-OPS-060" },
  { label: "재고 종합",     href: "/ops/inventory/matrix", scr: "SCR-OPS-070" },
  { label: "알림 센터",     href: "/ops/notification/inbox", scr: "SCR-OPS-080" },
];

const FAVORITES = [
  { label: "Plant 종합 P3000",    scr: "SCR-OPS-020", note: "마지막 진입 5분 전" },
  { label: "라인 상황판 WC=L01",  scr: "SCR-OPS-010", note: "10초 갱신" },
  { label: "알림 센터",           scr: "SCR-OPS-080", note: "미해결 12건" },
];

export default function OPSHomePage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="OPS 운영현황" nodeRef="FNC-OPS-001,007~009" description="역할별 KPI 통합 카드 + 즐겨찾기 · 60초 갱신" />

      {/* A. 통합 KPI */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {KPI.map(k => (
          <div key={k.id} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color}`}>{k.value}</p>
            {k.delta && <p className="text-xs font-label text-on-surface-variant mt-0.5">{k.delta}</p>}
          </div>
        ))}
      </div>

      {/* B. 즐겨찾기 카드 */}
      <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">즐겨찾기</p>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {FAVORITES.map(f => (
          <div key={f.scr} className="bg-surface-container p-4 cursor-pointer hover:border hover:border-primary-accent/40">
            <p className="text-xs font-label text-on-surface-variant mb-1">{f.scr}</p>
            <p className="text-sm font-headline font-bold text-on-surface">{f.label}</p>
            <p className="text-xs font-label text-on-surface-variant mt-2">{f.note}</p>
          </div>
        ))}
        <div className="bg-surface-container border border-dashed border-outline-variant/30 p-4 flex items-center justify-center cursor-pointer">
          <span className="text-xs font-label text-on-surface-variant">+ 카드 추가</span>
        </div>
      </div>

      {/* C. 8 대시보드 바로가기 */}
      <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">8 대시보드 바로가기</p>
      <div className="grid grid-cols-4 gap-3">
        {DASHBOARDS.map(d => (
          <a key={d.scr} href={d.href}
            className="bg-surface-container p-4 flex flex-col gap-1 hover:border hover:border-primary-accent/40">
            <p className="text-xs font-label text-on-surface-variant">{d.scr}</p>
            <p className="text-sm font-headline font-bold text-on-surface">{d.label}</p>
          </a>
        ))}
      </div>

      <p className="text-xs font-label text-on-surface-variant mt-6 text-right">
        마지막 갱신 2026-05-05 14:32:18
      </p>
    </div>
  );
}
