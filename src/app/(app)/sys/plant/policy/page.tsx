"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key:"plantId",   label:"Plant ID" },
  { key:"plantName", label:"공장명" },
  { key:"timezone",  label:"Timezone" },
  { key:"currency",  label:"통화" },
  { key:"language",  label:"언어" },
  { key:"shift",     label:"교대 유형" },
  { key:"rfid",      label:"RFID 사용" },
  { key:"fifo",      label:"FIFO 강제" },
  { key:"closingDay",label:"일자 마감" },
];

const MOCK = [
  { plantId:"P1000", plantName:"울산 1공장",   timezone:"Asia/Seoul",     currency:"KRW", language:"ko", shift:"3SHIFT",  rfid:"Y", fifo:"Y", closingDay:"말일" },
  { plantId:"P2000", plantName:"창원 2공장",   timezone:"Asia/Seoul",     currency:"KRW", language:"ko", shift:"2SHIFT",  rfid:"Y", fifo:"N", closingDay:"말일" },
  { plantId:"P3000", plantName:"베트남 법인",  timezone:"Asia/Ho_Chi_Minh",currency:"VND", language:"vi", shift:"1SHIFT",  rfid:"N", fifo:"Y", closingDay:"25일" },
];

export default function PlantPolicyPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="Plant 정책 설정" accent="POLICY" nodeRef="SCR-SYS-080" status="PROTOTYPE"
        description="Plant별 Timezone·통화·언어·교대·RFID·FIFO 플래그 — 변경 시 사유 코드 필수 (FNC-SYS-080~083)" />
      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">정책 저장 (사유 코드)</button>
        <span className="self-center text-xs text-on-surface-variant opacity-50 font-label">P1000 / P2000 / P3000</span>
      </div>
      <DataTable title="Plant 정책 목록" columns={COLS} data={MOCK} bufferCount={MOCK.length} />
      <div className="mt-6 bg-surface-container-lowest border-l-4 border-outline-variant/20 p-5">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">플래그 설명</p>
        <ul className="text-xs text-on-surface-variant space-y-1">
          <li><span className="text-[#00912F]">rfid_enabled</span> — RFID 단말 페어링 사용 여부</li>
          <li><span className="text-[#00912F]">fifo_strict</span> — 원자재 선입선출 강제 여부</li>
          <li><span className="text-[#00912F]">closing_day</span> — 재고·생산 일자 마감 기준일</li>
        </ul>
      </div>
    </div>
  );
}
