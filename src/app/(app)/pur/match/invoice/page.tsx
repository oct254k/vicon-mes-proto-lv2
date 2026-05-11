"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function InvoicePage() {
  const [matched, setMatched] = useState(false);
  return (
    <div>
      <PageHeader title="Invoice 등록" nodeRef="IA-PUR-MATCH-INVOICE" status="PROTOTYPE"
        description="공급사 Invoice 수신·등록 후 3-Way Matching 트리거 (FNC-PUR-080/087/088)" />
      <FieldHeader title="Invoice 기본 정보" moduleRef="FNC-PUR-080" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          {l:"Invoice 번호", ph:"INV-2026-0018", t:"text"},
          {l:"PO 번호 연계", ph:"PO-2026-0017", t:"text"},
          {l:"공급사", ph:"현대제철", t:"text"},
          {l:"Invoice 금액 (₩)", ph:"6,250,000", t:"text"},
          {l:"Invoice 수량", ph:"500 m", t:"text"},
          {l:"Invoice 발행일", ph:"", t:"date"},
          {l:"지급 만기일", ph:"", t:"date"},
          {l:"자재코드", ph:"M-COIL-A", t:"text"},
        ].map(f=>(
          <div key={f.l} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{f.l}</label>
            <input type={f.t} placeholder={f.ph} className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">첨부 파일</label>
          <input type="file" className="bg-surface-container-high text-xs px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
      </div>
      {matched ? (
        <div className="flex items-center gap-3">
          <StatusBadge type="running" label="Matching 트리거 완료" />
          <span className="text-xs font-label opacity-50">매칭 보드에서 결과 확인</span>
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setMatched(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">저장 · Matching 트리거 ▶</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">취소</button>
        </div>
      )}
    </div>
  );
}
