"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PLANTS } from "@/data/plants";

const TAB_PLANTS = PLANTS.filter((p) => p.code !== "P4000");

const TAB_LABEL: Record<string, string> = {
  P1100: "1-1공장",
  P1200: "1-2공장",
  P2000: "2공장",
  P3000: "3공장",
};

const HOURS = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

interface ProcessUtil {
  id: string;
  name: string;
  util: number;
}

interface AlarmItem {
  type: string;
  count: number;
}

interface WoRow {
  [key: string]: string;
  id: string;
  total: string;
  done: string;
  rate: string;
  status: string;
}

interface EqRow {
  [key: string]: string;
  id: string;
  name: string;
  process: string;
  status: string;
  uptime: string;
  mtbf: string;
}

interface PlantData {
  target: number;
  actual: number;
  oee: number;
  processes: ProcessUtil[];
  hourly: number[];
  alarms: AlarmItem[];
  eqData: EqRow[];
  woData: WoRow[];
}

const PLANT_DATA: Record<string, PlantData> = {
  P1100: {
    target: 2400,
    actual: 1920,
    oee: 82,
    processes: [
      { id: "L1", name: "포밍공정", util: 88 },
      { id: "L2", name: "용접공정", util: 76 },
    ],
    hourly: [195, 210, 198, 215, 205, 188, 200, 212, 198, 205, 110, 0],
    alarms: [
      { type: "부적합", count: 0 },
      { type: "설비", count: 1 },
      { type: "자재", count: 0 },
    ],
    eqData: [
      { id: "EQ-P1100-FRM-001", name: "포밍기 #1",    process: "포밍공정", status: "RUNNING", uptime: "96.2%", mtbf: "1,840" },
      { id: "EQ-P1100-FRM-002", name: "포밍기 #2",    process: "포밍공정", status: "WARNING", uptime: "81.4%", mtbf: "520" },
      { id: "EQ-P1100-WLD-001", name: "CO2 용접기 A", process: "용접공정", status: "RUNNING", uptime: "98.1%", mtbf: "2,100" },
      { id: "EQ-P1100-WLD-002", name: "저항 용접기",  process: "용접공정", status: "RUNNING", uptime: "94.3%", mtbf: "1,260" },
    ],
    woData: [
      { id: "WO-P1100-20260514-0003", total: "15", done: "12", rate: "80%", status: "진행중" },
      { id: "WO-P1100-20260514-0004", total: "20", done: "8",  rate: "40%", status: "진행중" },
      { id: "WO-P1100-20260513-0002", total: "10", done: "10", rate: "100%", status: "완료" },
    ],
  },
  P1200: {
    target: 1800,
    actual: 1530,
    oee: 88,
    processes: [
      { id: "L1", name: "포밍공정", util: 92 },
      { id: "L2", name: "용접공정", util: 85 },
    ],
    hourly: [148, 162, 155, 170, 158, 142, 168, 175, 162, 160, 90, 0],
    alarms: [
      { type: "부적합", count: 1 },
      { type: "설비", count: 0 },
      { type: "자재", count: 0 },
    ],
    eqData: [
      { id: "EQ-P1200-FRM-001", name: "포밍기 #1",    process: "포밍공정", status: "RUNNING", uptime: "97.5%", mtbf: "2,050" },
      { id: "EQ-P1200-WLD-001", name: "CO2 용접기 A", process: "용접공정", status: "RUNNING", uptime: "99.0%", mtbf: "2,380" },
      { id: "EQ-P1200-WLD-002", name: "저항 용접기",  process: "용접공정", status: "STOPPED", uptime: "0.0%",  mtbf: "180" },
    ],
    woData: [
      { id: "WO-P1200-20260514-0002", total: "18", done: "15", rate: "83%",  status: "진행중" },
      { id: "WO-P1200-20260514-0003", total: "12", done: "9",  rate: "75%",  status: "진행중" },
      { id: "WO-P1200-20260513-0001", total: "14", done: "14", rate: "100%", status: "완료" },
    ],
  },
  P2000: {
    target: 3200,
    actual: 2240,
    oee: 74,
    processes: [
      { id: "L1", name: "절단공정", util: 82 },
      { id: "L2", name: "조립공정", util: 70 },
      { id: "L3", name: "용접공정", util: 75 },
      { id: "L4", name: "포장공정", util: 90 },
    ],
    hourly: [255, 290, 275, 310, 295, 240, 285, 300, 280, 285, 145, 0],
    alarms: [
      { type: "부적합", count: 2 },
      { type: "설비", count: 1 },
      { type: "자재", count: 0 },
    ],
    eqData: [
      { id: "EQ-P2000-CUT-001", name: "절단기 #1",   process: "절단공정", status: "RUNNING", uptime: "91.8%", mtbf: "1,650" },
      { id: "EQ-P2000-ASM-001", name: "볼팅 머신",   process: "조립공정", status: "WARNING", uptime: "74.2%", mtbf: "430" },
      { id: "EQ-P2000-WLD-001", name: "MIG 용접기",  process: "용접공정", status: "RUNNING", uptime: "88.5%", mtbf: "980" },
      { id: "EQ-P2000-PKG-001", name: "번들링 머신", process: "포장공정", status: "RUNNING", uptime: "95.0%", mtbf: "2,200" },
    ],
    woData: [
      { id: "WO-P2000-20260514-0005", total: "22", done: "14", rate: "64%",  status: "진행중" },
      { id: "WO-P2000-20260514-0006", total: "16", done: "5",  rate: "31%",  status: "미달" },
      { id: "WO-P2000-20260514-0007", total: "18", done: "3",  rate: "17%",  status: "미달" },
      { id: "WO-P2000-20260513-0003", total: "20", done: "20", rate: "100%", status: "완료" },
    ],
  },
  P3000: {
    target: 5000,
    actual: 3850,
    oee: 78,
    processes: [
      { id: "L1", name: "신선공정",       util: 82 },
      { id: "L2", name: "TG공정",         util: 91 },
      { id: "L3", name: "포밍공정",       util: 73 },
      { id: "L4", name: "데크플레이트공정", util: 85 },
    ],
    hourly: [420, 480, 458, 510, 495, 380, 460, 490, 452, 465, 240, 0],
    alarms: [
      { type: "부적합", count: 1 },
      { type: "설비", count: 0 },
      { type: "자재", count: 1 },
    ],
    eqData: [
      { id: "EQ-P3000-DRW-001", name: "신선기 M1",     process: "신선공정",       status: "RUNNING", uptime: "98.2%", mtbf: "1,420" },
      { id: "EQ-P3000-TG-001",  name: "TG 유닛 A",     process: "TG공정",         status: "RUNNING", uptime: "96.7%", mtbf: "890" },
      { id: "EQ-P3000-FRM-001", name: "포밍 프레스 #1", process: "포밍공정",       status: "WARNING", uptime: "87.1%", mtbf: "620" },
      { id: "EQ-P3000-FRM-002", name: "포밍 프레스 #2", process: "포밍공정",       status: "STOPPED", uptime: "0.0%",  mtbf: "340" },
      { id: "EQ-P3000-DCK-001", name: "데크 점용접기",  process: "데크플레이트공정", status: "RUNNING", uptime: "93.4%", mtbf: "1,180" },
    ],
    woData: [
      { id: "WO-P3000-20260514-0007", total: "12", done: "9",  rate: "75%",  status: "진행중" },
      { id: "WO-P3000-20260514-0008", total: "12", done: "5",  rate: "42%",  status: "진행중" },
      { id: "WO-P3000-20260514-0005", total: "20", done: "6",  rate: "30%",  status: "미달" },
      { id: "WO-P3000-20260513-0002", total: "8",  done: "8",  rate: "100%", status: "완료" },
    ],
  },
};

