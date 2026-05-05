import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const checks = [
  "윤활유 보충 및 오일 레벨 점검",
  "칼날 마모도 측정 및 교체 여부 판단",
  "진동·소음 이상 유무 확인",
  "전기 패널 단자 조임 상태 점검",
  "냉각수 수위 및 오염도 확인",
  "안전 커버·가드 체결 상태 점검",
];

export default function EQPMScheduleEditPage() {
  return (
    <div className="p-8">
      <PageHeader title="PM 일정 편집" accent="PM EDIT" nodeRef="SCR-EQ-052" description="PM 일정 및 점검 체크리스트 편집." />
      <FieldHeader title="기본 정보" moduleRef="FR-EQ-062" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          ["PM 번호", "PM-2026-001"],
          ["설비 코드", "EQ-P3-CUT-01"],
          ["PM 유형", "월간PM"],
          ["주기(일)", "30"],
          ["다음 예정일", "2026-05-10"],
          ["담당자", "홍길동"],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{k}</label>
            <input defaultValue={v} className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent" />
          </div>
        ))}
      </div>
      <FieldHeader title="점검 체크리스트" moduleRef="FR-EQ-063" />
      <div className="space-y-2 mb-8">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-3 bg-surface-container-low p-3">
            <input type="checkbox" className="accent-primary-accent w-4 h-4" />
            <span className="font-headline text-sm">{c}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="bg-primary-accent text-black font-label font-bold text-xs uppercase tracking-widest px-6 py-2">저장</button>
        <button className="bg-surface-container text-on-surface font-label font-bold text-xs uppercase tracking-widest px-6 py-2">취소</button>
      </div>
    </div>
  );
}
