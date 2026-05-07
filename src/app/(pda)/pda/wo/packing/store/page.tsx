"use client";

import { useState } from "react";

// 목데이터 (SCR-WO-023 §5.5)
const MOCK_PACKINGS: Record<string, { state: string; memberCount: number; woId: string }> = {
  "PKG-WO-P3000-20260506-0007-001": { state: "COMPLETED", memberCount: 12, woId: "WO-P3000-20260506-0007" },
  "PKG-WO-P3000-20260506-0007-002": { state: "COMPLETED", memberCount:  8, woId: "WO-P3000-20260506-0007" },
  "PKG-WO-P3000-20260506-0008-001": { state: "IN_PRODUCTION", memberCount: 5, woId: "WO-P3000-20260506-0008" },
};

const MOCK_YARDS: Record<string, { name: string; occupied: boolean; capacityM2: number }> = {
  "A-2-3": { name: "제3공장 동측 A-2-3", occupied: false, capacityM2: 50 },
  "A-2-4": { name: "제3공장 동측 A-2-4", occupied: false, capacityM2: 50 },
  "A-2-1": { name: "제3공장 동측 A-2-1", occupied: true,  capacityM2: 50 },
  "B-1-1": { name: "제3공장 서측 B-1-1", occupied: false, capacityM2: 80 },
};

type RecentEntry = { packingId: string; yardLocationId: string; ts: string };

const INITIAL_RECENT: RecentEntry[] = [
  { packingId: "PKG-WO-P3000-20260506-0001-001", yardLocationId: "A-2-1", ts: "10:21" },
  { packingId: "PKG-WO-P3000-20260506-0001-002", yardLocationId: "A-2-2", ts: "10:23" },
];

