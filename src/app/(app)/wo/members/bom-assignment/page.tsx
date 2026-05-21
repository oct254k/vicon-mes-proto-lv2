import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { bomId: "BOM-G22C-C-001", level: 1, component: "H-BEAM 250×125×6×9",   unit: "ton",  qtyPer: 0.052, member: "B01-1-G22C-C-171", assigned: true },
  { bomId: "BOM-G22C-C-002", level: 2, component: "볼트 M20×60",           unit: "ea",   qtyPer: 8,     member: "B01-1-G22C-C-171", assigned: true },
  { bomId: "BOM-G22C-C-003", level: 2, component: "너트 M20",              unit: "ea",   qtyPer: 8,     member: "B01-1-G22C-C-171", assigned: true },
  { bomId: "BOM-G22C-S-001", level: 1, component: "C형강 200×80×2.3",     unit: "ea",   qtyPer: 2,     member: "B01-1-G22C-S-172", assigned: true },
  { bomId: "BOM-G22C-S-002", level: 2, component: "용접봉 E7016-4",        unit: "box",  qtyPer: 0.1,   member: "B01-1-G22C-S-172", assigned: false },
  { bomId: "BOM-T18B-C-001", level: 1, component: "H-BEAM 300×150×6.5×9", unit: "ton",  qtyPer: 0.074, member: "B02-1-T18B-C-101", assigned: true },
  { bomId: "BOM-T18B-C-002", level: 2, component: "볼트 M24×70",           unit: "ea",   qtyPer: 12,    member: "B02-1-T18B-C-101", assigned: false },
];

export default function BomAssignmentPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="BOM-부재" accent="할당" nodeRef="SCR-WO-012" description="BOM 다단계 펼침 — 부재 코드별 자재 소요 할당 매트릭스. FNC-WO-004" />

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          할당 저장
        </button>
        <button className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          일괄 할당
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            BOM-부재 할당 매트릭스 <span className="opacity-30 font-light ml-2">| {ROWS.length} 행</span>
          </h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["BOM ID", "레벨", "구성품", "단위", "단위당 소요", "연결 부재", "할당", ""].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r) => (
              <tr key={r.bomId} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors ${!r.assigned ? "bg-warning/5" : ""}`}>
                <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.bomId}</td>
                <td className="px-4 py-2 tabular-nums text-xs">
                  <span className={`px-2 py-0.5 text-xs font-bold font-label ${r.level === 1 ? "bg-primary-accent/20 text-primary-accent" : "bg-surface-container text-on-surface/60"}`}>
                    L{r.level}
                  </span>
                </td>
                <td className="px-4 py-2 text-xs" style={{ paddingLeft: r.level === 2 ? "2rem" : undefined }}>
                  {r.level === 2 && <span className="opacity-30 mr-1">└</span>}{r.component}
                </td>
                <td className="px-4 py-2 text-xs opacity-60">{r.unit}</td>
                <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.qtyPer}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.member}</td>
                <td className="px-4 py-2">
                  <StatusBadge type={r.assigned ? "running" : "warning"} label={r.assigned ? "할당됨" : "미할당"} />
                </td>
                <td className="px-4 py-2">
                  <button className="text-xs text-on-surface/40 hover:text-on-surface font-label uppercase tracking-widest">편집</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
