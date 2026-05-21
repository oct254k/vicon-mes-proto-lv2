export function generateStaticParams() {
  return [{ id: "PO-001" }, { id: "PO-002" }];
}

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PO_DETAIL = {
  id: "PO-2026-0017",
  supplier: "현대제철 (주)",
  supplierCode: "SUP-0012",
  pr: "PR-2026-0042",
  currency: "KRW",
  totalAmt: "6,250,000",
  dueDate: "2026-05-12",
  status: "IN_TRANSIT",
  ackStatus: "ACCEPTED",
  createdBy: "김구매",
  createdAt: "2026-05-03",
  lines: [
    { lineNo: 1, material: "M-COIL-A", desc: "열연코일 A형", qty: 500, unit: "m", unitPrice: 12500, total: 6250000, dueDate: "2026-05-12" },
  ],
};

const ACK_MAP: Record<string, "running" | "warning" | "stopped" | "idle"> = {
  ACCEPTED: "running",
  PARTIALLY_ACCEPTED: "warning",
  REJECTED: "stopped",
  COUNTER_PROPOSAL: "warning",
};

export default function PODetailPage({ params }: { params: { id: string } }) {
  const po = PO_DETAIL;
  return (
    <div>
      <PageHeader
        title="PO 상세"
        accent={po.id}
        nodeRef="SCR-PUR-023"
        status="PROTOTYPE"
        description={`공급사: ${po.supplier} | 납기: ${po.dueDate} | 상태: ${po.status}`}
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-container-lowest p-5 space-y-2">
          <FieldHeader title="PO 헤더" moduleRef="SCR-PUR-023" />
          {[
            ["PO 번호", po.id],
            ["연결 PR", po.pr],
            ["공급사", po.supplier],
            ["공급사 코드", po.supplierCode],
            ["통화", po.currency],
            ["총 금액", `₩ ${po.totalAmt}`],
            ["납기일", po.dueDate],
            ["등록자", po.createdBy],
            ["등록일", po.createdAt],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="font-label uppercase text-xs tracking-wider text-on-surface/50">{label}</span>
              <span className="font-body">{val}</span>
            </div>
          ))}
        </div>
        <div className="bg-surface-container-lowest p-5">
          <FieldHeader title="공급사 답신" moduleRef="SCR-PUR-030" />
          <div className="mb-4">
            <StatusBadge type={ACK_MAP[po.ackStatus] ?? "idle"} label={po.ackStatus} />
          </div>
          <div className="space-y-2 text-sm text-on-surface/70">
            <p>답신 유형: <strong>ACCEPTED</strong> (전량 수락)</p>
            <p>답신 일시: 2026-05-04 09:22</p>
            <p>채널: EMAIL</p>
          </div>
        </div>
      </div>

      <FieldHeader title="PO 라인" moduleRef="SCR-PUR-023" />
      <div className="overflow-x-auto bg-surface-container-lowest mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["라인#", "Material", "품명", "수량", "단위", "단가(₩)", "소계(₩)", "납기일"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {po.lines.map((line) => (
              <tr key={line.lineNo} className="border-b border-outline-variant">
                <td className="px-4 py-3 font-mono text-xs">{line.lineNo}</td>
                <td className="px-4 py-3 font-mono text-xs text-primary-accent">{line.material}</td>
                <td className="px-4 py-3 font-body text-sm">{line.desc}</td>
                <td className="px-4 py-3 font-mono text-xs">{line.qty}</td>
                <td className="px-4 py-3 font-body text-xs">{line.unit}</td>
                <td className="px-4 py-3 font-mono text-xs">{line.unitPrice.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-xs">{line.total.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-xs">{line.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button className="bg-primary-accent text-white font-label font-bold text-xs uppercase tracking-widest px-6 py-2 hover:opacity-90">
          발송
        </button>
        <button className="border border-error text-error font-label font-bold text-xs uppercase tracking-widest px-6 py-2 hover:bg-error/10">
          취소
        </button>
      </div>
    </div>
  );
}
