"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key:"order",  label:"순서" },
  { key:"menuId", label:"메뉴 ID" },
  { key:"label",  label:"메뉴명" },
  { key:"device", label:"단말" },
  { key:"pinned", label:"고정" },
];

const MOCK = [
  { order:1,  menuId:"MNU-011", label:"공지 목록",     device:"PC",   pinned:"예" },
  { order:2,  menuId:"MNU-031", label:"코드 목록",     device:"PC",   pinned:"예" },
  { order:3,  menuId:"MNU-090", label:"헬스 대시보드", device:"PC",   pinned:"아니오" },
  { order:4,  menuId:"MNU-060", label:"백업 정책",     device:"PC",   pinned:"아니오" },
  { order:5,  menuId:"MNU-050", label:"감사 로그",     device:"PC",   pinned:"아니오" },
  { order:6,  menuId:"MNU-012", label:"공지 수신함",   device:"MOBILE",pinned:"예" },
];

export default function MenuFavoritePage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="즐겨찾기 관리" accent="즐겨찾기" nodeRef="SCR-SYS-022" status="PROTOTYPE"
        description="사용자 즐겨찾기 ≤20건, PC↔MOBILE 동기화 (FNC-SYS-023·024)" />
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-label text-on-surface-variant opacity-60">현재 {MOCK.length} / 20 항목</p>
        <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">저장</button>
      </div>
      <DataTable title="즐겨찾기 목록" columns={COLS} data={MOCK} bufferCount={MOCK.length} />
      <p className="mt-4 text-xs text-on-surface-variant opacity-50 font-label">드래그&드롭으로 순서 변경 (프로토타입에서는 정렬 미구현)</p>
    </div>
  );
}
