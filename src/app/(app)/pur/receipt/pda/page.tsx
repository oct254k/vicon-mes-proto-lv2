"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PENDING = [
  { asn:"ASN-2026-0010", mat:"M-PIPE-B2", qty:"120 m", supplier:"포스코" },
  { asn:"ASN-2026-0011", mat:"M-BOLT-M8", qty:"1,500 ea", supplier:"삼성SDS소재" },
];

export default function ReceiptPDAPage() {
  const [scan, setScan] = useState("");
  const [inspResult, setInspResult] = useState<""|"PASS"|"FAIL"|"PARTIAL">("");
  const RESULT_LABEL: Record<string, string> = { PASS:"합격", PARTIAL:"부분합격", FAIL:"불합격" };
  const [lotIssued, setLotIssued] = useState("");

  function handleScan() {
    if (!scan) return;
    const lot = `LOT-20260506-${String(Math.floor(Math.random()*900)+100)}`;
    setLotIssued(lot);
    setInspResult("");
  }

  return (
    <div className="max-w-sm mx-auto">
      <PageHeader title="PDA 입고 스캔" nodeRef="IA-PUR-RECEIPT-PDA" status="PROTOTYPE"
        description="창고팀 PDA 입고·Lot 채번·검수 (A5 시작점 FR-PUR-005)" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 text-center">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">입고 대기 ASN</p>
        <p className="font-headline font-black text-4xl text-primary-accent">{PENDING.length}</p>
      </div>
      {PENDING.map(p=>(
        <div key={p.asn} className="bg-surface-container p-3 mb-2 flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-primary-accent">{p.asn}</p>
            <p className="text-sm font-headline font-bold">{p.mat}</p>
            <p className="text-xs opacity-50">{p.supplier} · {p.qty}</p>
          </div>
          <StatusBadge type="idle" label="대기" />
        </div>
      ))}
      <div className="mt-6">
        <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">바코드/QR 스캔</label>
        <input value={scan} onChange={e=>setScan(e.target.value)} placeholder="ASN ID 스캔 또는 입력"
          className="w-full bg-surface-container-high text-sm px-3 py-3 border border-outline-variant/20 font-label mb-3" />
        <button onClick={handleScan} className="w-full bg-primary-accent text-black py-4 text-base font-headline font-black uppercase tracking-widest mb-3">
          스캔·Lot 채번
        </button>
      </div>
      {lotIssued && (
        <div className="bg-surface-container p-4 mb-4">
          <p className="text-xs font-label opacity-50 uppercase mb-1">발급 Lot 번호</p>
          <p className="font-headline font-black text-primary-accent text-lg">{lotIssued}</p>
          <p className="text-xs opacity-40 font-label mt-1">형식: LOT-YYYYMMDD-NNN (FR-PUR-005)</p>
          <div className="mt-3">
            <p className="text-xs font-label opacity-50 uppercase mb-2">검수 결과</p>
            <div className="grid grid-cols-3 gap-2">
              {(["PASS","PARTIAL","FAIL"] as const).map(r=>(
                <button key={r} onClick={()=>setInspResult(r)}
                  className={`py-3 text-xs font-label uppercase tracking-widest border ${inspResult===r?"bg-primary-accent text-black":"bg-surface-container-high border-outline-variant/20"}`}>
                  {RESULT_LABEL[r]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {inspResult && (
        <button className="w-full bg-primary-accent text-black py-4 text-base font-headline font-black uppercase tracking-widest">
          저장 · 3-Way Matching 연계 ▶
        </button>
      )}
    </div>
  );
}
