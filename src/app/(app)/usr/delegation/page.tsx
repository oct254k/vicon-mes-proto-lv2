"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const delegations = [
  { delegator: "김민수 (L3)", delegatee: "이정훈 (L2)", period: "2026-05-06 ~ 2026-05-10", scope: "WO 승인", status: "running" as const, statusLabel: "활성" },
  { delegator: "박지영 (L3)", delegatee: "최수진 (L2)", period: "2026-04-28 ~ 2026-04-30", scope: "계획 확정", status: "idle" as const, statusLabel: "만료" },
  { delegator: "이정훈 (L3)", delegatee: "강태호 (L2)", period: "2026-03-15 ~ 2026-03-17", scope: "품질 검사 승인", status: "idle" as const, statusLabel: "만료" },
];

export default function USRDelegationPage() {
  const [delegator, setDelegator] = useState("");
  const [delegatee, setDelegatee] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [scope, setScope] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("위임 등록 — 프로토타입");
  }

  return (
    <div>
      <PageHeader
        title="임시 위임"
        accent="DELEGATION"
        nodeRef="SCR-USR-050"
        status="PROTOTYPE"
        description="부재·휴가 시 권한을 임시로 위임하고 이력을 관리합니다."
      />

      <FieldHeader title="위임 등록" moduleRef="SCR-USR-050" />
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 mb-8 max-w-xl">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">위임자</label>
            <input
              value={delegator}
              onChange={(e) => setDelegator(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
              placeholder="사용자 검색"
            />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">수임자</label>
            <input
              value={delegatee}
              onChange={(e) => setDelegatee(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
              placeholder="사용자 검색"
            />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">시작일</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
            />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">종료일</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">위임 범위</label>
          <input
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
            placeholder="예: WO 승인, 계획 확정"
          />
        </div>
        <button type="submit" className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-6 py-2 text-sm hover:bg-[#00912F]/80 transition-colors">
          위임 등록
        </button>
      </form>

      <FieldHeader title="위임 이력" moduleRef="SCR-USR-050" />
      <section className="bg-[#1a1a1a] mt-4">
        <div className="p-4 bg-white/5 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">위임 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">위임자</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">수임자</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">기간</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">범위</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">상태</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {delegations.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white/80">{row.delegator}</td>
                  <td className="px-4 py-3 text-white/80">{row.delegatee}</td>
                  <td className="px-4 py-3 text-white/60 tabular-nums text-xs">{row.period}</td>
                  <td className="px-4 py-3 text-white/60">{row.scope}</td>
                  <td className="px-4 py-3"><StatusBadge type={row.status} label={row.statusLabel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
