"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK_WOS = [
  { id: "WO-P3000-20260506-0007", kind: "반제품", plant: "P3000", state: "IN_PROGRESS", priority: "#3", lineCount: 12, releasedAt: "2026-05-06",
    lines: [
      { memberCode: "B01-1-G22C-C-171", type: "C형", len: "6,000mm", material: "M-COIL-A", progress: "신선공정 완료", state: "IN_PROGRESS" },
      { memberCode: "B01-1-G22C-C-172", type: "C형", len: "6,000mm", material: "M-COIL-B", progress: "대기",          state: "PENDING" },
      { memberCode: "B01-2-G15A-S-040", type: "S형", len: "12,000mm", material: "M-COIL-A", progress: "미착수",       state: "PENDING" },
    ],
    routing: "신선→TG→포밍→DP 4공정", wo: "WO-P3000-20260506-0007", packing: "PKG-WO-P3000-20260506-0007-001",
  },
  { id: "WO-P3000-20260506-0008", kind: "완제품", plant: "P3000", state: "RELEASED", priority: "#4", lineCount: 12, releasedAt: "2026-05-06",
    lines: [
      { memberCode: "B02-1-G22C-S-081", type: "S형", len: "9,000mm", material: "M-COIL-A", progress: "대기", state: "PENDING" },
    ],
    routing: "포밍→DP 2공정", wo: "WO-P3000-20260506-0008", packing: "PKG-WO-P3000-20260506-0008-001",
  },
  { id: "WO-P3000-20260505-0002", kind: "반제품", plant: "P3000", state: "COMPLETED", priority: "#1", lineCount: 8, releasedAt: "2026-05-05",
    lines: [
      { memberCode: "B01-1-G22C-C-100", type: "C형", len: "6,000mm", material: "M-COIL-A", progress: "전공정 완료", state: "COMPLETED" },
    ],
    routing: "신선→TG→포밍→DP 4공정", wo: "WO-P3000-20260505-0002", packing: "PKG-WO-P3000-20260505-0002-001",
  },
  { id: "WO-P3000-20260504-0001", kind: "완제품", plant: "P3000", state: "CANCELLED", priority: "#5", lineCount: 10, releasedAt: "2026-05-04",
    lines: [],
    routing: "포밍→DP 2공정", wo: "WO-P3000-20260504-0001", packing: "-",
  },
  { id: "WO-P2000-20260506-0003", kind: "완제품", plant: "P2000", state: "RELEASED", priority: "#2", lineCount: 6, releasedAt: "2026-05-06",
    lines: [],
    routing: "신선→포밍 2공정", wo: "WO-P2000-20260506-0003", packing: "-",
  },
];

type WoState = "RELEASED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
type WO = typeof MOCK_WOS[0];

function stateLabel(state: string): { type: "running" | "warning" | "idle" | "stopped"; label: string } {
  if (state === "RELEASED")    return { type: "running", label: "발행됨" };
  if (state === "IN_PROGRESS") return { type: "warning", label: "진행중" };
  if (state === "COMPLETED")   return { type: "idle",    label: "완료" };
  return { type: "stopped", label: "취소" };
}

