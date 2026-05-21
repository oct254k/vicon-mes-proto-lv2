"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const QUEUE = [
  { id:"LBL-2026-0025-001", pkg:"PKG-0025-001", member:"B01-1-G22C-C-171", status:"PRINTED", printAt:"2026-05-05 14:32" },
  { id:"LBL-2026-0025-002", pkg:"PKG-0025-001", member:"B01-1-G22C-C-172", status:"PRINTED", printAt:"2026-05-05 14:32" },
  { id:"LBL-2026-0025-003", pkg:"PKG-0025-001", member:"B01-2-G15A-S-040", status:"DAMAGED", printAt:"2026-05-05 14:33" },
  { id:"LBL-2026-0024-001", pkg:"PKG-0024-001", member:"B01-4-G22C-C-180", status:"QUEUED", printAt:"—" },
];
const SM: Record<string,"running"|"stopped"|"idle"> = { PRINTED:"running", DAMAGED:"stopped", QUEUED:"idle" };
const SL: Record<string, string> = { PRINTED:"인쇄됨", DAMAGED:"파손", QUEUED:"대기" };

export default function LabelPage() {
  const [reprinting, setReprinting] = useState<string|null>(null);
  return (
    <div>
      <PageHeader title="라벨 발행" nodeRef="IA-SHP-DOC-LABEL" status="PROTOTYPE"
        description="묶음 라벨 발행·재인쇄 큐 (FNC-SHP-030) — 라벨 훼손 예외 처리 포함" />
      <FieldHeader title="라벨 큐" moduleRef={`${QUEUE.length}건`} />
      {reprinting && (
        <div className="bg-warning/10 border border-warning/40 px-4 py-3 mb-4 flex items-center justify-between">
          <span className="text-sm font-label text-warning">재인쇄 큐 등록: {reprinting}</span>
          <button onClick={()=>setReprinting(null)} className="text-xs font-label uppercase opacity-60">닫기</button>
        </div>
      )}
      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 border-l-4 border-primary-accent bg-surface-container-highest/30 flex justify-between">
          <span className="font-headline font-black text-sm uppercase tracking-widest">라벨 발행 목록</span>
          <button className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase">전체 출력</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["라벨 ID","PKG","부재 ID","상태","발행 시각","액션"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {QUEUE.map(r=>(
              <tr key={r.id} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 ${r.status==="DAMAGED"?"bg-error/5":""}`}>
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.pkg}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.member}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={SL[r.status] ?? r.status} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.printAt}</td>
                <td className="px-4 py-2">
                  <button onClick={()=>setReprinting(r.id)} className="text-xs px-2 py-1 bg-surface-container-high border border-outline-variant/20 font-label uppercase">재인쇄</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
