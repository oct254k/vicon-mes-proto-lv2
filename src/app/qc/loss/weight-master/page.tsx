import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const WEIGHTS = [
  { stage: "① 입고검사", stageEnum: "RECEIVE_INSPECT", weightKg: "1.0×", weightM: "1.0×", basis: "원가 기준", effectiveFrom: "2026-01-01", note: "기본 단가" },
  { stage: "② 생산공정", stageEnum: "PRODUCTION", weightKg: "1.5×", weightM: "1.5×", basis: "공수 추가", effectiveFrom: "2026-01-01", note: "가공 공수 포함" },
  { stage: "③ 반제품검사", stageEnum: "SEMI_INSPECT", weightKg: "1.6×", weightM: "1.6×", basis: "공수 추가", effectiveFrom: "2026-01-01", note: "" },
  { stage: "④ 이동입고", stageEnum: "TRANSFER_IN", weightKg: "1.7×", weightM: "1.7×", basis: "운송비 추가", effectiveFrom: "2026-01-01", note: "" },
  { stage: "⑤ 조립", stageEnum: "ASSEMBLY", weightKg: "1.8×", weightM: "1.8×", basis: "조립 공수", effectiveFrom: "2026-01-01", note: "" },
  { stage: "⑥ 최종검사", stageEnum: "FINAL_INSPECT", weightKg: "2.0×", weightM: "2.0×", basis: "전체 공수", effectiveFrom: "2026-01-01", note: "" },
  { stage: "⑦ 보관", stageEnum: "STORAGE", weightKg: "2.1×", weightM: "2.1×", basis: "보관비 추가", effectiveFrom: "2026-01-01", note: "" },
  { stage: "⑧ 출하검사", stageEnum: "SHIP_INSPECT", weightKg: "2.5×", weightM: "2.5×", basis: "출하 공수", effectiveFrom: "2026-01-01", note: "" },
  { stage: "⑨ 현장도착", stageEnum: "SITE_ARRIVAL", weightKg: "3.0×", weightM: "3.0×", basis: "현장 처리비", effectiveFrom: "2026-01-01", note: "최대 가중치" },
];

const COLUMNS = [
  { key: "stage", label: "시점" },
  { key: "stageEnum", label: "Enum" },
  { key: "weightKg", label: "KG 가중치" },
  { key: "weightM", label: "M 가중치" },
  { key: "basis", label: "산정 기준" },
  { key: "effectiveFrom", label: "적용 시작일" },
  { key: "note", label: "비고" },
];

export default function QCLossWeightMasterPage() {
  return (
    <div>
      <PageHeader
        title="KG/M 기준 마스터"
        accent="가중치"
        nodeRef="SCR-QC-073"
        status="PROTOTYPE"
        description="9시점 손실 가중치 정책 마스터 — KG/M 단위 기준·이력 보존 (FNC-QC-103)"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
        <p className="text-sm opacity-70">9시점 enum별 KG·M 단위 손실 가중치를 정의합니다. 시점이 늦을수록 누적 공수·처리비가 높아져 가중치가 증가합니다 (FR-QC-050).</p>
      </div>

      <FieldHeader title="시점 가중치 목록" moduleRef="FNC-QC-103" />
      <div className="flex gap-3 mb-4">
        <div className="flex-1" />
        <button className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">신규 버전 생성</button>
        <button className="bg-surface-container-high border border-outline-variant/20 text-sm font-label uppercase px-4 py-1.5 hover:opacity-90">이력 보기</button>
      </div>

      <DataTable title="9시점 가중치 — 현행 버전 v1.0 (2026-01-01~)" columns={COLUMNS} data={WEIGHTS} bufferCount={9} />
      <p className="mt-4 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        가중치 수정 시 신버전 생성·이전 버전 이력 보존 | 손실 계산 → /qc/loss/calc
      </p>
    </div>
  );
}
