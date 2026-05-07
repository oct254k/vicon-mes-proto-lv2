import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLUMNS = [
  { key: "wo", label: "WO" },
  { key: "lot", label: "LOT" },
  { key: "part", label: "부재" },
  { key: "qty", label: "수량" },
  { key: "worker", label: "작업자" },
  { key: "issuedAt", label: "투입일시" },
  { key: "status", label: "상태" },
];

const DATA = [
  { wo: "WO-P3000-20260506-0007", lot: "RCV-20260501-0017", part: "B01-1-G22C-C-171", qty: "1", worker: "김철수", issuedAt: "2026-05-06 08:12", status: "확정" },
  { wo: "WO-P3000-20260506-0007", lot: "RCV-20260501-0018", part: "B01-1-G22C-C-172", qty: "1", worker: "김철수", issuedAt: "2026-05-06 08:15", status: "확정" },
  { wo: "WO-P3000-20260505-0003", lot: "RCV-20260430-0041", part: "B02-2-G22C-C-088", qty: "2", worker: "박영희", issuedAt: "2026-05-05 14:30", status: "확정" },
  { wo: "WO-P3000-20260505-0003", lot: "RCV-20260430-0042", part: "B02-2-G22C-C-089", qty: "1", worker: "박영희", issuedAt: "2026-05-05 14:33", status: "취소" },
  { wo: "WO-P3000-20260504-0011", lot: "RCV-20260428-0009", part: "B03-1-G22C-C-054", qty: "3", worker: "이민준", issuedAt: "2026-05-04 09:00", status: "확정" },
];

export default function IssueHistoryPage() {
  return (
    <div className="p-8">
      <PageHeader title="ISSUE /" accent="투입 이력" nodeRef="SCR-MFG-013" status="PROTOTYPE" description="자재 투입 이력 조회 — Lot 단위 기록" />

      <div className="flex gap-3 mb-4">
        <input placeholder="WO 검색" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-56 focus:outline-none focus:border-primary-accent" />
        <input placeholder="LOT 검색" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-48 focus:outline-none focus:border-primary-accent" />
        <button className="bg-primary-accent text-white px-4 py-2 text-xs font-label uppercase tracking-wider">조회</button>
      </div>

      <DataTable title="투입 이력" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />
    </div>
  );
}
