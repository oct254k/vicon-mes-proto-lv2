import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "txId",     label: "TX ID" },
  { key: "lot",      label: "Lot No" },
  { key: "material", label: "자재" },
  { key: "qty",      label: "수량" },
  { key: "from",     label: "출발" },
  { key: "to",       label: "도착(예정)" },
  { key: "elapsed",  label: "경과(h)" },
  { key: "aging",    label: "AGING" },
  { key: "status",   label: "상태" },
];

const DATA = [
  { txId:"TX-20260505-0031", lot:"RCV-20260501-0017", material:"M-COIL-A P3000 900m", qty:"900m",   from:"P3000·Y-RAW", to:"P1000·Y-RAW",  elapsed:"26", aging:"⚠ AGING", status:"OCCUPIED_TRANSIT" },
  { txId:"TX-20260505-0028", lot:"RCV-20260503-0011", material:"M-COIL-C",            qty:"4,200m", from:"P3000·Y-RAW", to:"P3000·Y-WIP",  elapsed:"4",  aging:"—",       status:"RESERVED" },
  { txId:"TX-20260505-0025", lot:"RCV-20260504-0021", material:"M-COIL-B",            qty:"1,800m", from:"P3000·Y-IN",  to:"P3000·Y-RAW",  elapsed:"2",  aging:"—",       status:"OCCUPIED_TRANSIT" },
  { txId:"TX-20260504-0019", lot:"RCV-20260430-0033", material:"M-COIL-A",            qty:"5,000m", from:"P1000·Y-RAW", to:"P2000·Y-WIP",  elapsed:"18", aging:"—",       status:"SETTLED" },
  { txId:"TX-20260503-0012", lot:"LOT-20260420-007",  material:"M-COIL-A",            qty:"2,800m", from:"P3000·Y-RAW", to:"P3000·Y-DEFECT",elapsed:"30", aging:"⚠ AGING", status:"AGING_TRANSIT" },
];

const KPI = [
  { label: "이동 중",     value: "8건",   badge: "warning" as const },
  { label: "AGING(24h+)", value: "2건",   badge: "stopped" as const },
  { label: "불일치 결재",  value: "1건",   badge: "error"   as const },
];

export default function InTransitPage() {
  const agingRows = DATA.filter(d => d.aging !== "—");

  return (
    <div>
      <PageHeader
        title="이동 중 모니터"
        accent="IN-TRANSIT"
        nodeRef="SCR-LOC-032"
        status="PROTOTYPE"
        description="in-transit 가상 위치 실시간 모니터. 24h 초과 AGING 강조(주황 깜빡임). 불일치 결재 진입 가능."
      />

      <div className="flex gap-4 mb-8">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-elevated border-l-4 border-[#00912F] px-6 py-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface/40 mb-1">{k.label}</p>
            <p className="text-2xl font-black font-headline text-on-surface">{k.value}</p>
            <StatusBadge type={k.badge} label={k.badge.toUpperCase()} />
          </div>
        ))}
      </div>

      {agingRows.length > 0 && (
        <>
          <FieldHeader title="AGING 경보 — 24h 초과" moduleRef="FNC-LOC-053" />
          <div className="mb-6 space-y-2">
            {agingRows.map(r => (
              <div key={r.txId} className="bg-warning/10 border border-warning/30 px-5 py-3 flex items-center justify-between animate-pulse">
                <div>
                  <p className="font-label text-xs uppercase tracking-widest text-warning">⚠ AGING — {r.lot}</p>
                  <p className="text-on-surface/50 text-xs">{r.material} / {r.from} → {r.to} / {r.elapsed}h 경과</p>
                </div>
                <StatusBadge type="warning" label={r.status} />
              </div>
            ))}
          </div>
        </>
      )}

      <FieldHeader title="전체 이동 목록" moduleRef="FNC-LOC-052" />
      <DataTable title="In-Transit 목록" columns={COLS} data={DATA} bufferCount={DATA.length} />
    </div>
  );
}
