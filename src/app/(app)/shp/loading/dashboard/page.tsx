"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const kpis = [{l:"오늘 적재 예정",v:3},{l:"완료",v:1},{l:"진행 중",v:1},{l:"대기",v:1}];
const ROWS = [
  { id:"SHP-2026-0025", customer:"현대건설", pkg:2, loaded:2, weight:"27.7t", dept:"2026-05-06 07:00", status:"SHIPPED" },
  { id:"SHP-2026-0024", customer:"GS건설", pkg:3, loaded:1, weight:"32.1t", dept:"2026-05-08 08:30", status:"IN_PROGRESS" },
  { id:"SHP-2026-0023", customer:"삼성물산", pkg:2, loaded:0, weight:"15.3t", dept:"2026-05-09 06:00", status:"SCHEDULED" },
];
const SM: Record<string,"running"|"idle"|"warning"> = { SHIPPED:"running", IN_PROGRESS:"running", SCHEDULED:"idle" };

export default function LoadingDashboardPage() {
  return (
    <div>
      <PageHeader title="적재 현황 대시보드" nodeRef="IA-SHP-LOADING-DASHBOARD" status="PROTOTYPE"
        description="출발 결과·취소 이력 (FNC-SHP-054/055/050) — SHP-STAFF/MANAGER" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map(k=>(
          <div key={k.l} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="적재 현황" moduleRef={`${ROWS.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["출하 ID","고객","PKG수","적재완료","총중량","출발 예정","상태"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {ROWS.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2">{r.customer}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.pkg}</td>
                <td className="px-4 py-2">
                  <span className={`tabular-nums text-xs font-bold ${r.loaded===r.pkg?"text-primary-accent":"text-warning"}`}>{r.loaded}/{r.pkg}</span>
                </td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.weight}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.dept}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={r.status.replace("_"," ")} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
