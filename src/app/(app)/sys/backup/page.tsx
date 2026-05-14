"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const KPI = [
  { label: "마지막 성공 백업", value: "2026-05-06 02:00:03", sub: "BKUP-20260506-001", ok: true },
  { label: "다음 예약 백업", value: "2026-05-07 02:00:00", sub: "SCHEDULED", ok: true },
];

const BACKUP_STATUS_MAP: Record<string, { type: "running" | "idle" | "warning" | "error"; label: string }> = {
  SCHEDULED: { type: "idle", label: "예정" },
  RUNNING:   { type: "running", label: "실행 중" },
  SUCCEEDED: { type: "running", label: "SUCCEEDED" },
  FAILED:    { type: "error", label: "실패" },
};

const MOCK = [
  { id: "BKUP-20260506-001", type: "FULL", status: "SUCCEEDED", size: "4.2 GB", start: "2026-05-06 02:00:03", end: "2026-05-06 02:43:21" },
  { id: "BKUP-20260505-002", type: "INCREMENTAL", status: "SUCCEEDED", size: "312 MB", start: "2026-05-05 14:00:00", end: "2026-05-05 14:08:45" },
  { id: "BKUP-20260505-001", type: "FULL", status: "SUCCEEDED", size: "4.1 GB", start: "2026-05-05 02:00:01", end: "2026-05-05 02:41:10" },
  { id: "BKUP-20260504-003", type: "INCREMENTAL", status: "FAILED", size: "—", start: "2026-05-04 20:00:00", end: "2026-05-04 20:03:12" },
  { id: "BKUP-20260507-001", type: "FULL", status: "SCHEDULED", size: "—", start: "2026-05-07 02:00:00", end: "—" },
];

export default function SYSBackupPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="백업" accent="·복구" nodeRef="SCR-SYS-060" description="백업 작업 현황, KPI 카드, 수동 백업 및 복구 테스트" />

      <div className="grid grid-cols-2 gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container p-5 border-l-4 border-[#00912F]">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">{k.label}</p>
            <p className="text-xl font-headline font-black tabular-nums">{k.value}</p>
            <p className="text-xs text-on-surface-variant opacity-50 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white hover:bg-[#00912F]/80 transition-colors">
          수동 백업
        </button>
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface-variant hover:bg-surface-container border border-outline-variant/20 transition-colors">
          복구 테스트
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">백업 작업 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["백업 ID", "유형", "상태", "파일 크기", "시작", "종료"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {MOCK.map(row => {
                const badge = BACKUP_STATUS_MAP[row.status] ?? { type: "idle" as const, label: row.status };
                return (
                  <tr key={row.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 tabular-nums text-xs font-label text-[#00912F]">{row.id}</td>
                    <td className="px-4 py-2 text-on-surface-variant text-xs uppercase">{row.type}</td>
                    <td className="px-4 py-2"><StatusBadge type={badge.type} label={badge.label} /></td>
                    <td className="px-4 py-2 tabular-nums text-on-surface-variant">{row.size}</td>
                    <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.start}</td>
                    <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.end}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
