import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const KPI = [
  { label: "실행 일시",          value: "2026-05-06 09:50:12" },
  { label: "소요 Material 종수", value: "47" },
  { label: "부족 항목 수",       value: "3" },
];

// WO-P3000-20260506-0007/0008 발행 직후 MRP 실행 결과
// M-COIL-B: 이번 WO 소요 120m + 내일 예정 WO 소요 200m = 총 320m, 현재고 80m → 240m 부족
const MATERIALS = [
  { material: "M-COIL-A",   required: "812 m",    stock: "900 m",   shortage: "—",        unit: "m",  note:"당일 WO 충당" },
  { material: "M-COIL-B",   required: "320 m",    stock: "80 m",    shortage: "▲ 240 m",  unit: "m",  note:"⚠ 내일 WO 포함 부족" },
  { material: "M-PLATE-01", required: "580 kg",   stock: "2,400 kg",shortage: "—",        unit: "kg", note:"" },
  { material: "M-BOLT-M16", required: "4,800 EA", stock: "5,600 EA",shortage: "—",        unit: "EA", note:"" },
  { material: "M-COIL-C",   required: "260 m",    stock: "180 m",   shortage: "▲ 80 m",   unit: "m",  note:"⚠ 차주 WO 부족" },
  { material: "M-PLATE-02", required: "240 m",    stock: "1,200 kg",shortage: "—",        unit: "kg", note:"" },
  { material: "M-NUT-M16",  required: "4,800 EA", stock: "6,200 EA",shortage: "—",        unit: "EA", note:"" },
];

const columns = [
  { key: "material", label: "Material" },
  { key: "required", label: "소요량" },
  { key: "stock",    label: "재고" },
  { key: "shortage", label: "부족량",  className: "text-warning font-bold" },
  { key: "unit",     label: "단위" },
];

export default function MrpResultPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="MRP" accent="결과 상세" nodeRef="SCR-SP-030" />

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {KPI.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{k.label}</p>
            <p className="text-2xl font-headline font-black tabular-nums">{k.value}</p>
          </div>
        ))}
      </div>

      <DataTable
        title="소요 Material 목록"
        columns={columns}
        data={MATERIALS.map((m) => ({
          ...m,
          shortage: m.shortage !== "—"
            ? m.shortage
            : m.shortage,
        }))}
        bufferCount={MATERIALS.length}
      />

      <p className="text-xs text-on-surface-variant mt-4 px-1">
        * 부족 항목 → 구매팀 PR 수동 등록 필요 (FR-PUR-003 MUST, 자동 PO 절대 금지). MRP Run: #20260506-0012
      </p>
    </main>
  );
}
