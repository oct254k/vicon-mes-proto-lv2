"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const POOL_COLS = [
  { key: "offcutId", label: "Offcut ID" },
  { key: "material", label: "원자재" },
  { key: "origLot",  label: "원 Lot" },
  { key: "length",   label: "길이(m)" },
  { key: "width",    label: "폭(mm)" },
  { key: "location", label: "위치" },
  { key: "status",   label: "상태" },
  { key: "date",     label: "등록일" },
];

const POOL_DATA = [
  { offcutId:"OFC-20260505-007", material:"M-COIL-A P3000 900m", origLot:"RCV-20260501-0017", length:"50",  width:"1200", location:"Y-P3000-A-01-03", status:"가용",  date:"2026-05-05" },
  { offcutId:"OFC-20260503-006", material:"M-COIL-B",            origLot:"RCV-20260503-0011", length:"30",  width:"900",  location:"Y-P3000-A-02-03", status:"가용",  date:"2026-05-03" },
  { offcutId:"OFC-20260501-005", material:"M-PLATE-01",          origLot:"RCV-20260430-0033", length:"0.5", width:"1800", location:"W-01-02",         status:"소비됨", date:"2026-05-01" },
];

const inputCls = "w-full bg-surface border border-outline/20 px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]";
const labelCls = "block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2";

export default function ScrapOffcutPage() {
  const [origLot, setOrigLot] = useState("RCV-20260501-0017");
  const [length,  setLength]  = useState("");
  const [width,   setWidth]   = useState("");
  const [loc,     setLoc]     = useState("Y-P3000-A-01-03");
  const [saved,   setSaved]   = useState(false);

  return (
    <div>
      <PageHeader
        title="자투리 등록"
        accent="잔재"
        nodeRef="SCR-LOC-042"
        status="PROTOTYPE"
        description="Offcut Pool — 가공 후 남은 자투리 자재 등록 및 재사용 가용 현황 관리."
      />

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <FieldHeader title="자투리 등록 폼" moduleRef="FNC-LOC-072" />
          <div><label className={labelCls}>원 Lot No</label><input value={origLot} onChange={e=>setOrigLot(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>자투리 길이 (m)</label><input type="number" value={length} onChange={e=>setLength(e.target.value)} className={inputCls} placeholder="50" /></div>
          <div><label className={labelCls}>폭 (mm)</label><input type="number" value={width} onChange={e=>setWidth(e.target.value)} className={inputCls} placeholder="1200" /></div>
          <div><label className={labelCls}>보관 위치</label><input value={loc} onChange={e=>setLoc(e.target.value)} className={inputCls} /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setSaved(true)} disabled={!length || !width}
              className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90 disabled:opacity-30">
              등록 ▶
            </button>
            {saved && <span className="self-center text-[#00912F] text-xs font-label uppercase tracking-widest">OFC 생성됨</span>}
          </div>
        </div>

        <div>
          <FieldHeader title="Offcut Pool 현황" moduleRef="FNC-LOC-071" />
          <div className="flex gap-4 mb-4">
            <div className="bg-surface-elevated border-l-4 border-[#00912F] px-4 py-3 flex-1">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">가용 자투리</p>
              <p className="text-2xl font-black text-on-surface">2건</p>
            </div>
            <div className="bg-surface-elevated border-l-4 border-outline/30 px-4 py-3 flex-1">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">소비됨</p>
              <p className="text-2xl font-black text-on-surface">1건</p>
            </div>
          </div>
        </div>
      </div>

      <FieldHeader title="Offcut Pool 목록" moduleRef="FNC-LOC-072" />
      <DataTable title="자투리 목록" columns={POOL_COLS} data={POOL_DATA} bufferCount={POOL_DATA.length} />
    </div>
  );
}
