import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const kpis = [
  { label: "진행 중 수주", value: "12", unit: "건" },
  { label: "납기 임박 (D-7)", value: "3", unit: "건" },
  { label: "총 수주 금액", value: "48.2", unit: "억" },
];

const recentOrders = [
  { soNo: "SO-2026-0042", customer: "(주)한국철강", due: "2026-05-20", amount: "8.4억", status: "running" as const, statusLabel: "진행중" },
  { soNo: "SO-2026-0041", customer: "대한조선해양", due: "2026-05-15", amount: "6.1억", status: "warning" as const, statusLabel: "납기임박" },
  { soNo: "SO-2026-0040", customer: "현대엔지니어링", due: "2026-05-18", amount: "12.3억", status: "running" as const, statusLabel: "진행중" },
  { soNo: "SO-2026-0039", customer: "GS건설", due: "2026-06-10", amount: "9.7억", status: "idle" as const, statusLabel: "계획중" },
  { soNo: "SO-2026-0038", customer: "삼성중공업", due: "2026-05-12", amount: "11.7억", status: "warning" as const, statusLabel: "납기임박" },
];

export default function SPOrdersPage() {
  return (
    <div>
      <PageHeader
        title="수주 관리"
        accent="수주"
        nodeRef="SCR-SP-001"
        status="PROTOTYPE"
        description="SP 도메인 랜딩 — 수주 현황 요약 및 바로가기."
      />

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

      <div className="flex justify-end mb-4">
        <button className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:bg-[#00912F]/80 transition-colors">
          수주 관리 →
        </button>
      </div>

      <FieldHeader title="최근 수주" moduleRef="SCR-SP-001" />
      <section className="bg-surface-elevated mt-4">
        <div className="p-4 bg-white/5 flex justify-between items-center border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">최근 수주 5건</h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#00912F]">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">수주번호</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">거래처</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">납기</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">금액</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">상태</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {recentOrders.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-[#00912F]">{row.soNo}</td>
                  <td className="px-4 py-3 text-on-surface/80">{row.customer}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/70">{row.due}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/70">{row.amount}</td>
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
