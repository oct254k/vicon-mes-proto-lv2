"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PREVIEW = [
  { code: "B01-1-G22C-C-171", type: "C형", len: 6000, qty: 240, valid: true },
  { code: "B01-1-G22C-S-172", type: "S형", len: 12000, qty: 80,  valid: true },
  { code: "B01-2-G22C-C-201", type: "C형", len: 6000, qty: 320,  valid: true },
  { code: "B01-2-G22C-H-202", type: "H형", len: 9000, qty: 60,   valid: true },
  { code: "B01-ERR-XXXXX",    type: "?",   len: 0,    qty: 0,    valid: false },
];

export default function MemberUploadPage() {
  const [phase, setPhase] = useState<"idle" | "preview" | "done">("idle");
  const validCount = PREVIEW.filter((r) => r.valid).length;
  const errCount = PREVIEW.filter((r) => !r.valid).length;

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="부재 Excel" accent="업로드" nodeRef="SCR-SP-011" description="Excel 파일을 업로드하면 부재 코드를 자동 파싱·검증합니다." />

      <div className="mb-6 p-6 bg-surface-container-lowest border border-outline-variant/20">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">파일 선택</p>
        <div className="flex gap-3 items-center">
          <div className="flex-1 bg-surface-container px-4 py-3 text-xs opacity-40 font-label border border-outline-variant/20">
            {phase === "idle" ? "파일을 선택하세요 (.xlsx)" : "member_list_SO-2026-0042.xlsx"}
          </div>
          <button
            onClick={() => setPhase("preview")}
            className="px-4 py-3 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90"
          >
            업로드 & 미리보기
          </button>
        </div>
      </div>

      {phase !== "idle" && (
        <>
          <div className="flex gap-4 mb-4">
            <div className="bg-surface-container p-3 border-l-2 border-primary-accent flex-1">
              <p className="text-xs font-label opacity-50 uppercase tracking-widest">유효 행</p>
              <p className="font-headline font-black text-2xl text-primary-accent">{validCount}</p>
            </div>
            <div className="bg-surface-container p-3 border-l-2 border-error flex-1">
              <p className="text-xs font-label opacity-50 uppercase tracking-widest">오류 행</p>
              <p className="font-headline font-black text-2xl text-error">{errCount}</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest overflow-x-auto mb-4">
            <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent">
              <span className="font-headline font-black text-xs uppercase tracking-widest">파싱 미리보기</span>
            </div>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-surface-container border-b border-outline">
                  {["부재코드", "타입", "길이(mm)", "수량", "검증"].map((h) => (
                    <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-headline">
                {PREVIEW.map((r, i) => (
                  <tr key={i} className={`border-b border-outline-variant ${!r.valid ? "bg-error/5" : ""}`}>
                    <td className="px-4 py-2 font-mono text-xs">{r.code}</td>
                    <td className="px-4 py-2">{r.type}</td>
                    <td className="px-4 py-2 tabular-nums">{r.len > 0 ? r.len.toLocaleString() : "—"}</td>
                    <td className="px-4 py-2 tabular-nums">{r.qty > 0 ? r.qty : "—"}</td>
                    <td className="px-4 py-2">
                      <StatusBadge type={r.valid ? "running" : "error"} label={r.valid ? "OK" : "오류"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => setPhase("done")}
            disabled={phase === "done"}
            className="px-6 py-3 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-40"
          >
            {phase === "done" ? "저장 완료" : "확정 저장"}
          </button>
        </>
      )}
    </main>
  );
}
