import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const RECEIPT_DATA = [
  { asnNo: "ASN-2026-0031", material: "H형강 300×150", qty: "20ea", result: "PASS", inspectedAt: "2026-05-06 10:30", lot: "LOT-260506-001" },
  { asnNo: "ASN-2026-0031", material: "각관 100×100×4.5", qty: "50ea", result: "PASS", inspectedAt: "2026-05-06 10:45", lot: "LOT-260506-002" },
  { asnNo: "ASN-2026-0032", material: "판재 SS400 6T", qty: "30ea", result: "PARTIAL", inspectedAt: "2026-05-06 11:15", lot: "LOT-260506-003" },
  { asnNo: "ASN-2026-0033", material: "C형강 200×75", qty: "40ea", result: "FAIL", inspectedAt: "2026-05-05 14:00", lot: "LOT-260505-011" },
  { asnNo: "ASN-2026-0034", material: "H형강 400×200", qty: "15ea", result: "PASS", inspectedAt: "2026-05-05 09:20", lot: "LOT-260505-012" },
];

const RESULT_MAP: Record<string, { type: "running" | "stopped" | "warning" }> = {
  PASS:    { type: "running" },
  FAIL:    { type: "stopped" },
  PARTIAL: { type: "warning" },
};
const SL: Record<string, string> = { PASS:"합격", FAIL:"불합격", PARTIAL:"부분합격" };

export default function PURReceiptPage() {
  const pass = RECEIPT_DATA.filter((r) => r.result === "PASS").length;
  const fail = RECEIPT_DATA.filter((r) => r.result === "FAIL").length;
  const partial = RECEIPT_DATA.filter((r) => r.result === "PARTIAL").length;

  return (
    <div>
      <PageHeader
        title="입고·검수"
        accent="RECEIPT"
        nodeRef="SCR-PUR-017"
        status="PROTOTYPE"
        description="ASN 입고 처리 · 수입검사 결과 등록 · Lot 추적"
      />

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-low p-4 border-l-4 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">합격</p>
          <p className="text-2xl font-headline font-black text-primary-accent">{pass}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-warning">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">부분합격</p>
          <p className="text-2xl font-headline font-black text-warning">{partial}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-error">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">불합격</p>
          <p className="text-2xl font-headline font-black">{fail}</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/90 transition-colors">
          PDA 스캔 입고
        </button>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            입고·검수 목록
            <span className="opacity-30 font-light ml-2">| Buffer: 005 Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">ASN 번호</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">Material</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">수량</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">검수 결과</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">검수일</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">Lot 번호</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {RECEIPT_DATA.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 font-mono text-xs">{row.asnNo}</td>
                  <td className="px-4 py-2">{row.material}</td>
                  <td className="px-4 py-2 tabular-nums">{row.qty}</td>
                  <td className="px-4 py-2">
                    <StatusBadge
                      type={RESULT_MAP[row.result]?.type ?? "idle"}
                      label={SL[row.result] ?? row.result}
                    />
                  </td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-70">{row.inspectedAt}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{row.lot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
