import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "moveId",   label: "이동 요청 ID" },
  { key: "lot",      label: "Lot No" },
  { key: "material", label: "자재" },
  { key: "qty",      label: "수량" },
  { key: "fromLoc",  label: "출발 위치" },
  { key: "toLoc",    label: "도착 위치" },
  { key: "reason",   label: "이동 사유" },
  { key: "requester",label: "요청자" },
  { key: "reqDate",  label: "요청일시" },
  { key: "status",   label: "상태" },
];

const DATA = [
  { moveId:"MOV-20260505-007", lot:"RCV-20260501-0017", material:"M-COIL-A P3000 900m", qty:"900m",   fromLoc:"Y-P3000-A-01-03", toLoc:"Y-P3000-A-01-02", reason:"위치 최적화", requester:"박창고", reqDate:"2026-05-05 09:00", status:"완료" },
  { moveId:"MOV-20260505-006", lot:"RCV-20260504-0021", material:"M-COIL-B",            qty:"1,800m", fromLoc:"Y-P3000-B-01-01", toLoc:"Y-P3000-A-01-05", reason:"야적장 재배치",requester:"박창고", reqDate:"2026-05-05 08:30", status:"진행중" },
  { moveId:"MOV-20260504-004", lot:"RCV-20260503-0011", material:"M-COIL-C",            qty:"4,200m", fromLoc:"Y-P3000-A-01-04", toLoc:"Y-P3000-A-02-01", reason:"출고 동선 최적화",requester:"이매니저",reqDate:"2026-05-04 16:00", status:"완료" },
  { moveId:"MOV-20260503-002", lot:"LOT-20260420-007",  material:"M-COIL-A",            qty:"2,800m", fromLoc:"Y-P3000-A-01-02", toLoc:"Y-P3000-A-02-03", reason:"AGING 관리",  requester:"김공장",  reqDate:"2026-05-03 11:20", status:"완료" },
];

const KPI = [
  { label: "오늘 이동 요청", value: "2건", badge: "running" as const },
  { label: "진행 중",         value: "1건", badge: "warning" as const },
  { label: "이번 주 완료",    value: "4건", badge: "idle"    as const },
];

export default function InventoryMovePage() {
  return (
    <div>
      <PageHeader
        title="위치 간 이동 요청"
        accent="MOVE"
        nodeRef="SCR-LOC-063"
        status="PROTOTYPE"
        description="동일 Plant 내 위치 간 이동 요청 DataTable. PDA 스캔 연계. 이동 사유·완료 추적."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-[#1a1a1a] border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-white/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-white">{k.value}</p>
            <div className="mt-2"><StatusBadge type={k.badge} label={k.badge.toUpperCase()} /></div>
          </div>
        ))}
      </div>

      <FieldHeader title="이동 요청 목록" moduleRef="FNC-LOC-093" />
      <DataTable title="위치 간 이동" columns={COLS} data={DATA} bufferCount={DATA.length} />

      <div className="flex gap-2 mt-4">
        <button className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:opacity-90">
          [이동 요청 생성 ▶]
        </button>
        <button className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-white/30">
          [PDA 스캔 모드 ▶]
        </button>
        <button className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-5 py-2 text-xs hover:border-white/30">
          [엑셀 다운]
        </button>
      </div>
    </div>
  );
}
