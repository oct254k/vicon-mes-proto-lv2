"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MATERIALS = [
  "H형강 300×150",
  "각관 100×100×4.5",
  "판재 SS400 6T",
  "C형강 200×75",
  "H형강 400×200",
];

const SUPPLIER_DB: Record<string, Array<{
  rank: number;
  name: string;
  grade: "A" | "B" | "C";
  leadDays: number;
  unitPrice: string;
  onTimeRate: string;
}>> = {
  "H형강 300×150": [
    { rank: 1, name: "(주)한국강재", grade: "A", leadDays: 7, unitPrice: "₩48,500/ea", onTimeRate: "98%" },
    { rank: 2, name: "삼양스틸", grade: "A", leadDays: 10, unitPrice: "₩46,000/ea", onTimeRate: "95%" },
    { rank: 3, name: "동양특수강", grade: "B", leadDays: 12, unitPrice: "₩44,200/ea", onTimeRate: "88%" },
  ],
  "각관 100×100×4.5": [
    { rank: 1, name: "삼양스틸", grade: "A", leadDays: 5, unitPrice: "₩12,800/ea", onTimeRate: "97%" },
    { rank: 2, name: "신흥금속(주)", grade: "B", leadDays: 8, unitPrice: "₩11,900/ea", onTimeRate: "91%" },
  ],
};

const GRADE_TYPE: Record<string, "running" | "warning" | "stopped"> = {
  A: "running",
  B: "warning",
  C: "stopped",
};

export default function PURSupplierPage() {
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [qty, setQty] = useState("10");
  const [searched, setSearched] = useState(false);

  const suppliers = SUPPLIER_DB[material] ?? [];

  function handleSearch() {
    setSearched(true);
  }

  return (
    <div>
      <PageHeader
        title="공급사"
        accent="자동 추천"
        nodeRef="SCR-PUR-004"
        status="PROTOTYPE"
        description="Material · 수량 기준 공급사 자동 추천 · PO 발행"
      />

      {/* 입력 */}
      <div className="bg-surface-container-lowest p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">Material</p>
            <select
              value={material}
              onChange={(e) => { setMaterial(e.target.value); setSearched(false); }}
              className="w-full bg-surface-container text-white text-sm px-4 py-3 border border-outline-variant/20 outline-none"
            >
              {MATERIALS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">수량 (ea)</p>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full bg-surface-container text-white text-sm px-4 py-3 border border-outline-variant/20 outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary-accent text-white py-3 px-6 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/90 transition-colors"
          >
            추천 조회
          </button>
        </div>
      </div>

      {/* 추천 카드 */}
      {searched && (
        <div>
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-4">
            추천 결과 — {material} × {qty}ea
          </p>
          {suppliers.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 text-center">
              <p className="text-xs font-label uppercase tracking-widest opacity-30">등록된 추천 공급사 없음</p>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {suppliers.map((s) => (
                <div
                  key={s.rank}
                  className={`bg-surface-container-lowest p-5 flex flex-wrap items-center gap-4 border-l-4 ${
                    s.rank === 1 ? "border-primary-accent" : "border-outline-variant/20"
                  }`}
                >
                  {/* 순위 */}
                  <div className="w-8 h-8 flex items-center justify-center bg-surface-container font-headline font-black text-sm">
                    {s.rank}
                  </div>
                  {/* 공급사명 + 등급 */}
                  <div className="flex-1 min-w-[140px]">
                    <p className="font-headline font-bold text-sm">{s.name}</p>
                    <div className="mt-1">
                      <StatusBadge type={GRADE_TYPE[s.grade]} label={`Grade ${s.grade}`} />
                    </div>
                  </div>
                  {/* 지표 */}
                  <div className="flex gap-6 text-xs">
                    <div>
                      <p className="opacity-40 mb-1">납기</p>
                      <p className="font-bold tabular-nums">{s.leadDays}일</p>
                    </div>
                    <div>
                      <p className="opacity-40 mb-1">단가</p>
                      <p className="font-bold tabular-nums">{s.unitPrice}</p>
                    </div>
                    <div>
                      <p className="opacity-40 mb-1">납기 준수율</p>
                      <p className="font-bold tabular-nums">{s.onTimeRate}</p>
                    </div>
                  </div>
                  {/* PO 발행 */}
                  <button className="bg-primary-accent text-white px-5 py-2 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/90 transition-colors">
                    PO 발행
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
