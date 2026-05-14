import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "locId",   label: "위치 ID" },
  { key: "plant",   label: "Plant" },
  { key: "yard",    label: "Yard" },
  { key: "status",  label: "운영 상태" },
  { key: "loadPct", label: "점유율" },
  { key: "since",   label: "상태 변경 일시" },
  { key: "reason",  label: "변경 사유" },
];

const DATA = [
  { locId: "Y-P3000-A-01-03", plant: "P3000", yard: "Y-RAW", status: "FULL",        loadPct: "100%", since: "2026-05-05 09:12", reason: "자동(점유 초과)" },
  { locId: "Y-P3000-A-02-01", plant: "P3000", yard: "Y-RAW", status: "MAINTENANCE", loadPct: "—",    since: "2026-05-04 14:00", reason: "바닥 균열 점검" },
  { locId: "Y-P3000-B-01-01", plant: "P3000", yard: "Y-IN",  status: "ACTIVE",      loadPct: "40%",  since: "2026-05-01 08:00", reason: "신규 등록" },
  { locId: "Y-P1000-A-01-01", plant: "P1000", yard: "Y-RAW", status: "ACTIVE",      loadPct: "20%",  since: "2026-04-28 10:30", reason: "복구 완료" },
];

const KPI = [
  { label: "ACTIVE",      value: "18", badge: "running" as const },
  { label: "FULL",        value: "12", badge: "warning" as const },
  { label: "MAINTENANCE", value: "3",  badge: "stopped" as const },
  { label: "RETIRED",     value: "2",  badge: "idle" as const },
];

export default function LocMasterStatusPage() {
  return (
    <div>
      <PageHeader
        title="위치 운영 상태"
        nodeRef="SCR-LOC-005"
        status="PROTOTYPE"
        description="위치 마스터 운영 상태(ACTIVE·FULL·MAINTENANCE·RETIRED) 실시간 모니터. 상태 변경·폐기 결재 진입."
      />

      <div className="grid grid-cols-4 gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] p-5 flex flex-col gap-2">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40">{k.label}</p>
            <p className="text-3xl font-black font-headline text-on-surface">{k.value}</p>
            <StatusBadge type={k.badge} label={k.label} />
          </div>
        ))}
      </div>

      <FieldHeader title="상태 이력 목록" moduleRef="FNC-LOC-013" />
      <DataTable title="위치 운영 상태" columns={COLS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [상태 변경 ▶]
        </button>
        <button className="bg-danger/10 border border-danger/30 text-danger font-label uppercase tracking-widest px-5 py-2 text-xs hover:bg-danger/20">
          [폐기 결재]
        </button>
      </div>
    </div>
  );
}
