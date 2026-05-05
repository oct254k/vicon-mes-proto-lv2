"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

type LabelType = "MEMBER" | "PACKING" | "SLIPPER";

const LABEL_TYPES: { value: LabelType; label: string; desc: string }[] = [
  { value: "MEMBER",  label: "부재 라벨",   desc: "개별 부재 단위 — 바코드 + QR 포함" },
  { value: "PACKING", label: "패킹 라벨",   desc: "패킹 그룹 단위 — 묶음 식별 라벨" },
  { value: "SLIPPER", label: "슬리퍼 라벨", desc: "데크 슬리퍼 타입 13종 — KS 인증 게이트" },
];

const MEMBERS = ["B01-1-G22C-C-171", "B01-1-G22C-S-172", "B01-2-G22C-C-201"];
const PACKINGS = ["PKG-WO-P3000-20260506-0007-001", "PKG-WO-P3000-20260506-0007-002"];

export default function LabelPrintPage() {
  const [labelType, setLabelType] = useState<LabelType>("MEMBER");
  const [target, setTarget] = useState("");
  const [copies, setCopies] = useState(1);
  const [printing, setPrinting] = useState(false);
  const [done, setDone] = useState(false);

  const options = labelType === "PACKING" ? PACKINGS : MEMBERS;

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => { setPrinting(false); setDone(true); }, 1200);
  };

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="라벨" accent="발행" nodeRef="SCR-WO-030" description="부재·패킹·슬리퍼 라벨 발행 폼 — KS 인증 게이트 포함. FNC-WO-010,012,019" />

      <div className="grid grid-cols-3 gap-3 mb-8">
        {LABEL_TYPES.map((lt) => (
          <button key={lt.value} onClick={() => { setLabelType(lt.value); setTarget(""); setDone(false); }}
            className={`p-4 text-left border-l-4 transition-colors
              ${labelType === lt.value ? "border-primary-accent bg-surface-container" : "border-outline-variant/20 bg-surface-container-lowest hover:bg-surface-container"}`}>
            <p className="font-headline font-black text-sm uppercase tracking-tight mb-1">{lt.label}</p>
            <p className="text-xs opacity-50 font-label">{lt.desc}</p>
          </button>
        ))}
      </div>

      {done ? (
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-6 mb-6">
          <p className="font-headline font-black text-sm uppercase tracking-widest text-primary-accent">발행 완료</p>
          <p className="text-xs opacity-70 mt-1">{target} — {copies}매 발행 처리됨. 발행 이력에 자동 기록되었습니다.</p>
          <button onClick={() => setDone(false)} className="mt-4 px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">추가 발행</button>
        </div>
      ) : (
        <div className="max-w-xl bg-surface-container-lowest p-6 space-y-5">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">
              {labelType === "PACKING" ? "패킹 ID" : "부재 코드"} *
            </label>
            <select value={target} onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none">
              <option value="">선택하세요</option>
              {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-1">발행 매수</label>
            <input type="number" value={copies} onChange={(e) => setCopies(Number(e.target.value))} min={1} max={10}
              className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none" />
          </div>

          {labelType === "SLIPPER" && (
            <div className="bg-[#f59e0b]/10 border-l-2 border-[#f59e0b] p-3">
              <p className="text-xs font-label uppercase tracking-widest text-[#f59e0b]">KS 인증 확인 필요 — 미인증 시 BLOCKED 표시</p>
            </div>
          )}

          <button onClick={handlePrint} disabled={!target || printing}
            className="px-6 py-3 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-40">
            {printing ? "발행 중..." : "라벨 발행"}
          </button>
        </div>
      )}
    </main>
  );
}
