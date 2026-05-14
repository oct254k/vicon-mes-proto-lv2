"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const PARTS_HISTORY = [
  { code: "PRT-BRG-001", name: "메인 베어링",     equip: "EQ-P3000-CUT-01", replaced: "2026-04-15", lifeHours: 8760,  reason: "정기 교체 (PM)" },
  { code: "PRT-BLT-002", name: "컨베이어 벨트",   equip: "EQ-P3000-CUT-02", replaced: "2026-03-22", lifeHours: 4320,  reason: "마모 초과" },
  { code: "PRT-NOZ-001", name: "용접 노즐",        equip: "EQ-P3000-WLD-01", replaced: "2026-05-01", lifeHours: 500,   reason: "스패터 누적" },
  { code: "PRT-FLT-003", name: "에어 필터 세트",   equip: "EQ-P2000-PNT-02", replaced: "2026-04-28", lifeHours: 2160,  reason: "PM 예방 교체" },
  { code: "PRT-MOT-001", name: "구동 모터",        equip: "EQ-P3000-WLD-02", replaced: "2026-05-05", lifeHours: 12000, reason: "고장(BM 긴급)" },
  { code: "PRT-SEN-002", name: "온도 센서 모듈",   equip: "EQ-P1000-INS-01", replaced: "2026-04-10", lifeHours: 8760,  reason: "PdM 이상 감지" },
];

export default function EQPartsPage() {
  const [q, setQ] = useState("");
  const filtered = PARTS_HISTORY.filter(
    (p) => q === "" || p.code.includes(q) || p.name.includes(q) || p.equip.includes(q)
  );

  return (
    <div className="p-8">
      <PageHeader
        title="설비관리 /"
        accent="부품 교체 이력"
        nodeRef="SCR-EQ-060"
        description="설비별 부품 교체 이력 기록 관리"
      />

      <FieldHeader title="검색·필터" moduleRef="PARTS HISTORY" />
      <div className="flex gap-3 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="코드 / 이름 / 설비 검색"
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm w-64"
        />
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 교체 등록
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            교체 이력{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(filtered.length).padStart(3, "0")} Entries</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["Component 코드", "이름", "설비", "교체일", "교체 전 수명(h)", "교체 사유"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filtered.map((p, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-xs tabular-nums text-primary-accent font-bold">{p.code}</td>
                  <td className="px-4 py-2 font-bold">{p.name}</td>
                  <td className="px-4 py-2 text-xs text-on-surface/60">{p.equip}</td>
                  <td className="px-4 py-2 text-xs tabular-nums">{p.replaced}</td>
                  <td className="px-4 py-2 tabular-nums text-right">{p.lifeHours.toLocaleString()}</td>
                  <td className="px-4 py-2 text-xs text-on-surface/70">{p.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
