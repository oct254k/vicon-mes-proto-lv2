"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const SO_OPTIONS = ["SO-2026-0042", "SO-2026-0041", "SO-2026-0040"];
const MEMBER_OPTIONS: Record<string, string[]> = {
  "SO-2026-0042": ["B01-1-G22C-C-171", "B01-1-G22C-S-172", "B01-2-G22C-C-201"],
  "SO-2026-0041": ["B02-1-T18B-C-101", "B02-1-T18B-S-102"],
  "SO-2026-0040": ["B03-1-G22C-C-301"],
};

export default function DailyPlanNewPage() {
  const [so, setSo] = useState("");
  const [member, setMember] = useState("");
  const [qty, setQty] = useState("");
  const [dueDate, setDueDate] = useState("2026-05-07");
  const [priority, setPriority] = useState("NORMAL");
  const [saved, setSaved] = useState(false);

  const members = so ? (MEMBER_OPTIONS[so] ?? []) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="일일 계획" accent="신규 입력" nodeRef="SCR-SP-023" description="계획 항목 수동 입력 — SO·부재·수량·납기를 지정합니다." />

      {saved ? (
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-6 mb-6">
          <p className="font-headline font-black text-sm uppercase tracking-widest text-primary-accent">저장 완료</p>
          <p className="text-xs opacity-70 mt-1">일일 계획 항목이 Draft 상태로 등록되었습니다.</p>
          <div className="flex gap-3 mt-4">
            <a href="/sp/plan/daily" className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">보드로 이동</a>
            <button onClick={() => setSaved(false)} className="px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest">추가 입력</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl bg-surface-container-lowest p-6 space-y-5">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">수주 ID *</label>
            <select value={so} onChange={(e) => { setSo(e.target.value); setMember(""); }}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none">
              <option value="">선택하세요</option>
              {SO_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">부재 코드 *</label>
            <select value={member} onChange={(e) => setMember(e.target.value)}
              disabled={!so}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none disabled:opacity-40">
              <option value="">선택하세요</option>
              {members.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">수량 *</label>
            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} min={1}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none" />
          </div>

          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">납기일 *</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none" />
          </div>

          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">우선순위</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none">
              <option value="HIGH">HIGH</option>
              <option value="NORMAL">NORMAL</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="px-6 py-3 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
              저장 (Draft)
            </button>
            <a href="/sp/plan/daily" className="px-4 py-3 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">취소</a>
          </div>
        </form>
      )}
    </main>
  );
}
