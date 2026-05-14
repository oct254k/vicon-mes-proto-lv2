import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CLAIMS_DATA = [
  { claimId: "CLM-2026-0008", po: "PO-2026-0035", supplier: "동양특수강", reason: "치수 불량", stage: "OPEN", amount: "₩2,400,000" },
  { claimId: "CLM-2026-0009", po: "PO-2026-0038", supplier: "신흥금속(주)", reason: "수량 부족", stage: "IN_REVIEW", amount: "₩850,000" },
  { claimId: "CLM-2026-0010", po: "PO-2026-0040", supplier: "삼양스틸", reason: "납기 지연", stage: "CLOSED", amount: "₩1,200,000" },
  { claimId: "CLM-2026-0011", po: "PO-2026-0043", supplier: "신흥금속(주)", reason: "재질 불합격", stage: "OPEN", amount: "₩5,600,000" },
  { claimId: "CLM-2026-0012", po: "PO-2026-0044", supplier: "(주)한국강재", reason: "마킹 오류", stage: "RESOLVED", amount: "₩320,000" },
];

const STAGE_MAP: Record<string, { type: "running" | "warning" | "idle" | "stopped" }> = {
  OPEN:       { type: "stopped" },
  IN_REVIEW:  { type: "warning" },
  RESOLVED:   { type: "running" },
  CLOSED:     { type: "idle" },
};

const COLS = [
  { key: "claimId", label: "클레임 ID" },
  { key: "po", label: "PO" },
  { key: "supplier", label: "공급사" },
  { key: "reason", label: "사유" },
  { key: "stage", label: "단계" },
  { key: "amount", label: "금액" },
];

export default function PURClaimsPage() {
  const open = CLAIMS_DATA.filter((c) => c.stage === "OPEN").length;
  const inReview = CLAIMS_DATA.filter((c) => c.stage === "IN_REVIEW").length;
  const resolved = CLAIMS_DATA.filter((c) => ["RESOLVED", "CLOSED"].includes(c.stage)).length;

  const tableData = CLAIMS_DATA.map((c) => ({
    claimId: c.claimId,
    po: c.po,
    supplier: c.supplier,
    reason: c.reason,
    stage: c.stage as unknown as string,
    amount: c.amount,
  }));

  return (
    <div>
      <PageHeader
        title="클레임"
        accent="CLAIMS"
        nodeRef="SCR-PUR-024"
        status="PROTOTYPE"
        description="공급사 클레임 · 반품 처리 관리"
      />

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-low p-4 border-l-4 border-error">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">OPEN</p>
          <p className="text-2xl font-headline font-black">{open}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-warning">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">IN REVIEW</p>
          <p className="text-2xl font-headline font-black">{inReview}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">RESOLVED</p>
          <p className="text-2xl font-headline font-black">{resolved}</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/90 transition-colors">
          + 클레임 등록
        </button>
      </div>

      {/* 커스텀 테이블 (stage badge 처리) */}
      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            클레임 목록
            <span className="opacity-30 font-light ml-2">| Buffer: 005 Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {COLS.map((col) => (
                  <th key={col.key} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {CLAIMS_DATA.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 font-mono text-xs">{row.claimId}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{row.po}</td>
                  <td className="px-4 py-2">{row.supplier}</td>
                  <td className="px-4 py-2">{row.reason}</td>
                  <td className="px-4 py-2">
                    <StatusBadge
                      type={STAGE_MAP[row.stage]?.type ?? "idle"}
                      label={row.stage}
                    />
                  </td>
                  <td className="px-4 py-2 tabular-nums text-xs">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
