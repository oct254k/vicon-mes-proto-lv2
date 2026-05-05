"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const historyColumns = [
  { key: "date", label: "일시" },
  { key: "matCode", label: "Material" },
  { key: "reason", label: "보정 이유" },
  { key: "before", label: "보정 전" },
  { key: "after", label: "보정 후" },
  { key: "location", label: "위치" },
  { key: "status", label: "상태" },
];

const historyData = [
  { date: "2026-05-04 14:22", matCode: "M-COIL-A", reason: "실사차이", before: "950m", after: "900m", location: "Z-01-03", status: "완료" },
  { date: "2026-05-03 09:10", matCode: "M-BOLT-M16", reason: "손상", before: "5,800EA", after: "5,600EA", location: "W-02-01", status: "완료" },
  { date: "2026-05-02 16:40", matCode: "M-PAINT-G", reason: "기타", before: "200L", after: "180L", location: "W-01-05", status: "결재중" },
];

export default function LOCAdjustPage() {
  const [reason, setReason] = useState("");
  const [matCode, setMatCode] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div>
      <PageHeader
        title="재고 보정"
        accent="ADJUST"
        nodeRef="SCR-LOC-063"
        status="PROTOTYPE"
        description="실사차이·손상·기타 사유에 의한 재고 수량 보정 신청 및 이력 관리."
      />

      <FieldHeader title="보정 신청" moduleRef="SCR-LOC-063" />
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 mb-8 space-y-5 max-w-lg">
        <div>
          <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">보정 이유</label>
          <div className="flex gap-3">
            {["실사차이", "손상", "기타"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setReason(r)}
                className={`px-4 py-2 text-xs font-label uppercase tracking-widest border transition-colors ${
                  reason === r
                    ? "border-[#00912F] bg-[#00912F]/20 text-[#00912F]"
                    : "border-white/10 text-white/50 hover:border-white/30"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">Material 코드</label>
          <input
            value={matCode}
            onChange={(e) => setMatCode(e.target.value)}
            className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
            placeholder="M-COIL-A"
          />
        </div>
        <div>
          <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">보정 수량</label>
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
            placeholder="+50 또는 -50"
          />
        </div>
        <div>
          <label className="block text-xs font-label uppercase tracking-widest text-white/50 mb-2">위치 선택</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"
          >
            <option value="">선택</option>
            <option>Z-01-01</option>
            <option>Z-01-02</option>
            <option>Z-01-03</option>
            <option>W-01-01</option>
            <option>W-02-01</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:bg-[#00912F]/80 transition-colors"
        >
          보정 신청
        </button>
        {submitted && (
          <div className="flex items-center gap-2">
            <StatusBadge type="warning" label="결재 대기" />
            <span className="text-xs text-white/50 font-label">승인 대기 중입니다.</span>
          </div>
        )}
      </form>

      <FieldHeader title="최근 보정 이력" moduleRef="SCR-LOC-063" />
      <DataTable
        title="보정 이력"
        columns={historyColumns}
        data={historyData}
        bufferCount={historyData.length}
      />
    </div>
  );
}
