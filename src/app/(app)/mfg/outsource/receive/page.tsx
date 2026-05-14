"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function OutsourceReceivePage() {
  const [lotInput, setLotInput] = useState("");
  const [qcResult, setQcResult] = useState<"" | "합격" | "불합격">("");
  const [received, setReceived] = useState<{ lot: string; qc: string }[]>([]);

  const handleReceive = () => {
    if (lotInput.trim() && qcResult) {
      setReceived((prev) => [{ lot: lotInput.trim(), qc: qcResult }, ...prev]);
      setLotInput("");
      setQcResult("");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-surface">
      <PageHeader title="OUTSOURCE /" accent="외주 입고" nodeRef="SCR-MFG-052" status="PROTOTYPE" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-on-surface/50 font-label uppercase tracking-widest">외주사</span>
          <span className="font-mono">OUTSOURCE-01 (강남금속)</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-on-surface/50 font-label uppercase tracking-widest">WO</span>
          <span className="font-mono">WO-P3000-20260506-0007</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">LOT 바코드 스캔</label>
        <input
          type="text"
          value={lotInput}
          onChange={(e) => setLotInput(e.target.value)}
          placeholder="PRD-20260506-001"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-xl font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">수입 검사 결과</label>
        <div className="flex gap-3">
          <button
            onClick={() => setQcResult("합격")}
            className={`flex-1 py-3 text-sm font-label font-bold uppercase tracking-wider border transition-colors ${qcResult === "합격" ? "border-primary-accent bg-primary-accent/20 text-primary-accent" : "border-outline-variant/30 text-on-surface/50"}`}
          >합격</button>
          <button
            onClick={() => setQcResult("불합격")}
            className={`flex-1 py-3 text-sm font-label font-bold uppercase tracking-wider border transition-colors ${qcResult === "불합격" ? "border-error bg-error/20 text-error" : "border-outline-variant/30 text-on-surface/50"}`}
          >불합격</button>
        </div>
      </div>

      <button
        onClick={handleReceive}
        disabled={!lotInput.trim() || !qcResult}
        className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm mb-6 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        외주 입고 확인
      </button>

      <div className="space-y-2">
        {received.map((r, i) => (
          <div key={i} className="flex items-center justify-between bg-surface-container-low px-4 py-3">
            <span className="font-mono text-sm">{r.lot}</span>
            <StatusBadge type={r.qc === "합격" ? "running" : "stopped"} label={r.qc} />
          </div>
        ))}
      </div>
    </div>
  );
}
