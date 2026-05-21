"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PR_CANDIDATES = [
  { id:"PR-2026-0042", mat:"M-COIL-A", qty:"500 m", supplier:"현대제철", unitPrice:12500 },
  { id:"PR-2026-0039", mat:"M-SHEET-A3", qty:"80 ea", supplier:"동국제강", unitPrice:6700 },
];

export default function PONewPage() {
  const [approved, setApproved] = useState(false);
  const [overLimit, setOverLimit] = useState(false);
  const total = 12500*500 + 6700*80;

  return (
    <div>
      <PageHeader title="PO 발행 결재" accent="PO 신규" nodeRef="IA-PUR-PO-NEW" status="PROTOTYPE"
        description="자재팀 결재 100% 필수 — 자동 PO 발행 절대 금지 (FR-PUR-003 MUST / FNC-PUR-003/030/032)" />
      <div className="bg-error/10 border border-error/30 px-4 py-2 mb-4 text-xs font-label text-error">
        SYSTEM GUARD: 자동 PO 발행 호출 차단 활성화 — 반드시 자재팀 결재자 서명 필요
      </div>
      <FieldHeader title="PR 연계 항목" moduleRef="FNC-PUR-030" />
      <div className="bg-surface-container-lowest overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["PR 번호","자재코드","수량","추천 공급사","단가(₩)","소계(₩)"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {PR_CANDIDATES.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2">{r.mat}</td>
                <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                <td className="px-4 py-2">{r.supplier}</td>
                <td className="px-4 py-2 tabular-nums">{r.unitPrice.toLocaleString()}</td>
                <td className="px-4 py-2 tabular-nums font-bold">{(r.unitPrice*(parseInt(r.qty))).toLocaleString()}</td>
              </tr>
            ))}
            <tr className="border-t border-primary-accent/30">
              <td colSpan={5} className="px-4 py-2 text-right text-xs font-label opacity-50 uppercase">합계</td>
              <td className="px-4 py-2 tabular-nums font-black text-primary-accent">{total.toLocaleString()} ₩</td>
            </tr>
          </tbody>
        </table>
      </div>
      <FieldHeader title="결재 정보" moduleRef="FNC-PUR-032/036" />
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[{l:"결재자",ph:"자재팀장 홍길동"},{l:"결재 날짜",ph:"2026-05-06"},{l:"PO 번호 (자동채번)",ph:"PO-2026-0020"},{l:"납기 요청일",ph:"2026-05-20"}].map(f=>(
          <div key={f.l} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{f.l}</label>
            <input placeholder={f.ph} className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input type="checkbox" id="overlimit" onChange={e=>setOverLimit(e.target.checked)} className="accent-primary-accent" />
        <label htmlFor="overlimit" className="text-xs font-label uppercase">한도 초과 — L3 공장장 추가 결재 요청</label>
      </div>
      {overLimit && <div className="bg-warning/10 border border-warning/40 px-4 py-2 mb-4 text-xs font-label text-warning">
        ⚠ L3 공장장 결재 워크리스트로 이관됩니다.
      </div>}
      {approved ? (
        <div className="flex gap-3 items-center">
          <StatusBadge type="running" label="APPROVED — PO SENT" />
          <span className="text-xs font-label opacity-50">4채널 통보 큐 등록 완료</span>
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setApproved(true)} className="px-6 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest">결재 승인 ▶</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">반려</button>
        </div>
      )}
    </div>
  );
}
