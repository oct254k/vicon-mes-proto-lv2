import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const MOCK_DEFECTS = [
  { id: "D-2026-0042", partCode: "B01-1-G22C-C-171", defectType: "가공", stage: "② 생산공정", qty: 1, reporter: "worker.han", statusKey: "DISPOSED" },
  { id: "D-2026-0043", partCode: "B01-2-G15A-S-040", defectType: "규격", stage: "⑨ 현장도착", qty: 2, reporter: "cs.lee", statusKey: "REPORTED" },
  { id: "D-2026-0044", partCode: "B01-1-G22C-C-172", defectType: "외관", stage: "④ 이동입고", qty: 1, reporter: "truck.kim", statusKey: "CONFIRMED" },
  { id: "D-2026-0041", partCode: "B01-1-G22C-C-150", defectType: "조립", stage: "⑥ 최종검사", qty: 3, reporter: "insp.park", statusKey: "CLOSED" },
  { id: "D-2026-0030", partCode: "M-COIL-A-...013", defectType: "표면", stage: "① 입고검사", qty: 5, reporter: "insp.choi", statusKey: "CLOSED" },
  { id: "D-2026-0028", partCode: "B01-2-G15A-S-040", defectType: "기타", stage: "⑨ 현장도착", qty: 1, reporter: "cs.jung", statusKey: "CLOSED" },
];

const STATUS_MAP: Record<string, { type: "running" | "stopped" | "warning" | "idle" | "error"; label: string }> = {
  REPORTED: { type: "warning", label: "REPORTED" },
  CONFIRMED: { type: "running", label: "CONFIRMED" },
  DISPOSED: { type: "idle", label: "DISPOSED" },
  CLOSED: { type: "stopped", label: "CLOSED" },
};

const STAGES = ["전체", "① 입고검사", "② 생산공정", "③ 반제품검사", "④ 이동입고", "⑤ 조립", "⑥ 최종검사", "⑦ 보관", "⑧ 출하검사", "⑨ 현장도착"];
const DEFECT_TYPES = ["전체", "가공", "조립", "표면", "규격", "외관", "기타"];

const columns = [
  { key: "id", label: "신고번호" },
  { key: "partCode", label: "부재코드" },
  { key: "defectType", label: "불량유형" },
  { key: "stage", label: "시점" },
  { key: "qty", label: "수량" },
  { key: "reporter", label: "신고자" },
  { key: "status", label: "상태" },
];

export default function QCDefectsPage() {
  const tableData = MOCK_DEFECTS.map((d) => ({
    ...d,
    status: d.statusKey,
  }));

  return (
    <div>
      <PageHeader
        title="불량 신고"
        accent="목록"
        nodeRef="SCR-QC-032"
        status="PROTOTYPE"
        description="불량 트랜잭션 조회·이력 (부재/Lot/시점/기간)"
      />

      {/* 필터 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-6">
        <FieldHeader title="필터" moduleRef="FNC-QC-073" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">기간</label>
            <select className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface">
              <option>최근 6개월</option>
              <option>최근 30일</option>
              <option>최근 7일</option>
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">공정·시점</label>
            <select className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface">
              {STAGES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">불량 유형</label>
            <select className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface">
              {DEFECT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">상태</label>
            <select className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface">
              <option>전체</option>
              <option>REPORTED</option>
              <option>CONFIRMED</option>
              <option>DISPOSED</option>
              <option>CLOSED</option>
            </select>
          </div>
        </div>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "총 건수", value: "24", accent: false },
          { label: "REPORTED", value: "5", accent: true },
          { label: "CONFIRMED", value: "4", accent: false },
          { label: "DISPOSED / CLOSED", value: "8 / 7", accent: false },
        ].map((kpi) => (
          <div key={kpi.label} className={`p-4 border-l-4 ${kpi.accent ? "border-primary-accent bg-primary-accent/5" : "border-outline-variant/20 bg-surface-container-low"}`}>
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{kpi.label}</p>
            <p className="font-headline font-black text-2xl">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* 테이블 */}
      <section className="bg-surface-container-lowest mt-4">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            불량 트랜잭션 <span className="opacity-30 font-light ml-2">| Buffer: 006 Entries</span>
          </h3>
          <Link
            href="/qc/defects/new"
            className="bg-primary-accent text-white px-4 py-1.5 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/80 transition-colors"
          >
            + 신규 신고
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {MOCK_DEFECTS.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums">
                    <Link href={`/qc/defects/${row.id}`} className="text-primary-accent hover:underline">{row.id}</Link>
                  </td>
                  <td className="px-4 py-2 tabular-nums font-mono text-xs">{row.partCode}</td>
                  <td className="px-4 py-2">{row.defectType}</td>
                  <td className="px-4 py-2 text-xs">{row.stage}</td>
                  <td className="px-4 py-2 tabular-nums">{row.qty}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{row.reporter}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={STATUS_MAP[row.statusKey].type} label={STATUS_MAP[row.statusKey].label} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
