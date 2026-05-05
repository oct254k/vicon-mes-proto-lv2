"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const PLANTS = [
  { code: "P1100", name: "제1-1 이천공장", product: "보데크",     address: "경기도 이천시 모가면 전상미로 1531", contact: "031-633-XXXX", status: "운영중" },
  { code: "P1200", name: "제1-2 이천공장", product: "알루미늄폼", address: "경기도 이천시 모가면 전상미로 1531", contact: "031-633-XXXX", status: "운영중" },
  { code: "P2000", name: "제2 이천공장",   product: "알루미늄폼", address: "경기도 이천시 모가면 대월로 106",   contact: "031-644-XXXX", status: "운영중" },
  { code: "P3000", name: "제3 이천공장",   product: "데크",       address: "경기도 이천시 설성면 원설로 220",  contact: "031-645-XXXX", status: "운영중" },
  { code: "P4000", name: "제4 안성공장",   product: "가설재",     address: "경기도 안성시 일죽면 일생로 138",  contact: "031-676-XXXX", status: "운영중" },
];

const COLUMNS = [
  { key: "code",    label: "코드" },
  { key: "name",    label: "이름" },
  { key: "product", label: "생산품" },
  { key: "address", label: "주소" },
  { key: "contact", label: "연락처" },
  { key: "status",  label: "상태" },
];

export default function PlantListPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="Plant 목록"
        nodeRef="SCR-BD-001"
        description="전사 공장(Plant) 등록·수정·비활성 관리"
      />
      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 신규 등록
        </button>
      </div>
      <FieldHeader title="Plant 마스터" moduleRef="BD-PLANT" />
      <DataTable
        title="Plant 목록"
        columns={COLUMNS}
        data={PLANTS}
        bufferCount={PLANTS.length}
      />
    </div>
  );
}
