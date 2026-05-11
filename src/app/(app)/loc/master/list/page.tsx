"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLUMNS = [
  { key: "locId",   label: "위치 ID" },
  { key: "plant",   label: "Plant" },
  { key: "yard",    label: "Yard" },
  { key: "zone",    label: "Zone" },
  { key: "status",  label: "Status" },
  { key: "loadPct", label: "점유율" },
  { key: "cap",     label: "Capacity(m)" },
];

const DATA = [
  { locId: "Y-P3000-A-01-01", plant: "P3000", yard: "Y-RAW", zone: "A-01", status: "ACTIVE",      loadPct: "0%",   cap: "5,000" },
  { locId: "Y-P3000-A-01-02", plant: "P3000", yard: "Y-RAW", zone: "A-01", status: "ACTIVE",      loadPct: "60%",  cap: "5,000" },
  { locId: "Y-P3000-A-01-03", plant: "P3000", yard: "Y-RAW", zone: "A-01", status: "FULL",        loadPct: "100%", cap: "5,000" },
  { locId: "Y-P3000-A-02-01", plant: "P3000", yard: "Y-RAW", zone: "A-02", status: "MAINTENANCE", loadPct: "—",    cap: "5,000" },
  { locId: "Y-P3000-B-01-01", plant: "P3000", yard: "Y-IN",  zone: "B-01", status: "ACTIVE",      loadPct: "40%",  cap: "3,000" },
  { locId: "Y-P1000-A-01-01", plant: "P1000", yard: "Y-RAW", zone: "A-01", status: "ACTIVE",      loadPct: "20%",  cap: "4,000" },
];

const STATUS_FILTER = ["전체", "ACTIVE", "FULL", "MAINTENANCE", "RETIRED"];
const YARD_FILTER   = ["전체", "Y-RAW", "Y-IN", "Y-WIP", "Y-OUT"];

export default function LocMasterListPage() {
  const [q,      setQ]      = useState("");
  const [status, setStatus] = useState("전체");
  const [yard,   setYard]   = useState("전체");

  const filtered = DATA.filter(r =>
    (status === "전체" || r.status === status) &&
    (yard   === "전체" || r.yard   === yard) &&
    (r.locId.includes(q) || q === "")
  );

  const selCls = "bg-[#131313] border border-white/10 px-3 py-2 text-xs font-label text-white focus:outline-none focus:border-[#00912F]";

  return (
    <div>
      <PageHeader
        title="위치 마스터 목록"
        nodeRef="SCR-LOC-001"
        status="PROTOTYPE"
        description="Plant→Yard→Zone→Lot 4단계 위치 마스터 검색·조회. 행 선택 후 상세·상태 변경 가능."
      />

      <FieldHeader title="검색 필터" moduleRef="FNC-LOC-005" />
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={q} onChange={e => setQ(e.target.value)}
          className={selCls + " w-56"} placeholder="위치 ID 검색"
        />
        <select className={selCls} value={status} onChange={e => setStatus(e.target.value)}>
          {STATUS_FILTER.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className={selCls} value={yard} onChange={e => setYard(e.target.value)}>
          {YARD_FILTER.map(y => <option key={y}>{y}</option>)}
        </select>
        <div className="ml-auto flex gap-2">
          <StatusBadge type="warning" label={`FULL ${DATA.filter(d=>d.status==="FULL").length}`} />
          <StatusBadge type="stopped" label={`MAINT ${DATA.filter(d=>d.status==="MAINTENANCE").length}`} />
        </div>
      </div>

      <DataTable title="위치 목록" columns={COLUMNS} data={filtered} bufferCount={filtered.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [신규 등록 ▶]
        </button>
        <button className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-white/30">
          [상태 변경]
        </button>
        <button className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-white/30">
          [엑셀 다운]
        </button>
      </div>
    </div>
  );
}
