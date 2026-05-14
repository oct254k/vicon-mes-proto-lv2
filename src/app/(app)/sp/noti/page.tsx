import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SUMMARY = [
  { label: "미확인", count: 4, type: "error" as const },
  { label: "오늘 발송", count: 12, type: "running" as const },
  { label: "실패", count: 1, type: "stopped" as const },
  { label: "수신자", count: 18, type: "idle" as const },
];

const RECENT = [
  { id: "NOTI-20260506-008", type: "MRP_SHORTAGE", msg: "자재 부족 감지 — H-BEAM 250×125", sent: "2026-05-06 09:20", status: "SENT" },
  { id: "NOTI-20260506-007", type: "PR_CANDIDATE", msg: "PR 후보 11건 생성 확인 요청", sent: "2026-05-06 09:16", status: "SENT" },
  { id: "NOTI-20260506-006", type: "PLAN_CONFIRM", msg: "일일 계획 확정 요청 — P3000", sent: "2026-05-06 08:00", status: "SENT" },
  { id: "NOTI-20260505-010", type: "MRP_SHORTAGE", msg: "야간 MRP 경고 — S형강 부족", sent: "2026-05-05 23:05", status: "SENT" },
  { id: "NOTI-20260505-009", type: "SO_APPROVED",  msg: "SO-2026-0042 승인 완료", sent: "2026-05-05 17:30", status: "FAILED" },
];

const STATUS_MAP: Record<string, { type: "running" | "error" | "idle" | "stopped"; label: string }> = {
  SENT:   { type: "running", label: "발송" },
  FAILED: { type: "error",   label: "실패" },
};

export default function SpNotiPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="SP 알림" accent="랜딩" nodeRef="SCR-SP-040" description="SP 도메인 알림 현황 요약 — 인박스, 수신자, 발송 이력을 관리합니다." />

      <div className="grid grid-cols-4 gap-3 mb-8">
        {SUMMARY.map((s) => (
          <div key={s.label} className="bg-surface-container p-4 border-l-2 border-primary-accent">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{s.label}</p>
            <p className="font-headline font-black text-3xl">{s.count}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <a href="/sp/noti/inbox" className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          인박스
        </a>
        <a href="/sp/noti/recipients" className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          수신자 관리
        </a>
        <a href="/sp/noti/history" className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          발송 이력
        </a>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">최근 알림</h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["알림 ID", "유형", "메시지", "발송일시", "상태"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {RECENT.map((r) => {
              const s = STATUS_MAP[r.status];
              return (
                <tr key={r.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.type}</td>
                  <td className="px-4 py-2 text-xs">{r.msg}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.sent}</td>
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
