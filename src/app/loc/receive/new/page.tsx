"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const LINE_COLS = [
  { key: "lineNo",   label: "#" },
  { key: "material", label: "자재" },
  { key: "coilId",   label: "공급사 CoilID" },
  { key: "qty",      label: "수량(m)" },
  { key: "poRemain", label: "PO 잔량" },
  { key: "isolate",  label: "격리" },
];

const LINES = [
  { lineNo:1, material:"M-COIL-A P3000 900m", coilId:"P-A2305-0017", qty:"900",   poRemain:"1500", isolate:"N" },
  { lineNo:2, material:"M-COIL-A P3000 900m", coilId:"P-A2305-0018", qty:"820",   poRemain:"680",  isolate:"N" },
  { lineNo:3, material:"M-COIL-B",            coilId:"P-B2305-0301", qty:"300",   poRemain:"300",  isolate:"Y" },
];

const inputCls = "w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]";
const labelCls = "block text-xs font-label uppercase tracking-widest text-white/50 mb-2";

export default function ReceiveNewPage() {
  const [poId,    setPoId]    = useState("PO-2026-00417");
  const [invoice, setInvoice] = useState("INV-2026-9821");
  const [arrDate, setArrDate] = useState("2026-05-01");
  const [loc,     setLoc]     = useState("Y-P3000-A-01-03");
  const [done,    setDone]    = useState(false);

  return (
    <div>
      <PageHeader
        title="신규 입고 등록"
        accent="RECEIVE"
        nodeRef="SCR-LOC-020"
        status="PROTOTYPE"
        description="PC 웹 — 송장·PO 첨부, 라인별 자재 등록, 입고 위치 검증 3조건 확인 후 확정."
      />

      {done ? (
        <div className="bg-[#00912F]/20 border-l-4 border-[#00912F] p-6 max-w-lg">
          <p className="font-label font-bold uppercase tracking-widest text-[#00912F] mb-1">입고 등록 완료</p>
          <p className="text-sm text-white/60">Lot RCV-20260501-0017 생성 / 위치 {loc}</p>
          <button onClick={() => setDone(false)} className="mt-4 border border-white/20 text-white/60 font-label uppercase text-xs px-4 py-2 hover:border-white/40">
            새 입고 시작
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl">
          <FieldHeader title="A. 송장 정보" moduleRef="SCR-LOC-020" />
          <div className="grid grid-cols-3 gap-4">
            <div><label className={labelCls}>PO 번호</label><input value={poId} onChange={e=>setPoId(e.target.value)} className={inputCls}/></div>
            <div><label className={labelCls}>송장 번호</label><input value={invoice} onChange={e=>setInvoice(e.target.value)} className={inputCls}/></div>
            <div><label className={labelCls}>도착일</label><input type="date" value={arrDate} onChange={e=>setArrDate(e.target.value)} className={inputCls}/></div>
          </div>
          <div className="bg-[#1a1a1a] p-3 text-xs text-white/50 border-l-2 border-[#00912F]/40 font-label">
            공급사: <span className="text-white font-bold">포스코</span>&ensp;|&ensp;
            3-Way Matching: PO <span className="text-[#00912F]">✔</span>&ensp;qty <span className="text-[#00912F]">✔</span>&ensp;단가 <span className="text-[#f59e0b]">PENDING</span>
          </div>

          <FieldHeader title="B. 라인별 자재" moduleRef="FNC-LOC-038" />
          <DataTable title="입고 라인" columns={LINE_COLS} data={LINES} bufferCount={LINES.length} />
          <div className="bg-[#1a1a1a] p-4 text-xs font-label">
            <p className="uppercase tracking-widest text-white/40 mb-2">Lot 자동채번 미리보기</p>
            <p><span className="text-[#00912F]">1</span> → RCV-20260501-0017 <span className="text-white/30">(fifo_seq 4521)</span></p>
            <p><span className="text-[#00912F]">2</span> → RCV-20260501-0018 <span className="text-white/30">(fifo_seq 4522)</span></p>
          </div>

          <FieldHeader title="C. 입고 위치 검증" moduleRef="FNC-LOC-040" />
          <div className="flex gap-4">
            <div><label className={labelCls}>위치 ID</label><input value={loc} onChange={e=>setLoc(e.target.value)} className={inputCls+" w-52"}/></div>
          </div>
          <div className="flex gap-3 text-xs font-label">
            {["ACTIVE ✔", "Y-RAW 허용 ✔", "잔여 1,500m ✔"].map(t=>(
              <span key={t} className="text-[#00912F]">{t}</span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setDone(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
              입고 등록 ▶
            </button>
            <button className="bg-[#1a1a1a] border border-white/10 text-white/50 font-label uppercase tracking-widest px-6 py-3 text-sm">취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
