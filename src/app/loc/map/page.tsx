"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { useRouter } from "next/navigation";

type SlotStatus = "EMPTY" | "OCCUPIED" | "FULL" | "MAINTENANCE" | "AGING";

interface Lot {
  id: string;
  row: number;
  col: number;
  status: SlotStatus;
  count: number;
  material?: string;
  lot?: string;
  qty?: number;
}

const LOTS: Lot[] = [
  { id: "LOT-A01", row: 0, col: 0, status: "EMPTY",       count: 0 },
  { id: "LOT-A02", row: 0, col: 1, status: "OCCUPIED",    count: 3,  material: "M-COIL-A", lot: "RCV-20260503-0011", qty: 3000 },
  { id: "LOT-A03", row: 0, col: 2, status: "FULL",        count: 5,  material: "M-COIL-A", lot: "RCV-20260501-0017", qty: 5000 },
  { id: "LOT-A04", row: 0, col: 3, status: "EMPTY",       count: 0 },
  { id: "LOT-A05", row: 0, col: 4, status: "OCCUPIED",    count: 2,  material: "M-COIL-B", lot: "RCV-20260504-0021", qty: 1800 },
  { id: "LOT-A06", row: 0, col: 5, status: "EMPTY",       count: 0 },
  { id: "LOT-B01", row: 1, col: 0, status: "OCCUPIED",    count: 4,  material: "M-COIL-C", lot: "RCV-20260502-0009", qty: 4200 },
  { id: "LOT-B02", row: 1, col: 1, status: "FULL",        count: 5,  material: "M-COIL-A", lot: "RCV-20260430-0033", qty: 5000 },
  { id: "LOT-B03", row: 1, col: 2, status: "AGING",       count: 3,  material: "M-COIL-A", lot: "LOT-20260420-007",  qty: 2800 },
  { id: "LOT-B04", row: 1, col: 3, status: "EMPTY",       count: 0 },
  { id: "LOT-B05", row: 1, col: 4, status: "FULL",        count: 5,  material: "M-COIL-B", lot: "RCV-20260429-0041", qty: 5000 },
  { id: "LOT-B06", row: 1, col: 5, status: "EMPTY",       count: 0 },
  { id: "LOT-C01", row: 2, col: 0, status: "MAINTENANCE", count: 0 },
  { id: "LOT-C02", row: 2, col: 1, status: "EMPTY",       count: 0 },
  { id: "LOT-C03", row: 2, col: 2, status: "OCCUPIED",    count: 2,  material: "M-PLATE",  lot: "RCV-20260505-0003", qty: 2200 },
  { id: "LOT-C04", row: 2, col: 3, status: "OCCUPIED",    count: 1,  material: "M-PLATE",  lot: "RCV-20260505-0004", qty: 800  },
  { id: "LOT-C05", row: 2, col: 4, status: "MAINTENANCE", count: 0 },
  { id: "LOT-C06", row: 2, col: 5, status: "EMPTY",       count: 0 },
  { id: "LOT-D01", row: 3, col: 0, status: "EMPTY",       count: 0 },
  { id: "LOT-D02", row: 3, col: 1, status: "FULL",        count: 5,  material: "M-COIL-C", lot: "RCV-20260428-0055", qty: 5000 },
  { id: "LOT-D03", row: 3, col: 2, status: "EMPTY",       count: 0 },
  { id: "LOT-D04", row: 3, col: 3, status: "AGING",       count: 4,  material: "M-COIL-B", lot: "LOT-20260413-021",  qty: 3600 },
  { id: "LOT-D05", row: 3, col: 4, status: "EMPTY",       count: 0 },
  { id: "LOT-D06", row: 3, col: 5, status: "OCCUPIED",    count: 2,  material: "M-PLATE",  lot: "RCV-20260504-0019", qty: 1500 },
  { id: "LOT-E01", row: 4, col: 0, status: "EMPTY",       count: 0 },
  { id: "LOT-E02", row: 4, col: 1, status: "EMPTY",       count: 0 },
  { id: "LOT-E03", row: 4, col: 2, status: "OCCUPIED",    count: 3,  material: "M-COIL-A", lot: "RCV-20260505-0002", qty: 2600 },
  { id: "LOT-E04", row: 4, col: 3, status: "FULL",        count: 5,  material: "M-COIL-C", lot: "RCV-20260503-0022", qty: 5000 },
  { id: "LOT-E05", row: 4, col: 4, status: "EMPTY",       count: 0 },
  { id: "LOT-E06", row: 4, col: 5, status: "EMPTY",       count: 0 },
];

const CELL_STYLE: Record<SlotStatus, string> = {
  EMPTY:       "bg-surface-container-high text-on-surface/30 border border-outline-variant/10",
  OCCUPIED:    "bg-primary-accent/20 border border-primary-accent/40 text-primary-accent",
  FULL:        "bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b]",
  MAINTENANCE: "bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444]",
  AGING:       "bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316] animate-pulse",
};

