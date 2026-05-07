"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const DISPATCH_LOG = [
  { id: "RPT-20260505", date: "2026-05-05", target: "공장장·생산관리자 (이메일)", time: "18:00", status: "발송완료", size: "1.2MB" },
  { id: "RPT-20260504", date: "2026-05-04", target: "공장장·생산관리자 (이메일)", time: "18:01", status: "발송완료", size: "1.1MB" },
  { id: "RPT-20260503", date: "2026-05-03", target: "공장장·생산관리자 (이메일)", time: "18:00", status: "발송완료", size: "1.3MB" },
  { id: "RPT-20260502", date: "2026-05-02", target: "공장장·생산관리자 (이메일)", time: "18:05", status: "재발송",   size: "1.1MB" },
];

const STATUS_COLOR: Record<string, string> = { 발송완료: "text-primary-accent", 재발송: "text-[#f59e0b]", 실패: "text-error" };

export default function PlantDailyReportPage() {
  const [date, setDate] = useState("2026-05-05");

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="일일 보고서 발송" accent="SCR-OPS-024" nodeRef="FNC-OPS-025" description="일일 보고서 생성·발송 모니터 · 이벤트 갱신" />

      {/* 보고서 생성 컨트롤 */}
      <div className="bg-surface-container p-5 mb-5 border-l-4 border-primary-accent">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">보고서 생성</p>
        <div className="flex items-center gap-3 flex-wrap">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="bg-surface border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label" />
          <select className="bg-surface border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>P3000 제3공장</option>
            <option>P1000 제1공장</option>
          </select>
          <select className="bg-surface border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>PDF</option>
            <option>Excel</option>
          </select>
          <button className="bg-primary-accent text-surface text-xs font-label px-5 py-2 font-bold uppercase tracking-widest">
            생성 · 발송
          </button>
          <button className="bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label px-4 py-2">
            미리보기
          </button>
        </div>
      </div>

      {/* 발송 이력 */}
      <div className="bg-surface-container">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <p className="font-headline font-black text-sm uppercase tracking-widest">발송 이력</p>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["보고서ID","기준일","발송대상","발송시각","상태","파일크기"].map(h=>(
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {DISPATCH_LOG.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 font-label text-on-surface-variant">{r.id}</td>
                <td className="px-4 py-2 tabular-nums">{r.date}</td>
                <td className="px-4 py-2">{r.target}</td>
                <td className="px-4 py-2 tabular-nums">{r.time}</td>
                <td className={`px-4 py-2 font-label text-xs font-bold ${STATUS_COLOR[r.status]}`}>{r.status}</td>
                <td className="px-4 py-2 tabular-nums text-on-surface-variant">{r.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
