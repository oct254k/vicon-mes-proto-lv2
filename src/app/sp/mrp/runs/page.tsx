import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const RUNS = [
  { runId: "MRP-RUN-20260506-003", trigger: "수동", plant: "P3000", startedAt: "2026-05-06 09:15", duration: "02:34", status: "SUCCESS", prCount: 11 },
  { runId: "MRP-RUN-20260505-002", trigger: "야간 자동", plant: "P3000", startedAt: "2026-05-05 23:00", duration: "03:12", status: "SUCCESS", prCount: 7 },
  { runId: "MRP-RUN-20260505-001", trigger: "수동", plant: "P3000", startedAt: "2026-05-05 14:30", duration: "01:58", status: "WARNING", prCount: 3 },
  { runId: "MRP-RUN-20260504-001", trigger: "야간 자동", plant: "P3000", startedAt: "2026-05-04 23:00", duration: "00:45", status: "FAILED", prCount: 0 },
  { runId: "MRP-RUN-20260503-002", trigger: "수동", plant: "P3000", startedAt: "2026-05-03 11:00", duration: "02:10", status: "SUCCESS", prCount: 5 },
  { runId: "MRP-RUN-20260503-001", trigger: "수동", plant: "P3000", startedAt: "2026-05-03 08:20", duration: "01:30", status: "SUCCESS", prCount: 2 },
];

const STATUS_MAP: Record<string, { type: "running" | "warning" | "error" | "idle"; label: string }> = {
  SUCCESS: { type: "running", label: "성공" },
  WARNING: { type: "warning", label: "경고" },
  FAILED:  { type: "error",   label: "실패" },
};

export default function MrpRunsPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader
        title="MRP 실행"
        accent="이력"
        nodeRef="SCR-SP-031"
        description="MRP 실행 이력 — 수동 및 야간 자동 실행 결과를 확인합니다."
      />

      <div className="flex gap-3 mb-6">
        <a href="/sp/mrp/pr-candidates" className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          PR 후보 검토
        </a>
        <a href="/sp/mrp/result" className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          MRP 결과 상세
        </a>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            MRP Run 이력 <span className="opacity-30 font-light ml-2">| {RUNS.length} 건</span>
          </h3>
          <button className="text-xs opacity-40 hover:opacity-70 font-label uppercase tracking-widest">새로고침</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["Run ID", "트리거", "Plant", "시작일시", "소요시간", "PR 후보", "결과"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {RUNS.map((r) => {
              const s = STATUS_MAP[r.status];
              return (
                <tr key={r.runId} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.runId}</td>
                  <td className="px-4 py-2 text-xs">{r.trigger}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.plant}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.startedAt}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.duration}</td>
                  <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.prCount}</td>
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
