import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const kpis = [
  { label: "자재 종수", value: "24", unit: "종" },
  { label: "총 재고량", value: "12,480", unit: "m" },
  { label: "이동 중", value: "3", unit: "건" },
];

const inventoryColumns = [
  { key: "matCode", label: "Material 코드" },
  { key: "matName", label: "자재명" },
  { key: "plant", label: "Plant" },
  { key: "qty", label: "재고량" },
  { key: "unit", label: "단위" },
  { key: "fifo", label: "FIFO 순번" },
  { key: "updated", label: "최종 업데이트" },
];

const inventoryData = [
  { matCode: "M-COIL-A", matName: "열연코일 A", plant: "P3000", qty: "900", unit: "m", fifo: "001", updated: "2026-05-05 08:12" },
  { matCode: "M-COIL-B", matName: "열연코일 B", plant: "P3000", qty: "80", unit: "m", fifo: "002", updated: "2026-05-04 17:30" },
  { matCode: "M-PLATE-01", matName: "강판 6mm", plant: "P3000", qty: "2,400", unit: "kg", fifo: "003", updated: "2026-05-05 09:00" },
  { matCode: "M-PLATE-02", matName: "강판 12mm", plant: "P1000", qty: "1,200", unit: "kg", fifo: "001", updated: "2026-05-03 14:55" },
  { matCode: "M-PIPE-A", matName: "배관 DN50", plant: "P1000", qty: "320", unit: "EA", fifo: "001", updated: "2026-05-05 07:45" },
  { matCode: "M-BOLT-M16", matName: "볼트 M16", plant: "P3000", qty: "5,600", unit: "EA", fifo: "002", updated: "2026-05-02 16:20" },
  { matCode: "M-WELD-02", matName: "용접봉 E7016", plant: "P2000", qty: "450", unit: "kg", fifo: "001", updated: "2026-05-05 08:50" },
  { matCode: "M-PAINT-G", matName: "방청도료 회색", plant: "P2000", qty: "180", unit: "L", fifo: "001", updated: "2026-05-04 11:10" },
];

export default function LOCInventoryPage() {
  return (
    <div>
      <PageHeader
        title="재고 현황"
        accent="재고"
        nodeRef="SCR-LOC-045"
        status="PROTOTYPE"
        description="Plant·자재 카테고리별 실시간 재고 현황을 조회합니다."
      />

      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex gap-2 items-center">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface/50 whitespace-nowrap">Plant</label>
          <select className="bg-surface-elevated border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]">
            <option value="">전체</option>
            <option>P1000</option>
            <option>P2000</option>
            <option>P3000</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface/50 whitespace-nowrap">카테고리</label>
          <select className="bg-surface-elevated border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]">
            <option value="">전체</option>
            <option>COIL</option>
            <option>PLATE</option>
            <option>PIPE</option>
            <option>CONSUMABLE</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] p-5">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-2">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">
              {k.value} <span className="text-sm font-normal text-on-surface/50">{k.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <FieldHeader title="재고 목록" moduleRef="SCR-LOC-045" />
      <DataTable
        title="재고 현황"
        columns={inventoryColumns}
        data={inventoryData}
        bufferCount={inventoryData.length}
      />
    </div>
  );
}
