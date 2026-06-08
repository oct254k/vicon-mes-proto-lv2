import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const KPI = [
  { label: "합격률", value: "98.7%", delta: "+0.2% (전월)", up: true },
  { label: "부적합률", value: "1.3%", delta: "-0.1% (전월)", up: false, warn: false },
  { label: "MTBF", value: "0.5 h", delta: "+0.4h (전월)", up: true, warn: true },
];

const DEFECT_DIST = [
  { type: "DEFECT", count: 12, color: "bg-warning", textColor: "text-white" },
  { type: "SCRAP", count: 8, color: "bg-error", textColor: "text-white" },
  { type: "CLAIM", count: 3, color: "bg-tertiary", textColor: "text-white" },
  { type: "RETURN", count: 2, color: "bg-surface-container-highest", textColor: "" },
];

export default function QCDashboardMain() {
  return (
    <div>
      <PageHeader
        title="품질 KPI"
        accent="메인"
        nodeRef="SCR-QC-000"
        status="PROTOTYPE"
        description="불량률·평균고장간격 종합 현황 (최근 30일)"
      />

      <div className="flex gap-3 mb-6">
        <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>공장: P3000</option><option>P1000</option><option>P2000</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>최근 30일</option><option>최근 7일</option><option>이번 달</option>
        </select>
      </div>

      <FieldHeader title="핵심 KPI" moduleRef="FNC-QC-004~007" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {KPI.map((k) => (
          <div key={k.label} className={`p-4 border-l-4 ${k.warn ? "border-error bg-error/5" : "border-primary-accent bg-primary-accent/5"}`}>
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{k.label}</p>
            <p className="font-headline font-black text-3xl">{k.value}</p>
            <p className={`text-xs mt-1 ${k.warn ? "text-error" : "text-primary-accent"}`}>{k.delta}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="불량 트랜잭션 분포" moduleRef="FNC-QC-073" />
      <div className="flex gap-4 mb-6">
        {DEFECT_DIST.map((d) => (
          <div key={d.type} className="flex-1 bg-surface-container-low p-4 text-center">
            <div className={`w-12 h-12 ${d.color} ${d.textColor} mx-auto mb-2 flex items-center justify-center font-headline font-black text-lg`}>{d.count}</div>
            <p className="font-label text-xs uppercase tracking-widest opacity-70">{d.type}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container border-l-4 border-outline-variant/20 p-4 flex items-center gap-3">
        <StatusBadge type="running" label="MATCH" />
        <p className="text-xs opacity-50 font-label">관리도·KPI 일치 검증 (FNC-QC-007) — 어제 기준 일치 확인</p>
      </div>
    </div>
  );
}
