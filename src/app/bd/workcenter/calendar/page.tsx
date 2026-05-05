import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const CALENDAR = [
  { wc: "WC-P1-001", date: "2026-05-01", type: "휴무",   shiftStart: "-",      shiftEnd: "-",      availHours: "0" },
  { wc: "WC-P1-001", date: "2026-05-06", type: "정상",   shiftStart: "08:00",  shiftEnd: "17:00",  availHours: "8" },
  { wc: "WC-P1-002", date: "2026-05-06", type: "연장",   shiftStart: "08:00",  shiftEnd: "22:00",  availHours: "13" },
  { wc: "WC-P1-003", date: "2026-05-06", type: "정상",   shiftStart: "08:00",  shiftEnd: "17:00",  availHours: "8" },
  { wc: "WC-P2-001", date: "2026-05-06", type: "야간",   shiftStart: "22:00",  shiftEnd: "06:00",  availHours: "7" },
  { wc: "WC-P2-002", date: "2026-05-07", type: "정상",   shiftStart: "08:00",  shiftEnd: "17:00",  availHours: "8" },
  { wc: "WC-P3-001", date: "2026-05-07", type: "정상",   shiftStart: "08:00",  shiftEnd: "17:00",  availHours: "8" },
];

const COLUMNS = [
  { key: "wc",         label: "WC 코드" },
  { key: "date",       label: "날짜" },
  { key: "type",       label: "근무 유형" },
  { key: "shiftStart", label: "시작" },
  { key: "shiftEnd",   label: "종료" },
  { key: "availHours", label: "가용 시간(h)" },
];

export default function WorkcenterCalendarPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="WC 가용 캘린더"
        nodeRef="SCR-BD-051"
        description="Work Center별 가동 가능 시간대 및 휴무일 설정"
      />
      <FieldHeader title="가용 캘린더" moduleRef="BD-WC-CALENDAR" />
      <DataTable title="가용 시간 설정" columns={COLUMNS} data={CALENDAR} bufferCount={CALENDAR.length} />
    </div>
  );
}
