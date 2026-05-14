"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"msgId",     label:"메시지 ID" },
  { key:"channel",   label:"채널" },
  { key:"eventType", label:"이벤트" },
  { key:"recipient", label:"수신자" },
  { key:"retries",   label:"재시도" },
  { key:"status",    label:"상태" },
  { key:"sentAt",    label:"발송일시" },
];

const MOCK = [
  { msgId:"MSG-20260506-0042", channel:"EMAIL",     eventType:"BACKUP_FAIL",    recipient:"admin@vicon.com",    retries:0, statusK:"SENT",   sentAt:"2026-05-06 02:44" },
  { msgId:"MSG-20260506-0041", channel:"INAPP",     eventType:"HEALTH_WARN",    recipient:"admin",             retries:0, statusK:"SENT",   sentAt:"2026-05-06 02:00" },
  { msgId:"MSG-20260505-0038", channel:"SMS",       eventType:"DEVICE_LOST",    recipient:"010-0000-0001",     retries:1, statusK:"SENT",   sentAt:"2026-05-05 10:12" },
  { msgId:"MSG-20260505-0035", channel:"KAKAOTALK", eventType:"QC_FAIL",        recipient:"operator2",         retries:3, statusK:"FAILED", sentAt:"2026-05-05 09:00" },
  { msgId:"MSG-20260505-0030", channel:"EMAIL",     eventType:"NOTICE_PUBLISH", recipient:"all@vicon.com",     retries:0, statusK:"SENT",   sentAt:"2026-05-05 08:00" },
  { msgId:"MSG-20260504-0027", channel:"LINEBOARD", eventType:"WO_COMPLETE",    recipient:"board://P1000",     retries:2, statusK:"FAILED", sentAt:"2026-05-04 18:30" },
];

const ST_MAP: Record<string,"running"|"error"> = { SENT:"running", FAILED:"error" };

export default function NotifyHistoryPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.statusK]} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="발송 이력" accent="HISTORY" nodeRef="SCR-SYS-042" status="PROTOTYPE"
        description="1년 보존 · 3회 실패 시 수동 재발송(사유 코드 필수) (FNC-SYS-043~046)" />
      <div className="flex gap-2 mb-4">
        {["전체","SENT","FAILED"].map(f => (
          <button key={f} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">{f}</button>
        ))}
        <button className="ml-auto px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-error/20 text-error border border-error/20">재발송 (사유 코드 필요)</button>
      </div>
      <DataTable title="발송 이력 (1년 보존)" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
