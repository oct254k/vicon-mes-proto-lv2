import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const PRICES = [
  { supplier: "현대제철",     material: "M-COIL-A",      uom: "m",  unitPrice: "4,200",  currency: "KRW", validFrom: "2026-01-01", validTo: "2026-12-31", status: "Active" },
  { supplier: "포스코",       material: "M-COIL-A",      uom: "m",  unitPrice: "4,050",  currency: "KRW", validFrom: "2026-01-01", validTo: "2026-12-31", status: "Active" },
  { supplier: "현대제철",     material: "M-PLATE-SS400", uom: "ea", unitPrice: "38,000", currency: "KRW", validFrom: "2026-01-01", validTo: "2026-12-31", status: "Active" },
  { supplier: "동국제강",     material: "M-WIRE-12",     uom: "kg", unitPrice: "1,850",  currency: "KRW", validFrom: "2026-02-01", validTo: "2026-12-31", status: "Active" },
  { supplier: "포스코",       material: "M-COIL-HDG",    uom: "m",  unitPrice: "5,600",  currency: "KRW", validFrom: "2026-01-01", validTo: "2026-06-30", status: "Active" },
  { supplier: "Nippon Steel", material: "M-COIL-C",      uom: "m",  unitPrice: "6,100",  currency: "KRW", validFrom: "2026-03-01", validTo: "2026-12-31", status: "Active" },
  { supplier: "케이에스텍",   material: "M-BOLT-M16",    uom: "ea", unitPrice: "320",    currency: "KRW", validFrom: "2026-01-01", validTo: "2026-12-31", status: "Active" },
];

const COLUMNS = [
  { key: "supplier",   label: "공급사" },
  { key: "material",   label: "자재 코드" },
  { key: "uom",        label: "단위" },
  { key: "unitPrice",  label: "단가 (원)" },
  { key: "currency",   label: "통화" },
  { key: "validFrom",  label: "적용 시작" },
  { key: "validTo",    label: "적용 종료" },
  { key: "status",     label: "상태" },
];

export default function SupplierPricePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="공급사 단가표"
        nodeRef="SCR-BD-071"
        description="공급사 × 자재 단가 매트릭스 등록 및 유효기간 관리"
      />
      <FieldHeader title="단가 매트릭스" moduleRef="BD-SUPPLIER-PRICE" />
      <DataTable title="공급사 × 자재 단가" columns={COLUMNS} data={PRICES} bufferCount={PRICES.length} />
    </div>
  );
}
