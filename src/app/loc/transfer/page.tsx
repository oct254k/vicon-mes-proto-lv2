"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const locationOptions = ["Z-01-01", "Z-01-02", "Z-01-03", "W-01-01", "W-01-02", "W-02-01", "W-02-02"];

interface ScanItem {
  code: string;
  name: string;
  qty: string;
}

export default function LOCTransferPage() {
  const [fromLoc, setFromLoc] = useState("");
  const [toLoc, setToLoc] = useState("");
  const [scanInput, setScanInput] = useState("");
  const [scanList, setScanList] = useState<ScanItem[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!scanInput.trim()) return;
    setScanList((prev) => [
      ...prev,
      { code: scanInput.trim(), name: "자재명 자동 조회", qty: "1" },
    ]);
    setScanInput("");
  }

  function handleConfirm() {
    if (!fromLoc || !toLoc || scanList.length === 0) return;
    setConfirmed(true);
  }

  function handleReset() {
    setFromLoc("");
    setToLoc("");
    setScanList([]);
    setConfirmed(false);
  }

  return (
    <div>
      <PageHeader
        title="위치 간 이동"
        accent="TRANSFER"
        nodeRef="SCR-LOC-030"
        status="PROTOTYPE"
        description="PDA 스타일 — 출발·도착 위치를 선택하고 이동 자재를 스캔 후 확정합니다."
      />

      {confirmed ? (
        <div className="bg-[#00912F]/20 border-l-4 border-[#00912F] p-6 mb-8">
          <p className="font-label font-bold uppercase tracking-widest text-[#00912F] mb-1">이동 확정 완료</p>
          <p className="text-sm text-white/60">
            {fromLoc} → {toLoc} / {scanList.length}건 이동 완료
          </p>
          <button
            onClick={handleReset}
            className="mt-4 border border-white/20 text-white/60 font-label uppercase tracking-widest text-xs px-4 py-2 hover:border-white/40 transition-colors"
          >
            새 이동 시작
          </button>
        </div>
      ) : (
        <>
          <FieldHeader title="이동 정보" moduleRef="SCR-LOC-030" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-lg">
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">출발 위치</label>
              <select
                value={fromLoc}
                onChange={(e) => setFromLoc(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
              >
                <option value="">선택 또는 스캔</option>
                {locationOptions.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">도착 위치</label>
              <select
                value={toLoc}
                onChange={(e) => setToLoc(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
              >
                <option value="">선택</option>
                {locationOptions.filter((l) => l !== fromLoc).map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <FieldHeader title="자재 스캔" moduleRef="SCR-LOC-030" />
          <form onSubmit={handleScan} className="flex gap-2 mb-4 max-w-lg">
            <input
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              className="flex-1 bg-[#1a1a1a] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
              placeholder="바코드 스캔 또는 자재 코드 입력"
            />
            <button
              type="submit"
              className="bg-[#1a1a1a] border border-white/20 text-white/60 font-label uppercase tracking-widest text-xs px-4 py-2 hover:border-[#00912F] transition-colors"
            >
              추가
            </button>
          </form>

          {scanList.length > 0 && (
            <div className="bg-[#1a1a1a] mb-6 max-w-lg">
              <div className="p-3 border-l-4 border-[#00912F]">
                <span className="text-xs font-label uppercase tracking-widest text-white/50">스캔 목록 ({scanList.length}건)</span>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">코드</th>
                    <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">자재명</th>
                    <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">수량</th>
                  </tr>
                </thead>
                <tbody>
                  {scanList.map((item, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-4 py-2 text-sm text-[#00912F] font-headline">{item.code}</td>
                      <td className="px-4 py-2 text-sm text-white/70">{item.name}</td>
                      <td className="px-4 py-2 text-sm text-white/70">{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!fromLoc || !toLoc || scanList.length === 0}
            className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-8 py-3 text-sm hover:bg-[#00912F]/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            이동 확정
          </button>
        </>
      )}
    </div>
  );
}
