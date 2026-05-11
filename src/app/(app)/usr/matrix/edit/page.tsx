"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const LEVELS = ["L1", "L2", "L3", "L4", "EXT"];
const DEPTS = ["PRD", "QC", "WHS", "MNT", "SHP", "SLS", "SYS"];
const ACTIONS = ["LIST", "VIEW", "CREATE", "EDIT", "DELETE", "APPROVE", "EXPORT"];

// Original values: R=read, W=write, A=approve, -=none
const BASE: Record<string, Record<string, Record<string, string>>> = {
  L1: { PRD: { LIST:"R",VIEW:"R",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, QC: { LIST:"R",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, WHS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, MNT: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SHP: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SLS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SYS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" } },
  L2: { PRD: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"-",APPROVE:"-",EXPORT:"R" }, QC: { LIST:"R",VIEW:"R",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, WHS: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"-",APPROVE:"-",EXPORT:"-" }, MNT: { LIST:"R",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SHP: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"-",APPROVE:"-",EXPORT:"R" }, SLS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SYS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" } },
  L3: { PRD: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, QC: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"-",APPROVE:"A",EXPORT:"R" }, WHS: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, MNT: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"-",APPROVE:"A",EXPORT:"R" }, SHP: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, SLS: { LIST:"R",VIEW:"R",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SYS: { LIST:"R",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" } },
  L4: { PRD: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, QC: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, WHS: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, MNT: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, SHP: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, SLS: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" }, SYS: { LIST:"R",VIEW:"R",CREATE:"W",EDIT:"W",DELETE:"W",APPROVE:"A",EXPORT:"R" } },
  EXT: { PRD: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, QC: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, WHS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, MNT: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SHP: { LIST:"R",VIEW:"R",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SLS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" }, SYS: { LIST:"-",VIEW:"-",CREATE:"-",EDIT:"-",DELETE:"-",APPROVE:"-",EXPORT:"-" } },
};

const CELL_CLR: Record<string, string> = { R: "text-[#3b82f6]", W: "text-[#f59e0b]", A: "text-primary-accent font-bold", "-": "text-on-surface/20" };

export default function MatrixEditPage() {
  return (
    <div>
      <PageHeader title="권한 매트릭스 편집" accent="USR-071" nodeRef="SCR-USR-071" status="PROTOTYPE" description="(Level × 부서) × 액션 매트릭스 셀 편집 및 diff 표시. ADMIN 전용. 변경 후 L4 결재 필요." />

      <div className="bg-surface-container-low border-l-4 border-[#f59e0b] p-4 mb-4 flex items-center gap-3">
        <span className="text-[#f59e0b] font-bold text-sm font-label uppercase tracking-widest">주의</span>
        <span className="text-xs font-body text-on-surface/60">매트릭스 변경은 영향 평가 후 L4 결재 완료 시 발효. 회귀 테스트 0건 gating.</span>
      </div>

      <div className="flex gap-3 mb-4">
        <FieldHeader title="범례" moduleRef="R=read W=write A=approve -=none" />
        <div className="flex gap-4 text-xs font-body ml-auto items-center">
          <span className="text-[#3b82f6] font-bold">R 읽기</span>
          <span className="text-[#f59e0b] font-bold">W 쓰기</span>
          <span className="text-primary-accent font-bold">A 결재</span>
          <span className="text-on-surface/20">- 없음</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="text-left border-collapse text-xs font-headline whitespace-nowrap">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              <th className="px-3 py-2 font-label uppercase tracking-widest opacity-50 sticky left-0 bg-surface-container min-w-[60px]">레벨</th>
              <th className="px-3 py-2 font-label uppercase tracking-widest opacity-50 sticky left-[60px] bg-surface-container min-w-[60px]">부서</th>
              {ACTIONS.map((a) => (
                <th key={a} className="px-3 py-2 font-label uppercase tracking-widest opacity-50 text-center min-w-[60px]">{a}</th>
              ))}
              <th className="px-3 py-2 font-label uppercase tracking-widest opacity-50">편집</th>
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((lv) =>
              DEPTS.map((dept, di) => (
                <tr key={`${lv}-${dept}`} className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 ${di === 0 ? "border-t border-outline-variant/20" : ""}`}>
                  {di === 0 && <td className="px-3 py-2 font-bold text-primary-accent sticky left-0 bg-surface-container-lowest" rowSpan={DEPTS.length}>{lv}</td>}
                  <td className="px-3 py-2 opacity-60 sticky left-[60px] bg-surface-container-lowest">{dept}</td>
                  {ACTIONS.map((a) => {
                    const val = BASE[lv]?.[dept]?.[a] ?? "-";
                    return (
                      <td key={a} className={`px-3 py-2 text-center tabular-nums ${CELL_CLR[val]}`}>{val}</td>
                    );
                  })}
                  <td className="px-3 py-2">
                    <button className="text-xs text-primary-accent font-label uppercase tracking-widest hover:underline">편집</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-4">
        <a href="/usr/matrix/impact" className="px-5 py-2 bg-[#f59e0b] text-black text-xs font-label uppercase tracking-widest font-bold">영향 평가 실행</a>
        <a href="/usr/matrix/approval" className="px-5 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">L4 결재 신청</a>
      </div>
    </div>
  );
}
