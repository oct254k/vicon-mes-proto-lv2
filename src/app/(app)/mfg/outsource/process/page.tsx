import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLUMNS = [
  { key: "lot", label: "LOT" },
  { key: "part", label: "부재" },
  { key: "vendor", label: "외주사" },
  { key: "type", label: "유형" },
  { key: "sentAt", label: "출고일" },
  { key: "dueAt", label: "납기" },
  { key: "op", label: "외주 공정" },
  { key: "status", label: "상태" },
];

const DATA = [
  { lot: "PRD-20260506-001", part: "B01-1-G22C-C-171", vendor: "강남금속", type: "DIRECT", sentAt: "2026-05-06", dueAt: "2026-05-08", op: "표면처리", status: "가공중" },
  { lot: "PRD-20260505-011", part: "B03-1-G22C-C-054", vendor: "서울도금", type: "PROXY", sentAt: "2026-05-05", dueAt: "2026-05-07", op: "도금처리", status: "완료" },
  { lot: "PRD-20260504-007", part: "B02-2-G22C-C-088", vendor: "강남금속", type: "DIRECT", sentAt: "2026-05-04", dueAt: "2026-05-06", op: "용접보조", status: "납기지연" },
];

const STATUS_TYPE: Record<string, "running" | "idle" | "warning" | "stopped"> = {
  가공중: "warning", 완료: "running", 납기지연: "stopped",
};

export default function OutsourceProcessPage() {
  return (
    <div className="p-8">
      <PageHeader title="OUTSOURCE /" accent="외주 가공 현황" nodeRef="SCR-MFG-051" status="PROTOTYPE" description="외주 가공 PRODUCE 현황 — DIRECT/PROXY 분기" />

      <div className="bg-surface-container border-l-4 border-outline-variant/30 p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">외주 유형 분기 (FR-MFG-PRC-004)</p>
        <div className="flex gap-4 text-xs">
          <span><span className="text-primary-accent font-bold">DIRECT</span> — 외주사 직접 실적 입력</span>
          <span><span className="text-on-surface/60 font-bold">PROXY</span> — 사내 담당자 대리 입력</span>
        </div>
      </div>

      <FieldHeader title="외주 가공 현황" moduleRef="FNC-MFG-020~025 (외주 변형)" />
      <DataTable title="외주 PRODUCE" columns={COLUMNS} data={DATA} bufferCount={DATA.length} />

      <div className="grid grid-cols-3 gap-4 mt-6">
        {[{ label: "가공중", count: 1, type: "warning" as const }, { label: "완료", count: 1, type: "running" as const }, { label: "납기지연", count: 1, type: "stopped" as const }].map((s) => (
          <div key={s.label} className="bg-surface-container-low p-4 text-center">
            <p className="text-2xl font-headline font-black">{s.count}</p>
            <StatusBadge type={s.type} label={s.label} />
          </div>
        ))}
      </div>
    </div>
  );
}
