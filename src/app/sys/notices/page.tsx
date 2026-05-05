"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK = [
  { id: "NTC-001", title: "2026년 정기 점검 안내", target: "전사", priority: "HIGH", postedAt: "2026-05-01", expiresAt: "2026-05-10", status: "PUBLISHED" },
  { id: "NTC-002", title: "P2000 라인 일시 정지 공지", target: "공장", priority: "URGENT", postedAt: "2026-05-03", expiresAt: "2026-05-06", status: "PUBLISHED" },
  { id: "NTC-003", title: "코드 마스터 업데이트 예고", target: "부서", priority: "NORMAL", postedAt: "2026-04-28", expiresAt: "2026-05-05", status: "EXPIRED" },
  { id: "NTC-004", title: "신규 QC 절차 적용 안내", target: "전사", priority: "NORMAL", postedAt: "2026-05-05", expiresAt: "2026-05-20", status: "DRAFT" },
  { id: "NTC-005", title: "시스템 점검 창 변경 안내", target: "전사", priority: "HIGH", postedAt: "2026-05-04", expiresAt: "2026-05-15", status: "PUBLISHED" },
];

const statusBadge = (s: string) => {
  if (s === "PUBLISHED") return <span className="px-2 py-0.5 text-xs font-label uppercase tracking-wider bg-[#00912F]/20 text-[#00912F]">PUBLISHED</span>;
  if (s === "EXPIRED") return <span className="px-2 py-0.5 text-xs font-label uppercase tracking-wider opacity-40 bg-surface-container-high text-on-surface">EXPIRED</span>;
  return <span className="px-2 py-0.5 text-xs font-label uppercase tracking-wider bg-[#f59e0b]/20 text-[#f59e0b]">DRAFT</span>;
};

const priorityColor: Record<string, string> = {
  URGENT: "text-error font-bold",
  HIGH: "text-[#f59e0b]",
  NORMAL: "text-on-surface-variant",
};

export default function SYSNoticesPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", target: "전사", priority: "NORMAL", expiresAt: "" });

  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="공지사항" accent="관리" nodeRef="SCR-SYS-010" description="전사·공장·부서 대상 공지 게시 및 상태 관리" />

      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-50">총 {MOCK.length}건</span>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white hover:bg-[#00912F]/80 transition-colors"
        >
          + 신규 공지
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-surface-container border border-outline-variant/20">
          <p className="text-xs font-label uppercase tracking-widest text-primary-accent mb-3">신규 공지 작성</p>
          <div className="grid grid-cols-12 gap-3">
            <input className="col-span-6 bg-surface-container-high px-3 py-2 text-sm outline-none border border-outline-variant/20 text-on-surface" placeholder="제목" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
            <select className="col-span-2 bg-surface-container-high px-3 py-2 text-sm outline-none border border-outline-variant/20 text-on-surface" value={formData.target} onChange={e => setFormData({ ...formData, target: e.target.value })}>
              <option>전사</option><option>공장</option><option>부서</option>
            </select>
            <select className="col-span-2 bg-surface-container-high px-3 py-2 text-sm outline-none border border-outline-variant/20 text-on-surface" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
              <option>URGENT</option><option>HIGH</option><option>NORMAL</option>
            </select>
            <input type="date" className="col-span-2 bg-surface-container-high px-3 py-2 text-sm outline-none border border-outline-variant/20 text-on-surface" value={formData.expiresAt} onChange={e => setFormData({ ...formData, expiresAt: e.target.value })} />
          </div>
          <div className="flex gap-2 mt-3">
            <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">저장</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface-variant">취소</button>
          </div>
        </div>
      )}

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">공지 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["ID", "제목", "대상", "우선순위", "게시일", "만료일", "상태"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {MOCK.map(row => (
                <tr key={row.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 opacity-40 text-xs">{row.id}</td>
                  <td className="px-4 py-2">{row.title}</td>
                  <td className="px-4 py-2 text-on-surface-variant">{row.target}</td>
                  <td className={`px-4 py-2 text-xs ${priorityColor[row.priority] || ""}`}>{row.priority}</td>
                  <td className="px-4 py-2 tabular-nums text-on-surface-variant">{row.postedAt}</td>
                  <td className="px-4 py-2 tabular-nums text-on-surface-variant">{row.expiresAt}</td>
                  <td className="px-4 py-2">{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
