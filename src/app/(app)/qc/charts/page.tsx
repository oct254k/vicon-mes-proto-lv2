"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const LIMITS = { ucl: 290.3, lcl: 289.7, cl: 290.0, sigma2Upper: 290.2, sigma2Lower: 289.8 };

const POINTS = [
  { id: "M-014001", at: "04-25 08:00", value: 290.05, rule: null },
  { id: "M-014002", at: "04-25 10:30", value: 290.10, rule: null },
  { id: "M-014050", at: "04-29 13:20", value: 289.92, rule: null },
  { id: "M-014061", at: "04-30 09:10", value: 289.88, rule: "R3" },
  { id: "M-014062", at: "04-30 10:00", value: 289.82, rule: "R3" },
  { id: "M-014063", at: "04-30 15:30", value: 289.78, rule: "R3" },
  { id: "M-014098", at: "05-03 11:20", value: 290.22, rule: "R5" },
  { id: "M-014120", at: "05-05 08:21", value: 290.05, rule: null },
];

const RULE_VIOLATIONS = [
  { rule: "R3", label: "Rule 3 — 6연속 하강 추세", count: 2 },
  { rule: "R5", label: "Rule 5 — 3점 중 2점 ±2σ 외 동측", count: 1 },
];

const EIGHT_RULES = ["R1","R2","R3","R4","R5","R6","R7","R8"] as const;
const RULE_COUNTS: Record<string, number> = { R1: 0, R2: 1, R3: 2, R4: 0, R5: 1, R6: 0, R7: 0, R8: 0 };

function toYPercent(value: number): number {
  const range = LIMITS.ucl - LIMITS.lcl;
  const padded = range * 1.4;
  const min = LIMITS.cl - padded / 2;
  return Math.max(0, Math.min(100, ((value - min) / padded) * 100));
}

function lineTop(value: number): string {
  return `${100 - toYPercent(value)}%`;
}

