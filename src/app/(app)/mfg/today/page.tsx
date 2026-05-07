"use client";
import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SESSION = { name: "김작업", plant: "P3000 제3 이천공장 (데크)", wc: "WC-CUT-01", shift: "주간조" };
const TODAY = "2026-05-06 (수)";

const LINES = [
  {
    id: "WOL-7001", woId: "WO-P3000-20260506-0007",
    memberId: "B01-1-G22C-C-171", memberType: "C형 6000mm",
    material: "COIL-A", nextOp: "BENT", status: "IN_PROGRESS", priority: 3,
  },
  {
    id: "WOL-7002", woId: "WO-P3000-20260506-0008",
    memberId: "B01-1-G22C-C-172", memberType: "C형 6000mm",
    material: "COIL-A", nextOp: "CUT", status: "PENDING", priority: 2,
  },
  {
    id: "WOL-7003", woId: "",
    memberId: "B01-2-G15A-S-040", memberType: "S형 12000mm",
    material: "COIL-B", nextOp: "", status: "COMPLETED", priority: 1,
    completedAt: "14:22",
  },
];

const STATUS_MAP: Record<string, { badge: "running" | "idle" | "warning" | "stopped"; label: string; dot: string }> = {
  IN_PROGRESS: { badge: "running", label: "진행 중", dot: "bg-yellow-400" },
  PENDING:     { badge: "idle",    label: "대기",    dot: "bg-gray-400" },
  COMPLETED:   { badge: "running", label: "완료",    dot: "bg-[#00912F]" },
};

export default function MFGTodayPage() {
  const [filter, setFilter] = useState("ALL");

  const visible = filter === "ALL" ? LINES : LINES.filter(l => l.status === filter);

  return (
    <div className="max-w-sm mx-auto py-6 px-3 space-y-4">
      {/* 헤더 컨텍스트 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="font-headline font-black text-lg">{SESSION.name}</span>
          <span className="text-xs font-label text-primary-accent uppercase tracking-widest">SCR-MFG-001</span>
        </div>
        <p className="text-xs text-on-surface/60 font-label">{SESSION.wc} · {SESSION.shift}</p>
        <p className="text-xs text-on-surface/50 mt-0.5">{TODAY}</p>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 overflow-x-auto">
        {["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest whitespace-nowrap border ${
              filter === f
                ? "border-primary-accent text-primary-accent bg-primary-accent/10"
                : "border-outline-variant/30 text-on-surface/40"
            }`}
          >
            {f === "ALL" ? "전체" : f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* WO 라인 카드 목록 */}
      <div className="space-y-3">
        {visible.map(line => {
          const st = STATUS_MAP[line.status] ?? STATUS_MAP.PENDING;
          return (
            <div key={line.id} className="bg-surface-container-low border border-outline-variant/10 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <StatusBadge type={st.badge} label={st.label} />
                <span className="text-xs text-on-surface/40 font-label">
                  {"★".repeat(line.priority ?? 1)}
                </span>
              </div>
              {line.woId && (
                <p className="text-xs font-mono text-on-surface/70">{line.woId}</p>
              )}
              <p className="font-headline font-bold text-sm">{line.memberId}</p>
              <p className="text-xs text-on-surface/60">{line.memberType} · {line.material}</p>
              {line.nextOp && (
                <p className="text-xs text-on-surface/50">다음공정: <span className="text-primary-accent">{line.nextOp}</span></p>
              )}
              {line.completedAt && (
                <p className="text-xs text-on-surface/40">완료: {line.completedAt}</p>
              )}

              {/* 액션 버튼 */}
              <div className="flex gap-2 pt-1">
                {line.status === "PENDING" && (
                  <a href="/mfg/issue/scan" className="flex-1 bg-primary-accent text-white text-center py-4 text-base font-label uppercase tracking-widest">
                    자재 투입
                  </a>
                )}
                {line.status === "IN_PROGRESS" && (
                  <>
                    <a href="/mfg/issue/scan" className="flex-1 bg-surface-container border border-primary-accent/50 text-primary-accent text-center py-4 text-base font-label uppercase tracking-widest">
                      ISSUE
                    </a>
                    <a href="/mfg/produce" className="flex-1 bg-primary-accent text-white text-center py-4 text-base font-label uppercase tracking-widest">
                      PRODUCE
                    </a>
                    <a href="/mfg/transfer" className="flex-1 bg-surface-container border border-outline-variant/30 text-on-surface/60 text-center py-4 text-base font-label uppercase tracking-widest">
                      이동
                    </a>
                  </>
                )}
                {line.status === "COMPLETED" && (
                  <span className="text-xs text-on-surface/30 font-label uppercase tracking-widest py-2">완료됨</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 푸터 빠른 액션 */}
      <div className="flex gap-2 pt-2">
        <button className="flex-1 bg-surface-container py-3 text-xs font-label uppercase tracking-widest text-on-surface/60 border border-outline-variant/20">
          라벨 스캔
        </button>
        <button className="flex-1 bg-surface-container py-3 text-xs font-label uppercase tracking-widest text-on-surface/60 border border-outline-variant/20">
          큐 (3)
        </button>
      </div>
    </div>
  );
}
