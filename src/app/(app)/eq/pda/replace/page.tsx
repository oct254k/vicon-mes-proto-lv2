"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function EQPdaReplacePage() {
  return (
    <div className="p-8">
      <PageHeader title="PDA 부품 교체 등록" accent="REPLACE" nodeRef="SCR-EQ-095" description="현장 PDA에서 부품 교체 작업 결과 등록." />
      <FieldHeader title="교체 작업 정보" moduleRef="FR-EQ-095" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          ["MO/PM 번호",   "MO-2026-0501-001"],
          ["설비 코드",     "EQ-P3-CUT-01"],
          ["교체 일시",     "2026-05-06 14:00"],
          ["작업자",       "홍길동"],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{k}</label>
            <input defaultValue={v} className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent" />
          </div>
        ))}
      </div>
      <FieldHeader title="교체 부품 목록" moduleRef="FR-EQ-096" />
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm font-headline border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["부품 번호","부품명","교체 전 S/N","교체 후 S/N","수량","비고"].map((h) => (
                <th key={h} className="px-3 py-2 font-label text-xs uppercase tracking-widest opacity-50 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-outline-variant">
              <td className="px-3 py-2"><input defaultValue="BLD-5000-A" className="bg-surface-container border border-outline-variant/20 px-2 py-1 w-28 text-xs focus:outline-none focus:border-primary-accent" /></td>
              <td className="px-3 py-2"><input defaultValue="절단 칼날" className="bg-surface-container border border-outline-variant/20 px-2 py-1 w-24 text-xs focus:outline-none focus:border-primary-accent" /></td>
              <td className="px-3 py-2"><input defaultValue="SN-2021-0112" className="bg-surface-container border border-outline-variant/20 px-2 py-1 w-28 text-xs focus:outline-none focus:border-primary-accent" /></td>
              <td className="px-3 py-2"><input defaultValue="SN-2026-0506" className="bg-surface-container border border-outline-variant/20 px-2 py-1 w-28 text-xs focus:outline-none focus:border-primary-accent" /></td>
              <td className="px-3 py-2"><input defaultValue="2" type="number" className="bg-surface-container border border-outline-variant/20 px-2 py-1 w-12 text-xs focus:outline-none focus:border-primary-accent" /></td>
              <td className="px-3 py-2"><input defaultValue="" className="bg-surface-container border border-outline-variant/20 px-2 py-1 w-24 text-xs focus:outline-none focus:border-primary-accent" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="bg-primary-accent text-black font-label font-bold text-xs uppercase tracking-widest px-8 py-3">
        부품 교체 등록
      </button>
    </div>
  );
}
