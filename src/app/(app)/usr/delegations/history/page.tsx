import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const HISTORY = [
  { reqId: "DEL-20260505-001", delegator: "홍길동", delegatee: "김철수", period: "2026-05-07~09", scope: "WO 결재", requestedAt: "2026-05-05", decidedAt: "—", result: "PENDING" },
  { reqId: "DEL-20260504-003", delegator: "이품질", delegatee: "박작업", period: "2026-05-08~10", scope: "QC 검사 승인", requestedAt: "2026-05-04", decidedAt: "—", result: "PENDING" },
  { reqId: "DEL-20260420-011", delegator: "김계직", delegatee: "정출하", period: "2026-04-22~24", scope: "출하 허가", requestedAt: "2026-04-20", decidedAt: "2026-04-21", result: "APPROVED" },
  { reqId: "DEL-20260410-008", delegator: "박작업", delegatee: "이품질", period: "2026-04-11~12", scope: "WO 결재", requestedAt: "2026-04-10", decidedAt: "2026-04-10", result: "REJECTED" },
  { reqId: "DEL-20260401-002", delegator: "홍길동", delegatee: "김철수", period: "2026-04-03~07", scope: "WO 결재", requestedAt: "2026-04-01", decidedAt: "2026-04-08", result: "EXPIRED" },
];

const COLS = [
  { key: "reqId", label: "신청 ID" },
  { key: "delegator", label: "위임자" },
  { key: "delegatee", label: "수임자" },
  { key: "period", label: "기간" },
  { key: "scope", label: "위임 범위" },
  { key: "requestedAt", label: "신청일" },
  { key: "decidedAt", label: "결재일" },
  { key: "result", label: "결과" },
];

export default function DelegationHistoryPage() {
  return (
    <div>
      <PageHeader title="위임 이력" nodeRef="SCR-USR-043" status="PROTOTYPE" description="위임 신청·결재·만료·회수 전체 이력. REQUESTED/APPROVED/EXPIRED/REVOKED 상태 표시." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 필터" moduleRef="FNC-USR-064" />
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 시작</label>
            <input type="date" defaultValue="2026-04-01" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 종료</label>
            <input type="date" defaultValue="2026-05-06" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">결과</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>PENDING</option><option>APPROVED</option><option>REJECTED</option><option>EXPIRED</option><option>REVOKED</option>
            </select>
          </div>
          <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold">검색</button>
          <button className="px-4 py-1.5 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">CSV 내보내기</button>
        </div>
      </div>

      <DataTable title="B. 위임 이력 목록" columns={COLS} data={HISTORY} bufferCount={5} />
    </div>
  );
}
