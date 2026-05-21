import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const HISTORY = [
  { reqId: "GR-20260506-011", requester: "kim.kj@vicon.local", target: "박작업", type: "레벨 상향 L1→L2", requestedAt: "2026-05-06 08:30", decidedAt: "—", approver: "—", result: "PENDING" },
  { reqId: "GR-20260505-009", requester: "최관리", target: "정출하", type: "부서 추가 SHP", requestedAt: "2026-05-05 17:10", decidedAt: "—", approver: "—", result: "PENDING" },
  { reqId: "GR-20260504-007", requester: "kim.kj@vicon.local", target: "김계직", type: "메뉴 권한 추가", requestedAt: "2026-05-04 11:00", decidedAt: "2026-05-04 13:22", approver: "최관리(L4)", result: "APPROVED" },
  { reqId: "GR-20260503-005", requester: "박작업", target: "박작업(셀프)", type: "부서 추가 QC", requestedAt: "2026-05-03 09:00", decidedAt: "2026-05-03 10:15", approver: "kim.kj@vicon.local(L2)", result: "REJECTED" },
  { reqId: "GR-20260502-002", requester: "kim.kj@vicon.local", target: "이품질", type: "레벨 상향 L1→L2", requestedAt: "2026-05-02 14:00", decidedAt: "2026-05-02 15:30", approver: "최관리(L4)", result: "APPROVED" },
];

const COLS = [
  { key: "reqId", label: "신청 ID" },
  { key: "requester", label: "신청자" },
  { key: "target", label: "대상" },
  { key: "type", label: "신청 내용" },
  { key: "requestedAt", label: "신청 시각" },
  { key: "decidedAt", label: "결재 시각" },
  { key: "approver", label: "결재자" },
  { key: "result", label: "결과" },
];

export default function GrantHistoryPage() {
  return (
    <div>
      <PageHeader title="권한 신청·결재 이력" nodeRef="SCR-USR-033" status="PROTOTYPE" description="본인 신청 및 결재 이력 전체 조회. 본인 또는 L3+ 열람 가능." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 필터" moduleRef="FNC-USR-056" />
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 시작</label>
            <input type="date" defaultValue="2026-05-01" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 종료</label>
            <input type="date" defaultValue="2026-05-06" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">결과</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>PENDING</option><option>APPROVED</option><option>REJECTED</option>
            </select>
          </div>
          <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold">검색</button>
          <button className="px-4 py-1.5 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">CSV 내보내기</button>
        </div>
      </div>

      <DataTable title="B. 이력 목록" columns={COLS} data={HISTORY} bufferCount={5} />
    </div>
  );
}
