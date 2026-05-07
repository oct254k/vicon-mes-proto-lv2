"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const domains = ["전체", "MFG", "WO", "SP", "LOC", "QC", "SHP", "EQ", "USR", "SYS"];

const roles = ["WORKER", "SUPERVISOR", "MANAGER", "ADMIN"];

const matrixData: Record<string, Record<string, string>> = {
  "MFG / 작업 실적 입력": { WORKER: "C/R", SUPERVISOR: "C/R/U", MANAGER: "R", ADMIN: "C/R/U/D" },
  "MFG / 공정 현황 조회": { WORKER: "R", SUPERVISOR: "R", MANAGER: "R", ADMIN: "C/R/U/D" },
  "WO / 작업지시 발행": { WORKER: "-", SUPERVISOR: "R", MANAGER: "C/R/A", ADMIN: "C/R/U/D/A" },
  "WO / 패킹리스트 출력": { WORKER: "R", SUPERVISOR: "R/U", MANAGER: "R/A", ADMIN: "C/R/U/D" },
  "SP / 수주 등록": { WORKER: "-", SUPERVISOR: "-", MANAGER: "C/R/U", ADMIN: "C/R/U/D" },
  "SP / MRP 실행": { WORKER: "-", SUPERVISOR: "-", MANAGER: "A", ADMIN: "C/R/U/D/A" },
  "LOC / 재고 조회": { WORKER: "R", SUPERVISOR: "R", MANAGER: "R", ADMIN: "C/R/U/D" },
  "LOC / 재고 보정": { WORKER: "-", SUPERVISOR: "C/R", MANAGER: "C/R/A", ADMIN: "C/R/U/D/A" },
  "QC / 검사 결과 입력": { WORKER: "C/R", SUPERVISOR: "C/R/U", MANAGER: "R/A", ADMIN: "C/R/U/D/A" },
  "USR / 사용자 관리": { WORKER: "-", SUPERVISOR: "-", MANAGER: "-", ADMIN: "C/R/U/D" },
};

export default function USRMatrixPage() {
  const [domain, setDomain] = useState("전체");

  const screenKeys = Object.keys(matrixData).filter((k) =>
    domain === "전체" ? true : k.startsWith(domain)
  );

  return (
    <div>
      <PageHeader
        title="권한 매트릭스"
        accent="MATRIX"
        nodeRef="SCR-USR-040"
        status="PROTOTYPE"
        description="화면(행) × 역할(열) — CRUD/A 권한 조회."
      />

      <div className="flex items-center gap-3 mb-6">
        <label className="text-xs font-label uppercase tracking-widest text-white/50">도메인 필터</label>
        <div className="flex gap-2 flex-wrap">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              className={`px-3 py-1 text-xs font-label uppercase tracking-widest border transition-colors ${
                domain === d
                  ? "border-[#00912F] bg-[#00912F]/20 text-[#00912F]"
                  : "border-white/10 text-white/40 hover:border-white/30"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <FieldHeader title="매트릭스" moduleRef="SCR-USR-040" />
      <div className="overflow-x-auto bg-[#1a1a1a]">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-xs font-label uppercase tracking-widest text-white/40 w-64">화면 / 기능</th>
              {roles.map((r) => (
                <th key={r} className="px-4 py-3 text-xs font-label uppercase tracking-widest text-[#00912F]">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {screenKeys.map((screen) => (
              <tr key={screen} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-white/70 text-xs">{screen}</td>
                {roles.map((r) => {
                  const perm = matrixData[screen][r] ?? "-";
                  return (
                    <td key={r} className={`px-4 py-3 text-xs tabular-nums font-bold ${perm === "-" ? "text-white/20" : "text-[#00912F]"}`}>
                      {perm}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
