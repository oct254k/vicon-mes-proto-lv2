"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

interface SheetRow { locId: string; material: string; sysQty: string; countQty: string; diff: string; note: string; }

const INIT_ROWS: SheetRow[] = [
  { locId:"Y-P3000-A-01-01", material:"EMPTY",             sysQty:"0",   countQty:"", diff:"", note:"" },
  { locId:"Y-P3000-A-01-02", material:"M-COIL-A P3000 900m",sysQty:"900", countQty:"", diff:"", note:"" },
  { locId:"Y-P3000-A-01-03", material:"M-COIL-A",          sysQty:"5000",countQty:"", diff:"", note:"" },
  { locId:"Y-P3000-A-02-01", material:"M-COIL-C",          sysQty:"4200",countQty:"", diff:"", note:"" },
  { locId:"Y-P3000-A-02-02", material:"M-COIL-A",          sysQty:"5000",countQty:"", diff:"", note:"" },
];

export default function CountSheetPage() {
  const [rows, setRows] = useState<SheetRow[]>(INIT_ROWS);
  const [saved, setSaved] = useState(false);

  const update = (idx: number, field: keyof SheetRow, val: string) => {
    setRows(prev => prev.map((r, i) => {
      if (i !== idx) return r;
      const updated = { ...r, [field]: val };
      if (field === "countQty") {
        const diff = Number(val) - Number(r.sysQty);
        updated.diff = val ? (diff >= 0 ? `+${diff}` : String(diff)) : "";
      }
      return updated;
    }));
    setSaved(false);
  };

  const inputCls = "bg-[#131313] border border-white/10 px-2 py-1 text-sm text-white focus:outline-none focus:border-[#00912F] w-24";

  return (
    <div>
      <PageHeader
        title="실사 입력 시트"
        accent="COUNT-SHEET"
        nodeRef="SCR-LOC-051"
        status="PROTOTYPE"
        description="PDA/PC 카운트 입력 시트. 맹검 — 시스템 수량은 가려짐. 실측 입력 후 차이 자동 계산."
      />

      <FieldHeader title="카운트 입력 — CNT-PLAN-20260505-001 / Y-RAW" moduleRef="FNC-LOC-081" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a1a1a] border-b border-white/10">
              {["위치 ID","자재","시스템 수량","실측 수량","차이","비고"].map(h => (
                <th key={h} className="px-4 py-2 text-left text-xs font-label uppercase tracking-widest text-white/40">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {rows.map((r, i) => (
              <tr key={r.locId} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-2 text-[#00912F] text-xs">{r.locId}</td>
                <td className="px-4 py-2 text-white/70 text-xs">{r.material}</td>
                <td className="px-4 py-2 tabular-nums text-white/30">{"****"}</td>
                <td className="px-4 py-2">
                  <input className={inputCls} type="number" value={r.countQty} onChange={e=>update(i,"countQty",e.target.value)} placeholder="—" />
                </td>
                <td className={`px-4 py-2 tabular-nums font-bold ${r.diff.startsWith("+") ? "text-[#00912F]" : r.diff.startsWith("-") ? "text-[#ef4444]" : "text-white/30"}`}>
                  {r.diff || "—"}
                </td>
                <td className="px-4 py-2">
                  <input className={inputCls + " w-36"} value={r.note} onChange={e=>update(i,"note",e.target.value)} placeholder="메모" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={() => setSaved(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
          시트 저장 ▶
        </button>
        <button className="bg-[#1a1a1a] border border-white/10 text-white/50 font-label uppercase tracking-widest px-6 py-3 text-sm">취소</button>
        {saved && <span className="self-center text-[#00912F] text-xs font-label uppercase tracking-widest">저장 완료 — 차이 자동 ADJUST 처리됨</span>}
      </div>
    </div>
  );
}
