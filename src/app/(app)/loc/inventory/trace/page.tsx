import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const FIFO_COLS = [
  { key: "fifoSeq",  label: "FIFO 순번" },
  { key: "lot",      label: "Lot No" },
  { key: "material", label: "자재" },
  { key: "rcvDate",  label: "입고일" },
  { key: "qty",      label: "잔량(m)" },
  { key: "location", label: "현재 위치" },
  { key: "age",      label: "보관일" },
  { key: "status",   label: "상태" },
];

const FIFO_DATA = [
  { fifoSeq:"4300", lot:"LOT-20260420-007",  material:"M-COIL-A", rcvDate:"2026-04-20", qty:"2,800", location:"Y-P3000-A-02-03", age:"16일", status:"AGING" },
  { fifoSeq:"4450", lot:"RCV-20260430-0033", material:"M-COIL-A", rcvDate:"2026-04-30", qty:"5,000", location:"Y-P3000-A-02-02", age:"6일",  status:"FULL" },
  { fifoSeq:"4500", lot:"RCV-20260503-0011", material:"M-COIL-A", rcvDate:"2026-05-03", qty:"5,000", location:"Y-P3000-A-01-03", age:"3일",  status:"FULL" },
  { fifoSeq:"4521", lot:"RCV-20260501-0017", material:"M-COIL-A P3000 900m", rcvDate:"2026-05-01", qty:"900", location:"Y-P3000-A-01-02", age:"5일", status:"OCCUPIED" },
  { fifoSeq:"4522", lot:"RCV-20260501-0018", material:"M-COIL-A P3000 900m", rcvDate:"2026-05-01", qty:"820", location:"Y-P3000-A-01-05", age:"5일", status:"OCCUPIED" },
];

export default function InventoryTracePage() {
  return (
    <div>
      <PageHeader
        title="FIFO 추적"
        accent="TRACE"
        nodeRef="SCR-LOC-061"
        status="PROTOTYPE"
        description="FIFO 강제 — fifo_seq 기준 오래된 자재 우선 출고 추적. AGING 위치 경보."
      />

      <div className="bg-[#166534]/10 border border-[#166534]/30 px-5 py-3 mb-6 flex items-center justify-between">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-[#166534] mb-1">⚠ AGING 경보</p>
          <p className="text-on-surface/60 text-sm">LOT-20260420-007 / M-COIL-A — 16일 보관 초과 (임계: 14일)</p>
        </div>
        <StatusBadge type="warning" label="AGING" />
      </div>

      <div className="flex gap-3 mb-6">
        <input defaultValue="M-COIL-A" className="bg-surface border border-outline/20 px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-[#00912F] w-48" placeholder="자재 코드" />
        <select className="bg-surface border border-outline/20 px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-[#00912F]">
          <option>P3000</option><option>P1000</option><option>P2000</option>
        </select>
        <button className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-4 py-2 text-xs hover:opacity-90">조회</button>
      </div>

      <FieldHeader title="FIFO 순서 목록 — M-COIL-A / P3000" moduleRef="FNC-LOC-035" />
      <p className="text-xs font-label text-on-surface/40 mb-3 uppercase tracking-widest">출고 권장 순서: ① fifo_seq 4300 → ② 4450 → ③ 4500 → ...</p>
      <DataTable title="FIFO 추적" columns={FIFO_COLS} data={FIFO_DATA} bufferCount={FIFO_DATA.length} />

      <div className="bg-surface-elevated border-l-4 border-[#00912F] p-4 mt-4 text-xs font-label">
        <p className="uppercase tracking-widest text-on-surface/40 mb-2">출고 권장 — 다음 소모 Lot</p>
        <p className="text-on-surface"><span className="text-[#00912F] font-bold">①</span> LOT-20260420-007 (seq 4300) — 2,800m @ Y-P3000-A-02-03 <span className="text-[#166534]">AGING ⚠</span></p>
      </div>
    </div>
  );
}
