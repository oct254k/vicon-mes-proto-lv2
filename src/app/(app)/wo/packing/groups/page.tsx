"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Status = "ACTIVE" | "INACTIVE";

interface PackingGroup {
  groupId: string;
  name: string;
  memberPattern: string;
  maxQty: number;
  status: Status;
  note: string;
  members: string[];
}

const INIT: PackingGroup[] = [
  { groupId: "PG-G22C-C-S", name: "G22C-C형 소묶음",    memberPattern: "B*-G22C-C-*", maxQty: 20, status: "ACTIVE",
    note: "G22C C형 단면, 소형 묶음. 최대 20본.",
    members: ["B01-1-G22C-C-171","B01-1-G22C-C-172","B01-1-G22C-C-173","B02-1-G22C-C-081"] },
  { groupId: "PG-G22C-S-M", name: "G22C-S형 중묶음",    memberPattern: "B*-G22C-S-*", maxQty: 15, status: "ACTIVE",
    note: "G22C S형 단면, 중형 묶음. 최대 15본.",
    members: ["B01-2-G22C-S-040","B01-2-G22C-S-041","B02-2-G22C-S-081"] },
  { groupId: "PG-T18B-C-M", name: "T18B-C형 중묶음",    memberPattern: "B*-T18B-C-*", maxQty: 25, status: "ACTIVE",
    note: "T18B C형 단면, 중형 묶음.",
    members: ["B01-1-T18B-C-201","B01-1-T18B-C-202"] },
  { groupId: "PG-H250-L",   name: "H-BEAM 250 대묶음",  memberPattern: "B*-H250-*",   maxQty: 8,  status: "INACTIVE",
    note: "H250 빔 대형 묶음. 현재 비활성.",
    members: [] },
  { groupId: "PG-CUSTOM-01", name: "송도 IFC 전용",      memberPattern: "B01-*",       maxQty: 30, status: "ACTIVE",
    note: "송도 IFC 현장 전용 패킹 그룹.",
    members: ["B01-1-G22C-C-171","B01-2-G15A-S-040"] },
];

const STATUS_MAP = {
  ACTIVE:   { type: "running" as const, label: "활성" },
  INACTIVE: { type: "stopped" as const, label: "비활성" },
};

