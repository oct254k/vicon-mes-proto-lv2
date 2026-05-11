"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const TYPES = ["ALL","ACCEPTED","PARTIALLY_ACCEPTED","REJECTED","COUNTER_PROPOSAL"];
const MOCK = [
  { po:"PO-2026-0017", supplier:"현대제철", type:"ACCEPTED", receivedAt:"2026-05-05 10:30", note:"납기 이상 없음" },
  { po:"PO-2026-0016", supplier:"삼성SDS소재", type:"PARTIALLY_ACCEPTED", receivedAt:"2026-05-04 15:20", note:"M-BOLT 500ea 납기 불가" },
  { po:"PO-2026-0015", supplier:"포스코", type:"COUNTER_PROPOSAL", receivedAt:"2026-05-03 09:45", note:"단가 +5% 요청" },
  { po:"PO-2026-0014", supplier:"동국제강", type:"REJECTED", receivedAt:"2026-05-02 11:00", note:"공급 불가 — 대체 공급사 필요" },
  { po:"PO-2026-0013", supplier:"기타", type:"ACCEPTED", receivedAt:"2026-05-01 14:22", note:"" },
];
const TM: Record<string, "running"|"warning"|"stopped"|"idle"> = {
  ACCEPTED:"running", PARTIALLY_ACCEPTED:"warning", REJECTED:"stopped", COUNTER_PROPOSAL:"warning"
};

export default function ACKInboxPage() {
  const [tf, setTf] = useState("ALL");
  const rows = MOCK.filter(r => tf === "ALL" || r.type === tf);
  return (
    <div>
      <PageHeader title="답신 인박스" nodeRef="IA-PUR-ACK-INBOX" status="PROTOTYPE"
        description="공급사 답신 4유형 (ACCEPTED/PARTIALLY_ACCEPTED/REJECTED/COUNTER_PROPOSAL) 인박스 (FNC-PUR-040~043)" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {TYPES.map(t=>(
          <button key={t} onClick={()=>setTf(t)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest border ${tf===t?"bg-primary-accent text-black border-primary-accent":"bg-surface-container border-outline-variant/20"}`}>
            {t}
          </button>
        ))}
      </div>
      <FieldHeader title="답신 목록" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["PO 번호","공급사","답신 유형","수신 시각","비고","액션"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map((r,i)=>(
              <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.po}</td>
                <td className="px-4 py-2">{r.supplier}</td>
                <td className="px-4 py-2"><StatusBadge type={TM[r.type]} label={r.type} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.receivedAt}</td>
                <td className="px-4 py-2 text-xs opacity-60 max-w-xs truncate">{r.note||"—"}</td>
                <td className="px-4 py-2">
                  {r.type==="COUNTER_PROPOSAL"
                    ? <a href="/pur/ack/counter" className="text-xs text-primary-accent underline">협상 →</a>
                    : <span className="text-xs opacity-30">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
