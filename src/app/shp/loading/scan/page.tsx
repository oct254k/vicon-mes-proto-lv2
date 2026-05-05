"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const TO_LOAD = [
  { pkg:"PKG-0025-001", members:24, weight:"18.5t", loc:"YARD-A3" },
  { pkg:"PKG-0025-002", members:12, weight:"9.2t", loc:"YARD-A3" },
];

export default function LoadingScanPage() {
  const [loaded, setLoaded] = useState<string[]>([]);
  const [scan, setScan] = useState("");
  const total = TO_LOAD.reduce((a,r)=>a+r.weight.replace("t","").length,0);

  function handleScan() {
    const match = TO_LOAD.find(p=>p.pkg===scan);
    if (match && !loaded.includes(scan)) setLoaded(prev=>[...prev, scan]);
    setScan("");
  }
  return (
    <div className="max-w-sm mx-auto">
      <PageHeader title="PDA 적재 스캔" accent="SCR-SHP-040" nodeRef="IA-SHP-LOADING-SCAN" status="PROTOTYPE"
        description="운전자 PDA 적재 스캔 — LOADED 전이 (EXTERNAL 토큰 · FNC-SHP-050/051/053/055)" />
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/40 px-3 py-2 mb-4 text-xs font-label text-[#f59e0b]">
        EXTERNAL 토큰 — 단일 shipment 범위 내 액션만 허용
      </div>
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 text-center">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">적재 현황</p>
        <p className="font-headline font-black text-4xl text-primary-accent">{loaded.length} / {TO_LOAD.length}</p>
        <p className="text-xs opacity-40 font-label mt-1">PKG 완료</p>
      </div>
      {TO_LOAD.map(p=>(
        <div key={p.pkg} className="bg-surface-container p-3 mb-2 flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-primary-accent">{p.pkg}</p>
            <p className="text-xs opacity-60">{p.loc} · {p.weight} · {p.members}부재</p>
          </div>
          <StatusBadge type={loaded.includes(p.pkg)?"running":"idle"} label={loaded.includes(p.pkg)?"LOADED":"PENDING"} />
        </div>
      ))}
      <div className="mt-4">
        <input value={scan} onChange={e=>setScan(e.target.value)} placeholder="PKG 바코드 스캔"
          className="w-full bg-surface-container-high text-sm px-3 py-3 border border-outline-variant/20 font-label mb-3" />
        <button onClick={handleScan} className="w-full bg-primary-accent text-black py-4 text-base font-headline font-black uppercase tracking-widest">
          스캔 · LOADED 전이
        </button>
      </div>
      {loaded.length===TO_LOAD.length && (
        <div className="mt-3 bg-primary-accent/10 border border-primary-accent/40 px-4 py-3 text-sm font-label text-primary-accent text-center">
          전체 적재 완료 — 출발 확인으로 이동
        </div>
      )}
    </div>
  );
}
