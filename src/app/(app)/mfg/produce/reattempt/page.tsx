"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ProduceReattemptPage() {
  const [lotInput, setLotInput] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-sm mx-auto p-4 min-h-screen bg-surface">
      <PageHeader title="PRODUCE /" accent="재생산 등록" nodeRef="SCR-MFG-025" status="PROTOTYPE" />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-1">WO</p>
        <p className="font-headline font-bold text-sm">WO-P3000-20260506-0007</p>
        <p className="text-xs text-on-surface/40 mt-1">부재: B01-1-G22C-C-172</p>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">원 LOT 스캔</label>
        <input
          type="text"
          value={lotInput}
          onChange={(e) => setLotInput(e.target.value)}
          placeholder="PRD-20260506-002"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-xl font-mono text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">재생산 사유</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="재생산이 필요한 사유를 입력하세요"
          className="w-full bg-surface-container border border-outline-variant/30 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/20 focus:outline-none focus:border-primary-accent resize-none"
        />
      </div>

      <div className="bg-surface-container-low p-3 mb-6 text-xs font-label">
        <p className="text-on-surface/50 mb-1 uppercase tracking-widest">신규 LOT 채번 예정</p>
        <p className="font-mono text-primary-accent">PRD-20260506-{String(Math.floor(Math.random() * 900) + 100)}-R1</p>
      </div>

      {submitted ? (
        <div className="text-center py-6">
          <StatusBadge type="running" label="재생산 등록 완료" />
          <p className="text-xs text-on-surface/40 mt-3 font-label">QC 검토 후 진행됩니다.</p>
        </div>
      ) : (
        <button
          onClick={() => lotInput.trim() && note.trim() && setSubmitted(true)}
          disabled={!lotInput.trim() || !note.trim()}
          className="w-full bg-primary-accent text-white py-4 font-label font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          재생산 Attempt 등록
        </button>
      )}
    </div>
  );
}
