"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type RecallStatus = "DRAFT" | "REVIEWED" | "CONFIRMED" | "NOTIFIED" | "CLOSED";

const STEP_ORDER: RecallStatus[] = ["DRAFT", "REVIEWED", "CONFIRMED", "NOTIFIED", "CLOSED"];

const STATUS_LABEL: Record<RecallStatus, string> = {
  DRAFT: "초안", REVIEWED: "검토완료", CONFIRMED: "확정", NOTIFIED: "통보완료", CLOSED: "종결",
};

const STATUS_TYPE: Record<RecallStatus, "idle" | "warning" | "running" | "stopped"> = {
  DRAFT: "idle", REVIEWED: "warning", CONFIRMED: "warning", NOTIFIED: "running", CLOSED: "stopped",
};

const RECALLS = [
  { id: "RCL-20260506-001", lot: "PRD-20260506-001", part: "B01-1-G22C-C-171", reason: "용접 불량 의심", status: "CONFIRMED" as RecallStatus, updatedAt: "2026-05-06 11:30" },
  { id: "RCL-20260505-002", lot: "RCV-20260501-0017", part: "B01-1-G22C-C-171", reason: "원자재 성분 이상", status: "NOTIFIED" as RecallStatus, updatedAt: "2026-05-05 16:00" },
  { id: "RCL-20260504-001", lot: "PRD-20260504-007", part: "B02-2-G22C-C-088", reason: "치수 초과", status: "CLOSED" as RecallStatus, updatedAt: "2026-05-04 17:45" },
  { id: "RCL-20260503-003", lot: "RCV-20260428-0009", part: "B03-1-G22C-C-054", reason: "코팅 불량", status: "DRAFT" as RecallStatus, updatedAt: "2026-05-03 09:10" },
];

export default function RecallWorkflowPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = RECALLS.find((r) => r.id === selected);

  return (
    <div className="p-8">
      <PageHeader title="회수 /" accent="회수 워크플로" nodeRef="SCR-MFG-044" status="PROTOTYPE" description="회수 5단계 상태머신 — DRAFT → REVIEWED → CONFIRMED → NOTIFIED → CLOSED" />

      <div className="flex gap-0 mb-8">
        {STEP_ORDER.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="text-center px-3 py-2 bg-surface-container-low">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface/50">{i + 1}</p>
              <p className="text-xs font-headline font-bold mt-0.5">{STATUS_LABEL[s]}</p>
            </div>
            {i < STEP_ORDER.length - 1 && <span className="text-primary-accent px-1">→</span>}
          </div>
        ))}
      </div>

      <FieldHeader title="회수 목록" moduleRef="FNC-MFG-064~068" />

      <div className="space-y-2 mb-6">
        {RECALLS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelected(selected === r.id ? null : r.id)}
            className={`w-full text-left px-4 py-3 border transition-colors ${
              selected === r.id ? "border-primary-accent bg-primary-accent/10" : "border-outline-variant/20 bg-surface-container hover:border-primary-accent/40"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-sm font-bold">{r.id}</span>
              <StatusBadge type={STATUS_TYPE[r.status]} label={STATUS_LABEL[r.status]} />
            </div>
            <p className="text-xs text-on-surface/50">{r.lot} — {r.part}</p>
            <p className="text-xs text-on-surface/40 mt-1">{r.reason}</p>
          </button>
        ))}
      </div>

      {sel && (
        <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
          <p className="text-xs font-label uppercase tracking-widest text-primary-accent mb-4">회수 진행 상태: {STATUS_LABEL[sel.status]}</p>
          <div className="flex gap-3">
            {STEP_ORDER.indexOf(sel.status) < STEP_ORDER.length - 1 && (
              <button className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-wider">
                다음 단계로 이동
              </button>
            )}
            {sel.status === "DRAFT" && (
              <button className="border border-error text-error px-6 py-2 text-xs font-label uppercase tracking-wider">취소</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
