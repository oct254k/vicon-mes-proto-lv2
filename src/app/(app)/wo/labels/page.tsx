"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK_LABELS = [
  { id: "LBL-2026-05-06-0001", type: "부재",      targetId: "B01-1-G22C-C-171",           issuedAt: "2026-05-06 16:45", state: "PRINTED" },
  { id: "LBL-2026-05-06-0002", type: "부재",      targetId: "B01-1-G22C-C-172",           issuedAt: "2026-05-06 16:46", state: "QUEUED"  },
  { id: "LBL-2026-05-06-0003", type: "패킹",      targetId: "PKG-WO-P3000-20260506-0007-001", issuedAt: "2026-05-06 17:02", state: "PRINTED" },
  { id: "LBL-2026-05-06-0004", type: "패킹",      targetId: "PKG-WO-P3000-20260506-0008-001", issuedAt: "2026-05-06 17:05", state: "FAILED"  },
  { id: "LBL-2026-05-06-0005", type: "슬리퍼",    targetId: "PKG-WO-P3000-20260505-0001-001", issuedAt: "2026-05-05 17:20", state: "PRINTED" },
  { id: "LBL-2026-05-06-0006", type: "패킹",      targetId: "PKG-WO-P3000-20260504-0001-001", issuedAt: "2026-05-04 16:00", state: "QUEUED"  },
];

type LabelState = "PRINTED" | "QUEUED" | "FAILED";

const STATE_LABELS: Record<LabelState, string> = {
  PRINTED: "인쇄됨",
  QUEUED:  "대기 중",
  FAILED:  "실패",
};

function labelStateBadge(state: LabelState): { type: "running" | "warning" | "idle" | "stopped"; label: string } {
  if (state === "PRINTED") return { type: "running", label: "인쇄됨" };
  if (state === "QUEUED")  return { type: "warning", label: "대기 중" };
  return { type: "stopped", label: "실패" };
}

