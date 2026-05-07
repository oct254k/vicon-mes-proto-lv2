"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MASTER_TYPES = ["Material", "Supplier", "Customer", "Equipment", "Workcenter", "Defect Type", "KS Cert", "Plant", "Audit Log"];

export default function CommonExportPage() {
  const [masterType, setMasterType] = useState("Material");
  const [format, setFormat] = useState("CSV");

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="CSV Export"
        nodeRef="SCR-BD-122"
        description="마스터 종류·조건 선택 후 CSV·Excel 내보내기"
      />
      <FieldHeader title="CSV / Excel Export" moduleRef="BD-COMMON-EXPORT" />
      <div className="max-w-lg flex flex-col gap-6">
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          마스터 종류
          <select
            value={masterType}
            onChange={(e) => setMasterType(e.target.value)}
            className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface"
          >
            {MASTER_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          상태 필터
          <select className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface">
            <option>전체</option>
            <option>Active 만</option>
            <option>Inactive 만</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          기간 (변경일 기준, 선택)
          <div className="flex gap-2">
            <input
              type="date"
              defaultValue="2026-01-01"
              className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface flex-1"
            />
            <input
              type="date"
              defaultValue="2026-05-06"
              className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface flex-1"
            />
          </div>
        </label>
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          출력 포맷
          <div className="flex gap-3">
            {["CSV", "XLSX"].map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 text-sm font-label uppercase tracking-wider border transition-colors ${
                  format === f
                    ? "bg-primary-accent text-white border-primary-accent"
                    : "border-outline-variant/30 text-on-surface/70 hover:bg-surface-container"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </label>
        <div className="flex gap-3 mt-2">
          <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider flex-1">
            내보내기 ▶
          </button>
        </div>
      </div>
    </div>
  );
}
