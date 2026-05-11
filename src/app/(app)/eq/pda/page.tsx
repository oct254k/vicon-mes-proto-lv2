"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const TODAY_INSPECTIONS = 5;
const COMPLETED = 2;
const PENDING = 3;

const RECENT = [
  { equip: "EQ-P3000-CUT-01", action: "일일 점검", time: "08:32", done: true  },
  { equip: "EQ-P3000-WLD-01", action: "일일 점검", time: "09:15", done: true  },
  { equip: "EQ-P2000-PNT-02", action: "일일 점검", time: "—",     done: false },
  { equip: "EQ-P3000-CUT-02", action: "일일 점검", time: "—",     done: false },
  { equip: "EQ-P1000-ASM-01", action: "일일 점검", time: "—",     done: false },
];

export default function EQPdaPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="설비관리 /"
        accent="설비팀 PDA"
        nodeRef="SCR-EQ-064"
        description="현장 점검·이상 보고·부품 교체 PDA 인터페이스"
      />

      <div className="max-w-sm mx-auto mt-8">
        {/* KPI */}
        <div className="bg-surface-container-lowest border border-outline-variant/10 p-6 mb-4 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mb-2">오늘 점검 설비</p>
          <p className="font-headline font-black text-5xl tabular-nums text-primary-accent">{TODAY_INSPECTIONS}</p>
          <p className="text-xs text-on-surface/40 mt-1 font-label uppercase tracking-wider">Units to Inspect</p>
        </div>

        {/* 진행 요약 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-4 text-center">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">완료</p>
            <p className="font-headline font-black text-2xl tabular-nums text-primary-accent">{COMPLETED}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-4 text-center">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">미완료</p>
            <p className="font-headline font-black text-2xl tabular-nums text-[#f59e0b]">{PENDING}</p>
          </div>
        </div>

        {/* PDA 버튼 그룹 */}
        <div className="flex flex-col gap-4 mb-6">
          <button className="w-full bg-primary-accent text-white py-5 text-base font-headline font-black uppercase tracking-widest hover:bg-primary-accent/80 transition-colors flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-xl">checklist</span>
            일일 점검
          </button>

          <button className="w-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] py-5 text-base font-headline font-black uppercase tracking-widest hover:bg-[#f59e0b]/30 transition-colors flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-xl">warning</span>
            이상 보고
          </button>

          <button className="w-full bg-surface-container border border-outline-variant/20 text-on-surface/80 py-5 text-base font-headline font-black uppercase tracking-widest hover:bg-surface-container-high/40 transition-colors flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-xl">build</span>
            부품 교체
          </button>
        </div>

        {/* 오늘 점검 목록 */}
        <div className="bg-surface-container-lowest border border-outline-variant/10">
          <div className="px-4 py-3 border-b border-outline-variant/10">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/50">오늘 점검 목록</p>
          </div>
          {RECENT.map((r, i) => (
            <div key={i} className="px-4 py-3 flex items-center justify-between border-b border-outline-variant/5 last:border-0">
              <div>
                <p className="text-xs font-headline font-bold">{r.equip}</p>
                <p className="text-xs text-on-surface/40">{r.action}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs tabular-nums text-on-surface/40">{r.time}</span>
                <span className={`w-2 h-2 rounded-full ${r.done ? "bg-primary-accent" : "bg-[#f59e0b]"}`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
