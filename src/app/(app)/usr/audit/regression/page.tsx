import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const TEST_CASES = [
  { caseId: "RT-001", name: "L1 사용자 생산 등록 차단", scenario: "L1 / PRD / CREATE 시도", expected: "DENY", actual: "DENY", status: "running" as const, lastRun: "2026-05-06 10:00" },
  { caseId: "RT-002", name: "L2 창고 삭제 신규 허용", scenario: "L2 / WHS / DELETE 시도", expected: "ALLOW (변경 후)", actual: "ALLOW", status: "running" as const, lastRun: "2026-05-06 10:00" },
  { caseId: "RT-003", name: "EXTERNAL 메뉴 접근 차단", scenario: "EXT / SYS / LIST 시도", expected: "DENY", actual: "DENY", status: "running" as const, lastRun: "2026-05-06 10:00" },
  { caseId: "RT-004", name: "L4 전 영역 결재 가능", scenario: "L4 / QC / APPROVE 시도", expected: "ALLOW", actual: "ALLOW", status: "running" as const, lastRun: "2026-05-06 10:00" },
  { caseId: "RT-005", name: "위임 만료 후 권한 제거", scenario: "위임 EXPIRED 후 WO 결재 시도", expected: "DENY", actual: "ALLOW", status: "error" as const, lastRun: "2026-05-06 10:00" },
  { caseId: "RT-006", name: "PIN 잠금 사용자 로그인 차단", scenario: "LOCKED 사용자 PIN 로그인", expected: "DENY", actual: "DENY", status: "running" as const, lastRun: "2026-05-06 10:00" },
];

export default function AuditRegressionPage() {
  return (
    <div>
      <PageHeader title="회귀 테스트 결과" nodeRef="SCR-USR-082" status="PROTOTYPE" description="매트릭스 변경 전후 권한 시나리오 회귀 테스트 결과. 실패 건 존재 시 L4 결재 gating." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 실행 요약" moduleRef="FNC-USR-103" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-body">
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">전체 케이스</p><p className="font-bold text-2xl">6<span className="text-sm font-normal opacity-50 ml-1">건</span></p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">통과</p><p className="text-primary-accent font-bold text-2xl">5<span className="text-sm font-normal opacity-50 ml-1">건</span></p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">실패</p><p className="text-error font-bold text-2xl">1<span className="text-sm font-normal opacity-50 ml-1">건</span></p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">결재 gating</p><p className="text-error font-bold">BLOCKED</p></div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <StatusBadge type="error" label="1건 실패" />
          <span className="text-xs font-body text-on-surface/60">RT-005 실패 — L4 결재 신청 불가. 실패 원인 수정 후 재실행 필요.</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 케이스별 결과</h3>
          <div className="flex gap-3 items-center">
            <span className="text-xs font-label opacity-40">FNC-USR-103</span>
            <button className="text-xs font-label text-primary-accent uppercase tracking-widest hover:underline">재실행</button>
          </div>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["케이스 ID", "테스트명", "시나리오", "예상 결과", "실제 결과", "통과/실패", "최근 실행"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {TEST_CASES.map((t, i) => (
              <tr key={i} className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 ${t.status === "error" ? "bg-error/5" : ""}`}>
                <td className="px-4 py-2 tabular-nums text-xs font-bold">{t.caseId}</td>
                <td className="px-4 py-2 text-xs">{t.name}</td>
                <td className="px-4 py-2 text-xs opacity-60">{t.scenario}</td>
                <td className="px-4 py-2 text-xs">{t.expected}</td>
                <td className={`px-4 py-2 text-xs font-bold ${t.status === "error" ? "text-error" : "text-primary-accent"}`}>{t.actual}</td>
                <td className="px-4 py-2"><StatusBadge type={t.status} label={t.status === "running" ? "PASS" : "FAIL"} /></td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-60">{t.lastRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 실패 케이스 수정 후 재실행 → 전체 통과 시 L4 결재 잠금 해제.</p>
    </div>
  );
}
