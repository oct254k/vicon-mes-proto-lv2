"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type CertStatus = "발행 완료" | "검토 중" | "취소";

const CERTS = [
  { no: "QCR-2026-001", shipNo: "SHP-2026-031", form: "KS",  issued: "2026-04-30", status: "발행 완료" as CertStatus },
  { no: "QCR-2026-002", shipNo: "SHP-2026-033", form: "CE",  issued: "2026-05-01", status: "발행 완료" as CertStatus },
  { no: "QCR-2026-003", shipNo: "SHP-2026-035", form: "3S",  issued: "2026-05-03", status: "검토 중"   as CertStatus },
  { no: "QCR-2026-004", shipNo: "SHP-2026-037", form: "KS",  issued: "2026-05-05", status: "검토 중"   as CertStatus },
  { no: "QCR-2026-005", shipNo: "SHP-2026-028", form: "KS",  issued: "2026-04-20", status: "취소"     as CertStatus },
];

const STATUS_MAP: Record<CertStatus, { type: "running" | "idle" | "stopped" }> = {
  "발행 완료": { type: "running" },
  "검토 중":   { type: "idle"    },
  "취소":      { type: "stopped" },
};

export default function QCCertPage() {
  const latest = CERTS.find((c) => c.status === "발행 완료");

  return (
    <div className="p-8">
      <PageHeader title="품질·SPC /" accent="품질 성적서" nodeRef="SCR-QC-080" description="출하 성적서 발행·이력 관리" />

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 성적서 생성
        </button>
      </div>

      <section className="bg-surface-container-lowest mb-8">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            성적서 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(CERTS.length).padStart(3, "0")} Entries</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["성적서 번호", "출하 번호", "양식", "발행일", "상태"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {CERTS.map((c, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-xs tabular-nums text-primary-accent font-bold">{c.no}</td>
                  <td className="px-4 py-2 text-xs tabular-nums">{c.shipNo}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-0.5 text-xs font-label uppercase font-bold bg-surface-container-high text-on-surface/70">{c.form}</span>
                  </td>
                  <td className="px-4 py-2 text-xs tabular-nums">{c.issued}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={STATUS_MAP[c.status].type} label={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 성적서 레이아웃 미리보기 */}
      {latest && (
        <div className="border border-outline-variant/20 bg-surface-container-lowest p-6 max-w-2xl">
          <div className="border-b-2 border-primary-accent pb-4 mb-4 flex justify-between items-end">
            <div>
              <p className="font-headline font-black text-xl uppercase tracking-widest">품질 성적서</p>
              <p className="text-xs text-on-surface/40 mt-1 font-label uppercase tracking-widest">Quality Certificate · {latest.form} Form</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface/40 font-label">성적서 번호</p>
              <p className="font-headline font-bold text-sm text-primary-accent">{latest.no}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-xs text-on-surface/40 font-label uppercase tracking-widest mb-1">출하 번호</p>
              <p className="font-headline font-bold">{latest.shipNo}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface/40 font-label uppercase tracking-widest mb-1">발행일</p>
              <p className="font-headline font-bold tabular-nums">{latest.issued}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface/40 font-label uppercase tracking-widest mb-1">검사 항목</p>
              <p className="text-on-surface/60 text-xs">인장 강도 / 항복점 / 연신율 / 도막 두께</p>
            </div>
            <div>
              <p className="text-xs text-on-surface/40 font-label uppercase tracking-widest mb-1">판정</p>
              <StatusBadge type="running" label="합격" />
            </div>
          </div>
          <div className="border-t border-outline-variant/10 pt-3 flex justify-between items-center">
            <p className="text-xs text-on-surface/30 tabular-nums">{latest.issued}</p>
          </div>
        </div>
      )}
    </div>
  );
}
