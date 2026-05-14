"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const auditData = [
  { ts: "2026-05-05 09:12:33", user: "김민수", event: "WO_RELEASE", ip: "10.0.1.12", result: "running" as const, resultLabel: "성공" },
  { ts: "2026-05-05 08:58:01", user: "이정훈", event: "LOGIN", ip: "10.0.1.45", result: "running" as const, resultLabel: "성공" },
  { ts: "2026-05-05 08:45:22", user: "박지영", event: "MRP_RUN", ip: "10.0.2.10", result: "running" as const, resultLabel: "성공" },
  { ts: "2026-05-05 08:30:15", user: "UNKNOWN", event: "LOGIN_FAIL", ip: "203.0.113.5", result: "stopped" as const, resultLabel: "실패" },
  { ts: "2026-05-05 08:20:44", user: "최수진", event: "PERM_CHANGE", ip: "10.0.1.88", result: "running" as const, resultLabel: "성공" },
  { ts: "2026-05-04 17:55:10", user: "강태호", event: "LOGOUT", ip: "10.0.1.22", result: "running" as const, resultLabel: "성공" },
];

const eventTypes = ["전체", "LOGIN", "LOGIN_FAIL", "LOGOUT", "WO_RELEASE", "MRP_RUN", "PERM_CHANGE"];

export default function USRAuditPage() {
  const [user, setUser] = useState("");
  const [eventType, setEventType] = useState("전체");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = auditData.filter((row) => {
    const matchUser = user === "" || row.user.includes(user);
    const matchEvent = eventType === "전체" || row.event === eventType;
    return matchUser && matchEvent;
  });

  return (
    <div>
      <PageHeader
        title="감사 로그"
        accent="AUDIT"
        nodeRef="SCR-USR-082"
        status="PROTOTYPE"
        description="사용자 행위·시스템 이벤트 감사 이력 조회."
      />

      <div className="flex flex-wrap gap-3 mb-6 bg-surface-elevated p-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface/50 whitespace-nowrap">사용자</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="bg-surface border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F] w-32"
            placeholder="이름 검색"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface/50 whitespace-nowrap">이벤트</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="bg-surface border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]"
          >
            {eventTypes.map((et) => <option key={et}>{et}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-label uppercase tracking-widest text-on-surface/50 whitespace-nowrap">기간</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-surface border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]"
          />
          <span className="text-on-surface/30">~</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-surface border border-outline/20 px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-[#00912F]"
          />
        </div>
      </div>

      <FieldHeader title="감사 이력" moduleRef="SCR-USR-082" />
      <section className="bg-surface-elevated mt-4">
        <div className="p-4 bg-white/5 flex justify-between items-center border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            로그 목록{" "}
            <span className="opacity-30 font-light ml-2">| {filtered.length} Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#00912F]">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline/10">
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">일시</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">사용자</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">이벤트</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">IP</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">결과</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filtered.map((row, i) => (
                <tr key={i} className="border-b border-outline/10 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 tabular-nums text-on-surface/60 text-xs">{row.ts}</td>
                  <td className="px-4 py-3 text-on-surface/80">{row.user}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#00912F]">{row.event}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/50 text-xs font-mono">{row.ip}</td>
                  <td className="px-4 py-3">
                    <StatusBadge type={row.result} label={row.resultLabel} />
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
