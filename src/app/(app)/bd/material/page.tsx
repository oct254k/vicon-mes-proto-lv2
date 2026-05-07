"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const ALL_MATERIALS = [
  { code: "M-COIL-A",     name: "코일 A",        spec: "SS400 t3.2×W1219",  uom: "m",   category: "M-COIL",   status: "Active" },
  { code: "M-COIL-B",     name: "코일 B",        spec: "SS275 t2.3×W914",   uom: "m",   category: "M-COIL",   status: "Active" },
  { code: "M-WIRE-12",    name: "와이어 12mm",    spec: "φ12 SWRH82B",       uom: "kg",  category: "M-WIRE",   status: "Active" },
  { code: "M-PLATE-SS400",name: "후판 SS400",     spec: "SS400 t9×W1500",    uom: "ea",  category: "M-PLATE",  status: "Active" },
  { code: "M-COIL-HDG",   name: "용융아연도금 코일", spec: "SGHC t1.6×W914",  uom: "m",   category: "M-COIL",   status: "Active" },
  { code: "M-BOLT-M16",   name: "볼트 M16×50",   spec: "M16×50 8T ZN",      uom: "ea",  category: "M-BOLT",   status: "Inactive" },
];

const CATEGORIES = ["전체", "M-COIL", "M-WIRE", "M-PLATE", "M-BOLT"];

const COLUMNS = [
  { key: "code",     label: "코드" },
  { key: "name",     label: "명칭" },
  { key: "spec",     label: "규격" },
  { key: "uom",      label: "단위" },
  { key: "category", label: "분류" },
  { key: "status",   label: "상태" },
];

export default function BDMaterialPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("전체");
  const [showDrawer, setShowDrawer] = useState(false);

  const filtered = ALL_MATERIALS.filter((m) => {
    const matchCat = category === "전체" || m.category === category;
    const matchQ = q === "" || m.code.toLowerCase().includes(q.toLowerCase()) || m.name.includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="p-8 relative">
      <PageHeader
        title="기준정보 /"
        accent="Material 마스터"
        nodeRef="SCR-BD-010"
        description="자재 등록·수정·비활성 및 분류 prefix 필터"
      />

      {/* 상단 액션 */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowDrawer(true)}
          className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider"
        >
          + 신규 등록
        </button>
        <a
          href="/bd/material/history"
          className="border border-outline-variant/30 text-on-surface/70 px-4 py-2 text-sm hover:bg-surface-container transition-colors font-label uppercase tracking-wider"
        >
          변경 이력
        </a>
      </div>

      {/* 필터바 */}
      <div className="flex gap-3 mb-4 flex-wrap items-end">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="코드 / 명칭 검색"
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm w-64"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">
          {filtered.length}건
        </span>
      </div>

      <DataTable
        title="Material 목록"
        columns={COLUMNS}
        data={filtered}
        bufferCount={filtered.length}
      />

      {/* 신규 등록 드로어 */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-black/50 flex-1" onClick={() => setShowDrawer(false)} />
          <aside className="w-[420px] bg-surface-container h-full p-8 overflow-y-auto border-l border-outline-variant/20">
            <h2 className="font-headline font-black text-sm uppercase tracking-widest mb-8 text-primary-accent">
              Material 등록
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                코드 (예: M-COIL-X)
                <input placeholder="M-COIL-C" className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                명칭
                <input placeholder="코일 C" className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                분류 prefix
                <select className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface">
                  {CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                규격
                <input placeholder="SS400 t3.2×W1219" className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                단위 (UOM)
                <select className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface">
                  {["m", "ea", "kg"].map((u) => <option key={u}>{u}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
                등록 사유
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
