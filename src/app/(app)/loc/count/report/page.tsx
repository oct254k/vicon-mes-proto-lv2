import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const DIFF_COLS = [
  { key: "locId",    label: "위치 ID" },
  { key: "material", label: "자재" },
  { key: "sysQty",   label: "시스템 수량" },
  { key: "countQty", label: "실측 수량" },
  { key: "diff",     label: "차이" },
  { key: "diffPct",  label: "차이율" },
  { key: "autoAdj",  label: "자동 ADJUST" },
];

const DIFF_DATA = [
  { locId:"Y-P3000-A-01-02", material:"M-COIL-A P3000 900m", sysQty:"950m", countQty:"900m", diff:"-50m", diffPct:"-5.3%", autoAdj:"완료" },
  { locId:"Y-P3000-A-02-01", material:"M-COIL-C",            sysQty:"4,200m",countQty:"4,180m",diff:"-20m", diffPct:"-0.5%", autoAdj:"완료" },
  { locId:"Y-P3000-B-01-01", material:"M-COIL-B",            sysQty:"1,800m",countQty:"1,810m",diff:"+10m", diffPct:"+0.6%", autoAdj:"완료" },
];

const KPI = [
  { label: "대상 위치",   value: "38개" },
  { label: "정합 위치",   value: "35개" },
  { label: "차이 위치",   value: "3개" },
  { label: "정합률",       value: "99.2%" },
];

export default function CountReportPage() {
  return (
    <div>
      <PageHeader
        title="실사 보고서"
        accent="실사 결과"
        nodeRef="SCR-LOC-052"
        status="PROTOTYPE"
        description="실사 정합률·차이 Top N 보고서. 차이 건에 대한 자동 ADJUST 처리 결과 포함."
      />

      <div className="bg-surface-elevated border border-outline/20 p-4 mb-6 text-xs font-label text-on-surface/40">
        <span className="uppercase tracking-widest">실사 ID: </span>
        <span className="text-on-surface">CNT-20260501</span>
        &ensp;|&ensp;
        <span className="uppercase tracking-widest">기간: </span>
        <span className="text-on-surface">2026-05-01</span>
        &ensp;|&ensp;
        <span className="uppercase tracking-widest">대상: </span>
        <span className="text-on-surface">Y-RAW 전체</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {KPI.map((k, i) => (
          <div key={k.label} className={`bg-surface-elevated border-l-4 p-5 ${i === 3 ? "border-[#00912F]" : "border-outline/30"}`}>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-2">{k.label}</p>
            <p className={`text-3xl font-black font-headline ${i === 3 ? "text-[#00912F]" : "text-on-surface"}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-elevated p-4 mb-6">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mb-3">정합률 게이지</p>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-surface border border-outline/10">
            <div className="h-full bg-[#00912F]" style={{ width: "99.2%" }} />
          </div>
          <span className="font-headline font-black text-[#00912F] tabular-nums">99.2%</span>
        </div>
      </div>

      <FieldHeader title="차이 상세 (Top N)" moduleRef="FNC-LOC-084" />
      <DataTable title="차이 목록" columns={DIFF_COLS} data={DIFF_DATA} bufferCount={DIFF_DATA.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [PDF 출력 ▶]
        </button>
        <button className="bg-surface-elevated border border-outline/20 text-on-surface/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-outline/40">
          [엑셀 다운]
        </button>
      </div>
    </div>
  );
}
