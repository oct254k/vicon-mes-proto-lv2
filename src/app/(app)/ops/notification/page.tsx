"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const KPI = [
  { label: "미해결",    value: "12건", color: "text-error" },
  { label: "발송 실패", value: "2건",  color: "text-[#f59e0b]" },
  { label: "오늘 수신", value: "47건", color: "text-on-surface" },
  { label: "회신 대기", value: "3건",  color: "text-[#f59e0b]" },
];

const LINKS = [
  { label: "알림 인박스",   href: "/ops/notification/inbox",            scr: "SCR-OPS-080", desc: "5채널 통합 · 4액션 · 30초 갱신" },
  { label: "발송 모니터",   href: "/ops/notification/dispatch-monitor", scr: "SCR-OPS-081", desc: "발송 실패·재시도 추적" },
  { label: "거래처 회신 큐", href: "/ops/notification/customer-reply",  scr: "SCR-OPS-082", desc: "거래처 통보 회신 인박스" },
];

const RECENT = [
  { id: "N-0047", channel: "INAPP",    type: "SPC Rule 1",  msg: "B01-1-C-171 UCL 초과",    time: "14:31", status: "UNRESOLVED" },
  { id: "N-0046", channel: "EMAIL",    type: "납기 D-1",    msg: "SO-2026-0241 출하 임박",   time: "14:00", status: "READ" },
  { id: "N-0045", channel: "KAKAOTALK",type: "설비 DOWN",   msg: "EQ-L03-001 비계획 DOWN",  time: "13:50", status: "IN_PROGRESS" },
];

const STATUS_COLOR: Record<string, string> = { UNRESOLVED: "text-error", READ: "text-on-surface-variant", IN_PROGRESS: "text-[#f59e0b]", RESOLVED: "text-primary-accent" };

export default function NotificationPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="알림 센터" nodeRef="FNC-OPS-090~099" description="5채널 · 4액션 통합 알림 랜딩 · 30초 갱신" />

      <div className="grid grid-cols-4 gap-3 mb-5">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {LINKS.map(l => (
          <a key={l.scr} href={l.href} className="bg-surface-container p-5 hover:border hover:border-primary-accent/40">
            <p className="text-xs font-label text-on-surface-variant mb-1">{l.scr}</p>
            <p className="text-sm font-headline font-bold text-on-surface">{l.label}</p>
            <p className="text-xs font-label text-on-surface-variant mt-1">{l.desc}</p>
          </a>
        ))}
      </div>

      {/* 최근 알림 */}
      <div className="bg-surface-container">
        <div className="p-4 border-l-4 border-primary-accent bg-surface-container-highest/30">
          <p className="font-headline font-black text-sm uppercase tracking-widest">최근 알림</p>
        </div>
        <div className="divide-y divide-outline-variant/5">
          {RECENT.map(n => (
            <div key={n.id} className="p-4 flex items-start gap-3">
              <span className="text-xs font-label text-on-surface-variant w-6">{n.id.split("-")[1]}</span>
              <div className="flex-1">
                <div className="flex gap-2 text-xs font-label mb-0.5">
                  <span className="text-on-surface-variant">{n.channel}</span>
                  <span className="text-on-surface font-bold">[{n.type}]</span>
                </div>
                <p className="text-sm font-headline text-on-surface">{n.msg}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-label text-on-surface-variant">{n.time}</p>
                <p className={`text-xs font-label font-bold ${STATUS_COLOR[n.status]}`}>{n.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
