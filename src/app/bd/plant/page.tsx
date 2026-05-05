"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const PLANTS = [
  { code: "P1100", name: "제1-1 이천공장", product: "보데크",     address: "경기도 이천시 모가면 전상미로 1531", status: "운영중" },
  { code: "P1200", name: "제1-2 이천공장", product: "알루미늄폼", address: "경기도 이천시 모가면 전상미로 1531", status: "운영중" },
  { code: "P2000", name: "제2 이천공장",   product: "알루미늄폼", address: "경기도 이천시 모가면 대월로 106",   status: "운영중" },
  { code: "P3000", name: "제3 이천공장",   product: "데크",       address: "경기도 이천시 설성면 원설로 220",  status: "운영중" },
  { code: "P4000", name: "제4 안성공장",   product: "가설재",     address: "경기도 안성시 일죽면 일생로 138",  status: "운영중" },
];

const COLUMNS = [
  { key: "code",    label: "공장코드" },
  { key: "name",    label: "공장명" },
  { key: "product", label: "생산품" },
  { key: "address", label: "주소" },
  { key: "status",  label: "상태" },
];

export default function BDPlantPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const filtered = PLANTS.filter((p) => {
    const matchQ = q === "" || p.code.includes(q) || p.name.includes(q);
    const matchS = statusFilter === "전체" || p.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="p-8 relative">
      <PageHeader
        title="기준정보 /"
        accent="Plant 마스터"
        nodeRef="SCR-BD-001"
        description="Plant 등록·수정·비활성 관리 화면"
      />

      {/* KPI 카드 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "전체",    value: "5개" },
          { label: "이천",    value: "4개 (P1100~P3000)" },
          { label: "안성",    value: "1개 (P4000)" },
          { label: "운영중",  value: "5개" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface-container-low p-4">
            <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">{label}</p>
            <p className="font-headline font-bold text-lg text-primary-accent">{value}</p>
          </div>
        ))}
      </div>

      {/* 상단 액션 */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowDrawer(true)}
          className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider"
        >
          + 신규 등록
        </button>
        <a
          href="/bd/plant/inventory-summary"
          className="border border-outline-variant/30 text-on-surface/70 px-4 py-2 text-sm hover:bg-surface-container transition-colors font-label uppercase tracking-wider"
        >
          전사 재고 집계 →
        </a>
      </div>

      {/* 검색·필터 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="코드 / 명칭 검색"
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
        >
          <option>전체</option>
          <option>운영중</option>
          <option>유지보수</option>
        </select>
      </div>

      <DataTable
        title="Plant 목록"
        columns={COLUMNS}
        data={filtered}
        bufferCount={filtered.length}
      />

      {/* 신규 등록 드로어 */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-black/50 flex-1" onClick={() => setShowDrawer(false)} />
          <aside className="w-96 bg-surface-container h-full p-8 overflow-y-auto border-l border-outline-variant/20">
            <h2 className="font-headline font-black text-sm uppercase tracking-widest mb-8 text-primary-accent">
              Plant 등록
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                코드 (P0000 형식)
                <input placeholder="P5000" className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                명칭
                <input placeholder="제5공장" className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                주소
                <input placeholder="경기도 ..." className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                사유
                <textarea rows={3} className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface resize-none" />
              </label>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowDrawer(false)} className="border border-outline-variant/30 text-on-surface/70 px-4 py-2 text-sm hover:bg-surface-container transition-colors flex-1">
                취소
              </button>
              <button onClick={() => setShowDrawer(false)} className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider flex-1">
                저장 ▶
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
