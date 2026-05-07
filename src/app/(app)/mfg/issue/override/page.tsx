"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function IssueOverridePage() {
  const [reason, setReason] = useState("");
  const [approved, setApproved] = useState(false);

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-[#131313]">
      <PageHeader title="ISSUE /" accent="FIFO 우회 승인" nodeRef="SCR-MFG-011" status="PROTOTYPE" />

      <div className="bg-error/10 border border-error/40 p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-error mb-2">FIFO 위반 감지</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-on-surface/50 text-xs">요청 LOT</span>
            <span className="font-mono text-xs">RCV-20260501-0017</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface/50 text-xs">FIFO 선순위 LOT</span>
            <span className="font-mono text-xs text-error">RCV-20260428-0009</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface/50 text-xs">부재</span>
            <span className="font-mono text-xs">B01-1-G22C-C-171</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">WO</p>
        <p className="font-headline font-bold text-sm">WO-P3000-20260506-0007</p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">우회 사유 (필수)</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="FIFO 우회가 필요한 사유를 입력하세요"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent resize-none"
        />
      </div>

      {approved ? (
        <div className="text-center py-6">
          <StatusBadge type="running" label="승인 완료" />
          <p className="text-xs text-on-surface/40 mt-3 font-label">FIFO 우회 투입이 승인되었습니다.</p>
        </div>
      ) : (
        <button
          onClick={() => reason.trim() && setApproved(true)}
          disabled={!reason.trim()}
          className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          관리자 승인
        </button>
      )}
    </div>
  );
}
