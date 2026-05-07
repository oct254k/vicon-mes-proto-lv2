import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const roleLevels = [
  { level: "L1", code: "WORKER", color: "text-white/60", desc: "현장 작업자 — 자신에게 배정된 작업 조회 및 실적 입력만 가능" },
  { level: "L2", code: "SUPERVISOR", color: "text-[#00912F]", desc: "현장 감독자 — 팀 내 작업 배정·조회, 품질 검사 기록" },
  { level: "L3", code: "MANAGER", color: "text-[#f59e0b]", desc: "부서장 — 부서 데이터 전체 조회, 계획 승인, 보고서 출력" },
  { level: "L4", code: "ADMIN", color: "text-[#ef4444]", desc: "시스템 관리자 — 마스터 데이터 편집, 권한 관리, 로그 조회" },
  { level: "EXT", code: "EXTERNAL", color: "text-white/40", desc: "외부 연계 토큰 — API 전용 접근, UI 로그인 불가" },
];

const deptColumns = [
  { key: "code", label: "부서 코드" },
  { key: "name", label: "부서명" },
  { key: "domain", label: "주 도메인" },
];

const deptData = [
  { code: "PRD", name: "생산부", domain: "MFG / WO" },
  { code: "QC", name: "품질관리부", domain: "QC" },
  { code: "WHS", name: "물류창고부", domain: "LOC / SHP" },
  { code: "MNT", name: "설비관리부", domain: "EQ" },
  { code: "SHP", name: "출하부", domain: "SHP" },
  { code: "SLS", name: "영업부", domain: "SP" },
  { code: "SYS", name: "시스템팀", domain: "SYS / USR" },
];

export default function USRRolesPage() {
  return (
    <div>
      <PageHeader
        title="권한·부서 마스터"
        accent="ROLES"
        nodeRef="SCR-USR-020"
        status="PROTOTYPE"
        description="권한 레벨 정의 및 부서 코드 마스터 조회."
      />

      <FieldHeader title="권한 레벨" moduleRef="SCR-USR-020" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {roleLevels.map((r) => (
          <div key={r.level} className="bg-[#1a1a1a] border-l-4 border-white/10 p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-xs font-label uppercase tracking-widest text-white/30">{r.level}</span>
              <span className={`font-headline font-black text-sm uppercase ${r.color}`}>{r.code}</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="부서 코드" moduleRef="SCR-USR-020" />
      <DataTable
        title="부서 마스터"
        columns={deptColumns}
        data={deptData}
        bufferCount={deptData.length}
      />
    </div>
  );
}
