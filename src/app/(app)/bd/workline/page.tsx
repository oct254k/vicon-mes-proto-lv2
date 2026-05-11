import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  { href: "/bd/workline/list",      label: "공정라인 목록",    desc: "공정라인 마스터 등록·수정·다중 인스턴스 관리",  stat: "3 라인",      ref: "SCR-BD-040" },
  { href: "/bd/workline/steps",     label: "공정 시퀀스",     desc: "operation_code 게이트 기반 공정 순서 설정",     stat: "시퀀스 설정", ref: "SCR-BD-041" },
  { href: "/bd/workline/visualize", label: "Plant별 흐름도",  desc: "Plant별 공정라인 흐름 텍스트 시각화",           stat: "시각화",      ref: "SCR-BD-042" },
];

export default function WorklineLandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공정라인"
        nodeRef="SCR-BD-040"
        description="공정라인 마스터·공정 시퀀스·Plant별 흐름도 통합 진입"
      />
      <FieldHeader title="공정라인 도메인 진입" moduleRef="BD-WORKLINE" />
      <div className="grid grid-cols-3 gap-4 mt-4">
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
