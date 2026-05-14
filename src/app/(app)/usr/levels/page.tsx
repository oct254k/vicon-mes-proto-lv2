import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const LEVEL_CARDS = [
  { code: "L1", name: "WORKER", desc: "현장 작업자. 자기 WO 조회·실적 입력.", color: "border-l-4 border-[#6b7280]" },
  { code: "L2", name: "STAFF", desc: "반장·조장급. 자기 부서 사용자 PIN 해제·권한 신청.", color: "border-l-4 border-[#3b82f6]" },
  { code: "L3", name: "MANAGER", desc: "팀장급. 권한 부여·위임·EXTERNAL 결재.", color: "border-l-4 border-warning" },
  { code: "L4", name: "ADMIN", desc: "시스템 관리자. 매트릭스 변경 최종 결재.", color: "border-l-4 border-primary-accent" },
  { code: "EXT", name: "EXTERNAL", desc: "외부 운전자·검수자. PDA Token 인증 전용. 메뉴 진입 불가.", color: "border-l-4 border-[#8b5cf6]" },
];

export default function LevelsPage() {
  return (
    <div>
      <PageHeader title="권한 레벨·부서 코드" accent="LEVELS" nodeRef="SCR-USR-010" status="PROTOTYPE" description="권한 레벨(L1~L4 + EXTERNAL) 및 부서 코드 마스터 관리" />

      <FieldHeader title="A. 권한 레벨 개요" moduleRef="FNC-USR-020~025" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {LEVEL_CARDS.map((lv) => (
          <div key={lv.code} className={`bg-surface-container-low p-5 ${lv.color}`}>
            <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">{lv.code}</p>
            <p className="font-headline font-bold text-sm mb-1">{lv.name}</p>
            <p className="text-xs text-on-surface/50 leading-relaxed">{lv.desc}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="B. 부서 코드 개요" moduleRef="FNC-USR-027" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {["PRD — 생산","QC — 품질","WHS — 창고","MNT — 설비","SHP — 출하","SLS — 영업","SYS — 시스템"].map((d) => {
          const [code, label] = d.split(" — ");
          return (
            <div key={code} className="bg-surface-container-low p-4 border-l-2 border-outline-variant/30">
              <p className="font-headline font-bold text-sm text-primary-accent">{code}</p>
              <p className="text-xs text-on-surface/50 mt-1">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <a href="/usr/levels/permission-level" className="px-5 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">레벨 마스터 관리</a>
        <a href="/usr/levels/department-code" className="px-5 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">부서 코드 관리</a>
      </div>
    </div>
  );
}
