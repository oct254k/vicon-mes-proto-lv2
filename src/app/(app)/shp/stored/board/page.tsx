"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"PKG-WO-P3000-20260506-0007-001", shp:"SHP-P3000-20260507-001", customer:"P1000 제1 이천공장", loc:"YARD-P3000-B-12", state:"STORED",  storedAt:"2026-05-06 15:10", eta:"2026-05-07" },
  { id:"PKG-WO-P3000-20260506-0007-002", shp:"SHP-P3000-20260507-001", customer:"P1000 제1 이천공장", loc:"YARD-P3000-B-13", state:"STORED",  storedAt:"2026-05-06 15:25", eta:"2026-05-07" },
  { id:"PKG-WO-P3000-20260505-0002-001", shp:"SHP-P3000-20260508-001", customer:"P1000 제1 이천공장", loc:"YARD-P3000-A-05", state:"READY",   storedAt:"2026-05-05 17:10", eta:"2026-05-08" },
  { id:"PKG-WO-P3000-20260420-0001-001", shp:"—",                      customer:"P1000 제1 이천공장", loc:"YARD-P3000-C-01", state:"HOLD",    storedAt:"2026-04-20 10:00", eta:"2026-05-09" },
];
const SM: Record<string,"running"|"idle"|"warning"> = { READY:"running", STORED:"idle", HOLD:"warning" };

export default function StoredBoardPage() {
  const [filter, setFilter] = useState("ALL");
  const rows = MOCK.filter(r=>filter==="ALL"||r.state===filter);
  return (
    <div>
      <PageHeader title="STORED 보드" nodeRef="IA-SHP-STORED-BOARD" status="PROTOTYPE"
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
