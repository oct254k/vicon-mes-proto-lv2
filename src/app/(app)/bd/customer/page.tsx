import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  {
    href: "/bd/customer/tree",
    label: "거래처 트리",
    desc: "거래처 → 현장 → 동(Building) 3단계 계층 구조 등록·관리",
    stat: "10 거래처 / 32 현장",
    ref: "SCR-BD-060",
  },
];

const RECENT = [
  { name: "포스코건설",   site: "광양제철소 3고로 현장", action: "신규 현장 등록", date: "2026-05-05" },
  { name: "현대건설",     site: "부산 기장 해수담수화", action: "동 추가",         date: "2026-05-04" },
  { name: "GS건설",       site: "인천 검단 산단 A동",   action: "주소 수정",       date: "2026-05-03" },
];

export default function CustomerLandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="거래처 관리"
        nodeRef="SCR-BD-060"
        description="거래처(Customer) · 현장(Site) · 건물(Building) 3단계 계층 마스터"
      />
      <FieldHeader title="거래처 도메인 진입" moduleRef="BD-CUSTOMER" />
      <div className="grid grid-cols-1 gap-4 mb-8 max-w-sm">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-surface-container-lowest border border-outline-variant/20 p-6 hover:border-primary-accent/50 hover:bg-surface-container transition-colors block"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-headline font-black text-sm uppercase tracking-widest text-primary-accent">{card.label}</h3>
            </div>
            <p className="text-sm text-on-surface-variant/70 mb-4">{card.desc}</p>
            <span className="text-xs font-label uppercase tracking-wider bg-surface-container-highest/50 px-2 py-1 text-on-surface/50">{card.stat}</span>
          </Link>
        ))}
      </div>
      <FieldHeader title="최근 변경" moduleRef="" />
      <ul className="flex flex-col gap-2">
        {RECENT.map((r, i) => (
          <li key={i} className="flex gap-4 text-sm border-b border-outline pb-2">
            <span className="text-primary-accent font-label uppercase tracking-wider w-28">{r.name}</span>
            <span className="text-on-surface-variant/70 flex-1">{r.site}</span>
            <span className="text-on-surface/40">{r.action}</span>
            <span className="text-on-surface/30 text-xs">{r.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
