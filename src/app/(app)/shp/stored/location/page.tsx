"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { pkg:"PKG-0025-001", loc:"YARD-A3", section:"A3-04", weight:"18.5t", storedAt:"2026-05-05 14:30", state:"READY" },
  { pkg:"PKG-0024-001", loc:"YARD-B1", section:"B1-02", weight:"15.2t", storedAt:"2026-05-04 16:10", state:"STORED" },
  { pkg:"PKG-0023-001", loc:"YARD-A1", section:"A1-07", weight:"8.3t", storedAt:"2026-05-03 11:05", state:"HOLD" },
  { pkg:"PKG-0019-001", loc:"YARD-C2", section:"C2-11", weight:"22.1t", storedAt:"2026-04-18 09:00", state:"STORED" },
];
const SM: Record<string,"running"|"idle"|"warning"> = { READY:"running", STORED:"idle", HOLD:"warning" };

export default function StoredLocationPage() {
  return (
    <div>
      <PageHeader title="야적 위치 관리" nodeRef="IA-SHP-STORED-LOCATION" status="PROTOTYPE"
        description="PDA 야적 위치 등록·변경 (FNC-SHP-020/023) — PACKAGER/SHP-STAFF" />
      <FieldHeader title="야적 위치 현황" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto mb-4">
        <div className="p-4 border-l-4 border-primary-accent bg-surface-container-highest/30 flex justify-between">
          <span className="font-headline font-black text-sm uppercase tracking-widest">야적 위치 목록</span>
          <button className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase">위치 변경</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline">
            {["PKG ID","야적 구역","세부 위치","중량","야적 일시","상태"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.map(r=>(
              <tr key={r.pkg} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.pkg}</td>
                <td className="px-4 py-2 font-mono text-xs font-bold">{r.loc}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.section}</td>
                <td className="px-4 py-2 tabular-nums text-xs font-bold">{r.weight}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.storedAt}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.state]} label={r.state} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-30 font-label">PDA 스캔으로 위치 자동 갱신 가능 (FNC-SHP-023)</p>
    </div>
  );
}
