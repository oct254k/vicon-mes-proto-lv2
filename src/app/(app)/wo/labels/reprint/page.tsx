"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

// ── 라벨 미리보기 (인라인) ────────────────────────────────
const MEMBER_INFO: Record<string, { type: string; len: string; wo: string; wc: string }> = {
  "B01-1-G22C-C-171": { type: "C형", len: "6,000mm", wo: "WO-P3000-20260506-0007", wc: "WC-신선-01" },
  "B01-1-G22C-S-172": { type: "S형", len: "6,000mm", wo: "WO-P3000-20260506-0007", wc: "WC-신선-01" },
  "B01-2-G22C-C-201": { type: "C형", len: "9,000mm", wo: "WO-P3000-20260506-0008", wc: "WC-신선-01" },
  "B01-2-G15A-S-040": { type: "S형", len: "12,000mm", wo: "WO-P3000-20260506-0007", wc: "WC-신선-01" },
  "B02-1-T18B-S-102": { type: "S형", len: "8,000mm", wo: "WO-P3000-20260505-0002", wc: "WC-TG-01" },
};
const PACKING_INFO: Record<string, { wo: string; count: number; weight: string; dest: string }> = {
  "PKG-WO-P3000-20260506-0007-001": { wo: "WO-P3000-20260506-0007", count: 12, weight: "2,450 kg", dest: "P1000 제1 이천공장" },
  "PKG-WO-P3000-20260506-0007-002": { wo: "WO-P3000-20260506-0007", count:  8, weight: "1,800 kg", dest: "P1000 제1 이천공장" },
  "PKG-WO-P3000-20260505-0001-001": { wo: "WO-P3000-20260505-0001", count:  6, weight: "1,200 kg", dest: "P1000 제1 이천공장" },
};
const KS_CERTIFIED = ["G22C-SLIPPER-TYPE-01","G22C-SLIPPER-TYPE-03"];

function Barcode({ value }: { value: string }) {
  const bars = value.split("").flatMap((c) => {
    const n = c.charCodeAt(0) % 8;
    return [1, n > 4 ? 2 : 1, n > 2 ? 1 : 2, 1];
  }).slice(0, 52);
  return (
    <div className="flex items-end gap-px h-10">
      {bars.map((w, i) => (
        <div key={i} className="bg-black" style={{ width: `${w * 2}px`, height: i % 5 === 0 ? "100%" : "80%" }} />
      ))}
    </div>
  );
}
function QRBlock({ size = 52 }: { size?: number }) {
  return (
    <div className="border-2 border-black bg-white p-1" style={{ width: size, height: size }}>
      <div className="w-full h-full grid" style={{ gridTemplateColumns: "repeat(7,1fr)", gap: "1px" }}>
        {Array.from({ length: 49 }).map((_, i) => {
          const corner = [0,1,2,7,8,9,14,6,13,20,36,37,38,43,44,45,42,41,40,48,47,46];
          return <div key={i} className={corner.includes(i) || i % 3 === 0 ? "bg-black" : "bg-white"} />;
        })}
      </div>
    </div>
  );
}

