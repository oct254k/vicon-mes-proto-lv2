import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const TODAY = new Date("2026-05-06");
function dday(expiry: string) {
  const diff = Math.ceil((new Date(expiry).getTime() - TODAY.getTime()) / 86400000);
  return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
}

const CERTS_RAW = [
  { certNo: "KS-D-0001-2024", name: "각형 강관 KS",      scope: "KS D 3568",  issueDate: "2024-06-01", expiryDate: "2027-05-31", agency: "한국표준협회", status: "유효" },
  { certNo: "KS-D-0002-2024", name: "원형 강관 KS",      scope: "KS D 3566",  issueDate: "2024-06-01", expiryDate: "2027-05-31", agency: "한국표준협회", status: "유효" },
  { certNo: "KS-D-0003-2023", name: "일반 구조용 강관 KS", scope: "KS D 3507", issueDate: "2023-08-15", expiryDate: "2026-08-14", agency: "한국산업기술원", status: "유효" },
  { certNo: "KS-B-0021-2022", name: "볼트·너트 KS",      scope: "KS B 1002",  issueDate: "2022-03-10", expiryDate: "2026-05-20", agency: "한국산업기술원", status: "유효" },
  { certNo: "KS-D-0005-2021", name: "열연강판 KS",       scope: "KS D 3501",  issueDate: "2021-11-01", expiryDate: "2024-10-31", agency: "한국표준협회", status: "만료" },
  { certNo: "KS-E-0010-2025", name: "도금 강판 KS",      scope: "KS D 3770",  issueDate: "2025-01-15", expiryDate: "2026-06-05", agency: "한국산업기술원", status: "유효" },
];

const CERTS = CERTS_RAW.map((c) => ({ ...c, dday: dday(c.expiryDate) }));

const COLUMNS = [
  { key: "certNo",     label: "인증 번호" },
  { key: "name",       label: "인증명" },
  { key: "scope",      label: "적용 규격" },
  { key: "issueDate",  label: "발급일" },
  { key: "expiryDate", label: "만료일" },
  { key: "dday",       label: "D-day" },
  { key: "agency",     label: "인증 기관" },
  { key: "status",     label: "상태" },
];

export default function CertListPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="KS 인증 목록"
        nodeRef="SCR-BD-110"
        description="KS 인증 등록·갱신·D-day 표시 관리"
      />
      <FieldHeader title="KS 인증 마스터" moduleRef="BD-CERT" />
      <DataTable title="KS 인증 목록" columns={COLUMNS} data={CERTS} bufferCount={CERTS.length} />
    </div>
  );
}
