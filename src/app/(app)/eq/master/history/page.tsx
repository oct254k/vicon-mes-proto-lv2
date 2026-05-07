import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { ts: "2026-05-01 09:12", eqCode: "EQ-P3-CUT-01", field: "PM주기(일)",   before: "180",    after: "150",    user: "홍길동",  reason: "빈도 상향" },
  { ts: "2026-04-28 14:33", eqCode: "EQ-P3-PRESS-01", field: "설비명",    before: "구형프레스", after: "프레스#1", user: "이순신",  reason: "명칭 표준화" },
  { ts: "2026-04-20 11:00", eqCode: "EQ-P4-ASM-01",  field: "담당자",    before: "김철수",   after: "박영수",   user: "관리자",  reason: "담당자 변경" },
  { ts: "2026-04-15 16:45", eqCode: "EQ-P3-WELD-01", field: "설치일",    before: "2021-01-10","after": "2022-01-20", user: "이순신", reason: "설치일 정정" },
  { ts: "2026-04-10 08:30", eqCode: "EQ-P3-CUT-02",  field: "위험등급",  before: "B",       after: "A",       user: "홍길동",  reason: "안전 재분류" },
];

const cols = [
  { key: "ts",     label: "변경일시" },
  { key: "eqCode", label: "설비 코드" },
  { key: "field",  label: "변경 항목" },
  { key: "before", label: "변경 전" },
  { key: "after",  label: "변경 후", className: "text-primary-accent" },
  { key: "user",   label: "변경자" },
  { key: "reason", label: "사유" },
];

export default function EQMasterHistoryPage() {
  return (
    <div className="p-8">
      <PageHeader title="설비 변경 이력" accent="HISTORY" nodeRef="SCR-EQ-003" description="설비 마스터 속성 변경 감사 로그." />
      <DataTable title="변경 이력 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
