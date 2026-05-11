"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

type LocStatus = "ACTIVE" | "FULL" | "MAINTENANCE" | "RETIRED";

interface LotNode {
  id: string;
  status: LocStatus;
  capacity: number;
  currentLoad: number;
  loadPct: number;
}

interface ZoneNode { id: string; label: string; children: LotNode[] }
interface YardNode { id: string; label: string; children: ZoneNode[] }
interface PlantNode { id: string; label: string; children: YardNode[] }

const TREE: PlantNode[] = [
  {
    id: "P3000", label: "P3000 제3공장",
    children: [
      {
        id: "YRD-A", label: "YRD-A 원자재 야적장",
        children: [
          {
            id: "ZN-01", label: "ZN-01 북측 A 구역",
            children: [
              { id: "LOT-001", status: "ACTIVE",      capacity: 5000, currentLoad: 0,    loadPct: 0   },
              { id: "LOT-002", status: "ACTIVE",      capacity: 5000, currentLoad: 3000, loadPct: 60  },
              { id: "LOT-003", status: "FULL",        capacity: 5000, currentLoad: 5000, loadPct: 100 },
            ],
          },
          {
            id: "ZN-02", label: "ZN-02 남측 B 구역",
            children: [
              { id: "LOT-004", status: "MAINTENANCE", capacity: 5000, currentLoad: 0,    loadPct: 0   },
            ],
          },
        ],
      },
      {
        id: "YRD-B", label: "YRD-B 입고 대기",
        children: [
          {
            id: "ZN-03", label: "ZN-03 입고 구역",
            children: [
              { id: "LOT-005", status: "ACTIVE", capacity: 3000, currentLoad: 1200, loadPct: 40 },
            ],
          },
        ],
      },
    ],
  },
];

const statusColor: Record<LocStatus, string> = {
  ACTIVE:      "bg-primary-accent/20 text-primary-accent",
  FULL:        "bg-[#f59e0b]/20 text-[#f59e0b]",
  MAINTENANCE: "bg-[#ef4444]/20 text-[#ef4444]",
  RETIRED:     "bg-surface-container-highest text-on-surface/40",
};

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={`inline-block transition-transform text-on-surface/30 mr-1 ${open ? "rotate-90" : ""}`}>▶</span>
  );
}

