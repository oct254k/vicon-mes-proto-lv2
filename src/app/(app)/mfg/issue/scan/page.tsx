"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CONTEXT = {
  woId:     "WO-P3000-20260506-0007",
  memberId: "B01-1-G22C-C-171",
  memberType: "C형 6000mm",
  operation: "신선공정",
  material:  "M-COIL-A",
  neededM:   812.4,
  lotId:     "신선-20260506-001",
  location:  "WH-P3000-A-003",
};

type IssuedRow = { lot: string; material: string; qty: string; ts: string };

export default function IssueScanPage() {
  const [lotInput, setLotInput] = useState("");
  const [issued, setIssued]     = useState<IssuedRow[]>([]);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState("");

  function handleScan() {
    const val = lotInput.trim();
    if (!val) return;
    if (val !== CONTEXT.lotId) {
      setError(`LOT 불일치 — 예상: ${CONTEXT.lotId}`);
      return;
    }
    if (issued.find(r => r.lot === val)) {
      setError("이미 투입된 LOT입니다.");
      return;
    }
    setError("");
    const ts = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    setIssued(prev => [{ lot: val, material: CONTEXT.material, qty: `${CONTEXT.neededM}m`, ts }, ...prev]);
    setLotInput("");
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }

  return (
    <div className="max-w-sm mx-auto py-6 px-3 space-y-4">

      {/* 헤더 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="font-headline font-black text-base">자재 불출 — ISSUE</span>
        </div>
        <p className="text-xs font-mono text-on-surface/70">{CONTEXT.woId}</p>
        <p className="text-xs text-on-surface/60">{CONTEXT.memberId} · {CONTEXT.memberType}</p>
        <p className="text-xs text-on-surface/50 mt-0.5">
          공정: <span className="text-primary-accent">{CONTEXT.operation}</span>
        </p>
      </div>

      {/* 소요 자재 */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-4 space-y-2">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50">소요 자재 (BOM)</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-headline font-bold text-sm">{CONTEXT.material}</p>
            <p className="text-xs text-on-surface/50 font-label">{CONTEXT.location}</p>
          </div>
          <div className="text-right">
            <p className="font-headline font-black text-xl text-primary-accent tabular-nums">{CONTEXT.neededM}m</p>
            <p className="text-[10px] font-label text-on-surface/40 uppercase tracking-wider">불출 수량</p>
          </div>
        </div>
      </div>

      {/* LOT 스캔 */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-4 space-y-3">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50">LOT 바코드 스캔</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={lotInput}
            onChange={(e) => { setLotInput(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            placeholder="신선-YYYYMMDD-NNN"
            className="flex-1 bg-surface-container-lowest border-b-2 border-outline/30 px-3 py-3 text-lg font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
          />
          {/* 시뮬레이션 버튼 */}
          <button
            type="button"
            onClick={() => { setLotInput(CONTEXT.lotId); setError(""); }}
            className="px-3 bg-surface-container-highest text-on-surface/50 hover:text-primary-accent transition-colors"
            title="스캔 시뮬레이션"
          >
            <span className="material-symbols-outlined text-base">qr_code_scanner</span>
          </button>
        </div>
        {error && (
          <p className="text-xs font-label text-error border-l-2 border-error pl-2">{error}</p>
        )}
      </div>

      {/* 투입 확인 버튼 */}
      <button
        onClick={handleScan}
        disabled={!lotInput.trim()}
        className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm disabled:opacity-30"
      >
        {done ? "투입 완료 ✓" : "투입 확인"}
      </button>

      {/* 투입 이력 */}
      <div className="bg-surface-container-lowest">
        <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between">
          <span className="font-headline font-black text-xs uppercase tracking-widest">투입 이력</span>
          <span className="text-xs font-label text-on-surface/30 tabular-nums">{String(issued.length).padStart(3, "0")}</span>
        </div>
        {issued.length === 0 ? (
          <p className="text-center text-on-surface/30 text-xs py-6 font-label uppercase tracking-widest">스캔 대기 중</p>
        ) : (
          issued.map((r, i) => (
            <div key={i} className="px-4 py-3 border-b border-outline-variant flex justify-between items-center">
              <div>
                <p className="text-xs font-mono text-primary-accent">{r.lot}</p>
                <p className="text-[10px] font-label text-on-surface/50">{r.material} · {r.qty}</p>
              </div>
              <div className="text-right">
                <StatusBadge type="running" label="투입완료" />
                <p className="text-[10px] font-label text-on-surface/30 tabular-nums mt-1">{r.ts}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
