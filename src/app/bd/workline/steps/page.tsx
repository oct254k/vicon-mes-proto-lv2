"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { PROCESS_LINES } from "@/data/plants";

// 공정라인 드롭다운 옵션 (공장코드-라인명)
const LINE_OPTIONS = PROCESS_LINES.map((l) => ({
  key: l.lineCode,
  label: `${l.lineCode}  ${l.plantCode} — ${l.lineName}`,
}));

export default function WorklineStepsPage() {
  const [lineCode, setLineCode] = useState(PROCESS_LINES[0].lineCode);

  const selected = PROCESS_LINES.find((l) => l.lineCode === lineCode);
  const steps = selected?.steps ?? [];

  // DataTable 용 rows 변환
  const rows = steps.flatMap((step) =>
    step.operations.map((op, i) => ({
      seq:     String((step.seq - 1) * 10 + (i + 1) * 10).padStart(3, "0"),
      opCode:  `OP-${lineCode.slice(-2)}-${String((step.seq - 1) * 10 + (i + 1) * 10).padStart(3, "0")}`,
      opName:  op,
      step:    step.name,
      stdTime: "1.0h",
      gate:    i === step.operations.length - 1 ? "QC 승인" : "자동",
    }))
  );

  const COLUMNS = [
    { key: "seq",     label: "순서 번호" },
    { key: "opCode",  label: "OP 코드" },
    { key: "opName",  label: "세부 작업" },
    { key: "step",    label: "공정 단계" },
    { key: "stdTime", label: "표준 시간" },
    { key: "gate",    label: "게이트 조건" },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공정 시퀀스"
        nodeRef="SCR-BD-041"
        description="공정라인별 operation_code 게이트 기반 공정 순서 등록"
      />
      <FieldHeader title="공정 시퀀스 설정" moduleRef="BD-WORKLINE-STEPS" />

      <div className="flex gap-3 mb-4 items-end">
        <select
          value={lineCode}
          onChange={(e) => setLineCode(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm min-w-64"
        >
          {LINE_OPTIONS.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">
          {steps.length}단계 / {rows.length}작업
        </span>
      </div>

      {/* 공정 단계 요약 */}
      <div className="flex items-center gap-2 flex-wrap mb-6 p-4 bg-surface-container">
        {steps.map((step, i) => (
          <div key={step.seq} className="flex items-center gap-2">
            <div className="bg-primary-accent/20 border border-primary-accent/40 px-3 py-1.5 text-xs font-label text-primary-accent">
              {step.seq}. {step.name}
              <span className="text-on-surface/30 ml-1">({step.operations.length})</span>
            </div>
            {i < steps.length - 1 && <span className="text-primary-accent text-sm">→</span>}
          </div>
        ))}
      </div>

      <DataTable
        title={`${lineCode} 공정 시퀀스`}
        columns={COLUMNS}
        data={rows}
        bufferCount={rows.length}
      />
    </div>
  );
}
