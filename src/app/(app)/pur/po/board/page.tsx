"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = ["DRAFT","SENT","ACKNOWLEDGED","IN_TRANSIT","PARTIALLY_RECEIVED","RECEIVED","CLOSED","CANCELLED"] as const;
type POState = typeof COLS[number];
const BOARD: Record<POState, {id:string; supplier:string; mat:string}[]> = {
  DRAFT:[{id:"PO-2026-0020",supplier:"현대제철",mat:"M-ROD-C4"}],
  SENT:[{id:"PO-2026-0016",supplier:"삼성SDS소재",mat:"M-BOLT-M8"}],
  ACKNOWLEDGED:[{id:"PO-2026-0014",supplier:"동국제강",mat:"M-SHEET-A3"}],
  IN_TRANSIT:[{id:"PO-2026-0017",supplier:"현대제철",mat:"M-COIL-A"}],
  PARTIALLY_RECEIVED:[{id:"PO-2026-0013",supplier:"포스코",mat:"M-PIPE-B2"}],
  RECEIVED:[{id:"PO-2026-0015",supplier:"포스코",mat:"M-PIPE-B2"}],
  CLOSED:[{id:"PO-2026-0010",supplier:"삼성SDS소재",mat:"M-BOLT-M8"},{id:"PO-2026-0009",supplier:"동국제강",mat:"M-SHEET-A3"}],
  CANCELLED:[{id:"PO-2026-0008",supplier:"기타",mat:"M-ROD-C4"}],
};
const COL_STYLE: Record<POState, string> = {
  DRAFT:"border-outline-variant/30", SENT:"border-primary-accent", ACKNOWLEDGED:"border-primary-accent",
  IN_TRANSIT:"border-[#f59e0b]", PARTIALLY_RECEIVED:"border-[#f59e0b]", RECEIVED:"border-primary-accent",
  CLOSED:"border-outline-variant/20", CANCELLED:"border-error/40",
};
const kpis = [{l:"전체 PO",v:10},{l:"진행 중",v:4},{l:"입고 완료",v:3},{l:"취소",v:1}];

export default function POBoardPage() {
  return (
    <div>
      <PageHeader title="PO 진척 보드" nodeRef="IA-PUR-PO-BOARD" status="PROTOTYPE"
        description="8상태 칸반 — DRAFT→SENT→ACKNOWLEDGED→IN_TRANSIT→PARTIALLY_RECEIVED→RECEIVED→CLOSED (FNC-PUR-033)" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map(k=>(
          <div key={k.l} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="칸반 보드 (8상태)" moduleRef="SCR-PUR-020" />
      <div className="grid grid-cols-4 xl:grid-cols-8 gap-2">
        {COLS.map(col=>(
          <div key={col} className={`bg-surface-container-lowest border-t-2 ${COL_STYLE[col]} p-3 min-h-32`}>
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-2">{col}</p>
            <p className="text-xs opacity-30 font-label mb-3">{BOARD[col].length}건</p>
            {BOARD[col].map(po=>(
              <div key={po.id} className="bg-surface-container p-2 mb-2 cursor-pointer hover:bg-surface-container-high transition-colors">
                <p className="text-xs font-mono text-primary-accent">{po.id}</p>
                <p className="text-xs opacity-60 mt-0.5">{po.supplier}</p>
                <p className="text-xs opacity-40">{po.mat}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
