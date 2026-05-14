"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CANDIDATES = [
  { memberId: "B01-1-G22C-C-171", type: "C형", lengthMm: 6000, dueDate: "2026-05-08", stockOk: true,  pkgNo: 1, status: "Pending" },
  { memberId: "B01-1-G22C-C-172", type: "C형", lengthMm: 6000, dueDate: "2026-05-08", stockOk: false, pkgNo: 1, status: "Pending" },
  { memberId: "B01-2-G15A-S-040", type: "S형", lengthMm: 12000, dueDate: "2026-05-09", stockOk: true,  pkgNo: 2, status: "Pending" },
];

const RESULT = {
  wo: [
    { id: "WO-P3000-20260506-0007", kind: "SEMI",  state: "RELEASED" },
    { id: "WO-P3000-20260506-0008", kind: "FINAL", state: "RELEASED" },
  ],
  materialReq: [
    { material: "M-COIL-A", neededM: 812.4, availableM: 900.0, shortM: 0 },
    { material: "M-COIL-B", neededM: 120.0, availableM: 80.0,  shortM: 40 },
  ],
  packing: [{ id: "PKG-WO-P3000-20260506-0007-001", state: "CREATED", memberCount: 12 }],
};

export default function WOReleaseResultPage() {
  const [checked,   setChecked]   = useState<string[]>(["B01-1-G22C-C-171", "B01-1-G22C-C-172"]);
  const [released,  setReleased]  = useState(false);
  const [showForce, setShowForce] = useState(false);

  const shortageRows = CANDIDATES.filter(c => checked.includes(c.memberId) && !c.stockOk);
  const hasShortage  = shortageRows.length > 0;

  function toggleCheck(id: string) {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function handleRelease() {
    if (hasShortage) { setShowForce(true); return; }
    setReleased(true);
  }

  function handleForceRelease() {
    setShowForce(false);
    setReleased(true);
  }

  return (
    <div>
      <PageHeader title="WO 발행 결과" nodeRef="IA-WO-ORDERS-RELEASE" status="PROTOTYPE" />

      <div className="grid grid-cols-2 gap-4">
        {/* 좌측 50% — 부재 묶음 */}
        <div>
          <FieldHeader title="A. 일일 계획 부재 묶음" moduleRef="FNC-WO-002" />
          <div className="flex gap-3 mb-3 flex-wrap">
            <select defaultValue="P3000" className="bg-surface-container-high text-on-surface text-xs px-3 py-1.5 border border-outline-variant/20 font-label">
              <option value="P1100">P1100 — 이천1-1 (보데크)</option>
              <option value="P1200">P1200 — 이천1-2 (알루미늄폼)</option>
              <option value="P2000">P2000 — 이천2 (알루미늄폼)</option>
              <option value="P3000">P3000 — 이천3 (데크)</option>
              <option value="P4000">P4000 — 안성4 (가설재)</option>
            </select>
            <input type="date" defaultValue="2026-05-06"
              className="bg-surface-container-high text-on-surface text-xs px-2 py-1.5 border border-outline-variant/20 font-label" />
            <button className="px-3 py-1.5 bg-surface-container-high text-xs font-label uppercase border border-outline-variant/20">재조회</button>
          </div>

          <div className="bg-surface-container-lowest overflow-x-auto">
            <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent">
              <span className="font-headline font-black text-xs uppercase tracking-widest">부재 목록</span>
              <span className="text-xs opacity-40 ml-2">선택 {checked.length}건 / 부족 {shortageRows.length}건</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline">
                  <th className="px-3 py-2 text-xs font-label opacity-50 uppercase"></th>
                  <th className="px-3 py-2 text-xs font-label opacity-50 uppercase">부재코드</th>
                  <th className="px-3 py-2 text-xs font-label opacity-50 uppercase">타입</th>
                  <th className="px-3 py-2 text-xs font-label opacity-50 uppercase">길이(mm)</th>
                  <th className="px-3 py-2 text-xs font-label opacity-50 uppercase">납기</th>
                  <th className="px-3 py-2 text-xs font-label opacity-50 uppercase">재고</th>
                  <th className="px-3 py-2 text-xs font-label opacity-50 uppercase">Pkg#</th>
                </tr>
              </thead>
              <tbody className="font-headline text-sm">
                {CANDIDATES.map(c => (
                  <tr key={c.memberId}
                    className={`border-b border-outline-variant transition-colors cursor-pointer
                      ${!c.stockOk ? "bg-warning/10" : "hover:bg-surface-container-highest/20"}`}
                    onClick={() => toggleCheck(c.memberId)}
                  >
                    <td className="px-3 py-2">
                      <input type="checkbox" checked={checked.includes(c.memberId)} onChange={() => toggleCheck(c.memberId)} className="accent-primary-accent" />
                    </td>
                    <td className="px-3 py-2 text-xs font-mono">{c.memberId}</td>
                    <td className="px-3 py-2 text-xs">{c.type}</td>
                    <td className="px-3 py-2 text-xs tabular-nums">{c.lengthMm.toLocaleString()}</td>
                    <td className="px-3 py-2 text-xs tabular-nums opacity-70">{c.dueDate}</td>
                    <td className="px-3 py-2">
                      {c.stockOk
                        ? <span className="text-primary-accent text-xs font-label">OK</span>
                        : <span className="text-warning text-xs font-label font-bold">부족 ⚠</span>}
                    </td>
                    <td className="px-3 py-2 text-xs tabular-nums">{c.pkgNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              onClick={handleRelease}
              disabled={checked.length === 0}
              className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest disabled:opacity-30"
            >
              발행 ▶
            </button>
            <button
              onClick={() => setShowForce(true)}
              disabled={!hasShortage}
              className="px-4 py-2 bg-warning/80 text-black text-xs font-label uppercase tracking-widest disabled:opacity-30"
            >
              강제발행
            </button>
            <button className="px-4 py-2 bg-surface-container-high text-on-surface text-xs font-label uppercase border border-outline-variant/20">엑셀</button>
          </div>
        </div>

        {/* 우측 50% — 발행 결과 */}
        <div>
          <FieldHeader title="B. 발행 결과 패널" moduleRef="FNC-WO-001/004" />
          {released ? (
            <>
              <div className="bg-surface-container p-4 mb-4">
                <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">WO 발행 결과</p>
                {RESULT.wo.map(w => (
                  <div key={w.id} className="flex items-center justify-between mb-2 border-b border-outline pb-2">
                    <div>
                      <span className="text-xs opacity-40 font-label mr-2">{w.kind === "SEMI" ? "반제품 WO" : "완제품 WO"}</span>
                      <span className="font-headline font-bold text-sm text-primary-accent">{w.id}</span>
                    </div>
                    <StatusBadge type="running" label={w.state} />
                  </div>
                ))}
              </div>

              <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">자재 소요 (BOM 펼침)</p>
              <div className="bg-surface-container-lowest overflow-x-auto mb-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container border-b border-outline">
                      {["Material", "소요(m)", "재고(m)", "부족(m)"].map(h => (
                        <th key={h} className="px-3 py-2 text-xs font-label opacity-50 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-headline text-sm">
                    {RESULT.materialReq.map(r => (
                      <tr key={r.material}
                        className={`border-b border-outline-variant ${r.shortM > 0 ? "bg-warning/10" : ""}`}>
                        <td className="px-3 py-2 font-mono text-xs">{r.material}</td>
                        <td className="px-3 py-2 tabular-nums text-xs">{r.neededM}</td>
                        <td className="px-3 py-2 tabular-nums text-xs">{r.availableM}</td>
                        <td className="px-3 py-2 tabular-nums text-xs">
                          {r.shortM > 0
                            ? <span className="text-warning font-bold">{r.shortM} ⚠</span>
                            : <span className="opacity-30">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">패킹 객체 (자동 생성)</p>
              {RESULT.packing.map(p => (
                <div key={p.id} className="bg-surface-container p-3 flex justify-between items-center">
                  <span className="font-mono text-xs">{p.id}</span>
                  <StatusBadge type="idle" label={p.state} />
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center h-48 bg-surface-container text-on-surface/30 text-sm font-label">
              부재를 선택 후 [발행 ▶] 을 클릭하세요
            </div>
          )}
        </div>
      </div>

      {/* 강제발행 다이얼로그 */}
      {showForce && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 w-96 max-w-full">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest mb-4 text-warning">강제발행 — 사유 입력</h3>
            <p className="text-xs opacity-60 mb-4">재고 부족 {shortageRows.length}건이 감지되었습니다. 강제발행 시 자재팀에 자동 통보됩니다.</p>
            <select className="w-full bg-surface-container-high text-on-surface text-sm px-3 py-2 border border-outline-variant/20 font-label mb-3">
              <option>MATERIAL_SHORTAGE — 자재 부족</option>
              <option>URGENT_DUE — 납기 긴급</option>
              <option>MASTER_BUSY — 마스터 조정 중</option>
              <option>OTHER — 기타</option>
            </select>
            <textarea placeholder="자유 사유 (선택)" rows={2}
              className="w-full bg-surface-container-high text-on-surface text-sm px-3 py-2 border border-outline-variant/20 font-label mb-4 resize-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForce(false)} className="px-4 py-2 text-xs font-label uppercase border border-outline-variant/20">취소</button>
              <button onClick={handleForceRelease} className="px-4 py-2 bg-warning text-black text-xs font-label uppercase tracking-widest">강제발행 확인</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-surface-container p-3 text-xs opacity-50 font-label">
        ⓘ 강제발행 시 자재팀 자동 통보 + 사유코드 필수 (FNC-WO-003 / PRC-WO-001 §9 E1)
      </div>
    </div>
  );
}
