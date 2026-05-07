"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const DATA = [
  { date: "05-01", oee: 76.2, defect: 2.1 },
  { date: "05-02", oee: 77.5, defect: 1.9 },
  { date: "05-03", oee: 78.0, defect: 1.8 },
  { date: "05-04", oee: 77.8, defect: 2.0 },
  { date: "05-05", oee: 78.4, defect: 1.8 },
  { date: "05-06", oee: 79.1, defect: 1.7 },
];
const maxOee    = Math.max(...DATA.map(d => d.oee));
const maxDefect = Math.max(...DATA.map(d => d.defect));

export default function CombinedDualAxisPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="이중축 차트" accent="SCR-OPS-060" nodeRef="FNC-OPS-070,072~074" description="OEE × 불량률 동축 시각화 (텍스트 바) · 60초 갱신" />

      <div className="bg-surface-container p-5 mb-5">
        {/* 범례 */}
        <div className="flex gap-4 text-xs font-label mb-4">
          <span className="text-primary-accent">■ OEE (좌축 %)</span>
          <span className="text-error">■ 불량률 (우축 %)</span>
        </div>

        {/* 이중축 텍스트 시각화 */}
        <div className="space-y-4">
          {DATA.map(d => (
            <div key={d.date}>
              <div className="flex items-center justify-between text-xs font-label mb-1">
                <span className="text-on-surface-variant w-12">{d.date}</span>
                <div className="flex gap-6">
                  <span className="tabular-nums text-primary-accent">OEE {d.oee}%</span>
                  <span className="tabular-nums text-error">불량 {d.defect}%</span>
                </div>
              </div>
              {/* OEE 바 */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-label text-on-surface-variant w-8">OEE</span>
                <div className="flex-1 h-4 bg-surface-container-highest/30">
                  <div className="h-4 bg-primary-accent" style={{width:`${(d.oee/maxOee)*100}%`}} />
                </div>
              </div>
              {/* 불량 역바 (우측 기준) */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-label text-on-surface-variant w-8">불량</span>
                <div className="flex-1 h-3 bg-surface-container-highest/30 flex justify-end">
                  <div className="h-3 bg-error/60" style={{width:`${(d.defect/maxDefect)*100}%`}} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상관 분석 요약 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          ["OEE 평균",   "77.8%", "text-primary-accent"],
          ["불량 평균",  "1.88%", "text-error"],
          ["상관계수",   "-0.92", "text-on-surface"],
        ].map(([l,v,c])=>(
          <div key={l} className="bg-surface-container p-4 text-center">
            <p className="text-xs font-label text-on-surface-variant mb-1">{l}</p>
            <p className={`text-2xl font-black tabular-nums ${c}`}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
