"use client";

import { PageHeader } from "@/components/ui/PageHeader";

type EquipStatus = "RUNNING" | "IDLE" | "DOWN" | "MAINTENANCE";
const STATUS_STYLE: Record<EquipStatus, string> = {
  RUNNING:     "text-primary-accent border-primary-accent bg-primary-accent/10",
  IDLE:        "text-warning border-warning bg-warning/10",
  DOWN:        "text-error border-error bg-error/10",
  MAINTENANCE: "text-[#22c55e] border-[#22c55e] bg-[#22c55e]/10",
};
const STEP_ICON: Record<string, string> = { DONE: "✅", IN_PROGRESS: "🟡", FAILED: "🔴", PENDING: "🔘" };

const MEMBERS = [
  { id: "B01-1-G22C-C-171", steps:[{n:"절단",s:"DONE"},{n:"천공",s:"DONE"},{n:"용접",s:"IN_PROGRESS"},{n:"조립",s:"PENDING"},{n:"검사",s:"PENDING"}] },
  { id: "B01-1-G22C-C-172", steps:[{n:"절단",s:"DONE"},{n:"천공",s:"DONE"},{n:"용접",s:"FAILED"}] },
];

const status: EquipStatus = "RUNNING";
const rate = 78.3;

export default function OPSLineKioskPage() {
  const rateColor = rate >= 80 ? "bg-primary-accent" : rate >= 60 ? "bg-warning" : "bg-error";

  return (
    <div className="p-6 bg-surface min-h-screen">
      {/* KIOSK 헤더 바 */}
      <div className="flex items-center gap-4 mb-4 bg-surface-container px-4 py-2 border-l-4 border-[#22c55e]">
        <span className="text-xs font-label text-[#22c55e] uppercase tracking-widest font-bold">KIOSK MODE</span>
        <span className="text-xs font-label text-on-surface-variant">WC=L01 / Device=KIOSK-P3000-N12 / 토큰 만료 D-29</span>
        <span className="ml-auto text-xs font-label text-on-surface-variant">사용자 인증 비활성 · Read-only</span>
      </div>

      <PageHeader title="키오스크 단말 모드" nodeRef="FNC-OPS-015" description="표시·자동 갱신·푸시 수신만 — 모든 액션 비활성" />

      {/* 가동 상태 대형 카드 */}
      <div className={`border-2 p-10 text-center mb-6 ${STATUS_STYLE[status]}`}>
        <p className="text-4xl font-black tracking-widest mb-2">{status}</p>
        <p className="text-lg font-label uppercase tracking-widest opacity-70">WC=L01 1차 절단라인 / Plant P3000 / 교대조 A조</p>
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
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">WO 라인 미니 보드</p>
        <div className="flex flex-wrap gap-3">
          {MEMBERS.map(m=>(
            <div key={m.id} className="bg-surface border border-outline px-3 py-2 text-xs font-label">
              <p className="text-on-surface-variant mb-1">{m.id}</p>
              <p>{m.steps.map(s=>`${s.n}${STEP_ICON[s.s]}`).join(" ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 액션 비활성 푸터 */}
      <div className="flex gap-4 text-xs font-label mt-4 border-t border-outline pt-3">
        <span className="text-on-surface-variant opacity-40 line-through">[Excel]</span>
        <span className="text-on-surface-variant opacity-40 line-through">[PDF]</span>
        <span className="text-on-surface-variant opacity-40 line-through">[★ 즐겨찾기]</span>
        <span className="ml-auto text-on-surface-variant">마지막 갱신 14:32:18 · 화면 보호기까지 잔여 9분</span>
      </div>
    </div>
  );
}
