import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ACTIVE_TOKENS = [
  { tokenId: "EXT-20260506-001", driver: "외부운전자A", scope: "PACKING", issuedBy: "kim.kj@vicon.local", issuedAt: "2026-05-06 08:00", expiresAt: "2026-05-06 18:00", status: "running" as const },
  { tokenId: "EXT-20260505-007", driver: "외부운전자B", scope: "VEHICLE", issuedBy: "정출하(EMP3030)", issuedAt: "2026-05-05 14:00", expiresAt: "2026-05-05 22:00", status: "idle" as const },
];

const CARDS = [
  { href: "/usr/external-tokens/new", code: "EXT-ISSUE", title: "토큰 발급", desc: "외부 운전자·검수자 대상 EXTERNAL 토큰 발급. scope: PACKING/VEHICLE/SITE." },
  { href: "/usr/external-tokens/history", code: "EXT-HIST", title: "발급·회수 이력", desc: "전체 토큰 발급·자동 만료·즉시 회수 이력 조회." },
];

export default function ExternalTokensPage() {
  return (
    <div>
      <PageHeader title="EXTERNAL 토큰" accent="EXT-TOKENS" nodeRef="SCR-USR-060" status="PROTOTYPE" description="PRC-USR-002 경로 #3 — 외부 운전자·검수자 일회성 토큰 발급·scope 제어·회수·이력" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <p className="text-xs font-body text-on-surface/60 leading-relaxed">
          EXTERNAL 토큰은 L2/SHP 또는 L3 MANAGER가 발급. scope는 PACKING/VEHICLE/SITE 중 선택. 단발성 — 사용 후 또는 당일 만료. 발급자 책임 하 관리.
        </p>
      </div>

      <div className="bg-surface-container-low border-l-4 border-[#f59e0b] p-5 mb-6">
        <FieldHeader title="활성 토큰 현황" moduleRef="FNC-USR-082/083" />
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant/10">
              {["토큰 ID", "외부 사용자", "Scope", "발급자", "발급 시각", "만료 시각", "상태"].map((h) => (
                <th key={h} className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ACTIVE_TOKENS.map((t, i) => (
              <tr key={i}>
                <td className="py-2 tabular-nums text-xs opacity-70 pr-4">{t.tokenId}</td>
                <td className="py-2 pr-4">{t.driver}</td>
                <td className="py-2 pr-4 text-xs font-bold text-primary-accent">{t.scope}</td>
                <td className="py-2 text-xs opacity-60 pr-4">{t.issuedBy}</td>
                <td className="py-2 tabular-nums text-xs pr-4">{t.issuedAt}</td>
                <td className="py-2 tabular-nums text-xs pr-4">{t.expiresAt}</td>
                <td className="py-2"><StatusBadge type={t.status} label={t.status === "running" ? "활성" : "만료"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FieldHeader title="메뉴" moduleRef="FNC-USR-080~085" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <a key={c.code} href={c.href} className="bg-surface-container-low p-5 border-l-4 border-primary-accent hover:bg-surface-container transition-colors block">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">{c.code}</p>
            <p className="font-headline font-bold text-sm mb-1">{c.title}</p>
            <p className="text-xs text-on-surface/50 leading-relaxed">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
