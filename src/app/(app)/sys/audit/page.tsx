"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const MOCK = [
  { ts: "2026-05-06 08:21:03", user: "admin01", event: "LOGIN", domain: "AUTH", ip: "10.0.1.5", result: "SUCCESS" },
  { ts: "2026-05-06 08:22:15", user: "admin01", event: "CODE_UPDATE", domain: "SYS", ip: "10.0.1.5", result: "SUCCESS" },
  { ts: "2026-05-06 08:35:44", user: "oper02", event: "LOGIN", domain: "AUTH", ip: "10.0.2.12", result: "FAIL" },
  { ts: "2026-05-06 08:36:01", user: "oper02", event: "LOGIN", domain: "AUTH", ip: "10.0.2.12", result: "SUCCESS" },
  { ts: "2026-05-06 09:01:22", user: "admin01", event: "BACKUP_TRIGGER", domain: "SYS", ip: "10.0.1.5", result: "SUCCESS" },
  { ts: "2026-05-06 09:15:30", user: "audit01", event: "LOG_EXPORT", domain: "SYS", ip: "10.0.3.8", result: "SUCCESS" },
  { ts: "2026-05-06 09:42:17", user: "oper03", event: "TOKEN_REVOKE", domain: "SYS", ip: "10.0.2.18", result: "FAIL" },
  { ts: "2026-05-06 10:05:00", user: "admin01", event: "PLANT_POLICY_SAVE", domain: "SYS", ip: "10.0.1.5", result: "SUCCESS" },
];

export default function SYSAuditPage() {
  const [userFilter, setUserFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");

  const filtered = MOCK.filter(r =>
    (!userFilter || r.user.includes(userFilter)) &&
    (!eventFilter || r.event.includes(eventFilter)) &&
    (!resultFilter || r.result === resultFilter)
  );

  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="감사" accent="·운영 로그" nodeRef="SCR-SYS-050" description="append-only 감사 로그 검색 및 다운로드 (최대 10만 행)" />

      <div className="flex flex-wrap gap-3 mb-6">
        <input value={userFilter} onChange={e => setUserFilter(e.target.value)}
          placeholder="사용자 필터" className="bg-surface-container-high px-3 py-2 text-sm outline-none border border-outline-variant/20 text-on-surface w-40" />
        <input value={eventFilter} onChange={e => setEventFilter(e.target.value)}
          placeholder="이벤트 유형 필터" className="bg-surface-container-high px-3 py-2 text-sm outline-none border border-outline-variant/20 text-on-surface w-48" />
        <select value={resultFilter} onChange={e => setResultFilter(e.target.value)}
          className="bg-surface-container-high px-3 py-2 text-sm outline-none border border-outline-variant/20 text-on-surface">
          <option value="">결과 전체</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="FAIL">FAIL</option>
        </select>
        <div className="flex-1" />
        <div className="flex flex-col items-end gap-1">
          <button className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface-variant hover:bg-surface-container border border-outline-variant/20 transition-colors">
            CSV 다운로드
          </button>
          <span className="text-[10px] text-on-surface-variant opacity-40 font-label">최대 10만 행 한도</span>
        </div>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">감사 로그 <span className="opacity-30 font-light ml-2">| {filtered.length} 건</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["일시", "사용자", "이벤트", "도메인", "IP", "결과"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filtered.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.ts}</td>
                  <td className="px-4 py-2">{row.user}</td>
                  <td className="px-4 py-2 text-xs font-label uppercase tracking-wider text-on-surface-variant">{row.event}</td>
                  <td className="px-4 py-2 text-xs text-[#00912F]">{row.domain}</td>
                  <td className="px-4 py-2 tabular-nums text-on-surface-variant text-xs">{row.ip}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs font-label uppercase ${row.result === "SUCCESS" ? "bg-[#00912F]/20 text-[#00912F]" : "bg-error/20 text-error"}`}>
                      {row.result}
                    </span>
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
