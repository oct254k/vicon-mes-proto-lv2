import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const DEPTS = [
  { code: "PRD", name: "생산", plant: "P3000/P2000/P1000", userCount: "84", matrixRow: "PRD", note: "공정 자격 연계" },
  { code: "QC",  name: "품질", plant: "P3000/P2000", userCount: "12", matrixRow: "QC", note: "—" },
  { code: "WHS", name: "창고", plant: "P3000", userCount: "8", matrixRow: "WHS", note: "LOC 도메인 연계" },
  { code: "MNT", name: "설비", plant: "P3000/P2000", userCount: "11", matrixRow: "MNT", note: "EQ 도메인 연계" },
  { code: "SHP", name: "출하", plant: "P3000", userCount: "9", matrixRow: "SHP", note: "EXTERNAL 발급 권한" },
  { code: "SLS", name: "영업", plant: "—", userCount: "6", matrixRow: "SLS", note: "수주 도메인 연계" },
  { code: "SYS", name: "시스템", plant: "—", userCount: "3", matrixRow: "SYS", note: "L4 ADMIN 전용" },
];

const COLS = [
  { key: "code", label: "부서 코드" },
  { key: "name", label: "부서명" },
  { key: "plant", label: "연관 Plant" },
  { key: "userCount", label: "사용자 수" },
  { key: "matrixRow", label: "매트릭스 행" },
  { key: "note", label: "비고" },
];

export default function DepartmentCodePage() {
  return (
    <div>
      <PageHeader title="부서 코드 마스터" accent="USR-011" nodeRef="SCR-USR-011" status="PROTOTYPE" description="PRD/QC/WHS/MNT/SHP/SLS/SYS 7종 부서 코드 및 권한 매트릭스 연계" />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 부서 코드 설명" moduleRef="FNC-USR-027/091" />
        <p className="text-xs text-on-surface/50 font-body">부서 코드는 사용자 등록 시 다중 부서 배정에 사용되며, 권한 매트릭스 열(Column) 기준이 됩니다. 코드 추가/삭제 시 매트릭스 재검토가 필요합니다.</p>
      </div>

      <DataTable title="B. 부서 코드 목록" columns={COLS} data={DEPTS} bufferCount={7} />

      <div className="flex gap-3 mt-4">
        <button className="px-5 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">부서 코드 추가</button>
        <button className="px-5 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">내보내기 (CSV)</button>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 부서 코드 삭제 시 해당 부서 사용자의 부서 재배정이 선행되어야 합니다.</p>
    </div>
  );
}
