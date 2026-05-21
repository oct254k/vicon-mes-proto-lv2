import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const COLUMNS = [
  { key: "lot", label: "LOT" },
  { key: "part", label: "부재" },
  { key: "from", label: "출발지" },
  { key: "to", label: "목적지" },
  { key: "dispatchedAt", label: "출고일시" },
  { key: "reason", label: "취소 사유" },
  { key: "status", label: "상태" },
];

const DATA = [
  { lot: "PRD-20260506-003", part: "B02-2-G22C-C-088", from: "SHOP-A / G22C", to: "WH-FINISHED", dispatchedAt: "2026-05-06 09:00", reason: "목적지 변경", status: "이송중 — 취소 가능" },
  { lot: "PRD-20260505-009", part: "B05-1-G22C-C-021", from: "SHOP-B / BLT", to: "SHOP-C / PNT", dispatchedAt: "2026-05-05 13:20", reason: "재작업 발생", status: "취소 완료" },
];

export default function TransferCancelPage() {
  return (
    <div className="p-8">
      <PageHeader title="이동 /" accent="이동 취소" nodeRef="SCR-MFG-033" status="PROTOTYPE" description="이송 중 TRANSFER 취소 — 관리자 권한 필요" />

      <div className="bg-error/10 border-l-4 border-error p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-error">이송 완료 후에는 취소 불가 — 입고 완료 상태는 RETURN 처리 필요</p>
      </div>

      <FieldHeader title="취소 대상 이송" moduleRef="FNC-MFG-050" />
      <DataTable title="이동 취소 목록" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-3 mt-6 justify-end">
        <button className="bg-error text-white px-6 py-2 text-xs font-label uppercase tracking-wider">선택 취소 처리</button>
      </div>
    </div>
  );
}
