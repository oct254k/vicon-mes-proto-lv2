"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"PKG-0019-001", shp:"SHP-2026-0019", customer:"현대건설", loc:"YARD-C2", storedDays:18, state:"STORED", risk:"HIGH" },
  { id:"PKG-0018-001", shp:"SHP-2026-0018", customer:"GS건설", loc:"YARD-A2", storedDays:12, state:"HOLD", risk:"MEDIUM" },
  { id:"PKG-0017-001", shp:"SHP-2026-0017", customer:"삼성물산", loc:"YARD-B3", storedDays:7, state:"STORED", risk:"LOW" },
];
const RM: Record<string,"stopped"|"warning"|"idle"> = { HIGH:"stopped", MEDIUM:"warning", LOW:"idle" };

export default function StoredAgingPage() {
  const max = Math.max(...MOCK.map(r=>r.storedDays));
  return (
    <div>
      <PageHeader title="AGING 알림" accent="SCR-SHP-021" nodeRef="IA-SHP-STORED-AGING" status="PROTOTYPE"
        description="장기 야적 체류 AGING 모니터 (FNC-SHP-022/024) · SITUATION_BOARD 겸용" />
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/40 px-4 py-3 mb-4 flex items-center gap-3">
        <span className="text-[#f59e0b] font-black text-xl">⚠</span>
        <span className="text-sm font-label text-[#f59e0b]">장기 체류 PKG {MOCK.length}건 — 즉시 출하 검토 필요</span>
      </div>
      <FieldHeader title="AGING 현황" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["PKG ID","출하 ID","고객","위치","체류 일수","상태","위험도","AGING Bar","조치"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.sort((a,b)=>b.storedDays-a.storedDays).map(r=>(
              <tr key={r.id} className={`border-b border-outline-variant/5 ${r.risk==="HIGH"?"bg-error/5":r.risk==="MEDIUM"?"bg-[#f59e0b]/5":""}`}>
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2">{r.customer}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.loc}</td>
                <td className={`px-4 py-2 font-black tabular-nums ${r.risk==="HIGH"?"text-error":r.risk==="MEDIUM"?"text-[#f59e0b]":"opacity-70"}`}>{r.storedDays}일</td>
                <td className="px-4 py-2"><StatusBadge type={r.state==="HOLD"?"warning":"idle"} label={r.state} /></td>
                <td className="px-4 py-2"><StatusBadge type={RM[r.risk]} label={r.risk} /></td>
                <td className="px-4 py-2 w-28">
                  <div className="bg-surface-container h-2">
                    <div className={`h-2 ${r.risk==="HIGH"?"bg-error":r.risk==="MEDIUM"?"bg-[#f59e0b]":"bg-primary-accent"}`} style={{width:`${(r.storedDays/max)*100}%`}} />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button className="text-xs px-2 py-1 bg-primary-accent text-black font-label uppercase">출하 이동</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
