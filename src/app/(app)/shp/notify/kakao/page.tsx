"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function NotifyKakaoPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHeader title="카카오톡 발송" accent="KAKAO" nodeRef="IA-SHP-NOTIFY-KAKAO" status="PROTOTYPE"
        description="KAKAOTALK 알림 채널 발송 폼 (FNC-SHP-082) — 알림톡 템플릿 기반" />
      <FieldHeader title="카카오톡 알림 설정" moduleRef="FNC-SHP-082" />
      <div className="bg-surface-container-low p-6 grid grid-cols-1 gap-4 mb-6 max-w-lg">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">수신 전화번호 (카카오 연동)</label>
          <input placeholder="010-XXXX-XXXX" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">알림톡 템플릿</label>
          <select className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label">
            <option>ETA_NEAR — 도착 임박 알림</option>
            <option>DEPART — 출발 확인</option>
            <option>RECEIVED_DONE — 수령 완료</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">출하 ID</label>
          <input placeholder="SHP-2026-XXXX" className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label" />
        </div>
        <div className="bg-surface-container p-4 text-sm">
          <p className="text-xs font-label opacity-50 uppercase mb-2">미리보기 (알림톡)</p>
          <p className="font-bold text-xs mb-1">ETO MES 출하 알림</p>
          <p className="text-xs opacity-70">출하 번호: SHP-2026-0025</p>
          <p className="text-xs opacity-70">고객사: 현대건설</p>
          <p className="text-xs opacity-70">도착 예정: 2026-05-07 14:00 (부산항)</p>
          <p className="text-xs text-primary-accent mt-1">[수령 확인] 버튼</p>
        </div>
      </div>
      {sent ? (
        <p className="text-sm font-label text-primary-accent">카카오톡 알림 발송 완료</p>
      ) : (
        <button onClick={()=>setSent(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">발송 ▶</button>
      )}
    </div>
  );
}
