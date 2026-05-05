"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const REASONS = ["PRICE_ADVANTAGE","DELIVERY_PRIORITY","STRATEGIC_PARTNER","QUALITY_CERTIFIED","EXISTING_CONTRACT","OTHER"];

export default function SupplierOverridePage() {
  const [reason, setReason] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="공급사 수동 변경" accent="SCR-PUR-011" nodeRef="IA-PUR-SUPPLIER-OVERRIDE" status="PROTOTYPE"
        description="추천 공급사 외 수동 변경 — 근거 기록 필수 (FNC-PUR-023)" />
      <FieldHeader title="자동 추천 결과" moduleRef="PR-2026-0042 / M-COIL-A" />
      <div className="bg-surface-container p-4 mb-6 grid grid-cols-2 gap-3 text-sm">
        {[{l:"추천 1순위",v:"현대제철 (92점)"},{l:"추천 2순위",v:"포스코 (87점)"},{l:"자재",v:"M-COIL-A"},{l:"수량",v:"500 m"}].map(f=>(
          <div key={f.l}><p className="text-xs font-label opacity-50 uppercase">{f.l}</p><p className="font-bold">{f.v}</p></div>
        ))}
      </div>
      <FieldHeader title="수동 변경 입력" moduleRef="FNC-PUR-023" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">변경 공급사</label>
          <input placeholder="공급사명 입력" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">변경 단가 (₩)</label>
          <input type="number" placeholder="11900" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">변경 사유 (필수)</label>
          <select value={reason} onChange={e=>setReason(e.target.value)}
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label">
            <option value="">-- 사유 선택 --</option>
            {REASONS.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">변경 날짜</label>
          <input type="date" defaultValue="2026-05-06" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">상세 근거</label>
          <textarea rows={3} placeholder="변경 근거 상세 기술 (감사 추적용)"
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      {saved ? (
        <StatusBadge type="running" label="수동 변경 저장 완료 — 감사 로그 기록됨" />
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>reason && setSaved(true)} disabled={!reason}
            className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest disabled:opacity-30">저장 · 근거 확정 ▶</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">취소</button>
        </div>
      )}
    </div>
  );
}
