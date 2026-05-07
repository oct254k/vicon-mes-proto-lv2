"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const SUPPLIERS = [
  { code: "SUP-001", name: "현대제철",     type: "철강",   contact: "02-3464-5000", country: "KR", grade: "A", status: "Active" },
  { code: "SUP-002", name: "포스코",       type: "철강",   contact: "054-220-0114", country: "KR", grade: "A", status: "Active" },
  { code: "SUP-003", name: "동국제강",     type: "철강",   contact: "02-317-1000",  country: "KR", grade: "B", status: "Active" },
  { code: "SUP-004", name: "세아제강",     type: "강관",   contact: "02-3459-3114", country: "KR", grade: "B", status: "Active" },
  { code: "SUP-005", name: "케이에스텍",   type: "볼트",   contact: "031-498-1200", country: "KR", grade: "C", status: "Active" },
  { code: "SUP-006", name: "한국스틸",     type: "철강",   contact: "051-831-9000", country: "KR", grade: "B", status: "Inactive" },
  { code: "SUP-007", name: "Nippon Steel", type: "철강",   contact: "+81-3-6867-4111", country: "JP", grade: "A", status: "Active" },
];

const COLUMNS = [
  { key: "code",    label: "공급사 코드" },
  { key: "name",    label: "공급사명" },
  { key: "type",    label: "유형" },
  { key: "contact", label: "대표 연락처" },
  { key: "country", label: "국가" },
  { key: "grade",   label: "등급" },
  { key: "status",  label: "상태" },
];

export default function SupplierListPage() {
  const [q, setQ] = useState("");
  const filtered = SUPPLIERS.filter(
    (s) => q === "" || s.name.includes(q) || s.code.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공급사 목록"
        nodeRef="SCR-BD-070"
        description="공급사 마스터 등록·수정·거래 상태 관리"
      />
      <FieldHeader title="공급사 마스터" moduleRef="BD-SUPPLIER" />
      <div className="flex gap-3 mb-4 items-end">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="공급사명 / 코드 검색"
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm w-64"
        />
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">{filtered.length}건</span>
      </div>
      <DataTable title="공급사 목록" columns={COLUMNS} data={filtered} bufferCount={filtered.length} />
    </div>
  );
}
