import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const tokenData = [
  { id: "TKN-0012", user: "ERP_SYNC", scope: "read:inventory write:receipt", issued: "2026-03-01", expires: "2027-03-01", status: "running" as const, statusLabel: "활성" },
  { id: "TKN-0011", user: "WMS_BOT", scope: "read:inventory", issued: "2026-02-15", expires: "2027-02-15", status: "running" as const, statusLabel: "활성" },
  { id: "TKN-0010", user: "OLD_ERP", scope: "read:all", issued: "2025-01-10", expires: "2026-01-10", status: "stopped" as const, statusLabel: "만료" },
  { id: "TKN-0009", user: "PORTAL_API", scope: "read:sp write:sp", issued: "2026-04-01", expires: "2026-10-01", status: "running" as const, statusLabel: "활성" },
];

export default function USRTokensPage() {
  return (
    <div>
      <PageHeader
        title="EXTERNAL 토큰"
        accent="토큰"
        nodeRef="SCR-USR-080"
        status="PROTOTYPE"
        description="외부 연계 API 토큰 발급·조회·무효화."
      />

      <div className="flex justify-end mb-4">
        <button className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:bg-[#00912F]/80 transition-colors">
          토큰 발급
        </button>
      </div>

      <FieldHeader title="토큰 목록" moduleRef="SCR-USR-080" />
      <section className="bg-surface-elevated mt-4">
        <div className="p-4 bg-white/5 flex justify-between items-center border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            API 토큰{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(tokenData.length).padStart(3, "0")} Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#00912F]">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline/10">
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">토큰 ID</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">사용자명</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">Scope</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">발급일</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">만료일</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">상태</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">액션</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {tokenData.map((row, i) => (
                <tr key={i} className="border-b border-outline/10 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-[#00912F]">{row.id}</td>
                  <td className="px-4 py-3 text-on-surface/80">{row.user}</td>
                  <td className="px-4 py-3 text-on-surface/50 text-xs font-mono">{row.scope}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/60">{row.issued}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/60">{row.expires}</td>
                  <td className="px-4 py-3">
                    <StatusBadge type={row.status} label={row.statusLabel} />
                  </td>
                  <td className="px-4 py-3">
                    {row.status === "running" && (
                      <button className="border border-danger/40 text-danger/70 font-label uppercase tracking-widest text-xs px-3 py-1 hover:border-danger hover:text-danger transition-colors">
                        무효화
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
