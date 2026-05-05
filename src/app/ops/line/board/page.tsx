"use client";

import { PageHeader } from "@/components/ui/PageHeader";

type EquipStatus = "RUNNING" | "IDLE" | "DOWN" | "MAINTENANCE";
const STATUS_STYLE: Record<EquipStatus, string> = {
  RUNNING:     "text-primary-accent border-primary-accent bg-primary-accent/10",
  IDLE:        "text-[#f59e0b] border-[#f59e0b] bg-[#f59e0b]/10",
  DOWN:        "text-error border-error bg-error/10",
  MAINTENANCE: "text-[#3b82f6] border-[#3b82f6] bg-[#3b82f6]/10",
};
const STEP_ICON: Record<string, string> = { DONE: "✅", IN_PROGRESS: "🟡", FAILED: "🔴", PENDING: "🔘" };

const MEMBERS = [
  { id: "B01-1-G22C-C-171", steps:[{n:"절단",s:"DONE"},{n:"천공",s:"DONE"},{n:"용접",s:"IN_PROGRESS"},{n:"조립",s:"PENDING"},{n:"검사",s:"PENDING"}] },
  { id: "B01-1-G22C-C-172", steps:[{n:"절단",s:"DONE"},{n:"천공",s:"DONE"},{n:"용접",s:"FAILED"}] },
  { id: "B01-1-G22C-C-173", steps:[{n:"절단",s:"DONE"},{n:"천공",s:"IN_PROGRESS"}] },
];

const status: EquipStatus = "RUNNING";
const rate = 78.3;

export default function OPSLineBoardPage() {
  const rateColor = rate >= 80 ? "bg-primary-accent" : rate >= 60 ? "bg-[#f59e0b]" : "bg-error";

  return (
    <div className="p-6 bg-surface min-h-screen">
      <PageHeader title="WC 상황판 — 전체화면" accent="LINE-BOARD" nodeRef="SCR-OPS-010 KIOSK" description="키오스크 전체화면 모드 · 10초 갱신 · 액션 활성" />

      {/* 가동 상태 대형 카드 */}
      <div className={`border-2 p-10 text-center mb-6 ${STATUS_STYLE[status]}`}>
        <p className="text-4xl font-black tracking-widest mb-2">{status}</p>
        <p className="text-lg font-label uppercase tracking-widest opacity-70">WC=L01 1차 절단라인 / Plant P3000 / 교대조 A조</p>
        <p className="text-sm font-label opacity-50 mt-2">08:00 ~ 마지막 갱신 14:32:18</p>
      </div>

      {/* KPI + OEE */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-surface-container p-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">진척 KPI</p>
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            {[["목표","120건"],["완료","94건"],["잔여","26건"]].map(([l,v])=>(
              <div key={l}><p className="text-xs font-label text-on-surface-variant">{l}</p>
                <p className="text-4xl font-black tabular-nums">{v}</p></div>
            ))}
          </div>
          <p className="text-sm font-label text-on-surface-variant mb-1">진척률 {rate}%</p>
          <div className="h-5 bg-surface-container-highest/30">
            <div className={`h-5 ${rateColor}`} style={{width:`${rate}%`}} />
          </div>
        </div>
        <div className="bg-surface-container p-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">OEE 4분할</p>
          {[["가용성","92",92],["성능","88",88],["품질","98",98],["OEE","78.4",78.4]].map(([l,v,pct])=>(
            <div key={l as string} className="mb-3">
              <div className="flex justify-between text-sm font-label mb-1">
                <span className="text-on-surface-variant">{l}</span><span className="tabular-nums font-bold">{v}%</span>
              </div>
              <div className="h-3 bg-surface-container-highest/30">
                <div className="h-3 bg-primary-accent" style={{width:`${pct}%`}} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WO 미니 보드 */}
      <div className="bg-surface-container p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">WO 라인 미니 보드 — WO-P3000-20260506-0007</p>
        <div className="flex flex-wrap gap-3">
          {MEMBERS.map(m=>(
            <div key={m.id} className="bg-surface border border-outline-variant/10 px-3 py-2 text-xs font-label">
              <p className="text-on-surface-variant mb-1">{m.id}</p>
              <p>{m.steps.map(s=>`${s.n}${STEP_ICON[s.s]}`).join(" ")}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 text-xs font-label mt-4">
        <span className="text-primary-accent">● RUNNING</span>
        <span className="text-[#f59e0b]">● IDLE</span>
        <span className="text-error">● DOWN</span>
        <span className="text-[#3b82f6]">● MAINTENANCE</span>
        <span className="ml-auto text-on-surface-variant">[Excel] [PDF] [★ 즐겨찾기] [← Plant 종합]</span>
      </div>
    </div>
  );
}
