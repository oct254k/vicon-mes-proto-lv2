"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"devId",     label:"단말 ID" },
  { key:"devType",   label:"유형" },
  { key:"ownership", label:"소유 유형" },
  { key:"plantId",   label:"공장" },
  { key:"assignedTo",label:"담당자" },
  { key:"status",    label:"상태" },
  { key:"regAt",     label:"등록일" },
];

const MOCK = [
  { devId:"DEV-T1-0041", devType:"BARCODE",  ownership:"자사",    plantId:"P1000", assignedTo:"operator1", statusK:"ACTIVE",   regAt:"2026-01-10" },
  { devId:"DEV-T1-0042", devType:"BARCODE",  ownership:"자사",    plantId:"P1000", assignedTo:"operator2", statusK:"LOST",     regAt:"2026-01-10" },
  { devId:"DEV-T2-0011", devType:"RFID",     ownership:"BYOD",    plantId:"P2000", assignedTo:"operator3", statusK:"ACTIVE",   regAt:"2026-02-15" },
  { devId:"DEV-T2-0012", devType:"RFID",     ownership:"BYOD",    plantId:"P2000", assignedTo:"operator4", statusK:"ACTIVE",   regAt:"2026-02-15" },
  { devId:"DEV-T3-0005", devType:"MOBILE",   ownership:"EXTERNAL",plantId:"P3000", assignedTo:"vendor01",  statusK:"ACTIVE",   regAt:"2026-03-01" },
  { devId:"DEV-T1-0039", devType:"BARCODE",  ownership:"자사",    plantId:"P1000", assignedTo:"—",         statusK:"RETIRED",  regAt:"2025-06-01" },
];

const ST_MAP: Record<string,"running"|"error"|"idle"> = { ACTIVE:"running", LOST:"error", RETIRED:"idle" };

export default function DeviceListPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.statusK]} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="단말 목록" accent="LIST" nodeRef="SCR-SYS-100" status="PROTOTYPE"
        description="T1/T2/T3 유형 사전 등록 — 자사·BYOD·EXTERNAL 페어링 (PRC-SYS-002 §6 [A])" />
      <div className="bg-surface-container border-l-4 border-error p-4 mb-6 flex items-center gap-4">
        <StatusBadge type="error" label="LOST" />
        <p className="text-sm text-on-surface-variant">DEV-T1-0042 분실 신고됨 — 5분 SLA 무효화 진행 중</p>
        <a href="/sys/device/lifecycle" className="ml-auto text-xs font-label uppercase tracking-widest text-error border border-error/30 px-3 py-1 hover:bg-error/10 transition-colors">라이프사이클 처리 →</a>
      </div>
      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ 단말 등록</button>
        {["전체","ACTIVE","LOST","RETIRED"].map(f => (
          <button key={f} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">{f}</button>
        ))}
      </div>
      <DataTable title="단말 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
