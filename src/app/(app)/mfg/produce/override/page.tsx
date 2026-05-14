"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ProduceOverridePage() {
  const [reason, setReason] = useState("");
  const [approved, setApproved] = useState(false);

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-surface">
      <PageHeader title="PRODUCE /" accent="공정 게이트 Override" nodeRef="SCR-MFG-021" status="PROTOTYPE" />

      <div className="bg-error/10 border border-error/40 p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-error mb-2">LOT 게이트 차단</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-on-surface/50">현재 LOT</span>
            <span className="font-mono">PRD-20260506-002</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface/50">미확정 선행 공정</span>
            <span className="font-mono text-error">PRD-20260506-001 (G22C)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface/50">부재</span>
            <span className="font-mono">B01-1-G22C-C-172</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface/50">WO</span>
            <span className="font-mono">WO-P3000-20260506-0007</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-1">위반 규칙</p>
        <p className="text-sm font-body text-on-surface/70">FR-MFG-025 — 앞 공정 LOT 미확정 시 다음 공정 PRODUCE 불가 (L3 권한 Override 가능)</p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">Override 사유 (필수)</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="공정 게이트 우회 사유를 상세히 입력하세요"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent resize-none"
        />
      </div>

      {approved ? (
        <div className="text-center py-6">
          <StatusBadge type="warning" label="Override 승인됨" />
          <p className="text-xs text-on-surface/40 mt-3 font-label">이력이 감사 로그에 기록됩니다.</p>
        </div>
      ) : (
        <button
          onClick={() => reason.trim() && setApproved(true)}
          disabled={!reason.trim()}
          className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          L3 Override 승인
        </button>
      )}
    </div>
  );
}
