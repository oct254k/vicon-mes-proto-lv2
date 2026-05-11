"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"PKG-0025-001", wo:"WO-P3000-20260505-0025", shp:"SHP-2026-0025", members:24, state:"SHIPPED", packAt:"2026-05-05 14:30", packBy:"포장팀A" },
  { id:"PKG-0024-001", wo:"WO-P3000-20260504-0024", shp:"SHP-2026-0024", members:18, state:"STORED", packAt:"2026-05-04 16:10", packBy:"포장팀B" },
  { id:"PKG-0023-001", wo:"WO-P3000-20260503-0023", shp:"SHP-2026-0023", members:8, state:"HOLD", packAt:"2026-05-03 11:05", packBy:"포장팀A" },
  { id:"PKG-0022-001", wo:"WO-P3000-20260502-0022", shp:"SHP-2026-0022", members:30, state:"LOADED", packAt:"2026-05-02 09:00", packBy:"포장팀C" },
];
const SM: Record<string,"running"|"warning"|"idle"|"stopped"> = { SHIPPED:"running", STORED:"idle", HOLD:"warning", LOADED:"running" };

export default function PackingHistoryPage() {
  const [q, setQ] = useState("");
  const rows = MOCK.filter(r => !q || r.id.includes(q) || r.wo.includes(q));
  return (
    <div>
      <PageHeader title="패킹 이력" nodeRef="IA-SHP-PACKING-HISTORY" status="PROTOTYPE"
        description="패킹 진행 보드·이력 (PC 웹) — FNC-SHP-014/010" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">검색</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="PKG ID / WO 번호"
            className="bg-surface-container-high text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-52" />
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest self-end">조회</button>
      </div>
      <FieldHeader title="패킹 이력" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["PKG ID","WO","출하 ID","부재 수","상태","패킹 완료","작업자"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.wo}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.members}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.state]} label={r.state} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.packAt}</td>
                <td className="px-4 py-2 text-xs opacity-60">{r.packBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
