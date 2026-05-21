"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const ALL_MATERIALS = [
  { code: "M-COIL-A",      name: "코일 A",          spec: "SS400 t3.2×W1219", uom: "m",  category: "M-COIL",  status: "활성" },
  { code: "M-COIL-B",      name: "코일 B",          spec: "SS275 t2.3×W914",  uom: "m",  category: "M-COIL",  status: "활성" },
  { code: "M-COIL-HDG",    name: "용융아연도금 코일", spec: "SGHC t1.6×W914",  uom: "m",  category: "M-COIL",  status: "활성" },
  { code: "M-WIRE-12",     name: "와이어 12mm",      spec: "φ12 SWRH82B",     uom: "kg", category: "M-WIRE",  status: "활성" },
  { code: "M-PLATE-SS400", name: "후판 SS400",       spec: "SS400 t9×W1500",   uom: "ea", category: "M-PLATE", status: "활성" },
  { code: "M-BOLT-M16",    name: "볼트 M16×50",     spec: "M16×50 8T ZN",     uom: "ea", category: "M-BOLT",  status: "비활성" },
  { code: "M-COIL-C",      name: "코일 C (고장력)",  spec: "SAPH440 t2.0×W1219", uom: "m", category: "M-COIL", status: "활성" },
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

export default function MaterialListPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("전체");

  const filtered = ALL_MATERIALS.filter((m) => {
    const matchCat = category === "전체" || m.category === category;
    const matchQ = q === "" || m.code.toLowerCase().includes(q.toLowerCase()) || m.name.includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="Material 목록"
        nodeRef="SCR-BD-010"
        description="자재 등록·수정·비활성 및 분류 prefix 필터"
      />
      <FieldHeader title="Material 마스터" moduleRef="BD-MATERIAL" />
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
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">{filtered.length}건</span>
      </div>
      <DataTable title="Material 목록" columns={COLUMNS} data={filtered} bufferCount={filtered.length} />
    </div>
  );
}
