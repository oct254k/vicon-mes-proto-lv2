"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const KPI = [
  { label: "OEE",    value: "78.4%", delta: "+2.1%", color: "text-primary-accent" },
  { label: "불량률",  value: "1.8%",  delta: "-0.3%", color: "text-primary-accent" },
  { label: "가동률",  value: "92%",   delta: "+1%",   color: "text-primary-accent" },
  { label: "SPC 위반", value: "3건",  delta: "",      color: "text-error" },
];

const LINKS = [
  { label: "이중축 차트",   href: "/ops/combined/dual-axis", scr: "SCR-OPS-060", desc: "OEE × 불량률 동축 시각화" },
  { label: "설비 드릴다운", href: "/ops/combined/drill",     scr: "SCR-OPS-061", desc: "Equipment·WC 단위 상세" },
];

const TREND = [
  { date: "05-01", oee: 76.2, defect: 2.1 },
  { date: "05-02", oee: 77.5, defect: 1.9 },
  { date: "05-03", oee: 78.0, defect: 1.8 },
  { date: "05-04", oee: 77.8, defect: 2.0 },
  { date: "05-05", oee: 78.4, defect: 1.8 },
];

export default function CombinedPage() {
  const maxOee = Math.max(...TREND.map(t => t.oee));

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="생산·불량·가동 통합" nodeRef="FNC-OPS-070,072~074" description="OEE × 불량률 통합 대시보드 · 60초 갱신" />

      <div className="grid grid-cols-4 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color}`}>{k.value}</p>
            {k.delta && <p className="text-xs font-label text-on-surface-variant mt-0.5">{k.delta}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {LINKS.map(l => (
          <a key={l.scr} href={l.href} className="bg-surface-container p-5 hover:border hover:border-primary-accent/40">
            <p className="text-xs font-label text-on-surface-variant mb-1">{l.scr}</p>
            <p className="text-sm font-headline font-bold text-on-surface">{l.label}</p>
            <p className="text-xs font-label text-on-surface-variant mt-1">{l.desc}</p>
          </a>
        ))}
      </div>

      {/* OEE 추이 텍스트 바 차트 */}
      <div className="bg-surface-container p-5">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">OEE 일별 추이</p>
        {TREND.map(t => (
          <div key={t.date} className="mb-2">
            <div className="flex justify-between text-xs font-label mb-0.5">
              <span className="text-on-surface-variant w-12">{t.date}</span>
              <span className="tabular-nums">{t.oee}% / 불량 {t.defect}%</span>
            </div>
            <div className="h-3 bg-surface-container-highest/30">
              <div className="h-3 bg-primary-accent" style={{width:`${(t.oee/maxOee)*100}%`}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
