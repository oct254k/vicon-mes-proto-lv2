"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK_WOS = [
  { id: "WO-P3000-20260506-0007", kind: "반제품", plant: "P3000", state: "IN_PROGRESS", priority: "#3", lineCount: 12, releasedAt: "2026-05-06" },
  { id: "WO-P3000-20260506-0008", kind: "완제품", plant: "P3000", state: "RELEASED",    priority: "#4", lineCount: 12, releasedAt: "2026-05-06" },
  { id: "WO-P3000-20260505-0002", kind: "반제품", plant: "P3000", state: "COMPLETED",   priority: "#1", lineCount:  8, releasedAt: "2026-05-05" },
  { id: "WO-P3000-20260504-0001", kind: "완제품", plant: "P3000", state: "CANCELLED",   priority: "#5", lineCount: 10, releasedAt: "2026-05-04" },
  { id: "WO-P2000-20260506-0003", kind: "완제품", plant: "P2000", state: "RELEASED",    priority: "#2", lineCount:  6, releasedAt: "2026-05-06" },
];

type WoState = "RELEASED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

function stateLabel(state: string): { type: "running" | "warning" | "idle" | "stopped"; label: string } {
  if (state === "RELEASED")    return { type: "running", label: "RELEASED" };
  if (state === "IN_PROGRESS") return { type: "warning", label: "IN_PROGRESS" };
  if (state === "COMPLETED")   return { type: "idle",    label: "COMPLETED" };
  return { type: "stopped", label: "CANCELLED" };
}

const STATE_OPTIONS: WoState[] = ["RELEASED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export default function WOOrdersPage() {
  const [plant, setPlant]   = useState("ALL");
  const [states, setStates] = useState<WoState[]>(["RELEASED", "IN_PROGRESS"]);
  const [dateFrom, setDateFrom] = useState("2026-05-01");
  const [dateTo, setDateTo]     = useState("2026-05-06");

  function toggleState(s: WoState) {
    setStates(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  const filtered = MOCK_WOS.filter(w => {
    if (plant !== "ALL" && w.plant !== plant) return false;
    if (states.length > 0 && !states.includes(w.state as WoState)) return false;
    if (w.releasedAt < dateFrom || w.releasedAt > dateTo) return false;
    return true;
  });

  const columns = [
    { key: "id",         label: "WO ID" },
    { key: "kind",       label: "유형" },
    { key: "plant",      label: "Plant" },
    { key: "stateBadge", label: "상태" },
    { key: "priority",   label: "우선순위" },
    { key: "lineCount",  label: "부재 수" },
    { key: "releasedAt", label: "발행일" },
  ];

  const tableData = filtered.map(w => {
    const s = stateLabel(w.state);
    return { ...w, stateBadge: `[${s.label}]` };
  });

  return (
    <div>
      <PageHeader title="작업지시 목록" accent="SCR-WO-003" nodeRef="IA-WO-ORDERS-LIST" status="PROTOTYPE" />

      {/* 필터 바 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">Plant</label>
          <select
            value={plant}
            onChange={e => setPlant(e.target.value)}
            className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label"
          >
            <option value="ALL">전체</option>
            <option value="P1000">P1000</option>
            <option value="P2000">P2000</option>
            <option value="P3000">P3000</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">상태</label>
          <div className="flex gap-2">
            {STATE_OPTIONS.map(s => (
              <label key={s} className="flex items-center gap-1 text-xs font-label cursor-pointer">
                <input type="checkbox" checked={states.includes(s)} onChange={() => toggleState(s)} className="accent-primary-accent" />
                {s}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">발행일</label>
          <div className="flex gap-2 items-center">
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              className="bg-surface-container-high text-on-surface text-xs px-2 py-1.5 border border-outline-variant/20 font-label" />
            <span className="text-xs opacity-40">~</span>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              className="bg-surface-container-high text-on-surface text-xs px-2 py-1.5 border border-outline-variant/20 font-label" />
          </div>
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest self-end">검색</button>
        <button className="px-4 py-1.5 bg-surface-container-high text-on-surface text-xs font-label uppercase tracking-widest self-end border border-outline-variant/20">초기화</button>
      </div>

      <FieldHeader title="WO 목록" moduleRef={`${filtered.length}건`} />

      {/* 상태 배지 범례 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {STATE_OPTIONS.map(s => { const b = stateLabel(s); return <StatusBadge key={s} type={b.type} label={b.label} />; })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-surface-container-lowest">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {columns.map(c => <th key={c.key} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{c.label}</th>)}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {filtered.map(row => {
              const s = stateLabel(row.state);
              return (
                <tr key={row.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                  <td className="px-4 py-2 text-primary-accent font-bold">{row.id}</td>
                  <td className="px-4 py-2">{row.kind}</td>
                  <td className="px-4 py-2">{row.plant}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                  <td className="px-4 py-2">{row.priority}</td>
                  <td className="px-4 py-2 tabular-nums">{row.lineCount}</td>
                  <td className="px-4 py-2 tabular-nums opacity-70">{row.releasedAt}</td>
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
