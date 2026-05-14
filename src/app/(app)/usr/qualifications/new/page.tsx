"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

const OPS = ["OP-WLD-001 용접", "OP-CRN-001 크레인 조작", "OP-PRE-001 프레스", "OP-ASM-001 조립", "OP-INS-001 검사", "OP-PKG-001 포장"];

const USERS = [
  { id: "EMP1042", name: "김계직", dept: "PRD,SHP", current: ["OP-ASM-001","OP-PKG-001"] },
  { id: "EMP1058", name: "박작업", dept: "PRD", current: ["OP-ASM-001"] },
  { id: "EMP2011", name: "이품질", dept: "QC", current: ["OP-INS-001"] },
];

export default function QualificationNewPage() {
  return (
    <div>
      <PageHeader title="자격 부여" nodeRef="SCR-USR-051" status="PROTOTYPE" description="operation_code 기준 사용자×자격 매트릭스 부여. LEADER(PRD) 또는 MANAGER 전용." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="A. 자격 대상 사용자 선택" moduleRef="FNC-USR-070/073" />
        <table className="w-full text-left text-sm mb-2">
          <thead>
            <tr className="border-b border-outline">
              <th className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold pr-4">선택</th>
              <th className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold pr-4">사번</th>
              <th className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold pr-4">이름</th>
              <th className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold pr-4">부서</th>
              <th className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">현재 자격</th>
            </tr>
          </thead>
          <tbody className="font-headline">
            {USERS.map((u) => (
              <tr key={u.id} className="border-b border-outline-variant">
                <td className="py-2 pr-4"><input type="checkbox" className="accent-[#00912F]" /></td>
                <td className="py-2 pr-4 tabular-nums text-primary-accent font-bold">{u.id}</td>
                <td className="py-2 pr-4">{u.name}</td>
                <td className="py-2 pr-4 text-xs opacity-70">{u.dept}</td>
                <td className="py-2 text-xs opacity-60">{u.current.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="B. 부여할 자격" moduleRef="FNC-USR-070" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {OPS.map((op) => (
            <label key={op} className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input type="checkbox" className="accent-[#00912F]" />
              <span>{op}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>자격 유효 시작일</label><input type="date" className={INPUT} defaultValue="2026-05-06" /></div>
          <div><label className={LABEL}>자격 만료일</label><input type="date" className={INPUT} defaultValue="2027-05-06" /></div>
        </div>
        <p className="text-xs text-on-surface/40 font-body mt-2">ⓘ 만료 30일 전 자동 알림. 만료 후 해당 공정 실행 불가(우회 금지).</p>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">자격 부여 실행</button>
        <button className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">취소</button>
      </div>
    </div>
  );
}
