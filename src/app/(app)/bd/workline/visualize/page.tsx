"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { PLANTS, getProcessLinesByPlant } from "@/data/plants";

export default function WorklineVisualizePage() {
  const [plantCode, setPlantCode] = useState("P3000");

  const plant    = PLANTS.find((p) => p.code === plantCode);
  const lines    = getProcessLinesByPlant(plantCode);

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="Plant별 흐름도"
        nodeRef="SCR-BD-042"
        description="Plant별 공정라인 공정 흐름 시각화"
      />
      <FieldHeader title="공정라인 시각화" moduleRef="BD-WORKLINE-VIZ" />

      {/* Plant 선택 */}
      <div className="flex gap-4 items-center mb-6">
        <select
          value={plantCode}
          onChange={(e) => setPlantCode(e.target.value)}
          className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm"
        >
          {PLANTS.map((p) => (
            <option key={p.code} value={p.code}>
              {p.code} — {p.name} ({p.product})
            </option>
          ))}
        </select>
        {plant && (
          <span className="text-xs font-label text-on-surface/40 uppercase tracking-wider">
            {plant.address}
          </span>
        )}
      </div>

      {lines.length === 0 ? (
        <div className="text-on-surface/30 text-sm font-label uppercase tracking-wider py-12 text-center">
          해당 Plant 공정라인 미등록
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {lines.map((line) => (
            <div key={line.lineCode} className="bg-surface-container-lowest border border-outline-variant/20 p-6">
              {/* 라인 헤더 */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-label text-on-surface/30 uppercase tracking-wider">
                  {line.lineCode}
                </span>
                <h3 className="font-headline font-black text-base text-primary-accent">
                  {line.lineName}
                </h3>
              </div>

              {/* 공정 단계 흐름 */}
              <div className="flex items-start gap-0 flex-wrap">
                {line.steps.map((step, si) => (
                  <div key={step.seq} className="flex items-start">
                    <div className="flex flex-col min-w-max">
                      {/* 단계 박스 */}
                      <div className="bg-primary-accent/15 border border-primary-accent/40 px-4 py-2 text-center min-w-32">
                        <p className="text-xs font-label text-primary-accent font-bold uppercase tracking-wider mb-1">
                          {String(step.seq).padStart(2, "0")}
                        </p>
                        <p className="text-sm font-headline font-bold text-on-surface leading-tight">
                          {step.name}
                        </p>
                      </div>
                      {/* 세부 작업 목록 */}
                      <div className="bg-surface-container border-x border-b border-outline-variant/20 px-3 py-2 min-w-32">
                        {step.operations.map((op) => (
                          <p key={op} className="text-xs text-on-surface/50 leading-relaxed">
                            · {op}
                          </p>
                        ))}
                      </div>
                    </div>
                    {si < line.steps.length - 1 && (
                      <span className="text-primary-accent text-xl px-2 mt-3">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
