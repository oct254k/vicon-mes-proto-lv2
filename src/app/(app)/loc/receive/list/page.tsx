import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "rcvId",    label: "입고 ID" },
  { key: "poId",     label: "PO 번호" },
  { key: "material", label: "자재" },
  { key: "lot",      label: "Lot No" },
  { key: "qty",      label: "수량(m)" },
  { key: "location", label: "입고 위치" },
  { key: "rcvDate",  label: "입고일" },
  { key: "status",   label: "상태" },
  { key: "qcFlag",   label: "격리" },
];

const DATA = [
  { rcvId:"RCV-20260501-0017", poId:"PO-2026-00417", material:"M-COIL-A P3000 900m", lot:"RCV-20260501-0017", qty:"900",   location:"Y-P3000-A-01-03", rcvDate:"2026-05-01", status:"완료", qcFlag:"없음" },
  { rcvId:"RCV-20260501-0018", poId:"PO-2026-00417", material:"M-COIL-A P3000 900m", lot:"RCV-20260501-0018", qty:"820",   location:"Y-P3000-A-01-02", rcvDate:"2026-05-01", status:"완료", qcFlag:"없음" },
  { rcvId:"RCV-20260503-0011", poId:"PO-2026-00381", material:"M-COIL-C",            lot:"RCV-20260503-0011", qty:"4,200", location:"Y-P3000-A-02-01", rcvDate:"2026-05-03", status:"완료", qcFlag:"없음" },
  { rcvId:"RCV-20260504-0021", poId:"PO-2026-00420", material:"M-COIL-B",            lot:"RCV-20260504-0021", qty:"1,800", location:"Y-P3000-A-01-05", rcvDate:"2026-05-04", status:"검수중", qcFlag:"있음" },
  { rcvId:"RCV-20260505-0003", poId:"PO-2026-00431", material:"M-PLATE-01",          lot:"RCV-20260505-0003", qty:"2,200", location:"Y-P3000-C-02-03", rcvDate:"2026-05-05", status:"완료", qcFlag:"없음" },
];

const KPI = [
  { label: "오늘 입고",  value: "2건" },
  { label: "이번주",     value: "5건" },
  { label: "격리 대기",  value: "1건" },
];

export default function ReceiveListPage() {
  return (
    <div>
      <PageHeader
        title="입고 목록"
        accent="입고"
        nodeRef="SCR-LOC-022"
        status="PROTOTYPE"
        description="입고 이력 전체 조회 및 검수·격리 현황. 행 선택 후 검수 진입 가능."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">{k.value}</p>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <StatusBadge type="warning" label="격리 1건" />
        </div>
      </div>

      <FieldHeader title="입고 이력" moduleRef="FNC-LOC-036" />
      <DataTable title="입고 목록" columns={COLS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [신규 입고 ▶]
        </button>
        <button className="bg-surface-elevated border border-outline/20 text-on-surface/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-outline/40">
          [검수 ▶]
        </button>
        <button className="bg-surface-elevated border border-outline/20 text-on-surface/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-outline/40">
          [엑셀 다운]
        </button>
      </div>
    </div>
  );
}
