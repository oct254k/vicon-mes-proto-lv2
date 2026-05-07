import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const data = [
  { rank: "1", cause: "칼날 교체",   count: "18", stopMin: "450", pct: "32.1%", cumPct: "32.1%" },
  { rank: "2", cause: "유압 누유",   count: "11", stopMin: "330", pct: "23.5%", cumPct: "55.6%" },
  { rank: "3", cause: "센서 오류",   count: "9",  stopMin: "180", pct: "12.9%", cumPct: "68.5%" },
  { rank: "4", cause: "전원 불안정", count: "7",  stopMin: "140", pct: "10.0%", cumPct: "78.5%" },
  { rank: "5", cause: "윤활 부족",   count: "5",  stopMin: "100", pct: "7.1%",  cumPct: "85.6%" },
  { rank: "6", cause: "기타",        count: "12", stopMin: "200", pct: "14.3%", cumPct: "100%" },
];

const cols = [
  { key: "rank",    label: "순위" },
  { key: "cause",   label: "정지 원인" },
  { key: "count",   label: "발생 횟수" },
  { key: "stopMin", label: "정지 시간(분)" },
  { key: "pct",     label: "비율",     className: "text-primary-accent" },
  { key: "cumPct",  label: "누적 비율" },
];

export default function EQRuntimeParetoPage() {
  return (
    <div className="p-8">
      <PageHeader title="정지 원인 Pareto" accent="PARETO" nodeRef="SCR-EQ-013" description="정지 원인별 발생 횟수 및 누적 비율 분석." />
      <FieldHeader title="기간: 2026-04-01 ~ 2026-05-06" moduleRef="FR-EQ-020" />
      <DataTable title="정지 원인 Pareto 분석" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
