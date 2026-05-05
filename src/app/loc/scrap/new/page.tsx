"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const inputCls = "w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]";
const labelCls = "block text-xs font-label uppercase tracking-widest text-white/50 mb-2";
const REASONS  = ["표면 결함", "치수 불량", "녹 발생", "가공 불량", "기타"];
const TYPES    = ["SCRAP", "OFFCUT"];

export default function ScrapNewPage() {
  const [type,     setType]     = useState("SCRAP");
  const [material, setMaterial] = useState("M-COIL-A P3000 900m");
  const [lot,      setLot]      = useState("RCV-20260501-0017");
  const [qty,      setQty]      = useState("");
  const [reason,   setReason]   = useState("");
  const [location, setLocation] = useState("Y-P3000-A-01-03");
  const [note,     setNote]     = useState("");
  const [done,     setDone]     = useState(false);

  return (
    <div>
      <PageHeader
        title="SCRAP 등록"
        accent="SCRAP-NEW"
        nodeRef="SCR-LOC-042"
        status="PROTOTYPE"
        description="신규 SCRAP 등록 폼. 유형(SCRAP/OFFCUT), 사유, 대상 자재·Lot, 수량 입력 후 확정."
      />

      {done ? (
        <div className="bg-[#00912F]/20 border-l-4 border-[#00912F] p-6 max-w-lg">
          <p className="font-label font-bold uppercase tracking-widest text-[#00912F] mb-1">SCRAP 등록 완료</p>
          <p className="text-sm text-white/60">SCR-{new Date().toISOString().slice(0,10).replace(/-/g,"")}-XXX 생성됨</p>
          <button onClick={() => setDone(false)} className="mt-4 border border-white/20 text-white/60 font-label uppercase text-xs px-4 py-2">새 등록</button>
        </div>
      ) : (
        <div className="max-w-lg space-y-5">
          <FieldHeader title="A. 유형 선택" moduleRef="FNC-LOC-070" />
          <div className="flex gap-3">
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-5 py-2 text-xs font-label uppercase tracking-widest border transition-colors ${
                  type === t ? "border-[#00912F] bg-[#00912F]/20 text-[#00912F]" : "border-white/10 text-white/50 hover:border-white/30"}`}>
                {t}
              </button>
            ))}
          </div>

          <FieldHeader title="B. 불량 사유" moduleRef="FNC-LOC-073" />
          <div className="flex flex-wrap gap-2">
            {REASONS.map(r => (
              <button key={r} onClick={() => setReason(r)}
                className={`px-4 py-1.5 text-xs font-label uppercase tracking-widest border transition-colors ${
                  reason === r ? "border-[#ef4444] bg-[#ef4444]/20 text-[#ef4444]" : "border-white/10 text-white/40 hover:border-white/30"}`}>
                {r}
              </button>
            ))}
          </div>

          <FieldHeader title="C. 대상 자재" moduleRef="FNC-LOC-071" />
          <div><label className={labelCls}>자재</label><input value={material} onChange={e=>setMaterial(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Lot No</label><input value={lot} onChange={e=>setLot(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>수량 (m / kg / EA)</label><input value={qty} onChange={e=>setQty(e.target.value)} className={inputCls} placeholder="50" /></div>
          <div><label className={labelCls}>위치</label><input value={location} onChange={e=>setLocation(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>비고</label><input value={note} onChange={e=>setNote(e.target.value)} className={inputCls} placeholder="추가 설명" /></div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setDone(true)} disabled={!reason || !qty}
              className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90 disabled:opacity-30">
              등록 확정 ▶
            </button>
            <button className="bg-[#1a1a1a] border border-white/10 text-white/50 font-label uppercase tracking-widest px-6 py-3 text-sm">취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
