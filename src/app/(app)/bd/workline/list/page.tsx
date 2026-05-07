import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const WORKLINES = [
  { code: "PL-P1100-01", name: "포밍공정",          plant: "P1100", stepCount: "4", status: "운영중" },
  { code: "PL-P1100-02", name: "용접공정",          plant: "P1100", stepCount: "4", status: "운영중" },
  { code: "PL-P1200-01", name: "포밍공정",          plant: "P1200", stepCount: "4", status: "운영중" },
  { code: "PL-P1200-02", name: "용접공정",          plant: "P1200", stepCount: "4", status: "운영중" },
  { code: "PL-P2000-01", name: "절단공정",          plant: "P2000", stepCount: "2", status: "운영중" },
  { code: "PL-P2000-02", name: "조립공정",          plant: "P2000", stepCount: "3", status: "운영중" },
  { code: "PL-P2000-03", name: "용접공정",          plant: "P2000", stepCount: "2", status: "운영중" },
  { code: "PL-P2000-04", name: "포장공정",          plant: "P2000", stepCount: "1", status: "운영중" },
  { code: "PL-P3000-01", name: "신선공정",          plant: "P3000", stepCount: "4", status: "운영중" },
  { code: "PL-P3000-02", name: "TG공정",           plant: "P3000", stepCount: "4", status: "운영중" },
  { code: "PL-P3000-03", name: "포밍공정",          plant: "P3000", stepCount: "4", status: "운영중" },
  { code: "PL-P3000-04", name: "데크플레이트공정",  plant: "P3000", stepCount: "4", status: "운영중" },
];

const COLUMNS = [
  { key: "code",      label: "라인코드" },
  { key: "name",      label: "라인명" },
  { key: "plant",     label: "공장" },
  { key: "stepCount", label: "공정 수" },
  { key: "status",    label: "상태" },
];

export default function WorklineListPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공정라인 목록"
        nodeRef="SCR-BD-040"
        description="공정라인 마스터 등록·수정·다중 인스턴스 관리"
      />
      <FieldHeader title="공정라인 마스터" moduleRef="BD-WORKLINE" />
      <DataTable title="공정라인 목록" columns={COLUMNS} data={WORKLINES} bufferCount={WORKLINES.length} />
    </div>
  );
}
