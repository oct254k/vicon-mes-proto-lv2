import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { ts: "2026-05-06 07:00", eqCode: "EQ-P3-CUT-01", event: "가동 시작",  duration: "—",      cause: "—",        shift: "1조" },
  { ts: "2026-05-06 09:15", eqCode: "EQ-P3-CUT-01", event: "정지",      duration: "25분",   cause: "칼날 교체", shift: "1조" },
  { ts: "2026-05-06 09:40", eqCode: "EQ-P3-CUT-01", event: "재가동",    duration: "—",      cause: "—",        shift: "1조" },
  { ts: "2026-05-06 11:30", eqCode: "EQ-P3-PRESS-01", event: "고장",   duration: "60분",   cause: "유압 누유",  shift: "1조" },
  { ts: "2026-05-06 12:30", eqCode: "EQ-P3-PRESS-01", event: "재가동", duration: "—",      cause: "—",        shift: "2조" },
  { ts: "2026-05-06 14:00", eqCode: "EQ-P3-WELD-01",  event: "가동 시작", duration: "—",   cause: "—",        shift: "2조" },
];

const cols = [
  { key: "ts",       label: "발생일시" },
  { key: "eqCode",   label: "설비 코드" },
  { key: "event",    label: "이벤트", className: "text-primary-accent" },
  { key: "duration", label: "지속 시간" },
  { key: "cause",    label: "원인" },
  { key: "shift",    label: "조" },
];

export default function EQRuntimeListPage() {
  return (
    <div className="p-8">
      <PageHeader title="가동 이력" accent="RUNTIME LIST" nodeRef="SCR-EQ-011" description="설비별 가동·정지·고장 이벤트 시계열 이력." />
      <DataTable title="가동 이력 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
