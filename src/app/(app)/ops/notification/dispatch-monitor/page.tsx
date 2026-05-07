"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const COLS = [
  { key: "id",       label: "발송ID" },
  { key: "notiId",   label: "알림ID" },
  { key: "channel",  label: "채널" },
  { key: "target",   label: "수신자" },
  { key: "type",     label: "알림 유형" },
  { key: "sentAt",   label: "발송 시각" },
  { key: "status",   label: "상태" },
  { key: "retry",    label: "재시도" },
  { key: "errMsg",   label: "오류" },
];

const DATA = [
  { id: "DIS-0101", notiId: "N-0047", channel: "INAPP",    target: "김작업", type: "SPC Rule 1",  sentAt: "14:31:52", status: "성공",   retry: "0", errMsg: "-" },
  { id: "DIS-0100", notiId: "N-0047", channel: "EMAIL",    target: "김공장", type: "SPC Rule 1",  sentAt: "14:31:52", status: "실패",   retry: "2", errMsg: "SMTP timeout" },
  { id: "DIS-0099", notiId: "N-0046", channel: "EMAIL",    target: "CS팀",   type: "납기 D-1",    sentAt: "14:00:01", status: "성공",   retry: "0", errMsg: "-" },
  { id: "DIS-0098", notiId: "N-0045", channel: "KAKAOTALK",target: "이라인장",type: "설비 DOWN",   sentAt: "13:50:03", status: "성공",   retry: "0", errMsg: "-" },
  { id: "DIS-0097", notiId: "N-0044", channel: "SMS",      target: "자재팀", type: "자재 부족",   sentAt: "12:00:08", status: "재시도", retry: "1", errMsg: "API rate limit" },
];

const KPI = [
  { label: "오늘 발송",  value: `${DATA.length}건` },
  { label: "성공",       value: `${DATA.filter(d=>d.status==="성공").length}건`,   color: "text-primary-accent" },
  { label: "실패",       value: `${DATA.filter(d=>d.status==="실패").length}건`,   color: "text-error" },
  { label: "재시도 중",  value: `${DATA.filter(d=>d.status==="재시도").length}건`, color: "text-[#f59e0b]" },
];

export default function DispatchMonitorPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="발송 모니터" accent="SCR-OPS-081" nodeRef="FNC-OPS-092,098" description="알림 발송 실패·재시도 추적 · 30초 갱신" />

      <div className="grid grid-cols-4 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color ?? "text-on-surface"}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* 실패 건 재시도 액션 */}
      {DATA.filter(d => d.status === "실패" || d.status === "재시도").map(d => (
        <div key={d.id} className="bg-surface-container border-l-4 border-error p-4 mb-2 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs font-label text-error font-bold mb-0.5">[{d.status}] {d.channel} → {d.target}</p>
            <p className="text-sm font-headline text-on-surface">{d.type} — {d.errMsg}</p>
            <p className="text-xs font-label text-on-surface-variant">{d.sentAt} · 재시도 {d.retry}회</p>
          </div>
          <button className="bg-primary-accent text-surface text-xs font-label px-3 py-1.5 font-bold uppercase">재시도</button>
        </div>
      ))}

      <DataTable title="발송 이력 DataTable" bufferCount={DATA.length} columns={COLS} data={DATA} />
    </div>
  );
}
