"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const TREE = [
  {
    code: "CUST-001", name: "포스코건설",
    sites: [
      { code: "SITE-001-01", name: "광양제철소 3고로 현장", buildings: ["본관동 A", "생산동 B", "유틸리티동 C"] },
      { code: "SITE-001-02", name: "포항 신제철소", buildings: ["1공장", "2공장"] },
    ],
  },
  {
    code: "CUST-002", name: "현대건설",
    sites: [
      { code: "SITE-002-01", name: "부산 기장 해수담수화", buildings: ["펌프동", "처리동"] },
    ],
  },
  {
    code: "CUST-003", name: "GS건설",
    sites: [
      { code: "SITE-003-01", name: "인천 검단 산단", buildings: ["A동", "B동", "C동", "D동"] },
    ],
  },
];

export default function CustomerTreePage() {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (code: string) =>
    setExpanded((prev) => prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]);

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="거래처 트리"
        nodeRef="SCR-BD-060"
        description="거래처 → 현장(Site) → 건물(Building) 3단계 계층 구조"
      />
      <FieldHeader title="Customer / Site / Building 계층" moduleRef="BD-CUSTOMER-TREE" />
      <div className="bg-surface-container-lowest mt-4 p-4">
        {TREE.map((cust) => (
          <div key={cust.code} className="mb-2">
            <button
              onClick={() => toggle(cust.code)}
              className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-surface-container transition-colors border-b border-outline"
            >
              <span className="text-primary-accent font-label text-xs tracking-widest uppercase">
                {expanded.includes(cust.code) ? "▾" : "▸"}
              </span>
              <span className="font-headline font-black text-sm">{cust.name}</span>
              <span className="text-xs font-label opacity-30 ml-2">{cust.code}</span>
            </button>
            {expanded.includes(cust.code) && (
              <div className="pl-6">
                {cust.sites.map((site) => (
                  <div key={site.code} className="mb-1">
                    <button
                      onClick={() => toggle(site.code)}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-surface-container transition-colors border-b border-outline-variant"
                    >
                      <span className="text-primary-accent font-label text-xs">
                        {expanded.includes(site.code) ? "▾" : "▸"}
                      </span>
                      <span className="text-sm">{site.name}</span>
                      <span className="text-xs font-label opacity-30 ml-2">{site.code}</span>
                    </button>
                    {expanded.includes(site.code) && (
                      <ul className="pl-8">
                        {site.buildings.map((b) => (
                          <li key={b} className="text-xs text-on-surface-variant/60 py-1 border-b border-outline-variant flex items-center gap-2">
                            <span className="text-primary-accent">▪</span> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
