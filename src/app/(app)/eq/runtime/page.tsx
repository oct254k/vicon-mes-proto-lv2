"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type EqStatus = "RUNNING" | "IDLE" | "DOWN" | "MAINTENANCE";

const equipments: { id: string; name: string; status: EqStatus; duration: string; oee: number | null }[] = [
  { id: "EQ-P3000-CUT-01", name: "절단기 #1", status: "RUNNING", duration: "2h 15m", oee: 87.3 },
  { id: "EQ-P3000-CUT-02", name: "절단기 #2", status: "MAINTENANCE", duration: "45m", oee: null },
  { id: "EQ-P3000-CUT-03", name: "절단기 #3", status: "RUNNING", duration: "4h 30m", oee: 92.1 },
  { id: "EQ-P3000-CUT-04", name: "절단기 #4", status: "RUNNING", duration: "3h 00m", oee: 88.0 },
  { id: "EQ-P3000-PRESS-01", name: "프레스 #1", status: "RUNNING", duration: "1h 50m", oee: 90.5 },
  { id: "EQ-P3000-PRESS-02", name: "프레스 #2", status: "DOWN", duration: "65m", oee: 0 },
  { id: "EQ-P3000-WELD-01", name: "용접기 #1", status: "RUNNING", duration: "5h 00m", oee: 94.2 },
  { id: "EQ-P3000-WELD-02", name: "용접기 #2", status: "IDLE", duration: "20m", oee: null },
];

const statusBorderColor: Record<EqStatus, string> = {
  RUNNING: "#00912F",
  IDLE: "#6b7280",
  DOWN: "#14532d",
  MAINTENANCE: "#4ade80",
};

const EQ_LABEL: Record<string, string> = { RUNNING:"가동중", IDLE:"유휴", DOWN:"중단", MAINTENANCE:"점검중" };
function mapStatus(s: EqStatus): "running" | "idle" | "stopped" | "warning" {
  if (s === "RUNNING") return "running";
  if (s === "IDLE") return "idle";
  if (s === "DOWN") return "stopped";
  return "warning";
}

const running = equipments.filter(e => e.status === "RUNNING").length;
const idle = equipments.filter(e => e.status === "IDLE").length;
const down = equipments.filter(e => e.status === "DOWN").length;
const maint = equipments.filter(e => e.status === "MAINTENANCE").length;
const oeeValues = equipments.filter(e => e.oee != null && e.oee > 0).map(e => e.oee as number);
const oeeAvg = oeeValues.length ? (oeeValues.reduce((a, b) => a + b, 0) / oeeValues.length).toFixed(1) : "--";

export default function EQRuntimePage() {
  return (
    <div className="p-6">
      <PageHeader title="실시간 가동" accent="현황" nodeRef="SCR-EQ-010" description="설비별 4종 가동 상태 모니터 — 15초 자동 새로고침" />

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-surface-container p-4 border-l-4 border-tertiary">
          <p className="font-label text-xs uppercase opacity-40">가동 중</p>
          <p className="font-headline font-black text-3xl mt-1">{running}<span className="text-base opacity-40 font-normal ml-1">대</span></p>
        </div>
        <div className="bg-surface-container p-4 border-l-4 border-error">
          <p className="font-label text-xs uppercase opacity-40">정지</p>
          <p className="font-headline font-black text-3xl mt-1">{down}<span className="text-base opacity-40 font-normal ml-1">대</span></p>
        </div>
        <div className="bg-surface-container p-4 border-l-4 border-on-surface-variant/30">
          <p className="font-label text-xs uppercase opacity-40">유휴 / 정비</p>
          <p className="font-headline font-black text-3xl mt-1">{idle + maint}<span className="text-base opacity-40 font-normal ml-1">대</span></p>
        </div>
        <div className="bg-surface-container p-4 border-l-4 border-primary-accent">
          <p className="font-label text-xs uppercase opacity-40">OEE 평균</p>
          <p className="font-headline font-black text-3xl mt-1">{oeeAvg}<span className="text-base opacity-40 font-normal ml-1">%</span></p>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {equipments.map(eq => (
          <div
            key={eq.id}
            className="bg-surface-container border-l-4 p-3"
            style={{ borderColor: statusBorderColor[eq.status] }}
          >
            <p className="font-label text-xs uppercase opacity-50">{eq.id}</p>
            <p className="font-headline font-bold mt-1 text-sm">{eq.name}</p>
            <div className="mt-1.5">
              <StatusBadge type={mapStatus(eq.status)} label={EQ_LABEL[eq.status] ?? eq.status} />
            </div>
            <p className="text-xs opacity-50 mt-1">{eq.duration}</p>
            {eq.oee != null && (
              <p className="text-xs font-label mt-1">OEE <span className="text-primary-accent font-bold">{eq.oee}%</span></p>
            )}
            {eq.status === "DOWN" && (
              <div className="mt-2 flex gap-1">
                <span className="text-xs bg-error/20 text-error px-2 py-0.5 font-label">정지유형 미입력 ⚠</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
