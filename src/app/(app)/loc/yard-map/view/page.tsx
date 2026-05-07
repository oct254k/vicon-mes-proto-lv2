"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

type SlotStatus = "EMPTY" | "OCCUPIED" | "FULL" | "MAINTENANCE" | "AGING";

interface Slot { id: string; row: number; col: number; status: SlotStatus; material?: string; lot?: string; qty?: number; }

const SLOTS: Slot[] = [
  { id: "Y-P3000-A-01-01", row:0, col:0, status:"EMPTY" },
  { id: "Y-P3000-A-01-02", row:0, col:1, status:"OCCUPIED", material:"M-COIL-A P3000 900m", lot:"RCV-20260501-0017", qty:900 },
  { id: "Y-P3000-A-01-03", row:0, col:2, status:"FULL",     material:"M-COIL-A", lot:"RCV-20260503-0011", qty:5000 },
  { id: "Y-P3000-A-01-04", row:0, col:3, status:"EMPTY" },
  { id: "Y-P3000-A-01-05", row:0, col:4, status:"OCCUPIED", material:"M-COIL-B", lot:"RCV-20260504-0021", qty:1800 },
  { id: "Y-P3000-A-01-06", row:0, col:5, status:"EMPTY" },
  { id: "Y-P3000-A-02-01", row:1, col:0, status:"OCCUPIED", material:"M-COIL-C", lot:"RCV-20260502-0009", qty:4200 },
  { id: "Y-P3000-A-02-02", row:1, col:1, status:"FULL",     material:"M-COIL-A", lot:"RCV-20260430-0033", qty:5000 },
  { id: "Y-P3000-A-02-03", row:1, col:2, status:"AGING",    material:"M-COIL-A", lot:"LOT-20260420-007",  qty:2800 },
  { id: "Y-P3000-A-02-04", row:1, col:3, status:"EMPTY" },
  { id: "Y-P3000-A-02-05", row:1, col:4, status:"MAINTENANCE" },
  { id: "Y-P3000-A-02-06", row:1, col:5, status:"EMPTY" },
];

const CELL_STYLE: Record<SlotStatus, string> = {
  EMPTY:       "bg-[#1a1a1a] border border-white/5 text-white/20",
  OCCUPIED:    "bg-[#00912F]/20 border border-[#00912F]/40 text-[#00912F]",
  FULL:        "bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b]",
  MAINTENANCE: "bg-[#ef4444]/20 border border-[#ef4444]/30 text-[#ef4444]",
  AGING:       "bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316] animate-pulse",
};

const LEGEND: { status: SlotStatus; label: string }[] = [
  { status: "EMPTY",       label: "EMPTY" },
  { status: "OCCUPIED",    label: "OCCUPIED" },
  { status: "FULL",        label: "FULL" },
  { status: "MAINTENANCE", label: "MAINT" },
  { status: "AGING",       label: "AGING" },
];

export default function YardMapViewPage() {
  const [selected, setSelected] = useState<Slot | null>(null);

  return (
    <div>
      <PageHeader
        title="격자 조회"
        accent="LOC-010"
        nodeRef="SCR-LOC-010"
        status="PROTOTYPE"
        description="야적장 Y-RAW 격자 읽기 전용. 셀 클릭 시 하단 부재 상세 표시. AGING 셀은 깜빡임."
      />

      <div className="flex gap-4">
        <div className="flex-1 bg-[#1a1a1a] border border-white/10 p-4">
          <p className="font-label text-xs uppercase tracking-widest text-white/40 mb-3">Y-RAW 격자 (2×6)</p>
          <div className="grid grid-cols-6 gap-1.5">
            {SLOTS.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected?.id ? null : s)}
                className={`h-16 flex flex-col items-center justify-center text-[10px] font-label transition-all ${CELL_STYLE[s.status]} ${selected?.id === s.id ? "ring-2 ring-white/40 scale-105" : "hover:scale-105"}`}>
                <span className="font-bold">{s.id.split("-").slice(-2).join("-")}</span>
                {s.status !== "EMPTY" && s.status !== "MAINTENANCE" && <span className="opacity-70">{s.status}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="w-44 shrink-0 bg-[#1a1a1a] border border-white/10 p-4 space-y-3">
          <FieldHeader title="범례" />
          {LEGEND.map(l => (
            <div key={l.status} className="flex items-center gap-2">
              <div className={`w-4 h-4 shrink-0 ${CELL_STYLE[l.status]}`} />
              <span className="text-xs font-label text-white/60">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="mt-4 bg-[#1a1a1a] border-l-4 border-[#00912F] p-5">
          <p className="font-label text-xs uppercase tracking-widest text-[#00912F] mb-3">선택 — {selected.id}</p>
          {selected.material ? (
            <div className="grid grid-cols-4 gap-3 text-sm">
              {[["자재", selected.material], ["Lot", selected.lot??"-"], ["수량", `${selected.qty} m`], ["상태", selected.status]].map(([k,v]) => (
                <div key={k} className="bg-[#131313] p-3">
                  <p className="font-label text-[10px] uppercase tracking-widest text-white/40 mb-1">{k}</p>
                  <p className="font-headline font-bold text-xs text-white">{v}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm font-label">{selected.status === "EMPTY" ? "비어있습니다." : "점검 중입니다."}</p>
          )}
        </div>
      )}
    </div>
  );
}
