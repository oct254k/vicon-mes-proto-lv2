import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { ts: "2026-05-06 10:00", moNo: "MO-2026-0501-001", action: "결재 승인",  from: "결재대기",  to: "승인완료",  user: "이순신",  ip: "10.0.1.11" },
  { ts: "2026-05-06 08:30", moNo: "MO-2026-0501-001", action: "MO 생성",   from: "—",         to: "결재대기",  user: "홍길동",  ip: "10.0.1.22" },
  { ts: "2026-05-05 17:00", moNo: "MO-2026-0430-009", action: "작업 완료", from: "진행중",    to: "완료",      user: "박영수",  ip: "10.0.1.33" },
  { ts: "2026-05-05 13:20", moNo: "MO-2026-0430-009", action: "작업 시작", from: "승인완료",  to: "진행중",    user: "박영수",  ip: "10.0.1.33" },
  { ts: "2026-05-04 09:15", moNo: "MO-2026-0430-009", action: "결재 승인", from: "결재대기",  to: "승인완료",  user: "이순신",  ip: "10.0.1.11" },
];

const cols = [
  { key: "ts",     label: "발생일시" },
  { key: "moNo",   label: "MO 번호" },
  { key: "action", label: "액션",      className: "text-primary-accent" },
  { key: "from",   label: "이전 상태" },
  { key: "to",     label: "변경 상태" },
  { key: "user",   label: "처리자" },
  { key: "ip",     label: "IP" },
];

export default function EQMaintOrderAuditPage() {
  return (
    <div className="p-8">
      <PageHeader title="MO 감사 로그" accent="AUDIT" nodeRef="SCR-EQ-044" description="정비 작업지시 상태 변경 및 처리 감사 로그." />
      <DataTable title="MO 감사 로그 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
