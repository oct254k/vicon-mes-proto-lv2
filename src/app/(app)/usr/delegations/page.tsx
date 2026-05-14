import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ACTIVE_DELEG = [
  { delegId: "DEL-20260505-001", delegator: "홍길동 (EMP1099)", delegatee: "김철수 (EMP1100)", period: "2026-05-07 ~ 2026-05-09", scope: "PRD WO 결재", status: "APPROVED" as const },
];

const CARDS = [
  { href: "/usr/delegations/new", code: "DELEG-NEW", title: "위임 등록", desc: "부재·휴가 시 업무 권한 임시 위임 등록. 30일 한도, 자기 위임 불가." },
  { href: "/usr/delegations/approval", code: "DELEG-APPR", title: "위임 결재", desc: "직속 상위 또는 L3+ 결재 인박스." },
  { href: "/usr/delegations/history", code: "DELEG-HIST", title: "위임 이력", desc: "전체 위임 신청·결재·만료 이력 조회." },
];

export default function DelegationsPage() {
  return (
    <div>
      <PageHeader title="임시 위임" accent="DELEGATIONS" nodeRef="SCR-USR-040" status="PROTOTYPE" description="PRC-USR-002 경로 #2 — 임시 위임 등록·결재·활성·자동 회수·이력" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <p className="text-xs font-body text-on-surface/60 leading-relaxed">
          위임은 <strong>등록 → 결재(직속 상위·L3+) → 발효</strong> 흐름. 위임 기간 종료 시 자동 회수. 30일 한도, 자기·상향 위임 불가.
        </p>
      </div>

      <div className="bg-surface-container-low border-l-4 border-warning p-5 mb-6">
        <FieldHeader title="활성 위임 현황" moduleRef="FNC-USR-062/063" />
        {ACTIVE_DELEG.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline">
                {["위임 ID", "위임자", "수임자", "기간", "범위", "상태"].map((h) => (
                  <th key={h} className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {ACTIVE_DELEG.map((d, i) => (
                <tr key={i}>
                  <td className="py-2 tabular-nums text-xs opacity-70 pr-4">{d.delegId}</td>
                  <td className="py-2 pr-4">{d.delegator}</td>
                  <td className="py-2 pr-4 text-primary-accent font-bold">{d.delegatee}</td>
                  <td className="py-2 tabular-nums text-xs pr-4">{d.period}</td>
                  <td className="py-2 text-xs opacity-60 pr-4">{d.scope}</td>
                  <td className="py-2"><StatusBadge type="running" label={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-xs text-on-surface/40 font-body">현재 활성 위임 없음</p>
        )}
      </div>

      <FieldHeader title="메뉴" moduleRef="FNC-USR-060~064" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
