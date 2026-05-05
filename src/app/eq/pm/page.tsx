"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type PMStatus = "SCHEDULED" | "IN_PROGRESS" | "DONE";

const PM_LIST = [
  { no: "PM-2026-001", equip: "EQ-P3000-CUT-01", type: "예방",  date: "2026-05-10", assignee: "김민준", status: "SCHEDULED"   as PMStatus },
  { no: "PM-2026-002", equip: "EQ-P3000-WLD-01", type: "계획",  date: "2026-05-08", assignee: "이서연", status: "IN_PROGRESS" as PMStatus },
  { no: "PM-2026-003", equip: "EQ-P2000-PNT-02", type: "예방",  date: "2026-05-06", assignee: "박지호", status: "DONE"        as PMStatus },
  { no: "PM-2026-004", equip: "EQ-P1000-ASM-01", type: "예방",  date: "2026-05-20", assignee: "최예린", status: "SCHEDULED"   as PMStatus },
  { no: "PM-2026-005", equip: "EQ-P1000-INS-01", type: "계획",  date: "2026-05-25", assignee: "한동훈", status: "SCHEDULED"   as PMStatus },
];

const STATUS_MAP: Record<PMStatus, { type: "running" | "idle" | "stopped"; label: string }> = {
  SCHEDULED:   { type: "idle",    label: "예정"    },
  IN_PROGRESS: { type: "running", label: "진행 중" },
  DONE:        { type: "stopped", label: "완료"    },
};

const SUMMARY = [
  { label: "전체",   count: PM_LIST.length,                                       color: "text-on-surface"    },
  { label: "예정",   count: PM_LIST.filter((p) => p.status === "SCHEDULED").length,   color: "text-[#f59e0b]"  },
  { label: "진행 중", count: PM_LIST.filter((p) => p.status === "IN_PROGRESS").length, color: "text-primary-accent" },
  { label: "완료",   count: PM_LIST.filter((p) => p.status === "DONE").length,         color: "text-tertiary"   },
];

export default function EQPmPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="설비관리 /"
        accent="PM 일정 목록"
        nodeRef="SCR-EQ-050"
        description="예방·계획 정비 일정 관리"
      />

      {/* 요약 KPI */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {SUMMARY.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest border border-outline-variant/10 p-4 text-center">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{s.label}</p>
            <p className={`font-headline font-black text-2xl tabular-nums ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 신규 PM
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            PM 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(PM_LIST.length).padStart(3, "0")} Entries</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["PM 번호", "설비", "PM 유형", "예정일", "담당자", "상태"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {PM_LIST.map((pm, i) => {
                const s = STATUS_MAP[pm.status];
                return (
                  <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 text-xs tabular-nums text-primary-accent font-bold">{pm.no}</td>
                    <td className="px-4 py-2 text-xs">{pm.equip}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-0.5 text-xs font-label uppercase bg-surface-container-high text-on-surface/60">{pm.type}</span>
                    </td>
                    <td className="px-4 py-2 text-xs tabular-nums">{pm.date}</td>
                    <td className="px-4 py-2">{pm.assignee}</td>
                    <td className="px-4 py-2">
                      <StatusBadge type={s.type} label={s.label} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
