import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const DAILY = [
  { day: "04/29", prod: 88, defect: 3 },
  { day: "04/30", prod: 92, defect: 2 },
  { day: "05/01", prod: 105, defect: 4 },
  { day: "05/02", prod: 98, defect: 2 },
  { day: "05/03", prod: 115, defect: 5 },
  { day: "05/04", prod: 89, defect: 3 },
  { day: "05/05", prod: 94, defect: 2 },
];

export default function OPSProductionPage() {
  const maxProd = Math.max(...DAILY.map((d) => d.prod));
  const maxDefect = Math.max(...DAILY.map((d) => d.defect));

  return (
    <div className="p-6 bg-surface min-h-screen">
      <PageHeader
        title="생산·불량·가동"
        accent="COMBINED"
        nodeRef="SCR-OPS-060"
        description="OEE × 불량률 통합 대시보드 · 60초 자동 갱신"
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>P3000</option>
            <option>P2000</option>
            <option>P1000</option>
          </select>
          <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>기간: 최근 7일</option>
          </select>
        </div>
        <span className="text-xs font-label text-on-surface-variant">마지막 갱신 14:32 ⟳ 60초</span>
      </div>

      {/* KPI 카드 3개 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">생산량 (오늘)</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">94</p>
          <p className="text-xs text-on-surface-variant mt-1">목표 120 · 78.3%</p>
        </div>
        <div className="bg-surface-container border-l-4 border-error p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">불량 수 (오늘)</p>
          <p className="text-3xl font-black tabular-nums text-error">2</p>
          <p className="text-xs text-on-surface-variant mt-1">불량률 1.8% · -0.3% 어제대비</p>
        </div>
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">OEE</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">78.4<span className="text-lg">%</span></p>
          <p className="text-xs text-on-surface-variant mt-1">가용 92% · 성능 88% · 품질 98%</p>
        </div>
      </div>

      {/* 일별 생산량 vs 불량수 CSS Bar Chart */}
      <div className="bg-surface-container-lowest p-4 mb-8">
        <FieldHeader title="일별 생산량 vs 불량수 (7일)" moduleRef="FNC-OPS-070" />
        <div className="flex items-end gap-2 h-24 mb-2">
          {DAILY.map((d) => (
            <div key={d.day} className="flex items-end gap-0.5 flex-1">
              <div
                className="bg-primary-accent/60 flex-1"
                style={{ height: `${(d.prod / maxProd) * 88}px` }}
                title={`생산 ${d.prod}`}
              />
              <div
                className="bg-error/60 w-2"
                style={{ height: `${(d.defect / maxDefect) * 88}px` }}
                title={`불량 ${d.defect}`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {DAILY.map((d) => (
            <div key={d.day} className="flex-1 text-center">
              <p className="text-[10px] text-on-surface-variant font-label">{d.day}</p>
              <p className="text-[10px] text-primary-accent font-black tabular-nums">{d.prod}</p>
              <p className="text-[10px] text-error tabular-nums">{d.defect}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs font-label">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary-accent/60 inline-block" /> 생산량</span>
          <span className="flex items-center gap-1"><span className="w-2 h-3 bg-error/60 inline-block" /> 불량수</span>
        </div>
      </div>

      {/* 손실 사유 간략 표 */}
      <div className="bg-surface-container-lowest p-4">
        <FieldHeader title="손실 사유 분해 (Pareto)" moduleRef="FNC-OPS-074" />
        <div className="space-y-2">
          {[
            { label: "설비 고장 (BM)", loss: 180, cum: 45 },
            { label: "교체 시간", loss: 95, cum: 69 },
            { label: "자재 대기", loss: 45, cum: 80 },
            { label: "불량 재작업", loss: 32, cum: 88 },
            { label: "공구 교체", loss: 20, cum: 93 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xs font-label text-on-surface-variant w-28 truncate">{item.label}</span>
              <div className="flex-1 h-2 bg-surface-container-highest">
                <div className="h-2 bg-primary-accent/60" style={{ width: `${item.loss / 2}px`, maxWidth: "100%" }} />
              </div>
              <span className="text-xs tabular-nums text-on-surface w-12 text-right">{item.loss}분</span>
              <span className="text-xs tabular-nums text-on-surface-variant w-10 text-right">{item.cum}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
