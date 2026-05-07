import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const NAV = [
  { label: "품질 KPI 메인", href: "/qc/dashboard/main", ref: "SCR-QC-000", desc: "불량률·SPC 위반·손실 종합 KPI 카드·차트" },
  { label: "손실 요약 차트", href: "/qc/dashboard/loss-summary", ref: "SCR-QC-071", desc: "시점·공장·공급사 손실 환산 리포트" },
];

const QUICK_KPI = [
  { label: "합격률", value: "98.7%", status: "running" as const },
  { label: "부적합률", value: "1.3%", status: "warning" as const },
  { label: "SPC OPEN", value: "8건", status: "error" as const },
  { label: "이번 달 손실", value: "₩12.4M", status: "warning" as const },
];

export default function QCDashboardLanding() {
  return (
    <div>
      <PageHeader
        title="QC 대시보드"
        accent="DASHBOARD"
        nodeRef="IA-QC-DASH"
        status="PROTOTYPE"
        description="품질 KPI·SPC 알림·손실 요약 통합 대시보드 진입점 (FNC-QC-004~007)"
      />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-5 mb-6">
        <p className="text-sm opacity-70 font-body leading-relaxed">
          QC 도메인 대시보드 — 품질 KPI·SPC 위반·불량 트랜잭션·위험 확산·손실 현황을 통합 조망합니다. 공장(P3000) 기준, 최근 30일 집계.
        </p>
      </div>

      <FieldHeader title="실시간 요약 지표" moduleRef="FNC-QC-004~006" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {QUICK_KPI.map((k) => (
          <div key={k.label} className="bg-surface-container-low p-4 flex flex-col gap-2">
            <p className="font-label text-xs uppercase tracking-widest opacity-50">{k.label}</p>
            <p className="font-headline font-black text-2xl">{k.value}</p>
            <StatusBadge type={k.status} label={k.status.toUpperCase()} />
          </div>
        ))}
      </div>

      <FieldHeader title="화면 목록" moduleRef="SCR-QC-000, 071" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="block bg-surface-container-low border-l-4 border-primary-accent p-5 hover:bg-surface-container transition-colors">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">{n.ref}</p>
            <p className="font-headline font-bold text-base mb-1">{n.label}</p>
            <p className="text-xs text-on-surface/50">{n.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <Link href="/qc/spc/alert" className="text-xs font-label uppercase tracking-widest text-primary-accent hover:underline">→ SPC 알림 보드</Link>
        <Link href="/qc/defect/list" className="text-xs font-label uppercase tracking-widest text-primary-accent hover:underline">→ 불량 목록</Link>
        <Link href="/qc/recall/board" className="text-xs font-label uppercase tracking-widest text-primary-accent hover:underline">→ 회수 보드</Link>
      </div>
    </div>
  );
}
