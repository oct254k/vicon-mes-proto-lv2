import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const LIMITS = [
  { ver: "v3", itemId: "I-001", itemName: "절단 길이", ucl: "6000.5", cl: "6000.0", lcl: "5999.5", basis: "자동 (n=25)", since: "2026-04-01", status: "ACTIVE" },
  { ver: "v2", itemId: "I-001", itemName: "절단 길이", ucl: "6001.0", cl: "6000.0", lcl: "5999.0", basis: "수동", since: "2026-01-15", status: "SUPERSEDED" },
  { ver: "v1", itemId: "I-002", itemName: "절곡 각도", ucl: "290.5", cl: "290.0", lcl: "289.5", basis: "자동 (n=20)", since: "2026-03-10", status: "ACTIVE" },
  { ver: "v1", itemId: "I-003", itemName: "강판 두께", ucl: "2.32", cl: "2.30", lcl: "2.28", basis: "설계 공차", since: "2026-02-01", status: "ACTIVE" },
];

const STAT_MAP: Record<string, { type: "running" | "idle"; label: string }> = {
  ACTIVE: { type: "running", label: "활성" },
  SUPERSEDED: { type: "idle", label: "대체됨" },
};

const COLUMNS = [
  { key: "ver", label: "버전" },
  { key: "itemId", label: "항목 코드" },
  { key: "itemName", label: "항목명" },
  { key: "ucl", label: "UCL" },
  { key: "cl", label: "CL" },
  { key: "lcl", label: "LCL" },
  { key: "basis", label: "산정 기준" },
  { key: "since", label: "적용일" },
];

export default function QCMasterLimitPage() {
  return (
    <div>
      <PageHeader
        title="관리 한계"
        accent="설정"
        nodeRef="SCR-QC-004"
        status="PROTOTYPE"
        description="UCL/LCL/CL 버전 관리 및 자동 재산정 (FNC-QC-012)"
      />
      <FieldHeader title="한계 버전 목록" moduleRef="FNC-QC-012" />
      <div className="flex gap-3 mb-5">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>항목 전체</option><option>I-001 절단 길이</option><option>I-002 절곡 각도</option><option>I-003 강판 두께</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>ACTIVE만</option><option>전체</option>
        </select>
        <div className="flex-1" />
        <button className="bg-primary-accent text-white text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">자동 재산정</button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">관리 한계 버전 <span className="opacity-30 font-light ml-2">| Buffer: 004 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {COLUMNS.map((c) => <th key={c.key} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{c.label}</th>)}
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">상태</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {LIMITS.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{r.ver}</td>
                  <td className="px-4 py-2 tabular-nums font-mono text-xs">{r.itemId}</td>
                  <td className="px-4 py-2">{r.itemName}</td>
                  <td className="px-4 py-2 tabular-nums">{r.ucl}</td>
                  <td className="px-4 py-2 tabular-nums">{r.cl}</td>
                  <td className="px-4 py-2 tabular-nums">{r.lcl}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.basis}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.since}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAT_MAP[r.status].type} label={STAT_MAP[r.status].label} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
