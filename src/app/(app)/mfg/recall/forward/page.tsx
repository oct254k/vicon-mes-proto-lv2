"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

type TreeNode = { lot: string; type: string; children?: TreeNode[] };

const TREE: TreeNode = {
  lot: "RCV-20260501-0017",
  type: "원자재 입고 LOT",
  children: [
    {
      lot: "PRD-20260506-001",
      type: "부재 생산 (B01-1-G22C-C-171)",
      children: [
        {
          lot: "PRD-20260506-T01",
          type: "반제품 이송 → SHOP-B",
          children: [
            { lot: "SHP-20260506-001", type: "출하 (고객: POSCO)", children: [] },
          ],
        },
      ],
    },
    {
      lot: "PRD-20260506-002",
      type: "부재 생산 (B01-1-G22C-C-172) — 진행중",
      children: [],
    },
  ],
};

function TreeView({ node }: { node: TreeNode }) {
  const [open, setOpen] = useState(true);
  return (
    <li>
      <button onClick={() => setOpen(!open)} className="flex items-start gap-2 py-1 hover:text-primary-accent transition-colors text-left w-full">
        <span className="text-primary-accent mt-0.5 font-mono text-xs">{open ? "▼" : "▶"}</span>
        <div>
          <span className="font-mono text-sm">{node.lot}</span>
          <span className="text-xs text-on-surface/40 ml-2">({node.type})</span>
        </div>
      </button>
      {open && node.children && node.children.length > 0 && (
        <ul className="pl-4 border-l border-outline-variant/20">
          {node.children.map((child, i) => <TreeView key={i} node={child} />)}
        </ul>
      )}
    </li>
  );
}

export default function RecallForwardPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <div className="p-8">
      <PageHeader title="회수 /" accent="순방향 추적" nodeRef="SCR-MFG-041" status="PROTOTYPE" description="원자재 LOT → 완제품 순방향 추적 — LOT 계보 트리" />

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="원자재 LOT 입력 (예: RCV-20260501-0017)"
          className="bg-surface-container border border-outline-variant/30 px-4 py-2 text-sm font-mono w-80 focus:outline-none focus:border-primary-accent"
        />
        <button onClick={() => setSearched(true)} className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-wider">
          순추적
        </button>
      </div>

      {searched && (
        <>
          <FieldHeader title="순방향 LOT 계보 트리" moduleRef="FNC-MFG-063" />
          <div className="bg-surface-container-lowest p-6">
            <ul className="space-y-1">
              <TreeView node={TREE} />
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
