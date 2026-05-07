"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

type LabelStatus = "COMPLETED" | "PENDING" | "FAILED" | "BLOCKED" | "QUEUED";
type LabelType   = "MEMBER" | "PACKING" | "SLIPPER";

type ItemLocation = "재고" | "공정 중" | "야적장" | "출하 대기" | "출하 완료" | "수신 완료";

interface LabelRow {
  id: string;
  target: string;
  type: LabelType;
  action: "PRINT" | "REPRINT";
  reason?: string;
  printer: string;
  issuedAt: string;
  issuedBy: string;
  attempts: number;
  maxAttempts: number;
  status: LabelStatus;
  location: ItemLocation;   // 라벨 대상 현재 위치
  locationDetail?: string;  // 구체적 위치 (WH-P3000-A-003, YARD-P3000-B-12 등)
}

// 전체 라벨 이력 — 위치·상태 전체 포함
const ALL_LABELS: LabelRow[] = [
  // ── 큐 대기 (QUEUED) ──
  { id: "RPQ-20260506-003", target: "B01-1-G22C-C-171",               type: "MEMBER",  action: "REPRINT", reason: "라벨 훼손",    printer: "PRT-01", issuedAt: "2026-05-06 14:10", issuedBy: "kim.worker",   attempts: 1, maxAttempts: 3, status: "QUEUED",    location: "공정 중",  locationDetail: "WC-신선-01" },
  { id: "RPQ-20260506-002", target: "PKG-WO-P3000-20260506-0007-001", type: "PACKING", action: "REPRINT", reason: "출력 오류",    printer: "PRT-02", issuedAt: "2026-05-06 13:55", issuedBy: "lee.pack",     attempts: 2, maxAttempts: 3, status: "QUEUED",    location: "야적장",   locationDetail: "YARD-P3000-B-12" },
  // ── 발행 대기 (PENDING — 프린터 스풀) ──
  { id: "LBL-20260506-020", target: "B01-2-G15A-S-040",               type: "MEMBER",  action: "PRINT",   reason: "프린터 스풀", printer: "PRT-02", issuedAt: "2026-05-06 15:05", issuedBy: "lee.pack",     attempts: 1, maxAttempts: 3, status: "PENDING",   location: "재고",     locationDetail: "WH-P3000-A-003" },
  { id: "LBL-20260506-019", target: "PKG-WO-P3000-20260506-0007-002", type: "PACKING", action: "PRINT",   reason: "발행 요청",   printer: "PRT-02", issuedAt: "2026-05-06 15:04", issuedBy: "lee.pack",     attempts: 1, maxAttempts: 3, status: "PENDING",   location: "야적장",   locationDetail: "YARD-P3000-B-13" },
  // ── 완료 (COMPLETED) — 재고에 있는 라벨 ──
  { id: "LBL-20260506-018", target: "B01-1-G22C-C-171",               type: "MEMBER",  action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-06 09:30", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "공정 중",  locationDetail: "WC-신선-01" },
  { id: "LBL-20260506-017", target: "B01-1-G22C-C-172",               type: "MEMBER",  action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-06 09:31", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "재고",     locationDetail: "WH-P3000-A-003" },
  { id: "LBL-20260506-016", target: "B01-2-G15A-S-040",               type: "MEMBER",  action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-06 09:32", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "재고",     locationDetail: "WH-P3000-B-001" },
  // ── 완료 — 야적장에 있는 패킹 라벨 ──
  { id: "LBL-20260506-015", target: "PKG-WO-P3000-20260506-0007-001", type: "PACKING", action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-06 09:45", issuedBy: "lee.pack",     attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "야적장",   locationDetail: "YARD-P3000-B-12" },
  { id: "LBL-20260506-014", target: "PKG-WO-P3000-20260506-0007-002", type: "PACKING", action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-06 09:46", issuedBy: "lee.pack",     attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "야적장",   locationDetail: "YARD-P3000-B-13" },
  // ── 완료 — 출하 대기 (READY) ──
  { id: "LBL-20260505-012", target: "PKG-WO-P3000-20260505-0002-001", type: "PACKING", action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-05 17:10", issuedBy: "lee.pack",     attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "출하 대기", locationDetail: "YARD-P3000-A-05" },
  // ── 완료 — 출하 완료 (SHIPPED) ──
  { id: "LBL-20260504-011", target: "PKG-WO-P3000-20260504-0001-001", type: "PACKING", action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-04 09:20", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "출하 완료", locationDetail: "SHP-P3000-20260505-001" },
  // ── 완료 — 수신 완료 (RECEIVED at P1000) ──
  { id: "LBL-20260503-010", target: "PKG-WO-P3000-20260503-0001-001", type: "PACKING", action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-03 10:00", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "수신 완료", locationDetail: "P1000 제1 이천공장" },
  // ── 완료 — 재인쇄 성공 ──
  { id: "RPQ-20260505-008", target: "B02-1-T18B-S-102",               type: "MEMBER",  action: "REPRINT", reason: "QR 불량",     printer: "PRT-01", issuedAt: "2026-05-05 17:30", issuedBy: "lee.pack",     attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "재고",     locationDetail: "WH-P3000-A-002" },
  { id: "LBL-20260505-008", target: "B02-1-T18B-S-102",               type: "MEMBER",  action: "PRINT",   printer: "PRT-01", issuedAt: "2026-05-05 17:00", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "COMPLETED", location: "재고",     locationDetail: "WH-P3000-A-002" },
  // ── 실패 (FAILED — 최대 시도 초과) ──
  { id: "RPQ-20260505-010", target: "B01-2-G22C-C-201",               type: "MEMBER",  action: "REPRINT", reason: "분실",        printer: "PRT-02", issuedAt: "2026-05-05 16:40", issuedBy: "kim.worker",   attempts: 3, maxAttempts: 3, status: "FAILED",    location: "공정 중",  locationDetail: "WC-TG-01" },
  { id: "LBL-20260505-007", target: "PKG-WO-P3000-20260505-0001-001", type: "PACKING", action: "PRINT",   reason: "프린터 오류", printer: "PRT-02", issuedAt: "2026-05-05 16:30", issuedBy: "lee.pack",     attempts: 3, maxAttempts: 3, status: "FAILED",    location: "야적장",   locationDetail: "YARD-P3000-C-01" },
  // ── KS BLOCKED (슬리퍼 — 인증 미등재/만료) ──
  { id: "LBL-20260504-003", target: "G22C-SLIPPER-TYPE-05",           type: "SLIPPER", action: "PRINT",   reason: "KS 인증 미등재", printer: "PRT-03", issuedAt: "2026-05-04 11:00", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "BLOCKED", location: "재고",     locationDetail: "WH-P3000-C-003" },
  { id: "LBL-20260503-009", target: "G22C-SLIPPER-TYPE-08",           type: "SLIPPER", action: "PRINT",   reason: "KS 인증 만료",   printer: "PRT-03", issuedAt: "2026-05-03 15:20", issuedBy: "park.planner", attempts: 1, maxAttempts: 3, status: "BLOCKED", location: "재고",     locationDetail: "WH-P3000-C-004" },
];

const STATUS_CONF: Record<LabelStatus, { badge: "running" | "warning" | "error" | "stopped" | "idle"; label: string; bg: string }> = {
  COMPLETED: { badge: "running", label: "완료",        bg: "" },
  QUEUED:    { badge: "warning", label: "큐 대기",      bg: "" },
  PENDING:   { badge: "idle",    label: "대기",         bg: "" },
  FAILED:    { badge: "error",   label: "실패",         bg: "bg-error/5" },
  BLOCKED:   { badge: "stopped", label: "KS BLOCKED",  bg: "bg-error/5" },
};

const TYPE_LABELS: Record<LabelType, string> = { MEMBER: "부재", PACKING: "패킹", SLIPPER: "슬리퍼" };
const LOCATION_TABS: { key: ItemLocation | "ALL"; label: string }[] = [
  { key: "ALL",    label: "전체 위치" },
  { key: "재고",   label: "재고" },
  { key: "공정 중", label: "공정 중" },
  { key: "야적장", label: "야적장" },
  { key: "출하 대기", label: "출하 대기" },
  { key: "출하 완료", label: "출하 완료" },
  { key: "수신 완료", label: "수신 완료" },
];

const LOCATION_COLOR: Record<ItemLocation, string> = {
  "재고":    "bg-surface-container-highest text-on-surface-variant",
  "공정 중": "bg-tertiary/20 text-tertiary",
  "야적장":  "bg-primary-accent/20 text-primary-accent",
  "출하 대기": "bg-[#f59e0b]/20 text-[#f59e0b]",
  "출하 완료": "bg-[#3b82f6]/20 text-[#3b82f6]",
  "수신 완료": "bg-primary/20 text-primary",
};

const TABS: { key: LabelStatus | "ALL"; label: string }[] = [
  { key: "ALL",       label: "전체" },
  { key: "QUEUED",    label: "큐 대기" },
  { key: "PENDING",   label: "발행 대기" },
  { key: "COMPLETED", label: "완료" },
  { key: "FAILED",    label: "실패" },
  { key: "BLOCKED",   label: "KS BLOCKED" },
];

export default function LabelReprintPage() {
  const [rows, setRows]     = useState<LabelRow[]>(ALL_LABELS);
  const [tab, setTab]       = useState<LabelStatus | "ALL">("ALL");
  const [locTab, setLocTab] = useState<ItemLocation | "ALL">("ALL");
  const [scan, setScan]     = useState("");
  const [toast, setToast]   = useState("");

  // 재인쇄 처리 (최대 시도 초과 시 FAILED 유지)
  function handleReprint(id: string) {
    setRows(prev => prev.map(r => {
      if (r.id !== id) return r;
      const next = r.attempts + 1;
      const newStatus: LabelStatus = next > r.maxAttempts ? "FAILED" : "QUEUED";
      return { ...r, status: newStatus, attempts: next, action: "REPRINT" as const };
    }));
    showToast("재인쇄 큐 등록 완료");
  }

  // 재발행 (상태 초기화 — ADMIN/FACTORY-MGR)
  function handleReissue(id: string) {
    setRows(prev => prev.map(r =>
      r.id === id ? { ...r, status: "QUEUED" as const, attempts: 1, action: "REPRINT" as const } : r
    ));
    showToast("재발행 큐 등록 완료 (시도 횟수 초기화)");
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  const scanFilter = scan.trim().toLowerCase();
  const visible = rows
    .filter(r => tab    === "ALL" || r.status   === tab)
    .filter(r => locTab === "ALL" || r.location === locTab)
    .filter(r => !scanFilter || r.target.toLowerCase().includes(scanFilter) || r.id.toLowerCase().includes(scanFilter));

  const counts: Record<string, number> = { ALL: rows.length };
  rows.forEach(r => { counts[r.status] = (counts[r.status] ?? 0) + 1; });
  const locCounts: Record<string, number> = { ALL: rows.length };
  rows.forEach(r => { locCounts[r.location] = (locCounts[r.location] ?? 0) + 1; });

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="라벨 재인쇄" accent="큐 · 이력" nodeRef="SCR-WO-031"
        description="전체 라벨 이력 + 재인쇄 큐 통합 — 스캔으로 검색 · 즉시 재인쇄. FNC-WO-011,015,016" />

      {/* 토스트 */}
      {toast && (
        <div className="mb-4 bg-tertiary/20 border-l-2 border-tertiary px-4 py-2 text-sm font-label text-tertiary">
          {toast}
        </div>
      )}

      {/* 스캔 / 검색 */}
      <div className="mb-6 bg-surface-container">
        <div className="px-4 py-3 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <span className="font-headline font-black text-sm uppercase tracking-widest">재고 스캔 · 검색</span>
          <span className="text-xs font-label opacity-40 ml-2">부재코드 · PKG ID · 라벨 ID</span>
        </div>
        <div className="p-4 flex gap-3">
          <input
            type="text"
            value={scan}
            onChange={e => setScan(e.target.value)}
            placeholder="B01-1-G22C-C-171  또는  PKG-WO-P3000-..."
            className="flex-1 bg-surface-container-lowest border-b-2 border-outline/30 px-4 py-3 text-base font-headline text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary-accent"
          />
          {/* QR 시뮬 버튼들 */}
          <div className="flex flex-col gap-1">
            <button onClick={() => setScan("B01-1-G22C-C-171")}
              className="px-3 py-1.5 bg-surface-container-highest text-xs font-label text-on-surface-variant hover:text-primary-accent transition-colors">
              <span className="material-symbols-outlined text-sm align-middle">qr_code_scanner</span> 부재
            </button>
            <button onClick={() => setScan("PKG-WO-P3000-20260506-0007-001")}
              className="px-3 py-1.5 bg-surface-container-highest text-xs font-label text-on-surface-variant hover:text-primary-accent transition-colors">
              <span className="material-symbols-outlined text-sm align-middle">qr_code_scanner</span> PKG
            </button>
          </div>
          {scan && (
            <button onClick={() => setScan("")}
              className="px-3 py-1.5 bg-surface-container-high text-xs font-label text-on-surface-variant hover:text-on-surface">
              초기화
            </button>
          )}
        </div>
      </div>

      {/* 위치 필터 */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {LOCATION_TABS.map(t => (
          <button key={t.key} onClick={() => setLocTab(t.key)}
            className={`px-3 py-1 text-xs font-label tracking-widest border transition-colors ${
              locTab === t.key
                ? "bg-surface-container-highest text-on-surface border-outline-variant/60"
                : "bg-surface-container border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/40"
            }`}>
            {t.key !== "ALL" && <span className="mr-1">📍</span>}{t.label}
            <span className="ml-1.5 opacity-50 tabular-nums">({locCounts[t.key] ?? 0})</span>
          </button>
        ))}
      </div>

      {/* 상태 탭 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 text-xs font-label uppercase tracking-widest border transition-colors ${
              tab === t.key
                ? "bg-primary-accent text-black border-primary-accent"
                : "bg-surface-container border-outline-variant/20 text-on-surface-variant hover:border-primary-accent/40"
            }`}>
            {t.label}
            <span className="ml-1.5 opacity-60 tabular-nums">({counts[t.key] ?? 0})</span>
          </button>
        ))}
      </div>

      {/* 라벨 테이블 */}
      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
          <span className="font-headline font-black text-sm uppercase tracking-widest">
            라벨 목록
            <span className="opacity-30 font-light ml-2 tabular-nums">| {String(visible.length).padStart(3, "0")} 건</span>
          </span>
          <button className="text-xs opacity-40 hover:opacity-70 font-label uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm align-middle">refresh</span>
          </button>
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-on-surface/30 text-xs font-label uppercase tracking-widest py-12">
            검색 결과 없음
          </p>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["ID", "대상 (부재코드 / PKG ID)", "현재 위치", "유형", "작업", "사유", "프린터", "발행일시", "담당자", "시도", "상태", ""].map(h => (
                  <th key={h} className="px-3 py-2 font-label uppercase tracking-widest text-xs opacity-50 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {visible.map(r => {
                const s = STATUS_CONF[r.status];
                const isMaxed = r.attempts >= r.maxAttempts;
                return (
                  <tr key={r.id}
                    className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors ${s.bg}`}>
                    <td className="px-3 py-2 font-mono text-xs text-primary-accent whitespace-nowrap">{r.id}</td>
                    <td className="px-3 py-2 font-mono text-xs opacity-80 max-w-[180px] truncate" title={r.target}>{r.target}</td>
                    <td className="px-3 py-2 text-xs whitespace-nowrap">
                      <div>
                        <span className={`px-2 py-0.5 text-[10px] font-label font-bold ${LOCATION_COLOR[r.location]}`}>
                          {r.location}
                        </span>
                        {r.locationDetail && (
                          <p className="text-[10px] font-label text-on-surface-variant opacity-40 mt-0.5 max-w-[120px] truncate">{r.locationDetail}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs">
                      <span className={`px-2 py-0.5 text-[10px] font-label uppercase tracking-wider font-bold
                        ${r.type === "MEMBER" ? "bg-primary-accent/20 text-primary-accent" :
                          r.type === "PACKING" ? "bg-tertiary/20 text-tertiary" :
                          "bg-[#f59e0b]/20 text-[#f59e0b]"}`}>
                        {TYPE_LABELS[r.type]}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs opacity-70">
                      {r.action === "REPRINT" ? "재인쇄" : "발행"}
                    </td>
                    <td className="px-3 py-2 text-xs opacity-60 whitespace-nowrap">{r.reason ?? "—"}</td>
                    <td className="px-3 py-2 text-xs opacity-50">{r.printer}</td>
                    <td className="px-3 py-2 tabular-nums text-xs opacity-50 whitespace-nowrap">{r.issuedAt}</td>
                    <td className="px-3 py-2 text-xs opacity-60">{r.issuedBy}</td>
                    <td className={`px-3 py-2 tabular-nums text-xs font-bold text-center ${isMaxed ? "text-error" : ""}`}>
                      {r.attempts}/{r.maxAttempts}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge type={s.badge} label={s.label} />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        {/* 재인쇄 — 완료·큐·실패 모두 가능 */}
                        {r.status !== "BLOCKED" && (
                          <button onClick={() => handleReprint(r.id)}
                            className="px-2 py-1 bg-primary-accent text-black text-[10px] font-label uppercase tracking-wider hover:opacity-90 whitespace-nowrap">
                            재인쇄
                          </button>
                        )}
                        {/* 재발행 — FAILED/BLOCKED: 시도 초기화 (관리자 권한) */}
                        {(r.status === "FAILED" || r.status === "BLOCKED") && (
                          <button onClick={() => handleReissue(r.id)}
                            className="px-2 py-1 bg-[#f59e0b]/80 text-black text-[10px] font-label uppercase tracking-wider hover:opacity-90 whitespace-nowrap">
                            재발행
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* 하단 안내 */}
      <div className="mt-4 px-4 py-3 bg-surface-container border-l-2 border-outline-variant/20">
        <p className="text-xs font-label text-on-surface-variant opacity-50">
          ⓘ 재인쇄: 현재 남은 시도 횟수 내에서 큐 재등록 /
          재발행: 시도 횟수 초기화 (FACTORY-MGR 권한 필요) /
          KS BLOCKED: KS 인증 등재 후 재발행 가능 (FNC-WO-011)
        </p>
      </div>
    </main>
  );
}
