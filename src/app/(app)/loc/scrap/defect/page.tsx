import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "defectId",  label: "불량 ID" },
  { key: "lot",       label: "Lot No" },
  { key: "material",  label: "자재" },
  { key: "qty",       label: "수량" },
  { key: "reason",    label: "불량 사유" },
  { key: "isolateLoc",label: "격리 위치" },
  { key: "inspector", label: "검수자" },
  { key: "date",      label: "일시" },
  { key: "status",    label: "상태" },
];

const DATA = [
  { defectId:"DEF-20260505-002", lot:"RCV-20260504-0021", material:"M-COIL-B",  qty:"300m",  reason:"표면 결함",  isolateLoc:"Y-P3000-DEFECT-01-01", inspector:"박검수", date:"2026-05-05", status:"격리중" },
  { defectId:"DEF-20260503-001", lot:"RCV-20260502-0009", material:"M-COIL-C",  qty:"50m",   reason:"치수 불량",  isolateLoc:"Y-P3000-DEFECT-01-02", inspector:"김검수", date:"2026-05-03", status:"폐기결재" },
  { defectId:"DEF-20260430-005", lot:"LOT-20260410-011",  material:"M-PLATE-01",qty:"200kg", reason:"녹 발생",    isolateLoc:"Y-P3000-DEFECT-02-01", inspector:"박검수", date:"2026-04-30", status:"폐기완료" },
];

const KPI = [
  { label: "격리 중",   value: "2건", badge: "warning" as const },
  { label: "폐기 결재", value: "1건", badge: "stopped" as const },
  { label: "이번 달 폐기", value: "1건", badge: "idle" as const },
];

export default function ScrapDefectPage() {
  return (
    <div>
      <PageHeader
        title="불량 처리"
        accent="DEFECT"
        nodeRef="SCR-LOC-043"
        status="PROTOTYPE"
        description="불량 격리·폐기 결재 DataTable. QC-INSPECTOR 검수 후 LOC-MANAGER 폐기 결재."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-danger px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">{k.value}</p>
            <div className="mt-2"><StatusBadge type={k.badge} label={k.badge.toUpperCase()} /></div>
          </div>
        ))}
      </div>

      <FieldHeader title="불량 격리 목록" moduleRef="FNC-LOC-073" />
      <DataTable title="SCRAP 불량 처리" columns={COLS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-danger text-white font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [폐기 결재 요청 ▶]
        </button>
        <button className="bg-surface-elevated border border-outline/20 text-on-surface/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-outline/40">
          [엑셀 다운]
        </button>
      </div>
    </div>
  );
}
