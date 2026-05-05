"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const TABS = ["기준정보", "생산실적", "원자재", "통계"] as const;
type Tab = (typeof TABS)[number];

const CODE_DATA: Record<Tab, { group: string; value: string; label: string; sort: number; active: boolean }[]> = {
  기준정보: [
    { group: "WO_STATUS", value: "PLANNED", label: "계획됨", sort: 1, active: true },
    { group: "WO_STATUS", value: "RELEASED", label: "릴리즈", sort: 2, active: true },
    { group: "UNIT", value: "EA", label: "개", sort: 1, active: true },
    { group: "UNIT", value: "KG", label: "킬로그램", sort: 2, active: true },
    { group: "SHIFT", value: "D", label: "주간", sort: 1, active: true },
  ],
  생산실적: [
    { group: "QC_STATUS", value: "PASS", label: "합격", sort: 1, active: true },
    { group: "QC_STATUS", value: "FAIL", label: "불합격", sort: 2, active: true },
    { group: "QC_STATUS", value: "HOLD", label: "보류", sort: 3, active: true },
    { group: "CURRENCY", value: "KRW", label: "원화", sort: 1, active: true },
    { group: "CURRENCY", value: "USD", label: "달러", sort: 2, active: false },
  ],
  원자재: [
    { group: "DEVICE_TYPE", value: "T1", label: "자사 단말", sort: 1, active: true },
    { group: "DEVICE_TYPE", value: "T2", label: "BYOD", sort: 2, active: true },
    { group: "DEVICE_TYPE", value: "T3", label: "외부 단말", sort: 3, active: false },
    { group: "UNIT", value: "TON", label: "톤", sort: 3, active: true },
  ],
  통계: [
    { group: "RPT_PERIOD", value: "DAILY", label: "일간", sort: 1, active: true },
    { group: "RPT_PERIOD", value: "WEEKLY", label: "주간", sort: 2, active: true },
    { group: "RPT_PERIOD", value: "MONTHLY", label: "월간", sort: 3, active: true },
    { group: "RPT_TYPE", value: "PROD", label: "생산", sort: 1, active: true },
  ],
};

const RESERVED = ["WO_STATUS", "QC_STATUS", "DEVICE_TYPE", "SHIFT", "UNIT", "CURRENCY"];

export default function SYSCodesPage() {
  const [tab, setTab] = useState<Tab>("기준정보");

  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="시스템 코드" accent="마스터" nodeRef="SCR-SYS-030" description="4 DB 카테고리별 공통 코드 관리 (시스템 예약 코드 보호)" />

      <div className="flex gap-0 mb-6">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 text-xs font-label uppercase tracking-widest transition-colors ${tab === t ? "bg-[#00912F] text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-3">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white hover:bg-[#00912F]/80 transition-colors">
          + 코드 추가
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">코드 목록 — {tab}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["코드 그룹", "코드 값", "코드 명", "정렬", "활성"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {CODE_DATA[tab].map((row, i) => {
                const isReserved = RESERVED.includes(row.group);
                return (
                  <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 flex items-center gap-2">
                      <span className="font-label text-xs text-[#00912F]">{row.group}</span>
                      {isReserved && <span className="text-[10px] text-on-surface-variant opacity-50 material-symbols-outlined" style={{ fontSize: 12 }}>lock</span>}
                    </td>
                    <td className="px-4 py-2 tabular-nums">{row.value}</td>
                    <td className="px-4 py-2 text-on-surface-variant">{row.label}</td>
                    <td className="px-4 py-2 tabular-nums text-on-surface-variant">{row.sort}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 text-xs font-label uppercase ${row.active ? "bg-[#00912F]/20 text-[#00912F]" : "bg-surface-container-high text-on-surface-variant opacity-40"}`}>
                        {row.active ? "Y" : "N"}
                      </span>
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
