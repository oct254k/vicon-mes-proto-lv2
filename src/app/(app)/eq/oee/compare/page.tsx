import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const plants = [
  { name: "PLANT-P3000", avail: 92, perf: 96, qual: 99, oee: 87.3, eqCnt: 4, target: 90 },
  { name: "PLANT-P4000", avail: 88, perf: 93, qual: 98, oee: 80.1, eqCnt: 2, target: 85 },
  { name: "PLANT-P5000", avail: 95, perf: 97, qual: 99, oee: 91.1, eqCnt: 6, target: 90 },
];

function OeeBar({ val, target }: { val: number; target: number }) {
  return (
    <div className="relative h-2 bg-surface-container-highest w-full mt-1">
      <div className="h-2 bg-primary-accent" style={{ width: `${val}%` }} />
      <div className="absolute top-0 h-2 w-px bg-error" style={{ left: `${target}%` }} />
    </div>
  );
}

export default function EQOeeComparePage() {
  return (
    <div className="p-8">
      <PageHeader title="Plant 간 OEE 비교" accent="COMPARE" nodeRef="SCR-EQ-073" description="Plant 단위 OEE 비교 카드 뷰." />
      <FieldHeader title="Plant별 OEE 비교 (2026-05-06)" moduleRef="FR-EQ-073" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plants.map((p) => (
          <div key={p.name} className="bg-surface-container-low p-5 border-l-4 border-primary-accent">
            <p className="font-headline font-black text-sm uppercase tracking-widest mb-3">{p.name}</p>
            <div className="text-3xl font-black font-headline tabular-nums text-primary-accent mb-1">{p.oee}%</div>
            <div className="font-label text-xs opacity-40 mb-3">OEE / 목표 {p.target}%</div>
            <OeeBar val={p.oee} target={p.target} />
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              {[["가용성", p.avail], ["성능", p.perf], ["품질", p.qual]].map(([l, v]) => (
                <div key={l}>
                  <div className="font-headline font-bold text-sm tabular-nums">{v}%</div>
                  <div className="font-label text-xs opacity-40">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 font-label text-xs opacity-40">설비 수: {p.eqCnt}대</div>
          </div>
        ))}
      </div>
    </div>
  );
}
