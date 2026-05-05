"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"tokenId",   label:"Token ID" },
  { key:"scope",     label:"Scope" },
  { key:"maskedVal", label:"Token (마스킹)" },
  { key:"createdBy", label:"발급자" },
  { key:"expiresAt", label:"만료일" },
  { key:"status",    label:"상태" },
];

const MOCK = [
  { tokenId:"TKN-EAI-ERP-04", scope:"ERP:READ,ERP:WRITE", maskedVal:"ey••••••••••1234", createdBy:"admin",     expiresAt:"2026-11-01", statusK:"ACTIVE" },
  { tokenId:"TKN-EAI-WMS-03", scope:"WMS:READ",           maskedVal:"ey••••••••••5678", createdBy:"admin",     expiresAt:"2026-08-15", statusK:"ACTIVE" },
  { tokenId:"TKN-EAI-ERP-03", scope:"ERP:READ",           maskedVal:"ey••••••(회수됨)", createdBy:"sysop",     expiresAt:"2026-03-01", statusK:"REVOKED" },
  { tokenId:"TKN-EAI-MES-01", scope:"MES:FULL",           maskedVal:"ey••••••••••9012", createdBy:"admin",     expiresAt:"2025-12-31", statusK:"EXPIRED" },
  { tokenId:"TKN-EAI-QC-02",  scope:"QC:READ",            maskedVal:"ey••••••••••3456", createdBy:"operator1", expiresAt:"2026-09-30", statusK:"ACTIVE" },
];

const ST_MAP: Record<string,"running"|"error"|"idle"> = { ACTIVE:"running", REVOKED:"error", EXPIRED:"idle" };

export default function ExternTokenPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.statusK] ?? "idle"} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="API Token 관리" accent="TOKEN" nodeRef="SCR-SYS-071" status="PROTOTYPE"
        description="API Token 발급·회수 — 발급 시 1회 평문 노출, 이후 영구 마스킹 (FNC-SYS-072·074)" />
      <div className="bg-surface-container border-l-4 border-[#f59e0b] p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-[#f59e0b] mb-1">NOTICE</p>
        <p className="text-sm text-on-surface-variant">토큰은 발급 직후 1회만 평문 표시됩니다. 이후 재조회 불가 — 분실 시 재발급 필요.</p>
      </div>
      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ Token 발급</button>
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-error/20 text-error border border-error/20">선택 회수 (REVOKE)</button>
      </div>
      <DataTable title="API Token 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
