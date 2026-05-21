import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { eqCode: "EQ-P3-CUT-01",   sensor: "진동(mm/s)",    low: "0",   high: "8.0",  warn: "6.5",  unit: "mm/s",  active: "활성" },
  { eqCode: "EQ-P3-CUT-01",   sensor: "온도(°C)",      low: "10",  high: "85",   warn: "75",   unit: "°C",    active: "활성" },
  { eqCode: "EQ-P3-PRESS-01", sensor: "유압(MPa)",     low: "5.0", high: "25.0", warn: "22.0", unit: "MPa",   active: "활성" },
  { eqCode: "EQ-P3-PRESS-01", sensor: "온도(°C)",      low: "10",  high: "90",   warn: "80",   unit: "°C",    active: "활성" },
  { eqCode: "EQ-P3-WELD-01",  sensor: "전류(A)",       low: "50",  high: "300",  warn: "280",  unit: "A",     active: "활성" },
  { eqCode: "EQ-P4-ASM-01",   sensor: "토크(N·m)",     low: "0",   high: "120",  warn: "100",  unit: "N·m",   active: "비활성" },
];

const cols = [
  { key: "eqCode", label: "설비 코드" },
  { key: "sensor", label: "센서 항목" },
  { key: "low",    label: "하한" },
  { key: "high",   label: "상한", className: "text-primary-accent" },
  { key: "warn",   label: "경보 기준" },
  { key: "unit",   label: "단위" },
  { key: "active", label: "활성" },
];

export default function EQRuntimeThresholdPage() {
  return (
    <div className="p-8">
      <PageHeader title="임계값 설정" accent="임계값" nodeRef="SCR-EQ-014" description="설비 센서별 상·하한 및 경보 임계값 관리." />
      <DataTable title="임계값 설정 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
