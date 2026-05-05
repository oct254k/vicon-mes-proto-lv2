"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

type PState = "STORED"|"READY"|"HOLD"|"LOADED"|"SHIPPED"|"RECEIVED";
const COLS: PState[] = ["STORED","READY","HOLD","LOADED","SHIPPED","RECEIVED"];
const BOARD: Record<PState,{id:string;wo:string;cnt:number}[]> = {
  STORED:[{id:"PKG-0025-001",wo:"WO-P3000-20260505-0025",cnt:24},{id:"PKG-0024-001",wo:"WO-P3000-20260504-0024",cnt:18}],
  READY:[{id:"PKG-0025-002",wo:"WO-P3000-20260505-0025",cnt:12}],
  HOLD:[{id:"PKG-0023-001",wo:"WO-P3000-20260503-0023",cnt:8}],
  LOADED:[{id:"PKG-0022-001",wo:"WO-P3000-20260502-0022",cnt:30}],
  SHIPPED:[{id:"PKG-0021-001",wo:"WO-P3000-20260501-0021",cnt:24}],
  RECEIVED:[{id:"PKG-0020-001",wo:"WO-P3000-20260428-0020",cnt:16}],
};
const SM: Record<PState,"idle"|"running"|"warning"|"stopped"> = {
  STORED:"idle", READY:"running", HOLD:"warning", LOADED:"running", SHIPPED:"running", RECEIVED:"idle"
};
const kpis = [{l:"전체 PKG",v:7},{l:"READY",v:1},{l:"HOLD",v:1},{l:"SHIPPED",v:1}];

export default function PackingBoardPage() {
  return (
    <div>
      <PageHeader title="패킹 현황 보드" accent="SCR-SHP" nodeRef="IA-SHP-PACKING-BOARD" status="PROTOTYPE"
        description="패킹 후반 6상태 — STORED→READY/HOLD→LOADED→SHIPPED→RECEIVED (FNC-SHP-014/010)" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map(k=>(
          <div key={k.l} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="패킹 칸반 (6상태)" moduleRef="SCR-SHP-012" />
      <div className="grid grid-cols-6 gap-2">
        {COLS.map(col=>(
          <div key={col} className="bg-surface-container-lowest border-t-2 border-outline-variant/30 p-3 min-h-32">
            <div className="mb-2"><StatusBadge type={SM[col]} label={col} /></div>
            <p className="text-xs opacity-30 font-label mb-2">{BOARD[col].length}건</p>
            {BOARD[col].map(p=>(
              <div key={p.id} className="bg-surface-container p-2 mb-2 cursor-pointer hover:bg-surface-container-high">
                <p className="text-xs font-mono text-primary-accent">{p.id}</p>
                <p className="text-xs opacity-40 font-label">{p.cnt}부재</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
