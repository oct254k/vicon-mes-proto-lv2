"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const inputCls = "w-full bg-surface border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]";

interface ScannedItem { lot: string; material: string; qty: string; fromLoc: string; }

export default function TransferOutPage() {
  const [scan,     setScan]     = useState("");
  const [toLoc,    setToLoc]    = useState("");
  const [items,    setItems]    = useState<ScannedItem[]>([]);
  const [done,     setDone]     = useState(false);

  const handleScan = () => {
    if (!scan.trim()) return;
    setItems(prev => [...prev, { lot: scan.trim(), material: "M-COIL-A P3000 900m", qty: "900m", fromLoc: "Y-P3000-A-01-03" }]);
    setScan("");
  };

  return (
    <div>
      <PageHeader
        title="이동 출발 스캔"
        accent="TRANSFER-OUT"
        nodeRef="SCR-LOC-030"
        status="PROTOTYPE"
        description="PDA — 출발 위치에서 Lot 스캔 → 도착 위치 지정 → 이동 출고 확정."
      />

      <div className="max-w-sm mx-auto space-y-5">
        {done ? (
          <div className="bg-[#00912F]/20 border-l-4 border-[#00912F] p-6">
            <p className="font-label font-bold uppercase tracking-widest text-[#00912F] mb-1">출발 확정 완료</p>
            <p className="text-sm text-on-surface/60">{items.length}건 → {toLoc} 이동 중</p>
            <button onClick={() => { setDone(false); setItems([]); setToLoc(""); }} className="mt-4 border border-outline/30 text-on-surface/60 font-label uppercase text-xs px-4 py-2">
              새 이동 시작
            </button>
          </div>
        ) : (
          <>
            <FieldHeader title="1. Lot 스캔" moduleRef="FNC-LOC-050" />
            <div className="bg-surface-elevated p-4 space-y-3">
              <input className={inputCls} placeholder="Lot No 스캔" value={scan} onChange={e=>setScan(e.target.value)} />
              <button onClick={handleScan} className="w-full bg-surface-elevated border border-outline/30 text-on-surface/60 font-label uppercase tracking-widest text-xs py-2 hover:border-[#00912F]">
                추가
              </button>
            </div>

            {items.length > 0 && (
              <div className="bg-surface-elevated">
                <div className="p-3 border-l-4 border-[#00912F]">
                  <span className="text-xs font-label uppercase tracking-widest text-on-surface/50">스캔 목록 ({items.length}건)</span>
                </div>
                {items.map((it, i) => (
                  <div key={i} className="px-4 py-2 border-b border-outline/10 text-sm">
                    <p className="text-[#00912F] font-headline">{it.lot}</p>
                    <p className="text-on-surface/50 text-xs">{it.material} / {it.qty} / {it.fromLoc}</p>
                  </div>
                ))}
              </div>
            )}

            <FieldHeader title="2. 도착 위치" moduleRef="FNC-LOC-051" />
            <div className="bg-surface-elevated p-4 space-y-3">
              <input className={inputCls} placeholder="도착 위치 스캔 — Y-P1000-..." value={toLoc} onChange={e=>setToLoc(e.target.value)} />
              {toLoc && <p className="text-xs font-label text-[#00912F]">✔ ACTIVE &nbsp;✔ 잔여 충분</p>}
            </div>

            <button
              onClick={() => setDone(true)}
              disabled={items.length === 0 || !toLoc}
              className="w-full py-3 bg-[#00912F] text-black font-label font-bold uppercase tracking-widest text-sm hover:opacity-90 disabled:opacity-30">
              출발 확정 ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
}
