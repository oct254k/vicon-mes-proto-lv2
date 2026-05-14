import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CATALOG = [
  { channel:"EMAIL",     host:"smtp.vicon.com",       port:"587",  auth:"TLS", secret:"******",         status:"running" as const },
  { channel:"SMS",       host:"api.sms-provider.com", port:"443",  auth:"API-KEY", secret:"TKN-EAI-ERP-04", status:"running" as const },
  { channel:"KAKAOTALK", host:"kapi.kakao.com",       port:"443",  auth:"OAUTH2",  secret:"******",      status:"warning" as const },
  { channel:"INAPP",     host:"internal-mq",          port:"5672", auth:"AMQP",    secret:"(내부)",       status:"running" as const },
  { channel:"LINEBOARD", host:"board.vicon.com",       port:"443", auth:"TOKEN",   secret:"******",       status:"idle" as const },
];

export default function NotifyCatalogPage() {
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="알림 카탈로그" accent="CATALOG" nodeRef="SCR-SYS-040" status="PROTOTYPE"
        description="5채널 알림 마스터 — Vault 시크릿 마스킹 표시 (FNC-SYS-040·041)" />
      <FieldHeader title="채널 현황" moduleRef="FNC-SYS-040" />
      <div className="grid grid-cols-1 gap-3">
        {CATALOG.map(c => (
          <div key={c.channel} className="bg-surface-container p-5 border-l-4 border-[#00912F] flex items-center gap-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#00912F] w-24 shrink-0">{c.channel}</span>
            <span className="text-sm font-headline text-on-surface-variant flex-1">{c.host}:{c.port}</span>
            <span className="text-xs text-on-surface-variant opacity-60 w-20">{c.auth}</span>
            <span className="font-label text-xs text-on-surface-variant/40 w-36 font-mono">{c.secret}</span>
            <StatusBadge type={c.status} label={c.status.toUpperCase()} />
            <button className="ml-4 px-3 py-1 text-xs font-label uppercase tracking-widest bg-surface-container-high border border-outline-variant/20 hover:border-[#00912F] transition-colors">편집</button>
          </div>
        ))}
      </div>
    </div>
  );
}
