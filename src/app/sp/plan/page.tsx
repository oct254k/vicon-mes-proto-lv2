import { PageHeader } from "@/components/ui/PageHeader";

const CARDS = [
  {
    title: "장기 계획",
    desc: "연간·분기 생산 물량 배분 — 수주 SO 기반 장기 로드맵",
    href: "/sp/plan/long-term",
    accent: "border-primary-accent",
    tag: "SCR-SP-020",
  },
  {
    title: "중기 계획",
    desc: "월·주차별 부재 생산 일정 — Gantt 형식 DataTable + CSS 바 차트",
    href: "/sp/plan/mid-term",
    accent: "border-primary-accent",
    tag: "SCR-SP-021",
  },
  {
    title: "일일 계획 보드",
    desc: "당일 작업 WO 발행 진입점 — Draft/Recalculating/Confirmed/Released/Superseded",
    href: "/sp/plan/daily",
    accent: "border-[#f59e0b]",
    tag: "SCR-SP-022 (핵심)",
  },
  {
    title: "일일 계획 신규 입력",
    desc: "계획 항목 수동 입력 폼 — SO·부재·수량·납기 지정",
    href: "/sp/plan/daily/new",
    accent: "border-on-surface/20",
    tag: "SCR-SP-023",
  },
];

const KPIS = [
  { label: "이번 주 계획 부재", value: "1,240", unit: "EA" },
  { label: "일일 계획 (오늘)", value: "87",    unit: "EA" },
  { label: "WO 미발행",        value: "12",    unit: "건" },
  { label: "계획 달성률",      value: "94.2",  unit: "%" },
];

export default function PlanLandingPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader
        title="생산계획"
        accent="랜딩"
        nodeRef="IA-SP-PLAN"
        description="장기 · 중기 · 일일 생산계획 바로가기 — PRC-SP-001 §6 진입점."
      />

      <div className="grid grid-cols-4 gap-3 mb-8">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-surface-container p-4 border-l-2 border-primary-accent">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.label}</p>
            <p className="font-headline font-black text-2xl">
              {k.value} <span className="text-sm font-normal opacity-50">{k.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className={`block bg-surface-container-lowest p-6 border-l-4 ${c.accent} hover:bg-surface-container transition-colors`}
          >
            <p className="font-label text-xs uppercase tracking-widest opacity-40 mb-1">{c.tag}</p>
            <h2 className="font-headline font-black text-lg uppercase tracking-tight mb-2">{c.title}</h2>
            <p className="text-sm text-on-surface-variant/80 font-body">{c.desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
