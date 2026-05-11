import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  { href: "/bd/defect-type/list", label: "불량항목 목록", desc: "카테고리별 불량 유형 등록·수정·비활성", stat: "34 항목 / 6 카테고리", ref: "SCR-BD-100" },
];

const STATS = [
  { label: "치수 불량", count: "8" },
  { label: "용접 불량", count: "7" },
  { label: "외관 불량", count: "6" },
  { label: "재료 불량", count: "5" },
  { label: "도장 불량", count: "4" },
  { label: "기타",      count: "4" },
];

export default function DefectTypeLandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="불량항목 관리"
        nodeRef="SCR-BD-100"
        description="QC 불량 유형 카테고리·세부 항목 마스터 관리"
      />
      <FieldHeader title="불량항목 도메인 진입" moduleRef="BD-DEFECT-TYPE" />
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
      <FieldHeader title="카테고리별 현황" moduleRef="" />
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest border border-outline-variant/20 p-4 flex justify-between items-center">
            <span className="text-sm">{s.label}</span>
            <span className="text-primary-accent font-headline font-black text-lg">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
