import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  { href: "/bd/supplier/list",  label: "공급사 목록",      desc: "공급사 마스터 CRUD 및 거래 상태 관리", stat: "15개 공급사", ref: "SCR-BD-070" },
  { href: "/bd/supplier/price", label: "공급사 단가표",     desc: "공급사×자재 가격 매트릭스 등록·조회", stat: "단가 매트릭스", ref: "SCR-BD-071" },
  { href: "/bd/supplier/grade", label: "공급사 등급 평가",  desc: "납기·품질·가격 점수 자동 집계 결과", stat: "등급 대시보드", ref: "SCR-BD-072" },
];

export default function SupplierLandingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공급사 관리"
        nodeRef="SCR-BD-070"
        description="공급사 마스터, 단가 매트릭스, 등급 평가 결과 통합 진입"
      />
      <FieldHeader title="공급사 도메인 진입" moduleRef="BD-SUPPLIER" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-surface-container-lowest border border-outline-variant/20 p-6 hover:border-primary-accent/50 hover:bg-surface-container transition-colors block"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-headline font-black text-sm uppercase tracking-widest text-primary-accent">
                {card.label}
              </h3>
              <span className="text-xs font-label opacity-30">{card.ref}</span>
            </div>
            <p className="text-sm text-on-surface-variant/70 mb-4">{card.desc}</p>
            <span className="text-xs font-label uppercase tracking-wider bg-surface-container-highest/50 px-2 py-1 text-on-surface/50">
              {card.stat}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
