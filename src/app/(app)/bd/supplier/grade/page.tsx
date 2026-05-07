import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const GRADES = [
  { code: "SUP-001", name: "현대제철",     delivery: "95",  quality: "97", price: "88", total: "93.4", grade: "A", eval: "2026-04-30" },
  { code: "SUP-002", name: "포스코",       delivery: "98",  quality: "96", price: "92", total: "95.6", grade: "A", eval: "2026-04-30" },
  { code: "SUP-003", name: "동국제강",     delivery: "88",  quality: "91", price: "85", total: "88.2", grade: "B", eval: "2026-04-30" },
  { code: "SUP-004", name: "세아제강",     delivery: "82",  quality: "89", price: "90", total: "87.0", grade: "B", eval: "2026-04-30" },
  { code: "SUP-005", name: "케이에스텍",   delivery: "75",  quality: "80", price: "95", total: "82.5", grade: "C", eval: "2026-04-30" },
  { code: "SUP-007", name: "Nippon Steel", delivery: "97",  quality: "99", price: "70", total: "90.2", grade: "A", eval: "2026-04-30" },
];

const COLUMNS = [
  { key: "code",     label: "코드" },
  { key: "name",     label: "공급사명" },
  { key: "delivery", label: "납기 점수" },
  { key: "quality",  label: "품질 점수" },
  { key: "price",    label: "가격 점수" },
  { key: "total",    label: "종합 점수" },
  { key: "grade",    label: "등급" },
  { key: "eval",     label: "평가일" },
];

export default function SupplierGradePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공급사 등급 평가"
        nodeRef="SCR-BD-072"
        description="납기·품질·가격 가중 점수 자동 집계 결과 대시보드"
      />
      <FieldHeader title="등급 평가 결과" moduleRef="BD-SUPPLIER-GRADE" />
      <div className="grid grid-cols-3 gap-3 mb-6">
        {["A등급 3개", "B등급 2개", "C등급 1개"].map((label, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant/20 p-4">
            <span className="text-xs font-label uppercase tracking-widest text-on-surface/40">{label}</span>
          </div>
        ))}
      </div>
      <DataTable title="공급사 등급 결과" columns={COLUMNS} data={GRADES} bufferCount={GRADES.length} />
    </div>
  );
}
