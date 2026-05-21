import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const INBOX = [
  { reqId: "GR-20260506-011", requester: "kim.kj@vicon.local", target: "EMP1058 박작업", type: "레벨 상향 L1→L2", requestedAt: "2026-05-06 08:30", priority: "보통", status: "PENDING" as const },
  { reqId: "GR-20260505-009", requester: "EMP9001 최관리", target: "EMP3030 정출하", type: "부서 추가 SHP", requestedAt: "2026-05-05 17:10", priority: "긴급", status: "PENDING" as const },
  { reqId: "GR-20260504-007", requester: "kim.kj@vicon.local", target: "EMP1042 김계직", type: "메뉴 권한 추가", requestedAt: "2026-05-04 11:00", priority: "보통", status: "APPROVED" as const },
];

const BADGE: Record<string, "warning" | "running" | "idle"> = { PENDING: "warning", APPROVED: "running", REJECTED: "idle" };
const SL: Record<string, string> = { PENDING:"검토중", APPROVED:"승인", REJECTED:"반려" };

export default function GrantApprovalPage() {
  return (
    <div>
      <PageHeader title="권한 결재 인박스" nodeRef="SCR-USR-031" status="PROTOTYPE" description="대기 중인 권한 부여 신청 결재 목록. L3 MANAGER 이상 전용." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 필터" moduleRef="FNC-USR-051/054" />
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">상태</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>PENDING</option><option>APPROVED</option><option>REJECTED</option><option>전체</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">신청 유형</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>레벨 상향</option><option>부서 추가</option><option>메뉴 권한 추가</option>
            </select>
          </div>
          <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">검색</button>
        </div>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 결재 인박스 <span className="opacity-30 font-light ml-2">| 대기 2건</span></h3>
          <span className="text-xs font-label opacity-40">FNC-USR-051/054/055</span>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["신청 ID", "신청자", "대상", "신청 내용", "신청 시각", "우선순위", "상태", "액션"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {INBOX.map((r, i) => (
              <tr key={i} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 ${r.status === "PENDING" ? "bg-warning/5" : ""}`}>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.reqId}</td>
                <td className="px-4 py-2 text-xs">{r.requester}</td>
                <td className="px-4 py-2 text-xs">{r.target}</td>
                <td className="px-4 py-2 text-xs">{r.type}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.requestedAt}</td>
                <td className="px-4 py-2 text-xs">{r.priority === "긴급" ? <span className="text-error font-bold">긴급</span> : r.priority}</td>
                <td className="px-4 py-2"><StatusBadge type={BADGE[r.status]} label={SL[r.status] ?? r.status} /></td>
                <td className="px-4 py-2">
                  {r.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">승인</button>
                      <button className="px-3 py-1 bg-surface-container border border-error/40 text-error text-xs font-label uppercase tracking-widest">반려</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
