"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const ALL_HISTORY = [
  { at: "2026-05-05 08:30", changeType: "수정", field: "spec.unitWeight", before: "7.80", after: "7.85", actor: "kim.bd",    materialCode: "M-COIL-A" },
  { at: "2026-03-12 14:10", changeType: "수정", field: "spec.grade",      before: "SS275", after: "SS400", actor: "park.whs", materialCode: "M-COIL-A" },
  { at: "2026-01-08 09:00", changeType: "등록", field: "(create)",         before: "-",     after: "-",     actor: "kim.bd",    materialCode: "M-COIL-A" },
  { at: "2026-04-20 11:45", changeType: "수정", field: "name",             before: "코일 B초", after: "코일 B", actor: "park.whs", materialCode: "M-COIL-B" },
  { at: "2026-02-01 10:00", changeType: "등록", field: "(create)",         before: "-",     after: "-",     actor: "kim.bd",    materialCode: "M-COIL-B" },
  { at: "2026-05-01 09:15", changeType: "비활성화", field: "status",       before: "Active", after: "Inactive", actor: "lee.mgr", materialCode: "M-BOLT-M16" },
  { at: "2025-12-10 13:00", changeType: "등록", field: "(create)",         before: "-",     after: "-",     actor: "kim.bd",    materialCode: "M-BOLT-M16" },
];

const COLUMNS = [
  { key: "at",         label: "일시" },
  { key: "changeType", label: "변경 유형" },
  { key: "field",      label: "필드명" },
  { key: "before",     label: "이전값" },
  { key: "after",      label: "신규값" },
  { key: "actor",      label: "담당자" },
];

export default function MaterialHistoryPage() {
  const [codeFilter, setCodeFilter] = useState("M-COIL-A");
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-05-05");

  const filtered = ALL_HISTORY.filter((h) => {
    const matchCode = codeFilter === "" || h.materialCode.toLowerCase().includes(codeFilter.toLowerCase());
    const matchFrom = h.at >= fromDate;
    const matchTo = h.at.slice(0, 10) <= toDate;
    return matchCode && matchFrom && matchTo;
  });

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="Material 변경 이력"
        nodeRef="SCR-BD-012"
        description="자재 사양·속성 변경 시계열 기록 (FNC-BD-014)"
      />

      {/* 뒤로가기 링크 */}
      <a
        href="/bd/material"
        className="inline-block border border-outline-variant/30 text-on-surface/70 px-4 py-2 text-sm hover:bg-surface-container transition-colors font-label uppercase tracking-wider mb-6"
      >
        ← Material 목록
      </a>

      {/* 필터 */}
      <FieldHeader title="이력 필터" moduleRef="FNC-BD-014" />
      <div className="flex gap-3 mb-6 flex-wrap items-end">
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          Material 코드
          <input
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value)}
            placeholder="M-COIL-A"
            className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm w-48"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          기간 시작
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          기간 종료
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
          />
        </label>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-end pb-2">
          {filtered.length}건
        </span>
      </div>

      <DataTable
        title="변경 이력 (최신순)"
        columns={COLUMNS}
        data={filtered}
        bufferCount={filtered.length}
      />
    </div>
  );
}
