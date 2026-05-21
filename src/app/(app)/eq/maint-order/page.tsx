import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const cards = [
  { ref: "SCR-EQ-041", route: "/eq/maint-order/detail",   label: "MO 상세",         desc: "작업지시 상세 및 결재 폼" },
  { ref: "SCR-EQ-042", route: "/eq/maint-order/calendar", label: "MO 캘린더",       desc: "월간 정비 일정 캘린더" },
  { ref: "SCR-EQ-043", route: "/eq/maint-order/coord",    label: "라인 정지 협의",  desc: "생산 라인 정지 협의 현황" },
  { ref: "SCR-EQ-044", route: "/eq/maint-order/audit",    label: "MO 감사 로그",    desc: "작업지시 상태 변경 감사" },
];

export default function EQMaintOrderPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="정비 작업지시"
        accent="정비지시"
        nodeRef="SCR-EQ-MO"
        status="PROTOTYPE"
        description="정비 작업지시(MO) 생성·결재·일정·협의 관리."
      />
      <FieldHeader title="하위 화면" moduleRef="SCR 4개" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
