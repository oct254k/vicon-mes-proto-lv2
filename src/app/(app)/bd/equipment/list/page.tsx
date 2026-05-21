"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const EQUIPMENT = [
  { code: "EQP-P1-001", name: "롤 성형기 #1",    plant: "P1000", type: "성형", maker: "현대산업",  installDate: "2020-03-15", status: "가동중" },
  { code: "EQP-P1-002", name: "프레스 500T #1",  plant: "P1000", type: "프레스", maker: "삼화산업", installDate: "2019-07-10", status: "가동중" },
  { code: "EQP-P1-003", name: "용접 자동화 라인", plant: "P1000", type: "용접", maker: "현대로보틱스", installDate: "2021-11-20", status: "가동중" },
  { code: "EQP-P2-001", name: "CNC 밴딩기 #1",   plant: "P2000", type: "벤딩", maker: "트럼프",     installDate: "2022-04-01", status: "가동중" },
  { code: "EQP-P2-002", name: "플라즈마 커터",    plant: "P2000", type: "절단", maker: "하이퍼썸",  installDate: "2021-06-15", status: "유휴" },
  { code: "EQP-P3-001", name: "천장 크레인 30T",  plant: "P3000", type: "운반", maker: "삼성중공업", installDate: "2018-09-01", status: "가동중" },
  { code: "EQP-P1-004", name: "쇼트 블라스터",    plant: "P1000", type: "도장전처리", maker: "파나소닉", installDate: "2020-12-10", status: "정지" },
];

const PLANTS = ["전체", "P1000", "P2000", "P3000"];

const COLUMNS = [
  { key: "code",        label: "설비 코드" },
  { key: "name",        label: "설비명" },
  { key: "plant",       label: "Plant" },
  { key: "type",        label: "유형" },
  { key: "maker",       label: "제조사" },
  { key: "installDate", label: "설치일" },
  { key: "status",      label: "상태" },
];

export default function EquipmentListPage() {
  const [plant, setPlant] = useState("전체");
  const filtered = EQUIPMENT.filter((e) => plant === "전체" || e.plant === plant);

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="설비 목록"
        nodeRef="SCR-BD-080"
        description="설비 마스터 등록·수정·상태 관리"
      />
      <FieldHeader title="Equipment 마스터" moduleRef="BD-EQUIPMENT" />
      <div className="flex gap-3 mb-4 items-end">
        <select
          value={plant}
          onChange={(e) => setPlant(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
        >
          {PLANTS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">{filtered.length}건</span>
      </div>
      <DataTable title="설비 목록" columns={COLUMNS} data={filtered} bufferCount={filtered.length} />
    </div>
  );
}
