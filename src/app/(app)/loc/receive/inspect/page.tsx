"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Result = "PENDING" | "PASS" | "FAIL";

interface InspectItem { lot: string; material: string; qty: string; result: Result; note: string; }

const RESULT_LABEL: Record<string, string> = { PENDING:"대기", PASS:"합격", FAIL:"불합격" };
const INIT: InspectItem[] = [
  { lot: "RCV-20260504-0021", material: "M-COIL-B", qty: "300m", result: "PENDING", note: "" },
];

const inputCls = "w-full bg-surface border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]";

export default function ReceiveInspectPage() {
  const [scan,    setScan]    = useState("");
  const [items,   setItems]   = useState<InspectItem[]>(INIT);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    if (!scan) return;
    setItems(prev => prev.map(it =>
      it.lot === scan.trim() ? { ...it } : it
    ));
    setScanned(true);
  };

  const setResult = (lot: string, result: Result) =>
    setItems(prev => prev.map(it => it.lot === lot ? { ...it, result } : it));
  const setNote   = (lot: string, note: string) =>
    setItems(prev => prev.map(it => it.lot === lot ? { ...it, note } : it));

  const current = scanned ? items[0] : null;

  return (
    <div className="max-w-sm mx-auto">
      <PageHeader
        title="PDA 검수"
        accent="검수"
        nodeRef="SCR-LOC-022"
        status="PROTOTYPE"
        description="입고 Lot 스캔 → 합격 / 불합격 판정. 불합격 시 격리 위치로 자동 이동."
      />

      <div className="space-y-5">
        <FieldHeader title="1. Lot 스캔" moduleRef="FNC-LOC-041" />
        <div className="bg-surface-elevated p-4 space-y-3">
          <input
            className={inputCls}
            placeholder="Lot No 스캔 — RCV-20260504-0021"
            value={scan}
            onChange={e => setScan(e.target.value)}
          />
          <button onClick={handleScan} className="w-full bg-[#00912F] text-black font-label font-bold uppercase tracking-widest py-2 text-sm hover:opacity-90">
            스캔 ▶
          </button>
        </div>

        {current && (
          <>
            <div className="bg-surface-elevated p-4 space-y-2 text-sm">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-2">스캔 결과</p>
              {[["Lot", current.lot], ["자재", current.material], ["수량", current.qty]].map(([k,v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-on-surface/50 font-label text-xs uppercase tracking-widest">{k}</span>
                  <span className="font-headline font-bold">{v}</span>
                </div>
              ))}
              <div className="pt-1">
                <StatusBadge type={current.result === "PASS" ? "running" : current.result === "FAIL" ? "stopped" : "idle"} label={RESULT_LABEL[current.result]} />
              </div>
            </div>

            <FieldHeader title="2. 검수 판정" moduleRef="FNC-LOC-041" />
            <div className="flex gap-3">
              <button
                onClick={() => setResult(current.lot, "PASS")}
                className={`flex-1 py-3 font-label font-bold uppercase tracking-widest text-sm transition-colors ${current.result === "PASS" ? "bg-[#00912F] text-black" : "bg-surface-elevated border border-outline/20 text-on-surface/60 hover:border-[#00912F]"}`}
              >합격 ✔</button>
              <button
                onClick={() => setResult(current.lot, "FAIL")}
                className={`flex-1 py-3 font-label font-bold uppercase tracking-widest text-sm transition-colors ${current.result === "FAIL" ? "bg-danger text-white" : "bg-surface-elevated border border-outline/20 text-on-surface/60 hover:border-danger"}`}
              >불합격 ✗</button>
            </div>

            {current.result === "FAIL" && (
              <div className="space-y-2">
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface/40">불량 사유</label>
                <input className={inputCls} value={current.note} onChange={e=>setNote(current.lot, e.target.value)} placeholder="표면 결함, 치수 불량 등" />
                <p className="text-xs font-label text-danger">격리 위치: Y-P3000-DEFECT-01-01 자동 지정</p>
              </div>
            )}

            <button className="w-full py-3 bg-[#00912F] text-black font-label font-bold uppercase tracking-widest text-sm hover:opacity-90 disabled:opacity-30"
              disabled={current.result === "PENDING"}>
              검수 확정 ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
}
