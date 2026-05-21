import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const POINTS = [
  { seq: 1, value: 6000.2, zone: "±1σ", violate: false, rule: "-" },
  { seq: 2, value: 6000.3, zone: "±1σ", violate: false, rule: "-" },
  { seq: 3, value: 6000.7, zone: "+3σ", violate: true, rule: "Rule 1" },
  { seq: 4, value: 6000.4, zone: "±2σ", violate: false, rule: "-" },
  { seq: 5, value: 6000.8, zone: "+3σ", violate: true, rule: "Rule 1" },
];

export default function QCSpcChartDetailPage() {
  return (
    <div>
      <PageHeader
        title="관리도 상세"
        accent="위반 분석"
        nodeRef="SCR-QC-021"
        status="PROTOTYPE"
        description="I-001 절단 길이 — LOT-20260505-01 위반 포인트 4Depth 분석 (FNC-QC-035)"
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div><p className="font-label text-xs uppercase opacity-50">항목</p><p className="font-headline font-bold">I-001 절단 길이</p></div>
        <div><p className="font-label text-xs uppercase opacity-50">Work Center</p><p className="font-headline font-bold">WC-CUT-01</p></div>
        <div><p className="font-label text-xs uppercase opacity-50">LOT</p><p className="font-headline font-bold">LOT-20260505-01</p></div>
      </div>

      <FieldHeader title="X-bar 관리도" moduleRef="FNC-QC-030~031" />
      <div className="bg-surface-container-low p-4 mb-6">
        <div className="h-40 relative bg-surface-container flex items-end px-4 pb-2 gap-3">
          <div className="absolute top-2 left-4 right-4 border-t-2 border-dashed border-error/60 flex justify-end"><span className="text-xs text-error/60 -mt-4 font-label">UCL 6000.5</span></div>
          <div className="absolute top-1/2 left-4 right-4 border-t border-primary-accent/40 flex justify-end"><span className="text-xs text-primary-accent/60 -mt-3 font-label">CL 6000.0</span></div>
          <div className="absolute bottom-6 left-4 right-4 border-t-2 border-dashed border-error/60 flex justify-end"><span className="text-xs text-error/60 -mt-4 font-label">LCL 5999.5</span></div>
          {POINTS.map((p) => {
            const pct = ((p.value - 5999.5) / 1.0) * 100;
            return (
              <div key={p.seq} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative w-full flex justify-center" style={{ height: "120px" }}>
                  <div className={`w-3 h-3 absolute ${p.violate ? "bg-error" : "bg-primary-accent"}`} style={{ bottom: `${Math.min(pct, 100)}%` }} />
                </div>
                <span className="text-xs opacity-40 font-label">{p.seq}</span>
              </div>
            );
          })}
        </div>
      </div>

      <FieldHeader title="위반 포인트 상세" moduleRef="FNC-QC-035" />
      <section className="bg-surface-container-lowest mb-6">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-error">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest text-error">위반 포인트 — 2건</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["순번","측정값","Zone","위반","Rule","처리"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {POINTS.map((p, i) => (
                <tr key={i} className={`border-b border-outline-variant ${p.violate ? "bg-error/10" : ""}`}>
                  <td className="px-4 py-2 tabular-nums">{p.seq}</td>
                  <td className={`px-4 py-2 tabular-nums font-bold ${p.violate ? "text-error" : ""}`}>{p.value}</td>
                  <td className="px-4 py-2 text-xs">{p.zone}</td>
                  <td className="px-4 py-2">{p.violate ? <StatusBadge type="error" label="위반" /> : <StatusBadge type="running" label="정상" />}</td>
                  <td className="px-4 py-2 text-xs font-bold">{p.rule}</td>
                  <td className="px-4 py-2">{p.violate ? <button className="bg-primary-accent text-white text-xs font-label uppercase px-2 py-1 hover:opacity-90">조치</button> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        Western Electric Rule 1: 관리 한계 초과 1점 | [Rule 맵 →] /qc/spc/chart/rule-map
      </p>
    </div>
  );
}
