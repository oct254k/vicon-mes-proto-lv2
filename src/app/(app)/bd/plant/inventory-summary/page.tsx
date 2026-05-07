import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const AS_OF = "2026-05-05 09:00";

const KPI = [
  { plant: "P1000", label: "제1 이천공장", materials: 82, totalQty: "1,240m", transactions: 317 },
  { plant: "P2000", label: "제2 이천공장", materials: 74, totalQty: "960m", transactions: 248 },
  { plant: "P3000", label: "제3 이천공장 (데크)", materials: 91, totalQty: "1,580m", transactions: 401 },
];

const SUMMARY = [
  { material: "M-COIL-A", uom: "m", P1000: 300, P2000: 100, P3000: 500, total: 900, shortage: false },
  { material: "M-COIL-B", uom: "m", P1000: 20, P2000: 40, P3000: 20, total: 80, shortage: true },
  { material: "M-PLATE-SS400", uom: "ea", P1000: 120, P2000: 60, P3000: 200, total: 380, shortage: false },
  { material: "M-WIRE-12", uom: "kg", P1000: 540, P2000: 210, P3000: 330, total: 1080, shortage: false },
  { material: "M-COIL-HDG", uom: "m", P1000: 15, P2000: 8, P3000: 12, total: 35, shortage: true },
];

export default function PlantInventorySummaryPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="전사 재고 집계"
        nodeRef="SCR-BD-002"
        description="Plant × Material 재고 현황 — 매 조회 시 재집계 (FNC-BD-005, 영속화 X)"
      />

      {/* 기준시각 */}
      <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-6">
        기준시각: {AS_OF} · 자동갱신 60s
      </p>

      {/* KPI 카드 */}
      <FieldHeader title="Plant KPI" moduleRef="FNC-BD-005" />
      <div className="grid grid-cols-3 gap-4 mb-10">
        {KPI.map((k) => (
          <div key={k.plant} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-3">
              {k.plant} · {k.label}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-3xl font-black tabular-nums text-primary-accent">{k.materials}</p>
                <p className="text-xs text-on-surface/40 font-label uppercase tracking-wider mt-1">Material 종수</p>
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums text-primary-accent">{k.totalQty}</p>
                <p className="text-xs text-on-surface/40 font-label uppercase tracking-wider mt-1">재고량</p>
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums text-primary-accent">{k.transactions}</p>
                <p className="text-xs text-on-surface/40 font-label uppercase tracking-wider mt-1">트랜잭션</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plant × Material 매트릭스 */}
      <FieldHeader title="Plant × Material 집계 매트릭스" moduleRef="FNC-BD-005" />
      <section className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">재고 집계</h3>
          <span className="text-xs text-on-surface/40 font-label">영속화 X — 매 조회 재집계</span>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["Material", "UOM", "P1000", "P2000", "P3000", "합계"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {SUMMARY.map((row) => (
              <tr
                key={row.material}
                className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors ${row.shortage ? "text-[#f59e0b]" : ""}`}
              >
                <td className="px-4 py-2 tabular-nums font-black">
                  {row.material} {row.shortage && "⚠"}
                </td>
                <td className="px-4 py-2 opacity-50">{row.uom}</td>
                <td className="px-4 py-2 tabular-nums">{row.P1000}</td>
                <td className="px-4 py-2 tabular-nums">{row.P2000}</td>
                <td className="px-4 py-2 tabular-nums">{row.P3000}</td>
                <td className="px-4 py-2 tabular-nums font-black">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="text-xs text-on-surface/30 font-label mt-4">
        ⓘ 본 View 는 영속 X — 매 조회 시 inventory_balance 재집계 (FNC-BD-005, A6)
      </p>
    </div>
  );
}
