"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { lot:"LOT-20260506-001", po:"PO-2026-0015", mat:"M-PIPE-B2", qty:"120 m", recvQty:"120 m", insp:"PASS", rcvAt:"2026-05-06 08:45", whs:"WH-A01" },
  { lot:"LOT-20260504-003", po:"PO-2026-0013", mat:"M-COIL-A", qty:"250 m", recvQty:"200 m", insp:"PARTIAL", rcvAt:"2026-05-04 13:20", whs:"WH-A02" },
  { lot:"LOT-20260501-002", po:"PO-2026-0010", mat:"M-BOLT-M8", qty:"2000 ea", recvQty:"2000 ea", insp:"PASS", rcvAt:"2026-05-01 10:05", whs:"WH-B01" },
  { lot:"LOT-20260428-001", po:"PO-2026-0008", mat:"M-ROD-C4", qty:"300 ea", recvQty:"300 ea", insp:"FAIL", rcvAt:"2026-04-28 15:30", whs:"WH-B02" },
];
const SM: Record<string,"running"|"warning"|"stopped"> = { PASS:"running", PARTIAL:"warning", FAIL:"stopped" };
const SL: Record<string, string> = { PASS:"합격", PARTIAL:"부분합격", FAIL:"불합격" };

export default function ReceiptHistoryPage() {
  const [q, setQ] = useState("");
  const rows = MOCK.filter(r => !q || r.lot.includes(q) || r.po.includes(q) || r.mat.includes(q));
  return (
    <div>
      <PageHeader title="입고 이력" nodeRef="IA-PUR-RECEIPT-HISTORY" status="PROTOTYPE"
        description="입고·Lot 채번·검수 결과 이력 조회 (FNC-PUR-068 / Lot: LOT-YYYYMMDD-NNN)" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">검색</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Lot ID / PO / 자재"
            className="bg-surface-container-high text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-52" />
        </div>
        <input type="date" defaultValue="2026-05-01" className="bg-surface-container-high text-xs px-3 py-1.5 border border-outline-variant/20 font-label self-end" />
        <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest self-end">조회</button>
      </div>
      <FieldHeader title="입고 이력" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["Lot 번호","PO 번호","자재","발주 수량","입고 수량","검수 결과","입고 일시","창고"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.lot} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.lot}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.po}</td>
                <td className="px-4 py-2">{r.mat}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.qty}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.recvQty}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.insp]} label={SL[r.insp] ?? r.insp} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.rcvAt}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-60">{r.whs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
