"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "runNo", label: "실행 번호" },
  { key: "runAt", label: "실행일시" },
  { key: "scope", label: "소요 계산 범위" },
  { key: "shortage", label: "부족 항목 수" },
  { key: "executor", label: "실행자" },
];

const data = [
  { runNo: "MRP-0028", runAt: "2026-05-05 06:00", scope: "SO-0042, SO-0041", shortage: "3", executor: "김민수" },
  { runNo: "MRP-0027", runAt: "2026-05-04 06:01", scope: "SO-0040", shortage: "0", executor: "이정훈" },
  { runNo: "MRP-0026", runAt: "2026-05-03 06:00", scope: "전체", shortage: "7", executor: "김민수" },
  { runNo: "MRP-0025", runAt: "2026-05-02 06:03", scope: "SO-0039", shortage: "2", executor: "박지영" },
  { runNo: "MRP-0024", runAt: "2026-05-01 06:01", scope: "전체", shortage: "0", executor: "이정훈" },
];

export default function SPMrpPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [running, setRunning] = useState(false);

  function handleRun() {
    setRunning(true);
    setShowConfirm(false);
    setTimeout(() => setRunning(false), 2000);
  }

  return (
    <div>
      <PageHeader
        title="MRP 실행"
        accent="MRP"
        nodeRef="SCR-SP-030"
        status="PROTOTYPE"
        description="자재소요량 계획(MRP) 실행 및 이력 조회."
      />

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={running}
          className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:bg-[#00912F]/80 transition-colors disabled:opacity-50"
        >
          {running ? "MRP 실행 중..." : "MRP 실행"}
        </button>
        <span className="text-xs text-warning font-label uppercase tracking-widest border border-warning/30 px-3 py-2">
          주의 — 실행 시 전체 소요량이 재계산됩니다
        </span>
      </div>

      {showConfirm && (
        <div className="bg-surface-elevated border border-warning/40 p-5 mb-6 max-w-md">
          <p className="text-sm text-on-surface/80 mb-4">MRP를 실행하면 전체 수주의 자재 소요량이 재계산됩니다. 계속하시겠습니까?</p>
          <div className="flex gap-3">
            <button
              onClick={handleRun}
              className="bg-[#00912F] text-white font-label uppercase tracking-widest text-xs px-4 py-2 hover:bg-[#00912F]/80 transition-colors"
            >
              확인
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="border border-outline/30 text-on-surface/60 font-label uppercase tracking-widest text-xs px-4 py-2 hover:border-outline/50 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      <FieldHeader title="MRP 실행 이력" moduleRef="SCR-SP-030" />
      <DataTable
        title="실행 이력"
        columns={columns}
        data={data}
        bufferCount={data.length}
      />
    </div>
  );
}
