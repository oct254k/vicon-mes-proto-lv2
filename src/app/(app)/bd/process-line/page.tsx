"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PLANTS, PROCESS_LINES } from "@/data/plants";

const PLANT_CODES = PLANTS.map((p) => p.code) as string[];

export default function BDProcessLinePage() {
  const [plantCode, setPlantCode] = useState("P3000");

  const plant = PLANTS.find((p) => p.code === plantCode);
  const lines = PROCESS_LINES.filter((l) => l.plantCode === plantCode);

  return (
    <div>
      <PageHeader
        title="공정라인"
        accent="마스터"
        nodeRef="SCR-BD-040"
        status="PROTOTYPE"
        description="Plant별 공정라인 및 단계 정의 — operation_code 게이트 적용 (FNC-BD-044)"
      />

      {/* Plant 탭 */}
      <div className="flex gap-0 mb-6 border-b border-outline-variant/20">
        {PLANT_CODES.map((p) => (
          <button
            key={p}
            onClick={() => setPlantCode(p)}
            className={`px-6 py-2.5 font-label text-xs uppercase tracking-widest transition-colors border-b-2 -mb-px ${
              plantCode === p
                ? "border-primary-accent text-primary-accent bg-surface-container"
                : "border-transparent text-on-surface/50 hover:text-on-surface"
            }`}
          >
            {p}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 pb-1">
          <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest hover:bg-primary-accent/80 transition-colors">
            + 신규
          </button>
        </div>
      </div>

      {/* Plant 개요 카드 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">Plant</p>
          <p className="font-headline font-bold text-lg text-primary-accent">{plantCode}</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">공장명</p>
          <p className="font-headline font-bold text-base">{plant?.name}</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">공정라인 수</p>
          <p className="font-headline font-bold text-lg">{lines.length}개</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-1">상태</p>
          <div className="mt-1">
            <StatusBadge type="running" label="Active" />
          </div>
        </div>
      </div>

      {/* 공정라인 카드 목록 */}
      <FieldHeader title={`공정라인 목록 — ${plantCode} ${plant?.name}`} moduleRef="BD-PROCESSLINE" />
      <div className="flex flex-col gap-4 mt-4">
        {lines.map((line) => (
          <div key={line.lineCode} className="bg-surface-container p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-label text-xs text-on-surface/40 uppercase tracking-widest mr-2">{line.lineCode}</span>
                <span className="font-headline font-bold text-base">{line.lineName}</span>
              </div>
              <StatusBadge type="running" label="Active" />
            </div>
            {/* 공정 흐름 시각화 */}
            <div className="flex items-center gap-2 flex-wrap">
              {line.steps.map((step, i) => (
                <React.Fragment key={step.seq}>
                  <div className="flex flex-col items-start">
                    <span className="bg-primary-accent/20 text-primary-accent text-xs px-2 py-1 font-label">
                      {step.seq}. {step.name}
                    </span>
                    <span className="text-on-surface/30 text-xs mt-0.5 px-2">
                      {step.operations.join(" · ")}
                    </span>
                  </div>
                  {i < line.steps.length - 1 && (
                    <span className="text-primary-accent text-lg font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        {lines.length === 0 && (
          <div className="bg-surface-container p-8 text-center text-on-surface/30 text-sm font-label">
            등록된 공정라인이 없습니다.
          </div>
        )}
      </div>

    </div>
  );
}
