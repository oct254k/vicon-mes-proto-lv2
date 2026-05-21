"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const REASONS = ["MISSING","DAMAGE","CODE_DIFF","QTY_DIFF","OTHER"];
const MOCK = [
  { id:"MIS-2026-0003", shp:"SHP-2026-0025", pkg:"PKG-0025-001", reason:"QTY_DIFF", detail:"24부재 중 22부재만 도착", reportedAt:"2026-05-06 14:22", status:"OPEN" },
  { id:"MIS-2026-0002", shp:"SHP-2026-0024", pkg:"PKG-0024-001", reason:"DAMAGE", detail:"C형 부재 1개 운송 중 변형", reportedAt:"2026-05-04 16:45", status:"REVIEWING" },
  { id:"MIS-2026-0001", shp:"SHP-2026-0021", pkg:"PKG-0021-001", reason:"MISSING", detail:"라벨 누락 2건", reportedAt:"2026-05-01 11:10", status:"CLOSED" },
];
const SM: Record<string,"stopped"|"warning"|"idle"> = { OPEN:"stopped", REVIEWING:"warning", CLOSED:"idle" };
const SL: Record<string, string> = { OPEN:"접수", REVIEWING:"검토중", CLOSED:"종료" };

export default function MismatchPage() {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <div>
      <PageHeader title="불일치 목록" nodeRef="IA-SHP-RECEIVE-MISMATCH" status="PROTOTYPE"
        description="검수 불일치 5사유 (MISSING/DAMAGE/CODE_DIFF/QTY_DIFF/OTHER) 처리 보드 (FNC-SHP-074/076)" />
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 flex-wrap text-xs font-label">
          {REASONS.map(r=><span key={r} className="px-2 py-1 bg-surface-container border border-warning/30 text-warning">{r}</span>)}
        </div>
        <button onClick={()=>setShowForm(true)} className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest">+ 불일치 보고</button>
      </div>
      <FieldHeader title="불일치 목록" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["불일치 ID","출하 ID","PKG","사유","상세","보고 일시","상태"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.pkg}</td>
                <td className="px-4 py-2"><span className="text-warning text-xs font-label font-bold">{r.reason}</span></td>
                <td className="px-4 py-2 text-xs opacity-60 max-w-xs truncate">{r.detail}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.reportedAt}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={SL[r.status] ?? r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 w-96 max-w-full">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest mb-4 text-warning">불일치 보고</h3>
            <select value={reason} onChange={e=>setReason(e.target.value)}
              className="w-full bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label mb-3">
              <option value="">-- 사유 선택 --</option>
              {REASONS.map(r=><option key={r}>{r}</option>)}
            </select>
            <textarea placeholder="불일치 상세 내용" rows={3}
              className="w-full bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label mb-4 resize-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={()=>setShowForm(false)} className="px-4 py-2 text-xs font-label uppercase border border-outline-variant/20">취소</button>
              <button onClick={()=>setShowForm(false)} className="px-4 py-2 bg-warning text-black text-xs font-label uppercase">보고 등록</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
