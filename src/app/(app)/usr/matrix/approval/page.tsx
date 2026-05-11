"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const DIFF = [
  { cell: "L2 / WHS / DELETE", before: "-", after: "W", impact: "창고 삭제 권한 신규 부여 — 27명 영향" },
  { cell: "L1 / PRD / CREATE", before: "-", after: "W", impact: "생산 생성 권한 신규 부여 — 84명 영향" },
  { cell: "L3 / SLS / CREATE", before: "-", after: "W", impact: "영업 생성 권한 신규 부여 — 6명 영향" },
];

export default function MatrixApprovalPage() {
  return (
    <div>
      <PageHeader title="매트릭스 변경 결재 (L4)" nodeRef="SCR-USR-073" status="PROTOTYPE" description="권한 매트릭스 변경 초안 최종 결재. L4 ADMIN 전용. 회귀 테스트 0건 gating." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 결재 요청 개요" moduleRef="FNC-USR-093/092/103" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-body">
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">변경 초안 ID</p><p className="tabular-nums">MAT-DRAFT-20260506-001</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">신청자</p><p>최관리 (L4/SYS)</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">신청 일시</p><p className="tabular-nums">2026-05-06 10:00</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">회귀 테스트</p><p className="text-primary-accent font-bold">0건 실패</p></div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="B. 변경 Diff" moduleRef="FNC-USR-091" />
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant/10">
              {["셀 (레벨/부서/액션)", "변경 전", "변경 후", "영향 범위"].map((h) => (
                <th key={h} className="pb-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {DIFF.map((d, i) => (
              <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="py-2 pr-4 font-bold">{d.cell}</td>
                <td className="py-2 pr-4 text-error tabular-nums font-bold">{d.before}</td>
                <td className="py-2 pr-4 text-primary-accent tabular-nums font-bold">{d.after}</td>
                <td className="py-2 text-xs opacity-60">{d.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="C. 결재 의견" moduleRef="FNC-USR-092" />
        <div className="flex gap-3 mb-4 items-center">
          <StatusBadge type="running" label="회귀 0건" />
          <span className="text-xs text-on-surface/50 font-body">영향 평가 완료</span>
        </div>
        <div>
          <label className="text-xs font-label uppercase tracking-widest opacity-50 mb-1 block">결재 의견 (선택)</label>
          <textarea className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent" rows={3} placeholder="결재 의견을 입력하십시오"></textarea>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">최종 승인 (발효)</button>
        <button className="px-6 py-2 bg-error/20 border border-error/40 text-error text-xs font-label uppercase tracking-widest">반려</button>
        <button className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">취소</button>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 승인 시 즉시 발효. 회귀 테스트 1건 이상 실패 시 승인 버튼 비활성화.</p>
    </div>
  );
}
