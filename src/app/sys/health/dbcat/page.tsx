import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const DBCATS = [
  { cat:"기준정보", tables:"12개", rows:"124,502",    sizeGb:"1.2 GB", backupPolicy:"매일 FULL+INCR", retentionDays:30,  rto:"4h",  rpo:"1h",  state:"running" as const },
  { cat:"생산실적", tables:"24개", rows:"3,201,400",  sizeGb:"8.4 GB", backupPolicy:"매일 FULL+INCR", retentionDays:90,  rto:"2h",  rpo:"30m", state:"running" as const },
  { cat:"원자재",   tables:"8개",  rows:"84,100",     sizeGb:"0.6 GB", backupPolicy:"매주 FULL",      retentionDays:60,  rto:"8h",  rpo:"1d",  state:"running" as const },
  { cat:"통계",     tables:"6개",  rows:"510,800",    sizeGb:"2.1 GB", backupPolicy:"매월 FULL",      retentionDays:365, rto:"24h", rpo:"1d",  state:"warning" as const },
];

export default function HealthDbcatPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="DB 카테고리 현황" accent="DBCAT" nodeRef="SCR-SYS-091" status="PROTOTYPE"
        description="4 DB 카테고리 정의·차등 정책·통계 재집계·미분류 검출 (FNC-SYS-091~095)" />
      <div className="bg-surface-container border-l-4 border-[#f59e0b] p-4 mb-6 flex items-center gap-4">
        <StatusBadge type="warning" label="WARN" />
        <p className="text-sm text-on-surface-variant">통계 카테고리 재집계 지연 — 마지막 성공 2026-05-05 00:00</p>
      </div>
      <FieldHeader title="4 DB 카테고리" moduleRef="FNC-SYS-091" />
      <div className="grid grid-cols-1 gap-4">
        {DBCATS.map(c => (
          <div key={c.cat} className={`bg-surface-container p-5 border-l-4 ${c.state === "running" ? "border-[#00912F]" : "border-[#f59e0b]"}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-headline font-black text-base">{c.cat}</p>
                <p className="text-xs text-on-surface-variant opacity-60">{c.tables} / {c.rows}행 / {c.sizeGb}</p>
              </div>
              <StatusBadge type={c.state} label={c.state === "running" ? "OK" : "WARN"} />
            </div>
            <div className="grid grid-cols-4 gap-4 text-xs">
              <div><p className="font-label opacity-50 mb-1">백업 정책</p><p>{c.backupPolicy}</p></div>
              <div><p className="font-label opacity-50 mb-1">보존 기간</p><p>{c.retentionDays}일</p></div>
              <div><p className="font-label opacity-50 mb-1">RTO</p><p className="tabular-nums">{c.rto}</p></div>
              <div><p className="font-label opacity-50 mb-1">RPO</p><p className="tabular-nums">{c.rpo}</p></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">통계 재집계 트리거</button>
        <button className="ml-3 px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">미분류 테이블 검출</button>
      </div>
    </div>
  );
}
