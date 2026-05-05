"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PKG_LIST = [
  { pkg:"PKG-0025-001", members:24, weight:"18.5t" },
  { pkg:"PKG-0025-002", members:12, weight:"9.2t" },
];

export default function ReceiveScanPage() {
  const [scanned, setScanned] = useState<string[]>([]);
  const [scan, setScan] = useState("");

  function handleScan() {
    if (scan && !scanned.includes(scan)) setScanned(prev=>[...prev, scan]);
    setScan("");
  }

  return (
    <div className="max-w-sm mx-auto">
      <PageHeader title="PDA QR 스캔 검수" accent="SCR-SHP-061" nodeRef="IA-SHP-RECEIVE-SCAN" status="PROTOTYPE"
        description="현장 검수 QR/Camera 스캔 (EXTERNAL 토큰 · FNC-SHP-071/072/073/075/076)" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 text-center">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">검수 현황</p>
        <p className="font-headline font-black text-4xl text-primary-accent">{scanned.length} / {PKG_LIST.length}</p>
      </div>
      {PKG_LIST.map(p=>(
        <div key={p.pkg} className="bg-surface-container p-3 mb-2 flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-primary-accent">{p.pkg}</p>
            <p className="text-xs opacity-60">{p.members}부재 · {p.weight}</p>
          </div>
          <StatusBadge type={scanned.includes(p.pkg)?"running":"idle"} label={scanned.includes(p.pkg)?"CHECKED":"PENDING"} />
        </div>
      ))}
      <div className="mt-4">
        <input value={scan} onChange={e=>setScan(e.target.value)} placeholder="QR 코드 스캔"
          className="w-full bg-surface-container-high text-sm px-3 py-3 border border-outline-variant/20 font-label mb-3" />
        <button onClick={handleScan} className="w-full bg-primary-accent text-black py-4 text-base font-headline font-black uppercase tracking-widest mb-3">
          스캔 · 검수
        </button>
        <a href="/shp/receive/mismatch" className="w-full block text-center py-3 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-sm font-label uppercase">
          불일치 보고 →
        </a>
      </div>
      {scanned.length===PKG_LIST.length && (
        <div className="mt-3">
          <a href="/shp/receive/sign" className="w-full block text-center py-4 bg-primary-accent text-black text-base font-headline font-black uppercase tracking-widest">
            서명 수령으로 이동 ▶
          </a>
        </div>
      )}
    </div>
  );
}
