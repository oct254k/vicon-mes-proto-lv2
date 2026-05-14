"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { drawingId: "DWG-G22C-C-001", fileName: "G22C_C형_송도IFC_v3.pdf",    member: "B01-1-G22C-C-171", rev: "v3", uploadedAt: "2026-05-05 14:00", uploadedBy: "김계획", status: "LINKED" },
  { drawingId: "DWG-G22C-S-001", fileName: "G22C_S형_송도IFC_v2.pdf",    member: "B01-1-G22C-S-172", rev: "v2", uploadedAt: "2026-05-05 14:05", uploadedBy: "김계획", status: "LINKED" },
  { drawingId: "DWG-G22C-C-002", fileName: "G22C_C형_블록2_v1.pdf",      member: "B01-2-G22C-C-201", rev: "v1", uploadedAt: "2026-05-06 09:10", uploadedBy: "이영업", status: "PENDING" },
  { drawingId: "DWG-T18B-C-001", fileName: "T18B_C형_판교_v2.pdf",       member: "B02-1-T18B-C-101", rev: "v2", uploadedAt: "2026-05-04 11:00", uploadedBy: "김계획", status: "LINKED" },
  { drawingId: "DWG-T18B-S-001", fileName: "T18B_S형_판교_v1.pdf",       member: "B02-1-T18B-S-102", rev: "v1", uploadedAt: "2026-05-04 11:10", uploadedBy: "김계획", status: "FAILED" },
  { drawingId: "DWG-G22C-H-001", fileName: "G22C_H형_송도IFC_v1.pdf",    member: "—",                rev: "v1", uploadedAt: "2026-05-06 10:30", uploadedBy: "박자재", status: "UNLINKED" },
];

const STATUS_MAP: Record<string, { type: "running" | "idle" | "error" | "warning"; label: string }> = {
  LINKED:   { type: "running", label: "연결됨" },
  PENDING:  { type: "idle",    label: "대기" },
  FAILED:   { type: "error",   label: "오류" },
  UNLINKED: { type: "warning", label: "미연결" },
};

export default function DrawingsPage() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="도면 등록" accent="연결" nodeRef="SCR-WO-011" description="도면 파일 등록 및 부재 코드 연결 — DEC-BD-MEMBER-SCOPE 이관 영역" />

      <div className="flex gap-3 mb-6">
        <button onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          + 도면 등록
        </button>
      </div>

      {showUpload && (
        <div className="mb-6 p-5 bg-surface-container-lowest border-l-4 border-primary-accent max-w-lg">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">도면 파일 업로드</p>
          <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-surface-container px-3 py-2 text-xs opacity-40 font-label border border-outline-variant/20">파일 선택 (.pdf, .dwg)</div>
            <button className="px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">선택</button>
          </div>
          <input placeholder="연결할 부재 코드 (예: B01-1-G22C-C-171)"
            className="w-full bg-surface-container px-3 py-2 text-sm font-mono border border-outline-variant/20 mb-3 focus:border-primary-accent focus:outline-none" />
          <div className="flex gap-2">
            <button onClick={() => setShowUpload(false)}
              className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">저장</button>
            <button onClick={() => setShowUpload(false)}
              className="px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest">취소</button>
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            도면 목록 <span className="opacity-30 font-light ml-2">| {ROWS.length} 건</span>
          </h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["도면 ID", "파일명", "연결 부재", "Rev", "등록일시", "등록자", "상태"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r) => {
              const s = STATUS_MAP[r.status];
              return (
                <tr key={r.drawingId} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.drawingId}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.fileName}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.member}</td>
                  <td className="px-4 py-2 text-xs">{r.rev}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-60">{r.uploadedAt}</td>
                  <td className="px-4 py-2 text-xs">{r.uploadedBy}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
