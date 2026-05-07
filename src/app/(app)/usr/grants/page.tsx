import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const CARDS = [
  { href: "/usr/grants/request", code: "GRANT-REQ", title: "권한 부여 신청", desc: "부서원에 대한 권한 레벨 상향 또는 메뉴 권한 추가 신청. L2+ 신청, L3+ 결재."},
  { href: "/usr/grants/approval", code: "GRANT-APPR", title: "결재 인박스", desc: "대기 중인 권한 부여·회수 신청 결재 목록. L3+ 전용." },
  { href: "/usr/grants/history", code: "GRANT-HIST", title: "신청·결재 이력", desc: "본인 신청 및 결재 완료 이력 조회. 본인 또는 L3+." },
  { href: "/usr/grants/revoke", code: "GRANT-REVOKE", title: "권한 회수", desc: "부여된 권한 즉시 회수. 5분 SLA 세션 권한 갱신. L3+ 전용." },
];

export default function GrantsPage() {
  return (
    <div>
      <PageHeader title="권한 부여·회수" accent="GRANTS" nodeRef="SCR-USR-030" status="PROTOTYPE" description="PRC-USR-002 경로 #1 — 권한 신청·결재·회수·이력 전반 관리" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <p className="text-xs font-body text-on-surface/60 leading-relaxed">
          권한 부여는 <strong>신청(L2+) → 결재(L3+) → 발효</strong> 워크플로를 따릅니다. 회수는 L3 이상이 직접 실행하며 5분 SLA 이내 세션 권한이 갱신됩니다.
        </p>
      </div>

      <FieldHeader title="메뉴" moduleRef="FNC-USR-050~056" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <a key={c.code} href={c.href} className="bg-surface-container-low p-5 border-l-4 border-primary-accent hover:bg-surface-container transition-colors block">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">{c.code}</p>
            <p className="font-headline font-bold text-sm mb-1">{c.title}</p>
            <p className="text-xs text-on-surface/50 leading-relaxed">{c.desc}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 bg-surface-container-low border-l-4 border-[#6b7280] p-4">
        <FieldHeader title="활성 대기 현황" moduleRef="FNC-USR-051" />
        <div className="flex gap-8 text-sm font-body">
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">대기 중</p><p className="text-[#f59e0b] font-bold text-lg">3건</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">오늘 승인</p><p className="text-primary-accent font-bold text-lg">7건</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">오늘 반려</p><p className="text-error font-bold text-lg">1건</p></div>
        </div>
      </div>
    </div>
  );
}
