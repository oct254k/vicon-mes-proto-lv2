"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const QUEUE = [
  { pkg:"PKG-0025-001", member:"B01-1-G22C-C-171", woLine:"WO-P3000-20260505-0025/L01", status:"PENDING" },
  { pkg:"PKG-0025-001", member:"B01-1-G22C-C-172", woLine:"WO-P3000-20260505-0025/L02", status:"SCANNED" },
  { pkg:"PKG-0025-001", member:"B01-2-G15A-S-040", woLine:"WO-P3000-20260505-0025/L03", status:"PENDING" },
];

export default function PackingScanPage() {
  const [scanVal, setScanVal] = useState("");
  const [scanned, setScanned] = useState<string[]>(["B01-1-G22C-C-172"]);
  const done = scanned.length;
  const total = QUEUE.length;

  function handleScan() {
    if (scanVal && !scanned.includes(scanVal)) setScanned(prev=>[...prev, scanVal]);
    setScanVal("");
  }
  return (
    <div className="max-w-sm mx-auto">
      <PageHeader title="PDA 패킹 스캔" accent="SCR-SHP-010" nodeRef="IA-SHP-PACKING-SCAN" status="PROTOTYPE"
        description="포장팀 PDA 1:1 검증 스캔 (FNC-SHP-010/011/012)" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-surface-container p-4 text-center">
          <p className="text-xs font-label uppercase opacity-50 mb-1">완료</p>
          <p className="font-headline font-black text-2xl text-primary-accent tabular-nums">{done}</p>
        </div>
        <div className="bg-surface-container p-4 text-center">
          <p className="text-xs font-label uppercase opacity-50 mb-1">잔여</p>
          <p className="font-headline font-black text-2xl text-[#f59e0b] tabular-nums">{total-done}</p>
        </div>
      </div>
      <div className="mb-4">
        {QUEUE.map((q,i)=>(
          <div key={i} className="flex items-center justify-between bg-surface-container p-3 mb-2">
            <div>
              <p className="text-xs font-mono">{q.member}</p>
              <p className="text-xs opacity-40">{q.pkg}</p>
            </div>
            <StatusBadge type={scanned.includes(q.member)?"running":"idle"} label={scanned.includes(q.member)?"SCANNED":"PENDING"} />
          </div>
        ))}
      </div>
      <input value={scanVal} onChange={e=>setScanVal(e.target.value)} placeholder="부재 바코드 스캔"
        className="w-full bg-surface-container-high text-sm px-3 py-3 border border-outline-variant/20 font-label mb-3" />
      <button onClick={handleScan} className="w-full bg-primary-accent text-black py-4 text-base font-headline font-black uppercase tracking-widest">
        스캔 · 검증
      </button>
      {done===total && (
        <div className="mt-3 bg-primary-accent/10 border border-primary-accent/40 px-4 py-3 text-sm font-label text-primary-accent text-center">
          전체 스캔 완료 — STORED 전이
        </div>
      )}
    </div>
  );
}
