"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const CUSTOMERS = [
  { customer:"현대건설", email:"shp@hyundai-const.com", sms:"010-1234-5678", kakao:"registered", inapp:true },
  { customer:"GS건설", email:"logistics@gscec.com", sms:"010-2345-6789", kakao:"not-registered", inapp:true },
  { customer:"삼성물산", email:"supply@samsung-ct.com", sms:"010-3456-7890", kakao:"registered", inapp:false },
];

export default function ChannelPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="채널 설정" nodeRef="IA-SHP-NOTIFY-CHANNEL" status="PROTOTYPE"
        description="거래처별 알림 채널 마스터 설정 (FNC-SHP-085) — SHP-STAFF/ADMIN" />
      <FieldHeader title="거래처 채널 설정" moduleRef={`${CUSTOMERS.length}개 거래처`} />
      <div className="bg-surface-container-lowest overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["거래처","EMAIL","SMS","카카오톡","INAPP","편집"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {CUSTOMERS.map(c=>(
              <tr key={c.customer} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 font-bold">{c.customer}</td>
                <td className="px-4 py-2 text-xs font-mono opacity-70">{c.email}</td>
                <td className="px-4 py-2 text-xs tabular-nums">{c.sms}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs font-label ${c.kakao==="registered"?"text-primary-accent":"opacity-30"}`}>{c.kakao}</span>
                </td>
                <td className="px-4 py-2">
                  <span className={`w-3 h-3 inline-block rounded-full ${c.inapp?"bg-primary-accent":"bg-outline-variant/30"}`} />
                </td>
                <td className="px-4 py-2">
                  <button className="text-xs px-2 py-1 bg-surface-container-high border border-outline-variant/20 font-label uppercase">편집</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FieldHeader title="알림 유형별 채널 매핑" moduleRef="FNC-SHP-085" />
      <div className="bg-surface-container p-4 text-xs font-label opacity-60">
        DEPART → EMAIL+SMS+INAPP / ETA_NEAR → SMS+KAKAOTALK+INAPP / SCHEDULE_CHANGE → EMAIL+SMS / RECEIVED_DONE → EMAIL+INAPP / MISMATCH → EMAIL+SMS+INAPP
      </div>
      {saved ? (
        <p className="text-sm font-label text-primary-accent mt-4">채널 설정 저장 완료</p>
      ) : (
        <button onClick={()=>setSaved(true)} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest mt-4">저장 ▶</button>
      )}
    </div>
  );
}
