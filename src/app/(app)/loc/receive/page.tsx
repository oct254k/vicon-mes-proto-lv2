"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const RECEIVE_LINES = [
  { lineNo: 1, material: "M-COIL-A", supplierCoilId: "P-A2305-0017", qty: "812.4", unit: "m", poRemain: "1500.0", isolate: "N" },
  { lineNo: 2, material: "M-COIL-A", supplierCoilId: "P-A2305-0018", qty: "820.0", unit: "m", poRemain: "687.6",  isolate: "N" },
  { lineNo: 3, material: "M-COIL-B", supplierCoilId: "P-B2305-0301", qty: "300.0", unit: "m", poRemain: "300.0",  isolate: "Y" },
];
const PREVIEW_LOTS = [
  { lineNo: 1, lotNo: "RCV-20260501-0017", fifoSeq: 4521 },
  { lineNo: 2, lotNo: "RCV-20260501-0018", fifoSeq: 4522 },
];
const LINE_COLS = [
  { key: "lineNo",         label: "#" },
  { key: "material",       label: "Material" },
  { key: "supplierCoilId", label: "공급사 CoilID" },
  { key: "qty",            label: "수량(m)" },
  { key: "poRemain",       label: "PO 잔량" },
  { key: "isolate",        label: "격리" },
];
const inputCls = "bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm";

