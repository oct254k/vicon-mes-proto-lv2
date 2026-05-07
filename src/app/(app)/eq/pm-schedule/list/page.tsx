import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { pmNo: "PM-2026-001", eqCode: "EQ-P3-CUT-01",   pmType: "월간PM",  cycle: "30일",  lastPm: "2026-04-10", nextPm: "2026-05-10", assignee: "홍길동", status: "예정"   },
  { pmNo: "PM-2026-002", eqCode: "EQ-P3-CUT-02",   pmType: "분기PM",  cycle: "90일",  lastPm: "2026-02-15", nextPm: "2026-05-15", assignee: "이순신", status: "예정"   },
  { pmNo: "PM-2026-003", eqCode: "EQ-P3-PRESS-01", pmType: "월간PM",  cycle: "30일",  lastPm: "2026-04-01", nextPm: "2026-05-01", assignee: "박영수", status: "완료"   },
  { pmNo: "PM-2026-004", eqCode: "EQ-P3-WELD-01",  pmType: "반기PM",  cycle: "180일", lastPm: "2025-11-20", nextPm: "2026-05-20", assignee: "홍길동", status: "예정"   },
  { pmNo: "PM-2026-005", eqCode: "EQ-P4-ASM-01",   pmType: "월간PM",  cycle: "30일",  lastPm: "2026-04-28", nextPm: "2026-05-28", assignee: "최민수", status: "예정"   },
];

const cols = [
  { key: "pmNo",     label: "PM 번호" },
  { key: "eqCode",   label: "설비 코드" },
  { key: "pmType",   label: "PM 유형" },
  { key: "cycle",    label: "주기" },
  { key: "lastPm",   label: "최근 실시" },
  { key: "nextPm",   label: "다음 예정", className: "text-primary-accent" },
  { key: "assignee", label: "담당자" },
  { key: "status",   label: "상태" },
];

export default function EQPMScheduleListPage() {
  return (
    <div className="p-8">
      <PageHeader title="PM 목록" accent="PM LIST" nodeRef="SCR-EQ-051" description="설비별 예방정비 계획 목록 및 다음 실시 예정일." />
      <DataTable title="PM 계획 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
