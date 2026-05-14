"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SHIPMENT = { id:"SHP-P3000-20260507-001", from:"P3000 제3 이천공장 (데크)", to:"P1000 제1 이천공장" };
const PKG_LIST = [
  { pkg:"PKG-WO-P3000-20260506-0007-001", members:12, weight:"2,450 kg" },
  { pkg:"PKG-WO-P3000-20260506-0007-002", members: 8, weight:"1,800 kg" },
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
      <PageHeader title="PDA QR 스캔 검수" nodeRef="IA-SHP-RECEIVE-SCAN" status="PROTOTYPE"
        description="현장 검수 QR/Camera 스캔 (EXTERNAL 토큰 · FNC-SHP-071/072/073/075/076)" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{SHIPMENT.id}</p>
        <p className="text-xs opacity-50 font-label mb-3">{SHIPMENT.from} → {SHIPMENT.to}</p>
        <div className="text-center">
          <p className="font-headline font-black text-4xl text-primary-accent">{scanned.length} / {PKG_LIST.length}</p>
          <p className="text-xs opacity-40 font-label mt-1">PKG 검수</p>
        </div>
      </div>
      {PKG_LIST.map(p=>(
        <div key={p.pkg} className="bg-surface-container p-3 mb-2 flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-primary-accent">{p.pkg}</p>
            <p className="text-xs opacity-60">{p.members}부재 · {p.weight}</p>
          </div>
          <StatusBadge type={scanned.includes(p.pkg)?"running":"idle"} label={scanned.includes(p.pkg)?"확인됨":"대기"} />
        </div>
      ))}
      <div className="mt-4">
        <input value={scan} onChange={e=>setScan(e.target.value)} placeholder="QR 코드 스캔"
          className="w-full bg-surface-container-high text-sm px-3 py-3 border border-outline-variant/20 font-label mb-3" />
        <button onClick={handleScan} className="w-full bg-primary-accent text-black py-4 text-base font-headline font-black uppercase tracking-widest mb-3">
          스캔 · 검수
        </button>
        <a href="/shp/receive/mismatch" className="w-full block text-center py-3 bg-warning/20 border border-warning/40 text-warning text-sm font-label uppercase">
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
