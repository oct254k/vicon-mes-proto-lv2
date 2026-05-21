"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"GATE-2026-0125", shp:"SHP-2026-0025", plate:"12가3456", mode:"RFID", passAt:"2026-05-06 07:05", result:"PASS" },
  { id:"GATE-2026-0124", shp:"SHP-2026-0024", plate:"34나5678", mode:"RFID", passAt:"2026-05-05 15:22", result:"PASS" },
  { id:"GATE-2026-0123", shp:"SHP-2026-0023", plate:"56다9012", mode:"MANUAL", passAt:"2026-05-04 11:10", result:"PASS" },
  { id:"GATE-2026-0122", shp:"SHP-2026-0022", plate:"미인식", mode:"MANUAL", passAt:"2026-05-03 08:45", result:"FALLBACK" },
];
const SM: Record<string,"running"|"warning"> = { PASS:"running", FALLBACK:"warning" };
const SL: Record<string, string> = { PASS:"통과", FALLBACK:"수동처리" };
const MM: Record<string,"idle"|"warning"> = { RFID:"idle", MANUAL:"warning" };
const kpis = [{l:"금일 통과",v:2},{l:"RFID 인식",v:3},{l:"수동 처리",v:2},{l:"오류",v:0}];

export default function GateMonitorPage() {
  return (
    <div>
      <PageHeader title="게이트 통과 이력" nodeRef="IA-SHP-GATE-MONITOR" status="PROTOTYPE"
        description="게이트 RFID/MANUAL 통과 이력 감사 (FNC-SHP-060/061/063) — GATE-MANAGER/ADMIN" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map(k=>(
          <div key={k.l} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="통과 이력" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 border-l-4 border-primary-accent bg-surface-container-highest/30 flex justify-between">
          <span className="font-headline font-black text-sm uppercase tracking-widest">게이트 통과 로그</span>
          <a href="/shp/gate/fallback" className="text-xs font-label text-primary-accent uppercase">수동 인식 →</a>
        </div>
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["이벤트 ID","출하 ID","차량번호","인식 모드","통과 일시","결과"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.map(r=>(
              <tr key={r.id} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 ${r.result==="FALLBACK"?"bg-warning/5":""}`}>
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.plate}</td>
                <td className="px-4 py-2"><StatusBadge type={MM[r.mode]} label={r.mode} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.passAt}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.result]} label={SL[r.result] ?? r.result} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
