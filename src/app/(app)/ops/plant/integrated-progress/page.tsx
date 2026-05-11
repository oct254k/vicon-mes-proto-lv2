"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const ALL_DATA = [
  { mfgNo: "MFG-2026-0301", site: "힐스테이트 일산", dong: "101동", step: "용접", rate: 78, status: "진행" },
  { mfgNo: "MFG-2026-0301", site: "힐스테이트 일산", dong: "102동", step: "검사", rate: 95, status: "진행" },
  { mfgNo: "MFG-2026-0259", site: "e편한세상 용인",  dong: "201동", step: "조립", rate: 35, status: "지연" },
  { mfgNo: "MFG-2026-0287", site: "자이 세종",       dong: "A동",   step: "도장", rate: 90, status: "정상" },
  { mfgNo: "MFG-2026-0241", site: "롯데캐슬 동탄",   dong: "1단지", step: "출하", rate: 99, status: "출하임박" },
];

const COLS = [
  { key: "mfgNo",  label: "제작번호" },
  { key: "site",   label: "현장명" },
  { key: "dong",   label: "동" },
  { key: "step",   label: "현공정" },
  { key: "rate",   label: "진척률" },
  { key: "status", label: "상태" },
];

export default function PlantIntegratedProgressPage() {
  const [query, setQuery] = useState("");
  const filtered = ALL_DATA.filter(r =>
    !query || r.mfgNo.includes(query) || r.site.includes(query)
  );
  const data = filtered.map(r => ({ ...r, rate: `${r.rate}%` }));

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="통합 진척 조회" nodeRef="FNC-OPS-029" description="제작번호·현장명 통합 조회 · 이벤트 갱신" />

      {/* 검색 */}
      <div className="flex items-center gap-3 mb-5">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="제작번호 / 현장명 검색..."
          className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label w-72"
        />
        <button className="bg-primary-accent text-surface text-xs font-label px-4 py-2 font-bold uppercase tracking-widest">
          조회
        </button>
        <span className="text-xs font-label text-on-surface-variant">{filtered.length}건 검색됨</span>
      </div>

      {/* 상태 요약 */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[["전체",filtered.length,"text-on-surface"],["지연",filtered.filter(r=>r.status==="지연").length,"text-error"],["출하임박",filtered.filter(r=>r.status==="출하임박").length,"text-[#f59e0b]"],["정상",filtered.filter(r=>r.status==="정상"||r.status==="진행").length,"text-primary-accent"]].map(([l,v,c])=>(
          <div key={l as string} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{l}</p>
            <p className={`text-2xl font-black tabular-nums ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <DataTable title="통합 진척 DataTable" bufferCount={data.length} columns={COLS} data={data} />
    </div>
  );
}
