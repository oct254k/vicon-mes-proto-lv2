"use client";

import { useEffect, useState } from "react";

const GLOSSARY = [
  { term: "MES", korean: "제조실행시스템", definition: "공장의 생산 활동을 계획부터 완료까지 실시간으로 관리하는 시스템" },
  { term: "BOM", korean: "자재명세서", definition: "제품을 구성하는 모든 부품과 원자재의 목록. 단계별(다단계) BOM으로 관리됨" },
  { term: "라우팅 (Routing)", korean: "공정순서", definition: "제품 생산에 필요한 공정의 순서, 설비, 표준시간을 정의한 작업 계획" },
  { term: "LOT", korean: "로트", definition: "동일 조건에서 생산된 제품의 묶음 단위. 이력추적의 기본 단위" },
  { term: "WO", korean: "작업지시 (Work Order)", definition: "생산 계획에 따라 발행되는 작업 지시서. 생산 수량, 공정, 일정 포함" },
  { term: "OEE", korean: "설비종합효율", definition: "설비 가용성 × 성능 × 품질의 곱. 설비 전체 효율을 나타내는 지표" },
  { term: "MTBF", korean: "평균고장간격", definition: "설비 고장 사이의 평균 가동 시간 (Mean Time Between Failures)" },
  { term: "MTTR", korean: "평균수리시간", definition: "설비 고장 발생 후 수리 완료까지의 평균 소요 시간" },
  { term: "SPC", korean: "통계적 공정관리", definition: "통계 기법으로 공정 변동을 감시하고 품질을 보장하는 방법" },
  { term: "MRP", korean: "자재소요계획", definition: "생산 계획 기반으로 필요 자재의 양과 시기를 계산하는 시스템 (Material Requirements Planning)" },
  { term: "ASN", korean: "사전출하통보", definition: "공급업체가 출하 전 미리 발송하는 출하 정보 (Advanced Shipping Notice)" },
  { term: "PO", korean: "구매발주 (Purchase Order)", definition: "공급업체에 보내는 공식 구매 주문서" },
  { term: "PR", korean: "구매요청 (Purchase Requisition)", definition: "자재·서비스 구매를 위해 내부적으로 올리는 요청서" },
  { term: "PDM", korean: "예측정비", definition: "설비 상태를 모니터링하여 고장 전에 정비하는 방식 (Predictive Maintenance)" },
  { term: "PM", korean: "예방정비", definition: "고장 발생 전에 주기적으로 실시하는 정비 (Preventive Maintenance)" },
  { term: "BM", korean: "사후정비", definition: "고장 발생 후 실시하는 수리 정비 (Breakdown Maintenance)" },
  { term: "KS", korean: "한국산업규격", definition: "산업통상자원부 장관이 제정한 대한민국 국가표준. KS 라벨은 해당 규격 적합 인증을 의미" },
  { term: "RBAC", korean: "역할기반접근제어", definition: "사용자 역할에 따라 시스템 접근 권한을 제어하는 방식 (Role-Based Access Control)" },
  { term: "부적합", korean: "불량/비적합", definition: "품질 기준을 충족하지 못하는 제품이나 공정 상태" },
  { term: "성적서", korean: "품질성적서", definition: "제품이 품질 기준을 충족함을 증명하는 공식 문서" },
  { term: "SO", korean: "수주 (Sales Order)", definition: "고객의 주문을 접수하여 생산 계획으로 연결하는 판매 주문" },
  { term: "트레이서빌리티", korean: "이력추적", definition: "원자재부터 완제품까지 전 생산 과정을 LOT 단위로 추적하는 기능" },
  { term: "야적장 (Yard)", korean: "야외 적재 장소", definition: "완성 제품을 출하 전 야외에 보관하는 구역" },
  { term: "TG기", korean: "TG 장비", definition: "데크 생산 공정에서 사용하는 특수 성형 장비" },
  { term: "슬리퍼", korean: "철도 침목", definition: "철도 레일을 지지·고정하는 콘크리트 구조물. 이 시스템의 주요 생산 제품 중 하나" },
];

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = GLOSSARY.filter(({ term, korean, definition }) => {
    const q = query.toLowerCase();
    return (
      term.toLowerCase().includes(q) ||
      korean.toLowerCase().includes(q) ||
      definition.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest border border-outline-variant/20 w-full max-w-lg max-h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20">
          <span className="font-headline font-bold text-sm text-on-surface">MES 용어사전</span>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-on-surface hover:text-primary-accent leading-none"
            aria-label="닫기"
          >
            close
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2 bg-surface-container border border-outline-variant/20 px-3 py-2">
            <span className="material-symbols-outlined text-on-surface/60 text-base leading-none">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="용어 검색..."
              className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Term list */}
        <div className="overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-on-surface/50">
              검색 결과가 없습니다.
            </div>
          ) : (
            filtered.map(({ term, korean, definition }) => (
              <div
                key={term}
                className="px-4 py-3 border-b border-outline last:border-b-0 hover:bg-surface-container/50 transition-colors"
              >
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-headline font-bold text-sm text-on-surface">{term}</span>
                  <span className="font-label text-xs text-primary-accent">{korean}</span>
                </div>
                <p className="text-xs text-on-surface/60 leading-relaxed">{definition}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
