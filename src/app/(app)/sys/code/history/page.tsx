"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key:"histId",   label:"이력 ID" },
  { key:"groupCd",  label:"코드 그룹" },
  { key:"codeCd",   label:"코드값" },
  { key:"action",   label:"변경 유형" },
  { key:"before",   label:"변경 전" },
  { key:"after",    label:"변경 후" },
  { key:"changedBy",label:"변경자" },
  { key:"changedAt",label:"변경일시" },
];

const MOCK = [
  { histId:"CHST-0501", groupCd:"CUSTOM_GROUP", codeCd:"CUSTOM_03", action:"DELETE",  before:"사용중", after:"—",    changedBy:"admin",    changedAt:"2026-05-03 16:46" },
  { histId:"CHST-0500", groupCd:"CUSTOM_GROUP", codeCd:"CUSTOM_01", action:"UPDATE",  before:"구라벨", after:"사용자정의", changedBy:"admin", changedAt:"2026-05-05 14:31" },
  { histId:"CHST-0499", groupCd:"REPORT_TYPE",  codeCd:"RPT_HOUR",  action:"CREATE",  before:"—",    after:"시간보고", changedBy:"admin",   changedAt:"2026-05-02 11:21" },
  { histId:"CHST-0498", groupCd:"WO_STATUS",    codeCd:"PLANNED",   action:"ATTEMPT", before:"PLANNED","after":"LOCKED", changedBy:"operator1", changedAt:"2026-04-28 09:00" },
  { histId:"CHST-0497", groupCd:"QC_STATUS",    codeCd:"PASS",      action:"ATTEMPT", before:"PASS",  after:"REJECTED", changedBy:"operator2", changedAt:"2026-04-25 15:30" },
  { histId:"CHST-0496", groupCd:"CURRENCY",     codeCd:"KRW",       action:"ATTEMPT", before:"KRW",   after:"DELETE",   changedBy:"operator3", changedAt:"2026-04-20 11:00" },
];

export default function CodeHistoryPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="코드 변경 이력" accent="HISTORY" nodeRef="SCR-SYS-032" status="PROTOTYPE"
        description="A7 시점 스냅샷, 시스템 예약 코드 변경 거부 로그 포함 (FNC-SYS-031·034)" />
      <div className="bg-surface-container border-l-4 border-[#f59e0b] p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-[#f59e0b] mb-1">ATTEMPT — 변경 거부됨</p>
        <p className="text-sm text-on-surface-variant">시스템 예약 코드(WO_STATUS·QC_STATUS 등)에 대한 변경 시도는 거부되며 이력에 ATTEMPT로 기록됩니다.</p>
      </div>
      <DataTable title="코드 변경 이력 (append-only)" columns={COLS} data={MOCK} bufferCount={MOCK.length} />
    </div>
  );
}
