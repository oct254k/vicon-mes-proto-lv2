"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"CHG-2026-0008", shp:"SHP-2026-0022", customer:"DL이앤씨", origDate:"2026-05-11", newDate:"2026-05-14", reason:"항만 혼잡", reqBy:"출하팀 이담당", status:"PENDING_L3" },
  { id:"CHG-2026-0007", shp:"SHP-2026-0021", customer:"GS건설", origDate:"2026-05-09", newDate:"2026-05-10", reason:"차량 고장", reqBy:"출하팀 김담당", status:"APPROVED" },
  { id:"CHG-2026-0006", shp:"SHP-2026-0020", customer:"삼성물산", origDate:"2026-05-08", newDate:"2026-05-08", reason:"고객 요청", reqBy:"영업팀 박부장", status:"CANCELLED" },
];
const SM: Record<string,"warning"|"running"|"stopped"> = { PENDING_L3:"warning", APPROVED:"running", CANCELLED:"stopped" };

export default function ScheduleChangePage() {
  return (
    <div>
      <PageHeader title="일정 변경·취소" nodeRef="IA-SHP-SCHEDULE-CHANGE" status="PROTOTYPE"
        description="출하 일정 변경·취소 — L3 결재 필요 (FNC-SHP-044/055)" />
      <FieldHeader title="변경 이력" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["변경 ID","출하 ID","고객","기존 날짜","변경 날짜","사유","요청자","상태","액션"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2">{r.customer}</td>
                <td className="px-4 py-2 tabular-nums text-xs line-through opacity-40">{r.origDate}</td>
                <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.newDate}</td>
                <td className="px-4 py-2 text-xs opacity-70">{r.reason}</td>
                <td className="px-4 py-2 text-xs opacity-60">{r.reqBy}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.status]} label={r.status.replace("_"," ")} /></td>
                <td className="px-4 py-2">
                  {r.status==="PENDING_L3" && <button className="text-xs px-2 py-1 bg-primary-accent text-black font-label uppercase">결재 ▶</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
