"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK = [
  { id: "PR-2026-0042", material: "M-COIL-A", qty: "500 m", requester: "MRP", status: "APPROVED", date: "2026-05-01" },
  { id: "PR-2026-0041", material: "M-BOLT-M8", qty: "2,000 ea", requester: "김철수", status: "DRAFT", date: "2026-05-02" },
  { id: "PR-2026-0040", material: "M-PIPE-B2", qty: "120 m", requester: "이영희", status: "CONVERTED_TO_PO", date: "2026-04-28" },
  { id: "PR-2026-0039", material: "M-SHEET-A3", qty: "80 ea", requester: "박민준", status: "APPROVED", date: "2026-04-25" },
  { id: "PR-2026-0038", material: "M-ROD-C4", qty: "300 ea", requester: "MRP", status: "CANCELLED", date: "2026-04-22" },
];
const SM: Record<string, "running"|"idle"|"warning"|"stopped"> = {
  APPROVED:"running", DRAFT:"idle", CONVERTED_TO_PO:"warning", PARTIALLY_CONVERTED:"warning", CLOSED:"idle", CANCELLED:"stopped"
};
const STATUSES = ["ALL","DRAFT","APPROVED","CONVERTED_TO_PO","PARTIALLY_CONVERTED","CLOSED","CANCELLED"];

export default function PRListPage() {
  const [sf, setSf] = useState("ALL");
  const [q, setQ] = useState("");
  const rows = MOCK.filter(r => (sf === "ALL" || r.status === sf) && (!q || r.id.includes(q) || r.material.includes(q)));
  return (
    <div>
      <PageHeader title="PR 목록" nodeRef="IA-PUR-PR-LIST" status="PROTOTYPE"
        description="구매요청 워크리스트 — 상태·자재·요청자 필터 (FNC-PUR-010~015)" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">검색</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="PR ID / 자재코드"
            className="bg-surface-container-high text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-52" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">상태</label>
          <select value={sf} onChange={e=>setSf(e.target.value)}
            className="bg-surface-container-high text-sm px-3 py-1.5 border border-outline-variant/20 font-label">
            {STATUSES.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest self-end">조회</button>
        <button className="px-4 py-1.5 ml-auto bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">+ 신규 PR</button>
      </div>
      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 border-l-4 border-primary-accent bg-surface-container-highest/30 flex justify-between">
          <span className="font-headline font-black text-sm uppercase tracking-widest">PR 워크리스트</span>
          <span className="text-xs opacity-40 font-label">{rows.length}건</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["PR 번호","자재코드","수량","요청자","상태","생성일"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 cursor-pointer">
                <td className="px-4 py-2 text-primary-accent font-bold font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2">{r.material}</td>
                <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                <td className="px-4 py-2 opacity-70">{r.requester}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]??'idle'} label={r.status}/></td>
                <td className="px-4 py-2 tabular-nums opacity-60">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
