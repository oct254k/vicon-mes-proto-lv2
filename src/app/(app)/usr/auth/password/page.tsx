"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

export default function PasswordPage() {
  return (
    <div>
      <PageHeader title="비밀번호·PIN 변경" nodeRef="SCR-USR-022" status="PROTOTYPE" description="본인 비밀번호 및 PIN 변경. 최초 로그인 시 PIN 변경 강제." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low border-l-4 border-primary-accent p-6">
          <FieldHeader title="A. 비밀번호 변경" moduleRef="FNC-USR-002" />
          <div className="space-y-4">
            <div><label className={LABEL}>현재 비밀번호</label><input type="password" className={INPUT} placeholder="••••••••" /></div>
            <div><label className={LABEL}>새 비밀번호</label><input type="password" className={INPUT} placeholder="8자 이상, 영문+숫자+특수문자" /></div>
            <div><label className={LABEL}>새 비밀번호 확인</label><input type="password" className={INPUT} placeholder="••••••••" /></div>
            <p className="text-xs text-on-surface/40 font-body leading-relaxed">ⓘ 최소 8자 / 영문+숫자+특수문자 포함 / 최근 3회 재사용 불가</p>
            <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">비밀번호 변경</button>
          </div>
        </div>

        <div className="bg-surface-container-low border-l-4 border-primary-accent p-6">
          <FieldHeader title="B. PIN 변경" moduleRef="FNC-USR-002" />
          <div className="space-y-4">
            <div><label className={LABEL}>현재 PIN</label><input type="password" className={INPUT} placeholder="4자리" maxLength={4} /></div>
            <div><label className={LABEL}>새 PIN</label><input type="password" className={INPUT} placeholder="4자리" maxLength={4} /></div>
            <div><label className={LABEL}>새 PIN 확인</label><input type="password" className={INPUT} placeholder="4자리" maxLength={4} /></div>
            <p className="text-xs text-on-surface/40 font-body leading-relaxed">ⓘ PIN 5회 오류 시 10분 잠금.</p>
            <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">PIN 변경</button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-surface-container-low border-l-4 border-warning p-4">
        <p className="text-xs font-label uppercase tracking-widest text-warning mb-1">변경 이력</p>
        <div className="flex gap-8 text-xs font-body text-on-surface/50">
          <span>최근 비밀번호 변경: 2026-03-01</span>
          <span>최근 PIN 변경: 2026-04-10</span>
          <span>로그인 ID: kim.kj@vicon.local</span>
        </div>
      </div>
    </div>
  );
}
