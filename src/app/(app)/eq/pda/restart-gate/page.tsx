"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const gates = [
  { id: 1, category: "안전",  item: "안전 가드 및 커버 완전 체결 확인",    checked: true  },
  { id: 2, category: "안전",  item: "주변 작업자 대피 및 안전 구역 확보",  checked: true  },
  { id: 3, category: "정비",  item: "교체 부품 S/N 등록 완료",             checked: true  },
  { id: 4, category: "정비",  item: "사용 공구 및 잔류 이물질 제거",        checked: false },
  { id: 5, category: "기능",  item: "유압·공압 라인 정상 압력 확인",        checked: false },
  { id: 6, category: "기능",  item: "인터락 및 비상정지 정상 작동 확인",    checked: false },
  { id: 7, category: "승인",  item: "정비팀장 최종 서명",                   checked: false },
];

export default function EQPdaRestartGatePage() {
  const passedCnt = gates.filter((g) => g.checked).length;
  const allPassed = passedCnt === gates.length;

  return (
    <div className="p-8">
      <PageHeader title="PDA 재가동 게이트" accent="RESTART GATE" nodeRef="SCR-EQ-096" description="정비 완료 후 설비 재가동 허가 체크게이트." />
      <FieldHeader title={`재가동 게이트 확인 (${passedCnt}/${gates.length})`} moduleRef="FR-EQ-096" />
      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-6 flex items-center gap-4">
        <div>
          <p className="font-label text-xs opacity-50 mb-1">대상 설비</p>
          <p className="font-headline font-black text-sm">EQ-P3-CUT-01 / MO-2026-0501-001</p>
        </div>
        <div className="ml-auto">
          <StatusBadge type={allPassed ? "running" : "warning"} label={allPassed ? "재가동 허가" : "게이트 미완료"} />
        </div>
      </div>
      <div className="space-y-2 mb-8">
        {gates.map((g) => (
          <div key={g.id} className={`flex items-center gap-4 p-4 ${g.checked ? "bg-primary-accent/10 border-l-4 border-primary-accent" : "bg-surface-container-low"}`}>
            <div className={`w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center ${g.checked ? "border-primary-accent bg-primary-accent" : "border-outline-variant/30"}`}>
              {g.checked && <span className="text-black text-xs font-black">V</span>}
            </div>
            <span className="font-label text-xs opacity-40 w-12 flex-shrink-0 uppercase">{g.category}</span>
            <span className="font-headline text-sm">{g.item}</span>
          </div>
        ))}
      </div>
      <button disabled={!allPassed} className={`font-label font-bold text-xs uppercase tracking-widest px-8 py-3 ${allPassed ? "bg-primary-accent text-white" : "bg-surface-container text-on-surface/30 cursor-not-allowed"}`}>
        재가동 승인 제출
      </button>
    </div>
  );
}
