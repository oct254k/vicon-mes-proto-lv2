"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const DEFECTS = [
  { code: "DFT-DIM-001", category: "치수 불량", name: "길이 초과",      severity: "Major",  status: "Active" },
  { code: "DFT-DIM-002", category: "치수 불량", name: "두께 미달",      severity: "Major",  status: "Active" },
  { code: "DFT-DIM-003", category: "치수 불량", name: "직각도 벗어남",   severity: "Minor",  status: "Active" },
  { code: "DFT-WLD-001", category: "용접 불량", name: "기공(Porosity)", severity: "Critical", status: "Active" },
  { code: "DFT-WLD-002", category: "용접 불량", name: "언더컷",          severity: "Major",  status: "Active" },
  { code: "DFT-EXT-001", category: "외관 불량", name: "스크래치",        severity: "Minor",  status: "Active" },
  { code: "DFT-EXT-002", category: "외관 불량", name: "녹(발청)",        severity: "Major",  status: "Active" },
  { code: "DFT-MAT-001", category: "재료 불량", name: "재질 부적합",      severity: "Critical", status: "Active" },
];

const CATEGORIES = ["전체", "치수 불량", "용접 불량", "외관 불량", "재료 불량", "도장 불량", "기타"];

const COLUMNS = [
  { key: "code",     label: "불량 코드" },
  { key: "category", label: "카테고리" },
  { key: "name",     label: "불량 명칭" },
  { key: "severity", label: "심각도" },
  { key: "status",   label: "상태" },
];

export default function DefectTypeListPage() {
  const [cat, setCat] = useState("전체");
  const filtered = DEFECTS.filter((d) => cat === "전체" || d.category === cat);

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="불량항목 목록"
        nodeRef="SCR-BD-100"
        description="카테고리별 불량 유형 등록·수정·비활성"
      />
      <FieldHeader title="불량항목 마스터" moduleRef="BD-DEFECT-TYPE" />
      <div className="flex gap-3 mb-4 items-end">
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">{filtered.length}건</span>
      </div>
      <DataTable title="불량항목 목록" columns={COLUMNS} data={filtered} bufferCount={filtered.length} />
    </div>
  );
}
