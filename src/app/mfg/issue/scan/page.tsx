"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function IssueScanPage() {
  const [lotInput, setLotInput] = useState("");
  const [scanned, setScanned] = useState<string[]>([]);

  const handleScan = () => {
    if (lotInput.trim()) {
      setScanned((prev) => [lotInput.trim(), ...prev]);
      setLotInput("");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-[#131313]">
      <PageHeader title="자재 투입" accent="ISSUE SCAN" nodeRef="SCR-MFG-010" status="PROTOTYPE" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-1">작업지시</p>
        <p className="font-headline font-bold text-sm">WO-P3000-20260506-0007</p>
        <p className="text-xs text-on-surface/40 mt-1">공정: G22C — 부재: B01-1-G22C-C-171</p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">
          LOT 바코드 스캔
        </label>
        <input
          type="text"
          value={lotInput}
          onChange={(e) => setLotInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          placeholder="RCV-20260501-0017"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-xl font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
        />
      </div>

      <button
        onClick={handleScan}
        className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm mb-6"
      >
        투입 확인
      </button>

      <div className="space-y-2">
        {scanned.map((lot, i) => (
          <div key={i} className="flex items-center justify-between bg-surface-container-low px-4 py-3">
            <span className="font-mono text-sm">{lot}</span>
            <StatusBadge type="running" label="투입완료" />
          </div>
        ))}
        {scanned.length === 0 && (
          <p className="text-center text-on-surface/30 text-xs py-8 font-label uppercase tracking-widest">
            스캔 대기 중
          </p>
        )}
      </div>
    </div>
  );
}
