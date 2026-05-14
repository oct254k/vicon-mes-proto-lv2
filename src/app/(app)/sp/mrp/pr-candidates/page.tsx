"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CANDIDATES = [
  { prId: "PR-CAND-20260506-001", material: "H-BEAM 250×125×6×9", unit: "ton", shortage: 12.5, leadDays: 21, supplier: "POSCO", status: "PENDING" },
  { prId: "PR-CAND-20260506-002", material: "C형강 200×80×2.3",    unit: "ea",  shortage: 840,  leadDays: 14, supplier: "동국제강", status: "PENDING" },
  { prId: "PR-CAND-20260506-003", material: "볼트 M20×60",         unit: "box", shortage: 30,   leadDays: 7,  supplier: "대원볼트", status: "APPROVED" },
  { prId: "PR-CAND-20260506-004", material: "S형강 150×65×2.3",    unit: "ea",  shortage: 560,  leadDays: 14, supplier: "동국제강", status: "PENDING" },
  { prId: "PR-CAND-20260506-005", material: "용접봉 E7016-4",       unit: "box", shortage: 8,    leadDays: 3,  supplier: "현대웰딩", status: "REJECTED" },
  { prId: "PR-CAND-20260506-006", material: "H-BEAM 300×150×6.5×9",unit: "ton", shortage: 5.2,  leadDays: 21, supplier: "POSCO",   status: "PENDING" },
];

const STATUS_MAP: Record<string, { type: "running" | "warning" | "error" | "idle"; label: string }> = {
  PENDING:  { type: "idle",    label: "검토중" },
  APPROVED: { type: "running", label: "승인" },
  REJECTED: { type: "error",   label: "반려" },
};

export default function PrCandidatesPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="PR 후보" accent="검토" nodeRef="SCR-SP-032" description="MRP 자동 산출 PR 후보 — 승인 후 [PUR 연계] 버튼으로 구매요청 전송." />

      <div className="flex gap-3 mb-6">
        <button
          disabled={selected.size === 0}
          className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-30"
        >
          [PUR 연계] ({selected.size})
        </button>
        <button className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          전체 선택
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            PR 후보 목록 <span className="opacity-30 font-light ml-2">| {CANDIDATES.length} 건</span>
          </h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["선택", "PR ID", "자재명", "단위", "부족수량", "리드타임", "공급사", "상태"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {CANDIDATES.map((r) => {
              const s = STATUS_MAP[r.status];
              const chk = selected.has(r.prId);
              return (
                <tr key={r.prId} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors ${chk ? "bg-primary-accent/5" : ""}`}>
                  <td className="px-4 py-2">
                    <input type="checkbox" checked={chk} onChange={() => toggle(r.prId)} className="accent-primary-accent" />
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.prId}</td>
                  <td className="px-4 py-2 text-xs">{r.material}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.unit}</td>
                  <td className="px-4 py-2 tabular-nums text-xs font-bold text-error">{r.shortage}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.leadDays}일</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.supplier}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
