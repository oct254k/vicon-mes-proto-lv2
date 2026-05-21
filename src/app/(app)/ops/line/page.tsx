"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type EquipStatus = "RUNNING" | "IDLE" | "DOWN" | "MAINTENANCE";
const STATUS_COLOR: Record<EquipStatus, string> = {
  RUNNING: "text-primary-accent border-primary-accent bg-primary-accent/10",
  IDLE: "text-warning border-warning bg-warning/10",
  DOWN: "text-error border-error bg-error/10",
  MAINTENANCE: "text-[#22c55e] border-[#22c55e] bg-[#22c55e]/10",
};
const STATUS_BADGE_TYPE: Record<EquipStatus, "running" | "idle" | "stopped" | "warning"> = {
  RUNNING: "running", IDLE: "idle", DOWN: "stopped", MAINTENANCE: "warning",
};
const SL: Record<EquipStatus, string> = { RUNNING:"가동중", IDLE:"유휴", DOWN:"중단", MAINTENANCE:"점검중" };
const EQUIPMENTS = [
  { id: "L01", name: "신선공정 1호",       status: "RUNNING" as EquipStatus, since: "08:00" },
  { id: "L02", name: "신선공정 2호",       status: "RUNNING" as EquipStatus, since: "08:00" },
  { id: "L03", name: "TG공정 1호",        status: "RUNNING" as EquipStatus, since: "09:30" },
  { id: "L04", name: "TG공정 2호",        status: "RUNNING" as EquipStatus, since: "08:00" },
  { id: "L05", name: "포밍공정 1호",       status: "RUNNING" as EquipStatus, since: "08:15" },
  { id: "L06", name: "포밍공정 2호",       status: "RUNNING" as EquipStatus, since: "08:00" },
  { id: "L07", name: "데크플레이트공정 1호", status: "RUNNING" as EquipStatus, since: "08:00" },
  { id: "L08", name: "데크플레이트공정 2호", status: "RUNNING" as EquipStatus, since: "10:00" },
  { id: "L09", name: "포장라인",           status: "IDLE" as EquipStatus,    since: "13:45" },
  { id: "L10", name: "출하검사",           status: "IDLE" as EquipStatus,    since: "12:30" },
  { id: "L11", name: "인발기 #1",         status: "DOWN" as EquipStatus,    since: "14:15" },
  { id: "L12", name: "롤포밍 #2",         status: "MAINTENANCE" as EquipStatus, since: "11:00" },
];
const WCS = [
  "L01 신선공정 — P3000",
  "L02 TG공정 — P3000",
  "L03 포밍공정 — P3000",
  "L04 데크플레이트공정 — P3000",
];
const SPC_TOP3 = [
  { rule: "Rule 1", desc: "측정값 UCL 초과 — B01-1-G22C-C-171 / 6010mm > UCL=6005mm", time: "14:31" },
  { rule: "Rule 2", desc: "연속 9점 한쪽 (Run Rule)", time: "13:50" },
  { rule: "Rule 5", desc: "2/3점 2σ 초과", time: "12:15" },
];
const MEMBERS = [
  { id: "B01-1-G22C-C-171", steps: [{ n:"절단",s:"DONE"},{n:"천공",s:"DONE"},{n:"용접",s:"IN_PROGRESS"},{n:"조립",s:"PENDING"},{n:"검사",s:"PENDING"}] },
  { id: "B01-1-G22C-C-172", steps: [{ n:"절단",s:"DONE"},{n:"천공",s:"DONE"},{n:"용접",s:"FAILED"}] },
  { id: "B01-1-G22C-C-173", steps: [{ n:"절단",s:"DONE"},{n:"천공",s:"IN_PROGRESS"}] },
];
const STEP_ICON: Record<string, string> = { DONE: "✅", IN_PROGRESS: "🟡", FAILED: "🔴", PENDING: "🔘" };

