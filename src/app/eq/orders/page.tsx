"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type MOType   = "BM" | "PM" | "PdM";
type MOStatus = "대기" | "진행" | "완료";

const MO_LIST = [
  { no: "MO-2026-001", equip: "EQ-P3000-WLD-02", type: "BM" as MOType, status: "진행" as MOStatus, assignee: "이서연", issued: "2026-05-05" },
  { no: "MO-2026-002", equip: "EQ-P3000-CUT-01", type: "PM" as MOType, status: "대기" as MOStatus, assignee: "김민준", issued: "2026-05-04" },
  { no: "MO-2026-003", equip: "EQ-P2000-PNT-01", type: "PM" as MOType, status: "완료" as MOStatus, assignee: "박지호", issued: "2026-04-28" },
  { no: "MO-2026-004", equip: "EQ-P1000-INS-01", type: "PdM" as MOType, status: "대기" as MOStatus, assignee: "최예린", issued: "2026-05-06" },
  { no: "MO-2026-005", equip: "EQ-P3000-WLD-01", type: "BM" as MOType, status: "완료" as MOStatus, assignee: "한동훈", issued: "2026-04-30" },
];

const STATUS_MAP: Record<MOStatus, { type: "running" | "idle" | "stopped" }> = {
  진행: { type: "running" },
  대기: { type: "idle"    },
  완료: { type: "stopped" },
};

const TYPE_CLASS: Record<MOType, string> = {
  BM:  "bg-error/20 text-error",
  PM:  "bg-primary-accent/20 text-primary-accent",
  PdM: "bg-tertiary/20 text-tertiary",
};

export default function EQOrdersPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="설비관리 /"
        accent="정비지시(MO) 목록"
        nodeRef="SCR-EQ-055"
        description="정비 작업지시 발행·현황 관리"
      />

      {/* 유형 범례 */}
      <div className="flex gap-4 mb-6">
        <span className="px-3 py-1 text-xs font-label uppercase font-bold bg-error/20 text-error">BM — 고장 정비</span>
        <span className="px-3 py-1 text-xs font-label uppercase font-bold bg-primary-accent/20 text-primary-accent">PM — 예방 정비</span>
        <span className="px-3 py-1 text-xs font-label uppercase font-bold bg-tertiary/20 text-tertiary">PdM — 예측 정비</span>
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 신규 MO
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            MO 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(MO_LIST.length).padStart(3, "0")} Entries</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["MO 번호", "설비", "유형", "상태", "담당자", "발행일"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {MO_LIST.map((mo, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-xs tabular-nums text-primary-accent font-bold">{mo.no}</td>
                  <td className="px-4 py-2 text-xs">{mo.equip}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs font-label uppercase font-bold ${TYPE_CLASS[mo.type]}`}>{mo.type}</span>
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge type={STATUS_MAP[mo.status].type} label={mo.status} />
                  </td>
                  <td className="px-4 py-2">{mo.assignee}</td>
                  <td className="px-4 py-2 text-xs tabular-nums">{mo.issued}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
