"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

type TransitStatus = "IN_TRANSIT" | "ARRIVED" | "OVERDUE";

interface TransitRow {
  id: string;
  fromPlant: string;
  toPlant: string;
  count: number;
  departedAt: string;
  etaAt: string;
  status: TransitStatus;
}

const STATUS_STYLE: Record<TransitStatus, string> = {
  IN_TRANSIT: "bg-[#22c55e]/20 text-[#22c55e]",
  ARRIVED: "bg-primary-accent/20 text-primary-accent",
  OVERDUE: "bg-error/20 text-error",
};

const MOCK_DATA: TransitRow[] = [
  { id: "TRF-2026-0042", fromPlant: "P1-안산", toPlant: "P3-부산", count: 12, departedAt: "2026-05-04 08:30", etaAt: "2026-05-05 14:00", status: "OVERDUE" },
  { id: "TRF-2026-0043", fromPlant: "P2-인천", toPlant: "P1-안산", count: 5,  departedAt: "2026-05-05 06:00", etaAt: "2026-05-05 10:30", status: "IN_TRANSIT" },
  { id: "TRF-2026-0041", fromPlant: "P4-광주", toPlant: "P2-인천", count: 8,  departedAt: "2026-05-04 18:00", etaAt: "2026-05-05 08:00", status: "ARRIVED" },
  { id: "TRF-2026-0044", fromPlant: "P1-안산", toPlant: "P4-광주", count: 3,  departedAt: "2026-05-05 09:15", etaAt: "2026-05-06 12:00", status: "IN_TRANSIT" },
  { id: "TRF-2026-0040", fromPlant: "P3-부산", toPlant: "P1-안산", count: 6,  departedAt: "2026-05-03 14:00", etaAt: "2026-05-04 20:00", status: "OVERDUE" },
];

const COLUMNS = ["이동 ID", "출발 Plant", "도착 Plant", "부재 수", "출발 시각", "예상 도착", "상태"];

export default function MFGTransferMonitorPage() {
  const overdueCount = MOCK_DATA.filter((r) => r.status === "OVERDUE").length;
  const inTransitCount = MOCK_DATA.filter((r) => r.status === "IN_TRANSIT").length;

  return (
    <div className="px-4 py-6">
      <PageHeader
        title="이동 모니터링"
        accent="이동중"
        nodeRef="SCR-MFG-033"
        status="PROTOTYPE"
      />

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-low p-4 border-l-4 border-[#22c55e]">
          <p className="font-label text-xs uppercase tracking-widest text-[#22c55e] mb-1">IN TRANSIT</p>
          <p className="font-headline font-black text-2xl">{inTransitCount}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-primary-accent">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ARRIVED</p>
          <p className="font-headline font-black text-2xl">{MOCK_DATA.filter((r) => r.status === "ARRIVED").length}</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-4 border-error">
          <p className="font-label text-xs uppercase tracking-widest text-error mb-1">OVERDUE</p>
          <p className="font-headline font-black text-2xl">{overdueCount}</p>
        </div>
      </div>

      <FieldHeader title="이동 현황 목록" moduleRef="SCR-MFG-034" />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            TRANSFER RECORDS
            <span className="opacity-30 font-light ml-2">| Total: {MOCK_DATA.length}</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {COLUMNS.map((col) => (
                <th key={col} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {MOCK_DATA.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-outline-variant transition-colors ${
                  row.status === "OVERDUE"
                    ? "bg-error/5 hover:bg-error/10"
                    : "hover:bg-surface-container-highest/20"
                }`}
              >
                <td className="px-4 py-2 tabular-nums font-bold">{row.id}</td>
                <td className="px-4 py-2">{row.fromPlant}</td>
                <td className="px-4 py-2">{row.toPlant}</td>
                <td className="px-4 py-2 tabular-nums">{row.count}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface/70">{row.departedAt}</td>
                <td className={`px-4 py-2 tabular-nums ${row.status === "OVERDUE" ? "text-error font-bold" : "text-on-surface/70"}`}>
                  {row.etaAt}
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-label uppercase tracking-wider font-bold ${STATUS_STYLE[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
