"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SHIPMENT = { id:"SHP-P3000-20260507-001", vehicle:"VH-25TON-003", dest:"P1000 제1 이천공장", limit:"25,000 kg" };
const TO_LOAD = [
  { pkg:"PKG-WO-P3000-20260506-0007-001", members:12, weightKg:2450, loc:"YARD-P3000-B-12" },
  { pkg:"PKG-WO-P3000-20260506-0007-002", members: 8, weightKg:1800, loc:"YARD-P3000-B-13" },
];
const TOTAL_KG = TO_LOAD.reduce((s, r) => s + r.weightKg, 0);

export default function LoadingScanPage() {
  const [loaded, setLoaded] = useState<string[]>([]);
  const [scan, setScan] = useState("");
  const loadedKg = TO_LOAD.filter(r => loaded.includes(r.pkg)).reduce((s, r) => s + r.weightKg, 0);

  function handleScan() {
    const match = TO_LOAD.find(p=>p.pkg===scan);
    if (match && !loaded.includes(scan)) setLoaded(prev=>[...prev, scan]);
    setScan("");
  }
  return (
    <div className="max-w-sm mx-auto">
      <PageHeader title="PDA 적재 스캔" nodeRef="IA-SHP-LOADING-SCAN" status="PROTOTYPE"
        description="운전자 PDA 적재 스캔 — LOADED 전이 (EXTERNAL 토큰 · FNC-SHP-050/051/053/055)" />
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/40 px-3 py-2 mb-4 text-xs font-label text-[#f59e0b]">
        EXTERNAL 토큰 — 단일 shipment 범위 내 액션만 허용
      </div>
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-2">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{SHIPMENT.id} · {SHIPMENT.vehicle}</p>
        <p className="text-xs opacity-50 font-label mb-3">→ {SHIPMENT.dest}</p>
        <div className="flex justify-between items-end">
          <div className="text-center">
            <p className="font-headline font-black text-4xl text-primary-accent">{loaded.length} / {TO_LOAD.length}</p>
            <p className="text-xs opacity-40 font-label mt-1">PKG 적재</p>
          </div>
          <div className="text-right">
            <p className="font-headline font-black text-2xl tabular-nums">{loadedKg.toLocaleString()} <span className="text-sm opacity-50">kg</span></p>
            <p className="text-xs opacity-40 font-label">/ {TOTAL_KG.toLocaleString()} kg 합계</p>
          </div>
        </div>
      </div>
      {TO_LOAD.map(p=>(
        <div key={p.pkg} className="bg-surface-container p-3 mb-2 flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-primary-accent">{p.pkg}</p>
            <p className="text-xs opacity-60">{p.loc} · {p.weightKg.toLocaleString()} kg · {p.members}부재</p>
          </div>
          <StatusBadge type={loaded.includes(p.pkg)?"running":"idle"} label={loaded.includes(p.pkg)?"적재됨":"대기"} />
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
