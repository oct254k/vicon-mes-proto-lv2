import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { eqCode: "EQ-P3-CUT-01",   shift: "1조", planTime: "480", runTime: "445", stopTime: "35", perf: "96%", qual: "99%", oee: "87.3%", rank: "2" },
  { eqCode: "EQ-P3-CUT-02",   shift: "1조", planTime: "480", runTime: "420", stopTime: "60", perf: "94%", qual: "98%", oee: "81.1%", rank: "4" },
  { eqCode: "EQ-P3-PRESS-01", shift: "1조", planTime: "480", runTime: "438", stopTime: "42", perf: "93%", qual: "99%", oee: "83.8%", rank: "3" },
  { eqCode: "EQ-P3-WELD-01",  shift: "2조", planTime: "480", runTime: "456", stopTime: "24", perf: "97%", qual: "100%", oee: "92.2%", rank: "1" },
  { eqCode: "EQ-P4-ASM-01",   shift: "1조", planTime: "480", runTime: "432", stopTime: "48", perf: "95%", qual: "99%", oee: "85.7%", rank: "2" },
];

const cols = [
  { key: "eqCode",    label: "설비 코드" },
  { key: "shift",     label: "조" },
  { key: "planTime",  label: "계획 시간(분)" },
  { key: "runTime",   label: "가동 시간(분)" },
  { key: "stopTime",  label: "정지 시간(분)" },
  { key: "perf",      label: "성능" },
  { key: "qual",      label: "품질" },
  { key: "oee",       label: "OEE",  className: "text-primary-accent font-black" },
  { key: "rank",      label: "순위" },
];

export default function EQOeeDrillPage() {
  return (
    <div className="p-8">
      <PageHeader title="설비 드릴다운" accent="DRILL" nodeRef="SCR-EQ-072" description="설비별 OEE 구성 요소 드릴다운 분석." />
      <DataTable title="설비별 OEE 드릴다운 (2026-05-06)" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
