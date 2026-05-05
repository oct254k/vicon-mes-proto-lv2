"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function EQPdaBmReportPage() {
  return (
    <div className="p-8">
      <PageHeader title="PDA 고장 즉시 보고" accent="BM REPORT" nodeRef="SCR-EQ-094" description="현장 PDA에서 고장 발생 즉시 보고 입력." />
      <FieldHeader title="고장 즉시 보고 입력" moduleRef="FR-EQ-094" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          ["설비 코드",  "EQ-P3-CUT-01"],
          ["발생 일시",  "2026-05-06 11:30"],
          ["발견자",    "홍길동"],
          ["발견 장소",  "LINE-P3-01 #1번 포지션"],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{k}</label>
            <input defaultValue={v} className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-label text-xs uppercase tracking-widest opacity-50">고장 현상</label>
        <select className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent">
          <option>오일 누유</option>
          <option>이상 소음</option>
          <option>진동 과다</option>
          <option>전원 차단</option>
          <option>센서 오류</option>
          <option>기타</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 mb-6">
        <label className="font-label text-xs uppercase tracking-widest opacity-50">상세 설명</label>
        <textarea rows={4} placeholder="고장 현상을 상세히 입력하세요..." className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent resize-none" />
      </div>
      <div className="flex flex-col gap-1 mb-6">
        <label className="font-label text-xs uppercase tracking-widest opacity-50">긴급도</label>
        <div className="flex gap-3">
          {["긴급", "높음", "보통", "낮음"].map((l) => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="urgency" defaultChecked={l === "긴급"} className="accent-primary-accent" />
              <span className="font-label text-sm">{l}</span>
            </label>
          ))}
        </div>
      </div>
      <button className="bg-error text-white font-label font-bold text-xs uppercase tracking-widest px-8 py-3">
        고장 즉시 보고 제출
      </button>
    </div>
  );
}
