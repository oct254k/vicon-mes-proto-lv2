import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const KPI = [
  { label: "실행 일시",       value: "2026-05-05 09:45:31" },
  { label: "소요 Material 종수", value: "47" },
  { label: "부족 항목 수",     value: "3" },
];

const MATERIALS = [
  { material: "M-COIL-A",  required: "1,200 m",  stock: "2,100 m", shortage: "—",      unit: "m" },
  { material: "M-COIL-B",  required: "320 m",    stock: "280 m",   shortage: "▲ 40 m", unit: "m" },
  { material: "M-PLATE-C", required: "580 kg",   stock: "1,200 kg",shortage: "—",      unit: "kg" },
  { material: "M-BOLT-D",  required: "4,800 EA", stock: "3,200 EA",shortage: "▲ 1,600 EA", unit: "EA" },
  { material: "M-NUT-E",   required: "4,800 EA", stock: "5,000 EA",shortage: "—",      unit: "EA" },
  { material: "M-PIPE-F",  required: "240 m",    stock: "180 m",   shortage: "▲ 60 m", unit: "m" },
  { material: "M-BEAM-G",  required: "960 kg",   stock: "1,400 kg",shortage: "—",      unit: "kg" },
];

const columns = [
  { key: "material", label: "Material" },
  { key: "required", label: "소요량" },
  { key: "stock",    label: "재고" },
  { key: "shortage", label: "부족량",  className: "text-[#f59e0b] font-bold" },
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
        * 부족 항목은 PR 자동 생성 대상입니다. MRP Run: #20260505-0011
      </p>
    </main>
  );
}
