"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function NotifySMSPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHeader title="SMS 발송" accent="SMS" nodeRef="IA-SHP-NOTIFY-SMS" status="PROTOTYPE"
        description="SMS 채널 알림 발송 폼 (FNC-SHP-081) — 최대 90자" />
      <FieldHeader title="SMS 발송 설정" moduleRef="FNC-SHP-081" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 gap-4 mb-6 max-w-lg">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">수신 전화번호</label>
          <input placeholder="010-XXXX-XXXX" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">알림 유형</label>
          <select className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label">
            {["DEPART","ETA_NEAR","SCHEDULE_CHANGE","RECEIVED_DONE","MISMATCH"].map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">출하 ID</label>
          <input placeholder="SHP-2026-XXXX" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">SMS 본문 (최대 90자)</label>
          <textarea rows={3} maxLength={90} defaultValue="[ETO MES] SHP-2026-0025 출하 완료. 부산항 도착 예정 05-07 14:00."
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      {sent ? (
        <p className="text-sm font-label text-primary-accent">SMS 발송 완료</p>
      ) : (
        <button onClick={()=>setSent(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">발송 ▶</button>
      )}
    </div>
  );
}
