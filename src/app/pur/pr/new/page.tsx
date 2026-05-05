"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function PRNewPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="PR 등록" accent="SCR-PUR-003" nodeRef="IA-PUR-PR-NEW" status="PROTOTYPE"
        description="수동 구매요청 신규 등록 — 자동 PO 발행 절대 금지 (FR-PUR-003 MUST)" />
      <FieldHeader title="기본 정보" moduleRef="FNC-PUR-011/012" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          {label:"자재코드", ph:"M-COIL-A", type:"text"},
          {label:"자재명", ph:"열연코일 A", type:"text"},
          {label:"요청 수량", ph:"500", type:"number"},
          {label:"단위", ph:"m / ea / kg", type:"text"},
          {label:"납기 희망일", ph:"", type:"date"},
          {label:"공장 (Plant)", ph:"P3000 — 제3공장", type:"text"},
        ].map(f=>(
          <div key={f.label} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{f.label}</label>
            <input type={f.type} placeholder={f.ph}
              className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">요청 사유</label>
          <textarea rows={3} placeholder="요청 사유 기술 (생산 연동·긴급조달 등)"
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/40 px-4 py-3 mb-6 text-xs font-label text-[#f59e0b]">
        ⚠ FR-PUR-003 MUST: PR 저장 후 구매팀 결재 승인 필수. 시스템 자동 PO 발행 불가.
      </div>
      {saved ? (
        <div className="bg-primary-accent/10 border border-primary-accent/40 px-4 py-3 text-sm font-label text-primary-accent">
          PR 저장 완료 — 구매팀 승인 대기 (DRAFT)
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setSaved(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">저장 (DRAFT)</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">초기화</button>
        </div>
      )}
    </div>
  );
}
