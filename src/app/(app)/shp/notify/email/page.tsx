"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const TEMPLATES = ["DEPART","ETA_NEAR","SCHEDULE_CHANGE","RECEIVED_DONE","MISMATCH"];

export default function NotifyEmailPage() {
  const [sent, setSent] = useState(false);
  const [tmpl, setTmpl] = useState("DEPART");
  return (
    <div>
      <PageHeader title="이메일 발송" accent="EMAIL" nodeRef="IA-SHP-NOTIFY-EMAIL" status="PROTOTYPE"
        description="EMAIL 채널 알림 발송 폼 (FNC-SHP-080/081/082/083/084)" />
      <FieldHeader title="발송 설정" moduleRef="FNC-SHP-080" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">알림 유형</label>
          <select value={tmpl} onChange={e=>setTmpl(e.target.value)}
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label">
            {TEMPLATES.map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">수신자</label>
          <input placeholder="shp@hyundai-const.com" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">출하 ID</label>
          <input placeholder="SHP-2026-XXXX" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">첨부 (패킹리스트 PDF)</label>
          <input type="file" className="bg-surface-container-high text-xs px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">메시지 본문</label>
          <textarea rows={4} defaultValue={`[MES ETO 출하 알림] ${tmpl} — SHP-2026-0025 현대건설 출하 완료.`}
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      {sent ? (
        <p className="text-sm font-label text-primary-accent">이메일 발송 완료 — 발송 이력 등록됨</p>
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setSent(true)} className="px-6 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest">발송 ▶</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">미리보기</button>
        </div>
      )}
    </div>
  );
}
