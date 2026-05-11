"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const QUADRANTS = [
  { title: "생산 진척",   items: [["진척률","92%"],["목표","1,200건"],["완료","1,104건"],["잔여","96건"]] },
  { title: "품질 현황",   items: [["불량률","1.8%"],["SPC 위반","3건"],["미해결","2건"],["당일 검사","47건"]] },
  { title: "설비 가동",   items: [["OEE","78.4%"],["가용성","92%"],["가동","12/15"],["DOWN","1건"]] },
  { title: "알림·이슈",  items: [["미해결","12건"],["지연WO","3건"],["재고부족","4건"],["SPC Rule1","1건"]] },
];

const COLS = [
  { key: "kpi",    label: "KPI 항목" },
  { key: "target", label: "목표" },
  { key: "actual", label: "실적" },
  { key: "rate",   label: "달성률" },
  { key: "status", label: "상태" },
];

const DATA = [
  { kpi: "생산 진척률",  target: "90%",    actual: "92%",    rate: "102%", status: "초과달성" },
  { kpi: "불량률",       target: "< 2%",   actual: "1.8%",   rate: "정상", status: "정상" },
  { kpi: "OEE",          target: "80%",    actual: "78.4%",  rate: "98%",  status: "주의" },
  { kpi: "설비 가동률",  target: "95%",    actual: "92%",    rate: "97%",  status: "주의" },
  { kpi: "납기 준수율",  target: "98%",    actual: "96%",    rate: "98%",  status: "주의" },
];

export default function Plant4QPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="Plant 종합 4분면" nodeRef="FNC-OPS-020~024" description="L3 공장장 · Plant 4분면 KPI · 60초+이벤트 갱신" />

      {/* 4분면 그리드 */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {QUADRANTS.map(q => (
          <div key={q.title} className="bg-surface-container p-5 border-l-4 border-primary-accent">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">{q.title}</p>
            <div className="grid grid-cols-2 gap-y-2">
              {q.items.map(([l,v]) => (
                <div key={l}>
                  <p className="text-xs font-label text-on-surface-variant">{l}</p>
                  <p className="text-lg font-black tabular-nums">{v}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <DataTable title="Plant 4분기 KPI DataTable" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