function LabelPreviewCard({ type, target }: { type: "MEMBER"|"PACKING"|"SLIPPER"; target: string }) {
  if (type === "MEMBER") {
    const m = MEMBER_INFO[target] ?? { type:"—", len:"—", wo:"—", wc:"—" };
    return (
      <div className="bg-white text-black p-4 border-2 border-black font-headline" style={{width:300}}>
        <div className="flex justify-between items-start mb-3 border-b-2 border-black pb-2">
          <div><p className="text-[10px] font-bold text-gray-400 uppercase">VICON MES</p><p className="text-xs font-black uppercase">부재 라벨 · MEMBER</p></div>
          <QRBlock />
        </div>
        <p className="text-[10px] text-gray-400 uppercase mb-0.5">부재 코드</p>
        <p className="text-sm font-black tracking-tight mb-2 break-all">{target}</p>
        <div className="mb-2"><Barcode value={target} /><p className="text-[9px] text-center text-gray-400 mt-0.5 font-mono">{target}</p></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-gray-200 pt-2 text-[10px]">
          <div><span className="text-gray-400">타입</span><br/><b>{m.type}</b></div>
          <div><span className="text-gray-400">길이</span><br/><b>{m.len}</b></div>
          <div><span className="text-gray-400">WO</span><br/><b className="text-[9px] font-mono">{m.wo}</b></div>
          <div><span className="text-gray-400">WC</span><br/><b>{m.wc}</b></div>
        </div>
        <div className="border-t border-gray-200 mt-2 pt-1 flex justify-between text-[9px] text-gray-400">
          <span>P3000 제3 이천공장</span><span>2026-05-06</span>
        </div>
      </div>
    );
  }
  if (type === "PACKING") {
    const p = PACKING_INFO[target] ?? { wo:"—", count:0, weight:"—", dest:"—" };
    return (
      <div className="bg-white text-black p-4 border-2 border-black font-headline" style={{width:300}}>
        <div className="flex justify-between items-start mb-3 border-b-2 border-black pb-2">
          <div><p className="text-[10px] font-bold text-gray-400 uppercase">VICON MES</p><p className="text-xs font-black uppercase">패킹 라벨 · PACKING</p></div>
          <QRBlock />
        </div>
        <p className="text-[10px] text-gray-400 uppercase mb-0.5">패킹 ID</p>
        <p className="text-[10px] font-black tracking-tight mb-2 break-all">{target}</p>
        <div className="mb-2"><Barcode value={target.slice(-6)} /></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-gray-200 pt-2 text-[10px]">
          <div><span className="text-gray-400">WO</span><br/><b className="text-[9px] font-mono">{p.wo}</b></div>
          <div><span className="text-gray-400">부재 수</span><br/><b className="text-base">{p.count}건</b></div>
          <div><span className="text-gray-400">총 중량</span><br/><b>{p.weight}</b></div>
          <div><span className="text-gray-400">수신처</span><br/><b className="text-[9px]">{p.dest}</b></div>
        </div>
        <div className="border-t border-gray-200 mt-2 pt-1 flex justify-between text-[9px] text-gray-400">
          <span>P3000 제3 이천공장</span><span>2026-05-06</span>
        </div>
      </div>
    );
  }
  // SLIPPER
  const ok = KS_CERTIFIED.includes(target);
  return (
    <div className={`bg-white text-black p-4 border-4 font-headline ${ok ? "border-black" : "border-green-800"}`} style={{width:300}}>
      <div className="flex justify-between items-start mb-3 border-b-2 border-black pb-2">
        <div><p className="text-[10px] font-bold text-gray-400 uppercase">VICON MES</p><p className="text-xs font-black uppercase">슬리퍼 라벨</p></div>
        {ok ? <QRBlock /> : <div className="w-14 h-14 bg-green-100 border-2 border-green-800 flex items-center justify-center"><span className="text-green-800 font-black text-[10px] text-center leading-tight">KS<br/>BLOCKED</span></div>}
      </div>
      <p className="text-[10px] text-gray-400 uppercase mb-0.5">슬리퍼 타입</p>
      <p className="text-sm font-black mb-2">{target}</p>
      <div className="mb-2"><Barcode value={target.slice(-4)} /></div>
      {ok
        ? <div className="border border-green-600 bg-green-50 p-2 text-[10px] text-green-800 font-bold text-center">✓ KS 인증 유효</div>
        : <div className="border-2 border-green-800 bg-green-50 p-2 text-[10px] text-green-800 font-bold text-center">✗ KS 인증 미등재 — 발행 차단</div>}
    </div>
  );
}
// ─────────────────────────────────────────────────────────

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
  "출하 대기": "bg-warning/20 text-warning",
  "출하 완료": "bg-[#22c55e]/20 text-[#22c55e]",
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
  const [rows, setRows]       = useState<LabelRow[]>(ALL_LABELS);
  const [tab, setTab]         = useState<LabelStatus | "ALL">("ALL");
  const [locTab, setLocTab]   = useState<ItemLocation | "ALL">("ALL");
  const [scan, setScan]       = useState("");
  const [toast, setToast]     = useState("");
  const [previewRow, setPreviewRow] = useState<LabelRow | null>(null);

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
                ? "bg-primary-accent text-white border-primary-accent"
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
              <tr className="bg-surface-container border-b border-outline">
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
                    className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors ${s.bg}`}>
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
                          "bg-warning/20 text-warning"}`}>
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
                        {/* 미리보기 */}
                        <button onClick={() => setPreviewRow(r)}
                          className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-label uppercase tracking-wider hover:text-primary-accent hover:border hover:border-primary-accent/40 whitespace-nowrap transition-colors">
                          미리보기
                        </button>
                        {/* 재인쇄 */}
                        {r.status !== "BLOCKED" && (
                          <button onClick={() => handleReprint(r.id)}
                            className="px-2 py-1 bg-primary-accent text-white text-[10px] font-label uppercase tracking-wider hover:opacity-90 whitespace-nowrap">
                            재인쇄
                          </button>
                        )}
                        {/* 재발행 — FAILED/BLOCKED: 시도 초기화 */}
                        {(r.status === "FAILED" || r.status === "BLOCKED") && (
                          <button onClick={() => handleReissue(r.id)}
                            className="px-2 py-1 bg-warning/80 text-black text-[10px] font-label uppercase tracking-wider hover:opacity-90 whitespace-nowrap">
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

      {/* 미리보기 모달 */}
      {previewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPreviewRow(null)}>
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between bg-surface-container-lowest px-4 py-2 border-b border-outline-variant/20">
              <div>
                <span className="text-xs font-label uppercase tracking-widest text-primary-accent">라벨 미리보기</span>
                <span className="text-xs font-mono text-on-surface-variant opacity-60 ml-3">{previewRow.target}</span>
              </div>
              <button onClick={() => setPreviewRow(null)}
                className="text-on-surface-variant hover:text-on-surface ml-8">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            {/* 라벨 렌더 */}
            <LabelPreviewCard type={previewRow.type} target={previewRow.target} />
            {/* 모달 액션 */}
            <div className="flex gap-2 justify-end bg-surface-container-lowest px-4 py-3">
              <p className="text-[10px] font-label text-on-surface-variant opacity-40 mr-auto self-center">
                ※ 실제 출력은 프린터 드라이버 형식과 다를 수 있습니다
              </p>
              {previewRow.status !== "BLOCKED" && (
                <button onClick={() => { handleReprint(previewRow.id); setPreviewRow(null); }}
                  className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-wider font-bold hover:opacity-90">
                  재인쇄
                </button>
              )}
              {(previewRow.status === "FAILED" || previewRow.status === "BLOCKED") && (
                <button onClick={() => { handleReissue(previewRow.id); setPreviewRow(null); }}
                  className="px-4 py-2 bg-warning/80 text-black text-xs font-label uppercase tracking-wider font-bold hover:opacity-90">
                  재발행
                </button>
              )}
              <button onClick={() => setPreviewRow(null)}
                className="px-4 py-2 bg-surface-container text-on-surface-variant text-xs font-label uppercase tracking-wider">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
