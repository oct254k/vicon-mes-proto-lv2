"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const HOURLY = [47, 62, 58, 71, 65, 80, 78, 94];
const HOURS = ["08", "09", "10", "11", "12", "13", "14", "현재"];

const WO_DATA = [
  { id: "WO-P3000-20260506-0007", members: "12", done: "9",  rate: "75%", status: "진행중" },
  { id: "WO-P3000-20260506-0008", members: "12", done: "5",  rate: "42%", status: "진행중" },
  { id: "WO-P3000-20260506-0005", members: "20", done: "6",  rate: "30%", status: "미달" },
  { id: "WO-P3000-20260506-0006", members: "18", done: "3",  rate: "17%", status: "미달" },
  { id: "WO-P3000-20260505-0002", members: "8",  done: "8",  rate: "100%", status: "완료" },
];

export default function OPSPlantPage() {
  const [plant, setPlant] = useState("P3000");
  const maxVal = Math.max(...HOURLY);

  return (
    <div className="p-6 bg-surface min-h-screen">
      <PageHeader
        title="Plant 종합"
        accent="DASHBOARD"
        nodeRef="SCR-OPS-020"
        description="제3공장 4분면 대시보드 · 60초 자동 갱신"
      />

      {/* 필터 */}
      <div className="flex items-center gap-3 mb-6">
        <select
          value={plant}
          onChange={(e) => setPlant(e.target.value)}
          className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label"
        >
          <option value="P1000">P1000</option>
          <option value="P2000">P2000</option>
          <option value="P3000">P3000</option>
        </select>
        <span className="text-xs font-label text-on-surface-variant">기간: 오늘</span>
        <span className="text-xs font-label text-on-surface-variant ml-auto">마지막 갱신 14:32 ⟳ 60초</span>
      </div>

      {/* KPI 카드 4개 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">오늘 생산</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">94</p>
          <p className="text-xs text-on-surface-variant mt-1">목표 120건 · +5건 어제대비</p>
        </div>
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">WO 완료율</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">78<span className="text-lg">%</span></p>
          <p className="text-xs text-on-surface-variant mt-1">+2.1% 어제대비</p>
        </div>
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">불량률</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">1.8<span className="text-lg">%</span></p>
          <p className="text-xs text-on-surface-variant mt-1">-0.3% 어제대비</p>
        </div>
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">가동률</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">92<span className="text-lg">%</span></p>
          <p className="text-xs text-on-surface-variant mt-1">OEE 78.4%</p>
        </div>
      </div>

      {/* CSS Bar Chart */}
      <div className="bg-surface-container-lowest p-4 mb-8">
        <FieldHeader title="시간별 생산량" moduleRef="FNC-OPS-022" />
        <div className="flex items-end gap-1 h-24">
          {HOURLY.map((val, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-[10px] text-on-surface-variant font-label tabular-nums">{val}</span>
              <div
                className="bg-primary-accent/60 w-full"
                style={{ height: `${(val / maxVal) * 72}px` }}
              />
              <span className="text-[10px] text-on-surface-variant font-label">{HOURS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WO DataTable */}
      <DataTable
        title="WO별 진척"
        columns={[
          { key: "id", label: "WO ID" },
          { key: "members", label: "총 부재" },
          { key: "done", label: "완료" },
          { key: "rate", label: "진척률" },
          { key: "status", label: "상태" },
        ]}
        data={WO_DATA}
        bufferCount={WO_DATA.length}
      />
    </div>
  );
}