export default function OPSLinePage() {
  const [wc, setWc] = useState(WCS[0]);
  const status: EquipStatus = "RUNNING";
  const rate = 78.3;
  const rateColor = rate >= 80 ? "bg-primary-accent" : rate >= 60 ? "bg-warning" : "bg-error";

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="라인 상황판" nodeRef="FNC-OPS-010~016" description="WC 단위 가동 현황 · 10초 자동 갱신" />

      {/* WC 선택 + 메타 */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <select value={wc} onChange={e => setWc(e.target.value)}
          className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
          {WCS.map(w => <option key={w}>{w}</option>)}
        </select>
        <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">교대조 A조 · 10초 갱신</span>
        <span className="text-xs font-label text-on-surface-variant ml-auto">마지막 갱신 2026-05-05 14:32:18</span>
      </div>

      {/* B. 가동 상태 카드 + C. 진척 KPI + D. OEE 4분할 */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* B */}
        <div className={`border-2 p-6 flex flex-col items-center justify-center gap-3 ${STATUS_COLOR[status]}`}>
          <p className="text-4xl font-black tracking-widest">{SL[status]}</p>
          <p className="text-sm font-label uppercase tracking-widest opacity-70">가동 중 · 08:00 ~</p>
          <p className="text-xs font-label opacity-50">교대조 A: 김작업 · 이작업 · 박작업</p>
        </div>
        {/* C */}
        <div className="bg-surface-container p-5 flex flex-col gap-3">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">진척 KPI</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[["목표","120건"],["완료","94건"],["잔여","26건"]].map(([l,v])=>(
              <div key={l}><p className="text-xs font-label text-on-surface-variant">{l}</p>
                <p className="text-2xl font-black tabular-nums text-on-surface">{v}</p></div>
            ))}
          </div>
          <div>
            <p className="text-xs font-label text-on-surface-variant mb-1">진척률 {rate}%</p>
            <div className="h-4 bg-surface-container-highest/30 w-full">
              <div className={`h-4 ${rateColor} transition-all`} style={{width:`${rate}%`}} />
            </div>
          </div>
        </div>
        {/* D */}
        <div className="bg-surface-container p-5">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">OEE 4분할</p>
          {[["가용성","92",92,"bg-primary-accent"],["성능","88",88,"bg-primary-accent"],["품질","98",98,"bg-primary-accent"],["OEE","78.4",78.4,"bg-warning"]].map(([l,v,pct,c])=>(
            <div key={l as string} className="mb-2">
              <div className="flex justify-between text-xs font-label mb-0.5">
                <span className="text-on-surface-variant">{l}</span><span className="tabular-nums">{v}%</span>
              </div>
              <div className="h-2 bg-surface-container-highest/30"><div className={`h-2 ${c}`} style={{width:`${pct}%`}} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* E. WO 라인 미니 보드 */}
      <div className="bg-surface-container p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">WO 라인 미니 보드 — WO-P3000-20260506-0007</p>
        <div className="flex flex-wrap gap-3">
          {MEMBERS.map(m=>(
            <div key={m.id} className="bg-surface border border-outline px-3 py-2 text-xs font-label">
              <p className="text-on-surface-variant mb-1">{m.id}</p>
              <p>{m.steps.map(s=>`${s.n}${STEP_ICON[s.s]}`).join(" ")}</p>
            </div>
          ))}
          <div className="border border-outline px-3 py-2 text-xs font-label text-on-surface-variant flex items-center">+4건 더 보기</div>
        </div>
      </div>

      {/* F. SPC + G. 점검 D-day */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-surface-container p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">SPC Top3 위반</p>
          {SPC_TOP3.map((s,i)=>(
            <div key={i} className="flex gap-2 text-xs font-label mb-2">
              <span className="text-error font-bold">{i+1})</span>
              <span className="text-on-surface-variant">{s.time}</span>
              <span className="text-on-surface">[{s.rule}] {s.desc}</span>
            </div>
          ))}
        </div>
        <div className="bg-surface-container p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">점검 D-day</p>
          <p className="text-error font-black text-2xl tabular-nums">D-3</p>
          <p className="text-xs font-label text-on-surface-variant mt-1">PM 다음 점검 2026-05-08</p>
          <p className="text-xs font-label text-on-surface-variant">BM 미해결 0건</p>
        </div>
      </div>

      {/* H. Plant 전체 설비 그리드 (유지) */}
      <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3 mt-4">Plant P3000 전체 요약</p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {EQUIPMENTS.map(eq=>(
          <div key={eq.id} className="bg-surface-container p-3 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-1">
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">{eq.id}</span>
              <StatusBadge type={STATUS_BADGE_TYPE[eq.status]} label={SL[eq.status]} />
            </div>
            <p className="text-sm font-headline font-bold text-on-surface leading-tight">{eq.name}</p>
            <p className="text-xs text-on-surface-variant font-label">{eq.since} ~</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-xs font-label">
        <span className="text-primary-accent">● 가동중</span>
        <span className="text-warning">● 유휴</span>
        <span className="text-error">● 중단</span>
        <span className="text-[#22c55e]">● 점검중</span>
      </div>
    </div>
  );
}
