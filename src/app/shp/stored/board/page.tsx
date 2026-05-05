"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"PKG-0025-001", shp:"SHP-2026-0025", customer:"현대건설", loc:"YARD-A3", state:"READY", storedAt:"2026-05-05 14:30", eta:"2026-05-06" },
  { id:"PKG-0024-001", shp:"SHP-2026-0024", customer:"GS건설", loc:"YARD-B1", state:"STORED", storedAt:"2026-05-04 16:10", eta:"2026-05-08" },
  { id:"PKG-0023-001", shp:"SHP-2026-0023", customer:"삼성물산", loc:"YARD-A1", state:"HOLD", storedAt:"2026-05-03 11:05", eta:"2026-05-09" },
];
const SM: Record<string,"running"|"idle"|"warning"> = { READY:"running", STORED:"idle", HOLD:"warning" };

export default function StoredBoardPage() {
  const [filter, setFilter] = useState("ALL");
  const rows = MOCK.filter(r=>filter==="ALL"||r.state===filter);
  return (
    <div>
      <PageHeader title="STORED 보드" accent="SCR-SHP-022" nodeRef="IA-SHP-STORED-BOARD" status="PROTOTYPE"
        description="출하 대기 보드 — READY/HOLD 전이 (FNC-SHP-021/024) · SITUATION_BOARD 겸용" />
      <div className="flex gap-2 mb-4">
        {["ALL","STORED","READY","HOLD"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest border ${filter===s?"bg-primary-accent text-black border-primary-accent":"bg-surface-container border-outline-variant/20"}`}>
            {s}
          </button>
        ))}
      </div>
      <FieldHeader title="STORED 대기 목록" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["PKG ID","출하 ID","고객","야적 위치","상태","야적 일시","출하 ETA","전이"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2">{r.customer}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.loc}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.state]} label={r.state} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.storedAt}</td>
                <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.eta}</td>
                <td className="px-4 py-2">
                  {r.state==="STORED" && <button className="px-2 py-1 bg-primary-accent text-black text-xs font-label uppercase">READY ▶</button>}
                  {r.state==="READY" && <button className="px-2 py-1 bg-[#f59e0b]/80 text-black text-xs font-label uppercase">HOLD</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
