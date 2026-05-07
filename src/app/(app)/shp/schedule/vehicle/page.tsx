"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"VEH-2026-0015", shp:"SHP-2026-0025", plate:"12가3456", driver:"홍길동 기사", dept:"2026-05-06 07:00", dest:"부산항", weight:"18.5t", status:"DEPARTED" },
  { id:"VEH-2026-0014", shp:"SHP-2026-0024", plate:"34나5678", driver:"김트럭 기사", dept:"2026-05-08 08:30", dest:"인천항", weight:"22.1t", status:"SCHEDULED" },
  { id:"VEH-2026-0013", shp:"SHP-2026-0023", plate:"56다9012", driver:"이운송 기사", dept:"2026-05-09 06:00", dest:"광양항", weight:"15.3t", status:"SCHEDULED" },
  { id:"VEH-2026-0012", shp:"SHP-2026-0022", plate:"78라3456", driver:"박기사", dept:"2026-05-14 07:00", dest:"평택항", weight:"12.0t", status:"PENDING" },
];
const SM: Record<string,"running"|"idle"|"warning"> = { DEPARTED:"running", SCHEDULED:"idle", PENDING:"warning" };

export default function ScheduleVehiclePage() {
  return (
    <div>
      <PageHeader title="차량 배차" accent="SCR-SHP-002" nodeRef="IA-SHP-SCHEDULE-VEHICLE" status="PROTOTYPE"
        description="출하 차량 배차 그리드 — 분할 적재 다이얼로그 (FNC-SHP-041/042/043/045)" />
      <FieldHeader title="배차 현황" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 border-l-4 border-primary-accent bg-surface-container-highest/30 flex justify-between">
          <span className="font-headline font-black text-sm uppercase tracking-widest">배차 목록</span>
          <button className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase">+ 배차 등록</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["배차 ID","출하 ID","차량번호","운전자","출발 예정","목적지","적재 중량","상태"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.plate}</td>
                <td className="px-4 py-2 text-xs">{r.driver}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.dept}</td>
                <td className="px-4 py-2">{r.dest}</td>
                <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.weight}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
