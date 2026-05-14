"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"reqId",    label:"결재 ID" },
  { key:"groupCd",  label:"코드 그룹" },
  { key:"codeCd",   label:"코드값" },
  { key:"action",   label:"변경 유형" },
  { key:"reqBy",    label:"신청자" },
  { key:"reqAt",    label:"신청일" },
  { key:"status",   label:"결재 상태" },
];

const MOCK = [
  { reqId:"CAPV-20260506-003", groupCd:"CUSTOM_GROUP", codeCd:"CUSTOM_02", action:"CREATE", reqBy:"operator1", reqAt:"2026-05-06 09:12", status:"PENDING" },
  { reqId:"CAPV-20260505-007", groupCd:"CUSTOM_GROUP", codeCd:"CUSTOM_01", action:"UPDATE", reqBy:"operator2", reqAt:"2026-05-05 14:30", status:"APPROVED" },
  { reqId:"CAPV-20260504-005", groupCd:"REPORT_TYPE",  codeCd:"RPT_DAILY", action:"CREATE", reqBy:"operator1", reqAt:"2026-05-04 10:01", status:"REJECTED" },
  { reqId:"CAPV-20260503-002", groupCd:"CUSTOM_GROUP", codeCd:"CUSTOM_03", action:"DELETE", reqBy:"operator3", reqAt:"2026-05-03 16:45", status:"APPROVED" },
  { reqId:"CAPV-20260502-001", groupCd:"REPORT_TYPE",  codeCd:"RPT_HOUR",  action:"CREATE", reqBy:"operator2", reqAt:"2026-05-02 11:20", status:"APPROVED" },
];

const ST_MAP: Record<string, "warning"|"running"|"error"> = { PENDING:"warning", APPROVED:"running", REJECTED:"error" };

export default function CodeApprovalPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.status]} label={r.status} /> as unknown as string }));
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="코드 변경 결재" accent="APPROVAL" nodeRef="SCR-SYS-031" status="PROTOTYPE"
        description="L2 운영자 코드 변경 결재 큐 — L3 관리자 즉시 적용, L2 결재 대기 (FNC-SYS-030·032·035)" />
      <div className="flex gap-2 mb-4">
        {["전체","PENDING","APPROVED","REJECTED"].map(f => (
          <button key={f} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">{f}</button>
        ))}
      </div>
      <DataTable title="결재 대기 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
