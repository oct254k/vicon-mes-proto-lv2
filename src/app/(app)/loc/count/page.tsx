import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const QUICK = [
  { label: "실사 계획",  href: "/loc/count/plan",   desc: "실사 계획 생성·목록" },
  { label: "실사 시트",  href: "/loc/count/sheet",  desc: "PDA 카운트 입력 시트" },
  { label: "실사 보고서",href: "/loc/count/report",  desc: "정합률·차이 보고서" },
];

const KPI = [
  { label: "진행 중 실사",  value: "1건",   badge: "warning"  as const },
  { label: "지난 정합률",   value: "99.2%", badge: "running"  as const },
  { label: "차이 건수",     value: "3건",   badge: "idle"     as const },
];

const HISTORY = [
  { id:"CNT-20260501", period:"2026-05-01 ~ 2026-05-01", locations:38, accuracy:"99.2%", diff:3, status:"완료" },
  { id:"CNT-20260401", period:"2026-04-01 ~ 2026-04-02", locations:38, accuracy:"98.7%", diff:5, status:"완료" },
];

export default function CountLandingPage() {
  return (
    <div>
      <PageHeader
        title="실사 관리"
        accent="재고 실사"
        nodeRef="SCR-LOC-050"
        status="PROTOTYPE"
        description="재고 실사 계획·카운트·보고서 랜딩. 맹검 카운트 방식, FIFO 기반 자동 ADJUST."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">{k.value}</p>
            <div className="mt-2"><StatusBadge type={k.badge} label={k.badge.toUpperCase()} /></div>
          </div>
        ))}
      </div>

      <FieldHeader title="빠른 진입" moduleRef="SCR-LOC-050" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {QUICK.map(q => (
          <a key={q.label} href={q.href}
            className="bg-surface-elevated border border-outline/20 p-6 hover:border-[#00912F]/50 transition-colors block group">
            <p className="font-label font-bold uppercase tracking-widest text-xs text-[#00912F] mb-2">{q.label}</p>
            <p className="text-on-surface/50 text-sm">{q.desc}</p>
            <p className="text-xs text-[#00912F]/50 mt-4 group-hover:text-[#00912F] font-label uppercase tracking-widest">진입 ▶</p>
          </a>
        ))}
      </div>

      <FieldHeader title="실사 이력" moduleRef="FNC-LOC-083" />
      <div className="bg-surface-elevated">
        <div className="p-3 border-l-4 border-[#00912F]">
          <span className="text-xs font-label uppercase tracking-widest text-on-surface/40">최근 실사 ({HISTORY.length}건)</span>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-outline/10">
            <tr>
              {["ID","기간","위치 수","정합률","차이","상태"].map(h => (
                <th key={h} className="px-4 py-2 text-left text-xs font-label uppercase tracking-widest text-on-surface/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY.map(r => (
              <tr key={r.id} className="border-b border-outline/10 hover:bg-white/5">
                <td className="px-4 py-2 text-[#00912F] font-headline">{r.id}</td>
                <td className="px-4 py-2 text-on-surface/60">{r.period}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface/60">{r.locations}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface font-bold">{r.accuracy}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface/60">{r.diff}건</td>
                <td className="px-4 py-2"><StatusBadge type="running" label={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
