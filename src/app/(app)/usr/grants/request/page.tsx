"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

export default function GrantRequestPage() {
  return (
    <div>
      <PageHeader title="권한 부여 신청" nodeRef="SCR-USR-030" status="PROTOTYPE" description="부서원 권한 레벨 상향 또는 메뉴 권한 추가 신청. 셀프 신청 또는 L2+ 신청. 자기 한도 초과 불가." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="A. 신청 대상" moduleRef="FNC-USR-026/050" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>신청 유형</label>
            <select className={INPUT}><option>레벨 상향</option><option>부서 추가</option><option>메뉴 권한 추가</option></select>
          </div>
          <div><label className={LABEL}>대상 사번</label><input className={INPUT} defaultValue="EMP1058" /></div>
          <div><label className={LABEL}>대상 이름</label><input className={INPUT} defaultValue="박작업" readOnly /></div>
          <div><label className={LABEL}>현재 레벨</label><input className={INPUT} defaultValue="L1 WORKER" readOnly /></div>
          <div><label className={LABEL}>신청 레벨</label>
            <select className={INPUT}><option>L2 STAFF</option><option>L3 MANAGER</option></select>
          </div>
          <div><label className={LABEL}>추가 부서 (선택)</label>
            <select className={INPUT}><option>—</option><option>PRD</option><option>SHP</option><option>QC</option></select>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="B. 신청 사유" moduleRef="FNC-USR-050/052" />
        <div className="space-y-4">
          <div><label className={LABEL}>신청 사유</label>
            <select className={INPUT}><option>업무 확장</option><option>조직 변경</option><option>직책 변경</option><option>기타</option></select>
          </div>
          <div><label className={LABEL}>상세 내용</label>
            <textarea className={INPUT} rows={3} placeholder="신청 사유를 상세히 기술하십시오"></textarea>
          </div>
        </div>
        <div className="mt-3 p-3 bg-surface-container border border-outline-variant/10 text-xs font-body text-on-surface/50">
          ⓘ 자기 한도 검증: 신청자(L2)는 L3 이하 레벨 상향만 신청 가능. L3 이상 신청 시 L4 ADMIN 결재 필요.
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">신청 제출</button>
        <button className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">취소</button>
      </div>
    </div>
  );
}
