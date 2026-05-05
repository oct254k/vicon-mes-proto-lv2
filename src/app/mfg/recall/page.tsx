"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

type RecallStep = "RECALL_DRAFT" | "REVIEWED" | "CONFIRMED" | "NOTIFIED" | "CLOSED";

const STEPS: RecallStep[] = ["RECALL_DRAFT", "REVIEWED", "CONFIRMED", "NOTIFIED", "CLOSED"];

const STEP_LABEL: Record<RecallStep, string> = {
  RECALL_DRAFT: "회수 초안",
  REVIEWED: "검토 완료",
  CONFIRMED: "확정",
  NOTIFIED: "통보 완료",
  CLOSED: "종결",
};

const APPROVERS: Record<RecallStep, string> = {
  RECALL_DRAFT: "김품질 (QC 담당)",
  REVIEWED: "이팀장 (QC 팀장)",
  CONFIRMED: "박부장 (생산부장)",
  NOTIFIED: "최이사 (생산이사)",
  CLOSED: "—",
};

const AFFECTED_MEMBERS = [
  { code: "B01-1-G22C-C-171", lot: "LOT-2026-0311", process: "용접 공정 #3", detected: "2026-05-04 14:22" },
  { code: "B01-2-G22C-W-042", lot: "LOT-2026-0311", process: "용접 공정 #3", detected: "2026-05-04 14:25" },
  { code: "B02-1-H18A-C-088", lot: "LOT-2026-0308", process: "도장 공정 #1", detected: "2026-05-04 15:01" },
  { code: "B02-2-H18A-W-019", lot: "LOT-2026-0308", process: "도장 공정 #1", detected: "2026-05-04 15:03" },
];

const COLUMNS = [
  { key: "code", label: "부재코드" },
  { key: "lot", label: "LOT" },
  { key: "process", label: "공정" },
  { key: "detected", label: "발견 시점" },
];

export default function MFGRecallPage() {
  const [currentStep, setCurrentStep] = useState<RecallStep>("RECALL_DRAFT");

  const currentIndex = STEPS.indexOf(currentStep);
  const isLastStep = currentIndex === STEPS.length - 1;

  function handleNextStep() {
    if (!isLastStep) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  }

  return (
    <div className="px-4 py-6">
      <PageHeader
        title="회수 워크플로"
        accent="RECALL"
        nodeRef="SCR-MFG-040"
        status="PROTOTYPE"
      />

      <FieldHeader title="진행 단계" moduleRef="SCR-MFG-041" />
      <div className="flex items-start gap-0 mb-8 overflow-x-auto pb-2">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div key={step} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center font-headline font-black text-sm transition-colors ${
                    isCurrent
                      ? "bg-primary-accent text-on-primary"
                      : isDone
                      ? "bg-primary-accent/40 text-primary-accent"
                      : "bg-surface-container-high text-on-surface/30"
                  }`}
                >
                  {isDone ? "✓" : idx + 1}
                </div>
                <p
                  className={`mt-2 font-label text-xs uppercase tracking-wide text-center w-20 leading-tight ${
                    isCurrent ? "text-primary-accent font-bold" : isDone ? "text-on-surface/60" : "text-on-surface/30"
                  }`}
                >
                  {STEP_LABEL[step]}
                </p>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 mb-6 flex-shrink-0 ${idx < currentIndex ? "bg-primary-accent/40" : "bg-outline-variant/20"}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6 flex justify-between items-center">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">현재 단계</p>
          <p className="font-headline font-black text-lg text-primary-accent">{STEP_LABEL[currentStep]}</p>
        </div>
        <div className="text-right">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">결재자</p>
          <p className="font-headline text-sm">{APPROVERS[currentStep]}</p>
        </div>
      </div>

      <DataTable
        title="영향 부재 목록"
        columns={COLUMNS}
        data={AFFECTED_MEMBERS}
        bufferCount={AFFECTED_MEMBERS.length}
      />

      <div className="mt-6 flex gap-3">
        <button
          className={`flex-1 py-4 font-headline font-black uppercase tracking-widest text-base transition-colors ${
            isLastStep
              ? "bg-surface-container-high text-on-surface/30 cursor-not-allowed"
              : "bg-primary-accent text-on-primary"
          }`}
          onClick={handleNextStep}
          disabled={isLastStep}
        >
          {isLastStep ? "종결됨" : `다음 단계: ${STEP_LABEL[STEPS[currentIndex + 1]]}`}
        </button>
      </div>
    </div>
  );
}
