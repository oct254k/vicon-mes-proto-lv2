"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const VEHICLE = {
  plate: "12라3456",
  driver: "김철수",
  site: "송도현장 A동",
  depTime: "2026-05-06 14:30",
  maxLoad: "25t",
};

const INITIAL_LOADED = [
  { packId: "PKG-20260506-0001", memberCount: 8, loadedAt: "13:10" },
  { packId: "PKG-20260506-0002", memberCount: 12, loadedAt: "13:22" },
];

export default function SHPLoadingPage() {
  const [scanInput, setScanInput] = useState("");
  const [loaded, setLoaded] = useState(INITIAL_LOADED);
  const [done, setDone] = useState(false);

  function handleScan() {
    const val = scanInput.trim();
    if (!val) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setLoaded((prev) => [...prev, { packId: val, memberCount: 0, loadedAt: time }]);
    setScanInput("");
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-8">
      <PageHeader
        title="차량 적재"
        accent="PDA"
        nodeRef="SCR-SHP-005"
        status="PROTOTYPE"
      />

      {/* 차량 정보 */}
      <div className="bg-surface-container-lowest p-4 mb-4 border-l-4 border-primary-accent">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">차량 정보</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs opacity-40">차량 번호</p>
            <p className="font-headline font-black text-lg">{VEHICLE.plate}</p>
          </div>
          <div>
            <p className="text-xs opacity-40">운전자</p>
            <p className="font-bold">{VEHICLE.driver}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs opacity-40">목적지</p>
            <p className="font-bold">{VEHICLE.site}</p>
          </div>
          <div>
            <p className="text-xs opacity-40">출발 예정</p>
            <p className="font-mono text-sm">{VEHICLE.depTime}</p>
          </div>
          <div>
            <p className="text-xs opacity-40">최대 적재</p>
            <p className="font-bold text-primary-accent">{VEHICLE.maxLoad}</p>
          </div>
        </div>
      </div>

      {/* 스캔 입력 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">패킹 스캔</p>
        <input
          type="text"
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          placeholder="패킹 ID 스캔"
          className="w-full bg-surface-container text-white text-sm px-4 py-3 border border-outline-variant/20 outline-none mb-3 placeholder:opacity-40"
        />
        <button
          onClick={handleScan}
          className="w-full py-4 bg-surface-container-high text-white text-sm font-label uppercase tracking-widest hover:bg-surface-container-highest transition-colors border border-outline-variant/20"
        >
          스캔 추가
        </button>
      </div>

      {/* 적재 목록 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-label uppercase tracking-widest opacity-50">적재 목록</p>
          <span className="text-xs font-headline font-black text-primary-accent">{loaded.length} PKG</span>
        </div>
        <div className="space-y-2">
          {loaded.map((item, i) => (
            <div key={i} className="flex justify-between items-center px-3 py-2 bg-surface-container border-l-2 border-primary-accent text-xs">
              <span className="font-mono">{item.packId}</span>
              <span className="opacity-60">{item.memberCount} 부재</span>
              <span className="opacity-40 font-mono">{item.loadedAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 적재 완료 */}
      <button
        onClick={() => setDone(true)}
        disabled={loaded.length === 0}
        className={`w-full py-4 text-sm font-label uppercase tracking-widest font-bold transition-colors ${
          done
            ? "bg-surface-container-highest text-on-surface/50"
            : "bg-primary-accent text-white hover:bg-primary-accent/90"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {done ? "적재 완료됨" : "적재 완료"}
      </button>
    </div>
  );
}
