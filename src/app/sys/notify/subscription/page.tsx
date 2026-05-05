"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"userId",   label:"사용자 ID" },
  { key:"channel",  label:"채널" },
  { key:"eventType",label:"이벤트 유형" },
  { key:"forced",   label:"강제 구독" },
  { key:"priority", label:"우선순위" },
  { key:"active",   label:"활성" },
];

const MOCK = [
  { userId:"admin",     channel:"EMAIL",     eventType:"BACKUP_FAIL",    forced:"Y", priority:1, active:"ACTIVE" },
  { userId:"admin",     channel:"INAPP",     eventType:"HEALTH_WARN",    forced:"Y", priority:1, active:"ACTIVE" },
  { userId:"operator1", channel:"EMAIL",     eventType:"WO_COMPLETE",    forced:"N", priority:2, active:"ACTIVE" },
  { userId:"operator1", channel:"SMS",       eventType:"DEVICE_LOST",    forced:"Y", priority:1, active:"ACTIVE" },
  { userId:"operator2", channel:"KAKAOTALK", eventType:"QC_FAIL",        forced:"N", priority:3, active:"INACTIVE" },
  { userId:"auditor",   channel:"EMAIL",     eventType:"AUDIT_EXPORT",   forced:"Y", priority:1, active:"ACTIVE" },
  { userId:"user1",     channel:"INAPP",     eventType:"NOTICE_PUBLISH", forced:"N", priority:5, active:"ACTIVE" },
];

export default function NotifySubscriptionPage() {
  const data = MOCK.map(r => ({ ...r, active: <StatusBadge type={r.active === "ACTIVE" ? "running" : "idle"} label={r.active} /> as unknown as string }));
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="구독 관리" accent="SUBSCRIPTION" nodeRef="SCR-SYS-041" status="PROTOTYPE"
        description="강제 구독(Y) + 사용자 우선순위 설정 — USR 도메인 cross (FNC-SYS-042)" />
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ 구독 추가</button>
        <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20">일괄 강제 구독</button>
      </div>
      <DataTable title="구독 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
