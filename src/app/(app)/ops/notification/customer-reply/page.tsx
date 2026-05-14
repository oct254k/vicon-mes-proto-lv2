"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key: "id",         label: "회신ID" },
  { key: "so",         label: "수주번호" },
  { key: "customer",   label: "거래처" },
  { key: "notiType",   label: "통보 유형" },
  { key: "sentAt",     label: "발송 시각" },
  { key: "repliedAt",  label: "회신 시각" },
  { key: "replyStatus",label: "회신 상태" },
  { key: "action",     label: "처리" },
];

const DATA = [
  { id: "REP-001", so: "SO-2026-0259", customer: "DL이앤씨",    notiType: "납기 지연 통보",  sentAt: "14:00", repliedAt: "14:28", replyStatus: "회신 확인", action: "완료" },
  { id: "REP-002", so: "SO-2026-0301", customer: "(주)현대건설", notiType: "불량 발생 통보",  sentAt: "12:30", repliedAt: "-",     replyStatus: "대기중",    action: "대기" },
  { id: "REP-003", so: "SO-2026-0287", customer: "GS건설",       notiType: "출하 일정 안내",  sentAt: "10:00", repliedAt: "11:15", replyStatus: "회신 확인", action: "완료" },
  { id: "REP-004", so: "SO-2026-0241", customer: "(주)롯데건설",  notiType: "출하 D-1 알림",  sentAt: "09:00", repliedAt: "-",     replyStatus: "대기중",    action: "대기" },
];

const KPI = [
  { label: "발송 총계",  value: `${DATA.length}건` },
  { label: "회신 완료",  value: `${DATA.filter(d=>d.replyStatus==="회신 확인").length}건`, color: "text-primary-accent" },
  { label: "회신 대기",  value: `${DATA.filter(d=>d.replyStatus==="대기중").length}건`,    color: "text-warning" },
];

export default function CustomerReplyPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="거래처 회신 큐" nodeRef="FNC-OPS-099" description="거래처 통보 회신 인박스 · 5분+이벤트 갱신" />

      <div className="grid grid-cols-3 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color ?? "text-on-surface"}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* 대기 중 회신 강조 */}
      {DATA.filter(d => d.replyStatus === "대기중").map(d => (
        <div key={d.id} className="bg-surface-container border-l-4 border-warning p-4 mb-2 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs font-label text-warning font-bold mb-0.5">회신 대기 — {d.customer}</p>
            <p className="text-sm font-headline text-on-surface">{d.so} · {d.notiType}</p>
            <p className="text-xs font-label text-on-surface-variant">발송 {d.sentAt}</p>
          </div>
          <button className="bg-surface-container border border-warning/40 text-warning text-xs font-label px-3 py-1.5">독촉 발송</button>
        </div>
      ))}

      <DataTable title="거래처 회신 DataTable" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
