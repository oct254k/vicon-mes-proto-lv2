"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type NotiStatus = "UNRESOLVED" | "READ" | "RESOLVED";
interface Noti { id: string; type: string; title: string; ts: string; status: NotiStatus; }

const INITIAL: Noti[] = [
  { id: "N-2026-0512", type: "MATERIAL_SHORTAGE", title: "자재 부족 — M-COIL-B 부족 40m (SO-2026-0042)",      ts: "2026-05-05 09:42", status: "UNRESOLVED" },
  { id: "N-2026-0513", type: "MRP_DONE",          title: "MRP 재실행 완료 — run #20260505-0011 SLA 02:31",    ts: "2026-05-05 09:45", status: "READ" },
  { id: "N-2026-0514", type: "SLA_BREACH",        title: "SLA 지연 — run #20260505-0009 06:12 초과",          ts: "2026-05-05 08:14", status: "UNRESOLVED" },
  { id: "N-2026-0511", type: "PLAN_CHANGE",       title: "일일 계획 변경 — P3000 / 2026-05-05 재확정",         ts: "2026-05-05 08:00", status: "RESOLVED" },
  { id: "N-2026-0510", type: "STOCK_UPDATE",      title: "재고 업데이트 — M-PLATE-C 1,200kg 입고 완료",        ts: "2026-05-04 17:30", status: "RESOLVED" },
  { id: "N-2026-0509", type: "MATERIAL_SHORTAGE", title: "자재 부족 — M-PIPE-F 부족 60m (SO-2026-0041)",      ts: "2026-05-04 16:00", status: "READ" },
];

const STATUS_MAP: Record<NotiStatus, { type: "running" | "stopped" | "warning" | "idle" | "error"; label: string }> = {
  UNRESOLVED: { type: "warning",  label: "미처리" },
  READ:       { type: "idle",     label: "읽음" },
  RESOLVED:   { type: "running",  label: "완료" },
};

export default function NotiInboxPage() {
  const [items, setItems] = useState<Noti[]>(INITIAL);

  const resolve = (id: string) => setItems((p) => p.map((n) => n.id === id ? { ...n, status: "RESOLVED" } : n));
  const dismiss = (id: string) => setItems((p) => p.map((n) => n.id === id ? { ...n, status: "READ" } : n));

  const columns = ["유형", "제목", "발생 시각", "처리 상태", "액션"];

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="SP" accent="알림 인박스" nodeRef="SCR-SP-040" />

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">알림 목록</h3>
          <span className="text-xs text-on-surface-variant">{items.filter((n) => n.status === "UNRESOLVED").length} 미처리</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {columns.map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {items.map((n) => (
                <tr key={n.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                  <td className="px-4 py-2 text-xs font-mono text-on-surface-variant">{n.type}</td>
                  <td className="px-4 py-2">{n.title}</td>
                  <td className="px-4 py-2 tabular-nums text-on-surface-variant">{n.ts}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={STATUS_MAP[n.status].type} label={STATUS_MAP[n.status].label} />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      {n.status !== "RESOLVED" && (
                        <button onClick={() => resolve(n.id)} className="px-3 py-1 bg-primary-accent text-black text-xs font-bold uppercase tracking-wider hover:opacity-90">
                          확인
                        </button>
                      )}
                      {n.status === "UNRESOLVED" && (
                        <button onClick={() => dismiss(n.id)} className="px-3 py-1 border border-outline-variant text-on-surface-variant text-xs font-bold uppercase tracking-wider hover:bg-surface-container-highest/30">
                          무시
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
