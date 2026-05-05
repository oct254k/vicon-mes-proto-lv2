"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

type NotiStatus = "UNRESOLVED" | "READ" | "IN_PROGRESS" | "RESOLVED" | "IGNORED";
const STATUS_COLOR: Record<NotiStatus, string> = {
  UNRESOLVED: "text-error", READ: "text-on-surface-variant",
  IN_PROGRESS: "text-[#f59e0b]", RESOLVED: "text-primary-accent", IGNORED: "text-on-surface-variant",
};
const CHANNELS = ["전체", "INAPP", "EMAIL", "SMS", "KAKAOTALK", "LINEBOARD"];

const INBOX = [
  { id: "N-0047", channel: "INAPP",    type: "SPC Rule 1",   msg: "B01-1-C-171 UCL 초과 (6010mm > 6005mm)",  time: "14:31", status: "UNRESOLVED" as NotiStatus },
  { id: "N-0046", channel: "EMAIL",    type: "납기 D-1",     msg: "SO-2026-0241 힐스테이트 일산 101동 출하 임박", time: "14:00", status: "READ" as NotiStatus },
  { id: "N-0045", channel: "KAKAOTALK",type: "설비 DOWN",    msg: "EQ-L03-001 비계획 DOWN — 용접라인 1호",      time: "13:50", status: "IN_PROGRESS" as NotiStatus },
  { id: "N-0044", channel: "SMS",      type: "자재 부족",    msg: "H형강 200×100 P3000 재고 0 — PR 발행 필요",  time: "12:00", status: "UNRESOLVED" as NotiStatus },
  { id: "N-0043", channel: "LINEBOARD",type: "SPC Rule 2",   msg: "연속 9점 한쪽 — L01 절단라인",              time: "11:30", status: "RESOLVED" as NotiStatus },
  { id: "N-0042", channel: "INAPP",    type: "불량 발생",    msg: "QC-0259 부재 201동 검사 불량 3건",          time: "10:15", status: "IGNORED" as NotiStatus },
];

const COLS = [
  { key: "id",      label: "알림ID" },
  { key: "channel", label: "채널" },
  { key: "type",    label: "유형" },
  { key: "msg",     label: "내용" },
  { key: "time",    label: "수신" },
  { key: "status",  label: "상태" },
];

export default function NotificationInboxPage() {
  const [ch, setCh] = useState("전체");
  const filtered = INBOX.filter(n => ch === "전체" || n.channel === ch);
  const data = filtered.map(n => ({ ...n }));

  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="알림 인박스" accent="SCR-OPS-080" nodeRef="FNC-OPS-090,091,093,097" description="5채널 통합 인박스 · 4액션 · 30초 갱신" />

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {CHANNELS.map(c => (
          <button key={c} onClick={() => setCh(c)}
            className={`px-3 py-1.5 text-xs font-label uppercase tracking-widest
              ${ch===c?"bg-primary-accent text-surface":"bg-surface-container text-on-surface-variant hover:text-on-surface"}`}>
            {c}
          </button>
        ))}
        <div className="ml-auto flex gap-2 text-xs font-label text-on-surface-variant">
          <span>미해결 {INBOX.filter(n=>n.status==="UNRESOLVED").length}건</span>
          <span>30초 자동 갱신</span>
        </div>
      </div>

      {/* 알림 목록 (액션 포함) */}
      <div className="bg-surface-container mb-4">
        {filtered.map(n => (
          <div key={n.id} className="border-b border-outline-variant/5 p-4 flex items-start gap-3 hover:bg-surface-container-highest/10">
            <div className="flex-1">
              <div className="flex gap-2 text-xs font-label mb-1">
                <span className="text-on-surface-variant">{n.channel}</span>
                <span className="font-bold">[{n.type}]</span>
                <span className={`ml-auto ${STATUS_COLOR[n.status]} font-bold`}>{n.status}</span>
              </div>
              <p className="text-sm font-headline text-on-surface">{n.msg}</p>
              <p className="text-xs font-label text-on-surface-variant mt-1">{n.time}</p>
            </div>
            <div className="flex gap-1 text-xs font-label flex-shrink-0">
              {["확인","위임","해결","무시"].map(a => (
                <button key={a} className="px-2 py-1 bg-surface border border-outline-variant/20 hover:border-primary-accent/40">{a}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <DataTable title="알림 인박스 DataTable" bufferCount={filtered.length} columns={COLS} data={data} />
    </div>
  );
}
