"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function TransferInPage() {
  const [lotInput, setLotInput] = useState("");
  const [received, setReceived] = useState<{ lot: string; match: boolean }[]>([]);

  const EXPECTED = ["PRD-20260506-001", "PRD-20260505-011"];

  const handleReceive = () => {
    if (lotInput.trim()) {
      const match = EXPECTED.includes(lotInput.trim());
      setReceived((prev) => [{ lot: lotInput.trim(), match }, ...prev]);
      setLotInput("");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-[#131313]">
      <PageHeader title="TRANSFER /" accent="입고 스캔" nodeRef="SCR-MFG-031" status="PROTOTYPE" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-on-surface/50 font-label uppercase tracking-widest">입고지</span>
          <span className="font-mono">SHOP-B / BLT</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-on-surface/50 font-label uppercase tracking-widest">예정 LOT</span>
          <span className="font-mono">{EXPECTED.length}건</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">LOT 바코드 스캔</label>
        <input
          type="text"
          value={lotInput}
          onChange={(e) => setLotInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReceive()}
          placeholder="PRD-20260506-001"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-xl font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
        />
      </div>

      <button
        onClick={handleReceive}
        className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm mb-6"
      >
        입고 확인
      </button>

      <div className="space-y-2">
        {received.map((r, i) => (
          <div key={i} className="flex items-center justify-between bg-surface-container-low px-4 py-3">
            <span className="font-mono text-sm">{r.lot}</span>
            {r.match
              ? <StatusBadge type="running" label="일치" />
              : <StatusBadge type="warning" label="불일치" />}
          </div>
        ))}
        {received.length === 0 && (
          <p className="text-center text-on-surface/30 text-xs py-8 font-label uppercase tracking-widest">스캔 대기 중</p>
        )}
      </div>
    </div>
  );
}
