"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const PLANTS = ["EXT-P4000 (협력사A)", "EXT-P4100 (협력사B)", "EXT-P4200 (협력사C)"];
const MEMBERS = ["B01-1-G22C-C-171", "B01-2-G22C-C-201", "B02-1-T18B-C-101"];

export default function ExternalWoPage() {
  const [plant, setPlant] = useState("");
  const [member, setMember] = useState("");
  const [qty, setQty] = useState("");
  const [dueDate, setDueDate] = useState("2026-05-20");
  const [token, setToken] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="외주 Plant" accent="WO 발행" nodeRef="SCR-WO-005" description="외주 Plant에 작업지시를 발행합니다. EXTERNAL 토큰 + EAI 통보 — FNC-WO-007" />

      {sent ? (
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-6 mb-6">
          <p className="font-headline font-black text-sm uppercase tracking-widest text-primary-accent">발행 완료</p>
          <p className="text-xs opacity-70 mt-1">외주 WO가 {plant}에 발행되었습니다. EAI 통보 처리 중.</p>
          <button onClick={() => setSent(false)} className="mt-4 px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
            추가 발행
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl bg-surface-container-lowest p-6 space-y-5">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">외주 Plant *</label>
            <select value={plant} onChange={(e) => setPlant(e.target.value)}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none">
              <option value="">선택하세요</option>
              {PLANTS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">부재 코드 *</label>
            <select value={member} onChange={(e) => setMember(e.target.value)}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none">
              <option value="">선택하세요</option>
              {MEMBERS.map((m) => <option key={m} value={m}>{m}</option>)}
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
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">EXTERNAL 토큰</label>
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="EXT-TOKEN-XXXX"
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline font-mono border border-outline-variant/20 focus:border-primary-accent focus:outline-none" />
          </div>

          <div className="bg-surface-container p-3 border-l-2 border-[#f59e0b]">
            <p className="text-xs font-label opacity-60 uppercase tracking-widest">EAI 통보: 발행 즉시 외주처에 자동 전송됩니다.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="px-6 py-3 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
              외주 WO 발행
            </button>
            <a href="/wo/orders" className="px-4 py-3 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">취소</a>
          </div>
        </form>
      )}
    </main>
  );
}
