import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const COLUMNS = [
  { key: "lot", label: "생산 LOT" },
  { key: "part", label: "부재" },
  { key: "wo", label: "WO" },
  { key: "reason", label: "취소 사유" },
  { key: "requestedBy", label: "요청자" },
  { key: "requestedAt", label: "요청일시" },
  { key: "approval", label: "결재" },
];

const DATA = [
  { lot: "PRD-20260506-002", part: "B01-1-G22C-C-172", wo: "WO-P3000-20260506-0007", reason: "공정 오류 재처리", requestedBy: "김철수", requestedAt: "2026-05-06 09:30", approval: "대기" },
  { lot: "PRD-20260505-012", part: "B04-2-G22C-C-033", wo: "WO-P3000-20260505-0003", reason: "자재 불량 확인", requestedBy: "박영희", requestedAt: "2026-05-05 16:10", approval: "승인" },
  { lot: "PRD-20260504-007", part: "B02-2-G22C-C-088", wo: "WO-P3000-20260504-0011", reason: "LOT 채번 오류", requestedBy: "이민준", requestedAt: "2026-05-04 13:45", approval: "반려" },
];

export default function ProduceCancelPage() {
  return (
    <div className="p-8">
      <PageHeader title="완성 /" accent="취소 결재" nodeRef="SCR-MFG-024" status="PROTOTYPE" description="PRODUCE 취소 결재 — 관리자 승인 후 라벨 무효화" />

      <div className="bg-error/10 border-l-4 border-error p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-error">PRODUCE_REVERSAL — 묶음 LOT 단위 취소 · 라벨 무효화</p>
      </div>

      <FieldHeader title="취소 결재 목록" moduleRef="FR-MFG-035a" />

      <DataTable title="완성 취소 요청" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-3 mt-6 justify-end">
        <button className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-wider">선택 승인</button>
        <button className="border border-error text-error px-6 py-2 text-xs font-label uppercase tracking-wider">반려</button>
      </div>
    </div>
  );
}
