import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLUMNS = [
  { key: "lot", label: "생산 LOT" },
  { key: "wo", label: "WO" },
  { key: "part", label: "부재" },
  { key: "op", label: "공정" },
  { key: "qty", label: "실적" },
  { key: "worker", label: "작업자" },
  { key: "startAt", label: "시작" },
  { key: "endAt", label: "완료" },
  { key: "status", label: "상태" },
];

const DATA = [
  { lot: "PRD-20260506-001", wo: "WO-P3000-20260506-0007", part: "B01-1-G22C-C-171", op: "G22C", qty: "1", worker: "김철수", startAt: "08:20", endAt: "10:05", status: "완료" },
  { lot: "PRD-20260506-002", wo: "WO-P3000-20260506-0007", part: "B01-1-G22C-C-172", op: "G22C", qty: "0", worker: "김철수", startAt: "09:05", endAt: "—", status: "진행중" },
  { lot: "PRD-20260506-003", wo: "WO-P3000-20260506-0007", part: "B02-2-G22C-C-088", op: "G22C", qty: "1", worker: "박영희", startAt: "08:45", endAt: "—", status: "진행중" },
  { lot: "PRD-20260505-011", wo: "WO-P3000-20260505-0003", part: "B03-1-G22C-C-054", op: "G22C", qty: "3", worker: "이민준", startAt: "07:30", endAt: "11:20", status: "완료" },
  { lot: "PRD-20260505-012", wo: "WO-P3000-20260505-0003", part: "B04-2-G22C-C-033", op: "G22C", qty: "0", worker: "—", startAt: "—", endAt: "—", status: "대기" },
  { lot: "PRD-20260504-007", wo: "WO-P3000-20260504-0011", part: "B02-2-G22C-C-088", op: "G22C", qty: "2", worker: "이민준", startAt: "09:00", endAt: "14:30", status: "완료" },
];

export default function ProduceHistoryPage() {
  return (
    <div className="p-8">
      <PageHeader title="PRODUCE /" accent="생산 이력" nodeRef="SCR-MFG-026" status="PROTOTYPE" description="생산 이력 조회 — LOT 단위 실적 기록" />

      <div className="flex gap-3 mb-4">
        <input placeholder="WO 검색" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-56 focus:outline-none focus:border-primary-accent" />
        <input placeholder="LOT 검색" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-48 focus:outline-none focus:border-primary-accent" />
        <input placeholder="공정" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-28 focus:outline-none focus:border-primary-accent" />
        <button className="bg-primary-accent text-white px-4 py-2 text-xs font-label uppercase tracking-wider">조회</button>
      </div>

      <DataTable title="생산 이력" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />
    </div>
  );
}
