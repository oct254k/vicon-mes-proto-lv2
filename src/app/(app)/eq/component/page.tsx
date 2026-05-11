import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const cards = [
  { ref: "SCR-EQ-031", route: "/eq/component/history", label: "교체 이력",    desc: "부품별 교체 이력 목록" },
  { ref: "SCR-EQ-032", route: "/eq/component/cost",    label: "교체 비용",    desc: "부품 교체 비용 집계" },
  { ref: "SCR-EQ-033", route: "/eq/component/topn",    label: "교체 빈도 Top-N", desc: "교체 빈도 상위 부품 분석" },
];

export default function EQComponentPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Component"
        accent="부품 관리"
        nodeRef="SCR-EQ-COMP"
        status="PROTOTYPE"
        description="설비 구성 부품 교체 이력·비용·빈도 분석 관리."
      />
      <FieldHeader title="하위 화면" moduleRef="SCR 3개" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <a key={c.ref} href={c.route} className="bg-surface-container-low p-5 block hover:border-l-4 hover:border-primary-accent transition-all">
            <p className="font-headline font-bold text-sm mb-1">{c.label}</p>
            <p className="text-xs text-on-surface/50">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
