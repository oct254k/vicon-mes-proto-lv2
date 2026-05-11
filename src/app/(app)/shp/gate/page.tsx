"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";

const RECENT_VEHICLES = [
  { plate: "VH-25TON-003", passedAt: "08:05", method: "RFID" },
  { plate: "VH-15TON-007", passedAt: "06:40", method: "RFID" },
  { plate: "VH-25TON-001", passedAt: "05:20", method: "MANUAL" },
];

export default function SHPGatePage() {
  const [gateState, setGateState] = useState<"OPEN" | "CLOSED">("CLOSED");
  const [log, setLog] = useState(RECENT_VEHICLES);

  function handleManual() {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setLog([{ plate: "수동인식-" + time, passedAt: time, method: "MANUAL" }, ...log.slice(0, 2)]);
    setGateState("OPEN");
    setTimeout(() => setGateState("CLOSED"), 5000);
  }

  return (
    <div className="min-h-screen bg-[#131313] text-white flex flex-col">
      {/* 헤더 */}
      <div className="border-b border-outline-variant/10 px-8 py-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-label uppercase tracking-[0.3em] opacity-50">ETO MES</span>
          <span className="mx-3 opacity-20">|</span>
          <span className="text-xs font-label uppercase tracking-[0.3em] text-primary-accent">GATE TERMINAL</span>
        </div>
      </div>

      {/* 메인 상태 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* 게이트 ID */}
        <div className="text-center mb-8">
          <p className="text-xs font-label uppercase tracking-[0.4em] opacity-40 mb-2">GATE ID</p>
          <p className="text-5xl md:text-7xl font-headline font-black tracking-tighter">
            GATE-<span className="text-primary-accent">01</span>
          </p>
          <p className="text-sm font-label uppercase tracking-widest opacity-50 mt-2">제3 이천공장 출하 게이트</p>
        </div>

        {/* 상태 표시 */}
        <div
          className={`w-64 h-64 flex flex-col items-center justify-center border-4 mb-8 transition-all duration-500 ${
            gateState === "OPEN"
              ? "border-primary-accent bg-primary-accent/10"
              : "border-outline-variant/30 bg-surface-container-lowest"
          }`}
        >
          <span
            className={`text-6xl font-headline font-black mb-2 transition-colors ${
              gateState === "OPEN" ? "text-primary-accent" : "text-on-surface/30"
            }`}
          >
            {gateState}
          </span>
          <StatusBadge
            type={gateState === "OPEN" ? "running" : "idle"}
            label={gateState === "OPEN" ? "차단바 개방" : "차단바 폐쇄"}
          />
        </div>

        {/* 수동 인식 버튼 */}
        <button
          onClick={handleManual}
          className="bg-primary-accent text-white px-12 py-5 text-base font-label uppercase tracking-widest font-bold hover:bg-primary-accent/90 transition-colors mb-12"
        >
          수동 인식
        </button>

        {/* 최근 통과 차량 */}
        <div className="w-full max-w-lg">
          <p className="text-xs font-label uppercase tracking-[0.3em] opacity-40 mb-3 text-center">최근 통과 차량</p>
          <div className="space-y-2">
            {log.map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-3 bg-surface-container-lowest border border-outline-variant/10"
              >
                <span className="text-lg font-headline font-black">{v.plate}</span>
                <span className="font-mono text-sm opacity-60">{v.passedAt}</span>
                <StatusBadge
                  type={v.method === "RFID" ? "running" : "warning"}
                  label={v.method}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
