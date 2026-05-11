"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const STEPS = ["절단", "천공", "용접", "조립", "검사", "도장"];

const MEMBERS_BY_STEP: Record<string, { id: string; rate: number; status: string }[]> = {
  절단: [{ id: "B01-101-C-171", rate: 100, status: "DONE" }, { id: "B01-101-C-172", rate: 100, status: "DONE" }],
  천공: [{ id: "B01-101-C-171", rate: 100, status: "DONE" }, { id: "B01-102-C-201", rate: 60,  status: "IN_PROGRESS" }],
  용접: [{ id: "B01-101-C-171", rate: 70,  status: "IN_PROGRESS" }, { id: "B01-201-C-301", rate: 0, status: "FAILED" }],
  조립: [{ id: "B01-101-C-172", rate: 40,  status: "IN_PROGRESS" }],
  검사: [],
  도장: [],
};

const COLS = [
  { key: "step",   label: "공정 단계" },
  { key: "total",  label: "총 부재" },
  { key: "done",   label: "완료" },
  { key: "inprog", label: "진행중" },
  { key: "failed", label: "실패" },
  { key: "rate",   label: "진척률" },
];

const DATA = STEPS.map(s => {
  const items = MEMBERS_BY_STEP[s] || [];
  const done   = items.filter(i => i.status === "DONE").length;
  const inprog = items.filter(i => i.status === "IN_PROGRESS").length;
  const failed = items.filter(i => i.status === "FAILED").length;
  const rate   = items.length ? Math.round((done / items.length) * 100) : 0;
  return { step: s, total: `${items.length}건`, done: `${done}`, inprog: `${inprog}`, failed: `${failed}`, rate: `${rate}%` };
});

export default function PlantProcessStepPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="공정 단계 진척" nodeRef="FNC-OPS-027" description="단계별 부재 카드 현황 · 60초 갱신" />

      {/* 공정 단계 카드 열 */}
      <div className="grid grid-cols-6 gap-3 mb-5">
        {STEPS.map(s => {
          const items = MEMBERS_BY_STEP[s] || [];
          const done = items.filter(i => i.status === "DONE").length;
          const inprog = items.filter(i => i.status === "IN_PROGRESS").length;
          const failed = items.filter(i => i.status === "FAILED").length;
          return (
            <div key={s} className="bg-surface-container p-3">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">{s}</p>
              <p className="text-2xl font-black tabular-nums text-on-surface mb-2">{items.length}건</p>
              <div className="space-y-1">
                <p className="text-xs font-label text-primary-accent">완료 {done}</p>
                <p className="text-xs font-label text-[#f59e0b]">진행 {inprog}</p>
                <p className="text-xs font-label text-error">실패 {failed}</p>
              </div>
              {items.length > 0 && (
                <div className="h-2 bg-surface-container-highest/30 mt-2">
                  <div className="h-2 bg-primary-accent" style={{width:`${(done/items.length)*100}%`}} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DataTable title="공정 단계 DataTable" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
