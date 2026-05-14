"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const INIT = [
  { woId: "WO-P3000-20260506-0007", member: "B01-1-G22C-C-171", qty: 12, dueDate: "2026-05-10", status: "RELEASED" as const },
  { woId: "WO-P3000-20260506-0008", member: "B01-2-G22C-C-201", qty: 8,  dueDate: "2026-05-10", status: "RELEASED" as const },
  { woId: "WO-P3000-20260507-0003", member: "B02-1-T18B-C-101", qty: 20, dueDate: "2026-05-12", status: "DRAFT" as const },
  { woId: "WO-P3000-20260507-0004", member: "B02-1-T18B-S-102", qty: 10, dueDate: "2026-05-12", status: "DRAFT" as const },
  { woId: "WO-P3000-20260508-0001", member: "B03-1-G22C-C-301", qty: 15, dueDate: "2026-05-15", status: "DRAFT" as const },
  { woId: "WO-P3000-20260508-0002", member: "B01-2-G22C-H-202", qty: 6,  dueDate: "2026-05-20", status: "DRAFT" as const },
];

const STATUS_MAP = {
  RELEASED: { type: "running" as const, label: "발행" },
  DRAFT:    { type: "idle" as const,    label: "대기" },
};

export default function WoOrdersPriorityPage() {
  const [rows, setRows] = useState(INIT.map((r, i) => ({ ...r, rank: i + 1 })));
  const [drag, setDrag] = useState<number | null>(null);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...rows];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setRows(next.map((r, i) => ({ ...r, rank: i + 1 })));
  };
  const moveDown = (idx: number) => {
    if (idx === rows.length - 1) return;
    const next = [...rows];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setRows(next.map((r, i) => ({ ...r, rank: i + 1 })));
  };

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="WO 우선순위" accent="재정렬" nodeRef="SCR-WO-004" description="WO 발행 우선순위를 드래그 또는 ▲▼ 버튼으로 재정렬합니다. — FNC-WO-008" />

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          납기 자동 정렬
        </button>
        <button className="px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          저장
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">우선순위 목록</h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["순위", "WO ID", "부재 코드", "수량", "납기일", "상태", "이동"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {rows.map((r, i) => {
              const s = STATUS_MAP[r.status];
              return (
                <tr key={r.woId} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums font-black text-primary-accent text-lg">{r.rank}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.woId}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{r.member}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.qty}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.dueDate}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1">
                      <button onClick={() => moveUp(i)}   className="px-2 py-1 bg-surface-container text-xs hover:bg-surface-container-high disabled:opacity-20" disabled={i === 0}>▲</button>
                      <button onClick={() => moveDown(i)} className="px-2 py-1 bg-surface-container text-xs hover:bg-surface-container-high disabled:opacity-20" disabled={i === rows.length - 1}>▼</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
