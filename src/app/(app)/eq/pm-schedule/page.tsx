import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const cards = [
  { ref: "SCR-EQ-051", route: "/eq/pm-schedule/list", label: "PM 목록",    desc: "예방정비 계획 목록 조회" },
  { ref: "SCR-EQ-052", route: "/eq/pm-schedule/edit", label: "PM 편집",    desc: "PM 일정 및 체크리스트 편집" },
];

export default function EQPMSchedulePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="PM 스케줄"
        accent="PM SCHEDULE"
        nodeRef="SCR-EQ-PM"
        status="PROTOTYPE"
        description="설비별 예방정비(PM) 계획 수립·관리."
      />
      <FieldHeader title="하위 화면" moduleRef="SCR 2개" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
