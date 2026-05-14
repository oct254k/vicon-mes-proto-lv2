"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"migId",     label:"마이그레이션 ID" },
  { key:"source",    label:"소스 DB" },
  { key:"target",    label:"대상 DB" },
  { key:"category",  label:"카테고리" },
  { key:"rowsMig",   label:"이관 행" },
  { key:"status",    label:"상태" },
  { key:"startedAt", label:"시작일시" },
];

const MOCK = [
  { migId:"MIG-20260506-001", source:"mes-v1-prod", target:"mes-v2-stg",  category:"기준정보", rowsMig:"124,502", statusK:"SUCCEEDED", startedAt:"2026-05-06 01:00" },
  { migId:"MIG-20260505-003", source:"mes-v1-prod", target:"mes-v2-stg",  category:"생산실적", rowsMig:"3,201,400",statusK:"SUCCEEDED", startedAt:"2026-05-05 22:00" },
  { migId:"MIG-20260505-002", source:"mes-v1-prod", target:"mes-v2-stg",  category:"원자재",   rowsMig:"84,100",  statusK:"RUNNING",   startedAt:"2026-05-06 09:00" },
  { migId:"MIG-20260504-001", source:"legacy-erp",  target:"mes-v2-stg",  category:"통계",     rowsMig:"—",       statusK:"FAILED",    startedAt:"2026-05-04 03:00" },
  { migId:"MIG-20260420-001", source:"mes-v1-dr",   target:"mes-v2-dr",   category:"전체",     rowsMig:"4,120,000",statusK:"SUCCEEDED", startedAt:"2026-04-20 00:00" },
];

const ST_MAP: Record<string,"running"|"error"|"warning"> = { SUCCEEDED:"running", RUNNING:"warning", FAILED:"error" };

export default function BackupMigrationPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.statusK] ?? "idle"} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="마이그레이션 작업" accent="MIGRATION" nodeRef="SCR-SYS-063b" status="PROTOTYPE"
        description="데이터 마이그레이션 마법사 — STG 검증 후 PROD 승격 (FNC-SYS-064·066)" />
      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ 마이그레이션 시작</button>
        <span className="self-center text-xs text-on-surface-variant opacity-50 font-label">STG 검증 완료 후 PROD 승격 가능</span>
      </div>
      <DataTable title="마이그레이션 작업 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
