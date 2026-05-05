import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const mo = {
  moNo: "MO-2026-0501-001", eqCode: "EQ-P3-CUT-01", eqName: "절단기 #1",
  type: "BM (고장 정비)", priority: "긴급", planDate: "2026-05-06", planHr: "4",
  assignee: "홍길동", status: "결재 대기", desc: "유압 실린더 씰 파손으로 오일 누유 발생. 즉시 교체 필요.",
};

const approvals = [
  { step: "1", role: "정비팀장", name: "이순신", status: "승인", ts: "2026-05-06 10:00" },
  { step: "2", role: "생산부장", name: "김관장", status: "대기", ts: "—" },
];

export default function EQMaintOrderDetailPage() {
  return (
    <div className="p-8">
      <PageHeader title="MO 상세" accent="DETAIL" nodeRef="SCR-EQ-041" description="정비 작업지시 상세 정보 및 결재 프로세스." />
      <FieldHeader title="작업지시 정보" moduleRef={mo.moNo} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          ["MO 번호", mo.moNo], ["설비 코드", mo.eqCode], ["설비명", mo.eqName],
          ["정비 유형", mo.type], ["우선순위", mo.priority], ["예정일", mo.planDate],
          ["예정 시간(h)", mo.planHr], ["담당자", mo.assignee],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface-container-low p-3">
            <p className="font-label text-xs uppercase tracking-widest opacity-40 mb-1">{k}</p>
            <p className="font-headline text-sm font-bold">{v}</p>
          </div>
        ))}
        <div className="bg-surface-container-low p-3 flex items-center gap-2">
          <p className="font-label text-xs uppercase tracking-widest opacity-40 mr-2">상태</p>
          <StatusBadge type="warning" label={mo.status} />
        </div>
      </div>
      <FieldHeader title="작업 내용" moduleRef="FR-EQ-051" />
      <div className="bg-surface-container p-4 mb-8 text-sm font-body text-on-surface/70">{mo.desc}</div>
      <FieldHeader title="결재 현황" moduleRef="FR-EQ-052" />
      <div className="space-y-2">
        {approvals.map((a) => (
          <div key={a.step} className="flex items-center gap-4 bg-surface-container-low p-3">
            <span className="font-label text-xs opacity-40">STEP {a.step}</span>
            <span className="font-headline text-sm font-bold w-24">{a.role}</span>
            <span className="font-headline text-sm w-20">{a.name}</span>
            <StatusBadge type={a.status === "승인" ? "running" : "warning"} label={a.status} />
            <span className="font-label text-xs opacity-40 ml-auto">{a.ts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
