import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const HISTORY = [
  { tokenId: "EXT-20260506-001", driver: "외부운전자A", scope: "PACKING", issuedBy: "kim.kj@vicon.local", issuedAt: "2026-05-06 08:00", expiredAt: "2026-05-06 18:00", revokedAt: "—", result: "ACTIVE" },
  { tokenId: "EXT-20260505-007", driver: "외부운전자B", scope: "VEHICLE", issuedBy: "정출하(EMP3030)", issuedAt: "2026-05-05 14:00", expiredAt: "2026-05-05 22:00", revokedAt: "—", result: "EXPIRED" },
  { tokenId: "EXT-20260504-004", driver: "외부검수자C", scope: "SITE", issuedBy: "최관리(L4)", issuedAt: "2026-05-04 09:00", expiredAt: "2026-05-04 17:00", revokedAt: "2026-05-04 13:30", result: "REVOKED" },
  { tokenId: "EXT-20260503-002", driver: "외부운전자D", scope: "PACKING", issuedBy: "kim.kj@vicon.local", issuedAt: "2026-05-03 07:00", expiredAt: "2026-05-03 15:00", revokedAt: "—", result: "EXPIRED" },
];

const COLS = [
  { key: "tokenId", label: "토큰 ID" },
  { key: "driver", label: "외부 사용자" },
  { key: "scope", label: "Scope" },
  { key: "issuedBy", label: "발급자" },
  { key: "issuedAt", label: "발급 시각" },
  { key: "expiredAt", label: "만료 시각" },
  { key: "revokedAt", label: "회수 시각" },
  { key: "result", label: "결과" },
];

export default function ExternalTokenHistoryPage() {
  return (
    <div>
      <PageHeader title="EXTERNAL 토큰 이력" nodeRef="SCR-USR-062" status="PROTOTYPE" description="토큰 발급·자동 만료·즉시 회수 전체 이력. AUDITOR 및 L3+ 열람 가능." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 필터" moduleRef="FNC-USR-085" />
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 시작</label>
            <input type="date" defaultValue="2026-05-01" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 종료</label>
            <input type="date" defaultValue="2026-05-06" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">Scope</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>PACKING</option><option>VEHICLE</option><option>SITE</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">결과</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>ACTIVE</option><option>EXPIRED</option><option>REVOKED</option>
            </select>
          </div>
          <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">검색</button>
          <button className="px-4 py-1.5 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">CSV 내보내기</button>
        </div>
      </div>

      <DataTable title="B. 토큰 이력 목록" columns={COLS} data={HISTORY} bufferCount={4} />
    </div>
  );
}
