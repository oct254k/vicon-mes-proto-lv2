"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"ASN-2026-0009", po:"PO-2026-0014", supplier:"동국제강", mat:"M-SHEET-A3", etaOrig:"2026-05-05", etaNew:"2026-05-12", delayDays:7, reason:"운송사 파업" },
  { id:"ASN-2026-0008", po:"PO-2026-0012", supplier:"기타", mat:"M-ROD-C4", etaOrig:"2026-05-03", etaNew:"2026-05-09", delayDays:6, reason:"통관 지연" },
  { id:"ASN-2026-0007", po:"PO-2026-0011", supplier:"현대제철", mat:"M-COIL-A", etaOrig:"2026-05-01", etaNew:"2026-05-04", delayDays:3, reason:"생산 차질" },
];

export default function ASNDelayPage() {
  return (
    <div>
      <PageHeader title="ASN 도착 지연" nodeRef="IA-PUR-ASN-DELAY" status="PROTOTYPE"
        description="ETA 초과 ASN 도착 지연 경고 — 클레임 회귀 대상 (FNC-PUR-054)" />
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/40 px-4 py-3 mb-4 flex items-center gap-3">
        <span className="text-[#f59e0b] font-black text-lg">⚠</span>
        <span className="text-sm font-label text-[#f59e0b]">지연 ASN {MOCK.length}건 — 구매팀 조치 필요</span>
      </div>
      <FieldHeader title="지연 ASN 목록" moduleRef={`${MOCK.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["ASN ID","PO 번호","공급사","자재","당초 ETA","변경 ETA","지연일","사유","조치"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {MOCK.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 bg-[#f59e0b]/5 hover:bg-[#f59e0b]/10">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.po}</td>
                <td className="px-4 py-2">{r.supplier}</td>
                <td className="px-4 py-2">{r.mat}</td>
                <td className="px-4 py-2 tabular-nums text-xs line-through opacity-40">{r.etaOrig}</td>
                <td className="px-4 py-2 tabular-nums text-xs text-[#f59e0b] font-bold">{r.etaNew}</td>
                <td className="px-4 py-2 tabular-nums text-xs text-[#f59e0b] font-black">+{r.delayDays}일</td>
                <td className="px-4 py-2 text-xs opacity-70">{r.reason}</td>
                <td className="px-4 py-2">
                  <StatusBadge type="warning" label="클레임 검토" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-30 font-label mt-2">지연 기준: ETA 기준 +1일 초과 시 자동 경고 (FNC-PUR-054)</p>
    </div>
  );
}
