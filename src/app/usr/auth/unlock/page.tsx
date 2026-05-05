"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const LOCKED_USERS = [
  { userId: "EMP2011", name: "이품질", dept: "QC", lockedAt: "2026-05-06 08:14", attempts: "5", reason: "PIN 5회 오류" },
  { userId: "EMP1058", name: "박작업", dept: "PRD", lockedAt: "2026-05-05 22:47", attempts: "5", reason: "PIN 5회 오류" },
];

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

export default function UnlockPage() {
  return (
    <div>
      <PageHeader title="PIN 잠금 수동 해제" accent="USR-024" nodeRef="SCR-USR-024" status="PROTOTYPE" description="PIN 5회 오류로 잠긴 사용자 수동 해제. L2+ 자기 부서원 한정." />

      <div className="bg-surface-container-low border-l-4 border-[#f59e0b] p-4 mb-4 flex items-center gap-3">
        <span className="text-[#f59e0b] font-bold text-sm font-label uppercase tracking-widest">경고</span>
        <span className="text-xs font-body text-on-surface/60">잠금 해제는 L2 이상 부서장 권한 필요. 자기 부서원만 해제 가능. 해제 사유 필수 입력.</span>
      </div>

      <div className="bg-surface-container-lowest mb-4">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-[#f59e0b]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">A. 잠금 사용자 목록 <span className="opacity-30 font-light ml-2">| {LOCKED_USERS.length}명</span></h3>
          <StatusBadge type="warning" label="LOCKED" />
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["사번", "이름", "부서", "잠금 시각", "시도 횟수", "사유", "해제"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {LOCKED_USERS.map((u, i) => (
              <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 bg-[#f59e0b]/5">
                <td className="px-4 py-2 tabular-nums text-primary-accent font-bold">{u.userId}</td>
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.dept}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{u.lockedAt}</td>
                <td className="px-4 py-2 tabular-nums text-[#f59e0b] font-bold">{u.attempts}</td>
                <td className="px-4 py-2 text-xs opacity-60">{u.reason}</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">해제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6">
        <FieldHeader title="B. 해제 사유 입력" moduleRef="FNC-USR-043/044" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>대상 사번</label><input className={INPUT} defaultValue="EMP2011" /></div>
          <div><label className={LABEL}>해제 사유</label>
            <select className={INPUT}><option>업무 긴급 필요</option><option>착오 입력 확인</option><option>기타</option></select>
          </div>
          <div className="col-span-2"><label className={LABEL}>비고</label><input className={INPUT} placeholder="추가 메모 (선택)" /></div>
        </div>
        <button className="mt-4 px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">잠금 해제 실행</button>
      </div>
    </div>
  );
}
