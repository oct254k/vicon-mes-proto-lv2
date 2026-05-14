"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type RiskStatus = "OPEN" | "INVESTIGATING" | "CLOSED";

interface ImpactNode {
  part: string;
  desc: string;
  lots: {
    lotId: string;
    wos: { woId: string; shipments: string[] }[];
  }[];
}

const MOCK_IMPACT: ImpactNode[] = [
  {
    part: "BM-2026-0441",
    desc: "주형재 강판 9T",
    lots: [
      {
        lotId: "LOT-2026-0441-A",
        wos: [
          { woId: "WO-P3000-20260501-0003", shipments: ["SHP-2026-0118", "SHP-2026-0119"] },
          { woId: "WO-P3000-20260502-0005", shipments: ["SHP-2026-0122"] },
        ],
      },
      {
        lotId: "LOT-2026-0441-B",
        wos: [
          { woId: "WO-P2000-20260503-0002", shipments: [] },
        ],
      },
    ],
  },
  {
    part: "BM-2026-0442",
    desc: "보조재 플랜지 12T",
    lots: [
      {
        lotId: "LOT-2026-0442-A",
        wos: [
          { woId: "WO-P3000-20260504-0001", shipments: ["SHP-2026-0125"] },
        ],
      },
    ],
  },
];

function statusStyle(s: RiskStatus): { type: "running" | "warning" | "idle"; label: string } {
  if (s === "OPEN") return { type: "warning", label: "OPEN" };
  if (s === "INVESTIGATING") return { type: "running", label: "INVESTIGATING" };
  return { type: "idle", label: "CLOSED" };
}

export default function QCRiskPage() {
  const [lotSearch, setLotSearch] = useState("");
  const [partSearch, setPartSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [status, setStatus] = useState<RiskStatus>("OPEN");
  const [expandedLots, setExpandedLots] = useState<Record<string, boolean>>({});

  function toggleLot(id: string) {
    setExpandedLots(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const badge = statusStyle(status);

  const totalWos = MOCK_IMPACT.reduce((a, p) => a + p.lots.reduce((b, l) => b + l.wos.length, 0), 0);
  const totalShipments = MOCK_IMPACT.reduce((a, p) => a + p.lots.reduce((b, l) => b + l.wos.reduce((c, w) => c + w.shipments.length, 0), 0), 0);

  return (
    <div>
      <PageHeader
        title="위험 확산 평가"
       
        nodeRef="IA-QC-RISK-SPREAD"
        status="PROTOTYPE"
        description="불량 부재·LOT의 영향 범위를 추적하고 확산 위험을 평가합니다."
      />

      {/* 검색 바 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">LOT ID</label>
          <input
            type="text"
            value={lotSearch}
            onChange={e => setLotSearch(e.target.value)}
            placeholder="LOT-2026-XXXX"
            className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-48"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">부재 코드</label>
          <input
            type="text"
            value={partSearch}
            onChange={e => setPartSearch(e.target.value)}
            placeholder="BM-2026-XXXX"
            className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-48"
          />
        </div>
        <button
          onClick={() => setSearched(true)}
          className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest self-end"
        >
          영향 범위 검색
        </button>
        <button
          onClick={() => { setSearched(false); setLotSearch(""); setPartSearch(""); }}
          className="px-4 py-1.5 bg-surface-container-high text-on-surface text-xs font-label uppercase tracking-widest self-end border border-outline-variant/20"
        >
          초기화
        </button>
      </div>

      {/* 결과: 영향 범위 트리 */}
      {(searched || true) && (
        <>
          {/* 요약 KPI */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "영향 부재", value: MOCK_IMPACT.length },
              { label: "영향 LOT", value: MOCK_IMPACT.reduce((a, p) => a + p.lots.length, 0) },
              { label: "연관 WO", value: totalWos },
              { label: "연관 출하", value: totalShipments },
            ].map(k => (
              <div key={k.label} className="bg-surface-container-low p-4 border-l-2 border-primary-accent">
                <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.label}</p>
                <p className="font-headline font-black text-2xl text-primary-accent tabular-nums">{k.value}</p>
              </div>
            ))}
          </div>

          <FieldHeader title="영향 범위 트리" moduleRef="부재 → LOT → WO → 출하" />

          <div className="bg-surface-container-lowest p-4">
            {MOCK_IMPACT.map(part => (
              <div key={part.part} className="mb-4">
                {/* 부재 레벨 */}
                <div className="flex items-center gap-3 py-2 border-b border-outline">
                  <span className="material-symbols-outlined text-primary-accent text-sm">inventory_2</span>
                  <span className="font-bold text-sm text-primary-accent">{part.part}</span>
                  <span className="text-xs text-on-surface/60">{part.desc}</span>
                </div>
                {/* LOT 레벨 */}
                <ul className="pl-4 border-l border-outline-variant/20 mt-1">
                  {part.lots.map(lot => (
                    <li key={lot.lotId} className="mb-2">
                      <button
                        onClick={() => toggleLot(lot.lotId)}
                        className="flex items-center gap-2 py-1 text-sm font-label hover:text-primary-accent transition-colors"
                      >
                        <span className="text-xs opacity-50">{expandedLots[lot.lotId] ? "▾" : "▸"}</span>
                        <span className="text-on-surface/80">{lot.lotId}</span>
                        <span className="text-xs opacity-50">WO {lot.wos.length}건</span>
                      </button>
                      {expandedLots[lot.lotId] && (
                        <ul className="pl-4 border-l border-outline-variant/20 mt-1">
                          {lot.wos.map(wo => (
                            <li key={wo.woId} className="mb-1">
                              <div className="flex items-center gap-2 py-0.5">
                                <span className="text-xs opacity-40">WO</span>
                                <span className="text-xs font-label text-on-surface/70">{wo.woId}</span>
                              </div>
                              {wo.shipments.length > 0 && (
                                <ul className="pl-4 border-l border-outline-variant/20">
                                  {wo.shipments.map(s => (
                                    <li key={s} className="py-0.5 flex items-center gap-2">
                                      <span className="text-xs opacity-40">출하</span>
                                      <span className="text-xs text-warning font-label">{s}</span>
                                      <StatusBadge type="warning" label="확산 위험" />
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {wo.shipments.length === 0 && (
                                <p className="pl-4 text-xs opacity-40 py-0.5">출하 연계 없음</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 평가 상태 저장 */}
          <div className="mt-6 bg-surface-container border-l-4 border-primary-accent p-4 flex flex-wrap gap-4 items-center">
            <p className="text-xs font-label uppercase tracking-widest opacity-50">평가 상태</p>
            <div className="flex gap-4">
              {(["OPEN", "INVESTIGATING", "CLOSED"] as RiskStatus[]).map(s => (
                <label key={s} className="flex items-center gap-2 text-sm font-label cursor-pointer">
                  <input type="radio" name="riskStatus" value={s} checked={status === s} onChange={() => setStatus(s)} className="accent-primary-accent" />
                  {s}
                </label>
              ))}
            </div>
            <StatusBadge type={badge.type} label={badge.label} />
            <button className="ml-auto px-6 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">평가 저장</button>
          </div>
        </>
      )}
    </div>
  );
}
