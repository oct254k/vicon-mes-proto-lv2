"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const LANES = [
  {
    label: "대기",   color: "border-on-surface-variant",
    cards: [
      { wo: "WO-P3000-20260507-0003", dong: "103동", members: 12, attempt: 1 },
      { wo: "WO-P3000-20260507-0004", dong: "104동", members: 8,  attempt: 2 },
    ],
  },
  {
    label: "진행중", color: "border-primary-accent",
    cards: [
      { wo: "WO-P3000-20260506-0007", dong: "101동", members: 8,  attempt: 1 },
      { wo: "WO-P3000-20260504-0020", dong: "A동",   members: 40, attempt: 1 },
    ],
  },
  {
    label: "지연",   color: "border-error",
    cards: [
      { wo: "WO-P3000-20260505-0012", dong: "201동", members: 60, attempt: 3 },
    ],
  },
  {
    label: "완료",   color: "border-[#f59e0b]",
    cards: [
      { wo: "WO-P3000-20260506-0008", dong: "102동", members: 85, attempt: 1 },
      { wo: "WO-P3000-20260503-0015", dong: "B동",   members: 32, attempt: 1 },
    ],
  },
];

export default function WOKanbanPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="WO 칸반 보드" nodeRef="FNC-OPS-061,062" description="부재 단위 칸반 · attempt_no 배지 · 60초+이벤트 갱신" />

      <div className="grid grid-cols-4 gap-4 mt-4">
        {LANES.map(lane => (
          <div key={lane.label} className={`border-t-4 ${lane.color} bg-surface-container`}>
            <div className="p-3 bg-surface-container-highest/20 border-b border-outline-variant/10">
              <p className="text-xs font-label uppercase tracking-widest font-bold">{lane.label}</p>
              <p className="text-lg font-black tabular-nums">{lane.cards.length}건</p>
            </div>
            <div className="p-3 flex flex-col gap-3">
              {lane.cards.map(c => (
                <div key={c.wo} className="bg-surface border border-outline-variant/10 p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-label text-on-surface-variant">{c.wo}</p>
                    {c.attempt > 1 && (
                      <span className="text-xs font-label bg-error/20 text-error px-1.5 py-0.5 font-bold">#{c.attempt}</span>
                    )}
                  </div>
                  <p className="text-sm font-headline font-bold text-on-surface">{c.dong}</p>
                  <p className="text-xs font-label text-on-surface-variant mt-1">부재 {c.members}개</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs font-label text-on-surface-variant mt-4">마지막 갱신 14:32:18 · # = attempt_no 재시도 횟수</p>
    </div>
  );
}
