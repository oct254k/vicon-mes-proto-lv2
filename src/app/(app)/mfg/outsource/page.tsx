"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

type OutsourceStatus = "SENT" | "IN_PROCESS" | "RECEIVED";

interface OutsourceRow {
  vendor: string;
  woId: string;
  count: number;
  orderedAt: string;
  dueAt: string;
  status: OutsourceStatus;
}

const STATUS_STYLE: Record<OutsourceStatus, string> = {
  SENT: "bg-warning/20 text-warning",
  IN_PROCESS: "bg-[#3b82f6]/20 text-[#3b82f6]",
  RECEIVED: "bg-primary-accent/20 text-primary-accent",
};

const MOCK_DATA: OutsourceRow[] = [
  { vendor: "(주)한국도장",   woId: "WO-2026-0182", count: 24, orderedAt: "2026-04-28", dueAt: "2026-05-07", status: "IN_PROCESS" },
  { vendor: "(주)대한용접",   woId: "WO-2026-0179", count: 8,  orderedAt: "2026-04-25", dueAt: "2026-05-05", status: "SENT" },
  { vendor: "광명열처리",     woId: "WO-2026-0175", count: 16, orderedAt: "2026-04-20", dueAt: "2026-05-02", status: "RECEIVED" },
  { vendor: "(주)한국도장",   woId: "WO-2026-0168", count: 32, orderedAt: "2026-04-15", dueAt: "2026-04-30", status: "RECEIVED" },
  { vendor: "성일CNC가공",    woId: "WO-2026-0190", count: 6,  orderedAt: "2026-05-01", dueAt: "2026-05-12", status: "SENT" },
];

const COLUMNS = [
  { key: "vendor",    label: "외주처" },
  { key: "woId",     label: "WO ID" },
  { key: "count",    label: "부재 수" },
  { key: "orderedAt",label: "발주일" },
  { key: "dueAt",    label: "예정 납기" },
  { key: "statusEl", label: "상태" },
];

export default function MFGOutsourcePage() {
  const [modal, setModal] = useState<"out" | "in" | null>(null);

  const sentCount     = MOCK_DATA.filter((r) => r.status === "SENT").length;
  const inProcessCount = MOCK_DATA.filter((r) => r.status === "IN_PROCESS").length;
  const receivedCount = MOCK_DATA.filter((r) => r.status === "RECEIVED").length;

  return (
    <div className="px-4 py-6">
      <PageHeader
        title="외주 공정 현황"
        accent="OUTSOURCE"
        nodeRef="SCR-MFG-050"
        status="PROTOTYPE"
      />

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-low p-4 border-l-4 border-warning">
          <p className="font-label text-xs uppercase tracking-widest text-warning mb-1">SENT</p>
          <p className="font-headline font-black text-2xl">{sentCount}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-[#3b82f6]">
          <p className="font-label text-xs uppercase tracking-widest text-[#3b82f6] mb-1">IN PROCESS</p>
          <p className="font-headline font-black text-2xl">{inProcessCount}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-primary-accent">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RECEIVED</p>
          <p className="font-headline font-black text-2xl">{receivedCount}</p>
        </div>
      </div>

      <FieldHeader title="외주 현황 목록" moduleRef="SCR-MFG-051" />
      <div className="bg-surface-container-lowest overflow-x-auto mb-6">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            OUTSOURCE ORDERS
            <span className="opacity-30 font-light ml-2">| Total: {MOCK_DATA.length}</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {MOCK_DATA.map((row, i) => (
              <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                <td className="px-4 py-2 font-bold">{row.vendor}</td>
                <td className="px-4 py-2 tabular-nums">{row.woId}</td>
                <td className="px-4 py-2 tabular-nums">{row.count}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface/70">{row.orderedAt}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface/70">{row.dueAt}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-label uppercase tracking-wider font-bold ${STATUS_STYLE[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FieldHeader title="외주 처리" moduleRef="SCR-MFG-052" />
      <div className="flex gap-3">
        <button
          className="flex-1 py-4 bg-surface-container border border-warning text-warning font-headline font-black uppercase tracking-widest text-sm"
          onClick={() => setModal("out")}
        >
          외주 출고
        </button>
        <button
          className="flex-1 py-4 bg-primary-accent text-on-primary font-headline font-black uppercase tracking-widest text-sm"
          onClick={() => setModal("in")}
        >
          외주 입고
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-surface-container-lowest border border-outline-variant/20 w-full max-w-sm p-6">
            <h3 className="font-headline font-black text-lg uppercase tracking-widest mb-4 text-primary-accent">
              {modal === "out" ? "외주 출고 처리" : "외주 입고 처리"}
            </h3>
            <p className="text-sm text-on-surface/60 font-body mb-6">
              {modal === "out"
                ? "외주처로 출고할 WO 및 부재를 선택하고 출고 처리합니다."
                : "외주처로부터 입고된 부재를 확인하고 입고 처리합니다."}
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 bg-surface-container border border-outline-variant/30 font-label text-xs uppercase tracking-widest text-on-surface/60"
                onClick={() => setModal(null)}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 bg-primary-accent text-on-primary font-label text-xs uppercase tracking-widest font-bold"
                onClick={() => setModal(null)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