export default function PdaYardStorePage() {
  const [packingId, setPackingId] = useState("");
  const [yardId, setYardId]       = useState("");
  const [toast, setToast]         = useState<{ type: "success" | "error" | "warning"; msg: string } | null>(null);
  const [recent, setRecent]       = useState<RecentEntry[]>(INITIAL_RECENT);
  const [done, setDone]           = useState(false);

  const packing  = MOCK_PACKINGS[packingId];
  const yard     = MOCK_YARDS[yardId];
  const packingOk = !!packing && packing.state === "COMPLETED";
  const yardOk    = !!yard && !yard.occupied;
  const canSubmit = packingOk && yardOk;

  function showToast(type: "success" | "error" | "warning", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  }

  function handlePackingScan(value: string) {
    const trimmed = value.trim();
    setPackingId(trimmed);
    setDone(false);
    const p = MOCK_PACKINGS[trimmed];
    if (!p) return;
    if (p.state !== "COMPLETED") {
      showToast("error", "동일 그룹 전 부재 COMPLETED 후 STORED 가능.");
    }
  }

  function handleYardScan(value: string) {
    const trimmed = value.trim();
    // 팔레트 패턴 차단
    if (/^PLT-/i.test(trimmed)) {
      showToast("error", "팔레트는 추적 키가 아닙니다 — yard_location 으로 등록하세요.");
      return;
    }
    setYardId(trimmed);
    const y = MOCK_YARDS[trimmed];
    if (!y) {
      showToast("error", "야적장 위치 마스터 미등재 — 관리자에게 신청.");
      return;
    }
    if (y.occupied) {
      showToast("warning", "해당 위치가 이미 점유 중입니다 — 다른 자리를 선택하세요.");
    }
  }

  function handleSubmit() {
    if (!canSubmit) return;
    const entry: RecentEntry = {
      packingId,
      yardLocationId: yardId,
      ts: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };
    setRecent([entry, ...recent.slice(0, 4)]);
    showToast("success", `야적장 ${yardId} 배치 완료. STORED 전이.`);
    setDone(true);
    setPackingId("");
    setYardId("");
  }

  const toastColors = {
    success: "bg-tertiary/20 border-tertiary text-tertiary",
    error:   "bg-error-container/30 border-error text-error",
    warning: "bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]",
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col max-w-md mx-auto">

      {/* PDA 헤더 */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/10 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-accent text-lg">menu</span>
          <div>
            <p className="text-xs font-label uppercase tracking-widest text-primary-accent font-bold">
              PDA · 야적장 입고
            </p>
            <p className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant opacity-40">
              SCR-WO-023 · FNC-WO-024
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-base">wifi</span>
          <div className="text-right">
            <p className="text-xs font-headline font-bold text-on-surface">박야적</p>
            <p className="text-[10px] font-label text-on-surface-variant opacity-50 uppercase tracking-wider">WAREHOUSE</p>
          </div>
        </div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className={`mx-4 mt-3 border-l-2 px-3 py-2 ${toastColors[toast.type]}`}>
          <p className="text-xs font-label">{toast.msg}</p>
        </div>
      )}

      {/* 완료 배너 */}
      {done && (
        <div className="mx-4 mt-3 bg-tertiary/20 border-l-2 border-tertiary px-3 py-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
          <p className="text-xs font-label text-tertiary font-bold">STORED 등록 완료 — 다음 패킹 스캔하세요</p>
        </div>
      )}

      <div className="flex-1 px-4 py-4 space-y-5">

        {/* ① 패킹 라벨 스캔 */}
        <section className="bg-surface-container">
          <div className="px-4 py-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex items-center gap-2">
            <span className="text-xs font-label uppercase tracking-widest text-white font-bold">① 패킹 라벨 스캔</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={packingId}
                onChange={(e) => handlePackingScan(e.target.value)}
                placeholder="PKG-WO-P3000-…-001"
                className="flex-1 bg-surface-container-lowest border-b-2 border-outline/30 px-3 py-2.5 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
              />
              {/* 시뮬레이션 버튼 */}
              <button
                type="button"
                onClick={() => handlePackingScan("PKG-WO-P3000-20260506-0007-001")}
                className="px-3 py-2 bg-surface-container-highest text-xs font-label uppercase tracking-wider text-on-surface-variant hover:text-primary-accent transition-colors"
                title="스캔 시뮬레이션"
              >
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
              </button>
            </div>

            {packing && (
              <div className={`px-3 py-2 border-l-2 ${packingOk ? "border-tertiary bg-tertiary/10" : "border-error bg-error-container/20"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-headline text-on-surface font-bold truncate">{packingId}</span>
                  <span className={`text-xs font-label uppercase tracking-wider px-2 py-0.5 font-bold ${packingOk ? "text-tertiary bg-tertiary/20" : "text-error bg-error-container"}`}>
                    {packing.state}
                  </span>
                </div>
                <p className="text-xs font-label text-on-surface-variant opacity-70 mt-0.5">
                  WO: {packing.woId} · 부재 {packing.memberCount}건
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ② 야적장 위치 스캔 */}
        <section className="bg-surface-container">
          <div className="px-4 py-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex items-center gap-2">
            <span className="text-xs font-label uppercase tracking-widest text-white font-bold">② 야적장 위치 스캔</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={yardId}
                onChange={(e) => handleYardScan(e.target.value)}
                placeholder="예) A-2-3"
                className="flex-1 bg-surface-container-lowest border-b-2 border-outline/30 px-3 py-2.5 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
              />
              <button
                type="button"
                onClick={() => handleYardScan("A-2-3")}
                className="px-3 py-2 bg-surface-container-highest text-xs font-label uppercase tracking-wider text-on-surface-variant hover:text-primary-accent transition-colors"
                title="스캔 시뮬레이션"
              >
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
              </button>
            </div>

            {yard && (
              <div className={`px-3 py-2 border-l-2 ${yardOk ? "border-tertiary bg-tertiary/10" : "border-[#f59e0b] bg-[#f59e0b]/10"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-headline text-on-surface font-bold">{yard.name}</span>
                  <span className={`text-xs font-label uppercase tracking-wider px-2 py-0.5 font-bold ${yardOk ? "text-tertiary bg-tertiary/20" : "text-[#f59e0b] bg-[#f59e0b]/20"}`}>
                    {yard.occupied ? "점유 중" : "사용 가능"}
                  </span>
                </div>
                <p className="text-xs font-label text-on-surface-variant opacity-70 mt-0.5">
                  면적: {yard.capacityM2}m²
                </p>
              </div>
            )}

            <p className="text-[10px] font-label text-on-surface-variant opacity-40 tracking-wide">
              ⚠ 팔레트 번호로 시도하면 거부됩니다 (FR-WO-052)
            </p>
          </div>
        </section>

        {/* 등록 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full bg-primary-accent text-white font-label font-bold uppercase tracking-widest py-4 text-sm hover:bg-primary-accent/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-base align-middle mr-1">warehouse</span>
          등록 ▶ STORED
        </button>

        {/* 최근 등록 */}
        <section className="bg-surface-container">
          <div className="px-4 py-3 bg-surface-container-highest/30 border-l-4 border-outline/30 flex items-center justify-between">
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold opacity-70">
              최근 등록
            </span>
            <span className="text-xs font-headline tabular-nums text-on-surface-variant opacity-30">
              {String(recent.length).padStart(3, "0")}
            </span>
          </div>
          <div>
            {recent.length === 0 ? (
              <p className="px-4 py-3 text-xs font-label text-on-surface-variant opacity-40">없음</p>
            ) : (
              recent.map((r, i) => (
                <div key={i} className="px-4 py-2.5 border-b border-outline-variant/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-headline text-on-surface truncate max-w-[180px]">{r.packingId}</p>
                    <p className="text-[10px] font-label text-on-surface-variant opacity-50 mt-0.5">
                      → {r.yardLocationId}
                    </p>
                  </div>
                  <span className="text-xs font-headline tabular-nums text-on-surface-variant opacity-40">{r.ts}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
