import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const TOKEN_STATUS: Record<string, { type: "running" | "idle" | "error" | "warning"; label: string }> = {
  ACTIVE:  { type: "running", label: "활성" },
  REVOKED: { type: "error", label: "REVOKED" },
  EXPIRED: { type: "idle", label: "만료" },
};

const TOKENS = [
  { id: "TKN-001", system: "ERP-SAP", status: "ACTIVE", issued: "2026-01-01", expires: "2026-12-31", health: "UP", latency: "42ms" },
  { id: "TKN-002", system: "WMS-3PL", status: "ACTIVE", issued: "2026-02-15", expires: "2026-08-15", health: "UP", latency: "88ms" },
  { id: "TKN-003", system: "LABELING-API", status: "EXPIRED", issued: "2025-06-01", expires: "2026-05-01", health: "DOWN", latency: "—" },
  { id: "TKN-004", system: "VISION-AI", status: "ACTIVE", issued: "2026-03-10", expires: "2027-03-10", health: "UP", latency: "210ms" },
  { id: "TKN-005", system: "EDI-PARTNER", status: "REVOKED", issued: "2025-09-01", expires: "2026-09-01", health: "DOWN", latency: "—" },
];

const healthStyle = (h: string) =>
  h === "UP" ? "text-[#00912F] font-bold" : "text-error font-bold";

export default function SYSIntegrationPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="외부 연동" accent="API Token" nodeRef="SCR-SYS-070" description="외부 시스템 API Token 발급·무효화 및 연동 헬스 모니터" />

      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white hover:bg-[#00912F]/80 transition-colors">
          + 토큰 발급
        </button>
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface-variant hover:bg-surface-container border border-outline-variant/20 transition-colors">
          무효화
        </button>
      </div>

      <section className="bg-surface-container-lowest mb-6">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">API Token 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["Token ID", "시스템명", "상태", "발급일", "만료일", "헬스", "응답"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {TOKENS.map(row => {
                const badge = TOKEN_STATUS[row.status] ?? { type: "idle" as const, label: row.status };
                return (
                  <tr key={row.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 text-xs font-label text-[#00912F]">{row.id}</td>
                    <td className="px-4 py-2">{row.system}</td>
                    <td className="px-4 py-2"><StatusBadge type={badge.type} label={badge.label} /></td>
                    <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.issued}</td>
                    <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.expires}</td>
                    <td className={`px-4 py-2 text-xs font-label uppercase ${healthStyle(row.health)}`}>{row.health}</td>
                    <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.latency}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="p-4 bg-surface-container border border-outline">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">헬스 신선도</p>
        <p className="text-sm text-on-surface-variant">5분 주기 자동 갱신 — <span className="text-warning">EXPIRED/REVOKED 토큰 접속 시 감사 1행 기록</span></p>
      </div>
    </div>
  );
}
