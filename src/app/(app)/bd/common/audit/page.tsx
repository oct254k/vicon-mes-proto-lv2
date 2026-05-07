"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const AUDIT_LOGS = [
  { id: "AUD-00521", domain: "Material",  action: "UPDATE", target: "M-COIL-A",      field: "단위중량",  before: "7.85",      after: "7.87",       user: "BD-MGR01", ts: "2026-05-05 14:32" },
  { id: "AUD-00520", domain: "Supplier",  action: "CREATE", target: "SUP-007",        field: "-",         before: "-",         after: "Nippon Steel", user: "BD-MGR01", ts: "2026-05-05 11:10" },
  { id: "AUD-00519", domain: "Equipment", action: "UPDATE", target: "EQP-P2-002",     field: "상태",      before: "Running",   after: "Idle",        user: "MNT-MGR01", ts: "2026-05-04 16:45" },
  { id: "AUD-00518", domain: "Cert",      action: "UPDATE", target: "KS-B-0021-2022", field: "만료일",    before: "2025-05-20", after: "2026-05-20", user: "QC-MGR01",  ts: "2026-05-04 09:20" },
  { id: "AUD-00517", domain: "Customer",  action: "CREATE", target: "SITE-003-01",    field: "-",         before: "-",         after: "인천 검단 산단", user: "BD-MGR01", ts: "2026-05-03 15:00" },
  { id: "AUD-00516", domain: "Plant",     action: "UPDATE", target: "P4000",          field: "상태",      before: "Active",    after: "Inactive",    user: "SYS-ADM01", ts: "2026-05-02 08:55" },
  { id: "AUD-00515", domain: "Workcenter", action: "CREATE", target: "WC-P3-001",     field: "-",         before: "-",         after: "출하 검사 A", user: "BD-MGR01",  ts: "2026-05-01 10:30" },
];

const DOMAINS = ["전체", "Material", "Supplier", "Equipment", "Cert", "Customer", "Plant", "Workcenter"];

const COLUMNS = [
  { key: "id",     label: "로그 ID" },
  { key: "domain", label: "도메인" },
  { key: "action", label: "액션" },
  { key: "target", label: "대상" },
  { key: "field",  label: "필드" },
  { key: "before", label: "변경 전" },
  { key: "after",  label: "변경 후" },
  { key: "user",   label: "처리자" },
  { key: "ts",     label: "일시" },
];

export default function CommonAuditPage() {
  const [domain, setDomain] = useState("전체");
  const filtered = AUDIT_LOGS.filter((l) => domain === "전체" || l.domain === domain);

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="감사 로그"
        nodeRef="SCR-BD-120"
        description="마스터 데이터 변경 이력 전체 조회 (SYS-ADMIN, MANAGER)"
      />
      <FieldHeader title="감사 로그 조회" moduleRef="BD-COMMON-AUDIT" />
      <div className="flex gap-3 mb-4 items-end">
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
        >
          {DOMAINS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider self-center">{filtered.length}건</span>
      </div>
      <DataTable title="감사 로그" columns={COLUMNS} data={filtered} bufferCount={filtered.length} />
    </div>
  );
}