export default function LOCReceivePage() {
  const [tab, setTab]       = useState<"pc" | "pda">("pc");
  const [poId, setPoId]     = useState("PO-2026-00417");
  const [invoiceNo, setInv] = useState("INV-2026-9821");
  const [arrival, setArrival] = useState("2026-05-01");
  const [scanLot, setScanLot] = useState("");
  const [scanLoc, setScanLoc] = useState("Y-P3000-A-01-02");
  const [pdaQty, setPdaQty] = useState("812.4");

  const tabBtn = (id: "pc" | "pda", label: string) => (
    <button
      onClick={() => setTab(id)}
      className={`px-6 py-2 text-sm font-label uppercase tracking-widest transition-colors ${
        tab === id
          ? "bg-primary-accent text-black"
          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="입고" accent="RECEIVE" nodeRef="SCR-LOC-020" status="PROTOTYPE" />
      <div className="flex gap-0 mb-8">{tabBtn("pc", "PC 등록")}{tabBtn("pda", "PDA 스캔")}</div>

      {tab === "pc" && (
        <div className="space-y-6">
          <FieldHeader title="A. 송장 정보" moduleRef="SCR-LOC-020" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {([["PO 번호", poId, setPoId], ["송장번호", invoiceNo, setInv]] as [string, string, (v: string) => void][]).map(([lbl, val, fn]) => (
              <div key={lbl} className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant uppercase tracking-widest">{lbl}</label>
                <input className={inputCls} value={val} onChange={(e) => fn(e.target.value)} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant uppercase tracking-widest">도착일</label>
              <input type="date" className={inputCls} value={arrival} onChange={(e) => setArrival(e.target.value)} />
            </div>
          </div>
          <div className="bg-surface-container-low p-3 text-xs text-on-surface-variant border-l-2 border-primary-accent/40">
            공급사: <span className="text-on-surface font-bold">포스코</span>
            &ensp;|&ensp;3-Way Matching: PO <span className="text-tertiary">✔</span>
            &ensp;qty <span className="text-tertiary">✔</span>
            &ensp;단가 <span className="text-[#f59e0b]">PENDING</span>
          </div>

          <FieldHeader title="B. 라인별 자재" moduleRef="FNC-LOC-038" />
          <DataTable title="입고 라인" columns={LINE_COLS} data={RECEIVE_LINES} bufferCount={3} />
          <div className="bg-surface-container-low p-4 space-y-1 text-xs font-label">
            <p className="uppercase tracking-widest text-on-surface-variant mb-2">Lot 자동채번 미리보기</p>
            {PREVIEW_LOTS.map((l) => (
              <p key={l.lineNo}>
                <span className="text-primary-accent">{l.lineNo}</span>
                {" → "}
                <span className="text-on-surface">{l.lotNo}</span>
                <span className="opacity-40 ml-2">(fifo_seq {l.fifoSeq})</span>
              </p>
            ))}
          </div>

          <FieldHeader title="C. 입고 위치 검증 3조건" moduleRef="FNC-LOC-040" />
          <div className="flex flex-wrap gap-4 items-end">
            {(["Plant · P3000", "Yard · Y-RAW", `위치 · Y-P3000-A-01-02`] as string[]).map((lbl) => (
              <div key={lbl} className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant uppercase tracking-widest">{lbl.split(" · ")[0]}</label>
                <input className={`${inputCls} w-48`} defaultValue={lbl.split(" · ")[1]} readOnly />
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-xs mt-1">
            {["ACTIVE ✔", "Y-RAW 허용 ✔", "잔여 1500m ✔"].map((t) => (
              <span key={t} className="text-tertiary">{t}</span>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button className="px-6 py-2 bg-primary-accent text-black text-sm font-bold uppercase tracking-widest hover:opacity-90">입고 등록 ▶</button>
            <button className="px-6 py-2 bg-surface-container text-on-surface-variant text-sm font-bold uppercase tracking-widest hover:bg-surface-container-high" onClick={() => setTab("pda")}>
              PDA 모드로 전환 ▶
            </button>
            <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant text-sm uppercase tracking-widest">취소</button>
          </div>
        </div>
      )}

      {tab === "pda" && (
        <div className="max-w-sm mx-auto space-y-5">
          <FieldHeader title="PDA 입고 스캔" moduleRef="SCR-LOC-021" />
          <div className="bg-surface-container p-4 space-y-3">
            <p className="text-xs uppercase tracking-widest text-primary-accent">1단계 코일 라벨 스캔</p>
            <input className={inputCls + " w-full"} placeholder="Lot / CoilID 스캔" value={scanLot} onChange={(e) => setScanLot(e.target.value)} />
            {scanLot && (
              <div className="text-sm">
                <p>M-COIL-A &nbsp;<span className="text-on-surface-variant">812.4 m</span></p>
                <p className="text-xs opacity-50">P-A2305-0017</p>
              </div>
            )}
          </div>
          <div className="bg-surface-container p-4 space-y-3">
            <p className="text-xs uppercase tracking-widest text-primary-accent">2단계 위치 라벨 스캔</p>
            <input className={inputCls + " w-full"} value={scanLoc} onChange={(e) => setScanLoc(e.target.value)} placeholder="위치 ID 스캔" />
            <div className="flex gap-2 text-xs">
              <span className="text-tertiary">✔ ACTIVE</span>
              <span className="text-tertiary">✔ Y-RAW</span>
              <span className="text-tertiary">✔ 잔여 2000m</span>
            </div>
          </div>
          <div className="bg-surface-container p-4 space-y-2">
            <p className="text-xs uppercase tracking-widest text-primary-accent">입고 수량 (m)</p>
            <input type="number" className={inputCls + " w-full"} value={pdaQty} onChange={(e) => setPdaQty(e.target.value)} />
            <p className="text-xs text-on-surface-variant">Lot (자동) RCV-20260501-0017&ensp;fifo_seq 4521</p>
          </div>
          <button className="w-full py-3 bg-primary-accent text-black text-sm font-bold uppercase tracking-widest hover:opacity-90">입고 확정 ▶</button>
          <button className="w-full py-2 bg-surface-container text-on-surface-variant text-sm uppercase tracking-widest">취소</button>
          <div className="border-t border-outline-variant/10 pt-3">
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">최근 5건</p>
            {["RCV-20260501-0016", "RCV-20260430-0022", "RCV-20260429-0019"].map((l) => (
              <p key={l} className="text-xs text-on-surface/50 py-1 border-b border-outline-variant/5">{l}</p>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
