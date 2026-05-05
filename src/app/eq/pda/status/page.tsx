import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const eqs = [
  { code: "EQ-P3-CUT-01",   name: "절단기 #1",   status: "running" as const, oee: "87%", lastPm: "2026-04-10", nextPm: "2026-05-10", alert: "진동 경보" },
  { code: "EQ-P3-CUT-02",   name: "절단기 #2",   status: "running" as const, oee: "81%", lastPm: "2026-04-08", nextPm: "2026-05-08", alert: "—" },
  { code: "EQ-P3-PRESS-01", name: "프레스 #1",   status: "warning" as const, oee: "75%", lastPm: "2026-04-01", nextPm: "2026-05-01", alert: "유압 경보" },
  { code: "EQ-P3-WELD-01",  name: "용접기 #1",   status: "stopped" as const, oee: "—",   lastPm: "2026-03-20", nextPm: "2026-05-20", alert: "고장 정지" },
  { code: "EQ-P4-ASM-01",   name: "조립기 #1",   status: "running" as const, oee: "86%", lastPm: "2026-04-28", nextPm: "2026-05-28", alert: "—" },
];

export default function EQPdaStatusPage() {
  return (
    <div className="p-8">
      <PageHeader title="PDA 설비 상태" accent="STATUS" nodeRef="SCR-EQ-091" description="현장 PDA에서 실시간 설비 상태 조회." />
      <FieldHeader title="설비 상태 목록" moduleRef="FR-EQ-091" />
      <div className="space-y-3">
        {eqs.map((e) => (
          <div key={e.code} className="bg-surface-container-low p-4 flex items-center gap-4 flex-wrap">
            <StatusBadge type={e.status} label={e.status.toUpperCase()} />
            <div className="flex-1 min-w-0">
              <p className="font-headline font-bold text-sm">{e.code}</p>
              <p className="font-label text-xs opacity-50">{e.name}</p>
            </div>
            <div className="text-right">
              <p className="font-headline font-black text-lg text-primary-accent tabular-nums">{e.oee}</p>
              <p className="font-label text-xs opacity-40">OEE</p>
            </div>
            <div className="text-right">
              <p className="font-headline text-sm">{e.nextPm}</p>
              <p className="font-label text-xs opacity-40">다음 PM</p>
            </div>
            {e.alert !== "—" && (
              <div className="bg-error/20 text-error px-3 py-1 font-label text-xs uppercase">{e.alert}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
