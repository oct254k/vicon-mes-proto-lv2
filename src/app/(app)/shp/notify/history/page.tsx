"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const NOTIFY_TYPES = ["ALL","DEPART","ETA_NEAR","SCHEDULE_CHANGE","RECEIVED_DONE","MISMATCH"];
const CHANNELS = ["ALL","EMAIL","SMS","KAKAOTALK","INAPP","LINEBOARD"];
const MOCK = [
  { id:"NTF-2026-0085", type:"DEPART", ch:"EMAIL", shp:"SHP-2026-0025", customer:"현대건설", sentAt:"2026-05-06 07:06", status:"SENT" },
  { id:"NTF-2026-0084", type:"DEPART", ch:"SMS", shp:"SHP-2026-0025", customer:"현대건설", sentAt:"2026-05-06 07:06", status:"SENT" },
  { id:"NTF-2026-0083", type:"ETA_NEAR", ch:"KAKAOTALK", shp:"SHP-2026-0025", customer:"현대건설", sentAt:"2026-05-06 13:00", status:"SENT" },
  { id:"NTF-2026-0082", type:"RECEIVED_DONE", ch:"EMAIL", shp:"SHP-2026-0024", customer:"GS건설", sentAt:"2026-05-05 16:00", status:"SENT" },
  { id:"NTF-2026-0081", type:"MISMATCH", ch:"SMS", shp:"SHP-2026-0024", customer:"GS건설", sentAt:"2026-05-04 17:30", status:"FAILED" },
  { id:"NTF-2026-0080", type:"SCHEDULE_CHANGE", ch:"INAPP", shp:"SHP-2026-0022", customer:"DL이앤씨", sentAt:"2026-05-03 09:00", status:"SENT" },
];
const SM: Record<string,"running"|"stopped"> = { SENT:"running", FAILED:"stopped" };

export default function NotifyHistoryPage() {
  const [tf, setTf] = useState("ALL");
  const [cf, setCf] = useState("ALL");
  const rows = MOCK.filter(r=>(tf==="ALL"||r.type===tf)&&(cf==="ALL"||r.ch===cf));
  return (
    <div>
      <PageHeader title="발송 이력" nodeRef="IA-SHP-NOTIFY-HISTORY" status="PROTOTYPE"
        description="5종 알림 × 5채널 발송 이력 드릴다운 (FNC-SHP-084/080~083)" />
      <div className="flex gap-2 mb-2 flex-wrap">
        {NOTIFY_TYPES.map(t=>(
          <button key={t} onClick={()=>setTf(t)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest border ${tf===t?"bg-primary-accent text-black border-primary-accent":"bg-surface-container border-outline-variant/20"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {CHANNELS.map(c=>(
          <button key={c} onClick={()=>setCf(c)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest border ${cf===c?"bg-primary-accent text-black border-primary-accent":"bg-surface-container border-outline-variant/20"}`}>
            {c}
          </button>
        ))}
      </div>
      <FieldHeader title="발송 이력" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["알림 ID","유형","채널","출하 ID","거래처","발송 시각","결과"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2"><span className="text-xs font-label text-on-surface/70">{r.type}</span></td>
                <td className="px-4 py-2"><span className="px-2 py-0.5 bg-surface-container text-xs font-label">{r.ch}</span></td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2">{r.customer}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.sentAt}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
