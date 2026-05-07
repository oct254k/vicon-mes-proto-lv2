import { PageHeader } from "@/components/ui/PageHeader";

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const monthlyOEE = [82, 84, 83, 85, 86, 87, 85, 88, 87, 89, 88, 87];

const lossBreakdown = [
  { category: "Unplanned Stop ≥60min", ratio: 35 },
  { category: "Changeover", ratio: 22 },
  { category: "Planned Stop", ratio: 18 },
  { category: "Predictive Stop", ratio: 12 },
  { category: "Quality Loss", ratio: 8 },
  { category: "Performance Loss", ratio: 5 },
];

export default function OeeHistoryPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="OEE"
        accent="추이 이력"
        nodeRef="IA-EQ-OEE-TREND"
        description="SCR-EQ-082 — 월별 OEE 추이 + 손실 분해"
      />

      {/* 월별 OEE 트렌드 */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest border-l-4 border-primary-accent pl-3">
            월별 OEE 추이 — EQ-P3000-CUT-01
          </h3>
          <span className="text-xs font-label opacity-40 tabular-nums">목표 85%</span>
        </div>

        <div className="flex items-end gap-2 h-32 relative">
          {/* 목표선 85% */}
          <div
            className="absolute left-0 right-0 border-t border-primary-accent/30"
            style={{ top: `${100 - 85}%` }}
          />
          {monthlyOEE.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
              <span className="text-xs text-primary-accent font-label">{v}%</span>
              <div
                className="w-full bg-primary-accent/60 transition-all duration-300"
                style={{ height: `${v}%` }}
              />
              <span className="text-xs opacity-40 font-label">{months[i]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 손실 사유 분해 Pareto */}
      <section className="bg-surface-container-lowest p-6">
        <h3 className="font-headline font-black text-sm uppercase tracking-widest border-l-4 border-primary-accent pl-3 mb-4">
          손실 사유 분해 (Pareto)
        </h3>
        <div className="flex flex-col gap-3">
          {lossBreakdown.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <span className="text-xs font-label opacity-70 w-44 shrink-0">{item.category}</span>
              <div className="flex-1 h-4 bg-surface-container-highest">
                <div
                  className="h-4 bg-primary-accent/70"
                  style={{ width: `${item.ratio}%` }}
                />
              </div>
              <span className="text-xs font-label tabular-nums w-8 text-right opacity-70">{item.ratio}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
