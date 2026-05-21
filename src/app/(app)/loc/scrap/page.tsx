import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const QUICK = [
  { label: "SCRAP 등록",  href: "/loc/scrap/new",    desc: "신규 SCRAP 등록 폼" },
  { label: "불량 처리",   href: "/loc/scrap/defect",  desc: "불량 격리·폐기 결재" },
  { label: "자투리 등록", href: "/loc/scrap/offcut",  desc: "Offcut Pool 자투리 등록" },
];

const KPI = [
  { label: "이번 달 SCRAP",  value: "7건",   badge: "warning" as const, badgeLabel: "경고" },
  { label: "불량 격리 대기",  value: "2건",   badge: "stopped" as const, badgeLabel: "정지" },
  { label: "자투리 풀",       value: "5건",   badge: "idle"    as const, badgeLabel: "유휴" },
];

const RECENT = [
  { id: "SCR-20260505-003", material: "M-COIL-A P3000 900m", qty: "50m",   reason: "표면 결함",  date: "2026-05-05", status: "완료" },
  { id: "SCR-20260504-002", material: "M-PLATE-01",          qty: "200kg", reason: "치수 불량",  date: "2026-05-04", status: "결재중" },
  { id: "SCR-20260503-001", material: "M-BOLT-M16",          qty: "200EA", reason: "녹 발생",    date: "2026-05-03", status: "완료" },
];

export default function ScrapLandingPage() {
  return (
    <div>
      <PageHeader
        title="SCRAP 관리"
        accent="스크랩"
        nodeRef="SCR-LOC-042"
        status="PROTOTYPE"
        description="SCRAP 등록·불량 처리·자투리(Offcut) Pool 관리 랜딩. 빠른 진입 카드."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">{k.value}</p>
            <div className="mt-2"><StatusBadge type={k.badge} label={k.badgeLabel} /></div>
          </div>
        ))}
      </div>

      <FieldHeader title="빠른 진입" moduleRef="SCR-LOC-042" />
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

      <FieldHeader title="최근 SCRAP 내역" moduleRef="FNC-LOC-070" />
      <div className="bg-surface-elevated">
        <div className="p-3 border-l-4 border-[#00912F]">
          <span className="text-xs font-label uppercase tracking-widest text-on-surface/40">최근 3건</span>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {RECENT.map(r => (
              <tr key={r.id} className="border-b border-outline/10 hover:bg-white/5">
                <td className="px-4 py-2 text-[#00912F] font-headline">{r.id}</td>
                <td className="px-4 py-2 text-on-surface/70">{r.material}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface/60">{r.qty}</td>
                <td className="px-4 py-2 text-on-surface/50">{r.reason}</td>
                <td className="px-4 py-2 text-on-surface/40 text-xs">{r.date}</td>
                <td className="px-4 py-2">
                  <StatusBadge type={r.status === "완료" ? "running" : "warning"} label={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
