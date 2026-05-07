"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

interface PlantKPI {
  id: string;
  name: string;
  oee: number;
  defectRate: number;
  progress: number;
  isOutsource: boolean;
  status: "green" | "yellow" | "red";
}

const PLANTS: PlantKPI[] = [
  { id: "P3000", name: "제3 이천공장 (데크)", oee: 78, defectRate: 1.8, progress: 92, isOutsource: false, status: "green" },
  { id: "P2000", name: "제2 이천공장", oee: 65, defectRate: 2.3, progress: 85, isOutsource: false, status: "green" },
  { id: "P1000", name: "제1 이천공장", oee: 52, defectRate: 4.1, progress: 71, isOutsource: false, status: "red" },
];

const STATUS_ACCENT: Record<string, string> = {
  green: "border-primary-accent",
  yellow: "border-[#f59e0b]",
  red: "border-error",
};

const KPI_COLOR: Record<string, string> = {
  green: "text-primary-accent",
  yellow: "text-[#f59e0b]",
  red: "text-error",
};

function OeeBar({ value, color }: { value: number; color: string }) {
  const barColor = color === "red" ? "bg-error/60" : color === "yellow" ? "bg-[#f59e0b]/60" : "bg-primary-accent/60";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-surface-container-highest h-2">
        <div className={`h-2 ${barColor}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-black tabular-nums ${KPI_COLOR[color]} w-8 text-right`}>{value}%</span>
    </div>
  );
}

export default function OPSMultisitePage() {
  return (
    <div className="p-6 bg-surface min-h-screen">
      <PageHeader
        title="다공장 비교"
        accent="MULTISITE"
        nodeRef="SCR-OPS-030"
        description="그룹사 전체 Plant KPI 비교 · 60초 자동 갱신"
      />

      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
          정렬: OEE 내림차순 · 외주 공장 제외
        </span>
        <span className="text-xs font-label text-on-surface-variant">마지막 갱신 14:32 ⟳ 60초</span>
      </div>

      {/* Plant 비교 카드 3개 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PLANTS.map((p) => (
          <div key={p.id} className={`bg-surface-container border-l-4 ${STATUS_ACCENT[p.status]} p-5`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">{p.id}</p>
                <p className="text-base font-headline font-black text-on-surface">{p.name}</p>
              </div>
              {p.status === "red" && (
                <span className="text-xs bg-error/20 text-error px-2 py-0.5 font-label uppercase">임계 미달</span>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-label text-on-surface-variant mb-1 uppercase tracking-wider">OEE</p>
                <OeeBar value={p.oee} color={p.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-outline-variant/10">
                <div>
                  <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">불량률</p>
                  <p className={`text-2xl font-black tabular-nums ${p.defectRate > 3 ? "text-error" : "text-primary-accent"}`}>
                    {p.defectRate}<span className="text-sm">%</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">가동률</p>
                  <p className={`text-2xl font-black tabular-nums ${KPI_COLOR[p.status]}`}>
                    {p.progress}<span className="text-sm">%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 요약 막대 비교표 */}
      <div className="bg-surface-container-lowest p-4">
        <FieldHeader title="Plant OEE 비교" moduleRef="FNC-OPS-040" />
        <div className="space-y-3">
          {PLANTS.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="text-xs font-label w-16 text-on-surface-variant uppercase">{p.id}</span>
              <div className="flex-1 flex items-end gap-1 h-8">
                <div
                  className={`h-full ${p.status === "red" ? "bg-error/60" : "bg-primary-accent/60"}`}
                  style={{ width: `${p.oee}%` }}
                />
              </div>
              <span className={`text-sm font-black tabular-nums w-12 text-right ${KPI_COLOR[p.status]}`}>{p.oee}%</span>
              <span className="text-xs text-on-surface-variant w-20">불량 {p.defectRate}%</span>
              <span className="text-xs text-on-surface-variant w-20">진척 {p.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
