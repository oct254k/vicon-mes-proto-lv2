import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  { href: "/bd/common/audit",  label: "감사 로그",   desc: "마스터 데이터 변경 이력 전체 조회",        stat: "전체 이력",  ref: "SCR-BD-120" },
  { href: "/bd/common/import", label: "CSV Import",  desc: "마스터 종류 선택 후 CSV·Excel 일괄 업로드", stat: "일괄 등록",  ref: "SCR-BD-121" },
  { href: "/bd/common/export", label: "CSV Export",  desc: "마스터 종류·조건 선택 후 CSV·Excel 내보내기", stat: "일괄 내보내기", ref: "SCR-BD-122" },
];

export default function CommonLandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공통 정책"
        nodeRef="SCR-BD-120"
        description="감사 로그, CSV Import/Export 공통 기능 통합 진입"
      />
      <FieldHeader title="공통 정책 진입" moduleRef="BD-COMMON" />
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
