import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { moNo: "MO-2026-0501-001", line: "LINE-P3-01", stopStart: "2026-05-06 11:00", stopEnd: "2026-05-06 15:00", stopHr: "4", prodLoss: "200EA", prodAppr: "김생산", maintAppr: "이정비", status: "승인완료" },
  { moNo: "MO-2026-0510-002", line: "LINE-P3-02", stopStart: "2026-05-10 08:00", stopEnd: "2026-05-10 12:00", stopHr: "4", prodLoss: "320EA", prodAppr: "김생산", maintAppr: "박정비", status: "협의중"  },
  { moNo: "MO-2026-0515-003", line: "LINE-P4-01", stopStart: "2026-05-15 14:00", stopEnd: "2026-05-15 18:00", stopHr: "4", prodLoss: "180EA", prodAppr: "—",      maintAppr: "이정비", status: "요청중"  },
];

const cols = [
  { key: "moNo",      label: "MO 번호" },
  { key: "line",      label: "정지 라인" },
  { key: "stopStart", label: "정지 시작" },
  { key: "stopEnd",   label: "정지 종료" },
  { key: "stopHr",    label: "정지(h)" },
  { key: "prodLoss",  label: "생산 손실" },
  { key: "prodAppr",  label: "생산 승인" },
  { key: "maintAppr", label: "정비 승인" },
  { key: "status",    label: "협의 상태", className: "text-primary-accent" },
];

export default function EQMaintOrderCoordPage() {
  return (
    <div className="p-8">
      <PageHeader title="라인 정지 협의" accent="COORD" nodeRef="SCR-EQ-043" description="정비 작업에 따른 생산 라인 정지 협의 현황." />
      <DataTable title="라인 정지 협의 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
