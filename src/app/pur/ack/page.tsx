import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ACK_DATA = [
  { po: "PO-2026-0041", supplier: "(주)한국강재", ackType: "ACCEPTED", ackAt: "2026-05-05 10:22" },
  { po: "PO-2026-0042", supplier: "동양특수강", ackType: "PARTIAL", ackAt: "2026-05-05 14:08" },
  { po: "PO-2026-0043", supplier: "신흥금속(주)", ackType: "REJECTED", ackAt: "2026-05-06 09:15" },
  { po: "PO-2026-0044", supplier: "(주)한국강재", ackType: "COUNTER", ackAt: "2026-05-06 11:30" },
  { po: "PO-2026-0039", supplier: "삼양스틸", ackType: "ACCEPTED", ackAt: "2026-05-04 16:45" },
  { po: "PO-2026-0038", supplier: "동양특수강", ackType: "REJECTED", ackAt: "2026-05-03 10:00" },
];

const ACK_STATUS: Record<string, { type: "running" | "warning" | "stopped" | "idle"; label: string }> = {
  ACCEPTED: { type: "running", label: "ACCEPTED" },
  PARTIAL:  { type: "warning", label: "PARTIAL" },
  REJECTED: { type: "stopped", label: "REJECTED" },
  COUNTER:  { type: "warning", label: "COUNTER" },
};

export default function PURAckPage() {
  return (
    <div>
      <PageHeader
        title="공급사 답신"
        accent="ACK"
        nodeRef="SCR-PUR-011"
        status="PROTOTYPE"
        description="발주 납기 확인 인박스 · 공급사 답신 처리"
      />

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "ACCEPTED", count: 2, color: "border-primary-accent" },
          { label: "PARTIAL", count: 1, color: "border-[#f59e0b]" },
          { label: "REJECTED", count: 2, color: "border-error" },
          { label: "COUNTER", count: 1, color: "border-outline-variant/40" },
        ].map((kpi) => (
          <div key={kpi.label} className={`bg-surface-container-low p-4 border-l-4 ${kpi.color}`}>
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{kpi.label}</p>
            <p className="text-2xl font-headline font-black">{kpi.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            답신 인박스
            <span className="opacity-30 font-light ml-2">| Buffer: 006 Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">PO 번호</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">공급사</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">답신 유형</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">답신 일시</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">액션</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {ACK_DATA.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-outline-variant/5 transition-colors ${
                    row.ackType === "REJECTED"
                      ? "bg-error/5 hover:bg-error/10"
                      : "hover:bg-surface-container-highest/20"
                  }`}
                >
                  <td className="px-4 py-2 font-mono text-xs">{row.po}</td>
                  <td className="px-4 py-2">{row.supplier}</td>
                  <td className="px-4 py-2">
                    <StatusBadge
                      type={ACK_STATUS[row.ackType]?.type ?? "idle"}
                      label={ACK_STATUS[row.ackType]?.label ?? row.ackType}
                    />
                  </td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-70">{row.ackAt}</td>
                  <td className="px-4 py-2">
                    <button className="px-3 py-1 text-xs font-label uppercase tracking-widest bg-surface-container hover:bg-primary-accent hover:text-white transition-colors border border-outline-variant/20">
                      상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
