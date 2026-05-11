"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"ASN-2026-0012", po:"PO-2026-0017", supplier:"현대제철", mat:"M-COIL-A", qty:"500 m", eta:"2026-05-10", status:"IN_TRANSIT" },
  { id:"ASN-2026-0011", po:"PO-2026-0016", supplier:"삼성SDS소재", mat:"M-BOLT-M8", qty:"1,500 ea", eta:"2026-05-08", status:"CONFIRMED" },
  { id:"ASN-2026-0010", po:"PO-2026-0015", supplier:"포스코", mat:"M-PIPE-B2", qty:"120 m", eta:"2026-05-06", status:"ARRIVED" },
  { id:"ASN-2026-0009", po:"PO-2026-0014", supplier:"동국제강", mat:"M-SHEET-A3", qty:"80 ea", eta:"2026-05-12", status:"DELAYED" },
];
const SM: Record<string,"running"|"idle"|"warning"|"stopped"> = { IN_TRANSIT:"running", CONFIRMED:"idle", ARRIVED:"running", DELAYED:"stopped" };

export default function ASNListPage() {
  const [q, setQ] = useState("");
  const rows = MOCK.filter(r => !q || r.id.includes(q) || r.supplier.includes(q));
  return (
    <div>
      <PageHeader title="ASN 목록" nodeRef="IA-PUR-ASN-LIST" status="PROTOTYPE"
        description="사전출하통보 (ASN) 목록·ETA 추적 (FNC-PUR-050~053)" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">검색</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ASN ID / 공급사"
            className="bg-surface-container-high text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-52" />
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest self-end">조회</button>
        <a href="/pur/asn/new" className="px-4 py-1.5 ml-auto bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase self-end">+ 수동 ASN 등록</a>
        <a href="/pur/asn/delay" className="px-4 py-1.5 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-label uppercase self-end">지연 알림 →</a>
      </div>
      <FieldHeader title="ASN 목록" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["ASN ID","PO 번호","공급사","자재","수량","ETA","상태"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.id} className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 ${r.status==="DELAYED"?"bg-[#f59e0b]/5":""}`}>
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.po}</td>
                <td className="px-4 py-2">{r.supplier}</td>
                <td className="px-4 py-2">{r.mat}</td>
                <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.eta}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
