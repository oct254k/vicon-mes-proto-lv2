import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const INBOX = [
  { reqId: "DEL-20260505-001", delegator: "홍길동 (EMP1099)", delegatee: "김철수 (EMP1100)", period: "2026-05-07~09", scope: "WO 결재", reason: "연차 휴가", requestedAt: "2026-05-05 16:00", status: "PENDING" as const },
  { reqId: "DEL-20260504-003", delegator: "이품질 (EMP2011)", delegatee: "박작업 (EMP1058)", period: "2026-05-08~10", scope: "QC 검사 승인", reason: "출장", requestedAt: "2026-05-04 11:30", status: "PENDING" as const },
];

const BADGE: Record<string, "warning" | "running" | "idle"> = { PENDING: "warning", APPROVED: "running", REJECTED: "idle" };

export default function DelegationApprovalPage() {
  return (
    <div>
      <PageHeader title="위임 결재 인박스" nodeRef="SCR-USR-041" status="PROTOTYPE" description="대기 중인 위임 신청 결재. 직속 상위 또는 L3 MANAGER 이상 처리." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 결재 원칙" moduleRef="FNC-USR-061" />
        <ul className="text-xs text-on-surface/60 font-body space-y-1 leading-relaxed">
          <li>— 자기·상향 위임(수임자 레벨 ≥ 위임자) 신청 건은 시스템에서 자동 반려.</li>
          <li>— 수임자가 동일 부서·동급 이하인 경우만 결재 가능.</li>
          <li>— 30일 한도 초과 건은 자동 반려.</li>
        </ul>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 위임 결재 인박스 <span className="opacity-30 font-light ml-2">| 대기 {INBOX.length}건</span></h3>
          <span className="text-xs font-label opacity-40">FNC-USR-061</span>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["신청 ID", "위임자", "수임자", "기간", "위임 범위", "사유", "신청 시각", "상태", "액션"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {INBOX.map((r, i) => (
              <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 bg-warning/5">
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.reqId}</td>
                <td className="px-4 py-2 text-xs">{r.delegator}</td>
                <td className="px-4 py-2 text-xs text-primary-accent font-bold">{r.delegatee}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.period}</td>
                <td className="px-4 py-2 text-xs opacity-70">{r.scope}</td>
                <td className="px-4 py-2 text-xs opacity-60">{r.reason}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.requestedAt}</td>
                <td className="px-4 py-2"><StatusBadge type={BADGE[r.status]} label={r.status} /></td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">승인</button>
                    <button className="px-3 py-1 bg-surface-container border border-error/40 text-error text-xs font-label uppercase tracking-widest">반려</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
