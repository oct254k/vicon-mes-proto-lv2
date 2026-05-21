import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const DEVICE_STATUS: Record<string, { type: "running" | "warning" | "idle" | "error"; label: string }> = {
  REGISTERED: { type: "running", label: "등록됨" },
  LOST:       { type: "warning", label: "분실" },
  RETIRED:    { type: "idle",    label: "폐기됨" },
};

const MOCK = [
  { id: "DEV-20260101-001", type: "T1", user: "admin01", status: "REGISTERED", registeredAt: "2026-01-01", lastSeen: "2026-05-06 09:58" },
  { id: "DEV-20260201-002", type: "T2", user: "oper02",  status: "REGISTERED", registeredAt: "2026-02-01", lastSeen: "2026-05-06 08:30" },
  { id: "DEV-20260310-003", type: "T1", user: "oper03",  status: "LOST",       registeredAt: "2026-03-10", lastSeen: "2026-05-05 17:22" },
  { id: "DEV-20250601-004", type: "T3", user: "ext01",   status: "RETIRED",    registeredAt: "2025-06-01", lastSeen: "2026-04-01 10:00" },
  { id: "DEV-20260402-005", type: "T2", user: "oper04",  status: "REGISTERED", registeredAt: "2026-04-02", lastSeen: "2026-05-06 10:01" },
];

const TYPE_COLOR: Record<string, string> = {
  T1: "bg-primary/20 text-primary",
  T2: "bg-secondary/20 text-secondary",
  T3: "bg-warning/20 text-warning",
};

export default function SYSDevicesPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="단말" accent="라이프사이클" nodeRef="SCR-SYS-100" description="단말 사전 등록·분실 무효화(5분 SLA)·재발급·영구 폐기 관리" />

      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-warning text-black hover:bg-warning/80 transition-colors font-bold">
          분실 신고
        </button>
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface-variant hover:bg-surface-container border border-outline-variant/20 transition-colors">
          폐기
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">단말 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["단말 ID", "유형", "사용자", "상태", "등록일", "마지막 접속"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {MOCK.map(row => {
                const badge = DEVICE_STATUS[row.status] ?? { type: "idle" as const, label: row.status };
                return (
                  <tr key={row.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 text-xs font-label text-on-surface-variant tabular-nums">{row.id}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 text-xs font-label uppercase font-bold ${TYPE_COLOR[row.type] || ""}`}>{row.type}</span>
                    </td>
                    <td className="px-4 py-2">{row.user}</td>
                    <td className="px-4 py-2"><StatusBadge type={badge.type} label={badge.label} /></td>
                    <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.registeredAt}</td>
                    <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.lastSeen}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-4 p-3 bg-surface-container border border-outline">
        <p className="text-xs text-on-surface-variant font-label">
          <span className="text-warning">LOST 무효화 SLA: 5분</span> — 분실 신고 시 토큰 즉시 폐기 및 감사 기록. RETIRED 상태는 영구 폐기(복구 불가).
        </p>
      </div>
    </div>
  );
}
