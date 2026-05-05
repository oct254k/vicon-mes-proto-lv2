"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ITEMS = [
  { seq:1, memberId:"B01-1-G22C-C-171", type:"C형", len:6000, weight:2.3, pkg:"PKG-0025-001" },
  { seq:2, memberId:"B01-1-G22C-C-172", type:"C형", len:6000, weight:2.3, pkg:"PKG-0025-001" },
  { seq:3, memberId:"B01-2-G15A-S-040", type:"S형", len:12000, weight:4.1, pkg:"PKG-0025-001" },
  { seq:4, memberId:"B01-3-G22C-C-173", type:"C형", len:6000, weight:2.3, pkg:"PKG-0025-001" },
];

export default function PacklistPage() {
  return (
    <div>
      <PageHeader title="패킹리스트 PDF" accent="SCR-SHP-030" nodeRef="IA-SHP-DOC-PACKLIST" status="PROTOTYPE"
        description="패킹리스트 PDF 발행·3부 출력 미리보기 (FNC-SHP-031/032/033)" />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[{l:"출하 ID",v:"SHP-2026-0025"},{l:"고객",v:"현대건설"},{l:"PKG ID",v:"PKG-0025-001"},{l:"부재 수",v:"24건"},{l:"총중량",v:"18.5 t"},{l:"목적지",v:"부산항"}].map(f=>(
          <div key={f.l} className="bg-surface-container p-3">
            <p className="text-xs font-label opacity-50 uppercase">{f.l}</p>
            <p className="font-bold text-sm">{f.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="패킹리스트 미리보기 (일부)" moduleRef="24건 중 4건 표시" />
      <div className="border border-outline-variant/20 bg-white text-black mb-4">
        <div className="bg-[#131313] text-white px-4 py-2 flex justify-between items-center">
          <span className="font-headline font-black text-xs uppercase tracking-widest">PACKING LIST — PDF PREVIEW</span>
          <StatusBadge type="idle" label="미리보기" />
        </div>
        <div className="p-4 text-sm">
          <p className="font-bold mb-2 text-xs">SHP-2026-0025 | 현대건설 | 부산항 | 2026-05-06</p>
          <table className="w-full border-collapse text-xs">
            <thead><tr className="border-b border-gray-300">
              {["#","부재 ID","타입","길이(mm)","중량(t)","PKG"].map(h=><th key={h} className="px-2 py-1 text-left font-bold opacity-60">{h}</th>)}
            </tr></thead>
            <tbody>
              {ITEMS.map(r=>(
                <tr key={r.seq} className="border-b border-gray-100">
                  <td className="px-2 py-1">{r.seq}</td>
                  <td className="px-2 py-1 font-mono">{r.memberId}</td>
                  <td className="px-2 py-1">{r.type}</td>
                  <td className="px-2 py-1 tabular-nums">{r.len.toLocaleString()}</td>
                  <td className="px-2 py-1 tabular-nums">{r.weight}</td>
                  <td className="px-2 py-1 font-mono opacity-60">{r.pkg}</td>
                </tr>
              ))}
              <tr className="font-bold text-xs border-t-2 border-gray-400">
                <td colSpan={4} className="px-2 py-1 text-right">합계</td>
                <td className="px-2 py-1 tabular-nums">{ITEMS.reduce((a,r)=>a+r.weight,0).toFixed(1)}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">PDF 발행 (3부)</button>
        <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">인쇄</button>
        <button className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">아카이브 저장</button>
      </div>
    </div>
  );
}
