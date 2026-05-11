"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

type ClaimState = "OPEN"|"SUPPLIER_NOTIFIED"|"REPLENISHMENT_PO"|"REPLENISHED"|"CLOSED";
const COLS: ClaimState[] = ["OPEN","SUPPLIER_NOTIFIED","REPLENISHMENT_PO","REPLENISHED","CLOSED"];
const BOARD: Record<ClaimState, {id:string; po:string; type:string}[]> = {
  OPEN:[{id:"CLM-2026-0005",po:"PO-2026-0013",type:"SHORT_DELIVERY"},{id:"CLM-2026-0004",po:"PO-2026-0008",type:"QUALITY_FAIL"}],
  SUPPLIER_NOTIFIED:[{id:"CLM-2026-0003",po:"PO-2026-0007",type:"OVER_DELIVERY"}],
  REPLENISHMENT_PO:[{id:"CLM-2026-0002",po:"PO-2026-0005",type:"SHORT_DELIVERY"}],
  REPLENISHED:[{id:"CLM-2026-0001",po:"PO-2026-0003",type:"QUALITY_FAIL"}],
  CLOSED:[{id:"CLM-2025-0012",po:"PO-2025-0040",type:"OVER_DELIVERY"},{id:"CLM-2025-0011",po:"PO-2025-0038",type:"SHORT_DELIVERY"}],
};
const SM: Record<string,"stopped"|"warning"|"idle"|"running"> = {
  OPEN:"stopped", SUPPLIER_NOTIFIED:"warning", REPLENISHMENT_PO:"warning", REPLENISHED:"running", CLOSED:"idle"
};
const kpis = [{l:"전체 클레임",v:7},{l:"OPEN",v:2},{l:"진행 중",v:3},{l:"CLOSED",v:2}];

export default function ClaimBoardPage() {
  return (
    <div>
      <PageHeader title="클레임 보드" nodeRef="IA-PUR-CLAIM-BOARD" status="PROTOTYPE"
        description="클레임 5상태 칸반 — OPEN→SUPPLIER_NOTIFIED→REPLENISHMENT_PO→REPLENISHED→CLOSED (FNC-PUR-094~099)" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map(k=>(
          <div key={k.l} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="클레임 칸반 (5상태)" moduleRef="SCR-PUR-070" />
      <div className="grid grid-cols-5 gap-2">
        {COLS.map(col=>(
          <div key={col} className="bg-surface-container-lowest border-t-2 border-outline-variant/30 p-3">
            <div className="mb-2"><StatusBadge type={SM[col]} label={col.replace("_"," ")} /></div>
            <p className="text-xs opacity-30 font-label mb-2">{BOARD[col].length}건</p>
            {BOARD[col].map(c=>(
              <div key={c.id} className="bg-surface-container p-2 mb-2 cursor-pointer hover:bg-surface-container-high">
                <p className="text-xs font-mono text-primary-accent">{c.id}</p>
                <p className="text-xs opacity-60">{c.po}</p>
                <p className="text-xs text-[#f59e0b] font-label mt-0.5">{c.type}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
