import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const summary = [
  { label: "이달 교체 비용",  value: "1,540,000원" },
  { label: "전월 대비",       value: "+12.3%" },
  { label: "연간 누계",       value: "8,240,000원" },
];

const data = [
  { month: "2026-05", eqCode: "EQ-P3-CUT-01",   cost: "400,000",   cnt: "2", avg: "200,000" },
  { month: "2026-05", eqCode: "EQ-P3-PRESS-01",  cost: "85,000",    cnt: "1", avg: "85,000"  },
  { month: "2026-05", eqCode: "EQ-P3-WELD-01",   cost: "75,000",    cnt: "1", avg: "75,000"  },
  { month: "2026-05", eqCode: "EQ-P4-ASM-01",    cost: "980,000",   cnt: "1", avg: "980,000" },
  { month: "2026-04", eqCode: "EQ-P3-CUT-01",    cost: "320,000",   cnt: "2", avg: "160,000" },
  { month: "2026-04", eqCode: "EQ-P3-PRESS-01",  cost: "250,000",   cnt: "3", avg: "83,333"  },
];

const cols = [
  { key: "month",  label: "월" },
  { key: "eqCode", label: "설비 코드" },
  { key: "cost",   label: "교체 비용(원)",  className: "text-primary-accent tabular-nums" },
  { key: "cnt",    label: "교체 건수" },
  { key: "avg",    label: "건당 평균(원)",  className: "tabular-nums" },
];

export default function EQComponentCostPage() {
  return (
    <div className="p-8">
      <PageHeader title="부품 교체 비용" accent="COMP COST" nodeRef="SCR-EQ-032" description="설비별·월별 부품 교체 비용 집계." />
      <FieldHeader title="월간 요약" moduleRef="FR-EQ-046" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {summary.map((s) => (
          <div key={s.label} className="bg-surface-container-low p-4 border-l-4 border-primary-accent">
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{s.label}</p>
            <p className="font-headline font-black text-lg">{s.value}</p>
          </div>
        ))}
      </div>
      <DataTable title="설비별 교체 비용" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
