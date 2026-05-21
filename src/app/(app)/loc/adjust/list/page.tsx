import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "adjId",    label: "보정 ID" },
  { key: "date",     label: "일시" },
  { key: "material", label: "Material" },
  { key: "lot",      label: "Lot" },
  { key: "reason",   label: "사유" },
  { key: "before",   label: "보정 전" },
  { key: "after",    label: "보정 후" },
  { key: "location", label: "위치" },
  { key: "approver", label: "결재자" },
  { key: "status",   label: "상태" },
];

const DATA = [
  { adjId:"ADJ-20260505-003", date:"2026-05-05 10:22", material:"M-COIL-A P3000 900m", lot:"RCV-20260501-0017", reason:"실사차이", before:"950m", after:"900m", location:"Y-P3000-A-01-03", approver:"김공장", status:"완료" },
  { adjId:"ADJ-20260504-002", date:"2026-05-04 14:10", material:"M-BOLT-M16",          lot:"LOT-20260414-022",  reason:"손상",    before:"5,800EA", after:"5,600EA", location:"W-02-01", approver:"이매니저", status:"완료" },
  { adjId:"ADJ-20260502-001", date:"2026-05-02 16:40", material:"M-PAINT-G",           lot:"LOT-20260401-005",  reason:"기타",    before:"200L", after:"180L", location:"W-01-05", approver:"—", status:"결재중" },
];

const KPI = [
  { label: "이번 달",  value: "3건" },
  { label: "결재 대기", value: "1건" },
  { label: "완료",      value: "2건" },
];

export default function AdjustListPage() {
  return (
    <div>
      <PageHeader
        title="보정 이력"
        accent="조정"
        nodeRef="SCR-LOC-041"
        status="PROTOTYPE"
        description="재고 보정 전체 이력 조회 (감사 영구 보존). 결재 대기 건 클릭 → 결재 승인."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">{k.value}</p>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <StatusBadge type="warning" label="결재 대기 1건" />
        </div>
      </div>

      <FieldHeader title="보정 이력 목록" moduleRef="FNC-LOC-063" />
      <DataTable title="보정 이력" columns={COLS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [신규 보정 신청 ▶]
        </button>
        <button className="bg-surface-elevated border border-outline/20 text-on-surface/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-outline/40">
          [엑셀 다운]
        </button>
      </div>
    </div>
  );
}
