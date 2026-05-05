"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const INIT = [
  { queueId: "RPQ-20260506-003", target: "B01-1-G22C-C-171", type: "MEMBER",  reason: "라벨 훼손",   attempts: 1, maxAttempts: 3, status: "PENDING" as const },
  { queueId: "RPQ-20260506-002", target: "PKG-WO-P3000-20260506-0007-001", type: "PACKING", reason: "출력 오류", attempts: 2, maxAttempts: 3, status: "PENDING" as const },
  { queueId: "RPQ-20260505-010", target: "B01-2-G22C-C-201", type: "MEMBER",  reason: "분실",       attempts: 3, maxAttempts: 3, status: "FAILED" as const },
  { queueId: "RPQ-20260505-008", target: "B02-1-T18B-S-102", type: "MEMBER",  reason: "라벨 훼손",   attempts: 1, maxAttempts: 3, status: "DONE" as const },
  { queueId: "RPQ-20260505-007", target: "PKG-WO-P3000-20260505-0001-001", type: "PACKING", reason: "QR 불량", attempts: 1, maxAttempts: 3, status: "DONE" as const },
];

const STATUS_MAP = {
  PENDING: { type: "warning" as const, label: "대기" },
  DONE:    { type: "running" as const, label: "완료" },
  FAILED:  { type: "error" as const,   label: "실패" },
};

export default function LabelReprintPage() {
  const [rows, setRows] = useState(INIT);

  const reprint = (id: string) =>
    setRows((prev) => prev.map((r) => r.queueId === id && r.status !== "DONE" ? { ...r, status: "PENDING" as const, attempts: r.attempts > r.maxAttempts ? r.attempts : r.attempts } : r));

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="라벨 재인쇄" accent="큐" nodeRef="SCR-WO-031" description="재인쇄 큐 모니터 — 지수 백오프·N회 실패 처리. FNC-WO-011,015,016" />

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-[#f59e0b]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            재인쇄 큐 <span className="opacity-30 font-light ml-2">| {rows.length} 건</span>
          </h3>
          <button className="text-xs opacity-40 hover:opacity-70 font-label uppercase tracking-widest">새로고침</button>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["큐 ID", "대상", "유형", "사유", "시도/최대", "상태", ""].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {rows.map((r) => {
              const s = STATUS_MAP[r.status];
              const isMaxed = r.attempts >= r.maxAttempts;
              return (
                <tr key={r.queueId} className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors ${r.status === "FAILED" ? "bg-error/5" : ""}`}>
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.queueId}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70 max-w-xs truncate">{r.target}</td>
                  <td className="px-4 py-2 text-xs">{r.type}</td>
                  <td className="px-4 py-2 text-xs">{r.reason}</td>
                  <td className={`px-4 py-2 tabular-nums text-xs font-bold ${isMaxed ? "text-error" : ""}`}>{r.attempts}/{r.maxAttempts}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                  <td className="px-4 py-2">
                    {r.status !== "DONE" && (
                      <button onClick={() => reprint(r.queueId)}
                        className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase tracking-widest hover:opacity-90">
                        재인쇄
                      </button>
                    )}
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
