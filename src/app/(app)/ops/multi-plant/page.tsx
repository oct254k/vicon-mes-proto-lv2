"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const PLANTS = [
  { id: "P1000", name: "제1 이천공장",          oee: 82.1, defect: 1.2, progress: 88, eq: "14/16", status: "정상" },
  { id: "P2000", name: "제2 이천공장",          oee: 74.5, defect: 2.1, progress: 75, eq: "10/14", status: "주의" },
  { id: "P3000", name: "제3 이천공장 (데크)",   oee: 78.4, defect: 1.8, progress: 92, eq: "12/15", status: "정상" },
  { id: "P4000", name: "제4 안성공장 (가설재)", oee: 68.0, defect: 3.5, progress: 61, eq: "9/12",  status: "위험" },
];

const STATUS_COLOR: Record<string, string> = { 정상: "text-primary-accent", 주의: "text-warning", 위험: "text-error" };

export default function MultiPlantPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="다공장 종합" nodeRef="FNC-OPS-040~042,044" description="L4 임원 · Plant 전체 비교 · 60초 갱신" />

      <div className="flex gap-3 mb-5">
        <a href="/ops/multi-plant/compare" className="bg-surface-container px-4 py-2 text-xs font-label hover:border hover:border-primary-accent/40">Plant 비교</a>
        <a href="/ops/multi-plant/digest"  className="bg-surface-container px-4 py-2 text-xs font-label hover:border hover:border-primary-accent/40">임원 다이제스트</a>
      </div>

      {/* Plant 카드 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {PLANTS.map(p => (
          <div key={p.id} className="bg-surface-container p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs font-label text-on-surface-variant">{p.id}</p>
                <p className="text-lg font-headline font-black text-on-surface">{p.name}</p>
              </div>
              <span className={`text-sm font-label font-bold ${STATUS_COLOR[p.status]}`}>{p.status}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[["OEE",`${p.oee}%`],["불량률",`${p.defect}%`],["진척률",`${p.progress}%`],["가동",p.eq]].map(([l,v])=>(
                <div key={l}>
                  <p className="text-xs font-label text-on-surface-variant">{l}</p>
                  <p className="text-lg font-black tabular-nums">{v}</p>
                </div>
              ))}
            </div>
            {/* OEE 막대 */}
            <div className="h-2 bg-surface-container-highest/30 mt-3">
              <div className={`h-2 ${p.oee>=80?"bg-primary-accent":p.oee>=70?"bg-warning":"bg-error"}`} style={{width:`${p.oee}%`}} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs font-label text-on-surface-variant mt-4 text-right">마지막 갱신 2026-05-05 14:32:18</p>
    </div>
  );
}
