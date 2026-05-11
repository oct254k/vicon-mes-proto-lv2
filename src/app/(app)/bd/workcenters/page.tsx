"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const WCS = [
  { id: "WC-DK-01", name: "데크 1번기",  processLine: "PL-DECK",  plant: "P3000", eqCount: 3, machineType: "AUTO",   status: "Active" },
  { id: "WC-DK-02", name: "데크 2번기",  processLine: "PL-DECK",  plant: "P3000", eqCount: 3, machineType: "AUTO",   status: "Active" },
  { id: "WC-FM-03", name: "포밍 3호기",  processLine: "PL-FORM",  plant: "P3000", eqCount: 2, machineType: "AUTO",   status: "Active" },
  { id: "WC-AS-01", name: "조립 1조",    processLine: "PL-ASSY",  plant: "P3000", eqCount: 5, machineType: "MANUAL", status: "Active" },
  { id: "WC-TG-01", name: "TG 전용기",   processLine: "PL-TG",    plant: "P3000", eqCount: 1, machineType: "AUTO",   status: "Active" },
];

const statusMap: Record<string, { type: "running" | "idle" | "stopped" | "warning" }> = {
  Active:   { type: "running" },
  Inactive: { type: "idle" },
};

export default function BDWorkcentersPage() {
  const [filterPlant, setFilterPlant] = useState("전체");
  const [filterLine, setFilterLine]   = useState("전체");

  const filtered = WCS.filter((w) => {
    const matchPlant = filterPlant === "전체" || w.plant === filterPlant;
    const matchLine  = filterLine  === "전체" || w.processLine === filterLine;
    return matchPlant && matchLine;
  });

  const columns = [
    { key: "id",          label: "WC 코드" },
    { key: "name",        label: "이름" },
    { key: "processLine", label: "공정라인" },
    { key: "plant",       label: "Plant" },
    { key: "eqCount",     label: "설비 수" },
    { key: "machineTag",  label: "기계 유형" },
    { key: "statusBadge", label: "상태" },
    { key: "action",      label: "액션" },
  ];

  const data = filtered.map((w) => ({
    ...w,
    machineTag: (
      <span className={`text-xs font-label uppercase tracking-wider px-2 py-0.5 ${
        w.machineType === "AUTO"
          ? "bg-primary-accent/20 text-primary-accent"
          : "bg-surface-container-highest text-on-surface/60"
      }`}>
        {w.machineType}
      </span>
    ) as unknown as string,
    statusBadge: (
      <StatusBadge type={statusMap[w.status].type} label={w.status} />
    ) as unknown as string,
    action: (
      <div className="flex gap-1">
        <button className="text-xs font-label uppercase tracking-widest px-2 py-0.5 bg-surface-container text-on-surface/60 hover:text-primary-accent transition-colors">
          수정
        </button>
        <a
          href="/bd/workcenters/calendar"
          className="text-xs font-label uppercase tracking-widest px-2 py-0.5 bg-surface-container text-on-surface/60 hover:text-primary-accent transition-colors"
        >
          캘린더
        </a>
      </div>
    ) as unknown as string,
  }));

  return (
    <div>
      <PageHeader
        title="Work Center"
        accent="마스터"
        nodeRef="SCR-BD-050"
        status="PROTOTYPE"
        description="공정라인별 Work Center 등록 및 machine_type 매핑 (FNC-BD-050/052)"
      />

      {/* 필터 */}
      <div className="bg-surface-container p-4 flex flex-wrap gap-4 items-end mb-4">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface/50">Plant</label>
          <select
            value={filterPlant}
            onChange={(e) => setFilterPlant(e.target.value)}
            className="bg-surface-container-high border border-outline-variant/30 text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary-accent"
          >
            {["전체", "P1000", "P2000", "P3000"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface/50">공정라인</label>
          <select
            value={filterLine}
            onChange={(e) => setFilterLine(e.target.value)}
            className="bg-surface-container-high border border-outline-variant/30 text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary-accent"
          >
            {["전체", "PL-DECK", "PL-FORM", "PL-ASSY", "PL-TG", "PL-CUT", "PL-PACK"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest hover:bg-primary-accent/80 transition-colors">
            + 신규
          </button>
          <a
            href="/bd/workcenters/calendar"
            className="px-4 py-1.5 border border-outline-variant/30 text-on-surface/60 text-xs font-label uppercase tracking-widest hover:border-primary-accent hover:text-primary-accent transition-colors"
          >
            캘린더
          </a>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "전체 WC", value: WCS.length },
          { label: "AUTO 유형",   value: WCS.filter((w) => w.machineType === "AUTO").length },
          { label: "MANUAL 유형", value: WCS.filter((w) => w.machineType === "MANUAL").length },
          { label: "총 설비 수",  value: WCS.reduce((s, w) => s + w.eqCount, 0) },
        ].map((c) => (
          <div key={c.label} className="bg-surface-container-low p-4">
            <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">{c.label}</p>
            <p className="font-headline font-bold text-2xl text-primary-accent">{c.value}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="Work Center 목록" moduleRef={`${filtered.length}건`} />
      <DataTable
        title="WC 마스터"
        columns={columns}
        data={data}
        bufferCount={filtered.length}
      />

    </div>
  );
}
