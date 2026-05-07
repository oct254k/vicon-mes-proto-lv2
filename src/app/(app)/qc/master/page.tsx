import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const NAV = [
  { label: "SPC 측정 항목", href: "/qc/master/item", ref: "SCR-QC-001", desc: "UCL/CL/LCL 및 적용 공정 마스터 DataTable + 편집" },
  { label: "관리 한계 설정", href: "/qc/master/limit", ref: "SCR-QC-004", desc: "UCL·LCL·CL 버전 관리 및 자동 재산정" },
  { label: "불량 코드 마스터", href: "/qc/master/defect-code", ref: "SCR-QC-005", desc: "9시점 불량 코드·책임 부서·처리 액션 매핑" },
];

const STATS = [
  { label: "SPC 측정 항목 (활성)", value: "4건" },
  { label: "관리 한계 버전", value: "v3 최신" },
  { label: "불량 코드 (활성)", value: "5건" },
];

export default function QCMasterLanding() {
  return (
    <div>
      <PageHeader
        title="QC 마스터"
        accent="MASTER"
        nodeRef="IA-QC-MASTER"
        status="PROTOTYPE"
        description="SPC 측정 항목·관리 한계·불량 코드 마스터 진입점 (FNC-QC-010~018, 051)"
      />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-5 mb-6">
        <p className="text-sm opacity-70 font-body leading-relaxed">
          QC 마스터 — 측정 항목(I-001~005) UCL/CL/LCL 설정, 한계 버전 이력, 9시점 불량 코드·처리 액션 매핑을 관리합니다. 마스터 변경 시 이전 버전 자동 보존 (FNC-QC-012, 014).
        </p>
      </div>

      <FieldHeader title="마스터 현황" moduleRef="FNC-QC-015, 012, 051" />
      <div className="grid grid-cols-3 gap-3 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface-container-low border-l-4 border-outline-variant/20 p-4">
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{s.label}</p>
            <p className="font-headline font-black text-xl">{s.value}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="마스터 화면 목록" moduleRef="SCR-QC-001, 004, 005" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="block bg-surface-container-low border-l-4 border-primary-accent p-5 hover:bg-surface-container transition-colors">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">{n.ref}</p>
            <p className="font-headline font-bold text-base mb-1">{n.label}</p>
            <p className="text-xs text-on-surface/50">{n.desc}</p>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        마스터 권한: QC-MGR (R/C/U/D) | WORKER (R only) | 변경 이력 → SCR-QC-003
      </p>
    </div>
  );
}
