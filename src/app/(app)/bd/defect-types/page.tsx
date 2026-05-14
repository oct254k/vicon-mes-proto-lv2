"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CATEGORIES = ["절단", "용접", "도장", "조립", "검사", "운송"];

type Severity = "치명" | "중대" | "경미";
type DefectItem = { code: string; name: string; severity: Severity; process: string };

const DEFECTS: Record<string, DefectItem[]> = {
  절단: [
    { code: "DFC-CUT-001", name: "치수 불량",       severity: "치명", process: "절단" },
    { code: "DFC-CUT-002", name: "표면 긁힘",       severity: "경미", process: "절단" },
    { code: "DFC-CUT-003", name: "절단면 거칠기",   severity: "중대", process: "절단" },
  ],
  용접: [
    { code: "DFC-WLD-001", name: "기공(포로시티)",  severity: "치명", process: "용접" },
    { code: "DFC-WLD-002", name: "언더컷",          severity: "중대", process: "용접" },
    { code: "DFC-WLD-003", name: "용접 스패터",     severity: "경미", process: "용접" },
    { code: "DFC-WLD-004", name: "균열",            severity: "치명", process: "용접" },
  ],
  도장: [
    { code: "DFC-PNT-001", name: "도막 두께 불량",  severity: "중대", process: "도장" },
    { code: "DFC-PNT-002", name: "핀홀",            severity: "중대", process: "도장" },
    { code: "DFC-PNT-003", name: "색상 편차",       severity: "경미", process: "도장" },
  ],
  조립: [
    { code: "DFC-ASM-001", name: "볼트 토크 불량",  severity: "치명", process: "조립" },
    { code: "DFC-ASM-002", name: "부품 누락",       severity: "치명", process: "조립" },
    { code: "DFC-ASM-003", name: "끼움 공차 초과",  severity: "중대", process: "조립" },
  ],
  검사: [
    { code: "DFC-INS-001", name: "NDT 불합격",      severity: "치명", process: "검사" },
    { code: "DFC-INS-002", name: "치수 측정 오차",  severity: "중대", process: "검사" },
  ],
  운송: [
    { code: "DFC-TRP-001", name: "운송 중 변형",    severity: "중대", process: "운송" },
    { code: "DFC-TRP-002", name: "포장 불량",       severity: "경미", process: "운송" },
  ],
};

const SEVERITY_TYPE: Record<Severity, "error" | "warning" | "idle"> = {
  치명: "error",
  중대: "warning",
  경미: "idle",
};

export default function BDDefectTypesPage() {
  const [selected, setSelected] = useState("절단");

  const items = DEFECTS[selected] ?? [];

  return (
    <div className="p-8">
      <PageHeader title="기준정보 /" accent="불량항목 마스터" nodeRef="SCR-BD-090" description="불량 유형 카테고리별 항목 관리" />

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 신규 항목
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* 카테고리 목록 */}
        <aside className="col-span-3 bg-surface-container-lowest border border-outline">
          <FieldHeader title="카테고리" moduleRef="6개" />
          <ul>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelected(cat)}
                  className={`w-full text-left px-5 py-3 text-sm font-headline font-bold transition-colors border-l-4 ${
                    selected === cat
                      ? "border-primary-accent bg-primary-accent/10 text-primary-accent"
                      : "border-transparent hover:bg-surface-container-high/40 text-on-surface/70"
                  }`}
                >
                  {cat}
                  <span className="ml-2 text-xs opacity-50">({DEFECTS[cat]?.length ?? 0})</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* 불량 항목 테이블 */}
        <div className="col-span-9 bg-surface-container-lowest">
          <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest">
              {selected} 불량 항목{" "}
              <span className="opacity-30 font-light ml-2">| {items.length}건</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline">
                  {["코드", "불량명", "심각도", "적용 공정"].map((h) => (
                    <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-headline text-sm">
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 text-xs tabular-nums text-on-surface/60">{item.code}</td>
                    <td className="px-4 py-2 font-bold">{item.name}</td>
                    <td className="px-4 py-2">
                      <StatusBadge type={SEVERITY_TYPE[item.severity]} label={item.severity} />
                    </td>
                    <td className="px-4 py-2 text-xs text-on-surface/60">{item.process}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
