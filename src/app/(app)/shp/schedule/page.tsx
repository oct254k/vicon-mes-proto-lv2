"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SHIPMENTS = [
  { id: "SHP-P3000-20260504-001", date: "2026-05-04", account: "P1000 제1 이천공장", site: "이천1공장", status: "COMPLETED",   vehicle: "VH-15TON-007", eta: "16:00" },
  { id: "SHP-P3000-20260505-001", date: "2026-05-05", account: "P1000 제1 이천공장", site: "이천1공장", status: "COMPLETED",   vehicle: "VH-25TON-001", eta: "10:30" },
  { id: "SHP-P3000-20260506-001", date: "2026-05-06", account: "P2000 제2 이천공장", site: "이천2공장", status: "IN_PROGRESS", vehicle: "VH-25TON-002", eta: "14:30" },
  { id: "SHP-P3000-20260507-001", date: "2026-05-07", account: "P1000 제1 이천공장", site: "이천1공장", status: "SCHEDULED",   vehicle: "VH-25TON-003", eta: "10:30" },
  { id: "SHP-P3000-20260508-001", date: "2026-05-08", account: "P1000 제1 이천공장", site: "이천1공장", status: "SCHEDULED",   vehicle: "VH-15TON-007", eta: "09:00" },
];

const VEHICLES = [
  { no: "VH-25TON-003", driver: "외부운전자", origin: "P3000 제3 이천공장", dest: "P1000 제1 이천공장", load: "4,250kg / 25t", status: "SCHEDULED" },
  { no: "VH-25TON-002", driver: "외부운전자", origin: "P3000 제3 이천공장", dest: "P2000 제2 이천공장", load: "6,800kg / 25t", status: "IN_PROGRESS" },
  { no: "VH-25TON-001", driver: "외부운전자", origin: "P3000 제3 이천공장", dest: "P1000 제1 이천공장", load: "5,200kg / 25t", status: "COMPLETED" },
];

const STATUS_MAP: Record<string, { type: "running" | "stopped" | "warning" | "idle"; label: string }> = {
  SCHEDULED:   { type: "idle",    label: "예정" },
  IN_PROGRESS: { type: "warning", label: "진행 중" },
  COMPLETED:   { type: "running", label: "완료" },
  CANCELLED:   { type: "stopped", label: "취소" },
};

const DAYS = ["MON 5/4", "TUE 5/5", "WED 5/6", "THU 5/7", "FRI 5/8"];

export default function SHPSchedulePage() {
  const [selected, setSelected] = useState<typeof SHIPMENTS[0] | null>(null);
  const [view, setView] = useState<"calendar" | "gantt">("calendar");

  const vehicleRows = VEHICLES.map((v) => ({
    no: v.no, driver: v.driver, origin: v.origin,
    dest: v.dest, load: v.load,
    status: <StatusBadge type={STATUS_MAP[v.status]?.type ?? "idle"} label={STATUS_MAP[v.status]?.label ?? v.status} /> as unknown as string,
  }));

  return (
    <div className="min-h-screen bg-surface text-on-surface p-8">
      <PageHeader title="출하 일정" accent="캘린더" nodeRef="IA-SHP-SCHEDULE-CALENDAR" description="출하 일정 관리 · 차량 배차" />

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-surface-container-lowest border border-outline">
        <select className="bg-surface-container text-on-surface text-xs px-3 py-2 border border-outline-variant/20 outline-none">
          <option>P3000 제3공장</option>
        </select>
        <input type="text" defaultValue="2026-05-01 ~ 2026-05-31" className="bg-surface-container text-on-surface text-xs px-3 py-2 border border-outline-variant/20 w-52 outline-none" readOnly />
        <select className="bg-surface-container text-on-surface text-xs px-3 py-2 border border-outline-variant/20 outline-none">
          <option>거래처 전체</option>
        </select>
        <select className="bg-surface-container text-on-surface text-xs px-3 py-2 border border-outline-variant/20 outline-none">
          <option>상태 전체</option>
        </select>
        <button className="bg-[#00912F] text-white text-xs px-4 py-2 font-bold uppercase tracking-wider">재조회</button>
        <button className="bg-surface-container text-on-surface text-xs px-4 py-2 border border-outline-variant/20 font-bold uppercase tracking-wider">엑셀</button>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 mb-4">
        {(["calendar", "gantt"] as const).map((t) => (
          <button key={t} onClick={() => setView(t)}
            className={`text-xs px-4 py-2 font-bold uppercase tracking-wider border ${view === t ? "border-[#00912F] text-[#00912F]" : "border-outline-variant/20 text-on-surface/50"}`}>
            {t === "calendar" ? "캘린더" : "간트"}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {DAYS.map((day) => (
          <div key={day} className="bg-surface-container-lowest border border-outline">
            <div className="text-xs font-label uppercase tracking-widest opacity-50 px-3 py-2 border-b border-outline">{day}</div>
            <div className="p-2 space-y-2 min-h-[120px]">
              {SHIPMENTS.filter((s) => s.date === `2026-05-0${day.split("/")[1]}`).map((s) => (
                <button key={s.id} onClick={() => setSelected(s)}
                  className={`w-full text-left p-2 text-xs border transition-colors ${selected?.id === s.id ? "border-[#00912F]" : "border-outline-variant/20"} hover:border-[#00912F]/60`}>
                  <div className="font-bold truncate">{s.id.slice(-4)}</div>
                  <div className="opacity-60 truncate">{s.vehicle}</div>
                  <StatusBadge type={STATUS_MAP[s.status]?.type ?? "idle"} label={STATUS_MAP[s.status]?.label ?? s.status} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="mb-6 p-6 bg-surface-container-lowest border-l-4 border-[#00912F]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4">
            <div><div className="opacity-50 mb-1">SHIPMENT ID</div><div className="font-mono">{selected.id}</div></div>
            <div><div className="opacity-50 mb-1">거래처 / 현장</div><div>{selected.account} / {selected.site}</div></div>
            <div><div className="opacity-50 mb-1">ETA</div><div>{selected.date} {selected.eta}</div></div>
            <div><div className="opacity-50 mb-1">차량</div><div>{selected.vehicle}</div></div>
          </div>
          <div className="flex gap-2">
            <button className="bg-[#00912F] text-white text-xs px-4 py-2 font-bold uppercase tracking-wider">신규 SHIPMENT</button>
            <button className="bg-surface-container text-on-surface text-xs px-4 py-2 border border-outline-variant/20 font-bold uppercase tracking-wider">배차</button>
            <button className="bg-surface-container text-on-surface text-xs px-4 py-2 border border-outline-variant/20 font-bold uppercase tracking-wider">변경 / 취소</button>
          </div>
        </div>
      )}

      {/* Vehicle Table */}
      <DataTable title="차량 배차 현황" bufferCount={VEHICLES.length}
        columns={[
          { key: "no", label: "차량 번호" }, { key: "driver", label: "운전자" },
          { key: "origin", label: "출발지" }, { key: "dest", label: "목적지" },
          { key: "load", label: "적재량" }, { key: "status", label: "상태" },
        ]}
        data={vehicleRows}
      />

      <div className="mt-6 flex justify-end">
        <button className="bg-[#00912F] text-white text-xs px-6 py-3 font-bold uppercase tracking-wider">일정 등록</button>
      </div>
    </div>
  );
}
