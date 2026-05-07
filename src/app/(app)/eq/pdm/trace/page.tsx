import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { ts: "2026-05-06 06:30", eqCode: "EQ-P3-CUT-01", model: "Isolation Forest", sensor: "진동", actual: "7.8", pred: "7.2", conf: "94%", outcome: "이상 확인됨" },
  { ts: "2026-05-06 03:00", eqCode: "EQ-P3-CUT-01", model: "LSTM",             sensor: "진동", actual: "6.9", pred: "7.1", conf: "88%", outcome: "정상 범위"   },
  { ts: "2026-05-05 22:15", eqCode: "EQ-P3-PRESS-01", model: "LSTM",           sensor: "유압", actual: "23.5", pred: "22.8", conf: "79%", outcome: "경보"      },
  { ts: "2026-05-05 18:00", eqCode: "EQ-P4-ASM-01",  model: "Z-Score",         sensor: "전류", actual: "295", pred: "278", conf: "72%",  outcome: "관찰 중"   },
  { ts: "2026-05-05 12:00", eqCode: "EQ-P3-CUT-02",  model: "Isolation Forest", sensor: "온도", actual: "79", pred: "76", conf: "85%",   outcome: "정상 범위"  },
];

const cols = [
  { key: "ts",      label: "예측 시각" },
  { key: "eqCode",  label: "설비 코드" },
  { key: "model",   label: "모델" },
  { key: "sensor",  label: "센서" },
  { key: "actual",  label: "실측값",   className: "tabular-nums" },
  { key: "pred",    label: "예측값",   className: "tabular-nums" },
  { key: "conf",    label: "신뢰도",   className: "text-primary-accent" },
  { key: "outcome", label: "판정" },
];

export default function EQPdmTracePage() {
  return (
    <div className="p-8">
      <PageHeader title="예측 추적" accent="PDM TRACE" nodeRef="SCR-EQ-082" description="PdM 모델 예측값 vs 실측값 추적 DataTable." />
      <DataTable title="예측 추적 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
