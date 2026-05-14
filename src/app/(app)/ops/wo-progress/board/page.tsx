"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const KPI = [
  { label: "진행 WO",   value: "24건",  color: "text-primary-accent" },
  { label: "계획 대비",  value: "91%",   color: "text-primary-accent" },
  { label: "지연 WO",   value: "3건",   color: "text-error" },
  { label: "금일 완료", value: "7건",   color: "text-on-surface" },
];

const ROWS = [
  { wo: "WO-P3000-20260506-0007", so: "SO-2026-0301", dong: "101동", plan: 120, done: 94, rate: 78, dday: 5,  status: "진행" },
  { wo: "WO-P3000-20260506-0008", so: "SO-2026-0301", dong: "102동", plan: 85,  done: 85, rate: 100, dday: 2, status: "완료" },
  { wo: "WO-P3000-20260505-0012", so: "SO-2026-0259", dong: "201동", plan: 60,  done: 21, rate: 35,  dday: 1, status: "지연" },
  { wo: "WO-P3000-20260504-0020", so: "SO-2026-0287", dong: "A동",   plan: 40,  done: 38, rate: 95,  dday: 8, status: "진행" },
];

const COLS = [
  { key: "wo",     label: "WO번호" },
  { key: "so",     label: "수주번호" },
  { key: "dong",   label: "동" },
  { key: "plan",   label: "계획" },
  { key: "done",   label: "완료" },
  { key: "rate",   label: "진척률" },
  { key: "dday",   label: "D-day" },
  { key: "status", label: "상태" },
];

export default function WOProgressBoardPage() {
  const data = ROWS.map(r => ({
    wo: r.wo, so: r.so, dong: r.dong,
    plan: `${r.plan}건`, done: `${r.done}건`,
    rate: `${r.rate}%`, dday: `D-${r.dday}`, status: r.status,
  }));

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="WO 진척 보드" nodeRef="FNC-OPS-060,063,064" description="계획 대비 진척 · 60초 갱신" />

      <div className="grid grid-cols-4 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <a href="/ops/wo-progress/kanban" className="bg-surface-container px-4 py-2 text-xs font-label hover:border hover:border-primary-accent/40">칸반 보드</a>
        <span className="text-xs font-label text-on-surface-variant self-center">마지막 갱신 14:32:18</span>
      </div>

      {/* 진척 막대 시각화 */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {ROWS.map(r => (
          <div key={r.wo} className="bg-surface-container p-4">
            <div className="flex justify-between text-xs font-label mb-1">
              <span className="text-on-surface-variant">{r.wo}</span>
              <span className={r.status==="지연"?"text-error":r.status==="완료"?"text-primary-accent":"text-on-surface"}>{r.status}</span>
            </div>
            <div className="h-3 bg-surface-container-highest/30 mb-1">
              <div className={`h-3 ${r.rate>=80?"bg-primary-accent":r.rate>=60?"bg-warning":"bg-error"}`} style={{width:`${r.rate}%`}} />
            </div>
            <div className="flex justify-between text-xs font-label text-on-surface-variant">
              <span>{r.dong} · {r.done}/{r.plan}건</span><span>D-{r.dday}</span>
            </div>
          </div>
        ))}
      </div>

      <DataTable title="WO 진척 상세" bufferCount={data.length} columns={COLS} data={data} />
    </div>
  );
}
