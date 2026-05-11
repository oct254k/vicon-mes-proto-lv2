import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const pdmAlerts = [
  {
    type: "SPC",
    eq: "EQ-P3000-CUT-01",
    predict: "절단 폭 CL 상한 초과 (120.8mm)",
    confidence: "92%",
    action: "PdM MO 발행",
    ts: "2026-05-05 12:10",
    detail: "[진단 상세]",
  },
  {
    type: "COMPONENT",
    eq: "EQ-P3000-CUT-01",
    predict: "BEARING-C 수명 102% 초과",
    confidence: "98%",
    action: "교체 등록",
    ts: "2026-05-05 09:00",
    detail: "[진단 상세]",
  },
  {
    type: "SPC",
    eq: "EQ-P3000-PRESS-02",
    predict: "SPC-ALT-1018 이상 패턴",
    confidence: "85%",
    action: "PdM MO 발행",
    ts: "2026-05-04 16:45",
    detail: "[진단 상세]",
  },
  {
    type: "MANUAL",
    eq: "EQ-P3000-WELD-03",
    predict: "설비팀 수동 발의",
    confidence: "—",
    action: "진단 확인",
    ts: "2026-05-03 10:00",
    detail: "[진단 상세]",
  },
];

export default function EQPdmPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="PdM"
        accent="알림 인박스"
        nodeRef="IA-EQ-PDM-LIST"
        description="예지정비 발의 큐 (SPC / Component / 수동)"
      />

      <DataTable
        title="PdM 후보 큐"
        columns={[
          { key: "type", label: "알림 유형" },
          { key: "eq", label: "설비" },
          { key: "predict", label: "예측 내용" },
          { key: "confidence", label: "신뢰도" },
          { key: "action", label: "권고 조치" },
          { key: "ts", label: "발생일시" },
          { key: "detail", label: "진단 상세", className: "text-primary-accent underline cursor-pointer" },
        ]}
        data={pdmAlerts}
        bufferCount={pdmAlerts.length}
      />

      <div className="mt-4 bg-surface-container-lowest p-4 border-l-4 border-primary-accent/40">
        <p className="text-xs font-label opacity-50 uppercase tracking-widest">
          FNC-EQ-080 SPC→PdM 자동 · FNC-EQ-086 BM 진행중 후순위 · FNC-EQ-081 매핑 미설정 보류
        </p>
      </div>
    </div>
  );
}
