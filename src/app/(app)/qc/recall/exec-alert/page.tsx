import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ALERTS = [
  {
    recallId: "RC-2026-003",
    lot: "LOT-20260420-05",
    partCode: "B01-1-G22C-C-150",
    client: "현대건설",
    qty: 12,
    severity: "HIGH",
    escalatedAt: "2026-04-25 09:05",
    escalatedBy: "qcmgr.lee",
    approvers: ["공장장 홍길동", "품질임원 박철수"],
    approvedCount: 1,
    note: "RECALL_CONFIRMED 즉시 임원 통보 (FNC-QC-096). 공장장 결재 완료, 임원 대기 중.",
  },
  {
    recallId: "RC-2026-001",
    lot: "LOT-20260315-01",
    partCode: "M-COIL-A-...008",
    client: "삼성물산",
    qty: 30,
    severity: "CRITICAL",
    escalatedAt: "2026-03-16 10:15",
    escalatedBy: "qcmgr.kim",
    approvers: ["공장장 홍길동", "품질임원 박철수", "CEO 김대표"],
    approvedCount: 3,
    note: "RECALL_CLOSED — 전원 결재 완료.",
  },
];

const SEV: Record<string, { type: "error" | "warning" }> = {
  HIGH: { type: "warning" },
  CRITICAL: { type: "error" },
};

export default function QCRecallExecAlertPage() {
  return (
    <div>
      <PageHeader
        title="임원 에스컬레이션"
        accent="회수"
        nodeRef="SCR-QC-052"
        status="PROTOTYPE"
        description="RECALL_CONFIRMED 공장장+임원 즉시 통보 (FNC-QC-096~097)"
      />

      <div className="bg-surface-container border-l-4 border-error p-4 mb-6 flex items-start gap-3">
        <StatusBadge type="error" label="ESCALATION" />
        <p className="text-sm opacity-70">RECALL_CONFIRMED 확정 즉시 공장장·품질임원 자동 통보. 임원 결재 미완료 시 24h 후 자동 재알림 (FNC-QC-097).</p>
      </div>

      <FieldHeader title="에스컬레이션 목록" moduleRef="FNC-QC-096" />
      <div className="space-y-4">
        {ALERTS.map((a) => (
          <div key={a.recallId} className="bg-surface-container-low border-l-4 border-error p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-headline font-black text-base text-primary-accent">{a.recallId}</span>
                  <StatusBadge type={SEV[a.severity].type} label={a.severity} />
                </div>
                <p className="font-mono text-xs opacity-50">{a.partCode} | {a.lot} | {a.client}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-40 font-label">에스컬레이션</p>
                <p className="text-xs tabular-nums">{a.escalatedAt}</p>
                <p className="text-xs opacity-50">by {a.escalatedBy}</p>
              </div>
            </div>
            <p className="text-sm opacity-70 mb-3">{a.note}</p>
            <div className="flex gap-4">
              <div>
                <p className="font-label text-xs uppercase opacity-50 mb-1">SCRAP 수량</p>
                <p className="font-headline font-bold">{a.qty}개</p>
              </div>
              <div>
                <p className="font-label text-xs uppercase opacity-50 mb-1">결재 현황</p>
                <p className="font-headline font-bold">{a.approvedCount} / {a.approvers.length} 완료</p>
              </div>
              <div>
                <p className="font-label text-xs uppercase opacity-50 mb-1">결재자</p>
                <p className="text-xs opacity-70">{a.approvers.join(" → ")}</p>
              </div>
            </div>
            {a.approvedCount < a.approvers.length && (
              <div className="mt-3 flex gap-2">
                <button className="bg-primary-accent text-white text-xs font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">결재 승인</button>
                <button className="bg-error/20 text-error text-xs font-label uppercase px-4 py-1.5 hover:opacity-90">재알림 발송</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
