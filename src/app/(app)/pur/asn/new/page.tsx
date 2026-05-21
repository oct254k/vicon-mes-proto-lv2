"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function ASNNewPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="ASN 수동 등록" nodeRef="IA-PUR-ASN-NEW" status="PROTOTYPE"
        description="공급사 전산 미등록 시 구매팀 수동 ASN 등록 (FNC-PUR-050/051)" />
      <FieldHeader title="ASN 기본 정보" moduleRef="FNC-PUR-050" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          {l:"PO 번호", ph:"PO-2026-XXXX", t:"text"},
          {l:"공급사", ph:"현대제철", t:"text"},
          {l:"자재코드", ph:"M-COIL-A", t:"text"},
          {l:"출하 수량", ph:"500", t:"number"},
          {l:"단위", ph:"m / ea / kg", t:"text"},
          {l:"출하일 (실제)", ph:"", t:"date"},
          {l:"ETA (도착 예정)", ph:"", t:"date"},
          {l:"운송 편명", ph:"KR-1234 / 현대해운-09", t:"text"},
        ].map(f=>(
          <div key={f.l} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{f.l}</label>
            <input type={f.t} placeholder={f.ph} className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">비고</label>
          <textarea rows={2} placeholder="분할 출하·포장 특이사항 등"
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      {saved ? (
        <div className="bg-primary-accent/10 border border-primary-accent/40 px-4 py-3 text-sm font-label text-primary-accent">
          ASN 등록 완료 — 입고 예정 큐에 반영됨
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setSaved(true)} className="px-6 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest">저장 ▶</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">취소</button>
        </div>
      )}
    </div>
  );
}
