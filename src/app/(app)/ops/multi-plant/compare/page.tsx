"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key: "plant",    label: "Plant" },
  { key: "name",     label: "공장명" },
  { key: "oee",      label: "OEE" },
  { key: "avail",    label: "가용성" },
  { key: "perf",     label: "성능" },
  { key: "qual",     label: "품질" },
  { key: "defect",   label: "불량률" },
  { key: "progress", label: "진척률" },
  { key: "eq",       label: "가동설비" },
  { key: "status",   label: "상태" },
];

const DATA = [
  { plant: "P1000", name: "제1공장", oee: "82.1%", avail: "94%", perf: "91%", qual: "96%", defect: "1.2%", progress: "88%", eq: "14/16", status: "정상" },
  { plant: "P2000", name: "제2공장", oee: "74.5%", avail: "88%", perf: "85%", qual: "99%", defect: "2.1%", progress: "75%", eq: "10/14", status: "주의" },
  { plant: "P3000", name: "제3공장", oee: "78.4%", avail: "92%", perf: "88%", qual: "98%", defect: "1.8%", progress: "92%", eq: "12/15", status: "정상" },
  { plant: "P4000", name: "제4공장", oee: "68.0%", avail: "82%", perf: "78%", qual: "94%", defect: "3.5%", progress: "61%", eq: "9/12",  status: "위험" },
];

const CHART_ITEMS = ["P1000","P2000","P3000","P4000"];
const OEE_VALUES  = [82.1, 74.5, 78.4, 68.0];

export default function MultiPlantComparePage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="Plant 비교" accent="SCR-OPS-030" nodeRef="FNC-OPS-040~042,044" description="Plant 간 KPI 비교 막대 · 60초 갱신" />

      {/* OEE 비교 막대 차트 (텍스트 시각화) */}
      <div className="bg-surface-container p-5 mb-5">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">OEE 비교</p>
        {CHART_ITEMS.map((p, i) => (
          <div key={p} className="mb-3">
            <div className="flex justify-between text-xs font-label mb-1">
              <span className="text-on-surface-variant w-16">{p}</span>
              <span className="tabular-nums font-bold">{OEE_VALUES[i]}%</span>
            </div>
            <div className="h-5 bg-surface-container-highest/30">
              <div
                className={`h-5 ${OEE_VALUES[i]>=80?"bg-primary-accent":OEE_VALUES[i]>=70?"bg-[#f59e0b]":"bg-error"}`}
                style={{width:`${OEE_VALUES[i]}%`}}
              />
            </div>
          </div>
        ))}
      </div>

      <DataTable title="Plant KPI 비교 DataTable" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
