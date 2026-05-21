"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function TransferOutPage() {
  const [lotInput, setLotInput] = useState("");
  const [destInput, setDestInput] = useState("");
  const [dispatched, setDispatched] = useState<{ lot: string; dest: string }[]>([]);

  const handleDispatch = () => {
    if (lotInput.trim() && destInput.trim()) {
      setDispatched((prev) => [{ lot: lotInput.trim(), dest: destInput.trim() }, ...prev]);
      setLotInput("");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-surface">
      <PageHeader title="이동 /" accent="출고 스캔" nodeRef="SCR-MFG-030" status="PROTOTYPE" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-on-surface/50 font-label uppercase tracking-widest">출발지</span>
          <span className="font-mono">SHOP-A / G22C</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-on-surface/50 font-label uppercase tracking-widest">WO</span>
          <span className="font-mono">WO-P3000-20260506-0007</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">목적지</label>
        <select
          value={destInput}
          onChange={(e) => setDestInput(e.target.value)}
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-accent"
        >
          <option value="">목적지 선택</option>
          <option value="SHOP-B / BLT">SHOP-B / BLT</option>
          <option value="SHOP-C / PNT">SHOP-C / PNT</option>
          <option value="WH-FINISHED">WH-FINISHED (완제품 창고)</option>
          <option value="OUTSOURCE-01">OUTSOURCE-01 (외주)</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">LOT 바코드 스캔</label>
        <input
          type="text"
          value={lotInput}
          onChange={(e) => setLotInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleDispatch()}
          placeholder="PRD-20260506-001"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-xl font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
        />
      </div>

      <button
        onClick={handleDispatch}
        disabled={!lotInput.trim() || !destInput.trim()}
        className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm mb-6 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        출고 확인
      </button>

      <div className="space-y-2">
        {dispatched.map((d, i) => (
          <div key={i} className="flex items-center justify-between bg-surface-container-low px-4 py-3">
            <div>
              <p className="font-mono text-sm">{d.lot}</p>
              <p className="text-xs text-on-surface/40">→ {d.dest}</p>
            </div>
            <StatusBadge type="running" label="출고완료" />
          </div>
        ))}
      </div>
    </div>
  );
}
