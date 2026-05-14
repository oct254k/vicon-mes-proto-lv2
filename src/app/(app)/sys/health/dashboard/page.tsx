import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const KPI_CARDS = [
  { key:"서버",     up:12, total:12, state:"running" as const, extra:"CPU avg 34%" },
  { key:"DB",       up:4,  total:4,  state:"running" as const, extra:"4 카테고리 정상" },
  { key:"메시지 큐",up:3,  total:4,  state:"warning" as const, extra:"LINEBOARD Q 지연" },
  { key:"외부 연동",up:5,  total:6,  state:"warning" as const, extra:"EDI DOWN" },
  { key:"단말",     up:47, total:48, state:"running" as const, extra:"LOST 1건" },
  { key:"라이선스", up:1,  total:1,  state:"warning" as const, extra:"만료 14일" },
];

export default function HealthDashboardPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="헬스 대시보드" accent="HEALTH" nodeRef="SCR-SYS-090" status="PROTOTYPE"
        description="6종 헬스 카드 (서버·DB·큐·연동·단말·라이선스) — 5분 신선도 (FNC-SYS-090·096)" />
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-label text-on-surface-variant opacity-50">기준시각: 2026-05-06 09:55 KST</span>
        <span className="text-xs font-label text-[#00912F] uppercase">신선</span>
      </div>
      <FieldHeader title="6종 헬스 카드" moduleRef="FNC-SYS-090" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {KPI_CARDS.map(c => (
          <div key={c.key} className={`bg-surface-container p-5 border-l-4 ${c.state === "running" ? "border-[#00912F]" : "border-warning"}`}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60">{c.key}</p>
              <StatusBadge type={c.state} label={c.state === "running" ? "OK" : "WARN"} />
            </div>
            <p className="font-headline font-black text-2xl tabular-nums mb-1">{c.up}/{c.total}</p>
            <p className="text-xs text-on-surface-variant opacity-60">{c.extra}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="빠른 링크" moduleRef="SCR-SYS-091" />
      <a href="/sys/health/dbcat" className="inline-block px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">
        DB 카테고리 상세 →
      </a>
    </div>
  );
}
