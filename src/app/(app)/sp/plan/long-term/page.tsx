import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const CHART_DATA = [
  { month: "2026-01", plant: "P3000", planned: 820,  confirmed: 810,  achieved: 98.8 },
  { month: "2026-02", plant: "P3000", planned: 760,  confirmed: 740,  achieved: 97.4 },
  { month: "2026-03", plant: "P3000", planned: 900,  confirmed: 900,  achieved: 100 },
  { month: "2026-04", plant: "P3000", planned: 980,  confirmed: 920,  achieved: 93.9 },
  { month: "2026-05", plant: "P3000", planned: 1040, confirmed: 640,  achieved: 61.5 },
  { month: "2026-06", plant: "P3000", planned: 1100, confirmed: 0,    achieved: 0 },
];

const MAX_QTY = Math.max(...CHART_DATA.map((d) => d.planned));

const columns = [
  { key: "month",     label: "월" },
  { key: "plant",     label: "Plant" },
  { key: "planned",   label: "예정 수량" },
  { key: "confirmed", label: "확정 수량" },
  { key: "achievedStr", label: "달성률(%)" },
];

export default function LongTermPlanPage() {
  const tableData = CHART_DATA.map((d) => ({
    ...d,
    achievedStr: d.achieved > 0 ? `${d.achieved}%` : "—",
  }));

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="장기 계획" accent="보드" nodeRef="SCR-SP-020" />

      {/* Bar Chart — CSS only */}
      <section className="bg-surface-container-lowest p-6 mb-8">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent mb-6 -mx-6 -mt-6 px-6 pt-4">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">월별 생산량 (P3000)</h3>
        </div>
        <div className="flex items-end gap-4 h-40">
          {CHART_DATA.map((d) => {
            const plannedH  = Math.round((d.planned  / MAX_QTY) * 144);
            const confirmedH = Math.round((d.confirmed / MAX_QTY) * 144);
            return (
              <div key={d.month} className="flex flex-col items-center gap-1 flex-1">
                <div className="flex items-end gap-1 w-full justify-center" style={{ height: 144 }}>
                  <div
                    className="w-5 bg-surface-container-highest/60 transition-all"
                    style={{ height: plannedH }}
                    title={`예정: ${d.planned}`}
                  />
                  <div
                    className="w-5 bg-primary-accent/80 transition-all"
                    style={{ height: confirmedH }}
                    title={`확정: ${d.confirmed}`}
                  />
                </div>
                <span className="text-xs text-on-surface-variant tabular-nums">{d.month.slice(5)}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-6 mt-4 text-xs text-on-surface-variant">
          <span className="flex items-center gap-2"><span className="inline-block w-4 h-3 bg-surface-container-highest/60" /> 예정</span>
          <span className="flex items-center gap-2"><span className="inline-block w-4 h-3 bg-primary-accent/80" /> 확정</span>
        </div>
      </section>

      <DataTable title="월별 계획 현황" columns={columns} data={tableData} bufferCount={CHART_DATA.length} />
    </main>
  );
}
