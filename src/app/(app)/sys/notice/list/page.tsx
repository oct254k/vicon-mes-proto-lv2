"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "id",      label: "공지 ID" },
  { key: "title",   label: "제목" },
  { key: "target",  label: "대상" },
  { key: "status",  label: "상태" },
  { key: "priority",label: "우선순위" },
  { key: "author",  label: "작성자" },
  { key: "pubAt",   label: "게시일" },
];

const STATUS_MAP: Record<string, { type: "running"|"idle"|"warning"|"error"; label: string }> = {
  PUBLISHED: { type: "running", label: "게시됨" },
  DRAFT:     { type: "idle",    label: "초안" },
  EXPIRED:   { type: "warning", label: "만료" },
};

const RAW = [
  { id:"NTC-2026-041", title:"5월 정기 점검 공지", target:"전사",   statusKey:"PUBLISHED", priority:"NORMAL",  author:"admin",   pubAt:"2026-05-01" },
  { id:"NTC-2026-042", title:"P2000 긴급 설비 중단", target:"P2000", statusKey:"PUBLISHED", priority:"URGENT",  author:"sysop",   pubAt:"2026-05-04" },
  { id:"NTC-2026-043", title:"코드 마스터 변경 안내", target:"전사", statusKey:"DRAFT",     priority:"NORMAL",  author:"admin",   pubAt:"—" },
  { id:"NTC-2026-040", title:"1분기 감사 결과 공유",  target:"전사", statusKey:"EXPIRED",   priority:"NORMAL",  author:"auditor", pubAt:"2026-04-01" },
  { id:"NTC-2026-039", title:"라이선스 만료 예고",    target:"역할:ADMIN", statusKey:"PUBLISHED", priority:"HIGH", author:"admin", pubAt:"2026-04-28" },
  { id:"NTC-2026-038", title:"보안 패치 적용 안내",   target:"전사", statusKey:"EXPIRED",   priority:"HIGH",    author:"sysop",   pubAt:"2026-03-15" },
];

export default function NoticeListPage() {
  const data = RAW.map(r => ({
    ...r,
    status: <StatusBadge type={STATUS_MAP[r.statusKey].type} label={STATUS_MAP[r.statusKey].label} /> as unknown as string,
  }));
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="공지 목록" accent="LIST" nodeRef="SCR-SYS-010" status="PROTOTYPE"
        description="DRAFT / PUBLISHED / EXPIRED 상태 필터, 긴급 배지 표시" />
      <div className="flex gap-2 mb-4">
        {["전체","초안","게시됨","만료"].map(f => (
          <button key={f} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">
            {f}
          </button>
        ))}
        <button className="ml-auto px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">
          + 공지 등록
        </button>
      </div>
      <DataTable title="공지 목록" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={RAW.length} />
    </div>
  );
}
