import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const RULES = [
  { rule: "Rule 1", desc: "관리 한계 밖 1점", wc: "전체", material: "전체", action: "즉시 라인 정지 + MNT 알림", priority: "긴급" },
  { rule: "Rule 2", desc: "같은 방향 연속 9점", wc: "WC-CUT-01", material: "M-COIL-A", action: "QC 검사자 확인 + 원인 조사", priority: "높음" },
  { rule: "Rule 3", desc: "연속 6점 단조 증가/감소", wc: "WC-BEND-01", material: "전체", action: "공정 조정 요청", priority: "높음" },
  { rule: "Rule 4", desc: "연속 14점 교대", wc: "전체", material: "전체", action: "측정 시스템 점검", priority: "보통" },
  { rule: "Rule 5", desc: "±2σ 밖 5점 중 3점", wc: "전체", material: "M-SHEET-B", action: "QC 관리자 보고", priority: "높음" },
  { rule: "Rule 6", desc: "±1σ 밖 15점", wc: "전체", material: "전체", action: "공정 이상 조사", priority: "보통" },
  { rule: "Rule 7", desc: "±1σ 안 연속 15점", wc: "전체", material: "전체", action: "측정값 신뢰성 확인", priority: "낮음" },
  { rule: "Rule 8", desc: "±1σ 밖 8점 연속", wc: "전체", material: "전체", action: "공장장 즉시 보고", priority: "긴급" },
];

const COLUMNS = [
  { key: "rule", label: "Rule" },
  { key: "desc", label: "위반 조건" },
  { key: "wc", label: "적용 WC" },
  { key: "material", label: "적용 자재" },
  { key: "action", label: "자동 액션" },
  { key: "priority", label: "우선순위" },
];

export default function QCSpcRuleMapPage() {
  return (
    <div>
      <PageHeader
        title="8 Rules 위반 맵"
        accent="SPC"
        nodeRef="SCR-QC-006"
        status="PROTOTYPE"
        description="Western Electric 8 Rules × WC × Material 액션 매핑 마스터 (FNC-QC-043)"
      />

      <div className="bg-surface-container border-l-4 border-warning p-4 mb-6">
        <p className="text-sm font-body opacity-70">
          Western Electric 8 Rules — 관리도 이상 패턴 자동 감지 기준. Rule×WC×Material 조합별 처리 액션·우선순위를 정의합니다. 긴급 위반 시 라인 정지 알림 자동 발령 (FR-QC-031).
        </p>
      </div>

      <FieldHeader title="Rule×WC×Material 매핑" moduleRef="FNC-QC-043" />
      <div className="flex gap-3 mb-4">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>Rule 전체</option>
          {["Rule 1","Rule 2","Rule 3","Rule 4","Rule 5","Rule 6","Rule 7","Rule 8"].map((r) => <option key={r}>{r}</option>)}
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>우선순위 전체</option><option>긴급</option><option>높음</option><option>보통</option><option>낮음</option>
        </select>
        <div className="flex-1" />
        <button className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">+ 매핑 추가</button>
      </div>

      <DataTable title="8 Rules 액션 매핑 — 8건" columns={COLUMNS} data={RULES} bufferCount={8} />
    </div>
  );
}
