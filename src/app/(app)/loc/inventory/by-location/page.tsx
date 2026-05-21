import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const COLS = [
  { key: "locId",    label: "위치 ID" },
  { key: "yard",     label: "Yard" },
  { key: "zone",     label: "Zone" },
  { key: "material", label: "자재" },
  { key: "lot",      label: "Lot No" },
  { key: "qty",      label: "수량(m)" },
  { key: "loadPct",  label: "점유율" },
  { key: "fifoSeq",  label: "FIFO 순번" },
  { key: "status",   label: "위치 상태" },
];

const DATA = [
  { locId:"Y-P3000-A-01-01", yard:"Y-RAW", zone:"A-01", material:"—",                       lot:"—",                    qty:"0",     loadPct:"0%",   fifoSeq:"—",    status:"EMPTY" },
  { locId:"Y-P3000-A-01-02", yard:"Y-RAW", zone:"A-01", material:"M-COIL-A P3000 900m",     lot:"RCV-20260501-0017",     qty:"900",   loadPct:"18%",  fifoSeq:"4521", status:"OCCUPIED" },
  { locId:"Y-P3000-A-01-03", yard:"Y-RAW", zone:"A-01", material:"M-COIL-A",                lot:"RCV-20260503-0011",     qty:"5,000", loadPct:"100%", fifoSeq:"4500", status:"FULL" },
  { locId:"Y-P3000-A-02-01", yard:"Y-RAW", zone:"A-02", material:"M-COIL-C",                lot:"RCV-20260502-0009",     qty:"4,200", loadPct:"84%",  fifoSeq:"4450", status:"OCCUPIED" },
  { locId:"Y-P3000-A-02-03", yard:"Y-RAW", zone:"A-02", material:"M-COIL-A",                lot:"LOT-20260420-007",      qty:"2,800", loadPct:"56%",  fifoSeq:"4300", status:"AGING" },
  { locId:"Y-P3000-B-01-01", yard:"Y-IN",  zone:"B-01", material:"M-COIL-B",                lot:"RCV-20260504-0021",     qty:"1,800", loadPct:"60%",  fifoSeq:"4522", status:"OCCUPIED" },
];

const KPI = [
  { label: "적재 위치",  value: "30/38" },
  { label: "빈 위치",    value: "8개" },
  { label: "AGING 위치", value: "2개" },
];

export default function InventoryByLocationPage() {
  return (
    <div>
      <PageHeader
        title="위치별 재고"
        accent="재고"
        nodeRef="SCR-LOC-060"
        status="PROTOTYPE"
        description="위치 4단계 어느 레벨에서든 조회 가능. 위치 ID 기준 재고·Lot·FIFO 현황."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        {[["Yard","Y-RAW"],["Zone","전체"],["상태","전체"]].map(([lbl, val]) => (
          <div key={lbl} className="flex items-center gap-2">
            <label className="text-xs font-label uppercase tracking-widest text-on-surface/40">{lbl}</label>
            <select defaultValue={val} className="bg-surface border border-outline/20 px-3 py-2 text-xs font-label text-on-surface focus:outline-none focus:border-[#00912F]">
              <option>전체</option><option>{val}</option>
            </select>
          </div>
        ))}
      </div>

      <FieldHeader title="위치별 재고 목록" moduleRef="FNC-LOC-090" />
      <DataTable title="위치별 재고" columns={COLS} data={DATA} bufferCount={DATA.length} />
    </div>
  );
}
