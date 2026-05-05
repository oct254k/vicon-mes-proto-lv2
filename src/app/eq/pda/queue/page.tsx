import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { seq: "1", moNo: "MO-2026-0501-001", eqCode: "EQ-P3-CUT-01",   type: "BM",  priority: "긴급", assignee: "홍길동", dueDate: "2026-05-06", status: "진행중" },
  { seq: "2", moNo: "PM-2026-001",      eqCode: "EQ-P3-CUT-01",   type: "PM",  priority: "보통", assignee: "홍길동", dueDate: "2026-05-10", status: "대기"   },
  { seq: "3", moNo: "MO-2026-0510-002", eqCode: "EQ-P3-PRESS-01", type: "CM",  priority: "높음", assignee: "박영수", dueDate: "2026-05-10", status: "대기"   },
  { seq: "4", moNo: "PM-2026-004",      eqCode: "EQ-P3-WELD-01",  type: "PM",  priority: "보통", assignee: "이순신", dueDate: "2026-05-20", status: "대기"   },
  { seq: "5", moNo: "PM-2026-005",      eqCode: "EQ-P4-ASM-01",   type: "PM",  priority: "보통", assignee: "최민수", dueDate: "2026-05-28", status: "대기"   },
];

const cols = [
  { key: "seq",      label: "순번" },
  { key: "moNo",     label: "MO/PM 번호" },
  { key: "eqCode",   label: "설비 코드" },
  { key: "type",     label: "유형" },
  { key: "priority", label: "우선순위", className: "text-primary-accent" },
  { key: "assignee", label: "담당자" },
  { key: "dueDate",  label: "기한" },
  { key: "status",   label: "상태" },
];

export default function EQPdaQueuePage() {
  return (
    <div className="p-8">
      <PageHeader title="PDA 작업 큐" accent="QUEUE" nodeRef="SCR-EQ-092" description="현장 PDA 작업자 할당 작업 큐 목록." />
      <DataTable title="작업 큐 목록 (홍길동 / 2026-05-06)" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
