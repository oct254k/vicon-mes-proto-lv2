"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"logId",    label:"로그 ID" },
  { key:"actor",    label:"행위자" },
  { key:"action",   label:"액션" },
  { key:"resource", label:"리소스" },
  { key:"result",   label:"결과" },
  { key:"ip",       label:"IP" },
  { key:"loggedAt", label:"일시" },
];

const MOCK = [
  { logId:"AUD-20260506-0201", actor:"admin",     action:"BACKUP_TRIGGER",   resource:"BKUP-20260506-001", resultK:"SUCCESS", ip:"10.0.1.10",  loggedAt:"2026-05-06 02:00:05" },
  { logId:"AUD-20260506-0200", actor:"operator1", action:"CODE_UPDATE",      resource:"CUSTOM_GROUP",      resultK:"APPROVED",ip:"10.0.1.21",  loggedAt:"2026-05-06 09:13" },
  { logId:"AUD-20260505-0195", actor:"operator2", action:"CODE_SYS_ATTEMPT", resource:"WO_STATUS.PLANNED", resultK:"BLOCKED", ip:"10.0.1.22",  loggedAt:"2026-05-05 09:01" },
  { logId:"AUD-20260505-0190", actor:"operator1", action:"DEVICE_LOST",      resource:"DEV-T1-0042",       resultK:"SUCCESS", ip:"10.0.1.21",  loggedAt:"2026-05-05 10:10" },
  { logId:"AUD-20260505-0185", actor:"auditor",   action:"LOG_EXPORT",       resource:"AUDIT-LOG",         resultK:"SUCCESS", ip:"10.0.1.30",  loggedAt:"2026-05-05 14:00" },
  { logId:"AUD-20260504-0170", actor:"operator3", action:"DELETE_ATTEMPT",   resource:"notice.NTC-2026-040",resultK:"BLOCKED",ip:"10.0.1.23",  loggedAt:"2026-05-04 11:30" },
];

const R_MAP: Record<string,"running"|"error"|"warning"> = { SUCCESS:"running", APPROVED:"running", BLOCKED:"error", FAILED:"error" };

export default function AuditLogPage() {
  const data = MOCK.map(r => ({ ...r, result: <StatusBadge type={R_MAP[r.resultK] ?? "warning"} label={r.resultK} /> as unknown as string }));
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="운영 로그" accent="AUDIT LOG" nodeRef="SCR-SYS-050" status="PROTOTYPE"
        description="append-only 감사 로그 — UPDATE/DELETE 시도 BLOCKED 표시 (FNC-SYS-050·052·055)" />
      <div className="flex gap-2 mb-4 flex-wrap">
        <input className="px-3 py-1.5 text-xs font-label bg-surface-container border border-outline-variant/20 focus:border-[#00912F] outline-none w-48" placeholder="행위자 검색" />
        <input className="px-3 py-1.5 text-xs font-label bg-surface-container border border-outline-variant/20 focus:border-[#00912F] outline-none w-40" placeholder="액션 유형" />
        {["전체","SUCCESS","BLOCKED","FAILED"].map(f => (
          <button key={f} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">{f}</button>
        ))}
        <a href="/sys/audit/export" className="ml-auto px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">내보내기</a>
      </div>
      <DataTable title="운영 로그 (append-only)" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
