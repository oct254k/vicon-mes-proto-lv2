import { PageHeader } from "@/components/ui/PageHeader";

const ROWS = [
  { soId: "SO-2026-0042", member: "B01-1-G22C-C-171", total: 240, w18: 60, w19: 80, w20: 60, w21: 40, done: 60 },
  { soId: "SO-2026-0042", member: "B01-1-G22C-S-172", total: 80,  w18: 20, w19: 20, w20: 20, w21: 20, done: 20 },
  { soId: "SO-2026-0041", member: "B02-1-T18B-C-101", total: 160, w18: 40, w19: 40, w20: 40, w21: 40, done: 40 },
  { soId: "SO-2026-0041", member: "B02-1-T18B-S-102", total: 40,  w18: 10, w19: 10, w20: 10, w21: 10, done: 10 },
  { soId: "SO-2026-0040", member: "B03-1-G22C-C-301", total: 280, w18: 70, w19: 70, w20: 70, w21: 70, done: 0 },
  { soId: "SO-2026-0040", member: "B03-1-G22C-H-302", total: 56,  w18: 14, w19: 14, w20: 14, w21: 14, done: 0 },
];

const WEEKS = ["W18", "W19", "W20", "W21"];

function BarCell({ plan, done, total }: { plan: number; done: number; total: number }) {
  const planPct = total > 0 ? Math.round((plan / total) * 100) : 0;
  const donePct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <td className="px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="tabular-nums text-xs w-6 opacity-70">{plan}</span>
        <div className="flex-1 h-2 bg-surface-container relative" style={{ minWidth: "60px" }}>
          <div className="absolute inset-y-0 left-0 bg-primary-accent/30" style={{ width: `${planPct}%` }} />
          <div className="absolute inset-y-0 left-0 bg-primary-accent" style={{ width: `${donePct}%` }} />
        </div>
      </div>
    </td>
  );
}

export default function MidTermPlanPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader
        title="중기 계획"
        accent="보드"
        nodeRef="SCR-SP-021"
        description="주차별 생산 계획 DataTable + CSS 바 차트 (연두 = 계획, 진녹 = 완료)"
      />

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            주차별 생산 계획 <span className="opacity-30 font-light ml-2">2026-W18 ~ W21</span>
          </h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">수주</th>
              <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">부재 코드</th>
              <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">총계</th>
              {WEEKS.map((w) => (
                <th key={w} className="px-3 py-2 font-label uppercase tracking-widest text-xs opacity-50">{w}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r, i) => (
              <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.soId}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.member}</td>
                <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.total}</td>
                <BarCell plan={r.w18} done={r.soId === "SO-2026-0042" || r.soId === "SO-2026-0041" ? r.w18 : 0} total={r.total} />
                <BarCell plan={r.w19} done={0} total={r.total} />
                <BarCell plan={r.w20} done={0} total={r.total} />
                <BarCell plan={r.w21} done={0} total={r.total} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-4 text-xs font-label opacity-50">
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-2 bg-primary-accent/30" /> 계획</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-2 bg-primary-accent" /> 완료</span>
      </div>
    </main>
  );
}
