"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const PLANTS = ["P1-안산", "P2-인천", "P3-부산", "P4-광주"];

const MOCK_SCANNED = [
  { code: "B01-1-G22C-C-171", name: "거더 플랜지 A", qty: 1 },
  { code: "B01-2-G22C-W-042", name: "웨브 패널 B", qty: 1 },
  { code: "B01-3-G22C-S-009", name: "스티프너 세트", qty: 3 },
];

export default function MFGTransferPage() {
  const [fromPlant, setFromPlant] = useState("");
  const [toPlant, setToPlant] = useState("");
  const [scanInput, setScanInput] = useState("");
  const [scanned, setScanned] = useState(MOCK_SCANNED);
  const [confirmed, setConfirmed] = useState(false);

  function handleScan() {
    if (!scanInput.trim()) return;
    setScanned((prev) => [
      ...prev,
      { code: scanInput.trim(), name: "부재 (스캔됨)", qty: 1 },
    ]);
    setScanInput("");
  }

  function handleConfirm() {
    if (!fromPlant || !toPlant || fromPlant === toPlant) return;
    setConfirmed(true);
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-6">
      <PageHeader
        title="공장 간 이동"
        accent="이동"
        nodeRef="SCR-MFG-030"
        status="PROTOTYPE"
      />

      {confirmed ? (
        <div className="bg-primary-accent/10 border border-primary-accent p-6 text-center mt-4">
          <p className="font-headline font-black text-primary-accent text-lg uppercase tracking-widest mb-1">이동 확정 완료</p>
          <p className="text-on-surface/70 text-sm font-body">{fromPlant} → {toPlant}</p>
          <p className="text-on-surface/50 text-xs mt-1">{scanned.length}개 부재 등록됨</p>
          <button
            className="mt-6 w-full bg-surface-container border border-outline-variant/30 py-3 font-label uppercase tracking-widest text-xs text-on-surface/70"
            onClick={() => { setConfirmed(false); setScanned(MOCK_SCANNED); setFromPlant(""); setToPlant(""); }}
          >
            초기화
          </button>
        </div>
      ) : (
        <>
          <FieldHeader title="출발 / 도착 Plant" moduleRef="SCR-MFG-031" />
          <div className="flex flex-col gap-3 mb-6">
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface/50 block mb-1">출발 Plant</label>
              <select
                className="w-full bg-surface-container border border-outline-variant/30 px-3 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
                value={fromPlant}
                onChange={(e) => setFromPlant(e.target.value)}
              >
                <option value="">선택</option>
                {PLANTS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="text-center text-primary-accent font-headline font-black text-xl">↓</div>
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface/50 block mb-1">도착 Plant</label>
              <select
                className="w-full bg-surface-container border border-outline-variant/30 px-3 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
                value={toPlant}
                onChange={(e) => setToPlant(e.target.value)}
              >
                <option value="">선택</option>
                {PLANTS.filter((p) => p !== fromPlant).map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <FieldHeader title="부재 스캔" moduleRef="SCR-MFG-032" />
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 bg-surface-container border border-outline-variant/30 px-3 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary-accent"
              placeholder="바코드 스캔 또는 직접 입력"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
            />
            <button
              className="bg-surface-container-high border border-primary-accent px-4 py-3 font-label text-xs uppercase tracking-widest text-primary-accent"
              onClick={handleScan}
            >
              스캔
            </button>
          </div>

          <div className="bg-surface-container-lowest border border-outline mb-6">
            <div className="px-4 py-2 bg-surface-container-highest/20 border-b border-outline flex justify-between">
              <span className="font-label text-xs uppercase tracking-widest">스캔된 부재</span>
              <span className="font-label text-xs text-primary-accent">{scanned.length}개</span>
            </div>
            {scanned.map((item, i) => (
              <div key={i} className="px-4 py-3 border-b border-outline-variant flex justify-between items-center">
                <div>
                  <p className="font-headline text-sm font-bold">{item.code}</p>
                  <p className="text-xs text-on-surface/50">{item.name}</p>
                </div>
                <span className="font-label text-xs text-on-surface/40">×{item.qty}</span>
              </div>
            ))}
          </div>

          <button
            className={`w-full py-4 font-headline font-black uppercase tracking-widest text-base transition-colors ${
              fromPlant && toPlant && fromPlant !== toPlant && scanned.length > 0
                ? "bg-primary-accent text-on-primary"
                : "bg-surface-container-high text-on-surface/30 cursor-not-allowed"
            }`}
            onClick={handleConfirm}
            disabled={!fromPlant || !toPlant || fromPlant === toPlant || scanned.length === 0}
          >
            이동 확정
          </button>
        </>
      )}
    </div>
  );
}
