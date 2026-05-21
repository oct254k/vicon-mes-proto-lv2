"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const users = ["김민수", "이정훈", "박지영", "최수진", "강태호"];
const processes = ["절단", "용접 1G", "용접 2G", "도장 기초", "도장 마감", "조립 A", "조립 B", "검사"];

const qualMatrix: Record<string, boolean[]> = {
  "김민수": [true, true, true, false, false, true, false, true],
  "이정훈": [true, false, true, true, false, false, true, false],
  "박지영": [false, true, false, true, true, true, true, true],
  "최수진": [true, true, false, false, true, true, false, false],
  "강태호": [true, false, false, true, false, false, true, true],
};

export default function USRQualificationPage() {
  return (
    <div>
      <PageHeader
        title="공정 자격 매트릭스"
        accent="자격"
        nodeRef="SCR-USR-060"
        status="PROTOTYPE"
        description="사용자(행) × 공정(열) — 보유 자격 현황."
      />

      <FieldHeader title="자격 현황" moduleRef="SCR-USR-060" />
      <div className="overflow-x-auto bg-surface-elevated">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-outline/10">
              <th className="px-4 py-3 text-xs font-label uppercase tracking-widest text-on-surface/40 w-32">사용자</th>
              {processes.map((p) => (
                <th key={p} className="px-4 py-3 text-xs font-label uppercase tracking-widest text-[#00912F] text-center">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {users.map((user) => (
              <tr key={user} className="border-b border-outline/10 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-on-surface/80 font-bold">{user}</td>
                {qualMatrix[user].map((has, pi) => (
                  <td key={pi} className="px-4 py-3 text-center">
                    {has ? (
                      <span className="inline-block w-5 h-5 bg-[#00912F]/20 text-[#00912F] text-xs font-bold leading-5">✓</span>
                    ) : (
                      <span className="inline-block w-5 h-5 text-on-surface/15 text-xs leading-5">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-4 text-xs font-label">
        <span className="flex items-center gap-2 text-on-surface/40">
          <span className="inline-block w-4 h-4 bg-[#00912F]/20 text-[#00912F] text-xs font-bold leading-4 text-center">✓</span>
          자격 보유
        </span>
        <span className="flex items-center gap-2 text-on-surface/40">
          <span className="inline-block w-4 h-4 text-on-surface/15 text-xs leading-4 text-center">—</span>
          미보유
        </span>
      </div>
    </div>
  );
}
