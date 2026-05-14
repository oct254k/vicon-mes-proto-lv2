"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

interface WORow {
  woId: string;
  soId: string;
  totalMembers: number;
  done: number;
  remain: number;
  rate: number;
  dueDate: string;
  status: "IN_PROGRESS" | "DONE" | "DELAYED";
}

const WO_ROWS: WORow[] = [
  { woId: "WO-P3000-0007", soId: "SO-2026-0123", totalMembers: 120, done: 94, remain: 26, rate: 78, dueDate: "2026-05-08", status: "IN_PROGRESS" },
  { woId: "WO-P3000-0008", soId: "SO-2026-0124", totalMembers: 80, done: 92, remain: 0, rate: 115, dueDate: "2026-05-10", status: "DONE" },
  { woId: "WO-P3000-0009", soId: "SO-2026-0125", totalMembers: 150, done: 45, remain: 105, rate: 30, dueDate: "2026-05-09", status: "DELAYED" },
  { woId: "WO-P3000-0010", soId: "SO-2026-0130", totalMembers: 200, done: 30, remain: 170, rate: 15, dueDate: "2026-05-12", status: "DELAYED" },
  { woId: "WO-P3000-0011", soId: "SO-2026-0145", totalMembers: 60, done: 58, remain: 2, rate: 97, dueDate: "2026-05-07", status: "IN_PROGRESS" },
];

const STATUS_STYLE: Record<string, string> = {
  IN_PROGRESS: "bg-tertiary/20 text-tertiary",
  DONE: "bg-primary-accent/20 text-primary-accent",
  DELAYED: "bg-error/20 text-error",
};

const STATUS_LABEL: Record<string, string> = {
  IN_PROGRESS: "진행중",
  DONE: "완료",
  DELAYED: "지연",
};

function ProgressBar({ rate }: { rate: number }) {
  const capped = Math.min(rate, 100);
  const color = rate >= 80 ? "bg-primary-accent/60" : rate >= 50 ? "bg-warning/60" : "bg-error/60";
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-surface-container-highest">
        <div className={`h-2 ${color}`} style={{ width: `${capped}%` }} />
      </div>
      <span className="text-xs tabular-nums font-black w-10 text-right text-on-surface">{rate}%</span>
    </div>
  );
}

export default function OPSWoProgressPage() {
  const [filterPlant, setFilterPlant] = useState("P3000");
  const [filterStatus, setFilterStatus] = useState("전체");

  const filtered = filterStatus === "전체" ? WO_ROWS : WO_ROWS.filter((r) => r.status === filterStatus);

  return (
    <div className="p-6 bg-surface min-h-screen">
      <PageHeader
        title="WO·부재 진척"
        accent="WO BOARD"
        nodeRef="SCR-OPS-050"
        description="작업지시 단위 계획 vs 진척 보드 · 60초 자동 갱신"
      />

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <select
          value={filterPlant}
          onChange={(e) => setFilterPlant(e.target.value)}
          className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label"
        >
          <option value="P1000">P1000</option>
          <option value="P2000">P2000</option>
          <option value="P3000">P3000</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label"
        >
          <option value="전체">상태 전체</option>
          <option value="IN_PROGRESS">진행중</option>
          <option value="DONE">완료</option>
          <option value="DELAYED">지연</option>
        </select>
        <span className="text-xs font-label text-on-surface-variant ml-auto">마지막 갱신 14:32 ⟳ 60초</span>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <FieldHeader title="WO 진척 목록" moduleRef="FNC-OPS-060" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["WO ID", "수주번호", "총 부재", "완료", "잔여", "진척률", "예상 납기", "상태"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filtered.map((row) => (
                <tr key={row.woId} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-primary-accent font-black tabular-nums">{row.woId}</td>
                  <td className="px-4 py-2 tabular-nums">{row.soId}</td>
                  <td className="px-4 py-2 tabular-nums">{row.totalMembers}</td>
                  <td className="px-4 py-2 tabular-nums">{row.done}</td>
                  <td className={`px-4 py-2 tabular-nums ${row.remain > 50 ? "text-error" : ""}`}>{row.remain}</td>
                  <td className="px-4 py-2">
                    <ProgressBar rate={row.rate} />
                  </td>
                  <td className="px-4 py-2 tabular-nums text-on-surface-variant">{row.dueDate}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs font-label uppercase ${STATUS_STYLE[row.status]}`}>
                      {STATUS_LABEL[row.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
