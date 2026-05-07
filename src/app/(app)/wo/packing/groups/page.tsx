"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const INIT = [
  { groupId: "PG-G22C-C-S", name: "G22C-C형 소묶음",  memberPattern: "B*-G22C-C-*", maxQty: 20, status: "ACTIVE" as const },
  { groupId: "PG-G22C-S-M", name: "G22C-S형 중묶음",  memberPattern: "B*-G22C-S-*", maxQty: 15, status: "ACTIVE" as const },
  { groupId: "PG-T18B-C-M", name: "T18B-C형 중묶음",  memberPattern: "B*-T18B-C-*", maxQty: 25, status: "ACTIVE" as const },
  { groupId: "PG-H250-L",   name: "H-BEAM 250 대묶음", memberPattern: "B*-H250-*",  maxQty: 8,  status: "INACTIVE" as const },
  { groupId: "PG-CUSTOM-01", name: "송도 IFC 전용",    memberPattern: "B01-*",      maxQty: 30, status: "ACTIVE" as const },
];

const STATUS_MAP = {
  ACTIVE:   { type: "running" as const, label: "활성" },
  INACTIVE: { type: "stopped" as const, label: "비활성" },
};

export default function PackingGroupsPage() {
  const [rows, setRows] = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="패킹 그룹" accent="사전 정의" nodeRef="SCR-WO-020" description="패킹 그룹 템플릿을 사전 정의합니다 — 양산형 묶음 거부 검증. FNC-WO-021" />

      <div className="flex gap-3 mb-6">
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          + 신규 그룹
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-5 bg-surface-container-lowest border-l-4 border-primary-accent max-w-md">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">신규 그룹 정의</p>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="그룹명"
            className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 mb-3 focus:border-primary-accent focus:outline-none" />
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">저장</button>
            <button onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">취소</button>
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            패킹 그룹 목록 <span className="opacity-30 font-light ml-2">| {rows.length} 건</span>
          </h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["그룹 ID", "그룹명", "부재 패턴", "최대 수량", "상태", ""].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {rows.map((r) => {
              const s = STATUS_MAP[r.status];
              return (
                <tr key={r.groupId} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.groupId}</td>
                  <td className="px-4 py-2 text-xs font-bold">{r.name}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{r.memberPattern}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.maxQty}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                  <td className="px-4 py-2">
                    <button className="text-xs text-on-surface/40 hover:text-on-surface font-label uppercase tracking-widest">편집</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
