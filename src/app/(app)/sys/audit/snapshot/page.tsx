"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"snapId",   label:"스냅샷 ID" },
  { key:"snapDate", label:"기준일" },
  { key:"category", label:"카테고리" },
  { key:"rowCount", label:"행 수" },
  { key:"sizeKb",   label:"크기(KB)" },
  { key:"status",   label:"상태" },
  { key:"createdAt",label:"생성일시" },
];

const MOCK = [
  { snapId:"SNAP-20260506-001", snapDate:"2026-05-06", category:"전체", rowCount:"201,342", sizeKb:"18,430", statusK:"DONE",    createdAt:"2026-05-06 03:00:10" },
  { snapId:"SNAP-20260505-001", snapDate:"2026-05-05", category:"전체", rowCount:"198,771", sizeKb:"18,100", statusK:"DONE",    createdAt:"2026-05-05 03:00:08" },
  { snapId:"SNAP-20260504-001", snapDate:"2026-05-04", category:"전체", rowCount:"197,204", sizeKb:"17,980", statusK:"DONE",    createdAt:"2026-05-04 03:00:11" },
  { snapId:"SNAP-20260503-001", snapDate:"2026-05-03", category:"전체", rowCount:"195,012", sizeKb:"17,750", statusK:"DONE",    createdAt:"2026-05-03 03:00:09" },
  { snapId:"SNAP-20260502-001", snapDate:"2026-05-02", category:"전체", rowCount:"—",       sizeKb:"—",      statusK:"FAILED",  createdAt:"2026-05-02 03:00:00" },
];

export default function AuditSnapshotPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={r.statusK === "DONE" ? "running" : "error"} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="일일 스냅샷" accent="SNAPSHOT" nodeRef="SCR-SYS-051b" status="PROTOTYPE"
        description="매일 03:00 자동 생성 A7 시점 스냅샷 — 감사·로그 내보내기 기준점 (FNC-SYS-053·054)" />
      <DataTable title="일일 스냅샷 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
