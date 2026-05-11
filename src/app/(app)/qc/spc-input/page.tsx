"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PC_SAMPLES = [
  { no: 1, thickness: 2.301, deviation: 0.012 },
  { no: 2, thickness: 2.295, deviation: 0.008 },
  { no: 3, thickness: 2.302, deviation: 0.011 },
];

type FeedbackType = "ok" | "warning" | "violation" | null;

function pdaFeedback(value: number): FeedbackType {
  if (value >= 5999.5 && value <= 6000.5) return "ok";
  if (value >= 5999.0 && value < 5999.5) return "warning";
  return "violation";
}

export default function QCSpcInputPage() {
  const [tab, setTab] = useState<"pc" | "pda">("pc");
  const [pdaValue, setPdaValue] = useState("2.45");
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const tabs = [
    { key: "pc", label: "PC 입력" },
    { key: "pda", label: "PDA 입력" },
  ] as const;

  function handlePdaSubmit() {
    const n = parseFloat(pdaValue);
    setFeedback(isNaN(n) ? "violation" : pdaFeedback(n));
  }

  const feedbackStyle: Record<NonNullable<FeedbackType>, string> = {
    ok: "border-primary-accent text-primary-accent",
    warning: "border-[#f59e0b] text-[#f59e0b]",
    violation: "border-error text-error",
  };
  const feedbackLabel: Record<NonNullable<FeedbackType>, string> = {
    ok: "✅ IN_SPEC — 정상 범위",
    warning: "⚠ WARNING — 관리 한계 주의",
    violation: "❌ VIOLATION — 관리 한계 초과",
  };

  return (
    <main className="p-8">
      <PageHeader
        title="SPC 측정"
        accent="입력"
        nodeRef="IA-QC-SPC-MEASURE-PDA"
        description="PC 다중 샘플 입력 및 PDA 단일 측정 즉시 평가"
      />

      <div className="flex gap-0 mb-6 border-b border-outline-variant/20">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-6 py-2 text-sm font-label uppercase tracking-widest border-b-2 transition-colors ${
              tab === t.key
                ? "border-primary-accent text-primary-accent"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "pc" && (
        <section>
          <FieldHeader title="PC — Lot 샘플 다중 입력" moduleRef="SCR-QC-011" />
          <div className="flex gap-3 mb-4">
            <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
              <option>M-SHEET-B-20260501-007</option>
            </select>
            <span className="text-xs text-on-surface-variant/60 self-center font-label uppercase tracking-wider">WC: WC-INSP-01 | 공정 05 | 샘플 3</span>
          </div>
          <div className="bg-surface-container-lowest overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/10">
                  {["샘플", "I-003 강판 두께 (mm)", "I-007 두께 편차 (mm)"].map((h) => (
                    <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-headline text-sm">
                {PC_SAMPLES.map((s) => (
                  <tr key={s.no} className="border-b border-outline-variant/5">
                    <td className="px-4 py-2 tabular-nums">#{s.no}</td>
                    <td className="px-4 py-2">
                      <input defaultValue={s.thickness} className="bg-surface-container border border-outline-variant/30 px-2 py-1 w-24 text-sm tabular-nums" />
                    </td>
                    <td className="px-4 py-2">
                      <input defaultValue={s.deviation} className="bg-surface-container border border-outline-variant/30 px-2 py-1 w-24 text-sm tabular-nums" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-surface-container-lowest border-l-4 border-primary-accent text-sm">
            <span className="text-primary-accent font-bold">✅ 즉시 평가</span>
            <span className="ml-3 text-on-surface-variant">3건 / 평균 2.299mm — 모두 IN_SPEC (UCL 2.32 / LCL 2.28)</span>
          </div>
          <div className="mt-4">
            <button className="bg-primary-accent text-black text-sm font-label uppercase tracking-widest px-6 py-2 font-bold hover:opacity-90">
              확정 ▶
            </button>
          </div>
        </section>
      )}

      {tab === "pda" && (
        <section className="max-w-sm mx-auto">
          <FieldHeader title="PDA — 단일 측정 즉시 평가" moduleRef="SCR-QC-010" />
          <div className="bg-surface-container-lowest p-4 mb-4 text-xs font-label uppercase tracking-wider text-on-surface-variant/60">
            <div>항목: SPC-WIRE-DIA-001 — 절단 길이 (mm)</div>
            <div className="mt-1">UCL: 6000.5 | CL: 6000.0 | LCL: 5999.5</div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              측정값 입력 (mm)
            </label>
            <input
              type="number"
              step="0.01"
              value={pdaValue}
              onChange={(e) => { setPdaValue(e.target.value); setFeedback(null); }}
              className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-xl tabular-nums font-headline text-on-surface"
            />
          </div>
          <button
            onClick={handlePdaSubmit}
            className="w-full bg-primary-accent text-black text-sm font-label uppercase tracking-widest py-3 font-bold hover:opacity-90 mb-4"
          >
            확정 ▶ 즉시 평가
          </button>
          {feedback && (
            <div className={`p-4 border-l-4 bg-surface-container-lowest ${feedbackStyle[feedback]}`}>
              <div className="font-bold text-sm font-label uppercase tracking-widest">{feedbackLabel[feedback]}</div>
              <div className="mt-1 text-xs text-on-surface-variant/60 font-label">측정값: {pdaValue} mm</div>
            </div>
          )}
          <p className="mt-4 text-xs text-on-surface-variant/40 font-label uppercase tracking-wider text-center">
            30분 내 본인 수정 가능
          </p>
        </section>
      )}
    </main>
  );
}
