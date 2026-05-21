"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const inputCls = "w-full bg-surface border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]";

type ArrivalResult = "MATCH" | "DISCREPANCY" | null;

export default function TransferArrivePage() {
  const [scan,     setScan]     = useState("");
  const [scanned,  setScanned]  = useState(false);
  const [qtyActual, setQtyActual] = useState("900");
  const [result,   setResult]   = useState<ArrivalResult>(null);
  const [done,     setDone]     = useState(false);

  const expectedQty = "900";
  const lot = "RCV-20260501-0017";

  const handleScan = () => { if (scan.trim()) setScanned(true); };
  const handleConfirm = () => {
    setResult(qtyActual === expectedQty ? "MATCH" : "DISCREPANCY");
    setDone(true);
  };

  return (
    <div>
      <PageHeader
        title="이동 도착 확인"
        accent="이동 입고"
        nodeRef="SCR-LOC-031"
        status="PROTOTYPE"
        description="PDA — 도착 위치에서 Lot 스캔 → 실 수량 확인 → MATCH / DISCREPANCY 판정."
      />

      <div className="max-w-sm mx-auto space-y-5">
        {done ? (
          <div className={`border-l-4 p-6 ${result === "MATCH" ? "bg-[#00912F]/20 border-[#00912F]" : "bg-danger/20 border-danger"}`}>
            <p className={`font-label font-bold uppercase tracking-widest mb-2 ${result === "MATCH" ? "text-[#00912F]" : "text-danger"}`}>
              {result === "MATCH" ? "도착 확정 완료" : "불일치 — 결재 필요"}
            </p>
            {result === "DISCREPANCY" && (
              <p className="text-sm text-on-surface/60">예상 {expectedQty}m / 실제 {qtyActual}m — LOC-MANAGER 결재 요청됨</p>
            )}
            <button onClick={() => { setDone(false); setScanned(false); setScan(""); setResult(null); }}
              className="mt-4 border border-outline/30 text-on-surface/60 font-label uppercase text-xs px-4 py-2">
              새 도착 확인
            </button>
          </div>
        ) : (
          <>
            <FieldHeader title="1. Lot 스캔" moduleRef="FNC-LOC-054" />
            <div className="bg-surface-elevated p-4 space-y-3">
              <input className={inputCls} placeholder="Lot No 스캔" value={scan} onChange={e=>setScan(e.target.value)} />
              <button onClick={handleScan} className="w-full bg-surface-elevated border border-outline/30 text-on-surface/60 font-label uppercase tracking-widest text-xs py-2 hover:border-[#00912F]">
                조회
              </button>
            </div>

            {scanned && (
              <>
                <div className="bg-surface-elevated p-4 space-y-2 text-sm">
                  <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-2">이동 정보</p>
                  {[["Lot", lot], ["자재", "M-COIL-A P3000 900m"], ["예상 수량", expectedQty + "m"], ["출발", "Y-P3000-A-01-03"], ["목표 도착", "Y-P1000-A-01-02"]].map(([k,v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-on-surface/50 font-label text-xs uppercase tracking-widest">{k}</span>
                      <span className="font-headline font-bold text-xs">{v}</span>
                    </div>
                  ))}
                  <StatusBadge type="warning" label="IN-TRANSIT" />
                </div>

                <FieldHeader title="2. 실 수량 확인" moduleRef="FNC-LOC-054" />
                <div className="bg-surface-elevated p-4 space-y-3">
                  <input type="number" className={inputCls} value={qtyActual} onChange={e=>setQtyActual(e.target.value)} />
                  {qtyActual !== expectedQty && (
                    <p className="text-danger text-xs font-label">⚠ 수량 불일치 — 불일치 결재가 생성됩니다.</p>
                  )}
                </div>

                <button onClick={handleConfirm} className="w-full py-3 bg-[#00912F] text-black font-label font-bold uppercase tracking-widest text-sm hover:opacity-90">
                  도착 확정 ▶
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
