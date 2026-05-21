"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const items = [
  { id: 1, category: "윤활", text: "윤활유 보충 및 오일 레벨 점검" },
  { id: 2, category: "윤활", text: "윤활 라인 누유 여부 확인" },
  { id: 3, category: "칼날", text: "칼날 마모도 측정 (기준: <0.5mm)" },
  { id: 4, category: "칼날", text: "칼날 고정 볼트 조임 상태 확인" },
  { id: 5, category: "전기", text: "전기 패널 단자 조임 상태 점검" },
  { id: 6, category: "전기", text: "인터락 정상 작동 확인" },
  { id: 7, category: "안전", text: "안전 커버 및 가드 체결 상태 확인" },
  { id: 8, category: "냉각", text: "냉각수 수위 및 오염도 확인" },
];

export default function EQPdaChecklistPage() {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (id: number) =>
    setChecked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const pct = Math.round((checked.length / items.length) * 100);

  return (
    <div className="p-8">
      <PageHeader title="PDA 점검 체크리스트" accent="CHECKLIST" nodeRef="SCR-EQ-093" description="PM 작업 현장 점검 체크리스트 입력." />
      <FieldHeader title={`PM-2026-001 / EQ-P3-CUT-01 (${checked.length}/${items.length})`} moduleRef={`${pct}% 완료`} />
      <div className="h-1 bg-surface-container-highest w-full mb-6">
        <div className="h-1 bg-primary-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-2 mb-8">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${checked.includes(item.id) ? "bg-primary-accent/10 border-l-4 border-primary-accent" : "bg-surface-container-low"}`}
          >
            <div className={`w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center ${checked.includes(item.id) ? "border-primary-accent bg-primary-accent" : "border-outline-variant/30"}`}>
              {checked.includes(item.id) && <span className="text-black text-xs font-black">V</span>}
            </div>
            <span className="font-label text-xs opacity-40 w-12 flex-shrink-0 uppercase">{item.category}</span>
            <span className="font-headline text-sm">{item.text}</span>
          </button>
        ))}
      </div>
      <button className="bg-primary-accent text-white font-label font-bold text-xs uppercase tracking-widest px-8 py-3">
        체크리스트 제출
      </button>
    </div>
  );
}
