import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const QUEUE = [
  { id: "AQ-2026-0015", defectId: "D-2026-0042", type: "SCRAP", amount: "₩ 1,906,500", calcAt: "2026-05-05 12:30", status: "PENDING", erpRef: "-" },
  { id: "AQ-2026-0014", defectId: "D-2026-0040", type: "SCRAP", amount: "₩ 3,813,000", calcAt: "2026-05-05 10:05", status: "SENT", erpRef: "ERP-2026-00821" },
  { id: "AQ-2026-0013", defectId: "D-2026-0038", type: "CLAIM", amount: "₩ 2,480,000", calcAt: "2026-05-04 17:10", status: "CONFIRMED", erpRef: "ERP-2026-00815" },
  { id: "AQ-2026-0012", defectId: "D-2026-0035", type: "SCRAP", amount: "₩ 1,241,000", calcAt: "2026-05-03 09:50", status: "CONFIRMED", erpRef: "ERP-2026-00809" },
];

const STAT: Record<string, { type: "warning" | "running" | "idle" }> = {
  PENDING: { type: "warning" },
  SENT: { type: "running" },
  CONFIRMED: { type: "idle" },
};
const SL: Record<string, string> = { PENDING: "대기", SENT: "전송", CONFIRMED: "확정" };

export default function QCLossAccountingQueuePage() {
  return (
    <div>
      <PageHeader
        title="회계 처리 큐"
        accent="LOSS"
        nodeRef="SCR-QC-072"
        status="PROTOTYPE"
        description="손실 환산 → 회계 ERP 전송 큐·다운로드 모니터링 (FNC-QC-104)"
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ l: "전송 대기", v: 1, bad: true }, { l: "전송 완료", v: 2, bad: false }, { l: "ERP 확인 완료", v: 2, bad: false }].map((k) => (
          <div key={k.l} className={`p-4 border-l-4 ${k.bad ? "border-warning" : "border-primary-accent"}`}>
            <p className="font-label text-xs uppercase opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl">{k.v}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="회계 전송 큐" moduleRef="FNC-QC-104" />
      <div className="flex gap-3 mb-4">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>상태 전체</option><option>PENDING</option><option>SENT</option><option>CONFIRMED</option>
        </select>
        <div className="flex-1" />
        <button className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">일괄 ERP 전송</button>
        <button className="bg-surface-container-high border border-outline-variant/20 text-sm font-label uppercase px-4 py-1.5 hover:opacity-90">CSV 다운로드</button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">회계 큐 <span className="opacity-30 font-light ml-2">| Buffer: 004 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["큐 ID","불량 번호","유형","손실 환산액","산출일시","상태","ERP 참조번호","액션"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {QUEUE.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.defectId}</td>
                  <td className="px-4 py-2 text-xs">{r.type}</td>
                  <td className="px-4 py-2 tabular-nums font-bold">{r.amount}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.calcAt}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAT[r.status].type} label={SL[r.status] ?? r.status} /></td>
                  <td className="px-4 py-2 text-xs opacity-60">{r.erpRef}</td>
                  <td className="px-4 py-2">
                    {r.status === "PENDING" && <button className="bg-primary-accent text-black text-xs font-label uppercase px-3 py-1 hover:opacity-90">전송</button>}
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
