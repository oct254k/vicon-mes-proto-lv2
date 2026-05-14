import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MATCHING_DATA = [
  { po: "PO-2026-0039", invoice: "INV-2026-0051", receipt: "REC-2026-0041", matchStatus: "MATCHED", exceptionReason: "" },
  { po: "PO-2026-0040", invoice: "INV-2026-0052", receipt: "REC-2026-0042", matchStatus: "EXCEPTION", exceptionReason: "수량 불일치 (-3ea)" },
  { po: "PO-2026-0041", invoice: "INV-2026-0053", receipt: "REC-2026-0043", matchStatus: "MATCHED", exceptionReason: "" },
  { po: "PO-2026-0042", invoice: "INV-2026-0054", receipt: "—", matchStatus: "EXCEPTION", exceptionReason: "입고 미완료" },
  { po: "PO-2026-0043", invoice: "—", receipt: "REC-2026-0045", matchStatus: "EXCEPTION", exceptionReason: "Invoice 미수신" },
  { po: "PO-2026-0044", invoice: "INV-2026-0056", receipt: "REC-2026-0046", matchStatus: "MATCHED", exceptionReason: "" },
];

export default function PURMatchingPage() {
  const matched = MATCHING_DATA.filter((r) => r.matchStatus === "MATCHED").length;
  const exception = MATCHING_DATA.filter((r) => r.matchStatus === "EXCEPTION").length;

  return (
    <div>
      <PageHeader
        title="3-Way"
        accent="Matching"
        nodeRef="SCR-PUR-021"
        status="PROTOTYPE"
        description="PO · Invoice · 입고 3-Way Matching 자동 검증"
      />

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-low p-4 border-l-4 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">MATCHED</p>
          <p className="text-2xl font-headline font-black text-primary-accent">{matched}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-warning">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">EXCEPTION</p>
          <p className="text-2xl font-headline font-black text-warning">{exception}</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">TOTAL</p>
          <p className="text-2xl font-headline font-black">{MATCHING_DATA.length}</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/90 transition-colors">
          + Invoice 등록
        </button>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            Matching 결과
            <span className="opacity-30 font-light ml-2">| Buffer: 006 Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">PO 번호</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">Invoice 번호</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">Receipt 번호</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">매칭 상태</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">예외 사유</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {MATCHING_DATA.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-outline-variant transition-colors ${
                    row.matchStatus === "EXCEPTION"
                      ? "bg-warning/5 hover:bg-warning/10"
                      : "hover:bg-surface-container-highest/20"
                  }`}
                >
                  <td className="px-4 py-2 font-mono text-xs">{row.po}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{row.invoice}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{row.receipt}</td>
                  <td className="px-4 py-2">
                    <StatusBadge
                      type={row.matchStatus === "MATCHED" ? "running" : "warning"}
                      label={row.matchStatus}
                    />
                  </td>
                  <td className={`px-4 py-2 text-xs ${row.matchStatus === "EXCEPTION" ? "text-warning" : "opacity-30"}`}>
                    {row.exceptionReason || "—"}
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