export default function WOLabelsPage() {
  const [reprintTarget, setReprintTarget] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const selected = MOCK_LABELS.find(r => r.id === selectedLabel);

  return (
    <div>
      <PageHeader title="라벨 발행·재인쇄" nodeRef="IA-WO-LABELS" status="PROTOTYPE" />

      {/* 필터 영역 */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">라벨 유형</label>
          <select className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label">
            <option>전체</option>
            <option>부재</option>
            <option>패킹</option>
            <option>슬리퍼</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">상태</label>
          <div className="flex gap-2">
            {(["PRINTED", "QUEUED", "FAILED"] as LabelState[]).map(s => (
              <label key={s} className="flex items-center gap-1 text-xs font-label cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-primary-accent" />
                {STATE_LABELS[s]}
              </label>
            ))}
          </div>
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest self-end">검색</button>
        <button className="px-4 py-1.5 bg-surface-container-high text-xs font-label uppercase border border-outline-variant/20 self-end">엑셀</button>
      </div>

      {/* 테이블 + 미리보기 flex 레이아웃 */}
      <div className="flex gap-6 items-start">

        {/* 왼쪽: 테이블 */}
        <div className="flex-1 min-w-0">
          <FieldHeader title="라벨 발행 이력" moduleRef={`${MOCK_LABELS.length}건`} />

          <div className="bg-surface-container-lowest overflow-x-auto">
            <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
              <span className="font-headline font-black text-xs uppercase tracking-widest">Labels</span>
              <span className="text-xs opacity-30 font-label">FNC-WO-010/012/015/017</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline">
                  {["라벨 유형", "발행 대상 ID", "발행일시", "상태", "재인쇄"].map(h => (
                    <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-headline text-sm">
                {MOCK_LABELS.map(row => {
                  const badge = labelStateBadge(row.state as LabelState);
                  const isSelected = selectedLabel === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedLabel(row.id)}
                      className={`border-b border-outline-variant cursor-pointer transition-colors
                        ${isSelected
                          ? "bg-primary-accent/10 border-l-2 border-l-primary-accent"
                          : "hover:bg-surface-container-highest/20"
                        }`}
                    >
                      <td className="px-4 py-2">
                        <span className={`text-xs font-label uppercase font-bold px-2 py-0.5
                          ${row.type === "부재" ? "bg-primary-accent/10 text-primary-accent" :
                            row.type === "패킹" ? "bg-tertiary/10 text-tertiary" :
                            "bg-warning/10 text-warning"}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-mono text-xs">{row.targetId}</td>
                      <td className="px-4 py-2 tabular-nums text-xs opacity-70">{row.issuedAt}</td>
                      <td className="px-4 py-2"><StatusBadge type={badge.type} label={badge.label} /></td>
                      <td className="px-4 py-2">
                        <button
                          onClick={e => { e.stopPropagation(); setReprintTarget(row.id); }}
                          className="px-3 py-1 text-xs font-label uppercase border border-outline-variant/20 hover:bg-surface-container-high transition-colors"
                        >
                          재인쇄
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs opacity-30 font-label mt-3">FNC-WO-015 분실·오염 재인쇄 / FNC-WO-011 지수 백오프 자동 재발행 / PRC-WO-002 §13.7</p>
        </div>

        {/* 오른쪽: 라벨 미리보기 */}
        <section className="w-80 shrink-0 sticky top-20">
          <FieldHeader title="라벨 미리보기" moduleRef="PREVIEW" />

          {!selected ? (
            <div className="bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center h-64">
              <span className="text-xs opacity-30 font-label">라벨을 선택하세요</span>
            </div>
          ) : (
            <>
              {/* 실물 라벨 카드 */}
              <div className="bg-white text-[#111] p-5 border-2 border-[#333]">
                {/* 헤더 */}
                <div className="border-b-2 border-[#111] pb-3 mb-3 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#666]">VICON MES</div>
                    <div className="text-base font-black font-headline mt-0.5">{selected.type} 라벨</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#666] uppercase font-bold">발행일시</div>
                    <div className="text-xs font-bold tabular-nums">{selected.issuedAt}</div>
                  </div>
                </div>

                {/* 바코드 영역 */}
                <div className="bg-[#f5f5f5] p-3 mb-3 text-center">
                  <div className="flex justify-center gap-[2px] mb-1">
                    {Array.from({ length: 35 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-[#111]"
                        style={{
                          width: i % 3 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                          height: "40px",
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono font-bold tabular-nums">{selected.id}</div>
                </div>

                {/* 상세 정보 */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#eee] pb-1">
                    <span className="text-[#888] uppercase font-bold text-[10px]">발행 대상</span>
                    <span className="font-mono font-bold text-[11px]">{selected.targetId}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#eee] pb-1">
                    <span className="text-[#888] uppercase font-bold text-[10px]">유형</span>
                    <span className="font-bold">{selected.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#eee] pb-1">
                    <span className="text-[#888] uppercase font-bold text-[10px]">상태</span>
                    <StatusBadge
                      type={labelStateBadge(selected.state as LabelState).type}
                      label={labelStateBadge(selected.state as LabelState).label}
                    />
                  </div>
                </div>
              </div>

              {/* 재인쇄 버튼 */}
              <button
                onClick={() => setReprintTarget(selected.id)}
                className="w-full mt-4 px-6 py-3 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">print</span>
                라벨 재인쇄
              </button>
            </>
          )}
        </section>
      </div>

      {/* 재인쇄 확인 모달 */}
      {reprintTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 w-96 max-w-full">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest mb-3">라벨 재인쇄</h3>
            <p className="text-xs opacity-60 mb-3">원본: <span className="font-mono">{reprintTarget}</span></p>
            <select className="w-full bg-surface-container-high text-on-surface text-sm px-3 py-2 border border-outline-variant/20 font-label mb-3">
              <option>분실 (LOST)</option>
              <option>오염 (STAINED)</option>
              <option>잘못 인쇄 (MISPRINT)</option>
              <option>기타 (OTHER)</option>
            </select>
            <textarea placeholder="자유 사유 (OTHER 시 필수)" rows={2}
              className="w-full bg-surface-container-high text-on-surface text-sm px-3 py-2 border border-outline-variant/20 font-label mb-4 resize-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setReprintTarget(null)} className="px-4 py-2 text-xs font-label uppercase border border-outline-variant/20">취소</button>
              <button onClick={() => setReprintTarget(null)} className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">재인쇄 ▶</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
