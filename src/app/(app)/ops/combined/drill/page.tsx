"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key: "eq",      label: "설비/WC" },
  { key: "wc",      label: "WC" },
  { key: "oee",     label: "OEE" },
  { key: "avail",   label: "가용성" },
  { key: "perf",    label: "성능" },
  { key: "qual",    label: "품질" },
  { key: "defect",  label: "불량률" },
  { key: "runtime", label: "가동시간" },
  { key: "status",  label: "상태" },
];

const DATA = [
  { eq: "EQ-L01-001", wc: "L01",  oee: "82.1%", avail: "94%", perf: "91%", qual: "96%", defect: "1.2%", runtime: "7.5h", status: "RUNNING" },
  { eq: "EQ-L01-002", wc: "L01",  oee: "78.4%", avail: "92%", perf: "88%", qual: "97%", defect: "1.5%", runtime: "7.5h", status: "RUNNING" },
  { eq: "EQ-L02-001", wc: "L02",  oee: "65.0%", avail: "80%", perf: "82%", qual: "99%", defect: "0.8%", runtime: "6.2h", status: "IDLE" },
  { eq: "EQ-L03-001", wc: "L03",  oee: "45.0%", avail: "55%", perf: "83%", qual: "98%", defect: "2.1%", runtime: "4.1h", status: "DOWN" },
  { eq: "EQ-L04-001", wc: "L04",  oee: "88.5%", avail: "96%", perf: "93%", qual: "99%", defect: "0.5%", runtime: "7.8h", status: "RUNNING" },
];

const FILTERS = ["전체", "RUNNING", "IDLE", "DOWN", "MAINTENANCE"];

export default function CombinedDrillPage() {
  const [filter, setFilter] = useState("전체");
  const filtered = DATA.filter(r => filter === "전체" || r.status === filter);

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="설비 드릴다운" nodeRef="FNC-OPS-071" description="Equipment·WC 단위 OEE 드릴다운 · 60초 갱신" />

      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-label uppercase tracking-widest transition-colors
              ${filter === f ? "bg-primary-accent text-surface" : "bg-surface-container text-on-surface-variant hover:text-on-surface"}`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs font-label text-on-surface-variant">{filtered.length}건</span>
      </div>

      <DataTable title="설비·WC 단위 OEE 드릴다운" bufferCount={filtered.length} columns={COLS} data={filtered} />
    </div>
  );
}
