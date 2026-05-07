"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK_DETAIL = {
  id: "D-2026-0042",
  status: "CONFIRMED" as const,
  stage: "② 생산공정",
  memberId: "B01-1-G22C-C-171",
  attemptNo: 1,
  lotNo: "M-COIL-A-20260420-014",
  wc: "WC-신선-01",
  step: 10,
  equipmentId: "EQ-P3000-신선-01",
  defectType: "가공",
  reasonText: "신선 가공 길이 -2mm 단축 — 인발기 다이스 마모 의심",
  reportedAt: "2026-05-06T08:21:00+09:00",
  reporter: "kim.worker",
};

const TRANSACTIONS = [
  { code: "DEFECT", label: "DEFECT", subLabel: "격리 보관", desc: "불량품 격리 후 추가 조치 없음 (사유 필수)", color: "border-[#f59e0b] bg-[#f59e0b]" },
  { code: "SCRAP", label: "SCRAP", subLabel: "폐기", desc: "재고 차감·손실 환산 → 공장장 최종 결재", color: "border-error bg-error" },
  { code: "CLAIM", label: "CLAIM", subLabel: "클레임", desc: "공급사·운송사 통보 발행", color: "border-[#3b82f6] bg-[#3b82f6]" },
  { code: "RETURN", label: "RETURN", subLabel: "반품", desc: "Y-DEFECT 격리 입고 처리", color: "border-primary-accent bg-primary-accent" },
];

const RESPONSIBILITIES = ["공급사", "운송사", "작업자", "공장", "거래처", "다양"];
const DISPOSAL_METHODS = ["반품", "폐기재생산", "클레임재생산", "격리점검", "회수보상재생산"];

export default function DefectDetailClient({ id }: { id: string }) {
  const [selectedTx, setSelectedTx] = useState<string | null>(null);
  const [responsibility, setResponsibility] = useState("작업자");
  const [disposal, setDisposal] = useState("폐기재생산");
  const d = MOCK_DETAIL;

  return (
    <div>
      <PageHeader
        title="불량 상세"
        accent={id ?? d.id}
        nodeRef="SCR-QC-041"
        status="PROTOTYPE"
        description="불량 상세 확인 + 4트랜잭션 처리 선택 (CONFIRMED → DISPOSED)"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="불량 기본 정보" moduleRef="SCR-QC-040" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: "신고번호", value: d.id },
            { label: "상태", value: null },
            { label: "시점", value: d.stage },
            { label: "불량 유형", value: d.defectType },
            { label: "부재 코드", value: d.memberId },
            { label: "Lot No", value: d.lotNo },
            { label: "Attempt", value: String(d.attemptNo) },
            { label: "공정", value: `${d.wc} / Step ${d.step}` },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{item.label}</p>
              {item.value === null ? (
                <StatusBadge type="running" label="확정" />
              ) : (
                <p className="font-headline font-bold text-sm tabular-nums">{item.value}</p>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-outline-variant/10 pt-4">
          <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">불량 사유</p>
          <p className="text-sm font-body text-on-surface/80">{d.reasonText}</p>
        </div>
        <div className="mt-3">
          <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">신고 정보</p>
          <p className="text-xs font-body text-on-surface/50">{d.reporter} · {d.reportedAt} · {d.equipmentId}</p>
        </div>
      </div>

      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="4트랜잭션 처리 선택" moduleRef="FNC-QC-065" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
          {TRANSACTIONS.map((tx) => (
            <button
              key={tx.code}
              onClick={() => setSelectedTx(tx.code)}
              className={`p-4 border-2 text-left transition-all ${
                selectedTx === tx.code
                  ? `${tx.color}/20 ${tx.color.replace("bg-", "border-")}`
                  : "border-outline-variant/20 bg-surface-container-low hover:border-outline-variant/40"
              }`}
            >
              <div className={`inline-block px-2 py-0.5 text-xs font-label font-bold mb-2 ${
                selectedTx === tx.code ? `${tx.color}/30 text-on-surface` : "bg-surface-container text-on-surface/50"
              }`}>
                {tx.label}
              </div>
              <p className="font-headline font-bold text-sm mb-1">{tx.subLabel}</p>
              <p className="text-xs text-on-surface/50 font-body leading-relaxed">{tx.desc}</p>
            </button>
          ))}
        </div>
        {selectedTx && (
          <p className="text-xs font-label text-primary-accent mt-2">
            선택: {selectedTx} — 처리 신청 전 아래 책임·처리 방법을 확인하세요.
          </p>
        )}
      </div>

      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="책임 후보 · 처리 방법 확정" moduleRef="FNC-QC-051" />
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-3">책임 (6종)</p>
            <div className="space-y-2">
              {RESPONSIBILITIES.map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="responsibility" value={r}
                    checked={responsibility === r} onChange={() => setResponsibility(r)}
                    className="accent-[#00912F]" />
                  <span className="text-sm font-body">{r}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-3">처리 방법 (5종)</p>
            <div className="space-y-2">
              {DISPOSAL_METHODS.map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="disposal" value={m}
                    checked={disposal === m} onChange={() => setDisposal(m)}
                    className="accent-[#00912F]" />
                  <span className="text-sm font-body">{m}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-on-surface/40 font-label">
          {selectedTx ? `트랜잭션: ${selectedTx} · 책임: ${responsibility} · 처리: ${disposal}` : "트랜잭션을 선택하세요"}
        </p>
        <button
          disabled={!selectedTx}
          className={`px-8 py-3 font-label uppercase tracking-widest text-sm transition-colors ${
            selectedTx
              ? "bg-primary-accent text-white hover:bg-primary-accent/80"
              : "bg-surface-container-low text-on-surface/30 cursor-not-allowed"
          }`}
        >
          처리 신청 → DISPOSED
        </button>
      </div>
    </div>
  );
}
