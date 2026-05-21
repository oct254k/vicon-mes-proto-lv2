import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const STORED_DATA = [
  { packId: "PKG-20260422-0011", wo: "WO-2026-0311", location: "Y-A03-02", memberCount: 8, storedAt: "2026-04-22 10:15", aging: "14" },
  { packId: "PKG-20260428-0025", wo: "WO-2026-0325", location: "Y-B01-05", memberCount: 12, storedAt: "2026-04-28 14:30", aging: "8" },
  { packId: "PKG-20260501-0003", wo: "WO-2026-0341", location: "Y-A01-01", memberCount: 6, storedAt: "2026-05-01 09:00", aging: "5" },
  { packId: "PKG-20260503-0019", wo: "WO-2026-0355", location: "Y-C02-03", memberCount: 10, storedAt: "2026-05-03 16:45", aging: "3" },
  { packId: "PKG-20260505-0007", wo: "WO-2026-0361", location: "Y-A02-04", memberCount: 4, storedAt: "2026-05-05 08:20", aging: "1" },
];

const COLS = [
  { key: "packId", label: "패킹 ID" },
  { key: "wo", label: "WO" },
  { key: "location", label: "야적 위치" },
  { key: "memberCount", label: "부재 수" },
  { key: "storedAt", label: "보관 일시" },
  { key: "aging", label: "AGING (일)" },
];

export default function SHPStoredPage() {
  const totalPacks = STORED_DATA.length;
  const avgAging = Math.round(
    STORED_DATA.reduce((s, r) => s + Number(r.aging), 0) / STORED_DATA.length
  );
  const overdue = STORED_DATA.filter((r) => Number(r.aging) > 7).length;

  const tableData = STORED_DATA.map((r) => ({
    ...r,
    aging: Number(r.aging) > 7
      ? `⚠ ${r.aging}`
      : r.aging,
  }));

  return (
    <div>
      <PageHeader
        title="STORED"
        accent="출하 대기"
        nodeRef="SCR-SHP-003"
        status="PROTOTYPE"
        description="야적 보관 패킹 현황 · AGING 관리"
      />

      {/* KPI 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-low p-4 border-l-4 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">대기 패킹 수</p>
          <p className="text-3xl font-headline font-black">{totalPacks}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-warning">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">평균 AGING (일)</p>
          <p className="text-3xl font-headline font-black">{avgAging}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-error">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">7일 초과 패킹</p>
          <p className="text-3xl font-headline font-black text-warning">{overdue}</p>
        </div>
      </div>

      <FieldHeader title="AGING 범례" moduleRef="7일 초과 = ⚠ 강조" />

      <DataTable
        title="STORED 출하 대기 목록"
        columns={COLS}
        data={tableData}
        bufferCount={STORED_DATA.length}
      />
    </div>
  );
}
