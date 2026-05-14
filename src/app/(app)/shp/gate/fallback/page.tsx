"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function GateFallbackPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="수동 게이트 인식" nodeRef="IA-SHP-GATE-FALLBACK" status="PROTOTYPE"
        description="RFID 미인식 시 게이트 직원 수동 인식 폼 (FNC-SHP-060/061/062/063) — KIOSK/PC" />
      <div className="bg-warning/10 border border-warning/40 px-4 py-3 mb-4 text-sm font-label text-warning">
        ⚠ RFID 인식 실패 — 수동 입력 필요
      </div>
      <FieldHeader title="수동 인식 입력" moduleRef="FNC-SHP-062" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          {l:"차량 번호", ph:"12가3456", t:"text"},
          {l:"운전자 연락처", ph:"010-XXXX-XXXX", t:"text"},
          {l:"출하 ID 직접 입력", ph:"SHP-2026-XXXX", t:"text"},
          {l:"통과 일시", ph:"", t:"datetime-local"},
        ].map(f=>(
          <div key={f.l} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{f.l}</label>
            <input type={f.t} placeholder={f.ph} className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">수동 처리 사유</label>
          <select className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label">
            <option>RFID_READ_FAIL</option>
            <option>ANTENNA_ERROR</option>
            <option>TAG_MISSING</option>
            <option>OTHER</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">처리 직원</label>
          <input placeholder="게이트 직원 이름" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
      </div>
      {saved ? (
        <StatusBadge type="warning" label="MANUAL PASS — 감사 로그 기록됨" />
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setSaved(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">수동 통과 확인 ▶</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">취소</button>
        </div>
      )}
    </div>
  );
}
