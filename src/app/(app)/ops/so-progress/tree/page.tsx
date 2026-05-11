"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const TREE = [
  { so: "SO-2026-0301", customer: "(주)현대건설", site: "힐스테이트 일산", dong: "101동", member: "B01-101-G22C-C-171", process: "용접", progress: "IN_PROGRESS", dday: 5 },
  { so: "SO-2026-0301", customer: "(주)현대건설", site: "힐스테이트 일산", dong: "101동", member: "B01-101-G22C-C-172", process: "천공",  progress: "DONE",        dday: 5 },
  { so: "SO-2026-0301", customer: "(주)현대건설", site: "힐스테이트 일산", dong: "102동", member: "B01-102-G22C-C-201", process: "절단",  progress: "DONE",        dday: 5 },
  { so: "SO-2026-0259", customer: "DL이앤씨",    site: "e편한세상 용인",  dong: "201동", member: "B02-201-G22C-C-301", process: "조립",  progress: "FAILED",      dday: 3 },
];

const PROG_COLOR: Record<string, string> = {
  DONE: "text-primary-accent", IN_PROGRESS: "text-[#f59e0b]", FAILED: "text-error", PENDING: "text-on-surface-variant",
};

const HEADERS = ["수주번호","거래처","현장명","동","부재ID","현공정","진행상태","D-day"];

export default function SOProgressTreePage() {
  const [filter, setFilter] = useState("");
  const rows = TREE.filter(r => !filter || r.so.includes(filter) || r.site.includes(filter));

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="수주→부재 트리" nodeRef="FNC-OPS-050~053" description="수주·현장·동·부재 단계별 공정 진척 · 5분 갱신" />

      <div className="flex items-center gap-3 mb-4">
        <input value={filter} onChange={e => setFilter(e.target.value)}
          placeholder="수주번호 / 현장명 검색..."
          className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label w-64" />
        <span className="text-xs font-label text-on-surface-variant">{rows.length}건</span>
      </div>

      <div className="bg-surface-container">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
          <p className="font-headline font-black text-sm uppercase tracking-widest">수주→부재 진척 트리 | Buffer: {String(rows.length).padStart(3,"0")} Entries</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {HEADERS.map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                  <td className="px-4 py-2 text-primary-accent">{r.so}</td>
                  <td className="px-4 py-2">{r.customer}</td>
                  <td className="px-4 py-2">{r.site}</td>
                  <td className="px-4 py-2">{r.dong}</td>
                  <td className="px-4 py-2 font-label text-on-surface-variant">{r.member}</td>
                  <td className="px-4 py-2">{r.process}</td>
                  <td className={`px-4 py-2 font-label text-xs font-bold ${PROG_COLOR[r.progress] ?? ""}`}>{r.progress}</td>
                  <td className={`px-4 py-2 tabular-nums ${r.dday<=3?"text-error":r.dday<=7?"text-[#f59e0b]":""}`}>D-{r.dday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-4 text-xs font-label mt-4">
        <span className="text-primary-accent">● DONE</span>
        <span className="text-[#f59e0b]">● IN_PROGRESS</span>
        <span className="text-error">● FAILED</span>
      </div>
    </div>
  );
}
