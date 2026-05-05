"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const oeeKpi = { oee: 87.3, availability: 92, performance: 96, quality: 99 };

const mtbf = { min: 19200, hour: 320, target: 480 };

const eqOee = [
  { eq: "EQ-P3000-CUT-01", avail: "92%", perf: "96%", qual: "99%", oee: "87.3%" },
  { eq: "EQ-P3000-CUT-02", avail: "88%", perf: "94%", qual: "98%", oee: "81.1%" },
  { eq: "EQ-P3000-PRESS-01", avail: "91%", perf: "93%", qual: "99%", oee: "83.8%" },
  { eq: "EQ-P3000-WELD-01", avail: "95%", perf: "97%", qual: "100%", oee: "92.2%" },
];

function GaugeCard({ label, value, color }: { label: string; value: number; color: string }) {
  const deg = Math.round(value * 3.6);
  return (
    <div className="bg-surface-container-lowest p-4 flex flex-col items-center gap-3">
      <div className="relative w-20 h-20">
        <div
          className="w-20 h-20 rounded-full"
          style={{ background: `conic-gradient(${color} ${deg}deg, #201f1f 0deg)` }}
        />
        <div className="absolute inset-2 rounded-full bg-surface flex items-center justify-center">
          <span className="text-sm font-black font-headline tabular-nums">{value}%</span>
        </div>
      </div>
      <span className="text-xs font-label uppercase tracking-widest opacity-60">{label}</span>
    </div>
  );
}

export default function EQOeePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="OEE"
        accent="분석 대시보드"
        nodeRef="IA-EQ-OEE-TREND"
        description="SCR-EQ-080 — 가용성 × 성능 × 품질 종합 OEE"
      />

      {/* KPI 게이지 카드 4종 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <GaugeCard label="종합 OEE" value={oeeKpi.oee} color="#00912F" />
        <GaugeCard label="가용성" value={oeeKpi.availability} color="#00912F" />
        <GaugeCard label="성능" value={oeeKpi.performance} color="#0ea5e9" />
        <GaugeCard label="품질" value={oeeKpi.quality} color="#8b5cf6" />
      </div>

      {/* MTBF KPI 카드 */}
      <div className="bg-surface-container-lowest p-5 mb-6 border-l-4 border-primary-accent">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-label text-xs uppercase tracking-widest opacity-50">MTBF (별도 KPI · FR-EQ-055)</span>
          <span className="text-2xl font-black font-headline tabular-nums text-primary-accent">
            {mtbf.hour}시간
          </span>
          <span className="text-sm font-label opacity-50">/ 목표 {mtbf.target}h</span>
          <span className="text-xs font-label opacity-40">진본: {mtbf.min.toLocaleString()}분</span>
        </div>
        <div className="mt-2 h-1 bg-surface-container-highest w-full">
          <div
            className="h-1 bg-primary-accent"
            style={{ width: `${Math.min((mtbf.hour / mtbf.target) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* 설비별 OEE 테이블 */}
      <DataTable
        title="설비별 OEE (EQ-P3000)"
        columns={[
          { key: "eq", label: "설비 코드" },
          { key: "avail", label: "가용성" },
          { key: "perf", label: "성능" },
          { key: "qual", label: "품질" },
          { key: "oee", label: "종합 OEE", className: "text-primary-accent font-black" },
        ]}
        data={eqOee}
        bufferCount={eqOee.length}
      />
    </div>
  );
}
