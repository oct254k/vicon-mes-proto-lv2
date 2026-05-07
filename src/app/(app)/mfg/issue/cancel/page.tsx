"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ISSUES = [
  { lot: "RCV-20260501-0017", part: "B01-1-G22C-C-171", worker: "김철수", issuedAt: "2026-05-06 08:12" },
  { lot: "RCV-20260501-0018", part: "B01-1-G22C-C-172", worker: "김철수", issuedAt: "2026-05-06 08:15" },
  { lot: "RCV-20260430-0041", part: "B02-2-G22C-C-088", worker: "박영희", issuedAt: "2026-05-05 14:30" },
];

export default function IssueCancelPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState<string[]>([]);

  const handleCancel = () => {
    if (selected && !cancelled.includes(selected)) {
      setCancelled((prev) => [...prev, selected]);
      setSelected(null);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-[#131313]">
      <PageHeader title="ISSUE /" accent="투입 취소" nodeRef="SCR-MFG-012" status="PROTOTYPE" />

      <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-4">취소할 투입 LOT 선택</p>

      <div className="space-y-2 mb-6">
        {ISSUES.map((item) => {
          const isCancelled = cancelled.includes(item.lot);
          const isSelected = selected === item.lot;
          return (
            <button
              key={item.lot}
              onClick={() => !isCancelled && setSelected(isSelected ? null : item.lot)}
              className={`w-full text-left px-4 py-3 border transition-colors ${
                isCancelled
                  ? "border-outline-variant/10 opacity-30 cursor-not-allowed"
                  : isSelected
                  ? "border-primary-accent bg-primary-accent/10"
                  : "border-outline-variant/20 bg-surface-container hover:border-primary-accent/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">{item.lot}</span>
                {isCancelled ? <StatusBadge type="stopped" label="취소됨" /> : isSelected ? <StatusBadge type="warning" label="선택됨" /> : null}
              </div>
              <p className="text-xs text-on-surface/40 mt-1">{item.part} — {item.issuedAt}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleCancel}
        disabled={!selected}
        className="w-full py-4 font-label font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed bg-error text-white"
      >
        투입 취소 확정
      </button>
    </div>
  );
}
