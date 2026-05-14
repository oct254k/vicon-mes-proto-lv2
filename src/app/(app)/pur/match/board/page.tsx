"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const BOARD = {
  PASS: [
    { id:"MATCH-2026-0015", po:"PO-2026-0015", inv:"INV-2026-0008", matchAt:"2026-05-06" },
    { id:"MATCH-2026-0010", po:"PO-2026-0010", inv:"INV-2026-0005", matchAt:"2026-05-01" },
  ],
  EXCEPTION: [
    { id:"MATCH-2026-0013", po:"PO-2026-0013", inv:"INV-2026-0007", reason:"QTY_DIFF" },
    { id:"MATCH-2026-0009", po:"PO-2026-0009", inv:"INV-2026-0004", reason:"PRICE_DIFF" },
    { id:"MATCH-2026-0007", po:"PO-2026-0007", inv:"INV-2026-0003", reason:"OVER_DELIVERY" },
  ],
  PENDING: [
    { id:"MATCH-2026-0017", po:"PO-2026-0017", inv:"—", reason:"Invoice 미수신" },
  ],
};
const kpis = [{l:"전체",v:6},{l:"PASS",v:2},{l:"예외",v:3},{l:"대기",v:1}];

export default function MatchBoardPage() {
  return (
    <div>
      <PageHeader title="매칭 현황 보드" nodeRef="IA-PUR-MATCH-BOARD" status="PROTOTYPE"
        description="PO·ASN·Invoice 3-Way Matching 결과 보드 — PASS/EXCEPTION/PENDING (FNC-PUR-081/082/085/086)" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map(k=>(
          <div key={k.l} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* PASS */}
        <div className="bg-surface-container-lowest border-t-2 border-primary-accent p-4">
          <FieldHeader title="PASS" moduleRef={`${BOARD.PASS.length}건`} />
          {BOARD.PASS.map(m=>(
            <div key={m.id} className="bg-surface-container p-3 mb-2">
              <p className="text-xs font-mono text-primary-accent">{m.id}</p>
              <p className="text-xs opacity-60 mt-0.5">{m.po} / {m.inv}</p>
              <p className="text-xs opacity-40">{m.matchAt}</p>
              <StatusBadge type="running" label="PASS" />
            </div>
          ))}
        </div>
        {/* EXCEPTION */}
        <div className="bg-surface-container-lowest border-t-2 border-warning p-4">
          <FieldHeader title="EXCEPTION" moduleRef={`${BOARD.EXCEPTION.length}건`} />
          {BOARD.EXCEPTION.map(m=>(
            <div key={m.id} className="bg-surface-container p-3 mb-2">
              <p className="text-xs font-mono text-primary-accent">{m.id}</p>
              <p className="text-xs opacity-60 mt-0.5">{m.po}</p>
              <span className="text-xs text-warning font-label">{m.reason}</span>
            </div>
          ))}
        </div>
        {/* PENDING */}
        <div className="bg-surface-container-lowest border-t-2 border-outline-variant/30 p-4">
          <FieldHeader title="PENDING" moduleRef={`${BOARD.PENDING.length}건`} />
          {BOARD.PENDING.map(m=>(
            <div key={m.id} className="bg-surface-container p-3 mb-2">
              <p className="text-xs font-mono text-primary-accent">{m.id}</p>
              <p className="text-xs opacity-60 mt-0.5">{m.po}</p>
              <span className="text-xs text-on-surface/40 font-label">{m.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
