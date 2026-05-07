"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INBOX = [
  { id:"IA-2026-0025", type:"ETA_NEAR", msg:"SHP-2026-0025 현대건설 도착 임박 (14:00 예정)", receivedAt:"2026-05-06 13:00", read:false },
  { id:"IA-2026-0024", type:"DEPART", msg:"SHP-2026-0025 출발 확인 완료", receivedAt:"2026-05-06 07:06", read:true },
  { id:"IA-2026-0023", type:"MISMATCH", msg:"SHP-2026-0024 불일치 QTY_DIFF 보고됨", receivedAt:"2026-05-04 17:30", read:false },
];

export default function NotifyInAppPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHeader title="인앱 알림" accent="INAPP" nodeRef="IA-SHP-NOTIFY-INAPP" status="PROTOTYPE"
        description="INAPP 채널 알림 발송·인박스 (FNC-SHP-083/084)" />
      <FieldHeader title="인앱 알림 인박스" moduleRef={`${INBOX.length}건`} />
      <div className="mb-6 space-y-2">
        {INBOX.map(n=>(
          <div key={n.id} className={`bg-surface-container p-4 flex justify-between items-start ${!n.read?"border-l-2 border-primary-accent":""}`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-label text-primary-accent uppercase">{n.type}</span>
                {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary-accent" />}
              </div>
              <p className="text-sm font-headline">{n.msg}</p>
              <p className="text-xs opacity-40 mt-0.5">{n.receivedAt}</p>
            </div>
            <StatusBadge type={n.read?"idle":"running"} label={n.read?"READ":"NEW"} />
          </div>
        ))}
      </div>
      <FieldHeader title="인앱 알림 발송" moduleRef="FNC-SHP-083" />
      <div className="bg-surface-container-low p-5 grid grid-cols-1 gap-4 max-w-lg mb-4">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">수신 대상 (역할)</label>
          <select className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label">
            <option>SHP-STAFF</option><option>SHP-MANAGER</option><option>ALL</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">알림 메시지</label>
          <textarea rows={2} placeholder="알림 메시지 입력"
            className="bg-surface-container-high text-sm px-3 py-2 border border-outline-variant/20 font-label resize-none" />
        </div>
      </div>
      {sent ? (
        <p className="text-sm font-label text-primary-accent">인앱 알림 발송 완료</p>
      ) : (
        <button onClick={()=>setSent(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">발송 ▶</button>
      )}
    </div>
  );
}
