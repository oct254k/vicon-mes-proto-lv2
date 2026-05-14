"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const PACKING_DATA = [
  { id: "PKG-20260506-0001", memberCount: 8 },
  { id: "PKG-20260506-0002", memberCount: 12 },
  { id: "PKG-20260506-0003", memberCount: 5 },
];

export default function SHPPackingPage() {
  const [scanInput, setScanInput] = useState("");
  const [scanned, setScanned] = useState(PACKING_DATA);
  const [done, setDone] = useState(false);

  function handleScan() {
    const val = scanInput.trim();
    if (!val) return;
    setScanned((prev) => [...prev, { id: val, memberCount: 0 }]);
    setScanInput("");
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-8">
      <PageHeader
        title="패킹"
        accent="PDA"
        nodeRef="SCR-SHP-002"
        status="PROTOTYPE"
      />

      {/* 스캔 입력 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">패킹 그룹 스캔</p>
        <input
          type="text"
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          placeholder="바코드 / QR 스캔 또는 입력"
          className="w-full bg-surface-container text-on-surface text-sm px-4 py-3 border border-outline-variant/20 outline-none mb-3 placeholder:opacity-40"
        />
        <button
          onClick={handleScan}
          className="w-full bg-surface-container-high text-on-surface py-4 text-sm font-label uppercase tracking-widest hover:bg-surface-container-highest transition-colors border border-outline-variant/20"
        >
          스캔 추가
        </button>
      </div>

      {/* 스캔 목록 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-label uppercase tracking-widest opacity-50">스캔된 패킹</p>
          <span className="text-xs font-headline font-black text-primary-accent">{scanned.length} PKG</span>
        </div>
        <div className="space-y-2">
          {scanned.map((pkg) => (
            <div
              key={pkg.id}
              className="flex justify-between items-center px-3 py-2 bg-surface-container border-l-2 border-primary-accent"
            >
              <span className="text-xs font-mono text-on-surface">{pkg.id}</span>
              <span className="text-xs font-label opacity-60">{pkg.memberCount} 부재</span>
            </div>
          ))}
          {scanned.length === 0 && (
            <p className="text-xs opacity-30 text-center py-4">스캔 대기 중</p>
          )}
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        onClick={() => setDone(true)}
        disabled={scanned.length === 0}
        className={`w-full py-4 text-sm font-label uppercase tracking-widest font-bold transition-colors ${
          done
            ? "bg-surface-container-highest text-on-surface/50"
            : "bg-primary-accent text-white hover:bg-primary-accent/90"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {done ? "완료됨" : "패킹 완료"}
      </button>
    </div>
  );
}
