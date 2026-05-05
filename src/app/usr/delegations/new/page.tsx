"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

export default function DelegationNewPage() {
  return (
    <div>
      <PageHeader title="위임 등록" accent="USR-040" nodeRef="SCR-USR-040" status="PROTOTYPE" description="업무 임시 위임 등록. 최대 30일, 자기 위임·상향 위임 불가." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="A. 위임 기본 정보" moduleRef="FNC-USR-060" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>위임자 (본인)</label><input className={INPUT} defaultValue="홍길동 (EMP1099)" readOnly /></div>
          <div><label className={LABEL}>수임자 사번</label><input className={INPUT} defaultValue="EMP1100" placeholder="김철수 사번 입력" /></div>
          <div><label className={LABEL}>수임자 이름</label><input className={INPUT} defaultValue="김철수" readOnly /></div>
          <div><label className={LABEL}>수임자 레벨</label><input className={INPUT} defaultValue="L2 STAFF (PRD)" readOnly /></div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="B. 위임 기간·범위" moduleRef="FNC-USR-060" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>시작일</label><input type="date" className={INPUT} defaultValue="2026-05-07" /></div>
          <div><label className={LABEL}>종료일 (최대 30일)</label><input type="date" className={INPUT} defaultValue="2026-05-09" /></div>
          <div className="col-span-2">
            <label className={LABEL}>위임 범위 (권한 항목 선택)</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {["WO 결재", "QC 검사 승인", "출하 허가", "자재 불출 승인", "설비 작업 허가", "보고서 제출"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input type="checkbox" defaultChecked={s === "WO 결재"} className="accent-[#00912F]" />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="C. 사유" moduleRef="FNC-USR-060" />
        <div className="space-y-3">
          <div><label className={LABEL}>위임 사유</label>
            <select className={INPUT}><option>연차 휴가</option><option>출장</option><option>병가</option><option>교육 참석</option><option>기타</option></select>
          </div>
          <div><label className={LABEL}>비고</label><textarea className={INPUT} rows={2} placeholder="추가 사항 (선택)"></textarea></div>
        </div>
        <p className="text-xs text-on-surface/40 font-body mt-2">ⓘ 자기 위임, 상향 위임(수임자 레벨 ≥ 위임자) 불가. 기간 초과 시 자동 반려.</p>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">위임 신청</button>
        <button className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">취소</button>
      </div>
    </div>
  );
}
