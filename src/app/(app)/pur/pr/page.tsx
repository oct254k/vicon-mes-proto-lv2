import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PR_DATA = [
  { id: "PR-2026-0042", material: "M-COIL-A", qty: "500 m", requester: "MRP 자동생성", status: "APPROVED", created: "2026-05-01" },
  { id: "PR-2026-0041", material: "M-BOLT-M8", qty: "2,000 ea", requester: "김철수", status: "DRAFT", created: "2026-05-02" },
  { id: "PR-2026-0040", material: "M-PIPE-B2", qty: "120 m", requester: "이영희", status: "CONVERTED_TO_PO", created: "2026-04-28" },
  { id: "PR-2026-0039", material: "M-SHEET-A3", qty: "80 ea", requester: "박민준", status: "APPROVED", created: "2026-04-25" },
];

const STATUS_MAP: Record<string, "running" | "idle" | "warning"> = {
  APPROVED: "running",
  DRAFT: "idle",
  CONVERTED_TO_PO: "warning",
};

const COLUMNS = [
  { key: "id", label: "PR 번호" },
  { key: "material", label: "Material" },
  { key: "qty", label: "수량" },
  { key: "requester", label: "요청자" },
  { key: "status", label: "상태" },
  { key: "created", label: "생성일" },
];

export default function PURPrPage() {
  return (
    <div>
      <PageHeader
        title="구매요청"
        accent="PR"
        nodeRef="SCR-PUR-002"
        status="PROTOTYPE"
        description="MRP 자동생성·수동 구매요청 목록. 상태: DRAFT → APPROVED → CONVERTED_TO_PO."
      />

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6">
          {[
            { label: "전체", count: 4 },
            { label: "초안", count: 1 },
            { label: "승인", count: 2 },
            { label: "전환", count: 1 },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-headline font-black text-2xl">{s.count}</p>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface/50">{s.label}</p>
            </div>
          ))}
        </div>
        <button className="bg-primary-accent text-black font-label font-bold text-xs uppercase tracking-widest px-5 py-2 hover:opacity-90">
          + 신규 PR
        </button>
      </div>

      <div className="overflow-x-auto bg-surface-container-lowest mt-4">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">PR 목록</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PR_DATA.map((row) => (
              <tr key={row.id} className="border-b border-outline-variant hover:bg-surface-container/40 cursor-pointer">
                <td className="px-4 py-3 font-mono text-xs text-primary-accent">{row.id}</td>
                <td className="px-4 py-3 font-body text-sm">{row.material}</td>
                <td className="px-4 py-3 font-body text-sm">{row.qty}</td>
                <td className="px-4 py-3 font-body text-sm">{row.requester}</td>
                <td className="px-4 py-3">
                  <StatusBadge type={STATUS_MAP[row.status] ?? "idle"} label={row.status} />
                </td>
                <td className="px-4 py-3 font-mono text-xs opacity-60">{row.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
