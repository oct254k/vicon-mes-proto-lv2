"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const NINE_POINTS = [
  { code: "RECEIVE_INSPECT", label: "① 입고검사" },
  { code: "MFG_PROCESS", label: "② 생산공정" },
  { code: "SEMI_INSPECT", label: "③ 반제품검사" },
  { code: "TRANSFER_RECEIVE", label: "④ 이동입고" },
  { code: "ASSEMBLY", label: "⑤ 조립" },
  { code: "FINAL_INSPECT", label: "⑥ 최종검사" },
  { code: "STORAGE", label: "⑦ 보관" },
  { code: "SHIP_INSPECT", label: "⑧ 출하검사" },
  { code: "SITE_ARRIVAL", label: "⑨ 현장도착", warning: true },
];

const DEFECT_TYPES = ["가공", "조립", "표면", "규격", "외관", "기타"];
const RESPONSIBILITIES = ["공급사", "운송사", "작업자", "공장", "거래처", "다양"];
const DISPOSAL_METHODS = ["반품", "폐기재생산", "클레임재생산", "격리점검", "회수보상재생산"];

export default function QCDefectNewPage() {
  const [stage, setStage] = useState("");
  const [defectType, setDefectType] = useState("");
  const [responsibility, setResponsibility] = useState("작업자");
  const [disposal, setDisposal] = useState("폐기재생산");
  const [partCode, setPartCode] = useState("");
  const [qty, setQty] = useState("1");
  const [reason, setReason] = useState("");
  const [photoCount, setPhotoCount] = useState(0);

  const isValid = stage && defectType && partCode && reason && photoCount >= 1;

  return (
    <div>
      <PageHeader
        title="불량 신고"
        accent="등록"
        nodeRef="SCR-QC-030"
        status="PROTOTYPE"
        description="9시점 선택 + 사진 첨부 필수 (FR-QC-067)"
      />

      {/* A. 부재 정보 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="부재 / Lot 정보" moduleRef="FNC-QC-060" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">부재 코드 *</label>
            <input
              value={partCode}
              onChange={(e) => setPartCode(e.target.value)}
              placeholder="B01-1-G22C-C-171"
              className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">Lot No</label>
            <input
              placeholder="M-COIL-A-20260420-014"
              className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-1">수량 *</label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              min="1"
              className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface"
            />
          </div>
        </div>
      </div>

      {/* B. 9시점 선택 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="9시점 선택 (enum 강제)" moduleRef="FR-QC-050" />
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {NINE_POINTS.map((pt) => (
            <button
              key={pt.code}
              onClick={() => setStage(pt.code)}
              className={`px-3 py-3 text-xs font-label uppercase tracking-wide border transition-colors text-left ${
                stage === pt.code
                  ? pt.warning
                    ? "border-error bg-error/20 text-error"
                    : "border-primary-accent bg-primary-accent/10 text-primary-accent"
                  : "border-outline-variant/20 bg-surface-container-low text-on-surface/70 hover:border-primary-accent/50"
              }`}
            >
              {pt.label}
              {pt.warning && <span className="block text-[10px] mt-0.5 text-error/70">임원 즉시 통보</span>}
            </button>
          ))}
        </div>
        {stage === "SITE_ARRIVAL" && (
          <div className="mt-3 p-3 bg-error/10 border border-error/30 text-error text-xs font-label">
            ⚠ 시점 ⑨ — 임원 즉시 에스컬레이션 (다중 채널 ≤30초). 위험 확산 평가 자동 진입.
          </div>
        )}
      </div>

      {/* C. 불량 유형 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="불량 유형" moduleRef="FNC-QC-061" />
        <div className="flex flex-wrap gap-2">
          {DEFECT_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setDefectType(t)}
              className={`px-4 py-2 text-xs font-label uppercase tracking-wide border transition-colors ${
                defectType === t
                  ? "border-primary-accent bg-primary-accent/10 text-primary-accent"
                  : "border-outline-variant/20 bg-surface-container-low text-on-surface/70 hover:border-primary-accent/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* D. 책임·처리 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="책임 · 처리 방법 (자동 제안)" moduleRef="FNC-QC-051" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-2">책임 (6종)</label>
            <div className="space-y-1">
              {RESPONSIBILITIES.map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="responsibility"
                    value={r}
                    checked={responsibility === r}
                    onChange={() => setResponsibility(r)}
                    className="accent-[#00912F]"
                  />
                  <span className="text-sm font-body">{r}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest opacity-50 block mb-2">처리 방법 (5종)</label>
            <div className="space-y-1">
              {DISPOSAL_METHODS.map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="disposal"
                    value={m}
                    checked={disposal === m}
                    onChange={() => setDisposal(m)}
                    className="accent-[#00912F]"
                  />
                  <span className="text-sm font-body">{m}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* E. 사진 첨부 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-5">
        <FieldHeader title="사진 첨부 (최소 1장 필수)" moduleRef="FR-QC-067" />
        <div className="flex gap-3 items-center mb-3">
          <button
            onClick={() => setPhotoCount((c) => c + 1)}
            className="bg-surface-container-low border border-outline-variant/20 px-5 py-3 text-xs font-label uppercase tracking-widest hover:border-primary-accent/50 transition-colors"
          >
            카메라 촬영
          </button>
          <button
            onClick={() => setPhotoCount((c) => c + 1)}
            className="bg-surface-container-low border border-outline-variant/20 px-5 py-3 text-xs font-label uppercase tracking-widest hover:border-primary-accent/50 transition-colors"
          >
            갤러리 업로드
          </button>
          <span className="text-xs font-label opacity-50">{photoCount}장 첨부됨</span>
        </div>
        {photoCount === 0 && (
          <p className="text-xs text-error/70 font-label">사진 1장 이상 필수 (FR-QC-067)</p>
        )}
        <p className="text-xs opacity-40 font-label mt-1">GPS · 촬영 시각 · 단말 ID 자동 보존</p>
      </div>

      {/* F. 사유 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-5 mb-6">
        <FieldHeader title="불량 사유 *" />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value.slice(0, 200))}
          placeholder="불량 사유를 입력하세요 (최대 200자)"
          rows={3}
          className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface resize-none"
        />
        <p className="text-xs opacity-40 font-label text-right mt-1">{reason.length}/200</p>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          disabled={!isValid}
          className={`px-8 py-3 font-label uppercase tracking-widest text-sm transition-colors ${
            isValid
              ? "bg-primary-accent text-white hover:bg-primary-accent/80"
              : "bg-surface-container-low text-on-surface/30 cursor-not-allowed"
          }`}
        >
          신고 저장
        </button>
      </div>
    </div>
  );
}
