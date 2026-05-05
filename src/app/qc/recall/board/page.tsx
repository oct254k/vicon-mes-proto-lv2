import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const RECALLS = [
  { id: "RC-2026-003", lot: "LOT-20260420-05", partCode: "B01-1-G22C-C-150", client: "현대건설", qty: 12, stage: "RECALL_CONFIRMED", triggeredAt: "2026-04-22", updatedAt: "2026-04-25" },
  { id: "RC-2026-002", lot: "LOT-20260410-03", partCode: "B01-2-G15A-S-035", client: "GS건설", qty: 6, stage: "RECALL_NOTIFIED", triggeredAt: "2026-04-12", updatedAt: "2026-04-20" },
  { id: "RC-2026-001", lot: "LOT-20260315-01", partCode: "M-COIL-A-...008", client: "삼성물산", qty: 30, stage: "RECALL_CLOSED", triggeredAt: "2026-03-16", updatedAt: "2026-03-30" },
];

const STAGE_MAP: Record<string, { type: "warning" | "error" | "running" | "idle" | "stopped"; label: string }> = {
  RECALL_DRAFT: { type: "idle", label: "DRAFT" },
  RECALL_REVIEWED: { type: "warning", label: "REVIEWED" },
  RECALL_CONFIRMED: { type: "error", label: "CONFIRMED" },
  RECALL_NOTIFIED: { type: "running", label: "NOTIFIED" },
  RECALL_CLOSED: { type: "stopped", label: "CLOSED" },
};

const PIPELINE = ["RECALL_DRAFT", "RECALL_REVIEWED", "RECALL_CONFIRMED", "RECALL_NOTIFIED", "RECALL_CLOSED"];

export default function QCRecallBoardPage() {
  return (
    <div>
      <PageHeader
        title="회수 목록"
        accent="보드"
        nodeRef="SCR-QC-050~054"
        status="PROTOTYPE"
        description="불량품 회수 5단계 워크플로 보드 (FNC-QC-090~098)"
      />

      <div className="flex items-center gap-0 mb-8 overflow-x-auto">
        {PIPELINE.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`px-4 py-2 text-xs font-label uppercase tracking-widest whitespace-nowrap ${s === "RECALL_CONFIRMED" ? "bg-error text-white" : "bg-surface-container text-on-surface/60"}`}>
              {s.replace("RECALL_", "")}
            </div>
            {i < PIPELINE.length - 1 && <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-l-[10px] border-t-transparent border-b-transparent border-l-surface-container-high" />}
          </div>
        ))}
      </div>

      <FieldHeader title="회수 목록" moduleRef="FNC-QC-090" />
      <div className="flex gap-3 mb-4">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>단계 전체</option>
          {PIPELINE.map((s) => <option key={s}>{s.replace("RECALL_", "")}</option>)}
        </select>
        <div className="flex-1" />
        <button className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">+ 회수 등록</button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">회수 목록 <span className="opacity-30 font-light ml-2">| Buffer: 003 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["회수ID","LOT","부재코드","거래처","수량","현재 단계","등록일","최근 변경"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {RECALLS.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.lot}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.partCode}</td>
                  <td className="px-4 py-2 text-xs">{r.client}</td>
                  <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAGE_MAP[r.stage].type} label={STAGE_MAP[r.stage].label} /></td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.triggeredAt}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
