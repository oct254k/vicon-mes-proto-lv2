"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MONTHLY_LOSS = [
  { month: "2025-11", amount: 4800000 },
  { month: "2025-12", amount: 7200000 },
  { month: "2026-01", amount: 3100000 },
  { month: "2026-02", amount: 5600000 },
  { month: "2026-03", amount: 8900000 },
  { month: "2026-04", amount: 6400000 },
  { month: "2026-05", amount: 2100000 },
];

const MOCK_LOSSES = [
  { period: "2026-05-01~05", defectType: "용접부 균열", qty: 17, unitPrice: 48000, amount: 816000 },
  { period: "2026-05-01~05", defectType: "도장 두께 미달", qty: 6, unitPrice: 32000, amount: 192000 },
  { period: "2026-04-21~30", defectType: "치수 불량", qty: 23, unitPrice: 55000, amount: 1265000 },
  { period: "2026-04-10~20", defectType: "열처리 불량", qty: 8, unitPrice: 120000, amount: 960000 },
  { period: "2026-03-15~31", defectType: "모재 편차", qty: 34, unitPrice: 61000, amount: 2074000 },
  { period: "2026-03-01~14", defectType: "볼트 토크 미달", qty: 12, unitPrice: 18000, amount: 216000 },
];

const MOCK_WEIGHT_LOSS = 2340; // kg
const THIS_MONTH_AMOUNT = MOCK_LOSSES.filter(r => r.period.startsWith("2026-05")).reduce((s, r) => s + r.amount, 0);
const THIS_MONTH_COUNT = MOCK_LOSSES.filter(r => r.period.startsWith("2026-05")).length;

const MAX_AMOUNT = Math.max(...MONTHLY_LOSS.map(m => m.amount));

function fmt(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

export default function QCLossPage() {
  const [dateFrom, setDateFrom] = useState("2026-03-01");
  const [dateTo, setDateTo]     = useState("2026-05-05");

  const filtered = MOCK_LOSSES.filter(() => true); // 실데이터 연동 시 날짜 필터 적용

  return (
    <div>
      <PageHeader
        title="품질 손실 환산"
       
        nodeRef="IA-QC-LOSS-CALC"
        status="PROTOTYPE"
        description="불량 유형별 손실 금액·중량·건수 집계 및 월별 추이 분석"
      />

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-low p-5 border-l-4 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">이번 달 손실 금액</p>
          <p className="font-headline font-black text-2xl text-primary-accent tabular-nums">{fmt(THIS_MONTH_AMOUNT)}</p>
          <p className="text-xs opacity-40 font-label mt-1">2026년 5월 누계</p>
        </div>
        <div className="bg-surface-container-low p-5 border-l-4 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">손실 중량</p>
          <p className="font-headline font-black text-2xl text-primary-accent tabular-nums">{MOCK_WEIGHT_LOSS.toLocaleString()} kg</p>
          <p className="text-xs opacity-40 font-label mt-1">5월 누계 (폐기 기준)</p>
        </div>
        <div className="bg-surface-container-low p-5 border-l-4 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">손실 건수</p>
          <p className="font-headline font-black text-2xl text-primary-accent tabular-nums">{THIS_MONTH_COUNT}건</p>
          <p className="text-xs opacity-40 font-label mt-1">5월 발생 불량 건</p>
        </div>
      </div>

      {/* 월별 Bar Chart */}
      <FieldHeader title="월별 손실 금액 추이" moduleRef="최근 7개월" />
      <div className="bg-surface-container-lowest p-6 mb-8">
        <div className="flex items-end gap-3 h-40">
          {MONTHLY_LOSS.map((m, i) => {
            const total = MONTHLY_LOSS.length;
            const pct = Math.round((m.amount / MAX_AMOUNT) * 100);
            const ratio = total > 1 ? i / (total - 1) : 0;
            const lightness = Math.round(28 + ratio * 42);
            const barColor = `hsl(142, 55%, ${lightness}%)`;
            return (
              <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs font-label tabular-nums text-black font-semibold">
                  {(m.amount / 10000).toFixed(0)}만
                </span>
                <div
                  className="w-full transition-colors"
                  style={{ height: `${pct}%`, minHeight: "4px", backgroundColor: barColor }}
                  title={fmt(m.amount)}
                />
                <span className="text-xs font-label tabular-nums text-black font-medium">
                  {m.month.slice(5)}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs opacity-30 font-label mt-2 text-right">단위: 만원</p>
      </div>

      {/* 필터 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">기간</label>
          <div className="flex gap-2 items-center">
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              className="bg-surface-container-high text-on-surface text-xs px-2 py-1.5 border border-outline-variant/20 font-label" />
            <span className="text-xs opacity-40">~</span>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              className="bg-surface-container-high text-on-surface text-xs px-2 py-1.5 border border-outline-variant/20 font-label" />
          </div>
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest self-end">검색</button>
        <button className="px-4 py-1.5 bg-surface-container-high text-on-surface text-xs font-label uppercase tracking-widest self-end border border-outline-variant/20">엑셀 다운로드</button>
      </div>

      {/* DataTable */}
      <FieldHeader title="손실 내역" moduleRef={`${filtered.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["기간", "불량 유형", "수량(개)", "단가(원)", "손실 금액"].map(h => (
                <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {filtered.map((r, i) => (
              <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                <td className="px-4 py-2 tabular-nums opacity-70">{r.period}</td>
                <td className="px-4 py-2">{r.defectType}</td>
                <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                <td className="px-4 py-2 tabular-nums">{r.unitPrice.toLocaleString()}</td>
                <td className="px-4 py-2 tabular-nums text-primary-accent font-bold">{r.amount.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-primary-accent/30 bg-surface-container">
              <td colSpan={4} className="px-4 py-2 text-xs font-label uppercase tracking-widest opacity-50 text-right">합계</td>
              <td className="px-4 py-2 tabular-nums font-black text-primary-accent">
                {filtered.reduce((s, r) => s + r.amount, 0).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
