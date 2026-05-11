import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  { href: "/bd/workcenter/list",     label: "WC 목록",       desc: "Work Center 마스터 등록·수정·비활성",       stat: "12 WC (5개 공장)",  ref: "SCR-BD-050" },
  { href: "/bd/workcenter/calendar", label: "가용 캘린더",   desc: "WC별 가동 가능 시간대 및 휴무일 관리",       stat: "캘린더 설정",  ref: "SCR-BD-051" },
];

export default function WorkcenterLandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="Work Center"
        nodeRef="SCR-BD-050"
        description="Work Center 마스터 및 가용 캘린더 통합 진입"
      />
      <FieldHeader title="WC 도메인 진입" moduleRef="BD-WORKCENTER" />
      <div className="grid grid-cols-2 gap-4 mt-4 max-w-2xl">
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
    </div>
  );
}
