import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLUMNS = [
  { key: "part", label: "부재" },
  { key: "op", label: "공정" },
  { key: "lot", label: "생산 LOT" },
  { key: "plan", label: "계획" },
  { key: "actual", label: "실적" },
  { key: "worker", label: "작업자" },
  { key: "startAt", label: "시작" },
  { key: "status", label: "상태" },
];

const DATA = [
  { part: "B01-1-G22C-C-171", op: "G22C", lot: "PRD-20260506-001", plan: "1", actual: "1", worker: "김철수", startAt: "08:20", status: "완료" },
  { part: "B01-1-G22C-C-172", op: "G22C", lot: "PRD-20260506-002", plan: "1", actual: "0", worker: "김철수", startAt: "09:05", status: "진행중" },
  { part: "B02-2-G22C-C-088", op: "G22C", lot: "PRD-20260506-003", plan: "2", actual: "1", worker: "박영희", startAt: "08:45", status: "진행중" },
  { part: "B03-1-G22C-C-054", op: "G22C", lot: "PRD-20260505-011", plan: "3", actual: "3", worker: "이민준", startAt: "07:30", status: "완료" },
  { part: "B04-2-G22C-C-033", op: "G22C", lot: "PRD-20260505-012", plan: "1", actual: "0", worker: "—", startAt: "—", status: "대기" },
];

const STATUS_TYPE: Record<string, "running" | "idle" | "warning"> = {
  완료: "running", 진행중: "warning", 대기: "idle",
};

export default function ProduceProgressPage() {
  return (
    <div className="p-8">
      <PageHeader title="PRODUCE /" accent="공정 진척" nodeRef="SCR-MFG-020" status="PROTOTYPE" description="부재별 공정 진행 현황 — Lot 단위 실적" />

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "완료", count: 2, type: "running" as const },
          { label: "진행중", count: 2, type: "warning" as const },
          { label: "대기", count: 1, type: "idle" as const },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-low p-4 text-center">
            <p className="text-2xl font-headline font-black">{s.count}</p>
            <StatusBadge type={s.type} label={s.label} />
          </div>
        ))}
      </div>

      <DataTable
        title="부재별 공정 진척"
        columns={COLUMNS}
        data={DATA.map((d) => ({ ...d, status: d.status }))}
        bufferCount={DATA.length}
      />
    </div>
  );
}
