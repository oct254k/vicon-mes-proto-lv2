"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"groupCd",  label:"코드 그룹" },
  { key:"codeCd",   label:"코드값" },
  { key:"labelKo",  label:"한국어 라벨" },
  { key:"labelEn",  label:"English" },
  { key:"category", label:"DB 카테고리" },
  { key:"reserved", label:"예약" },
  { key:"sort",     label:"정렬" },
];

const MOCK = [
  { groupCd:"WO_STATUS",    codeCd:"PLANNED",    labelKo:"계획",      labelEn:"Planned",    category:"생산실적", reserved:"🔒 SYS", sort:10 },
  { groupCd:"WO_STATUS",    codeCd:"RELEASED",   labelKo:"릴리즈",    labelEn:"Released",   category:"생산실적", reserved:"🔒 SYS", sort:20 },
  { groupCd:"QC_STATUS",    codeCd:"PASS",        labelKo:"합격",      labelEn:"Pass",       category:"기준정보", reserved:"🔒 SYS", sort:10 },
  { groupCd:"DEVICE_TYPE",  codeCd:"BARCODE",    labelKo:"바코드",    labelEn:"Barcode",    category:"기준정보", reserved:"🔒 SYS", sort:10 },
  { groupCd:"SHIFT",        codeCd:"DAY",        labelKo:"주간",      labelEn:"Day",        category:"기준정보", reserved:"🔒 SYS", sort:10 },
  { groupCd:"UNIT",         codeCd:"EA",         labelKo:"개",        labelEn:"EA",         category:"원자재",   reserved:"🔒 SYS", sort:10 },
  { groupCd:"CURRENCY",     codeCd:"KRW",        labelKo:"원",        labelEn:"KRW",        category:"기준정보", reserved:"🔒 SYS", sort:10 },
  { groupCd:"CUSTOM_GROUP", codeCd:"CUSTOM_01",  labelKo:"사용자정의", labelEn:"Custom 01", category:"통계",     reserved:"—",      sort:10 },
];

export default function CodeListPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="코드 목록" accent="LIST" nodeRef="SCR-SYS-030" status="PROTOTYPE"
        description="공통 코드 마스터 — 4 DB 카테고리 필터, 시스템 예약 잠금 표시 (FNC-SYS-030·031·033)" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {["전체","기준정보","생산실적","원자재","통계"].map(f => (
          <button key={f} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">{f}</button>
        ))}
        <button className="ml-auto px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ 코드 등록</button>
        <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20">내보내기</button>
      </div>
      <DataTable title="코드 목록" columns={COLS} data={MOCK} bufferCount={MOCK.length} />
    </div>
  );
}
