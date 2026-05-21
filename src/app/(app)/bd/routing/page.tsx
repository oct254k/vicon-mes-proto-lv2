"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const HEADERS = [
  { id: "RT-DECK-C-001", itemId: "M-DECK-C형", plant: "P3000", version: "v2", status: "Active", modDate: "2026-04-01" },
  { id: "RT-DECK-C-001", itemId: "M-DECK-C형", plant: "P3000", version: "v1", status: "Superseded", modDate: "2025-10-01" },
  { id: "RT-DECK-S-001", itemId: "M-DECK-S형", plant: "P3000", version: "v2", status: "Active", modDate: "2026-03-15" },
  { id: "RT-SLAB-001",   itemId: "M-SLAB",      plant: "P1000", version: "v1", status: "Draft",      modDate: "2026-05-04" },
  { id: "RT-SLAB-002",   itemId: "M-SLAB",      plant: "P2000", version: "v3", status: "Active",     modDate: "2026-02-20" },
];

const LINES = [
  { seq: 10, op: "DRAWING",   label: "신선공정",       line: "PL-DRAW",  outsource: false, conditional: false },
  { seq: 20, op: "TG",        label: "TG공정",         line: "PL-TG",    outsource: false, conditional: false },
  { seq: 30, op: "FORMING",   label: "포밍공정",       line: "PL-FORM",  outsource: false, conditional: true  },
  { seq: 40, op: "DECK",      label: "데크플레이트공정", line: "PL-DECK",  outsource: false, conditional: false },
  { seq: 50, op: "CUTTING",   label: "절단",           line: "PL-CUT",   outsource: true,  conditional: false },
  { seq: 60, op: "ASSY_WELD", label: "조립·용접",      line: "PL-ASSY",  outsource: false, conditional: false },
];

const statusMap: Record<string, { type: "running" | "idle" | "warning" | "stopped"; label: string }> = {
  Active:     { type: "running", label: "활성" },
  Draft:      { type: "warning", label: "초안" },
  Superseded: { type: "idle",    label: "대체됨" },
  Retired:    { type: "stopped", label: "폐기됨" },
};

export default function BDRoutingPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterPlant, setFilterPlant] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");

  const filtered = HEADERS.filter((h) => {
    const matchPlant = filterPlant === "전체" || h.plant === filterPlant;
    const matchStatus = filterStatus === "전체" || h.status === filterStatus;
    return matchPlant && matchStatus;
  });

  const headerColumns = [
    { key: "id", label: "Routing ID" },
    { key: "itemId", label: "품목" },
    { key: "plant", label: "Plant" },
    { key: "version", label: "버전" },
    { key: "statusBadge", label: "상태" },
    { key: "modDate", label: "수정일" },
    { key: "actions", label: "액션" },
  ];

  const headerData = filtered.map((h) => ({
    ...h,
    statusBadge: (<StatusBadge type={statusMap[h.status].type} label={statusMap[h.status].label} />) as unknown as string,
    actions: (
      <div className="flex gap-1">
        {h.status === "Draft" && (
          <button className="text-xs font-label uppercase tracking-widest px-2 py-0.5 bg-primary-accent/20 text-primary-accent hover:bg-primary-accent hover:text-white transition-colors">
            활성화
          </button>
        )}
        {h.status === "Active" && (
          <button className="text-xs font-label uppercase tracking-widest px-2 py-0.5 bg-error/20 text-error hover:bg-error hover:text-white transition-colors">
            폐기
          </button>
        )}
        <button
          onClick={() => setSelectedId(h.id)}
          className="text-xs font-label uppercase tracking-widest px-2 py-0.5 bg-surface-container text-on-surface/60 hover:text-primary-accent transition-colors"
        >
          라인
        </button>
      </div>
    ) as unknown as string,
  }));

  const lineColumns = [
    { key: "seq", label: "Seq" },
    { key: "op", label: "Operation" },
    { key: "label", label: "공정명" },
    { key: "line", label: "공정라인" },
    { key: "outsourceTag", label: "외주" },
    { key: "condTag", label: "조건부" },
  ];

  const lineData = LINES.map((l) => ({
    seq: l.seq,
    op: l.op,
    label: l.label,
    line: l.line,
    outsourceTag: l.outsource
      ? (<span className="text-xs font-label px-2 py-0.5 bg-warning/20 text-warning">협력A</span>) as unknown as string
      : "-",
    condTag: l.conditional
      ? (<span className="text-xs font-label px-2 py-0.5 bg-primary-accent/10 text-primary-accent">두께&gt;3mm</span>) as unknown as string
      : "-",
  }));

  return (
    <div>
      <PageHeader
        title="Routing"
        accent="마스터"
        nodeRef="SCR-BD-030"
        status="PROTOTYPE"
        description="공정 순서 정의 — 헤더(Plant·품목·버전) + 라인(operation_code 게이트)"
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
          <label className="font-label text-xs uppercase tracking-widest text-on-surface/50">상태</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-container-high border border-outline-variant/30 text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary-accent"
          >
            {[["전체","전체"],["Draft","초안"],["Active","활성"],["Superseded","대체됨"],["Retired","폐기됨"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest hover:bg-primary-accent/80 transition-colors">
            + 신 버전
          </button>
          <button className="px-4 py-1.5 border border-outline-variant/30 text-on-surface/60 text-xs font-label uppercase tracking-widest hover:border-primary-accent hover:text-primary-accent transition-colors">
            비활성화
          </button>
        </div>
      </div>

      {/* 헤더 목록 */}
      <FieldHeader title="Routing 헤더 목록" moduleRef={`${filtered.length}건`} />
      <DataTable title="Routing 버전 목록" columns={headerColumns} data={headerData} bufferCount={filtered.length} />

      {/* 라인 상세 */}
      {selectedId && (
        <div className="mt-6">
          <FieldHeader title={`라인 상세 — ${selectedId}`} moduleRef="operation_code 게이트 (FNC-BD-044)" />
          <DataTable title="Routing 공정 라인" columns={lineColumns} data={lineData} />
          <p className="mt-2 text-xs text-on-surface/40 font-label">
            활성 Routing 직접 수정 불가 — 신 버전 발행 필요 (FNC-BD-033)
          </p>
        </div>
      )}

      {!selectedId && (
        <p className="mt-4 text-xs text-on-surface/40 font-label">
          헤더 행의 [라인] 버튼 클릭 시 라인 상세 표시
        </p>
      )}
    </div>
  );
}
