import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const POLICIES = [
  { category:"기준정보", schedule:"매일 02:00",    retention:"30일", rto:"4h",  rpo:"1h",  method:"FULL+INCR" },
  { category:"생산실적", schedule:"매일 02:00",    retention:"90일", rto:"2h",  rpo:"30m", method:"FULL+INCR" },
  { category:"원자재",   schedule:"매주 일 02:00", retention:"60일", rto:"8h",  rpo:"1d",  method:"FULL" },
  { category:"통계",     schedule:"매월 1일 02:00",retention:"12개월",rto:"24h",rpo:"1d",  method:"FULL" },
];

export default function BackupPolicyPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="백업 정책 설정" accent="POLICY" nodeRef="SCR-SYS-060" status="PROTOTYPE"
        description="4 DB 카테고리 × RTO/RPO 정책 — 즉시 백업 시 사유 코드 필수 (FNC-SYS-060·063·065)" />
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">정책 저장</button>
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-error/20 text-error border border-error/20">즉시 백업 (사유 코드)</button>
        <a href="/sys/backup/restore" className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">복구 워크플로</a>
        <a href="/sys/backup/migration" className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">마이그레이션</a>
      </div>
      <FieldHeader title="DB 카테고리별 백업 정책" moduleRef="FNC-SYS-060" />
      <div className="grid grid-cols-1 gap-4">
        {POLICIES.map(p => (
          <div key={p.category} className="bg-surface-container p-5 border-l-4 border-[#00912F] grid grid-cols-6 gap-4 items-center">
            <div>
              <p className="text-xs font-label text-[#00912F] uppercase tracking-widest mb-1">카테고리</p>
              <p className="font-headline font-black text-sm">{p.category}</p>
            </div>
            <div>
              <p className="text-xs font-label text-on-surface-variant opacity-50 mb-1">스케줄</p>
              <p className="text-sm">{p.schedule}</p>
            </div>
            <div>
              <p className="text-xs font-label text-on-surface-variant opacity-50 mb-1">보존 기간</p>
              <p className="text-sm">{p.retention}</p>
            </div>
            <div>
              <p className="text-xs font-label text-on-surface-variant opacity-50 mb-1">RTO</p>
              <p className="text-sm tabular-nums">{p.rto}</p>
            </div>
            <div>
              <p className="text-xs font-label text-on-surface-variant opacity-50 mb-1">RPO</p>
              <p className="text-sm tabular-nums">{p.rpo}</p>
            </div>
            <div>
              <p className="text-xs font-label text-on-surface-variant opacity-50 mb-1">방식</p>
              <p className="text-sm uppercase">{p.method}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
