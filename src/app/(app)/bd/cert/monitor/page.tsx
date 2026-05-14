import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const EXPIRING = [
  { certNo: "KS-B-0021-2022", name: "볼트·너트 KS",   expiryDate: "2026-05-20", dday: "D-14",  tier: "D-30",  status: "경고" },
  { certNo: "KS-E-0010-2025", name: "도금 강판 KS",   expiryDate: "2026-06-05", dday: "D-30",  tier: "D-30",  status: "경고" },
  { certNo: "KS-D-0003-2023", name: "일반 구조용 강관", expiryDate: "2026-08-14", dday: "D-100", tier: "정상",  status: "정상" },
];

const EXPIRED = [
  { certNo: "KS-D-0005-2021", name: "열연강판 KS", expiryDate: "2024-10-31", dday: "D+553", tier: "만료",  status: "만료" },
];

const COLUMNS = [
  { key: "certNo",     label: "인증 번호" },
  { key: "name",       label: "인증명" },
  { key: "expiryDate", label: "만료일" },
  { key: "dday",       label: "D-day" },
  { key: "tier",       label: "구간" },
  { key: "status",     label: "알림 상태" },
];

export default function CertMonitorPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="KS 인증 만료 모니터링"
        nodeRef="SCR-BD-111"
        description="D-30 / D-7 구간별 만료 예정 인증 대시보드"
      />
      <FieldHeader title="만료 모니터링 대시보드" moduleRef="BD-CERT-MONITOR" />
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-surface-container-lowest border border-warning/40 p-4">
          <div className="text-xs font-label uppercase tracking-widest text-warning mb-1">D-7 이내</div>
          <div className="text-2xl font-headline font-black text-warning">0</div>
        </div>
        <div className="bg-surface-container-lowest border border-warning/20 p-4">
          <div className="text-xs font-label uppercase tracking-widest text-warning/70 mb-1">D-30 이내</div>
          <div className="text-2xl font-headline font-black text-warning/70">2</div>
        </div>
        <div className="bg-surface-container-lowest border border-error/40 p-4">
          <div className="text-xs font-label uppercase tracking-widest text-error mb-1">만료</div>
          <div className="text-2xl font-headline font-black text-error">1</div>
        </div>
      </div>
      <DataTable title="만료 예정 및 만료 인증" columns={COLUMNS} data={[...EXPIRING, ...EXPIRED]} bufferCount={EXPIRING.length + EXPIRED.length} />
    </div>
  );
}
