"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const inputCls = "w-full bg-surface border border-outline/20 px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]";
const labelCls = "block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2";

const REASONS = ["실사차이", "손상", "기타"];
const LOCATIONS = ["Y-P3000-A-01-01","Y-P3000-A-01-02","Y-P3000-A-01-03","Y-P3000-A-02-01","W-01-01","W-02-01"];
const APPROVERS = ["김공장(공장장)", "이매니저(LOC-MANAGER)", "박팀장(WHS-LEAD)"];

export default function AdjustNewPage() {
  const [reason,   setReason]   = useState("");
  const [material, setMaterial] = useState("M-COIL-A P3000 900m");
  const [lot,      setLot]      = useState("RCV-20260501-0017");
  const [before,   setBefore]   = useState("950");
  const [after,    setAfter]    = useState("900");
  const [location, setLocation] = useState("");
  const [approver, setApprover] = useState("");
  const [note,     setNote]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const delta = Number(after) - Number(before);

  return (
    <div>
      <PageHeader
        title="보정 신청"
        accent="ADJUST"
        nodeRef="SCR-LOC-040"
        status="PROTOTYPE"
        description="재고 수량 보정 신청 폼. 사유 코드·결재자 지정 후 LOC-MANAGER 결재 요청."
      />

      <div className="max-w-lg space-y-5">
        <FieldHeader title="보정 사유" moduleRef="FNC-LOC-060" />
        <div className="flex gap-3">
          {REASONS.map(r => (
            <button key={r} onClick={() => setReason(r)}
              className={`px-4 py-2 text-xs font-label uppercase tracking-widest border transition-colors ${
                reason === r ? "border-[#00912F] bg-[#00912F]/20 text-[#00912F]" : "border-outline/20 text-on-surface/50 hover:border-outline/40"}`}>
              {r}
            </button>
          ))}
        </div>

        <FieldHeader title="대상 정보" moduleRef="FNC-LOC-061" />
        <div><label className={labelCls}>Material 코드</label><input value={material} onChange={e=>setMaterial(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Lot No</label><input value={lot} onChange={e=>setLot(e.target.value)} className={inputCls} placeholder="RCV-20260501-0017" /></div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>보정 전 수량(m)</label><input type="number" value={before} onChange={e=>setBefore(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>보정 후 수량(m)</label><input type="number" value={after}  onChange={e=>setAfter(e.target.value)}  className={inputCls} /></div>
        </div>

        {before && after && (
          <div className="bg-surface-elevated p-3 border-l-2 border-[#00912F]/40 text-xs font-label">
            보정량: <span className={delta >= 0 ? "text-[#00912F]" : "text-danger"}>{delta >= 0 ? "+" : ""}{delta}m</span>
          </div>
        )}

        <div>
          <label className={labelCls}>위치</label>
          <select value={location} onChange={e=>setLocation(e.target.value)} className={inputCls}>
            <option value="">선택</option>
            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>결재자 지정</label>
          <select value={approver} onChange={e=>setApprover(e.target.value)} className={inputCls}>
            <option value="">선택</option>
            {APPROVERS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        <div><label className={labelCls}>비고</label><input value={note} onChange={e=>setNote(e.target.value)} className={inputCls} placeholder="추가 설명" /></div>

        <button onClick={() => setSubmitted(true)} disabled={!reason || !location || !approver}
          className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90 disabled:opacity-30">
          보정 신청 ▶
        </button>

        {submitted && (
          <div className="flex items-center gap-3">
            <StatusBadge type="warning" label="결재 대기" />
            <span className="text-xs text-on-surface/50 font-label">{approver}에게 결재 요청됨.</span>
          </div>
        )}
      </div>
    </div>
  );
}
