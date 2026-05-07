import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const LEVELS = [
  { code: "L1", name: "WORKER", maxScope: "자기 WO", menuCount: "12", canDelegate: "X", canApprove: "X", authMethods: "PIN/RFID/FINGERPRINT" },
  { code: "L2", name: "STAFF", maxScope: "자기 부서", menuCount: "23", canDelegate: "O", canApprove: "X", authMethods: "PIN/RFID/FINGERPRINT" },
  { code: "L3", name: "MANAGER", maxScope: "전 부서", menuCount: "41", canDelegate: "O", canApprove: "O", authMethods: "PIN/RFID" },
  { code: "L4", name: "ADMIN", maxScope: "시스템 전체", menuCount: "ALL", canDelegate: "O", canApprove: "O (최종)", authMethods: "PIN" },
  { code: "EXTERNAL", name: "EXTERNAL", maxScope: "SHP 한정", menuCount: "0", canDelegate: "X", canApprove: "X", authMethods: "TOKEN" },
];

const COLS = [
  { key: "code", label: "레벨 코드" },
  { key: "name", label: "명칭" },
  { key: "maxScope", label: "최대 접근 범위" },
  { key: "menuCount", label: "메뉴 수" },
  { key: "canDelegate", label: "위임 가능" },
  { key: "canApprove", label: "결재 가능" },
  { key: "authMethods", label: "허용 인증수단" },
];

export default function PermissionLevelPage() {
  return (
    <div>
      <PageHeader title="권한 레벨 마스터" accent="USR-010" nodeRef="SCR-USR-010" status="PROTOTYPE" description="L1~L4 + EXTERNAL 레벨 enum 코드 마스터. 변경 시 L4 결재 필요." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 레벨 정의" moduleRef="FNC-USR-020~025" />
        <p className="text-xs text-on-surface/50 font-body">권한 레벨은 시스템 전반의 RBAC 기반 접근 제어에 사용됩니다. EXTERNAL은 메뉴 진입 불가, PDA Token 인증 전용입니다.</p>
      </div>

      <DataTable title="B. 레벨 마스터 목록" columns={COLS} data={LEVELS} bufferCount={5} />

      <div className="flex gap-3 mt-4">
        <button className="px-5 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest opacity-50 cursor-not-allowed">레벨 추가 (L4 결재)</button>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 레벨 코드·범위 변경 시 매트릭스 영향 평가(SCR-USR-072) 선행 필요.</p>
    </div>
  );
}
