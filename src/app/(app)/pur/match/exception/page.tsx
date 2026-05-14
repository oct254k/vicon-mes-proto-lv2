"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const REASONS = ["ALL","QTY_DIFF","PRICE_DIFF","MATERIAL_DIFF","OVER_DELIVERY","SHORT_DELIVERY"];
const MOCK = [
  { id:"EXC-2026-0013", po:"PO-2026-0013", inv:"INV-2026-0007", reason:"QTY_DIFF", poQty:"250 m", invQty:"200 m", diff:"-50 m", handler:"김구매", status:"OPEN" },
  { id:"EXC-2026-0009", po:"PO-2026-0009", inv:"INV-2026-0004", reason:"PRICE_DIFF", poQty:"—", invQty:"—", diff:"+2%", handler:"이구매", status:"REVIEWING" },
  { id:"EXC-2026-0007", po:"PO-2026-0007", inv:"INV-2026-0003", reason:"OVER_DELIVERY", poQty:"80 ea", invQty:"95 ea", diff:"+15 ea", handler:"박구매", status:"RESOLVED" },
];
const SM: Record<string,"warning"|"running"|"idle"> = { OPEN:"warning", REVIEWING:"running", RESOLVED:"idle" };

export default function MatchExceptionPage() {
  const [rf, setRf] = useState("ALL");
  const rows = MOCK.filter(r => rf === "ALL" || r.reason === rf);
  return (
    <div>
      <PageHeader title="매칭 예외 목록" nodeRef="IA-PUR-MATCH-EXCEPTION" status="PROTOTYPE"
        description="3-Way Matching 예외 5사유 워크리스트 — 구매팀·L3 결재 (FNC-PUR-083/084/094)" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {REASONS.map(r=>(
          <button key={r} onClick={()=>setRf(r)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest border ${rf===r?"bg-primary-accent text-black border-primary-accent":"bg-surface-container border-outline-variant/20"}`}>
            {r}
          </button>
        ))}
      </div>
      <FieldHeader title="예외 목록" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["예외 ID","PO","Invoice","예외 사유","PO 수량","Invoice 수량","차이","담당자","상태"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.po}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.inv}</td>
                <td className="px-4 py-2"><span className="text-warning text-xs font-label font-bold">{r.reason}</span></td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.poQty}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.invQty}</td>
                <td className="px-4 py-2 text-xs font-bold text-warning">{r.diff}</td>
                <td className="px-4 py-2 opacity-70">{r.handler}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
