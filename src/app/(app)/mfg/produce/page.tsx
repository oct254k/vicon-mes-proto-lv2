"use client";
import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MEMBER = { id: "B01-1-G22C-C-171", type: "C형 6000mm", woId: "WO-P3000-20260506-0007", operation: "신선공정" };
const LOT_PREVIEW = "신선-20260506-001";
const GATE_STATUS = { prev: "—", ok: true };  // 신선 = 첫 공정, 선행 없음

const HISTORY = [
  { memberId: "B01-1-G22C-C-168", lot: "신선-20260506-044", time: "09:15" },
  { memberId: "B01-1-G22C-C-169", lot: "신선-20260506-045", time: "10:42" },
  { memberId: "B01-1-G22C-C-170", lot: "신선-20260506-046", time: "13:58" },
];

export default function MFGProducePage() {
  const [scan, setScan] = useState("");
  const [completed, setCompleted] = useState(HISTORY);
  const [done, setDone] = useState(false);

  const handleComplete = () => {
    if (!scan) return;
    setCompleted(prev => [
      { memberId: scan, lot: LOT_PREVIEW, time: new Date().toTimeString().slice(0, 5) },
      ...prev,
    ]);
    setScan("");
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="max-w-sm mx-auto py-6 px-3 space-y-4">
      {/* 헤더 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4">
        <div className="flex justify-between items-start">
          <span className="font-headline font-black text-base">부재 완성 — PRODUCE</span>
        </div>
        <p className="text-xs font-mono text-on-surface/70 mt-1">{MEMBER.woId}</p>
        <p className="text-xs text-on-surface/60">{MEMBER.id} · {MEMBER.type}</p>
        <p className="text-xs text-on-surface/50 mt-0.5">공정: <span className="text-primary-accent">{MEMBER.operation}</span></p>
      </div>

      {/* 공정 게이트 상태 */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-1">이전 공정 게이트</p>
          <p className="text-sm font-headline">{GATE_STATUS.prev}</p>
        </div>
        <StatusBadge type={GATE_STATUS.ok ? "running" : "stopped"} label={GATE_STATUS.ok ? "정상" : "차단"} />
      </div>

      {/* 부재 바코드 스캔 */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-4 space-y-3">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50">부재 바코드 스캔</p>
        <input
          type="text"
          value={scan}
          onChange={e => setScan(e.target.value)}
          placeholder="B01-1-G22C-C-171"
          className="w-full bg-surface border border-outline-variant/30 px-3 py-3 text-2xl font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
        />
      </div>

      {/* Lot 채번 미리보기 */}
      <div className="bg-surface-container border border-primary-accent/30 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-1">채번 Lot 미리보기</p>
          <p className="text-xl font-mono text-primary-accent">{LOT_PREVIEW}</p>
        </div>
        <span className="text-xs text-on-surface/30 font-label">자동 부여</span>
      </div>

      {/* 완료 확정 버튼 */}
      <button
        onClick={handleComplete}
        disabled={!scan || !GATE_STATUS.ok}
        className={`w-full py-4 text-base font-label uppercase tracking-widest ${
          scan && GATE_STATUS.ok
            ? "bg-primary-accent text-white"
            : "bg-surface-container-high text-on-surface/30"
        }`}
      >
        {done ? "완료 확정 ✓" : "완료 확정"}
      </button>
      {!GATE_STATUS.ok && (
        <p className="text-xs text-error text-center font-label">이전 공정 미완료 — 관리자 Override 필요</p>
      )}

      {/* 오늘 완성 이력 */}
      <div className="bg-surface-container-lowest">
        <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between">
          <span className="font-headline font-black text-xs uppercase tracking-widest">오늘 완성 이력</span>
          <span className="text-xs text-on-surface/40 font-label">{completed.length}건</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["부재코드", "Lot", "시각"].map(h => (
                  <th key={h} className="px-3 py-2 text-xs font-label uppercase tracking-widest opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs font-headline">
              {completed.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                  <td className="px-3 py-2 font-mono">{r.memberId}</td>
                  <td className="px-3 py-2 text-primary-accent font-mono">{r.lot}</td>
                  <td className="px-3 py-2 tabular-nums text-on-surface/50">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
