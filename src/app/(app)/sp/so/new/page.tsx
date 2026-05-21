"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const inputCls = "bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm w-full";

const INITIAL_LINES = [
  { no: 1, building: "1동", memberType: "C형", lengthMm: 6000, qty: 240, unitPrice: 12500, remark: "B01-1 묶음" },
  { no: 2, building: "1동", memberType: "S형", lengthMm: 12000, qty: 80,  unitPrice: 24300, remark: "B01-1 묶음" },
  { no: 3, building: "2동", memberType: "C형", lengthMm: 6000, qty: 320, unitPrice: 12500, remark: "B01-2 묶음" },
];

export default function SoNewPage() {
  const [customer, setCustomer]   = useState("포스코건설");
  const [site, setSite]           = useState("송도 IFC");
  const [dueDate, setDueDate]     = useState("2026-05-08");
  const [poNumber, setPoNumber]   = useState("PO-PSC-2026-0815");
  const [remark, setRemark]       = useState("");
  const [lines]                   = useState(INITIAL_LINES);

  const totalQty    = lines.reduce((s, l) => s + l.qty, 0);
  const totalAmount = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="수주" accent="신규 등록" nodeRef="SCR-SP-001" status="DRAFT" />

      {/* 기본 정보 */}
      <section className="mb-8">
        <h2 className="text-xs font-label uppercase tracking-widest text-primary-accent mb-4 border-b border-outline-variant/20 pb-2">기본 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs text-on-surface-variant uppercase tracking-widest mb-1">거래처 <span className="text-error">*</span></label>
            <input className={inputCls} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="거래처명" />
          </div>
          <div>
            <label className="block text-xs text-on-surface-variant uppercase tracking-widest mb-1">현장명 <span className="text-error">*</span></label>
            <input className={inputCls} value={site} onChange={(e) => setSite(e.target.value)} placeholder="현장명" />
          </div>
          <div>
            <label className="block text-xs text-on-surface-variant uppercase tracking-widest mb-1">납기일 <span className="text-error">*</span></label>
            <input type="date" className={inputCls} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-on-surface-variant uppercase tracking-widest mb-1">PO 번호</label>
            <input className={inputCls} value={poNumber} onChange={(e) => setPoNumber(e.target.value)} placeholder="PO-XXXX-XXXX" />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs text-on-surface-variant uppercase tracking-widest mb-1">비고</label>
            <input className={inputCls} value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="비고 사항" />
          </div>
        </div>
      </section>

      {/* 부재 정보 */}
      <section className="mb-8">
        <h2 className="text-xs font-label uppercase tracking-widest text-primary-accent mb-4 border-b border-outline-variant/20 pb-2">부재 정보</h2>
        <div className="overflow-x-auto bg-surface-container-lowest">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["#", "동", "부재 타입", "길이(mm)", "수량", "단가", "비고"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {lines.map((l) => (
                <tr key={l.no} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                  <td className="px-4 py-2 tabular-nums opacity-40">{l.no}</td>
                  <td className="px-4 py-2">{l.building}</td>
                  <td className="px-4 py-2">{l.memberType}</td>
                  <td className="px-4 py-2 tabular-nums">{l.lengthMm.toLocaleString()}</td>
                  <td className="px-4 py-2 tabular-nums">{l.qty}</td>
                  <td className="px-4 py-2 tabular-nums">₩{l.unitPrice.toLocaleString()}</td>
                  <td className="px-4 py-2 text-on-surface-variant">{l.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-on-surface-variant mt-2 px-1">
          합계 라인 {lines.length} / 수량 {totalQty.toLocaleString()} / 예상 금액 ₩{totalAmount.toLocaleString()}
        </p>
      </section>

      {/* 액션 */}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-primary-accent text-white text-sm font-bold uppercase tracking-widest hover:opacity-90">
          저장
        </button>
        <a href="/sp/so">
          <button className="px-6 py-2 border border-outline-variant text-on-surface-variant text-sm font-bold uppercase tracking-widest hover:bg-surface-container-highest/30">
            취소
          </button>
        </a>
      </div>
    </main>
  );
}
