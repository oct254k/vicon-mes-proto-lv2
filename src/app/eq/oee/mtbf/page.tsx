import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { eqCode: "EQ-P3-CUT-01",   failCnt: "3",  totalStop: "85",  mttr: "28.3", runMin: "13000", mtbf: "4333", target: "4800", gap: "-467",  status: "미달" },
  { eqCode: "EQ-P3-CUT-02",   failCnt: "5",  totalStop: "150", mttr: "30.0", runMin: "12800", mtbf: "2560", target: "4800", gap: "-2240", status: "미달" },
  { eqCode: "EQ-P3-PRESS-01", failCnt: "2",  totalStop: "60",  mttr: "30.0", runMin: "13400", mtbf: "6700", target: "5000", gap: "+1700", status: "달성" },
  { eqCode: "EQ-P3-WELD-01",  failCnt: "1",  totalStop: "24",  mttr: "24.0", runMin: "13500", mtbf: "13500", target: "5000", gap: "+8500", status: "달성" },
  { eqCode: "EQ-P4-ASM-01",   failCnt: "4",  totalStop: "120", mttr: "30.0", runMin: "13200", mtbf: "3300", target: "4000", gap: "-700",  status: "미달" },
];

const cols = [
  { key: "eqCode",    label: "설비 코드" },
  { key: "failCnt",   label: "고장 횟수" },
  { key: "totalStop", label: "총 정지(분)" },
  { key: "mttr",      label: "MTTR(분)" },
  { key: "runMin",    label: "가동 시간(분)" },
  { key: "mtbf",      label: "MTBF(분)",    className: "text-primary-accent font-black tabular-nums" },
  { key: "target",    label: "목표(분)" },
  { key: "gap",       label: "차이(분)",    className: "tabular-nums" },
  { key: "status",    label: "달성 여부" },
];

export default function EQOeeMtbfPage() {
  return (
    <div className="p-8">
      <PageHeader title="MTBF KPI" accent="MTBF" nodeRef="SCR-EQ-075" description="설비별 MTBF·MTTR 산출 및 목표 대비 KPI." />
      <DataTable title="MTBF KPI 목록 (이번달)" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
