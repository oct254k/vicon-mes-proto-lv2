"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key: "id",      label: "공지 ID" },
  { key: "title",   label: "제목" },
  { key: "priority",label: "우선순위" },
  { key: "read",    label: "읽음" },
  { key: "pubAt",   label: "게시일" },
];

const MOCK = [
  { id:"NTC-2026-042", title:"P2000 긴급 설비 중단", priority:"URGENT", read:"미읽음", pubAt:"2026-05-04" },
  { id:"NTC-2026-041", title:"5월 정기 점검 공지",   priority:"NORMAL", read:"읽음",   pubAt:"2026-05-01" },
  { id:"NTC-2026-039", title:"라이선스 만료 예고",    priority:"HIGH",   read:"읽음",   pubAt:"2026-04-28" },
  { id:"NTC-2026-038", title:"보안 패치 적용 안내",   priority:"HIGH",   read:"읽음",   pubAt:"2026-03-15" },
  { id:"NTC-2026-035", title:"2월 MES 업데이트 안내", priority:"NORMAL", read:"읽음",   pubAt:"2026-02-20" },
];

export default function NoticeInboxPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="공지 수신함" accent="INBOX" nodeRef="SCR-SYS-014" status="PROTOTYPE"
        description="로그인 사용자 공지 수신함 — PC 헤더 위젯 + 모바일 진입 (FNC-SYS-012·013·016)" />
      <div className="bg-surface-container border-l-4 border-error p-4 mb-6 flex items-start gap-3">
        <span className="text-error font-label text-xs uppercase tracking-widest">URGENT</span>
        <p className="text-sm font-headline">P2000 긴급 설비 중단 — 즉시 확인 필요 (NTC-2026-042)</p>
      </div>
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">전체 읽음 처리</button>
      </div>
      <DataTable title="수신 공지 목록" columns={COLS} data={MOCK} bufferCount={MOCK.length} />
    </div>
  );
}
