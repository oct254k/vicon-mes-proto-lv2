"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"restoreId",  label:"복구 ID" },
  { key:"backupRef",  label:"백업 참조" },
  { key:"category",   label:"카테고리" },
  { key:"env",        label:"환경" },
  { key:"type",       label:"복구 유형" },
  { key:"status",     label:"상태" },
  { key:"requestedAt",label:"요청일시" },
];

const MOCK = [
  { restoreId:"RST-20260506-001", backupRef:"BKUP-20260506-001", category:"생산실적", env:"STG",  type:"DR_SIM",  statusK:"SUCCEEDED", requestedAt:"2026-05-06 10:00" },
  { restoreId:"RST-20260503-002", backupRef:"BKUP-20260503-001", category:"기준정보", env:"STG",  type:"RESTORE", statusK:"SUCCEEDED", requestedAt:"2026-05-03 14:30" },
  { restoreId:"RST-20260430-001", backupRef:"BKUP-20260429-001", category:"원자재",   env:"DR",   type:"DR_SIM",  statusK:"RUNNING",   requestedAt:"2026-04-30 09:00" },
  { restoreId:"RST-20260425-001", backupRef:"BKUP-20260424-001", category:"통계",     env:"STG",  type:"RESTORE", statusK:"FAILED",    requestedAt:"2026-04-25 15:00" },
  { restoreId:"RST-20260420-001", backupRef:"BKUP-20260419-001", category:"생산실적", env:"DR",   type:"DR_SIM",  statusK:"SUCCEEDED", requestedAt:"2026-04-20 11:00" },
];

const ST_MAP: Record<string,"running"|"error"|"warning"> = { SUCCEEDED:"running", RUNNING:"warning", FAILED:"error" };

export default function BackupRestorePage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.statusK] ?? "idle"} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="복구 워크플로" accent="RESTORE" nodeRef="SCR-SYS-063" status="PROTOTYPE"
        description="복구 및 DR 시뮬레이션 — env=PROD 직접 복구 게이트 차단 (FNC-SYS-062·064)" />
      <div className="bg-surface-container border-l-4 border-warning p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-warning mb-1">GATE</p>
        <p className="text-sm text-on-surface-variant">PROD 환경 직접 복구는 차단됩니다. STG 또는 DR 환경에서만 DR 시뮬레이션 가능.</p>
      </div>
      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ 복구 요청</button>
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20">DR 시뮬레이션 (STG/DR)</button>
      </div>
      <DataTable title="복구 작업 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
