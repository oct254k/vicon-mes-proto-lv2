"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const CHANNELS = ["ALL","EMAIL","EDI","PORTAL","FAX"];
const MOCK = [
  { po:"PO-2026-0017", supplier:"현대제철", ch:"EMAIL", status:"SENT", sentAt:"2026-05-05 09:12", retry:0 },
  { po:"PO-2026-0017", supplier:"현대제철", ch:"EDI", status:"SENT", sentAt:"2026-05-05 09:13", retry:0 },
  { po:"PO-2026-0016", supplier:"삼성SDS소재", ch:"PORTAL", status:"SENT", sentAt:"2026-05-04 14:02", retry:0 },
  { po:"PO-2026-0015", supplier:"포스코", ch:"FAX", status:"FAILED", sentAt:"2026-05-03 11:05", retry:2 },
  { po:"PO-2026-0014", supplier:"동국제강", ch:"EMAIL", status:"SENT", sentAt:"2026-05-02 10:00", retry:0 },
  { po:"PO-2026-0013", supplier:"기타", ch:"EDI", status:"PENDING", sentAt:"—", retry:0 },
];
const SM: Record<string, "running"|"stopped"|"idle"> = { SENT:"running", FAILED:"stopped", PENDING:"idle" };
const SL: Record<string, string> = { SENT:"발송", FAILED:"실패", PENDING:"대기" };

export default function PONotifyPage() {
  const [ch, setCh] = useState("ALL");
  const rows = MOCK.filter(r => ch === "ALL" || r.ch === ch);
  return (
    <div>
      <PageHeader title="4채널 통보 모니터" nodeRef="IA-PUR-PO-NOTIFY" status="PROTOTYPE"
        description="PO 발송 EMAIL/EDI/PORTAL/FAX 채널별 상태·재시도 이력 (FNC-PUR-034/035/036)" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {CHANNELS.map(c=>(
          <button key={c} onClick={()=>setCh(c)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest border ${ch===c?"bg-primary-accent text-black border-primary-accent":"bg-surface-container border-outline-variant/20"}`}>
            {c}
          </button>
        ))}
      </div>
      <FieldHeader title="통보 이력" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["PO 번호","공급사","채널","상태","발송 시각","재시도"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map((r,i)=>(
              <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.po}</td>
                <td className="px-4 py-2">{r.supplier}</td>
                <td className="px-4 py-2"><span className="px-2 py-0.5 bg-surface-container text-xs font-label uppercase">{r.ch}</span></td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={SL[r.status] ?? r.status} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.sentAt}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.retry > 0 ? <span className="text-warning">{r.retry}회</span> : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
