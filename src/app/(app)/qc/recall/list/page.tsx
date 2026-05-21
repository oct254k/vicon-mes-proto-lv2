"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type RecallStep = "DRAFT" | "REVIEWED" | "CONFIRMED" | "NOTIFIED" | "CLOSED";

const MOCK_RECALLS = [
  { id: "RECALL-2026-0003", defect: "용접부 균열 치수 불량", partCount: 17, step: "NOTIFIED" as RecallStep, manager: "김QC", startDate: "2026-05-03" },
  { id: "RECALL-2026-0002", defect: "도장 두께 기준 미달", partCount: 8,  step: "CLOSED"   as RecallStep, manager: "이관리", startDate: "2026-04-21" },
  { id: "RECALL-2026-0001", defect: "볼트 토크 미달",      partCount: 4,  step: "CLOSED"   as RecallStep, manager: "박검사", startDate: "2026-03-15" },
  { id: "RECALL-2025-0009", defect: "모재 두께 편차 초과", partCount: 23, step: "CLOSED"   as RecallStep, manager: "김QC",  startDate: "2025-12-07" },
  { id: "RECALL-2026-0004", defect: "열처리 불량 (경도 부족)", partCount: 6, step: "CONFIRMED" as RecallStep, manager: "이관리", startDate: "2026-05-04" },
];

function stepStyle(step: RecallStep): { type: "running" | "warning" | "idle" | "stopped"; label: string } {
  if (step === "DRAFT")     return { type: "warning", label: "초안" };
  if (step === "REVIEWED")  return { type: "warning", label: "검토됨" };
  if (step === "CONFIRMED") return { type: "running", label: "확정" };
  if (step === "NOTIFIED")  return { type: "running", label: "통보됨" };
  return { type: "idle", label: "종료" };
}

const ALL_STEPS: RecallStep[] = ["DRAFT", "REVIEWED", "CONFIRMED", "NOTIFIED", "CLOSED"];

export default function QCRecallListPage() {
  const [stepFilter, setStepFilter] = useState<RecallStep | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = MOCK_RECALLS.filter(r => {
    if (stepFilter !== "ALL" && r.step !== stepFilter) return false;
    if (search && !r.id.includes(search) && !r.defect.includes(search)) return false;
    return true;
  });

  const columns = ["회수 ID", "발생 불량", "영향 부재 수", "현재 단계", "담당자", "시작일"];

  return (
    <div>
      <PageHeader
        title="불량품 회수 목록"
       
        nodeRef="IA-QC-RECALL-LIST"
        status="PROTOTYPE"
        description="전체 회수 이력 및 현재 진행 단계 조회"
      />

      {/* 필터 바 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">검색</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="회수 ID / 불량 내용"
            className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-56"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">단계</label>
          <select
            value={stepFilter}
            onChange={e => setStepFilter(e.target.value as RecallStep | "ALL")}
            className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label"
          >
            <option value="ALL">전체</option>
            {ALL_STEPS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest self-end">검색</button>
      </div>

      {/* 단계별 집계 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {ALL_STEPS.map(s => {
          const b = stepStyle(s);
          const cnt = MOCK_RECALLS.filter(r => r.step === s).length;
          return (
            <div key={s} className="flex items-center gap-2">
              <StatusBadge type={b.type} label={b.label} />
              <span className="text-xs tabular-nums opacity-60 font-label">{cnt}건</span>
            </div>
          );
        })}
      </div>

      <FieldHeader title="회수 목록" moduleRef={`${filtered.length}건`} />

      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {columns.map(c => (
                <th key={c} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {filtered.map(r => {
              const b = stepStyle(r.step);
              return (
                <tr key={r.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                  <td className="px-4 py-2 text-primary-accent font-bold">{r.id}</td>
                  <td className="px-4 py-2">{r.defect}</td>
                  <td className="px-4 py-2 tabular-nums">{r.partCount}</td>
                  <td className="px-4 py-2"><StatusBadge type={b.type} label={b.label} /></td>
                  <td className="px-4 py-2 opacity-70">{r.manager}</td>
                  <td className="px-4 py-2 tabular-nums opacity-70">{r.startDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-30 font-label mt-2 text-right">합계 {filtered.length}건</p>
    </div>
  );
}
