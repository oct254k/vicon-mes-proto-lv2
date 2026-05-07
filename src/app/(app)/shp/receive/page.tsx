"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const PACKING_LIST = [
  { packId: "PKG-20260506-0001", memberCount: 8, checked: false },
  { packId: "PKG-20260506-0002", memberCount: 12, checked: false },
  { packId: "PKG-20260506-0003", memberCount: 5, checked: false },
];

const DEFECT_REASONS = [
  "파손 (외관 손상)",
  "치수 불량",
  "수량 부족",
  "마킹 오류",
  "기타",
];

export default function SHPReceivePage() {
  const [deliveryNo, setDeliveryNo] = useState("");
  const [packs, setPacks] = useState(PACKING_LIST);
  const [defects, setDefects] = useState<string[]>([]);
  const [signed, setSigned] = useState(false);
  const [done, setDone] = useState(false);

  function toggleCheck(i: number) {
    setPacks((prev) => prev.map((p, idx) => idx === i ? { ...p, checked: !p.checked } : p));
  }

  function toggleDefect(reason: string) {
    setDefects((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  }

  const allChecked = packs.every((p) => p.checked);

  return (
    <div className="max-w-sm mx-auto px-4 py-8">
      <PageHeader
        title="현장 검수"
        accent="PDA"
        nodeRef="SCR-SHP-007"
        status="PROTOTYPE"
      />

      {/* 배송 번호 입력 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">배송 번호</p>
        <input
          type="text"
          value={deliveryNo}
          onChange={(e) => setDeliveryNo(e.target.value)}
          placeholder="배송 번호 입력"
          className="w-full bg-surface-container text-white text-sm px-4 py-3 border border-outline-variant/20 outline-none placeholder:opacity-40"
        />
      </div>

      {/* 패킹 목록 체크 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">패킹 목록 확인</p>
        <div className="space-y-2">
          {packs.map((pkg, i) => (
            <button
              key={pkg.packId}
              onClick={() => toggleCheck(i)}
              className={`w-full flex items-center justify-between px-3 py-3 border transition-colors text-left ${
                pkg.checked
                  ? "border-primary-accent bg-primary-accent/10"
                  : "border-outline-variant/20 bg-surface-container"
              }`}
            >
              <span className="text-xs font-mono">{pkg.packId}</span>
              <span className="text-xs opacity-60">{pkg.memberCount} 부재</span>
              <span className={`text-lg font-bold ${pkg.checked ? "text-primary-accent" : "text-on-surface/20"}`}>
                {pkg.checked ? "✓" : "○"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 불량 신고 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">불량 신고 (해당 시 선택)</p>
        <div className="space-y-2">
          {DEFECT_REASONS.map((reason) => (
            <button
              key={reason}
              onClick={() => toggleDefect(reason)}
              className={`w-full text-left px-3 py-2 text-sm border transition-colors ${
                defects.includes(reason)
                  ? "border-error bg-error/10 text-error"
                  : "border-outline-variant/20 bg-surface-container"
              }`}
            >
              {defects.includes(reason) ? "☑ " : "☐ "}{reason}
            </button>
          ))}
        </div>
      </div>

      {/* 서명란 */}
      <div className="bg-surface-container-lowest p-4 mb-4">
        <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">서명란</p>
        <div
          onClick={() => setSigned(true)}
          className={`h-24 border border-dashed flex items-center justify-center cursor-pointer transition-colors ${
            signed
              ? "border-primary-accent bg-primary-accent/5"
              : "border-outline-variant/30 hover:border-outline-variant/60"
          }`}
        >
          {signed ? (
            <span className="text-primary-accent font-label text-xs uppercase tracking-widest">서명 완료</span>
          ) : (
            <span className="opacity-30 text-xs font-label uppercase tracking-widest">터치하여 서명</span>
          )}
        </div>
      </div>

      {/* 검수 완료 버튼 */}
      <button
        onClick={() => setDone(true)}
        disabled={!allChecked || !signed || !deliveryNo}
        className={`w-full py-4 text-sm font-label uppercase tracking-widest font-bold transition-colors ${
          done
            ? "bg-surface-container-highest text-on-surface/50"
            : "bg-primary-accent text-white hover:bg-primary-accent/90"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {done ? "검수 완료됨" : "검수 완료"}
      </button>
    </div>
  );
}
