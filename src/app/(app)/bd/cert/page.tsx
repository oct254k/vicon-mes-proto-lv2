import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  { href: "/bd/cert/list",    label: "KS 인증 목록",      desc: "KS 인증 등록·갱신·D-day 표시",              stat: "6 인증",         ref: "SCR-BD-110" },
  { href: "/bd/cert/monitor", label: "만료 모니터링",      desc: "D-30 / D-7 구간별 만료 예정 인증 대시보드",  stat: "모니터링",       ref: "SCR-BD-111" },
];

export default function CertLandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="KS 인증 관리"
        nodeRef="SCR-BD-110"
        description="KS 인증 등록·갱신 및 만료 모니터링 통합 진입"
      />
      <FieldHeader title="KS 인증 도메인 진입" moduleRef="BD-CERT" />
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
