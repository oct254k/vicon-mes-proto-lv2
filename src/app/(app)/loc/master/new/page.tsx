"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const inputCls = "w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]";
const labelCls = "block text-xs font-label uppercase tracking-widest text-white/50 mb-2";

type Mode = "PLANT_YARD" | "ZONE" | "LOT_BULK";

export default function LocMasterNewPage() {
  const [mode, setMode] = useState<Mode>("LOT_BULK");
  const [plant, setPlant]   = useState("P3000");
  const [yard,  setYard]    = useState("Y-RAW");
  const [zone,  setZone]    = useState("");
  const [rows,  setRows]    = useState("5");
  const [cols,  setCols]    = useState("6");
  const [cap,   setCap]     = useState("5000");
  const [saved, setSaved]   = useState(false);

  const modeBtn = (m: Mode, label: string) => (
    <button
      onClick={() => setMode(m)}
      className={`px-5 py-2 text-xs font-label uppercase tracking-widest transition-colors ${
        mode === m ? "bg-[#00912F] text-black" : "bg-[#1a1a1a] border border-white/10 text-white/50 hover:border-white/30"
      }`}
    >
      {label}
    </button>
  );

  const lotCount = mode === "LOT_BULK" ? Number(rows) * Number(cols) : 0;
  const previewIds = mode === "LOT_BULK"
    ? Array.from({ length: Math.min(4, lotCount) }, (_, i) =>
        `Y-${plant}-${zone||"A"}-${String(Math.floor(i/Number(cols))+1).padStart(2,"0")}-${String((i%Number(cols))+1).padStart(2,"0")}`)
    : [];

  return (
    <div>
      <PageHeader
        title="위치 등록"
        accent="LOC-002~004"
        nodeRef="SCR-LOC-002"
        status="PROTOTYPE"
        description="Plant·Yard 신규 등록 / Zone 등록 / Lot 일괄 등록(N×M 격자 자동생성)."
      />

      <div className="flex gap-2 mb-8">{modeBtn("PLANT_YARD","Plant·Yard")}{modeBtn("ZONE","Zone")}{modeBtn("LOT_BULK","Lot 일괄")}</div>

      <div className="max-w-lg space-y-5">
        <FieldHeader title={mode === "PLANT_YARD" ? "A. Plant · Yard 정보" : mode === "ZONE" ? "A. Zone 정보" : "A. 일괄 등록 설정"} moduleRef="FNC-LOC-002" />

        <div>
          <label className={labelCls}>Plant</label>
          <select value={plant} onChange={e=>setPlant(e.target.value)} className={inputCls}>
            {["P1000","P2000","P3000"].map(p=><option key={p}>{p}</option>)}
          </select>
        </div>

        {(mode === "ZONE" || mode === "LOT_BULK") && (
          <div>
            <label className={labelCls}>Yard</label>
            <select value={yard} onChange={e=>setYard(e.target.value)} className={inputCls}>
              {["Y-RAW","Y-IN","Y-WIP","Y-OUT","Y-DEFECT"].map(y=><option key={y}>{y}</option>)}
            </select>
          </div>
        )}

        {mode === "LOT_BULK" && (
          <>
            <div>
              <label className={labelCls}>Zone 코드 (예: A, B)</label>
              <input value={zone} onChange={e=>setZone(e.target.value)} className={inputCls} placeholder="A" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>행 수 (Rows)</label><input type="number" value={rows} onChange={e=>setRows(e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>열 수 (Cols)</label><input type="number" value={cols} onChange={e=>setCols(e.target.value)} className={inputCls} /></div>
            </div>
            <div>
              <label className={labelCls}>기본 Capacity (m/kg)</label>
              <input type="number" value={cap} onChange={e=>setCap(e.target.value)} className={inputCls} />
            </div>
            <div className="bg-[#1a1a1a] p-4 border-l-2 border-[#00912F]/40 text-xs font-label">
              <p className="uppercase tracking-widest text-white/40 mb-2">자동생성 미리보기 ({lotCount}개)</p>
              {previewIds.map(id=><p key={id} className="text-[#00912F] py-0.5">{id}</p>)}
              {lotCount > 4 && <p className="text-white/30">... +{lotCount-4}개</p>}
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <button onClick={()=>setSaved(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
            등록 확정 ▶
          </button>
          <button className="bg-[#1a1a1a] border border-white/10 text-white/50 font-label uppercase tracking-widest px-6 py-3 text-sm hover:border-white/30">
            취소
          </button>
        </div>
        {saved && <p className="text-[#00912F] text-xs font-label uppercase tracking-widest">등록 완료 — {lotCount}개 위치 생성됨</p>}
      </div>
    </div>
  );
}