const STATE_OPTIONS: WoState[] = ["RELEASED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
const STATE_LABELS: Record<WoState, string> = {
  RELEASED:    "발행됨",
  IN_PROGRESS: "진행중",
  COMPLETED:   "완료",
  CANCELLED:   "취소",
};

function WODetail({ wo, onClose }: { wo: WO; onClose: () => void }) {
  const s = stateLabel(wo.state);
  return (
    <div className="mt-4 border border-outline-variant/20 bg-surface-container-lowest">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 bg-surface-container border-b border-outline border-l-4 border-primary-accent">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-0.5">WO 상세</p>
          <p className="font-headline font-black text-base">{wo.id}</p>
        </div>
        <button onClick={onClose} className="font-label text-xs uppercase tracking-widest opacity-40 hover:opacity-80 px-3 py-1 border border-outline-variant/20 hover:border-outline/50 transition-colors">
          닫기 ✕
        </button>
      </div>

      <div className="p-5 grid grid-cols-2 gap-6">
        {/* 좌: 기본 정보 */}
        <div className="space-y-4">
          <FieldHeader title="기본 정보" />
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {[
              ["유형", wo.kind],
              ["Plant", wo.plant],
              ["상태", ""],
              ["우선순위", wo.priority],
              ["부재 수", `${wo.lineCount}건`],
              ["발행일", wo.releasedAt],
              ["Routing", wo.routing],
              ["패킹 객체", wo.packing],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-label text-[10px] uppercase tracking-widest opacity-40 mb-0.5">{k}</dt>
                <dd className="font-headline text-xs">
                  {k === "상태" ? <StatusBadge type={s.type} label={s.label} /> : v}
                </dd>
              </div>
            ))}
          </dl>

          {/* 액션 버튼 */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a href="/wo/documents" className="px-3 py-1.5 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest border border-outline-variant/20 hover:border-primary-accent transition-colors">
              PDF 문서 ▶
            </a>
            {wo.state !== "CANCELLED" && wo.state !== "COMPLETED" && (
              <button className="px-3 py-1.5 text-xs font-label uppercase tracking-widest border border-danger/30 text-danger hover:border-danger transition-colors">
                WO 취소
              </button>
            )}
            <a href="/wo/orders/release" className="px-3 py-1.5 text-xs font-label uppercase tracking-widest border border-outline-variant/20 hover:border-outline/50 transition-colors">
              재발행
            </a>
          </div>
        </div>

        {/* 우: 부재 라인 */}
        <div>
          <FieldHeader title={`부재 라인 (${wo.lines.length}/${wo.lineCount}건 표시)`} />
          {wo.lines.length === 0 ? (
            <p className="text-xs font-label opacity-30 mt-2">라인 데이터 없음</p>
          ) : (
            <table className="w-full text-xs mt-2 border-collapse">
              <thead>
                <tr className="border-b border-outline">
                  {["부재코드", "타입", "길이", "자재", "진행"].map(h => (
                    <th key={h} className="px-2 py-1.5 font-label uppercase tracking-widest text-[10px] opacity-40 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wo.lines.map((l, i) => (
                  <tr key={i} className="border-b border-outline-variant hover:bg-surface-container/50">
                    <td className="px-2 py-2 text-primary-accent font-bold font-headline">{l.memberCode}</td>
                    <td className="px-2 py-2 font-label">{l.type}</td>
                    <td className="px-2 py-2 tabular-nums font-label">{l.len}</td>
                    <td className="px-2 py-2 font-label opacity-70">{l.material}</td>
                    <td className="px-2 py-2">
                      <span className={`font-label text-[10px] uppercase tracking-wider px-1.5 py-0.5 ${
                        l.state === "COMPLETED"  ? "bg-primary-accent/20 text-primary-accent" :
                        l.state === "IN_PROGRESS"? "bg-warning/20 text-warning" :
                        "opacity-30"
                      }`}>{l.progress}</span>
                    </td>
                  </tr>
                ))}
                {wo.lineCount > wo.lines.length && (
                  <tr><td colSpan={5} className="px-2 py-1.5 text-[10px] font-label opacity-30">… +{wo.lineCount - wo.lines.length}건 더</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WOOrdersPage() {
  const [plant, setPlant]   = useState("ALL");
  const [states, setStates] = useState<WoState[]>(["RELEASED", "IN_PROGRESS"]);
  const [dateFrom, setDateFrom] = useState("2026-05-01");
  const [dateTo, setDateTo]     = useState("2026-05-06");
  const [selected, setSelected] = useState<WO | null>(null);

  function toggleState(s: WoState) {
    setStates(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  const filtered = MOCK_WOS.filter(w => {
    if (plant !== "ALL" && w.plant !== plant) return false;
    if (states.length > 0 && !states.includes(w.state as WoState)) return false;
    if (w.releasedAt < dateFrom || w.releasedAt > dateTo) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="작업지시 목록" nodeRef="IA-WO-ORDERS-LIST" status="PROTOTYPE"
        description="WO 목록 조회·필터. 행 클릭 시 부재 라인·상태·액션 상세 표시." />

      {/* 필터 바 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">Plant</label>
          <select value={plant} onChange={e => setPlant(e.target.value)}
            className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label">
            <option value="ALL">전체</option>
            {["P1000","P2000","P3000"].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">상태</label>
          <div className="flex gap-2">
            {STATE_OPTIONS.map(s => (
              <label key={s} className="flex items-center gap-1 text-xs font-label cursor-pointer">
                <input type="checkbox" checked={states.includes(s)} onChange={() => toggleState(s)} className="accent-primary-accent" />
                {STATE_LABELS[s]}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">발행일</label>
          <div className="flex gap-2 items-center">
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              className="bg-surface-container-high text-on-surface text-xs px-2 py-1.5 border border-outline-variant/20 font-label" />
            <span className="text-xs opacity-40">~</span>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              className="bg-surface-container-high text-on-surface text-xs px-2 py-1.5 border border-outline-variant/20 font-label" />
          </div>
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest self-end">검색</button>
        <button onClick={() => { setPlant("ALL"); setStates(["RELEASED","IN_PROGRESS"]); }}
          className="px-4 py-1.5 bg-surface-container-high text-on-surface text-xs font-label uppercase tracking-widest self-end border border-outline-variant/20">초기화</button>
      </div>

      <FieldHeader title="WO 목록" moduleRef={`${filtered.length}건`} />

      <div className="flex gap-3 mb-4 flex-wrap">
        {STATE_OPTIONS.map(s => { const b = stateLabel(s); return <StatusBadge key={s} type={b.type} label={b.label} />; })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-surface-container-lowest">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["WO ID","유형","Plant","상태","우선순위","부재 수","발행일"].map(c => (
                <th key={c} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {filtered.map(row => {
              const s = stateLabel(row.state);
              const isSelected = selected?.id === row.id;
              return (
                <tr key={row.id}
                  onClick={() => setSelected(isSelected ? null : row)}
                  className={`border-b border-outline-variant cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary-accent/10 border-l-2 border-primary-accent"
                      : "hover:bg-surface-container-highest/20"
                  }`}>
                  <td className="px-4 py-2.5 text-primary-accent font-bold">{row.id}</td>
                  <td className="px-4 py-2.5">{row.kind}</td>
                  <td className="px-4 py-2.5">{row.plant}</td>
                  <td className="px-4 py-2.5"><StatusBadge type={s.type} label={s.label} /></td>
                  <td className="px-4 py-2.5">{row.priority}</td>
                  <td className="px-4 py-2.5 tabular-nums">{row.lineCount}</td>
                  <td className="px-4 py-2.5 tabular-nums opacity-70">{row.releasedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-30 font-label mt-2 text-right">합계 {filtered.length}건 · 행 클릭 시 상세 표시</p>

      {selected && <WODetail wo={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
