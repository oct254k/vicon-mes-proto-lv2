import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function AuditExportPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="로그 내보내기" accent="EXPORT" nodeRef="SCR-SYS-051" status="PROTOTYPE"
        description="최대 10만 행 · 비동기 배치 · 다운로드 행위도 감사 1행 기록 (FNC-SYS-051·053·054)" />
      <div className="bg-surface-container border-l-4 border-warning p-4 mb-6">
        <p className="text-xs font-label uppercase tracking-widest text-warning mb-1">NOTICE</p>
        <p className="text-sm text-on-surface-variant">다운로드 행위 자체가 감사 로그 1행으로 기록됩니다. 10만 행 초과 시 범위를 좁혀 재요청하세요.</p>
      </div>
      <FieldHeader title="내보내기 파라미터" moduleRef="FNC-SYS-051" />
      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60">시작 일시</label>
          <input type="date" defaultValue="2026-05-01"
            className="px-3 py-2 text-sm font-label bg-surface-container border border-outline-variant/20 focus:border-[#00912F] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60">종료 일시</label>
          <input type="date" defaultValue="2026-05-06"
            className="px-3 py-2 text-sm font-label bg-surface-container border border-outline-variant/20 focus:border-[#00912F] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60">행위자 (선택)</label>
          <input type="text" placeholder="전체" className="px-3 py-2 text-sm font-label bg-surface-container border border-outline-variant/20 focus:border-[#00912F] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60">파일 형식</label>
          <select className="px-3 py-2 text-sm font-label bg-surface-container border border-outline-variant/20 focus:border-[#00912F] outline-none">
            <option>CSV</option>
            <option>XLSX</option>
            <option>JSON</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button className="px-6 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">다운로드 요청</button>
        <button className="px-6 py-2 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20">취소</button>
      </div>
      <FieldHeader title="최근 내보내기 이력" moduleRef="FNC-SYS-054" />
      <div className="bg-surface-container-lowest p-4 text-xs font-label text-on-surface-variant opacity-60">
        AUD-EXP-20260505-001 | auditor | CSV | 45,231행 | 2026-05-05 14:00:12
      </div>
    </div>
  );
}