function GroupDetail({ group, onClose, onToggleStatus }: {
  group: PackingGroup;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}) {
  const [editName, setEditName] = useState(group.name);
  const [editPattern, setEditPattern] = useState(group.memberPattern);
  const [editMaxQty, setEditMaxQty] = useState(String(group.maxQty));
  const [editNote, setEditNote] = useState(group.note);
  const [saved, setSaved] = useState(false);

  const s = STATUS_MAP[group.status];

  return (
    <div className="mt-4 border border-outline-variant/20 bg-surface-container-lowest">
      <div className="flex items-center justify-between px-5 py-3 bg-surface-container border-b border-outline-variant/10 border-l-4 border-primary-accent">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-0.5">패킹 그룹 상세·편집</p>
          <p className="font-headline font-black text-base">{group.groupId}</p>
        </div>
        <button onClick={onClose} className="font-label text-xs uppercase tracking-widest opacity-40 hover:opacity-80 px-3 py-1 border border-outline-variant/20 hover:border-white/30 transition-colors">
          닫기 ✕
        </button>
      </div>

      <div className="p-5 grid grid-cols-2 gap-6">
        {/* 좌: 편집 폼 */}
        <div className="space-y-4">
          <FieldHeader title="그룹 정보 편집" />

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest opacity-40 mb-1">그룹 ID</label>
            <p className="font-mono text-xs text-primary-accent">{group.groupId}</p>
          </div>

          {([
            { label: "그룹명",    val: editName,    set: setEditName,    type: "text" },
            { label: "부재 패턴", val: editPattern, set: setEditPattern, type: "text" },
            { label: "최대 수량", val: editMaxQty,  set: setEditMaxQty,  type: "number" },
          ] as { label:string; val:string; set:(v:string)=>void; type:string }[]).map(f => (
            <div key={f.label}>
              <label className="block font-label text-[10px] uppercase tracking-widest opacity-40 mb-1">{f.label}</label>
              <input
                type={f.type}
                value={f.val}
                onChange={e => { f.set(e.target.value); setSaved(false); }}
                className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent"
              />
            </div>
          ))}

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest opacity-40 mb-1">비고</label>
            <textarea
              value={editNote}
              onChange={e => { setEditNote(e.target.value); setSaved(false); }}
              rows={2}
              className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-xs font-label resize-none focus:outline-none focus:border-primary-accent"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setSaved(true)}
              className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90"
            >
              저장
            </button>
            <button
              onClick={() => onToggleStatus(group.groupId)}
              className={`px-4 py-2 text-xs font-label uppercase tracking-widest border transition-colors ${
                group.status === "ACTIVE"
                  ? "border-red-500/30 text-red-400 hover:border-red-500"
                  : "border-primary-accent/40 text-primary-accent hover:border-primary-accent"
              }`}
            >
              {group.status === "ACTIVE" ? "비활성화" : "활성화"}
            </button>
            {saved && <span className="self-center text-[10px] font-label text-primary-accent uppercase tracking-widest">저장 완료</span>}
          </div>
        </div>

        {/* 우: 적용 부재 목록 */}
        <div>
          <FieldHeader title={`적용 부재 예시 (${group.members.length}건)`} />
          {group.members.length === 0 ? (
            <p className="text-xs font-label opacity-30 mt-2">패턴 매칭 부재 없음</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {group.members.map(m => (
                <li key={m} className="flex items-center gap-2 px-3 py-2 bg-surface-container border-l-2 border-primary-accent/30 text-xs font-mono text-on-surface/80">
                  <span className="text-primary-accent">▸</span> {m}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 pt-4 border-t border-outline-variant/10">
            <FieldHeader title="그룹 현황" />
            <dl className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="font-label text-[10px] uppercase tracking-widest opacity-40 mb-0.5">상태</dt>
                <dd className="font-headline"><StatusBadge type={s.type} label={s.label} /></dd>
              </div>
              <div>
                <dt className="font-label text-[10px] uppercase tracking-widest opacity-40 mb-0.5">최대 수량</dt>
                <dd className="font-headline">{group.maxQty}본</dd>
              </div>
              <div>
                <dt className="font-label text-[10px] uppercase tracking-widest opacity-40 mb-0.5">패턴</dt>
                <dd className="font-headline font-mono">{group.memberPattern}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PackingGroupsPage() {
  const [rows, setRows] = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [selected, setSelected] = useState<PackingGroup | null>(null);

  function toggleStatus(id: string) {
    setRows(prev => prev.map(r =>
      r.groupId === id ? { ...r, status: r.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : r
    ));
    setSelected(prev => prev?.groupId === id
      ? { ...prev, status: prev.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
      : prev
    );
  }

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader
        title="패킹 그룹"
        nodeRef="SCR-WO-020"
        description="패킹 그룹 템플릿 사전 정의 — 양산형 묶음 거부 검증. 행 클릭 시 상세·편집."
      />

      <div className="flex gap-3 mb-6">
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          + 신규 그룹
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-5 bg-surface-container-lowest border-l-4 border-primary-accent max-w-md">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-3">신규 그룹 정의</p>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="그룹명"
            className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 mb-3 focus:border-primary-accent focus:outline-none" />
          <div className="flex gap-2">
            <button onClick={() => { setShowForm(false); setNewName(""); }}
              className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">저장</button>
            <button onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">취소</button>
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            패킹 그룹 목록 <span className="opacity-30 font-light ml-2">| {rows.length}건</span>
          </h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["그룹 ID","그룹명","부재 패턴","최대 수량","상태"].map(h => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {rows.map(r => {
              const s = STATUS_MAP[r.status];
              const isSelected = selected?.groupId === r.groupId;
              return (
                <tr key={r.groupId}
                  onClick={() => setSelected(isSelected ? null : r)}
                  className={`border-b border-outline-variant/5 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary-accent/10 border-l-2 border-primary-accent"
                      : "hover:bg-surface-container-highest/20"
                  }`}>
                  <td className="px-4 py-2.5 font-mono text-xs text-primary-accent">{r.groupId}</td>
                  <td className="px-4 py-2.5 text-xs font-bold">{r.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs opacity-70">{r.memberPattern}</td>
                  <td className="px-4 py-2.5 tabular-nums text-xs">{r.maxQty}</td>
                  <td className="px-4 py-2.5"><StatusBadge type={s.type} label={s.label} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-xs opacity-30 font-label p-3 text-right">행 클릭 → 상세·편집 패널</p>
      </div>

      {selected && (
        <GroupDetail
          group={selected}
          onClose={() => setSelected(null)}
          onToggleStatus={toggleStatus}
        />
      )}
    </main>
  );
}