export default function QCChartsPage() {
  const [chartType, setChartType] = useState("X_BAR");

  return (
    <main className="p-8">
      <PageHeader
        title="관리도"
        accent="X-bar / R"
        nodeRef="IA-QC-SPC-CHART"
        description="Western Electric 8 Rules 위반 시각화 — 위반 포인트 클릭 시 상세 이동"
      />

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>I-002 절곡 각도</option>
          <option>I-001 절단 길이</option>
          <option>I-003 강판 두께</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>WC-BEND-01</option>
          <option>WC-CUT-01</option>
        </select>
        <input type="date" defaultValue="2026-04-25" className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label" />
        <span className="text-on-surface-variant/40 text-sm">~</span>
        <input type="date" defaultValue="2026-05-05" className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label" />
        <div className="flex gap-2">
          {(["X_BAR","R","p-chart"] as const).map((t) => (
            <button key={t} onClick={() => setChartType(t)}
              className={`px-3 py-1.5 text-xs font-label uppercase tracking-wider ${chartType === t ? "bg-primary-accent text-white font-bold" : "bg-surface-container text-on-surface-variant border border-outline-variant/20"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <FieldHeader title="X-bar 관리도" moduleRef="SCR-QC-020" />

      <div className="relative h-56 bg-surface-container-lowest border border-outline mb-1" style={{ overflow: "hidden" }}>
        {/* Zone ±2σ ~ ±3σ */}
        <div className="absolute bg-warning/5" style={{ top: lineTop(LIMITS.ucl), bottom: `calc(100% - ${lineTop(LIMITS.sigma2Upper)})`, left: 0, right: 0 }} />
        <div className="absolute bg-warning/5" style={{ top: lineTop(LIMITS.sigma2Lower), bottom: `calc(100% - ${lineTop(LIMITS.lcl)})`, left: 0, right: 0 }} />

        {/* UCL line */}
        <div className="absolute border-t border-error/60 w-full" style={{ top: lineTop(LIMITS.ucl) }}>
          <span className="absolute right-2 -top-4 text-[10px] text-error/70 font-label">UCL {LIMITS.ucl}</span>
        </div>
        {/* sigma2 upper */}
        <div className="absolute border-t border-dashed border-warning/40 w-full" style={{ top: lineTop(LIMITS.sigma2Upper) }} />
        {/* CL line */}
        <div className="absolute border-t border-primary-accent w-full" style={{ top: lineTop(LIMITS.cl) }}>
          <span className="absolute right-2 -top-4 text-[10px] text-primary-accent font-label">CL {LIMITS.cl}</span>
        </div>
        {/* sigma2 lower */}
        <div className="absolute border-t border-dashed border-warning/40 w-full" style={{ top: lineTop(LIMITS.sigma2Lower) }} />
        {/* LCL line */}
        <div className="absolute border-t border-error/60 w-full" style={{ top: lineTop(LIMITS.lcl) }}>
          <span className="absolute right-2 -top-4 text-[10px] text-error/70 font-label">LCL {LIMITS.lcl}</span>
        </div>

        {/* Points */}
        <div className="absolute inset-0 flex items-start justify-around px-4 pt-0">
          {POINTS.map((p, i) => {
            const topPct = 100 - toYPercent(p.value);
            const color = p.rule ? "bg-error" : "bg-primary-accent";
            return (
              <div key={i} className="relative flex flex-col items-center" style={{ marginTop: `${topPct}%` }}>
                <div className={`w-2.5 h-2.5 ${color} cursor-pointer hover:scale-150 transition-transform`} title={`${p.id}: ${p.value}° ${p.rule ? `[${p.rule}]` : ""}`} />
                {p.rule && (
                  <span className="absolute -top-4 text-[9px] text-error font-label">{p.rule}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-on-surface-variant/40 font-label px-4 mb-6">
        {POINTS.map((p, i) => <span key={i}>{p.at}</span>)}
      </div>

      <div className="flex gap-4 mb-6 text-xs font-label">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-primary-accent inline-block" /> 정상</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-error inline-block" /> Rule 위반</span>
        <span className="flex items-center gap-1"><span className="w-8 h-0 border-t border-dashed border-warning inline-block" /> ±2σ zone</span>
        <span className="flex items-center gap-1"><span className="w-8 h-0 border-t border-error/60 inline-block" /> UCL/LCL</span>
      </div>

      <FieldHeader title="8 Rules 위반 요약" moduleRef="FNC-QC-031" />
      <div className="grid grid-cols-8 gap-2 mb-6">
        {EIGHT_RULES.map((r) => (
          <div key={r} className={`p-2 text-center ${RULE_COUNTS[r] > 0 ? "bg-error/10 border border-error/30" : "bg-surface-container"}`}>
            <div className="text-xs font-label uppercase tracking-wider text-on-surface-variant/60">{r}</div>
            <div className={`text-lg font-headline font-black ${RULE_COUNTS[r] > 0 ? "text-error" : "text-on-surface-variant/30"}`}>{RULE_COUNTS[r]}</div>
          </div>
        ))}
      </div>

      <FieldHeader title="측정값 테이블" moduleRef="SCR-QC-020 §C" />
      <div className="bg-surface-container-lowest overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["측정 ID", "측정 시각", "측정값 (°)", "Rule 위반", "상태"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {POINTS.map((p) => (
              <tr key={p.id} className={`border-b border-outline-variant ${p.rule ? "bg-error/5" : "hover:bg-surface-container-highest/20"}`}>
                <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant/60">{p.id}</td>
                <td className="px-4 py-2 tabular-nums">{p.at}</td>
                <td className={`px-4 py-2 tabular-nums font-bold ${p.rule ? "text-error" : ""}`}>{p.value}</td>
                <td className="px-4 py-2">{p.rule ? <span className="text-error font-bold">{p.rule}</span> : <span className="text-on-surface-variant/30">—</span>}</td>
                <td className="px-4 py-2">{p.rule ? <span className="text-error text-xs">⚠ VIOLATION</span> : <span className="text-primary-accent text-xs">✅ OK</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {RULE_VIOLATIONS.map((v) => (
          <div key={v.rule} className="bg-error/10 border border-error/30 p-4">
            <div className="text-xs font-label uppercase tracking-widest text-error font-bold mb-1">{v.rule} — {v.count}건</div>
            <div className="text-sm text-on-surface-variant">{v.label}</div>
            <a href="/qc/charts/spc-detail" className="mt-2 inline-block text-xs text-primary-accent font-label uppercase tracking-wider hover:underline">→ 상세 분석</a>
          </div>
        ))}
        <div className="bg-surface-container p-4 col-span-2">
          <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-2">측정 통계</div>
          <div className="flex gap-6 text-sm font-headline tabular-nums">
            <span>N = <strong>120</strong></span>
            <span>평균 = <strong>290.05°</strong></span>
            <span>σ = <strong>0.18</strong></span>
            <span>Cpk = <strong className="text-primary-accent">1.45</strong></span>
          </div>
        </div>
      </div>
    </main>
  );
}
