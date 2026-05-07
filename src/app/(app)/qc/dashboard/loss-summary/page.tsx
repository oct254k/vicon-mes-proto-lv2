import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const BY_STAGE = [
  { stage: "① 입고검사", amount: "₩ 1,200,000", weight: "1.0×", count: 4 },
  { stage: "② 생산공정", amount: "₩ 3,800,000", weight: "1.5×", count: 8 },
  { stage: "⑥ 최종검사", amount: "₩ 4,900,000", weight: "2.0×", count: 5 },
  { stage: "⑨ 현장도착", amount: "₩ 2,500,000", weight: "3.0×", count: 3 },
];

const COLUMNS = [
  { key: "stage", label: "시점" },
  { key: "count", label: "건수" },
  { key: "weight", label: "가중치" },
  { key: "amount", label: "손실 환산액" },
];

const MONTHLY = [
  { month: "2026-02", amount: "₩ 9,800,000", delta: "-" },
  { month: "2026-03", amount: "₩ 10,200,000", delta: "+4.1%" },
  { month: "2026-04", amount: "₩ 11,450,000", delta: "+12.3%" },
  { month: "2026-05", amount: "₩ 12,400,000", delta: "+8.4%" },
];

const MONTHLY_COLS = [
  { key: "month", label: "월" },
  { key: "amount", label: "손실액" },
  { key: "delta", label: "전월 대비" },
];

export default function QCLossSummaryPage() {
  return (
    <div>
      <PageHeader
        title="손실 요약"
        accent="차트"
        nodeRef="SCR-QC-071"
        status="PROTOTYPE"
        description="시점·공장·공급사별 품질 손실 환산 리포트 (FNC-QC-105)"
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "이번 달 손실", value: "₩ 12,400,000", warn: true },
          { label: "누적 손실 (YTD)", value: "₩ 43,850,000", warn: false },
          { label: "평균 가중치", value: "1.87×", warn: false },
        ].map((k) => (
          <div key={k.label} className={`p-4 border-l-4 ${k.warn ? "border-error" : "border-primary-accent"}`}>
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{k.label}</p>
            <p className="font-headline font-black text-2xl">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-2">
        <FieldHeader title="시점별 손실 분포" moduleRef="FNC-QC-100~102" />
        <div className="flex items-end gap-2 h-24 mb-2 px-2">
          {BY_STAGE.map((s) => {
            const h = Math.round((parseInt(s.amount.replace(/[₩,\s]/g, "")) / 5000000) * 60);
            return (
              <div key={s.stage} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-primary-accent/80" style={{ height: h }} />
                <p className="text-xs opacity-50 font-label text-center leading-tight">{s.stage.split(" ")[0]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <DataTable title="시점별 손실 상세" columns={COLUMNS} data={BY_STAGE} bufferCount={BY_STAGE.length} />

      <div className="mt-6">
        <FieldHeader title="월별 손실 추이" moduleRef="SCR-QC-071" />
        <DataTable title="월별 손실" columns={MONTHLY_COLS} data={MONTHLY} bufferCount={MONTHLY.length} />
      </div>

      <p className="mt-4 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        손실 환산식: 자재 단가 × BOM 소요량 × 시점 가중치 + 인건비/공수 (FR-QC-090) | [회계 큐 →] /qc/loss/accounting-queue
      </p>
    </div>
  );
}
