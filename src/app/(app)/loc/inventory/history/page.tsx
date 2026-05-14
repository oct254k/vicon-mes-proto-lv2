import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const COLS = [
  { key: "txId",     label: "TX ID" },
  { key: "txType",   label: "TX 유형" },
  { key: "lot",      label: "Lot No" },
  { key: "material", label: "자재" },
  { key: "qty",      label: "수량" },
  { key: "before",   label: "이전 위치" },
  { key: "after",    label: "이후 위치" },
  { key: "user",     label: "처리자" },
  { key: "ts",       label: "일시" },
];

const TX_TYPES: Record<string, string> = {
  RECEIVE:   "bg-[#00912F]/20 text-[#00912F]",
  TRANSFER:  "bg-[#3b82f6]/20 text-[#3b82f6]",
  ADJUST:    "bg-warning/20 text-warning",
  SCRAP:     "bg-danger/20 text-danger",
  MOVE:      "bg-[#8b5cf6]/20 text-[#8b5cf6]",
};

const DATA = [
  { txId:"TX-20260505-0041", txType:"RECEIVE",  lot:"RCV-20260501-0017", material:"M-COIL-A P3000 900m", qty:"+900m",   before:"—",                  after:"Y-P3000-A-01-02", user:"박창고", ts:"2026-05-05 08:12" },
  { txId:"TX-20260505-0038", txType:"TRANSFER", lot:"RCV-20260501-0017", material:"M-COIL-A P3000 900m", qty:"900m",    before:"Y-P3000-A-01-03",     after:"IN-TRANSIT",      user:"김창고", ts:"2026-05-05 07:50" },
  { txId:"TX-20260504-0035", txType:"ADJUST",   lot:"RCV-20260501-0017", material:"M-COIL-A P3000 900m", qty:"-50m",    before:"Y-P3000-A-01-03",     after:"Y-P3000-A-01-03", user:"이매니저",ts:"2026-05-04 14:22" },
  { txId:"TX-20260503-0029", txType:"MOVE",     lot:"RCV-20260503-0011", material:"M-COIL-C",            qty:"4,200m",  before:"Y-P3000-A-01-04",     after:"Y-P3000-A-02-01", user:"박창고", ts:"2026-05-03 10:05" },
  { txId:"TX-20260502-0022", txType:"SCRAP",    lot:"LOT-20260410-011",  material:"M-PLATE-01",          qty:"-200kg",  before:"Y-P3000-C-02-01",     after:"Y-P3000-DEFECT",  user:"김검수", ts:"2026-05-02 16:40" },
];

export default function InventoryHistoryPage() {
  return (
    <div>
      <PageHeader
        title="재고 트랜잭션 이력"
        accent="HISTORY"
        nodeRef="SCR-LOC-062"
        status="PROTOTYPE"
        description="inventory_transaction 전체 이력 조회 (감사 영구 보존). TX 유형별 색상 구분."
      />

      <div className="flex gap-3 mb-6 flex-wrap">
        {["전체", ...Object.keys(TX_TYPES)].map(t => (
          <button key={t} className={`px-3 py-1.5 text-xs font-label uppercase tracking-widest border transition-colors ${
            t === "전체" ? "border-[#00912F] text-[#00912F]" : "border-outline/20 text-on-surface/40 hover:border-outline/40"}`}>
            {t}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <input type="date" defaultValue="2026-05-01" className="bg-surface border border-outline/20 px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-[#00912F]" />
          <span className="text-on-surface/30 text-xs">~</span>
          <input type="date" defaultValue="2026-05-05" className="bg-surface border border-outline/20 px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-[#00912F]" />
        </div>
      </div>

      <FieldHeader title="트랜잭션 이력" moduleRef="FNC-LOC-092" />
      <DataTable title="TX 이력" columns={COLS} data={DATA.map(d => ({
        ...d,
        txType: d.txType,
      }))} bufferCount={DATA.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-surface-elevated border border-outline/20 text-on-surface/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-outline/40">
          [엑셀 다운]
        </button>
      </div>
    </div>
  );
}
