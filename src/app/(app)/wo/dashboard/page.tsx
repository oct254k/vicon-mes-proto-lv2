import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const kpis = [
  { label: "오늘 발행 WO", value: "12", unit: "건" },
  { label: "진행 중 WO", value: "7", unit: "건" },
  { label: "완료 WO", value: "38", unit: "건" },
  { label: "패킹 대기", value: "4", unit: "건" },
];

const woData = [
  { id: "WO-P3000-20260506-0007", done: 9,  total: 12, pct: 75,  due: "2026-05-08", status: "running" as const, statusLabel: "진행중" },
  { id: "WO-P3000-20260506-0008", done: 5,  total: 12, pct: 42,  due: "2026-05-08", status: "running" as const, statusLabel: "진행중" },
  { id: "WO-P3000-20260506-0005", done: 6,  total: 20, pct: 30,  due: "2026-05-09", status: "warning" as const, statusLabel: "미달" },
  { id: "WO-P3000-20260506-0006", done: 3,  total: 18, pct: 17,  due: "2026-05-09", status: "warning" as const, statusLabel: "미달" },
  { id: "WO-P3000-20260505-0002", done: 8,  total: 8,  pct: 100, due: "2026-05-07", status: "running" as const, statusLabel: "완료" },
];

export default function WODashboardPage() {
  return (
    <div>
      <PageHeader
        title="WO·패킹 진척"
        accent="대시보드"
        nodeRef="SCR-WO-050"
        status="PROTOTYPE"
        description="작업지시 발행·진행·완료 현황 및 패킹 대기 수량을 한눈에 확인합니다."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] p-5">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-2">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">
              {k.value} <span className="text-sm font-normal text-on-surface/50">{k.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <FieldHeader title="WO 진척 현황" moduleRef="SCR-WO-050" />
      <section className="bg-surface-elevated mt-4">
        <div className="p-4 bg-white/5 flex justify-between items-center border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">WO 목록</h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#00912F]">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline/10">
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">WO ID</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">완료/전체</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">진척률</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">납기</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">상태</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {woData.map((row) => (
                <tr key={row.id} className="border-b border-outline/10 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-[#00912F]">{row.id}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/70">{row.done}/{row.total}</td>
                  <td className="px-4 py-3 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 h-2">
                        <div
                          className="h-2 bg-[#00912F]"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-on-surface/50 tabular-nums w-8 text-right">{row.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/70">{row.due}</td>
                  <td className="px-4 py-3">
                    <StatusBadge type={row.status} label={row.statusLabel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
