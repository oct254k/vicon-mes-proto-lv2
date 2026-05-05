"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { PROCESS_LINES, PLANTS } from "@/data/plants";

// 공정라인의 각 단계(step) = Work Center 1개 (물리적 작업 스테이션)
const WORKCENTERS = PROCESS_LINES.flatMap((line) => {
  const plant = PLANTS.find((p) => p.code === line.plantCode);
  return line.steps.map((step) => ({
    code:      `${line.lineCode}-WC${String(step.seq).padStart(2, "0")}`,
    name:      step.name,
    line:      line.lineName,
    lineCode:  line.lineCode,
    plant:     line.plantCode,
    plantName: plant?.shortName ?? "",
    ops:       step.operations.join(" / "),
    status:    "Active",
  }));
});

const PLANT_OPTIONS = ["전체", ...Array.from(new Set(PROCESS_LINES.map((l) => l.plantCode)))];

const COLUMNS = [
  { key: "code",      label: "WC 코드" },
  { key: "name",      label: "작업 스테이션" },
  { key: "line",      label: "소속 공정라인" },
  { key: "plant",     label: "Plant" },
  { key: "plantName", label: "공장" },
  { key: "ops",       label: "주요 작업" },
  { key: "status",    label: "상태" },
];

export default function WorkcenterListPage() {
  const [plantFilter, setPlantFilter] = useState("전체");

  const filtered = plantFilter === "전체"
    ? WORKCENTERS
    : WORKCENTERS.filter((w) => w.plant === plantFilter);

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="WC 목록"
        nodeRef="SCR-BD-050"
        description="공정라인 내 Work Center(작업 스테이션) 마스터 — Plant → 공정라인 → WC"
      />
      <FieldHeader title="Work Center 마스터" moduleRef="BD-WORKCENTER" />

      {/* 계층 설명 */}
      <div className="bg-surface-container border-l-4 border-primary-accent/50 p-4 mb-6 text-xs font-label text-on-surface/50 uppercase tracking-wider">
        계층: Plant → 공정라인 → <span className="text-primary-accent">Work Center</span> → Equipment
      </div>

      {/* Plant 필터 */}
      <div className="flex gap-3 mb-4">
        <select
          value={plantFilter}
          onChange={(e) => setPlantFilter(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
        >
          {PLANT_OPTIONS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">
          {filtered.length}개 WC
        </span>
      </div>

      <DataTable
        title="WC 목록"
        columns={COLUMNS}
        data={filtered}
        bufferCount={filtered.length}
      />
    </div>
  );
}