const EQ_COLUMNS = [
  { key: "id",      label: "설비 ID" },
  { key: "name",    label: "설비명" },
  { key: "process", label: "공정" },
  { key: "status",  label: "상태" },
  { key: "uptime",  label: "가동시간 %" },
  { key: "mtbf",    label: "MTBF (hrs)" },
];

const WO_COLUMNS = [
  { key: "id",     label: "WO ID" },
  { key: "total",  label: "총 부재" },
  { key: "done",   label: "완료" },
  { key: "rate",   label: "진척률" },
  { key: "status", label: "상태" },
];

export default function OPSDashboardPage() {
  const [activePlant, setActivePlant] = useState(TAB_PLANTS[0].code);
  const [refreshCountdown, setRefreshCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const plant = PLANTS.find((p) => p.code === activePlant)!;
  const data = PLANT_DATA[activePlant];
  const achievement = ((data.actual / data.target) * 100).toFixed(1);
  const maxHourly = Math.max(...data.hourly);

  return (
    <div>
      <PageHeader
        title="운영현황·대시보드"
        accent="OPS"
        nodeRef="SCR-OPS-000"
        status="LIVE"
        description="공장별 실시간 생산현황 · KPI · 공정 가동률 · WO 진척"
      />

      {/* Auto-refresh indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 bg-primary-accent animate-pulse" />
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          자동갱신{" "}
          <span className="tabular-nums text-primary-accent">
            {String(refreshCountdown).padStart(2, "0")}s
          </span>
        </span>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 ml-auto">
          2026-05-14 | 주간
        </span>
      </div>

      {/* Plant Tabs */}
      <div className="flex gap-0 mb-8 border-b border-outline-variant/20 overflow-x-auto">
        {TAB_PLANTS.map((p) => (
          <button
            key={p.code}
            onClick={() => setActivePlant(p.code)}
            className={`flex-shrink-0 px-6 py-3 font-label text-sm font-black transition-colors border-b-2 -mb-px ${
              activePlant === p.code
                ? "border-primary-accent text-primary-accent bg-surface-container-lowest"
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            {TAB_LABEL[p.code]}
          </button>
        ))}
      </div>

      {/* Plant identity */}
      <div className="mb-6">
        <h2 className="font-headline font-black text-lg text-on-surface">{plant.name}</h2>
        <p className="font-label text-xs text-on-surface-variant mt-0.5">{plant.address}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-8">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-outline-variant/30">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
            금일 목표
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-on-surface">
            {data.target.toLocaleString()}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">EA</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
            실적
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-primary-accent">
            {data.actual.toLocaleString()}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">EA</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
            달성률
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-[#f59e0b]">
            {achievement}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">%</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#22c55e]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
            OEE
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-[#22c55e]">
            {data.oee}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">%</span>
        </div>
      </div>

      {/* Process Utilization */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            공정 가동률
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.processes.map((proc) => (
            <div key={proc.id} className="bg-surface-container-lowest p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label text-xs text-on-surface-variant truncate pr-2">
                  {proc.id} {proc.name}
                </span>
                <span className="text-xl font-black font-headline tabular-nums flex-shrink-0">
                  {proc.util}
                  <span className="text-xs text-on-surface-variant">%</span>
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container">
                <div
                  className={`h-full transition-all ${
                    proc.util >= 90
                      ? "bg-primary-accent"
                      : proc.util >= 80
                      ? "bg-[#f59e0b]"
                      : "bg-error"
                  }`}
                  style={{ width: `${proc.util}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hourly Production Chart */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            시간대별 생산량 (EA)
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="bg-surface-container-lowest p-5">
          <div className="flex items-end gap-1 h-36">
            {data.hourly.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-label text-[10px] tabular-nums text-on-surface-variant">
                  {val > 0 ? val : ""}
                </span>
                <div className="w-full flex items-end" style={{ height: "104px" }}>
                  <div
                    className={`w-full transition-all ${
                      val === 0
                        ? "bg-surface-container"
                        : "bg-primary-accent/70 hover:bg-primary-accent"
                    }`}
                    style={{
                      height: val > 0 ? `${(val / maxHourly) * 100}%` : "4px",
                    }}
                  />
                </div>
                <span className="font-label text-[10px] tabular-nums text-on-surface-variant opacity-60">
                  {HOURS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Status */}
      <div className="mb-8">
        <DataTable
          title="설비 현황"
          columns={EQ_COLUMNS}
          data={data.eqData}
          bufferCount={data.eqData.length}
        />
      </div>

      {/* WO Table + Alarm Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <DataTable
            title="WO별 진척"
            columns={WO_COLUMNS}
            data={data.woData}
            bufferCount={data.woData.length}
          />
        </div>
        <div className="bg-surface-container-lowest">
          <div className="p-4 bg-surface-container-highest/30 border-l-4 border-error">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest">
              알람 요약
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {data.alarms.map((a) => (
              <div
                key={a.type}
                className="flex items-center justify-between py-3 border-b border-outline-variant/5 last:border-0"
              >
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {a.type}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-headline tabular-nums">{a.count}</span>
                  <StatusBadge
                    type={a.count > 0 ? "warning" : "idle"}
                    label={a.count > 0 ? "활성" : "정상"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
