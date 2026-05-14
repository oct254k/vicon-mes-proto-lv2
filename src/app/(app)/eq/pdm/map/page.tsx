import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const cells = [
  { eq: "EQ-P3-CUT-01",   risk: "H", score: 92, color: "bg-error/70 text-white" },
  { eq: "EQ-P3-CUT-02",   risk: "M", score: 64, color: "bg-warning/70 text-black" },
  { eq: "EQ-P3-PRESS-01", risk: "M", score: 58, color: "bg-warning/70 text-black" },
  { eq: "EQ-P3-WELD-01",  risk: "L", score: 22, color: "bg-primary-accent/70 text-black" },
  { eq: "EQ-P4-ASM-01",   risk: "L", score: 30, color: "bg-primary-accent/70 text-black" },
  { eq: "EQ-P4-ASM-02",   risk: "H", score: 88, color: "bg-error/70 text-white" },
];

export default function EQPdmMapPage() {
  return (
    <div className="p-8">
      <PageHeader title="설비 위험도 히트맵" accent="RISK MAP" nodeRef="SCR-EQ-083" description="설비별 PdM 위험 점수 기반 히트맵 텍스트 표." />
      <FieldHeader title="위험도 히트맵" moduleRef="FR-EQ-083" />
      <div className="grid grid-cols-3 gap-2 mb-6">
        {cells.map((c) => (
          <div key={c.eq} className={`${c.color} p-5 flex flex-col gap-1`}>
            <p className="font-label text-xs uppercase tracking-widest opacity-80">{c.eq}</p>
            <p className="font-headline font-black text-3xl tabular-nums">{c.score}</p>
            <p className="font-label text-xs uppercase tracking-widest">위험도: {c.risk}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-error/70" /><span className="font-label text-xs">HIGH (80+)</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-warning/70" /><span className="font-label text-xs">MED (50~79)</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary-accent/70" /><span className="font-label text-xs">LOW (~49)</span></div>
      </div>
    </div>
  );
}
