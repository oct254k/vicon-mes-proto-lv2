"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function SignPage() {
  const [signed, setSigned] = useState(false);
  return (
    <div className="max-w-sm mx-auto">
      <PageHeader title="서명 수령" accent="SCR-SHP-061" nodeRef="IA-SHP-RECEIVE-SIGN" status="PROTOTYPE"
        description="현장 검수자 서명 수령 — RECEIVED 전이 (EXTERNAL 토큰 · FNC-SHP-075/072/005)" />
      <FieldHeader title="출하 정보 확인" moduleRef="SHP-2026-0025" />
      <div className="bg-surface-container p-4 mb-4 space-y-2">
        {[{l:"출하 ID",v:"SHP-2026-0025"},{l:"고객",v:"현대건설"},{l:"PKG",v:"2개 / 36부재"},{l:"검수 결과",v:"PASS (일부 QTY_DIFF 보고)"},{l:"검수자",v:"현장 검수자 홍길동"}].map(f=>(
          <div key={f.l} className="flex justify-between text-sm">
            <span className="font-label text-xs uppercase opacity-50">{f.l}</span>
            <span className="font-bold text-xs">{f.v}</span>
          </div>
        ))}
      </div>
      <FieldHeader title="서명 패드" moduleRef="FNC-SHP-075" />
      <div className="bg-surface-container border-2 border-dashed border-outline-variant/30 h-40 mb-4 flex items-center justify-center">
        {signed ? (
          <div className="text-center">
            <p className="text-primary-accent font-headline font-black text-lg">홍 길 동</p>
            <p className="text-xs opacity-40 font-label">서명 완료 · 2026-05-06 14:35</p>
          </div>
        ) : (
          <p className="text-xs font-label opacity-30 uppercase">서명 패드 — 서명 영역</p>
        )}
      </div>
      {signed ? (
        <div className="text-center">
          <StatusBadge type="running" label="RECEIVED — 서명 수령 완료" />
          <p className="text-xs font-label opacity-40 mt-2">5채널 알림 발송 큐 등록</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <button onClick={()=>setSigned(true)} className="w-full bg-primary-accent text-black py-5 text-base font-headline font-black uppercase tracking-widest">
            서명 확인 · RECEIVED ▶
          </button>
          <a href="/shp/receive/mismatch" className="w-full block text-center py-3 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-sm font-label uppercase">
            불일치 추가 보고
          </a>
        </div>
      )}
    </div>
  );
}
