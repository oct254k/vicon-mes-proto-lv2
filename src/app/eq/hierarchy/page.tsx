"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const treeData = {
  kind: "PLANT", id: "P3000", name: "제3공장", oee7d: 87.3,
  children: [
    {
      kind: "WC", id: "WC-CUT-01", name: "절단 라인",
      children: [
        {
          kind: "EQUIPMENT", id: "EQ-P3000-CUT-01", name: "절단기 #1",
          status: "ACTIVE", oee7d: 87.3, mtbfMin: 19200,
          mfg: "DAIWHA", installedAt: "2018-03-15",
          components: [
            { id: "BLADE-A-Rev3", name: "절단날 A Rev3", lifePct: 85, color: "YELLOW" },
            { id: "ROLLER-B", name: "롤러 B", lifePct: 32, color: "GREEN" },
            { id: "BEARING-C", name: "베어링 C", lifePct: 102, color: "RED" },
          ],
        },
        { kind: "EQUIPMENT", id: "EQ-P3000-CUT-02", name: "절단기 #2", status: "MAINTENANCE", oee7d: 0, components: [] },
      ],
    },
    { kind: "WC", id: "WC-WELD-01", name: "용접 라인", children: [] },
    { kind: "WC", id: "WC-PRESS-01", name: "프레스 라인", children: [] },
  ],
};

type Node = { kind: string; id: string; name: string; status?: string; oee7d?: number; mtbfMin?: number; mfg?: string; installedAt?: string; components?: { id: string; name: string; lifePct: number; color: string }[]; children?: Node[] };

function compColor(pct: number) {
  if (pct >= 100) return "text-error";
  if (pct >= 80) return "text-[#f59e0b]";
  return "text-tertiary";
}

function TreeNode({ node, depth, selected, onSelect }: { node: Node; depth: number; selected: string | null; onSelect: (n: Node) => void }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div>
      <div
        className={`flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-surface-container ${selected === node.id ? "bg-surface-container border-l-2 border-primary-accent" : ""}`}
        style={{ paddingLeft: `${(depth + 1) * 12}px` }}
        onClick={() => { onSelect(node); if (hasChildren) setOpen(o => !o); }}
      >
        {hasChildren && <span className="text-xs opacity-40 w-3">{open ? "▼" : "▶"}</span>}
        {!hasChildren && <span className="w-3" />}
        <span className="text-xs font-label uppercase opacity-60">{node.kind === "PLANT" ? "🏭" : node.kind === "WC" ? "🏗" : "⚙"}</span>
        <span className="text-xs font-label">{node.id}</span>
        <span className="text-xs opacity-50 ml-1">{node.name}</span>
        {node.status === "MAINTENANCE" && <span className="text-xs text-[#f59e0b] ml-auto">🛠</span>}
        {node.status === "ACTIVE" && <span className="text-xs text-tertiary ml-auto">🟢</span>}
      </div>
      {open && hasChildren && node.children!.map(child => (
        <TreeNode key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function EQHierarchyPage() {
  const [selected, setSelected] = useState<Node | null>(null);

  return (
    <div className="p-6">
      <PageHeader title="설비 계층" accent="트리뷰" nodeRef="SCR-EQ-001" description="Plant → Process Line → Work Center → Equipment 4단계 계층" />
      <div className="grid grid-cols-12 gap-4">
        {/* Left: Tree */}
        <div className="col-span-4 bg-surface-container-lowest border border-outline-variant/10">
          <div className="p-3 bg-surface-container-highest/20 border-b border-outline-variant/10 border-l-4 border-primary-accent">
            <span className="font-label text-xs uppercase tracking-widest">계층 트리 — P3000</span>
          </div>
          <TreeNode node={treeData as Node} depth={0} selected={selected?.id ?? null} onSelect={setSelected} />
        </div>

        {/* Right: Detail */}
        <div className="col-span-8 bg-surface-container-lowest border border-outline-variant/10 p-4">
          {!selected && (
            <p className="text-on-surface-variant/40 text-sm font-label uppercase tracking-widest py-16 text-center">
              좌측 트리에서 노드를 선택하세요
            </p>
          )}
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-3">
                <span className="font-headline font-black text-lg">{selected.id}</span>
                <span className="text-sm text-on-surface-variant">{selected.name}</span>
                {selected.status && (
                  <StatusBadge
                    type={selected.status === "ACTIVE" ? "running" : selected.status === "MAINTENANCE" ? "warning" : "idle"}
                    label={selected.status}
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {selected.mfg && <div><span className="opacity-40 font-label text-xs uppercase">제조사</span><p className="font-headline mt-0.5">{selected.mfg}</p></div>}
                {selected.installedAt && <div><span className="opacity-40 font-label text-xs uppercase">설치일</span><p className="font-headline mt-0.5">{selected.installedAt}</p></div>}
                {selected.oee7d != null && selected.kind === "EQUIPMENT" && <div><span className="opacity-40 font-label text-xs uppercase">OEE 7d</span><p className="font-headline mt-0.5">{selected.oee7d}%</p></div>}
                {selected.mtbfMin != null && <div><span className="opacity-40 font-label text-xs uppercase">MTBF</span><p className="font-headline mt-0.5">{selected.mtbfMin?.toLocaleString()}분 ({Math.floor(selected.mtbfMin! / 60)}h)</p></div>}
              </div>
              {selected.components && selected.components.length > 0 && (
                <div>
                  <p className="font-label text-xs uppercase opacity-40 mb-2">Components ({selected.components.length}건)</p>
                  <div className="space-y-1">
                    {selected.components.map(c => (
                      <div key={c.id} className="flex items-center gap-3 bg-surface-container px-3 py-2">
                        <span className="font-label text-xs">{c.id}</span>
                        <span className="text-xs opacity-60">{c.name}</span>
                        <span className={`ml-auto font-label text-xs font-bold ${compColor(c.lifePct)}`}>{c.lifePct}%</span>
                        {c.lifePct >= 100 && <span className="text-xs bg-error/20 text-error px-2 py-0.5">교체 필요</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button className="px-3 py-1.5 text-xs font-label uppercase tracking-wider bg-primary-accent text-on-primary">편집</button>
                <button className="px-3 py-1.5 text-xs font-label uppercase tracking-wider bg-surface-container">PM 일정</button>
                <button className="px-3 py-1.5 text-xs font-label uppercase tracking-wider bg-surface-container">이력</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
