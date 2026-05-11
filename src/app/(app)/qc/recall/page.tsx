"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const RECALL_STEPS = ["DRAFT", "REVIEWED", "CONFIRMED", "NOTIFIED", "CLOSED"] as const;
type RecallStep = typeof RECALL_STEPS[number];

function stepBadgeType(step: RecallStep, current: RecallStep): "running" | "idle" | "warning" {
  const ci = RECALL_STEPS.indexOf(current);
  const si = RECALL_STEPS.indexOf(step);
  if (si < ci) return "idle";
  if (si === ci) return "running";
  return "warning";
}

const MOCK_PARTS = [
  { code: "BM-2026-0441", desc: "주형재 강판 9T", qty: 3 },
  { code: "BM-2026-0442", desc: "보조재 플랜지 12T", qty: 5 },
  { code: "BM-2026-0443", desc: "연결재 앵글 6T", qty: 4 },
  { code: "BM-2026-0444", desc: "보강재 채널 8T", qty: 2 },
  { code: "BM-2026-0445", desc: "기둥재 H형강 16T", qty: 3 },
];

export default function QCRecallPage() {
  const [step, setStep] = useState<RecallStep>("DRAFT");
  const [reviewNote, setReviewNote] = useState("");
  const [channel, setChannel] = useState("EMAIL");

  const stepIndex = RECALL_STEPS.indexOf(step);

  function advance() {
    if (stepIndex < RECALL_STEPS.length - 1) setStep(RECALL_STEPS[stepIndex + 1]);
  }

  return (
    <div>
      <PageHeader
        title="불량품 회수 처리"
        accent="RECALL"
        nodeRef="IA-QC-RECALL-WORKFLOW"
        status="PROTOTYPE"
        description="불량 LOT 회수 5단계 워크플로 — RECALL-2026-0003"
      />

      {/* Stepper */}
      <div className="flex items-center mb-8 overflow-x-auto gap-0">
        {RECALL_STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <button
              onClick={() => setStep(s)}
              className={`flex flex-col items-center px-5 py-3 text-xs font-label uppercase tracking-widest transition-colors
                ${s === step ? "bg-primary-accent text-black font-bold" : i < stepIndex ? "bg-surface-container text-primary-accent/60" : "bg-surface-container-lowest text-on-surface/30"}`}
            >
              <span className={`text-base font-black mb-0.5 ${s === step ? "text-black" : i < stepIndex ? "text-primary-accent/60" : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </button>
            {i < RECALL_STEPS.length - 1 && (
              <span className={`text-xl px-1 select-none ${i < stepIndex ? "text-primary-accent/50" : "text-on-surface/10"}`}>›</span>
            )}
          </div>
        ))}
      </div>

      {/* DRAFT */}
      {step === "DRAFT" && (
        <div>
          <FieldHeader title="회수 대상 부재 목록" moduleRef="RECALL-2026-0003 · 17개 부재" />
          <div className="bg-surface-container-lowest mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/10">
                  {["부재 코드", "품명", "수량(개)", "불량 사유"].map(h => (
                    <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-headline text-sm">
                {MOCK_PARTS.map(p => (
                  <tr key={p.code} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                    <td className="px-4 py-2 text-primary-accent font-bold">{p.code}</td>
                    <td className="px-4 py-2">{p.desc}</td>
                    <td className="px-4 py-2 tabular-nums">{p.qty}</td>
                    <td className="px-4 py-2 text-on-surface/60">치수 불량 (용접부 균열)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">초안 비고</p>
            <textarea className="w-full bg-surface-container-high text-sm text-on-surface p-2 border border-outline-variant/20 font-body resize-none" rows={3} placeholder="초안 작성 시 비고 내용..." />
          </div>
        </div>
      )}

      {/* REVIEWED */}
      {step === "REVIEWED" && (
        <div>
          <FieldHeader title="리뷰어 의견" moduleRef="QC-MANAGER 검토" />
          <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">검토 의견</p>
            <textarea
              value={reviewNote}
              onChange={e => setReviewNote(e.target.value)}
              className="w-full bg-surface-container-high text-sm text-on-surface p-2 border border-outline-variant/20 font-body resize-none"
              rows={4}
              placeholder="리뷰어 의견을 입력하세요..."
            />
          </div>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm font-label cursor-pointer">
              <input type="radio" name="review" defaultChecked className="accent-primary-accent" /> 승인
            </label>
            <label className="flex items-center gap-2 text-sm font-label cursor-pointer">
              <input type="radio" name="review" className="accent-primary-accent" /> 반려
            </label>
          </div>
        </div>
      )}

      {/* CONFIRMED */}
      {step === "CONFIRMED" && (
        <div>
          <FieldHeader title="최종 확정 및 통보 대상" moduleRef="담당 팀장 확정" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {["생산팀 팀장", "품질보증팀", "자재관리팀", "고객사 QC 담당"].map(t => (
              <div key={t} className="bg-surface-container flex items-center justify-between p-3 border border-outline-variant/10">
                <span className="text-sm font-label">{t}</span>
                <StatusBadge type="running" label="통보 대상" />
              </div>
            ))}
          </div>
          <div className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">확정 코멘트</p>
            <textarea className="w-full bg-surface-container-high text-sm text-on-surface p-2 border border-outline-variant/20 font-body resize-none" rows={3} placeholder="최종 확정 코멘트..." />
          </div>
        </div>
      )}

      {/* NOTIFIED */}
      {step === "NOTIFIED" && (
        <div>
          <FieldHeader title="발송 채널 및 메시지" moduleRef="알림 발송 확인" />
          <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">발송 채널</p>
            <div className="flex gap-4 mb-4">
              {["EMAIL", "SMS", "SYSTEM"].map(c => (
                <label key={c} className="flex items-center gap-2 text-sm font-label cursor-pointer">
                  <input type="radio" name="channel" value={c} checked={channel === c} onChange={() => setChannel(c)} className="accent-primary-accent" />
                  {c}
                </label>
              ))}
            </div>
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">발송 메시지 미리보기</p>
            <div className="bg-surface-container-high text-sm font-body p-3 border border-outline-variant/10 text-on-surface/70 leading-relaxed">
              [RECALL-2026-0003] 불량 부재 회수 통보<br />
              대상: BM-2026-0441 외 16건 / 총 17개 부재<br />
              사유: 용접부 균열 치수 불량<br />
              조치: 즉시 격리 후 품질팀 확인 요망
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge type="running" label="발송 완료" />
            <span className="text-xs opacity-50 font-label">2026-05-05 14:32 KST</span>
          </div>
        </div>
      )}

      {/* CLOSED */}
      {step === "CLOSED" && (
        <div>
          <FieldHeader title="종결 보고서" moduleRef="RECALL-2026-0003 CLOSED" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "회수 완료", value: "17 / 17", unit: "개" },
              { label: "격리 처리", value: "17", unit: "개" },
              { label: "처리 기간", value: "3", unit: "일" },
              { label: "재발 방지", value: "완료", unit: "" },
            ].map(k => (
              <div key={k.label} className="bg-surface-container-low p-4 border-l-2 border-primary-accent">
                <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">{k.label}</p>
                <p className="font-headline font-black text-xl text-primary-accent tabular-nums">{k.value}<span className="text-xs ml-1 text-on-surface/60">{k.unit}</span></p>
              </div>
            ))}
          </div>
          <div className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-2">종결 의견</p>
            <p className="text-sm font-body text-on-surface/70 leading-relaxed">
              RECALL-2026-0003 건은 2026-05-05 기준 전량 회수·격리 완료되었음. 원인: 용접 공정 파라미터 이탈. 재발 방지 조치: 용접 온도·속도 자동 모니터링 임계값 강화.
            </p>
          </div>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="mt-8 flex gap-3">
        {stepIndex < RECALL_STEPS.length - 1 && (
          <button onClick={advance} className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">
            다음 단계로 진행 ({RECALL_STEPS[stepIndex + 1]})
          </button>
        )}
        {step === "CLOSED" && <StatusBadge type="idle" label="종결 완료" />}
        <button className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest border border-outline-variant/20">저장</button>
      </div>
    </div>
  );
}
