"use client";
import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const DAYS = [6,7,8,9,10,11,12];
const SHIPMENTS = [
  { id:"SHP-2026-0025", customer:"현대건설", dest:"부산항", days:[6,7], status:"IN_PROGRESS" },
  { id:"SHP-2026-0024", customer:"GS건설", dest:"인천항", days:[8,9,10], status:"SCHEDULED" },
  { id:"SHP-2026-0023", customer:"삼성물산", dest:"광양항", days:[9,10], status:"SCHEDULED" },
  { id:"SHP-2026-0022", customer:"DL이앤씨", dest:"평택항", days:[11,12], status:"SCHEDULED" },
];
const SM: Record<string,"running"|"idle"> = { IN_PROGRESS:"running", SCHEDULED:"idle" };
const SL: Record<string,string> = { IN_PROGRESS:"진행 중", SCHEDULED:"예정" };
const kpis = [{l:"이번 주 출하",v:4},{l:"진행 중",v:1},{l:"예정",v:3},{l:"지연 위험",v:0}];

export default function ScheduleCalendarPage() {
  return (
    <div>
      <PageHeader title="출하 일정 캘린더" nodeRef="IA-SHP-SCHEDULE-CALENDAR" status="PROTOTYPE"
        description="출하 일정 캘린더·간트 (FNC-SHP-046/040) — 1차 사용자: SHP-STAFF/MANAGER" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map(k=>(
          <div key={k.l} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="간트 뷰 (2026-05-06 ~ 05-12)" moduleRef="SCR-SHP-001" />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="grid p-0" style={{gridTemplateColumns:`200px repeat(${DAYS.length}, 1fr)`}}>
          <div className="bg-surface-container px-3 py-2 text-xs font-label opacity-50 uppercase border-b border-outline">출하 ID / 고객</div>
          {DAYS.map(d=>(
            <div key={d} className="bg-surface-container px-2 py-2 text-center text-xs font-label opacity-50 uppercase border-b border-outline">05-{d}</div>
          ))}
          {SHIPMENTS.map(s=>(
            <React.Fragment key={s.id}>
              <div className="px-3 py-3 border-b border-outline-variant">
                <p className="text-xs font-mono text-primary-accent">{s.id}</p>
                <p className="text-xs opacity-70">{s.customer}</p>
                <p className="text-xs opacity-40">{s.dest}</p>
              </div>
              {DAYS.map(d=>(
                <div key={d} className={`border-b border-outline-variant px-1 py-3 flex items-center justify-center ${s.days.includes(d)?"bg-primary-accent/20":""}`}>
                  {s.days.includes(d) && s.days[0]===d && <StatusBadge type={SM[s.status]} label={SL[s.status] ?? s.status} />}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <a href="/shp/schedule/new" className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest">+ 일정 등록</a>
        <a href="/shp/schedule/vehicle" className="px-4 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">차량 배차 →</a>
      </div>
    </div>
  );
}
