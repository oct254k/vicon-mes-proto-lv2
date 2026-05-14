"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

interface TraceNode {
  level: number;
  type: string;
  id: string;
  label: string;
  detail: string;
  children?: TraceNode[];
}

const MOCK_TRACE: TraceNode = {
  level: 0,
  type: "완제품 부재",
  id: "B01-1-G22C-C-171",
  label: "거더 플랜지 A",
  detail: "WO-2026-0188 / 용접 공정 #3 완료",
  children: [
    {
      level: 1,
      type: "반제품 LOT",
      id: "LOT-2026-0311",
      label: "플랜지 반제품 배치",
      detail: "2026-04-28 ~ 2026-05-02 / P1-안산",
      children: [
        {
          level: 2,
          type: "원자재 LOT",
          id: "RM-LOT-2026-0092",
          label: "SS400 강판 6T",
          detail: "철강공급 / 코일 5롤 / 2,400kg",
          children: [
            {
              level: 3,
              type: "입고 Receipt",
              id: "RCV-2026-0041",
              label: "입고 검사 합격",
              detail: "2026-04-20 / 검사자: 박검사 / 성적서 #QC-4120",
            },
          ],
        },
        {
          level: 2,
          type: "원자재 LOT",
          id: "RM-LOT-2026-0093",
          label: "용접봉 ER70S-6",
          detail: "용접재 / 25kg × 4박스",
          children: [
            {
              level: 3,
              type: "입고 Receipt",
              id: "RCV-2026-0043",
              label: "입고 검사 합격",
              detail: "2026-04-21 / 검사자: 박검사 / 성적서 #QC-4124",
            },
          ],
        },
      ],
    },
  ],
};

const TYPE_COLOR: Record<string, string> = {
  "완제품 부재": "border-primary-accent text-primary-accent",
  "반제품 LOT": "border-[#3b82f6] text-[#3b82f6]",
  "원자재 LOT": "border-warning text-warning",
  "입고 Receipt": "border-outline-variant/40 text-on-surface/50",
};

function TraceNodeCard({ node }: { node: TraceNode }) {
  const colorClass = TYPE_COLOR[node.type] || "border-outline-variant/30 text-on-surface/60";
  return (
    <div className="flex gap-2">
      {node.level > 0 && (
        <div className="flex flex-col items-center">
          <div className="w-4 border-t-2 border-outline-variant/20 mt-4" />
          <div className="w-0.5 bg-outline-variant/20 flex-1" />
        </div>
      )}
      <div className="flex-1">
        <div className={`border-l-4 ${colorClass.split(" ")[0]} bg-surface-container-lowest px-4 py-3 mb-1`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-label text-xs uppercase tracking-widest font-bold ${colorClass.split(" ")[1]}`}>
              {node.type}
            </span>
          </div>
          <p className="font-headline font-black text-sm">{node.id}</p>
          <p className="text-xs text-on-surface/70">{node.label}</p>
          <p className="text-xs text-on-surface/40 mt-1">{node.detail}</p>
        </div>
        {node.children && (
          <div className="ml-4 border-l border-outline-variant/15 pl-3 mt-1 space-y-1">
            {node.children.map((child) => (
              <TraceNodeCard key={child.id} node={child} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MFGRecallTracePage() {
  const [query, setQuery] = useState("B01-1-G22C-C-171");
  const [result, setResult] = useState<TraceNode | null>(MOCK_TRACE);

  function handleSearch() {
    if (!query.trim()) return;
    setResult(MOCK_TRACE);
  }

  return (
    <div className="px-4 py-6">
      <PageHeader
        title="LOT 역방향 추적"
        accent="TRACE"
        nodeRef="SCR-MFG-042"
        status="PROTOTYPE"
      />

      <FieldHeader title="추적 대상 입력" moduleRef="SCR-MFG-043" />
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 bg-surface-container border border-outline-variant/30 px-3 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary-accent"
          placeholder="부재코드 또는 LOT 번호 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-primary-accent text-on-primary px-6 py-3 font-label uppercase tracking-widest text-xs font-bold"
          onClick={handleSearch}
        >
          추적
        </button>
      </div>

      {result && (
        <>
          <FieldHeader title="추적 결과 (역방향)" moduleRef="SCR-MFG-044" />
          <div className="space-y-1">
            <TraceNodeCard node={result} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-label uppercase tracking-widest">
            {Object.entries(TYPE_COLOR).map(([type, cls]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 border-l-4 ${cls.split(" ")[0]}`} />
                <span className="text-on-surface/50">{type}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
