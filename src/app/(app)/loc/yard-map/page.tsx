import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const YARDS = [
  { id: "Y-RAW",    label: "원자재 야적장",   total: 30, full: 5, aging: 2, occupied: 14, maint: 1 },
  { id: "Y-IN",     label: "입고 대기",       total: 12, full: 2, aging: 0, occupied: 5,  maint: 0 },
  { id: "Y-WIP",    label: "공정 진행",       total: 20, full: 3, aging: 1, occupied: 10, maint: 2 },
  { id: "Y-OUT",    label: "출고 대기",       total: 15, full: 4, aging: 1, occupied: 8,  maint: 0 },
];

const COLOR_MAP: Record<string, string> = {
  EMPTY: "bg-[#2a2a2a] border border-white/5",
  OCCUPIED: "bg-[#00912F]/30 border border-[#00912F]/40",
  FULL: "bg-[#f59e0b]/30 border border-[#f59e0b]/40",
  AGING: "bg-[#f97316]/30 border border-[#f97316]/40",
  MAINTENANCE: "bg-[#ef4444]/20 border border-[#ef4444]/30",
};

function MiniMap({ yard }: { yard: typeof YARDS[0] }) {
  const states = Array.from({ length: yard.total }, (_, i) => {
    if (i < yard.maint)    return "MAINTENANCE";
    if (i < yard.maint + yard.aging) return "AGING";
    if (i < yard.maint + yard.aging + yard.full)  return "FULL";
    if (i < yard.maint + yard.aging + yard.full + yard.occupied) return "OCCUPIED";
    return "EMPTY";
  });
  return (
    <div className="grid grid-cols-6 gap-0.5">
      {states.map((s, i) => <div key={i} className={`w-5 h-5 ${COLOR_MAP[s]}`} />)}
    </div>
  );
}

export default function YardMapLandingPage() {
  return (
    <div>
      <PageHeader
        title="야적장 도면"
        accent="YARD-MAP"
        nodeRef="SCR-LOC-010"
        status="PROTOTYPE"
        description="Plant P3000 야적장 전체 현황. Yard 카드 클릭 → 격자 상세 조회."
      />

      <FieldHeader title="P3000 야적장 개요" moduleRef="FNC-LOC-023" />
      <div className="grid grid-cols-2 gap-6 mb-8">
        {YARDS.map(y => {
          const pct = Math.round(((y.full + y.occupied) / y.total) * 100);
          return (
            <a key={y.id} href={`/loc/yard-map/view?yard=${y.id}`}
              className="bg-[#1a1a1a] border border-white/10 p-5 hover:border-[#00912F]/50 transition-colors block group">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-label font-bold text-xs uppercase tracking-widest text-[#00912F]">{y.id}</p>
                  <p className="text-white/60 text-sm">{y.label}</p>
                </div>
                <span className={`font-black text-2xl ${pct >= 90 ? "text-[#ef4444]" : pct >= 70 ? "text-[#f59e0b]" : "text-white"}`}>{pct}%</span>
              </div>
              <MiniMap yard={y} />
              <div className="flex gap-3 mt-3 text-xs font-label text-white/40">
                <span>FULL <span className="text-[#f59e0b]">{y.full}</span></span>
                <span>AGING <span className="text-[#f97316]">{y.aging}</span></span>
                <span>MAINT <span className="text-[#ef4444]">{y.maint}</span></span>
              </div>
              <p className="text-xs text-[#00912F]/60 mt-3 group-hover:text-[#00912F] font-label uppercase tracking-widest">
                격자 보기 ▶
              </p>
            </a>
          );
        })}
      </div>

      <div className="flex gap-2">
        <a href="/loc/yard-map/edit" className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-[#00912F]/50 transition-colors">
          [편집 모드 ▶]
        </a>
        <a href="/loc/yard-map/occupancy" className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-[#00912F]/50 transition-colors">
          [점유율 통계 ▶]
        </a>
      </div>
    </div>
  );
}
