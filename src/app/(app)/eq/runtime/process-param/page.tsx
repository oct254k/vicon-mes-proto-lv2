import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { ts: "2026-05-06 08:00", eqCode: "EQ-P3-CUT-01",   param: "절단 속도",   value: "120",  unit: "m/min", ref: "100~130", ok: "OK" },
  { ts: "2026-05-06 08:00", eqCode: "EQ-P3-CUT-01",   param: "날 압력",     value: "3.2",  unit: "MPa",  ref: "3.0~3.5", ok: "OK" },
  { ts: "2026-05-06 09:00", eqCode: "EQ-P3-PRESS-01", param: "성형 압력",   value: "22.8", unit: "MPa",  ref: "20~24",   ok: "OK" },
  { ts: "2026-05-06 09:00", eqCode: "EQ-P3-PRESS-01", param: "다이 온도",   value: "88",   unit: "°C",   ref: "80~90",   ok: "OK" },
  { ts: "2026-05-06 10:00", eqCode: "EQ-P3-WELD-01",  param: "용접 전류",   value: "295",  unit: "A",    ref: "250~300", ok: "WARN" },
  { ts: "2026-05-06 10:00", eqCode: "EQ-P3-WELD-01",  param: "용접 속도",   value: "0.8",  unit: "m/min", ref: "0.5~1.0", ok: "OK" },
];

const cols = [
  { key: "ts",     label: "기록 시각" },
  { key: "eqCode", label: "설비 코드" },
  { key: "param",  label: "파라미터" },
  { key: "value",  label: "실측값",   className: "tabular-nums" },
  { key: "unit",   label: "단위" },
  { key: "ref",    label: "기준 범위" },
  { key: "ok",     label: "판정",     className: "text-primary-accent" },
];

export default function EQRuntimeProcessParamPage() {
  return (
    <div className="p-8">
      <PageHeader title="가공 파라미터 기록" accent="PROCESS PARAM" nodeRef="SCR-EQ-015" description="설비별 공정 파라미터 실측값 및 기준 범위 대비 판정." />
      <DataTable title="가공 파라미터 기록 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
