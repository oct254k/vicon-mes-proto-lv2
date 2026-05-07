"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

type SlotStatus = "EMPTY" | "OCCUPIED" | "MAINTENANCE" | "DISABLED";

interface Cell { id: string; status: SlotStatus; label: string; }

const initialCells: Cell[] = Array.from({ length: 18 }, (_, i) => ({
  id: `Y-P3000-A-${String(Math.floor(i/6)+1).padStart(2,"0")}-${String((i%6)+1).padStart(2,"0")}`,
  label: `${String(Math.floor(i/6)+1).padStart(2,"0")}-${String((i%6)+1).padStart(2,"0")}`,
  status: i === 2 ? "OCCUPIED" : i === 7 ? "MAINTENANCE" : i === 13 ? "OCCUPIED" : "EMPTY",
}));

const CELL_STYLE: Record<SlotStatus, string> = {
  EMPTY:       "bg-[#1a1a1a] border-2 border-dashed border-white/10 text-white/20",
  OCCUPIED:    "bg-[#00912F]/20 border-2 border-[#00912F]/50 text-[#00912F]",
  MAINTENANCE: "bg-[#ef4444]/20 border-2 border-[#ef4444]/30 text-[#ef4444]",
  DISABLED:    "bg-[#131313] border-2 border-white/5 text-white/10 opacity-40",
};

const CYCLE: SlotStatus[] = ["EMPTY","OCCUPIED","MAINTENANCE","DISABLED"];

export default function YardMapEditPage() {
  const [cells, setCells] = useState<Cell[]>(initialCells);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(6);
  const [saved, setSaved] = useState(false);

  const toggleCell = (id: string) => {
    setCells(prev => prev.map(c => {
      if (c.id !== id) return c;
      const idx = CYCLE.indexOf(c.status);
      return { ...c, status: CYCLE[(idx + 1) % CYCLE.length] };
    }));
    setSaved(false);
  };

  return (
    <div>
      <PageHeader
        title="도면 편집"
        accent="LOC-011"
        nodeRef="SCR-LOC-011"
        status="PROTOTYPE"
        description="야적장 격자 편집 모드. 셀 클릭으로 상태 순환(EMPTY→OCCUPIED→MAINTENANCE→DISABLED). N×M 격자 크기 조정."
      />

      <FieldHeader title="격자 설정" moduleRef="FNC-LOC-020" />
      <div className="flex gap-4 mb-6 items-end">
        {[["행", rows, setRows], ["열", cols, setCols]].map(([lbl, val, fn]) => (
          <div key={String(lbl)}>
            <label className="block text-xs font-label uppercase tracking-widest text-white/40 mb-1">{String(lbl)} 수</label>
            <input type="number" value={Number(val)} onChange={e=>(fn as (n:number)=>void)(Number(e.target.value))}
              className="w-20 bg-[#131313] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
            />
          </div>
        ))}
        <p className="text-xs font-label text-white/30 pb-2">총 {rows*cols}개 위치</p>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 p-4 mb-4">
        <p className="font-label text-xs uppercase tracking-widest text-white/40 mb-3">
          셀 클릭 → 상태 순환 &nbsp;|&nbsp; <span className="text-white/20">EMPTY</span> → <span className="text-[#00912F]">OCCUPIED</span> → <span className="text-[#ef4444]">MAINT</span> → <span className="text-white/10">DISABLED</span>
        </p>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {cells.slice(0, rows * cols).map(c => (
            <button key={c.id} onClick={() => toggleCell(c.id)}
              className={`h-14 flex items-center justify-center text-[10px] font-label font-bold transition-all hover:scale-105 ${CELL_STYLE[c.status]}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setSaved(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
          도면 저장 ▶
        </button>
        <button className="bg-[#1a1a1a] border border-white/10 text-white/50 font-label uppercase tracking-widest px-6 py-3 text-sm">취소</button>
        {saved && <span className="self-center text-[#00912F] text-xs font-label uppercase tracking-widest">저장 완료</span>}
      </div>
    </div>
  );
}
