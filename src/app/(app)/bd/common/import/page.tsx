"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MASTER_TYPES = ["Material", "Supplier", "Customer", "Equipment", "Workcenter", "Defect Type", "KS Cert"];

export default function CommonImportPage() {
  const [masterType, setMasterType] = useState("Material");
  const [fileName, setFileName] = useState("");

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="CSV Import"
        nodeRef="SCR-BD-121"
        description="마스터 종류 선택 후 CSV·Excel 파일 일괄 업로드"
      />
      <FieldHeader title="CSV / Excel Import" moduleRef="BD-COMMON-IMPORT" />
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
          파일 선택 (CSV / XLSX)
          <div className="bg-surface-container-lowest border-b-2 border-outline-variant px-3 py-2 text-sm text-on-surface/40 cursor-pointer hover:border-primary-accent transition-colors">
            {fileName || "파일을 선택하거나 드래그하세요"}
          </div>
          <input
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          중복 처리 정책
          <select className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface">
            <option>덮어쓰기 (Upsert)</option>
            <option>건너뜀 (Skip)</option>
            <option>오류 중단 (Abort)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-label uppercase tracking-wider text-on-surface/50">
          업로드 메모 (선택)
          <textarea
            rows={3}
            placeholder="업로드 목적 또는 변경 사유를 입력하세요"
            className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm text-on-surface resize-none"
          />
        </label>
        <div className="flex gap-3 mt-2">
          <button className="border border-outline-variant/30 text-on-surface/70 px-4 py-2 text-sm hover:bg-surface-container transition-colors flex-1">
            템플릿 다운로드
          </button>
          <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider flex-1">
            업로드 ▶
          </button>
        </div>
      </div>
    </div>
  );
}
