"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { po:"PO-2026-0013", mat:"M-COIL-A", supplier:"현대제철", type:"SHORT_DELIVERY", overdueDays:8, recvQty:"200 m", poQty:"250 m", diff:"-50 m" },
  { po:"PO-2026-0008", mat:"M-ROD-C4", supplier:"기타", type:"SHORT_DELIVERY", overdueDays:14, recvQty:"280 ea", poQty:"300 ea", diff:"-20 ea" },
  { po:"PO-2026-0007", mat:"M-SHEET-A3", supplier:"동국제강", type:"OVER_DELIVERY", overdueDays:5, recvQty:"95 ea", poQty:"80 ea", diff:"+15 ea" },
  { po:"PO-2026-0004", mat:"M-BOLT-M8", supplier:"삼성SDS소재", type:"SHORT_DELIVERY", overdueDays:22, recvQty:"1800 ea", poQty:"2000 ea", diff:"-200 ea" },
];

export default function ClaimAgingPage() {
  const maxDays = Math.max(...MOCK.map(r=>r.overdueDays));
  return (
    <div>
      <PageHeader title="AGING 목록" nodeRef="IA-PUR-CLAIM-AGING" status="PROTOTYPE"
        description="미입고·과입고 AGING 워크리스트 (FNC-PUR-090/091/092) · SITUATION_BOARD 겸용" />
      <div className="bg-warning/10 border border-warning/40 px-4 py-3 mb-4 flex items-center gap-3">
        <span className="text-warning font-black text-lg">⚠</span>
        <span className="text-sm font-label text-warning">AGING 이슈 {MOCK.length}건 — 장기 미처리 항목 포함</span>
      </div>
      <FieldHeader title="AGING 목록" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["PO 번호","자재","공급사","이슈 유형","경과일","발주 수량","입고 수량","차이","AGING Bar"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.sort((a,b)=>b.overdueDays-a.overdueDays).map(r=>(
              <tr key={r.po} className={`border-b border-outline-variant ${r.overdueDays>=14?"bg-error/5":r.overdueDays>=7?"bg-warning/5":""}`}>
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.po}</td>
                <td className="px-4 py-2">{r.mat}</td>
                <td className="px-4 py-2 opacity-70">{r.supplier}</td>
                <td className="px-4 py-2"><StatusBadge type={r.type==="OVER_DELIVERY"?"warning":"stopped"} label={r.type} /></td>
                <td className={`px-4 py-2 tabular-nums font-black ${r.overdueDays>=14?"text-error":r.overdueDays>=7?"text-warning":"opacity-70"}`}>{r.overdueDays}일</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.poQty}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.recvQty}</td>
                <td className="px-4 py-2 text-xs font-bold text-warning">{r.diff}</td>
                <td className="px-4 py-2 w-32">
                  <div className="bg-surface-container h-2">
                    <div className="h-2 bg-warning" style={{width:`${Math.min(100,(r.overdueDays/maxDays)*100)}%`}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
