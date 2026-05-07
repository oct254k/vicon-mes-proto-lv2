"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type EqStatus = "running" | "idle" | "stopped" | "error";

type Equipment = {
  code: string; name: string; wc: string; plant: string;
  maker: string; installed: string; status: EqStatus;
};

const EQUIPMENT: Equipment[] = [
  { code: "EQ-P3000-CUT-01", name: "NC 절단기 #1",   wc: "WC-CUT",  plant: "P3000", maker: "한화정밀",  installed: "2020-03-15", status: "running" },
  { code: "EQ-P3000-CUT-02", name: "NC 절단기 #2",   wc: "WC-CUT",  plant: "P3000", maker: "한화정밀",  installed: "2021-07-20", status: "idle"    },
  { code: "EQ-P3000-WLD-01", name: "CO2 용접기 #1",  wc: "WC-WLD",  plant: "P3000", maker: "링컨일렉", installed: "2019-11-01", status: "running" },
  { code: "EQ-P3000-WLD-02", name: "CO2 용접기 #2",  wc: "WC-WLD",  plant: "P3000", maker: "링컨일렉", installed: "2022-02-28", status: "error"   },
  { code: "EQ-P2000-PNT-01", name: "도장 부스 #1",   wc: "WC-PNT",  plant: "P2000", maker: "진흥기업",  installed: "2018-06-10", status: "stopped" },
  { code: "EQ-P2000-PNT-02", name: "도장 부스 #2",   wc: "WC-PNT",  plant: "P2000", maker: "진흥기업",  installed: "2023-04-05", status: "running" },
  { code: "EQ-P1000-ASM-01", name: "조립 지그 #1",   wc: "WC-ASM",  plant: "P1000", maker: "신도산업",  installed: "2021-09-12", status: "running" },
  { code: "EQ-P1000-INS-01", name: "3D 측정기 CMM",  wc: "WC-INS",  plant: "P1000", maker: "Hexagon",  installed: "2023-12-01", status: "idle"    },
];

const STATUS_LABEL: Record<EqStatus, string> = {
  running: "가동 중",
  idle:    "대기",
  stopped: "정지",
  error:   "고장",
};

export default function BDEquipmentPage() {
  const counts = {
    total:   EQUIPMENT.length,
    running: EQUIPMENT.filter((e) => e.status === "running").length,
    idle:    EQUIPMENT.filter((e) => e.status === "idle").length,
    stopped: EQUIPMENT.filter((e) => e.status === "stopped").length,
    error:   EQUIPMENT.filter((e) => e.status === "error").length,
  };

  return (
    <div className="p-8">
      <PageHeader title="기준정보 /" accent="설비 마스터" nodeRef="SCR-BD-100" description="설비 등록·상태 현황 관리" />

      {/* KPI 카드 */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "전체",   value: counts.total,   color: "text-on-surface" },
          { label: "가동 중", value: counts.running,  color: "text-primary-accent" },
          { label: "점검 중", value: counts.idle,     color: "text-[#f59e0b]" },
          { label: "정지",   value: counts.stopped + counts.error, color: "text-error" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest border border-outline-variant/10 p-5">
            <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mb-2">{kpi.label}</p>
            <p className={`font-headline font-black text-3xl tabular-nums ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 설비 등록
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            설비 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(EQUIPMENT.length).padStart(3, "0")} Entries</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["설비 코드", "이름", "WC", "Plant", "제조사", "설치일", "상태"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {EQUIPMENT.map((e, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-xs tabular-nums font-bold text-primary-accent">{e.code}</td>
                  <td className="px-4 py-2">{e.name}</td>
                  <td className="px-4 py-2 text-xs text-on-surface/60">{e.wc}</td>
                  <td className="px-4 py-2 text-xs text-on-surface/60">{e.plant}</td>
                  <td className="px-4 py-2 text-xs">{e.maker}</td>
                  <td className="px-4 py-2 text-xs tabular-nums">{e.installed}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={e.status} label={STATUS_LABEL[e.status]} />
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
