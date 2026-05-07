"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const ZONES = [
  { zone: "A-01", type: "H형강",   qty: 24, capacity: 30, pct: 80, status: "정상" },
  { zone: "A-02", type: "H형강",   qty: 30, capacity: 30, pct: 100, status: "만재" },
  { zone: "B-01", type: "강판",    qty: 12, capacity: 20, pct: 60, status: "정상" },
  { zone: "B-02", type: "강판",    qty: 0,  capacity: 20, pct: 0,  status: "공석" },
  { zone: "C-01", type: "앵커볼트", qty: 18, capacity: 25, pct: 72, status: "정상" },
  { zone: "C-02", type: "기타",    qty: 22, capacity: 25, pct: 88, status: "주의" },
];

const COLS = [
  { key: "zone",     label: "구역" },
  { key: "type",     label: "자재 유형" },
  { key: "qty",      label: "현재 수량" },
  { key: "capacity", label: "용량" },
  { key: "pct",      label: "점유율" },
  { key: "status",   label: "상태" },
];

const STATUS_COLOR: Record<string, string> = { 정상: "text-primary-accent", 만재: "text-error", 주의: "text-[#f59e0b]", 공석: "text-on-surface-variant" };

const KPI = [
  { label: "전체 구역",  value: `${ZONES.length}개` },
  { label: "평균 점유율", value: `${Math.round(ZONES.reduce((s,z)=>s+z.pct,0)/ZONES.length)}%`, color: "text-primary-accent" },
  { label: "만재 구역",  value: `${ZONES.filter(z=>z.status==="만재").length}개`, color: "text-error" },
];

export default function InventoryYardPage() {
  const data = ZONES.map(z => ({ ...z, qty: `${z.qty}`, capacity: `${z.capacity}`, pct: `${z.pct}%` }));

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="야적장 현황" accent="SCR-OPS-071" nodeRef="FNC-OPS-082" description="야적장 점유율 통합 표시 · 5분 갱신" />

      <div className="grid grid-cols-3 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color ?? "text-on-surface"}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* 야적장 점유율 시각화 */}
      <div className="bg-surface-container p-5 mb-5">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">구역별 점유율</p>
        <div className="grid grid-cols-3 gap-3">
          {ZONES.map(z => (
            <div key={z.zone} className="bg-surface p-3">
              <div className="flex justify-between text-xs font-label mb-1">
                <span className="font-bold">{z.zone}</span>
                <span className={STATUS_COLOR[z.status]}>{z.status}</span>
              </div>
              <p className="text-xs font-label text-on-surface-variant mb-2">{z.type}</p>
              <div className="h-4 bg-surface-container-highest/30">
                <div className={`h-4 ${z.pct>=90?"bg-error":z.pct>=70?"bg-[#f59e0b]":"bg-primary-accent"}`} style={{width:`${z.pct}%`}} />
              </div>
              <p className="text-xs font-label text-on-surface-variant mt-1">{z.qty}/{z.capacity} ({z.pct}%)</p>
            </div>
          ))}
        </div>
      </div>

      <DataTable title="야적장 구역별 DataTable" bufferCount={data.length} columns={COLS} data={data} />
    </div>
  );
}
