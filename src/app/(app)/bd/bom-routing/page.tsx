import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const CARDS = [
  {
    href: "/bd/bom",
    label: "BOM 관리",
    desc: "다단계 BOM 등록·버전 관리·발행",
    stat: "36 BOM / 28 Active",
    ref: "SCR-BD-020",
  },
  {
    href: "/bd/routing",
    label: "Routing 관리",
    desc: "공정 순서 등록·활성화·폐기",
    stat: "48 Routing / 35 Active",
    ref: "SCR-BD-030",
  },
  {
    href: "/bd/bom?view=asof",
    label: "BOM As-of 조회",
    desc: "특정 시점 BOM 스냅샷 조회",
    stat: "시점 조회",
    ref: "SCR-BD-023",
  },
  {
    href: "/bd/routing?view=asof",
    label: "Routing As-of 조회",
    desc: "특정 시점 Routing 스냅샷 조회",
    stat: "시점 조회",
    ref: "SCR-BD-032",
  },
];

export default function BomRoutingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="BOM · Routing"
        nodeRef="SCR-BD-020"
        description="BOM 다단계 등록·버전 관리, Routing 공정 순서 등록·활성화"
      />
      <FieldHeader title="BOM · Routing 통합 진입" moduleRef="BD-BOM-ROUTING" />
      <div className="grid grid-cols-2 gap-4 mt-4">
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
