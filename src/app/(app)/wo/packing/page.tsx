"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type PackingState = "CREATED" | "IN_PRODUCTION" | "COMPLETED" | "STORED" | "READY" | "HOLD" | "LOADED" | "SHIPPED";

const PACKING_STAGES: PackingState[] = ["CREATED", "IN_PRODUCTION", "COMPLETED", "STORED", "READY", "HOLD", "LOADED", "SHIPPED"];

const MOCK: Record<PackingState, Array<{ id: string; memberCount: number; woNo: string; location: string; updatedAt: string }>> = {
  CREATED:      [{ id: "PKG-WO-P3000-20260507-0003-001", memberCount: 8,  woNo: "WO-P3000-20260507-0003", location: "—",    updatedAt: "2026-05-07 08:00" }],
  IN_PRODUCTION:[{ id: "PKG-WO-P3000-20260506-0007-001", memberCount: 12, woNo: "WO-P3000-20260506-0007", location: "공정중", updatedAt: "2026-05-06 11:30" },
                 { id: "PKG-WO-P3000-20260506-0008-001", memberCount: 10, woNo: "WO-P3000-20260506-0008", location: "공정중", updatedAt: "2026-05-06 12:00" }],
  COMPLETED:    [{ id: "PKG-WO-P3000-20260505-0002-001", memberCount: 3,  woNo: "WO-P3000-20260505-0002", location: "완료",  updatedAt: "2026-05-05 16:45" }],
  STORED:       [{ id: "PKG-WO-P3000-20260505-0001-001", memberCount: 12, woNo: "WO-P3000-20260505-0001", location: "A-2-3", updatedAt: "2026-05-05 17:10" },
                 { id: "PKG-WO-P3000-20260504-0002-001", memberCount: 8,  woNo: "WO-P3000-20260504-0002", location: "B-1-1", updatedAt: "2026-05-04 15:00" }],
  READY:        [{ id: "PKG-WO-P3000-20260504-0001-001", memberCount: 12, woNo: "WO-P3000-20260504-0001", location: "A-1-4", updatedAt: "2026-05-06 09:00" }],
  HOLD:         [{ id: "PKG-WO-P3000-20260420-0001-001", memberCount: 6,  woNo: "WO-P3000-20260420-0001", location: "B-3-2", updatedAt: "2026-04-20 10:00" }],
  LOADED:       [{ id: "PKG-WO-P3000-20260503-0001-001", memberCount: 12, woNo: "WO-P3000-20260503-0001", location: "12가1234", updatedAt: "2026-05-06 07:30" }],
  SHIPPED:      [],
};

function stageColor(stage: PackingState): string {
  const MAP: Record<PackingState, string> = {
    CREATED:      "border-on-surface/20",
    IN_PRODUCTION:"border-tertiary",
    COMPLETED:    "border-primary-accent",
    STORED:       "border-primary-accent",
    READY:        "border-warning",
    HOLD:         "border-error",
    LOADED:       "border-tertiary",
    SHIPPED:      "border-on-surface/30",
  };
  return MAP[stage];
}

function stageBadgeType(stage: PackingState): "running" | "warning" | "idle" | "stopped" | "error" {
  if (stage === "IN_PRODUCTION" || stage === "LOADED") return "running";
  if (stage === "READY")        return "warning";
  if (stage === "HOLD")         return "stopped";
  if (stage === "COMPLETED" || stage === "STORED") return "idle";
  return "idle";
}

export default function WOPackingPage() {
  const [activeTab, setActiveTab] = useState<PackingState>("IN_PRODUCTION");

  const rows = MOCK[activeTab];

  return (
    <div>
      <PageHeader title="패킹 라이프사이클 보드" nodeRef="IA-WO-PACKING-LIFECYCLE" status="PROTOTYPE" />
      <p className="text-xs opacity-40 font-label mb-4">PRC-WO-003 §7 — 8단계 상태머신 (CREATED → SHIPPED)</p>

      {/* 8단계 탭 */}
      <div className="flex flex-wrap gap-1 mb-4">
        {PACKING_STAGES.map(stage => {
          const count = MOCK[stage].length;
          const isActive = stage === activeTab;
          return (
            <button
              key={stage}
              onClick={() => setActiveTab(stage)}
              className={`px-3 py-2 text-xs font-label uppercase tracking-widest flex items-center gap-2 border-b-2 transition-colors
                ${isActive ? `${stageColor(stage)} text-on-surface bg-surface-container` : "border-transparent text-on-surface/40 hover:text-on-surface/70"}`}
            >
              {stage}
              <span className={`px-1.5 py-0.5 text-xs font-bold font-headline
                ${stage === "HOLD" ? "bg-error/20 text-error" :
                  count > 0 ? "bg-primary-accent/20 text-primary-accent" : "bg-surface-container-high text-on-surface/30"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 현재 탭 상태 배지 */}
      <div className="flex items-center gap-3 mb-4">
        <StatusBadge type={stageBadgeType(activeTab)} label={activeTab} />
        <span className="text-xs opacity-40 font-label">{rows.length}건</span>
      </div>

      <FieldHeader title={`${activeTab} 패킹 그룹`} moduleRef="FNC-WO-020~029" />

      {rows.length === 0 ? (
        <div className="bg-surface-container-lowest flex items-center justify-center h-32 text-on-surface/30 text-sm font-label">
          해당 상태의 패킹이 없습니다
        </div>
      ) : (
        <div className="bg-surface-container-lowest overflow-x-auto">
          <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
            <span className="font-headline font-black text-xs uppercase tracking-widest">패킹 그룹 목록</span>
            <button className="text-xs opacity-40 hover:opacity-70 font-label uppercase tracking-widest">새로고침</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["패킹 ID", "부재 수", "WO번호", "위치", "업데이트"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {rows.map(row => (
                <tr key={row.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{row.id}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{row.memberCount}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{row.woNo}</td>
                  <td className="px-4 py-2 text-xs">
                    {activeTab === "HOLD"
                      ? <span className="text-error font-bold">{row.location} ⚠ HOLD</span>
                      : row.location}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{row.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 grid grid-cols-4 gap-3">
        {(["CREATED", "IN_PRODUCTION", "COMPLETED", "STORED", "READY", "HOLD", "LOADED", "SHIPPED"] as PackingState[]).map(s => (
          <div key={s} className={`bg-surface-container p-3 border-l-2 ${stageColor(s)}`}>
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{s}</p>
            <p className="font-headline font-black text-xl">{MOCK[s].length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
