"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key: "id",       label: "SCRAP ID" },
  { key: "matType",  label: "자재 유형" },
  { key: "size",     label: "규격" },
  { key: "length",   label: "잔여 길이" },
  { key: "weight",   label: "중량(kg)" },
  { key: "plant",    label: "발생 공장" },
  { key: "wc",       label: "발생 WC" },
  { key: "woId",     label: "출처 WO" },
  { key: "usable",   label: "재활용 가능" },
  { key: "createdAt",label: "발생일" },
];

const DATA = [
  { id: "SCP-0001", matType: "H형강", size: "200×100", length: "850mm",  weight: "12.4", plant: "P3000", wc: "L01", woId: "WO-20260505-0012", usable: "가능",   createdAt: "2026-05-05" },
  { id: "SCP-0002", matType: "강판",  size: "t6",      length: "1200mm", weight: "45.2", plant: "P3000", wc: "L01", woId: "WO-20260505-0012", usable: "가능",   createdAt: "2026-05-05" },
  { id: "SCP-0003", matType: "H형강", size: "300×150", length: "300mm",  weight: "8.1",  plant: "P1000", wc: "L03", woId: "WO-20260504-0020", usable: "불가",   createdAt: "2026-05-04" },
  { id: "SCP-0004", matType: "강판",  size: "t9",      length: "500mm",  weight: "17.7", plant: "P2000", wc: "L02", woId: "WO-20260503-0015", usable: "가능",   createdAt: "2026-05-03" },
  { id: "SCP-0005", matType: "H형강", size: "200×100", length: "200mm",  weight: "2.9",  plant: "P3000", wc: "L01", woId: "WO-20260502-0008", usable: "불가",   createdAt: "2026-05-02" },
];

const KPI = [
  { label: "총 SCRAP",    value: `${DATA.length}건` },
  { label: "재활용 가능", value: `${DATA.filter(d=>d.usable==="가능").length}건`, color: "text-primary-accent" },
  { label: "재활용 불가", value: `${DATA.filter(d=>d.usable==="불가").length}건`, color: "text-error" },
  { label: "총 중량",     value: `${DATA.reduce((s,d)=>s+parseFloat(d.weight),0).toFixed(1)}kg` },
];

export default function InventoryScrapPoolPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="SCRAP Pool" nodeRef="FNC-OPS-084" description="자투리 풀 가시화 · 5분 갱신" />

      <div className="grid grid-cols-4 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color ?? "text-on-surface"}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <DataTable title="SCRAP Pool DataTable" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
