import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLUMNS = [
  { key: "lot", label: "LOT" },
  { key: "part", label: "부재" },
  { key: "expectedQty", label: "예정 수량" },
  { key: "arrivedQty", label: "도착 수량" },
  { key: "diff", label: "차이" },
  { key: "inspector", label: "검수자" },
  { key: "inspectedAt", label: "검수일시" },
  { key: "approval", label: "결재" },
];

const DATA = [
  { lot: "PRD-20260506-003", part: "B02-2-G22C-C-088", expectedQty: "2", arrivedQty: "1", diff: "-1", inspector: "박검수", inspectedAt: "2026-05-06 10:50", approval: "대기" },
  { lot: "PRD-20260505-009", part: "B05-1-G22C-C-021", expectedQty: "3", arrivedQty: "3", diff: "0", inspector: "이검수", inspectedAt: "2026-05-05 14:10", approval: "승인" },
  { lot: "RCV-20260501-0017", part: "B01-1-G22C-C-171", expectedQty: "1", arrivedQty: "2", diff: "+1", inspector: "김검수", inspectedAt: "2026-05-04 09:30", approval: "반려" },
];

export default function TransferDiscrepancyPage() {
  return (
    <div className="p-8">
      <PageHeader title="TRANSFER /" accent="도착 검수 불일치" nodeRef="SCR-MFG-032" status="PROTOTYPE" description="입고 검수 시 수량 불일치 결재 — 관리자 확인 필요" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-low p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">결재 대기</p>
          <p className="text-3xl font-headline font-black">1</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">승인</p>
          <p className="text-3xl font-headline font-black text-primary-accent">1</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">반려</p>
          <p className="text-3xl font-headline font-black text-error">1</p>
        </div>
      </div>

      <FieldHeader title="불일치 결재 목록" moduleRef="FNC-MFG-047/048/049" />
      <DataTable title="도착 검수 불일치" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-3 mt-6 justify-end">
        <button className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-wider">승인</button>
        <button className="border border-error text-error px-6 py-2 text-xs font-label uppercase tracking-wider">반려</button>
      </div>
    </div>
  );
}
