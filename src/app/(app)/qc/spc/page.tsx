import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const NAV = [
  { label: "측정값 목록", href: "/qc/spc/measure-list", ref: "SCR-QC-012", desc: "시계열 측정값 조회·위반 행 빨강 강조" },
  { label: "PDA 측정 입력", href: "/qc/spc/measure-pda", ref: "SCR-QC-010", desc: "현장 스캔→측정→즉시 평가 (PDA 최적화)" },
  { label: "SPC 알림 보드", href: "/qc/spc/alert", ref: "SCR-QC-023", desc: "8 Rules 위반 알림 인박스·처리" },
  { label: "관리도 선택", href: "/qc/spc/chart", ref: "SCR-QC-020", desc: "X-bar/R/p-chart 항목 선택 카드" },
  { label: "위반 포인트 상세", href: "/qc/spc/chart/detail", ref: "SCR-QC-021", desc: "특정 위반 포인트 4Depth 시계열 분석" },
  { label: "8 Rules 위반 맵", href: "/qc/spc/chart/rule-map", ref: "SCR-QC-006", desc: "Western Electric Rule×WC×Material 액션 매핑" },
];

const SUMMARY = [
  { label: "OPEN 알림", value: "8건", status: "error" as const },
  { label: "INVESTIGATING", value: "5건", status: "warning" as const },
  { label: "오늘 측정 수", value: "81건", status: "running" as const },
];

export default function QCSpcLanding() {
  return (
    <div>
      <PageHeader
        title="SPC"
        accent="랜딩"
        nodeRef="IA-QC-SPC"
        status="PROTOTYPE"
        description="SPC 측정·관리도·8 Rules 알림 전체 진입점 (PRC-QC-002 §6)"
      />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-5 mb-6">
        <p className="text-sm opacity-70 font-body leading-relaxed">
          SPC 측정 항목 마스터 기반 현장 측정값 수집 → X-bar/R 관리도 자동 생성 → Western Electric 8 Rules 위반 감지 → 알림 발령·처리 전 사이클.
        </p>
      </div>

      <FieldHeader title="SPC 현황 요약" moduleRef="FNC-QC-030~036" />
      <div className="grid grid-cols-3 gap-3 mb-8">
        {SUMMARY.map((s) => (
          <div key={s.label} className="bg-surface-container-low p-4 flex flex-col gap-2">
            <p className="font-label text-xs uppercase tracking-widest opacity-50">{s.label}</p>
            <p className="font-headline font-black text-2xl">{s.value}</p>
            <StatusBadge type={s.status} label={s.status.toUpperCase()} />
          </div>
        ))}
      </div>

      <FieldHeader title="SPC 화면 목록" moduleRef="SCR-QC-006, 010, 012, 020~023" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="block bg-surface-container-low border-l-4 border-primary-accent p-5 hover:bg-surface-container transition-colors">
            <p className="font-headline font-bold text-base mb-1">{n.label}</p>
            <p className="text-xs text-on-surface/50">{n.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
