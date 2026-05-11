"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const BOMS = [
  { bomId: "BOM-DECK-C", itemId: "M-DECK-C형", version: "v3", effectiveFrom: "2026-04-01", effectiveTo: "-", status: "Effective" },
  { bomId: "BOM-DECK-C", itemId: "M-DECK-C형", version: "v2", effectiveFrom: "2025-10-01", effectiveTo: "2026-03-31", status: "Expired" },
  { bomId: "BOM-DECK-S", itemId: "M-DECK-S형", version: "v2", effectiveFrom: "2026-03-15", effectiveTo: "-", status: "Effective" },
  { bomId: "BOM-DECK-S", itemId: "M-DECK-S형", version: "v1", effectiveFrom: "2025-06-01", effectiveTo: "2026-03-14", status: "Expired" },
  { bomId: "BOM-SLAB-01", itemId: "M-SLAB", version: "v1", effectiveFrom: "2026-05-04", effectiveTo: "-", status: "Draft" },
];

const statusMap: Record<string, { type: "running" | "idle" | "warning"; label: string }> = {
  Effective: { type: "running", label: "유효" },
  Expired: { type: "idle", label: "만료" },
  Draft: { type: "warning", label: "초안" },
};

export default function BDBomPage() {
  const [filterStatus, setFilterStatus] = useState("전체");
  const [filterItem, setFilterItem] = useState("전체");

  const filtered = BOMS.filter((b) => {
    const matchStatus = filterStatus === "전체" || b.status === filterStatus;
    const matchItem = filterItem === "전체" || b.itemId === filterItem;
    return matchStatus && matchItem;
  });

  const columns = [
    { key: "bomId", label: "BOM ID" },
    { key: "itemId", label: "품목" },
    { key: "version", label: "버전" },
    { key: "effectiveFrom", label: "발효일" },
    { key: "effectiveTo", label: "만료일" },
    { key: "statusBadge", label: "상태" },
    { key: "action", label: "액션" },
  ];

  const tableData = filtered.map((b) => ({
    ...b,
    statusBadge: (
      <StatusBadge type={statusMap[b.status].type} label={statusMap[b.status].label} />
    ) as unknown as string,
    action: b.status === "Draft" ? (
      <button className="text-xs font-label uppercase tracking-widest px-2 py-1 bg-primary-accent/20 text-primary-accent hover:bg-primary-accent hover:text-white transition-colors">
        발행
      </button>
    ) as unknown as string : (
      <a
        href={`/bd/bom/${b.bomId}`}
        className="text-xs font-label uppercase tracking-widest text-on-surface/50 hover:text-primary-accent transition-colors"
      >
        펼침 →
      </a>
    ) as unknown as string,
  }));

  return (
    <div>
      <PageHeader
        title="BOM"
        accent="마스터"
        nodeRef="SCR-BD-020"
        status="PROTOTYPE"
        description="다단계 BOM 버전 관리 — Effective / Draft / Expired 상태 흐름"
      />

      {/* 필터 */}
      <div className="bg-surface-container p-4 flex flex-wrap gap-4 items-end mb-4">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface/50">품목</label>
          <select
            value={filterItem}
            onChange={(e) => setFilterItem(e.target.value)}
            className="bg-surface-container-high border border-outline-variant/30 text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary-accent"
          >
            {["전체", "M-DECK-C형", "M-DECK-S형", "M-SLAB"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface/50">상태</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-container-high border border-outline-variant/30 text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary-accent"
          >
            <option value="전체">전체</option>
            <option value="Draft">초안</option>
            <option value="Effective">유효</option>
            <option value="Expired">만료</option>
          </select>
        </div>
        <div className="flex gap-2 ml-auto">
          <a
            href="/bd/bom/new"
            className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest hover:bg-primary-accent/80 transition-colors"
          >
            + 신 버전
          </a>
        </div>
      </div>

      <FieldHeader title="BOM 목록" moduleRef={`${filtered.length}건`} />
      <DataTable title="BOM 버전 트리" columns={columns} data={tableData} bufferCount={filtered.length} />

    </div>
  );
}
