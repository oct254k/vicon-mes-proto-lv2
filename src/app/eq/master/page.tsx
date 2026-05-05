import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const cards = [
  { ref: "SCR-EQ-001", route: "/eq/master/tree",    label: "계층 트리",    desc: "4단계 계층 구조 탐색" },
  { ref: "SCR-EQ-002", route: "/eq/master/lineup",  label: "라인업 배치",  desc: "라인별 설비 배치 현황" },
  { ref: "SCR-EQ-003", route: "/eq/master/history", label: "변경 이력",    desc: "설비 속성 변경 감사 로그" },
  { ref: "SCR-EQ-004", route: "/eq/master/edit",    label: "정보 편집",    desc: "설비 마스터 데이터 편집" },
];

export default function EQMasterPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="설비 마스터"
        accent="MASTER"
        nodeRef="SCR-EQ-MASTER"
        status="PROTOTYPE"
        description="Site → Plant → Line → Equipment 4단계 계층 기반 설비 마스터 관리."
      />
      <FieldHeader title="하위 화면" moduleRef="SCR 4개" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <a key={c.ref} href={c.route} className="bg-surface-container-low p-5 block hover:border-l-4 hover:border-primary-accent transition-all">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">{c.ref}</p>
            <p className="font-headline font-bold text-sm mb-1">{c.label}</p>
            <p className="text-xs text-on-surface/50">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
