"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

type NotiState = "UNRESOLVED" | "READ" | "IN_PROGRESS" | "RESOLVED" | "IGNORED";
type NotiPriority = "URGENT" | "HIGH" | "MEDIUM" | "LOW";

interface Notification {
  id: string;
  category: string;
  priority: NotiPriority;
  state: NotiState;
  channels: string[];
  title: string;
  occurredAt: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: "N-001", category: "SPC_RULE_1", priority: "URGENT", state: "UNRESOLVED", channels: ["EMAIL", "SMS", "KAKAOTALK", "INAPP", "LINEBOARD"], title: "B-171 측정값 6010mm > UCL=6005mm", occurredAt: "14:31" },
  { id: "N-002", category: "QC_TIME_9", priority: "URGENT", state: "UNRESOLVED", channels: ["EMAIL", "SMS", "KAKAOTALK", "INAPP", "LINEBOARD"], title: "X-001 시점⑨ 불량 — 회수 필요", occurredAt: "14:20" },
  { id: "N-003", category: "EQ_BM", priority: "HIGH", state: "IN_PROGRESS", channels: ["EMAIL", "SMS", "KAKAOTALK", "INAPP", "LINEBOARD"], title: "L03 베어링 파손 BM — 라인 정지", occurredAt: "14:15" },
  { id: "N-004", category: "MRP_SHORT", priority: "HIGH", state: "READ", channels: ["EMAIL", "INAPP"], title: "M-COIL-B 40m 부족 — PR 발행 필요", occurredAt: "14:10" },
  { id: "N-005", category: "LINE_STOP", priority: "MEDIUM", state: "UNRESOLVED", channels: ["EMAIL", "SMS"], title: "L01 라인 정지 협의 필요", occurredAt: "14:00" },
  { id: "N-006", category: "DELIVERY_DELAY", priority: "MEDIUM", state: "RESOLVED", channels: ["EMAIL", "KAKAOTALK", "INAPP"], title: "SO-0125 출하 5/9 → 5/12 — 거래처 통보 완료", occurredAt: "13:45" },
  { id: "N-007", category: "INSPECTION_DUE", priority: "LOW", state: "IGNORED", channels: ["EMAIL"], title: "PM 점검 D-3 (2026-05-08)", occurredAt: "13:30" },
  { id: "N-008", category: "SPC_RULE_2", priority: "HIGH", state: "UNRESOLVED", channels: ["INAPP", "LINEBOARD"], title: "Rule 2 연속 9점 한쪽 — L02 천공라인", occurredAt: "13:50" },
];

const STATE_STYLE: Record<NotiState, string> = {
  UNRESOLVED: "text-error bg-error/20",
  READ: "text-on-surface-variant bg-surface-container-highest",
  IN_PROGRESS: "text-tertiary bg-tertiary/20",
  RESOLVED: "text-primary-accent bg-primary-accent/20",
  IGNORED: "text-on-surface-variant/40 bg-surface-container-highest/40",
};

const STATE_LABEL: Record<NotiState, string> = {
  UNRESOLVED: "미처리",
  READ: "읽음",
  IN_PROGRESS: "처리중",
  RESOLVED: "완료",
  IGNORED: "무시",
};

const PRIORITY_DOT: Record<NotiPriority, string> = {
  URGENT: "text-error",
  HIGH: "text-[#f59e0b]",
  MEDIUM: "text-tertiary",
  LOW: "text-on-surface-variant",
};

const CHANNEL_ICONS: Record<string, string> = {
  EMAIL: "E",
  SMS: "S",
  KAKAOTALK: "K",
  INAPP: "I",
  LINEBOARD: "L",
};

type TabFilter = "전체" | "미처리" | "처리중" | "완료";
const TAB_TO_STATES: Record<TabFilter, NotiState[]> = {
  "전체": ["UNRESOLVED", "READ", "IN_PROGRESS", "RESOLVED", "IGNORED"],
  "미처리": ["UNRESOLVED"],
  "처리중": ["IN_PROGRESS", "READ"],
  "완료": ["RESOLVED", "IGNORED"],
};

