"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Grade = "A" | "B" | "C";
type Supplier = {
  code: string; name: string; grade: Grade;
  leadtime: number; defectRate: number; status: "running" | "idle" | "stopped";
};

const SUPPLIERS: Supplier[] = [
  { code: "SUP-001", name: "현대제철",     grade: "A", leadtime: 3,  defectRate: 0.12, status: "running" },
  { code: "SUP-002", name: "포스코",       grade: "A", leadtime: 4,  defectRate: 0.08, status: "running" },
  { code: "SUP-003", name: "KISCO",        grade: "B", leadtime: 7,  defectRate: 0.31, status: "running" },
  { code: "SUP-004", name: "동국제강",     grade: "B", leadtime: 5,  defectRate: 0.25, status: "idle"    },
  { code: "SUP-005", name: "세아베스틸",   grade: "C", leadtime: 10, defectRate: 0.58, status: "stopped" },
];

const GRADE_CLASS: Record<Grade, string> = {
  A: "text-primary-accent font-bold",
  B: "text-tertiary font-bold",
  C: "text-[#f59e0b] font-bold",
};

export default function BDSuppliersPage() {
  const [gradeFilter, setGradeFilter] = useState<"전체" | Grade>("전체");

  const filtered = SUPPLIERS.filter(
    (s) => gradeFilter === "전체" || s.grade === gradeFilter
  );

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공급사 마스터"
        nodeRef="SCR-BD-110"
        description="공급사 등록·등급·납기·불량률 관리"
      />

      {/* 등급 범례 */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest">
          <span className="w-3 h-3 bg-primary-accent" />
          <span className="text-on-surface/60">A — 우수</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest">
          <span className="w-3 h-3 bg-tertiary" />
          <span className="text-on-surface/60">B — 보통</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest">
          <span className="w-3 h-3 bg-[#f59e0b]" />
          <span className="text-on-surface/60">C — 관리 필요</span>
        </div>
      </div>

      <FieldHeader title="필터" moduleRef="SUPPLIER MASTER" />
      <div className="flex gap-3 mb-4">
        {(["전체", "A", "B", "C"] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGradeFilter(g)}
            className={`px-4 py-1.5 text-xs font-label uppercase tracking-wider transition-colors ${
              gradeFilter === g
                ? "bg-primary-accent text-white"
                : "bg-surface-container text-on-surface/60 hover:bg-surface-container-high/40"
            }`}
          >
            {g === "전체" ? "전체" : `Grade ${g}`}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 신규 등록
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            공급사 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(filtered.length).padStart(3, "0")} Entries</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["공급사 코드", "이름", "등급", "납기 평균(일)", "불량률(%)", "상태"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filtered.map((s, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-xs tabular-nums text-on-surface/60">{s.code}</td>
                  <td className="px-4 py-2 font-bold">{s.name}</td>
                  <td className={`px-4 py-2 text-sm ${GRADE_CLASS[s.grade]}`}>{s.grade}</td>
                  <td className="px-4 py-2 tabular-nums">{s.leadtime}</td>
                  <td className={`px-4 py-2 tabular-nums ${s.defectRate >= 0.5 ? "text-error" : s.defectRate >= 0.3 ? "text-[#f59e0b]" : "text-on-surface/80"}`}>
                    {s.defectRate.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge type={s.status} label={s.status === "running" ? "활성" : s.status === "idle" ? "대기" : "비활성"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
