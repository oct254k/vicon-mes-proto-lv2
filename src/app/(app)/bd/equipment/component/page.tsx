import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const COMPONENTS = [
  { code: "CMP-001", name: "롤러 베어링 #6205",  equipment: "EQP-P1-001", usageUnit: "500h",  replaceReason: "마모",       lastReplace: "2026-02-10", nextReplace: "2026-08-10" },
  { code: "CMP-002", name: "유압 실린더 씰 키트", equipment: "EQP-P1-002", usageUnit: "1,000h", replaceReason: "노후화",     lastReplace: "2025-11-20", nextReplace: "2026-05-20" },
  { code: "CMP-003", name: "용접 토치 팁",        equipment: "EQP-P1-003", usageUnit: "200h",  replaceReason: "소모성 부품", lastReplace: "2026-04-01", nextReplace: "2026-06-01" },
  { code: "CMP-004", name: "벤딩 다이 V-홈 150",  equipment: "EQP-P2-001", usageUnit: "3,000h", replaceReason: "마모",       lastReplace: "2024-08-15", nextReplace: "2027-02-15" },
  { code: "CMP-005", name: "플라즈마 노즐 A40",   equipment: "EQP-P2-002", usageUnit: "80h",   replaceReason: "소모성 부품", lastReplace: "2026-04-20", nextReplace: "2026-06-20" },
  { code: "CMP-006", name: "와이어 로프 30T",      equipment: "EQP-P3-001", usageUnit: "12mo",  replaceReason: "안전 기준",   lastReplace: "2025-09-01", nextReplace: "2026-09-01" },
];

const COLUMNS = [
  { key: "code",          label: "부품 코드" },
  { key: "name",          label: "부품명" },
  { key: "equipment",     label: "설비 코드" },
  { key: "usageUnit",     label: "교체 주기" },
  { key: "replaceReason", label: "교체 사유" },
  { key: "lastReplace",   label: "최근 교체일" },
  { key: "nextReplace",   label: "차기 교체일" },
];

export default function EquipmentComponentPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="컴포넌트 마스터"
        nodeRef="SCR-BD-081"
        description="설비별 부품(Component) 교체 주기·사유 등록 및 차기 교체일 관리"
      />
      <FieldHeader title="Component 마스터" moduleRef="BD-EQUIPMENT-COMPONENT" />
      <DataTable title="Component 목록" columns={COLUMNS} data={COMPONENTS} bufferCount={COMPONENTS.length} />
    </div>
  );
}
