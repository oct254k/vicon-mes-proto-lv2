import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MEASURES = [
  { id: "M-0081", itemId: "I-001", itemName: "절단 길이", lot: "LOT-20260505-01", value: "6000.8", ucl: "6000.5", lcl: "5999.5", violate: true, rule: "Rule 1", measuredAt: "2026-05-05 09:12", by: "worker.han" },
  { id: "M-0080", itemId: "I-001", itemName: "절단 길이", lot: "LOT-20260505-01", value: "6000.2", ucl: "6000.5", lcl: "5999.5", violate: false, rule: "-", measuredAt: "2026-05-05 08:50", by: "worker.han" },
  { id: "M-0079", itemId: "I-002", itemName: "절곡 각도", lot: "LOT-20260504-03", value: "289.6", ucl: "290.3", lcl: "289.7", violate: true, rule: "Rule 3", measuredAt: "2026-05-04 17:20", by: "worker.kim" },
  { id: "M-0078", itemId: "I-003", itemName: "강판 두께", lot: "LOT-20260504-02", value: "2.30", ucl: "2.32", lcl: "2.28", violate: false, rule: "-", measuredAt: "2026-05-04 15:05", by: "insp.park" },
  { id: "M-0077", itemId: "I-002", itemName: "절곡 각도", lot: "LOT-20260504-01", value: "290.1", ucl: "290.3", lcl: "289.7", violate: false, rule: "-", measuredAt: "2026-05-04 11:30", by: "worker.kim" },
];

export default function QCSpcMeasureListPage() {
  return (
    <div>
      <PageHeader
        title="측정값 목록"
        accent="SPC"
        nodeRef="SCR-QC-012"
        status="PROTOTYPE"
        description="SPC 측정값 시계열 조회 — 위반 행 빨강 강조 (FNC-QC-028)"
      />
      <FieldHeader title="필터" moduleRef="FNC-QC-028" />
      <div className="flex flex-wrap gap-3 mb-5">
        {["항목 전체", "I-001 절단 길이", "I-002 절곡 각도", "I-003 강판 두께"].map((o, i) => (
          i === 0
            ? <select key={o} defaultValue={o} className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
                <option>항목 전체</option><option>I-001 절단 길이</option><option>I-002 절곡 각도</option>
              </select>
            : null
        ))}
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>LOT 전체</option><option>LOT-20260505-01</option><option>LOT-20260504-03</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>최근 7일</option><option>최근 30일</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>전체</option><option>위반만</option><option>정상만</option>
        </select>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">측정값 <span className="opacity-30 font-light ml-2">| Buffer: 081 Entries</span></h3>
          <span className="text-xs text-error font-label uppercase">위반 2건 강조</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["측정ID","항목","LOT","측정값","UCL","LCL","위반","Rule","측정일시","측정자"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {MEASURES.map((m, i) => (
                <tr key={i} className={`border-b border-outline-variant transition-colors ${m.violate ? "bg-error/10 hover:bg-error/15" : "hover:bg-surface-container-highest/20"}`}>
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{m.id}</td>
                  <td className="px-4 py-2 font-mono text-xs">{m.itemId}</td>
                  <td className="px-4 py-2 text-xs">{m.lot}</td>
                  <td className={`px-4 py-2 tabular-nums font-bold ${m.violate ? "text-error" : ""}`}>{m.value}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{m.ucl}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{m.lcl}</td>
                  <td className="px-4 py-2">{m.violate ? <StatusBadge type="error" label="위반" /> : <StatusBadge type="running" label="정상" />}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{m.rule}</td>
                  <td className="px-4 py-2 text-xs tabular-nums">{m.measuredAt}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{m.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
