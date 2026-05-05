import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLUMNS = [
  { key: "eq", label: "설비" },
  { key: "lot", label: "생산 LOT" },
  { key: "part", label: "부재" },
  { key: "autoQty", label: "자동 실적" },
  { key: "corrQty", label: "보정 실적" },
  { key: "diff", label: "차이" },
  { key: "corrBy", label: "보정자" },
  { key: "corrAt", label: "보정일시" },
  { key: "status", label: "상태" },
];

const DATA = [
  { eq: "EQ-WLD-001", lot: "PRD-20260506-001", part: "B01-1-G22C-C-171", autoQty: "1", corrQty: "1", diff: "0", corrBy: "—", corrAt: "—", status: "정상" },
  { eq: "EQ-WLD-002", lot: "PRD-20260506-003", part: "B02-2-G22C-C-088", autoQty: "3", corrQty: "2", diff: "-1", corrBy: "김관리", corrAt: "2026-05-06 10:11", status: "보정됨" },
  { eq: "EQ-CUT-001", lot: "PRD-20260505-008", part: "B03-1-G22C-C-054", autoQty: "0", corrQty: "3", diff: "+3", corrBy: "박영희", corrAt: "2026-05-05 15:40", status: "보정됨" },
];

export default function ProduceAutoPage() {
  return (
    <div className="p-8">
      <PageHeader title="PRODUCE /" accent="자동 보정" nodeRef="SCR-MFG-022" status="PROTOTYPE" description="설비 자동 PRODUCE 실적 vs 수동 보정 이력" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-container-low p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">보정 건수 (금일)</p>
          <p className="text-3xl font-headline font-black">2</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">정상 자동 처리</p>
          <p className="text-3xl font-headline font-black">1</p>
        </div>
      </div>

      <FieldHeader title="자동 PRODUCE 보정 목록" moduleRef="FNC-MFG-028/029" />
      <DataTable title="설비 자동 실적 보정" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />
    </div>
  );
}
