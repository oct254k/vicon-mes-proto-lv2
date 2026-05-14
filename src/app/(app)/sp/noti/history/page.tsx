import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { id: "NOTI-20260506-008", type: "MRP_SHORTAGE", recipient: "김계획, 박자재", channel: "Email+Web", sentAt: "2026-05-06 09:20", result: "SUCCESS", attempt: 1 },
  { id: "NOTI-20260506-007", type: "PR_CANDIDATE", recipient: "박자재",         channel: "Email",     sentAt: "2026-05-06 09:16", result: "SUCCESS", attempt: 1 },
  { id: "NOTI-20260506-006", type: "PLAN_CONFIRM",  recipient: "최공장장",       channel: "Web",       sentAt: "2026-05-06 08:00", result: "SUCCESS", attempt: 1 },
  { id: "NOTI-20260505-010", type: "MRP_SHORTAGE",  recipient: "김계획, 박자재", channel: "Email+Web", sentAt: "2026-05-05 23:05", result: "SUCCESS", attempt: 1 },
  { id: "NOTI-20260505-009", type: "SO_APPROVED",   recipient: "이영업",         channel: "Email",     sentAt: "2026-05-05 17:30", result: "FAILED",  attempt: 3 },
  { id: "NOTI-20260505-008", type: "PR_CANDIDATE",  recipient: "박자재",         channel: "Email",     sentAt: "2026-05-05 14:00", result: "SUCCESS", attempt: 1 },
  { id: "NOTI-20260505-005", type: "PLAN_CONFIRM",  recipient: "최공장장",       channel: "Web",       sentAt: "2026-05-05 08:00", result: "SUCCESS", attempt: 1 },
];

const STATUS_MAP: Record<string, { type: "running" | "error" | "warning"; label: string }> = {
  SUCCESS: { type: "running", label: "성공" },
  FAILED:  { type: "error",   label: "실패" },
  RETRY:   { type: "warning", label: "재시도" },
};

export default function NotiHistoryPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="알림 발송" accent="이력" nodeRef="SCR-SP-042" description="SP 도메인 알림 발송 이력 — 실패 건 재발송 및 시도 횟수를 확인합니다." />

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          실패 건 재발송
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            발송 이력 <span className="opacity-30 font-light ml-2">| {ROWS.length} 건</span>
          </h3>
          <button className="text-xs opacity-40 hover:opacity-70 font-label uppercase tracking-widest">새로고침</button>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["알림 ID", "유형", "수신자", "채널", "발송일시", "시도", "결과"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r) => {
              const s = STATUS_MAP[r.result] ?? STATUS_MAP.FAILED;
              return (
                <tr key={r.id} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors ${r.result === "FAILED" ? "bg-error/5" : ""}`}>
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.type}</td>
                  <td className="px-4 py-2 text-xs">{r.recipient}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{r.channel}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.sentAt}</td>
                  <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.attempt}</td>
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
