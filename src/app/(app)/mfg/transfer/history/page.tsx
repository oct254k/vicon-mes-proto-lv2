import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLUMNS = [
  { key: "lot", label: "LOT" },
  { key: "part", label: "부재" },
  { key: "from", label: "출발지" },
  { key: "to", label: "목적지" },
  { key: "driver", label: "운전자" },
  { key: "dispatchedAt", label: "출고일시" },
  { key: "arrivedAt", label: "입고일시" },
  { key: "status", label: "상태" },
];

const DATA = [
  { lot: "PRD-20260506-001", part: "B01-1-G22C-C-171", from: "SHOP-A / G22C", to: "SHOP-B / BLT", driver: "김기사", dispatchedAt: "2026-05-06 10:10", arrivedAt: "2026-05-06 10:45", status: "입고완료" },
  { lot: "PRD-20260505-011", part: "B03-1-G22C-C-054", from: "SHOP-A / G22C", to: "SHOP-C / PNT", driver: "이기사", dispatchedAt: "2026-05-05 11:30", arrivedAt: "2026-05-05 12:05", status: "입고완료" },
  { lot: "PRD-20260506-003", part: "B02-2-G22C-C-088", from: "SHOP-A / G22C", to: "WH-FINISHED", driver: "박기사", dispatchedAt: "2026-05-06 09:00", arrivedAt: "—", status: "이송중" },
  { lot: "PRD-20260504-007", part: "B02-2-G22C-C-088", from: "SHOP-B / BLT", to: "WH-FINISHED", driver: "최기사", dispatchedAt: "2026-05-04 15:00", arrivedAt: "2026-05-04 15:40", status: "입고완료" },
];

export default function TransferHistoryPage() {
  return (
    <div className="p-8">
      <PageHeader title="이동 /" accent="이동 이력" nodeRef="SCR-MFG-034" status="PROTOTYPE" description="LOT 이동 이력 조회 — 출발지·목적지·상태" />

      <div className="flex gap-3 mb-4">
        <input placeholder="LOT 검색" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-48 focus:outline-none focus:border-primary-accent" />
        <input placeholder="출발지" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-36 focus:outline-none focus:border-primary-accent" />
        <input placeholder="목적지" className="bg-surface-container border border-outline-variant/30 px-3 py-2 text-sm font-mono w-36 focus:outline-none focus:border-primary-accent" />
        <button className="bg-primary-accent text-white px-4 py-2 text-xs font-label uppercase tracking-wider">조회</button>
      </div>

      <DataTable title="이동 이력" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />
    </div>
  );
}