export default function OPSNotificationsPage() {
  const [tab, setTab] = useState<TabFilter>("전체");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const unresolvedCount = NOTIFICATIONS.filter((n) => n.state === "UNRESOLVED").length;
  const filtered = NOTIFICATIONS.filter((n) => TAB_TO_STATES[tab].includes(n.state));

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const tabs: TabFilter[] = ["전체", "미처리", "처리중", "완료"];

  return (
    <div className="p-6 bg-surface min-h-screen">
      <div className="flex items-start justify-between mb-2">
        <PageHeader
          title="알림 센터"
          accent="INBOX"
          nodeRef="SCR-OPS-080"
          description="5채널 통합 인박스 · 4종 액션 · 30초 자동 갱신"
        />
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-error text-white text-xs font-black px-2 py-0.5 tabular-nums">{unresolvedCount} 미처리</span>
          <span className="text-xs font-label text-on-surface-variant">⟳ 30초</span>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-0 mb-4 border-b border-outline-variant/20">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-label uppercase tracking-wider border-b-2 transition-colors ${
              tab === t
                ? "border-primary-accent text-primary-accent"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 일괄 액션 */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 mb-3 px-3 py-2 bg-surface-container-highest/30">
          <span className="text-xs font-label text-on-surface-variant">{selected.size}건 선택</span>
          <button className="text-xs bg-primary-accent/20 text-primary-accent px-3 py-1 font-label uppercase">일괄 확인</button>
          <button className="text-xs bg-surface-container-highest text-on-surface-variant px-3 py-1 font-label uppercase">일괄 무시</button>
        </div>
      )}

      {/* 알림 목록 */}
      <div className="bg-surface-container-lowest">
        <div className="p-3 bg-surface-container-highest/30 flex items-center border-l-4 border-primary-accent">
          <span className="font-headline font-black text-sm uppercase tracking-widest">알림 목록</span>
          <span className="opacity-30 font-label text-xs ml-2">| {filtered.length}건</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="px-3 py-2 w-8" />
                <th className="px-3 py-2 font-label text-xs uppercase opacity-50 w-8">P</th>
                <th className="px-3 py-2 font-label text-xs uppercase opacity-50">시각</th>
                <th className="px-3 py-2 font-label text-xs uppercase opacity-50">카테고리</th>
                <th className="px-3 py-2 font-label text-xs uppercase opacity-50">상태</th>
                <th className="px-3 py-2 font-label text-xs uppercase opacity-50">채널</th>
                <th className="px-3 py-2 font-label text-xs uppercase opacity-50">내용</th>
                <th className="px-3 py-2 font-label text-xs uppercase opacity-50">액션</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filtered.map((n) => {
                const isActive = n.state === "UNRESOLVED" || n.state === "READ" || n.state === "IN_PROGRESS";
                return (
                  <tr
                    key={n.id}
                    className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors ${
                      n.state === "IGNORED" ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selected.has(n.id)}
                        onChange={() => toggleSelect(n.id)}
                        className="accent-primary-accent"
                      />
                    </td>
                    <td className={`px-3 py-2 font-black text-lg ${PRIORITY_DOT[n.priority]}`}>●</td>
                    <td className="px-3 py-2 tabular-nums text-on-surface-variant text-xs">{n.occurredAt}</td>
                    <td className="px-3 py-2 text-xs font-label uppercase tracking-wider text-on-surface-variant">{n.category}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 text-xs font-label uppercase ${STATE_STYLE[n.state]}`}>
                        {STATE_LABEL[n.state]}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-0.5">
                        {n.channels.map((ch) => (
                          <span
                            key={ch}
                            className="text-[10px] bg-surface-container-highest text-on-surface-variant px-1 font-label"
                            title={ch}
                          >
                            {CHANNEL_ICONS[ch] ?? ch[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-on-surface max-w-xs truncate">{n.title}</td>
                    <td className="px-3 py-2">
                      {isActive && (
                        <div className="flex gap-1 flex-nowrap">
                          {(n.state === "UNRESOLVED" || n.state === "READ") && (
                            <button className="text-[10px] bg-surface-container-highest text-on-surface-variant px-2 py-0.5 font-label uppercase hover:bg-primary-accent/20 hover:text-primary-accent">확인</button>
                          )}
                          {(n.state === "UNRESOLVED" || n.state === "READ") && (
                            <button className="text-[10px] bg-surface-container-highest text-on-surface-variant px-2 py-0.5 font-label uppercase hover:bg-[#f59e0b]/20 hover:text-[#f59e0b]">위임</button>
                          )}
                          <button className="text-[10px] bg-primary-accent/20 text-primary-accent px-2 py-0.5 font-label uppercase hover:bg-primary-accent/40">해결</button>
                          <button className="text-[10px] bg-error/20 text-error px-2 py-0.5 font-label uppercase hover:bg-error/30">무시</button>
                        </div>
                      )}
                      {n.state === "RESOLVED" && <span className="text-[10px] text-on-surface-variant font-label">처리 종료</span>}
                      {n.state === "IGNORED" && <span className="text-[10px] text-on-surface-variant font-label">무시됨</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 범례 */}
      <div className="mt-4 text-xs font-label text-on-surface-variant flex gap-4 flex-wrap">
        <span>채널: E=EMAIL S=SMS K=KAKAOTALK I=INAPP L=LINEBOARD</span>
        <span>P(우선): 빨강=URGENT 노랑=HIGH 초록=MEDIUM 회색=LOW</span>
      </div>
    </div>
  );
}
