import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const STATS = [
  { label: "총 자격 건수", value: "47", unit: "건" },
  { label: "만료 임박 (30일)", value: "5", unit: "건", warn: true },
  { label: "이번 달 만료", value: "2", unit: "건", warn: true },
  { label: "자격 보유 인원", value: "31", unit: "명" },
];

const CARDS = [
  { href: "/usr/qualifications/new", code: "QUAL-NEW", title: "자격 부여", desc: "operation_code 기준 사용자×자격 매트릭스 부여 및 만료일 설정." },
  { href: "/usr/qualifications/expire", code: "QUAL-EXPIRE", title: "만료 임박 보드", desc: "30일 이내 만료 예정 자격 경고 목록. 갱신 안내." },
];

export default function QualificationsPage() {
  return (
    <div>
      <PageHeader title="공정 자격" accent="QUALIFICATIONS" nodeRef="SCR-USR-050" status="PROTOTYPE" description="operation_code 기준 공정 자격 부여·만료 관리. 우회 금지, 30일 전 알림." />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <p className="text-xs font-body text-on-surface/60 leading-relaxed">
          공정 자격은 특정 operation_code 실행 권한 부여 기준입니다. 자격 없는 사용자는 해당 공정 실행 불가(우회 금지). 만료 30일 전 자동 알림 발송.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {STATS.map((s) => (
          <div key={s.label} className={`bg-surface-container-low p-4 border-l-4 ${s.warn ? "border-[#f59e0b]" : "border-primary-accent"}`}>
            <p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">{s.label}</p>
            <p className={`font-headline font-bold text-2xl ${s.warn ? "text-[#f59e0b]" : ""}`}>{s.value}<span className="text-sm font-normal opacity-50 ml-1">{s.unit}</span></p>
          </div>
        ))}
      </div>

      <FieldHeader title="메뉴" moduleRef="FNC-USR-070~073" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {CARDS.map((c) => (
          <a key={c.code} href={c.href} className="bg-surface-container-low p-5 border-l-4 border-primary-accent hover:bg-surface-container transition-colors block">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">{c.code}</p>
            <p className="font-headline font-bold text-sm mb-1">{c.title}</p>
            <p className="text-xs text-on-surface/50 leading-relaxed">{c.desc}</p>
          </a>
        ))}
      </div>

      <div className="bg-surface-container-low border-l-4 border-[#f59e0b] p-4 flex items-center gap-3">
        <StatusBadge type="warning" label="EXPIRE SOON" />
        <span className="text-xs font-body text-on-surface/60">만료 임박 자격 5건 — 갱신 절차를 진행하십시오.</span>
        <a href="/usr/qualifications/expire" className="ml-auto text-xs text-primary-accent font-label uppercase tracking-widest underline">바로가기</a>
      </div>
    </div>
  );
}
