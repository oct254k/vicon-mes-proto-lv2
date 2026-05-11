"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const PLANTS  = ["P1000", "P2000", "P3000", "P4000"];
const MATS    = ["H형강 200×100", "H형강 300×150", "강판 t6", "강판 t9", "앵커볼트 M20"];

// 매트릭스 데이터 (Plant × Material)
const MATRIX: Record<string, Record<string, number>> = {
  "H형강 200×100": { P1000: 1200, P2000: 850,  P3000: 2100, P4000: 300 },
  "H형강 300×150": { P1000: 0,    P2000: 600,  P3000: 900,  P4000: 100 },
  "강판 t6":        { P1000: 450,  P2000: 0,    P3000: 680,  P4000: 220 },
  "강판 t9":        { P1000: 320,  P2000: 410,  P3000: 0,    P4000: 150 },
  "앵커볼트 M20":   { P1000: 5000, P2000: 3200, P3000: 4100, P4000: 800 },
};

const COLS = [
  { key: "mat",   label: "자재" },
  { key: "P1000", label: "P1000" },
  { key: "P2000", label: "P2000" },
  { key: "P3000", label: "P3000" },
  { key: "P4000", label: "P4000" },
  { key: "total", label: "합계" },
  { key: "short", label: "부족" },
];

const DATA = MATS.map(m => {
  const row = MATRIX[m];
  const total = PLANTS.reduce((s, p) => s + (row[p] ?? 0), 0);
  const short = Object.values(row).filter(v => v === 0).length;
  return {
    mat: m,
    P1000: `${row.P1000}`,
    P2000: `${row.P2000}`,
    P3000: `${row.P3000}`,
    P4000: `${row.P4000}`,
    total: `${total}`,
    short: short > 0 ? `${short}개소` : "-",
  };
});

const KPI = [
  { label: "총 자재 종류", value: `${MATS.length}종` },
  { label: "재고 부족",    value: "4건", color: "text-error" },
  { label: "총 재고",      value: "20,330", color: "text-primary-accent" },
];

export default function InventoryMatrixPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="재고 매트릭스" nodeRef="FNC-OPS-080,081,083" description="Plant × Material 재고 종합 · 5분 갱신" />

      <div className="grid grid-cols-3 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color ?? "text-on-surface"}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <a href="/ops/inventory/yard"       className="bg-surface-container px-4 py-2 text-xs font-label hover:border hover:border-primary-accent/40">야적장 현황</a>
        <a href="/ops/inventory/scrap-pool" className="bg-surface-container px-4 py-2 text-xs font-label hover:border hover:border-primary-accent/40">SCRAP Pool</a>
      </div>

      <DataTable title="재고 매트릭스 (Plant × Material)" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