const LEGEND: { status: SlotStatus; label: string; color: string }[] = [
  { status: "EMPTY",       label: "EMPTY — 비어있음",      color: "bg-surface-container-highest border border-outline-variant/20" },
  { status: "OCCUPIED",    label: "OCCUPIED — 적재중",     color: "bg-primary-accent/30 border border-primary-accent/50" },
  { status: "FULL",        label: "FULL — 가득 참",        color: "bg-[#f59e0b]/30 border border-[#f59e0b]/50" },
  { status: "MAINTENANCE", label: "MAINTENANCE — 점검중",  color: "bg-[#ef4444]/30 border border-[#ef4444]/50" },
  { status: "AGING",       label: "AGING — 보관 초과",     color: "bg-[#f97316]/30 border border-[#f97316]/50" },
];

const YARDS = ["YRD-A 원자재", "YRD-B 입고 대기", "YRD-C 공정 진행"];
const PLANTS = ["P3000 제3공장", "P1000 제1공장"];

export default function LOCMapPage() {
  const router = useRouter();
  const [plant, setPlant] = useState(PLANTS[0]);
  const [yard, setYard] = useState(YARDS[0]);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);

  const occupied  = LOTS.filter(l => l.status !== "EMPTY" && l.status !== "MAINTENANCE").length;
  const fullCount = LOTS.filter(l => l.status === "FULL").length;
  const agingCount = LOTS.filter(l => l.status === "AGING").length;
  const maintCount = LOTS.filter(l => l.status === "MAINTENANCE").length;
  const occupancyPct = Math.round((occupied / LOTS.length) * 100);

  return (
    <div>
      <PageHeader
        title="야적장 도면"
        accent="LOC-010"
        nodeRef="SCR-LOC-010"
        status="PROTOTYPE"
        description="야적장 격자 도면 실시간 시각화. 셀 클릭 시 하단 부재 상세 표시."
      />

      {/* 상단 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface/40">Plant</label>
          <select
            value={plant}
            onChange={e => setPlant(e.target.value)}
            className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-xs font-label text-on-surface focus:outline-none focus:border-primary-accent"
          >
            {PLANTS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface/40">Yard</label>
          <select
            value={yard}
            onChange={e => setYard(e.target.value)}
            className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-xs font-label text-on-surface focus:outline-none focus:border-primary-accent"
          >
            {YARDS.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
        <button
          onClick={() => router.push("/loc/map/editor")}
          className="ml-auto bg-surface-container-high border border-outline-variant/20 px-4 py-1.5 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/10 hover:border-primary-accent/40"
        >
          편집 모드 ▶
        </button>
      </div>

      <div className="flex gap-4">
        {/* 도면 캔버스 */}
        <div className="flex-1 bg-surface-container border border-outline-variant/10 p-4">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mb-3">
            {yard} — 5×6 격자 (총 {LOTS.length}위치)
          </p>
          <div className="grid grid-cols-6 gap-1">
            {LOTS.map(lot => (
              <button
                key={lot.id}
                onClick={() => setSelectedLot(lot.id === selectedLot?.id ? null : lot)}
                className={`h-16 flex flex-col items-center justify-center text-xs font-label cursor-pointer transition-all
                  ${CELL_STYLE[lot.status]}
                  ${selectedLot?.id === lot.id ? "ring-2 ring-white/40 scale-105" : "hover:scale-105"}`}
              >
                <span className="font-bold text-[10px]">{lot.id}</span>
                {lot.count > 0 && (
                  <span className="opacity-70 text-[9px]">{lot.count}부재</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 우측 사이드바 */}
        <div className="w-52 shrink-0 space-y-4">
          {/* 범례 */}
          <div className="bg-surface-container border border-outline-variant/10 p-4">
            <FieldHeader title="범례" />
            <div className="space-y-2">
              {LEGEND.map(l => (
                <div key={l.status} className="flex items-center gap-2">
                  <div className={`w-4 h-4 shrink-0 ${l.color}`} />
                  <span className="font-label text-xs text-on-surface/70">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 통계 */}
          <div className="bg-surface-container border border-outline-variant/10 p-4">
            <FieldHeader title="현황" moduleRef="FNC-LOC-096" />
            <div className="space-y-2 text-xs font-label">
              {[
                ["점유율", `${occupancyPct}%`],
                ["FULL", String(fullCount)],
                ["AGING", String(agingCount)],
                ["MAINTENANCE", String(maintCount)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-on-surface/50 uppercase tracking-wider">{k}</span>
                  <span className="font-bold tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 상세 패널 */}
      {selectedLot && (
        <div className="mt-4 bg-surface-container border border-outline-variant/10 border-l-4 border-l-primary-accent p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent">
              선택된 위치 — {selectedLot.id}
            </p>
            <button
              className="text-on-surface/30 hover:text-on-surface text-xs font-label uppercase tracking-widest"
              onClick={() => setSelectedLot(null)}
            >
              닫기
            </button>
          </div>
          {selectedLot.status === "EMPTY" || selectedLot.status === "MAINTENANCE" ? (
            <p className="text-on-surface/40 text-sm font-label">
              {selectedLot.status === "EMPTY" ? "이 위치는 비어있습니다." : "현재 점검 중인 위치입니다."}
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              {[
                ["위치 ID", selectedLot.id],
                ["상태", selectedLot.status],
                ["자재", selectedLot.material ?? "—"],
                ["Lot", selectedLot.lot ?? "—"],
                ["수량", selectedLot.qty ? `${selectedLot.qty.toLocaleString()} kg` : "—"],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface-container-high p-3">
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface/40 mb-1">{k}</p>
                  <p className="font-headline font-bold text-xs">{v}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
