"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function ScheduleNewPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="출하 일정 등록" accent="SCR-SHP-004" nodeRef="IA-SHP-SCHEDULE-NEW" status="PROTOTYPE"
        description="신규 출하 일정 등록 폼 (FNC-SHP-040/003)" />
      <FieldHeader title="출하 기본 정보" moduleRef="FNC-SHP-040" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          {l:"Shipment ID",       ph:"SHP-P3000-20260507-001",    t:"text"},
          {l:"WO 번호",           ph:"WO-P3000-20260506-0007",    t:"text"},
          {l:"발송처 Plant",      ph:"P3000 제3 이천공장 (데크)", t:"text"},
          {l:"수신처 Plant",      ph:"P1000 제1 이천공장",        t:"text"},
          {l:"출발 예정일시",     ph:"2026-05-07 08:00",          t:"text"},
          {l:"도착 예정 (ETA)",   ph:"2026-05-07 10:30",          t:"text"},
          {l:"총중량 (kg)",       ph:"4,250",                     t:"text"},
          {l:"차량 ID",           ph:"VH-25TON-003",              t:"text"},
        ].map(f=>(
          <div key={f.l} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{f.l}</label>
            <input type={f.t} placeholder={f.ph} className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">특이사항</label>
          <textarea rows={2} placeholder="분할 적재·특수 운송 요건 등"
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      <FieldHeader title="알림 설정" moduleRef="FNC-SHP-003" />
      <div className="flex gap-4 mb-6 flex-wrap">
        {["EMAIL","SMS","KAKAOTALK","INAPP"].map(ch=>(
          <label key={ch} className="flex items-center gap-2 text-xs font-label uppercase cursor-pointer">
            <input type="checkbox" defaultChecked={ch==="EMAIL"||ch==="INAPP"} className="accent-primary-accent" />{ch}
          </label>
        ))}
      </div>
      {saved ? (
        <div className="bg-primary-accent/10 border border-primary-accent/40 px-4 py-3 text-sm font-label text-primary-accent">
          출하 일정 등록 완료 — SCHEDULED 상태 / 알림 발송 큐 등록
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={()=>setSaved(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">저장 ▶</button>
          <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">취소</button>
        </div>
      )}
    </div>
  );
}
