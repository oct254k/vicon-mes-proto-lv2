"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Stage = "CREATED" | "IN_PRODUCTION" | "COMPLETED" | "STORED" | "READY" | "HOLD" | "LOADED" | "SHIPPED";

const STAGES: Stage[] = ["CREATED", "IN_PRODUCTION", "COMPLETED", "STORED", "READY", "HOLD", "LOADED", "SHIPPED"];

const MOCK: Record<Stage, { id: string; woNo: string; member: string; updatedAt: string }[]> = {
  CREATED:       [{ id: "PKG-WO-P3000-20260507-0003-001", woNo: "WO-P3000-20260507-0003", member: "B01-2-G22C-C-201", updatedAt: "2026-05-07 08:00" }],
  IN_PRODUCTION: [
    { id: "PKG-WO-P3000-20260506-0007-001", woNo: "WO-P3000-20260506-0007", member: "B01-1-G22C-C-171", updatedAt: "2026-05-06 11:30" },
    { id: "PKG-WO-P3000-20260506-0008-001", woNo: "WO-P3000-20260506-0008", member: "B01-1-G22C-S-172", updatedAt: "2026-05-06 12:00" },
  ],
  COMPLETED:     [{ id: "PKG-WO-P3000-20260505-0002-001", woNo: "WO-P3000-20260505-0002", member: "B02-1-T18B-C-101", updatedAt: "2026-05-05 16:45" }],
  STORED:        [
    { id: "PKG-WO-P3000-20260505-0001-001", woNo: "WO-P3000-20260505-0001", member: "B02-1-T18B-S-102", updatedAt: "2026-05-05 17:10" },
    { id: "PKG-WO-P3000-20260504-0002-001", woNo: "WO-P3000-20260504-0002", member: "B03-1-G22C-C-301", updatedAt: "2026-05-04 15:00" },
  ],
  READY:         [{ id: "PKG-WO-P3000-20260504-0001-001", woNo: "WO-P3000-20260504-0001", member: "B01-2-G22C-H-202", updatedAt: "2026-05-06 09:00" }],
  HOLD:          [{ id: "PKG-WO-P3000-20260420-0001-001", woNo: "WO-P3000-20260420-0001", member: "B01-1-G22C-C-171", updatedAt: "2026-04-20 10:00" }],
  LOADED:        [{ id: "PKG-WO-P3000-20260503-0001-001", woNo: "WO-P3000-20260503-0001", member: "B02-1-T18B-C-101", updatedAt: "2026-05-06 07:30" }],
  SHIPPED:       [],
};

const STAGE_COLOR: Record<Stage, string> = {
  CREATED: "border-on-surface/20", IN_PRODUCTION: "border-tertiary", COMPLETED: "border-primary-accent",
  STORED: "border-primary-accent", READY: "border-[#f59e0b]", HOLD: "border-error", LOADED: "border-tertiary", SHIPPED: "border-on-surface/30",
};

const BADGE_TYPE: Record<Stage, "running" | "warning" | "idle" | "stopped" | "error"> = {
  CREATED: "idle", IN_PRODUCTION: "running", COMPLETED: "idle", STORED: "idle",
  READY: "warning", HOLD: "stopped", LOADED: "running", SHIPPED: "idle",
};

export default function PackingLifecyclePage() {
  const [active, setActive] = useState<Stage>("IN_PRODUCTION");
  const rows = MOCK[active];

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="패킹 라이프사이클" accent="8단계 보드" nodeRef="SCR-WO-021" description="PRC-WO-003 §7 — CREATED → IN_PRODUCTION → COMPLETED → STORED → READY → HOLD → LOADED → SHIPPED" />

      <div className="flex flex-wrap gap-1 mb-4">
        {STAGES.map((s) => (
          <button key={s} onClick={() => setActive(s)}
            className={`px-3 py-2 text-xs font-label uppercase tracking-widest flex items-center gap-2 border-b-2 transition-colors
              ${active === s ? `${STAGE_COLOR[s]} text-on-surface bg-surface-container` : "border-transparent text-on-surface/40 hover:text-on-surface/70"}`}>
            {s}
            <span className={`px-1.5 py-0.5 text-xs font-bold font-headline
              ${s === "HOLD" ? "bg-error/20 text-error" : MOCK[s].length > 0 ? "bg-primary-accent/20 text-primary-accent" : "bg-surface-container-high text-on-surface/30"}`}>
              {MOCK[s].length}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <StatusBadge type={BADGE_TYPE[active]} label={active} />
        <span className="text-xs opacity-40 font-label">{rows.length}건</span>
      </div>

      {rows.length === 0 ? (
        <div className="bg-surface-container-lowest flex items-center justify-center h-32 text-on-surface/30 text-sm font-label">
          해당 상태의 패킹이 없습니다
        </div>
      ) : (
        <div className="bg-surface-container-lowest overflow-x-auto">
          <div className={`p-3 bg-surface-container-highest/30 border-l-4 ${STAGE_COLOR[active]} flex justify-between items-center`}>
            <span className="font-headline font-black text-xs uppercase tracking-widest">{active} 패킹 그룹</span>
          </div>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["패킹 ID", "WO번호", "부재 코드", "업데이트"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.woNo}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.member}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
