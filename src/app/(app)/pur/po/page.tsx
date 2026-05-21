import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const KPI = [
  { label: "발행 PO 수", value: "17", unit: "건" },
  { label: "납기 준수율", value: "82", unit: "%" },
  { label: "미입고 PO", value: "5", unit: "건" },
];

const PO_DATA = [
  { id: "PO-2026-0017", supplier: "현대제철", material: "M-COIL-A", qty: "500 m", unitPrice: "12,500", dueDate: "2026-05-12", status: "IN_TRANSIT" },
  { id: "PO-2026-0016", supplier: "삼성SDS소재", material: "M-BOLT-M8", qty: "2,000 ea", unitPrice: "85", dueDate: "2026-05-08", status: "SENT" },
  { id: "PO-2026-0015", supplier: "포스코", material: "M-PIPE-B2", qty: "120 m", unitPrice: "34,200", dueDate: "2026-04-30", status: "RECEIVED" },
  { id: "PO-2026-0014", supplier: "동국제강", material: "M-SHEET-A3", qty: "80 ea", unitPrice: "6,700", dueDate: "2026-05-20", status: "ACK" },
];

const STATUS_MAP: Record<string, "running" | "idle" | "warning" | "stopped"> = {
  SENT: "idle",
  ACK: "warning",
  IN_TRANSIT: "running",
  RECEIVED: "idle",
};
const SL: Record<string, string> = { DRAFT:"초안", SENT:"발송", ACK:"확인", IN_TRANSIT:"운송중", RECEIVED:"입고됨" };

const BOARD_COLS = ["DRAFT", "SENT", "ACK", "IN_TRANSIT", "RECEIVED"];
const BOARD_DATA: Record<string, string[]> = {
  DRAFT: ["PO-2026-0018"],
  SENT: ["PO-2026-0016"],
  ACK: ["PO-2026-0014"],
  IN_TRANSIT: ["PO-2026-0017"],
  RECEIVED: ["PO-2026-0015"],
};

export default function PURPoPage() {
  return (
    <div>
      <PageHeader
        title="발주 관리"
        accent="PO"
        nodeRef="SCR-PUR-020"
        status="PROTOTYPE"
        description="PO 발행·진척 보드. 상태: DRAFT → SENT → ACK → IN_TRANSIT → RECEIVED → CLOSED."
      />

      <div className="grid grid-cols-3 gap-4 mb-8">
        {KPI.map((k) => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-5">
            <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">{k.label}</p>
            <p className="font-headline font-black text-3xl">
              {k.value}<span className="text-base font-light ml-1 text-on-surface/60">{k.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <FieldHeader title="PO 진척 보드 (칸반)" moduleRef="SCR-PUR-020" />
      <div className="grid grid-cols-5 gap-2 mb-8">
        {BOARD_COLS.map((col) => (
          <div key={col} className="bg-surface-container-lowest p-3">
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-3">{SL[col] ?? col}</p>
            <div className="space-y-2">
              {(BOARD_DATA[col] ?? []).map((po) => (
                <div key={po} className="bg-surface-container p-2 text-xs font-mono">{po}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <FieldHeader title="PO 목록" moduleRef="SCR-PUR-023" />
      <div className="flex justify-end mb-3">
        <button className="bg-primary-accent text-black font-label font-bold text-xs uppercase tracking-widest px-5 py-2 hover:opacity-90">
          + PO 발행
        </button>
      </div>
      <div className="overflow-x-auto bg-surface-container-lowest">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["PO 번호", "공급사", "Material", "수량", "단가(₩)", "납기일", "상태"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PO_DATA.map((row) => (
              <tr key={row.id} className="border-b border-outline-variant hover:bg-surface-container/40 cursor-pointer">
                <td className="px-4 py-3">
                  <Link href={`/pur/po/${row.id}`} className="font-mono text-xs text-primary-accent hover:underline">{row.id}</Link>
                </td>
                <td className="px-4 py-3 font-body text-sm">{row.supplier}</td>
                <td className="px-4 py-3 font-body text-sm">{row.material}</td>
                <td className="px-4 py-3 font-body text-sm">{row.qty}</td>
                <td className="px-4 py-3 font-mono text-xs">{row.unitPrice}</td>
                <td className="px-4 py-3 font-mono text-xs">{row.dueDate}</td>
                <td className="px-4 py-3">
                  <StatusBadge type={STATUS_MAP[row.status] ?? "idle"} label={SL[row.status] ?? row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
