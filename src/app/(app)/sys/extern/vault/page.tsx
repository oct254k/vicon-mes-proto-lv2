"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"secretKey",  label:"시크릿 키" },
  { key:"targetSvc",  label:"대상 서비스" },
  { key:"maskedVal",  label:"값 (마스킹)" },
  { key:"expiresAt",  label:"만료일" },
  { key:"status",     label:"상태" },
  { key:"updatedAt",  label:"갱신일시" },
];

const MOCK = [
  { secretKey:"smtp/password",        targetSvc:"EMAIL 채널",   maskedVal:"••••••••",           expiresAt:"2027-05-01", statusK:"OK",     updatedAt:"2026-01-01" },
  { secretKey:"sms/api-key",          targetSvc:"SMS 채널",     maskedVal:"TKN-EAI-ERP-04 ••••",expiresAt:"2026-06-01", statusK:"EXPIRING",updatedAt:"2025-12-01" },
  { secretKey:"kakao/oauth2-secret",  targetSvc:"KAKAOTALK",   maskedVal:"••••••••",           expiresAt:"2026-12-31", statusK:"OK",     updatedAt:"2025-07-01" },
  { secretKey:"erp/db-password",      targetSvc:"ERP DB",       maskedVal:"••••••••",           expiresAt:"2026-08-01", statusK:"OK",     updatedAt:"2026-02-01" },
  { secretKey:"wms/api-secret",       targetSvc:"WMS 연동",     maskedVal:"••••••••",           expiresAt:"2026-05-15", statusK:"EXPIRING",updatedAt:"2025-11-01" },
  { secretKey:"lineboard/token",      targetSvc:"LINEBOARD",   maskedVal:"••••••••",           expiresAt:"2027-01-01", statusK:"OK",     updatedAt:"2026-01-15" },
];

const ST_MAP: Record<string,"running"|"warning"> = { OK:"running", EXPIRING:"warning" };

export default function ExternVaultPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.statusK]} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="Vault 시크릿 관리" accent="VAULT" nodeRef="SCR-SYS-070" status="PROTOTYPE"
        description="외부 연동 시크릿 — 마스킹 표시, 만료 임박 EXPIRING 배지 (FNC-SYS-070·071·072)" />
      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ 시크릿 등록</button>
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20">키 교체 (Rotate)</button>
      </div>
      <DataTable title="Vault 시크릿 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
