"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PLAN_COLS = [
  { key: "planId",   label: "계획 ID" },
  { key: "target",   label: "대상 Yard" },
  { key: "method",   label: "방법" },
  { key: "teams",    label: "팀 수" },
  { key: "planned",  label: "예정일" },
  { key: "creator",  label: "작성자" },
  { key: "status",   label: "상태" },
];

const PLAN_DATA = [
  { planId:"CNT-PLAN-20260505-001", target:"Y-RAW 전체",    method:"맹검",  teams:"2", planned:"2026-05-06", creator:"이매니저", status:"진행중" },
  { planId:"CNT-PLAN-20260401-002", target:"Y-IN, Y-WIP",  method:"맹검",  teams:"1", planned:"2026-04-02", creator:"김공장",   status:"완료" },
  { planId:"CNT-PLAN-20260301-001", target:"Y-RAW 전체",    method:"단순",  teams:"2", planned:"2026-03-01", creator:"이매니저", status:"완료" },
];

export default function CountPlanPage() {
  const [showForm, setShowForm] = useState(false);
  const [target,  setTarget]   = useState("Y-RAW");
  const [method,  setMethod]   = useState("맹검");
  const [date,    setDate]     = useState("2026-05-07");
  const [saved,   setSaved]    = useState(false);

  const inputCls = "w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]";
  const labelCls = "block text-xs font-label uppercase tracking-widest text-white/50 mb-2";

  return (
    <div>
      <PageHeader
        title="실사 계획"
        accent="COUNT-PLAN"
        nodeRef="SCR-LOC-050"
        status="PROTOTYPE"
        description="실사 계획 DataTable. [계획 생성] 클릭 → 맹검 카운트 시트 발행."
      />

      <div className="flex items-center gap-4 mb-6">
        <StatusBadge type="warning" label="진행 중 1건" />
        <button onClick={() => setShowForm(!showForm)}
          className="ml-auto bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [계획 생성 ▶]
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1a1a1a] border border-white/10 p-6 mb-6 max-w-lg space-y-4">
          <FieldHeader title="신규 실사 계획" moduleRef="FNC-LOC-080" />
          <div>
            <label className={labelCls}>대상 Yard</label>
            <select value={target} onChange={e=>setTarget(e.target.value)} className={inputCls}>
              {["Y-RAW","Y-IN","Y-WIP","Y-OUT","전체"].map(y=><option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>방법</label>
            <select value={method} onChange={e=>setMethod(e.target.value)} className={inputCls}>
              <option>맹검</option><option>단순</option>
            </select>
          </div>
          <div><label className={labelCls}>예정일</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} className={inputCls} /></div>
          <div className="flex gap-3">
            <button onClick={() => { setSaved(true); setShowForm(false); }}
              className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-2 text-sm hover:opacity-90">
              생성 ▶
            </button>
            <button onClick={() => setShowForm(false)}
              className="bg-[#131313] border border-white/10 text-white/50 font-label uppercase tracking-widest px-6 py-2 text-sm">
              취소
            </button>
          </div>
        </div>
      )}

      {saved && <p className="text-[#00912F] text-xs font-label uppercase tracking-widest mb-4">실사 계획 생성 완료 — 카운트 시트가 발행됩니다.</p>}

      <FieldHeader title="실사 계획 목록" moduleRef="FNC-LOC-080" />
      <DataTable title="실사 계획" columns={PLAN_COLS} data={PLAN_DATA} bufferCount={PLAN_DATA.length} />
    </div>
  );
}
