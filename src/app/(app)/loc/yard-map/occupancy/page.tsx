import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const KPI = [
  { label: "전체 점유율",  value: "78%",  sub: "30/38 OCCUPIED" },
  { label: "포화",          value: "12",   sub: "위치" },
  { label: "AGING",        value: "5",    sub: "보관 7일+ 위치" },
  { label: "빈 위치",      value: "8",    sub: "즉시 사용 가능" },
];

const YARD_COLS = [
  { key: "yard",    label: "Yard" },
  { key: "total",   label: "총 위치" },
  { key: "empty",   label: "비어있음" },
  { key: "occupied",label: "점유중" },
  { key: "full",    label: "포화" },
  { key: "aging",   label: "AGING" },
  { key: "maint",   label: "점검" },
  { key: "pct",     label: "점유율" },
];

const YARD_DATA = [
  { yard: "Y-RAW",  total: "30", empty: "8",  occupied: "14", full: "5", aging: "2", maint: "1", pct: "67%" },
  { yard: "Y-IN",   total: "12", empty: "4",  occupied: "5",  full: "2", aging: "0", maint: "0", pct: "58%" },
  { yard: "Y-WIP",  total: "20", empty: "3",  occupied: "10", full: "3", aging: "1", maint: "2", pct: "80%" },
  { yard: "Y-OUT",  total: "15", empty: "2",  occupied: "8",  full: "4", aging: "1", maint: "0", pct: "87%" },
];

const TREND_COLS = [
  { key: "date",    label: "날짜" },
  { key: "rawPct",  label: "Y-RAW %" },
  { key: "inPct",   label: "Y-IN %" },
  { key: "wipPct",  label: "Y-WIP %" },
  { key: "outPct",  label: "Y-OUT %" },
  { key: "aging",   label: "AGING 건" },
];

const TREND_DATA = [
  { date: "2026-05-01", rawPct: "61%", inPct: "50%", wipPct: "74%", outPct: "80%", aging: "3" },
  { date: "2026-05-02", rawPct: "65%", inPct: "55%", wipPct: "76%", outPct: "82%", aging: "3" },
  { date: "2026-05-03", rawPct: "67%", inPct: "58%", wipPct: "79%", outPct: "84%", aging: "4" },
  { date: "2026-05-04", rawPct: "70%", inPct: "60%", wipPct: "80%", outPct: "85%", aging: "5" },
  { date: "2026-05-05", rawPct: "67%", inPct: "58%", wipPct: "80%", outPct: "87%", aging: "5" },
];

export default function YardMapOccupancyPage() {
  return (
    <div>
      <PageHeader
        title="점유율 통계"
        nodeRef="SCR-LOC-012"
        status="PROTOTYPE"
        description="야적장 점유율 대시보드. Yard별 통계 및 5일 추이. SITUATION_BOARD 대형 모니터 지원."
      />

      <div className="grid grid-cols-4 gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] p-5">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">{k.label}</p>
            <p className="text-3xl font-black font-headline text-on-surface">{k.value}</p>
            <p className="text-xs text-on-surface/40 font-label mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="Yard별 점유 현황" moduleRef="FNC-LOC-096" />
      <div className="mb-6">
        {YARD_DATA.map(y => {
          const pct = parseInt(y.pct);
          return (
            <div key={y.yard} className="flex items-center gap-4 mb-3">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface/60 w-16">{y.yard}</span>
              <div className="flex-1 h-5 bg-surface-elevated border border-outline/10">
                <div className={`h-full ${pct >= 85 ? "bg-danger" : pct >= 70 ? "bg-warning" : "bg-[#00912F]"}`}
                  style={{ width: y.pct }} />
              </div>
              <span className="font-headline font-bold text-sm tabular-nums w-12 text-right">{y.pct}</span>
            </div>
          );
        })}
      </div>

      <FieldHeader title="Yard별 상세" moduleRef="FNC-LOC-023" />
      <DataTable title="위치 현황" columns={YARD_COLS} data={YARD_DATA} />

      <FieldHeader title="점유율 5일 추이" moduleRef="FNC-LOC-096" />
      <DataTable title="추이" columns={TREND_COLS} data={TREND_DATA} bufferCount={TREND_DATA.length} />
    </div>
  );
}
