import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SCRAP = [
  { id: "D-2026-0040", partCode: "B01-1-G22C-C-168", type: "가공", qty: 2, lossAmt: "₩ 1,240,000", disposedBy: "qcmgr.lee", disposedAt: "2026-05-05 10:00", reason: "치수 초과 — SCRAP" },
  { id: "D-2026-0035", partCode: "B01-2-G15A-S-035", type: "외관", qty: 1, lossAmt: "₩ 620,000", disposedBy: "qcmgr.lee", disposedAt: "2026-05-04 15:30", reason: "표면 크랙 — SCRAP" },
  { id: "D-2026-0029", partCode: "M-COIL-A-...009", type: "규격", qty: 5, lossAmt: "₩ 3,100,000", disposedBy: "qcmgr.kim", disposedAt: "2026-05-03 09:15", reason: "규격 미달 — SCRAP" },
];

export default function QCDefectScrapApprovalPage() {
  return (
    <div>
      <PageHeader
        title="SCRAP 결재"
        accent="공장장"
        nodeRef="SCR-QC-042"
        status="PROTOTYPE"
        description="공장장 SCRAP 최종 결재 DISPOSED→CLOSED (FNC-QC-008, 067)"
      />

      <div className="bg-surface-container border-l-4 border-error p-4 mb-6 flex items-start gap-3">
        <StatusBadge type="warning" label="4계층 결재" />
        <p className="text-sm opacity-70">공장장 최종 결재 대기 — DISPOSED 상태 SCRAP 건. 결재 후 재고 차감·손실 환산 자동 실행 (FNC-QC-067, 100).</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ l: "결재 대기", v: "3", bad: true }, { l: "CLOSED (이번 달)", v: "12", bad: false }, { l: "손실 합계", v: "₩ 4,960,000", bad: true }].map((k) => (
          <div key={k.l} className={`p-4 border-l-4 ${k.bad ? "border-error" : "border-primary-accent"}`}>
            <p className="font-label text-xs uppercase opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-xl">{k.v}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="SCRAP 결재 대기 목록" moduleRef="FNC-QC-042" />
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-error">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest text-error">공장장 결재 대기 <span className="opacity-30 font-light ml-2">| Buffer: 003 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["신고번호","부재코드","불량유형","수량","손실 환산액","처리 사유","DISPOSED by","처리일시","결재"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {SCRAP.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.partCode}</td>
                  <td className="px-4 py-2">{r.type}</td>
                  <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                  <td className="px-4 py-2 tabular-nums text-error font-bold">{r.lossAmt}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.reason}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{r.disposedBy}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.disposedAt}</td>
                  <td className="px-4 py-2">
                    <button className="bg-primary-accent text-black text-xs font-label uppercase px-3 py-1 hover:opacity-90 mr-1">승인</button>
                    <button className="bg-error/20 text-error text-xs font-label uppercase px-3 py-1 hover:opacity-90">반려</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
