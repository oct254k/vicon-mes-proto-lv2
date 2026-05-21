import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const NAV = [
  { label: "불량 목록", href: "/qc/defect/list", ref: "SCR-QC-032", desc: "불량 트랜잭션 전체 조회·이력 DataTable" },
  { label: "PDA 불량 신고", href: "/qc/defect/report-pda", ref: "SCR-QC-030", desc: "현장 9시점 필수 + Camera + 사진 신고" },
  { label: "검사 대기 큐", href: "/qc/defect/inspect-queue", ref: "SCR-QC-040", desc: "QC 검사자 REPORTED→CONFIRMED 1단계 결재" },
  { label: "SCRAP 결재", href: "/qc/defect/scrap-approval", ref: "SCR-QC-042", desc: "공장장 DISPOSED→CLOSED 최종 4단계 결재" },
  { label: "관리자 불량 보드", href: "/qc/defect/manager-board", ref: "SCR-QC-041", desc: "QC 관리자 CONFIRMED→DISPOSED 4종 분기" },
  { label: "WO 동적 보충", href: "/qc/defect/wo-replenishment", ref: "SCR-QC-090", desc: "SCRAP 트리거 URGENT/NORMAL WO 자동 보충" },
];

const LIFECYCLE = [
  { step: "REPORTED", role: "작업자", status: "warning" as const },
  { step: "확정", role: "QC 검사자", status: "running" as const },
  { step: "DISPOSED", role: "QC 관리자", status: "warning" as const },
  { step: "CLOSED", role: "공장장", status: "idle" as const },
];

export default function QCDefectLanding() {
  return (
    <div>
      <PageHeader
        title="불량"
        accent="랜딩"
        nodeRef="IA-QC-DEFECT"
        status="PROTOTYPE"
        description="불량 신고·4계층 결재·4종 트랜잭션·WO 보충 전체 진입점 (PRC-QC-001)"
      />

      <FieldHeader title="불량 라이프사이클 (4계층 결재)" moduleRef="FR-QC-003" />
      <div className="flex items-center gap-0 mb-8 overflow-x-auto">
        {LIFECYCLE.map((l, i) => (
          <div key={l.step} className="flex items-center">
            <div className="px-4 py-3 bg-surface-container-low flex flex-col items-center gap-1 min-w-[100px]">
              <StatusBadge type={l.status} label={l.step} />
              <p className="text-xs opacity-40 font-label mt-1">{l.role}</p>
            </div>
            {i < LIFECYCLE.length - 1 && <div className="text-primary-accent text-lg px-2 opacity-40">→</div>}
          </div>
        ))}
      </div>

      <FieldHeader title="불량 화면 목록" moduleRef="SCR-QC-030, 032, 040~042, 090" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="block bg-surface-container-low border-l-4 border-primary-accent p-5 hover:bg-surface-container transition-colors">
            <p className="font-headline font-bold text-base mb-1">{n.label}</p>
            <p className="text-xs text-on-surface/50">{n.desc}</p>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        4종 트랜잭션: DEFECT / SCRAP / CLAIM / RETURN | 9시점 enum 강제 (FR-QC-050)
      </p>
    </div>
  );
}
