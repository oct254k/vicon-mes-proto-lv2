"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key: "line",    label: "공정라인" },
  { key: "wc",      label: "WC" },
  { key: "target",  label: "목표" },
  { key: "done",    label: "완료" },
  { key: "rate",    label: "진척률" },
  { key: "defect",  label: "불량률" },
  { key: "oee",     label: "OEE" },
  { key: "status",  label: "상태" },
];

const DATA = [
  { line: "절단라인",  wc: "L01", target: "120건", done: "94건",  rate: "78%",  defect: "1.2%", oee: "82%", status: "진행" },
  { line: "천공라인",  wc: "L02", target: "115건", done: "115건", rate: "100%", defect: "0.8%", oee: "88%", status: "완료" },
  { line: "용접라인",  wc: "L03", target: "100건", done: "72건",  rate: "72%",  defect: "2.1%", oee: "74%", status: "지연" },
  { line: "조립라인",  wc: "L04", target: "80건",  done: "76건",  rate: "95%",  defect: "0.5%", oee: "90%", status: "진행" },
  { line: "검사라인",  wc: "L05", target: "200건", done: "180건", rate: "90%",  defect: "1.8%", oee: "85%", status: "진행" },
  { line: "도장라인",  wc: "L06", target: "60건",  done: "48건",  rate: "80%",  defect: "3.0%", oee: "70%", status: "주의" },
];

// 공정라인별 막대 차트 데이터
const BARS = DATA.map(d => ({ line: d.line, rate: parseInt(d.rate), status: d.status }));

export default function PlantProcessLinePage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="공정라인별 현황" nodeRef="FNC-OPS-026,028" description="공정라인별 일일 생산량 · 60초 갱신" />

      {/* 공정라인 바 차트 */}
      <div className="bg-surface-container p-5 mb-5">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">공정라인 진척률 현황</p>
        {BARS.map(b => (
          <div key={b.line} className="mb-3">
            <div className="flex justify-between text-xs font-label mb-1">
              <span className="text-on-surface-variant w-20">{b.line}</span>
              <span className={`tabular-nums ${b.rate>=80?"text-primary-accent":b.rate>=70?"text-[#f59e0b]":"text-error"}`}>{b.rate}%</span>
            </div>
            <div className="h-3 bg-surface-container-highest/30">
              <div className={`h-3 ${b.rate>=80?"bg-primary-accent":b.rate>=70?"bg-[#f59e0b]":"bg-error"}`} style={{width:`${b.rate}%`}} />
            </div>
          </div>
        ))}
      </div>

      <DataTable title="공정라인별 일일 생산량" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
