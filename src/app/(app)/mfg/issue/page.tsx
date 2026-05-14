"use client";
import { useState } from "react";

const MEMBER = { id: "B01-1-G22C-C-171", type: "C형 6000mm", woId: "WO-P3000-20260506-0007", operation: "CUT (절단)" };

const HISTORY = [
  { lotNo: "RCV-20260501-0017", materialId: "M-COIL-A", qty: "45.6 m", time: "09:30" },
  { lotNo: "INSUL-B-20260420-007", materialId: "M-INSUL-B", qty: "12.68 m²", time: "09:32" },
];

export default function MFGIssuePage() {
  const [scan, setScan] = useState("");
  const [qty, setQty] = useState("45.6");
  const [committed, setCommitted] = useState(HISTORY);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!scan) return;
    setCommitted(prev => [
      { lotNo: scan, materialId: "M-COIL-A", qty: `${qty} m`, time: new Date().toTimeString().slice(0, 5) },
      ...prev,
    ]);
    setScan("");
    setQty("45.6");
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2000);
  };

  return (
    <div className="max-w-sm mx-auto py-6 px-3 space-y-4">
      {/* 헤더 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4">
        <div className="flex justify-between items-start">
          <span className="font-headline font-black text-base">자재 투입 — ISSUE</span>
        </div>
        <p className="text-xs font-mono text-on-surface/70 mt-1">{MEMBER.woId}</p>
        <p className="text-xs text-on-surface/60">{MEMBER.id} · {MEMBER.type}</p>
        <p className="text-xs text-on-surface/50 mt-0.5">공정: <span className="text-primary-accent">{MEMBER.operation}</span></p>
      </div>

      {/* 스캔 입력 */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-4 space-y-3">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50">Lot 바코드 스캔</p>
        <input
          type="text"
          value={scan}
          onChange={e => setScan(e.target.value)}
          placeholder="RCV-20260501-0017"
          className="w-full bg-surface border border-outline-variant/30 px-3 py-3 text-2xl font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
        />
        {scan && (
          <div className="flex items-center gap-2 text-xs text-primary-accent font-label">
            <span className="w-2 h-2 bg-primary-accent inline-block"></span>
            M-COIL-A · 강판 COIL-A · 잔량 900.0 KG
          </div>
        )}
      </div>

      {/* 수량 입력 */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-4 space-y-2">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50">투입 수량</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={qty}
            onChange={e => setQty(e.target.value)}
            className="flex-1 bg-surface border border-outline-variant/30 px-3 py-3 text-2xl font-mono text-on-surface focus:outline-none focus:border-primary-accent"
          />
          <span className="text-sm font-label text-on-surface/50 w-8">m</span>
        </div>
        <p className="text-xs text-on-surface/30">표준 투입: 45.6 m (BOM × 부재길이)</p>
      </div>

      {/* 투입 확정 버튼 */}
      <button
        onClick={handleConfirm}
        disabled={!scan}
        className={`w-full py-4 text-base font-label uppercase tracking-widest ${
          scan
            ? "bg-primary-accent text-white"
            : "bg-surface-container-high text-on-surface/30"
        }`}
      >
        {confirmed ? "투입 완료 ✓" : "투입 확정"}
      </button>

      {/* 오늘 투입 이력 */}
      <div className="bg-surface-container-lowest">
        <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between">
          <span className="font-headline font-black text-xs uppercase tracking-widest">오늘 투입 이력</span>
          <span className="text-xs text-on-surface/40 font-label">{committed.length}건</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["Lot", "자재코드", "수량", "시각"].map(h => (
                  <th key={h} className="px-3 py-2 text-xs font-label uppercase tracking-widest opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs font-headline">
              {committed.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                  <td className="px-3 py-2 font-mono text-primary-accent">{r.lotNo}</td>
                  <td className="px-3 py-2">{r.materialId}</td>
                  <td className="px-3 py-2 tabular-nums">{r.qty}</td>
                  <td className="px-3 py-2 tabular-nums text-on-surface/50">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
