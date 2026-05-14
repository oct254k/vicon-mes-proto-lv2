import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const LEAK_ITEMS = [
  { issueId: "LK-001", userId: "EMP1042", name: "김계직", issue: "위임 만료 후 WO 결재 접근 기록", detectedAt: "2026-05-06 03:00", risk: "고", status: "OPEN" },
  { issueId: "LK-002", userId: "EMP3030", name: "정출하", issue: "INACTIVE 사용자 잔여 세션 미정리", detectedAt: "2026-05-06 03:00", risk: "중", status: "RESOLVED" },
  { issueId: "LK-003", userId: "EMP2011", name: "이품질", issue: "LOCKED 상태 중 부서 접근 시도", detectedAt: "2026-05-05 03:00", risk: "고", status: "OPEN" },
];

const LEAK_COLS = [
  { key: "issueId", label: "이슈 ID" },
  { key: "userId", label: "사번" },
  { key: "name", label: "이름" },
  { key: "issue", label: "권한 누수 내용" },
  { key: "detectedAt", label: "감지 시각" },
  { key: "risk", label: "위험도" },
  { key: "status", label: "상태" },
];

const SUMMARY = [
  { label: "검사 대상 사용자", value: "137명" },
  { label: "권한-DB 정합성", value: "OK" },
  { label: "누수 의심 건", value: "2건", warn: true },
  { label: "해결 완료 건", value: "1건" },
  { label: "배치 실행 시각", value: "2026-05-06 03:00" },
];

export default function AuditLeakPage() {
  return (
    <div>
      <PageHeader title="권한 누수 정합성 보드" nodeRef="SCR-USR-081" status="PROTOTYPE" description="일 1회 배치 기반 권한-세션 정합성 검사 결과. AUDITOR·ADMIN read-only." />

      <div className="bg-surface-container-low border-l-4 border-warning p-4 mb-4">
        <FieldHeader title="A. 배치 실행 요약" moduleRef="FNC-USR-101/102" />
        <div className="flex flex-wrap gap-6">
          {SUMMARY.map((s) => (
            <div key={s.label}>
              <p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`font-bold text-lg ${s.warn ? "text-warning" : ""}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <StatusBadge type="warning" label="LEAK DETECTED" />
          <span className="text-xs font-body text-on-surface/60">누수 의심 2건 — 즉시 검토 및 조치 필요.</span>
        </div>
      </div>

      <DataTable title="B. 권한 누수 의심 목록" columns={LEAK_COLS} data={LEAK_ITEMS} bufferCount={3} />

      <div className="mt-4 bg-surface-container-low border-l-4 border-primary-accent p-4">
        <FieldHeader title="C. 처리 가이드" moduleRef="FNC-USR-101" />
        <ul className="text-xs text-on-surface/60 font-body space-y-1 leading-relaxed">
          <li>— OPEN 건: 해당 사용자 세션 강제 종료 및 권한 정합성 재검토.</li>
          <li>— 위임 만료 후 접근 기록: 위임 회수 처리 후 감사 로그 확인.</li>
          <li>— INACTIVE 사용자 잔여 세션: SLA 5분 내 세션 강제 만료 큐 재실행.</li>
        </ul>
      </div>
    </div>
  );
}
