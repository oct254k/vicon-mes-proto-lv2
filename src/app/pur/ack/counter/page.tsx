"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ACKCounterPage() {
  const [result, setResult] = useState<""|"ACCEPTED"|"REJECTED">("");
  return (
    <div>
      <PageHeader title="Counter Proposal 협상" accent="SCR-PUR-031" nodeRef="IA-PUR-ACK-COUNTER" status="PROTOTYPE"
        description="공급사 역제안 (COUNTER_PROPOSAL) 협상 폼 — 수락/거부 결정 (FNC-PUR-044)" />
      <FieldHeader title="역제안 내용" moduleRef="PO-2026-0015 | 포스코" />
      <div className="bg-surface-container p-5 mb-6 grid grid-cols-2 gap-4 text-sm">
        {[{l:"PO 번호",v:"PO-2026-0015"},{l:"공급사",v:"포스코"},{l:"원래 단가",v:"34,200 ₩/m"},{l:"역제안 단가",v:"35,910 ₩/m (+5%)"},{l:"역제안 납기",v:"2026-05-25 (+5일)"},{l:"역제안 수신",v:"2026-05-03 09:45"}].map(f=>(
          <div key={f.l}>
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-0.5">{f.l}</p>
            <p className="font-headline font-bold">{f.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="협상 회신" moduleRef="FNC-PUR-044" />
      <div className="bg-surface-container-low p-5 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">협상 단가 (₩)</label>
          <input defaultValue="35000" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">협상 납기일</label>
          <input type="date" defaultValue="2026-05-22" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">협상 메모</label>
          <textarea rows={3} defaultValue="단가 35,000 ₩ 수락, 납기 2026-05-22 조건 제안"
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      {result ? (
        <StatusBadge type={result==="ACCEPTED"?"running":"stopped"} label={result==="ACCEPTED"?"협상 수락 — PO 갱신":"역제안 거부 — 보충 PR 회귀"} />
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setResult("ACCEPTED")} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">수락 ▶</button>
          <button onClick={()=>setResult("REJECTED")} className="px-6 py-2 bg-error text-white text-xs font-label uppercase tracking-widest">거부 / 보충 PR</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">취소</button>
        </div>
      )}
    </div>
  );
}
