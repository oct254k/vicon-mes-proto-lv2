"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PLANTS = [
  { code: "P1100", label: "P1100 — 이천1-1 (보데크)" },
  { code: "P1200", label: "P1200 — 이천1-2 (알루미늄폼)" },
  { code: "P2000", label: "P2000 — 이천2 (알루미늄폼)" },
  { code: "P3000", label: "P3000 — 이천3 (데크)" },
  { code: "P4000", label: "P4000 — 안성4 (가설재)" },
];

const MOCK_ITEMS = [
  { bundle: "B01-1", type: "C형", qty: 240, dueDate: "2026-05-08", stockStatus: "OK",   priority: 1 },
  { bundle: "B01-2", type: "S형", qty: 80,  dueDate: "2026-05-08", stockStatus: "부족", priority: 2 },
  { bundle: "B02-1", type: "H형", qty: 60,  dueDate: "2026-05-12", stockStatus: "OK",   priority: 3 },
  { bundle: "B02-2", type: "C형", qty: 160, dueDate: "2026-05-12", stockStatus: "부족", priority: 4 },
  { bundle: "B03-1", type: "C형", qty: 320, dueDate: "2026-05-20", stockStatus: "OK",   priority: 5 },
  { bundle: "B03-2", type: "S형", qty: 40,  dueDate: "2026-05-20", stockStatus: "OK",   priority: 6 },
];

export default function DailyPlanPage() {
  const [plant, setPlant]   = useState("P3000");
  const [date, setDate]     = useState("2026-05-06");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => setConfirmed(true);

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="일일 계획" accent="보드" nodeRef="SCR-SP-022" status={confirmed ? "CONFIRMED" : "DRAFT"} />

      {/* 상단 컨트롤 */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-on-surface-variant uppercase tracking-widest">Plant</label>
          <select
            className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
            value={plant} onChange={(e) => setPlant(e.target.value)}
          >
            {PLANTS.map((p) => <option key={p.code} value={p.code}>{p.label}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-on-surface-variant uppercase tracking-widest">날짜</label>
          <input
            type="date"
            className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
            value={date} onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleConfirm}
          className={`px-5 py-2 text-sm font-bold uppercase tracking-widest transition-opacity ${confirmed ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed" : "bg-primary-accent text-black hover:opacity-90"}`}
          disabled={confirmed}
        >
          {confirmed ? "계획 확정됨" : "계획 확정"}
        </button>
      </div>

      {/* 계획 항목 테이블 */}
      <section className="bg-surface-container-lowest mb-6">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">계획 항목 <span className="opacity-30 font-light ml-2">| {plant} / {date}</span></h3>
          <span className="text-xs text-on-surface-variant">{MOCK_ITEMS.length} 항목</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["부재묶음", "타입", "수량", "납기", "재고 상태", "우선순위"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {MOCK_ITEMS.map((item) => (
                <tr
                  key={item.bundle}
                  className={`border-b border-outline-variant transition-colors ${item.stockStatus === "부족" ? "bg-warning/10" : "hover:bg-surface-container-highest/20"}`}
                >
                  <td className="px-4 py-2 font-mono text-xs">{item.bundle}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2 tabular-nums">{item.qty}</td>
                  <td className="px-4 py-2 tabular-nums">{item.dueDate}</td>
                  <td className="px-4 py-2">
                    <StatusBadge
                      type={item.stockStatus === "OK" ? "running" : "warning"}
                      label={item.stockStatus}
                    />
                  </td>
                  <td className="px-4 py-2 tabular-nums">{item.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 하단 WO 발행 버튼 */}
      <div className="flex justify-end">
        <a href="/wo/orders/release">
          <button className="px-8 py-3 bg-primary-accent text-white text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            WO 발행 →
          </button>
        </a>
      </div>
    </main>
  );
}
