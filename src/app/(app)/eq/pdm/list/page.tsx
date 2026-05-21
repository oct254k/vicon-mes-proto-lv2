import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const raw = [
  { ts: "2026-05-06 06:30", eqCode: "EQ-P3-CUT-01",   sensor: "진동",  value: "7.8 mm/s", risk: "HIGH",   action: "즉시 점검 요청", ack: "미확인" },
  { ts: "2026-05-06 05:00", eqCode: "EQ-P3-CUT-02",   sensor: "온도",  value: "82°C",     risk: "MED",    action: "경보 모니터링",   ack: "미확인" },
  { ts: "2026-05-05 22:15", eqCode: "EQ-P3-PRESS-01", sensor: "유압",  value: "23.5 MPa", risk: "MED",    action: "경보 모니터링",   ack: "확인" },
  { ts: "2026-05-05 18:00", eqCode: "EQ-P4-ASM-01",   sensor: "전류",  value: "295 A",    risk: "LOW",    action: "정상 감시 유지",  ack: "확인" },
];

const SL: Record<string,string> = { HIGH:"높음", MED:"중간", LOW:"낮음" };

const data = raw.map((r) => ({
  ...r,
  riskBadge: <StatusBadge type={r.risk === "HIGH" ? "error" : r.risk === "MED" ? "warning" : "idle"} label={SL[r.risk] ?? r.risk} />,
}));

const cols = [
  { key: "ts",      label: "감지 일시" },
  { key: "eqCode",  label: "설비 코드" },
  { key: "sensor",  label: "센서" },
  { key: "value",   label: "측정값",   className: "tabular-nums" },
  { key: "risk",    label: "위험도",   className: "text-primary-accent" },
  { key: "action",  label: "권고 조치" },
  { key: "ack",     label: "확인" },
];

export default function EQPdmListPage() {
  return (
    <div className="p-8">
      <PageHeader title="PdM 알림 목록" accent="PdM 알림" nodeRef="SCR-EQ-081" description="센서 기반 예측 정비 알림 목록." />
      <DataTable title="PdM 알림 목록" columns={cols} data={raw} bufferCount={raw.length} />
    </div>
  );
}