export default function LOCMasterPage() {
  const [openPlants, setOpenPlants] = useState<Set<string>>(new Set(["P3000"]));
  const [openYards,  setOpenYards]  = useState<Set<string>>(new Set(["YRD-A"]));
  const [openZones,  setOpenZones]  = useState<Set<string>>(new Set(["ZN-01"]));
  const [selected, setSelected] = useState<LotNode | null>(null);
  const [editing, setEditing] = useState(false);
  const [editCap, setEditCap] = useState(0);

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  };

  const selectLot = (lot: LotNode) => {
    setSelected(lot);
    setEditing(false);
    setEditCap(lot.capacity);
  };

  return (
    <div>
      <PageHeader
        title="위치 마스터"
        nodeRef="SCR-LOC-001~005"
        status="PROTOTYPE"
        description="Plant → Yard → Zone → Lot 4단계 위치 계층 관리. 클릭으로 상세 조회·상태 변경."
      />

      <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        {/* 좌측 트리 */}
        <div className="w-72 shrink-0 bg-surface-container border border-outline-variant/10 overflow-y-auto">
          <div className="p-3 border-b border-outline-variant/10">
            <FieldHeader title="위치 트리" moduleRef="4단계" />
          </div>
          <div className="p-2 text-sm font-label">
            {TREE.map(plant => (
              <div key={plant.id}>
                <button
                  className="flex items-center w-full px-2 py-1 hover:bg-surface-container-high text-left font-bold text-on-surface/90"
                  onClick={() => toggle(openPlants, plant.id, setOpenPlants)}
                >
                  <Chevron open={openPlants.has(plant.id)} />
                  {plant.label}
                </button>
                {openPlants.has(plant.id) && plant.children.map(yard => (
                  <div key={yard.id} className="ml-4">
                    <button
                      className="flex items-center w-full px-2 py-1 hover:bg-surface-container-high text-left text-on-surface/70"
                      onClick={() => toggle(openYards, yard.id, setOpenYards)}
                    >
                      <Chevron open={openYards.has(yard.id)} />
                      {yard.label}
                    </button>
                    {openYards.has(yard.id) && yard.children.map(zone => (
                      <div key={zone.id} className="ml-4">
                        <button
                          className="flex items-center w-full px-2 py-1 hover:bg-surface-container-high text-left text-on-surface/60"
                          onClick={() => toggle(openZones, zone.id, setOpenZones)}
                        >
                          <Chevron open={openZones.has(zone.id)} />
                          {zone.label}
                        </button>
                        {openZones.has(zone.id) && zone.children.map(lot => (
                          <button
                            key={lot.id}
                            className={`flex items-center justify-between w-full px-3 py-1 ml-4 text-xs hover:bg-surface-container-high text-left ${selected?.id === lot.id ? "bg-primary-accent/10 border-l-2 border-primary-accent" : ""}`}
                            onClick={() => selectLot(lot)}
                          >
                            <span className="text-on-surface/80">{lot.id}</span>
                            <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase ${statusColor[lot.status]}`}>
                              {lot.status}
                            </span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 우측 상세 */}
        <div className="flex-1 bg-surface-container border border-outline-variant/10 overflow-y-auto p-6">
          {!selected ? (
            <div className="flex items-center justify-center h-full text-on-surface/30 text-sm font-label uppercase tracking-widest">
              좌측 트리에서 Lot 위치를 선택하세요
            </div>
          ) : (
            <div className="space-y-6">
              <FieldHeader title={`위치 상세 — ${selected.id}`} moduleRef="SCR-LOC-005" />

              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ["위치 ID", selected.id],
                  ["상태", selected.status],
                  ["Capacity", `${selected.capacity.toLocaleString()} kg`],
                  ["현재 적재", `${selected.currentLoad.toLocaleString()} kg`],
                  ["점유율", `${selected.loadPct}%`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-surface-container-high p-3">
                    <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mb-1">{k}</p>
                    <p className={`font-headline font-bold ${k === "상태" ? statusColor[v as LocStatus] : ""}`}>{v}</p>
                  </div>
                ))}
                <div className="bg-surface-container-high p-3">
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mb-1">적재 바</p>
                  <div className="w-full h-2 bg-surface-container-highest mt-1">
                    <div
                      className={`h-full ${selected.loadPct >= 100 ? "bg-[#f59e0b]" : "bg-primary-accent"}`}
                      style={{ width: `${selected.loadPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Capacity 편집 */}
              {editing ? (
                <div className="bg-surface-container-high p-4 space-y-3">
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface/40">Capacity 수정</p>
                  <input
                    type="number"
                    value={editCap}
                    onChange={e => setEditCap(Number(e.target.value))}
                    className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface w-full focus:outline-none focus:border-primary-accent"
                  />
                  <div className="flex gap-2">
                    <button className="bg-primary-accent text-on-primary px-4 py-2 text-xs font-label uppercase tracking-widest font-bold hover:bg-primary" onClick={() => setEditing(false)}>
                      저장
                    </button>
                    <button className="bg-surface-container border border-outline-variant/20 px-4 py-2 text-xs font-label uppercase tracking-widest hover:bg-surface-container-high" onClick={() => setEditing(false)}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  <button
                    className="bg-surface-container-high border border-outline-variant/20 px-4 py-2 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/10 hover:border-primary-accent/40"
                    onClick={() => setEditing(true)}
                  >
                    Capacity 수정
                  </button>
                  <button className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-4 py-2 text-xs font-label uppercase tracking-widest text-[#f59e0b] hover:bg-[#f59e0b]/20">
                    MAINTENANCE 등록
                  </button>
                  <button className="bg-[#ef4444]/10 border border-[#ef4444]/30 px-4 py-2 text-xs font-label uppercase tracking-widest text-[#ef4444] hover:bg-[#ef4444]/20">
                    폐기 결재
                  </button>
                </div>
              )}

              {/* 적재 이력 */}
              <div>
                <FieldHeader title="적재 이력" moduleRef="FNC-LOC-017" />
                <table className="w-full text-xs font-label border-collapse">
                  <thead>
                    <tr className="bg-surface-container-highest/30 text-on-surface/40 uppercase tracking-widest">
                      {["일시", "TX 유형", "수량(kg)", "Lot", "적재 후"].map(h => (
                        <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-headline text-sm">
                    {[
                      { ts: "2026-05-04 14:22", tx: "RECEIVE", qty: "+2,000", lot: "RCV-20260504-0017", after: "5,000" },
                      { ts: "2026-05-03 10:11", tx: "RECEIVE", qty: "+3,000", lot: "RCV-20260503-0011", after: "3,000" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                        <td className="px-3 py-2 tabular-nums text-on-surface/60">{r.ts}</td>
                        <td className="px-3 py-2"><span className="bg-primary-accent/20 text-primary-accent px-2 py-0.5 text-xs font-bold uppercase">{r.tx}</span></td>
                        <td className="px-3 py-2 tabular-nums text-primary-accent">{r.qty}</td>
                        <td className="px-3 py-2 text-on-surface/70">{r.lot}</td>
                        <td className="px-3 py-2 tabular-nums">{r.after} kg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
