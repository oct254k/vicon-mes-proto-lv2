"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

export default function ExternalTokenNewPage() {
  return (
    <div>
      <PageHeader title="EXTERNAL 토큰 발급" accent="USR-060" nodeRef="SCR-USR-060" status="PROTOTYPE" description="외부 운전자·검수자 대상 일회성 토큰 발급. L2/SHP 또는 L3 MANAGER 전용." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="A. 외부 사용자 정보" moduleRef="FNC-USR-080/081" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>외부 사용자 이름</label><input className={INPUT} placeholder="운전자·검수자 이름" /></div>
          <div><label className={LABEL}>외부 사용자 식별 번호</label><input className={INPUT} placeholder="차량번호 또는 사원 ID" /></div>
          <div><label className={LABEL}>소속 기관·회사</label><input className={INPUT} placeholder="예: ㈜한국물류" /></div>
          <div><label className={LABEL}>연락처</label><input className={INPUT} type="tel" placeholder="010-XXXX-XXXX" /></div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="B. 토큰 범위·유효 기간" moduleRef="FNC-USR-081/084" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>Scope (접근 범위)</label>
            <div className="flex flex-col gap-2 mt-1">
              {[
                { code: "PACKING", desc: "포장 구역 접근 — 포장 검수 전용" },
                { code: "VEHICLE", desc: "차량 진입 구역 — 상하차 동선 한정" },
                { code: "SITE", desc: "전 현장 단기 접근 — L3 결재 필요" },
              ].map((s) => (
                <label key={s.code} className="flex items-start gap-2 text-sm font-body cursor-pointer">
                  <input type="radio" name="scope" defaultChecked={s.code === "PACKING"} className="accent-[#00912F] mt-0.5" />
                  <span><strong>{s.code}</strong> — <span className="text-xs opacity-60">{s.desc}</span></span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div><label className={LABEL}>유효 시작 시각</label><input type="datetime-local" className={INPUT} defaultValue="2026-05-06T09:00" /></div>
            <div><label className={LABEL}>유효 종료 시각</label><input type="datetime-local" className={INPUT} defaultValue="2026-05-06T18:00" /></div>
            <p className="text-xs text-on-surface/40 font-body">ⓘ 최대 당일 23:59. SITE scope는 L3 결재 필요. 발급 즉시 QR 코드 생성.</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="C. 발급자 확인" moduleRef="FNC-USR-080" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>발급자</label><input className={INPUT} defaultValue="kim.kj@vicon.local (L2/SHP)" readOnly /></div>
          <div><label className={LABEL}>발급 사유</label>
            <select className={INPUT}><option>입고 검수</option><option>출하 상차</option><option>현장 점검</option><option>기타</option></select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">토큰 발급 + QR 생성</button>
        <button className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">취소</button>
      </div>
    </div>
  );
}
