import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { histId: "LBL-H-20260506-012", target: "B01-1-G22C-C-171", type: "부재",  action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-06 09:30", issuedBy: "김계획", status: "COMPLETED" },
  { histId: "LBL-H-20260506-011", target: "PKG-WO-P3000-20260506-0007-001", type: "패킹", action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-06 09:25", issuedBy: "김계획", status: "COMPLETED" },
  { histId: "LBL-H-20260506-010", target: "B01-2-G22C-C-201", type: "부재",  action: "REPRINT", printer: "PRT-02", issuedAt: "2026-05-06 08:10", issuedBy: "박포장", status: "COMPLETED" },
  { histId: "LBL-H-20260505-008", target: "B02-1-T18B-S-102", type: "부재",  action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-05 17:00", issuedBy: "김계획", status: "COMPLETED" },
  { histId: "LBL-H-20260505-007", target: "PKG-WO-P3000-20260505-0001-001", type: "패킹", action: "PRINT",   printer: "PRT-02", issuedAt: "2026-05-05 16:30", issuedBy: "박포장", status: "FAILED" },
  { histId: "LBL-H-20260505-005", target: "B01-1-G22C-S-172", type: "부재",  action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-05 14:15", issuedBy: "김계획", status: "COMPLETED" },
  { histId: "LBL-H-20260504-003", target: "B03-1-G22C-C-301", type: "슬리퍼", action: "PRINT",   printer: "PRT-03", issuedAt: "2026-05-04 11:00", issuedBy: "최포장", status: "BLOCKED" },
];

const STATUS_MAP: Record<string, { type: "running" | "error" | "stopped" | "idle"; label: string }> = {
  COMPLETED: { type: "running", label: "완료" },
  FAILED:    { type: "error",   label: "실패" },
  BLOCKED:   { type: "stopped", label: "KS 차단" },
};

const ACTION_MAP: Record<string, string> = {
  PRINT: "발행",
  REPRINT: "재인쇄",
};

export default function LabelHistoryPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="라벨 발행" accent="이력" nodeRef="SCR-WO-032" description="라벨·문서 발행 이력 — 6 상태(완료/실패/KS BLOCKED 등) 검색. FNC-WO-017" />

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          Excel 내보내기
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            발행 이력 <span className="opacity-30 font-light ml-2">| {ROWS.length} 건</span>
          </h3>
          <button className="text-xs opacity-40 hover:opacity-70 font-label uppercase tracking-widest">새로고침</button>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["이력 ID", "대상", "유형", "작업", "프린터", "발행일시", "담당자", "결과"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r) => {
              const s = STATUS_MAP[r.status];
              return (
                <tr key={r.histId} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors ${r.status === "BLOCKED" ? "bg-error/5" : ""}`}>
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.histId}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70 max-w-xs truncate">{r.target}</td>
                  <td className="px-4 py-2 text-xs">{r.type}</td>
                  <td className="px-4 py-2 text-xs">{ACTION_MAP[r.action] ?? r.action}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{r.printer}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.issuedAt}</td>
                  <td className="px-4 py-2 text-xs">{r.issuedBy}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
