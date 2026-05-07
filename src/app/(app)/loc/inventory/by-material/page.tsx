import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const COLS = [
  { key: "matCode",  label: "Material 코드" },
  { key: "matName",  label: "자재명" },
  { key: "plant",    label: "Plant" },
  { key: "qty",      label: "재고량" },
  { key: "unit",     label: "단위" },
  { key: "fifoSeq",  label: "FIFO 최선순" },
  { key: "minStock", label: "최소재고" },
  { key: "status",   label: "상태" },
  { key: "updated",  label: "최종 업데이트" },
];

const DATA = [
  { matCode:"M-COIL-A", matName:"열연코일 A / P3000 900m", plant:"P3000", qty:"900",   unit:"m",  fifoSeq:"4521", minStock:"500",  status:"정상", updated:"2026-05-01 08:12" },
  { matCode:"M-COIL-B", matName:"열연코일 B",               plant:"P3000", qty:"80",    unit:"m",  fifoSeq:"4522", minStock:"200",  status:"부족", updated:"2026-05-04 17:30" },
  { matCode:"M-COIL-C", matName:"열연코일 C",               plant:"P3000", qty:"4,200", unit:"m",  fifoSeq:"4500", minStock:"300",  status:"정상", updated:"2026-05-02 09:00" },
  { matCode:"M-PLATE-01",matName:"강판 6mm",                plant:"P3000", qty:"2,400", unit:"kg", fifoSeq:"3100", minStock:"1000", status:"정상", updated:"2026-05-05 09:00" },
  { matCode:"M-PLATE-02",matName:"강판 12mm",               plant:"P1000", qty:"1,200", unit:"kg", fifoSeq:"3080", minStock:"800",  status:"정상", updated:"2026-05-03 14:55" },
  { matCode:"M-BOLT-M16",matName:"볼트 M16",                plant:"P3000", qty:"5,600", unit:"EA", fifoSeq:"2200", minStock:"3000", status:"정상", updated:"2026-05-02 16:20" },
];

const KPI = [
  { label: "자재 종수",  value: "24종" },
  { label: "부족 경보",  value: "1종" },
  { label: "총 재고량",  value: "12,480m" },
];

export default function InventoryByMaterialPage() {
  return (
    <div>
      <PageHeader
        title="자재별 재고"
        accent="INVENTORY"
        nodeRef="SCR-LOC-061"
        status="PROTOTYPE"
        description="(Material × Plant) 가용 재고 현황 조회. FIFO 최선순 표시. 최소 재고 미만 경보."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-[#1a1a1a] border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-white/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-white">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        {[["Plant","P3000"],["카테고리","COIL"]].map(([lbl, val]) => (
          <div key={lbl} className="flex items-center gap-2">
            <label className="text-xs font-label uppercase tracking-widest text-white/40">{lbl}</label>
            <select defaultValue={val} className="bg-[#131313] border border-white/10 px-3 py-2 text-xs font-label text-white focus:outline-none focus:border-[#00912F]">
              <option>전체</option><option>{val}</option>
            </select>
          </div>
        ))}
      </div>

      <FieldHeader title="자재별 재고 목록" moduleRef="FNC-LOC-091" />
      <DataTable title="자재별 재고" columns={COLS} data={DATA} bufferCount={DATA.length} />
    </div>
  );
}
