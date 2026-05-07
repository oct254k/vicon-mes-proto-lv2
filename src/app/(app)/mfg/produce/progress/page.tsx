import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLUMNS = [
  { key: "part",    label: "부재" },
  { key: "op",      label: "공정" },
  { key: "wc",      label: "WC" },
  { key: "lot",     label: "생산 LOT" },
  { key: "worker",  label: "작업자" },
  { key: "startAt", label: "시작" },
  { key: "status",  label: "상태" },
];

// 제3공장 4공정: 신선 → TG → 포밍 → 데크플레이트
const DATA = [
  { part: "B01-1-G22C-C-171", op: "신선공정",       wc: "WC-신선-01", lot: "신선-20260506-001", worker: "김작업", startAt: "08:10", status: "완료" },
  { part: "B01-1-G22C-C-171", op: "TG공정",         wc: "WC-TG-01",   lot: "TG-20260506-001",  worker: "이TG",   startAt: "10:05", status: "진행중" },
  { part: "B01-1-G22C-C-171", op: "포밍공정",       wc: "WC-포밍-01", lot: "—",                worker: "—",      startAt: "—",     status: "대기" },
  { part: "B01-1-G22C-C-171", op: "데크플레이트공정", wc: "WC-DP-01",   lot: "—",                worker: "—",      startAt: "—",     status: "대기" },
  { part: "B01-1-G22C-C-172", op: "신선공정",       wc: "WC-신선-01", lot: "신선-20260506-002", worker: "김작업", startAt: "09:05", status: "진행중" },
  { part: "B01-2-G15A-S-040", op: "신선공정",       wc: "WC-신선-01", lot: "신선-20260506-010", worker: "박신선", startAt: "07:30", status: "완료" },
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
